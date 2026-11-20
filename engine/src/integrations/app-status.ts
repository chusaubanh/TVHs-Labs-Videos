import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { RESEARCH_CAPABILITIES } from "./research-catalog.js";
import { resolveMediaBinary } from "../studio/utils/media-binary.js";
import { mediaPython } from "./ffmpeg-skill.js";
import "./runtime-environment.js";

export function runtimeStatus(root = process.cwd()) {
  const packages = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const tools = ["ffmpeg", "ffprobe"].map((name) => {
    const exe = resolveMediaBinary(name as "ffmpeg" | "ffprobe");
    const result = spawnSync(exe, ["-version"], { encoding: "utf8", windowsHide: true, timeout: 10000 });
    return { name, available: result.status === 0, version: result.stdout?.split(/\r?\n/)[0] ?? null };
  });
  const python = spawnSync(mediaPython(root), ["--version"], { encoding: "utf8", windowsHide: true, timeout: 10000 });
  const gpu = spawnSync("nvidia-smi", ["--query-gpu=name,memory.free", "--format=csv,noheader"], { encoding: "utf8", windowsHide: true, timeout: 10000 });
  const capabilities = RESEARCH_CAPABILITIES.map((capability) => ({ repo: capability.repo, purpose: capability.purpose, lane: capability.lane,
    adapter: capability.adapter ? existsSync(join(root, capability.adapter)) : capability.lane === "guide",
    packages: capability.packages.map((name) => ({ name, version: packages.dependencies?.[name] ?? packages.devDependencies?.[name] ?? null })) }));
  return { node: process.version, platform: process.platform, tools, python: { available: python.status === 0, version: python.stdout?.trim() }, gpu: gpu.status === 0 ? gpu.stdout.trim() : null, capabilities };
}

/** Chỉ liệt kê job có hợp đồng; không đưa toàn bộ nội dung tài liệu vào API. */
export function listJobs(root = process.cwd()) {
  const result: { id: string; title: string; kind: "training" | "footage"; editor: boolean; video: boolean; review: boolean; script: boolean }[] = [];
  function visit(directory: string, prefix: string, depth: number) {
    if (depth > 5 || !existsSync(directory)) return;
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.isSymbolicLink() || entry.name.startsWith("_") || ["releases", "media", "research", "app-tasks", "stills", "voice", "work", "clips", "scenes", "studio", "thumbs"].includes(entry.name)) continue;
      const id = prefix ? `${prefix}/${entry.name}` : entry.name;
      const child = join(directory, entry.name);
      const editor = existsSync(join(child, "project.json")) || existsSync(join(child, "studio", "project.json"));
      const script = join(child, "script.json");
      if (editor || existsSync(script) || existsSync(join(child, "outline.json"))) {
        let title = entry.name;
        if (existsSync(script)) { try { title = JSON.parse(readFileSync(script, "utf8")).title ?? title; } catch { /* Job lỗi vẫn hiện để sửa. */ } }
        result.push({ id, title, kind: existsSync(script) || existsSync(join(child, "outline.json")) ? "training" : "footage", editor, video: existsSync(join(child, "video.mp4")), script: existsSync(script), review: existsSync(join(child, "script-review.md")) });
      }
      visit(child, id, depth + 1);
    }
  }
  visit(join(root, "output"), "", 0);
  return result.sort((a, b) => a.title.localeCompare(b.title, "vi"));
}