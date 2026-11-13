import React from "react";
import { Arrow, Box, Cross, EL, Floor, G, GOLD, GOLDL, Hand, HOV, INK, Lines, Lock, Mag, PAPER, Person, Question, RED, SEC, Stamp, SURF, TXT, lerp, useT } from "../shared/art";
import {
  Ban, Battery, Briefcase, ChatWin, clamp01, Coin, Compass, Corner, CornerTile, Crowd, Diamond, Drill, Funnel, Gauge, Ghost, Guy, Hourglass, House,
  MarkGem, Mic, Mini, Moon, MonthPage, Network, Office, Paper, Pause, Phone, PromptCard, Radio, Stairs, Talk, Target, Warn, Cabinet,
  Stage, Tag,
} from "./art";
import { Cursor, MarkClaude, MarkGpt } from "../bai-1/art";
import { Heart, Shield, Star } from "../bai-4/art";

/** Cảnh 14 — Phiếu chấm năm phút; ba tháng gần đây; ba ô chọn và nút tạm dừng. */
export const TuCham: React.FC = () => {
  const { f, p, l } = useT();
  const sheet = l(0, 0, 18);
  const rows = l(1, 0.05, 30);
  const cal = l(1, 0.3, 20);
  const opts = l(2, 0.05, 16);
  const pulse = 0.85 + 0.15 * Math.sin(f / 5);
  const sand = clamp01(l(0, 0.1, 300));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.1)} solid size={48} />
      {/* Cột trái: đồng hồ cát, dấu chân, lịch, nút dừng; phiếu chấm bên phải, không chạm nhau. */}
      <Tag i={1} x={215} y={300} p={p(0, 0.4)} size={38} />
      <Tag i={2} x={215} y={1010} p={p(1, 0.35)} solid size={34} />
      <Tag i={3} x={215} y={680} p={p(1, 0.6)} size={32} />
      {[0, 1, 2].map((k) => <Tag key={k} i={4 + k} x={760 + k * 80} y={445} p={l(2, 0.1 + k * 0.08, 8)} solid size={36} />)}
    </>}>
      {/* Phiếu chấm lớn. */}
      <G x={660} y={lerp(1400, 720, sheet)}>
        <Box cx={0} cy={0} w={640} h={760} rx={30} fill={PAPER} />
        <rect x={-320} y={-380} width={640} height={80} rx={30} fill={GOLD} />
        <rect x={-320} y={-330} width={640} height={30} fill={GOLD} />
        <rect x={-260} y={-356} width={260} height={18} rx={9} fill={INK} opacity={0.6} />
        {[0, 1, 2, 3].map((k) => {
          const v = clamp01(rows * 4 - k);
          const y = -200 + k * 150;
          return (
            <G key={k} x={0} y={y} o={v}>
              <G x={-240} y={10} s={0.48}><Corner k={k} color={INK} t={f} /></G>
              <rect x={-170} y={-20} width={180} height={14} rx={7} fill={SEC} />
              <rect x={-170} y={8} width={120} height={10} rx={5} fill={HOV} opacity={0.5} />
              {[0, 1, 2].map((j) => (
                <G key={j} x={100 + j * 80} y={0} s={k === 0 ? 1 + opts * 0.25 : 1}>
                  <circle r={26} fill={k === 0 && opts > 0.5 ? INK : "none"} stroke={k === 0 && opts > 0.5 ? GOLD : SEC} strokeWidth={6} />
                </G>
              ))}
              <line x1={-280} x2={280} y1={70} y2={70} stroke={HOV} strokeWidth={2} opacity={0.4} />
            </G>
          );
        })}
      </G>
      <G x={215} y={430} s={p(0, 0.35) * 0.7}><Hourglass p={sand} /></G>
      {/* Ba tờ lịch tháng lật, dấu chân việc đã làm. */}
      <G x={215} y={860} o={cal}>
        {[2, 1, 0].map((k) => (
          <G key={k} x={-k * 16} y={-k * 16} r={k === 0 ? lerp(0, -8, cal) : -k * 3}>
            <MonthPage w={220} h={200} marks={k === 0 ? Math.round(lerp(0, 18, cal)) : 12} />
          </G>
        ))}
      </G>
      <G x={150} y={600} s={cal}>
        {[0, 1, 2].map((k) => (
          <G key={k} x={k * 50} y={-k * 40} r={-20} o={clamp01(cal * 3 - k)}>
            <ellipse rx={14} ry={22} fill={GOLDL} />
            <circle cx={-6} cy={-30} r={5} fill={GOLDL} />
            <circle cx={6} cy={-30} r={5} fill={GOLDL} />
          </G>
        ))}
      </G>
      {/* Nút tạm dừng. */}
      <G x={215} y={1150} s={opts * pulse}><Pause s={1} /></G>
    </Stage>
  );
};

/** Ba ô lựa chọn cho một góc: art là hình của từng level. */
const OptionRow: React.FC<{ k: number; y: number; v: number[]; art: React.ReactNode[]; t: number }> = ({ k, y, v, art, t }) => (
  <G y={y}>
    <G x={150} y={0} s={0.9}><CornerTile k={k} w={150} h={300} lit={1} t={t} /></G>
    {[0, 1, 2].map((j) => {
      const on = v[j];
      return (
        <G key={j} x={370 + j * 240} y={0}>
          {/* Ô trống chờ sẵn để khung không hụt; lựa chọn mở ra đè đúng chỗ. */}
          <Box cx={0} cy={0} w={226} h={320} rx={26} fill="none" stroke={HOV} strokeWidth={4} strokeDasharray="14 12" opacity={1 - clamp01(on * 2)} />
          <G s={lerp(0.6, 1, on)} o={clamp01(on * 2)}>
          <Box cx={0} cy={0} w={226} h={320} rx={26} fill={on > 0.5 ? "#1F1C14" : SURF} stroke={GOLD} strokeWidth={5} />
          <G x={0} y={-130}><Radio on={on} s={0.9} /></G>
          <G y={10} s={1.15}>{art[j]}</G>
          </G>
        </G>
      );
    })}
  </G>
);

const Sheet2: React.FC<{ corners: [number, number]; arts: React.ReactNode[][] }> = ({ corners, arts }) => {
  const { f, p, l } = useT();
  const v = [0, 1, 2, 3, 4, 5].map((i) => l(i, 0.08, 12));
  const Y = [460, 920];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={150} y={Y[0] + 100} p={p(0, 0)} solid size={28} />
      <Tag i={1} x={150} y={Y[1] + 100} p={p(3, 0)} solid size={28} />
      {[0, 1, 2].map((j) => <Tag key={j} i={2 + j} x={370 + j * 240} y={250} p={p(0, 0.02 + j * 0.05)} solid size={38} />)}
      {[0, 1, 2].map((j) => <Tag key={`a${j}`} i={5 + j} x={370 + j * 240} y={Y[0] + 200} p={v[j]} size={26} w={220} />)}
      {[0, 1, 2].map((j) => <Tag key={`b${j}`} i={8 + j} x={370 + j * 240} y={Y[1] + 200} p={v[3 + j]} size={26} w={220} />)}
    </>}>
      <line x1={60} x2={1020} y1={720} y2={720} stroke={HOV} strokeWidth={3} strokeDasharray="10 10" />
      <OptionRow k={corners[0]} y={Y[0]} v={[v[0], v[1], v[2]]} art={arts[0]} t={f} />
      <OptionRow k={corners[1]} y={Y[1]} v={[v[3], v[4], v[5]]} art={arts[1]} t={f} />
    </Stage>
  );
};

