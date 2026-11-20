import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Label, useBeats } from "../../kit/scene-context";

/** Tranh và nhịp riêng của bài Mở đầu. shortcut: toạ độ chỉ vẽ cho khổ 4:5 đã duyệt, đổi khổ thì phải dựng bố cục mới. */
export const W = 1080;
export const H = 1350;

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
  const p = (i: number, fr = 0, damping = 13): number => spring({ frame: f - at(i, fr), fps, config: { damping, mass: 0.7 } });
  /** Chạy mượt 0 đến 1 từ câu i, trong d khung. */
  const l = (i: number, fr = 0, d = 14): number =>
    interpolate(f - at(i, fr), [0, d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return { f, at, p, l };
}

export const G: React.FC<{ x?: number; y?: number; s?: number; r?: number; o?: number; children?: React.ReactNode }> = ({ x = 0, y = 0, s = 1, r = 0, o = 1, children }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {children}
  </g>
);

/** Khung sân khấu: nền, máy quay trôi nhẹ, tranh SVG và nhãn HTML. */
export const Stage: React.FC<{ bg: string; overlay?: React.ReactNode; children?: React.ReactNode; still?: boolean; inset?: number }> = ({ bg, overlay, children, still = false, inset = 1 }) => {
  const { f } = useT();
  const { durationInFrames } = useVideoConfig();
  // Ảnh PNG lớn dưới phép phóng thay đổi làm Chromium lấy mẫu lệch vài điểm giữa các lần chụp, nên màn logo đứng yên.
  const drift = still ? 1 : interpolate(f, [0, durationInFrames], [1, 1.03]);
  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
      {/* Nền chìm: vầng vàng thương hiệu toả nhẹ và lưới mảnh, không tranh với hình. */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 75% 60% at 50% 45%, rgba(197,160,89,0.13) 0%, rgba(197,160,89,0.04) 55%, rgba(197,160,89,0) 100%)" }} />
      <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(197,160,89,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.09) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <AbsoluteFill style={{ transform: `scale(${drift * inset})` }}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
          {children}
        </svg>
        {overlay}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Nhãn lấy từ kịch bản. Vùng an toàn của khổ này: y từ 180 đến 1030. */
export const Tag: React.FC<{ i: number; x: number; y: number; p: number; size?: number; solid?: boolean; color?: string; o?: number }> = ({ i, x, y, p, size = 40, solid = false, color = GOLDL, o = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${p})`,
      opacity: Math.min(1, p) * o,
      fontSize: size,
      fontWeight: 600,
      lineHeight: 1.35,
      whiteSpace: "nowrap",
      color: solid ? INK : color,
      background: solid ? color : "rgba(12,12,12,0.82)",
      padding: "6px 26px 8px",
      borderRadius: 999,
    }}
  >
    <Label i={i} />
  </div>
);

export const Box: React.FC<React.SVGProps<SVGRectElement> & { cx: number; cy: number; w: number; h: number }> = ({ cx, cy, w, h, ...rest }) => (
  <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} {...rest} />
);

export const Lines: React.FC<{ x: number; y: number; w: number; n: number; gap?: number; color?: string; t?: number }> = ({ x, y, w, n, gap = 30, color = SEC, t = 12 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <rect key={i} x={x} y={y + i * gap} width={w * (i % 3 === 2 ? 0.62 : i % 3 === 1 ? 0.84 : 1)} height={t} rx={t / 2} fill={color} />
    ))}
  </g>
);

export const Excel: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={150} h={190} rx={14} fill={TXT} />
    <Box cx={0} cy={-68} w={150} h={54} rx={14} fill={XL} />
    <path d="M-16 -84 L16 -52 M16 -84 L-16 -52" stroke={INK} strokeWidth={9} strokeLinecap="round" />
    {[-22, 6, 34, 62].map((y) => (
      <line key={y} x1={-58} x2={58} y1={y} y2={y} stroke={SEC} strokeWidth={4} />
    ))}
    {[-20, 20].map((x) => (
      <line key={x} x1={x} x2={x} y1={-22} y2={62} stroke={SEC} strokeWidth={4} />
    ))}
  </g>
);

export const Doc: React.FC<{ w?: number; h?: number; n?: number; ink?: string; fill?: string }> = ({ w = 170, h = 220, n = 5, ink = SEC, fill = TXT }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={12} fill={fill} />
    <Lines x={-w / 2 + 22} y={-h / 2 + 28} w={w - 44} n={n} gap={Math.min(36, (h - 50) / Math.max(1, n))} color={ink} />
  </g>
);

export const Chat: React.FC<{ w: number; h: number; lit?: boolean; children?: React.ReactNode }> = ({ w, h, lit = true, children }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={30} fill={EL} stroke={lit ? GOLD : HOV} strokeWidth={5} />
    <path d={`M${-w / 2} ${-h / 2 + 70} H${w / 2}`} stroke={HOV} strokeWidth={4} />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={-w / 2 + 40 + i * 32} cy={-h / 2 + 35} r={10} fill={i === 0 ? GOLD : HOV} />
    ))}
    <rect x={-w / 2 + 3} y={-h / 2 + 72} width={Math.min(190, w * 0.24)} height={h - 76} fill={SURF} rx={20} />
    {[0, 1, 2, 3].filter((i) => -h / 2 + 118 + i * 74 < h / 2 - 20).map((i) => (
      <g key={i}>
        <circle cx={-w / 2 + 36} cy={-h / 2 + 118 + i * 74} r={20} fill={HOV} />
        <rect x={-w / 2 + 66} y={-h / 2 + 110 + i * 74} width={Math.min(100, w * 0.1)} height={14} rx={7} fill={HOV} />
      </g>
    ))}
    {children}
  </g>
);

export const Bubble: React.FC<{ w: number; h: number; fill?: string; n?: number; ink?: string }> = ({ w, h, fill = GOLD, n = 2, ink = INK }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={24} fill={fill} />
    <path d={`M${-w / 2 + 18} ${h / 2 - 6} L${-w / 2 + 2} ${h / 2 + 26} L${-w / 2 + 52} ${h / 2 - 6} Z`} fill={fill} />
    <Lines x={-w / 2 + 26} y={-h / 2 + 24} w={w - 52} n={n} gap={Math.max(24, (h - 40) / n)} color={ink} t={13} />
  </g>
);

export const Bell: React.FC<{ r?: number }> = ({ r = 0 }) => (
  <G r={r}>
    <path d="M-34 24 Q-30 18 -28 -6 Q-26 -40 0 -42 Q26 -40 28 -6 Q30 18 34 24 Z" fill={GOLD} />
    <circle cx={0} cy={34} r={9} fill={GOLDL} />
    <circle cx={0} cy={-46} r={6} fill={GOLD} />
  </G>
);

export const Sun: React.FC<{ r?: number; rot?: number; fill?: string }> = ({ r = 90, rot = 0, fill = GOLDL }) => (
  <g>
    <G r={rot}>
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={0} x2={0} y1={-r - 24} y2={-r - 58} stroke={fill} strokeWidth={10} strokeLinecap="round" transform={`rotate(${i * 30})`} />
      ))}
    </G>
    <circle r={r} fill={fill} />
  </g>
);

export const Clock: React.FC<{ r?: number; hour?: number; minute?: number }> = ({ r = 80, hour = 2, minute = 0 }) => (
  <g>
    <circle r={r} fill={TXT} stroke={GOLD} strokeWidth={9} />
    {Array.from({ length: 12 }, (_, i) => (
      <line key={i} y1={-r + 8} y2={-r + 20} stroke={INK} strokeWidth={5} transform={`rotate(${i * 30})`} />
    ))}
    <line y1={6} y2={-r * 0.5} stroke={INK} strokeWidth={10} strokeLinecap="round" transform={`rotate(${hour * 30})`} />
    <line y1={6} y2={-r * 0.78} stroke={GOLD} strokeWidth={7} strokeLinecap="round" transform={`rotate(${minute * 6})`} />
    <circle r={8} fill={INK} />
  </g>
);

export const Spark: React.FC<{ r?: number; fill?: string }> = ({ r = 40, fill = GOLD }) => (
  <path d={`M0 ${-r} Q${r * 0.12} ${-r * 0.12} ${r} 0 Q${r * 0.12} ${r * 0.12} 0 ${r} Q${-r * 0.12} ${r * 0.12} ${-r} 0 Q${-r * 0.12} ${-r * 0.12} 0 ${-r} Z`} fill={fill} />
);

export const AI: React.FC<{ size?: number; dim?: boolean }> = ({ size = 130, dim = false }) => (
  <g>
    <Box cx={0} cy={0} w={size} h={size} rx={size * 0.26} fill={INK} stroke={dim ? HOV : GOLD} strokeWidth={Math.max(5, size * 0.05)} />
    <Spark r={size * 0.32} fill={dim ? SEC : GOLD} />
    <G x={size * 0.24} y={-size * 0.24}>
      <Spark r={size * 0.1} fill={dim ? SEC : GOLDL} />
    </G>
  </g>
);

export const Person: React.FC<{ fill?: string; s?: number }> = ({ fill = TXT, s = 1 }) => (
  <G s={s}>
    <circle cy={-74} r={36} fill={fill} />
    <path d="M-62 44 Q-62 -28 0 -28 Q62 -28 62 44 Z" fill={fill} />
  </G>
);

/** Bàn làm việc nhìn từ phía sau người ngồi, màn hình là vật chính. */
export const Desk: React.FC<{ nod?: number; children?: React.ReactNode }> = ({ nod = 0, children }) => (
  <g>
    <Box cx={0} cy={-150} w={520} h={330} rx={22} fill={EL} stroke={GOLD} strokeWidth={6} />
    <g>{children}</g>
    <Box cx={0} cy={40} w={70} h={54} fill={HOV} />
    <Box cx={0} cy={72} w={220} h={18} rx={9} fill={HOV} />
    <Box cx={0} cy={94} w={900} h={28} rx={12} fill={GOLD} />
    <G x={0} y={170 + nod}>
      <Person fill={SEC} s={1.15} />
    </G>
  </g>
);

export const Folder: React.FC<{ s?: number; open?: number }> = ({ s = 1, open = 0 }) => (
  <G s={s}>
    <path d="M-100 -64 H-34 L-14 -40 H100 Q110 -40 110 -30 V70 H-110 V-54 Q-110 -64 -100 -64 Z" fill={GOLD} />
    <path d={`M-110 ${-14 + open * 26} H110 L${110 - open * 18} 70 H${-110 + open * 18} Z`} fill={GOLDL} />
  </G>
);

export const Mag: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <line x1={42} y1={42} x2={96} y2={96} stroke={GOLD} strokeWidth={20} strokeLinecap="round" />
    <circle r={56} fill="rgba(224,194,134,0.2)" stroke={GOLDL} strokeWidth={12} />
  </G>
);

export const Table: React.FC<{ cols: number; rows: number; w: number; h: number; lit?: number; fill?: string; base?: string }> = ({ cols, rows, w, h, lit = 0, fill = GOLD, base = HOV }) => {
  const cw = w / cols;
  const ch = h / rows;
  return (
    <g>
      {Array.from({ length: rows * cols }, (_, i) => (
        <rect key={i} x={-w / 2 + (i % cols) * cw + 4} y={-h / 2 + Math.floor(i / cols) * ch + 4} width={cw - 8} height={ch - 8} rx={8} fill={i < lit ? fill : base} />
      ))}
    </g>
  );
};

export const Cross: React.FC<{ r?: number; color?: string }> = ({ r = 50, color = RED }) => (
  <path d={`M${-r} ${-r} L${r} ${r} M${r} ${-r} L${-r} ${r}`} stroke={color} strokeWidth={r * 0.32} strokeLinecap="round" fill="none" />
);

export const Stamp: React.FC<{ r?: number; color?: string }> = ({ r = 70, color = GOLD }) => (
  <g>
    <circle r={r} fill="none" stroke={color} strokeWidth={r * 0.13} />
    <path d={`M${-r * 0.5} 0 L${-r * 0.1} ${r * 0.42} L${r * 0.55} ${-r * 0.42}`} fill="none" stroke={color} strokeWidth={r * 0.18} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

export const Question: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = GOLDL }) => (
  <G s={s}>
    <path d="M-44 -46 Q-40 -96 2 -96 Q48 -96 48 -52 Q48 -22 14 -6 Q2 2 2 28" fill="none" stroke={color} strokeWidth={24} strokeLinecap="round" />
    <circle cx={2} cy={70} r={16} fill={color} />
  </G>
);

export const Hand: React.FC<{ s?: number; r?: number }> = ({ s = 1, r = 0 }) => (
  <G s={s} r={r}>
    {/* Cánh tay và ống tay áo vest sẫm màu thanh lịch */}
    <path d="M-34 95 L-40 220 L40 220 L34 95 Z" fill="#252830" />
    <rect x={-36} y={80} width={72} height={20} rx={6} fill={GOLD} />
    {/* Con trỏ bàn tay chỉ vector cao cấp */}
    <g transform="translate(-62, -110) scale(0.4)">
      {/* Đổ bóng nhẹ tạo chiều sâu */}
      <path
        d="M358.2 179.4c-19.5-24.8-52.7-31.9-79.9-19.1-15.1-15.7-36.2-22.5-56.6-19.6V67c0-36.9-29.7-67-66.3-67S89.1 30.1 89.1 67v161.1c-19.9-7.4-43.3-5.1-62.1 8.9-29.4 21.8-35.8 63.3-14.5 93.1l109.7 154C134.6 501.6 154.7 512 176 512h178.3c30.8 0 57.6-21.5 64.6-51.8l37.3-160c7.6-32.9-1.9-67.5-28-90.8z"
        fill="#000000"
        opacity={0.3}
        transform="translate(10, 14)"
      />
      {/* Thân bàn tay chính bo tròn mềm mại */}
      <path
        d="M358.2 179.4c-19.5-24.8-52.7-31.9-79.9-19.1-15.1-15.7-36.2-22.5-56.6-19.6V67c0-36.9-29.7-67-66.3-67S89.1 30.1 89.1 67v161.1c-19.9-7.4-43.3-5.1-62.1 8.9-29.4 21.8-35.8 63.3-14.5 93.1l109.7 154C134.6 501.6 154.7 512 176 512h178.3c30.8 0 57.6-21.5 64.6-51.8l37.3-160c7.6-32.9-1.9-67.5-28-90.8z"
        fill={TXT}
        stroke={GOLD}
        strokeWidth={14}
        strokeLinejoin="round"
      />
      {/* Các nếp ngón tay tự nhiên */}
      <path d="M221 210 V310" stroke={SEC} strokeWidth={8} strokeLinecap="round" />
      <path d="M285 240 V340" stroke={SEC} strokeWidth={8} strokeLinecap="round" />
      <path d="M355 280 V370" stroke={SEC} strokeWidth={8} strokeLinecap="round" />
      <path d="M120 280 Q145 320 176 350" stroke={SEC} strokeWidth={8} strokeLinecap="round" fill="none" />
    </g>
  </G>
);

export const Lock: React.FC<{ s?: number; open?: number; color?: string }> = ({ s = 1, open = 0, color = GOLD }) => (
  <G s={s}>
    <path d="M-26 -8 V-34 Q-26 -60 0 -60 Q26 -60 26 -34 V-8" fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" transform={`translate(0 ${-open * 22})`} />
    <rect x={-42} y={-10} width={84} height={68} rx={14} fill={color} />
    <circle cy={18} r={9} fill={INK} />
  </G>
);

export const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; p?: number; color?: string; w?: number; dash?: boolean }> = ({ x1, y1, x2, y2, p = 1, color = GOLD, w = 9, dash = false }) => {
  if (p <= 0.01) return null;
  const x = lerp(x1, x2, p);
  const y = lerp(y1, y2, p);
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x} y2={y} stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash ? "4 22" : undefined} />
      <path d="M-22 -18 L10 0 L-22 18 Z" fill={color} transform={`translate(${x} ${y}) rotate(${angle})`} />
    </g>
  );
};

/** Khung trình duyệt: có thẻ tab và thanh địa chỉ. */
export const Browser: React.FC<{ w: number; h: number; children?: React.ReactNode }> = ({ w, h, children }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={26} fill={EL} stroke={HOV} strokeWidth={5} />
    {[0, 1].map((i) => (
      <g key={i}>
        <rect x={-w / 2 + 24 + i * 210} y={-h / 2 + 12} width={196} height={40} rx={12} fill={i === 0 ? INK : HOV} />
        <G x={-w / 2 + 52 + i * 210} y={-h / 2 + 32}>
          <Spark r={14} fill={i === 0 ? GOLD : XL} />
        </G>
        <rect x={-w / 2 + 76 + i * 210} y={-h / 2 + 26} width={120} height={12} rx={6} fill={SEC} />
      </g>
    ))}
    <rect x={-w / 2 + 24} y={-h / 2 + 62} width={w - 48} height={36} rx={18} fill={HOV} />
    <rect x={-w / 2 + 50} y={-h / 2 + 74} width={w * 0.4} height={12} rx={6} fill={SEC} />
    {children}
  </g>
);

/** Mép dưới của khung: vùng UI nền tảng che chữ, nên chỉ để tranh. */
export const Floor: React.FC<{ y?: number; color?: string }> = ({ y = 1240, color = HOV }) => (
  <g>
    <rect x={0} y={y} width={W} height={H - y} fill={color} opacity={0.35} />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <rect key={i} x={40 + i * 150} y={y + 30 + (i % 2) * 34} width={100} height={10} rx={5} fill={color} />
    ))}
  </g>
);

/** Màn kết thương hiệu, chép từ màn kết Human 3.0. Đặt trong `overlay` của Stage; k là tiến độ hiện (0..1). */
export const BrandEnd: React.FC<{ k: number }> = ({ k }) => (
  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 36%, #4A3A1C 0%, ${INK} 55%)`, opacity: Math.min(1, k * 1.4) }}>
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
      <circle cx={540} cy={500} r={300} fill="none" stroke={GOLD} strokeWidth={7} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} transform="rotate(-90 540 500)" />
      <circle cx={540} cy={500} r={326} fill="none" stroke={HOV} strokeWidth={4} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} transform="rotate(90 540 500)" />
      <rect x={540 - 380 * k} y={1150} width={760 * k} height={4} rx={2} fill={GOLD} />
    </svg>
    <Img src={staticFile("brand/tvhs-logo-icon.png")} style={{ position: "absolute", left: 270, top: 230, width: 540, height: 540, objectFit: "contain" }} />
    <Img src={staticFile("brand/tvhs-logo.png")} style={{ position: "absolute", left: 120, top: 880, width: 840, clipPath: "inset(0 0 0 30%)", transform: "translateX(-126px)" }} />
  </div>
);
