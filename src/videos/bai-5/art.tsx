import React from "react";
import { interpolateColors } from "remotion";
import { Box, EL, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, RED, SEC, SURF, TXT, XL } from "../shared/art";
import { ICE } from "../bai-2/art";

/** Tranh riêng của Bài 5. shortcut: toạ độ chỉ vẽ cho khổ 4:5 đã duyệt, đổi khổ thì phải dựng bố cục mới. */
export const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));
export const LEAF = "#4D7C0F";

/** Huy chương vàng có dải ruy băng và ngôi sao: dấu hiệu "đã thạo việc". */
export const Medal: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <path d="M-34 -80 L-8 -10 L8 -10 L-14 -80 Z" fill={RED} />
    <path d="M34 -80 L8 -10 L-8 -10 L14 -80 Z" fill="#B91C1C" />
    <circle cy={22} r={40} fill={GOLD} stroke={GOLDL} strokeWidth={6} />
    <path d="M0 -2 L7 14 L25 15 L11 26 L16 43 L0 33 L-16 43 L-11 26 L-25 15 L-7 14 Z" fill={INK} opacity={0.75} />
  </G>
);

/** Bia mục tiêu có mũi tên cắm giữa. */
export const Target: React.FC<{ s?: number; hit?: number }> = ({ s = 1, hit = 1 }) => (
  <G s={s}>
    {[60, 44, 28, 12].map((r, k) => <circle key={r} r={r} fill={k % 2 ? TXT : RED} />)}
    <G o={clamp01(hit * 3)} x={(1 - hit) * 90} y={(1 - hit) * -90}>
      <line x1={0} y1={0} x2={64} y2={-64} stroke={GOLD} strokeWidth={8} strokeLinecap="round" />
      <path d="M58 -78 L80 -80 L78 -58 Z M48 -70 L66 -86 M70 -48 L86 -66" stroke={GOLDL} strokeWidth={6} fill={GOLDL} />
    </G>
  </G>
);

/** Thẻ việc vàng nhỏ. */
export const TaskCard: React.FC<{ s?: number; w?: number; fill?: string }> = ({ s = 1, w = 120, fill = GOLD }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={w} h={52} rx={12} fill={fill} />
    <rect x={-w / 2 + 14} y={-12} width={w * 0.55} height={10} rx={5} fill={INK} opacity={0.65} />
    <rect x={-w / 2 + 14} y={6} width={w * 0.35} height={8} rx={4} fill={INK} opacity={0.45} />
    <circle cx={w / 2 - 20} cy={0} r={9} fill={INK} opacity={0.5} />
  </G>
);

/** Khung giờ làm việc: cột giờ bên trái, các ô theo dòng; filled là số ô đã có thẻ. */
export const TimeGrid: React.FC<{ w?: number; h?: number; rows?: number }> = ({ w = 300, h = 240, rows = 4 }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={16} fill={SURF} stroke={HOV} strokeWidth={4} />
    {Array.from({ length: rows }, (_, k) => {
      const y = -h / 2 + (k + 0.5) * (h / rows);
      return (
        <g key={k}>
          <circle cx={-w / 2 + 26} cy={y} r={12} fill="none" stroke={SEC} strokeWidth={3} />
          <line x1={-w / 2 + 26} y1={y} x2={-w / 2 + 26} y2={y - 7} stroke={SEC} strokeWidth={3} />
          <line x1={-w / 2 + 50} x2={w / 2 - 12} y1={y + h / rows / 2} y2={y + h / rows / 2} stroke={HOV} strokeWidth={2} />
        </g>
      );
    })}
  </g>
);