/** Cảnh 15 — Tự chấm Tâm trí và Thể chất: ba ô mở lần lượt. */
export const Cham1: React.FC = () => {
  const { f } = useT();
  return (
    <Sheet2
      corners={[0, 1]}
      arts={[
        [
          <G key="a"><Crowd n={3} gap={46} s={0.75} color={HOV} /><G y={60} s={0.6}><Mini color={GOLDL} /></G><Arrow x1={-70} y1={-60} x2={-10} y2={20} color={SEC} w={5} /><Arrow x1={70} y1={-60} x2={10} y2={20} color={SEC} w={5} /></G>,
          <G key="b"><G x={-40} y={20} s={0.8}><Mini color={GOLDL} /></G><G x={40} y={10}><Box cx={0} cy={0} w={60} h={74} rx={8} fill={TXT} /><Lines x={-20} y={-20} w={40} n={3} gap={16} color={SEC} t={6} /></G></G>,
          <G key="c"><G y={40} s={0.7}><Mini color={GOLDL} /></G><Arrow x1={-10} y1={-10} x2={-70} y2={-50} color={GOLD} w={6} /><Arrow x1={10} y1={-10} x2={70} y2={-50} color={GOLDL} w={6} /><G x={70} y={50} s={0.4}><Paper w={110} h={130} n={3} /></G></G>,
        ],
        [
          <G key="a"><Moon r={30} color={SEC} /><G x={56} y={20} s={0.5}><Box cx={0} cy={0} w={90} h={60} rx={10} fill={SEC} /></G><G x={-50} y={40} s={0.35}><Warn color={RED} /></G></G>,
          <G key="b"><G x={-40} y={-10} s={0.55}><MonthPage w={150} h={140} marks={14} /></G><G x={50} y={30}><circle r={34} fill={TXT} /><path d="M-34 0 H34 M0 -34 V34" stroke={SEC} strokeWidth={4} /></G></G>,
          <G key="c"><Box cx={0} cy={60} w={160} h={22} rx={8} fill={GOLD} /><G y={50} s={0.6}><Mini color={GOLDL} /></G>{[-1, 1].map((d) => <G key={d} x={d * 70} y={-20} r={f * 2 * d}><circle r={18} fill="none" stroke={GOLD} strokeWidth={6} strokeDasharray="10 6" /></G>)}</G>,
        ],
      ]}
    />
  );
};

/** Cảnh 16 — Tự chấm Tinh thần và Sự nghiệp. */
export const Cham2: React.FC = () => {
  const { f } = useT();
  return (
    <Sheet2
      corners={[2, 3]}
      arts={[
        [
          <G key="a"><Crowd n={3} gap={50} s={0.7} color={SEC} /><G y={10} s={0.7}><Mini color={GOLDL} /></G>{[-1, 1].map((d) => <G key={d} x={d * 60} y={-80} s={0.4}><Talk w={120} h={60} n={1} /></G>)}</G>,
          <G key="b"><G x={-50} y={0} s={0.6}><Diamond /></G>{[0, 1].map((k) => <G key={k} x={40 + k * 40} y={30 - k * 50} s={0.5}><Mini color={TXT} /></G>)}<line x1={-20} y1={0} x2={50} y2={0} stroke={GOLD} strokeWidth={4} /></G>,
          <G key="c"><circle r={70} fill="none" stroke={GOLD} strokeWidth={5} />{Array.from({ length: 6 }, (_, k) => <G key={k} x={Math.cos(k * 1.05) * 70} y={Math.sin(k * 1.05) * 70 + 14} s={0.32}><Mini color={TXT} /></G>)}<G s={0.5}><Box cx={0} cy={0} w={70} h={56} rx={8} fill={GOLD} /></G></G>,
        ],
        [
          <G key="a"><G x={-40}><circle r={36} fill={TXT} stroke={GOLD} strokeWidth={4} /><line x1={0} y1={0} x2={0} y2={-24} stroke={INK} strokeWidth={5} transform={`rotate(${f * 6})`} /></G><Arrow x1={4} y1={0} x2={40} y2={0} color={GOLD} w={5} /><G x={66}><Coin s={0.7} /></G></G>,
          <G key="b"><G x={-90} y={50}><Stairs n={3} step={40} rise={26} lit={[1, 1, 1]} /></G><G x={50} y={-30}><Target s={0.5} /></G><G x={60} y={50}><Box cx={0} cy={0} w={60} h={30} rx={6} fill={SEC} /></G></G>,
          <G key="c"><G x={-40} y={0} s={0.3}><Network p={1} /></G>{[0, 1, 2].map((k) => <G key={k} x={60} y={-40 + k * 40} s={0.3}><Mini color={TXT} /></G>)}<G x={-70} y={60} s={0.4}><Ban r={50} color={RED} /></G></G>,
        ],
      ]}
    />
  );
};

/** Cảnh 17 — Điểm rơi qua phễu thành trung bình; vạch xuất phát; mũi khoan đào vào hành vi thật. */
export const TinhDiem: React.FC = () => {
  const { f, p, l } = useT();
  const fall = l(0, 0.1, 30);
  const avg = l(0, 0.75, 16);
  const start = l(1, 0, 16);
  const dig = l(2, 0.05, 40);
  return (
    <Stage bg={INK} fit={{ s: 1.1, dy: 40 }} overlay={<>
      {[0, 1, 2].map((k) => <Tag key={k} i={k} x={250 + k * 290} y={240} p={p(0, 0.05 + k * 0.08)} solid size={38} />)}
      <Tag i={3} x={540} y={780} p={p(0, 0.75)} solid size={40} o={1 - start} />
      <Tag i={4} x={250} y={530} p={p(1, 0.2)} solid size={40} />
      <Tag i={5} x={760} y={1100} p={p(2, 0.5)} solid size={40} />
    </>}>
      <G o={1 - start}>
        {[0, 1, 2, 3].map((k) => (
          <G key={k} x={lerp(220 + k * 210, 540, fall)} y={lerp(380, 520, fall)} s={lerp(1, 0.4, fall)} o={1 - clamp01(fall * 1.5 - 0.5)}>
            <circle r={44} fill={GOLD} />
            <G s={0.5}><Corner k={k} color={INK} /></G>
          </G>
        ))}
        <G x={540} y={560} s={p(0, 0.05)}><Funnel s={1.4} /></G>
        <G x={540} y={900} s={avg * 1.4}><Gauge v={0.5} /></G>
      </G>
      {/* Vạch xuất phát và đồng hồ đo thu nhỏ. */}
      <G o={start}>
        <G x={250} y={470}>
          <rect x={-160} y={-14} width={320} height={28} fill={TXT} />
          {Array.from({ length: 10 }, (_, k) => <rect key={k} x={-160 + k * 32} y={-14} width={16} height={14} fill={INK} />)}
          <G y={-120} s={0.9}><Gauge v={0.5} /></G>
        </G>
        <line x1={420} x2={1000} y1={470} y2={470} stroke={HOV} strokeWidth={6} strokeDasharray="20 16" />
      </G>
      {/* AI khoan sâu vào lớp hành vi. */}
      <G o={dig}>
        <G x={250} y={840} s={0.85}><ChatWin w={380} h={300}><G x={-30} y={0}><Talk w={240} h={60} n={1} /></G></ChatWin></G>
        {[0, 1, 2].map((k) => <rect key={k} x={480} y={620 + k * 140} width={520} height={130} rx={14} fill={k % 2 ? "#3A2E1B" : "#2E2618"} />)}
        <G x={570} y={685} s={0.7}><Moon r={40} color={GOLDL} /></G>
        <G x={900} y={825} s={0.8}><Box cx={0} cy={0} w={90} h={70} rx={10} fill={TXT} /><path d="M0 -35 V35" stroke={SEC} strokeWidth={4} /></G>
        <G x={600} y={965} s={0.8}><Box cx={0} cy={0} w={110} h={70} rx={12} fill={GOLD} /></G>
        <G x={900} y={985} s={0.7}><Crowd n={2} gap={50} color={TXT} /></G>
        <G x={760} y={lerp(520, 1040, dig)}><Drill s={0.9} rot={f * 6} /></G>
      </G>
    </Stage>
  );
};

