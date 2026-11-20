import React from "react";
import { Box, EL, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, RED, SEC, SURF, TXT, XL } from "../shared/art";

/** Tranh riêng của Bài 4. shortcut: toạ độ chỉ vẽ cho khổ 4:5 đã duyệt, đổi khổ thì phải dựng bố cục mới. */
export const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));
export const WOOD = "#5A4526";

/** Bảy nét của một chữ số điện tử: a b c d e f g. */
const SEG = [0x3f, 0x06, 0x5b, 0x4f, 0x66, 0x6d, 0x7d, 0x07, 0x7f, 0x6f];
const BARS: [number, number, number, number][] = [
  [8, 0, 40, 10], [46, 8, 10, 38], [46, 54, 10, 38], [8, 90, 40, 10], [0, 54, 10, 38], [0, 8, 10, 38], [8, 45, 40, 10],
];

const Digit: React.FC<{ d: number; x: number; color: string; blank?: boolean }> = ({ d, x, color, blank = false }) => (
  <g transform={`translate(${x} -50)`}>
    {BARS.map(([bx, by, bw, bh], k) => {
      const on = !blank && (SEG[d] >> k) & 1;
      return <rect key={k} x={bx} y={by} width={bw} height={bh} rx={4} fill={on ? color : HOV} opacity={on ? 1 : 0.22} />;
    })}
  </g>
);

/** Màn số điện tử vẽ bằng nét (không phải chữ), giữa ở gốc toạ độ. Số 0 đứng đầu để trống. */
export const SegNum: React.FC<{ value: number; n?: number; color?: string; frame?: boolean }> = ({ value, n = 4, color = GOLDL, frame = true }) => {
  const v = Math.max(0, Math.round(value));
  const ds = String(v).padStart(n, "0").slice(-n).split("").map(Number);
  const lead = String(v).length;
  const w = n * 72 - 16;
  return (
    <g>
      {frame && <Box cx={0} cy={0} w={w + 50} h={140} rx={20} fill={INK} stroke={HOV} strokeWidth={5} />}
      {ds.map((d, k) => <Digit key={k} d={d} x={-w / 2 + k * 72} color={color} blank={k < n - lead} />)}
    </g>
  );
};

/** Vạch trần đỏ kẻ ngang, có các móc treo nhỏ. */
export const Ceiling: React.FC<{ x1: number; x2: number; y: number; p?: number; hot?: number }> = ({ x1, x2, y, p = 1, hot = 0 }) => (
  <g opacity={clamp01(p * 2)}>
    <line x1={x1} x2={x1 + (x2 - x1) * p} y1={y} y2={y} stroke={RED} strokeWidth={8 + hot * 4} strokeDasharray="26 14" strokeLinecap="round" />
    {Array.from({ length: 7 }, (_, k) => {
      const x = x1 + ((x2 - x1) * k) / 6;
      return x <= x1 + (x2 - x1) * p ? <line key={k} x1={x} x2={x} y1={y - 22} y2={y} stroke={RED} strokeWidth={5} opacity={0.7} /> : null;
    })}
  </g>
);

/** Đèn báo động quay. */
export const Siren: React.FC<{ s?: number; t?: number; on?: number }> = ({ s = 1, t = 0, on = 1 }) => (
  <G s={s}>
    {on > 0.01 && [0, 1].map((k) => {
      const a = t * 12 + k * 180;
      return <path key={k} d="M0 -40 L180 -110 L180 30 Z" fill={RED} opacity={0.22 * on} transform={`rotate(${a} 0 -40)`} />;
    })}
    <rect x={-60} y={10} width={120} height={26} rx={8} fill={HOV} />
    <path d="M-44 10 V-36 Q-44 -80 0 -80 Q44 -80 44 -36 V10 Z" fill={on > 0.01 ? RED : SEC} />
    <path d="M-22 -40 Q-20 -62 0 -64" fill="none" stroke={TXT} strokeWidth={7} strokeLinecap="round" opacity={0.6} />
  </G>
);

/** Mũ tốt nghiệp nhỏ: dấu hiệu bài đào tạo. */
export const Cap: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = INK }) => (
  <G s={s}>
    <path d="M0 -26 L52 -6 L0 14 L-52 -6 Z" fill={color} />
    <path d="M-30 4 V22 Q0 36 30 22 V4" fill={color} />
    <path d="M44 -4 V24" stroke={GOLD} strokeWidth={4} />
    <circle cx={44} cy={28} r={6} fill={GOLD} />
  </G>
);

