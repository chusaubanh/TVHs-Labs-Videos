import React from "react";
import { AI, Box, BrandEnd, Bubble, Clock, EL, G, GOLD, GOLDL, HOV, INK, Lines, Mag, PAPER, Person, Question, RED, SEC, Stage, SURF, Tag, TXT, lerp, useT } from "../shared/art";
import { Boss } from "../bai-3/art";

const c01 = (v: number): number => Math.min(1, Math.max(0, v));
/** Xung 0..1..0 trong d khung kể từ khung fr. */
const hit = (f: number, fr: number, d = 9): number => Math.sin(c01((f - fr) / d) * Math.PI);
/** Điểm ở tỉ lệ t dọc đường gấp khúc. */
const along = (pts: number[][], t: number): { x: number; y: number } => {
  const segs = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]));
  let d = c01(t) * segs.reduce((a, b) => a + b, 0);
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i] || i === segs.length - 1) {
      const u = segs[i] === 0 ? 0 : Math.min(1, d / segs[i]);
      return { x: lerp(pts[i][0], pts[i + 1][0], u), y: lerp(pts[i][1], pts[i + 1][1], u) };
    }
    d -= segs[i];
  }
  return { x: pts[0][0], y: pts[0][1] };
};

/** AI chuẩn của bài: khối AI và cặp kính tròn vàng mảnh. */
const AIG: React.FC<{ size: number }> = ({ size }) => (
  <g>
    <AI size={size} />
    {[-1, 1].map((sd) => (
      <circle key={sd} cx={sd * size * 0.2} cy={-size * 0.04} r={size * 0.15} fill="none" stroke={GOLD} strokeWidth={Math.max(3, size * 0.025)} />
    ))}
  </g>
);

/** Tờ trình chuẩn 300x400 quanh (0,0): tiêu đề vàng, dòng xám, ô ký nét đứt. err gạch đỏ dưới dòng, ring khoanh vàng. */
const ToTrinh: React.FC<{ rows?: number; fill?: number; err?: number[]; ring?: number[]; bar?: string }> = ({ rows = 4, fill = 99, err = [], ring = [], bar = GOLD }) => {
  const gap = rows > 4 ? 44 : 50;
  const wd = [240, 200, 240, 150, 220, 180];
  return (
    <g>
      <Box cx={0} cy={0} w={300} h={400} rx={14} fill={PAPER} />
      <path d="M-150 -174 V-186 Q-150 -200 -136 -200 H136 Q150 -200 150 -186 V-174 Z" fill={bar} />
      {Array.from({ length: rows }, (_, i) => {
        const y = -140 + i * gap;
        const t = c01(fill - i);
        return (
          <g key={i}>
            <rect x={-120} y={y} width={Math.max(0.01, wd[i % 6] * t)} height={14} rx={7} fill={SEC} />
            {(err[i] ?? 0) > 0.01 && <rect x={-120} y={y + 18} width={wd[i % 6] * err[i]} height={6} rx={3} fill={RED} />}
            {(ring[i] ?? 0) > 0.01 && <rect x={-138} y={y - 14} width={276} height={42} rx={21} fill="none" stroke={GOLD} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring[i]} />}
          </g>
        );
      })}
      <rect x={20} y={112} width={104} height={58} rx={8} fill="none" stroke={SEC} strokeWidth={4} strokeDasharray="10 8" />
    </g>
  );
};

/** Mặt bàn vàng có chân; mặt bàn ở y 985. */
const DeskTop: React.FC = () => (
  <g>
    <Box cx={130} cy={1105} w={26} h={200} rx={6} fill={HOV} />
    <Box cx={950} cy={1105} w={26} h={200} rx={6} fill={HOV} />
    <Box cx={540} cy={1218} w={900} h={12} rx={6} fill={HOV} opacity={0.4} />
    <Box cx={540} cy={985} w={900} h={30} rx={12} fill={GOLD} />
  </g>
);

const Monitor: React.FC = () => (
  <g>
    <Box cx={540} cy={500} w={520} h={320} rx={22} fill={EL} stroke={GOLD} strokeWidth={6} />
    <Lines x={330} y={430} w={300} n={5} gap={44} color={HOV} t={14} />
    <Box cx={540} cy={676} w={60} h={40} fill={HOV} />
    <Box cx={540} cy={700} w={200} h={16} rx={8} fill={HOV} />
  </g>
);

const Cracks: React.FC<{ t: number; o?: number }> = ({ t, o = 1 }) => (
  <g opacity={o} fill="none" stroke={RED} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round">
    <path d="M250 1090 L330 1060 L400 1110 L480 1070 L560 1115 L650 1075 L740 1110 L830 1070" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - t} />
    <path d="M400 1110 L380 1170 M560 1115 L590 1180 M740 1110 L760 1165" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - c01(t * 1.4 - 0.3)} />
  </g>
);

