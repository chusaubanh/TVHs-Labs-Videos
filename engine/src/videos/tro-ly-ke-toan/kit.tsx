import React from "react";
import {
  AbsoluteFill,
  Easing,
  Freeze,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Label, useBeats, useSceneText } from "../../kit/scene-context";

export const W = 1920;
export const H = 1080;

export const INK = "#0C0C0C";
export const SURF = "#141517";
export const CARD_BG = "#1A1B1F";
export const GLASS_BG = "rgba(16, 18, 24, 0.92)";
export const BORDER_COLOR = "rgba(197, 160, 89, 0.55)";
export const GOLD = "#C5A059";
export const GOLDL = "#E0C286";
export const TXT = "#EDEDED";
export const SEC = "#8A8D93";
export const RED = "#EF4444";
export const GREEN = "#22C55E";
export const BLUE = "#3B82F6";
export const ORANGE = "#F97316";

const CLIP_BASE = "jobs/huong-dan-su-dung-tro-ly-lam-bao-cao/clips";
const SRC_W = 1920;
const SRC_H = 1080;

export function useT() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { at } = useBeats();

  const p = (i: number, fr = 0, damping = 13): number =>
    spring({ frame: f - at(i, fr), fps, config: { damping, mass: 0.7 } });

  const l = (i: number, fr = 0, d = 14): number =>
    interpolate(f - at(i, fr), [0, d], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

  return { f, at, p, l };
}

