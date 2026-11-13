import type { CutRange, Segment } from "./project-schema.js";
import { normToken } from "./align-edits.js";
import { isVoiced } from "./voicing.js";

export interface Filler {
  start: number;
  end: number;
  text: string;
  source?: string;
  voicedRatio?: number;
  f0Median?: number;
}

export const SILENCE_MIN = 0.45; // chỉ rút gọn lặng từ 0.45 s
export const PAUSE_SENTENCE = 0.2; // giữ lại ở ranh giới câu
export const PAUSE_COMMA = 0.12; // giữ lại ở dấu phẩy / giữa câu
export const TAIL_KEEP = 0.3; // giữ lại ở đuôi clip

/**
 * Lặng giữa các từ >= 0.45 s: không xoá trắng mà rút còn khoảng nghỉ tự nhiên
 * (0.2 s ở ranh giới câu, 0.12 s ở chỗ khác), cắt phần giữa. Đầu clip chừa 0.12 s, đuôi clip chừa 0.3 s.
 */
export function silenceCandidates(segments: Segment[], duration: number): CutRange[] {
  const words = segments.flatMap((s) => s.words);
  const out: CutRange[] = [];
  const add = (gapStart: number, gapEnd: number, from: number, to: number, label: string) => {
    if (gapEnd - gapStart < SILENCE_MIN || to - from < 0.05) return;
    out.push({
      start: +from.toFixed(3),
      end: +to.toFixed(3),
      reason: `lặng ${(gapEnd - gapStart).toFixed(2)}s, ${label}`,
      source: "auto",
      kind: "silence",
      confidence: 0.9,
      approved: true,
    });
  };
  if (!words.length) return out;
  add(0, words[0].start, 0, words[0].start - PAUSE_COMMA, `đầu clip, chừa ${PAUSE_COMMA}s`);
  const last = words[words.length - 1];
  add(last.end, duration, last.end + TAIL_KEEP, duration, `đuôi clip, chừa ${TAIL_KEEP}s`);
  for (let i = 1; i < words.length; i++) {
    const a = words[i - 1].end;
    const b = words[i].start;
    const keep = /[.?!…]$/.test(words[i - 1].text) ? PAUSE_SENTENCE : PAUSE_COMMA;
    add(a, b, a + keep / 2, b - keep / 2, `chừa nghỉ ${keep}s`);
  }
  return out.sort((x, y) => x.start - y.start);
}

export const VAD_FILLER_MIN = 0.25; // vùng VAD không có từ: chỉ tin khi dài ≥ 0.25 s
export const TINY_CUT = 0.15; // mẩu ngắn hơn thế giữa hai từ liền mạch thì không cắt (gây vụn)
export const MERGE_GAP = 0.2;
export const VOICED_CUT_MIN = 0.2; // filler có thanh: đề xuất cắt nếu dài ≥ 0.2 s

/**
 * Từ khớp danh sách đệm: tin cậy cao.
 * Vùng VAD không có từ: phân loại bằng âm học (voicedRatio/f0Median). Có thanh = "filler-voiced" (ừm/à/ờ), đề xuất cắt nếu ≥ 0.2 s.
 * Không thanh = "breath" (hơi thở/ngắt nghỉ tự nhiên): KHÔNG cắt. Không có số đo âm học thì để "filler-vad", không đề xuất cắt.
 */
export function fillerCandidates(fillers: Filler[], segments: Segment[]): CutRange[] {
  const out: CutRange[] = [];
  // fillers.json tính lúc phiên âm, theo từ GỐC. Transcript đã hiệu đính (vd đoạn Whisper bịa đã phiên âm lại) có thể có lời
  // thật trong "vùng không chữ" đó: vùng VAD đè lên từ của transcript hiện tại > 50 ms thì không còn là "ừm/à" (bài 2, clip 0518: 24 cờ cắt giữa từ).
  const words = segments.flatMap((s) => s.words);
  const onWord = (a: number, b: number) => words.some((w) => Math.min(b, w.end) - Math.max(a, w.start) > 0.05);
  for (const f of fillers) {
    const dur = f.end - f.start;
    if (f.source === "vad-gap" && onWord(f.start, f.end)) continue;
    if (f.source !== "vad-gap") {
      out.push({ start: f.start, end: f.end, reason: `từ đệm "${f.text}"`, source: "auto", kind: "filler-word", confidence: 0.9, approved: true });
      continue;
    }
    if (dur < TINY_CUT) continue;
    const stats = f.voicedRatio === undefined ? null : { voicedRatio: f.voicedRatio, f0Median: f.f0Median ?? 0, rms: 0 };
    const base = { start: f.start, end: f.end, source: "auto" as const, ...(stats ? { voicedRatio: stats.voicedRatio, f0Median: stats.f0Median } : {}) };
    if (!stats) out.push({ ...base, reason: `vùng tiếng không có từ ${dur.toFixed(2)}s (chưa có số đo âm học)`, kind: "filler-vad", confidence: 0.3, approved: false });
    else if (isVoiced(stats)) {
      out.push({ ...base, reason: `có thanh F0≈${stats.f0Median}Hz, ${dur.toFixed(2)}s (ừm/à/ờ)`, kind: "filler-voiced", confidence: 0.8, approved: dur >= VOICED_CUT_MIN });
    } else {
      out.push({ ...base, reason: `không thanh, ${dur.toFixed(2)}s: hơi thở/ngắt nghỉ, không cắt`, kind: "breath", confidence: 0.2, approved: false });
    }
  }
  return out;
}

