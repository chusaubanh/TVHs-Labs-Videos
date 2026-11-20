/**
 * Kho cảnh chuyển động editonny (MIT, Matheus Gomes) cho Chế độ C — CHỈ Chế độ C, không dùng cho luồng tài liệu.
 * Nguồn: bản clone của người dùng ở .research/repos/editonny (luật 6: chỉ đọc). Mỗi lần dùng chép một bản riêng vào
 * output/<job>/scenes/<tên>/ (giống editonny visuals/apply.py --use): HTML đã gỡ <template>, gsap cục bộ, font Việt,
 * và chỉ các file assets/… mà cảnh tham chiếu. Layer trỏ templateId "job:<tên>"; overlay-runtime tua __timelines.
 *
 * Luật 1: chữ mẫu (texts trong catalog: R$, +218%, lời chứng…) phải được AI sửa trong khối `var P` hoặc chữ HTML của
 * bản chép; th:render từ chối khi còn chữ mẫu (sceneSampleTexts).
 */
import { researchRoots } from "../integrations/research-paths.js";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { REPO_ROOT, jobDir, readJson } from "./jobs.js";
import { LayerSchema, TranscriptSchema, loadProject, saveProject, type Layer, type Project } from "./project-schema.js";

// Bản clone editonny của người dùng: EDITONNY_DIR, rồi .research/repos/editonny, rồi thư mục anh em ../editonny (máy anh Phương)
const EDITONNY_ROOTS = [process.env.EDITONNY_DIR, ...researchRoots(REPO_ROOT).map((p) => join(p, "editonny")), join(REPO_ROOT, "..", "editonny")].filter((d): d is string => !!d);
export const EDITONNY_VISUALS = join(EDITONNY_ROOTS.find((d) => existsSync(join(d, "skills", "editonny", "visuals", "catalog.json"))) ?? EDITONNY_ROOTS[0], "skills", "editonny", "visuals");
export const SCENE_TRACK = "t-editonny";

export interface CatalogScene {
  id: string;
  file: string;
  name: string;
  category: string;
  whenToUse: string;
  duration: number;
  format: string;
  layout: "fullscreen" | "frame" | "overlay";
  hidesCaptions?: boolean;
  texts?: string[];
  [k: string]: unknown;
}

function requireClone(): void {
  if (!existsSync(join(EDITONNY_VISUALS, "catalog.json")))
    throw new Error(`Chưa có kho cảnh editonny (đã tìm: ${EDITONNY_ROOTS.join(" | ")}). Đặt EDITONNY_DIR hoặc clone vào .research/repos/editonny.`);
}

export function loadCatalog(): CatalogScene[] {
  requireClone();
  return (JSON.parse(readFileSync(join(EDITONNY_VISUALS, "catalog.json"), "utf8")) as { scenes: CatalogScene[] }).scenes;
}

