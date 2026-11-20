/**
 * Chữ sau người nói (Chế độ C): chữ/hình nằm giữa nền và người nói.
 *
 * Cách làm (thay macOS Vision của digital-human-koubo bằng model PyTorch chạy CUDA trên Windows):
 *  1. th:matte: chuyển layer được chọn vào track behindSubject; scripts/asr/matte.py tách người trên cut.mp4, chỉ trong các khoảng
 *     có layer đó → work/matte/matte-<key>.mkv (xám, đủ thời lượng, toạ độ của cut.mp4). Ghi matte.json.
 *  2. th:render: matte đi qua ĐÚNG chuỗi đặt khung của video (scaleOverlayMoves, nền đen thay INK) → matte toạ độ canvas,
 *     cache theo khung/chuyển động. Đổi khung hay zoom trong editor chỉ chạy lại bước ffmpeg này, không chạy lại model.
 *  3. Ghép: video → overlay track behindSubject với alpha × (1 − matte) → overlay các track còn lại. Kết quả tương đương
 *     vẽ người nói đè lên chữ, vì chỗ có người chính là điểm ảnh video gốc.
 */
import { createHash } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, statSync } from "node:fs";
import { join } from "node:path";
import { ensureCutFromClips } from "./clips-render.js";
import { runCapture } from "./ffmpeg-util.js";
import { ASR_PYTHON, REPO_ROOT, jobDir, readJson, writeJson } from "./jobs.js";
import { buildClipsFromCutMap } from "./clips.js";
import { clipDuration, loadProject, saveProject, type Layer, type Project, type Track, type VideoClip } from "./project-schema.js";
import { INK, scaleOverlayMoves, type SrcInfo } from "./video-moves.js";

import { researchRepo } from "../integrations/research-paths.js";

export const MATTE_VERSION = "matte-v2"; // v2: khoá matte gồm cả điểm cắt
export const BEHIND_TRACK_ID = "t-behind";
/** Người chiếm quá tỉ lệ này của hộp chữ thì chữ gần như bị che hết (koubo đo: cận mặt 89 % che chữ, trung cảnh 57 % đọc được). */
export const COVER_WARN = 0.6;
const PAD_S = 0.1; // nới mỗi khoảng để hoạt ảnh vào/ra không hụt matte

/** luma: chỉ để kiểm thử đường ống (alpha = độ sáng), không dùng cho video thật */
export type MatteModel = "birefnet" | "rvm" | "luma";
export interface MatteInfo {
  version: string;
  key: string;
  file: string; // tương đối thư mục job
  model: MatteModel;
  ema: number | null;
  ranges: [number, number][];
  /** điểm cắt (giây timeline) đã dùng để bắt đầu lại trạng thái model */
  cuts?: number[];
  stats?: unknown;
}

const sha = (s: string) => createHash("sha1").update(s).digest("hex");
const fileSig = (f: string) => (existsSync(f) ? `${statSync(f).size}:${Math.round(statSync(f).mtimeMs)}` : "none");
const r3 = (v: number) => Math.round(v * 1000) / 1000;

export const behindLayers = (p: Project): Layer[] =>
  p.tracks.filter((t) => t.behindSubject && !t.hidden).flatMap((t) => t.layers).filter((l) => l.type !== "audio");
export const hasBehind = (p: Project): boolean => behindLayers(p).length > 0;

/** Khoảng (giây timeline) cần matte: hợp các layer behindSubject, nới PAD_S, gộp khoảng sát nhau (< 0,5 s). */
export function behindRanges(p: Project): [number, number][] {
  const raw = behindLayers(p)
    .map((l) => [Math.max(0, l.start - PAD_S), Math.min(p.duration, l.start + l.duration + PAD_S)] as [number, number])
    .filter(([a, b]) => b > a)
    .sort((x, y) => x[0] - y[0]);
  const out: [number, number][] = [];
  for (const [a, b] of raw) {
    const last = out[out.length - 1];
    if (last && a <= last[1] + 0.5) last[1] = Math.max(last[1], b);
    else out.push([a, b]);
  }
  return out.map(([a, b]) => [r3(a), r3(b)]);
}

/** Matte đã có phủ hết các khoảng cần không (khoảng mới nằm trong khoảng đã tách). */
export function rangesCovered(need: [number, number][], have: [number, number][]): boolean {
  return need.every(([a, b]) => have.some(([c, d]) => c <= a + 1e-3 && d >= b - 1e-3));
}