/**
 * Hợp nhất ứng viên: các khoảng giao nhau luôn gộp (lấy kind/approved/confidence của mục tin cậy cao hơn);
 * các khoảng cách nhau < 0.2 s chỉ gộp khi cùng trạng thái approved. "breath" chỉ để tham khảo, không gộp.
 */
export function mergeNearby(c: CutRange[]): CutRange[] {
  const breath = c.filter((r) => r.kind === "breath");
  const sorted = c.filter((r) => r.kind !== "breath").sort((a, b) => a.start - b.start);
  const out: CutRange[] = [];
  for (const r of sorted) {
    const last = out[out.length - 1];
    const overlap = last && r.start < last.end;
    // đoạn CHƯA duyệt (vd câu lặp dài) không được nuốt đoạn ĐÃ duyệt nằm trong nó: giữ riêng, cắt đã duyệt vẫn chạy
    const winsUnapproved = last && last.approved !== r.approved && !((r.confidence ?? 0) > (last.confidence ?? 0) ? r.approved : last.approved);
    if (last && !winsUnapproved && (overlap || (last.approved === r.approved && r.start - last.end < MERGE_GAP))) {
      if ((r.confidence ?? 0) > (last.confidence ?? 0)) {
        last.kind = r.kind;
        last.confidence = r.confidence;
        last.approved = r.approved;
      }
      last.end = Math.max(last.end, r.end);
      last.reason = `${last.reason} + ${r.reason}`;
    } else out.push({ ...r });
  }
  return [...out, ...breath].sort((a, b) => a.start - b.start);
}

