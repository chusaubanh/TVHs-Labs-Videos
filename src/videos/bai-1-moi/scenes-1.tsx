import React from "react";
import { AI, Box, Bubble, Cross, Doc, EL, Excel, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, Person, Question, RED, SEC, Spark, Stage, SURF, Sun, Tag, TXT, lerp, useT } from "../shared/art";
import { Calendar, Intern, NumChip, Win, clamp01 } from "../bai-1/art";

/** Xung nảy 0..1..0 trong d khung kể từ khung fr. */
const hit = (f: number, fr: number, d = 9): number => Math.sin(clamp01((f - fr) / d) * Math.PI);
/** Phần lẻ, để lặp chuyển động liên tục mà vẫn là hàm thuần của khung. */
const fract = (v: number): number => v - Math.floor(v);

/** Mặt sàn tự vẽ, nằm gọn trong lề 80..1000. */
const Ground: React.FC = () => (
  <g>
    <rect x={90} y={1250} width={900} height={32} rx={10} fill={HOV} opacity={0.35} />
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={120 + i * 170} y={1262} width={110} height={8} rx={4} fill={HOV} />)}
  </g>
);

/** Chip số; nứt thì viền đỏ và có vết nứt (đỏ = số sai). */
const CrackChip: React.FC<{ crack?: boolean }> = ({ crack = false }) => (
  <g>
    <NumChip />
    {crack && (
      <g>
        <Box cx={0} cy={0} w={120} h={64} rx={16} fill="none" stroke={RED} strokeWidth={6} />
        <path d="M-10 -32 L4 -8 L-8 8 L6 32" fill="none" stroke={RED} strokeWidth={5} strokeLinecap="round" />
      </g>
    )}
  </g>
);

/** Ô bảng: hai vạch giả số; ink là màu vạch. */
const Cell: React.FC<{ w: number; h: number; fill?: string; ink?: string }> = ({ w, h, fill = TXT, ink = INK }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={12} fill={fill} />
    <rect x={-w * 0.34} y={-h * 0.14} width={w * 0.26} height={h * 0.28} rx={6} fill={ink} />
    <rect x={-w * 0.02} y={-h * 0.14} width={w * 0.36} height={h * 0.28} rx={6} fill={ink} />
  </g>
);

/** Bong bóng prompt chung của hook (cảnh 1) và cảnh giao việc (cảnh 15). Vẽ quanh gốc (0,0): hình chữ nhật vàng 600x170 và đuôi; đặt bằng <G x={540} y={560}>. Nhãn chữ do cảnh gọi tự đặt bằng Tag trong overlay, xem HOOK_BUBBLE. */
export const HookPromptBubble: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={600} h={170} rx={40} fill={GOLD} />
    <path d="M-270 81 L-294 119 L-216 81 Z" fill={GOLD} />
  </g>
);
/** Toạ độ chung: tâm bong bóng (540,560); tag1 và tag2 là hai dòng chữ cỡ 38 solid màu GOLD (cùng màu bong bóng nên chỉ thấy chữ); cảnh có ba mảnh thì dòng 1 chứa hai Tag cạnh nhau ở y 528. */
export const HOOK_BUBBLE = { x: 540, y: 560, tag1: { x: 540, y: 528, size: 38 }, tag2: { x: 540, y: 592, size: 38 } };
/** Hàng 5 chip số đứng thẳng, vẽ quanh gốc (0,0); đặt bằng <G x={540} y={820}>. Chip k ở x = -240 + 120k, scale 0.85. glow[k] 0..1 là độ sáng viền vàng của chip k. */
export const HookChipRow: React.FC<{ glow?: number[] }> = ({ glow = [] }) => (
  <g>
    {[0, 1, 2, 3, 4].map((k) => (
      <G key={k} x={-240 + 120 * k} y={0} s={0.85}>
        <NumChip />
        {(glow[k] ?? 0) > 0.01 && <Box cx={0} cy={0} w={132} h={76} rx={20} fill="none" stroke={GOLDL} strokeWidth={6} opacity={glow[k]} />}
      </G>
    ))}
  </g>
);

/** Tờ bảng trung tính: nền giấy, dải tiêu đề vàng, lưới xám, không dấu X. */
const SheetTable: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={150} h={190} rx={14} fill={PAPER} />
    <Box cx={0} cy={-68} w={150} h={54} rx={14} fill={GOLDL} />
    {[-22, 6, 34, 62].map((y) => <line key={y} x1={-58} x2={58} y1={y} y2={y} stroke={SEC} strokeWidth={4} />)}
    {[-20, 20].map((x) => <line key={x} x1={x} x2={x} y1={-22} y2={62} stroke={SEC} strokeWidth={4} />)}
  </g>
);

