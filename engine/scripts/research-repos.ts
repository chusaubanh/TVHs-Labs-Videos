import "../src/integrations/runtime-environment.js";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { RESEARCH_CAPABILITIES } from "../src/integrations/research-catalog.js";
import { RESEARCH_CONFIG, researchRepo, researchRoots } from "../src/integrations/research-paths.js";

const [command = "inventory", target] = process.argv.slice(2);
const root = process.cwd();
if (command === "connect") {
  if (!target) throw new Error("Cú pháp: npm run research:connect -- <thư mục chứa các repo>");
  const path = resolve(target);
  if (!existsSync(path) || !statSync(path).isDirectory()) throw new Error(`Không có thư mục: ${path}`);
  const known = RESEARCH_CAPABILITIES.filter((c) => existsSync(join(path, c.repo, c.evidence)));
  if (!known.length) throw new Error("Không thấy mã nguồn repo nào đã biết; hãy chọn thư mục cha chứa các repo.");
  writeFileSync(join(root, RESEARCH_CONFIG), JSON.stringify({ root: path }, null, 2) + "\n");
  console.log(`Đã nối nguồn chỉ đọc: ${path} (${known.length} repo có tệp nguồn nhận diện).`);
} else if (command !== "inventory") {
  throw new Error(`Lệnh không hỗ trợ: ${command}`);
}
const lock = JSON.parse(readFileSync(join(root, "package-lock.json"), "utf8"));
const rows = RESEARCH_CAPABILITIES.map((c) => {
  let path = researchRepo(c.repo);
  if (c.repo === "ffmpeg-skill" && !existsSync(join(path, c.evidence))) path = dirname(createRequire(import.meta.url).resolve("ffmpeg-skill/package.json"));
  const source = join(path, c.evidence);
  const sourceFound = existsSync(source);
  let revision: string | null = null;
  if (existsSync(join(path, ".git"))) {
    try { revision = execFileSync("git", ["-C", path, "rev-parse", "HEAD"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); } catch { /* Bản chép thiếu .git vẫn đọc được source. */ }
  }
  return { ...c, path, sourceFound, revision,
    sourceHash: sourceFound ? createHash("sha256").update(readFileSync(source)).digest("hex") : null,
    installed: c.packages.map((name) => ({ name, lockedVersion: lock.packages?.[`node_modules/${name}`]?.version ?? null, installedVersion: existsSync(join(root, "node_modules", name, "package.json")) ? JSON.parse(readFileSync(join(root, "node_modules", name, "package.json"), "utf8")).version ?? null : null, present: existsSync(join(root, "node_modules", name, "package.json")) })),
    adapterFound: !!c.adapter && existsSync(join(root, c.adapter)),
    verification: "Cần thử — kiểm kê nguồn không phải chạy adapter hoặc qua cổng render",
  };
});
const known = new Set(rows.map((r) => r.repo));
const extra = [...new Set(researchRoots().flatMap((p) => existsSync(p) ? readdirSync(p, { withFileTypes: true }).filter((d) => d.isDirectory() && !known.has(d.name)).map((d) => d.name) : []))];
const runtimeTools = ["ffmpeg", "ffprobe"].map((name) => {
  const result = spawnSync(name, ["-version"], { encoding: "utf8", windowsHide: true });
  return { name, available: result.status === 0, version: result.status === 0 ? result.stdout.split(/\r?\n/)[0] : null, error: result.error?.message ?? (result.status ? result.stderr.trim() : null) };
});
const report = { generatedAt: new Date().toISOString(), roots: researchRoots(), repos: rows, unclassified: extra, runtimeTools };
const reportPath = join(root, "output", "research", "repos.json");
mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n");
for (const r of rows) console.log(`${r.sourceFound ? "NGUỒN CÓ" : "THIẾU NGUỒN"} | ${r.repo} | ${r.lane} | ${r.lane === "guide" ? "tài liệu hướng dẫn" : r.adapterFound ? "có điểm tích hợp" : "cần adapter"}`);
for (const tool of runtimeTools) console.log(`${tool.available ? "BINARY CÓ" : "THIẾU BINARY"} | ${tool.name}`);
console.log(`Báo cáo: ${reportPath}. Chưa chạy cổng render hoặc đánh giá hình.`);