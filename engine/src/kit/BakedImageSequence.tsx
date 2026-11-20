import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

/** Đặt trong overlay của Stage; tài nguyên Motion Canvas đã dựng trước, không chạy generator khi xuất. */
export const BakedImageSequence: React.FC<{ base: string; frames: number; fps: number; offsetFrame?: number; style?: React.CSSProperties }> = ({ base, frames, fps, offsetFrame = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps: renderFps } = useVideoConfig();
  if (!Number.isInteger(frames) || frames < 1 || !Number.isFinite(fps) || fps <= 0) throw new Error("Thông số chuỗi ảnh không hợp lệ.");
  if (frame < offsetFrame) return null;
  const index = Math.min(frames - 1, Math.floor((frame - offsetFrame) * fps / renderFps));
  return <Img src={staticFile(`${base.replace(/\/$/, "")}/${String(index).padStart(6, "0")}.png`)} style={{ width: "100%", height: "100%", objectFit: "contain", ...style }} />;
};