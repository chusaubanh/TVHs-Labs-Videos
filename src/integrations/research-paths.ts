import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

export const RESEARCH_CONFIG = "research-repos.local.json";

/** Chỉ tìm nguồn; không cài đặt, chạy hoặc ghi vào các bản clone. */
export function researchRoots(root = process.cwd(), env = process.env): string[] {
  const file = join(root, RESEARCH_CONFIG);
  let configured: string | undefined;
  if (existsSync(file)) {
    const config = JSON.parse(readFileSync(file, "utf8"));
    if (typeof config.root !== "string" || !config.root.trim()) throw new Error(`${file}: root phải là đường dẫn không rỗng.`);
    configured = config.root;
  }
  return [...new Set([env.TVHS_RESEARCH_ROOT, configured, join(root, ".research", "repos")]
    .filter((p): p is string => !!p?.trim()).map((p) => resolve(root, p)))];
}

export function researchRepo(name: string, root = process.cwd(), env = process.env): string {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(name)) throw new Error(`Tên repo không hợp lệ: ${name}`);
  const candidates = researchRoots(root, env).map((p) => join(p, name));
  return candidates.find((p) => existsSync(p)) ?? candidates[0];
}