/** Cảnh gọi hàm không có trong chính file (do runtime editonny cấp) thì chưa chạy được. */
export function unsupportedReason(html: string): string | null {
  if (/\bcountNumber\s*\(/.test(html) && !/(function\s+countNumber|countNumber\s*=)/.test(html)) return "cần hàm countNumber của runtime editonny";
  if (!/<template[\s>]/.test(html)) return "không phải composition <template>";
  return null;
}

/**
 * Font Việt. Trình duyệt chọn mặt font theo ĐỘ ĐẬM trước rồi mới xét unicode-range, nên mặt vá phải có cùng mô tả
 * độ đậm/kiểu với mặt gốc (sinh đôi), và đặt SAU mặt gốc để thắng ở dải dấu Việt. Inter thì bỏ hẳn, thay bằng Be Vietnam Pro.
 */
const VN_FACES: [string, string][] = [["100 450", "Regular"], ["451 650", "SemiBold"], ["651 750", "Bold"], ["751 850", "ExtraBold"], ["851 1000", "Black"]];
const VN_RANGE = "U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB";
const REPLACED = "Inter";
const fileForWeight = (w: number) => (VN_FACES.find(([r]) => w <= Number(r.split(" ")[1])) ?? VN_FACES[4])[1];

/** Thuần: tách @font-face của template → (css đã bỏ mặt Inter, css vá Việt đặt sau). */
export function vietnameseFonts(css: string): { stripped: string; patch: string } {
  const faces: string[] = [];
  const stripped = css.replace(/@font-face\s*\{[^}]*\}/g, (face) => {
    const fam = (face.match(/font-family:\s*["']?([^"';}]+)["']?/) ?? [])[1]?.trim();
    if (!fam) return face;
    if (fam === REPLACED) return "";
    const wd = (face.match(/font-weight:\s*([^;}]+)/) ?? [])[1]?.trim() ?? "400";
    const st = (face.match(/font-style:\s*([^;}]+)/) ?? [])[1]?.trim();
    const w = Number(wd.split(/\s+/).pop()) || (wd === "bold" ? 700 : 400);
    faces.push(`@font-face{font-family:"${fam}";src:url("vn-fonts/BeVietnamPro-${fileForWeight(w)}.ttf");font-weight:${wd};${st ? `font-style:${st};` : ""}font-display:block;unicode-range:${VN_RANGE}}`);
    return face;
  });
  for (const [w, f] of VN_FACES) faces.push(`@font-face{font-family:"${REPLACED}";src:url("vn-fonts/BeVietnamPro-${f}.ttf");font-weight:${w};font-display:block}`);
  return { stripped, patch: faces.join("\n") };
}

/**
 * Thuần: HTML editonny → trang độc lập cho iframe của overlay-runtime.
 * duration lấy từ biến sceneDuration mà runtime tiêm (đổi độ dài layer không cần chép lại), start/words nướng sẵn.
 */
export function standaloneScene(html: string, sceneId: string, ctx: { duration: number; start: number; words: { text: string; t: number; end: number }[] }): string {
  const m = html.match(/<template[^>]*>([\s\S]*)<\/template>/);
  if (!m) throw new Error(`${sceneId}: không thấy <template>`);
  const { stripped, patch } = vietnameseFonts(m[1]);
  const C = { start: ctx.start, words: ctx.words };
  return `<!doctype html><html><head><meta charset="UTF-8"/>
<script src="gsap.min.js"></script>
<script>(function(){var V=window.__HYPERFRAMES_VARIABLES__||{};var c=${JSON.stringify(C).replace(/</g, "\\u003c")};c.duration=Number(V.sceneDuration)||${ctx.duration};window.__scenes={};window.__scenes[${JSON.stringify(sceneId)}]=c;})();</script>
<style>html,body{margin:0;padding:0;width:1080px;height:1920px;overflow:hidden;background:transparent}</style>
</head><body>
${stripped}
<style>${patch}</style>
</body></html>`;
}

