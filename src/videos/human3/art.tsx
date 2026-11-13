import React from "react";
import { Label } from "../../kit/scene-context";
import { Box, EL, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, RED, SEC, Stage as BaseStage, SURF, Tag as BaseTag, TXT, W, H, lerp } from "../shared/art";

/** Tranh riêng của video Human 3.0. shortcut: toạ độ chỉ vẽ cho khổ 4:5 đã chọn, đổi khổ thì phải dựng bố cục mới. */
export const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));
export const DIM = "#2A2C31";

/** Bộ não: biểu tượng góc Tâm trí. */
export const Brain: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = GOLDL }) => (
  <G s={s}>
    <path d="M-6 -62 Q-40 -74 -56 -46 Q-82 -40 -76 -10 Q-92 14 -70 34 Q-66 62 -36 62 Q-18 76 -6 60 Z" fill={color} />
    <path d="M6 -62 Q40 -74 56 -46 Q82 -40 76 -10 Q92 14 70 34 Q66 62 36 62 Q18 76 6 60 Z" fill={color} />
    <path d="M-50 -26 Q-30 -16 -40 6 M-56 26 Q-34 22 -24 40 M50 -26 Q30 -16 40 6 M56 26 Q34 22 24 40" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" opacity={0.55} />
  </G>
);

/** Người đang chạy: biểu tượng góc Thể chất. */
export const Runner: React.FC<{ s?: number; color?: string; t?: number }> = ({ s = 1, color = GOLDL, t = 0 }) => {
  const sw = Math.sin(t * 0.35) * 18;
  return (
    <G s={s}>
      <circle cx={14} cy={-62} r={18} fill={color} />
      <path d="M8 -40 L-10 12" stroke={color} strokeWidth={20} strokeLinecap="round" />
      <path d={`M-2 -24 L${-36 - sw * 0.6} ${-4 + sw * 0.3} M-2 -24 L${32 + sw * 0.6} ${-30 - sw * 0.3}`} stroke={color} strokeWidth={13} strokeLinecap="round" fill="none" />
      <path d={`M-10 12 L${-40 - sw} ${48} L${-58 - sw} ${44} M-10 12 L${22 + sw} ${40} L${18 + sw} ${70}`} stroke={color} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </G>
  );
};

/** Hai người nắm tay trong vòng tròn: biểu tượng góc Tinh thần. */
export const Spirit: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = GOLDL }) => (
  <G s={s}>
    <circle r={72} fill="none" stroke={color} strokeWidth={8} strokeDasharray="18 12" />
    {[-30, 30].map((x) => (
      <g key={x}>
        <circle cx={x} cy={-26} r={16} fill={color} />
        <path d={`M${x - 24} 40 Q${x - 24} -4 ${x} -4 Q${x + 24} -4 ${x + 24} 40 Z`} fill={color} />
      </g>
    ))}
    <path d="M-10 14 Q0 4 10 14" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
  </G>
);

/** Cặp công tác: biểu tượng góc Sự nghiệp. */
export const Briefcase: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = GOLDL }) => (
  <G s={s}>
    <path d="M-24 -40 V-54 Q-24 -62 -16 -62 H16 Q24 -62 24 -54 V-40" fill="none" stroke={color} strokeWidth={10} />
    <Box cx={0} cy={4} w={150} h={96} rx={16} fill={color} />
    <rect x={-75} y={-6} width={150} height={8} fill={INK} opacity={0.4} />
    <Box cx={0} cy={0} w={26} h={22} rx={5} fill={INK} />
  </G>
);

/** Biểu tượng của góc k: 0 Tâm trí, 1 Thể chất, 2 Tinh thần, 3 Sự nghiệp. */
export const Corner: React.FC<{ k: number; s?: number; color?: string; t?: number }> = ({ k, s = 1, color = GOLDL, t = 0 }) =>
  k === 0 ? <Brain s={s} color={color} /> : k === 1 ? <Runner s={s} color={color} t={t} /> : k === 2 ? <Spirit s={s} color={color} /> : <Briefcase s={s} color={color} />;

/** Ô góc có viền: giữa ở gốc toạ độ. lit sáng viền vàng, red tô viền đỏ. */
export const CornerTile: React.FC<{ k: number; w?: number; h?: number; lit?: number; red?: number; icon?: number; t?: number; children?: React.ReactNode }> = ({ k, w = 220, h = 220, lit = 0, red = 0, icon = 1, t = 0, children }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={28} fill={EL} stroke={red > 0.5 ? RED : lit > 0.5 ? GOLD : HOV} strokeWidth={6} />
    {lit > 0.01 && <Box cx={0} cy={0} w={w - 16} h={h - 16} rx={22} fill={GOLD} opacity={0.08 * lit} />}
    <G y={children ? -h * 0.18 : 0} s={icon * Math.min(w, h) / 260}>
      <Corner k={k} color={red > 0.5 ? RED : lit > 0.5 ? GOLDL : SEC} t={t} />
    </G>
    {children}
  </g>
);