/** Biển dừng bát giác đỏ. */
export const StopSign: React.FC<{ s?: number }> = ({ s = 1 }) => {
  const pts = Array.from({ length: 8 }, (_, k) => {
    const a = (Math.PI / 8) * (2 * k + 1);
    return `${Math.cos(a) * 110} ${Math.sin(a) * 110}`;
  });
  return (
    <G s={s}>
      <path d={`M${pts.join(" L")} Z`} fill={RED} stroke={TXT} strokeWidth={10} />
      <rect x={-64} y={-16} width={128} height={32} rx={8} fill={TXT} />
      <rect x={-10} y={120} width={20} height={150} fill={SEC} />
    </G>
  );
};

/** Thẻ tên treo có lỗ xâu dây; nội dung là vạch chữ (tên đọc qua nhãn). */
export const NameTag: React.FC<{ s?: number; w?: number; fill?: string; string?: boolean }> = ({ s = 1, w = 200, fill = GOLDL, string = true }) => (
  <G s={s}>
    {string && <path d={`M${-w / 2 + 6} 0 Q${-w / 2 - 40} -40 ${-w / 2 - 70} -20`} fill="none" stroke={GOLD} strokeWidth={5} />}
    <path d={`M${-w / 2 + 30} -36 H${w / 2 - 10} Q${w / 2} -36 ${w / 2} -26 V26 Q${w / 2} 36 ${w / 2 - 10} 36 H${-w / 2 + 30} L${-w / 2} 0 Z`} fill={fill} stroke={GOLD} strokeWidth={4} />
    <circle cx={-w / 2 + 22} cy={0} r={8} fill={INK} />
    <rect x={-w / 2 + 44} y={-10} width={w - 80} height={20} rx={10} fill={INK} opacity={0.7} />
  </G>
);

/** Tấm nội quy dán tường: bốn góc băng keo; cam là độ hoá các dòng thành biển cấm. */
export const Poster: React.FC<{ w?: number; h?: number; cam?: number; glow?: number }> = ({ w = 380, h = 460, cam = 0, glow = 0 }) => (
  <g>
    {glow > 0.01 && <Box cx={0} cy={0} w={w + 60} h={h + 60} rx={30} fill={GOLDL} opacity={0.18 * glow} />}
    <Box cx={8} cy={10} w={w} h={h} rx={10} fill="#000" opacity={0.35} />
    <Box cx={0} cy={0} w={w} h={h} rx={10} fill={PAPER} />
    <rect x={-w / 2 + 30} y={-h / 2 + 28} width={w - 60} height={30} rx={8} fill={INK} />
    {[0, 1, 2, 3].map((k) => {
      const y = -h / 2 + 110 + k * ((h - 150) / 4);
      return (
        <g key={k}>
          <circle cx={-w / 2 + 52} cy={y} r={20} fill={cam > 0.5 ? RED : SEC} />
          {cam > 0.5 ? <rect x={-w / 2 + 40} y={y - 5} width={24} height={10} rx={3} fill={TXT} /> : <circle cx={-w / 2 + 52} cy={y} r={7} fill={PAPER} />}
          <rect x={-w / 2 + 88} y={y - 8} width={(w - 130) * (k % 2 ? 0.75 : 1)} height={16} rx={8} fill={HOV} />
        </g>
      );
    })}
    {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([dx, dy], k) => (
      <rect key={k} x={dx * (w / 2) - 34} y={dy * (h / 2) - 13} width={68} height={26} rx={4} fill={GOLD} opacity={0.85} transform={`rotate(${dx * dy * 35} ${dx * (w / 2)} ${dy * (h / 2)})`} />
    ))}
  </g>
);

