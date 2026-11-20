import React from "react";
import { AbsoluteFill, Easing, Freeze, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { useBeats, useSceneText } from "../../kit/scene-context";
import { GOLD, GOLDL, INK, TXT } from "../tro-ly-phap-che/art";

const CLIP_DIR = "jobs/huong-dan-su-dung-tro-ly-phap-che/clips";
const SRC_W = 1920;
const SRC_H = 1080;

/** Khung phát clip: chừa dải dưới cho phụ đề và cột phải cho nhãn. */
export const WIN = { x: 90, y: 110, w: 1340, h: 754 };

/** Phụ đề câu đang đọc, ẩn ở bản tắt chữ của S7. */
export const Captions: React.FC = () => {
  const { voiceSegments, hideText } = useSceneText();
  const { starts, ends, active } = useBeats();
  const f = useCurrentFrame();
  const text = voiceSegments[active];
  if (hideText || text === undefined) return null;
  const o = interpolate(f, [starts[active], starts[active] + 6, ends[active] + 4, ends[active] + 10], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "absolute", left: 160, right: 160, top: 902, display: "flex", justifyContent: "center", opacity: o }}>
      <span
        style={{
          maxWidth: 1600,
          textAlign: "center",
          fontSize: 34,
          lineHeight: 1.35,
          fontWeight: 600,
          color: TXT,
          background: "rgba(12,12,12,0.86)",
          border: "1px solid rgba(197,160,89,0.35)",
          borderRadius: 14,
          padding: "8px 26px 10px",
        }}
      >
        {text}
      </span>
    </div>
  );
};

/** Bọc cảnh cũ: thu nhỏ về phía trên để chừa dải phụ đề, cảnh gốc giữ nguyên. */
export function withCaptions(Scene: React.FC): React.FC {
  const Wrapped: React.FC = () => (
    <AbsoluteFill style={{ background: INK }}>
      <AbsoluteFill style={{ transform: "scale(0.86)", transformOrigin: "50% 4%" }}>
        <Scene />
      </AbsoluteFill>
      <Captions />
    </AbsoluteFill>
  );
  return Wrapped;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Một đoạn clip cho một câu: giây nguồn [from, to), vùng phóng (toạ độ ảnh nguồn), vòng khoanh. */
export interface Shot {
  clip: "v1" | "v2" | "v3";
  from: number;
  to: number;
  crop?: Rect;
  ring?: Rect | Rect[];
  /** Vòng khoanh tắt ở phần này của câu (0-1); không ghi thì giữ tới hết câu. */
  ringTo?: number;
  /** Tô nền vòng khoanh, dùng để chỉ "ô cam". */
  ringFill?: string;
  /** Hiện dấu tích trong vòng khoanh. */
  tick?: boolean;
}

const FULL: Rect = { x: 0, y: 0, w: SRC_W, h: SRC_H };

/**
 * Phát shots[i] trong khoảng câu i. Đoạn dài hơn câu thì tua nhanh (tối đa 8x), ngắn hơn thì chậm tới 0.6x
 * rồi dừng ở khung cuối. shots[i] = null: giữ khung cuối của shot gần nhất phía trước.
 */
export const ClipWindow: React.FC<{ shots: (Shot | null)[]; children?: React.ReactNode }> = ({ shots, children }) => {
  const f = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const { starts, active, at } = useBeats();
  const windowOf = (i: number) => [starts[i], starts[i + 1] ?? durationInFrames] as const;

  // Câu đang hiện dùng shot nào (null thì lùi về shot trước, giữ khung cuối).
  let idx = active;
  while (idx > 0 && !shots[idx]) idx--;
  const shot = shots[idx];
  if (!shot) return null;
  const [s0, s1] = windowOf(idx);
  const holding = idx !== active;

  const crop = shot.crop ?? FULL;
  const prevShot = idx > 0 ? shots[idx - 1] : null;
  const prevCrop = prevShot?.crop ?? FULL;
  const k = holding ? 1 : interpolate(f, [s0, s0 + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const c = {
    x: prevCrop.x + (crop.x - prevCrop.x) * k,
    y: prevCrop.y + (crop.y - prevCrop.y) * k,
    w: prevCrop.w + (crop.w - prevCrop.w) * k,
  };
  const scale = WIN.w / c.w;

  const len = Math.max(1, Math.round((shot.to - shot.from) * fps));
  const span = Math.max(1, s1 - s0);
  const rate = Math.min(8, Math.max(0.6, len / span));
  const local = holding ? len - 1 : Math.min(len - 1, Math.floor((f - s0) * rate));

  const rings = shot.ring ? (Array.isArray(shot.ring) ? shot.ring : [shot.ring]) : [];
  const ringOff = s0 + span * (shot.ringTo ?? 2);
  const ringP = holding
    ? shot.ringTo === undefined ? 1 : 0
    : interpolate(f, [at(idx, 0) + 8, at(idx, 0) + 18, ringOff, ringOff + 8], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tickP = shot.tick ? interpolate(f, [s0 + span * 0.45, s0 + span * 0.45 + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const pulse = 1 + 0.04 * Math.sin((f / fps) * Math.PI * 2);

  return (
    <div
      style={{
        position: "absolute",
        left: WIN.x,
        top: WIN.y,
        width: WIN.w,
        height: WIN.h,
        borderRadius: 18,
        overflow: "hidden",
        background: "#000",
        border: `2px solid rgba(197,160,89,0.5)`,
        boxShadow: "0 28px 70px rgba(0,0,0,0.7)",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, width: SRC_W, height: SRC_H, transformOrigin: "0 0", transform: `scale(${scale}) translate(${-c.x}px, ${-c.y}px)` }}>
        <Sequence from={0} layout="none">
          <Freeze frame={local}>
            <OffthreadVideo src={staticFile(`${CLIP_DIR}/${shot.clip}.mp4`)} trimBefore={Math.round(shot.from * fps)} muted style={{ width: SRC_W, height: SRC_H }} />
          </Freeze>
        </Sequence>
        {rings.map((r, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: r.x - 10,
              top: r.y - 8,
              width: r.w + 20,
              height: r.h + 16,
              border: `${4 / scale}px solid ${shot.ringFill ?? GOLDL}`,
              background: shot.ringFill ? `${shot.ringFill}99` : undefined,
              borderRadius: 12,
              boxShadow: `0 0 ${24 / scale}px ${shot.ringFill ?? GOLD}`,
              opacity: ringP,
              transform: `scale(${pulse})`,
            }}
          >
            {shot.tick && (
              <svg viewBox="-20 -20 40 40" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: tickP }}>
                <path d="M-11 0 L-3 9 L12 -10" fill="none" stroke="#22C55E" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

/** Cột nhãn bên phải khung clip, nhãn i hiện từ câu sentence. */
export const SideTag: React.FC<{ row: number; p: number; children: React.ReactNode; color?: string }> = ({ row, p, children, color = GOLDL }) => (
  <div
    style={{
      position: "absolute",
      left: 1645,
      top: 200 + row * 120,
      transform: `translate(-50%, -50%) scale(${p})`,
      opacity: Math.min(1, p),
      fontSize: 30,
      fontWeight: 700,
      color: INK,
      background: color,
      padding: "12px 26px 14px",
      borderRadius: 999,
      textAlign: "center",
      width: "max-content",
      maxWidth: 380,
      boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
    }}
  >
    {children}
  </div>
);
