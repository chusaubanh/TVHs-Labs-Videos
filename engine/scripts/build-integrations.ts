import { build } from "esbuild";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
const outdir = resolve("public/vendor/integrations");
mkdirSync(outdir, { recursive: true });
await build({ entryPoints: { "media-tools": "scripts/app/client/media-tools.js", "motion-canvas": "scripts/app/client/motion-canvas.js" }, outdir, bundle: true, format: "esm", platform: "browser", target: "chrome120", sourcemap: false, minify: true, legalComments: "eof", define: { "process.env.NODE_ENV": '"production"' }, loader: { ".svg": "text", ".png": "dataurl" } });
console.log("Đã dựng các bộ tích hợp cho trình duyệt.");