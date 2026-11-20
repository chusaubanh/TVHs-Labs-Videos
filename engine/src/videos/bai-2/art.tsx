import React from "react";
import { Box, EL, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, RED, SEC, TXT, XL } from "../shared/art";

/** Tranh riêng của Bài 2. shortcut: toạ độ chỉ vẽ cho khổ 4:5 đã duyệt, đổi khổ thì phải dựng bố cục mới. */
export const ICE = "#7DD3FC";
export const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

/** Con bọ lỗi: thân đỏ, sáu chân, hai râu. */
export const Bug: React.FC<{ s?: number; blink?: number; color?: string }> = ({ s = 1, blink = 1, color = RED }) => (
  <G s={s}>
    {[-1, 1].map((d) =>
      [-30, 0, 30].map((y) => <line key={`${d}${y}`} x1={d * 40} y1={y} x2={d * 84} y2={y + (y === 0 ? 0 : y > 0 ? 26 : -26)} stroke={color} strokeWidth={9} strokeLinecap="round" />),
    )}
    <path d="M-16 -64 Q-30 -100 -50 -104 M16 -64 Q30 -100 50 -104" stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={6} rx={50} ry={66} fill={color} opacity={0.6 + 0.4 * blink} />
    <circle cx={0} cy={-58} r={28} fill={color} />
    <line x1={0} y1={-30} x2={0} y2={70} stroke={INK} strokeWidth={5} />
    {[-14, 14].map((x) => <circle key={x} cx={x} cy={-62} r={7} fill={TXT} />)}
    {[-22, 22].map((x) => <circle key={x} cx={x} cy={18} r={9} fill={INK} opacity={0.5} />)}
  </G>
);

export const Wrench: React.FC<{ s?: number; r?: number; bend?: number }> = ({ s = 1, r = 0, bend = 0 }) => (
  <G s={s} r={r}>
    <path d={`M0 0 Q${bend * 40} 60 0 130`} stroke={SEC} strokeWidth={22} strokeLinecap="round" fill="none" />
    <path d="M-34 -10 A36 36 0 1 1 34 -10 L16 -10 L16 -36 L-16 -36 L-16 -10 Z" fill={SEC} />
  </G>
);

/** Đầu người nhìn nghiêng sang phải: tóc, tai, mắt, mũi, cằm, cổ. Vùng não ở quanh (-20, -80). */
export const Head: React.FC<{ s?: number; fill?: string; frown?: number; blush?: number; children?: React.ReactNode }> = ({ s = 1, fill = EL, frown = 0, blush = 0, children }) => (
  <G s={s}>
    <path d="M-70 230 C-80 180 -110 140 -130 80 C-170 -40 -110 -190 20 -195 C120 -198 170 -120 162 -55 L190 5 Q194 14 180 18 L168 20 L172 42 Q174 50 164 54 L170 66 Q172 76 160 82 C162 104 150 124 120 130 C100 133 90 140 88 160 L92 230 Z" fill={fill} stroke={GOLD} strokeWidth={6} strokeLinejoin="round" />
    <path d="M-131 72 C-172 -50 -110 -193 20 -197 C110 -199 160 -140 164 -96 C130 -122 70 -136 10 -128 C-60 -118 -98 -60 -106 24 Z" fill={HOV} />
    <path d="M2 -22 Q32 -28 32 8 Q32 38 6 36" fill="none" stroke={GOLD} strokeWidth={6} strokeLinecap="round" />
    <path d={`M106 ${-70 + frown * 10} L152 ${-66 - frown * 8}`} stroke={TXT} strokeWidth={7} strokeLinecap="round" />
    <ellipse cx={132} cy={-40} rx={13} ry={8} fill={TXT} />
    <circle cx={136} cy={-40} r={5} fill={INK} />
    <ellipse cx={122} cy={44} rx={26} ry={13} fill={RED} opacity={0.55 * blush} />
    {children}
  </G>
);

