/**
 * th:verify-cut — soát cut.mp4 sau th:cut, CHỈ BÁO, không sửa gì. Lấy từ editonny (MIT) engine/helpers/verify_cut.py
 * và breaths.py các phép: EDGE-IN-SPEECH, EDGE-IN-WORD, REPEAT, DEAD-AIR, cộng danh sách hơi thở/ngắt ≥ 0,25 s để tham khảo.
 * Bỏ CLICK (cut-render đã acrossfade 10 ms) và LOW/HIGH-LEVEL (clip-loudness.ts đã cân từng đoạn).
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Range } from "./cut-core.js";
import { repeatCandidates } from "./cut-plan.js";
import { runCapture } from "./ffmpeg-util.js";
import { ASR_PYTHON, REPO_ROOT, jobDir, readJson, requireFile, writeJson } from "./jobs.js";
import { loadBestTranscript } from "./commands-text.js";
import { CutsSchema, TranscriptSchema, type CutRange, type Segment } from "./project-schema.js";
import { readWav16 } from "./voicing.js";
import { HOP, envelope, isSpeech, silentRuns, type Envelope } from "./waveform.js";

export interface Flag {
  code: "EDGE-IN-SPEECH" | "EDGE-IN-WORD" | "REPEAT" | "DEAD-AIR";
  /** giây trên cut.mp4 */
  at: number;
  msg: string;
}