/** Bàn làm việc dùng ở cảnh 1 và cảnh 18. Đầu bạn ở (200,854), AI ở (880,890). */
const Bench: React.FC<{ lx: number; ly: number; paper: React.ReactNode; extra?: React.ReactNode; aiGlow?: number }> = ({ lx, ly, paper, extra, aiGlow = 0.12 }) => (
  <g>
    <DeskTop />
    <Monitor />
    <G x={200} y={950} s={1.3}><Person /></G>
    <circle cx={880} cy={890} r={125} fill={GOLDL} opacity={aiGlow} />
    <G x={880} y={890}><AIG size={170} /></G>
    <line x1={810} y1={925} x2={lx + 78} y2={ly + 78} stroke={GOLD} strokeWidth={16} strokeLinecap="round" />
    {paper}
    <G x={lx} y={ly}><Mag s={1.1} /></G>
    {extra}
  </g>
);

/** Cảnh 1: bàn làm việc, kính lúp quét tờ trình, vết nứt ngầm; rồi kính lúp quay về bạn, đầu bạn mở nắp. */
export const HookLoiTrongDauBan: React.FC = () => {
  const { p, l } = useT();
  const sw = l(0, 0.04, 62);
  const turn = l(1, 0, 16);
  const lx = lerp(540 + 80 * Math.sin(sw * 9), 320, turn);
  const ly = lerp(lerp(700, 870, sw), 815, turn);
  const open = l(1, 0.1, 22);
  const link = l(1, 0.15, 24);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={262} p={p(0, 0.02)} solid color={GOLDL} size={46} o={1 - l(1, 0, 8)} />
      <Tag i={1} x={250} y={715} p={p(1, 0.3)} solid color={GOLDL} size={32} />
    </>}>
      <Bench
        lx={lx}
        ly={ly}
        paper={<G x={540} y={830} s={0.7 * p(0, 0)}><ToTrinh /></G>}
        aiGlow={0.12 + 0.1 * turn}
        extra={
          <g>
            <Cracks t={l(0, 0.25, 50)} />
            <path d="M250 1090 L205 1030 L220 960 L198 890" fill="none" stroke={RED} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - link} opacity={link > 0 ? 1 : 0} />
            <G x={200} y={854} o={open > 0 ? 1 : 0}>
              <circle r={47} fill={INK} stroke={TXT} strokeWidth={5} />
              <path d="M-4 -40 L12 -16 L-10 -2 L14 20 L0 40 M-30 -12 L-14 4 M16 -8 L32 8" fill="none" stroke={RED} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" opacity={link} />
              <g transform={`translate(47 0) rotate(${open * 100})`}><path d="M-94 0 A47 47 0 0 1 0 0 Z" fill={TXT} /></g>
            </G>
          </g>
        }
      />
    </Stage>
  );
};

/** Cảnh 2: cận cảnh bạn nhíu mày, mồ hôi; bạn thu về góc, hai dãy bàn văn phòng ngẩng đầu, bàn giữa sáng lên. */
export const TinhHuongVanPhong: React.FC = () => {
  const { f, p, l } = useT();
  const m = l(1, 0.02, 22);
  const sweat = l(0, 0.1, 50);
  const tr = Math.sin(f / 2.3) * 3 * (1 - m);
  const desk = (x: number, y: number, s: number, i: number, hero: boolean, key: string) => {
    const up = l(1, 0.5 + 0.02 * i, 12);
    const dir = hero ? 0 : x < 540 ? 1 : -1;
    const hy = y - 74 * s + (1 - up) * 16;
    return (
      <g key={key}>
        <G x={x} y={y + (1 - up) * 16} s={s * p(1, 0.12 + 0.04 * i)} r={(1 - up) * dir * 8}><Person fill={hero ? TXT : SEC} /></G>
        {dir !== 0 && <circle cx={x + dir * 26 * s} cy={hy} r={7} fill={GOLD} opacity={up} />}
        {dir !== 0 && <line x1={x + dir * 38 * s} y1={hy} x2={x + dir * 120 * s} y2={hy} stroke={GOLDL} strokeWidth={5} strokeDasharray="4 14" strokeLinecap="round" opacity={up * 0.8} />}
        {dir === 0 && <g opacity={up}><circle cx={x - 13 * s} cy={hy} r={5} fill={INK} /><circle cx={x + 13 * s} cy={hy} r={5} fill={INK} /></g>}
        <Box cx={x} cy={y + 50 * s} w={150 * s} h={16 * s} rx={8} fill={hero ? GOLD : HOV} />
        <Box cx={x - 60 * s} cy={y + 100 * s} w={12 * s} h={90 * s} fill={HOV} />
        <Box cx={x + 60 * s} cy={y + 100 * s} w={12 * s} h={90 * s} fill={HOV} />
        <G x={x + 28 * s} y={y + 32 * s} r={i % 2 ? 5 : -5}><Box cx={0} cy={0} w={64 * s} h={26 * s} rx={4} fill={PAPER} /></G>
      </g>
    );
  };
  return (
    <Stage bg={INK} overlay={<Tag i={0} x={640} y={280} p={p(1, 0.15)} solid color={GOLDL} size={38} />}>
      {/* bàn lùi mờ phía sau */}
      <g opacity={0.22 * (1 - m)}>
        <Box cx={160} cy={560} w={200} h={150} rx={14} fill={EL} stroke={GOLD} strokeWidth={5} />
        <Box cx={920} cy={560} w={200} h={150} rx={14} fill={EL} stroke={GOLD} strokeWidth={5} />
        <Box cx={540} cy={1180} w={900} h={30} rx={12} fill={GOLD} />
        <Lines x={90} y={520} w={140} n={3} gap={30} color={HOV} />
        <Lines x={850} y={520} w={140} n={3} gap={30} color={HOV} />
      </g>
      {/* bảng và đồng hồ trên tường */}
      <g opacity={m}>
        <Box cx={640} cy={470} w={300} h={150} rx={12} fill={EL} stroke={HOV} strokeWidth={5} />
        {[0, 1, 2].map((k) => <G key={k} x={550 + k * 90} y={470} r={k * 4 - 4}><Box cx={0} cy={0} w={64} h={84} rx={6} fill={PAPER} /></G>)}
        <G x={880} y={430}><Clock r={70} hour={2} minute={0} /></G>
      </g>
      {/* bạn: cận cảnh rồi thu về góc */}
      <G x={lerp(540, 170, m) + tr} y={lerp(1000, 440, m)} s={lerp(4.8, 1.2, m)}>
        <Person />
        <path d="M-26 -88 L-8 -80 M26 -88 L8 -80" stroke={INK} strokeWidth={4.5} strokeLinecap="round" />
        <circle cx={-14} cy={-72} r={4} fill={INK} />
        <circle cx={14} cy={-72} r={4} fill={INK} />
        <path d="M-9 -54 Q0 -59 9 -54" fill="none" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
        <G x={30} y={lerp(-100, -52, sweat)} s={0.2}><path d="M0 -34 Q26 6 0 28 Q-26 6 0 -34 Z" fill={GOLDL} /></G>
      </G>
      {/* hai dãy bàn */}
      <g opacity={m}>
        <ellipse cx={540} cy={900} rx={170} ry={150} fill={GOLDL} opacity={(0.1 + 0.07 * Math.sin(f / 6)) * l(1, 0.6, 14)} />
        {[255, 445, 635, 825].map((x, k) => desk(x, 740, 0.85, k + 5, false, `b${k}`))}
        {[160, 350, 540, 730, 920].map((x, k) => desk(x, 960, 1.15, k, k === 2, `f${k}`))}
      </g>
    </Stage>
  );
};

