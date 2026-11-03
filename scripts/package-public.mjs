/**
 * Sinh bản công khai từ commit hiện tại theo danh sách cho phép, rồi quét chuỗi nội bộ: node scripts/package-public.mjs <thư mục đích>
 * File mới không tự lọt ra ngoài vì chỉ những đường dẫn trong ALLOW mới được chép.
 */
import { execSync, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, extname, join } from "node:path";

const dest = process.argv[2];
if (!dest) {
  console.error("Sử dụng: node scripts/package-public.mjs <thư mục đích>");
  process.exit(2);
}
if (existsSync(join(dest, ".git"))) {
  console.error("Đích đã có .git: dùng thư mục mới để không ghi đè lịch sử.");
  process.exit(2);
}

const ALLOW = [
  "package.json", "package-lock.json", "tsconfig.json", "vitest.config.ts", "remotion.config.ts", "render.bat", "open-studio.bat",
  "requirements-vieneu.lock.txt", "requirements-asr.lock.txt",
  "samples", "input/Pha-tra", "src/videos/mau", "tests", "src/training", "src/audio", "src/remotion", "src/kit", "src/gates", "src/fixtures", "src/engine", "src/studio", "src/talking-head",
  "scripts/asr", "scripts/editor","scripts/th-presets",
  "scripts/doctor.ps1", "scripts/setup-windows.ps1", "scripts/setup-asr.ps1", "scripts/open-studio.ps1", "scripts/music-analyze.py", "scripts/vieneu-server.py",
  "scripts/stills.ts", "scripts/render-tools.ts", "scripts/pipeline-runner.ts", "scripts/finish-audio.ts", "scripts/capcut-export.ts", "scripts/gate-determinism.ts", "scripts/qc-ffmpeg.ts",
  "scripts/bake-rapier.ts", "scripts/optimize-svg.mjs", "scripts/pan-audio.ts",
  "assets/fonts", "assets/sfx-th", "assets/th-presets", "assets/voices", "public/fonts", "public/vendor",
  "docs/QUY-TRINH.md", "docs/CHE-DO-C.md", "docs/QUY-CHUAN-HINH.md", "docs/QUY-CHUAN-KICH-BAN.md",
  "docs/tham-khao-repo-cu/CHE-DO-C-SPEC.md", "docs/tham-khao-repo-cu/BROLL-GUIDE.md", "docs/tham-khao-repo-cu/QUY-TRINH-VIDEO-HUONG-DAN-QUAY-MAN-HINH.md",
];

// Thứ tự quan trọng: chuỗi dài trước.
const REPLACE = [
  ["TVHs-Labs-Video", "S6xEditer"], ["TVHs-Lab-Video-AI", "repo cũ"], ["tvhs-guideline", "brand-guideline"], ["tvhs-logo-icon", "logo-icon"], ["tvhs-logo", "logo"], ["tvhs-sample", "brand-sample"],
  ["Thành Vinh Holdings", "Công ty Mẫu"], ["Thanh Vinh Holdings", "Cong ty Mau"], ["ThanhVinhStudio", "S6xEditer"], ["thanhvinh", "s6x"], ["Thành Vinh", "Công ty Mẫu"],
  ["tvhs.asia", "example.com"], ["TVHS", "S6X"], ["TVHs", "S6x"], ["tvhs", "s6x"],
  ["anh Phương", "người dùng"], ["Anh Phương", "Người dùng"], ["Hướng dẫn sử dụng Trợ lý Pháp chế", "Hướng dẫn sử dụng phần mềm"],
];
const FORBIDDEN = /Thành Vinh|Thanh Vinh|TVH|tvhs|Total_AI|anh Phương|Anh Phương|D:[\\/]|C:[\\/]Users|gmail\.com|sk-ant-|AKIA|ghp_/;
const TEXT = new Set([".ts", ".tsx", ".mjs", ".js", ".cjs", ".json", ".md", ".txt", ".py", ".ps1", ".bat", ".html", ".css", ".svg", ".yml", ".yaml"]);
const MAX_FILE = 100 * 1024 * 1024;

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "s6x-"));
const tar = join(tmp, "head.tar");
execSync(`git archive --format=tar HEAD -o "${tar}"`, { stdio: "inherit" });
const untar = spawnSync("tar", ["-xf", "head.tar"], { cwd: tmp, stdio: "inherit" }); // GNU tar hiểu "C:" là máy từ xa
if (untar.status !== 0) throw new Error("Không giải nén được commit.");

for (const item of ALLOW) {
  const from = join(tmp, item);
  if (!existsSync(from)) throw new Error(`Danh sách cho phép có mục không tồn tại: ${item}`);
  mkdirSync(dirname(join(dest, item)), { recursive: true });
  cpSync(from, join(dest, item), { recursive: true });
}
cpSync("packaging/public", dest, { recursive: true });
// Ảnh chụp Editor có tên công ty trong hình, bộ quét chuỗi không đọc được ảnh.
rmSync(join(dest, "scripts/editor/public/design/screens"), { recursive: true, force: true });

// Thương hiệu mẫu: không chép logo thật.
const guideline = JSON.parse(readFileSync(join(tmp, "assets/brand/tvhs-guideline.json"), "utf8"));
delete guideline.source;
Object.assign(guideline, { brand: "S6xEditer", logo: "./logo.png" });
Object.assign(guideline.identity, { channel: "Công ty Mẫu", shortName: "S6X", url: "example.com", outroCta: "" });
guideline.identity.retiredTaglines = [];
guideline.narration.replacements = Object.fromEntries(Object.entries(guideline.narration.replacements).filter(([key]) => !/TVH/i.test(key)));
for (const dir of ["assets/brand", "public/brand"]) {
  mkdirSync(join(dest, dir), { recursive: true });
  writeFileSync(join(dest, dir, "brand-guideline.json"), `${JSON.stringify(guideline, null, 2)}\n`);
  const png = (name, filter) => execSync(`ffmpeg -y -hide_banner -loglevel error -f lavfi -i "${filter}" -frames:v 1 "${join(dest, dir, name)}"`);
  png("logo.png", "color=c=0xC5A059:s=256x256");
  png("logo-icon.png", "color=c=0xC5A059:s=64x64");
  png("watermark.png", "color=c=black@0.0:s=16x16,format=rgba");
}

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
const applyAll = (s) => REPLACE.reduce((out, [a, b]) => out.split(a).join(b), s);
const problems = [];
for (const file of walk(dest)) {
  const rel = file.slice(dest.length + 1);
  if (statSync(file).size > MAX_FILE) problems.push(`quá 100 MB: ${rel}`);
  if (FORBIDDEN.test(applyAll(rel))) problems.push(`tên file: ${rel}`);
  if (!TEXT.has(extname(file).toLowerCase())) continue;
  const before = readFileSync(file, "utf8");
  const after = applyAll(before);
  if (after !== before) writeFileSync(file, after);
  after.split("\n").forEach((line, i) => {
    if (FORBIDDEN.test(line)) problems.push(`${rel}:${i + 1}: ${line.trim().slice(0, 100)}`);
  });
  const renamed = join(dest, applyAll(rel));
  if (renamed !== file) renameSync(file, renamed);
}
rmSync(tmp, { recursive: true, force: true });

const pkg = JSON.parse(readFileSync(join(dest, "package.json"), "utf8"));
pkg.name = "s6xediter";
writeFileSync(join(dest, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
if (problems.length) {
  console.error(`DỪNG: còn ${problems.length} chỗ không được công khai.`);
  console.error(problems.slice(0, 80).join("\n"));
  process.exit(1);
}
console.log(`Xong: ${dest}`);
