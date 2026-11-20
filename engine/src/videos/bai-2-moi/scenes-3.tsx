import React from "react";
import { AI, Arrow, Box, Bubble, Clock, Doc, EL, Floor, G, GOLD, GOLDL, Hand, HOV, INK, Lines, Mag, PAPER, Person, Question, RED, SEC, Stage, Stamp, SURF, Tag, TXT, lerp, useT } from "../shared/art";
import { Boss } from "../bai-3/art";

const c01 = (v: number): number => Math.max(0, Math.min(1, v));
const sw = (f: number, per: number, ph = 0): number => Math.sin(f / per + ph);
const ez = (t: number): number => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Tờ trình: giấy PAPER 300x400, thanh tiêu đề vàng, dòng xám, ô chữ ký nét đứt; dòng lỗi gạch đỏ. */
const To: React.FC<{ s?: number; n?: number; gap?: number; bad?: number[]; badO?: number; jit?: number; scrib?: boolean }> = ({ s = 1, n = 4, gap = 52, bad = [], badO = 1, jit = 0, scrib = false }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={300} h={400} rx={14} fill={PAPER} />
    <rect x={-150} y={-200} width={300} height={26} rx={14} fill={GOLD} />
    <rect x={-150} y={-188} width={300} height={14} fill={GOLD} />
    <Lines x={-120} y={-140} w={240} n={n} gap={gap} color={SEC} t={13} />
    {bad.map((k) => (
      <rect key={k} x={-120 + jit} y={-140 + k * gap + 18} width={240 * (k % 3 === 2 ? 0.62 : k % 3 === 1 ? 0.84 : 1)} height={7} rx={3} fill={RED} opacity={badO} />
    ))}
    {scrib && <path d="M-120 168 q10 -16 20 0 t20 0 t20 0 t20 0" fill="none" stroke={GOLD} strokeWidth={5} strokeLinecap="round" />}
    <Box cx={80} cy={150} w={100} h={56} rx={10} fill="none" stroke={SEC} strokeWidth={4} strokeDasharray="10 8" />
  </G>
);

const Pen: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={18} h={130} rx={9} fill={GOLD} />
    <Box cx={0} cy={-52} w={18} h={20} rx={6} fill={GOLDL} />
    <path d="M-9 65 L9 65 L0 95 Z" fill={TXT} />
  </g>
);

/** AI thanh tra: khối AI đeo kính, miệng phẳng lạnh. */
const Inspector: React.FC<{ size?: number }> = ({ size = 150 }) => (
  <g>
    <AI size={size} />
    {[-1, 1].map((sd) => (
      <g key={sd}>
        <circle cx={sd * size * 0.2} cy={-size * 0.02} r={size * 0.15} fill="none" stroke={INK} strokeWidth={9} />
        <circle cx={sd * size * 0.2} cy={-size * 0.02} r={size * 0.15} fill="none" stroke={GOLDL} strokeWidth={4} />
      </g>
    ))}
    <path d={`M${-size * 0.05} ${-size * 0.04} H${size * 0.05}`} stroke={GOLDL} strokeWidth={4} />
  </g>
);