/** Tờ bản đồ giấy vẽ sơ sài vài đường và một điểm đỏ. */
export const MapSheet: React.FC<{ w?: number; h?: number }> = ({ w = 520, h = 300 }) => (
  <g>
    <path d={`M${-w / 2} ${-h / 2} L${-w / 6} ${-h / 2 + 18} L${w / 6} ${-h / 2} L${w / 2} ${-h / 2 + 18} V${h / 2} L${w / 6} ${h / 2 - 18} L${-w / 6} ${h / 2} L${-w / 2} ${h / 2 - 18} Z`} fill={PAPER} />
    {[-w / 6, w / 6].map((x) => <line key={x} x1={x} y1={-h / 2 + 10} x2={x} y2={h / 2 - 10} stroke={SEC} strokeWidth={2} opacity={0.5} />)}
    <path d={`M${-w / 2 + 40} ${h / 4} Q${-w / 6} ${-h / 4} 0 ${h / 8} T${w / 2 - 40} ${-h / 4}`} fill="none" stroke={SEC} strokeWidth={6} strokeDasharray="14 10" />
    <path d={`M${-w / 3} ${-h / 3} Q0 ${-h / 6} ${w / 4} ${h / 3}`} fill="none" stroke={SEC} strokeWidth={4} />
    <circle cx={w / 5} cy={-h / 8} r={14} fill={RED} />
  </g>
);

/** Ngăn kéo có các thẻ quy định khoá kín. */
export const Drawer: React.FC<{ open?: number; n?: number }> = ({ open = 1, n = 4 }) => (
  <g>
    <Box cx={0} cy={0} w={260} h={150} rx={14} fill={HOV} stroke={GOLD} strokeWidth={5} />
    <G y={open * 70}>
      {Array.from({ length: n }, (_, k) => (
        <G key={k} x={-90 + k * 60} y={-40 - open * (40 + (k % 2) * 16)}>
          <Box cx={0} cy={0} w={50} h={70} rx={6} fill={PAPER} />
          <Lines x={-16} y={-22} w={32} n={3} gap={14} color={SEC} t={5} />
          <rect x={-8} y={18} width={16} height={12} rx={3} fill={GOLD} />
          <path d="M-5 18 V12 Q0 6 5 12 V18" fill="none" stroke={GOLD} strokeWidth={3} />
        </G>
      ))}
      <Box cx={0} cy={20} w={300} h={70} rx={12} fill={EL} stroke={GOLD} strokeWidth={5} />
      <rect x={-30} y={14} width={60} height={12} rx={6} fill={GOLD} />
    </G>
  </g>
);

/** Dải ba thời điểm: trang trắng, bút đang viết, bản nháp. hi là chốt đang sáng (-1 là không chốt nào). */
export const TimeRail: React.FC<{ w?: number; p?: number; hi?: number; pins?: number }> = ({ w = 840, p = 1, hi = -1, pins = 1 }) => (
  <g>
    <rect x={-w / 2} y={-6} width={w * p} height={12} rx={6} fill={HOV} />
    {[0, 1, 2].map((k) => {
      const x = -w / 2 + w * (k + 0.5) / 3;
      const on = k === hi;
      return (
        <G key={k} x={x} s={clamp01(pins * 3 - k)}>
          <circle r={on ? 30 : 22} fill={on ? GOLD : EL} stroke={GOLD} strokeWidth={5} />
          <G y={-86} s={0.42}>
            <Box cx={0} cy={0} w={150} h={190} rx={12} fill={k === 0 ? TXT : PAPER} />
            {k > 0 && <Lines x={-55} y={-70} w={110} n={k === 1 ? 2 : 5} gap={28} color={SEC} t={10} />}
            {k === 1 && <Pen x={40} y={-10} r={30} />}
          </G>
        </G>
      );
    })}
  </g>
);