/** Tủ ba ngăn kéo; open là độ mở của từng ngăn (0..1). */
export const Cabinet: React.FC<{ w?: number; open?: [number, number, number]; lit?: number }> = ({ w = 460, open = [0, 0, 0], lit = -1 }) => (
  <g>
    <Box cx={10} cy={14} w={w} h={540} rx={18} fill="#000" opacity={0.35} />
    <Box cx={0} cy={0} w={w} h={540} rx={18} fill="#5A4526" stroke={GOLD} strokeWidth={6} />
    {[0, 1, 2].map((k) => {
      const y = -270 + 30 + k * 170;
      const o = open[k];
      return (
        <G key={k} y={o * 40} s={1 + o * 0.06}>
          <Box cx={0} cy={y + 75} w={w - 50} h={150} rx={12} fill={k === lit ? "#7A5F36" : "#6B5330"} stroke={k === lit ? GOLDL : WOODL} strokeWidth={5} />
          <rect x={-60} y={y + 28} width={120} height={36} rx={6} fill={PAPER} opacity={0.9} />
          <rect x={-40} y={y + 41} width={80} height={10} rx={5} fill={HOV} />
          <rect x={-50} y={y + 92} width={100} height={18} rx={9} fill={GOLD} />
        </G>
      );
    })}
  </g>
);
const WOODL = "#8B6B3A";

/** Quyển sổ SOP gáy vàng có tab màu; open 0 là bìa, 1 là mở hai trang; steps là số bước đã hiện; ticks là số bước đã tích. */
export const SopBook: React.FC<{ s?: number; open?: number; steps?: number; ticks?: number; cam?: number }> = ({ s = 1, open = 0, steps = 4, ticks = 0, cam = 0 }) => (
  <G s={s}>
    {open < 0.5 ? (
      <g transform={`scale(${1 - open * 1.2} 1)`}>
        <Box cx={0} cy={0} w={240} h={320} rx={14} fill="#1E3A5F" stroke={GOLD} strokeWidth={6} />
        <rect x={-120} y={-160} width={34} height={320} rx={8} fill={GOLD} />
        {[0, 1, 2].map((k) => <rect key={k} x={118} y={-110 + k * 70} width={22} height={50} rx={6} fill={[RED, XL, GOLDL][k]} />)}
        <Box cx={16} cy={-60} w={150} h={70} rx={10} fill={PAPER} />
        <rect x={-40} y={-72} width={110} height={12} rx={6} fill={INK} opacity={0.7} />
        <rect x={-40} y={-52} width={70} height={10} rx={5} fill={INK} opacity={0.5} />
      </g>
    ) : (
      <g transform={`scale(${(open - 0.5) * 2} 1)`}>
        <Box cx={-125} cy={0} w={250} h={330} rx={12} fill={PAPER} stroke={GOLD} strokeWidth={5} />
        <Box cx={125} cy={0} w={250} h={330} rx={12} fill={PAPER} stroke={GOLD} strokeWidth={5} />
        <rect x={-6} y={-165} width={12} height={330} fill={GOLD} />
        {Array.from({ length: 4 }, (_, k) => (
          <G key={k} x={-210} y={-110 + k * 70} o={clamp01(steps - k)}>
            <circle r={20} fill={GOLD} />
            {Array.from({ length: k + 1 }, (_, d) => <circle key={d} cx={(d - k / 2) * 8} cy={0} r={3} fill={INK} />)}
            <rect x={34} y={-8} width={110} height={16} rx={8} fill={HOV} />
            <Box cx={170} cy={0} w={30} h={30} rx={6} fill="none" stroke={k < ticks ? XL : SEC} strokeWidth={4} />
            {k < ticks && <path d="M158 0 L167 9 L183 -9" fill="none" stroke={XL} strokeWidth={6} strokeLinecap="round" />}
          </G>
        ))}
        {Array.from({ length: 3 }, (_, k) => (
          <G key={k} x={60} y={-90 + k * 90} o={clamp01(cam * 3 - k)}>
            <circle r={24} fill={RED} />
            <rect x={-15} y={-5} width={30} height={10} rx={3} fill={TXT} />
            <rect x={38} y={-8} width={100} height={16} rx={8} fill={HOV} />
          </G>
        ))}
      </g>
    )}
  </G>
);

