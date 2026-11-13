import React from "react";
import { Box, EL, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, Person, SEC, Spark, SURF, TXT } from "../shared/art";

/** Tranh riêng của Bài 1. shortcut: toạ độ chỉ vẽ cho khổ 4:5, đổi khổ thì dựng bố cục mới. */

export const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

/** Tờ prompt: giấy cao h, số dòng theo chiều cao. */
export const Sheet: React.FC<{ w: number; h: number; fill?: string; ink?: string }> = ({ w, h, fill = PAPER, ink = SEC }) => (
  <g>
    <rect x={-w / 2} y={0} width={w} height={h} rx={18} fill={fill} />
    {h > 70 && <Lines x={-w / 2 + 34} y={30} w={w - 68} n={Math.max(1, Math.floor((h - 44) / 40))} gap={40} color={ink} t={14} />}
  </g>
);

/** Dải prompt một dòng, có con trỏ gõ. Dùng ở cảnh đầu và cảnh vòng lặp. */
export const Strip: React.FC<{ w?: number; glow?: number; caret?: boolean }> = ({ w = 720, glow = 1, caret = true }) => (
  <g>
    <rect x={-w / 2 - 14} y={-69} width={w + 28} height={138} rx={36} fill="none" stroke={GOLDL} strokeWidth={6} opacity={0.5 * glow} />
    <Box cx={0} cy={0} w={w} h={110} rx={28} fill={GOLD} />
    <rect x={-w / 2 + 40} y={-9} width={w * 0.62} height={18} rx={9} fill={INK} />
    {caret && <rect x={-w / 2 + 52 + w * 0.62} y={-28} width={10} height={56} rx={4} fill={INK} />}
  </g>
);

/** Ô số: hai vạch tượng trưng cho con số, không ghi số thật. */
export const NumChip: React.FC<{ fill?: string; ink?: string }> = ({ fill = TXT, ink = INK }) => (
  <g>
    <Box cx={0} cy={0} w={120} h={64} rx={16} fill={fill} />
    <rect x={-40} y={-10} width={30} height={20} rx={6} fill={ink} />
    <rect x={2} y={-10} width={40} height={20} rx={6} fill={ink} />
  </g>
);

/** Bạn thực tập sinh: người đeo thẻ có ngôi sao. */
export const Intern: React.FC<{ s?: number; fill?: string }> = ({ s = 1, fill = TXT }) => (
  <G s={s}>
    <Person fill={fill} />
    <line x1={-14} y1={-28} x2={0} y2={4} stroke={GOLD} strokeWidth={5} />
    <line x1={14} y1={-28} x2={0} y2={4} stroke={GOLD} strokeWidth={5} />
    <Box cx={0} cy={16} w={42} h={32} rx={6} fill={GOLD} />
    <G y={16}>
      <Spark r={11} fill={INK} />
    </G>
  </G>
);

/** Cửa sổ ứng dụng có thanh tiêu đề. */
export const Win: React.FC<{ w: number; h: number; stroke?: string; children?: React.ReactNode }> = ({ w, h, stroke = HOV, children }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={22} fill={EL} stroke={stroke} strokeWidth={5} />
    <path d={`M${-w / 2} ${-h / 2 + 56} H${w / 2}`} stroke={HOV} strokeWidth={4} />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={-w / 2 + 32 + i * 26} cy={-h / 2 + 28} r={8} fill={i === 0 ? GOLD : HOV} />
    ))}
    {children}
  </g>
);

/** Con trỏ chuột. */
export const Cursor: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <path d="M0 0 L0 62 L16 48 L28 74 L40 68 L28 42 L50 42 Z" fill={TXT} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
  </G>
);

/** Lịch để bàn, lật trang bằng flip từ 0 đến 1. */
export const Calendar: React.FC<{ flip?: number }> = ({ flip = 0 }) => (
  <g>
    <Box cx={0} cy={0} w={240} h={190} rx={18} fill={TXT} />
    <Box cx={0} cy={-70} w={240} h={50} rx={18} fill={GOLD} />
    {[-60, 60].map((x) => (
      <rect key={x} x={x - 6} y={-110} width={12} height={36} rx={6} fill={HOV} />
    ))}
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={-96 + (i % 4) * 50} y={-24 + Math.floor(i / 4) * 46} width={36} height={32} rx={6} fill={i === 5 ? GOLD : HOV} />
    ))}
    {flip > 0.01 && flip < 0.99 && <rect x={-120} y={-45} width={240} height={140 * (1 - flip)} rx={14} fill={PAPER} opacity={0.95} />}
  </g>
);