/** Cảnh 18 — Hai cửa sổ Claude, Gemini; mạch hội thoại dài; vé miễn phí bị ngắt, vé trả phí chạy hết; thêm ChatGPT. */
export const ChonAi: React.FC = () => {
  const { f, p, l } = useT();
  const two = l(0, 0, 16);
  const thread = l(1, 0.05, 40);
  const tix = l(2, 0, 16);
  const cut = l(2, 0.3, 30);
  const gpt = l(3, 0, 16);
  const X = [lerp(290, 200, gpt), lerp(790, 540, gpt), 880];
  return (
    <Stage bg={INK} fit={{ dy: 60 }} overlay={<>
      <Tag i={0} x={X[0]} y={215} p={p(0, 0.1)} solid size={42} />
      <Tag i={1} x={X[1]} y={215} p={p(0, 0.3)} solid size={42} />
      <Tag i={2} x={X[0]} y={280} p={p(0, 0.15)} size={28} />
      <Tag i={3} x={X[1]} y={280} p={p(0, 0.35)} size={28} />
      <Tag i={4} x={540} y={760} p={p(1, 0.2)} solid size={38} o={1 - tix} />
      <Tag i={5} x={540} y={830} p={p(1, 0.6)} size={36} o={1 - tix} />
      <Tag i={6} x={290} y={1070} p={p(2, 0.05)} size={36} />
      <Tag i={7} x={790} y={1070} p={p(2, 0.15)} solid size={36} />
      <Tag i={8} x={290} y={830} p={p(2, 0.5)} solid color={RED} size={34} />
      <Tag i={9} x={880} y={215} p={p(3, 0.2)} solid size={42} />
    </>}>
      {[0, 1].map((k) => (
        <G key={k} x={X[k]} y={500} s={two * lerp(1.05, 0.74, gpt)}>
          <ChatWin w={420} h={380} mark={k === 0 ? <MarkClaude r={44} /> : <MarkGem r={44} />}>
            {Array.from({ length: 5 }, (_, j) => (
              <G key={j} x={j % 2 ? 50 : -50} y={-110 + j * 50} s={clamp01(thread * 5 - j) * 0.55}>
                <Talk w={300} h={56} me={j % 2 === 1} n={1} />
              </G>
            ))}
            <G x={150} y={90} s={clamp01(thread * 2 - 1) * 0.45}><Paper w={120} h={150} n={4} head={GOLD} /></G>
          </ChatWin>
        </G>
      ))}
      <G x={880} y={500} s={gpt * 0.74}>
        <ChatWin w={420} h={380} mark={<MarkGpt r={44} />}>
          <G y={10}><Talk w={300} h={56} n={1} /></G>
        </ChatWin>
      </G>
      {gpt > 0.01 && [0, 1, 2].map((k) => (
        <G key={k} x={lerp(540, X[k] ?? 880, gpt)} y={lerp(900, 700, gpt)} s={0.3} o={gpt}><PromptCard w={260} h={320} /></G>
      ))}
      {/* Hai vé. */}
      {[0, 1].map((k) => (
        <G key={k} x={k ? 790 : 290} y={960} s={tix * (1 - gpt * 0.25)}>
          <Box cx={0} cy={0} w={400} h={160} rx={24} fill={k ? "#2E2618" : SURF} stroke={k ? GOLD : HOV} strokeWidth={6} />
          {[-1, 1].map((d) => <circle key={d} cx={d * 200} cy={0} r={24} fill={INK} />)}
          <line x1={-150} x2={lerp(-150, k ? 150 : 20, cut)} y1={0} y2={0} stroke={k ? GOLD : SEC} strokeWidth={12} strokeLinecap="round" />
          {!k && cut > 0.6 && <G x={60} y={0} s={(cut - 0.6) * 2.5 * 0.5}><Cross r={40} /></G>}
          {k === 1 && cut > 0.95 && <G x={170} y={0} s={0.4}><Stamp r={60} color={GOLDL} /></G>}
        </G>
      ))}
    </Stage>
  );
};

