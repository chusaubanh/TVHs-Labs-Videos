import { createHash } from "node:crypto";
import { existsSync, readFileSync, realpathSync, statSync } from "node:fs";
import { join, resolve, sep } from "node:path";
const root = resolve(process.argv[2] ?? ".");
const manifest = JSON.parse(readFileSync(join(root,"release-manifest.json"),"utf8"));
let count=0;
for(const entry of manifest.files){
  const file=resolve(root,entry.path);
  if(!file.startsWith(root+sep) || !existsSync(file) || !realpathSync(file).startsWith(realpathSync(root)+sep)) throw new Error(`Đường dẫn không hợp lệ: ${entry.path}`);
  if(statSync(file).size!==entry.bytes || createHash("sha256").update(readFileSync(file)).digest("hex")!==entry.sha256) throw new Error(`File không khớp manifest: ${entry.path}`);
  count++;
}
for(const privatePath of [".env.local","research-repos.local.json",".research","models","public/jobs"]) if(existsSync(join(root,privatePath))) throw new Error(`Có dữ liệu riêng ngoài snapshot: ${privatePath}`);
console.log(`ĐẠT manifest: ${count} tệp có kích thước và SHA-256 khớp, không có các thư mục dữ liệu riêng đã chặn.`);