/** Cảnh 1 — Cuộn prompt tuột dài cạnh khung chat, chip số lắc, chip nứt; rồi cuộn co thành một bong bóng, chip nứt rụng, hàng chip đứng thẳng. */
export const HookPromptDaiBiaSo: React.FC = () => {
  const { f, at, p, l } = useT();
  const grow = l(0, 0, 66);
  const m = l(1, 0, 20);
  const row = l(1, 0.12, 28);
  const calm = l(1, 0, 8);
  const bottom = lerp(340, 1230, grow);
  const x0 = lerp(420, 240, m);
  const x1 = lerp(660, 840, m);
  const y0 = lerp(330, 475, m);
  const y1 = lerp(bottom, 645, m);
  const linesO = 1 - clamp01(m * 3);
  const lineYs = Array.from({ length: 24 }, (_, k) => 375 + k * 40).filter((y) => y < bottom - 20);
  const chips = [0, 1, 2, 3, 4, 5, 6].map((k) => {
    const crack = k === 1 || k === 4;
    const j = [0, -1, 1, 2, -1, 3, 4][k];
    const cy0 = 330 + k * 88;
    const born = p(0, 0.04 + k * 0.07);
    if (crack) {
      const d = clamp01((f - at(1, 0.1 + (k === 1 ? 0 : 0.08))) / 26);
      return { k, crack, x: 950 - 30 * d, y: Math.min(1190, cy0 + 900 * d * d), s: 0.75 * born, r: Math.sin(f / 3 + k * 1.7) * 9 * (1 - calm) + 25 * d, o: 1 - clamp01((d - 0.85) / 0.15) };
    }
    return { k, crack, x: lerp(950, 300 + 120 * j, row), y: lerp(cy0, 820, row) - Math.sin(row * Math.PI) * 50, s: lerp(0.75, 0.85, row) * born, r: Math.sin(f / 3 + k * 1.7) * 9 * (1 - calm), o: 1 };
  });
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={235} p={p(0, 0.02)} solid color={GOLDL} size={46} />
      <Tag i={1} x={HOOK_BUBBLE.tag1.x} y={HOOK_BUBBLE.tag1.y} p={p(1, 0.35)} solid color={GOLD} size={HOOK_BUBBLE.tag1.size} />
      <Tag i={2} x={HOOK_BUBBLE.tag2.x} y={HOOK_BUBBLE.tag2.y} p={p(1, 0.42)} solid color={GOLD} size={HOOK_BUBBLE.tag2.size} />
    </>}>
      <Box cx={540} cy={1200} w={860} h={34} rx={14} fill={GOLD} opacity={p(0, 0.1)} />
      <G x={180} y={1105} s={p(0, 0.3) * 0.9} r={-6}><Doc w={150} h={200} n={4} fill={PAPER} /></G>
      <G x={900} y={1095} s={p(0, 0.35) * 0.9} r={7}><Doc w={150} h={200} n={4} fill={PAPER} /></G>
      <G x={540} y={1045} s={p(1, 0.55) * 1.25}><SheetTable /></G>
      {/* Khung chat AI ở giữa mặt bàn, lộ ra hai bên cuộn giấy. */}
      <G x={540} y={560} s={p(0, 0)}>
        <Win w={700} h={400} stroke={GOLD}>
          <Lines x={-320} y={-100} w={170} n={3} gap={36} color={HOV} t={12} />
          <Lines x={150} y={-100} w={170} n={3} gap={36} color={HOV} t={12} />
          <Box cx={0} cy={160} w={620} h={50} rx={25} fill={SURF} stroke={HOV} strokeWidth={4} />
          <G x={-270} y={160}><Spark r={18} fill={GOLD} /></G>
        </Win>
      </G>
      <rect x={x0 - 10} y={y0 - 8} width={x1 - x0 + 20} height={18} rx={9} fill={GOLDL} opacity={linesO} />
      <rect x={x0} y={y0} width={x1 - x0} height={Math.max(4, y1 - y0)} rx={lerp(14, 40, m)} fill={PAPER} />
      <rect x={x0} y={y0} width={x1 - x0} height={Math.max(4, y1 - y0)} rx={lerp(14, 40, m)} fill={GOLD} opacity={m} />
      <path d={`M${x0 + 30} ${y1 - 4} L${x0 + 6} ${y1 + 34} L${x0 + 84} ${y1 - 4} Z`} fill={GOLD} opacity={m} />
      {lineYs.map((y, k) => (
        <rect key={k} x={x0 + 30} y={y} width={(x1 - x0 - 60) * (k % 3 === 2 ? 0.62 : k % 3 === 1 ? 0.84 : 1)} height={14} rx={7} fill={SEC} opacity={linesO} />
      ))}
      {chips.map((c) => (
        <G key={c.k} x={c.x} y={c.y} s={c.s} r={c.r} o={c.o}><CrackChip crack={c.crack} /></G>
      ))}
      <Ground />
    </Stage>
  );
};