const Coin: React.FC = () => (
  <g>
    <circle cx={0} cy={6} r={34} fill={GOLDL} />
    <circle cx={0} cy={-4} r={34} fill={GOLD} />
    <circle cx={0} cy={-4} r={22} fill="none" stroke={INK} strokeWidth={5} />
  </g>
);
const Device: React.FC = () => (
  <g>
    <Box cx={0} cy={-8} w={92} h={60} rx={8} fill={EL} stroke={GOLD} strokeWidth={5} />
    <Box cx={0} cy={30} w={20} h={14} fill={HOV} />
    <Box cx={0} cy={40} w={60} h={8} rx={4} fill={HOV} />
  </g>
);

/** Cảnh 3: bạn đẩy giấy sang AI, tiêu đề lật; AI điền dòng; bạn bấm gửi, tờ trình gấp thành thư bay sang sếp. */
export const NhoAiSoanRoiGui: React.FC = () => {
  const { f, at, p, l } = useT();
  const px0 = lerp(330, 440, l(0, 0.12, 40));
  const settle = l(0, 0.75, 14);
  const flipA = 1 - (1 - Math.abs(Math.cos(f / 8))) * (1 - settle);
  const flipB = 1 - (1 - Math.abs(Math.sin(f / 8))) * (1 - settle);
  const sc = lerp(0.8, 0.95, l(1, 0, 16));
  const fill = l(1, 0.04, 60) * 6;
  const fold = l(2, 0.5, 10);
  const fly = l(2, 0.6, 34);
  const ex = lerp(px0, 840, fly);
  const ey = lerp(795, 745, fly) - Math.sin(fly * Math.PI) * 60;
  const press = hit(f, at(2, 0.3), 10);
  const gz = l(2, 0.02, 18);
  const armO = 1 - l(1, 0, 10);
  const cardO = 1 - l(1, 0, 8);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={410} y={290} p={p(0, 0.3)} solid color={GOLDL} size={30} o={cardO} />
      <Tag i={1} x={690} y={290} p={p(0, 0.5)} solid color={GOLDL} size={30} o={cardO} />
      <Tag i={2} x={270} y={1035} p={p(2, 0.25)} solid color={GOLDL} size={34} />
    </>}>
      <defs>
        <clipPath id="b2-s3-clip"><rect x={-150} y={-200} width={300} height={400} rx={14} /></clipPath>
      </defs>
      <DeskTop />
      <Monitor />
      <G x={150} y={950} s={1.2}><Person /></G>
      <circle cx={670} cy={880} r={120} fill={GOLDL} opacity={0.12 + 0.1 * l(1, 0, 20)} />
      <G x={670} y={880}><AIG size={170} /></G>
      {/* hai tiêu đề lật qua lại trên màn hình */}
      <g opacity={cardO}>
        <G x={410} y={510} s={1.1 * p(0, 0.1)}>
          <g transform={`scale(1 ${flipA})`}><Box cx={0} cy={0} w={150} h={110} rx={14} fill={PAPER} stroke={GOLD} strokeWidth={5} /><Coin /></g>
        </G>
        <G x={680} y={510} s={1.1 * p(0, 0.2)}>
          <g transform={`scale(1 ${flipB})`}><Box cx={0} cy={0} w={150} h={110} rx={14} fill={PAPER} stroke={GOLD} strokeWidth={5} /><Device /></g>
        </G>
      </g>
      {/* tay bạn đẩy, tay AI nhận */}
      <g opacity={armO}>
        <line x1={205} y1={940} x2={px0 - 125} y2={900} stroke={TXT} strokeWidth={20} strokeLinecap="round" />
        <line x1={600} y1={905} x2={px0 + 125} y2={890} stroke={GOLD} strokeWidth={14} strokeLinecap="round" opacity={p(0, 0.45)} />
      </g>
      <line x1={600} y1={905} x2={ex + 120 * sc} y2={ey + 60} stroke={GOLD} strokeWidth={14} strokeLinecap="round" opacity={c01(l(1, 0, 6) - fly * 2)} />
      {/* mắt bạn quét */}
      <line x1={200} y1={845} x2={lerp(360, 590, gz)} y2={lerp(720, 800, gz)} stroke={GOLDL} strokeWidth={6} strokeDasharray="4 14" strokeLinecap="round" opacity={(gz > 0 ? 1 : 0) * (1 - l(2, 0.25, 8))} />
      {/* nút gửi và ngón bấm */}
      <g opacity={p(2, 0)}>
        <Box cx={270} cy={945} w={110} h={40} rx={16} fill={press > 0.5 || l(2, 0.4, 2) >= 1 ? GOLDL : GOLD} />
        <path d="M250 934 L292 945 L250 956 L258 945 Z" fill={INK} />
        <line x1={215} y1={930} x2={268} y2={866 + press * 50} stroke={TXT} strokeWidth={28} strokeLinecap="round" />
        <circle cx={270} cy={874 + press * 50} r={18} fill={TXT} />
      </g>
      {/* tờ trình hoặc thư */}
      {fold < 1 && (
        <G x={ex} y={ey} s={sc}>
          <Box cx={0} cy={0} w={330} h={430} rx={24} fill={GOLDL} opacity={(0.1 + 0.1 * Math.sin(f / 6)) * l(1, 0, 10) * (1 - l(2, 0, 6))} />
          <g transform={`scale(${lerp(1, 0.8, fold)} ${lerp(1, 0.42, fold)})`}>
            <ToTrinh rows={6} fill={fill} />
            <g clipPath="url(#b2-s3-clip)"><rect x={-160 + 340 * l(1, 0.65, 26)} y={-210} width={50} height={420} fill={TXT} opacity={0.35 * hit(f, at(1, 0.65), 26)} transform="skewX(-15)" /></g>
          </g>
        </G>
      )}
      {/* sếp ở mép phải, thư bay tới trước ngực sếp */}
      <G x={lerp(1160, 915, p(2, 0.45))} y={930} s={1.3}><Boss /></G>
      {fold >= 1 && (
        <G x={ex} y={ey} s={0.8} r={-8 * Math.sin(fly * Math.PI)}>
          <Box cx={0} cy={0} w={220} h={150} rx={12} fill={PAPER} />
          <path d="M-110 -75 L0 15 L110 -75 Z" fill={GOLDL} />
          <circle cx={0} cy={15} r={12} fill={GOLD} />
        </G>
      )}
    </Stage>
  );
};