export function matteKey(cutSig: string, ranges: [number, number][], model: MatteModel, ema: number | null, fps: number, frames: number, cuts: number[] = []): string {
  return sha([MATTE_VERSION, cutSig, JSON.stringify(ranges), model, ema ?? "auto", fps, frames, JSON.stringify(cuts)].join("|")).slice(0, 16);
}

/**
 * Mặc định: RVM (nhanh ~10×, ổn định theo thời gian; anh Phương chốt dùng nội bộ 07/11/2026) khi có bộ nạp và bản clone;
 * bản công khai không có scripts/asr/matte_rvm.py (GPL-3.0) nên tự về BiRefNet (MIT).
 */
export function defaultMatteModel(root = REPO_ROOT): MatteModel {
  const rvm = existsSync(join(root, "scripts", "asr", "matte_rvm.py")) && existsSync(join(researchRepo("RobustVideoMatting", root), "hubconf.py"));
  return rvm ? "rvm" : "birefnet";
}

/** Điểm nối giữa hai clip không liền nhau trên nguồn (jump cut), giây timeline. Clip "hold" (khung đứng) cũng tính là điểm nối. */
export function clipCutPoints(clips: VideoClip[], fps: number): number[] {
  const out: number[] = [];
  let t = 0;
  let prev: VideoClip | null = null;
  for (const c of clips) {
    const contiguous = prev && prev.kind === "source" && c.kind === "source" && Math.abs(c.srcIn - prev.srcOut!) < 0.5 / fps;
    if (prev && !contiguous) out.push(r3(t));
    t += clipDuration(c);
    prev = c;
  }
  return out;
}

/** Điểm cắt của job: theo videoClips nếu có, không thì dựng lại từ cut-map.json (cùng cách th:clips-init). */
export async function jobCutPoints(p: Project, dir: string): Promise<number[]> {
  if (p.videoClips?.length) return clipCutPoints(p.videoClips, p.fps);
  const mf = join(dir, "cut-map.json");
  if (!existsSync(mf)) return [];
  const m = await readJson<{ keeps: { start: number; end: number }[]; intro?: { from: number; to: number; gap: number } }>(mf);
  return clipCutPoints(buildClipsFromCutMap(m.keeps, m.intro, p.fps), p.fps);
}

/** Đưa layer vào track behindSubject (tạo nếu chưa có, ngay trên cùng để vẫn nằm dưới các track khác khi ghép). */
export function moveLayersBehind(p: Project, ids: string[]): { moved: string[]; missing: string[] } {
  let tb = p.tracks.find((t) => t.behindSubject);
  if (!tb) {
    tb = { id: BEHIND_TRACK_ID, kind: "graphics", name: "Chữ sau người nói", hidden: false, locked: false, layers: [], behindSubject: true } as Track;
    p.tracks.push(tb);
  }
  const moved: string[] = [], missing: string[] = [];
  for (const id of ids) {
    const src = p.tracks.find((t) => t.layers.some((l) => l.id === id));
    if (!src) { missing.push(id); continue; }
    if (src === tb) { moved.push(id); continue; }
    const l = src.layers.find((x) => x.id === id)!;
    if (l.type === "audio" || l.type === "subtitle") throw new Error(`Layer ${id} là ${l.type}: không đưa ra sau người nói được.`);
    src.layers = src.layers.filter((x) => x.id !== id);
    tb.layers.push(l);
    moved.push(id);
  }
  return { moved, missing };
}

function runPython(args: string[]): Promise<void> {
  return new Promise((res, rej) => {
    const p = spawn(ASR_PYTHON, args, { stdio: "inherit", windowsHide: true, env: { ...process.env, PYTHONUNBUFFERED: "1" } });
    p.on("error", rej);
    p.on("close", (c) => (c === 0 ? res() : rej(new Error(`matte.py thoát mã ${c}`))));
  });
}

