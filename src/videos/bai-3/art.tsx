import React from "react";
import { Box, EL, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, Person, SEC, Spark, SURF, TXT, XL } from "../shared/art";

/** Tranh riêng của Bài 3. shortcut: toạ độ chỉ vẽ cho khổ 4:5, đổi khổ thì dựng bố cục mới. */

export const ORANGE = "#F59E0B";
export const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

/** Lưới ô số lít nhít; n là số cột đang hiện (mọc dần). */
export const Grid: React.FC<{ cols: number; rows: number; w: number; h: number; n?: number; fill?: string; ink?: string; head?: string }> = ({ cols, rows, w, h, n = cols, fill = TXT, ink = SEC, head = XL }) => {
  const cw = w / cols;
  const ch = h / rows;
  const shown = Math.max(0, Math.min(cols, n));
  return (
    <g>
      {Array.from({ length: rows * Math.ceil(shown) }, (_, i) => {
        const c = i % Math.ceil(shown);
        const r = Math.floor(i / Math.ceil(shown));
        const x = -w / 2 + c * cw;
        const y = -h / 2 + r * ch;
        return (
          <g key={i} opacity={c + 1 > shown ? shown - c : 1}>
            <rect x={x + 1.5} y={y + 1.5} width={cw - 3} height={ch - 3} rx={Math.min(4, cw / 6)} fill={r === 0 ? head : fill} />
            {r > 0 && <rect x={x + cw * 0.18} y={y + ch * 0.38} width={cw * (0.4 + ((i * 7) % 5) * 0.08)} height={Math.max(2, ch * 0.24)} rx={1} fill={ink} />}
          </g>
        );
      })}
    </g>
  );
};

/** Điện thoại: thân, màn hình, tai thỏ. */
export const Phone: React.FC<{ w?: number; h?: number; screen?: string; children?: React.ReactNode }> = ({ w = 300, h = 560, screen = SURF, children }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={w * 0.15} fill={INK} stroke={HOV} strokeWidth={8} />
    <Box cx={0} cy={0} w={w - 28} h={h - 40} rx={w * 0.1} fill={screen} />
    <Box cx={0} cy={-h / 2 + 22} w={w * 0.3} h={14} rx={7} fill={HOV} />
    <Box cx={0} cy={h / 2 - 12} w={w * 0.28} h={6} rx={3} fill={HOV} />
    {children}
  </g>
);