/** Cảnh 19 — Nhật ký vào ngăn trí nhớ bị khoá; Claude: bấm con ma góc trên phải; Gemini: chat tạm thời, đếm ngược 72 giờ. */
export const RiengTu: React.FC = () => {
  const { f, p, l } = useT();
  const diary = l(0, 0, 30);
  const lock = l(0, 0.6, 12);
  const claude = l(1, 0, 16);
  const cur = l(1, 0.15, 30);
  const click = l(1, 0.45, 8);
  const gem = l(2, 0, 16);
  const tmp = l(2, 0.3, 8);
  const hold = clamp01(l(2, 0.5, 60));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.2)} solid size={44} />
      <Tag i={1} x={160} y={700} p={p(1, 0.08)} size={30} />
      <Tag i={2} x={470} y={360} p={p(1, 0.42)} solid size={32} />
      <Tag i={3} x={300} y={300} p={p(1, 0.3)} size={28} />
      <Tag i={4} x={290} y={1070} p={p(1, 0.6)} solid size={36} />
      <Tag i={5} x={790} y={500} p={p(2, 0.3)} solid size={32} />
      <Tag i={6} x={790} y={1070} p={p(2, 0.6)} solid size={36} />
    </>}>
      {/* Nhật ký và ngăn kéo trí nhớ. */}
      <G o={1 - claude}>
        <G x={300} y={650} s={1.1}>
          <Box cx={-90} cy={0} w={180} h={240} rx={12} fill={PAPER} />
          <Box cx={90} cy={0} w={180} h={240} rx={12} fill={PAPER} />
          <rect x={-6} y={-120} width={12} height={240} fill={GOLD} />
          <Lines x={-160} y={-80} w={140} n={5} gap={34} color={SEC} t={8} />
          <G x={90} y={-30}><Heart s={0.6} color={RED} /></G>
        </G>
        {[0, 1, 2].map((k) => {
          const t = clamp01(diary * 1.5 - k * 0.25);
          return <G key={k} x={lerp(330, 780, t)} y={lerp(650, 700 - k * 10, t) - Math.sin(t * Math.PI) * 160} r={t * 20} s={lerp(0.6, 0.3, t)} o={t < 0.98 ? 1 : 0}><Paper w={140} h={180} n={4} /></G>;
        })}
        <G x={790} y={700}>
          <Box cx={0} cy={0} w={280} h={300} rx={20} fill={HOV} />
          <Box cx={0} cy={-60} w={240} h={110} rx={12} fill={EL} stroke={SEC} strokeWidth={4} />
          <Box cx={0} cy={70} w={240} h={110} rx={12} fill={EL} stroke={SEC} strokeWidth={4} />
          <G y={-160} s={0.5}><Corner k={0} color={SEC} /></G>
          <G x={0} y={-50} s={lock * 1.2}><Lock color={GOLD} /></G>
        </G>
      </G>
      {/* Claude: ẩn danh. */}
      <G x={290} y={700} s={claude}>
        <ChatWin w={440} h={560} dark={click > 0.5} mark={<MarkClaude r={40} />}>
          <rect x={-218} y={-214} width={110} height={460} rx={14} fill={SURF} />
          {[0, 1, 2, 3, 4].map((k) => (
            <g key={k}>
              <rect x={-205} y={-190 + k * 60} width={84} height={14} rx={7} fill={HOV} />
              {click > 0.5 && <line x1={-210} x2={-115} y1={-183 + k * 60} y2={-183 + k * 60} stroke={RED} strokeWidth={4} />}
            </g>
          ))}
          <G x={140} y={-246} s={1 + click * 0.3}>
            <circle r={30} fill={click > 0.5 ? GOLD : HOV} />
            <G s={0.48}><Ghost color={click > 0.5 ? INK : TXT} /></G>
          </G>
          {click > 0.5 && <G x={40} y={30} s={click * 1.4}><Ghost color={SEC} /></G>}
        </ChatWin>
        <G x={lerp(0, 160, cur)} y={lerp(200, -230, cur)} s={1.2}><Cursor /></G>
      </G>
      {/* Gemini: chat tạm thời 72 giờ. */}
      <G x={790} y={700} s={gem}>
        <ChatWin w={420} h={560} mark={<MarkGem r={40} />}>
          <G x={0} y={-200} s={1 + tmp * 0.1}>
            <Box cx={0} cy={0} w={300} h={70} rx={35} fill={tmp > 0.5 ? GOLD : HOV} />
            <G x={-110} y={0} r={0}><circle r={20} fill="none" stroke={tmp > 0.5 ? INK : TXT} strokeWidth={5} strokeDasharray="8 5" /></G>
          </G>
          <G y={70}>
            <circle r={120} fill="none" stroke={HOV} strokeWidth={18} />
            <circle r={120} fill="none" stroke={GOLD} strokeWidth={18} pathLength={1} strokeDasharray={`${1 - hold * 0.85} 1`} transform="rotate(-90)" />
            <G s={0.9}><Hourglass p={hold} /></G>
          </G>
        </ChatWin>
      </G>
    </Stage>
  );
};

/** Cảnh 20 — Đóng chat là báo cáo tan; tua lại: báo cáo bay sang Google Docs, Notion, ghi chú; lịch 30 ngày gắn ghim. */
export const LuuBaoCao: React.FC = () => {
  const { f, p, l } = useT();
  const close = l(0, 0.35, 10);
  const dust = l(0, 0.45, 30);
  const back = l(1, 0, 14);
  const fly = [l(1, 0.25, 18), l(1, 0.4, 18), l(1, 0.55, 18)];
  const cal = l(1, 0.75, 14);
  const T: [number, number][] = [[200, 820], [540, 870], [880, 820]];
  return (
    <Stage bg={INK} fit={{ dy: 40 }} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.5)} solid color={RED} size={46} o={1 - back} />
      <Tag i={1} x={200} y={1010} p={fly[0]} size={34} />
      <Tag i={2} x={540} y={1030} p={fly[1]} size={34} />
      <Tag i={3} x={880} y={1010} p={fly[2]} size={34} />
      <Tag i={4} x={880} y={215} p={p(1, 0.78)} solid size={38} />
      <Tag i={5} x={880} y={275} p={p(1, 0.82)} size={34} />
    </>}>
      {/* Khung chat ẩn danh có trang báo cáo. */}
      <G x={540} y={lerp(560, 420, back)} s={lerp(1, 0.75, back)}>
        {Array.from({ length: 30 }, (_, k) => {
          const a = k * 2.39;
          const d = dust * (80 + (k % 7) * 40);
          return <rect key={k} x={Math.cos(a) * d - 8} y={Math.sin(a) * d - dust * 100 - 8} width={16} height={16} rx={3} fill={k % 3 ? SEC : GOLD} opacity={dust * (1 - back) * (1 - dust * 0.5)} />;
        })}
        <G o={back > 0.01 ? 1 : 1 - dust} s={back > 0.01 ? 1 : 1 - dust * 0.6}>
          <ChatWin w={560} h={520} dark mark={<G s={0.9}><Ghost color={TXT} /></G>}>
            <G x={0} y={20} s={back > 0.01 ? 1 - fly[0] * 0.3 : 1}><Paper w={320} h={340} n={8} head={GOLD} /></G>
          </ChatWin>
          <G x={250} y={-230} s={1 + close * 0.3}>
            <circle r={34} fill={close > 0.5 ? RED : HOV} />
            <Cross r={14} color={TXT} />
          </G>
        </G>
        {close > 0.5 && back < 0.01 && <G x={220} y={-190} s={1.2}><Hand s={0.6} /></G>}
      </G>
      <G x={860} y={540} s={close * (1 - back)}><Warn color={RED} s={1.3} /></G>
      {/* Tua lại: ba nơi lưu. */}
      {[0, 1, 2].map((k) => (
        <G key={k} x={T[k][0]} y={T[k][1]} s={fly[k]}>
          {k === 0 && <G><Box cx={0} cy={0} w={180} h={220} rx={16} fill={TXT} /><rect x={-90} y={-110} width={180} height={50} rx={16} fill="#4A7BD8" /><Lines x={-60} y={-30} w={120} n={4} gap={30} color={SEC} t={9} /></G>}
          {k === 1 && <G><Box cx={0} cy={0} w={200} h={220} rx={16} fill={TXT} stroke={INK} strokeWidth={6} /><path d="M-50 -60 V60 M-50 -60 L50 60 M50 -60 V60" stroke={INK} strokeWidth={14} strokeLinecap="round" fill="none" /></G>}
          {k === 2 && <G><Phone w={170} h={300}><Lines x={-55} y={-80} w={110} n={5} gap={30} color={GOLDL} t={9} /></Phone></G>}
        </G>
      ))}
      {fly.map((v, k) => v > 0.01 && v < 0.99 && (
        <G key={k} x={lerp(540, T[k][0], v)} y={lerp(440, T[k][1], v) - Math.sin(v * Math.PI) * 120} s={0.35}><Paper w={320} h={340} n={8} head={GOLD} /></G>
      ))}
      <G x={880} y={420} s={cal * 0.8}>
        <MonthPage w={260} h={230} marks={30} cells={30} />
        <G x={110} y={-120} r={20}><circle r={22} fill={RED} /><rect x={-3} y={0} width={6} height={30} fill={SEC} /></G>
      </G>
    </Stage>
  );
};