/** `th:matte -- <job> [--layer id1,id2] [--model birefnet|rvm] [--ema 0.4] [--force]` */
export async function matteCmd(job: string, opts: { layers?: string[]; model?: MatteModel; ema?: number; force?: boolean }): Promise<void> {
  const dir = jobDir(job);
  const pf = join(dir, "project.json");
  let p = await loadProject(pf);
  if (opts.layers?.length) {
    const { moved, missing } = moveLayersBehind(p, opts.layers);
    if (missing.length) throw new Error(`Không thấy layer: ${missing.join(", ")}`);
    await saveProject(pf, p);
    p = await loadProject(pf);
    console.log(`Đã đưa ra sau người nói: ${moved.join(", ")} (track "${p.tracks.find((t) => t.behindSubject)!.name}")`);
  }
  const ranges = behindRanges(p);
  if (!ranges.length) throw new Error("Chưa có layer nào sau người nói. Dùng --layer <id> (id lấy trong editor hoặc project.json).");
  if (p.videoClips?.length) await ensureCutFromClips(p, dir);
  const cut = join(dir, p.source.video);
  if (!existsSync(cut)) throw new Error(`Thiếu ${cut}. Chạy: npm run th:cut -- ${job}`);
  if (!existsSync(ASR_PYTHON)) throw new Error("Thiếu .venv-asr. Chạy: npm run th:setup");
  const model: MatteModel = opts.model ?? defaultMatteModel();
  const cuts = await jobCutPoints(p, dir);
  const frames = Math.max(1, Math.round(p.duration * p.fps));
  const key = matteKey(fileSig(cut), ranges, model, opts.ema ?? null, p.fps, frames, cuts);
  const infoFile = join(dir, "matte.json");
  const old = existsSync(infoFile) ? await readJson<MatteInfo>(infoFile) : null;
  if (!opts.force && old?.key === key && existsSync(join(dir, old.file))) {
    console.log(`Matte không đổi, dùng lại ${old.file}`);
  } else {
    const rel = join("work", "matte", `matte-${key}.mkv`);
    const statsFile = join(dir, "work", "matte", `matte-${key}.stats.json`);
    mkdirSync(join(dir, "work", "matte"), { recursive: true });
    const vram = spawnSyncVram();
    if (vram !== null && vram > 5500) console.warn(`CẢNH BÁO: GPU đang dùng ${vram} MiB VRAM (tắt tts:server / editor render khác nếu matte.py hết bộ nhớ).`);
    const args = [join(REPO_ROOT, "scripts", "asr", "matte.py"), "--video", cut, "--out", join(dir, rel), "--fps", String(p.fps),
      "--frames", String(frames), "--ranges", ranges.map(([a, b]) => `${a}:${b}`).join(","), "--model", model, "--stats", statsFile, "--cuts", cuts.join(",")];
    if (opts.ema !== undefined) args.push("--ema", String(opts.ema));
    await runPython(args);
    const stats = await readJson<unknown>(statsFile).catch(() => undefined);
    await writeJson(infoFile, { version: MATTE_VERSION, key, file: rel.replace(/\\/g, "/"), model, ema: opts.ema ?? null, ranges, cuts, stats } satisfies MatteInfo);
  }
  const m = await readJson<MatteInfo>(infoFile);
  const pr = await runCapture("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", cut]);
  const [sw, sh] = pr.stdout.trim().split(",").map(Number);
  const warns = await coverageWarnings(p, await ensureCanvasMatte(p, dir, m, { w: sw, h: sh }));
  for (const w of warns) console.warn(`CẢNH BÁO: ${w}`);
  console.log(`Xong. Soát: npm run th:render -- ${job}, rồi xem khung giữa mỗi khoảng: ${ranges.map(([a, b]) => r3((a + b) / 2) + "s").join(", ")}`);
}

function spawnSyncVram(): number | null {
  const r = spawnSync("nvidia-smi", ["--query-gpu=memory.used", "--format=csv,noheader,nounits"], { encoding: "utf8", windowsHide: true });
  const v = parseInt(r.stdout?.trim().split(/\r?\n/)[0] ?? "", 10);
  return Number.isFinite(v) ? v : null;
}

/** Matte của th:render: phải có, đúng cut.mp4 hiện tại, và phủ hết các khoảng layer behindSubject đang có. */
export async function requireMatte(p: Project, dir: string, job: string): Promise<MatteInfo> {
  const infoFile = join(dir, "matte.json");
  const hint = `Chạy: npm run th:matte -- ${job}`;
  if (!existsSync(infoFile)) throw new Error(`Có layer sau người nói nhưng chưa tách người. ${hint}`);
  const m = await readJson<MatteInfo>(infoFile);
  if (m.version !== MATTE_VERSION || !existsSync(join(dir, m.file))) throw new Error(`matte.json cũ hoặc thiếu file. ${hint}`);
  const frames = Math.max(1, Math.round(p.duration * p.fps));
  const key = matteKey(fileSig(join(dir, p.source.video)), m.ranges, m.model, m.ema, p.fps, frames, m.cuts ?? []);
  if (key !== m.key) throw new Error(`cut.mp4 hoặc thời lượng đã đổi sau lần tách người. ${hint}`);
  if (!rangesCovered(behindRanges(p), m.ranges)) throw new Error(`Layer sau người nói đã dời ra ngoài vùng đã tách. ${hint}`);
  return m;
}

