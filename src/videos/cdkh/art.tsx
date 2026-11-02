import React from "react";
import { Box, EL, G, GOLD, GOLDL, HOV, INK, Lines, Person, SEC, Spark, TXT } from "../mo-dau/art";

/** Tranh riêng của bộ video Chân dung khách hàng, vẽ cho khổ 4:5. */
export const PersonaCard: React.FC<{ w?: number; h?: number; lit?: boolean; fill?: string }> = ({ w = 320, h = 400, lit = true, fill = GOLDL }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={w * 0.08} fill={EL} stroke={lit ? GOLD : HOV} strokeWidth={Math.max(4, w * 0.018)} />
    <G y={-h * 0.07}><Person s={w * 0.0042} fill={lit ? fill : HOV} /></G>
    <Lines x={-w * 0.32} y={h * 0.2} w={w * 0.64} n={3} gap={h * 0.075} t={h * 0.03} color={lit ? SEC : HOV} />
  </g>
);

export const Bottle: React.FC<{ s?: number; fill?: string }> = ({ s = 1, fill = GOLD }) => (
  <G s={s}>
    <rect x={-16} y={-96} width={32} height={30} rx={6} fill={TXT} />
    <path d="M-44 -60 Q-44 -70 -32 -70 H32 Q44 -70 44 -60 V84 Q44 96 32 96 H-32 Q-44 96 -44 84 Z" fill={fill} />
    <rect x={-30} y={-20} width={60} height={62} rx={8} fill={INK} opacity={0.75} />
    <rect x={-20} y={-6} width={40} height={8} rx={4} fill={TXT} />
    <rect x={-20} y={14} width={28} height={8} rx={4} fill={SEC} />
  </G>
);

export const Lipstick: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <path d="M-20 -30 V-74 L20 -94 V-30 Z" fill={GOLDL} />
    <rect x={-27} y={-30} width={54} height={36} fill={SEC} />
    <rect x={-34} y={6} width={68} height={88} rx={8} fill={GOLD} />
  </G>
);

/** Tờ lịch n ô, sáng từ ô đầu tới ô on. */
export const Calendar: React.FC<{ s?: number; on?: (i: number) => boolean }> = ({ s = 1, on = () => false }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={300} h={270} rx={22} fill={EL} stroke={GOLD} strokeWidth={5} />
    <rect x={-150} y={-135} width={300} height={54} rx={18} fill={GOLD} />
    {Array.from({ length: 12 }, (_, i) => (
      <rect key={i} x={-126 + (i % 4) * 64} y={-66 + Math.floor(i / 4) * 62} width={52} height={50} rx={8} fill={on(i) ? GOLDL : HOV} />
    ))}
  </G>
);

export const Leaf: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <path d="M-70 70 Q-90 -60 70 -80 Q90 50 -70 70 Z" fill={GOLD} />
    <path d="M-70 70 Q-10 0 40 -46" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" />
  </G>
);

export const Heart: React.FC<{ s?: number; fill?: string }> = ({ s = 1, fill = GOLD }) => (
  <G s={s}>
    <path d="M0 62 Q-82 4 -62 -38 Q-34 -70 0 -28 Q34 -70 62 -38 Q82 4 0 62 Z" fill={fill} />
  </G>
);

export const Gift: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <Box cx={0} cy={18} w={140} h={100} rx={10} fill={GOLD} />
    <Box cx={0} cy={-46} w={162} h={38} rx={8} fill={GOLDL} />
    <rect x={-13} y={-65} width={26} height={133} fill={INK} opacity={0.65} />
  </G>
);

export const Coupon: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s} r={-6}>
    <path d="M-110 -56 H110 V-20 A20 20 0 0 0 110 20 V56 H-110 V20 A20 20 0 0 0 -110 -20 Z" fill={GOLDL} />
    <line x1={-38} x2={-38} y1={-44} y2={44} stroke={INK} strokeWidth={5} strokeDasharray="10 9" />
    <path d="M6 28 L60 -28" stroke={INK} strokeWidth={9} strokeLinecap="round" />
    <circle cx={12} cy={-16} r={11} fill="none" stroke={INK} strokeWidth={7} />
    <circle cx={54} cy={18} r={11} fill="none" stroke={INK} strokeWidth={7} />
  </G>
);

