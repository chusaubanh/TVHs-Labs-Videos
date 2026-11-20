import "./runtime-environment.js";
import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";

import { gpuEncodeAvailable } from "../studio/render/video-tools.js";

export function skillRoot(): string {
  return dirname(createRequire(import.meta.url).resolve("ffmpeg-skill/package.json"));
}
export function mediaPython(root = process.cwd()): string {
  if (process.env.MEDIA_PYTHON) return process.env.MEDIA_PYTHON;
  for (const venv of [".venv-media", ".venv-asr", ".venv-vieneu"]) {
    const file = join(root, venv, process.platform === "win32" ? "Scripts/python.exe" : "bin/python");
    if (existsSync(file)) return file;
  }
  return process.platform === "win32" ? "python.exe" : "python3";
}
export interface SkillResult { code: number; stdout: string; stderr: string; data: unknown; }

/** Thực thi script thật trong dependency đã khoá; không gọi shell, không phụ thuộc kho clone. */
export async function runSkill(tool: string, args: string[], options: { cwd?: string; onLog?: (text: string) => void; hardware?: boolean } = {}): Promise<SkillResult> {
  if (!/^[a-z][a-z0-9_-]*$/.test(tool)) throw new Error("Tên công cụ không hợp lệ.");
  const script = tool === "contract" || tool === "doctor" ? "_contract" : tool;
  const file = join(skillRoot(), "scripts", `${script}.py`);
  if (!existsSync(file)) throw new Error(`ffmpeg-skill không có công cụ ${tool}.`);
  const hardware = !["contract", "doctor", "probe", "check", "look"].includes(tool) && options.hardware !== false && await gpuEncodeAvailable();
  const argv = ["-B", join(process.cwd(), "scripts/asr/ffmpeg_skill_runner.py"), dirname(file), `${script}.py`, ...(tool === "doctor" ? ["doctor"] : []), ...args];
  if (!argv.includes("--json")) argv.push("--json");
  return new Promise((resolve, reject) => {
    const child = spawn(mediaPython(), argv, { cwd: options.cwd ?? process.cwd(), windowsHide: true,
      env: { ...process.env, PYTHONIOENCODING: "utf-8", PYTHONDONTWRITEBYTECODE: "1", FFMPEG_SKILL_HW: "0", TVHS_MEDIA_NVENC: hardware ? "1" : "0" } });
    let stdout = "", stderr = "", overflow = false;
    child.stdout.on("data", (b) => { stdout += b.toString(); if (stdout.length > 16_000_000) { overflow = true; child.kill(); } });
    child.stderr.on("data", (b) => { const s = b.toString(); stderr = (stderr + s).slice(-200_000); options.onLog?.(s); });
    child.on("error", reject);
    child.on("close", (code) => {
      if (overflow) return reject(new Error("Đầu ra công cụ vượt giới hạn."));
      let data: unknown = null; try { data = JSON.parse(stdout); } catch { /* Ghi nguyên văn stdout trong kết quả lỗi. */ }
      resolve({ code: code ?? 1, stdout, stderr, data });
    });
  });
}