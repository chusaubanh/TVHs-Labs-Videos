/**
 * Đo dạng sóng 10 ms (RMS, dB) để đặt và soát điểm cắt theo âm thật thay vì chỉ theo mốc từ của WhisperX.
 * Ngưỡng và cách tính chuyển từ editonny (MIT): engine/helpers/precise_edges.py (ON/WEAK trên nền, WALK 0,12 s)
 * và engine/helpers/verify_cut.py (EDGE-IN-SPEECH, DEAD-AIR). Không chép mã Python, chỉ lấy thông số.
 */
import type { CutRange } from "./project-schema.js";

export const HOP = 0.01;
export const ON_DB = 14; // trên nền: chắc chắn là tiếng nói
export const WEAK_DB = 6; // trên nền: phụ âm yếu/đuôi từ còn nghe được
export const WALK = 0.25; // nới tối đa mỗi biên (editonny REACH_OUT_S). Đo trên lớp học thật: từ mốc cuối từ WhisperX tới lặng thật trung vị 130 ms, p75 210 ms
const DIGITAL_SILENCE = -80;
const LOUD_BELOW = 15; // dB dưới giọng nói trung vị vẫn tính là "to"
const MIN_DYNAMIC_DB = 20; // p90 − nền dưới mức này: không đủ tương phản để đo

export interface Envelope {
  db: Float64Array;
  floor: number;
  /** false khi bản ghi quá đều (nhạc nền, ồn): không nên dựa vào số đo */
  usable: boolean;
  /** mức "đang nói" = trung vị khung trên nền+ON_DB, trừ LOUD_BELOW. Neo theo giọng thật: ồn lớp học (≈ nền+14) không tính. */
  speech: number;
}

export function envelope(x: Float32Array, sr: number): Envelope {
  const n = Math.round(HOP * sr);
  const len = Math.floor(x.length / n);
  const db = new Float64Array(len);
  for (let i = 0; i < len; i++) {
    let s = 0;
    for (let j = i * n; j < (i + 1) * n; j++) s += x[j] * x[j];
    db[i] = 10 * Math.log10(s / n + 1e-12);
  }
  const sorted = Float64Array.from(db).sort();
  const q = (p: number) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))] ?? -120;
  // nền = p10 của các khung KHÔNG phải im lặng số (> -80 dB): bản ghi có đoạn tắt tiếng (-90…-120 dB) kéo p10 xuống dưới ồn phòng
  const live = sorted.filter((v) => v > DIGITAL_SILENCE);
  const floor = live.length ? live[Math.floor(0.1 * live.length)] : -70;
  const voiced = live.filter((v) => v > floor + ON_DB);
  const speech = voiced.length ? Math.max(floor + ON_DB, voiced[voiced.length >> 1] - LOUD_BELOW) : floor + ON_DB;
  return { db, floor, speech, usable: q(0.9) - floor >= MIN_DYNAMIC_DB };
}

const at = (e: Envelope, t: number) => e.db[Math.max(0, Math.min(e.db.length - 1, Math.floor(t / HOP)))] ?? -120;
export const isWeakSound = (e: Envelope, t: number) => at(e, t) > e.floor + WEAK_DB;
export const isSpeech = (e: Envelope, t: number) => at(e, t) > e.speech;

/** Tỉ lệ khung trong [a, b) to ngang giọng nói. */
export function loudFraction(e: Envelope, a: number, b: number): number {
  const i0 = Math.max(0, Math.floor(a / HOP)), i1 = Math.min(e.db.length, Math.floor(b / HOP));
  let n = 0;
  for (let i = i0; i < i1; i++) if (e.db[i] > e.speech) n++;
  return i1 > i0 ? n / (i1 - i0) : 0;
}

/**
 * Khoảng "lặng" (không có chữ giữa hai từ) mà quá nửa là âm to: WhisperX bỏ sót lời (kéo giọng, "ờ", từ không căn được),
 * hoặc học viên nói xa mic. Đo trên lớp học thật: 122/966 khoảng như vậy, có khoảng nằm giữa câu. Đổi thành chưa duyệt để nghe.
 */
export function demoteLoudSilences(ranges: CutRange[], e: Envelope, limit = 0.5): CutRange[] {
  if (!e.usable) return ranges;
  return ranges.map((r) => {
    if (r.source !== "auto" || r.kind !== "silence") return r;
    const f = loudFraction(e, r.start, r.end);
    return f > limit ? { ...r, kind: "filler-vad" as const, approved: false, confidence: 0.3, reason: `${r.reason}; ${Math.round(f * 100)}% là âm to nhưng không có chữ: nghe trước khi cắt` } : r;
  });
}

/**
 * Thu hẹp đoạn cắt tự động khi biên của nó còn đè lên âm (đuôi từ, phụ âm đầu): đẩy start về sau / end về trước
 * tới khi gặp lặng, tối đa WALK. Chỉ chạm ứng viên auto loại silence: filler bản thân là âm nên không xét.
 */
export function protectEdges(ranges: CutRange[], e: Envelope): CutRange[] {
  if (!e.usable) return ranges;
  const out: CutRange[] = [];
  for (const r of ranges) {
    if (r.source !== "auto" || r.kind !== "silence") { out.push(r); continue; }
    let a = r.start, b = r.end;
    // xét khung NGAY TRONG đoạn cắt ở mỗi biên
    while (a + HOP - r.start <= WALK + 1e-9 && a < b && isWeakSound(e, a)) a += HOP;
    while (r.end - (b - HOP) <= WALK + 1e-9 && b > a && isWeakSound(e, b - HOP)) b -= HOP;
    const da = Math.round((a - r.start) * 1000), db = Math.round((r.end - b) * 1000);
    if (b - a < 0.05) continue; // còn toàn âm: bỏ đề xuất cắt
    out.push(da || db ? { ...r, start: +a.toFixed(3), end: +b.toFixed(3), reason: `${r.reason}; nới ${da}/${db} ms giữ đuôi âm` } : r);
  }
  return out;
}

/** Các đoạn lặng ≥ min (giây) trong bản đã cắt, đo theo ngưỡng WEAK trên nền. */
export function silentRuns(e: Envelope, min: number): [number, number][] {
  const out: [number, number][] = [];
  let run = -1;
  for (let i = 0; i <= e.db.length; i++) {
    const quiet = i < e.db.length && e.db[i] <= e.floor + WEAK_DB;
    if (quiet && run < 0) run = i;
    if (!quiet && run >= 0) {
      if ((i - run) * HOP >= min) out.push([+(run * HOP).toFixed(2), +(i * HOP).toFixed(2)]);
      run = -1;
    }
  }
  return out;
}