/** Trang báo cáo HTML: ô kết luận ở đầu (v), mục lục bên trái (toc), tô màu xanh / cam (c). */
export const Report: React.FC<{ w: number; h: number; v?: number; toc?: number; c?: number; dim?: number; hl?: number }> = ({ w, h, v = 1, toc = 1, c = 1, dim = 0, hl = 0 }) => {
  const top = -h / 2;
  const left = -w / 2;
  const vh = h * 0.2;
  const tw = w * 0.24 * toc;
  // Bố cục cố định: ô kết luận chỉ hiện dần, không đẩy bảng, để không chồng lên nhau.
  const tableTop = top + 56 + vh + 12;
  const tableH = h / 2 - 20 - tableTop;
  const rows = 5;
  const cols = 3;
  const rh = tableH / rows;
  const cw = (w - 40 - tw - (toc > 0.05 ? 14 : 0)) / cols;
  const tx = left + 20 + tw + (toc > 0.05 ? 14 : 0);
  const tone = (r: number, k: number): string => {
    if (dim > 0.5) return HOV;
    if (c > 0.05 && r === 1 && k === 1) return XL;
    if (c > 0.05 && r === 3 && k === 2) return ORANGE;
    if (c > 0.05 && r === 4 && k === 0) return XL;
    return c > 0.5 ? "#D6D2C8" : PAPER;
  };
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={h} rx={20} fill={dim > 0.5 ? EL : "#FBF8F1"} stroke={dim > 0.5 ? HOV : GOLD} strokeWidth={5} />
      <rect x={left} y={top} width={w} height={44} rx={20} fill={dim > 0.5 ? HOV : GOLD} />
      <rect x={left + 24} y={top + 16} width={w * 0.3} height={12} rx={6} fill={INK} />
      {v > 0.02 && (
        <g opacity={clamp01(v * 1.4)}>
          <rect x={left + 20} y={top + 56} width={(w - 40) * v} height={vh - 6} rx={14} fill={INK} stroke={GOLD} strokeWidth={5} />
          <rect x={left + 44} y={top + 56 + vh * 0.28} width={(w - 120) * 0.55 * v} height={vh * 0.16} rx={6} fill={GOLD} />
          <rect x={left + 44} y={top + 56 + vh * 0.56} width={(w - 120) * 0.8 * v} height={vh * 0.1} rx={4} fill={SEC} />
          <G x={left + w - 70} y={top + 56 + vh * 0.45} s={v}>
            <Spark r={vh * 0.18} fill={GOLDL} />
          </G>
        </g>
      )}
      {toc > 0.05 && (
        <g>
          <rect x={left + 20} y={tableTop} width={tw} height={tableH} rx={12} fill={dim > 0.5 ? SURF : INK} />
          {Array.from({ length: 5 }, (_, i) => (
            <rect key={i} x={left + 32} y={tableTop + 18 + i * (tableH / 5.4)} width={(tw - 24) * (i === 2 ? 1 : 0.75)} height={Math.min(16, tableH / 12)} rx={6} fill={i === 2 ? GOLD : SEC} />
          ))}
        </g>
      )}
      <g>
        {Array.from({ length: rows * cols }, (_, i) => {
          const r = Math.floor(i / cols);
          const k = i % cols;
          const y = tableTop + r * rh;
          return (
            <g key={i}>
              <rect x={tx + k * cw + 3} y={y + 3} width={cw - 6} height={rh - 6} rx={8} fill={tone(r, k)} />
              <rect x={tx + k * cw + 14} y={y + rh * 0.42} width={(cw - 28) * (0.5 + ((i * 3) % 4) * 0.12)} height={Math.max(4, rh * 0.14)} rx={3} fill={dim > 0.5 ? SEC : INK} opacity={0.7} />
            </g>
          );
        })}
      </g>
      {hl > 0.02 && <rect x={tx} y={tableTop + 2 * rh} width={cw * cols} height={rh} rx={10} fill="none" stroke={GOLD} strokeWidth={6} opacity={hl} />}
    </g>
  );
};

/** Sếp: người có cà vạt vàng. */
export const Boss: React.FC<{ s?: number; fill?: string }> = ({ s = 1, fill = TXT }) => (
  <G s={s}>
    <Person fill={fill} />
    <path d="M-10 -28 L10 -28 L6 -8 L14 30 L0 42 L-14 30 L-6 -8 Z" fill={GOLD} />
    <rect x={-30} y={-86} width={24} height={14} rx={7} fill="none" stroke={INK} strokeWidth={4} />
    <rect x={6} y={-86} width={24} height={14} rx={7} fill="none" stroke={INK} strokeWidth={4} />
  </G>
);

/** Chồng trang Word: n trang xếp lệch. */
export const WordStack: React.FC<{ n: number; w?: number; h?: number }> = ({ n, w = 170, h = 220 }) => (
  <g>
    {Array.from({ length: Math.max(1, Math.round(n)) }, (_, i) => (
      <g key={i} transform={`translate(${i * 4} ${-i * 9})`}>
        <Box cx={0} cy={0} w={w} h={h} rx={10} fill={i % 2 ? "#DCE6F7" : TXT} stroke={HOV} strokeWidth={2} />
        <rect x={-w / 2} y={-h / 2} width={w} height={26} rx={10} fill="#2B579A" />
        <Lines x={-w / 2 + 18} y={-h / 2 + 44} w={w - 36} n={5} gap={30} color={SEC} t={9} />
      </g>
    ))}
  </g>
);

