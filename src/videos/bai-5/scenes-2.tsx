import React from "react";
import { Arrow, Box, Bubble, Cross, EL, Floor, Folder, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, Question, RED, SEC, Spark, Stage, SURF, Tag, TXT, XL, lerp, useT } from "../shared/art";
import { FileIcon, Loop, MarkClaude, MarkGpt, Win } from "../bai-1/art";
import { Bot, Bug, Head } from "../bai-2/art";
import { Flag, GiftBox, NoSign, RedPen, Tick } from "../bai-4/art";
import { clamp01, Gem, NameTag, Sheet, SopBook, Stepper, Tangle, Conveyor, Week, Yawn } from "./art";

/** Hai ngăn trong hộp Skill: danh sách bước và danh sách điều cấm. */
const Panel: React.FC<{ kind: "buoc" | "cam" }> = ({ kind }) => (
  <g>
    <Box cx={0} cy={0} w={250} h={200} rx={18} fill={kind === "buoc" ? EL : "#2A1414"} stroke={kind === "buoc" ? GOLD : RED} strokeWidth={5} />
    {[0, 1, 2].map((k) => (
      <G key={k} x={-80} y={-55 + k * 55}>
        {kind === "buoc" ? (
          <>
            <circle r={18} fill={GOLD} />
            {Array.from({ length: k + 1 }, (_, d) => <circle key={d} cx={(d - k / 2) * 7} cy={0} r={2.8} fill={INK} />)}
          </>
        ) : (
          <>
            <circle r={18} fill={RED} />
            <rect x={-11} y={-4} width={22} height={8} rx={2} fill={TXT} />
          </>
        )}
        <rect x={32} y={-7} width={110 - k * 14} height={14} rx={7} fill={SEC} />
      </G>
    ))}
  </g>
);

/** Thẻ câu lệnh dài có đoạn được tô; hl là độ tô của đoạn tên (0..1). */
const Prompt: React.FC<{ w?: number; hl?: number; mark?: number }> = ({ w = 860, hl = 0, mark = 0 }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={150} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} />
    <circle cx={-w / 2 + 50} cy={-36} r={22} fill={GOLD} />
    <rect x={-w / 2 + 90} y={-46} width={w * 0.62} height={18} rx={9} fill={SEC} />
    <rect x={-w / 2 + 90} y={-10} width={w * 0.3} height={18} rx={9} fill={SEC} />
    <rect x={-w / 2 + 90 + w * 0.32} y={-14} width={w * 0.3 * hl} height={26} rx={9} fill={GOLD} />
    <rect x={-w / 2 + 90} y={26} width={w * 0.24} height={18} rx={9} fill={SEC} />
    <rect x={-w / 2 + 90 + w * 0.26} y={20} width={w * 0.36 * mark} height={30} rx={8} fill={GOLDL} opacity={0.85} />
    <rect x={-w / 2 + 90 + w * 0.64} y={26} width={w * 0.14} height={18} rx={9} fill={SEC} />
  </g>
);