/** Chuỗi lọc đặt matte vào canvas: CÙNG công thức đặt khung với video (scaleOverlayMoves), nền đen (= không có người) thay INK. */
export function canvasMatteFilter(p: Project, info: SrcInfo): string {
  const f = scaleOverlayMoves(p, info);
  if (!f.endsWith(",format=yuv420p[b0s]")) throw new Error("scaleOverlayMoves đổi dạng, cần sửa canvasMatteFilter");
  return f.split(`c=${INK}`).join("c=black").replace(/,format=yuv420p\[b0s\]$/, ",format=gray[m]");
}

/**
 * matte toạ độ cut.mp4 → matte toạ độ canvas (cache theo matte + chuỗi lọc). `filter` phải là CÙNG chuỗi đặt khung mà video dùng
 * ở lần render đó (đo 07/11/2026: dùng chuỗi khác lệch 1–2 px ở mép người), đọc [0:v], ra [m] xám. Mặc định: scaleOverlayMoves.
 */
export async function ensureCanvasMatte(p: Project, dir: string, m: MatteInfo, info: SrcInfo, filter?: string): Promise<string> {
  const fc = filter ?? canvasMatteFilter(p, info);
  const geo = JSON.stringify([p.width, p.height, p.fps, p.duration, fc]);
  const out = join(dir, "work", "matte", `canvas-${sha(m.key + "|" + geo).slice(0, 16)}.mkv`);
  if (existsSync(out)) return out;
  const tmp = out.replace(/\.mkv$/, ".partial.mkv");
  await runCapture("ffmpeg", ["-y", "-v", "error", "-i", join(dir, m.file), "-filter_complex", fc, "-map", "[m]",
    "-c:v", "ffv1", "-level", "3", "-t", p.duration.toFixed(3), tmp]);
  renameSync(tmp, out);
  return out;
}

/**
 * Nhánh lọc cho một nhóm overlay của track behindSubject: alpha_mới = alpha × (1 − matte) trong đúng hộp cắt của nhóm.
 * input = chỉ số luồng PNG của nhóm, matteLabel = nhãn luồng matte canvas (đã tách riêng cho nhóm), ra [out] dạng rgba.
 */
export function maskedOverlayChain(input: number, matteLabel: string, box: [number, number, number, number], fps: number, out: string): string {
  const [x0, y0, x1, y1] = box, bw = x1 - x0, bh = y1 - y0, k = out.replace(/\W/g, "");
  return [
    `[${matteLabel}]fps=${fps},crop=${bw}:${bh}:${x0}:${y0},format=gray,negate[mi${k}]`,
    `[${input}:v]fps=${fps},format=rgba,split[oc${k}][oa${k}]`,
    `[oa${k}]alphaextract[a${k}]`,
    `[a${k}][mi${k}]blend=all_mode=multiply:shortest=1[am${k}]`,
    `[oc${k}][am${k}]alphamerge[${out}]`,
  ].join(";");
}

/** Tỉ lệ người che hộp của từng layer behindSubject (đọc 1 khung matte canvas ở giữa layer). */
export async function coverageWarnings(p: Project, canvasMatte: string): Promise<string[]> {
  const file = canvasMatte;
  const out: string[] = [];
  for (const l of behindLayers(p)) {
    const t = l.start + l.duration / 2;
    const x = Math.max(0, Math.round((l.x / 100) * p.width)), y = Math.max(0, Math.round((l.y / 100) * p.height));
    const w = Math.min(p.width - x, Math.round((l.w / 100) * p.width)), h = Math.min(p.height - y, Math.round((l.h / 100) * p.height));
    if (w < 2 || h < 2) continue;
    const r = await runCapture("ffmpeg", ["-v", "error", "-ss", t.toFixed(3), "-i", file, "-frames:v", "1", "-vf", `crop=${w}:${h}:${x}:${y},format=gray`,
      "-f", "rawvideo", "-"], { binary: true });
    const buf = r.stdoutBuf!;
    let on = 0;
    for (const v of buf) if (v > 127) on++;
    const cover = buf.length ? on / buf.length : 0;
    if (cover > COVER_WARN) out.push(`layer ${l.id} (${r3(l.start)}s): người nói che ${Math.round(cover * 100)}% hộp chữ, chữ gần như không đọc được. Dời chữ lên vùng trống trên đầu / hai bên vai, hoặc chọn đoạn quay xa hơn.`);
  }
  return out;
}