/** Cảnh 2 — Bong bóng ngắn lắc như con lắc trong khung chat, dấu hỏi bật lên, chip nghiêng đầu; rồi cả hàng người giơ giấy dày lên màn AI; hai mẩu dán thành dải giấy dài sau hàng người. */
export const PhanXaDanKyHon: React.FC = () => {
  const { f, p, l } = useT();
  const m = l(1, 0, 20);
  const swing = Math.sin(f / 3.5) * 36 * (1 - l(0, 0, 30));
  const pend = 1 - l(1, 0, 8);
  const winY = lerp(670, 405, m);
  const winW = lerp(820, 720, m);
  const winH = lerp(480, 340, m);
  const c = [p(1, 0.22, 9), p(1, 0.5, 9), p(1, 0.78, 9)];
  const layers = 1 + c.filter((v) => v > 0.35).length;
  const tA = l(2, 0.05, 24);
  const tB = l(2, 0.3, 24);
  const ext = l(2, 0.58, 50);
  const stripBottom = lerp(790, 845, ext);
  const people = [0, 1, 2, 3, 4, 5];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={745} p={p(1, 0.1)} solid color={GOLDL} size={36} o={1 - l(2, 0, 8)} />
      <Tag i={1} x={190} y={655} p={p(2, 0.25)} solid color={GOLDL} size={34} />
      <Tag i={2} x={190} y={785} p={p(2, 0.5)} solid color={GOLDL} size={34} />
    </>}>
      <defs>
        <clipPath id="b1-p2-strip"><rect x={300} y={590} width={480} height={270} /></clipPath>
      </defs>
      {/* Dải giấy dài nằm sau hàng người, tràn mép dưới. */}
      <g clipPath="url(#b1-p2-strip)">
        {tB > 0.98 && <Box cx={540} cy={(600 + stripBottom) / 2} w={460} h={stripBottom - 600} rx={14} fill={PAPER} />}
        {tB > 0.98 && Array.from({ length: 8 }, (_, k) => 625 + k * 40).filter((y) => y < stripBottom - 20).map((y, k) => (
          <rect key={k} x={340} y={y} width={380 * (k % 3 === 2 ? 0.62 : k % 3 === 1 ? 0.84 : 1)} height={14} rx={7} fill={SEC} />
        ))}
      </g>
      {tB > 0.98 && <rect x={310} y={704} width={460} height={32} rx={6} fill={GOLD} opacity={0.9} />}
      {tB <= 0.98 && tA > 0 && <Box cx={lerp(346, 540, tA)} cy={lerp(945, 655, tA)} w={lerp(96, 460, tA)} h={lerp(124, 110, tA)} rx={12} fill={PAPER} />}
      {tB <= 0.98 && tB > 0 && <Box cx={lerp(634, 540, tB)} cy={lerp(945, 785, tB)} w={lerp(96, 460, tB)} h={lerp(124, 110, tB)} rx={12} fill={PAPER} />}
      {tB <= 0.98 && tA >= 0.98 && <Lines x={340} y={625} w={380} n={2} gap={40} color={SEC} t={14} />}
      {/* Khung chat AI: lớn ở giữa, lên trên nhận dấu sai đỏ. */}
      <G x={540} y={winY} s={p(0, 0)}>
        <Win w={winW} h={winH} stroke={GOLD}>
          <Lines x={-winW / 2 + 40} y={-winH / 2 + 80} w={winW - 80} n={3} gap={44} color={HOV} t={14} />
          <Box cx={0} cy={winH / 2 - 50} w={winW - 80} h={50} rx={25} fill={SURF} stroke={HOV} strokeWidth={4} />
          <G x={-winW / 2 + 70} y={winH / 2 - 50}><Spark r={18} fill={GOLD} /></G>
          {[[-230, 20], [0, 50], [230, 10]].map(([cx, cy], k) => (
            <G key={k} x={cx} y={cy} s={c[k] * 0.55}><Cross r={50} /></G>
          ))}
        </Win>
      </G>
      <g opacity={pend}>
        <G x={540} y={winY - 150} r={swing}>
          <line x1={0} y1={0} x2={0} y2={80} stroke={GOLDL} strokeWidth={6} />
          <circle r={12} fill={GOLD} />
          <G y={150}><Bubble w={560} h={160} fill={GOLD} n={2} /></G>
        </G>
        <G x={540} y={315} s={p(0, 0.25) * 1.2}><Question /></G>
        {[0, 1, 2, 3, 4].map((k) => (
          <G key={k} x={260 + 140 * k} y={1040} s={p(0, 0.08 * k)} r={14 * p(0, 0.3) + Math.sin(f / 6 + k) * 4}><NumChip /></G>
        ))}
      </g>
      {people.map((k) => {
        const x = 180 + 144 * k;
        const own = k === 1 ? 1 - tA : k === 3 ? 1 - tB : 1;
        const show = p(1, 0.02 + 0.03 * k);
        return (
          <g key={k}>
            <G x={x} y={1130} s={0.8 * show}><Person fill={k % 2 ? TXT : SEC} /></G>
            <line x1={x + 22} y1={1112} x2={x + 22} y2={1010} stroke={k % 2 ? TXT : SEC} strokeWidth={14} strokeLinecap="round" opacity={show} />
            <g opacity={own * show}>
              {Array.from({ length: layers }, (_, i) => layers - 1 - i).map((i) => (
                <G key={i} x={x + 22 - i * 9} y={945 - i * 9}><Doc w={96} h={124} n={3} fill={i % 2 ? TXT : PAPER} /></G>
              ))}
            </g>
          </g>
        );
      })}
      <Ground />
    </Stage>
  );
};