/** Mũi tên vòng tròn: lặp lại. */
export const Loop: React.FC<{ r?: number; p?: number; color?: string }> = ({ r = 60, p = 1, color = GOLD }) => {
  const a = Math.max(0.01, p) * 1.7 * Math.PI;
  const x = Math.sin(a) * r;
  const y = -Math.cos(a) * r;
  return (
    <g>
      <path d={`M0 ${-r} A${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${x} ${y}`} fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" />
      {p > 0.2 && <path d="M-18 -16 L14 0 L-18 16 Z" fill={color} transform={`translate(${x} ${y}) rotate(${(a * 180) / Math.PI})`} />}
    </g>
  );
};

/** Bức tường gạch. */
export const Wall: React.FC<{ w?: number; h?: number; rows?: number }> = ({ w = 120, h = 400, rows = 8 }) => (
  <g>
    {Array.from({ length: rows }, (_, r) =>
      [0, 1].map((c) => (
        <rect key={`${r}-${c}`} x={-w / 2 + (r % 2 ? (c ? w / 2 : -w / 4) : c * (w / 2)) + 3} y={-h / 2 + r * (h / rows) + 3} width={r % 2 && !c ? w * 0.75 - 6 : w / 2 - 6} height={h / rows - 6} rx={4} fill={r % 2 ? HOV : SEC} />
      )),
    )}
  </g>
);

/** Ổ đĩa máy tính. */
export const Disk: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={240} h={170} rx={22} fill={TXT} />
    <circle cx={-30} cy={0} r={56} fill={HOV} />
    <circle cx={-30} cy={0} r={14} fill={TXT} />
    <line x1={-30} y1={0} x2={60} y2={50} stroke={GOLD} strokeWidth={10} strokeLinecap="round" />
    <circle cx={85} cy={-55} r={10} fill={GOLD} />
  </g>
);

/** Dấu hiệu chung của ChatGPT (vòng sáu cạnh), không phải logo. */
export const MarkGpt: React.FC<{ r?: number }> = ({ r = 46 }) => (
  <g>
    <circle r={r} fill={TXT} />
    <path d={Array.from({ length: 6 }, (_, i) => `${i ? "L" : "M"}${Math.cos((i * Math.PI) / 3) * r * 0.55} ${Math.sin((i * Math.PI) / 3) * r * 0.55}`).join(" ") + " Z"} fill="none" stroke={INK} strokeWidth={r * 0.16} strokeLinejoin="round" />
  </g>
);

/** Dấu hiệu chung của Claude (tia nắng), không phải logo. */
export const MarkClaude: React.FC<{ r?: number }> = ({ r = 46 }) => (
  <g>
    <circle r={r} fill={GOLDL} />
    {Array.from({ length: 8 }, (_, i) => (
      <line key={i} y1={-r * 0.18} y2={-r * 0.66} stroke={INK} strokeWidth={r * 0.14} strokeLinecap="round" transform={`rotate(${i * 45})`} />
    ))}
  </g>
);

/** File nhỏ có góc gập. */
export const FileIcon: React.FC<{ s?: number; fill?: string; ink?: string }> = ({ s = 1, fill = TXT, ink = SEC }) => (
  <G s={s}>
    <path d="M-44 -58 H18 L44 -32 V58 H-44 Z" fill={fill} />
    <path d="M18 -58 V-32 H44" fill={GOLD} />
    <Lines x={-28} y={-12} w={56} n={3} gap={20} color={ink} t={8} />
  </G>
);

/** Máy tính xách tay, nắp mở theo open. */
export const Laptop: React.FC<{ open?: number; children?: React.ReactNode }> = ({ open = 1, children }) => (
  <g>
    <g transform={`translate(0 0) scale(1 ${Math.max(0.02, open)})`}>
      <Box cx={0} cy={-180} w={620} h={380} rx={22} fill={EL} stroke={GOLD} strokeWidth={6} />
      {open > 0.6 && children}
    </g>
    <path d="M-370 0 H370 L330 40 H-330 Z" fill={HOV} />
    <rect x={-60} y={6} width={120} height={14} rx={7} fill={SURF} />
  </g>
);