/** Người đi làm: thân phẳng có tay chân. pose: "stand" | "push" | "walk" | "carry" | "sit". t là nhịp chân. */
export const Guy: React.FC<{ s?: number; fill?: string; pose?: "stand" | "push" | "walk" | "carry" | "cheer"; t?: number; tie?: boolean }> = ({ s = 1, fill = TXT, pose = "stand", t = 0, tie = true }) => {
  const step = pose === "walk" || pose === "push" ? Math.sin(t * 0.4) : 0;
  const lean = pose === "push" ? 14 : 0;
  const armA = pose === "push" ? "M0 -96 L58 -110 L92 -112" : pose === "carry" ? "M-30 -96 L-46 -150 L-30 -196" : pose === "cheer" ? "M-26 -100 L-60 -150 L-70 -190" : "M-30 -96 L-44 -40 L-40 0";
  const armB = pose === "push" ? "M0 -90 L62 -86 L96 -90" : pose === "carry" ? "M30 -96 L46 -150 L30 -196" : pose === "cheer" ? "M26 -100 L60 -150 L70 -190" : "M30 -96 L44 -40 L40 0";
  return (
    <G s={s} r={lean}>
      <path d={`M-14 4 L${-24 - step * 22} 96 L${-40 - step * 22} 100`} stroke={HOV} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={`M14 4 L${24 + step * 22} 96 L${40 + step * 22} 100`} stroke={HOV} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M-40 10 Q-46 -110 0 -116 Q46 -110 40 10 Z" fill={fill} />
      {tie && <path d="M0 -112 L-9 -96 L0 -40 L9 -96 Z" fill={GOLD} />}
      <path d={armA} stroke={fill} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={armB} stroke={fill} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cy={-150} r={34} fill={fill} />
      <path d="M-34 -160 Q-30 -190 0 -190 Q30 -190 34 -160 Q20 -176 0 -174 Q-20 -176 -34 -160 Z" fill={INK} opacity={0.75} />
    </G>
  );
};

/** Mũi tên to dạng khối, đứng thẳng chỉ lên; đáy ở gốc. */
export const BigArrow: React.FC<{ h?: number; w?: number; fill?: string }> = ({ h = 360, w = 150, fill = GOLD }) => (
  <path d={`M${-w * 0.3} 0 V${-h + w * 0.7} H${-w * 0.5} L0 ${-h} L${w * 0.5} ${-h + w * 0.7} H${w * 0.3} V0 Z`} fill={fill} />
);

/** Băng chuyền: dải có vạch chạy theo t (âm là chạy ngược). */
export const Belt: React.FC<{ w?: number; t?: number; speed?: number; hot?: number }> = ({ w = 640, t = 0, speed = 3, hot = 0 }) => {
  const off = ((t * speed) % 60 + 60) % 60;
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={54} rx={27} fill={EL} stroke={hot > 0.5 ? GOLD : HOV} strokeWidth={6} />
      <clipPath id="belt-clip"><rect x={-w / 2 + 10} y={-20} width={w - 20} height={40} rx={20} /></clipPath>
      <g clipPath="url(#belt-clip)">
        {Array.from({ length: Math.ceil(w / 60) + 2 }, (_, k) => (
          <rect key={k} x={-w / 2 - 60 + k * 60 - off} y={-16} width={22} height={32} rx={6} fill={HOV} transform="skewX(-20)" />
        ))}
      </g>
      {[-w / 2 + 27, w / 2 - 27].map((x) => <circle key={x} cx={x} cy={0} r={16} fill={SEC} />)}
    </g>
  );
};

/** Quả tạ treo. children vẽ biểu tượng trên quả tạ. */
export const Weight: React.FC<{ s?: number; color?: string; children?: React.ReactNode }> = ({ s = 1, color = HOV, children }) => (
  <G s={s}>
    <path d="M-30 -70 Q-30 -100 0 -100 Q30 -100 30 -70" fill="none" stroke={color} strokeWidth={14} />
    <path d="M-70 -66 H70 L84 60 Q84 74 70 74 H-70 Q-84 74 -84 60 Z" fill={color} />
    <G y={6}>{children}</G>
  </G>
);

/** Mặt trăng khuyết. */
export const Moon: React.FC<{ r?: number; color?: string }> = ({ r = 40, color = GOLDL }) => (
  <path d={`M${r * 0.3} ${-r} A${r} ${r} 0 1 0 ${r} ${r * 0.35} A${r * 0.78} ${r * 0.78} 0 1 1 ${r * 0.3} ${-r} Z`} fill={color} />
);

/** Cục pin: level 0..1. */
export const Battery: React.FC<{ level?: number; s?: number; w?: number }> = ({ level = 1, s = 1, w = 120 }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={w} h={60} rx={12} fill="none" stroke={TXT} strokeWidth={7} />
    <rect x={w / 2 + 2} y={-12} width={12} height={24} rx={4} fill={TXT} />
    <rect x={-w / 2 + 10} y={-20} width={(w - 20) * clamp01(level)} height={40} rx={6} fill={level < 0.3 ? RED : GOLD} />
  </G>
);

/** Khối bốn mặt: 4 ô góc xếp 2×2, ô k có thể kéo đỏ. */
export const Quad: React.FC<{ size?: number; lit?: number[]; red?: number; t?: number; icons?: number }> = ({ size = 300, lit = [1, 1, 1, 1], red = -1, t = 0, icons = 1 }) => {
  const c = size / 2;
  return (
    <g>
      {[0, 1, 2, 3].map((k) => (
        <G key={k} x={(k % 2 ? 1 : -1) * c / 2 + (k % 2 ? 4 : -4)} y={(k > 1 ? 1 : -1) * c / 2 + (k > 1 ? 4 : -4)} s={clamp01(lit[k] ?? 0)}>
          <CornerTile k={k} w={c - 8} h={c - 8} lit={1} red={red === k ? 1 : 0} icon={icons} t={t} />
        </G>
      ))}
    </g>
  );
};

/** Cái máy tính để bàn: màn hình, chân, bàn phím; children vẽ trên màn hình (giữa ở 0, -110). */
export const Computer: React.FC<{ screen?: string; children?: React.ReactNode; crack?: number }> = ({ screen = SURF, children, crack = 0 }) => (
  <g>
    <Box cx={0} cy={-110} w={500} h={330} rx={26} fill={EL} stroke={GOLD} strokeWidth={7} />
    <Box cx={0} cy={-110} w={456} h={286} rx={16} fill={screen} />
    <G y={-110}>{children}</G>
    {crack > 0.01 && (
      <path d="M-180 -230 L-120 -170 L-150 -120 L-80 -60 L-110 -10" fill="none" stroke={RED} strokeWidth={6} strokeLinecap="round" opacity={crack} />
    )}
    <path d="M-40 55 H40 L56 110 H-56 Z" fill={HOV} />
    <Box cx={0} cy={118} w={260} h={20} rx={10} fill={HOV} />
  </g>
);

