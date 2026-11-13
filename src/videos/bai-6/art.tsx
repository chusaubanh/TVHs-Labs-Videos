import React from "react";
import { Box, EL, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, RED, SEC, SURF, TXT, XL } from "../shared/art";

/** Tranh riêng của Bài 6. shortcut: toạ độ chỉ vẽ cho khổ 4:5 đã duyệt, đổi khổ thì phải dựng bố cục mới. */
export const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));
export const BLUE = "#2563EB";

/** Kéo; open 0..1 là độ mở hai lưỡi. */
export const Scissors: React.FC<{ s?: number; open?: number }> = ({ s = 1, open = 0.5 }) => (
  <G s={s}>
    {[-1, 1].map((d) => (
      <g key={d} transform={`rotate(${d * open * 18})`}>
        <path d={`M0 0 L150 ${d * 10} L150 ${d * -2} Z`} fill={SEC} stroke={TXT} strokeWidth={3} />
        <circle cx={-46} cy={d * 26} r={24} fill="none" stroke={GOLD} strokeWidth={12} />
        <line x1={-26} y1={d * 16} x2={4} y2={0} stroke={GOLD} strokeWidth={12} strokeLinecap="round" />
      </g>
    ))}
    <circle r={8} fill={INK} />
  </G>
);

/** Dải giấy cắt ra từ văn bản. */
export const Strip: React.FC<{ w?: number; lit?: number }> = ({ w = 300, lit = 0 }) => (
  <g>
    <path d={`M${-w / 2} -30 L${w / 2} -30 L${w / 2 - 8} -18 L${w / 2} -6 L${w / 2 - 8} 6 L${w / 2} 18 L${w / 2} 30 L${-w / 2} 30 L${-w / 2 + 8} 14 L${-w / 2} 0 L${-w / 2 + 8} -14 Z`} fill={PAPER} stroke={lit > 0.5 ? GOLD : "none"} strokeWidth={4} />
    <Lines x={-w / 2 + 22} y={-12} w={w - 50} n={2} gap={22} color={SEC} t={8} />
  </g>
);

/** Một trang tài liệu; mark là ô sáng (mức phạt…), fold là trang đang gập kín. */
export const Page: React.FC<{ w?: number; h?: number; mark?: number; fold?: number; head?: string }> = ({ w = 150, h = 200, mark = 0, fold = 0, head = INK }) => (
  <g>
    <Box cx={6} cy={8} w={w} h={h} rx={10} fill="#000" opacity={0.3} />
    <Box cx={0} cy={0} w={w} h={h} rx={10} fill={PAPER} />
    <rect x={-w / 2 + 16} y={-h / 2 + 16} width={w * 0.55} height={14} rx={6} fill={head} />
    <Lines x={-w / 2 + 16} y={-h / 2 + 50} w={w - 32} n={Math.max(2, Math.floor((h - 70) / 26))} gap={24} color={SEC} t={7} />
    {mark > 0.01 && <Box cx={0} cy={h / 2 - 40} w={w - 30} h={36} rx={8} fill={GOLD} opacity={mark} stroke={RED} strokeWidth={4} />}
    {fold > 0.01 && (
      <g opacity={fold}>
        <Box cx={0} cy={0} w={w} h={h} rx={10} fill={HOV} />
        <path d={`M${-w / 2} ${-h / 2} L${w / 2} ${h / 2} M${w / 2} ${-h / 2} L${-w / 2} ${h / 2}`} stroke={SEC} strokeWidth={4} opacity={0.5} />
        <rect x={-20} y={-30} width={40} height={60} rx={8} fill={GOLD} />
        <circle cy={-6} r={8} fill={INK} />
      </g>
    )}
  </g>
);

/** Cuốn sách dày bị che kín, chỉ lộ một trang qua khe; slit 0..1 là độ mở khe. */
export const ShutBook: React.FC<{ w?: number; h?: number; slit?: number }> = ({ w = 560, h = 400, slit = 1 }) => (
  <g>
    {Array.from({ length: 6 }, (_, k) => <Box key={k} cx={14 + k * 4} cy={14 + k * 4} w={w} h={h} rx={14} fill={k % 2 ? "#D9CFBC" : PAPER} />)}
    <Box cx={0} cy={0} w={w} h={h} rx={14} fill="#1E293B" stroke={GOLD} strokeWidth={6} />
    <rect x={-w / 2} y={-h / 2} width={40} height={h} rx={10} fill={GOLD} opacity={0.8} />
    <Box cx={30} cy={0} w={170 * slit} h={h - 80} rx={8} fill={PAPER} />
    {slit > 0.5 && <Lines x={-40} y={-h / 2 + 70} w={140} n={8} gap={30} color={SEC} t={8} />}
    {slit > 0.01 && <Box cx={30} cy={0} w={170 * slit + 20} h={h - 60} rx={10} fill="none" stroke={GOLDL} strokeWidth={5} />}
  </g>
);