/** Thanh ba bước trên đỉnh khung: at là bước đang sáng (0..2), done là số bước đã xong. */
export const Stepper: React.FC<{ at: number; done?: number; w?: number }> = ({ at, done = 0, w = 640 }) => (
  <g>
    <line x1={-w / 2} x2={w / 2} y1={0} y2={0} stroke={HOV} strokeWidth={10} strokeLinecap="round" />
    <line x1={-w / 2} x2={-w / 2 + (w * Math.min(at, 2)) / 2} y1={0} y2={0} stroke={GOLD} strokeWidth={10} strokeLinecap="round" />
    {[0, 1, 2].map((k) => {
      const on = k === at;
      const ok = k < done;
      return (
        <G key={k} x={-w / 2 + (k * w) / 2} s={on ? 1.15 : 0.9}>
          <circle r={46} fill={ok ? XL : on ? GOLD : EL} stroke={on ? GOLDL : HOV} strokeWidth={6} />
          {ok ? (
            <path d="M-18 0 L-5 13 L20 -14" fill="none" stroke={INK} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            Array.from({ length: k + 1 }, (_, d) => <circle key={d} cx={(d - k / 2) * 18} cy={0} r={7} fill={on ? INK : SEC} />)
          )}
        </G>
      );
    })}
  </g>
);

/** Bảng tính: cols cột, rows dòng; merge là độ hai cột 2 và 3 nhập vào nhau; miss là dòng thiếu chứng từ (-1 là không). */
export const Sheet: React.FC<{ w?: number; h?: number; cols?: number; rows?: number; merge?: number; miss?: number; shine?: number; cid?: string }> = ({ w = 640, h = 420, cols = 4, rows = 7, merge = 0, miss = -1, shine = 0, cid = "b5-sheet" }) => {
  const cw = (w - 40) / cols;
  const rh = (h - 90) / rows;
  return (
    <g>
      <Box cx={8} cy={12} w={w} h={h} rx={18} fill="#000" opacity={0.35} />
      <Box cx={0} cy={0} w={w} h={h} rx={18} fill={TXT} stroke={XL} strokeWidth={5} />
      <Box cx={0} cy={-h / 2 + 30} w={w} h={60} rx={18} fill={XL} />
      {Array.from({ length: cols }, (_, c) => {
        const shift = c === 1 ? merge * cw * 0.5 : c === 2 ? -merge * cw * 0.5 : 0;
        return (
          <g key={c} transform={`translate(${shift} 0)`}>
            <rect x={-w / 2 + 20 + c * cw + 10} y={-h / 2 + 22} width={cw - 30} height={14} rx={7} fill={INK} opacity={0.6} />
            {Array.from({ length: rows }, (_, r) => {
              const y = -h / 2 + 76 + r * rh;
              if (r === miss && c === cols - 1) return null;
              return <rect key={r} x={-w / 2 + 20 + c * cw + 10} y={y} width={(cw - 30) * (0.5 + ((r * 7 + c * 3) % 5) / 10)} height={rh * 0.4} rx={5} fill={c === 0 ? HOV : SEC} />;
            })}
          </g>
        );
      })}
      {Array.from({ length: rows - 1 }, (_, r) => <line key={r} x1={-w / 2 + 16} x2={w / 2 - 16} y1={-h / 2 + 76 + (r + 1) * rh - rh * 0.3} y2={-h / 2 + 76 + (r + 1) * rh - rh * 0.3} stroke={HOV} strokeWidth={2} opacity={0.4} />)}
      {shine > 0.01 && (
        <>
          <defs><clipPath id={cid}><rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} /></clipPath></defs>
          <path d={`M${-w / 2 + shine * (w + 200) - 200} ${-h / 2} l120 0 l-160 ${h} l-120 0 Z`} fill="#fff" opacity={0.35} clipPath={`url(#${cid})`} />
        </>
      )}
    </g>
  );
};