/** Bánh răng: n răng, quay góc rot. */
export const Gear: React.FC<{ r?: number; n?: number; rot?: number; fill?: string; children?: React.ReactNode }> = ({ r = 100, n = 10, rot = 0, fill = GOLD, children }) => (
  <g>
    <G r={rot}>
      {Array.from({ length: n }, (_, k) => (
        <rect key={k} x={-r * 0.16} y={-r - r * 0.2} width={r * 0.32} height={r * 0.42} rx={r * 0.06} fill={fill} transform={`rotate(${(k * 360) / n})`} />
      ))}
      <circle r={r} fill={fill} />
    </G>
    <circle r={r * 0.7} fill={INK} />
    {children}
  </g>
);

/** Bậc thang ba nấc, gốc ở chân bậc 1 bên trái. step là chiều rộng mỗi bậc, rise là độ cao. */
export const Stairs: React.FC<{ n?: number; step?: number; rise?: number; lit?: number[]; p?: number }> = ({ n = 3, step = 280, rise = 150, lit = [], p = 1 }) => (
  <g>
    {Array.from({ length: n }, (_, k) => (
      <G key={k} o={clamp01(p * n - k)}>
        <rect x={k * step} y={-(k + 1) * rise} width={step - 10} height={(k + 1) * rise} rx={14} fill={(lit[k] ?? 0) > 0.5 ? "#3A3322" : EL} stroke={(lit[k] ?? 0) > 0.5 ? GOLD : HOV} strokeWidth={6} />
        <rect x={k * step} y={-(k + 1) * rise} width={step - 10} height={16} rx={8} fill={(lit[k] ?? 0) > 0.5 ? GOLD : HOV} />
      </G>
    ))}
  </g>
);

/** Ghim bản đồ. */
export const Pin: React.FC<{ s?: number; color?: string; star?: boolean }> = ({ s = 1, color = GOLD, star = false }) => (
  <G s={s}>
    <path d="M0 0 Q-34 -40 -34 -64 Q-34 -98 0 -98 Q34 -98 34 -64 Q34 -40 0 0 Z" fill={color} />
    {star ? <path d="M0 -84 L6 -70 L20 -70 L9 -61 L13 -47 L0 -55 L-13 -47 L-9 -61 L-20 -70 L-6 -70 Z" fill={INK} /> : <circle cy={-64} r={13} fill={INK} />}
  </G>
);

/** Tấm bản đồ chia 4 vùng, gấp mép; giữa ở gốc. open 0..1 trải ra. */
export const Map4: React.FC<{ w?: number; h?: number; open?: number; lit?: number }> = ({ w = 760, h = 520, open = 1, lit = 1 }) => (
  <g transform={`scale(${lerp(0.2, 1, open)} 1)`}>
    <Box cx={0} cy={0} w={w} h={h} rx={22} fill="#2B2618" stroke={GOLD} strokeWidth={6} />
    {[-1, 0, 1].map((k) => <line key={k} x1={(k * w) / 4} x2={(k * w) / 4} y1={-h / 2} y2={h / 2} stroke={INK} strokeWidth={3} opacity={0.6} />)}
    <line x1={-w / 2} x2={w / 2} y1={0} y2={0} stroke={GOLD} strokeWidth={4} opacity={0.7 * lit} />
    <line x1={0} x2={0} y1={-h / 2} y2={h / 2} stroke={GOLD} strokeWidth={4} opacity={0.7 * lit} />
    {[0, 1, 2, 3].map((k) => (
      <G key={k} x={(k % 2 ? 1 : -1) * w / 4} y={(k > 1 ? 1 : -1) * h / 4} o={0.35 + 0.35 * lit}>
        <Corner k={k} s={0.9} color={GOLDL} />
      </G>
    ))}
    <path d={`M${-w / 2 + 40} ${h / 2 - 50} Q${-w / 6} ${-h / 6} ${w / 8} ${h / 8} T${w / 2 - 50} ${-h / 2 + 50}`} fill="none" stroke={SEC} strokeWidth={4} strokeDasharray="12 12" opacity={0.6} />
  </g>
);

/** Thẻ giấy có dòng chữ giả; giữa ở gốc. */
export const Paper: React.FC<{ w?: number; h?: number; n?: number; fill?: string; ink?: string; head?: string }> = ({ w = 180, h = 230, n = 5, fill = PAPER, ink = SEC, head }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={14} fill={fill} />
    {head && <rect x={-w / 2} y={-h / 2} width={w} height={40} rx={14} fill={head} />}
    {head && <rect x={-w / 2} y={-h / 2 + 24} width={w} height={16} fill={head} />}
    <Lines x={-w / 2 + 20} y={-h / 2 + (head ? 62 : 28)} w={w - 40} n={n} gap={Math.min(34, (h - 70) / Math.max(1, n))} color={ink} t={10} />
  </g>
);

/** Ngôi nhà nhỏ. */
export const House: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = SEC }) => (
  <G s={s}>
    <path d="M-60 0 L0 -54 L60 0 Z" fill={color} />
    <rect x={-44} y={-4} width={88} height={64} fill={color} />
    <rect x={-12} y={22} width={24} height={38} fill={INK} />
  </G>
);

