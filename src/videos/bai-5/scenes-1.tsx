import React from "react";
import { Arrow, Box, Bubble, Cross, EL, Floor, G, GOLD, GOLDL, Hand, HOV, INK, Lines, PAPER, Question, RED, SEC, Spark, Stage, SURF, Tag, TXT, XL, lerp, useT, Clock } from "../shared/art";
import { Calendar, Cursor, FileIcon, Win } from "../bai-1/art";
import { Bot, Head, Pen } from "../bai-2/art";
import { CodeWall } from "../bai-3/art";
import { GiftBox, NoSign, Tick } from "../bai-4/art";
import { Cabinet, clamp01, Medal, NameTag, Poster, PowerBar, SopBook, StopSign, Target, TaskCard, TimeGrid } from "./art";

/** Robot đeo huy chương "đã thạo việc". */
const Expert: React.FC<{ s?: number; arm?: number; children?: React.ReactNode }> = ({ s = 1, arm = 0, children }) => (
  <G s={s}>
    <Bot arm={arm} />
    <G y={150} s={0.8}><Medal /></G>
    {children}
  </G>
);

/** Tờ lịch xé: các trang bay khỏi lịch theo nhịp n trang mỗi giây. */
const TearCalendar: React.FC<{ t: number; on: number }> = ({ t, on }) => (
  <g>
    {on > 0.01 && [0, 1, 2].map((k) => {
      const ph = ((t / 14 + k / 3) % 1 + 1) % 1;
      return (
        <G key={k} x={30 + ph * 150} y={-40 - ph * 200} r={ph * 60} o={(1 - ph) * on}>
          <Box cx={0} cy={0} w={200} h={130} rx={12} fill={PAPER} />
          <Box cx={0} cy={-46} w={200} h={38} rx={12} fill={GOLD} />
          {[0, 1, 2].map((d) => <rect key={d} x={-70 + d * 50} y={-10} width={36} height={28} rx={5} fill={HOV} />)}
        </G>
      );
    })}
    <Calendar flip={on > 0.01 ? ((t / 14) % 1) : 0} />
  </g>
);

