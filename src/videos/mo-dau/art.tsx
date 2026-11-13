import React from "react";
import { Box, G, GOLD, GOLDL, HOV, INK, SEC, TXT } from "../shared/art";

/** Tranh riêng của bài Mở đầu. shortcut: toạ độ chỉ vẽ cho khổ 4:5, đổi khổ thì dựng bố cục mới. */

/** Bảng tính: đầu cột vàng, các ô sáng. litCol đánh dấu một cột. */
export const Sheet: React.FC<{ w: number; h: number; cols?: number; rows?: number; litCol?: number; fill?: string }> = ({ w, h, cols = 4, rows = 5, litCol = -1, fill = TXT }) => {
  const cw = w / cols;
  const ch = h / rows;
  return (
    <g>
      <Box cx={0} cy={0} w={w + 16} h={h + 16} rx={14} fill={INK} stroke={HOV} strokeWidth={4} />
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        return <rect key={i} x={-w / 2 + c * cw + 3} y={-h / 2 + r * ch + 3} width={cw - 6} height={ch - 6} rx={5} fill={r === 0 ? GOLD : c === litCol ? GOLDL : fill} />;
      })}
    </g>
  );
};

/** Ba ô số thứ tự (vẽ bằng chấm, không ghi số), ô đang nói thì sáng. */
export const Steps: React.FC<{ active: number; p?: number[] }> = ({ active, p = [1, 1, 1] }) => (
  <g>
    {[0, 1, 2].map((k) => (
      <G key={k} x={(k - 1) * 240} y={0} s={p[k] ?? 1}>
        <circle r={58} fill={k === active ? GOLD : INK} stroke={k === active ? GOLDL : HOV} strokeWidth={6} />
        {Array.from({ length: k + 1 }, (_, d) => (
          <circle key={d} cx={(d - k / 2) * 26} cy={0} r={9} fill={k === active ? INK : SEC} />
        ))}
      </G>
    ))}
  </g>
);

/** Điện thoại. */
export const Phone: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <g>
    <Box cx={0} cy={0} w={220} h={400} rx={36} fill={INK} stroke={HOV} strokeWidth={8} />
    <rect x={-40} y={-184} width={80} height={12} rx={6} fill={HOV} />
    {children}
  </g>
);

/** Bút viết. */
export const Pen: React.FC<{ fill?: string }> = ({ fill = GOLD }) => (
  <g>
    <rect x={-16} y={-110} width={32} height={170} rx={10} fill={fill} />
    <path d="M-16 60 L0 100 L16 60 Z" fill={TXT} />
    <rect x={-16} y={-110} width={32} height={30} rx={10} fill={HOV} />
  </g>
);

/** Ngoặc code. */
export const CodeMark: React.FC = () => (
  <path d="M-40 -50 L-90 0 L-40 50 M40 -50 L90 0 L40 50 M20 -70 L-20 70" fill="none" stroke={SEC} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
);

/** Bánh răng. */
export const Gear: React.FC<{ r?: number; rot?: number; fill?: string }> = ({ r = 50, rot = 0, fill = GOLD }) => (
  <G r={rot}>
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={-r * 0.16} y={-r * 1.22} width={r * 0.32} height={r * 0.44} rx={r * 0.06} fill={fill} transform={`rotate(${i * 45})`} />
    ))}
    <circle r={r} fill={fill} />
    <circle r={r * 0.38} fill={INK} />
  </G>
);