export const Star: React.FC<{ s?: number; fill?: string }> = ({ s = 1, fill = GOLD }) => (
  <G s={s}>
    <path d="M0 -40 L12 -13 L41 -11 L19 8 L26 36 L0 21 L-26 36 L-19 8 L-41 -11 L-12 -13 Z" fill={fill} />
  </G>
);

export const Stars: React.FC<{ n?: number; s?: number; on?: number }> = ({ n = 5, s = 1, on = 5 }) => (
  <G s={s}>
    {Array.from({ length: n }, (_, i) => (
      <G key={i} x={(i - (n - 1) / 2) * 88}><Star fill={i < on ? GOLD : HOV} /></G>
    ))}
  </G>
);

export const Bolt: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}><path d="M14 -80 L-44 14 H-6 L-18 80 L44 -16 H6 Z" fill={GOLDL} /></G>
);

/** Bài viết dài, cuộn được; bookmark tô khi đã lưu. */
export const LongPost: React.FC<{ w: number; h: number; scroll?: number; saved?: number }> = ({ w, h, scroll = 0, saved = 0 }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={22} fill={TXT} />
    <clipPath id={`long-${w}-${h}`}><rect x={-w / 2} y={-h / 2 + 12} width={w} height={h - 24} /></clipPath>
    <g clipPath={`url(#long-${w}-${h})`}>
      {Array.from({ length: 16 }, (_, i) => (
        <rect key={i} x={-w / 2 + 28} y={-h / 2 + 30 + i * 42 - scroll} width={(w - 56) * (i % 4 === 3 ? 0.6 : 1)} height={18} rx={9} fill={i % 5 === 0 ? GOLD : SEC} />
      ))}
    </g>
    <path d={`M${w / 2 - 66} ${-h / 2 - 8} h44 v76 l-22 -20 l-22 20 Z`} fill={GOLD} opacity={saved} />
  </g>
);

/** Video dọc ngắn trong điện thoại, thanh tiến độ chạy. */
export const ShortVideo: React.FC<{ w?: number; h?: number; t?: number; children?: React.ReactNode }> = ({ w = 240, h = 420, t = 0, children }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={w * 0.12} fill={INK} stroke={TXT} strokeWidth={Math.max(4, w * 0.025)} />
    {children ?? <path d={`M${-w * 0.12} ${-h * 0.11} L${w * 0.17} 0 L${-w * 0.12} ${h * 0.11} Z`} fill={GOLD} />}
    <rect x={-w * 0.38} y={h / 2 - 28} width={w * 0.76} height={8} rx={4} fill={HOV} />
    <rect x={-w * 0.38} y={h / 2 - 28} width={w * 0.76 * t} height={8} rx={4} fill={GOLD} />
  </g>
);

export const SearchBar: React.FC<{ w: number; p?: number }> = ({ w, p = 1 }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={100} rx={50} fill={TXT} stroke={GOLD} strokeWidth={5} />
    <circle cx={-w / 2 + 52} cy={-4} r={18} fill="none" stroke={INK} strokeWidth={7} />
    <line x1={-w / 2 + 65} y1={9} x2={-w / 2 + 80} y2={24} stroke={INK} strokeWidth={7} strokeLinecap="round" />
    <rect x={-w / 2 + 100} y={-10} width={(w - 170) * p} height={20} rx={10} fill={INK} />
  </g>
);

/** Thước đo tròn của một chỉ số, kim quay tới t. */
export const Gauge: React.FC<{ r?: number; t?: number }> = ({ r = 90, t = 0.6 }) => (
  <g>
    <path d={`M${-r} 0 A${r} ${r} 0 0 1 ${r} 0`} fill="none" stroke={HOV} strokeWidth={r * 0.18} strokeLinecap="round" />
    <path d={`M${-r} 0 A${r} ${r} 0 0 1 ${r} 0`} fill="none" stroke={GOLD} strokeWidth={r * 0.18} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - t} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.72} stroke={TXT} strokeWidth={r * 0.08} strokeLinecap="round" transform={`rotate(${-90 + 180 * t})`} />
    <circle r={r * 0.11} fill={TXT} />
  </g>
);

export const Sparkle: React.FC<{ x: number; y: number; s: number; r?: number }> = ({ x, y, s, r = 26 }) => <G x={x} y={y} s={s}><Spark r={r} fill={GOLDL} /></G>;