/** Cảnh 13 — Câu lệnh Phỏng vấn ngược: bàn tay chặn, bốn thẻ hỏi toả ra từ AI, điền xong thì rào nhấc lên. */
export const PhongVanNguocCauLenh: React.FC = () => {
  const { f, p, l } = useT();
  const cxs = [190, 420, 650, 850];
  const cys = [850, 905, 880, 835];
  const rts = [-9, -3, 4, 10];
  const hand = p(0, 0.3) * (1 - l(1, 0, 8));
  const lift = ez(l(2, 0.62, 16));
  const row1 = 340 * l(0, 0.1, 30) + 440 * l(1, 0.1, 40);
  const row2 = 560 * l(2, 0.1, 30);
  const curX = row2 > 0 ? -390 + row2 + 10 : -390 + row1 + 10;
  const curY = row2 > 0 ? 15 : -19;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={500} y={800} p={p(0, 0.45)} solid size={36} o={1 - l(1, 0, 8)} />
      <Tag i={1} x={540} y={1070} p={p(1, 0.5)} solid size={34} o={1 - l(2, 0, 8)} />
      <Tag i={2} x={540} y={1070} p={p(2, 0.1)} solid size={34} />
      <Tag i={3} x={430} y={285} p={p(2, 0.78)} solid size={34} />
    </>}>
      {/* Khung gõ lệnh bên dưới, chữ gõ dần qua ba câu. */}
      <G x={540} y={1165} s={p(0, 0)}>
        <Box cx={0} cy={0} w={860} h={90} rx={28} fill={EL} stroke={GOLD} strokeWidth={5} />
        <rect x={-390} y={-26} width={row1} height={14} rx={7} fill={TXT} />
        <rect x={-390} y={8} width={row2} height={14} rx={7} fill={TXT} />
        {Math.floor(f / 8) % 2 === 0 && <Box cx={curX} cy={curY} w={6} h={24} rx={3} fill={GOLD} />}
      </G>
      {/* Bạn và AI ngồi gần nhau. */}
      <G x={905} y={480} s={p(0, 0.1)}><Person fill={TXT} /></G>
      <G x={700} y={470} s={p(0, 0.2) * (1 + 0.12 * Math.sin(Math.PI * l(1, 0, 20)))}><Inspector size={150} /></G>
      {/* Lòng bàn tay giơ lên như biển dừng. */}
      <G x={510} y={lerp(700, 520, hand)} s={hand} r={4 * sw(f, 10)}><Hand /></G>
      {/* Tờ trình trắng nằm ngoài khung, chưa có chữ; rào chắn trước nó. */}
      <G x={230} y={470} s={0.7 * p(0, 0.05)}><To n={0} /></G>
      <G s={p(0, 0.2)}>
        <Box cx={110} cy={565} w={24} h={100} rx={6} fill={HOV} />
        <Box cx={350} cy={565} w={24} h={100} rx={6} fill={HOV} />
        <G x={110} y={545} r={-70 * lift}>
          <rect x={0} y={-12} width={240} height={24} rx={8} fill={GOLD} />
          {[0, 1, 2, 3, 4].map((k) => (
            <rect key={k} x={24 + k * 46} y={-12} width={20} height={24} fill={INK} />
          ))}
        </G>
      </G>
      {/* Bốn thẻ hỏi bật ra từ AI, nghiêng và cao thấp khác nhau, rồi được điền từng ô. */}
      {cxs.map((x, k) => {
        const u = ez(l(1, 0.12 + k * 0.12, 16));
        if (u <= 0) return null;
        const a = l(2, 0.02 + k * 0.15, 9);
        return (
          <G key={k} x={lerp(700, x, u)} y={lerp(470, cys[k], u) + 4 * sw(f, 12, k) * u} s={u} r={lerp(-30 + k * 10, rts[k], u)}>
            <Box cx={0} cy={0} w={190} h={230} rx={20} fill={EL} stroke={GOLD} strokeWidth={6} />
            <G y={lerp(-28, -42, a)} s={lerp(0.58, 0.44, a)}><Question /></G>
            <Box cx={0} cy={52} w={150} h={60} rx={14} fill={SURF} stroke={a > 0.01 ? GOLD : HOV} strokeWidth={4} />
            <rect x={-62} y={45} width={124 * a} height={15} rx={7} fill={GOLD} />
          </G>
        );
      })}
      {/* Cây bút nằm trong tay AI. */}
      <G x={790} y={510} r={32} s={p(2, 0.7)}><Pen /></G>
      <Floor y={1240} />
    </Stage>
  );
};

const Ruler: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={230} h={64} rx={12} fill={GOLDL} />
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={-100 + i * 25 - 2} y={-32} width={4} height={i % 2 ? 18 : 30} fill={INK} />
    ))}
    <Box cx={106} cy={0} w={10} h={110} rx={4} fill={GOLD} />
  </g>
);

const Building: React.FC = () => (
  <g>
    <path d="M-86 -80 L0 -140 L86 -80 Z" fill={GOLD} />
    <Box cx={0} cy={0} w={140} h={160} rx={8} fill={TXT} />
    {[-40, 0, 40].map((x) => [-40, 0].map((y) => <Box key={`${x}${y}`} cx={x} cy={y} w={24} h={26} rx={5} fill={INK} />))}
    <Box cx={0} cy={56} w={36} h={44} rx={6} fill={GOLD} />
  </g>
);

/** Thẻ lật: u từ 0 đến 1, mặt sau là dấu hỏi, mặt trước là kind. */
const FlipCard: React.FC<{ u: number; kind: 0 | 1 }> = ({ u, kind }) => (
  <g transform={`scale(${Math.max(0.02, Math.abs(Math.cos(Math.PI * u)))} 1)`}>
    <Box cx={0} cy={0} w={340} h={380} rx={26} fill={EL} stroke={GOLD} strokeWidth={7} />
    {u < 0.5 ? (
      <G s={1.1}><Question /></G>
    ) : (
      <g>
        <G y={-10}>{kind === 0 ? <Ruler /> : <Building />}</G>
        <Lines x={-100} y={110} w={200} n={2} gap={30} color={SEC} t={12} />
      </g>
    )}
  </g>
);