export const Pen: React.FC<{ x?: number; y?: number; r?: number; capped?: boolean; s?: number }> = ({ x = 0, y = 0, r = 0, capped = false, s = 1 }) => (
  <G x={x} y={y} r={r} s={s}>
    <rect x={-10} y={-80} width={20} height={110} rx={6} fill={GOLD} />
    <path d="M-10 30 L0 56 L10 30 Z" fill={capped ? GOLD : TXT} />
    {capped && <rect x={-12} y={10} width={24} height={44} rx={8} fill={GOLDL} />}
    <rect x={8} y={-70} width={6} height={40} rx={3} fill={GOLDL} />
  </G>
);

/** Miếng vá nhỏ. */
export const Patch: React.FC<{ s?: number; r?: number }> = ({ s = 1, r = -20 }) => (
  <G s={s} r={r}>
    <rect x={-50} y={-16} width={100} height={32} rx={16} fill={GOLDL} />
    <rect x={-16} y={-16} width={32} height={32} fill={GOLD} />
    {[-6, 6].map((x) => [-6, 6].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r={2.5} fill={INK} />))}
  </G>
);

/** Phong bì. */
export const Envelope: React.FC<{ s?: number; fill?: string }> = ({ s = 1, fill = PAPER }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={160} h={104} rx={8} fill={fill} />
    <path d="M-80 -52 L0 12 L80 -52" fill="none" stroke={SEC} strokeWidth={5} />
    <path d="M-80 52 L-22 0 M80 52 L22 0" fill="none" stroke={SEC} strokeWidth={3} />
  </G>
);

/** Túi tiền ngân sách. */
export const MoneyBag: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <path d="M-20 -60 L20 -60 L10 -40 Q60 -10 56 30 Q52 64 0 64 Q-52 64 -56 30 Q-60 -10 -10 -40 Z" fill={GOLD} />
    <rect x={-22} y={-48} width={44} height={10} rx={5} fill={GOLDL} />
    <path d="M14 0 Q14 -14 0 -14 Q-16 -14 -16 0 Q-16 12 0 14 Q16 16 16 30 Q16 44 0 44 Q-14 44 -14 30 M0 -26 V56" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" />
  </G>
);

/** Thùng thiết bị đóng hộp có thẻ giá. */
export const Crate: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <path d="M-70 -30 L0 -64 L70 -30 L0 4 Z" fill={GOLDL} />
    <path d="M-70 -30 L0 4 V84 L-70 50 Z" fill={GOLD} />
    <path d="M70 -30 L0 4 V84 L70 50 Z" fill="#9C7C3E" />
    <path d="M-36 -47 L34 -13" stroke={PAPER} strokeWidth={10} />
    <G x={84} y={-20} r={20}>
      <path d="M-20 -14 H22 V14 H-20 L-34 0 Z" fill={TXT} />
      <circle cx={-20} cy={0} r={4} fill={INK} />
    </G>
  </G>
);

