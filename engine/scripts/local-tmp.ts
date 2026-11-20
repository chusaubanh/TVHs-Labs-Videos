/**
 * Remotion, bundler và Chrome ghi file tạm vào os.tmpdir(). Dồn về `.cache/tmp` của repo
 * để không làm đầy ổ C và xoá được một lần. Phải import trước mọi module của Remotion;
 * tiến trình con (npx remotion, Chrome) thừa hưởng biến môi trường này.
 * Chạy trực tiếp `tsx scripts/local-tmp.ts --clean` để xoá.
 */
import { mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

export const LOCAL_TMP = resolve(".cache", "tmp");

mkdirSync(LOCAL_TMP, { recursive: true });
process.env.TEMP = process.env.TMP = process.env.TMPDIR = LOCAL_TMP;

export function clearLocalTmp(): void {
  rmSync(LOCAL_TMP, { recursive: true, force: true });
}

if (/local-tmp\.ts$/.test(process.argv[1] ?? "") && process.argv.includes("--clean")) {
  clearLocalTmp();
  console.log(`Đã xoá file tạm: ${LOCAL_TMP}`);
}