/** Trường học: nhà có lá cờ. */
export const School: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = SEC }) => (
  <G s={s}>
    <rect x={-70} y={-30} width={140} height={90} fill={color} />
    <path d="M-80 -30 L0 -70 L80 -30 Z" fill={color} />
    <rect x={-2} y={-110} width={4} height={44} fill={TXT} />
    <path d="M2 -110 L36 -100 L2 -90 Z" fill={GOLD} />
    {[-40, 0, 40].map((x) => <rect key={x} x={x - 12} y={-8} width={24} height={26} fill={INK} />)}
  </G>
);

/** Toà văn phòng. */
export const Office: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = SEC }) => (
  <G s={s}>
    <rect x={-46} y={-110} width={92} height={170} fill={color} />
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-30 + (k % 2) * 36} y={-96 + Math.floor(k / 2) * 36} width={24} height={22} fill={INK} />)}
  </G>
);

/** Đám đông nhỏ: n người xếp hàng. */
export const Crowd: React.FC<{ n?: number; gap?: number; color?: string; s?: number }> = ({ n = 5, gap = 50, color = HOV, s = 1 }) => (
  <G s={s}>
    {Array.from({ length: n }, (_, k) => (
      <G key={k} x={(k - (n - 1) / 2) * gap} y={(k % 2) * 10}>
        <circle cy={-50} r={18} fill={color} />
        <path d="M-26 20 Q-26 -26 0 -26 Q26 -26 26 20 Z" fill={color} />
      </G>
    ))}
  </G>
);

/** Người nhỏ đơn giản (đầu + thân). */
export const Mini: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = TXT }) => (
  <G s={s}>
    <circle cy={-50} r={18} fill={color} />
    <path d="M-26 20 Q-26 -26 0 -26 Q26 -26 26 20 Z" fill={color} />
  </G>
);

/** Sợi xích nối hai điểm. */
export const Chain: React.FC<{ x1: number; y1: number; x2: number; y2: number; color?: string; p?: number }> = ({ x1, y1, x2, y2, color = RED, p = 1 }) => {
  const len = Math.hypot(x2 - x1, y2 - y1) * p;
  const n = Math.max(1, Math.floor(len / 34));
  const a = Math.atan2(y2 - y1, x2 - x1);
  return (
    <g>
      {Array.from({ length: n }, (_, k) => {
        const d = k * 34 + 17;
        return <ellipse key={k} cx={x1 + Math.cos(a) * d} cy={y1 + Math.sin(a) * d} rx={20} ry={11} fill="none" stroke={color} strokeWidth={7} transform={`rotate(${(a * 180) / Math.PI + (k % 2 ? 0 : 0)} ${x1 + Math.cos(a) * d} ${y1 + Math.sin(a) * d})`} opacity={k % 2 ? 0.8 : 1} />;
      })}
    </g>
  );
};

/** Đồng hồ cát. */
export const Hourglass: React.FC<{ s?: number; p?: number }> = ({ s = 1, p = 0 }) => (
  <G s={s}>
    <rect x={-56} y={-90} width={112} height={14} rx={7} fill={GOLD} />
    <rect x={-56} y={76} width={112} height={14} rx={7} fill={GOLD} />
    <path d="M-44 -76 H44 Q44 -20 6 0 Q44 20 44 76 H-44 Q-44 20 -6 0 Q-44 -20 -44 -76 Z" fill="none" stroke={TXT} strokeWidth={6} />
    <path d={`M${-34 * (1 - p)} ${-66 + 60 * p} H${34 * (1 - p)} L0 -4 Z`} fill={GOLDL} />
    <path d={`M-38 70 H38 L${30 - 30 * (1 - p)} ${70 - 50 * p} H${-30 + 30 * (1 - p)} Z`} fill={GOLDL} />
  </G>
);

/** Phễu. */
export const Funnel: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = SEC }) => (
  <G s={s}>
    <path d="M-80 -60 H80 L16 10 V60 L-16 76 V10 Z" fill={color} />
    <ellipse cx={0} cy={-60} rx={80} ry={16} fill={HOV} />
  </G>
);

/** Đồng hồ đo bán nguyệt, kim chỉ theo v (0..1). */
export const Gauge: React.FC<{ v?: number; s?: number }> = ({ v = 0.5, s = 1 }) => (
  <G s={s}>
    <path d="M-110 0 A110 110 0 0 1 110 0" fill="none" stroke={HOV} strokeWidth={26} />
    <path d="M-110 0 A110 110 0 0 1 110 0" fill="none" stroke={GOLD} strokeWidth={26} pathLength={1} strokeDasharray={`${v} 1`} />
    {[0, 0.5, 1].map((k) => <line key={k} x1={0} y1={-80} x2={0} y2={-64} stroke={TXT} strokeWidth={5} transform={`rotate(${-90 + k * 180})`} />)}
    <line x1={0} y1={0} x2={0} y2={-92} stroke={TXT} strokeWidth={9} strokeLinecap="round" transform={`rotate(${-90 + v * 180})`} />
    <circle r={14} fill={TXT} />
  </G>
);

/** Mũi khoan đào xuống: tip ở gốc. */
export const Drill: React.FC<{ s?: number; rot?: number }> = ({ s = 1, rot = 0 }) => (
  <G s={s}>
    <Box cx={0} cy={-200} w={90} h={80} rx={16} fill={GOLD} />
    <path d="M-30 -160 H30 L0 0 Z" fill={SEC} />
    {[0, 1, 2, 3].map((k) => (
      <line key={k} x1={-24 + k * 6} y1={-140 + k * 36} x2={24 - k * 6} y2={-124 + k * 36 - ((rot % 36) / 36) * 8} stroke={INK} strokeWidth={5} />
    ))}
  </G>
);

