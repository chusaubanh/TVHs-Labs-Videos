import React from "react";
import { Img, staticFile } from "remotion";
import { EL, G, GOLD, GOLDL, HOV, INK, PAPER, RED, SEC, XL } from "../tro-ly-phap-che/art";

/** Bộ hình vẽ dùng chung cho cảnh b-roll của video Trợ lý Làm Báo cáo. Chữ chỉ qua Tag/Label ở cảnh. */
export const ORANGE = "#E07B39";
export const LOGO_DIR = "jobs/huong-dan-su-dung-tro-ly-lam-bao-cao/logos";
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const Logo: React.FC<{ name: "claude" | "chrome" | "excel"; x: number; y: number; size: number; p: number }> = ({ name, x, y, size, p }) => (
  <Img src={staticFile(`${LOGO_DIR}/${name}.svg`)} style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, objectFit: "contain", transform: `scale(${p})`, opacity: clamp01(p) }} />
);

/** Tờ văn bản: tiêu đề đậm, các dòng chữ, tuỳ chọn ô số làm mờ như bút chì. */
export const Sheet: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; w?: number; h?: number; stroke?: string; fill?: string; ink?: string; n?: number; pencil?: boolean; head?: string }> = ({
  x, y, s = 1, o = 1, r = 0, w = 220, h = 290, stroke = GOLD, fill = EL, ink = SEC, n = 6, pencil = false, head = GOLDL,
}) => (
  <G x={x} y={y} s={s} o={o} r={r}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill={fill} stroke={stroke} strokeWidth={4} />
    <rect x={-w / 2 + 28} y={-h / 2 + 30} width={w * 0.5} height={16} rx={8} fill={head} />
    {Array.from({ length: n }, (_, i) => (
      <rect key={i} x={-w / 2 + 28} y={-h / 2 + 70 + i * 28} width={(w - 56) * (i % 3 === 2 ? 0.6 : i % 3 === 1 ? 0.85 : 1)} height={10} rx={5} fill={ink} />
    ))}
    {pencil && <rect x={-w / 2 + 28} y={h / 2 - 54} width={w * 0.45} height={16} rx={8} fill="rgba(237,237,237,0.18)" stroke={SEC} strokeWidth={2} strokeDasharray="6 6" />}
  </G>
);

/** Hoá đơn: tờ giấy sáng với dòng và ô tổng. */
export const Invoice: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <G x={x} y={y} s={s} o={o} r={r}>
    <rect x={-100} y={-135} width={200} height={270} rx={14} fill={PAPER} stroke={GOLD} strokeWidth={4} />
    <rect x={-70} y={-105} width={90} height={14} rx={7} fill="#6B6458" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={-70} y={-62 + i * 34} width={80} height={9} rx={4} fill="#B9B3A6" />
        <rect x={34} y={-62 + i * 34} width={36} height={9} rx={4} fill="#B9B3A6" />
      </g>
    ))}
    <rect x={-70} y={86} width={140} height={22} rx={8} fill={GOLD} />
  </G>
);

export const Folder: React.FC<{ x: number; y: number; s?: number; o?: number; stroke?: string; fill?: string; plate?: boolean }> = ({ x, y, s = 1, o = 1, stroke = GOLDL, fill = EL, plate = true }) => (
  <G x={x} y={y} s={s} o={o}>
    <path d="M-170 -100 L-60 -100 L-30 -70 L170 -70 L170 110 L-170 110 Z" fill={fill} stroke={stroke} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-170} y={-40} width={340} height={150} rx={14} fill={fill} stroke={stroke} strokeWidth={6} opacity={0.0} />
    {plate && <rect x={-110} y={20} width={220} height={34} rx={17} fill={stroke} opacity={0.85} />}
  </G>
);

export const Zip: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <G x={x} y={y} s={s} o={o}>
    <rect x={-85} y={-105} width={170} height={210} rx={18} fill={EL} stroke={GOLDL} strokeWidth={6} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <rect key={i} x={i % 2 ? -4 : -22} y={-95 + i * 22} width={26} height={14} fill={GOLDL} />
    ))}
    <rect x={-24} y={30} width={48} height={42} rx={8} fill={GOLD} />
  </G>
);