const QCard: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={150} h={100} rx={14} fill={PAPER} />
    <G x={-40} y={-16} s={0.5}><Coin /></G>
    <rect x={-8} y={-10} width={56} height={14} rx={7} fill={SEC} />
    <Box cx={20} cy={26} w={96} h={30} rx={8} fill="none" stroke={SEC} strokeWidth={4} strokeDasharray="8 7" />
  </g>
);
const QCal: React.FC<{ blink: number }> = ({ blink }) => (
  <g>
    <Box cx={0} cy={0} w={130} h={140} rx={12} fill={PAPER} />
    <path d="M-65 -42 V-58 Q-65 -70 -53 -70 H53 Q65 -70 65 -58 V-42 Z" fill={GOLD} />
    {[0, 1, 2, 3, 4, 5].map((k) => (
      <Box key={k} cx={-38 + (k % 3) * 38} cy={-14 + Math.floor(k / 3) * 42} w={30} h={32} rx={6} fill={k === 4 ? GOLDL : "none"} opacity={k === 4 ? 0.3 + 0.7 * blink : 1} stroke={SEC} strokeWidth={3} strokeDasharray="6 5" />
    ))}
  </g>
);

/** Cảnh 4: kim đồng hồ nhảy, sếp vào gõ vào dòng khoản chi, ba dấu hỏi; thẻ nguồn ngân sách rơi ở câu 0, lịch quý rơi ở câu 1, đều trống. */
export const SepHoiNguonNganSach: React.FC = () => {
  const { f, p, l } = useT();
  const walk = l(0, 0.04, 40);
  const bx = lerp(1150, 760, walk);
  const tap = Math.sin(f / 3) * 8 * l(0, 0.45, 10);
  const minute = Math.floor(l(0, 0.05, 50) * 5.99);
  const d1 = l(0, 0.6, 18);
  const d2 = l(1, 0.05, 18);
  const blink = 0.5 + 0.5 * Math.sin(f / 4);
  const qs = [580, 760, 940];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={330} y={625} p={p(0, 0.78)} solid color={GOLDL} size={32} />
      <Tag i={1} x={560} y={850} p={p(1, 0.3)} solid color={GOLDL} size={30} />
    </>}>
      <G x={200} y={340} s={p(0, 0)}>
        <line y1={-90} y2={-130} stroke={HOV} strokeWidth={6} />
        <Clock r={80} hour={2} minute={minute} />
      </G>
      {/* bàn bạn và tờ trình */}
      <Box cx={100} cy={1130} w={14} h={100} fill={HOV} />
      <Box cx={620} cy={1130} w={14} h={100} fill={HOV} />
      <Box cx={360} cy={1075} w={560} h={24} rx={10} fill={GOLD} />
      <G x={230} y={1010} s={1.4}><Person /></G>
      <G x={490} y={975} s={0.45}><ToTrinh /></G>
      <rect x={462} y={929} width={110} height={20} rx={6} fill={GOLDL} opacity={0.4 * l(0, 0.45, 8)} />
      {/* ba dấu hỏi trên đầu sếp */}
      {qs.map((x, k) => (
        <G key={k} x={x} y={520 + Math.sin(f / 9 + k * 2) * 6} s={0.95 * p(0, 0.2 + 0.1 * k)} r={Math.sin(f / 11 + k) * 5}>
          <Question color={k === 0 && l(0, 0.55, 8) > 0 ? GOLDL : HOV} />
        </G>
      ))}
      <circle cx={580} cy={520} r={92} fill="none" stroke={GOLDL} strokeWidth={5} opacity={0.5 * l(0, 0.55, 10)} />
      {/* sếp */}
      <line x1={bx - 60} y1={990} x2={545 + tap} y2={935} stroke={TXT} strokeWidth={22} strokeLinecap="round" opacity={walk >= 1 ? 1 : 0} />
      <circle cx={545 + tap} cy={935} r={14} fill={TXT} opacity={walk >= 1 ? 1 : 0} />
      <G x={bx} y={1010 + Math.abs(Math.sin(f / 4)) * 6 * (1 - walk)} s={1.9}><Boss /></G>
      {/* thẻ nguồn ngân sách rơi ở câu 0, lịch quý rơi ở câu 1 */}
      <g opacity={d1 > 0 ? 1 : 0}>
        <G x={lerp(580, 330, d1)} y={lerp(580, 740, d1) - Math.sin(d1 * Math.PI) * 50} r={lerp(20, 0, d1)} s={1.2}><QCard /></G>
      </g>
      <g opacity={d2 > 0 ? 1 : 0}>
        <G x={lerp(580, 560, d2)} y={lerp(580, 730, d2) - Math.sin(d2 * Math.PI) * 40} r={lerp(-15, 0, d2)} s={1.2}><QCal blink={blink} /></G>
      </g>
    </Stage>
  );
};

