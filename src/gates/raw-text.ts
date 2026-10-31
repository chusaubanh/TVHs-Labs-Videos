import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Chữ viết thẳng trong JSX, không đi qua <Label />, nên không đối chiếu được với tài liệu. */
export function findRawJsxText(source: string): string[] {
  return [...source.matchAll(/>([^<>{}]*\p{L}[^<>{}]*)</gu)].map((match) => (match[1] ?? "").trim());
}

/** Quét cảnh riêng của các video trong src/videos. */
export function scanVideoScenes(root = "src/videos"): string[] {
  if (!existsSync(root)) return [];
  const problems: string[] = [];
  for (const entry of readdirSync(root, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".tsx")) continue;
    const path = join(entry.parentPath, entry.name);
    for (const text of findRawJsxText(readFileSync(path, "utf8"))) {
      problems.push(`${path}: chữ viết thẳng "${text}", phải dùng <Label />.`);
    }
  }
  return problems;
}