/** Cửa sổ chat mô phỏng: thanh tiêu đề, vùng tin nhắn, ô gõ. Nội dung con vẽ theo toạ độ giữa cửa sổ. */
export const ChatWin: React.FC<{ x: number; y: number; w?: number; h?: number; s?: number; o?: number; stroke?: string; children?: React.ReactNode }> = ({ x, y, w = 760, h = 520, s = 1, o = 1, stroke = GOLD, children }) => (
  <G x={x} y={y} s={s} o={o}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={26} fill="#15171B" stroke={stroke} strokeWidth={4} />
    <rect x={-w / 2} y={-h / 2} width={w} height={54} rx={26} fill="#1E1F23" />
    <rect x={-w / 2} y={-h / 2 + 30} width={w} height={24} fill="#1E1F23" />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={-w / 2 + 34 + i * 28} cy={-h / 2 + 27} r={8} fill={i === 0 ? RED : i === 1 ? GOLD : XL} opacity={0.85} />
    ))}
    {children}
  </G>
);

/** Ô gõ ở đáy ChatWin; fill 0-1 là phần chữ đã gõ, caret nhấp nháy. */
export const InputBar: React.FC<{ w: number; h: number; fill: number; frame: number; send?: boolean; color?: string; text?: string; size?: number }> = ({ w, h, fill, frame, send = false, color = GOLDL, text, size = 28 }) => (
  <G x={0} y={h / 2 - 62}>
    <rect x={-w / 2 + 28} y={-26} width={w - 56} height={52} rx={26} fill="#0F1114" stroke={HOV} strokeWidth={2} />
    {text === undefined ? (
      <>
        <rect x={-w / 2 + 56} y={-6} width={Math.max(0, (w - 220) * fill)} height={12} rx={6} fill={color} />
        {fill < 1 && Math.floor(frame / 12) % 2 === 0 && <rect x={-w / 2 + 60 + (w - 220) * fill} y={-13} width={4} height={26} fill={color} />}
      </>
    ) : (
      <>
        <text x={-w / 2 + 56} y={size * 0.35} fontSize={size} fontWeight={600} fill={color} style={{ fontFamily: "inherit", whiteSpace: "pre" }}>
          {text}
        </text>
        {fill < 1 && Math.floor(frame / 12) % 2 === 0 && <rect x={-w / 2 + 60 + text.length * size * 0.52} y={-13} width={4} height={26} fill={color} />}
      </>
    )}
    <circle cx={w / 2 - 66} cy={0} r={18} fill={send ? XL : HOV} />
    <path d={`M${w / 2 - 74} 0 L${w / 2 - 58} 0 M${w / 2 - 64} -8 L${w / 2 - 56} 0 L${w / 2 - 64} 8`} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </G>
);

export const Bub: React.FC<{ x: number; y: number; w: number; n?: number; side?: "l" | "r"; s?: number; o?: number; color?: string; line?: string }> = ({ x, y, w, n = 2, side = "l", s = 1, o = 1, color = "#242730", line = SEC }) => (
  <G x={x} y={y} s={s} o={o}>
    <rect x={-w / 2} y={-18 - n * 14} width={w} height={36 + n * 28} rx={22} fill={color} />
    {Array.from({ length: n }, (_, i) => (
      <rect key={i} x={-w / 2 + 24} y={-n * 14 + i * 28 - 4} width={(w - 48) * (i === n - 1 && n > 1 ? 0.6 : 1)} height={10} rx={5} fill={line} />
    ))}
    <path d={side === "l" ? `M${-w / 2 + 18} ${18 + n * 14} l-12 14 l30 -10 Z` : `M${w / 2 - 18} ${18 + n * 14} l12 14 l-30 -10 Z`} fill={color} />
  </G>
);

export const Tick: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = XL }) => (
  <G x={x} y={y} s={s} o={o}>
    <circle r={34} fill={color} />
    <path d="M-15 0 L-4 12 L16 -12" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
  </G>
);