const Slot: React.FC<{ full?: boolean }> = ({ full = false }) => (
  <g>
    {full ? (
      <g>
        <Box cx={0} cy={0} w={230} h={240} rx={16} fill={PAPER} />
        <path d="M-115 -90 V-104 Q-115 -120 -99 -120 H99 Q115 -120 115 -104 V-90 Z" fill={GOLD} />
        <G x={-50} y={-52} s={0.5}><Coin /></G>
        <Lines x={-85} y={-10} w={170} n={4} gap={34} />
      </g>
    ) : (
      <Box cx={0} cy={0} w={230} h={240} rx={16} fill="none" stroke={SEC} strokeWidth={5} strokeDasharray="12 10" />
    )}
  </g>
);

/** Cảnh 5: dấu hỏi thứ hai lật xuống bàn, ba ô báo giá chỉ một ô có chữ; rồi hợp đồng rẽ hai nhánh, bút sếp gạch từng nhánh. */
export const SepHoiBaoGiaHopDong: React.FC = () => {
  const { f, p, l } = useT();
  const fall = l(0, 0.04, 34);
  const a0 = 1 - l(1, 0, 8);
  const tap = Math.sin(f / 3) * 6 * l(0, 0.4, 10) * a0;
  const t1 = l(1, 0.15, 30);
  const t2 = l(1, 0.55, 30);
  const up = [[395, 860], [450, 860], [450, 520], [600, 520]];
  const dn = [[450, 860], [450, 880], [590, 880]];
  const nib = t2 > 0 ? along(dn, t2) : along(up, t1);
  const q3 = l(1, 0.05, 20);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={420} y={700} p={p(0, 0.3)} solid color={GOLDL} size={34} o={a0} />
      <Tag i={1} x={690} y={385} p={p(1, 0.25)} solid color={GOLDL} size={30} />
      <Tag i={2} x={690} y={735} p={p(1, 0.6)} solid color={GOLDL} size={28} />
    </>}>
      {/* tay sếp ở sau hình, bút ở trên cùng */}
      {t1 > 0 && <line x1={815} y1={935} x2={nib.x + 60} y2={nib.y - 50} stroke={TXT} strokeWidth={20} strokeLinecap="round" />}
      <G x={870} y={1010} s={1.7}><Boss /></G>
      <g opacity={a0}>
        {[195, 420, 645].map((x, k) => (
          <G key={k} x={x} y={920} s={0.95 * p(0, 0.2 + 0.1 * k)}><Slot full={k === 2} /></G>
        ))}
        <G x={lerp(870, 250, fall)} y={lerp(640, 440, fall) - Math.sin(fall * Math.PI) * 120}>
          <g transform={`scale(${Math.cos(fall * Math.PI * 2)} 1)`}><Question s={1.6} color={GOLDL} /></g>
        </G>
        <G x={780} y={440 + Math.sin(f / 9) * 6} s={1.5 * p(0, 0.5)}><Question color={HOV} /></G>
        <line x1={805} y1={950} x2={665 + tap} y2={812} stroke={TXT} strokeWidth={22} strokeLinecap="round" />
        <circle cx={665 + tap} cy={812} r={16} fill={TXT} />
      </g>
      <Box cx={540} cy={1135} w={900} h={120} rx={10} fill={EL} stroke={HOV} strokeWidth={5} />
      <Box cx={540} cy={1068} w={900} h={26} rx={10} fill={GOLD} />
      {/* hợp đồng và hai nhánh */}
      <g opacity={t1 > 0 || l(1, 0, 4) > 0 ? 1 - a0 : 0}>
        <G x={240} y={852} s={p(1, 0.05)}><ToTrinh bar={HOV} /></G>
        <path d="M395 860 H450 V520 H600 M450 860 V880 H590" fill="none" stroke={SEC} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M395 860 H450 V520 H600" fill="none" stroke={GOLD} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - t1} />
        <path d="M450 860 V880 H590" fill="none" stroke={GOLD} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - t2} />
        <G x={690} y={520} s={1.2 * p(1, 0.2)}><QCal blink={1} /></G>
        <G x={690} y={880} s={1.2 * p(1, 0.5)}>
          <Box cx={0} cy={0} w={150} h={110} rx={16} fill={EL} stroke={GOLD} strokeWidth={5} />
          <G x={-36} y={0} s={0.55}><Coin /></G>
          <path d="M-4 0 H44 M26 -16 L46 0 L26 16" fill="none" stroke={GOLD} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        </G>
        <G x={lerp(870, 240, q3)} y={lerp(760, 400, q3) - Math.sin(q3 * Math.PI) * 100} s={0.8 * q3}><Question color={GOLDL} /></G>
        <line x1={nib.x + 60} y1={nib.y - 50} x2={nib.x} y2={nib.y} stroke={GOLDL} strokeWidth={10} strokeLinecap="round" opacity={t1 > 0 ? 1 : 0} />
      </g>
    </Stage>
  );
};