/** Cảnh 3 — Bảng số bóng loáng, vầng sáng quét làm ô nứt rơi lệch; mặt trời qua cung, bút gạch dần dòng; lịch lật, bảng dựng lại y hệt. */
export const SoSaiMatBuoiChieu: React.FC = () => {
  const { f, at, p, l } = useT();
  const waxIdx = [2, 5, 10, 13, 16];
  const xs = lerp(-460, 460, l(0, 0.25, 50));
  const P = l(1, 0.2, 50);
  const sunT = l(1, 0, 60);
  const gone = l(2, 0, 8);
  const flip = l(2, 0.02, 24);
  const back = (k: number) => p(2, 0.45 + k * 0.022, 14);
  const white = hit(f, at(2, 0.08), 30);
  const sxp = (1 - sunT) ** 2 * 230 + 2 * (1 - sunT) * sunT * 540 + sunT ** 2 * 850;
  const syp = (1 - sunT) ** 2 * 400 + 2 * (1 - sunT) * sunT * 180 + sunT ** 2 * 400;
  const rows = [0, 1, 2, 3, 4];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={330} p={p(0, 0.15)} solid color={GOLDL} size={40} o={1 - l(1, 0, 8)} />
      <Tag i={1} x={Math.min(780, Math.max(300, sxp))} y={syp + 90} p={p(1, 0.4)} solid color={GOLDL} size={36} o={(1 - l(2, 0, 8))} />
      <Tag i={2} x={530} y={300} p={p(2, 0.3)} solid color={GOLDL} size={36} />
    </>}>
      <defs>
        <clipPath id="b1-p3-win"><rect x={-430} y={-270} width={860} height={540} /></clipPath>
      </defs>
      {/* Mặt trời đi cung từ trưa xuống chiều, nằm sau cửa sổ bảng. */}
      <path d="M230 400 Q540 180 850 400" fill="none" stroke={HOV} strokeWidth={4} strokeDasharray="4 18" strokeLinecap="round" opacity={p(1, 0) * (1 - l(2, 0, 8))} />
      <G x={sxp} y={syp} s={p(1, 0.02) * (1 - l(2, 0, 8))}>
        <Sun r={26} rot={f * 0.8} fill={sunT > 0.6 ? GOLD : GOLDL} />
      </G>
      {/* Bóng người ngồi bàn, bóng đổ dài ra theo mặt trời. */}
      <G x={170} y={1190} s={0.8 * p(0, 0.2)}><Person fill={SEC} /></G>
      {/* Cửa sổ chat AI chứa bảng kết quả. */}
      <G x={540} y={830} s={p(0, 0)}>
        <Win w={860} h={540} stroke={GOLD}>
          <rect x={-430} y={-214} width={860} height={484} fill={PAPER} opacity={white * 0.9} />
          <g clipPath="url(#b1-p3-win)">
            {Array.from({ length: 20 }, (_, i) => {
              const c = i % 4;
              const r = Math.floor(i / 4);
              const cx = -285 + 190 * c;
              const cy = -170 + 90 * r;
              const wax = waxIdx.includes(i);
              const cr = wax ? clamp01((xs - cx + 50) / 60) : 0;
              const dim = clamp01(P * 5 - r) * (1 - gone);
              const drop = cr * (1 - gone);
              const scale = p(0, 0.04 + c * 0.05 + r * 0.02) * ((1 - gone) + gone * back(i));
              return (
                <G key={i} x={cx + drop * (c % 2 ? 6 : -6)} y={cy + 20 * drop * drop} r={drop * (i % 2 ? 14 : -12)} s={scale}>
                  <g opacity={1 - dim * 0.55}>
                    <Cell w={176} h={76} fill={wax && cr < 0.3 ? GOLDL : TXT} />
                    {wax && cr < 0.3 && <ellipse cx={-38} cy={-24} rx={52} ry={9} fill={TXT} opacity={0.6} />}
                    {wax && cr >= 0.3 && (
                      <g>
                        <Box cx={0} cy={0} w={176} h={76} rx={12} fill="none" stroke={RED} strokeWidth={6} />
                        <path d="M-20 -38 L-4 -12 L-18 6 L0 38" fill="none" stroke={RED} strokeWidth={5} strokeLinecap="round" />
                      </g>
                    )}
                  </g>
                </G>
              );
            })}
            {/* Vầng sáng quét ngang bảng. */}
            <g transform={`translate(${xs} 0) skewX(-20)`} opacity={l(0, 0.2, 6) * (1 - l(1, 0, 6))}>
              <rect x={-45} y={-212} width={90} height={450} fill={GOLDL} opacity={0.35} />
            </g>
            {/* Bút gạch dần từng dòng, dòng nào chạm qua thì nhạt đi. */}
            {rows.map((r) => {
              const pr = clamp01(P * 5 - r) * (1 - gone);
              return pr > 0.01 ? <line key={r} x1={-370} y1={-170 + 90 * r} x2={-370 + 740 * pr} y2={-170 + 90 * r} stroke={SEC} strokeWidth={7} strokeLinecap="round" /> : null;
            })}
          </g>
          {P > 0.01 && gone < 0.5 && (
            <G x={-370 + 740 * clamp01(P * 5 - Math.min(4, Math.floor(P * 5)))} y={-170 + 90 * Math.min(4, Math.floor(P * 5))} r={35}>
              <g transform="translate(0 -48)">
                <rect x={-9} y={-90} width={18} height={110} rx={9} fill={GOLD} />
                <path d="M-9 20 L9 20 L0 48 Z" fill={TXT} />
              </g>
            </G>
          )}
        </Win>
      </G>
      {/* Tờ lịch lật sang trang mới. */}
      <G x={230} y={300} s={p(2, 0) * 1.1}><Calendar flip={flip} /></G>
      <Ground />
    </Stage>
  );
};