/** Cảnh 1 — Hook: robot đeo huy chương bị dạy lại như học trò; ba câu lệnh gõ lại y hệt mỗi sáng. */
export const MoiSang: React.FC = () => {
  const { f, at, p, l } = useT();
  const chat = l(1, 0, 12);
  const r1 = l(2, 0, 10);
  const r2 = l(3, 0, 10);
  const r3 = l(4, 0, 10);
  const drop = l(4, 0.35, 18);
  const again = l(5, 0, 8);
  const tf = Math.max(0, f - at(5, 0));
  const cyc = again > 0 ? (tf % 24) / 24 : 1;
  const tearOn = Math.max(1 - l(1, 0.2, 10), again);
  const tap = Math.floor(f / 10) % 3;
  const rows = [470, 620, 770];
  const lit = [r1, r2, r3];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={232} p={p(0, 0.02)} solid color={RED} size={52} />
      <Tag i={1} x={830} y={898} p={p(0, 0.3)} solid size={32} o={1 - chat} />
      <Tag i={2} x={430} y={845} p={p(1, 0.25)} size={30} o={1 - r1} />
      <Tag i={3} x={480} y={rows[0]} p={p(2, 0.05)} solid size={34} />
      <Tag i={4} x={480} y={rows[1]} p={p(3, 0.05)} solid size={34} />
      <Tag i={5} x={480} y={rows[2]} p={p(4, 0.05)} solid size={34} />
      <Tag i={6} x={820} y={866} p={p(4, 0.4)} size={30} />
      <Tag i={7} x={540} y={948} p={p(5, 0.1)} solid color={RED} size={36} />
    </>}>
      {/* Tấm bảng = cửa sổ chat với AI. */}
      <G x={540} y={600}>
        <Win w={860} h={560} stroke={chat > 0.5 ? GOLD : HOV}>
          <G x={-380} y={-252} s={0.32}><Spark r={40} fill={GOLD} /></G>
          {/* Ô gõ câu lệnh ở đáy cửa sổ. */}
          <Box cx={0} cy={245} w={800} h={50} rx={25} fill={SURF} stroke={HOV} strokeWidth={3} />
          <rect x={-380} y={238} width={lerp(0, 380, chat * (again > 0 ? cyc : 1 - r1))} height={14} rx={7} fill={GOLDL} opacity={0.7} />
          {Math.floor(f / 8) % 2 === 0 && <rect x={-380 + lerp(0, 380, chat * (again > 0 ? cyc : 1 - r1))} y={230} width={6} height={30} fill={GOLDL} />}
        </Win>
      </G>
      {rows.map((y, k) => {
        const on = lit[k];
        const w = 360 * (again > 0 ? clamp01(cyc * 3 - k) : 1);
        return (
          <g key={k}>
            {/* Xấp bản sao y hệt phía sau mỗi dòng. */}
            {[2, 1].map((d) => (
              <Box key={d} cx={480 + d * 10} cy={y + d * 10} w={360} h={74} rx={22} fill={HOV} opacity={chat * 0.35} />
            ))}
            <Box cx={480} cy={y} w={360} h={74} rx={22} fill={on > 0.5 ? GOLD : EL} stroke={HOV} strokeWidth={3} opacity={0.5 + 0.5 * Math.max(on, 1 - chat)} />
            {again > 0 && <rect x={300} y={y + 28} width={w} height={8} rx={4} fill={GOLDL} />}
            {on < 0.5 && <Lines x={320} y={y - 10} w={240} n={2} gap={22} color={SEC} t={8} />}
            {/* Que chỉ gõ từng dòng trong lúc dạy. */}
            {chat < 0.5 && tap === k && <circle cx={300} cy={y} r={18} fill={GOLDL} opacity={0.8} />}
          </g>
        );
      })}
      <G x={225} y={rows[0]} s={r1 * 0.48}><Calendar /></G>
      <G x={225} y={rows[1]} s={r2 * 0.85}><Target hit={l(3, 0.15, 10)} /></G>
      <G x={820} y={680} s={l(4, 0.2, 10)}><TimeGrid w={230} h={300} rows={4} /></G>
      {[0, 1, 2].map((k) => (
        <G key={k} x={lerp(205 + k * 0, 840, drop)} y={lerp(rows[2] - 30 + k * 30, 590 + k * 80, drop)} s={r3 * 0.75} r={(1 - drop) * (k - 1) * 12}>
          <TaskCard w={190} />
        </G>
      ))}
      {/* Que chỉ của người kể. */}
      <G o={1 - chat}>
        <line x1={540} y1={1010} x2={300} y2={rows[tap]} stroke={GOLD} strokeWidth={8} strokeLinecap="round" />
      </G>
      <G x={540} y={1110} s={0.5 * p(0, 0.05)}><Hand r={-30} /></G>
      {/* Lịch xé bay và mặt trời buổi sáng. */}
      <G x={350} y={985} s={p(0, 0.1) * 0.55}><circle r={60} fill={GOLDL} opacity={0.9} />{Array.from({ length: 8 }, (_, k) => <line key={k} y1={-74} y2={-100} stroke={GOLDL} strokeWidth={9} strokeLinecap="round" transform={`rotate(${k * 45 + f})`} />)}</G>
      <G x={205} y={1080} s={p(0, 0) * 0.82}><TearCalendar t={f} on={tearOn} /></G>
      <G x={205} y={1080} s={again}><g opacity={0.9}><circle r={112} fill="none" stroke={GOLD} strokeWidth={8} strokeDasharray="30 18" transform={`rotate(${tf * 6})`} /></g></G>
      {/* Robot đã thạo việc ngồi ngay ngắn như học trò. */}
      <G x={830} y={1010} s={p(0, 0.05) * 0.72}><Expert arm={0.2} /></G>
      <Box cx={830} cy={1150} w={300} h={34} rx={10} fill={GOLD} />
      <rect x={705} y={1166} width={16} height={70} fill={HOV} />
      <rect x={939} y={1166} width={16} height={70} fill={HOV} />
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 2 — Chạy tốt nhưng buồn cười: đào tạo lại mỗi sáng; dừng lại; đúc kết thành một cái tên: Skill. */
export const DatTen: React.FC = () => {
  const { f, p, l } = useT();
  const stack = Math.min(8, Math.floor(l(0, 0.35, 70) * 8));
  const stop = p(1, 0, 9);
  const gather = l(2, 0, 12);
  const fold = l(2, 0.35, 26);
  const type = l(3, 0, 16);
  const run = l(3, 0.55, 18);
  const glow = l(4, 0, 14);
  const old = 1 - gather;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={300} y={445} p={p(0, 0.05)} solid color={XL} size={40} o={old * (1 - stop)} />
      <Tag i={1} x={770} y={330} p={p(0, 0.6)} solid color={RED} size={40} o={old} />
      <Tag i={2} x={540} y={470} p={p(1, 0.05)} solid color={RED} size={48} o={old} />
      <Tag i={3} x={540} y={300} p={p(2, 0.15)} solid size={40} o={1 - type} />
      <Tag i={4} x={540} y={300} p={p(3, 0.1)} solid size={40} o={1 - glow} />
      <Tag i={5} x={540} y={232} p={p(4, 0.05)} solid size={84} />
      <Tag i={6} x={540} y={330} p={p(4, 0.3)} size={38} />
    </>}>
      {/* Robot đeo huy chương làm trơn tru, sau đó đứng sang trái. */}
      <G x={lerp(300, 190, gather)} y={lerp(720, 930, gather)} s={p(0, 0) * lerp(0.9, 0.72, gather)}>
        <Expert arm={0.4} />
        <G x={0} y={-170} s={l(0, 0.05, 10) * old}><Tick r={46} /></G>
      </G>
      {/* Chồng bài giảng giống hệt nhau, mỗi tờ một mặt trời. */}
      <G o={old}>
        {Array.from({ length: stack }, (_, k) => (
          <G key={k} x={770 + (k % 2) * 8} y={1150 - k * 80} s={p(0, 0.3 + k * 0.05)}>
            <Box cx={0} cy={0} w={300} h={70} rx={10} fill={k % 2 ? "#E6DCC8" : PAPER} stroke={HOV} strokeWidth={2} />
            <circle cx={-110} cy={0} r={20} fill={GOLD} />
            <Lines x={-70} y={-12} w={180} n={2} gap={22} color={SEC} t={8} />
          </G>
        ))}
        <G x={140} y={1110} s={0.5 * p(0, 0.5)}><Head fill={SURF} blush={0.7} /></G>
        <path d="M232 1010 q10 26 0 34 q-10 -8 0 -34 Z" fill="#7DD3FC" opacity={l(0, 0.7, 8)} />
        <G x={540} y={640} s={stop}><StopSign /></G>
      </G>
      {/* Ba thẻ bước gập vào hộp có nơ. */}
      {[0, 1, 2].map((k) => {
        const x0 = 250 + k * 290;
        const pop = clamp01(fold * 1.3 - 0.3);
        const out = run * (1 - 0);
        return (
          <G key={k} x={lerp(lerp(x0, 540, fold), 330 + k * 210, out)} y={lerp(lerp(560, 860, fold), 600, out)} s={gather * lerp(1, 0.2, fold * (1 - out)) * (out > 0 ? lerp(0.2, 0.75, out) : 1)} o={1 - pop * (1 - out)}>
            <Box cx={0} cy={0} w={200} h={170} rx={20} fill={EL} stroke={GOLD} strokeWidth={5} />
            {k === 0 && <G s={0.55}><Calendar /></G>}
            {k === 1 && <G s={0.9}><Target /></G>}
            {k === 2 && <G s={0.55}><TimeGrid w={260} h={220} rows={3} /></G>}
            <G x={80} y={-70} s={run}><Tick r={30} /></G>
          </G>
        );
      })}
      <G x={540} y={870} s={clamp01(fold * 1.5 - 0.3) * 1.3}>
        {glow > 0.01 && <circle cy={20} r={230} fill={GOLDL} opacity={0.16 * glow} />}
        <GiftBox lid={run} />
      </G>
      <G x={790} y={790} s={clamp01(fold * 1.5 - 0.5) * 0.9} r={10}><NameTag w={220} /></G>
      {/* Ô gõ chỉ còn đúng thẻ tên. */}
      <G x={540} y={445} s={p(3, 0)} o={1}>
        <Box cx={0} cy={0} w={820} h={100} rx={50} fill={EL} stroke={GOLD} strokeWidth={5} />
        <G x={lerp(-180, -150, type)} y={0} s={0.85}><NameTag w={220} string={false} /></G>
        <Box cx={340} cy={0} w={110} h={64} rx={14} fill={type > 0.9 ? GOLD : HOV} />
        <path d="M370 -12 V8 H318 M330 -4 L316 8 L330 20" fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      </G>
      {[[260, 640], [820, 600], [880, 1010], [210, 700], [700, 1130]].map(([x, y], k) => (
        <G key={k} x={x} y={y} s={glow * (0.5 + 0.3 * Math.sin(f / 5 + k))}><Spark r={28} fill={GOLDL} /></G>
      ))}
      <G x={880} y={1010} s={glow * 0.55}><Head fill={SURF} /></G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 3 — Hay nhầm Skill với file quy tắc; file quy tắc là nội quy dán tường, trả lời phải tuân thủ gì, chạy mọi lúc. */