/** Cảnh 14 — Hai thẻ lật ra chi tiết hay quên, bạn nhớ ra; ô trả lời ghim vào tờ trình, khe giữa dòng khép như khoá kéo. */
export const HoiTrungChiTietHayQuen: React.FC = () => {
  const { f, p, l } = useT();
  const a1 = ez(l(1, 0, 18));
  const u0 = l(0, 0.08, 14);
  const u1 = l(0, 0.4, 14);
  const ray = l(0, 0.72, 10);
  const tap = 0.5 + 0.5 * sw(f, 3);
  const tapO = 1 - l(1, 0, 8);
  const rows = [0, 1, 2, 3, 4, 5, 6];
  const rf = (k: number): number => l(1, 0.3 + 0.08 * k, 12);
  const chipRows = [1, 4];
  const paperY = (k: number): number => 760 + (-140 + 38 * k) * 1.4;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={300} y={775} p={p(0, 0.35)} solid size={30} o={1 - l(1, 0, 8)} />
      <Tag i={1} x={760} y={775} p={p(0, 0.7)} solid size={30} o={1 - l(1, 0, 8)} />
      <Tag i={2} x={540} y={415} p={p(1, 0.35)} solid size={34} />
      <Tag i={3} x={540} y={1125} p={p(1, 0.75)} solid size={34} />
    </>}>
      {/* Hai thẻ còn lại của bộ bốn, nằm mờ phía sau. */}
      {[[150, 330, -12], [930, 330, 12]].map(([x, y, r], k) => (
        <G key={k} x={x} y={y} r={r} s={p(0, 0) * (1 - a1)}>
          <Box cx={0} cy={0} w={130} h={170} rx={16} fill={EL} stroke={HOV} strokeWidth={5} />
          <G s={0.4}><Question color={SEC} /></G>
        </G>
      ))}
      {/* Hai thẻ lật mặt, rồi thu lên hàng trên. */}
      <G x={lerp(300, 330, a1)} y={lerp(520, 285, a1)} s={lerp(1, 0.42, a1) * p(0, 0)}><FlipCard u={u0} kind={0} /></G>
      <G x={lerp(760, 750, a1)} y={lerp(520, 285, a1)} s={lerp(1, 0.42, a1) * p(0, 0.05)}><FlipCard u={u1} kind={1} /></G>
      {/* Bạn gõ lên trán như vừa nhớ ra; đi sang bên khi tờ trình hiện. */}
      <G x={lerp(540, 880, a1)} y={lerp(1030, 760, a1)} s={lerp(1.5, 1, a1) * p(0, 0.1)}>
        <Person fill={TXT} />
        <path d={`M46 -6 Q78 -50 ${lerp(40, 36, tap)} ${lerp(-100, -92, tap)}`} fill="none" stroke={TXT} strokeWidth={22} strokeLinecap="round" opacity={tapO} />
        {[-150, -125, -100, -75, -50].map((a, k) => (
          <line key={k} x1={Math.cos((a * Math.PI) / 180) * 56} y1={-74 + Math.sin((a * Math.PI) / 180) * 56} x2={Math.cos((a * Math.PI) / 180) * (56 + 24 * ray)} y2={-74 + Math.sin((a * Math.PI) / 180) * (56 + 24 * ray)} stroke={GOLD} strokeWidth={7} strokeLinecap="round" opacity={tapO * ray} />
        ))}
      </G>
      <G x={200} y={760} s={p(1, 0.1)}><Inspector size={130} /></G>
      <Arrow x1={330} y1={375} x2={410} y2={468} p={l(1, 0.1, 16)} color={GOLDL} w={6} dash />
      <Arrow x1={750} y1={375} x2={670} y2={468} p={l(1, 0.2, 16)} color={GOLDL} w={6} dash />
      {/* Tờ trình dày lên từng dòng; khe hai mép khép lại. */}
      <G x={540} y={760} s={1.4 * p(1, 0)}>
        <Box cx={0} cy={0} w={300} h={400} rx={14} fill={PAPER} />
        <rect x={-150} y={-200} width={300} height={26} rx={14} fill={GOLD} />
        <rect x={-150} y={-188} width={300} height={14} fill={GOLD} />
        {rows.map((k) => {
          const w = 240 * (k % 3 === 2 ? 0.62 : k % 3 === 1 ? 0.84 : 1);
          const isChip = chipRows.includes(k);
          return (
            <g key={k}>
              <rect x={-120} y={-140 + 38 * k - 7} width={w} height={14} rx={7} fill="none" stroke={SEC} strokeWidth={2.5} strokeDasharray="6 5" opacity={1 - rf(k)} />
              <rect x={-120} y={-140 + 38 * k - 7} width={w * rf(k)} height={14} rx={7} fill={isChip ? GOLD : SEC} />
            </g>
          );
        })}
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <g key={k}>
            <g transform={`translate(-150 ${-140 + 38 * k + 19}) scale(${1 - rf(k + 1)} 1)`}><Box cx={17} cy={0} w={34} h={14} rx={7} fill={INK} /></g>
            <g transform={`translate(150 ${-140 + 38 * k + 19}) scale(${1 - rf(k + 1)} 1)`}><Box cx={-17} cy={0} w={34} h={14} rx={7} fill={INK} /></g>
          </g>
        ))}
        <Box cx={80} cy={150} w={100} h={56} rx={10} fill="none" stroke={SEC} strokeWidth={4} strokeDasharray="10 8" />
      </G>
      {/* Hai ô trả lời bay từ hai thẻ vào đúng dòng và được ghim. */}
      {chipRows.map((rr, k) => {
        const u = ez(l(1, 0.08 + 0.2 * k, 18));
        if (u <= 0) return null;
        const sx = k === 0 ? 330 : 750;
        const x = lerp(sx, 470, u);
        const y = lerp(290, paperY(rr), u) - 80 * Math.sin(Math.PI * u);
        return (
          <G key={k} x={x} y={y} s={0.9 + 0.1 * u}>
            <Box cx={0} cy={0} w={150} h={34} rx={17} fill={GOLD} stroke={INK} strokeWidth={3} />
            <circle cx={-52} cy={0} r={8} fill={GOLDL} />
            <Box cx={14} cy={0} w={70} h={9} rx={4} fill={INK} />
          </G>
        );
      })}
      <Floor y={1240} />
    </Stage>
  );
};