/** Văn phòng nhỏ: bàn, màn hình, đèn, ghế. Toạ độ nội bộ; cả nhóm được phóng 1.15 quanh (540,1220). */
const Office: React.FC<{ lamp: number; f: number }> = ({ lamp, f }) => (
  <g>
    <rect x={290} y={828} width={24} height={190} fill={HOV} />
    <rect x={886} y={828} width={24} height={190} fill={HOV} />
    <Box cx={600} cy={810} w={680} h={36} rx={14} fill={GOLD} />
    <Box cx={540} cy={560} w={470} h={300} rx={22} fill={EL} stroke={GOLD} strokeWidth={6} />
    <Box cx={540} cy={730} w={60} h={40} fill={HOV} />
    <Box cx={540} cy={760} w={200} h={16} rx={8} fill={HOV} />
    {/* Đèn bàn bật sáng. */}
    <path d="M880 792 L880 750" stroke={SEC} strokeWidth={8} strokeLinecap="round" />
    <path d="M845 728 L915 728 L935 760 L825 760 Z" fill={SEC} />
    <path d="M840 766 L920 766 L1000 810 L760 810 Z" fill={GOLDL} opacity={0.2 * lamp * (0.9 + 0.1 * Math.sin(f / 9))} />
    <Box cx={880} cy={796} w={70} h={12} rx={6} fill={HOV} />
    {/* Ghế trước bàn. */}
    <Box cx={540} cy={970} w={180} h={150} rx={26} fill={EL} stroke={HOV} strokeWidth={5} />
    <Box cx={540} cy={1060} w={230} h={34} rx={17} fill={HOV} />
    <line x1={540} y1={1078} x2={540} y2={1180} stroke={HOV} strokeWidth={10} />
    <Box cx={540} cy={1190} w={260} h={14} rx={7} fill={HOV} />
  </g>
);

/** Con xúc xắc: ô vuông bo, ba chấm. */
const Dice: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={50} h={50} rx={10} fill={TXT} stroke={GOLD} strokeWidth={4} />
    {[[-12, -12], [0, 0], [12, 12]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} fill={INK} />)}
  </g>
);