/** Ô câu hỏi của sếp có dấu hỏi hoặc dấu tích. */
export const QCard: React.FC<{ w?: number; h?: number; done?: number; children?: React.ReactNode }> = ({ w = 300, h = 150, done = 0, children }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={20} fill={EL} stroke={done > 0.5 ? XL : GOLD} strokeWidth={5} />
    <circle cx={w / 2 - 30} cy={-h / 2 + 30} r={20} fill={done > 0.5 ? XL : RED} />
    {done > 0.5 ? (
      <path d={`M${w / 2 - 40} ${-h / 2 + 30} L${w / 2 - 32} ${-h / 2 + 38} L${w / 2 - 20} ${-h / 2 + 22}`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
    ) : (
      <path d={`M${w / 2 - 38} ${-h / 2 + 24} Q${w / 2 - 30} ${-h / 2 + 12} ${w / 2 - 22} ${-h / 2 + 24} Q${w / 2 - 22} ${-h / 2 + 30} ${w / 2 - 30} ${-h / 2 + 34} M${w / 2 - 30} ${-h / 2 + 42} V${-h / 2 + 43}`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
    )}
    {children}
  </g>
);

/** Ô đánh số chờ điền. */
export const Slot: React.FC<{ k: number; w?: number; fill?: number; children?: React.ReactNode }> = ({ k, w = 150, fill = 0, children }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={w} rx={18} fill={fill > 0.5 ? EL : "none"} stroke={fill > 0.5 ? GOLD : HOV} strokeWidth={5} strokeDasharray={fill > 0.5 ? undefined : "14 10"} />
    <circle cx={-w / 2 + 22} cy={-w / 2 + 22} r={16} fill={GOLD} />
    {Array.from({ length: k + 1 }, (_, d) => <circle key={d} cx={-w / 2 + 22 + (d - k / 2) * 7} cy={-w / 2 + 22} r={2.6} fill={INK} />)}
    <G s={fill}>{children}</G>
  </g>
);

/** Mũ: kiểu sếp (vành đen dải vàng) hoặc thanh tra (lưỡi trai, phù hiệu). */
export const Hat: React.FC<{ kind?: "sep" | "thanh-tra"; s?: number }> = ({ kind = "sep", s = 1 }) => (
  <G s={s}>
    {kind === "sep" ? (
      <>
        <rect x={-70} y={-10} width={140} height={18} rx={9} fill={INK} stroke={GOLD} strokeWidth={3} />
        <rect x={-46} y={-70} width={92} height={64} rx={10} fill={INK} stroke={GOLD} strokeWidth={3} />
        <rect x={-46} y={-26} width={92} height={14} fill={GOLD} />
      </>
    ) : (
      <>
        <path d="M-60 0 Q-60 -60 0 -64 Q60 -60 60 0 Z" fill="#1E3A5F" stroke={GOLD} strokeWidth={3} />
        <path d="M-10 0 H86 Q80 16 -10 14 Z" fill={INK} />
        <path d="M0 -44 L10 -28 L0 -14 L-10 -28 Z" fill={GOLD} />
      </>
    )}
  </G>
);

/** Kính lúp nghiêng có cán. */
export const Loupe: React.FC<{ s?: number; r?: number }> = ({ s = 1, r = 0 }) => (
  <G s={s} r={r}>
    <line x1={50} y1={50} x2={110} y2={110} stroke={GOLD} strokeWidth={22} strokeLinecap="round" />
    <circle r={68} fill="rgba(224,194,134,0.18)" stroke={GOLDL} strokeWidth={13} />
    <path d="M-34 -30 Q-20 -46 0 -48" fill="none" stroke={TXT} strokeWidth={6} strokeLinecap="round" opacity={0.6} />
  </G>
);

/** Đầu AI có thân và hai tay, để đội mũ, cầm đồ. */
export const Bot: React.FC<{ s?: number; arm?: number; children?: React.ReactNode }> = ({ s = 1, arm = 0, children }) => (
  <G s={s}>
    <path d="M-70 200 Q-70 90 0 90 Q70 90 70 200 Z" fill={HOV} />
    <rect x={-90} y={100} width={22} height={90} rx={11} fill={HOV} transform={`rotate(${20 + arm * 40} -79 110)`} />
    <rect x={68} y={100} width={22} height={90} rx={11} fill={HOV} transform={`rotate(${-20 - arm * 40} 79 110)`} />
    <rect x={-80} y={-70} width={160} height={150} rx={40} fill={INK} stroke={GOLD} strokeWidth={7} />
    {[-30, 30].map((x) => <circle key={x} cx={x} cy={0} r={14} fill={GOLDL} />)}
    <rect x={-26} y={36} width={52} height={10} rx={5} fill={GOLD} />
    <line x1={0} y1={-70} x2={0} y2={-100} stroke={GOLD} strokeWidth={6} />
    <circle cx={0} cy={-104} r={10} fill={GOLD} />
    {children}
  </G>
);
