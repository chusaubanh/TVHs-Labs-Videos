import React from "react";
import { AbsoluteFill, Easing, Freeze, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Label, useBeats, useSceneText } from "../../kit/scene-context";
import { GOLD, GOLDL, INK, TXT, useT } from "../tro-ly-phap-che/art";

const CLIP_DIR = "jobs/huong-dan-su-dung-tro-ly-lam-bao-cao/clips";
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
  /** Vòng khoanh chỉ hiện từ phần này của câu (0-1), dùng khi đối tượng xuất hiện muộn trong đoạn clip. */
  ringAt?: number;
  /** Tô nền vòng khoanh, dùng để chỉ "ô cam". */
  ringFill?: string;
  /** Hiện dấu tích trong vòng khoanh. */
  tick?: boolean;
  /** Màu viền vòng khoanh (mặc định vàng nhạt). */
  ringColor?: string;
  /** Mũi tên cong từ điểm này sang điểm kia (toạ độ ảnh nguồn), hiện cùng vòng khoanh. */
  arrows?: { from: [number, number]; to: [number, number] }[];
  /** Nhảy sang đoạn nguồn khác ở phần `at` (0-1) của câu, dùng để cắt đoạn chờ. */
  jump?: { from: number; to: number; at: number };
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

  const span = Math.max(1, s1 - s0);
  const jmp = shot.jump;
  const jf = jmp ? Math.round(span * jmp.at) : span;
  const inSecond = !!jmp && (holding || f - s0 >= jf);
  const segFrom = inSecond ? jmp!.from : shot.from;
  const segTo = inSecond ? jmp!.to : shot.to;
  const len = Math.max(1, Math.round((segTo - segFrom) * fps));
  const segSpan = Math.max(1, inSecond ? span - jf : jf);
  const rate = Math.min(20, Math.max(0.6, len / segSpan));
  const segLocal = Math.min(len - 1, Math.floor((f - s0 - (inSecond ? jf : 0)) * rate));
  const local = holding ? len - 1 : Math.max(0, segLocal);
  // Trôi nhẹ (phóng 5% qua câu) để hình không đứng yên khi clip đã dừng khung cuối.
  const drift = 1 + 0.05 * Math.min(1, Math.max(0, (f - s0) / span));

  const rings = shot.ring ? (Array.isArray(shot.ring) ? shot.ring : [shot.ring]) : [];
  const ringOff = s0 + span * (shot.ringTo ?? 2);
  const ringP = holding
    ? shot.ringTo === undefined ? 1 : 0
    : interpolate(f, [at(idx, shot.ringAt ?? 0) + 8, at(idx, shot.ringAt ?? 0) + 18, ringOff, ringOff + 8], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
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
      <div style={{ position: "absolute", inset: 0, transformOrigin: "50% 50%", transform: `scale(${holding ? 1.05 : drift})` }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: SRC_W, height: SRC_H, transformOrigin: "0 0", transform: `scale(${scale}) translate(${-c.x}px, ${-c.y}px)` }}>
        <Sequence from={0} layout="none">
          <Freeze frame={local}>
            <OffthreadVideo src={staticFile(`${CLIP_DIR}/${shot.clip}.mp4`)} trimBefore={Math.round(segFrom * fps)} muted style={{ width: SRC_W, height: SRC_H }} />
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
              border: `${4 / scale}px solid ${shot.ringFill ?? shot.ringColor ?? GOLDL}`,
              background: shot.ringFill ? `${shot.ringFill}99` : undefined,
              borderRadius: 12,
              boxShadow: `0 0 ${24 / scale}px ${shot.ringFill ?? shot.ringColor ?? GOLD}`,
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
        {shot.arrows && (
          <svg width={SRC_W} height={SRC_H} viewBox={`0 0 ${SRC_W} ${SRC_H}`} style={{ position: "absolute", left: 0, top: 0, opacity: ringP, overflow: "visible" }}>
            {shot.arrows.map((a, i) => {
              const [x1, y1] = a.from;
              const [x2, y2] = a.to;
              return (
                <g key={i} stroke={GOLDL} strokeWidth={6 / scale} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d={`M${x1} ${y1} C${x1 - 55} ${y1} ${x2 - 55} ${y2} ${x2 - 6} ${y2}`} />
                  <path d={`M${x2 - 22} ${y2 - 14} L${x2 - 4} ${y2} L${x2 - 22} ${y2 + 14}`} />
                </g>
              );
            })}
          </svg>
        )}
      </div>
      </div>
      {children}
    </div>
  );
};

