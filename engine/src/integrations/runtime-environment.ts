import { delimiter, dirname } from "node:path";
import { existsSync } from "node:fs";
import { resolveMediaBinary } from "../studio/utils/media-binary.js";

/** Tiến trình con Python/FFmpeg cũng nhận cùng binary, kể cả máy chưa cấu hình PATH. */
export function activateMediaBinaries(): void {
  const dirs = ["ffmpeg", "ffprobe"].map((name) => resolveMediaBinary(name as "ffmpeg" | "ffprobe"))
    .filter((file) => existsSync(file)).map(dirname);
  process.env.PATH = [...new Set([...dirs, ...(process.env.PATH ?? "").split(delimiter)])].join(delimiter);
}
activateMediaBinaries();