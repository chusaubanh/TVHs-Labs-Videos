import { existsSync } from "node:fs";
import { resolve, sep } from "node:path";
/** Chỉ tạo bản phát hành trong thư mục con mới; không xoá nguồn hoặc ghi đè bản cũ. */
export function assertReleaseDestination(destination, root = process.cwd()) {
  const base = resolve(root, "output", "releases"), target = resolve(destination);
  if (!target.startsWith(base + sep) || target === base) throw new Error("Đích phải là thư mục con mới trong output/releases/.");
  if (existsSync(target)) throw new Error("Đích đã tồn tại. Chọn thư mục mới; bộ đóng gói không xoá hay ghi đè bản cũ.");
  return target;
}