/** Chiếc bẫy răng cưa. */
export const Trap: React.FC<{ s?: number; color?: string; shut?: number }> = ({ s = 1, color = RED, shut = 0 }) => (
  <G s={s}>
    <Box cx={0} cy={20} w={180} h={24} rx={8} fill={HOV} />
    <G y={10} r={-lerp(70, 10, shut)}>
      <path d="M0 0 A80 80 0 0 0 -80 0" fill="none" stroke={color} strokeWidth={10} />
      {[0, 1, 2, 3].map((k) => <path key={k} d={`M${-12 - k * 18} ${-Math.sqrt(Math.max(0, 6400 - (12 + k * 18 - 40) ** 2)) * 0 - 4} l-8 -18 l-8 18`} fill={color} />)}
    </G>
    <G y={10} r={lerp(70, 10, shut)}>
      <path d="M0 0 A80 80 0 0 1 80 0" fill="none" stroke={color} strokeWidth={10} />
    </G>
    <circle cy={10} r={12} fill={color} />
  </G>
);

/** Hạt giống nảy mầm: g 0..1. */
export const Sprout: React.FC<{ s?: number; g?: number }> = ({ s = 1, g = 1 }) => (
  <G s={s}>
    <ellipse cx={0} cy={0} rx={30} ry={18} fill="#6B5330" />
    <path d={`M0 -6 V${-6 - 60 * g}`} stroke={GOLDL} strokeWidth={8} strokeLinecap="round" />
    <G y={-6 - 60 * g} s={g}>
      <path d="M0 0 Q-36 -10 -42 -36 Q-12 -34 0 0 Z" fill={GOLD} />
      <path d="M0 0 Q36 -10 42 -36 Q12 -34 0 0 Z" fill={GOLDL} />
    </G>
  </G>
);

/** Máy ảnh. */
export const Camera: React.FC<{ s?: number; flash?: number }> = ({ s = 1, flash = 0 }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={200} h={130} rx={20} fill={HOV} />
    <rect x={-60} y={-86} width={60} height={26} rx={6} fill={HOV} />
    <circle r={44} fill={INK} stroke={TXT} strokeWidth={8} />
    <circle r={18} fill={GOLDL} opacity={0.6} />
    <circle cx={70} cy={-42} r={10} fill={GOLD} />
    {flash > 0.01 && <circle r={160} fill={TXT} opacity={0.35 * flash} />}
  </G>
);

/** Tia sét. */
export const Bolt: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = RED }) => (
  <G s={s}>
    <path d="M14 -80 L-30 6 H0 L-14 80 L34 -10 H4 Z" fill={color} />
  </G>
);

/** Huy hiệu tròn có hai biểu tượng góc ghép. */
export const Badge: React.FC<{ a: number; b: number; s?: number; lit?: number }> = ({ a, b, s = 1, lit = 1 }) => (
  <G s={s}>
    <circle r={96} fill={EL} stroke={lit > 0.5 ? GOLD : HOV} strokeWidth={8} />
    <circle r={80} fill="none" stroke={GOLD} strokeWidth={3} strokeDasharray="6 8" opacity={0.7} />
    <G x={-36} s={0.42}><Corner k={a} color={GOLDL} /></G>
    <G x={36} s={0.42}><Corner k={b} color={GOLDL} /></G>
    <path d="M-8 0 H8 M0 -8 V8" stroke={TXT} strokeWidth={5} />
  </G>
);

/** Mặt nạ đeo tạm. */
export const Mask: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = SEC }) => (
  <G s={s}>
    <path d="M-80 -30 Q0 -60 80 -30 Q86 30 30 40 Q0 10 -30 40 Q-86 30 -80 -30 Z" fill={color} />
    <ellipse cx={-36} cy={-6} rx={18} ry={11} fill={INK} />
    <ellipse cx={36} cy={-6} rx={18} ry={11} fill={INK} />
  </G>
);

/** La bàn. */
export const Compass: React.FC<{ s?: number; rot?: number }> = ({ s = 1, rot = 0 }) => (
  <G s={s}>
    <circle r={70} fill={EL} stroke={GOLD} strokeWidth={8} />
    <G r={rot}>
      <path d="M0 -54 L14 0 L0 54 L-14 0 Z" fill={SEC} />
      <path d="M0 -54 L14 0 H-14 Z" fill={GOLD} />
    </G>
    <circle r={8} fill={TXT} />
  </G>
);

/** Viên kim cương giá trị. */
export const Diamond: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = GOLDL }) => (
  <G s={s}>
    <path d="M-50 -20 L-26 -46 H26 L50 -20 L0 46 Z" fill={color} />
    <path d="M-50 -20 H50 M-26 -46 L-12 -20 L0 46 L12 -20 L26 -46" fill="none" stroke={INK} strokeWidth={4} opacity={0.45} />
  </G>
);

/** Đồng xu. */
export const Coin: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <circle r={30} fill={GOLD} stroke={GOLDL} strokeWidth={5} />
    <rect x={-5} y={-16} width={10} height={32} rx={4} fill={INK} opacity={0.5} />
  </G>
);

/** Ô chọn tròn có số. */
export const Radio: React.FC<{ on?: number; s?: number }> = ({ on = 0, s = 1 }) => (
  <G s={s}>
    <circle r={26} fill="none" stroke={on > 0.5 ? GOLD : SEC} strokeWidth={6} />
    <circle r={14 * on} fill={GOLD} />
  </G>
);

/** Nút tạm dừng tròn. */
export const Pause: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = GOLD }) => (
  <G s={s}>
    <circle r={60} fill={INK} stroke={color} strokeWidth={8} />
    <rect x={-22} y={-26} width={14} height={52} rx={4} fill={color} />
    <rect x={8} y={-26} width={14} height={52} rx={4} fill={color} />
  </G>
);

/** Biển cảnh báo tam giác. */
export const Warn: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = GOLD }) => (
  <G s={s}>
    <path d="M0 -80 L80 60 H-80 Z" fill={color} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-8} y={-34} width={16} height={56} rx={6} fill={INK} />
    <circle cy={40} r={9} fill={INK} />
  </G>
);