/** Trang bài đào tạo: đầu trang có mũ tốt nghiệp, rows dòng chữ đã viết. */
export const Article: React.FC<{ w?: number; h?: number; rows?: number; cap?: boolean; fill?: string }> = ({ w = 180, h = 240, rows = 0, cap = true, fill = PAPER }) => {
  const n = Math.floor((h - 90) / 26);
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={h} rx={12} fill={fill} />
      <rect x={-w / 2} y={-h / 2} width={w} height={54} rx={12} fill={GOLD} />
      <rect x={-w / 2} y={-h / 2 + 30} width={w} height={24} fill={GOLD} />
      {cap && <G x={-w / 2 + 40} y={-h / 2 + 27} s={0.5}><Cap /></G>}
      <rect x={-w / 2 + 74} y={-h / 2 + 20} width={w - 100} height={12} rx={6} fill={INK} opacity={0.6} />
      {Array.from({ length: n }, (_, k) => (
        <rect key={k} x={-w / 2 + 20} y={-h / 2 + 74 + k * 26} width={(w - 40) * (k % 4 === 3 ? 0.6 : k % 2 ? 0.86 : 1)} height={10} rx={5} fill={k < rows ? SEC : HOV} opacity={k < rows ? 1 : 0.28} />
      ))}
    </g>
  );
};

/** Cột bài xếp chồng cao h (đáy ở gốc toạ độ); phần trên vạch trần (cao ceil) đổ đỏ. */
export const Column: React.FC<{ w?: number; h: number; ceil: number; hot?: number }> = ({ w = 220, h, ceil, hot = 0 }) => {
  const n = Math.max(1, Math.round(h / 34));
  return (
    <g>
      {Array.from({ length: n }, (_, k) => {
        const y = -((k + 1) * h) / n;
        const over = -y > ceil + 2;
        return (
          <g key={k}>
            <rect x={-w / 2 + (k % 2) * 6} y={y} width={w - 6} height={h / n - 4} rx={5} fill={over ? (hot > 0.5 ? RED : "#F2B8B8") : PAPER} />
            <rect x={-w / 2 + 20} y={y + (h / n) / 2 - 5} width={(w - 50) * (k % 3 === 1 ? 0.7 : 1)} height={6} rx={3} fill={over ? INK : SEC} opacity={0.5} />
          </g>
        );
      })}
    </g>
  );
};

/** Robot giơ ngón cái (đặt ở tay phải của Bot). */
export const Thumb: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = GOLDL }) => (
  <G s={s}>
    <rect x={-24} y={-10} width={48} height={44} rx={14} fill={color} />
    <rect x={-10} y={-46} width={20} height={44} rx={10} fill={color} />
  </G>
);

/** Dấu tích tròn xanh. */
export const Tick: React.FC<{ r?: number; color?: string; ink?: string }> = ({ r = 40, color = XL, ink = INK }) => (
  <g>
    <circle r={r} fill={color} />
    <path d={`M${-r * 0.45} 0 L${-r * 0.1} ${r * 0.36} L${r * 0.5} ${-r * 0.36}`} fill="none" stroke={ink} strokeWidth={r * 0.22} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

/** Máy đo nói dối: giấy kẻ ô chạy, kim vẽ đường xanh phẳng. */
export const Polygraph: React.FC<{ t: number; w?: number; h?: number; wobble?: number }> = ({ t, w = 380, h = 250, wobble = 0 }) => {
  const off = (t * 4) % 40;
  const pts = Array.from({ length: 30 }, (_, k) => {
    const x = -w / 2 + 30 + (k * (w - 140)) / 29;
    const y = Math.sin(k * 1.3 + t * 0.4) * 30 * wobble;
    return `${k ? "L" : "M"}${x} ${y}`;
  }).join(" ");
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={h} rx={22} fill={EL} stroke={GOLD} strokeWidth={5} />
      <rect x={-w / 2 + 20} y={-h / 2 + 30} width={w - 110} height={h - 60} rx={8} fill={PAPER} />
      {Array.from({ length: 9 }, (_, k) => (
        <line key={k} x1={-w / 2 + 20 + ((k * 40 - off + 400) % 360)} x2={-w / 2 + 20 + ((k * 40 - off + 400) % 360)} y1={-h / 2 + 30} y2={h / 2 - 30} stroke={SEC} strokeWidth={2} opacity={0.35} />
      ))}
      <line x1={-w / 2 + 20} x2={w / 2 - 90} y1={0} y2={0} stroke={SEC} strokeWidth={2} opacity={0.35} />
      <path d={pts} fill="none" stroke={XL} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      <line x1={w / 2 - 90} y1={0} x2={w / 2 - 30} y2={-60} stroke={TXT} strokeWidth={6} strokeLinecap="round" />
      <circle cx={w / 2 - 90} cy={0} r={9} fill={XL} />
      <circle cx={w / 2 - 30} cy={-60} r={12} fill={GOLD} />
      {[0, 1, 2].map((k) => <circle key={k} cx={w / 2 - 50} cy={30 + k * 28} r={8} fill={k === 0 ? XL : HOV} />)}
    </g>
  );
};