const Calc: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={80} h={96} rx={12} fill={EL} stroke={GOLD} strokeWidth={4} />
    <Box cx={0} cy={-26} w={58} h={22} rx={5} fill={GOLD} />
    {[-18, 0, 18].map((x) => [4, 22, 38].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r={5} fill={SEC} />))}
  </g>
);

const Book: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={110} h={60} rx={8} fill={GOLD} />
    <Box cx={0} cy={0} w={100} h={10} rx={5} fill={INK} />
    <Box cx={-8} cy={-18} w={64} h={8} rx={4} fill={GOLDL} />
  </g>
);

const Crate: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={110} h={76} rx={8} fill={GOLD} />
    <Box cx={0} cy={0} w={18} h={76} fill={INK} opacity={0.55} />
    <Box cx={0} cy={-30} w={110} h={8} rx={4} fill={GOLDL} />
  </g>
);

const Chart: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={130} h={100} rx={10} fill={EL} stroke={GOLD} strokeWidth={4} />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={-40 + i * 32} y={36 - (28 + i * 22)} width={24} height={28 + i * 22} rx={4} fill={i === 2 ? GOLD : GOLDL} />
    ))}
  </g>
);

const Safe: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={86} h={80} rx={10} fill={HOV} stroke={GOLD} strokeWidth={4} />
    <circle r={20} fill="none" stroke={GOLD} strokeWidth={5} />
    <Box cx={0} cy={0} w={5} h={22} rx={2} fill={GOLD} />
  </g>
);

/** Đường thời gian chuẩn của cả video (chép từ scenes-2): đường vàng, ghim tròn cắm trên đường; ghim chưa tới nét đứt, ghim đã sáng đặc. */
const PinLine: React.FC<{ f: number; on: number[] }> = ({ f, on }) => (
  <g>
    <line x1={110} x2={970} y1={330} y2={330} stroke={GOLD} strokeWidth={8} strokeLinecap="round" />
    {[250, 540, 830].map((x, i) => (
      <g key={i}>
        <rect x={x - 6} y={281} width={12} height={49} fill={on[i] > 0.5 ? GOLDL : HOV} />
        <G x={x} y={245}>
          {on[i] > 1.5 && <circle r={46 + 5 * sw(f, 6)} fill="none" stroke={GOLDL} strokeWidth={3} opacity={0.5} />}
          <circle r={36} fill={on[i] > 0.5 ? GOLD : EL} stroke={on[i] > 0.5 ? GOLDL : GOLD} strokeWidth={6} strokeDasharray={on[i] > 0.5 ? undefined : "12 9"} strokeDashoffset={-f * 0.7} />
        </G>
      </g>
    ))}
  </g>
);