/** Phiếu khảo sát kẹp bìa với các ô tích. */
export const Clipboard: React.FC<{ s?: number; ticks?: number }> = ({ s = 1, ticks = 0 }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={300} h={400} rx={18} fill={"#6B5330"} stroke={GOLD} strokeWidth={5} />
    <Box cx={0} cy={14} w={250} h={340} rx={8} fill={PAPER} />
    <Box cx={0} cy={-178} w={120} h={40} rx={10} fill={SEC} />
    {[0, 1, 2, 3].map((k) => (
      <g key={k}>
        <Box cx={-90} cy={-100 + k * 76} w={34} h={34} rx={6} fill="none" stroke={HOV} strokeWidth={4} />
        {k < ticks && <path d={`M-102 ${-100 + k * 76} l9 9 l17 -18`} fill="none" stroke={XL} strokeWidth={6} strokeLinecap="round" />}
        <rect x={-58} y={-108 + k * 76} width={150 - (k % 2) * 40} height={14} rx={7} fill={SEC} />
      </g>
    ))}
  </G>
);

/** Cán cân pháp chế nhỏ (huy hiệu). */
export const Scales: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = GOLDL }) => (
  <G s={s}>
    <line x1={0} y1={-60} x2={0} y2={50} stroke={color} strokeWidth={8} />
    <line x1={-60} y1={-40} x2={60} y2={-40} stroke={color} strokeWidth={7} />
    {[-60, 60].map((x) => <path key={x} d={`M${x - 26} 10 Q${x} 36 ${x + 26} 10 Z M${x} -40 L${x - 24} 10 M${x} -40 L${x + 24} 10`} fill={color} stroke={color} strokeWidth={3} />)}
    <rect x={-30} y={48} width={60} height={12} rx={6} fill={color} />
  </G>
);

/** Máy cắt giấy với đống giấy vụn bên dưới. */
export const Shredder: React.FC<{ s?: number; t?: number }> = ({ s = 1, t = 0 }) => (
  <G s={s}>
    <Box cx={0} cy={-40} w={260} h={110} rx={18} fill={HOV} stroke={SEC} strokeWidth={4} />
    <rect x={-100} y={-96} width={200} height={14} rx={7} fill={INK} />
    <circle cx={90} cy={-40} r={10} fill={RED} />
    {Array.from({ length: 12 }, (_, k) => (
      <rect key={k} x={-110 + k * 19} y={20 + ((k * 7 + Math.floor(t / 4)) % 5) * 6} width={10} height={60 + ((k * 13) % 4) * 14} rx={3} fill={PAPER} transform={`rotate(${((k * 17) % 9) - 4} ${-105 + k * 19} 20)`} />
    ))}
  </G>
);

/** Mỏ neo. */
export const Anchor: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = GOLD }) => (
  <G s={s}>
    <circle cy={-84} r={18} fill="none" stroke={color} strokeWidth={10} />
    <line x1={0} y1={-66} x2={0} y2={70} stroke={color} strokeWidth={14} strokeLinecap="round" />
    <line x1={-40} y1={-40} x2={40} y2={-40} stroke={color} strokeWidth={12} strokeLinecap="round" />
    <path d="M-70 20 Q-60 80 0 80 Q60 80 70 20" fill="none" stroke={color} strokeWidth={14} strokeLinecap="round" />
    <path d="M-86 30 L-70 6 L-54 30 Z M86 30 L70 6 L54 30 Z" fill={color} />
  </G>
);

/** Búa phạt. */
export const Gavel: React.FC<{ s?: number; r?: number }> = ({ s = 1, r = -30 }) => (
  <G s={s} r={r}>
    <rect x={-8} y={-10} width={16} height={110} rx={6} fill={GOLD} />
    <Box cx={0} cy={-26} w={110} h={44} rx={10} fill="#78350F" stroke={GOLD} strokeWidth={4} />
  </G>
);