/** Ngôi sao năm cánh. */
export const Star: React.FC<{ r?: number; fill?: string }> = ({ r = 30, fill = GOLD }) => (
  <path d={Array.from({ length: 10 }, (_, k) => {
    const a = (k * Math.PI) / 5 - Math.PI / 2;
    const rr = k % 2 ? r * 0.45 : r;
    return `${k ? "L" : "M"}${Math.cos(a) * rr} ${Math.sin(a) * rr}`;
  }).join(" ") + " Z"} fill={fill} />
);

/** Bút đỏ chấm bài. */
export const RedPen: React.FC<{ s?: number; r?: number }> = ({ s = 1, r = 0 }) => (
  <G s={s} r={r}>
    <rect x={-11} y={-90} width={22} height={110} rx={7} fill={RED} />
    <path d="M-11 20 L0 48 L11 20 Z" fill={TXT} />
    <rect x={-11} y={-90} width={22} height={24} rx={7} fill="#B91C1C" />
  </G>
);

/** Mặt robot nhỏ: huy hiệu "bài của AI". */
export const BotBadge: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <rect x={-26} y={-22} width={52} height={44} rx={12} fill={INK} stroke={GOLD} strokeWidth={4} />
    {[-10, 10].map((x) => <circle key={x} cx={x} cy={-2} r={5} fill={GOLDL} />)}
    <rect x={-9} y={10} width={18} height={4} rx={2} fill={GOLD} />
  </G>
);

/** Mặt bàn nhìn từ trên xuống, giữa ở gốc toạ độ. */
export const TopDesk: React.FC<{ w?: number; h?: number; glow?: number; full?: number }> = ({ w = 760, h = 460, glow = 0, full = 0 }) => (
  <g>
    <Box cx={10} cy={14} w={w} h={h} rx={26} fill="#000" opacity={0.35} />
    <Box cx={0} cy={0} w={w} h={h} rx={26} fill={WOOD} stroke={GOLD} strokeWidth={8} />
    <Box cx={0} cy={0} w={w - 44} h={h - 44} rx={16} fill="#6B5330" />
    {Array.from({ length: 5 }, (_, k) => (
      <path key={k} d={`M${-w / 2 + 40} ${-h / 2 + 60 + k * ((h - 120) / 4)} Q0 ${-h / 2 + 46 + k * ((h - 120) / 4)} ${w / 2 - 40} ${-h / 2 + 64 + k * ((h - 120) / 4)}`} fill="none" stroke={WOOD} strokeWidth={4} opacity={0.6} />
    ))}
    {glow > 0.01 && <Box cx={0} cy={0} w={w - 44} h={h - 44} rx={16} fill={XL} opacity={0.16 * glow} />}
    {full > 0.01 && <Box cx={0} cy={0} w={w - 44} h={h - 44} rx={16} fill={RED} opacity={0.14 * full} />}
  </g>
);

/** Thước đo hai đầu có vạch chặn. Ngang khi vertical=false. */
export const Measure: React.FC<{ len: number; p?: number; vertical?: boolean; color?: string }> = ({ len, p = 1, vertical = false, color = GOLDL }) => {
  const L = len * p;
  const tr = vertical ? "rotate(90)" : undefined;
  return (
    <g transform={tr} opacity={clamp01(p * 3)}>
      <line x1={-L / 2} x2={L / 2} y1={0} y2={0} stroke={color} strokeWidth={5} />
      <path d={`M${-L / 2 + 22} -14 L${-L / 2} 0 L${-L / 2 + 22} 14 M${L / 2 - 22} -14 L${L / 2} 0 L${L / 2 - 22} 14`} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" />
      <line x1={-L / 2} x2={-L / 2} y1={-24} y2={24} stroke={color} strokeWidth={6} />
      <line x1={L / 2} x2={L / 2} y1={-24} y2={24} stroke={color} strokeWidth={6} />
    </g>
  );
};

/** Tờ đề bài: viền vàng, đầu có dấu mục tiêu. */
export const Brief: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={160} h={210} rx={12} fill={PAPER} stroke={GOLD} strokeWidth={7} />
    <circle cx={-46} cy={-66} r={22} fill="none" stroke={RED} strokeWidth={6} />
    <circle cx={-46} cy={-66} r={8} fill={RED} />
    <rect x={-14} y={-74} width={70} height={14} rx={7} fill={INK} />
    <Lines x={-58} y={-26} w={116} n={5} gap={24} color={SEC} t={8} />
  </G>
);