export const NoiQuyTuong: React.FC = () => {
  const { f, p, l } = useT();
  const wall = l(1, 0, 14);
  const split = l(0, 0.7, 10);
  const cam = l(3, 0.05, 10);
  const roam = l(3, 0.3, 30);
  const rx = lerp(820, lerp(880, 560, 0.5 + 0.5 * Math.sin((f / 30) * Math.PI)), roam);
  const wob = Math.sin(f / 3) * 8 * (1 - split);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={430} p={p(0, 0.05)} solid color={RED} size={44} o={1 - wall} />
      <Tag i={1} x={290} y={950} p={p(0, 0.15)} solid size={40} o={1 - wall} />
      <Tag i={2} x={790} y={950} p={p(0, 0.3)} solid size={40} o={1 - wall} />
      <Tag i={3} x={540} y={232} p={p(1, 0.2)} solid size={46} />
      <Tag i={4} x={250} y={968} p={p(2, 0.1)} size={34} />
      <Tag i={5} x={830} y={400} p={p(3, 0.1)} solid color={RED} size={34} />
      <Tag i={6} x={815} y={480} p={p(3, 0.4)} solid color={XL} size={32} />
    </>}>
      {/* Hai thứ hay bị nhầm, dấu bằng lung lay rồi gãy. */}
      <G o={1 - wall}>
        <G x={290} y={700} s={p(0, 0) * 1.35}><GiftBox /></G>
        <G x={790} y={690} s={p(0, 0.1) * 2.9}><FileIcon fill={PAPER} /></G>
        <G x={775} y={570} s={p(0, 0.1) * 1.1}><Box cx={0} cy={0} w={150} h={30} rx={8} fill={RED} /></G>
        <G x={540} y={690} r={wob}>
          <rect x={-60} y={-30} width={120} height={20} rx={10} fill={GOLD} />
          <rect x={-60} y={12} width={120} height={20} rx={10} fill={GOLD} />
          <line x1={-40} y1={60} x2={40} y2={-60} stroke={RED} strokeWidth={16} strokeLinecap="round" opacity={split} />
        </G>
        <G x={540} y={570} s={(1 - split) * 0.6}><Question /></G>
      </G>
      {/* Bức tường gạch và tấm nội quy dán lên. */}
      <G o={wall}>
        <defs><clipPath id="b5-wall"><rect x={100} y={300} width={880} height={600} rx={12} /></clipPath></defs>
        <g clipPath="url(#b5-wall)">
        {Array.from({ length: 10 }, (_, r) =>
          Array.from({ length: 8 }, (_, c) => (
            <rect key={`${r}-${c}`} x={90 + c * 120 - (r % 2 ? 60 : 0)} y={300 + r * 60} width={112} height={52} rx={6} fill={r % 2 ? "#3A2E22" : "#46372A"} />
          )),
        )}
        </g>
        <G x={540} y={318} s={wall}>
          <rect x={-70} y={-20} width={140} height={24} rx={8} fill={HOV} />
          <path d="M-60 4 L-260 520 H260 L60 4 Z" fill={GOLDL} opacity={0.08 + 0.06 * cam} />
          <circle cy={8} r={16} fill={GOLDL} />
        </G>
      </G>
      <G x={540} y={575} s={wall}><Poster w={380} h={470} cam={cam} glow={cam} /></G>
      {/* Câu hỏi mà tấm nội quy trả lời. */}
      <G x={250} y={968} s={p(2, 0)}>
        <Box cx={0} cy={0} w={330} h={104} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} />
        <path d="M120 -50 L190 -150 L60 -50 Z" fill={EL} stroke={GOLD} strokeWidth={5} />
        <rect x={60} y={-54} width={70} height={10} fill={EL} />
      </G>
      {/* Robot đứng trước tường, đi tới đâu tấm nội quy vẫn chiếu tới đó. */}
      <G x={rx} y={1030} s={p(2, 0.2) * 0.62}><Bot arm={0.3} /></G>
      <path d={`M540 810 L${rx - 70} 1040 L${rx + 70} 1040 Z`} fill={GOLDL} opacity={0.14 * roam} />
      <G x={170} y={1120} s={cam * 0.6}><Clock r={80} hour={(f / 30) % 12} minute={(f * 6) % 60} /></G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 4 — Skill là sổ SOP trong ngăn kéo: các bước cụ thể, đúng một việc, chỉ chạy khi gọi đúng tên. */