export const Cross: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string; r?: number }> = ({ x, y, s = 1, o = 1, color = RED, r = 34 }) => (
  <G x={x} y={y} s={s} o={o}>
    <circle r={r} fill={color} />
    <path d={`M${-r * 0.4} ${-r * 0.4} L${r * 0.4} ${r * 0.4} M${r * 0.4} ${-r * 0.4} L${-r * 0.4} ${r * 0.4}`} stroke={INK} strokeWidth={7} strokeLinecap="round" />
  </G>
);

/** Dấu hỏi vẽ bằng nét, không dùng chữ. */
export const Ask: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = ORANGE }) => (
  <G x={x} y={y} s={s} o={o}>
    <circle r={34} fill={color} />
    <path d="M-10 -10 C-10 -24 12 -24 12 -10 C12 0 0 0 0 10" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" />
    <circle cx={0} cy={22} r={4.5} fill={INK} />
  </G>
);

export const Robot: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string; eye?: number }> = ({ x, y, s = 1, o = 1, color = GOLDL, eye = 0 }) => (
  <G x={x} y={y} s={s} o={o}>
    <line x1={0} y1={-84} x2={0} y2={-62} stroke={color} strokeWidth={6} />
    <circle cx={0} cy={-90} r={9} fill={color} />
    <rect x={-70} y={-62} width={140} height={110} rx={28} fill={EL} stroke={color} strokeWidth={6} />
    <circle cx={-26 + eye * 10} cy={-14} r={13} fill={color} />
    <circle cx={26 + eye * 10} cy={-14} r={13} fill={color} />
    <rect x={-30} y={18} width={60} height={10} rx={5} fill={color} opacity={0.7} />
    <rect x={-52} y={58} width={104} height={64} rx={20} fill={EL} stroke={color} strokeWidth={6} />
  </G>
);

export const Hourglass: React.FC<{ x: number; y: number; s?: number; o?: number; t: number }> = ({ x, y, s = 1, o = 1, t }) => (
  <G x={x} y={y} s={s} o={o}>
    <path d="M-44 -78 L44 -78 L0 0 L44 78 L-44 78 L0 0 Z" fill="none" stroke={GOLDL} strokeWidth={7} strokeLinejoin="round" />
    <path d={`M${-36 + 28 * t} ${-66 + 50 * t} L${36 - 28 * t} ${-66 + 50 * t} L0 -6 Z`} fill={GOLDL} />
    <path d={`M${-30 * t} 70 L${30 * t} 70 L0 ${70 - 54 * t} Z`} fill={GOLDL} />
    <rect x={-54} y={-92} width={108} height={14} rx={7} fill={GOLD} />
    <rect x={-54} y={78} width={108} height={14} rx={7} fill={GOLD} />
  </G>
);

export const Cursor: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <G x={x} y={y} s={s} o={o}>
    <path d="M0 0 L0 52 L14 40 L26 66 L38 60 L26 36 L46 36 Z" fill="#FFFFFF" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
  </G>
);

export const Pen: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; color?: string }> = ({ x, y, s = 1, o = 1, r = 0, color = RED }) => (
  <G x={x} y={y} s={s} o={o} r={r}>
    <rect x={-12} y={-90} width={24} height={150} rx={8} fill={color} stroke={INK} strokeWidth={3} />
    <path d="M-12 60 L12 60 L0 90 Z" fill={PAPER} stroke={INK} strokeWidth={3} />
  </G>
);

export const Calc: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <G x={x} y={y} s={s} o={o}>
    <rect x={-80} y={-105} width={160} height={210} rx={18} fill={EL} stroke={GOLD} strokeWidth={5} />
    <rect x={-60} y={-85} width={120} height={46} rx={8} fill={GOLDL} opacity={0.85} />
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={-60 + (i % 3) * 42} y={-20 + Math.floor(i / 3) * 40} width={36} height={30} rx={7} fill={HOV} />
    ))}
  </G>
);