/** Viên kim cương. */
export const Gem: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <path d="M-60 -20 L-30 -56 H30 L60 -20 L0 60 Z" fill={GOLDL} stroke={GOLD} strokeWidth={5} strokeLinejoin="round" />
    <path d="M-60 -20 H60 M-30 -56 L-14 -20 L0 60 L14 -20 L30 -56" fill="none" stroke={GOLD} strokeWidth={4} />
  </G>
);

/** Trái cây treo cành; ripe 0 xanh, 1 chín vàng. */
export const Fruit: React.FC<{ s?: number; ripe?: number }> = ({ s = 1, ripe = 0 }) => {
  const c = interpolateColors(ripe, [0, 0.6, 1], ["#65A30D", "#CA8A04", "#F59E0B"]);
  return (
    <G s={s}>
      <path d="M0 -62 Q4 -86 18 -96" stroke="#78350F" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M6 -78 Q40 -100 56 -74 Q30 -64 6 -78 Z" fill={LEAF} />
      <path d="M0 -60 Q58 -66 60 4 Q58 64 0 66 Q-58 64 -60 4 Q-58 -66 0 -60 Z" fill={c} />
      <path d="M-30 -30 Q-38 -6 -30 16" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.35} />
    </G>
  );
};

/** Chuỗi mắt xích nằm ngang có mắt gãy ở giữa. */
export const Chain: React.FC<{ n?: number; broken?: number }> = ({ n = 5, broken = 2 }) => (
  <g>
    {Array.from({ length: n }, (_, k) => {
      const x = (k - (n - 1) / 2) * 92;
      return k === broken ? (
        <g key={k}>
          <path d={`M${x - 20} -30 A40 30 0 0 0 ${x - 20} 30`} fill="none" stroke={RED} strokeWidth={14} strokeLinecap="round" />
          <path d={`M${x + 20} -30 A40 30 0 0 1 ${x + 20} 30`} fill="none" stroke={RED} strokeWidth={14} strokeLinecap="round" />
        </g>
      ) : (
        <ellipse key={k} cx={x} cy={0} rx={56} ry={30} fill="none" stroke={k % 2 ? SEC : TXT} strokeWidth={14} />
      );
    })}
  </g>
);

/** Khối băng trong suốt bọc lấy thứ bên trong. */
export const IceBlock: React.FC<{ w: number; h: number; p?: number }> = ({ w, h, p = 1 }) => (
  <g opacity={clamp01(p * 1.5)}>
    <Box cx={0} cy={0} w={w} h={h * p} rx={24} fill={ICE} opacity={0.3} stroke={ICE} strokeWidth={6} />
    <path d={`M${-w / 2 + 30} ${-h * p / 2 + 30} L${-w / 2 + 90} ${-h * p / 2 + 30} M${-w / 2 + 30} ${-h * p / 2 + 30} L${-w / 2 + 30} ${-h * p / 2 + 80}`} stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={0.7} />
    <path d={`M${w / 2 - 60} ${h * p / 2 - 40} l30 -30 M${w / 2 - 120} ${h * p / 2 - 30} l50 -50`} stroke="#fff" strokeWidth={5} strokeLinecap="round" opacity={0.5} />
  </g>
);

/** Búi dây rối với hai bánh răng. */
export const Tangle: React.FC<{ s?: number; t?: number }> = ({ s = 1, t = 0 }) => (
  <G s={s}>
    {[0, 1].map((k) => (
      <G key={k} x={k ? 90 : -80} y={k ? 60 : -50} r={t * (k ? -3 : 2)}>
        {Array.from({ length: 8 }, (_, i) => <rect key={i} x={-12} y={-74} width={24} height={30} rx={4} fill={SEC} transform={`rotate(${i * 45})`} />)}
        <circle r={56} fill={SEC} />
        <circle r={20} fill={INK} />
      </G>
    ))}
    {[0, 1, 2, 3, 4].map((k) => (
      <path key={k} d={`M${-150 + k * 20} ${-40 + k * 18} C${-60 + k * 30} ${-160 + k * 40} ${80 - k * 20} ${150 - k * 30} ${150 - k * 10} ${-20 + k * 14} S${-40} ${120 - k * 30} ${-120 + k * 25} ${60 - k * 10}`} fill="none" stroke={[GOLD, RED, GOLDL, TXT, SEC][k]} strokeWidth={7} strokeLinecap="round" opacity={0.85} />
    ))}
  </G>
);