/** Cảnh 4 — Văn phòng nhỏ; bạn thực tập sinh vào ngồi, sao vàng quanh đầu; ghi chú tuột khỏi đầu bay về ánh sáng; hai bong bóng nổi từ đầu, hình mờ thành dấu hỏi; tờ giao việc có ô trống bị điền bừa. */
export const TuyenThucTapSinh: React.FC = () => {
  const { f, at, p, l } = useT();
  const z = lerp(2.6, 1, l(0, 0, 36));
  const lamp = l(0, 0.35, 10);
  const enter = l(1, 0, 24);
  const ix = lerp(1250, 540, enter);
  const iy = 985 - (enter < 1 ? Math.abs(Math.sin(f / 3)) * 14 * (1 - enter) : 0);
  const stars = l(1, 0.55, 8) * (1 - l(2, 0.2, 10));
  const hollow = l(2, 0.45, 20);
  const rise = l(2, 0, 70);
  const q = l(3, 0.35, 16);
  const defl = l(3, 0.72, 16);
  const bub = 1 - l(4, 0, 10);
  const push = l(4, 0, 20);
  const withdraw = l(4, 0.25, 14);
  const sheetX = lerp(1100, 790, push);
  const toss = (a: number, b: number) => clamp01((f - at(4, a)) / ((at(4, b) - at(4, a)) || 1));
  const t1 = toss(0.25, 0.45);
  const t2 = toss(0.55, 0.75);
  const s1 = l(4, 0.45, 12);
  const s2 = l(4, 0.75, 12);
  const dice = (t: number, ty: number) => ({ x: lerp(620, sheetX + 40, t), y: lerp(950, ty, t) - Math.sin(t * Math.PI) * 70, r: t * 540 });
  const d1 = dice(t1, 985);
  const d2 = dice(t2, 1055);
  const noteOn = f >= at(2, 0) ? 1 - l(3, 0, 8) : 0;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={790} y={905} p={p(1, 0.5)} solid color={GOLDL} size={34} o={1 - l(2, 0, 8)} />
      <Tag i={1} x={790} y={905} p={p(2, 0.15)} solid color={GOLDL} size={34} o={1 - l(3, 0, 8)} />
      <Tag i={2} x={160} y={990} p={p(3, 0.15)} solid color={GOLDL} size={30} o={bub} />
      <Tag i={3} x={790} y={990} p={p(3, 0.28)} solid color={GOLDL} size={30} o={bub} />
      <Tag i={4} x={790} y={1140} p={p(4, 0.2)} solid color={RED} size={34} />
    </>}>
      <defs>
        <clipPath id="b1-p4-win"><rect x={840} y={210} width={160} height={210} rx={16} /></clipPath>
      </defs>
      {/* Cửa sổ trên tường: mặt trời mọc dần. */}
      <G s={p(2, 0)} x={920} y={315}>
        <g transform="translate(-920 -315)">
          <Box cx={920} cy={315} w={160} h={210} rx={16} fill={SURF} stroke={GOLD} strokeWidth={6} />
          <g clipPath="url(#b1-p4-win)">
            <rect x={840} y={210} width={160} height={210} fill={GOLDL} opacity={0.12 + 0.28 * rise} />
            <G x={920} y={lerp(440, 330, rise)}><Sun r={30} rot={f * 0.6} fill={GOLDL} /></G>
          </g>
          <line x1={920} x2={920} y1={210} y2={420} stroke={GOLD} strokeWidth={5} />
          <line x1={840} x2={1000} y1={315} y2={315} stroke={GOLD} strokeWidth={5} />
        </g>
      </G>
      <G x={540} y={1220} s={1.15}>
        <g transform="translate(-540 -1220)">
          <G x={540} y={560} s={z}>
            <g transform="translate(-540 -560)">
              <Office lamp={lamp} f={f} />
              <G x={540} y={560}>
                <G x={-90} y={0}>
                  <Win w={250} h={190} stroke={GOLD}>
                    <Lines x={-100} y={-20} w={200} n={3} gap={30} color={HOV} t={10} />
                  </Win>
                </G>
                {[0, 1, 2].map((k) => <G key={k} x={150} y={-60 + 60 * k} s={0.42}><CrackChip crack={k === 1} /></G>)}
              </G>
              {enter > 0 && (
                <g>
                  <G x={ix} y={iy} s={1.25}><Intern /></G>
                  {hollow > 0.01 && <circle cx={ix} cy={iy - 92.5} r={46} fill={SURF} stroke={SEC} strokeWidth={5} strokeDasharray="10 8" opacity={hollow} />}
                  {[0, 1, 2, 3, 4, 5].map((k) => {
                    const a = f / 18 + k * (Math.PI / 3);
                    return <G key={k} x={ix + Math.cos(a) * 110} y={iy - 92 + Math.sin(a) * 55} s={stars}><Spark r={26} fill={GOLD} /></G>;
                  })}
                </g>
              )}
            </g>
          </G>
        </g>
      </G>
      {/* Ghi chú của hôm qua tuột ra khỏi đầu, bay liên tục về cửa sổ. */}
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const u = (((f - at(2, 0)) / 48 + k / 6) % 1 + 1) % 1;
        return noteOn > 0 ? (
          <G key={k} x={lerp(540, 920, u) + Math.sin(k * 2) * 30 * (1 - u)} y={lerp(840, 330, u) - Math.sin(u * Math.PI) * 100} r={u * 160 * (k % 2 ? 1 : -1)} s={lerp(1, 0.5, u)} o={noteOn * (1 - clamp01((u - 0.75) / 0.25))}>
            <Doc w={56} h={70} n={2} fill={PAPER} />
          </G>
        ) : null;
      })}
      {/* Hai bong bóng suy nghĩ nổi từ đầu: toà nhà công ty và khung lời dặn, mờ thành dấu hỏi rồi xẹp. */}
      {[0, 1].map((k) => {
        const cx = k === 0 ? 160 : 790;
        const sc = p(3, 0.02 + 0.08 * k) * bub;
        return (
          <g key={k} opacity={bub}>
            {[0, 1, 2].map((i) => (
              <G key={i} x={lerp(cx, 540, [0.55, 0.7, 0.85][i])} y={lerp(880, 843, [0.55, 0.7, 0.85][i])} s={sc}><circle r={15 - i * 3.5} fill={TXT} /></G>
            ))}
            <G x={cx} y={880} s={sc * (1 - 0.2 * defl) * 0.66}>
              <circle r={100} fill={TXT} />
              <g opacity={1 - q}>
                {k === 0 ? (
                  <g>
                    <Box cx={0} cy={0} w={90} h={120} rx={8} fill={SEC} />
                    {[0, 1, 2].map((r) => [0, 1].map((c) => <rect key={`${r}${c}`} x={-30 + c * 36} y={-44 + r * 30} width={22} height={18} rx={4} fill={c ? GOLD : HOV} />))}
                  </g>
                ) : (
                  <Bubble w={130} h={90} fill={SEC} ink={TXT} n={2} />
                )}
              </g>
              <G s={0.8} o={q}><Question color={INK} /></G>
            </G>
          </g>
        );
      })}
      {/* Tờ giao việc có ô trống; bàn tay đẩy sang; xúc xắc và nét điền bừa. */}
      {push > 0.01 && (
        <G x={sheetX} y={975}>
          <Box cx={0} cy={0} w={230} h={240} rx={16} fill={PAPER} />
          <rect x={-95} y={-104} width={190} height={12} rx={6} fill={INK} />
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <rect x={-95} y={-60 + r * 70 - 7} width={70} height={14} rx={7} fill={SEC} />
              <Box cx={40} cy={-60 + r * 70} w={100} h={40} rx={8} fill={r === 0 ? TXT : PAPER} stroke={r === 0 ? SEC : HOV} strokeWidth={4} strokeDasharray={r === 0 ? undefined : "10 8"} />
            </g>
          ))}
          <path d="M-3 10 L15 -4 L30 18 L48 -4 L64 18 L84 -2" fill="none" stroke={RED} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - s1} />
          <path d="M-3 80 L15 66 L30 88 L48 66 L64 88 L84 68" fill="none" stroke={RED} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - s2} />
        </G>
      )}
      {t1 > 0 && t1 < 1 && <G x={d1.x} y={d1.y} r={d1.r}><Dice /></G>}
      {t2 > 0 && t2 < 1 && <G x={d2.x} y={d2.y} r={d2.r}><Dice /></G>}
      {push > 0.01 && (
        <g transform={`translate(${withdraw * 300} 0)`}>
          <Box cx={sheetX + 115 + 40 + 150} cy={975} w={300} h={84} rx={10} fill="#252830" />
          <Box cx={sheetX + 115 + 40 + 6} cy={975} w={20} h={84} rx={6} fill={GOLD} />
          <Box cx={sheetX + 115 + 10} cy={975} w={90} h={70} rx={28} fill={TXT} stroke={GOLD} strokeWidth={6} />
        </g>
      )}
      <Ground />
    </Stage>
  );
};