/** Đường nối cong giữa hai điểm, vẽ dần theo t (0-1). */
export const Wire: React.FC<{ x1: number; y1: number; x2: number; y2: number; t: number; color?: string; sw?: number; dash?: boolean }> = ({ x1, y1, x2, y2, t, color = GOLD, sw = 5, dash = false }) => {
  const mx = (x1 + x2) / 2;
  const len = 1200;
  return <path d={`M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeDasharray={dash ? "10 10" : `${len}`} strokeDashoffset={dash ? 0 : len * (1 - clamp01(t))} opacity={dash ? clamp01(t) : 1} />;
};

export const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; t?: number; color?: string; sw?: number }> = ({ x1, y1, x2, y2, t = 1, color = GOLDL, sw = 8 }) => {
  const ex = x1 + (x2 - x1) * t;
  const ey = y1 + (y2 - y1) * t;
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = (d: number) => ex - 26 * Math.cos(a + d);
  const hy = (d: number) => ey - 26 * Math.sin(a + d);
  return (
    <g opacity={clamp01(t * 3)}>
      <line x1={x1} y1={y1} x2={ex} y2={ey} stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <path d={`M${hx(0.5)} ${hy(0.5)} L${ex} ${ey} L${hx(-0.5)} ${hy(-0.5)}`} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

/** Dấu mốc tròn hay chữ nhật xoay, dùng đóng lên vật. */
export const Stamp: React.FC<{ x: number; y: number; w?: number; h?: number; p: number; color?: string; r?: number; ok?: boolean }> = ({ x, y, w = 200, h = 90, p, color = RED, r = -8, ok = false }) => (
  <G x={x} y={y} s={2 - clamp01(p)} o={clamp01(p)} r={r}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill="rgba(12,12,12,0.7)" stroke={color} strokeWidth={8} />
    {ok ? (
      <path d={`M${-w * 0.2} 0 L${-w * 0.05} ${h * 0.22} L${w * 0.22} ${-h * 0.22}`} fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d={`M${-w * 0.14} ${-h * 0.2} L${w * 0.14} ${h * 0.2} M${w * 0.14} ${-h * 0.2} L${-w * 0.14} ${h * 0.2}`} stroke={color} strokeWidth={12} strokeLinecap="round" />
    )}
  </G>
);

export const Person: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = GOLDL }) => (
  <G x={x} y={y} s={s} o={o}>
    <circle cx={0} cy={-60} r={34} fill={color} />
    <path d="M-60 40 C-60 -10, 60 -10, 60 40 Z" fill={color} />
  </G>
);

/** Ô tiền: thẻ chữ nhật với thanh sáng, dùng cho số tiền (không ghi số). */
export const MoneyCard: React.FC<{ x: number; y: number; s?: number; o?: number; stroke?: string; mark?: "tick" | "ask" | null; w?: number }> = ({ x, y, s = 1, o = 1, stroke = GOLD, mark = null, w = 360 }) => (
  <G x={x} y={y} s={s} o={o}>
    <rect x={-w / 2} y={-110} width={w} height={220} rx={26} fill={EL} stroke={stroke} strokeWidth={5} />
    <rect x={-w / 2 + 40} y={-62} width={w * 0.45} height={16} rx={8} fill={SEC} />
    <rect x={-w / 2 + 40} y={-14} width={w - 80} height={44} rx={14} fill={stroke} opacity={0.9} />
    <rect x={-w / 2 + 40} y={56} width={w * 0.6} height={12} rx={6} fill={HOV} />
    {mark === "tick" && <Tick x={w / 2 - 20} y={-100} />}
    {mark === "ask" && <Ask x={w / 2 - 20} y={-100} />}
  </G>
);

/** Bàn tay đơn giản: cổ tay và lòng bàn tay có ngón trỏ chỉ. */
export const Hand: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <G x={x} y={y} s={s} o={o} r={r}>
    <path d="M-40 90 L-40 10 C-40 -10 -10 -10 -10 10 L-10 -60 C-10 -78 20 -78 20 -60 L20 10 L22 -4 C22 -18 50 -18 50 -4 L50 90 Z" fill={PAPER} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
  </G>
);

export const Mark: React.FC<{ dots: number; x: number; y: number; color?: string }> = ({ dots, x, y, color = GOLDL }) => (
  <g>
    {Array.from({ length: dots }, (_, i) => (
      <circle key={i} cx={x + (i - (dots - 1) / 2) * 30} cy={y} r={10} fill={color} />
    ))}
  </g>
);
