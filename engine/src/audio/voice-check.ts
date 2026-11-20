/**
 * npm run voice:check -- "<tài liệu>" : nghe lại giọng VieNeu từng câu bằng PhoWhisper, KHÔNG đưa kịch bản làm gợi ý,
 * rồi so từng âm tiết với kịch bản. Chỉ BÁO (S6 sở hữu báo cáo), không sửa gì.
 *
 * Câu đọc sai: thu lại đúng câu đó bằng `npm run voice -- "<tài liệu>" --redo <cảnh>-<câu>` (đổi hạt giống lấy mẫu của VieNeu,
 * lưu ở voice-redo.json). script.json không đổi nên hai phiếu duyệt vẫn giữ.
 * Ý tưởng: digital-human-koubo/scripts/misread_check.py (phiên âm kèm kịch bản sẽ che chữ đọc sai).
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { loadScript, resolveJob } from "../training/job";

export interface Hunk {
  expected: string;
  heard: string;
  /** "so": có chữ số ở một bên (thường chỉ khác cách viết); "ten": tên riêng / từ nước ngoài (ASR hay nghe sai); "loi": khác chữ */
  kind: "so" | "ten" | "loi";
}
export interface SentenceCheck {
  id: string;
  text: string;
  heard: string;
  errorRate: number;
  hunks: Hunk[];
}

/** Tách âm tiết: NFC, chữ thường, bỏ dấu câu (giữ chữ và số mọi bảng mã). */
export function syllables(s: string): string[] {
  return s.normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim().split(/\s+/).filter(Boolean);
}

/** Âm tiết viết hoa giữa câu hoặc chữ hoa lẫn thường (ChatGPT, Lark, Claude): tên riêng, thường là từ nước ngoài. */
export function properNouns(text: string): Set<string> {
  const out = new Set<string>();
  const words = text.normalize("NFC").split(/\s+/);
  for (let k = 0; k < words.length; k++) {
    const w = words[k].replace(/[^\p{L}\p{N}]+/gu, "");
    if (!w) continue;
    const sentenceStart = k === 0 || /[.!?:]$/.test(words[k - 1]);
    if ((/^\p{Lu}/u.test(w) && !sentenceStart) || /\p{Ll}\p{Lu}/u.test(w) || /^\p{Lu}{2,}$/u.test(w)) out.add(w.toLowerCase());
  }
  return out;
}

/** So âm tiết theo LCS, gom các đoạn lệch liên tiếp thành hunk. Khác nhau chỉ ở dấu cách (ChatGPT / chat gpt) không tính. */
export function compareSyllables(text: string, heard: string): { errorRate: number; hunks: Hunk[] } {
  const names = properNouns(text);
  const a = syllables(text), b = syllables(heard);
  const n = a.length, m = b.length;
  const L: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const hunks: Hunk[] = [];
  let i = 0, j = 0, ea: string[] = [], eb: string[] = [], edits = 0;
  const flush = () => {
    if (!ea.length && !eb.length) return;
    if (ea.join("") === eb.join("")) { ea = []; eb = []; return; }
    edits += Math.max(ea.length, eb.length);
    const digits = /\p{N}/u.test(ea.join("") + eb.join(""));
    const name = ea.length > 0 && ea.some((x) => names.has(x));
    hunks.push({ expected: ea.join(" "), heard: eb.join(" "), kind: digits ? "so" : name ? "ten" : "loi" });
    ea = []; eb = [];
  };
  while (i < n || j < m) {
    if (i < n && j < m && a[i] === b[j]) { flush(); i++; j++; }
    else if (j < m && (i >= n || L[i][j + 1] >= L[i + 1][j])) eb.push(b[j++]);
    else ea.push(a[i++]);
  }
  flush();
  return { errorRate: n ? Math.round((edits / n) * 1000) / 1000 : 0, hunks };
}