/** Điện thoại đứng. children vẽ trên màn hình (giữa ở gốc). */
export const Phone: React.FC<{ w?: number; h?: number; children?: React.ReactNode }> = ({ w = 240, h = 440, children }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={36} fill={EL} stroke={TXT} strokeWidth={6} />
    <Box cx={0} cy={0} w={w - 26} h={h - 60} rx={20} fill={SURF} />
    <rect x={-24} y={-h / 2 + 12} width={48} height={8} rx={4} fill={HOV} />
    {children}
  </g>
);

/** Micro. */
export const Mic: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = GOLD }) => (
  <G s={s}>
    <rect x={-22} y={-60} width={44} height={74} rx={22} fill={color} />
    <path d="M-38 -6 Q-38 34 0 34 Q38 34 38 -6" fill="none" stroke={color} strokeWidth={8} />
    <rect x={-4} y={34} width={8} height={24} fill={color} />
    <rect x={-26} y={56} width={52} height={8} rx={4} fill={color} />
  </G>
);

/** Con ma: biểu tượng chat ẩn danh. */
export const Ghost: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = TXT }) => (
  <G s={s}>
    <path d="M-40 40 V-6 Q-40 -50 0 -50 Q40 -50 40 -6 V40 L26 28 L13 40 L0 28 L-13 40 L-26 28 Z" fill={color} />
    <circle cx={-14} cy={-10} r={7} fill={INK} />
    <circle cx={14} cy={-10} r={7} fill={INK} />
  </G>
);

/** Dấu Gemini: ngôi sao bốn cánh. */
export const MarkGem: React.FC<{ r?: number }> = ({ r = 46 }) => (
  <g>
    <circle r={r} fill={EL} stroke={GOLDL} strokeWidth={4} />
    <path d={`M0 ${-r * 0.7} Q${r * 0.08} ${-r * 0.08} ${r * 0.7} 0 Q${r * 0.08} ${r * 0.08} 0 ${r * 0.7} Q${-r * 0.08} ${r * 0.08} ${-r * 0.7} 0 Q${-r * 0.08} ${-r * 0.08} 0 ${-r * 0.7} Z`} fill={GOLDL} />
  </g>
);

/** Bảng có hàng và cột ô; cell(k) trả nội dung từng ô. Giữa ở gốc. */
export const GridBox: React.FC<{ cols: number; rows: number; w: number; h: number; fillN?: number; head?: boolean }> = ({ cols, rows, w, h, fillN = 0, head = true }) => {
  const cw = w / cols;
  const ch = h / rows;
  return (
    <g>
      <Box cx={0} cy={0} w={w + 16} h={h + 16} rx={20} fill={SURF} stroke={HOV} strokeWidth={4} />
      {Array.from({ length: rows * cols }, (_, k) => {
        const r = Math.floor(k / cols);
        const c = k % cols;
        return <rect key={k} x={-w / 2 + c * cw + 4} y={-h / 2 + r * ch + 4} width={cw - 8} height={ch - 8} rx={10} fill={head && r === 0 ? "#3A3322" : k < fillN ? EL : DIM} />;
      })}
    </g>
  );
};

/** Bong bóng chat ngang (người hoặc AI), giữa ở gốc. */
export const Talk: React.FC<{ w?: number; h?: number; me?: boolean; n?: number; fill?: string }> = ({ w = 300, h = 80, me = false, n = 2, fill }) => {
  const c = fill ?? (me ? GOLD : HOV);
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={h} rx={24} fill={c} />
      <path d={me ? `M${w / 2 - 30} ${h / 2 - 4} L${w / 2 + 6} ${h / 2 + 18} L${w / 2 - 6} ${h / 2 - 16} Z` : `M${-w / 2 + 30} ${h / 2 - 4} L${-w / 2 - 6} ${h / 2 + 18} L${-w / 2 + 6} ${h / 2 - 16} Z`} fill={c} />
      <Lines x={-w / 2 + 24} y={-h / 2 + (h - (n - 1) * 24 - 10) / 2} w={w - 60} n={n} gap={24} color={me ? INK : TXT} t={10} />
    </g>
  );
};

/** Khung chat đơn giản không cột bên: thanh tiêu đề + vùng nội dung. Giữa ở gốc. */
export const ChatWin: React.FC<{ w: number; h: number; lit?: boolean; dark?: boolean; mark?: React.ReactNode; children?: React.ReactNode }> = ({ w, h, lit = true, dark = false, mark, children }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={28} fill={dark ? "#08080A" : EL} stroke={lit ? GOLD : HOV} strokeWidth={5} />
    <path d={`M${-w / 2} ${-h / 2 + 64} H${w / 2}`} stroke={HOV} strokeWidth={4} />
    {[0, 1, 2].map((i) => <circle key={i} cx={-w / 2 + 36 + i * 28} cy={-h / 2 + 32} r={9} fill={i === 0 ? GOLD : HOV} />)}
    {mark && <G x={w / 2 - 44} y={-h / 2 + 32} s={0.5}>{mark}</G>}
    <Box cx={0} cy={h / 2 - 44} w={w - 60} h={48} rx={24} fill={SURF} stroke={HOV} strokeWidth={3} />
    {children}
  </g>
);