/** Cảnh 15 — Thanh tra độc lập: mốc thứ ba sáng trên đường thời gian, bản nháp vào khung chat, AI thanh tra; hai cặp vai đối xứng rồi thay vai. */
export const ThanhTraDocLap: React.FC = () => {
  const { f, p, l } = useT();
  const a1 = ez(l(1, 0, 16));
  const a2 = ez(l(2, 0, 16));
  const lit = l(0, 0.1, 20);
  const old0 = 1 - l(1, 0, 10);
  const dx = lerp(lerp(830, 360, a1), 540, a2);
  const dy = lerp(lerp(630, 640, a1), 650, a2);
  const ds = lerp(lerp(0.9, 1.1, a1), 1.35, a2);
  const mg = ez(l(1, 0.55, 26));
  const gone2 = 1 - l(2, 0, 10);
  const frameO = p(1, 0) * gone2;
  const badO = l(1, 0.78, 10) * gone2;
  const hop = ez(l(1, 0.2, 22));
  const aiX = lerp(lerp(980, 780, hop), 860, a2);
  const aiY = lerp(720, 650, a2) - 40 * Math.sin(Math.PI * hop) * (1 - a2);
  const aiS = lerp(1.3, 1.5, a2);
  const fall4 = ez(l(3, 0, 22));
  const in6 = ez(l(3, 0.3, 18));
  const in7 = ez(l(3, 0.42, 18));
  const dkW = lerp(220, 230, in7);
  const dkH = lerp(60, 100, in7);
  const dkX = lerp(860, 865, in7);
  const dkY = lerp(805, 825, in7);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={830} y={1042} p={p(0, 0.3)} solid size={36} o={old0} />
      <Tag i={1} x={640} y={375} p={p(0, 0.55)} solid size={32} o={old0} />
      <Tag i={2} x={360} y={930} p={p(1, 0.2)} solid size={34} o={1 - l(2, 0, 8)} />
      <Tag i={3} x={760} y={930} p={p(1, 0.55)} solid size={28} o={1 - l(2, 0, 8)} />
      <Tag i={4} x={215} y={985 + 220 * fall4 * fall4} p={p(2, 0.15)} solid size={25} o={1 - l(3, 0.04, 18)} />
      <Tag i={5} x={830} y={985 + 220 * fall4 * fall4} p={p(2, 0.45)} solid size={24} o={1 - l(3, 0.04, 18)} />
      <Tag i={6} x={lerp(60, 215, in6)} y={985} p={in6} solid size={25} />
      <Tag i={7} x={lerp(980, 830, in7)} y={985} p={in7} solid size={24} />
    </>}>
      {/* Đường thời gian ngang có ba vòng tròn; mốc thứ ba sáng, tờ trình đã đầy chữ đứng trên mốc đó, bạn đứng cạnh. */}
      <g opacity={old0}>
        <G y={630}><PinLine f={f} on={[1, 1, lit > 0.5 ? 2 : 0]} /></G>
        <G x={400} y={740} s={1.9 * p(0, 0.2)} r={3 * sw(f, 12)}><Person fill={TXT} /></G>
        <Arrow x1={520} y1={680} x2={690} y2={680} p={l(0, 0.5, 20)} color={GOLDL} w={6} dash />
      </g>
      {/* Khung chat. */}
      <G x={540} y={650} s={frameO}>
        <Box cx={0} cy={0} w={880} h={700} rx={34} fill={EL} stroke={GOLD} strokeWidth={6} />
        {[0, 1, 2].map((i) => <circle key={i} cx={-400 + i * 34} cy={-318} r={10} fill={i === 0 ? GOLD : HOV} />)}
        <Box cx={0} cy={25} w={840} h={600} rx={20} fill={SURF} />
      </G>
      {/* Bản nháp: ở mốc thứ ba, trượt vào khung chat, rồi ra giữa hai người. */}
      <G x={dx} y={dy} s={ds * p(0, 0.1)}>
        <To n={7} gap={36} bad={[1, 3]} badO={badO} jit={3 * sw(f, 2) * mg} scrib />
      </G>
      {/* AI thanh tra bước lên bục, kính lúp soi bản nháp. */}
      <G x={780} y={840} s={p(1, 0.3) * gone2}>
        <Box cx={0} cy={0} w={300} h={44} rx={12} fill={HOV} />
        <Box cx={0} cy={-17} w={300} h={10} rx={5} fill={GOLD} />
      </G>
      <G x={aiX} y={aiY} s={aiS * p(1, 0.1)}><Inspector size={150} /></G>
      <G x={lerp(740, 440, mg)} y={lerp(790, 565 + 14 * sw(f, 7), mg)} s={0.9 * p(1, 0.3) * gone2}><Mag /></G>
      {/* Hai vai: bạn bên trái, AI bên phải, tờ nháp ở giữa; mỗi người một đạo cụ riêng trên bàn. */}
      <G x={215} y={650} s={2 * p(2, 0.1)}><Person fill={TXT} /></G>
      <G x={215} y={805} s={p(2, 0.3)}>
        <Box cx={0} cy={0} w={200} h={60} rx={10} fill={EL} stroke={GOLD} strokeWidth={4} />
        <Box cx={0} cy={-30} w={216} h={10} rx={5} fill={GOLD} />
      </G>
      <G x={170} y={727} s={p(2, 0.4) * (1 - in6)}><Calc /></G>
      <G x={265} y={745} s={p(2, 0.45) * (1 - in6)}><Book /></G>
      <G x={170} y={737} s={in6}><Crate /></G>
      <G x={265} y={747} s={0.8 * in6}><Crate /></G>
      <G x={dkX} y={dkY} s={p(2, 0.3)}>
        <Box cx={0} cy={0} w={dkW} h={dkH} rx={12} fill={EL} stroke={GOLD} strokeWidth={4} />
        <Box cx={0} cy={-dkH / 2} w={dkW + 16} h={10} rx={5} fill={GOLD} />
        {in7 > 0.05 && [-1, 1].map((sd) => <Box key={sd} cx={sd * 60} cy={8} w={90} h={dkH - 40} rx={8} fill="none" stroke={HOV} strokeWidth={3} opacity={in7} />)}
      </G>
      <G x={815} y={735} s={0.7 * p(2, 0.4) * (1 - in7)}><Mag /></G>
      <G x={915} y={735} s={p(2, 0.5) * (1 - in7)}><Stamp r={36} /></G>
      <G x={805} y={725} s={in7}><Chart /></G>
      <G x={925} y={735} s={in7}><Safe /></G>
      {/* Đường thời gian thu gọn ở mép trên: mốc thứ ba còn sáng. */}
      <g opacity={c01(l(2, 0, 12))}><PinLine f={f} on={[1, 1, 2]} /></g>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 16 — Câu lệnh Thanh tra: bong bóng lệnh, kính lúp soi hai chỗ mơ hồ và một rủi ro tiền, bạn vá lại trước khi gửi. */