/** Thẻ việc có ô tích. */
export const KCard: React.FC<{ w?: number; h?: number; done?: number; fill?: string }> = ({ w = 160, h = 56, done = 0, fill = TXT }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={10} fill={done > 0.5 ? XL : fill} />
    <Box cx={-w / 2 + 24} cy={0} w={24} h={24} rx={6} fill="none" stroke={INK} strokeWidth={4} />
    {done > 0.05 && <path d={`M${-w / 2 + 15} 0 L${-w / 2 + 22} 8 L${-w / 2 + 34} -8`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" opacity={clamp01(done * 2)} />}
    <rect x={-w / 2 + 46} y={-6} width={(w - 66) * 0.85} height={12} rx={6} fill={done > 0.5 ? INK : SEC} />
  </g>
);

/** Bức tường mã: các vạch màu như dòng code. */
export const CodeWall: React.FC<{ w: number; h: number; rows?: number; fade?: number }> = ({ w, h, rows = 12, fade = 0 }) => {
  const palette = [GOLD, XL, "#60A5FA", SEC, ORANGE];
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={h} rx={18} fill={SURF} stroke={HOV} strokeWidth={4} opacity={1 - fade} />
      {Array.from({ length: rows * 4 }, (_, i) => {
        const r = Math.floor(i / 4);
        const k = i % 4;
        const seg = [0.12, 0.22, 0.18, 0.26][(r + k) % 4];
        const x = -w / 2 + 30 + (r % 3) * 30 + k * w * 0.22;
        const y = -h / 2 + 26 + r * ((h - 40) / rows);
        // Mỗi vạch tan theo thứ tự cố định để khung tất định.
        const o = clamp01(1 - fade * 1.6 + ((i * 37) % 11) / 22);
        return <rect key={i} x={x} y={y + fade * ((i * 13) % 7) * 18} width={w * seg} height={Math.max(8, h / rows / 2.6)} rx={5} fill={palette[(i * 3) % 5]} opacity={o * (1 - fade * 0.6)} />;
      })}
    </g>
  );
};

/** Con mắt nhìn. */
export const Eye: React.FC<{ s?: number; look?: number }> = ({ s = 1, look = 0 }) => (
  <G s={s}>
    <path d="M-120 0 Q0 -90 120 0 Q0 90 -120 0 Z" fill={TXT} stroke={GOLD} strokeWidth={8} />
    <circle cx={look * 30} cy={0} r={42} fill={GOLD} />
    <circle cx={look * 30} cy={0} r={20} fill={INK} />
    <circle cx={look * 30 + 12} cy={-12} r={7} fill={TXT} />
  </G>
);

/** Song sắt xám chặn ngang một khung. */
export const Bars: React.FC<{ w: number; h: number; n?: number; drop?: number }> = ({ w, h, n = 6, drop = 0 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <rect key={i} x={-w / 2 + (i + 0.5) * (w / n) - 7} y={-h / 2 - 20 + drop * (200 + i * 60)} width={14} height={h + 40} rx={7} fill="#9FB4C7" opacity={1 - drop} transform={`rotate(${drop * (i % 2 ? 25 : -25)} ${-w / 2 + (i + 0.5) * (w / n)} 0)`} />
    ))}
    <rect x={-w / 2 - 20} y={-h / 2 - 26} width={w + 40} height={16} rx={8} fill="#9FB4C7" opacity={1 - drop} />
    <rect x={-w / 2 - 20} y={h / 2 + 10} width={w + 40} height={16} rx={8} fill="#9FB4C7" opacity={1 - drop} />
  </g>
);

/** Ghi chú dán có đinh ghim. */
export const Note: React.FC<{ s?: number; glow?: number }> = ({ s = 1, glow = 1 }) => (
  <G s={s}>
    <rect x={-110} y={-90} width={220} height={180} rx={10} fill="none" stroke={GOLDL} strokeWidth={8} opacity={0.5 * glow} transform="scale(1.1)" />
    <Box cx={0} cy={0} w={200} h={160} rx={8} fill={GOLDL} />
    <Lines x={-70} y={-24} w={140} n={3} gap={28} color={INK} t={11} />
    <circle cx={0} cy={-70} r={16} fill={"#DC2626"} />
    <rect x={-3} y={-60} width={6} height={22} rx={3} fill={HOV} />
  </G>
);
