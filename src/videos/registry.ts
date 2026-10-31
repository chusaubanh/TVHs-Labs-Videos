import type React from "react";
import { SmokeScene } from "../fixtures/SmokeScene";

/**
 * Cảnh riêng của từng video, khoá theo `component` trong kịch bản, dạng "<video>/<cảnh>".
 * Không tạo cảnh dùng chung cho nhiều video: mỗi video đặt cảnh trong `src/videos/<video>/`.
 */
export const SCENES: Record<string, React.FC> = {
  "fixture/smoke": SmokeScene,
};