export const CauLenhThanhTra: React.FC = () => {
  const { f, p, l } = useT();
  const enter = ez(l(0, 0.25, 24));
  const dn = ez(l(1, 0.2, 14));
  const red = l(1, 0.1, 8);
  const mu = ez(l(1, 0, 16));
  const patch = [ez(l(1, 0.3, 14)), ez(l(1, 0.42, 14)), ez(l(1, 0.54, 14))];
  const targets = [680, 768, 856];
  const press = l(1, 0.7, 14);
  const bob = 8 * sw(f, 10);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={640} y={680} p={p(0, 0.5)} solid size={26} o={1 - l(1, 0, 8)} />
      <Tag i={1} x={660} y={925} p={p(0, 0.65)} solid size={26} o={1 - l(1, 0, 8)} />
      <Tag i={2} x={660} y={925} p={p(1, 0.6)} solid size={26} />
    </>}>
      {/* Khung chat hẹp. */}
      <G x={540} y={700} s={p(0, 0)}>
        <Box cx={0} cy={0} w={800} h={900} rx={36} fill={EL} stroke={GOLD} strokeWidth={6} />
        {[0, 1, 2].map((i) => <circle key={i} cx={-360 + i * 34} cy={-415} r={10} fill={i === 0 ? GOLD : HOV} />)}
      </G>
      {/* Một bong bóng lệnh, đuôi hướng về phía bạn. */}
      <G x={540} y={385} s={p(0, 0.05)}>
        <g transform="scale(-1 1)"><Bubble w={700} h={150} n={3} /></g>
      </G>
      {/* Bản nháp trượt vào dưới bong bóng. */}
      <G x={360} y={lerp(1300, 820, enter)}>
        <To n={6} gap={44} />
      </G>
      {/* Hai vòng khoanh mờ lơ lửng trên hai khoảng chữ, chưa chạm xuống. */}
      {[680, 768].map((y, k) => (
        <g key={k}>
          <Box cx={360} cy={y - 10 + 6 * sw(f, 9, k)} w={270} h={38} rx={19} fill="none" stroke={GOLDL} strokeWidth={4} strokeDasharray="12 9" opacity={p(0, 0.45 + 0.1 * k) * (1 - red) * c01(enter * 2 - 0.8)} />
          <Box cx={360} cy={y} w={270} h={38} rx={19} fill={RED} opacity={0.18 * red * (1 - patch[k])} />
          <Box cx={360} cy={y} w={270} h={38} rx={19} fill="none" stroke={RED} strokeWidth={5} opacity={red * (1 - patch[k])} />
        </g>
      ))}
      <rect x={250} y={856 - 6} width={220} height={12} rx={6} fill={RED} opacity={red * (1 - patch[2])} />
      {/* Đồng tiền và dấu cảnh báo trôi cạnh dòng số tiền, rồi sa xuống dòng. */}
      <G x={lerp(535, 430, dn)} y={856 + (1 - dn) * (-6 + bob * 0.5)} s={p(0, 0.6)}>
        <circle r={36} fill={GOLD} stroke={red > 0.5 ? RED : GOLDL} strokeWidth={6} />
        <circle r={20} fill="none" stroke={INK} strokeWidth={5} />
        <Box cx={0} cy={0} w={6} h={22} rx={3} fill={INK} />
        <G x={46} y={-44}>
          <path d="M0 -24 L24 18 L-24 18 Z" fill={red > 0.5 ? RED : GOLDL} />
          <Box cx={0} cy={2} w={5} h={14} rx={2} fill={INK} />
          <circle cy={13} r={3} fill={INK} />
        </G>
      </G>
      {/* AI và kính lúp; bạn ở góc dưới. */}
      <G x={840} y={780} s={p(0, 0.2)}><Inspector size={130} /></G>
      <G x={570} y={1085} s={p(0, 0.1)}><Person fill={TXT} /></G>
      {/* Miếng vá giấy bay từ bạn, dán đè từng chỗ. */}
      {targets.map((ty, k) => {
        const u = patch[k];
        if (u <= 0) return null;
        return (
          <G key={k} x={lerp(570, 360, u)} y={lerp(1030, ty, u) - 70 * Math.sin(Math.PI * u)} r={lerp(20, 0, u)}>
            <Box cx={0} cy={0} w={290} h={46} rx={10} fill={PAPER} stroke={GOLD} strokeWidth={4} />
            <Box cx={0} cy={0} w={200} h={8} rx={4} fill={SEC} />
          </G>
        );
      })}
      <G x={lerp(715, 495, mu)} y={lerp(820, 735 + 6 * sw(f, 6), mu)} s={0.8 * p(0, 0.35)}><Mag /></G>
      {/* Nút gửi; ngón tay bạn dừng phía trên, chưa bấm. */}
      <G x={330} y={1095} s={p(0, 0.3)}>
        <Box cx={0} cy={0} w={360} h={70} rx={35} fill={EL} stroke={GOLD} strokeWidth={5} />
        <path d="M-24 -18 L30 0 L-24 18 L-14 0 Z" fill={GOLD} />
      </G>
      <path d={`M505 1072 L${lerp(505, 430, press)} ${lerp(1072, 1055, press)}`} stroke={TXT} strokeWidth={22} strokeLinecap="round" opacity={press > 0 ? 1 : 0} />
      <circle cx={lerp(505, 430, press)} cy={lerp(1072, 1055, press)} r={16} fill={TXT} opacity={press > 0 ? 1 : 0} />
      <Floor y={1240} />
    </Stage>
  );
};