/** Băng chuyền ngang có n trạm; on là số trạm đã chạy qua. */
export const Conveyor: React.FC<{ w?: number; n?: number; on?: number; t?: number }> = ({ w = 820, n = 4, on = 0, t = 0 }) => (
  <g>
    <Box cx={0} cy={60} w={w} h={40} rx={20} fill={HOV} />
    {Array.from({ length: 14 }, (_, k) => {
      const x = -w / 2 + 20 + (((k * 60 + t * 6) % (w - 40)) + (w - 40)) % (w - 40);
      return <circle key={k} cx={x} cy={60} r={9} fill={SEC} />;
    })}
    {Array.from({ length: n }, (_, k) => {
      const x = -w / 2 + 90 + (k * (w - 180)) / (n - 1);
      const done = on > k;
      return (
        <G key={k} x={x}>
          <Box cx={0} cy={-10} w={130} h={110} rx={16} fill={EL} stroke={done ? XL : GOLD} strokeWidth={5} />
          <circle cx={-34} cy={-40} r={16} fill={GOLD} />
          {Array.from({ length: k + 1 }, (_, d) => <circle key={d} cx={-34 + (d - k / 2) * 7} cy={-40} r={2.6} fill={INK} />)}
          <Lines x={-44} y={-6} w={88} n={2} gap={22} color={SEC} t={9} />
          <G y={-98} s={clamp01((on - k) * 2)}>
            <circle r={26} fill={XL} />
            <path d="M-12 0 L-3 9 L14 -10" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" />
          </G>
        </G>
      );
    })}
  </g>
);

/** Dải lịch một tuần: bảy ô, ô hl có khối việc. */
export const Week: React.FC<{ w?: number; hl?: number; mark?: number; fill?: string }> = ({ w = 520, hl = 2, mark = 0, fill = GOLD }) => {
  const cw = (w - 30) / 7;
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={120} rx={14} fill={EL} stroke={HOV} strokeWidth={4} />
      <rect x={-w / 2} y={-60} width={w} height={26} rx={12} fill={HOV} />
      {Array.from({ length: 7 }, (_, k) => (
        <rect key={k} x={-w / 2 + 15 + k * cw + 3} y={-24} width={cw - 6} height={70} rx={8} fill={k === hl ? fill : SURF} />
      ))}
      {mark > 0.01 && <rect x={-w / 2 + 15 + hl * cw - 6} y={-34} width={cw + 12} height={90} rx={12} fill="none" stroke={GOLDL} strokeWidth={6} opacity={mark} />}
    </g>
  );
};

/** Lông vũ. */
export const Feather: React.FC<{ s?: number; r?: number }> = ({ s = 1, r = 0 }) => (
  <G s={s} r={r}>
    <path d="M0 90 Q-6 0 40 -90 Q70 -20 0 90 Z" fill={TXT} opacity={0.9} />
    <path d="M0 90 Q10 0 40 -90" fill="none" stroke={GOLD} strokeWidth={5} />
    {[-50, -20, 10, 40].map((y) => <path key={y} d={`M${12 - y * 0.25} ${y} l22 -16`} stroke={SEC} strokeWidth={3} />)}
  </G>
);

