import React from "react";
import { AbsoluteFill, Easing, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Label, useBeats } from "../../kit/scene-context";

export const W = 1920;
export const H = 1080;

export const INK = "#0C0C0C";
export const SURF = "#141517";
export const EL = "#1E1F23";
export const HOV = "#3E4148";
export const GOLD = "#C5A059";
export const GOLDL = "#E0C286";
export const TXT = "#EDEDED";
export const SEC = "#8A8D93";
export const RED = "#EF4444";
export const XL = "#22C55E";
export const PAPER = "#F1E8D6";

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export function useT() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { at } = useBeats();
  /** Bật có đàn hồi, tính từ câu i. */
  const p = (i: number, fr = 0, damping = 14): number =>
    spring({ frame: f - at(i, fr), fps, config: { damping, mass: 0.7 } });
  /** Chạy mượt 0 đến 1 từ câu i, trong d khung. */
  const l = (i: number, fr = 0, d = 14): number =>
    interpolate(f - at(i, fr), [0, d], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
  return { f, at, p, l };
}

export const G: React.FC<{
  x?: number;
  y?: number;
  s?: number;
  r?: number;
  o?: number;
  children?: React.ReactNode;
}> = ({ x = 0, y = 0, s = 1, r = 0, o = 1, children }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {children}
  </g>
);

export const Stage: React.FC<{
  bg?: string;
  overlay?: React.ReactNode;
  children?: React.ReactNode;
  still?: boolean;
}> = ({ bg = INK, overlay, children, still = false }) => {
  const { f } = useT();
  const { durationInFrames } = useVideoConfig();
  const drift = still ? 1 : interpolate(f, [0, durationInFrames], [1, 1.02]);
  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
      {/* Vầng sáng vàng thương hiệu trung tâm */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 80% 65% at 50% 50%, rgba(197,160,89,0.12) 0%, rgba(197,160,89,0.03) 60%, rgba(12,12,12,0) 100%)",
        }}
      />
      {/* Lưới đồ họa tinh tế */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(197,160,89,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <AbsoluteFill style={{ transform: `scale(${drift})` }}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
          {children}
        </svg>
        {overlay}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Tag: React.FC<{
  i: number;
  x: number;
  y: number;
  p: number;
  size?: number;
  solid?: boolean;
  color?: string;
  o?: number;
}> = ({ i, x, y, p, size = 32, solid = false, color = GOLDL, o = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${p})`,
      opacity: Math.min(1, p) * o,
      fontSize: size,
      fontWeight: 700,
      fontFamily: "sans-serif",
      lineHeight: 1.35,
      whiteSpace: "nowrap",
      color: solid ? INK : color,
      background: solid ? color : "rgba(18,20,24,0.92)",
      border: `2px solid ${solid ? color : "rgba(197,160,89,0.4)"}`,
      padding: "10px 32px 12px",
      borderRadius: 999,
      boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
      letterSpacing: "0.2px",
    }}
  >
    <Label i={i} />
  </div>
);

export const Box: React.FC<React.SVGProps<SVGRectElement> & { cx: number; cy: number; w: number; h: number }> = ({
  cx,
  cy,
  w,
  h,
  ...rest
}) => <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} {...rest} />;

export const Lines: React.FC<{
  x: number;
  y: number;
  w: number;
  n: number;
  gap?: number;
  color?: string;
  t?: number;
}> = ({ x, y, w, n, gap = 24, color = SEC, t = 10 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <rect
        key={i}
        x={x}
        y={y + i * gap}
        width={w * (i % 3 === 2 ? 0.65 : i % 3 === 1 ? 0.85 : 1)}
        height={t}
        rx={t / 2}
        fill={color}
      />
    ))}
  </g>
);

export const ScreenMockup: React.FC<{
  videoSrc: string;
  startFrom: number;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  scale?: number;
  opacity?: number;
}> = ({ videoSrc, startFrom, x = 160, y = 140, w = 1600, h = 850, scale = 1, opacity = 1 }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#16181D",
        border: "2px solid rgba(197,160,89,0.45)",
        boxShadow: "0 28px 70px rgba(0,0,0,0.75)",
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        opacity,
      }}
    >
      {/* Title bar with standard macOS-style buttons */}
      <div
        style={{
          height: 48,
          backgroundColor: "#1C1F26",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          gap: 10,
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
        <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
        <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#27C93F" }} />
      </div>
      {/* Video Content */}
      <div style={{ width: "100%", height: h - 48, position: "relative", backgroundColor: "#000" }}>
        <OffthreadVideo
          src={staticFile(videoSrc)}
          startFrom={startFrom}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    </div>
  );
};