/** Các đường dẫn assets/… mà cảnh tham chiếu (src=, href=, url()). */
export const referencedAssets = (html: string): string[] =>
  [...new Set([...html.matchAll(/(?:src=|href=|url\()\s*["']?(assets\/[^"')\s>]+)/g)].map((x) => x[1]))];

/**
 * Vùng người xem thấy và AI được dặn sửa: khối `var P` + HTML ngoài <script>/<style>.
 * Không xét chuỗi dựng trong JS (vd giá trị dự phòng `P.items || "Take 1|…"`): sửa P là đủ, dự phòng không hiện ra.
 */
export function editableRegion(html: string): string {
  const p = (html.match(/var P\s*=\s*\{[\s\S]*?\n\s*\};/) ?? [""])[0];
  return p + "\n" + html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "");
}

/** Chữ mẫu (catalog texts + mặc định var P) còn nằm trong vùng sửa được: giữa dấu nháy, giữa thẻ, hoặc trong danh sách |. */
export function sampleTextsLeft(html: string, texts: string[]): string[] {
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const region = editableRegion(html);
  return texts.filter((t) => {
    const num = t.match(/^P\.(\w+)=(-?[\d.]+)$/);
    if (num) return new RegExp(`\\b${num[1]}\\s*:\\s*${esc(num[2])}\\s*,`).test(region);
    return t.trim().length > 1 && new RegExp(`["'>|]\\s*${esc(t.trim())}\\s*["'<|]`).test(region);
  });
}

/** Chữ mặc định trong khối `var P = {…}` (giá trị chuỗi có chữ cái), tách theo "|". Ghi lại lúc chép để th:render đối chiếu. */
export function pDefaults(html: string): string[] {
  const m = html.match(/var P\s*=\s*\{([\s\S]*?)\n\s*\};/);
  if (!m) return [];
  const vals = [...m[1].matchAll(/:\s*"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1]);
  const texts = vals.flatMap((v) => v.split("|")).map((v) => v.trim()).filter((v) => v.length > 1 && /\p{L}/u.test(v) && !/^(#|rgb|https?:|[a-z-]+\(|\d+(px|%|s)$)/i.test(v) && !/^[a-z][a-z-]{0,11}$/.test(v)); // một từ thường = tuỳ chọn (off, both, left…), không phải chữ hiện ra
  // số mẫu (giá, lượt xem…): ghi dạng "P.<khoá>=<số>"; bỏ số 0 (editonny: 0 = ẩn số) và khoá bố cục
  const nums = [...m[1].matchAll(/(\w+):\s*(-?\d[\d.]*)\s*,/g)]
    .filter(([, k, v]) => Number(v) !== 0 && /(value|count|price|number|total|percent|amount|views|sales|target|area|rooms|floors|units)/i.test(k))
    .map(([, k, v]) => `P.${k}=${v}`);
  return [...new Set([...texts, ...nums])];
}

function findAsset(rel: string): string | null {
  const direct = join(EDITONNY_VISUALS, rel);
  if (existsSync(direct)) return direct;
  // một số video nằm trong library/, media.json ghi nơi thật
  const mediaFile = join(EDITONNY_VISUALS, "media.json");
  if (!existsSync(mediaFile)) return null;
  const txt = readFileSync(mediaFile, "utf8");
  const base = rel.split("/").pop()!;
  const hit = [...txt.matchAll(/"([^"]*\/[^"/]+)"/g)].map((x) => x[1]).find((p) => p.endsWith("/" + base) && existsSync(join(EDITONNY_VISUALS, p)));
  return hit ? join(EDITONNY_VISUALS, hit) : null;
}

/** Layer cho cảnh đã chép; đi qua LayerSchema để project.json luôn nạp lại được. */
export function sceneLayer(name: string, sceneId: string, start: number, end: number, layout: CatalogScene["layout"]): Layer {
  return LayerSchema.parse({
    id: `E-${name}`, type: "scene", start: +start.toFixed(3), duration: +(end - start).toFixed(3),
    x: 0, y: 0, w: 100, h: 100,
    templateId: `job:${name}`,
    animation: { in: { kind: "none", dur: 0 }, out: { kind: "none", dur: 0 } },
    meta: { source: "user", category: "editonny", presetId: sceneId, overlay: layout !== "fullscreen" },
  });
}

export async function useScene(job: string, sceneId: string, start: number, end: number): Promise<void> {
  const scene = loadCatalog().find((s) => s.id === sceneId);
  if (!scene) throw new Error(`Không có cảnh "${sceneId}". Xem danh sách: npm run th:scene -- <job> --list`);
  if (!(end > start)) throw new Error("--end phải lớn hơn --start (giây trên timeline đã cắt).");
  const dir = jobDir(job);
  const projectFile = join(dir, "project.json");
  if (!existsSync(projectFile)) throw new Error("Chạy th:project trước.");
  const project = await loadProject(projectFile);
  const html = readFileSync(join(EDITONNY_VISUALS, "scenes", `${sceneId}.html`), "utf8");
  const bad = unsupportedReason(html);
  if (bad) throw new Error(`Cảnh "${sceneId}" chưa chạy được ở Chế độ C: ${bad}.`);

  // từ trong khoảng cảnh, mốc tính từ đầu cảnh (đúng dạng C.words của editonny)
  const cutTr = join(dir, "transcript.cut.json");
  const mapFile = join(dir, "cut-map.json");
  const offset = existsSync(mapFile) ? ((await readJson<{ introOffset?: number }>(mapFile)).introOffset ?? 0) : 0;
  const words = existsSync(cutTr)
    ? (await readJson(cutTr, TranscriptSchema)).segments.flatMap((s) => s.words)
        .map((w) => ({ text: w.text, t: +(w.start + offset - start).toFixed(3), end: +(w.end + offset - start).toFixed(3) }))
        .filter((w) => w.end > 0 && w.t < end - start)
    : [];

  const taken = new Set(project.tracks.flatMap((t) => t.layers).map((l) => l.templateId));
  let n = 1;
  while (taken.has(`job:${sceneId}-${n}`) || existsSync(join(dir, "scenes", `${sceneId}-${n}`))) n++;
  const name = `${sceneId}-${n}`;
  const out = join(dir, "scenes", name);
  mkdirSync(join(out, "vn-fonts"), { recursive: true });
  writeFileSync(join(out, "index.html"), standaloneScene(html, sceneId, { duration: end - start, start, words }), "utf8");
  copyFileSync(join(REPO_ROOT, "node_modules", "gsap", "dist", "gsap.min.js"), join(out, "gsap.min.js"));
  for (const [, f] of VN_FACES) copyFileSync(join(REPO_ROOT, "assets", "fonts", `BeVietnamPro-${f}.ttf`), join(out, "vn-fonts", `BeVietnamPro-${f}.ttf`));
  writeFileSync(join(out, "sample-texts.json"), JSON.stringify([...new Set([...(scene.texts ?? []), ...pDefaults(html)])], null, 1), "utf8");
  const missing: string[] = [];
  for (const rel of referencedAssets(html)) {
    const from = findAsset(rel);
    if (!from) { missing.push(rel); continue; }
    mkdirSync(dirname(join(out, rel)), { recursive: true });
    copyFileSync(from, join(out, rel));
  }

  let track = project.tracks.find((t) => t.id === SCENE_TRACK);
  if (!track) {
    track = { id: SCENE_TRACK, kind: "scene", name: "Cảnh editonny", hidden: false, locked: false, layers: [] };
    project.tracks.unshift(track); // đầu mảng = trên cùng
  }
  const layer = sceneLayer(name, sceneId, start, end, scene.layout);
  track.layers.push(layer);
  project.revision = (project.revision ?? 0) + 1; // editor đang mở lưu bản cũ sẽ nhận 409 thay vì ghi đè layer này
  await saveProject(projectFile, project);

  const left = sampleTextsLeft(readFileSync(join(out, "index.html"), "utf8"), JSON.parse(readFileSync(join(out, "sample-texts.json"), "utf8")));
  console.log(`Đã thêm cảnh ${name} (${scene.name}, ${scene.layout}, mẫu ${scene.duration}s) lúc ${start}–${end}s, file ${join(out, "index.html")}`);
  if (scene.format !== project.aspect) console.log(`  Cảnh vẽ cho ${scene.format}, video là ${project.aspect}: cảnh được thu vừa khung, có thể có viền. Soi trong editor.`);
  if (missing.length) console.log(`  THIẾU ${missing.length} file: ${missing.join(", ")}`);
  if (left.length) console.log(`  Còn ${left.length} chữ mẫu phải thay bằng nội dung thật trong file trên (khối var P hoặc chữ HTML), th:render sẽ từ chối nếu còn: ${left.join(" · ")}`);
  if (scene.layout === "frame") console.log("  Cảnh dạng panel nửa trên: editonny dời người nói xuống khung dưới (y≈912/1920). Mình chưa tự làm; dùng videoMoves chế độ pip trong editor cho khoảng này, nếu không panel sẽ đè lên mặt.");
  if (scene.hidesCaptions) console.log("  Cảnh này che phụ đề: cân nhắc ẩn phụ đề trong khoảng này.");
}

/** Lỗi luật 1 cho th:render: cảnh editonny còn chữ mẫu (catalog texts + mặc định var P, ghi ở sample-texts.json lúc chép). */
export function sceneSampleTexts(project: Project, job: string): string[] {
  const layers = project.tracks.filter((t) => !t.hidden).flatMap((t) => t.layers).filter((l) => l.type === "scene" && l.templateId?.startsWith("job:"));
  const out: string[] = [];
  for (const l of layers) {
    const name = l.templateId!.slice(4);
    const d = join(jobDir(job), "scenes", name);
    if (!existsSync(join(d, "index.html"))) { out.push(`${name}: thiếu index.html`); continue; }
    if (!existsSync(join(d, "sample-texts.json"))) { out.push(`${name}: thiếu sample-texts.json (chép lại bằng th:scene)`); continue; }
    const left = sampleTextsLeft(readFileSync(join(d, "index.html"), "utf8"), JSON.parse(readFileSync(join(d, "sample-texts.json"), "utf8")));
    if (left.length) out.push(`${name}: ${left.join(" · ")}`);
  }
  return out;
}

export function printCatalog(filter?: string): void {
  const q = (filter ?? "").toLowerCase();
  const rows = loadCatalog().filter((s) => !q || `${s.id} ${s.category} ${s.name} ${s.whenToUse}`.toLowerCase().includes(q));
  for (const s of rows) {
    const html = readFileSync(join(EDITONNY_VISUALS, "scenes", `${s.id}.html`), "utf8");
    const bad = unsupportedReason(html);
    console.log(`${s.id.padEnd(28)} ${s.category.padEnd(14)} ${s.layout.padEnd(10)} ${String(s.duration).padStart(4)}s ${bad ? `[CHƯA CHẠY: ${bad}] ` : ""}${s.layout === "frame" ? "[cần dời người nói xuống khung dưới] " : ""}${s.whenToUse}`);
  }
  console.log(`${rows.length} cảnh.`);
}

/**
 * Khung cảnh RIÊNG cho job (không thư viện chung): output/<job>/scenes/<tên>/index.html, gọi trong broll-plan bằng
 * templateId "job:<tên>". Cùng định dạng cảnh editonny đã chạy được (GSAP timeline paused ở window.__timelines, runtime tua).
 * overlay: nền trong suốt, minh hoạ ở nửa `side`, chừa dải phụ đề (y 68–88%) và nửa có người nói.
 * cutaway: nền ink đặc, người nói biến mất. AI thay phần VẼ trong khung; ưu tiên hình, chữ ≤ 4 từ và chỉ lấy từ lời giảng.
 */
export function customSceneHtml(o: { name: string; kind: "overlay" | "cutaway"; side: "left" | "right"; width: number; height: number }): string {
  const zone = o.kind === "cutaway" ? "left:8%;right:8%;top:8%;bottom:34%" : o.side === "left" ? "left:4%;width:46%;top:8%;bottom:34%" : "right:4%;width:46%;top:8%;bottom:34%";
  return `<!doctype html><html><head><meta charset="UTF-8"/>
<script src="gsap.min.js"></script>
<style>
@font-face{font-family:"BVP";src:url("vn-fonts/BeVietnamPro-Bold.ttf");font-weight:700}
@font-face{font-family:"BVP";src:url("vn-fonts/BeVietnamPro-Black.ttf");font-weight:900}
html,body{margin:0;width:${o.width}px;height:${o.height}px;overflow:hidden;background:${o.kind === "cutaway" ? "#0C0C0C" : "transparent"}}
#root{position:absolute;inset:0;font-family:"BVP",sans-serif;color:#EDEDED}
#zone{position:absolute;${zone};display:flex;align-items:center;justify-content:center}
#zone svg{width:100%;height:100%;overflow:visible}
.label{font-weight:900;fill:#EDEDED}
.accent{fill:#C5A059;stroke:#C5A059}
</style></head><body>
<!-- ${o.name} (${o.kind}${o.kind === "overlay" ? `, minh hoạ bên ${o.side === "left" ? "trái" : "phải"}` : ""}). Khung ${o.width}×${o.height}.
     Luật: chỉ nội dung trong lời giảng; hình trước, chữ sau (≤ 4 từ); không vẽ lên người nói; vàng #C5A059 là màu nhấn duy nhất, đỏ chỉ cho "sai".
     Mốc: V.delays[i] = giây (tính từ đầu cảnh) khi từ thứ i trong "cues" của beat được nói; th:broll đặt tiếng pop đúng các mốc này. -->
<div id="root" data-width="${o.width}" data-height="${o.height}">
  <div id="zone">
    <svg viewBox="0 0 600 600">
      <!-- VẼ MINH HOẠ Ở ĐÂY: mỗi phần tử xuất hiện theo một mốc, id e0, e1, … -->
      <g id="e0"><circle cx="300" cy="260" r="120" fill="none" stroke="#EDEDED" stroke-width="10"/></g>
      <g id="e1"><circle class="accent" cx="300" cy="260" r="40"/></g>
    </svg>
  </div>
</div>
<script>
(function () {
  var V = window.__HYPERFRAMES_VARIABLES__ || {};
  var D = Number(V.sceneDuration) || 4, d = V.delays || [];
  var at = function (i, fallback) { return d[i] != null ? d[i] : fallback; };
  var tl = gsap.timeline({ paused: true });
  // mỗi phần tử: bật vào ở mốc của nó (pop), giữ tới cuối, cùng mờ ra ở 0,35 s cuối
  ["#e0", "#e1"].forEach(function (sel, i) {
    tl.fromTo(sel, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: true }, at(i, 0.2 + i * 0.6));
  });
  tl.to("#zone", { opacity: 0, duration: 0.35, ease: "power2.in" }, Math.max(0, D - 0.35));
  tl.to({}, { duration: D }, 0);
  window.__timelines = window.__timelines || {};
  window.__timelines[${JSON.stringify(o.name)}] = tl;
})();
</script>
</body></html>
`;
}

export async function newCustomScene(job: string, name: string, kind: "overlay" | "cutaway", side: "left" | "right"): Promise<void> {
  if (!/^[a-z0-9-]+$/.test(name)) throw new Error("Tên cảnh chỉ gồm a-z, 0-9, dấu gạch ngang.");
  const dir = jobDir(job);
  const project = await loadProject(requireProject(dir));
  const out = join(dir, "scenes", name);
  if (existsSync(join(out, "index.html"))) throw new Error(`Đã có ${join(out, "index.html")} — sửa trực tiếp, không ghi đè.`);
  mkdirSync(join(out, "vn-fonts"), { recursive: true });
  writeFileSync(join(out, "index.html"), customSceneHtml({ name, kind, side, width: project.width, height: project.height }), "utf8");
  copyFileSync(join(REPO_ROOT, "node_modules", "gsap", "dist", "gsap.min.js"), join(out, "gsap.min.js"));
  for (const f of ["Bold", "Black"]) copyFileSync(join(REPO_ROOT, "assets", "fonts", `BeVietnamPro-${f}.ttf`), join(out, "vn-fonts", `BeVietnamPro-${f}.ttf`));
  writeFileSync(join(out, "sample-texts.json"), "[]", "utf8"); // cảnh tự vẽ: không có chữ mẫu của bên thứ ba
  console.log(`Khung cảnh ${kind}: ${join(out, "index.html")}\nTrong broll-plan.json: { "kind": "${kind}", "templateId": "job:${name}"${kind === "overlay" ? `, "side": "${side}"` : ""}, "cues": [{ "phrase": "…" }, …] }`);
}

function requireProject(dir: string): string {
  const f = join(dir, "project.json");
  if (!existsSync(f)) throw new Error("Chạy th:project trước.");
  return f;
}
