import "./local-tmp.js";
import "../src/integrations/runtime-environment.js";
import { createServer } from "node:http";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { createHash } from "node:crypto";
import { ensureBrowser, openBrowser } from "@remotion/renderer";
import { GL } from "../src/training/hardware.js";
import { MotionCanvasSpec } from "../src/integrations/motion-canvas-spec.js";

const [specPath, outputPath, mode] = process.argv.slice(2);
if (!specPath || !outputPath) throw new Error("Cú pháp: npm run motion:bake -- <spec.json> <thư mục output> [--check]");
const spec = MotionCanvasSpec.parse(JSON.parse(readFileSync(specPath, "utf8")));
const out = resolve(outputPath); mkdirSync(out, { recursive: true });
const bundle = readFileSync(resolve("public/vendor/integrations/motion-canvas.js"));
const server = createServer((req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.url === "/worker.js") { res.setHeader("Content-Type", "text/javascript"); res.end(bundle); }
  else { res.setHeader("Content-Type", "text/html"); res.end('<!doctype html><html><body><script type="module" src="/worker.js"></script></body></html>'); }
});
await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
const address = server.address(); if (!address || typeof address === "string") throw new Error("Không mở được worker.");
await ensureBrowser();
const browser = await openBrowser("chrome", { chromiumOptions: { gl: GL } });
try {
  const page = await browser.newPage({ context: () => null, logLevel: "error", indent: false, pageIndex: 0, onBrowserLog: null, onLog: () => {} });
  await page.goto({ url: `http://127.0.0.1:${address.port}`, timeout: 30000 });
  await page.evaluate(async () => { for (let i = 0; i < 200 && !(window as any).motionCanvasWorker; i++) await new Promise((r) => setTimeout(r, 50)); if (!(window as any).motionCanvasWorker) throw new Error("Worker không nạp được"); });
  await page.evaluate((value) => (window as any).motionCanvasWorker.configure(value), spec);
  const hashes: Record<number, string> = {};
  const shot = async (frame: number) => {
    const data = await page.evaluate(async (n) => (window as any).motionCanvasWorker.frame(n), frame);
    const png = Buffer.from(String(data).split(",")[1], "base64");
    return { png, hash: createHash("sha256").update(png).digest("hex") };
  };
  const frames = mode === "--check" ? [...new Set([0, Math.floor(spec.frames / 3), Math.floor(spec.frames * 2 / 3), spec.frames - 1])] : Array.from({ length: spec.frames }, (_, i) => i);
  for (const frame of frames) { const { png, hash } = await shot(frame); hashes[frame] = hash; writeFileSync(join(out, `${String(frame).padStart(6, "0")}.png`), png); }
  if (new Set(Object.values(hashes)).size < 2) console.log(await page.evaluate(() => (window as any).motionCanvasWorker.debug()));
  if (new Set(Object.values(hashes)).size < 2) throw new Error("Motion Canvas không tạo ra chuyển động.");
  const checkedFrames = [...new Set([0, Math.floor(spec.frames / 3), Math.floor(spec.frames * 2 / 3), spec.frames - 1])];
  for (const frame of checkedFrames.reverse()) if ((await shot(frame)).hash !== hashes[frame]) throw new Error(`Motion Canvas không tất định tại frame ${frame}`);
  writeFileSync(join(out, "manifest.json"), JSON.stringify({ engine: "@motion-canvas/core@3.17.2", spec, frames: hashes, determinism: "passed", checkedFrames, complete: mode !== "--check" }, null, 2));
  console.log(`ĐẠT Motion Canvas: ${frames.length} frame, lặp lại và thứ tự đảo cùng hash. Đầu ra: ${out}`);
} finally { await browser.close({ silent: true }); await new Promise<void>((done) => server.close(() => done())); }