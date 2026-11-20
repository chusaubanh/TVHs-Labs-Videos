/** Chuẩn bị bản chia sẻ từ snapshot làm việc đã chọn, không sửa hoặc xoá nguồn. */
import { createHash, randomUUID } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, renameSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { assertReleaseDestination } from "../src/integrations/release-policy.mjs";
import { deflateSync, crc32 } from "node:zlib";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ALLOW = [
  "package.json", "package-lock.json", "tsconfig.json", "vitest.config.ts", "remotion.config.ts", "Mo-ung-dung.bat", ".env.example",
  "requirements-vieneu.lock.txt", "requirements-asr.lock.txt", "samples", "input/Pha-tra", "fixtures",
  "src/videos/mau", "tests", "src/integrations", "src/training", "src/audio", "src/remotion", "src/kit", "src/gates", "src/fixtures", "src/engine", "src/studio", "src/talking-head",
  "scripts/asr", "scripts/editor", "scripts/app", "scripts/th-presets",
  "scripts/doctor.ps1", "scripts/setup-windows.ps1", "scripts/setup-asr.ps1", "scripts/start-app.ps1", "scripts/install-ffmpeg.ps1", "scripts/open-studio.ps1", "scripts/music-analyze.py", "scripts/vieneu-server.py",
  "scripts/stills.ts", "scripts/render-tools.ts", "scripts/local-tmp.ts", "scripts/pipeline-runner.ts", "scripts/finish-audio.ts", "scripts/capcut-export.ts", "scripts/gate-determinism.ts", "scripts/qc-ffmpeg.ts",
  "scripts/research-repos.ts", "scripts/bake-rapier.ts", "scripts/bake-motion-canvas.ts", "scripts/build-integrations.ts", "scripts/media-cli.ts", "scripts/verify-release.mjs", "scripts/verify-app.mjs", "scripts/verify-media.ts", "scripts/archive-release.ps1", "scripts/setup-models.py", "scripts/setup-models.ts", "scripts/optimize-svg.mjs", "scripts/pan-audio.ts",
  "assets/fonts", "assets/sfx-th", "assets/th-presets", "assets/voices", "public/fonts", "public/vendor", "public/fixtures",
  "docs/tool-guides", "docs/QUY-TRINH.md", "docs/CHE-DO-C.md", "docs/QUY-CHUAN-HINH.md", "docs/QUY-CHUAN-KICH-BAN.md",
  "docs/tham-khao-repo-cu/CHE-DO-C-SPEC.md", "docs/tham-khao-repo-cu/BROLL-GUIDE.md", "docs/tham-khao-repo-cu/QUY-TRINH-VIDEO-HUONG-DAN-QUAY-MAN-HINH.md",
];
const REPLACE = [
  ["TVHs-Labs-Video", "S6xEditer"], ["TVHs-Lab-Video-AI", "repo cũ"], ["tvhs-guideline", "brand-guideline"], ["tvhs-logo-icon", "logo-icon"], ["tvhs-logo", "logo"], ["tvhs-sample", "brand-sample"],
  ["Thành Vinh Holdings", "Công ty Mẫu"], ["Thanh Vinh Holdings", "Cong ty Mau"], ["ThanhVinhStudio", "S6xEditer"], ["thanhvinh", "s6x"], ["Thành Vinh", "Công ty Mẫu"],
  ["tvhs.asia", "example.com"], ["TVHS", "S6X"], ["TVHs", "S6x"], ["tvhs", "s6x"],
  ["anh Phương", "người dùng"], ["Anh Phương", "Người dùng"], ["Hướng dẫn sử dụng Trợ lý Pháp chế", "Hướng dẫn sử dụng phần mềm"],
];
const FORBIDDEN = /Thành Vinh|Thanh Vinh|TVH|tvhs|Total_AI|anh Phương|Anh Phương|D:[\\/]|C:[\\/]Users|gmail\.com|sk-ant-|AKIA|ghp_/;
const TEXT = new Set([".ts", ".tsx", ".mjs", ".js", ".cjs", ".json", ".md", ".txt", ".py", ".ps1", ".bat", ".html", ".css", ".svg", ".yml", ".yaml"]);
const applyAll = (value) => REPLACE.reduce((out, [a,b]) => out.split(a).join(b), value);
const slash = (path) => path.replace(/\\/g, "/");
const excluded = (path) => /(^|\/)(__pycache__|node_modules|\.git|\.cache)(\/|$)/.test(path) || /scripts\/editor\/(qa[^/]*|public\/design\/(screens|shot\.sh))/.test(path) || path === "scripts/asr/matte_rvm.py";
const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  if (entry.isSymbolicLink()) throw new Error(`Không đưa liên kết tượng trưng vào bản chia sẻ: ${entry.name}`);
  const path = join(directory, entry.name); return entry.isDirectory() ? walk(path) : [path];
});

function png(width, height, color) {
  const raw = Buffer.alloc(height * (width * 4 + 1));
  for (let y=0;y<height;y++) for(let x=0;x<width;x++) for(let c=0;c<4;c++) raw[y*(width*4+1)+1+x*4+c]=color[c];
  const chunk = (type, data) => { const size=Buffer.alloc(4), check=Buffer.alloc(4), body=Buffer.concat([Buffer.from(type),data]); size.writeUInt32BE(data.length);check.writeUInt32BE(crc32(body));return Buffer.concat([size,body,check]); };
  const header=Buffer.alloc(13);header.writeUInt32BE(width);header.writeUInt32BE(height,4);header[8]=8;header[9]=6;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk("IHDR",header),chunk("IDAT",deflateSync(raw)),chunk("IEND",Buffer.alloc(0))]);
}