/** Phụ đề câu đang đọc, đặt cách đáy 60px */
export const Captions: React.FC = () => {
  const { voiceSegments, hideText } = useSceneText();
  const { starts, ends, active } = useBeats();
  const f = useCurrentFrame();
  const text = voiceSegments[active];
  if (hideText || text === undefined) return null;

  const o = interpolate(
    f,
    [starts[active], starts[active] + 5, ends[active] + 3, ends[active] + 8],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        bottom: 60,
        display: "flex",
        justifyContent: "center",
        opacity: o,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          maxWidth: 1680,
          textAlign: "center",
          fontSize: 34,
          lineHeight: 1.35,
          fontWeight: 700,
          color: TXT,
          background: "rgba(10, 12, 16, 0.94)",
          border: `1.5px solid ${BORDER_COLOR}`,
          borderRadius: 16,
          padding: "10px 32px 12px",
          boxShadow: "0 14px 40px rgba(0,0,0,0.85)",
          backdropFilter: "blur(12px)",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Shot {
  clip: "v1" | "v2" | "v3";
  from: number;
  to: number;
  crop?: Rect;
  ring?: Rect | Rect[];
  ringTo?: number;
  tick?: boolean;
}

const FULL: Rect = { x: 0, y: 0, w: SRC_W, h: SRC_H };

/** Phát shots[i] TOÀN PHẦN (Full Screen 1920x1080) trong khoảng câu i */
export const FullScreenClip: React.FC<{
  shots: (Shot | null)[];
  children?: React.ReactNode;
}> = ({ shots, children }) => {
  const f = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const { starts, active, at } = useBeats();
  const windowOf = (i: number) => [starts[i], starts[i + 1] ?? durationInFrames] as const;

  let idx = active;
  while (idx > 0 && !shots[idx]) idx--;
  const shot = shots[idx];
  if (!shot) return null;

  const [s0, s1] = windowOf(idx);
  const holding = idx !== active;

  const crop = shot.crop ?? FULL;
  const prevShot = idx > 0 ? shots[idx - 1] : null;
  const prevCrop = prevShot?.crop ?? FULL;
  const k = holding
    ? 1
    : interpolate(f, [s0, s0 + 12], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.cubic),
      });

  const c = {
    x: prevCrop.x + (crop.x - prevCrop.x) * k,
    y: prevCrop.y + (crop.y - prevCrop.y) * k,
    w: prevCrop.w + (crop.w - prevCrop.w) * k,
    h: prevCrop.h ?? (prevCrop.w * (1080 / 1920)),
  };
  const scale = W / c.w;

  const len = Math.max(1, Math.round((shot.to - shot.from) * fps));
  const span = Math.max(1, s1 - s0);
  const rate = Math.min(8, Math.max(0.6, len / span));
  const local = holding ? len - 1 : Math.min(len - 1, Math.floor((f - s0) * rate));

  const rings = shot.ring ? (Array.isArray(shot.ring) ? shot.ring : [shot.ring]) : [];
  const ringOff = s0 + span * (shot.ringTo ?? 2);
  const ringP = holding
    ? shot.ringTo === undefined
      ? 1
      : 0
    : interpolate(f, [at(idx, 0) + 6, at(idx, 0) + 14, ringOff, ringOff + 6], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  const tickP = shot.tick
    ? interpolate(f, [s0 + span * 0.45, s0 + span * 0.45 + 8], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const pulse = 1 + 0.04 * Math.sin((f / fps) * Math.PI * 2);

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#000" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: SRC_W,
          height: SRC_H,
          transformOrigin: "0 0",
          transform: `scale(${scale}) translate(${-c.x}px, ${-c.y}px)`,
        }}
      >
        <Sequence from={0} layout="none">
          <Freeze frame={local}>
            <OffthreadVideo
              src={staticFile(`${CLIP_BASE}/${shot.clip}.mp4`)}
              trimBefore={Math.round(shot.from * fps)}
              muted
              style={{ width: SRC_W, height: SRC_H }}
            />
          </Freeze>
        </Sequence>
        {rings.map((r, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: r.x - 8,
              top: r.y - 6,
              width: r.w + 16,
              height: r.h + 12,
              border: `${4 / scale}px solid ${GOLDL}`,
              borderRadius: 12,
              boxShadow: `0 0 ${25 / scale}px ${GOLD}`,
              opacity: ringP,
              transform: `scale(${pulse})`,
              pointerEvents: "none",
            }}
          >
            {shot.tick && (
              <svg
                viewBox="-20 -20 40 40"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: tickP }}
              >
                <path
                  d="M-11 0 L-3 9 L12 -10"
                  fill="none"
                  stroke={GREEN}
                  strokeWidth={6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(12,12,12,0.45) 0%, rgba(12,12,12,0) 25%, rgba(12,12,12,0) 75%, rgba(12,12,12,0.65) 100%)",
          pointerEvents: "none",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

/** Thẻ thông tin nổi nhảy trên màn hình */
export const JumpingTag: React.FC<{
  labelIndex: number;
  p: number;
  x?: number;
  y?: number;
  color?: string;
  bg?: string;
  icon?: string;
}> = ({ labelIndex, p, x = 1540, y = 140, color = TXT, bg = GLASS_BG, icon = "✦" }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${p})`,
      opacity: Math.min(1, p),
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: bg,
      color,
      border: `1.5px solid ${BORDER_COLOR}`,
      borderRadius: 18,
      padding: "12px 26px 14px",
      fontSize: 28,
      fontWeight: 700,
      boxShadow: "0 16px 40px rgba(0,0,0,0.75)",
      backdropFilter: "blur(14px)",
      whiteSpace: "nowrap",
      zIndex: 70,
    }}
  >
    <span style={{ color: GOLDL, fontSize: 24 }}>{icon}</span>
    <Label i={labelIndex} />
  </div>
);

/** Nền gradient vàng thương hiệu toả từ tâm + lưới grid chuyển động liên tục */
export const BrandMovingBackground: React.FC<{
  pulse?: boolean;
  opacity?: number;
}> = ({ pulse = true, opacity = 1 }) => {
  const f = useCurrentFrame();
  const gridX = (f * 0.6) % 80;
  const gridY = (f * 0.4) % 80;
  const p = pulse ? 1 + 0.05 * Math.sin(f * 0.08) : 1;

  return (
    <AbsoluteFill style={{ background: "#0A0C12", overflow: "hidden", opacity, pointerEvents: "none" }}>
      {/* 1. Lớp gradient vàng công ty toả từ tâm ra viền */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 85% 75% at 50% 50%, rgba(197, 160, 89, ${0.30 * p}) 0%, rgba(197, 160, 89, 0.14) 38%, rgba(14, 17, 24, 0.95) 75%, #080A0F 100%)`,
        }}
      />
      {/* 2. Điểm sáng vàng ấm trung tâm */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(224, 194, 134, ${0.20 * p}) 0%, transparent 45%)`,
        }}
      />
      {/* 3. Lưới grid công nghệ chuyển động vô tận theo frame */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(197, 160, 89, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 160, 89, 0.12) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          backgroundPosition: `${gridX}px ${gridY}px`,
        }}
      />
    </AbsoluteFill>
  );
};

/** Khung nền video chuẩn cho các cảnh B-roll */
export const VideoStage: React.FC<{
  overlay?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ overlay, children }) => (
  <AbsoluteFill style={{ background: INK, overflow: "hidden" }}>
    <BrandMovingBackground />
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {children}
    </svg>
    {overlay}
    <Captions />
  </AbsoluteFill>
);

/** Khung chung cho các cảnh screencast TOÀN PHẦN */
export const FullScreenClipStage: React.FC<{
  shots: (Shot | null)[];
  tags?: [label: number, sentence: number, x?: number, y?: number, bg?: string, color?: string, icon?: string][];
  children?: React.ReactNode;
}> = ({ shots, tags = [], children }) => {
  const { p } = useT();
  return (
    <AbsoluteFill>
      <BrandMovingBackground opacity={0.7} />
      <FullScreenClip shots={shots}>{children}</FullScreenClip>
      {tags.map(([label, sentence, x, y, bg, color, icon]) => (
        <JumpingTag
          key={label}
          labelIndex={label}
          p={p(sentence, 0.05)}
          x={x}
          y={y}
          bg={bg}
          color={color}
          icon={icon}
        />
      ))}
      {children}
      <Captions />
    </AbsoluteFill>
  );
};