/** Tờ lịch tháng: dày, có số ô đánh dấu. */
export const MonthPage: React.FC<{ w?: number; h?: number; marks?: number; cells?: number; color?: string }> = ({ w = 260, h = 230, marks = 0, cells = 28, color = GOLD }) => {
  const cols = 7;
  const rows = Math.ceil(cells / cols);
  const cw = (w - 30) / cols;
  const ch = (h - 80) / rows;
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={h} rx={18} fill={TXT} />
      <rect x={-w / 2} y={-h / 2} width={w} height={50} rx={18} fill={color} />
      <rect x={-w / 2} y={-h / 2 + 30} width={w} height={20} fill={color} />
      {[-w / 4, w / 4].map((x) => <rect key={x} x={x - 6} y={-h / 2 - 16} width={12} height={32} rx={6} fill={HOV} />)}
      {Array.from({ length: cells }, (_, k) => (
        <rect key={k} x={-w / 2 + 15 + (k % cols) * cw + 2} y={-h / 2 + 62 + Math.floor(k / cols) * ch + 2} width={cw - 4} height={ch - 4} rx={4} fill={k < marks ? GOLD : "#CFCFCF"} />
      ))}
    </g>
  );
};

/** Đích ngắm. */
export const Target: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    {[70, 48, 26].map((r, k) => <circle key={r} r={r} fill={k % 2 ? INK : GOLD} />)}
    <circle r={8} fill={TXT} />
  </G>
);

/** Cái cúp. */
export const Trophy: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = GOLD }) => (
  <G s={s}>
    <path d="M-50 -60 H50 V-20 Q50 30 0 36 Q-50 30 -50 -20 Z" fill={color} />
    <path d="M-50 -46 Q-86 -46 -80 -16 Q-74 6 -46 6 M50 -46 Q86 -46 80 -16 Q74 6 46 6" fill="none" stroke={color} strokeWidth={9} />
    <rect x={-10} y={34} width={20} height={30} fill={color} />
    <rect x={-40} y={62} width={80} height={16} rx={6} fill={color} />
  </G>
);

/** Âm dương: nghịch lý. */
export const YinYang: React.FC<{ s?: number; rot?: number }> = ({ s = 1, rot = 0 }) => (
  <G s={s} r={rot}>
    <circle r={60} fill={TXT} />
    <path d="M0 -60 A60 60 0 0 1 0 60 A30 30 0 0 1 0 0 A30 30 0 0 0 0 -60 Z" fill={GOLD} />
    <circle cy={-30} r={9} fill={GOLD} />
    <circle cy={30} r={9} fill={TXT} />
    <circle r={60} fill="none" stroke={INK} strokeWidth={4} />
  </G>
);

/** Mạng lưới nút nối nhau (hệ thống). */
export const Network: React.FC<{ s?: number; p?: number; color?: string }> = ({ s = 1, p = 1, color = GOLD }) => {
  const pts: [number, number][] = [[0, 0], [-110, -60], [110, -60], [-130, 70], [130, 70], [0, 120], [0, -120]];
  const edges: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 6], [2, 6], [1, 3], [2, 4], [3, 5], [4, 5]];
  return (
    <G s={s}>
      {edges.map(([a, b], k) => (
        <line key={k} x1={pts[a][0]} y1={pts[a][1]} x2={lerp(pts[a][0], pts[b][0], clamp01(p * 2 - k / 12))} y2={lerp(pts[a][1], pts[b][1], clamp01(p * 2 - k / 12))} stroke={color} strokeWidth={6} opacity={0.8} />
      ))}
      {pts.map(([x, y], k) => <circle key={k} cx={x} cy={y} r={k === 0 ? 24 : 16} fill={k === 0 ? GOLDL : color} opacity={clamp01(p * 3 - k * 0.3)} />)}
    </G>
  );
};

/** Viền khuôn: khung chữ nhật nét đứt bao quanh. */
export const Mold: React.FC<{ w: number; h: number; color?: string; broken?: number }> = ({ w, h, color = GOLD, broken = 0 }) => (
  <g>
    {[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy], k) => (
      <path
        key={k}
        d={`M${(sx * w) / 2} ${(sy * h) / 2 - sy * 60} V${(sy * h) / 2} H${(sx * w) / 2 - sx * 60}`}
        fill="none"
        stroke={color}
        strokeWidth={9}
        strokeLinecap="round"
        transform={`translate(${sx * broken * 60} ${sy * broken * 50}) rotate(${sx * sy * broken * 18} ${(sx * w) / 2} ${(sy * h) / 2})`}
      />
    ))}
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={20} fill="none" stroke={color} strokeWidth={4} strokeDasharray="14 12" opacity={0.6 * (1 - broken)} />
  </g>
);

/** Kệ lưu trữ / ngăn tủ. */
export const Cabinet: React.FC<{ s?: number; open?: number }> = ({ s = 1, open = 0 }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={200} h={260} rx={14} fill={HOV} />
    {[0, 1, 2].map((k) => (
      <g key={k} transform={`translate(${k === 0 ? open * 30 : 0} 0)`}>
        <Box cx={0} cy={-80 + k * 82} w={170} h={70} rx={10} fill={EL} stroke={k === 0 && open > 0.5 ? GOLD : SEC} strokeWidth={4} />
        <rect x={-24} y={-86 + k * 82} width={48} height={12} rx={6} fill={GOLD} />
      </g>
    ))}
  </G>
);