/** Cảnh 5 — Hình bóng thực tập sinh và khung chat cùng dáng trùng khít; dải cửa sổ chat mới mỗi sáng; cửa sổ mới nhất phóng to, bảng có ô trống, chip lạ nảy ra. */
export const AiLaThucTapSinh: React.FC = () => {
  const { f, at, p, l } = useT();
  const S = 4.4;
  const fadeBody = l(0, 0, 26);
  const slide = l(0, 0.2, 40);
  const flash = hit(f, at(0, 0.8), 16);
  const big = 1 - l(1, 0, 10);
  const fall = 1 - l(2, 0, 10);
  const z2 = l(2, 0, 22);
  const arr = [0, 1, 2].map((k) => l(1, 0.05 + 0.28 * k, 18));
  const body = "M-62 44 Q-62 -28 0 -28 Q62 -28 62 44 Z";
  const cells = Array.from({ length: 9 }, (_, i) => ({ i, c: i % 3, r: Math.floor(i / 3) }));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={315} p={p(0, 0.75)} solid color={GOLDL} size={38} o={big} />
      <Tag i={1} x={540} y={400} p={p(1, 0.15)} solid color={GOLDL} size={36} o={fall} />
      <Tag i={2} x={540} y={548} p={p(2, 0.5)} solid color={RED} size={36} />
    </>}>
      {/* Câu một: hình bóng người mờ thành nét viền, khung chat AI cùng dáng trượt khớp vào. */}
      <g opacity={big}>
        <G x={540 + (1 - slide) * 700} y={765}>
          <Win w={590} h={770} stroke={GOLD} />
          <Box cx={0} cy={0} w={606} h={786} rx={30} fill="none" stroke={GOLDL} strokeWidth={8} opacity={flash} />
        </G>
        <G x={540} y={940} s={S} o={1 - fadeBody}><Intern /></G>
        <G x={540} y={940} s={S}>
          <circle cy={-74} r={36} fill={HOV} fillOpacity={0.3} stroke={GOLDL} strokeWidth={2.4} strokeDasharray="6 5" />
          <path d={body} fill={HOV} fillOpacity={0.3} stroke={GOLDL} strokeWidth={2.4} strokeDasharray="6 5" />
        </G>
      </g>
      {/* Câu hai: dải cửa sổ chat mới, mỗi cái một mặt trời mọc, chồng ghi chú nằm lại bên trái. */}
      <Box cx={540} cy={1040} w={960} h={36} rx={12} fill={HOV} opacity={0.5 * fall * l(1, 0, 6)} />
      {Array.from({ length: 12 }, (_, i) => <rect key={i} x={90 + ((i * 75 - f * 4) % 900 + 900) % 900} y={1034} width={44} height={12} rx={6} fill={SEC} opacity={0.7 * fall * l(1, 0, 6)} />)}
      {[0, 1].map((k) => (
        <G key={k} x={372 + 335 * k} y={790} s={p(1, 0.28 + 0.25 * k) * fall}>
          {[0, 1, 2].map((i) => <G key={i} x={i * 8} y={-i * 8} r={(i - 1) * 5}><Doc w={64} h={84} n={3} fill={PAPER} /></G>)}
        </G>
      ))}
      {[0, 1, 2].map((k) => {
        const wx = k === 2 ? lerp(lerp(1250, 875, arr[2]), 540, z2) : lerp(lerp(1250, 205 + 335 * k, arr[k]), k ? 400 : 200, z2);
        const wy = k === 2 ? lerp(800, 810, z2) : lerp(800, 320, z2);
        const ws = k === 2 ? 1 : lerp(1, 0.5, z2);
        const sunY = lerp(640, 520, l(1, 0.15 + 0.28 * k, 24));
        const sx = k === 2 ? lerp(875, 860, z2) : wx;
        const sy = k === 2 ? lerp(sunY, 310, z2) : sunY;
        const sunO = k === 2 ? 1 : 1 - z2;
        return (
          <g key={k}>
            {arr[k] > 0.02 && <G x={sx} y={sy} o={sunO} s={0.9}><Sun r={30} rot={f * 0.6} fill={GOLDL} /></G>}
            {arr[k] > 0.02 && (
              <G x={wx} y={wy} s={ws}>
                <Win w={k === 2 ? lerp(230, 900, z2) : 230} h={k === 2 ? lerp(360, 720, z2) : 360} stroke={GOLD}>
                  {k < 2 && <Lines x={-90} y={-60} w={180} n={4} gap={40} color={k ? SEC : HOV} t={12} />}
                  {k === 2 && z2 < 0.5 && <Box cx={0} cy={130} w={190} h={34} rx={17} fill={SURF} stroke={HOV} strokeWidth={3} />}
                  {k === 2 && z2 >= 0.5 && cells.map(({ i, c, r }) => (
                    <G key={i} x={-270 + 270 * c} y={-150 + 170 * r} s={p(2, 0.15 + 0.02 * i)}>
                      {i === 1 ? (
                        <Box cx={0} cy={0} w={240} h={140} rx={14} fill="none" stroke={GOLDL} strokeWidth={5} strokeDasharray="10 8" opacity={0.4 + 0.6 * Math.abs(Math.sin(f / 5)) * (1 - l(2, 0.55, 6))} />
                      ) : (
                        <Cell w={240} h={140} />
                      )}
                    </G>
                  ))}
                  {k === 2 && z2 >= 0.5 && (
                    <G x={0} y={-150} s={p(2, 0.55) * 1.7} r={Math.sin(f / 5) * 3 * l(2, 0.55, 6)}>
                      <CrackChip crack />
                    </G>
                  )}
                </Win>
              </G>
            )}
          </g>
        );
      })}
      <Ground />
    </Stage>
  );
};