const Env: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={190} h={130} rx={12} fill={PAPER} stroke={GOLD} strokeWidth={4} />
    <path d="M-95 -65 L0 10 L95 -65" fill="none" stroke={GOLD} strokeWidth={6} strokeLinejoin="round" />
  </g>
);

/** Thẻ phòng ban: đồng tiền cho Kế toán, hộp hàng cho Thu mua, biểu đồ cột cho Tài chính. */
const Dept: React.FC<{ kind: number }> = ({ kind }) => (
  <g>
    <Box cx={0} cy={0} w={86} h={56} rx={12} fill={INK} stroke={GOLD} strokeWidth={4} />
    {kind === 0 && (
      <g>
        <circle r={18} fill={GOLD} />
        <circle r={10} fill="none" stroke={INK} strokeWidth={4} />
      </g>
    )}
    {kind === 1 && (
      <g>
        <Box cx={0} cy={0} w={42} h={30} rx={4} fill={GOLDL} />
        <Box cx={0} cy={0} w={8} h={30} fill={INK} opacity={0.6} />
      </g>
    )}
    {kind === 2 && [0, 1, 2].map((i) => <rect key={i} x={-20 + i * 14} y={14 - (10 + i * 8)} width={11} height={10 + i * 8} rx={2} fill={i === 2 ? GOLD : GOLDL} />)}
  </g>
);