/** Cảnh 6 — Bước một: làm cùng AI tới khi ưng ý; sửa ngay tại chỗ; nắn nót. */
export const BuocMot: React.FC = () => {
  const { f, p, l } = useT();
  const sheet = p(0, 0.1);
  const talk = l(1, 0, 8);
  const mergeIn = l(2, 0, 10);
  const pen = l(2, 0.16, 8);
  const merge = mergeIn * (1 - pen);
  const miss = l(2, 0.42, 10);
  const guess = l(2, 0.62, 10);
  const ban = l(2, 0.78, 8);
  const shine = l(3, 0.05, 30);
  const ok = l(3, 0.5, 10);
  const ping = Math.floor(f / 18) % 2;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={226} p={p(0, 0.02)} solid size={42} />
      <Tag i={1} x={540} y={430} p={p(0, 0.3)} size={36} o={1 - mergeIn} />
      <Tag i={2} x={540} y={430} p={p(2, 0.05)} solid color={RED} size={36} o={1 - ok} />
      <Tag i={3} x={470} y={590} p={p(2, 0.12)} solid color={RED} size={30} o={1 - miss} />
      <Tag i={4} x={790} y={770} p={p(2, 0.45)} solid color={RED} size={30} />
      <Tag i={5} x={220} y={890} p={p(2, 0.75)} solid color={RED} size={30} />
      <Tag i={6} x={540} y={430} p={p(3, 0.5)} solid color={XL} size={40} />
    </>}>
      <G x={540} y={330}><Stepper at={0} done={ok > 0.5 ? 1 : 0} /></G>
      <G x={540} y={700} s={sheet}><Sheet w={720} h={480} merge={merge} miss={4} shine={shine} /></G>
      {/* Bút đỏ chen vào tách hai cột. */}
      <G x={lerp(560, 535, pen)} y={lerp(420, 640, pen)} s={pen * 0.9} r={-20} o={1 - ok}><RedPen /></G>
      {/* Ô thiếu chứng từ: viền đỏ, tờ chứng từ bị gạch. */}
      <rect x={720} y={742} width={140} height={56} rx={8} fill="none" stroke={RED} strokeWidth={5} strokeDasharray="10 7" opacity={miss} />
      <G x={960} y={1000} s={miss * 0.7}>
        <Box cx={0} cy={0} w={110} h={140} rx={10} fill={PAPER} />
        <Lines x={-36} y={-40} w={72} n={4} gap={24} color={SEC} t={7} />
        <Cross r={44} />
      </G>
      {/* Robot định điền bừa bằng dấu hỏi thì bị chặn. */}
      <G x={170} y={1010} s={p(0, 0.2) * 0.6}><Bot arm={guess * 1.4} /></G>
      <G x={270} y={lerp(1000, 960, guess)} s={guess * 0.5}><Question color={GOLDL} /></G>
      <G x={272} y={950} s={ban}><Cross r={52} /></G>
      <G x={930} y={1070} s={p(0, 0.25) * 0.42}><g transform="scale(-1 1)"><Head fill={SURF} /></g></G>
      {/* Trao đổi qua lại như mọi khi. */}
      <G x={400} y={1060} s={talk * (ping ? 1 : 0.85) * 0.8}><Bubble w={220} h={80} fill={HOV} ink={TXT} /></G>
      <G x={700} y={1130} s={talk * (ping ? 0.85 : 1) * 0.8}><g transform="scale(-1 1)"><Bubble w={220} h={80} /></g></G>
      <G x={830} y={900} s={ok}><Tick r={56} /></G>
      {[[280, 520], [830, 520], [560, 930]].map(([x, y], k) => (
        <G key={k} x={x} y={y} s={ok * (0.5 + 0.3 * Math.sin(f / 4 + k))}><Spark r={26} fill={GOLDL} /></G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 7 — Bước hai: câu lệnh đúc kết thành kỹ năng có tên, ghi rõ từng bước và điều cấm, gọi tên là chạy. */
export const BuocHai: React.FC = () => {
  const { f, p, l } = useT();
  const fly = l(0, 0.3, 18);
  const card = p(1, 0);
  const hl = l(1, 0.55, 12);
  const tagFly = l(1, 0.75, 14);
  const panels = l(2, 0, 12);
  const pack = l(3, 0.05, 14);
  const call = l(3, 0.4, 12);
  const loop = l(3, 0.6, 30);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={226} p={p(0, 0.02)} solid size={42} />
      <Tag i={1} x={540} y={540} p={p(1, 0.1)} size={32} o={1 - panels} />
      <Tag i={2} x={790} y={840} p={p(1, 0.85)} solid size={30} />
      <Tag i={3} x={400} y={620} p={p(2, 0.1)} solid size={32} o={1 - pack} />
      <Tag i={4} x={690} y={620} p={p(2, 0.35)} solid color={RED} size={32} o={1 - pack} />
      <Tag i={5} x={540} y={640} p={p(3, 0.45)} solid color={XL} size={38} />
    </>}>
      <G x={540} y={330}><Stepper at={1} done={1} /></G>
      <G x={540} y={450} s={card}><Prompt hl={hl} /></G>
      {/* Bảng tính đã ưng ý bay vào hộp. */}
      <G x={lerp(200, 540, fly)} y={lerp(640, 900, fly)} s={p(0, 0) * lerp(0.42, 0.12, fly)} o={1 - clamp01(fly * 1.4 - 0.4)}><Sheet w={640} h={440} /></G>
      <G x={540} y={960} s={p(0, 0.1) * 1.35}>
        {call > 0.01 && <circle cy={20} r={220} fill={GOLDL} opacity={0.14 * call} />}
        <GiftBox lid={1 - pack} />
      </G>
      <G x={540} y={950} s={loop * 1.0}><Loop r={290} p={loop} /></G>
      {/* Tên trong câu lệnh bay ra thành thẻ tên treo hộp. */}
      <G x={lerp(560, 790, tagFly)} y={lerp(450, 840, tagFly)} s={tagFly} r={8}><NameTag w={280} /></G>
      {/* Hai ngăn: từng bước và điều cấm. */}
      <G x={lerp(400, 500, pack)} y={lerp(720, 950, pack)} s={panels * (1 - pack * 0.85)} o={1 - pack}><Panel kind="buoc" /></G>
      <G x={lerp(690, 580, pack)} y={lerp(720, 950, pack)} s={l(2, 0.3, 10) * (1 - pack * 0.85)} o={1 - pack}><Panel kind="cam" /></G>
      {/* Bong bóng gọi tên chạm vào thẻ tên. */}
      <G x={lerp(1000, 250, call)} y={1080} s={call * 0.8}>
        <Bubble w={260} h={90} n={0} />
        <G s={0.75}><NameTag w={220} string={false} /></G>
      </G>
      <G x={180} y={1060} s={p(0, 0.2) * 0.42}><Head fill={SURF} /></G>
      {[[300, 760], [800, 1100], [860, 700]].map(([x, y], k) => (
        <G key={k} x={x} y={y} s={call * (0.5 + 0.3 * Math.sin(f / 5 + k))}><Spark r={24} fill={GOLDL} /></G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 8 — Nhớ câu ghi rõ điều cấm: thiếu thì lỗi lọt qua; phần chặn lỗi đáng giá nhất. */
export const DieuCam: React.FC = () => {
  const { f, at, p, l } = useT();
  const mark = l(0, 0.08, 16);
  const books = p(1, 0);
  const rain = l(1, 0.15, 6);
  const gem = p(1, 0.72);
  const tf = Math.max(0, f - at(1, 0.15));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={600} y={250} p={p(0, 0.03)} solid size={40} />
      <Tag i={1} x={290} y={930} p={p(1, 0.15)} size={32} />
      <Tag i={2} x={780} y={540} p={p(1, 0.4)} solid color={XL} size={34} />
      <Tag i={3} x={780} y={990} p={p(1, 0.75)} solid size={34} />
    </>}>
      <G x={540} y={380} s={p(0, 0)}><Prompt mark={mark} /></G>
      <G x={830} y={385} s={l(0, 0.5, 10) * 0.8} r={10}><Flag color={RED} /></G>
      {/* Phóng to đoạn ghi rõ các điều cấm. */}
      <G x={540} y={760} s={p(0, 0.06) * (1 - books)}>
        <path d="M-120 -330 L-380 -160 M200 -330 L380 -160" stroke={GOLDL} strokeWidth={4} strokeDasharray="12 10" opacity={0.6} />
        <Box cx={0} cy={0} w={780} h={300} rx={30} fill={EL} stroke={GOLDL} strokeWidth={6} />
        <rect x={-340} y={-40} width={680} height={80} rx={16} fill={GOLDL} opacity={0.85 * mark} />
        {[0, 1, 2].map((k) => <G key={k} x={-220 + k * 220} y={0} s={mark * 0.6}><NoSign /></G>)}
        <rect x={-340} y={80} width={420} height={22} rx={11} fill={SEC} />
        <rect x={-340} y={-110} width={300} height={22} rx={11} fill={SEC} />
      </G>
      {/* Hai sổ: trái chỉ có bước, phải có điều cấm. */}
      <G x={290} y={770} s={books * 0.66}><SopBook open={1} steps={4} /></G>
      <G x={780} y={770} s={books * 0.66}><SopBook open={1} steps={4} cam={1} /></G>
      {/* Hàng rào biển cấm che sổ phải. */}
      {[0, 1, 2, 3].map((k) => (
        <G key={k} x={660 + k * 80} y={622} s={l(1, 0.3 + k * 0.04, 8) * 0.46}><NoSign /></G>
      ))}
      <rect x={620} y={646} width={320} height={12} rx={6} fill={RED} opacity={l(1, 0.3, 8)} />
      {/* Mưa lỗi: bên trái lọt qua rơi xuống đáy, bên phải bị chặn. */}
      {Array.from({ length: 6 }, (_, k) => {
        const ph = ((tf / 40 + k / 6) % 1 + 1) % 1;
        const yl = 470 + ph * 700;
        const yr = Math.min(470 + ph * 700, 590);
        return (
          <g key={k} opacity={rain}>
            <G x={190 + (k % 3) * 100} y={yl} s={0.34}><Bug /></G>
            <G x={690 + (k % 3) * 90} y={yr} s={0.34} o={ph > 0.25 ? clamp01(1 - (ph - 0.25) * 4) : 1}><Bug /></G>
          </g>
        );
      })}
      {[0, 1, 2, 3].map((k) => <G key={k} x={180 + k * 80} y={1170} s={rain * 0.3} r={k * 40}><Bug /></G>)}
      <G x={780} y={1090} s={gem * 0.95}>
        <circle r={110} fill={GOLDL} opacity={0.15} />
        <Gem />
      </G>
      {[[700, 1040], [880, 1140], [870, 1010]].map(([x, y], k) => (
        <G key={k} x={x} y={y} s={gem * (0.4 + 0.25 * Math.sin(f / 4 + k))}><Spark r={22} fill={GOLDL} /></G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 9 — Bước ba: mở Codex hoặc Claude Desktop, vào đúng thư mục, gọi tên với file; AI làm từ đầu đến cuối. */
export const BuocBa: React.FC = () => {
  const { f, p, l } = useT();
  const app = p(1, 0);
  const folder = l(1, 0.35, 10);
  const drop = l(1, 0.45, 12);
  const typed = l(1, 0.7, 12);
  const run = l(2, 0.05, 50) * 4;
  const done = l(2, 0.8, 10);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={226} p={p(0, 0.02)} solid size={42} />
      <Tag i={1} x={540} y={470} p={p(0, 0.2)} solid size={40} o={1 - app} />
      <Tag i={2} x={330} y={575} p={p(1, 0.05)} size={30} />
      <Tag i={3} x={380} y={680} p={p(1, 0.12)} size={30} />
      <Tag i={4} x={720} y={705} p={p(1, 0.35)} solid size={30} />
      <Tag i={5} x={700} y={790} p={p(1, 0.75)} size={28} />
      <Tag i={6} x={540} y={882} p={p(2, 0.05)} solid color={XL} size={38} />
    </>}>
      <G x={540} y={330}><Stepper at={2} done={2} /></G>
      {/* Cửa sổ app: hai dấu app, thư mục làm việc, ô gõ. */}
      <G x={540} y={640} s={app}>
        <Win w={860} h={400} stroke={GOLD}>
          <Box cx={0} cy={150} w={800} h={60} rx={30} fill={SURF} stroke={typed > 0.5 ? GOLD : HOV} strokeWidth={4} />
        </Win>
      </G>
      <G x={220} y={575} s={app}><MarkGpt r={38} /></G>
      <G x={220} y={680} s={app}><MarkClaude r={38} /></G>
      <G x={720} y={615} s={app * 0.9}><Folder open={folder} /></G>
      <G x={720} y={lerp(470, 600, drop)} s={drop * 0.55} o={clamp01(drop * 3)}><FileIcon fill={PAPER} /></G>
      <G x={300} y={790} s={typed * 0.6}><NameTag w={220} string={false} /></G>
      <G x={460} y={790} s={typed * 0.4}><FileIcon fill={PAPER} /></G>
      {/* Hộp Skill chờ ở góc, rồi băng chuyền chạy các bước. */}
      <G x={lerp(540, 860, app)} y={lerp(760, 1080, app)} s={p(0, 0.1) * lerp(1.3, 0.62, app) * (1 - done)}>
        <GiftBox lid={l(2, 0, 10)} />
        <G x={150} y={-70} s={0.7 * (1 - app)} r={12}><NameTag w={220} /></G>
      </G>
      <G x={520} y={1040} s={p(2, 0)}><Conveyor w={760} n={4} on={run} t={f} /></G>
      <G x={925} y={1100} s={done * 0.85}><Flag /></G>
      <G x={170} y={1060} s={p(0, 0.15) * 0.5} o={1 - l(2, 0, 8)}><Bot arm={0.4} /></G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 10 — Đừng bắt đầu phức tạp; chọn việc nhàm chán nhất tuần nào cũng lặp; kế toán đối soát sao kê. */
export const ViecNhamChan: React.FC = () => {
  const { f, p, l } = useT();
  const away = l(1, 0, 14);
  const weeks = l(1, 0.1, 10);
  const mark = l(1, 0.6, 10);
  const sheet = p(2, 0.05);
  const flags = l(2, 0.35, 20) * 3;
  const pack = l(2, 0.75, 12);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={232} p={p(0, 0.05)} solid color={RED} size={44} o={1 - away} />
      <Tag i={1} x={600} y={232} p={p(1, 0.2)} solid size={44} />
      <Tag i={2} x={600} y={850} p={p(1, 0.5)} size={34} o={1 - sheet} />
      <Tag i={3} x={820} y={880} p={p(2, 0.05)} solid size={38} />
      <Tag i={4} x={330} y={990} p={p(2, 0.4)} solid color={RED} size={30} />
    </>}>
      {/* Búi việc phức tạp bị gạch, rồi thu về góc. */}
      <G x={lerp(540, 170, away)} y={lerp(640, 330, away)} s={p(0, 0) * lerp(1.5, 0.55, away)}>
        <Tangle t={f} />
        <G s={l(0, 0.35, 8)}><Cross r={150} /></G>
      </G>
      {/* Bốn tuần, tuần nào cũng có đúng một khối việc giống hệt. */}
      {[0, 1, 2, 3].map((k) => (
        <G key={k} x={600} y={390 + k * 130} s={clamp01(weeks * 4 - k)}>
          <Week w={600} hl={2} mark={mark} />
        </G>
      ))}
      <G x={170} y={620} s={weeks * 0.8}><Yawn t={0.5 + 0.5 * Math.sin(f / 8)} /></G>
      {/* Tờ sao kê của kế toán: dòng lệch cắm cờ đỏ, rồi gói vào hộp. */}
      <G x={330} y={1010} s={sheet * 0.72}>
        <Sheet w={600} h={380} rows={6} />
        {[1, 3, 4].map((r, k) => (
          <G key={r} x={330} y={-120 + r * 41} s={clamp01(flags - k) * 0.7}><Flag color={RED} /></G>
        ))}
      </G>
      <Arrow x1={560} y1={1040} x2={700} y2={1060} p={pack} w={8} />
      <rect x={640} y={1160} width={340} height={22} rx={8} fill={GOLD} opacity={sheet} />
      <G x={820} y={1050} s={clamp01(pack * 1.5 - 0.3) * 0.75}><GiftBox /></G>
      <G x={900} y={1000} s={clamp01(pack * 1.5 - 0.5) * 0.6} r={12}><NameTag w={200} /></G>
      <Floor y={1240} />
    </Stage>
  );
};