/** Cảnh 21 — Năm thẻ mẹo lật lần lượt. */
export const MeoTraLoi: React.FC = () => {
  const { f, p, l } = useT();
  const deal = l(0, 0, 20);
  const flip = [1, 2, 3, 4, 5].map((i) => l(i, 0, 12));
  const big = (k: number) => flip[k] * (1 - (flip[k + 1] ?? 0));
  const slots: [number, number][] = [[140, 330], [330, 330], [540, 330], [750, 330], [940, 330]];
  const faces: React.ReactNode[] = [
    <G key="0">
      <G x={-140} y={0} s={0.8}><MonthPage w={220} h={200} marks={3} /></G>
      <G x={140} y={-20} s={1.2}><Heart color={SEC} /></G>
      <G x={140} y={-20}><Cross r={40} color={RED} /></G>
      <G y={110}><rect x={-160} y={-6} width={320} height={12} rx={6} fill={GOLD} transform={`rotate(${-8 * flip[0]})`} /><path d="M-20 30 L0 0 L20 30 Z" fill={GOLD} /></G>
    </G>,
    <G key="1">
      <G x={-150} y={-30}><Moon r={50} /></G>
      <G x={0} y={-10}>{[0, 1, 2, 3].map((k) => <rect key={k} x={-50 + k * 28} y={40 - k * 30} width={20} height={20 + k * 30} rx={5} fill={GOLD} />)}</G>
      <G x={150} y={-30} s={0.5}><MonthPage w={200} h={180} marks={1} /></G>
    </G>,
    <G key="2">
      {Array.from({ length: 5 }, (_, k) => (
        <G key={k} x={-150 + k * 50} y={0} r={(k - 2) * 8}>
          <Box cx={0} cy={0} w={90} h={130} rx={12} fill={k <= Math.round(flip[2] * 5) - 1 ? TXT : HOV} stroke={GOLD} strokeWidth={4} />
          {k <= Math.round(flip[2] * 5) - 1 && <G s={0.25}><Corner k={k % 4} color={INK} /></G>}
        </G>
      ))}
      <G x={170} y={10} s={0.25}><Box cx={0} cy={0} w={300} h={260} rx={20} fill="#2B2618" stroke={GOLD} strokeWidth={10 + 8 * flip[2]} /></G>
    </G>,
    <G key="3">
      <G x={-100} y={0} s={0.8}><Talk w={200} h={110} me n={0} /><G x={0} y={0} s={0.4}><Question color={INK} /></G></G>
      <Arrow x1={20} y1={0} x2={90} y2={0} color={GOLD} w={7} />
      <G x={160}><Box cx={0} cy={0} w={110} h={110} rx={16} fill={EL} stroke={GOLD} strokeWidth={6} /><G s={0.5}><Stamp r={60} color={GOLD} /></G></G>
    </G>,
    <G key="4">
      <G x={-100} y={0} s={0.6}><Phone w={220} h={380}><G y={60}><Mic s={1} /></G></Phone></G>
      <path d={Array.from({ length: 12 }, (_, k) => `${k ? "L" : "M"}${0 + k * 12} ${Math.sin(k + f / 3) * 24}`).join(" ")} fill="none" stroke={GOLD} strokeWidth={6} />
      <G x={180} y={0}><Box cx={0} cy={0} w={120} h={70} rx={16} fill={HOV} /><Lines x={-40} y={-14} w={80} n={2} gap={20} color={TXT} t={8} /></G>
    </G>,
  ];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={200} p={p(0, 0.1)} solid size={44} />
      <Tag i={1} x={330} y={1045} p={p(1, 0.1)} solid size={36} o={1 - flip[1]} />
      <Tag i={2} x={760} y={1045} p={p(1, 0.2)} size={34} color={SEC} o={1 - flip[1]} />
      <Tag i={3} x={540} y={1045} p={p(2, 0.1)} solid size={38} o={1 - flip[2]} />
      <Tag i={4} x={540} y={1045} p={p(3, 0.1)} solid size={38} o={1 - flip[3]} />
      <Tag i={5} x={420} y={1045} p={p(4, 0.05)} solid size={36} o={1 - flip[4]} />
      <Tag i={6} x={760} y={1045} p={p(4, 0.4)} size={34} o={1 - flip[4]} />
      <Tag i={7} x={540} y={1045} p={p(5, 0.4)} solid size={38} />
    </>}>
      {/* Hàng năm thẻ nhỏ. */}
      {slots.map(([x, y], k) => (
        <G key={k} x={lerp(540, x, deal)} y={y + Math.abs(k - 2) * 20} s={deal * 0.9} r={(k - 2) * 4}>
          <Box cx={0} cy={0} w={150} h={180} rx={20} fill={flip[k] > 0.5 ? "#2E2618" : EL} stroke={GOLD} strokeWidth={5} />
          <text y={22} textAnchor="middle" fontSize={64} fontWeight={800} fill={flip[k] > 0.5 ? GOLDL : SEC} fontFamily="Inter, sans-serif">{k + 1}</text>
        </G>
      ))}
      {/* Thẻ đang lật phóng to giữa khung. */}
      {[0, 1, 2, 3, 4].map((k) => {
        const v = big(k);
        if (v < 0.01) return null;
        return (
          <G key={k} x={540} y={720} s={v} o={v}>
            <g transform={`scale(${Math.max(0.05, Math.abs(Math.cos((1 - flip[k]) * Math.PI / 2)))} 1)`}>
              <Box cx={0} cy={0} w={900} h={520} rx={34} fill={SURF} stroke={GOLD} strokeWidth={6} />
              <G x={-400} y={-210}><circle r={40} fill={GOLD} /><text y={16} textAnchor="middle" fontSize={44} fontWeight={800} fill={INK} fontFamily="Inter, sans-serif">{k + 1}</text></G>
              <G y={20} s={1.75}>{faces[k]}</G>
            </g>
          </G>
        );
      })}
    </Stage>
  );
};