/** Cảnh 17 — Mười lăm phút: đồng hồ quét một phần tư, ba món xếp chồng cho AI soi, rồi bài hướng dẫn và nút copy. */
export const MuoiLamPhutBaiHuongDan: React.FC = () => {
  const { f, p, l } = useT();
  const u = ez(l(0, 0.05, 20));
  const R = 186;
  const th = (u * Math.PI) / 2;
  const o0 = 1 - l(1, 0, 10);
  const o1 = 1 - l(2, 0, 10);
  const lift = ez(l(1, 0.4, 24));
  const sx = (k: number): number => ez(l(1, 0.04 + 0.1 * k, 16));
  const toX = lerp(lerp(-150, 275, sx(1)), 655, lift);
  const toY = lerp(690, 830, lift) - 110 * Math.sin(Math.PI * lift);
  const toS = lerp(0.75, 0.65, lift);
  const scan = ez(l(1, 0.55, 14));
  const va = ez(l(2, 0.08, 18));
  const pv = ez(l(2, 0.12, 18));
  const panelY = pv > 0 ? lerp(1750, 905, pv) : 1750;
  const tapIn = ez(l(2, 0.4, 14));
  const tapP = c01(l(2, 0.52, 10));
  const fly = ez(l(2, 0.62, 22));
  const pressed = l(2, 0.58, 6);
  const tipX = lerp(945, 888, tapIn) + 6 * Math.sin(Math.PI * tapP);
  const tipY = lerp(1040, 912, tapIn) - 14 * Math.sin(Math.PI * tapP);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={780} y={480} p={p(0, 0.3)} solid size={32} o={o0} />
      <Tag i={1} x={560} y={520} p={p(1, 0.2)} solid size={30} o={o1} />
      <Tag i={2} x={540} y={520} p={p(2, 0.3)} solid size={30} />
      <Tag i={3} x={540} y={630} p={p(2, 0.45)} solid size={30} />
      <Tag i={4} x={360} y={1135} p={p(2, 0.8)} solid size={28} />
    </>}>
      {/* Mặt đồng hồ quét một phần tư rồi dừng, tờ lịch tuần này bên dưới. */}
      <g opacity={o0}>
        <G x={400} y={480} s={p(0, 0)}>
          <Clock r={200} hour={0} minute={15 * u} />
          <path d={`M0 0 L0 ${-R} A${R} ${R} 0 0 1 ${R * Math.sin(th)} ${-R * Math.cos(th)} Z`} fill={GOLD} opacity={0.7} />
          <circle r={9} fill={INK} />
        </G>
        <G x={540} y={950} s={p(0, 0.25)}>
          <Box cx={0} cy={0} w={560} h={330} rx={20} fill={PAPER} />
          <rect x={-280} y={-165} width={560} height={56} rx={20} fill={GOLD} />
          <rect x={-280} y={-135} width={560} height={26} fill={GOLD} />
          {[-150, 150].map((x) => <circle key={x} cx={x} cy={-165} r={10} fill={INK} />)}
          {Array.from({ length: 28 }, (_, i) => (
            <Box key={i} cx={-210 + (i % 7) * 70} cy={-70 + Math.floor(i / 7) * 58} w={52} h={40} rx={8} fill={Math.floor(i / 7) === 1 ? GOLD : SEC} opacity={Math.floor(i / 7) === 1 ? 1 : 0.55} />
          ))}
          <Box cx={0} cy={-12} w={500} h={56} rx={14} fill="none" stroke={GOLDL} strokeWidth={5} />
        </G>
      </g>
      {/* Ba món xếp chồng; bạn nhấc tờ trình ra đặt trước AI, kính lúp quét, sếp đứng chờ. */}
      <g opacity={o1}>
        <G x={lerp(-150, 230, sx(2))} y={800} r={-5} s={1.4}><Doc w={150} h={200} n={5} /></G>
        <G x={toX} y={toY} s={toS} r={lerp(-3, 0, lift)}><To n={4} /></G>
        <G x={lerp(-150, 250, sx(0))} y={520} s={1.3} r={4}><Env /></G>
        <G x={410} y={1100} s={1.4 * p(1, 0.05)}><Person fill={TXT} /></G>
        <path d="M470 1085 L575 960" stroke={TXT} strokeWidth={20} strokeLinecap="round" opacity={lift} />
        <G x={850} y={560} s={1.5 * p(1, 0.1)}><Inspector size={130} /></G>
        <G x={lerp(780, 655 + 40 * sw(f, 9), scan)} y={lerp(700, 820 + 22 * sw(f, 7, 1), scan)} s={0.9 * p(1, 0.3)}><Mag /></G>
        <G x={lerp(1300, 915, ez(l(1, 0.6, 20)))} y={1040} s={1.3}><Boss /></G>
      </g>
      {/* Khung video thu lên trên; bên dưới là bài viết với cột mẫu câu lệnh. */}
      <G x={lerp(540, 320, va)} y={lerp(640, 330, va)} s={lerp(1.6, 1, va) * p(2, 0)}>
        <Box cx={0} cy={0} w={440} h={250} rx={26} fill={INK} stroke={GOLD} strokeWidth={6} />
        <path d="M-26 -36 L40 0 L-26 36 Z" fill={GOLD} />
        <Box cx={0} cy={96} w={380} h={10} rx={5} fill={HOV} />
        <Box cx={-60} cy={96} w={260} h={10} rx={5} fill={GOLD} />
      </G>
      <G x={790} y={330} s={p(2, 0.2)}>
        <Box cx={0} cy={0} w={380} h={250} rx={26} fill={EL} stroke={HOV} strokeWidth={5} />
        {[0, 1, 2].map((i) => <circle key={i} cx={-160 + i * 28} cy={-100} r={8} fill={i === 0 ? GOLD : HOV} />)}
      </G>
      {pv > 0 && (
        <G x={540} y={panelY}>
          <Box cx={0} cy={0} w={860} h={640} rx={30} fill={EL} stroke={HOV} strokeWidth={5} />
          <rect x={-430} y={-320} width={860} height={90} rx={30} fill={SURF} />
          <rect x={-430} y={-260} width={860} height={30} fill={SURF} />
          {[0, 1, 2].map((i) => <circle key={i} cx={-390 + i * 28} cy={-275} r={8} fill={i === 0 ? GOLD : HOV} />)}
          {[0, 1, 2].map((r) => {
            const y = -120 + r * 110;
            return (
              <G key={r} y={y} s={p(2, 0.25 + 0.1 * r)}>
                <Box cx={0} cy={0} w={780} h={92} rx={18} fill={SURF} stroke={r === 1 ? GOLD : HOV} strokeWidth={3} />
                <G x={-330}><Dept kind={r} /></G>
                <Lines x={-260} y={-20} w={360} n={2} gap={26} color={SEC} t={12} />
                <Box cx={340} cy={0} w={76} h={56} rx={14} fill={r === 1 && pressed > 0.5 ? GOLDL : GOLD} />
                <Box cx={334} cy={-5} w={22} h={26} rx={4} fill="none" stroke={INK} strokeWidth={4} />
                <Box cx={346} cy={6} w={22} h={26} rx={4} fill="none" stroke={INK} strokeWidth={4} />
              </G>
            );
          })}
        </G>
      )}
      {/* Ngón tay chạm đúng một lần vào một nút; câu lệnh bay sang khung chat. */}
      {tapIn > 0 && (
        <g>
          <path d={`M962 1105 L${tipX} ${tipY}`} stroke={TXT} strokeWidth={24} strokeLinecap="round" />
          <circle cx={tipX} cy={tipY} r={19} fill={TXT} />
        </g>
      )}
      {fly > 0 && (
        <G x={lerp(700, 790, fly) + 60 * Math.sin(Math.PI * fly)} y={lerp(895, 395, fly)}>
          <Box cx={0} cy={0} w={200} h={70} rx={20} fill={GOLD} />
          <Box cx={-14} cy={-12} w={130} h={12} rx={6} fill={INK} />
          <Box cx={-30} cy={14} w={100} h={12} rx={6} fill={INK} />
        </G>
      )}
      <Floor y={1240} />
    </Stage>
  );
};