/** Cảnh 6: bạn đứng hình dưới ba dấu hỏi; AI trước cái cân hai đĩa nằm ngang; hai tờ can chồng khít, AI giơ tay. */
export const DungHinhAiKhongSai: React.FC = () => {
  const { f, p, l } = useT();
  const g0 = 1 - l(1, 0, 8);
  const tilt = 12 * (1 - l(1, 0.05, 30)) * Math.cos(f / 3);
  const th = (tilt * Math.PI) / 180;
  const L = { x: 540 - 300 * Math.cos(th), y: 680 - 300 * Math.sin(th) };
  const R = { x: 540 + 300 * Math.cos(th), y: 680 + 300 * Math.sin(th) };
  const sc = 1 - l(2, 0, 12);
  const m = l(2, 0.1, 28);
  const ai = p(1, 0);
  const q1 = 1 - l(2, 0, 8);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={270} p={p(0, 0.1)} solid color={GOLDL} size={40} o={g0} />
      <Tag i={1} x={540} y={300} p={p(2, 0.1)} solid color={GOLDL} size={38} />
      <Tag i={2} x={540} y={1150} p={p(2, 0.35)} solid color={GOLDL} size={36} />
    </>}>
      {/* câu 0: bạn đứng hình */}
      <g opacity={g0}>
        {[380, 540, 700].map((x, k) => (
          <G key={k} x={x} y={430 + Math.sin(f / 9 + k * 2) * 8} s={0.85} r={Math.sin(f / 10 + k) * 8}><Question color={GOLDL} /></G>
        ))}
        <G x={540} y={943} s={2.2}><Person /></G>
        <G x={850} y={700} s={p(0, 0.2)}>
          <circle r={56} fill={INK} stroke={GOLD} strokeWidth={8} />
          <Box cx={-14} cy={0} w={14} h={44} rx={4} fill={GOLD} />
          <Box cx={14} cy={0} w={14} h={44} rx={4} fill={GOLD} />
        </G>
        <Box cx={130} cy={1140} w={26} h={150} rx={6} fill={HOV} />
        <Box cx={950} cy={1140} w={26} h={150} rx={6} fill={HOV} />
        <Box cx={540} cy={1040} w={900} h={26} rx={10} fill={GOLD} />
        <G x={230} y={940} s={0.55}><ToTrinh /></G>
        <Box cx={850} cy={925} w={220} h={150} rx={16} fill={EL} stroke={GOLD} strokeWidth={5} />
        <Lines x={770} y={890} w={120} n={3} gap={26} color={HOV} />
      </g>
      {/* câu 1 và 2: AI */}
      <g opacity={c01(ai) * q1}>
        <G x={540} y={290} s={0.8 * ai}><Question color={GOLDL} /></G>
      </g>
      <circle cx={540} cy={470} r={150} fill={GOLDL} opacity={0.12 * c01(ai)} />
      <G x={540} y={470} s={ai > 0 ? ai : 0}><AIG size={210} /></G>
      {m > 0.2 && (
        <g stroke={GOLD} strokeWidth={14} strokeLinecap="round" fill="none">
          <line x1={430} y1={490} x2={350} y2={380} opacity={m} />
          <line x1={650} y1={490} x2={730} y2={380} opacity={m} />
        </g>
      )}
      {m > 0.2 && (
        <g fill={GOLD}>
          <circle cx={350} cy={380} r={20} opacity={m} />
          <circle cx={730} cy={380} r={20} opacity={m} />
        </g>
      )}
      {/* cân hai đĩa: cột, đòn, hai dây, hai đĩa, vật nằm trong đĩa */}
      <g opacity={sc * (ai > 0.05 ? 1 : 0)}>
        <Box cx={540} cy={920} w={20} h={480} fill={HOV} />
        <Box cx={540} cy={1175} w={320} h={26} rx={10} fill={HOV} />
        <line x1={L.x} y1={L.y} x2={R.x} y2={R.y} stroke={GOLD} strokeWidth={16} strokeLinecap="round" />
        <circle cx={540} cy={680} r={20} fill={GOLDL} />
        {[L, R].map((e, k) => (
          <g key={k}>
            <line x1={e.x} y1={e.y} x2={e.x - 110} y2={e.y + 250} stroke={SEC} strokeWidth={5} />
            <line x1={e.x} y1={e.y} x2={e.x + 110} y2={e.y + 250} stroke={SEC} strokeWidth={5} />
            <Box cx={e.x} cy={e.y + 259} w={260} h={18} rx={9} fill={GOLD} />
          </g>
        ))}
        {m <= 0 && (
          <g>
            <G x={L.x} y={L.y + 167}><Bubble w={180} h={96} fill={GOLD} n={2} /></G>
            <G x={R.x} y={R.y + 150} s={0.5}><ToTrinh /></G>
          </g>
        )}
      </g>
      {/* câu 2: tờ lời bạn nhờ chồng khít lên tờ AI viết */}
      {m > 0 && (
        <g>
          <G x={lerp(R.x, 540, m)} y={lerp(R.y + 150, 880, m)} s={lerp(0.5, 1, m)}><ToTrinh /></G>
          <G x={lerp(L.x, 546, m)} y={lerp(L.y + 167, 874, m)} s={lerp(0.5, 1, m)} o={l(2, 0, 10)}>
            <Box cx={0} cy={0} w={300} h={400} rx={14} fill="none" stroke={TXT} strokeWidth={6} />
            <Lines x={-120} y={-140} w={240} n={4} gap={50} color={GOLD} t={9} />
          </G>
        </g>
      )}
    </Stage>
  );
};