/** Cảnh 22 — Bong bóng bọc đường, biển cảnh báo; cân đối chiếu thực tế; khiên chặn thông tin nhạy cảm; người thân và chuyên gia; prompt tạm dừng đánh giá. */
export const CanNho: React.FC = () => {
  const { f, p, l } = useT();
  const warn = l(0, 0.2, 14);
  const scale = l(1, 0, 16);
  const tilt = Math.sin(f / 12) * 4 * (1 - l(1, 0.5, 20));
  const cards = l(2, 0.05, 24);
  const shield = l(2, 0.35, 10);
  const care = l(3, 0, 18);
  const pause = l(4, 0.1, 14);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={290} y={215} p={p(0, 0.3)} solid color={RED} size={40} />
      <Tag i={1} x={290} y={280} p={p(0, 0.7)} size={34} />
      <Tag i={2} x={790} y={215} p={p(1, 0.2)} solid size={40} />
      <Tag i={3} x={150} y={760} p={p(2, 0.1)} size={30} />
      <Tag i={4} x={150} y={870} p={p(2, 0.3)} size={30} />
      <Tag i={5} x={150} y={980} p={p(2, 0.5)} size={30} />
      <Tag i={6} x={660} y={1030} p={p(3, 0.4)} solid size={30} />
      <Tag i={7} x={890} y={1045} p={p(3, 0.55)} solid size={30} w={200} />
      <Tag i={8} x={610} y={690} p={p(4, 0.3)} solid size={36} />
    </>}>
      {/* Khung chat AI với bong bóng bọc đường và biển cảnh báo. */}
      <G x={290} y={450} s={0.85}>
        <ChatWin w={420} h={300}>
          <G x={-20} y={-20}><Talk w={300} h={90} n={2} fill={GOLDL} /></G>
          {[0, 1, 2].map((k) => <G key={k} x={-100 + k * 90} y={-80 + Math.sin(f / 6 + k) * 6} s={0.4}><Star r={30} fill={TXT} /></G>)}
        </ChatWin>
        <G x={200} y={-140} s={warn * 0.9}><Warn /></G>
      </G>
      {/* Cân đối chiếu. */}
      <G x={790} y={480} s={scale}>
        <rect x={-6} y={-120} width={12} height={220} fill={GOLD} />
        <Box cx={0} cy={110} w={160} h={20} rx={10} fill={GOLD} />
        <G y={-120} r={tilt}>
          <rect x={-200} y={-6} width={400} height={12} rx={6} fill={GOLD} />
          <G x={-170} y={60}><path d="M-60 -60 L0 -66 L60 -60" fill="none" stroke={SEC} strokeWidth={3} /><Box cx={0} cy={-10} w={130} h={14} rx={6} fill={SEC} /><G y={-40} s={0.4}><Talk w={240} h={70} n={1} fill={GOLDL} /></G></G>
          <G x={170} y={60}><path d="M-60 -60 L0 -66 L60 -60" fill="none" stroke={SEC} strokeWidth={3} /><Box cx={0} cy={-10} w={130} h={14} rx={6} fill={SEC} /><G y={-50}><Box cx={0} cy={0} w={100} h={74} rx={8} fill={TXT} /><G y={12} s={0.4}><Person fill={SEC} /></G></G></G>
        </G>
      </G>
      {/* Ba thẻ nhạy cảm bị khiên chặn. */}
      {[0, 1, 2].map((k) => (
        <G key={k} x={lerp(160, 320, cards)} y={760 + k * 110 - 50} s={cards * 0.8}>
          {k === 0 && <G><Box cx={0} cy={0} w={150} h={90} rx={12} fill={TXT} /><circle cx={-40} cy={0} r={22} fill={SEC} /><Lines x={-10} y={-18} w={60} n={3} gap={16} color={SEC} t={6} /></G>}
          {k === 1 && <G><Box cx={0} cy={0} w={150} h={90} rx={12} fill={GOLD} /><rect x={-75} y={-24} width={150} height={16} fill={INK} /><rect x={-50} y={14} width={50} height={14} rx={4} fill={INK} opacity={0.5} /></G>}
          {k === 2 && <G s={0.8}><Lock color={TXT} /></G>}
        </G>
      ))}
      <G x={440} y={870} s={shield * 0.95}><Shield color={GOLD} s={1.3} /></G>
      {/* Người thân và chuyên gia lắng nghe. */}
      <G o={care}>
        {[0, 1].map((k) => (
          <G key={k} x={660 + k * 230} y={900} s={care * 0.9}>
            <Box cx={0} cy={60} w={150} h={18} rx={9} fill={HOV} />
            <Guy s={0.6} fill={k ? GOLDL : TXT} tie={k === 1} />
            <G x={60} y={-150} s={0.5}><Heart color={GOLD} /></G>
          </G>
        ))}
      </G>
      {/* Nút tạm dừng đánh giá. */}
      <G x={610} y={600} s={pause * 0.9}><Pause /></G>
    </Stage>
  );
};

/** Cảnh 23 — Đường sáu trạm; trạm 1 phần mô tả dưới video, copy prompt; trạm 2 chat mới, dán và gửi. */
export const Buoc12: React.FC = () => {
  const { f, p, l } = useT();
  const road = l(0, 0, 30);
  const one = l(1, 0, 16);
  const scroll = l(1, 0.25, 24);
  const sel = l(1, 0.55, 14);
  const two = l(2, 0, 16);
  const paste = l(2, 0.3, 14);
  const send = l(2, 0.7, 12);
  const ST: [number, number][] = [[150, 380], [330, 300], [520, 360], [710, 300], [900, 380], [990, 260]];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.1)} solid size={44} />
      <Tag i={1} x={290} y={500} p={p(1, 0.35)} solid size={34} />
      <Tag i={2} x={290} y={1060} p={p(1, 0.2)} size={34} />
      <Tag i={3} x={290} y={1120} p={p(1, 0.65)} solid size={32} />
      <Tag i={4} x={790} y={500} p={p(2, 0.05)} solid size={34} />
      <Tag i={5} x={790} y={1060} p={p(2, 0.4)} size={32} />
    </>}>
      <path d="M100 400 Q240 260 330 300 T520 360 T710 300 T900 380 Q980 400 990 260" fill="none" stroke={GOLD} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - road} opacity={0.7} />
      {ST.map(([x, y], k) => (
        <G key={k} x={x} y={y} s={l(0, 0.1 + k * 0.12, 8) * (k < 2 && (k ? two : one) > 0.5 ? 1.15 : 0.9)}>
          <circle r={36} fill={(k === 0 && one > 0.5) || (k === 1 && two > 0.5) ? GOLD : INK} stroke={GOLD} strokeWidth={6} />
          <text y={14} textAnchor="middle" fontSize={38} fontWeight={800} fill={(k === 0 && one > 0.5) || (k === 1 && two > 0.5) ? INK : GOLDL} fontFamily="Inter, sans-serif">{k + 1}</text>
        </G>
      ))}
      {/* Trạm 1: video thu nhỏ, phần mô tả bên dưới, chọn khối Prompt 1. */}
      <G x={290} y={760} s={one}>
        <Box cx={0} cy={-150} w={420} h={170} rx={20} fill={HOV} />
        <path d="M-24 -180 L28 -150 L-24 -120 Z" fill={TXT} />
        <Box cx={0} cy={100} w={420} h={300} rx={20} fill={EL} stroke={HOV} strokeWidth={4} />
        <clipPath id="b12clip"><rect x={-200} y={-40} width={400} height={280} rx={16} /></clipPath>
        <g clipPath="url(#b12clip)">
          <G y={-scroll * 120}>
            <Lines x={-180} y={-30} w={360} n={4} gap={26} color={HOV} t={9} />
            <G y={150}>
              <Box cx={0} cy={0} w={370} h={170} rx={14} fill={sel > 0.5 ? "#4A3D22" : SURF} stroke={GOLD} strokeWidth={4} />
              <rect x={-170} y={-70} width={120} height={14} rx={7} fill={GOLD} />
              <Lines x={-170} y={-36} w={330} n={4} gap={24} color={sel > 0.5 ? GOLDL : SEC} t={8} />
            </G>
          </G>
        </g>
        <G x={lerp(160, 120, sel)} y={lerp(240, 120, scroll)} s={1.1}><Cursor /></G>
      </G>
      {/* Trạm 2: chat mới, dán prompt, gửi. */}
      <G x={790} y={760} s={two}>
        <ChatWin w={420} h={480} mark={<MarkClaude r={40} />}>
          <G x={lerp(0, 60, send)} y={lerp(160, -100, send)} s={paste * lerp(1, 0.7, send)}>
            <PromptCard w={260} h={150} sections={2} />
          </G>
          <G x={175} y={196} s={1 + (send > 0.1 && send < 0.6 ? 0.2 : 0)}><circle r={22} fill={GOLD} /><path d="M-8 -10 L10 0 L-8 10 Z" fill={INK} /></G>
        </ChatWin>
      </G>
    </Stage>
  );
};

