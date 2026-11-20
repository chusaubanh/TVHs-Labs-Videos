/** Kiểm trước th:render, tính từ project.json (không OCR: máy này chưa có Tesseract, mà hình học layer đã biết sẵn). */
import type { Project } from "./project-schema.js";

/**
 * Vùng an toàn theo % canvas [x0, y0, x1, y1]; geometry() trong commands-media.ts đặt mặc định bên trong vùng này.
 * 9:16 lấy từ editonny engine/helpers/quality_gate.py (x 140–940, y 230–1530 trên 1080×1920, vùng Reels).
 * 16:9: lề 5%, đáy 90% chừa thanh điều khiển YouTube. 4:5, 1:1: lề 5%, đáy 92%. Hai dòng này do mình chọn (editonny không định nghĩa).
 */
export const SAFE_ZONE: Record<string, [number, number, number, number]> = {
  "9:16": [(140 / 1080) * 100, (230 / 1920) * 100, (940 / 1080) * 100, (1530 / 1920) * 100],
  "16:9": [5, 5, 95, 90],
  "4:5": [5, 5, 95, 92],
  "1:1": [5, 5, 95, 92],
};
const TEXT_TYPES = new Set(["text", "subtitle", "lowerThird", "callout"]);

/** Cảnh báo (không chặn): layer chữ nằm ngoài vùng an toàn, gộp theo loại layer (phụ đề có hàng trăm layer cùng hộp). */
export function safeZoneWarnings(project: Project): string[] {
  const z = SAFE_ZONE[project.aspect];
  if (!z) return [];
  const byType = new Map<string, { n: number; first: string }>();
  for (const tr of project.tracks) {
    if (tr.hidden) continue;
    for (const l of tr.layers) {
      if (!TEXT_TYPES.has(l.type) || !l.w || !l.h) continue;
      const e = 0.01;
      if (!(l.x < z[0] - e || l.y < z[1] - e || l.x + l.w > z[2] + e || l.y + l.h > z[3] + e)) continue;
      const g = byType.get(l.type) ?? { n: 0, first: `${l.id} lúc ${l.start.toFixed(2)}s, hộp ${l.x.toFixed(1)},${l.y.toFixed(1)} ${l.w.toFixed(1)}×${l.h.toFixed(1)}%` };
      g.n++;
      byType.set(l.type, g);
    }
  }
  const zone = z.map((v) => v.toFixed(1)).join(", ");
  return [...byType].map(([t, g]) => `${t}: ${g.n} layer ra ngoài vùng an toàn ${project.aspect} [${zone}], ví dụ ${g.first}`);
}