const T = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toFixed(2).padStart(5, "0")}`;

/** cuts.md: bảng dễ đọc cho người dùng/AI duyệt từng đoạn (thời điểm, loại, độ tin cậy, chữ xung quanh). */
export function renderCutsMd(ranges: CutRange[], segments: Segment[]): string {
  const words = segments.flatMap((s) => s.words);
  const ctx = (r: CutRange) => {
    const before = words.filter((w) => w.end <= r.start + 0.02).slice(-4).map((w) => w.text).join(" ");
    const inside = words.filter((w) => (w.start + w.end) / 2 >= r.start && (w.start + w.end) / 2 <= r.end).map((w) => w.text).join(" ");
    const after = words.filter((w) => w.start >= r.end - 0.02).slice(0, 4).map((w) => w.text).join(" ");
    return `…${before} **[${inside || "—"}]** ${after}…`.replace(/\|/g, "/");
  };
  const rows = ranges.map(
    (r, i) => `| ${i + 1} | ${T(r.start)}–${T(r.end)} | ${(r.end - r.start).toFixed(2)}s | ${r.kind ?? "-"} | ${r.confidence?.toFixed(2) ?? "-"} | ${r.voicedRatio === undefined ? "-" : `v${r.voicedRatio} f0=${r.f0Median}`} | ${r.approved ? "có" : "không"} | ${r.source} | ${ctx(r)} |`,
  );
  return [
    "# Kế hoạch cắt",
    "",
    'Cột "Đề xuất" là giá trị approved mặc định trong cuts.json. Sửa cuts.json rồi chạy th:approve --stage cut.',
    "",
    "| # | Thời điểm | Dài | Loại | Tin cậy | Âm học | Đề xuất | Nguồn | Chữ xung quanh |",
    "|---|---|---|---|---|---|---|---|---|",
    ...rows,
    "",
  ].join("\n");
}

/** Độ tương đồng token (Dice) giữa hai câu. */
export function similarity(a: string, b: string): number {
  const ta = a.split(/\s+/).map(normToken).filter(Boolean);
  const tb = b.split(/\s+/).map(normToken).filter(Boolean);
  if (!ta.length || !tb.length) return 0;
  const count = new Map<string, number>();
  for (const t of ta) count.set(t, (count.get(t) ?? 0) + 1);
  let common = 0;
  for (const t of tb) {
    const c = count.get(t) ?? 0;
    if (c > 0) {
      common++;
      count.set(t, c - 1);
    }
  }
  return (2 * common) / (ta.length + tb.length);
}

/** Câu lặp liền kề (tương đồng ≥ 0.75, ≥ 3 từ): cắt lần ngắn hơn; bằng nhau thì cắt lần trước, giữ lần sau. */
export function repeatCandidates(segments: Segment[], threshold = 0.75): CutRange[] {
  const out: CutRange[] = [];
  for (let i = 1; i < segments.length; i++) {
    const a = segments[i - 1];
    const b = segments[i];
    if (a.words.length < 3 || b.words.length < 3) continue;
    if (similarity(a.text, b.text) < threshold) continue;
    const dropA = a.words.length <= b.words.length;
    const drop = dropA ? a : b;
    out.push({
      start: drop.start,
      end: drop.end,
      reason: `câu lặp (giữ lần ${dropA ? "sau" : "trước, đầy đủ hơn"})`,
      source: "auto",
      kind: "retake",
      confidence: +similarity(a.text, b.text).toFixed(2),
      approved: false,
    });
  }
  return out;
}

export interface Suspect {
  start: number;
  end: number;
  reason: string;
  text: string;
}

/** Câu kết video YouTube mà Whisper hay bịa trên đoạn không phải lời giảng (gặp trên lớp học thật 04/11/2026). */
const YT_OUTRO = /subscribe|đăng k[ýí] kênh|không bỏ lỡ (những )?video|la ?la ?school|ghiền mì gõ|cảm ơn các bạn đã (theo dõi|xem)/i;
const normText = (t: string) => t.toLowerCase().normalize("NFC").replace(/[^\p{L}\p{N} ]/gu, "").replace(/\s+/g, " ").trim();

/**
 * Đoạn nghi Whisper bịa (hallucination): câu outro YouTube, câu trùng hệt câu kề (≥ 3 từ), hoặc ≥ 3 âm tiết dài ≥ 1,2 s.
 * Đo trên 71 phút lớp học: bắt 9 đoạn (3 outro + 3 cặp câu lặp); phiên âm lại (th:retranscribe) cả 9 đều không phải lời đã ghi —
 * 7 che lời giảng thật, 2 vẫn ra câu bịa (âm không phải lời giảng). Ngưỡng âm tiết lỏng hơn (≥ 1 s × 2) báo nhầm ~20 câu thật.
 * Bịa câu có thể ĐÈ lên lời thật (1871–1885 s: "Xin chào các bạn…" che "Cái đó là một kiểu lắng nghe…"), nên không tự cắt.
 */
export function suspectSegments(segments: Segment[]): Suspect[] {
  const out: Suspect[] = [];
  segments.forEach((g, i) => {
    const why: string[] = [];
    if (YT_OUTRO.test(g.text)) why.push("câu kết video YouTube");
    const n = normText(g.text);
    if (n.split(" ").length >= 3 && [segments[i - 1], segments[i + 1]].some((x) => x && normText(x.text) === n)) why.push("trùng hệt câu kề");
    const long = g.words.filter((w) => w.end - w.start >= 1.2).length;
    if (long >= 3) why.push(`${long} âm tiết dài ≥ 1,2 s`);
    if (why.length) out.push({ start: g.start, end: g.end, reason: why.join(", "), text: g.text });
  });
  return out;
}

/** Ứng viên auto đè lên đoạn nghi bịa: chuyển chưa duyệt (lời thật có thể nằm dưới). Đoạn AI/người dùng không đụng. */
export function holdSuspects(ranges: CutRange[], suspects: Suspect[]): CutRange[] {
  return ranges.map((r) => {
    const s = r.source === "auto" ? suspects.find((x) => r.start < x.end && r.end > x.start) : undefined;
    return s ? { ...r, approved: false, reason: `NGHI WHISPER BỊA (${s.reason}): nghe lại trước khi cắt; ${r.reason}` } : r;
  });
}