/** Cột nhãn bên phải khung clip, nhãn i hiện từ câu sentence. */
export const SideTag: React.FC<{ row: number; p: number; children: React.ReactNode; color?: string; step?: number }> = ({ row, p, children, color = GOLDL, step = 120 }) => (
  <div
    style={{
      position: "absolute",
      left: 1645,
      top: 200 + row * step,
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

/** Khung 16:9 quanh điểm (x, y) rộng w, tính theo toạ độ ảnh nguồn. */
export const K = (x: number, y: number, w: number): Rect => ({ x, y, w, h: Math.round((w * 9) / 16) });

/* ---------- Clip phủ toàn khung: camera zoom/pan trên chính video, nhãn đặt trực tiếp lên hình ---------- */

interface Cam {
  cx: number;
  cy: number;
  s: number;
}
const FULL_CAM: Cam = { cx: SRC_W / 2, cy: SRC_H / 2, s: 1 };
/** Vùng crop 16:9 của Shot nay được hiểu là vùng zoom tới: tâm và hệ số phóng của camera. */
const camOf = (shot: Shot | null | undefined): Cam => (shot?.crop ? { cx: shot.crop.x + shot.crop.w / 2, cy: shot.crop.y + (shot.crop.w * 9) / 32, s: SRC_W / shot.crop.w } : FULL_CAM);
const ringsOf = (shot: Shot | null | undefined): Rect[] => (shot?.ring ? (Array.isArray(shot.ring) ? shot.ring : [shot.ring]) : []);

/** Nhãn nền đặc, nối bằng đường ngắn tới vòng khoanh. */
const Callout: React.FC<{ x: number; y: number; p: number; color: string; line?: { x2: number; y2: number }; children: React.ReactNode }> = ({ x, y, p, color, line, children }) => (
  <>
    {line && (
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, opacity: Math.min(1, p), pointerEvents: "none" }}>
        <line x1={x} y1={y} x2={line.x2} y2={line.y2} stroke={color} strokeWidth={5} strokeLinecap="round" />
        <circle cx={line.x2} cy={line.y2} r={8} fill={color} />
      </svg>
    )}
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${p})`,
        opacity: Math.min(1, p),
        fontSize: 34,
        fontWeight: 700,
        fontFamily: "sans-serif",
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        color: INK,
        background: color,
        padding: "10px 28px 12px",
        borderRadius: 999,
        boxShadow: "0 12px 32px rgba(0,0,0,0.55)",
      }}
    >
      {children}
    </div>
  </>
);

/**
 * Lớp quay màn hình phủ kín khung 1920x1080. Mỗi Shot cho một vùng zoom (crop) + vòng khoanh; camera nội suy mượt
 * từ vùng của câu trước sang vùng của câu này. Nhãn tags = [chỉ số nhãn, câu, màu, hết ở câu].
 */
export const ClipLayer: React.FC<{
  shots: (Shot | null)[];
  tags: [label: number, sentence: number, color?: string, until?: number][];
  opacity?: number;
  inWindow?: React.ReactNode;
  step?: number;
  offsets?: number[];
}> = ({ shots, tags, opacity = 1, inWindow, offsets }) => {
  const f = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const { starts, active } = useBeats();
  const { p } = useT();
  if (opacity <= 0.001) return null;

  let idx = active;
  while (idx > 0 && !shots[idx]) idx--;
  const shot = shots[idx];
  if (!shot) return null;
  const s0 = starts[idx] ?? 0;
  const s1 = starts[idx + 1] ?? durationInFrames;
  const span = Math.max(1, s1 - s0);
  const holding = idx !== active;

  // Camera: từ vùng của shot trước (gần nhất, khác null) sang vùng của shot này, có ease.
  let pi = idx - 1;
  while (pi >= 0 && !shots[pi]) pi--;
  const prevCam = pi >= 0 ? camOf(shots[pi]) : FULL_CAM;
  const target = camOf(shot);
  const k = holding ? 1 : interpolate(f, [s0, s0 + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const prog = holding ? 1 : Math.min(1, Math.max(0, (f - s0) / span));
  const lg = (a: number, b: number) => Math.exp(Math.log(a) + (Math.log(b) - Math.log(a)) * k); // phóng theo hàm mũ cho mượt
  const cam: Cam = {
    cx: prevCam.cx + (target.cx - prevCam.cx) * k,
    cy: prevCam.cy + (target.cy - prevCam.cy) * k,
    s: lg(prevCam.s, target.s) * (1 + 0.04 * prog),
  };

  // Phát clip: giây nguồn theo câu (tua nhanh tới 20x, chậm tới 0.6x rồi giữ khung cuối).
  const jmp = shot.jump;
  const jf = jmp ? Math.round(span * jmp.at) : span;
  const inSecond = !!jmp && (holding || f - s0 >= jf);
  const segFrom = inSecond ? jmp!.from : shot.from;
  const segTo = inSecond ? jmp!.to : shot.to;
  const len = Math.max(1, Math.round((segTo - segFrom) * fps));
  const segSpan = Math.max(1, inSecond ? span - jf : jf);
  const rate = Math.min(20, Math.max(0.6, len / segSpan));
  const local = holding ? len - 1 : Math.max(0, Math.min(len - 1, Math.floor((f - s0 - (inSecond ? jf : 0)) * rate)));

  const rings = ringsOf(shot);
  const ringOff = s0 + span * (shot.ringTo ?? 2);
  const ringAt = s0 + span * (shot.ringAt ?? 0);
  const ringP = holding
    ? shot.ringTo === undefined ? 1 : 0
    : interpolate(f, [ringAt + 8, ringAt + 18, ringOff, ringOff + 8], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = 1 + 0.03 * Math.sin((f / fps) * Math.PI * 2);

  const toX = (x: number) => 960 + (x - cam.cx) * cam.s;
  const toY = (y: number) => 540 + (y - cam.cy) * cam.s;

  // Hình chữ nhật hợp của các vòng khoanh, đổi sang toạ độ màn hình.
  let anchor: { x1: number; y1: number; x2: number; y2: number } | null = null;
  if (rings.length) {
    const x1 = Math.min(...rings.map((r) => r.x - 10));
    const y1 = Math.min(...rings.map((r) => r.y - 8));
    const x2 = Math.max(...rings.map((r) => r.x + r.w + 10));
    const y2 = Math.max(...rings.map((r) => r.y + r.h + 8));
    anchor = { x1: toX(x1), y1: toY(y1), x2: toX(x2), y2: toY(y2) };
  }

  // Nhãn của câu đang đọc (và nhãn có `until` còn hiệu lực).
  const live = tags
    .map((t, i) => ({ label: t[0], sentence: t[1], color: t[2], until: t[3], i }))
    .filter((t) => (t.until === undefined ? t.sentence === active : t.sentence <= active && active < t.until));
  const bySentence = (sn: number) => live.filter((t) => t.sentence === sn);

  return (
    <AbsoluteFill style={{ opacity, background: "#000", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: SRC_W, height: SRC_H, transformOrigin: "0 0", transform: `translate(960px, 540px) scale(${cam.s}) translate(${-cam.cx}px, ${-cam.cy}px)` }}>
        <Sequence from={0} layout="none">
          <Freeze frame={local}>
            <OffthreadVideo src={staticFile(`${CLIP_DIR}/${shot.clip}.mp4`)} trimBefore={Math.round(segFrom * fps)} muted style={{ width: SRC_W, height: SRC_H }} />
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
              border: `${4 / cam.s}px solid ${shot.ringFill ?? shot.ringColor ?? GOLDL}`,
              background: shot.ringFill ? `${shot.ringFill}99` : undefined,
              borderRadius: 12 / cam.s,
              boxShadow: `0 0 ${24 / cam.s}px ${shot.ringFill ?? shot.ringColor ?? GOLD}`,
              opacity: ringP,
              transform: `scale(${pulse})`,
            }}
          />
        ))}
        {shot.arrows && (
          <svg width={SRC_W} height={SRC_H} viewBox={`0 0 ${SRC_W} ${SRC_H}`} style={{ position: "absolute", left: 0, top: 0, opacity: ringP, overflow: "visible" }}>
            {shot.arrows.map((a, i) => {
              const [x1, y1] = a.from;
              const [x2, y2] = a.to;
              return (
                <g key={i} stroke={GOLDL} strokeWidth={6 / cam.s} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d={`M${x1} ${y1} C${x1 - 55} ${y1} ${x2 - 55} ${y2} ${x2 - 6} ${y2}`} />
                  <path d={`M${x2 - 22} ${y2 - 14} L${x2 - 4} ${y2} L${x2 - 22} ${y2 + 14}`} />
                </g>
              );
            })}
          </svg>
        )}
      </div>
      {/* Nhãn: có vòng khoanh thì đặt ngay phía trên (hoặc dưới) vòng, nối bằng đường ngắn; không có thì xếp hàng ngang ở mép trên. */}
      {live.map((t) => {
        const group = bySentence(t.sentence);
        const n = group.length;
        const gi = group.findIndex((g) => g.i === t.i);
        const pp = p(t.sentence, offsets?.[t.i] ?? 0.05);
        const color = t.color ?? GOLDL;
        if (anchor && t.sentence === active) {
          const spread = n >= 4 ? 420 : n === 3 ? 400 : 340;
          const cxm = (anchor.x1 + anchor.x2) / 2;
          const xsAll = group.map((_, j) => cxm + (j - (n - 1) / 2) * spread);
          const shiftX = Math.max(0, 280 - Math.min(...xsAll)) - Math.max(0, Math.max(...xsAll) - 1640);
          const x = Math.min(1640, Math.max(280, (xsAll[gi] ?? cxm) + shiftX));
          let y = anchor.y1 - 62;
          let ly = anchor.y1;
          if (y < 100) {
            y = anchor.y2 + 62;
            ly = anchor.y2;
          }
          y = Math.min(830, Math.max(100, y));
          const lx = Math.min(anchor.x2 - 4, Math.max(anchor.x1 + 4, x));
          return (
            <Callout key={t.i} x={x} y={y} p={pp} color={color} line={{ x2: lx, y2: ly }}>
              <Label i={t.label} />
            </Callout>
          );
        }
        const x = n > 1 ? 280 + gi * (1360 / (n - 1)) : 960;
        return (
          <Callout key={t.i} x={x} y={120} p={pp} color={color}>
            <Label i={t.label} />
          </Callout>
        );
      })}
      {inWindow}
    </AbsoluteFill>
  );
};