/** Cảnh 24 — Bước 3: hội thoại; thanh tiến độ bốn góc; cách hỏi; 30–45 phút yên tĩnh; sửa khi AI hỏi dồn; chặn chấm giữa chừng. */
export const Buoc3: React.FC = () => {
  const { f, p, l } = useT();
  const chat = l(0, 0, 16);
  const intro = [l(0, 0.2, 10), l(0, 0.45, 10), l(0, 0.75, 10)];
  const prog = l(1, 0.1, 50);
  const how = l(2, 0, 16);
  const clock = l(3, 0, 30);
  const multi = l(4, 0, 12);
  const fix = l(4, 0.6, 12);
  const stamp = l(5, 0, 12);
  const block = l(5, 0.4, 10);
  const run = l(5, 0.6, 30);
  const dots = [3, 4, 5, 4];
  const total = dots.reduce((a, b) => a + b, 0);
  const filled = Math.round(lerp(0, total, Math.max(prog, run > 0 ? 1 : 0)));
  return (
    <Stage bg={INK} fit={{ dy: 40 }} overlay={<>
      <Tag i={0} x={290} y={215} p={p(0, 0.1)} solid size={40} />
      <Tag i={1} x={790} y={215} p={p(1, 0.05)} solid size={40} />
      <Tag i={2} x={790} y={560} p={p(1, 0.6)} size={34} />
      <Tag i={3} x={290} y={1010} p={p(2, 0.2)} solid size={34} />
      <Tag i={4} x={290} y={940} p={p(2, 0.7)} color={RED} size={32} />
      <Tag i={5} x={790} y={760} p={p(3, 0.3)} solid size={38} o={1 - stamp} />
      <Tag i={6} x={790} y={1010} p={p(4, 0.6)} solid size={34} o={1 - stamp} />
      <Tag i={7} x={790} y={1010} p={p(5, 0.4)} solid color={RED} size={34} />
    </>}>
      {/* Khung chat. */}
      <G x={290} y={560} s={chat} o={1 - how * (1 - multi)}>
        <ChatWin w={460} h={560} mark={<MarkClaude r={40} />}>
          <G x={-40} y={-180} s={intro[0] * 0.8}><Talk w={300} h={70} n={2} /></G>
          <G x={-60} y={-90} s={intro[1] * 0.8}>{[0, 1, 2].map((k) => <Box key={k} cx={-90 + k * 90} cy={0} w={80} h={44} rx={12} fill={SURF} stroke={GOLD} strokeWidth={3} />)}</G>
          <G x={-40} y={-10} s={intro[2] * 0.8}><Talk w={300} h={60} n={1} /></G>
          <G x={60} y={70} s={intro[2] * 0.8 * (1 - multi * 0.0)}><Talk w={280} h={60} me n={1} /></G>
          {/* Hỏi dồn: ba dấu hỏi lắc đỏ, sửa còn một. */}
          <G x={-40} y={150} s={multi * 0.8} o={1 - how * 0}>
            <Box cx={0} cy={0} w={300} h={70} rx={20} fill={fix > 0.5 ? HOV : "#4A1F1F"} stroke={fix > 0.5 ? HOV : RED} strokeWidth={4} />
            {[0, 1, 2].map((k) => <G key={k} x={-80 + k * 80 + (fix > 0.5 ? 0 : Math.sin(f * 2 + k) * 4)} y={0} s={(k === 1 ? 1 : 1 - fix) * 0.28}><Question color={fix > 0.5 ? TXT : RED} /></G>)}
          </G>
        </ChatWin>
      </G>
      {/* Cách hỏi: có/không bị gạch, phễu, nói một đằng làm một nẻo. */}
      <G x={290} y={560} o={how * (1 - multi)}>
        <Box cx={0} cy={0} w={460} h={560} rx={30} fill="none" stroke={HOV} strokeWidth={4} />
        <G x={-120} y={-170}><Box cx={0} cy={0} w={160} h={70} rx={20} fill={HOV} /><Cross r={34} /></G>
        <G x={90} y={-170}><Talk w={220} h={70} n={1} fill={GOLDL} /></G>
        <G x={-110} y={30} s={0.8}><Funnel /></G>
        <G x={70} y={40}><circle r={46} fill={GOLD} /><rect x={-20} y={-16} width={40} height={10} rx={4} fill={INK} /><rect x={-20} y={4} width={26} height={10} rx={4} fill={INK} /></G>
        <G x={0} y={200}>
          <G x={-80} y={0} s={0.45}><Talk w={220} h={70} n={1} /></G>
          <Arrow x1={-20} y1={0} x2={-120} y2={-60} color={SEC} w={5} />
          <G x={80} y={10}>{[0, 1].map((k) => <ellipse key={k} cx={k * 30} cy={-k * 24} rx={10} ry={16} fill={SEC} />)}</G>
          <Arrow x1={110} y1={-20} x2={180} y2={40} color={SEC} w={5} />
          <circle r={115} fill="none" stroke={RED} strokeWidth={5} strokeDasharray="12 10" />
        </G>
      </G>
      {/* Thanh tiến độ bốn góc. */}
      <G x={790} y={400}>
        {[0, 1, 2, 3].map((k) => {
          const before = dots.slice(0, k).reduce((a, b) => a + b, 0);
          return (
            <G key={k} x={-180 + k * 120} y={0} s={l(1, k * 0.1, 10)}>
              <CornerTile k={k} w={100} h={100} lit={filled > before ? 1 : 0} t={f} />
              {Array.from({ length: dots[k] }, (_, j) => <circle key={j} cx={-30 + (j % 3) * 30} cy={72 + Math.floor(j / 3) * 26} r={9} fill={before + j < filled ? GOLD : HOV} />)}
            </G>
          );
        })}
      </G>
      {/* Đồng hồ 30–45 phút. */}
      <G x={790} y={900} o={1 - multi}>
        <G s={clock}>
          <circle r={110} fill={TXT} stroke={GOLD} strokeWidth={9} />
          <path d={`M0 0 L0 -110 A110 110 0 1 1 ${Math.sin(Math.PI * 1.5 * clock) * 110} ${-Math.cos(Math.PI * 1.5 * clock) * 110} Z`} fill={GOLD} opacity={0.6} />
          <path d="M0 0 L0 -110 A110 110 0 0 1 0 110 Z" fill={GOLD} opacity={0.35} />
          <circle r={10} fill={INK} />
        </G>
        <G x={-200} y={0} s={clock * 0.6}><path d="M-40 10 Q-40 -50 0 -50 Q40 -50 40 10" fill="none" stroke={TXT} strokeWidth={10} /><rect x={-50} y={0} width={24} height={40} rx={8} fill={TXT} /><rect x={26} y={0} width={24} height={40} rx={8} fill={TXT} /></G>
        <G x={200} y={0} s={clock * 0.7}><path d="M-30 -40 H30 L22 40 H-22 Z" fill={SEC} /><rect x={-30} y={-46} width={60} height={10} rx={4} fill={TXT} /></G>
      </G>
      {/* Con dấu Level bị chặn. */}
      <G x={790} y={lerp(700, 800, block)} s={stamp} o={stamp}>
        <G x={-40}><rect x={-14} y={-90} width={28} height={60} rx={10} fill={GOLD} /><rect x={-56} y={-34} width={112} height={40} rx={8} fill={RED} /></G>
        <G x={120} y={-30} s={block}><Hand s={0.7} /></G>
        <G x={-40} y={-20} s={block * 0.6}><Ban r={100} /></G>
      </G>
    </Stage>
  );
};