const fmt = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toFixed(2).padStart(5, "0")}`;

/** Thuần: từ keeps (giờ nguồn), dạng sóng nguồn, transcript nguồn/cắt và dạng sóng bản cắt → danh sách cờ + hơi thở. */
export function verifyCut(input: { keeps: Range[]; srcDuration: number; src: Envelope | null; srcWords: Segment["words"]; cutSegments: Segment[]; cut: Envelope | null; cutDuration: number; deadAir?: number; cuts?: CutRange[] }) {
  // biên cạnh đoạn cắt "ừm/à": filler có tiếng và dính liền vào từ kề bên, đo năng lượng không phân biệt được (lớp học thật: 43/88 cờ là loại này)
  const fillerEdge = (t: number) => (input.cuts ?? []).some((r) => r.approved && r.kind?.startsWith("filler") && (Math.abs(r.start - t) < 0.06 || Math.abs(r.end - t) < 0.06));
  const { keeps, src, srcWords, cut } = input;
  const flags: Flag[] = [];
  let t = 0;
  keeps.forEach((k) => {
    const edges: [number, number, string][] = [];
    if (k.start > 0.01) edges.push([k.start, t, "đầu đoạn"]);
    if (k.end < input.srcDuration - 0.01) edges.push([k.end, t + (k.end - k.start), "cuối đoạn"]);
    for (const [e, ct, side] of edges) {
      // tiếng nói ở CẢ HAI phía biên: cắt giữa dòng âm liền (cắt bỏ "ừm" xong rơi vào lặng thì không tính)
      if (src?.usable && !fillerEdge(e) && isSpeech(src, e - HOP) && isSpeech(src, e)) flags.push({ code: "EDGE-IN-SPEECH", at: +ct.toFixed(2), msg: `${side} cắt lúc nguồn còn đang nói (nguồn ${fmt(e)})` });
      const w = srcWords.find((x) => e > x.start + 0.03 && e < x.end - 0.03);
      if (w) flags.push({ code: "EDGE-IN-WORD", at: +ct.toFixed(2), msg: `${side} rơi giữa từ "${w.text}" (nguồn ${fmt(w.start)}–${fmt(w.end)})` });
    }
    t += k.end - k.start;
  });
  for (const r of repeatCandidates(input.cutSegments)) flags.push({ code: "REPEAT", at: r.start, msg: `câu lặp lại câu trước: ${r.reason}` });
  const breaths: [number, number][] = [];
  if (cut?.usable) {
    const tailFrom = input.cutDuration - 0.35; // đuôi clip chừa 0,3 s có chủ ý (cut-plan TAIL_KEEP)
    for (const [a, b] of silentRuns(cut, 0.25)) {
      if (a >= tailFrom) continue;
      if (b - a >= (input.deadAir ?? 0.7)) flags.push({ code: "DEAD-AIR", at: a, msg: `lặng ${(b - a).toFixed(2)} s (${fmt(a)}–${fmt(b)})` });
      else breaths.push([a, b]);
    }
  }
  return { flags: flags.sort((x, y) => x.at - y.at), breaths };
}

async function monoF32(file: string): Promise<Float32Array> {
  const { stdoutBuf } = await runCapture("ffmpeg", ["-v", "error", "-i", file, "-vn", "-ac", "1", "-ar", "16000", "-f", "f32le", "-"], { binary: true });
  const b = stdoutBuf!;
  return new Float32Array(b.buffer, b.byteOffset, Math.floor(b.byteLength / 4));
}

export async function verifyCutCmd(job: string, deadAir?: number): Promise<void> {
  const dir = jobDir(job);
  const cutMp4 = requireFile(join(dir, "cut.mp4"), "Chạy th:cut trước.");
  const map = await readJson<{ keeps: Range[]; duration: number; introOffset?: number }>(requireFile(join(dir, "cut-map.json"), "Chạy th:cut trước."));
  if (map.introOffset) throw new Error("cut.mp4 đã có intro (th:intro): verify-cut chỉ chạy ngay sau th:cut.");
  const pj = join(dir, "project.json");
  if (existsSync(pj) && (JSON.parse(readFileSync(pj, "utf8")) as { videoClips?: unknown[] }).videoClips?.length)
    throw new Error("Job đã có videoClips: cut-map.json không còn đúng, verify-cut chỉ chạy ngay sau th:cut.");
  const media = await readJson<{ info: { duration: number } }>(join(dir, "media.json"));
  const wav = join(dir, "work", "audio16k.wav");
  const src = existsSync(wav) ? await readWav16(wav).then(({ samples, sampleRate }) => envelope(samples, sampleRate)) : null;
  const cut = envelope(await monoF32(cutMp4), 16000);
  const { tr } = await loadBestTranscript(job);
  const cutTr = await readJson(requireFile(join(dir, "transcript.cut.json"), "Chạy th:cut trước."), TranscriptSchema);
  const r = verifyCut({
    keeps: map.keeps, srcDuration: media.info.duration, src, srcWords: tr.segments.flatMap((s) => s.words),
    cutSegments: cutTr.segments, cut, cutDuration: map.duration, deadAir,
    cuts: existsSync(join(dir, "cuts.json")) ? (await readJson(join(dir, "cuts.json"), CutsSchema)).ranges : [],
  });
  const skipped = [
    ...(src ? [] : ["EDGE-IN-SPEECH: thiếu work/audio16k.wav"]),
    ...(src && !src.usable ? ["EDGE-IN-SPEECH: dạng sóng nguồn quá đều"] : []),
    ...(cut.usable ? [] : ["DEAD-AIR: dạng sóng bản cắt quá đều"]),
  ];
  await writeJson(join(dir, "verify-cut.json"), { ...r, skipped });
  console.log(`verify-cut: ${r.flags.length} cờ, ${r.breaths.length} chỗ ngắt/hơi thở 0,25–0,7 s (tham khảo, không cắt tự động).`);
  for (const f of r.flags) console.log(`  ${fmt(f.at)}  ${f.code}  ${f.msg}`);
  for (const s of skipped) console.log(`  BỎ QUA ${s}`);
  console.log(`Chi tiết: ${join(dir, "verify-cut.json")}. Nghe lại từng chỗ có cờ; sửa trong cuts.json rồi duyệt lại.`);
}

/** th:retranscribe — phiên âm lại các đoạn trong suspects.json, ghi gợi ý cho bước 3. Không sửa transcript. */
export async function retranscribeCmd(job: string): Promise<void> {
  const dir = jobDir(job);
  const suspects = requireFile(join(dir, "suspects.json"), "Chạy th:transcribe trước (nó ghi suspects.json).");
  const wav = requireFile(join(dir, "work", "audio16k.wav"), "Chạy th:transcribe trước.");
  requireFile(ASR_PYTHON, "Chạy npm run th:setup trước.");
  const out = join(dir, "suspects.retranscribed.json");
  await runCapture(ASR_PYTHON, [join(REPO_ROOT, "scripts", "asr", "retranscribe.py"), "--wav", wav, "--suspects", suspects, "--out", out], { inherit: true });
  console.log(`Gợi ý cho bước 3: ${out}. Đối chiếu, sửa transcript.edited.txt, hỏi người dùng chỗ chưa chắc trong questions.md.`);
}