/** Thẻ prompt: giấy sẫm có đầu vàng ghi số; mục sáng theo lit (0..4). */
export const PromptCard: React.FC<{ w?: number; h?: number; sections?: number; lit?: number; torn?: number }> = ({ w = 300, h = 380, sections = 4, lit = -1, torn = 0 }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h * (1 - torn * 0.45)} rx={18} fill={EL} stroke={GOLD} strokeWidth={5} transform={`translate(0 ${-h * torn * 0.225})`} />
    <rect x={-w / 2} y={-h / 2} width={w} height={54} rx={18} fill={GOLD} />
    <rect x={-w / 2} y={-h / 2 + 34} width={w} height={20} fill={GOLD} />
    <rect x={-w / 2 + 24} y={-h / 2 + 20} width={w * 0.4} height={14} rx={7} fill={INK} />
    {Array.from({ length: sections }, (_, k) => {
      const y = -h / 2 + 80 + k * ((h - 100) / sections);
      if (torn > 0.5 && y > h * 0.05) return null;
      return (
        <g key={k}>
          <rect x={-w / 2 + 20} y={y} width={w - 40} height={(h - 120) / sections} rx={10} fill={k === lit ? "#3A3322" : SURF} stroke={k === lit ? GOLD : "none"} strokeWidth={3} />
          <rect x={-w / 2 + 34} y={y + 12} width={w * 0.38} height={10} rx={5} fill={k === lit ? GOLDL : SEC} />
          <rect x={-w / 2 + 34} y={y + 32} width={w * 0.6} height={7} rx={3} fill={HOV} />
        </g>
      );
    })}
    {torn > 0.01 && <path d={`M${-w / 2} ${h * 0.05} l20 14 l20 -12 l20 16 l20 -14 l20 12 l20 -16 l20 14 l20 -12 l20 16 l20 -14 l20 12 l20 -14 l20 12 l20 -10`} fill="none" stroke={RED} strokeWidth={5} opacity={torn} />}
  </g>
);

/** Dấu đóng tròn có chữ thập nghiêng (gạch bỏ). */
export const Ban: React.FC<{ r?: number; color?: string }> = ({ r = 90, color = RED }) => (
  <g>
    <circle r={r} fill="none" stroke={color} strokeWidth={r * 0.14} />
    <line x1={-r * 0.7} y1={r * 0.7} x2={r * 0.7} y2={-r * 0.7} stroke={color} strokeWidth={r * 0.14} strokeLinecap="round" />
  </g>
);

/** Ống nghiệm. */
export const Tube: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <path d="M-16 -60 V40 Q-16 60 0 60 Q16 60 16 40 V-60" fill="none" stroke={TXT} strokeWidth={7} />
    <path d="M-12 6 V40 Q-12 54 0 54 Q12 54 12 40 V6 Z" fill={GOLD} />
    <rect x={-24} y={-66} width={48} height={10} rx={5} fill={TXT} />
  </G>
);

/** Xoắn ốc đi lên (Spiral Dynamics). */
export const Spiral: React.FC<{ s?: number; color?: string }> = ({ s = 1, color = GOLDL }) => {
  const d = Array.from({ length: 60 }, (_, k) => {
    const a = k * 0.35;
    const r = 8 + k * 1.3;
    return `${k ? "L" : "M"}${Math.cos(a) * r} ${Math.sin(a) * r * 0.5 - k * 1.6 + 50}`;
  }).join(" ");
  return <G s={s}><path d={d} fill="none" stroke={color} strokeWidth={8} strokeLinecap="round" /></G>;
};

/** Ô vuông chia bốn góc phần tư (Ken Wilber). */
export const Quadrants: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    {[0, 1, 2, 3].map((k) => <rect key={k} x={k % 2 ? 4 : -64} y={k > 1 ? 4 : -64} width={60} height={60} rx={10} fill={k === 0 ? GOLD : k === 3 ? GOLDL : SEC} />)}
  </G>
);

/** Thang dựng đứng nhiều nấc. */
export const Ladder: React.FC<{ s?: number; n?: number }> = ({ s = 1, n = 5 }) => (
  <G s={s}>
    <rect x={-50} y={-90} width={10} height={180} rx={5} fill={TXT} />
    <rect x={40} y={-90} width={10} height={180} rx={5} fill={TXT} />
    {Array.from({ length: n }, (_, k) => <rect key={k} x={-44} y={-74 + k * (150 / (n - 1)) - 4} width={88} height={9} rx={4} fill={GOLD} />)}
  </G>
);

/** Khung của video này thu vào 8% để hình không chạm mép khi máy quay trôi; nhãn phóng bù để vẫn đọc được. */
type Fit = { s?: number; dy?: number };
/** fit: phóng s quanh tâm khung rồi dời dy, áp chung cho hình và nhãn để bố cục lấp khung mà không lệch nhau. */
export const Stage: React.FC<React.ComponentProps<typeof BaseStage> & { fit?: Fit }> = ({ fit, children, overlay, ...props }) => {
  if (!fit) return <BaseStage inset={0.92} overlay={overlay} {...props}>{children}</BaseStage>;
  const { s = 1, dy = 0 } = fit;
  return (
    <BaseStage
      inset={0.92}
      {...props}
      overlay={<div style={{ position: "absolute", inset: 0, transformOrigin: `${W / 2}px ${H / 2}px`, transform: `translateY(${dy}px) scale(${s})` }}>{overlay}</div>}
    >
      <g transform={`translate(${W / 2} ${H / 2 + dy}) scale(${s}) translate(${-W / 2} ${-H / 2})`}>{children}</g>
    </BaseStage>
  );
};
export const Tag: React.FC<React.ComponentProps<typeof BaseTag> & { w?: number }> = ({ size: nominal = 40, w, ...props }) => {
  // Khung thu 0,92 nên chữ phóng bù, và không bao giờ dưới 28 px khi hiện ra.
  const size = Math.max(nominal, 28) / 0.92;
  if (!w) return <BaseTag size={size} {...props} />;
  // Nhãn dài trong ô hẹp: xuống dòng, canh giữa, bề rộng tối đa w.
  const { i, x, y, p, solid = false, color = GOLDL, o = 1 } = props;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, transform: `translate(-50%, -50%) scale(${p})`, opacity: Math.min(1, p) * o, textAlign: "center" }}>
      <span style={{ display: "inline-block", fontSize: size, fontWeight: 600, lineHeight: 1.2, color: solid ? INK : color, background: solid ? color : "rgba(12,12,12,0.82)", padding: "6px 16px 8px", borderRadius: 24 }}>
        <Label i={i} />
      </span>
    </div>
  );
};