/** Chồng bảng dữ liệu tham khảo. */
export const DataStack: React.FC<{ s?: number; n?: number }> = ({ s = 1, n = 3 }) => (
  <G s={s}>
    {Array.from({ length: n }, (_, k) => (
      <G key={k} x={(n - 1 - k) * 14} y={(n - 1 - k) * -14}>
        <Box cx={0} cy={0} w={170} h={200} rx={12} fill={TXT} stroke={k === n - 1 ? XL : HOV} strokeWidth={4} />
        <Box cx={0} cy={-76} w={170} h={36} rx={10} fill={XL} opacity={k === n - 1 ? 1 : 0.4} />
        {[-30, 4, 38, 72].map((y) => <line key={y} x1={-70} x2={70} y1={y} y2={y} stroke={SEC} strokeWidth={3} />)}
        {[-24, 24].map((x) => <line key={x} x1={x} x2={x} y1={-56} y2={86} stroke={SEC} strokeWidth={3} />)}
      </G>
    ))}
  </G>
);

/** Bong bóng chat nhỏ: trái là người (vàng), phải là AI (xám). */
export const Chip: React.FC<{ s?: number; me?: boolean; w?: number }> = ({ s = 1, me = true, w = 150 }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={w} h={64} rx={22} fill={me ? GOLD : HOV} />
    <path d={me ? `M${w / 2 - 26} 30 L${w / 2 + 4} 46 L${w / 2 - 6} 22 Z` : `M${-w / 2 + 26} 30 L${-w / 2 - 4} 46 L${-w / 2 + 6} 22 Z`} fill={me ? GOLD : HOV} />
    <rect x={-w / 2 + 22} y={-14} width={w - 50} height={10} rx={5} fill={me ? INK : TXT} opacity={0.7} />
    <rect x={-w / 2 + 22} y={6} width={(w - 50) * 0.6} height={10} rx={5} fill={me ? INK : TXT} opacity={0.7} />
  </G>
);

/** Thẻ quy tắc viền đỏ: kind "tran" là vạch trần trên cột chữ, "trong" là ô bỏ trống. */
export const RuleCard: React.FC<{ kind: "tran" | "trong"; s?: number }> = ({ kind, s = 1 }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={180} h={130} rx={16} fill={PAPER} stroke={RED} strokeWidth={7} />
    {kind === "tran" ? (
      <>
        <line x1={-66} x2={66} y1={-30} y2={-30} stroke={RED} strokeWidth={6} strokeDasharray="14 8" />
        {[-44, -14, 16, 46].map((x, k) => <rect key={x} x={x - 10} y={-20 + k * 6} width={20} height={64 - k * 6} rx={4} fill={SEC} />)}
      </>
    ) : (
      <>
        {[-32, 0, 32].map((y) => <rect key={y} x={-66} y={y - 9} width={56} height={18} rx={5} fill={SEC} />)}
        {[-32, 32].map((y) => <rect key={y} x={4} y={y - 9} width={62} height={18} rx={5} fill={SEC} />)}
        <rect x={4} y={-9} width={62} height={18} rx={5} fill="none" stroke={RED} strokeWidth={4} strokeDasharray="7 5" />
      </>
    )}
  </G>
);

/** Tấm bệnh án kẹp bìa, có chữ thập đỏ; children vẽ vào ô nội dung (giữa ở gốc, rộng 220). */
export const Chart: React.FC<{ w?: number; h?: number; lit?: number; children?: React.ReactNode }> = ({ w = 280, h = 380, lit = 0, children }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={20} fill={EL} stroke={lit > 0.5 ? RED : HOV} strokeWidth={6} />
    <Box cx={0} cy={-h / 2 + 4} w={110} h={36} rx={10} fill={SEC} />
    <G x={-w / 2 + 44} y={-h / 2 + 64}>
      <rect x={-8} y={-24} width={16} height={48} rx={4} fill={RED} />
      <rect x={-24} y={-8} width={48} height={16} rx={4} fill={RED} />
    </G>
    <Lines x={-w / 2 + 84} y={-h / 2 + 50} w={w - 120} n={2} gap={26} color={HOV} t={10} />
    <Box cx={0} cy={40} w={w - 40} h={h - 160} rx={14} fill={SURF} />
    <G y={40}>{children}</G>
  </g>
);