function report(rows: SentenceCheck[], doc: string): string {
  const bad = rows.filter((r) => r.hunks.some((h) => h.kind === "loi"));
  const num = rows.filter((r) => !bad.includes(r) && r.hunks.some((h) => h.kind === "so"));
  const names = rows.filter((r) => !bad.includes(r) && !num.includes(r) && r.hunks.length);
  const esc = (s: string) => s.replace(/\|/g, "\\|");
  const lines = [
    `# Nghe lại giọng đọc: ${doc}`,
    "",
    `${rows.length} câu, ${bad.length} câu nghi đọc sai, ${num.length} câu chỉ lệch ở số, ${names.length} câu chỉ lệch ở tên riêng. Phiên âm KHÔNG kèm kịch bản (PhoWhisper), nên vẫn có thể báo nhầm chữ đồng âm hoặc tên riêng: nghe lại câu được báo trước khi thu lại.`,
    "",
  ];
  if (bad.length) {
    lines.push("## Nghi đọc sai", "", "| Câu | Kịch bản | Nghe được | Chỗ lệch |", "| :--- | :--- | :--- | :--- |");
    for (const r of bad) lines.push(`| ${r.id} | ${esc(r.text)} | ${esc(r.heard)} | ${r.hunks.filter((h) => h.kind === "loi").map((h) => `"${esc(h.expected) || "∅"}" → "${esc(h.heard) || "∅"}"`).join("; ")} |`);
    lines.push("", `Thu lại câu đã nghe xác nhận sai: \`npm run voice -- "${doc}" --redo ${bad.map((r) => r.id).join(",")}\`, rồi chạy lại \`npm run voice:check\`.`, "");
  }
  if (num.length) {
    lines.push("## Chỉ lệch ở số (nghe lại cho chắc)", "", "| Câu | Kịch bản | Nghe được |", "| :--- | :--- | :--- |");
    for (const r of num) lines.push(`| ${r.id} | ${esc(r.text)} | ${esc(r.heard)} |`);
    lines.push("");
  }
  if (names.length) {
    lines.push("## Chỉ lệch ở tên riêng / từ nước ngoài (máy nghe hay sai, nghe lại cho chắc)", "", "| Câu | Chỗ lệch |", "| :--- | :--- |");
    for (const r of names) lines.push(`| ${r.id} | ${r.hunks.map((h) => `"${esc(h.expected)}" → "${esc(h.heard) || "∅"}"`).join("; ")} |`);
    lines.push("");
  }
  return lines.join("\n");
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const input = args.find((a) => !a.startsWith("--"));
  if (!input) throw new Error('Sử dụng: npm run voice:check -- "<tài liệu>" [--model large-v3]');
  const mi = args.indexOf("--model");
  const model = mi >= 0 ? args[mi + 1] : "phowhisper";
  const job = resolveJob(input);
  const script = loadScript(job);
  const py = resolve(".venv-asr", "Scripts", "python.exe");
  if (!existsSync(py)) throw new Error("Thiếu .venv-asr (PhoWhisper). Chạy: npm run th:setup");
  const items: { id: string; wav: string; text: string }[] = [];
  for (const scene of script.scenes) {
    for (const [i, text] of scene.voiceSegments.entries()) {
      const wav = join(job.publicDir, "voice", `${scene.id}-${i}.wav`);
      if (!existsSync(wav)) throw new Error(`Chưa có giọng ${scene.id}-${i}. Chạy: npm run voice -- "${input}"`);
      items.push({ id: `${scene.id}-${i}`, wav, text });
    }
  }
  const tmp = join(job.outputDir, ".voice-check");
  mkdirSync(tmp, { recursive: true });
  const itemsFile = join(tmp, "items.json"), heardFile = join(tmp, "heard.json");
  writeFileSync(itemsFile, JSON.stringify(items.map(({ id, wav }) => ({ id, wav }))));
  const r = spawnSync(py, [resolve("scripts", "asr", "voice_check.py"), "--items", itemsFile, "--out", heardFile, "--model", model], { stdio: "inherit", windowsHide: true });
  if (r.status !== 0) throw new Error(`voice_check.py thoát mã ${r.status} (đã tắt tts:server chưa?)`);
  const heard = new Map((JSON.parse(readFileSync(heardFile, "utf8")) as { id: string; heard: string }[]).map((h) => [h.id, h.heard]));
  const rows: SentenceCheck[] = items.map((it) => ({ id: it.id, text: it.text, heard: heard.get(it.id) ?? "", ...compareSyllables(it.text, heard.get(it.id) ?? "") }));
  writeFileSync(join(job.outputDir, "voice-check.json"), `${JSON.stringify({ model, checkedAt: new Date().toISOString(), rows }, null, 2)}\n`);
  writeFileSync(join(job.outputDir, "voice-check.md"), report(rows, input));
  const bad = rows.filter((x) => x.hunks.some((h) => h.kind === "loi")).length;
  console.log(`${rows.length} câu, ${bad} câu nghi đọc sai. Báo cáo: ${join(job.outputDir, "voice-check.md")}`);
}

if (process.argv[1] && /voice-check\.ts$/.test(process.argv[1])) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