/** Cảnh 25 — Bước 4 tóm tắt hai dòng, sửa; bước 5 báo cáo, cột bằng chứng, phản biện; bước 6 cất lưu; Prompt 3 và Prompt 2. */
export const Buoc46: React.FC = () => {
  const { f, p, l } = useT();
  const sum = l(0, 0, 16);
  const edit = l(0, 0.5, 16);
  const rep = l(1, 0.05, 18);
  const look = l(2, 0, 30);
  const bump = l(2, 0.75, 10);
  const store = l(3, 0.05, 20);
  const p3 = l(4, 0, 16);
  const bell = l(4, 0.6, 12);
  return (
    <Stage bg={INK} fit={{ dy: 40 }} overlay={<>
      <Tag i={0} x={290} y={215} p={p(0, 0.1)} solid size={38} />
      <Tag i={1} x={790} y={215} p={p(1, 0.2)} solid size={38} />
      <Tag i={2} x={900} y={320} p={p(2, 0.05)} size={32} />
      <Tag i={3} x={470} y={775} p={p(2, 0.6)} solid size={34} />
      <Tag i={4} x={290} y={1010} p={p(3, 0.3)} solid size={36} />
      <Tag i={5} x={650} y={1010} p={p(4, 0.1)} solid size={34} />
      <Tag i={6} x={930} y={1010} p={p(4, 0.6)} solid size={34} />
      <Tag i={7} x={930} y={730} p={p(4, 0.7)} size={32} />
    </>}>
      {/* Trạm 4: thẻ tóm tắt hai dòng sau mỗi góc. */}
      <G x={290} y={470} s={sum * lerp(1, 0.75, store)}>
        {[0, 1, 2, 3].map((k) => (
          <G key={k} x={-150 + k * 100} y={-80} s={0.4}><CornerTile k={k} w={200} h={200} lit={1} t={f} /></G>
        ))}
        <Box cx={0} cy={60} w={420} h={150} rx={20} fill={PAPER} />
        <rect x={-180} y={20} width={300} height={16} rx={8} fill={SEC} />
        <rect x={-180} y={56} width={lerp(240, 340, edit)} height={16} rx={8} fill={SEC} />
        {edit > 0.3 && <rect x={-180} y={92} width={200 * edit} height={12} rx={6} fill={GOLD} />}
        <rect x={-40} y={52} width={70} height={24} fill="none" stroke={RED} strokeWidth={4} opacity={edit} />
        <G x={lerp(240, 120, edit)} y={60} r={30}><rect x={-8} y={-70} width={16} height={80} rx={4} fill={GOLD} /><path d="M-8 10 L0 26 L8 10 Z" fill={TXT} /></G>
      </G>
      {/* Trạm 5: báo cáo đầy đủ, cột bằng chứng, phản biện. */}
      <G x={790} y={500} s={rep}>
        <Box cx={0} cy={0} w={420} h={420} rx={24} fill={PAPER} />
        <rect x={-210} y={-210} width={420} height={60} rx={24} fill={GOLD} />
        <rect x={-210} y={-170} width={420} height={20} fill={GOLD} />
        {[0, 1, 2, 3].map((r) => (
          <G key={r} y={-110 + r * 80}>
            <G x={-160} s={0.3}><Corner k={r} color={INK} /></G>
            <rect x={-110} y={-24} width={150} height={48} rx={8} fill="#DDD2BC" />
            <rect x={60} y={-24} width={130} height={48} rx={8} fill={r === 1 ? (bump > 0.5 ? "#F4D58A" : "#EAD9B0") : "#E6DCC8"} stroke={r === 1 && look > 0.5 ? RED : "none"} strokeWidth={5} />
            {Array.from({ length: r === 1 ? (bump > 0.5 ? 2 : 1) : [2, 1, 1, 2][r] }, (_, j) => <circle key={j} cx={-80 + j * 34} cy={0} r={12} fill={GOLD} />)}
          </G>
        ))}
        <G x={125} y={lerp(-120, 0, look)} s={0.7}><Mag /></G>
        <G x={-100} y={250} s={look > 0.6 ? 0.75 : 0}><Talk w={300} h={70} me n={1} /></G>
      </G>
      {/* Trạm 6: ngăn lưu trữ. */}
      <G x={290} y={830} s={store}><Cabinet open={store} s={0.8} /></G>
      {store > 0.01 && store < 0.99 && <G x={lerp(790, 290, store)} y={lerp(500, 760, store)} s={0.3}><Paper w={420} h={420} n={8} head={GOLD} /></G>}
      {/* Prompt 3 thành bảng tuần; lịch 30 ngày có chuông, gắn Prompt 2. */}
      <G x={650} y={880} s={p3}>
        <G x={-80} y={0} s={0.5}><PromptCard w={200} h={240} sections={2} /></G>
        <Arrow x1={-20} y1={0} x2={20} y2={0} color={GOLD} w={6} />
        <G x={90} y={0}>
          {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-60 + c * 42} y={-70 + r * 36} width={38} height={30} rx={5} fill={r === 0 ? GOLD : HOV} />))}
        </G>
      </G>
      <G x={930} y={880} s={p3 * 0.62}>
        <MonthPage w={220} h={200} marks={30} cells={30} />
        <G x={90} y={-110} r={Math.sin(f * 1.4) * 18 * bell}><path d="M-34 24 Q-30 18 -28 -6 Q-26 -40 0 -42 Q26 -40 28 -6 Q30 18 34 24 Z" fill={GOLD} /><circle cx={0} cy={34} r={9} fill={GOLDL} /></G>
      </G>
    </Stage>
  );
};