const CommentBox: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={860} h={170} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} />
    <circle cx={-350} cy={-25} r={30} fill={HOV} />
    <Box cx={-10} cy={45} w={620} h={44} rx={22} fill={SURF} stroke={HOV} strokeWidth={4} />
    <circle cx={370} cy={45} r={26} fill={GOLD} />
    <path d="M358 35 L384 45 L358 55 Z" fill={INK} />
  </g>
);

const Palette: React.FC<{ lit: number }> = ({ lit }) => {
  const cols = [GOLD, GOLDL, TXT, SEC, PAPER, HOV, GOLD, TXT, GOLDL, SEC, PAPER, GOLD];
  return (
    <g>
      {cols.map((c, i) => (
        <rect key={i} x={-190 + (i % 4) * 96 + 4} y={-130 + Math.floor(i / 4) * 88 + 4} width={88} height={80} rx={10} fill={i < lit ? c : HOV} opacity={i < lit ? 1 : 0.5} />
      ))}
    </g>
  );
};

/** Cảnh 18: quay lại bàn làm việc, lỗ hổng nổi lên khoanh lại; ô bình luận; thẻ bảng màu và dashboard; màn kết thương hiệu. */
export const KetQuayLaiToTrinh: React.FC = () => {
  const { p, l } = useT();
  const sw = l(0, 0.05, 100);
  const lx = 540 + 60 * Math.sin(sw * 8);
  const ly = lerp(745, 860, sw);
  const err = [0, 1, 2, 3].map((k) => l(0, 0.12 + 0.17 * k, 12));
  const ring = [0, 1, 2, 3].map((k) => l(0, 0.14 + 0.17 * k, 14));
  const m = l(1, 0, 16);
  const gone = l(2, 0, 10);
  const boxIn = l(1, 0, 16);
  const down = l(1, 0.2, 18);
  const up = l(1, 0.55, 20);
  const slide = l(2, 0, 18);
  const lit = Math.floor(l(2, 0.35, 70) * 12);
  const barsT = l(2, 0.3, 50);
  const sc = lerp(1, 0.76, m);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={290} y={690} p={p(0, 0.1)} solid color={GOLDL} size={38} o={1 - l(1, 0, 8)} />
      <Tag i={1} x={400} y={1100} p={p(1, 0.25)} solid color={GOLDL} size={32} o={(boxIn > 0 ? 1 : 0) * (1 - gone)} />
      <Tag i={2} x={850} y={590} p={p(1, 0.6)} solid color={GOLDL} size={34} o={1 - gone} />
      <Tag i={3} x={540} y={255} p={p(2, 0.05)} solid color={GOLDL} size={40} o={1 - l(3, 0, 6)} />
      <Tag i={4} x={650} y={650} p={p(2, 0.3)} solid color={GOLDL} size={32} o={1 - l(3, 0, 6)} />
      <Tag i={5} x={350} y={995} p={p(2, 0.5)} solid color={GOLDL} size={32} o={1 - l(3, 0, 6)} />
      {l(3, 0, 12) > 0 && <BrandEnd k={l(3, 0, 12)} />}
    </>}>
      <g opacity={1 - gone}>
        <g transform={`translate(540 ${lerp(0, 80, m)}) scale(${sc}) translate(-540 0)`}>
          <Bench
            lx={lx}
            ly={ly}
            aiGlow={0.2}
            paper={<G x={540} y={830} s={0.7}><ToTrinh err={err} ring={ring} /></G>}
            extra={
              <g>
                <Cracks t={1} />
                <G x={262} y={780} s={p(0, 0.7)}>
                  <Box cx={0} cy={-14} w={14} h={44} rx={7} fill={GOLD} />
                  <circle cx={0} cy={26} r={9} fill={GOLD} />
                </G>
              </g>
            }
          />
        </g>
        {boxIn > 0 && <G x={540} y={lerp(1500, 1135, boxIn)}><CommentBox /></G>}
        {down > 0 && <G x={lerp(540, 690, down)} y={lerp(650, 1095, down) - Math.sin(down * Math.PI) * 60} s={lerp(0.9, 0.7, down)}><Bubble w={190} h={90} fill={GOLD} n={2} /></G>}
        {up > 0 && <G x={lerp(790, 880, up)} y={lerp(1135, 470, up) - Math.sin(up * Math.PI) * 60} s={0.9}><Bubble w={190} h={90} fill={GOLDL} n={2} /></G>}
      </g>
      {/* thẻ bài sau */}
      {slide > 0 && (
        <G x={540} y={720 + (1 - slide) * 1000 + l(3, 0, 10) * 1000}>
          <Box cx={0} cy={0} w={860} h={820} rx={32} fill={EL} stroke={GOLD} strokeWidth={6} />
          <circle cx={-300} cy={-260} r={90} fill={GOLDL} opacity={0.12} />
          <G x={-300} y={-260}><AIG size={130} /></G>
          <G x={110} y={-250}><Palette lit={lit} /></G>
          <Box cx={-190} cy={100} w={380} h={250} rx={16} fill={SURF} stroke={HOV} strokeWidth={4} />
          {[0.45, 0.8, 0.6, 1, 0.7].map((h, k) => (
            <rect key={k} x={-340 + k * 66} y={205 - 190 * h * c01(barsT * 1.3 - k * 0.12)} width={46} height={Math.max(2, 190 * h * c01(barsT * 1.3 - k * 0.12))} rx={8} fill={k % 2 ? GOLDL : GOLD} />
          ))}
          <g opacity={lerp(1, 0.35, l(2, 0.55, 16))}>
            <Box cx={250} cy={100} w={300} h={250} rx={16} fill={SURF} stroke={HOV} strokeWidth={4} />
            <path d="M210 55 L165 100 L210 145 M290 55 L335 100 L290 145 M264 50 L236 150" fill="none" stroke={SEC} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <line x1={120} y1={-10} x2={380} y2={210} stroke={SEC} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - l(2, 0.55, 16)} />
        </G>
      )}
    </Stage>
  );
};