/** Quyển văn bản pháp luật có cán cân trên bìa. */
export const LawBook: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <Box cx={10} cy={10} w={220} h={290} rx={12} fill={PAPER} />
    <Box cx={0} cy={0} w={220} h={290} rx={12} fill="#7F1D1D" stroke={GOLD} strokeWidth={6} />
    <rect x={-110} y={-145} width={26} height={290} fill={GOLD} opacity={0.8} />
    <line x1={10} y1={-70} x2={10} y2={60} stroke={GOLDL} strokeWidth={8} />
    <line x1={-50} y1={-50} x2={70} y2={-50} stroke={GOLDL} strokeWidth={7} />
    {[-50, 70].map((x) => <path key={x} d={`M${x - 24} 0 Q${x} 26 ${x + 24} 0 Z M${x} -50 L${x - 22} 0 M${x} -50 L${x + 22} 0`} fill={GOLDL} stroke={GOLDL} strokeWidth={3} />)}
    <rect x={-20} y={60} width={60} height={12} rx={6} fill={GOLDL} />
  </G>
);

/** Cột đo sức mạnh có vạch kịch trần; v từ 0 đến 1. */
export const PowerBar: React.FC<{ h?: number; v?: number }> = ({ h = 360, v = 0 }) => (
  <g>
    <Box cx={0} cy={0} w={80} h={h} rx={18} fill={EL} stroke={HOV} strokeWidth={5} />
    <rect x={-28} y={h / 2 - 12 - (h - 24) * v} width={56} height={(h - 24) * v} rx={12} fill={interpolateColors(v, [0, 0.5, 1], [RED, GOLD, XL])} />
    {[0.25, 0.5, 0.75].map((k) => <line key={k} x1={-40} x2={-24} y1={h / 2 - h * k} y2={h / 2 - h * k} stroke={SEC} strokeWidth={4} />)}
    <path d={`M-20 ${-h / 2 - 34} L0 ${-h / 2 - 64} L20 ${-h / 2 - 34} Z`} fill={v > 0.95 ? GOLDL : HOV} />
  </g>
);

/** Núm vặn tông giọng. */
export const Dial: React.FC<{ s?: number; a?: number }> = ({ s = 1, a = 0 }) => (
  <G s={s}>
    <circle r={56} fill={EL} stroke={GOLD} strokeWidth={6} />
    {Array.from({ length: 7 }, (_, k) => <line key={k} y1={-66} y2={-80} stroke={SEC} strokeWidth={5} transform={`rotate(${-90 + k * 30})`} />)}
    <G r={a}>
      <circle r={36} fill={HOV} />
      <rect x={-5} y={-34} width={10} height={26} rx={5} fill={GOLDL} />
    </G>
  </G>
);

/** Mặt người ngáp. */
export const Yawn: React.FC<{ s?: number; t?: number }> = ({ s = 1, t = 0 }) => (
  <G s={s}>
    <circle r={70} fill={GOLDL} />
    <path d="M-40 -14 Q-28 -4 -16 -14 M16 -14 Q28 -4 40 -14" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" />
    <ellipse cx={0} cy={30} rx={18} ry={14 + 12 * t} fill={INK} />
    <path d="M70 -40 q14 -10 22 0 M84 -64 q14 -10 22 0" fill="none" stroke={SEC} strokeWidth={5} strokeLinecap="round" opacity={t} />
  </G>
);

/** Con mắt xoáy hoa mắt. */
export const Dizzy: React.FC<{ r?: number; t?: number }> = ({ r = 14, t = 0 }) => (
  <g transform={`rotate(${t * 24})`}>
    <path d={`M0 0 m${r * 0.2} 0 a${r * 0.2} ${r * 0.2} 0 1 1 ${-r * 0.4} 0 a${r * 0.5} ${r * 0.5} 0 1 1 ${r} 0 a${r * 0.8} ${r * 0.8} 0 1 1 ${-r * 1.6} 0`} fill="none" stroke={GOLDL} strokeWidth={4} strokeLinecap="round" />
  </g>
);