export function packagePublic(destination) {
  const target = assertReleaseDestination(destination, ROOT);
  const staging = join(ROOT, ".cache", "releases", randomUUID(), "S6xEditer"); mkdirSync(staging, { recursive: true });
  for (const item of ALLOW) {
    const source = join(ROOT, item); if (!existsSync(source)) throw new Error(`Thiếu thành phần cần đóng gói: ${item}`);
    cpSync(source, join(staging, item), { recursive: true, filter: (file) => { const rel=slash(relative(ROOT,file)); if (excluded(rel)) return false; const real=realpathSync(file); if (!real.startsWith(ROOT+sep)) throw new Error(`Nguồn thoát dự án: ${rel}`); return true; } });
  }
  cpSync(join(ROOT,"packaging/public"), staging, { recursive: true });
  const guideline = { brand: "S6xEditer", logo: "./logo.png", watermark: "./watermark.png",
    identity: { channel: "Công ty Mẫu", shortName: "S6X", url: "example.com", tagline: "", retiredTaglines: [], outroCta: "Kết thúc" },
    narration: { replacements: {} }, palette: { ink: "#0C0C0C", gold: "#C5A059", text: "#EDEDED" },
    semantic: { positive: "#22C55E", negative: "#EF4444", info: "#3B82F6" },
    personas: { training: { label: "Đào tạo", docTypes: ["training", "A", "B", "C"], addressing: "mình – bạn", defaultVoiceStyle: "tu_nhien", voiceGuide: ["Đọc rõ, tự nhiên, trung thành với nguồn."], hookGuide: "Dẫn vào nội dung từ tài liệu.", ctaGuide: "Chỉ dùng nội dung trong nguồn." } } };
  for(const directory of ["assets/brand","public/brand"]){
    const out=join(staging,directory);mkdirSync(out,{recursive:true});
    writeFileSync(join(out,"brand-guideline.json"),JSON.stringify(guideline,null,2));
    writeFileSync(join(out,"logo.png"),png(128,128,[197,160,89,255]));
    writeFileSync(join(out,"logo-icon.png"),png(64,64,[197,160,89,255]));
    writeFileSync(join(out,"watermark.png"),png(16,16,[0,0,0,0]));
  }
  const problems=[];
  for(const file of walk(staging)){
    const rel=slash(relative(staging,file));
    if(statSync(file).size>100*1024*1024)problems.push({file:rel,reason:"Tệp quá 100 MB"});
    if(!TEXT.has(extname(file).toLowerCase()) && ![".env.example", ".gitignore"].includes(relative(staging,file)))continue;
    const before=readFileSync(file,"utf8"), after=applyAll(before);
    if(before!==after)writeFileSync(file,after);
    after.split(/\r?\n/).forEach((line,i)=>{if(FORBIDDEN.test(line))problems.push({file:rel,line:i+1,reason:"Còn chuỗi nội bộ/đường dẫn riêng hoặc dấu hiệu khoá truy cập"});});
    const renamed=join(staging,applyAll(relative(staging,file)));if(renamed!==file)renameSync(file,renamed);
  }
  if(problems.length){const report=join(ROOT,"output","release-review.json");mkdirSync(dirname(report),{recursive:true});writeFileSync(report,JSON.stringify({staging,problems},null,2));throw new Error(`Chưa tạo bản chia sẻ: còn ${problems.length} mục cần xử lý. Báo cáo: ${report}`);}
  const pkg=JSON.parse(readFileSync(join(staging,"package.json"),"utf8"));pkg.name="s6xediter";pkg.author="S6xEditer contributors";delete pkg.scripts["release:prepare"];delete pkg.scripts.graph;
  writeFileSync(join(staging,"package.json"),JSON.stringify(pkg,null,2)+"\n");
  const lock=JSON.parse(readFileSync(join(staging,"package-lock.json"),"utf8"));lock.name=pkg.name;lock.packages[""].name=pkg.name;writeFileSync(join(staging,"package-lock.json"),JSON.stringify(lock,null,2)+"\n");
  const dependencies=[];
  for(const name of Object.keys({...pkg.dependencies,...pkg.devDependencies})){
    const directory=join(ROOT,"node_modules",name);const metadata=JSON.parse(readFileSync(join(directory,"package.json"),"utf8"));
    dependencies.push({name,version:metadata.version,license:metadata.license??null,repository:metadata.repository??null});
    const notices=readdirSync(directory).filter((file)=>/^(license|copying|notice)([.-]|$)/i.test(file)&&statSync(join(directory,file)).isFile());
    for(const notice of notices){const out=join(staging,"THIRD-PARTY-LICENSES",name.replace(/[^a-z0-9.-]/gi,"_"),notice);mkdirSync(dirname(out),{recursive:true});cpSync(join(directory,notice),out);}
  }
  writeFileSync(join(staging,"RUNTIME-DEPENDENCIES.json"),JSON.stringify(dependencies,null,2));
  const files=walk(staging).map((file)=>({path:slash(relative(staging,file)),bytes:statSync(file).size,sha256:createHash("sha256").update(readFileSync(file)).digest("hex")}));
  writeFileSync(join(staging,"release-manifest.json"),JSON.stringify({version:pkg.version,createdAt:new Date().toISOString(),source:"allowlisted-working-tree",privacyScan:"passed",files},null,2));
  mkdirSync(dirname(target),{recursive:true});renameSync(staging,target);console.log(`Đã chuẩn bị bản chia sẻ: ${target} (${files.length} tệp). Chưa công bố lên mạng.`);
  return target;
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const destination=process.argv[2];if(!destination)throw new Error("Cú pháp: npm run release:prepare -- output/releases/<tên-bản-mới>");
  packagePublic(destination);
}