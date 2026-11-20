import "./local-tmp.js";
import "../src/integrations/runtime-environment.js";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { resolve, join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { GL, GPU } from "../src/training/hardware.js";
import { runSkill } from "../src/integrations/ffmpeg-skill.js";
import { evaluateQc, probeMedia } from "../src/gates/qc.js";

const directory = resolve("output/_verification"); mkdirSync(directory, { recursive: true });
const source = join(directory, "technical-smoke.mp4"), normalized = join(directory, "technical-smoke-normalized.mp4");
const serveUrl = await bundle({ entryPoint: resolve("src/remotion/index.ts") });
const selected = await selectComposition({ serveUrl, id: "fixture-av", chromiumOptions: { gl: GL } });
const composition = { ...selected, width: 1080, height: 1080 };
await renderMedia({ composition, serveUrl, outputLocation: source, codec: "h264", audioCodec: "aac", hardwareAcceleration: GPU ? "required" : "disable", chromiumOptions: { gl: GL } });
async function skill(tool: string, args: string[]) {
  const result = await runSkill(tool, args);
  if (result.code) throw new Error(result.stdout || result.stderr);
  return result.data;
}
const before = await skill("probe", [source]);
const args = [source, "-I", "-14", "--tp", "-1", "-o", normalized, "--overwrite"];
const plan = await skill("loudness", [...args, "--dry-run"]);
const result = await skill("loudness", args);
const facts = probeMedia(normalized);
const errors = evaluateQc(facts, { aspect: "1:1", durationSec: 3 });
if (errors.length) throw new Error(errors.join("\n"));
const sheet = join(directory, "technical-smoke-sheet.png");
await skill("look", [normalized, "--tiles", "3x2", "-o", sheet, "--overwrite"]);
writeFileSync(join(directory, "media.json"), JSON.stringify({ generatedAt: new Date().toISOString(), gpu: GPU, gl: GL, before, plan, result, facts, qc: "passed", sheet }, null, 2));
console.log(`ĐẠT xuất MP4 kỹ thuật: ${facts.width}x${facts.height}, ${facts.fps} fps, ${facts.durationSec}s, ${facts.lufs} LUFS. GPU=${GPU}. Ảnh kiểm: ${sheet}`);