/** Lá cờ cắm. */
export const Flag: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = XL }) => (
  <G s={s}>
    <rect x={-4} y={-90} width={8} height={100} rx={4} fill={TXT} />
    <path d="M4 -90 L70 -70 L4 -48 Z" fill={color} />
  </G>
);

/** Gương soi có khung vàng. */
export const Mirror: React.FC<{ s?: number; children?: React.ReactNode }> = ({ s = 1, children }) => (
  <G s={s}>
    <ellipse cx={0} cy={0} rx={70} ry={92} fill="#2A3442" stroke={GOLD} strokeWidth={8} />
    <path d="M-40 -50 Q-30 -70 -10 -76" fill="none" stroke={TXT} strokeWidth={6} opacity={0.5} strokeLinecap="round" />
    {children}
    <rect x={-8} y={92} width={16} height={40} fill={GOLD} />
    <rect x={-40} y={128} width={80} height={12} rx={6} fill={GOLD} />
  </G>
);

/** Khiên. */
export const Shield: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = SEC }) => (
  <G s={s}>
    <path d="M0 -70 L60 -48 Q62 30 0 76 Q-62 30 -60 -48 Z" fill={color} stroke={TXT} strokeWidth={5} />
    <path d="M0 -44 L34 -30 Q34 16 0 46 Q-34 16 -34 -30 Z" fill={HOV} />
  </G>
);

/** Trái tim. */
export const Heart: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = RED }) => (
  <G s={s}>
    <path d="M0 30 C-50 -6 -40 -46 -14 -44 Q-4 -44 0 -32 Q4 -44 14 -44 C40 -46 50 -6 0 30 Z" fill={color} />
  </G>
);

/** Biển cấm tròn. */
export const NoSign: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <circle r={60} fill={RED} />
    <rect x={-40} y={-11} width={80} height={22} rx={6} fill={TXT} />
  </G>
);

/** Chồng hợp đồng dày: n tờ xếp lệch, tờ trên có ô chữ ký. */
export const Contract: React.FC<{ n?: number; w?: number; h?: number }> = ({ n = 12, w = 260, h = 330 }) => (
  <g>
    {Array.from({ length: n }, (_, k) => (
      <Box key={k} cx={(n - 1 - k) * 3} cy={(n - 1 - k) * 5} w={w} h={h} rx={10} fill={k === n - 1 ? PAPER : k % 2 ? "#D9CFBC" : "#E6DCC8"} stroke={HOV} strokeWidth={1.5} />
    ))}
    <rect x={-w / 2 + 26} y={-h / 2 + 26} width={w - 52} height={20} rx={8} fill={INK} />
    <Lines x={-w / 2 + 26} y={-h / 2 + 70} w={w - 52} n={6} gap={28} color={SEC} t={9} />
    <path d={`M${w / 2 - 110} ${h / 2 - 40} q14 -24 28 0 t28 0 t28 0`} fill="none" stroke={GOLD} strokeWidth={5} />
  </g>
);

/** Cây thước vàng nằm ngang có vạch chia. */
export const Ruler: React.FC<{ w?: number; s?: number }> = ({ w = 300, s = 1 }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={w} h={56} rx={10} fill={GOLD} />
    {Array.from({ length: Math.floor(w / 20) - 1 }, (_, k) => (
      <rect key={k} x={-w / 2 + 18 + k * 20} y={-28} width={4} height={k % 5 === 0 ? 26 : 14} fill={INK} />
    ))}
  </G>
);

/** Hộp quà có nơ: gói Skill. lid là độ nâng nắp (0 đóng). */
export const GiftBox: React.FC<{ s?: number; lid?: number }> = ({ s = 1, lid = 0 }) => (
  <G s={s}>
    <Box cx={0} cy={40} w={260} h={190} rx={16} fill={EL} stroke={GOLD} strokeWidth={6} />
    <rect x={-22} y={-55} width={44} height={190} fill={GOLD} />
    <G y={-lid * 90} r={-lid * 12}>
      <Box cx={0} cy={-62} w={290} h={64} rx={14} fill={EL} stroke={GOLD} strokeWidth={6} />
      <rect x={-22} y={-94} width={44} height={64} fill={GOLD} />
      <path d="M0 -94 Q-60 -150 -74 -110 Q-80 -86 0 -94 Q60 -150 74 -110 Q80 -86 0 -94 Z" fill={GOLDL} />
    </G>
  </G>
);

/** Dấu chấm than. */
export const Bang: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = GOLD }) => (
  <G s={s}>
    <path d="M-14 -80 H14 L8 20 H-8 Z" fill={color} />
    <circle cx={0} cy={48} r={14} fill={color} />
  </G>
);