/** Cảnh 6 — Khối AI lớn nhận mưa dấu hỏi từ trên và hai bên, bật bong bóng đáp; chất bóng chảy lấp ô hổng khác màu; cuộn prompt dài mọc chấm khuyết nối tới dấu sai. */
export const LuonCoTraLoi: React.FC = () => {
  const { f, p, l } = useT();
  const m = l(1, 0, 18);
  const fade1 = 1 - l(1, 0, 8);
  const fade2 = 1 - l(2, 0, 10);
  const blob = l(1, 0.25, 30);
  const grow = l(2, 0.02, 40);
  const bottom = lerp(240, 1230, grow);
  const drift = (f * 0.6) % 40;
  const ai = { x: lerp(540, 230, m), y: lerp(700, 470, m), s: lerp(4, 1.3, m) };
  const start = [[300, 215], [110, 330], [540, 215], [780, 215], [970, 330], [420, 215]];
  const end = [[540, 470], [300, 640], [540, 470], [540, 470], [780, 640], [540, 470]];
  const tg = [[150, 480], [150, 720], [150, 960], [930, 480], [930, 720], [930, 960]];
  const holeY = [340, 490, 640, 790, 940, 1090];
  const holeX = [230, 340, 250, 400, 290, 370];
  const lineH = Array.from({ length: 27 }, (_, k) => k * 40);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={1035} p={p(0, 0.15)} solid color={GOLDL} size={40} o={fade1} />
      <Tag i={1} x={825} y={600} p={p(1, 0.1)} solid color={GOLDL} size={34} o={fade2} />
      <Tag i={2} x={520} y={405} p={p(1, 0.5)} solid color={GOLDL} size={34} o={fade2} />
      <Tag i={3} x={700} y={262} p={p(2, 0.3)} solid color={RED} size={36} />
    </>}>
      <defs>
        <clipPath id="b1-p6-scroll"><rect x={140} y={240} width={400} height={990} /></clipPath>
      </defs>
      {/* Khối AI lớn; sang câu hai thu về góc trái. */}
      <G x={ai.x} y={ai.y} s={p(0, 0) * ai.s * fade2}><AI size={130} /></G>
      {/* Câu một: mưa dấu hỏi từ trên và hai bên, mỗi dấu hỏi có một bong bóng đáp bật ra ngoài khối AI. */}
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const u = fract(f / 48 + k / 6);
        const tq = clamp01(u / 0.5);
        const tb = clamp01((u - 0.5) / 0.5);
        const e = 1 - (1 - tb) * (1 - tb);
        return (
          <g key={k} opacity={fade1}>
            {u < 0.5 && <G x={lerp(start[k][0], end[k][0], tq * tq)} y={lerp(start[k][1], end[k][1], tq * tq)} s={0.55}><Question /></G>}
            {u >= 0.5 && <G x={lerp(540, tg[k][0], e)} y={lerp(700, tg[k][1], e)} s={0.35 + 0.45 * e} o={1 - clamp01((tb - 0.85) / 0.15)}><Bubble w={150} h={80} fill={TXT} ink={SEC} n={2} /></G>}
          </g>
        );
      })}
      {/* Câu hai: bảng có ô hổng, chất mềm bóng chảy từ AI lấp vào, khác màu bảng. */}
      <g opacity={fade2}>
        <G x={540} y={860} s={p(1, 0.05)}>
          {Array.from({ length: 12 }, (_, i) => {
            const c = i % 4;
            const rr = Math.floor(i / 4);
            return i === 3 ? (
              <Box key={i} cx={-285 + 190 * c} cy={-130 + 130 * rr} w={176} h={104} rx={14} fill="none" stroke={GOLDL} strokeWidth={5} strokeDasharray="10 8" />
            ) : (
              <g key={i} transform={`translate(${-285 + 190 * c} ${-130 + 130 * rr})`}><Cell w={176} h={104} fill={HOV} ink={SEC} /></g>
            );
          })}
        </G>
        <path d="M300 500 Q560 380 700 640 Q780 760 825 730" fill="none" stroke={GOLDL} strokeWidth={46} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - blob} opacity={0.95} />
        <G x={825} y={730} s={clamp01(blob * 2 - 1)}>
          <Box cx={0} cy={0} w={176} h={104} rx={14} fill={GOLDL} stroke={GOLD} strokeWidth={5} />
          <ellipse cx={-30} cy={-26} rx={52} ry={10} fill={TXT} opacity={0.6} />
        </G>
      </g>
      {/* Câu ba: cuộn prompt dài mọc chấm khuyết, mỗi chấm kéo ra một đường mảnh tới dấu sai đỏ. */}
      <g opacity={l(2, 0, 6)}>
        <rect x={140} y={240} width={400} height={Math.max(4, bottom - 240)} rx={18} fill={PAPER} />
        <rect x={130} y={232} width={420} height={18} rx={9} fill={GOLDL} />
        <g clipPath="url(#b1-p6-scroll)">
          {lineH.map((o, k) => {
            const y = 290 + o - drift;
            return y < bottom - 20 && y > 262 ? <rect key={k} x={170} y={y} width={340 * (k % 3 === 2 ? 0.62 : k % 3 === 1 ? 0.84 : 1)} height={14} rx={7} fill={SEC} /> : null;
          })}
        </g>
        {holeY.map((y, k) => {
          const sc = p(2, 0.12 + 0.12 * k);
          const ln = l(2, 0.18 + 0.12 * k, 14);
          return (
            <g key={k}>
              <G x={holeX[k]} y={y} s={sc}><circle r={20} fill={INK} stroke={SEC} strokeWidth={5} /></G>
              <line x1={holeX[k] + 20} y1={y} x2={lerp(holeX[k] + 20, 665, ln)} y2={y} stroke={SEC} strokeWidth={4} />
              <G x={700} y={y} s={clamp01(ln * 2 - 1) * 0.6}><Cross r={50} /></G>
            </g>
          );
        })}
      </g>
      <Ground />
    </Stage>
  );
};