export const SoSop: React.FC = () => {
  const { f, p, l } = useT();
  const o1 = l(0, 0.15, 14);
  const lift = l(1, 0, 16);
  const openB = l(1, 0.15, 14);
  const steps = l(1, 0.3, 30) * 4;
  const call = l(2, 0.45, 14);
  const bounce = l(2, 0.6, 10);
  const ticks = Math.floor(l(2, 0.75, 30) * 4);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={400} y={300} p={p(0, 0.05)} solid size={42} o={1 - l(1, 0, 8)} />
      <Tag i={1} x={760} y={300} p={p(1, 0.1)} size={38} o={1 - call} />
      <Tag i={2} x={760} y={760} p={p(2, 0.05)} solid size={38} />
      <Tag i={3} x={760} y={980} p={p(2, 0.5)} solid color={XL} size={38} />
    </>}>
      {/* Quyển sổ nhô lên từ ngăn trên cùng (vẽ trước tủ để mặt ngăn che chân sổ). */}
      <G x={340} y={lerp(640, 520, o1)} s={0.6 * (1 - lift)}><SopBook /></G>
      <G x={340} y={830} s={p(0, 0) * 1.1}>
        <Cabinet w={460} open={[o1 * (1 - lift * 0.5) + bounce * 0.3, 0, 0]} lit={0} />
      </G>
      {/* Nhãn riêng trên hai ngăn đóng; ngăn giữa có thẻ tên. */}
      <G x={340} y={830 + 1.1 * (-270 + 200 + 46)} s={p(0, 0.2) * 0.55}><NameTag w={200} string={false} fill={SEC} /></G>
      <G x={340} y={830 + 1.1 * (-270 + 370 + 46)} s={p(0, 0.25) * 0.55}><NameTag w={200} string={false} fill={SEC} /></G>
      <G x={340} y={830 + 1.1 * (-270 + 30 + 46) + o1 * 44} s={call * 0.6}><NameTag w={200} string={false} /></G>
      {/* Quyển sổ SOP từ ngăn kéo bay lên, mở ra các bước. */}
      <G x={lerp(340, 760, lift)} y={lerp(520, 560, lift)} s={lerp(0.6, 0.8, lift)} o={clamp01(lift * 4)}>
        <SopBook open={lerp(0, 1, openB)} steps={steps} ticks={ticks} />
      </G>
      <G x={760} y={330} s={p(1, 0) * (1 - call)}>
        <Box cx={0} cy={0} w={380} h={100} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} />
        <path d="M-20 50 L-50 100 L30 50 Z" fill={EL} stroke={GOLD} strokeWidth={5} />
        <rect x={-30} y={46} width={50} height={8} fill={EL} />
      </G>
      {/* Bong bóng gọi đúng tên bay tới ngăn kéo. */}
      <G x={lerp(980, 760, call)} y={880} s={call}>
        <Bubble w={300} h={100} n={0} />
        <G x={0} y={0} s={0.85}><NameTag w={220} string={false} /></G>
      </G>
      <Arrow x1={605} y1={880} x2={585} y2={640} p={bounce} w={8} />
      <G x={920} y={1090} s={bounce * 0.5}><Bot arm={0.6} /></G>
      {[0, 1, 2].map((k) => (
        <G key={k} x={590 + k * 20} y={560 - k * 50} s={bounce * (0.35 + 0.15 * Math.sin(f / 4 + k))}><Spark r={22} fill={GOLDL} /></G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 5 — Cần cả hai; nội quy làm nền cho sổ SOP; không cần lập trình, AI tự đúc kết. */
export const CaHai: React.FC = () => {
  const { f, p, l } = useT();
  const slab = l(1, 0.05, 20);
  const pow = l(1, 0.4, 24);
  const nocode = l(2, 0.3, 10);
  const write = l(3, 0.1, 40);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={240} p={p(0, 0.05)} solid size={46} o={1 - slab} />
      <Tag i={1} x={460} y={792} p={p(1, 0.3)} solid size={36} />
      <Tag i={2} x={820} y={240} p={p(1, 0.6)} solid color={XL} size={38} />
      <Tag i={3} x={300} y={872} p={p(2, 0.05)} solid color={RED} size={36} />
      <Tag i={4} x={780} y={872} p={p(3, 0.05)} solid size={36} />
    </>}>
      {/* Nội quy dán tường bên trái, tủ SOP bên phải; nội quy trượt xuống thành bệ. */}
      <G x={lerp(260, 460, slab)} y={lerp(540, 720, slab)}>
        <g transform={`scale(${lerp(0.78, 1.15, slab)} ${lerp(0.78, 0.12, slab)})`}>
          <Poster w={380} h={460} cam={1} glow={1 - slab} />
        </g>
      </G>
      <G x={540} y={530} s={p(0, 0.15) * (1 - slab)}>
        <rect x={-50} y={-12} width={100} height={24} rx={10} fill={GOLD} />
        <rect x={-12} y={-50} width={24} height={100} rx={10} fill={GOLD} />
      </G>
      <G x={820} y={560} s={p(0, 0.25) * 0.6 * (1 - slab)}><Cabinet open={[0, 0.6, 0]} lit={1} /></G>
      <G x={lerp(820, 460, slab)} y={lerp(560, 560, slab)} s={lerp(0.45, 0.62, slab) * p(0, 0.3)}><SopBook /></G>
      <G x={820} y={540} s={l(1, 0.35, 10)}><PowerBar h={360} v={pow} /></G>
      {pow > 0.95 && [0, 1, 2].map((k) => (
        <G key={k} x={820 + (k - 1) * 70} y={330 - (k % 2) * 30} s={0.5 + 0.2 * Math.sin(f / 4 + k)}><Spark r={22} fill={GOLDL} /></G>
      ))}
      <line x1={110} x2={970} y1={830} y2={830} stroke={HOV} strokeWidth={4} strokeDasharray="16 14" opacity={p(2, 0)} />
      {/* Không cần lập trình: tường mã và bàn phím bị gạch. */}
      <G x={300} y={1040} s={p(2, 0)}>
        <CodeWall w={380} h={220} rows={9} />
        <G y={150}>
          <Box cx={0} cy={0} w={360} h={70} rx={12} fill={HOV} />
          {Array.from({ length: 18 }, (_, k) => <rect key={k} x={-165 + (k % 9) * 37} y={-26 + Math.floor(k / 9) * 28} width={30} height={22} rx={4} fill={SEC} />)}
        </G>
        <G s={nocode} y={60}><Cross r={150} /></G>
      </G>
      {/* AI tự đúc kết: robot cầm bút tự viết sổ SOP. */}
      <G x={700} y={1060} s={p(3, 0) * 0.62}>
        <SopBook open={1} steps={write * 4} />
      </G>
      <G x={880} y={980} s={p(3, 0.05) * 0.55}>
        <Bot arm={1.2} />
      </G>
      <G x={lerp(650, 790, (f % 20) / 20 * write)} y={1000 + Math.floor(write * 4) * 40} s={p(3, 0.1) * 0.7} r={30}><Pen /></G>
      <Floor y={1240} />
    </Stage>
  );
};