/** Biển quay đầu. */
export const UTurn: React.FC<{ s?: number; p?: number }> = ({ s = 1, p = 1 }) => {
  const a = Math.max(0.01, p) * Math.PI;
  return (
    <G s={s}>
      <circle r={110} fill={TXT} stroke={RED} strokeWidth={14} />
      <path d={`M-40 60 V-10 A40 40 0 0 1 ${-40 + 40 - Math.cos(a) * 40} ${-10 - Math.sin(a) * 40}`} fill="none" stroke={INK} strokeWidth={16} strokeLinecap="round" />
      {p > 0.9 && <path d="M40 -10 V30 M18 14 L40 44 L62 14" fill="none" stroke={INK} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />}
    </G>
  );
};

/** Nhãn loại file trên một file: PDF đỏ hoặc Word xanh. */
export const KindFile: React.FC<{ s?: number; kind: "pdf" | "word" }> = ({ s = 1, kind }) => (
  <G s={s}>
    <path d="M-70 -90 H30 L70 -50 V90 H-70 Z" fill={TXT} />
    <path d="M30 -90 V-50 H70" fill={SEC} />
    <Lines x={-48} y={-30} w={96} n={4} gap={24} color={SEC} t={8} />
    <Box cx={-14} cy={66} w={110} h={40} rx={8} fill={kind === "pdf" ? RED : BLUE} />
    <rect x={-50} y={60} width={72} height={12} rx={6} fill={TXT} opacity={0.85} />
  </G>
);

/** Tấm mục lục: cột chương, cột tên điều, cột phụ lục; miss là ô phụ lục bị thiếu (-1 không thiếu). */
export const Toc: React.FC<{ w?: number; h?: number; p?: [number, number, number]; miss?: number; flash?: number }> = ({ w = 760, h = 340, p = [1, 1, 1], miss = -1, flash = 0 }) => {
  const cw = w / 3;
  return (
    <g>
      <Box cx={8} cy={10} w={w} h={h} rx={22} fill="#000" opacity={0.35} />
      <Box cx={0} cy={0} w={w} h={h} rx={22} fill={EL} stroke={GOLD} strokeWidth={5} />
      {[1, 2].map((k) => <line key={k} x1={-w / 2 + k * cw} x2={-w / 2 + k * cw} y1={-h / 2 + 24} y2={h / 2 - 24} stroke={HOV} strokeWidth={3} />)}
      {/* Cột chương: các khối chương xếp chồng. */}
      {Array.from({ length: 4 }, (_, k) => (
        <Box key={k} cx={-w / 2 + cw / 2} cy={-h / 2 + 60 + k * 64} w={cw - 70} h={46} rx={10} fill={[GOLD, GOLDL, GOLD, GOLDL][k]} opacity={clamp01(p[0] * 4 - k)} />
      ))}
      {/* Cột tên từng điều. */}
      {Array.from({ length: 7 }, (_, k) => (
        <g key={k} opacity={clamp01(p[1] * 7 - k)}>
          <circle cx={-w / 2 + cw + 30} cy={-h / 2 + 46 + k * 40} r={9} fill={GOLD} />
          <rect x={-w / 2 + cw + 50} y={-h / 2 + 40 + k * 40} width={cw - 90 - (k % 3) * 20} height={12} rx={6} fill={SEC} />
        </g>
      ))}
      {/* Cột phụ lục. */}
      {[0, 1, 2].map((k) => {
        const missing = k === miss;
        return (
          <G key={k} x={w / 2 - cw / 2} y={-h / 2 + 70 + k * 96} o={clamp01(p[2] * 3 - k)}>
            {missing ? (
              <Box cx={0} cy={0} w={cw - 60} h={70} rx={10} fill={RED} opacity={0.15 + 0.45 * flash} stroke={RED} strokeWidth={5} strokeDasharray="12 8" />
            ) : (
              <>
                <Box cx={0} cy={0} w={cw - 60} h={70} rx={10} fill={PAPER} />
                <rect x={-(cw - 60) / 2 + 16} y={-14} width={(cw - 60) * 0.6} height={12} rx={6} fill={INK} opacity={0.6} />
                <rect x={-(cw - 60) / 2 + 16} y={6} width={(cw - 60) * 0.4} height={10} rx={5} fill={SEC} />
              </>
            )}
          </G>
        );
      })}
    </g>
  );
};

/** Thanh nạp: v từ 0 đến 1. */
export const LoadBar: React.FC<{ w?: number; v?: number }> = ({ w = 480, v = 0 }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={40} rx={20} fill={SURF} stroke={HOV} strokeWidth={4} />
    <rect x={-w / 2 + 6} y={-14} width={(w - 12) * v} height={28} rx={14} fill={v > 0.98 ? XL : GOLD} />
  </g>
);
