import React from "react";
import { AI, Arrow, Box, BrandEnd, Bubble, Cross, EL, Excel, Floor, Folder, G, GOLD, GOLDL, Hand, HOV, INK, Lines, Lock, Chat, PAPER, Person, Question, RED, SEC, Spark, Stage, SURF, Tag, TXT, XL, lerp, useT } from "../shared/art";
import { Calendar, clamp01, Cursor } from "../bai-1/art";
import { Bot, Envelope, Loupe, Pen } from "../bai-2/art";
import { Boss, CodeWall } from "../bai-3/art";
import { Bang, BotBadge, NoSign, RedPen, Shield, Tick } from "../bai-4/art";
import { TaskCard, Week } from "../bai-5/art";
import { Anchor, Page } from "../bai-6/art";

const sin = Math.sin;
const SX = [230, 540, 850];

/** Ba ô kệ hàng trên: lit là độ sáng, done là dấu tích (chỉ hiện khi việc xong). */
const Slots: React.FC<{ y: number; lit: number[]; done: number[]; f: number; at?: (k: number) => { x: number; y: number } }> = ({ y, lit, done, f, at }) => (
  <g>
    {SX.map((x, k) => {
      const pos = at ? at(k) : { x, y };
      const glow = lit[k] * (0.55 + 0.45 * sin(f / 9 + k));
      return (
        <G key={k} x={pos.x} y={pos.y}>
          <Box cx={0} cy={0} w={250} h={290} rx={26} fill={SURF} stroke={lit[k] > 0.5 ? GOLD : HOV} strokeWidth={6} />
          <Box cx={0} cy={0} w={290} h={330} rx={34} fill="none" stroke={GOLDL} strokeWidth={5} opacity={glow * 0.5} />
          <rect x={-90} y={-100} width={180} height={14} rx={7} fill={HOV} />
          <rect x={-90} y={-70} width={120} height={14} rx={7} fill={HOV} />
          <circle cy={50} r={46} fill="none" stroke={HOV} strokeWidth={5} strokeDasharray="8 14" />
          <G y={50} s={done[k]}>
            <Tick r={42} />
          </G>
        </G>
      );
    })}
  </g>
);

/** Con dấu thật: thân dấu giáng xuống (land 0..1), để lại vết ring + tia sáng, rồi nhấc lên (lift 0..1). */
const Seal: React.FC<{ x: number; y: number; land: number; lift: number; r?: number; color?: string; mark?: "check" | "spark"; hand?: boolean }> = ({ x, y, land, lift, r = 55, color = XL, mark = "check", hand = false }) => {
  const dy = -(1 - land) * 340 - lift * 340;
  return (
    <G x={x} y={y}>
      <g opacity={land > 0.96 ? 1 : 0}>
        <circle r={r} fill="none" stroke={color} strokeWidth={r * 0.14} />
        {mark === "spark" ? <Spark r={r * 0.5} fill={color} /> : <path d={`M${-r * 0.45} 0 L${-r * 0.1} ${r * 0.4} L${r * 0.5} ${-r * 0.4}`} fill="none" stroke={color} strokeWidth={r * 0.18} strokeLinecap="round" strokeLinejoin="round" />}
      </g>
      <G y={dy} o={land > 0 ? 1 - clamp01(lift * 1.4) : 0}>
        <Box cx={0} cy={-r * 0.35} w={r * 2.2} h={r * 0.5} rx={r * 0.2} fill={GOLD} />
        <Box cx={0} cy={-r * 1.5} w={r * 0.7} h={r * 1.7} rx={r * 0.3} fill={GOLDL} />
        <Box cx={0} cy={-r * 2.45} w={r * 1.4} h={r * 0.45} rx={r * 0.2} fill={GOLDL} />
        {hand && <G x={0} y={-r * 2.6} s={0.7} r={180}><Hand /></G>}
      </G>
    </G>
  );
};

/** Huy hiệu khắc tên (ruy băng không đỏ). */
const Badge: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <path d="M-34 -80 L-8 -10 L8 -10 L-14 -80 Z" fill={SEC} />
    <path d="M34 -80 L8 -10 L-8 -10 L14 -80 Z" fill={HOV} />
    <circle cy={22} r={40} fill={GOLD} stroke={GOLDL} strokeWidth={6} />
    <G y={22}><Spark r={24} fill={INK} /></G>
  </G>
);

const Twinkle: React.FC<{ f: number; pts: [number, number][] }> = ({ f, pts }) => (
  <g>
    {pts.map(([x, y], k) => (
      <G key={k} x={x} y={y} s={0.55 + 0.35 * sin(f / 10 + k * 1.7)} o={0.5}>
        <Spark r={20} fill={k % 2 ? GOLDL : GOLD} />
      </G>
    ))}
  </g>
);

/** Cảnh 10: ba ô kệ trống, trợ lý phỏng vấn, thẻ việc tự xếp, con dấu duyệt. */
export const BaViecLapKeHoach: React.FC = () => {
  const { f, p, l } = useT();
  const FROM: [number, number][] = [[-300, 400], [540, -260], [1380, 400]];
  const sl = [0, 1, 2].map((k) => l(0, 0.05 + k * 0.2, 14));
  const cal = l(1, 0.02, 16);
  const rows = [880, 950, 1020];
  const STARTS: [number, number, number][] = [[190, 600, 14], [270, 560, -12], [350, 610, 10]];
  const JUM: [number, number][] = [[230, 870], [300, 900], [270, 940]];
  const fills = [GOLD, GOLDL, TXT];
  const approved = l(3, 0.4, 6) > 0.5;
  const gone = 1 - l(3, 0, 8);
  const ghost = [1 - l(1, 0.05, 8), 1 - l(2, 0, 8), 1 - l(2, 0, 8)];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={235} p={p(0, 0.02)} solid size={44} />
      <Tag i={1} x={230} y={632} p={p(1, 0.1)} solid size={34} o={gone} />
      <Tag i={2} x={700} y={622} p={p(2, 0.05)} size={32} o={gone} />
      <Tag i={3} x={905} y={725} p={p(2, 0.25)} size={32} o={gone} />
      <Tag i={4} x={560} y={812} p={p(2, 0.6)} solid color={XL} size={34} />
    </>}>
      <Slots y={400} f={f} lit={[l(1, 0, 8), 0, 0]} done={[l(3, 0.5, 8), 0, 0]} at={(k) => ({ x: lerp(FROM[k][0], SX[k], sl[k]), y: lerp(FROM[k][1], 400, sl[k]) })} />
      {/* Ba ô kệ trống ở dưới: ray nét đứt nối xuống, thẳng hàng với ba ô trên. */}
      {SX.map((x, k) => (
        <g key={k} opacity={l(0, 0.3 + k * 0.1, 12) * ghost[k]}>
          <line x1={x} y1={570} x2={x} y2={770} stroke={GOLDL} strokeWidth={6} strokeDasharray="6 14" strokeDashoffset={-f} />
          <Box cx={x} cy={930} w={260} h={300} rx={26} fill={SURF} stroke={HOV} strokeWidth={5} strokeDasharray="14 12" />
          <Box cx={x} cy={860} w={170} h={14} rx={7} fill={HOV} />
          <Box cx={x} cy={900} w={120} h={14} rx={7} fill={HOV} />
        </g>
      ))}
      {/* Tờ lịch bung ra từ đáy ô thứ nhất; các ô giờ hiện thành dòng kẻ bên dưới. */}
      <G x={lerp(230, 265, cal)} y={lerp(520, 870, cal) + 5 * sin(f / 16)} s={lerp(0.3, 1.2, cal)}>
        <Calendar flip={0} />
      </G>
      {[0, 1, 2].map((k) => (
        <rect key={k} x={125} y={1030 + k * 42} width={280 * l(1, 0.5 + k * 0.08, 10)} height={14} rx={7} fill={GOLDL} opacity={0.6} />
      ))}
      {/* Trợ lý hỏi: bong bóng nối với đầu trợ lý. */}
      <G x={850} y={990 + 8 * sin(f / 12)} s={0.95 * p(2, 0) * gone}>
        <Bot arm={0.5 + 0.3 * sin(f / 8)} />
      </G>
      <G x={700} y={700} s={p(2, 0.1) * gone}>
        <Bubble w={210} h={100} fill={TXT} n={1} ink={SEC} />
        <G x={-62} y={-4}><Tick r={28} /></G>
      </G>
      <G x={900} y={820} s={p(2, 0.3) * gone}>
        <Bubble w={190} h={100} fill={TXT} n={1} ink={SEC} />
        <G x={-52} y={-6}><Bang s={0.42} color={GOLD} /></G>
      </G>
      {/* Thẻ việc rơi vào lịch rồi tự xếp thành hàng theo ưu tiên. */}
      {[0, 1, 2].map((k) => {
        const fall = l(2, 0.4 + k * 0.1, 12);
        const sort = l(2, 0.8, 10);
        const x = lerp(lerp(STARTS[k][0], JUM[k][0], fall), 560, sort);
        const y = lerp(lerp(STARTS[k][1], JUM[k][1], fall), rows[k], sort);
        return (
          <G key={k} x={x} y={y} r={lerp(STARTS[k][2] * (1 - fall), 0, sort)} s={fall > 0 ? 1 : 0}>
            <TaskCard w={220} fill={approved ? XL : fills[k]} s={1.1} />
          </G>
        );
      })}
      {/* Con dấu giáng xuống đầu hàng thẻ rồi nhấc lên. */}
      <Seal x={760} y={890} land={l(3, 0.1, 7)} lift={l(3, 0.42, 10)} r={62} hand />
      <Twinkle f={f} pts={[[110, 700], [980, 560], [420, 1190], [700, 1190]]} />
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 11: bậc thang bên trái, tờ SOP, chữ thô thành văn bản, kính lúp, con dấu chốt; rồi cây bút bị cấm. */
export const ViecThuHaiSop: React.FC = () => {
  const { f, p, l } = useT();
  const sheet = p(0, 0.1);
  const flow = l(1, 0.25, 30);
  const out = 1 - l(3, 0, 10);
  const sweep = l(2, 0, 22);
  const poke = sin(clamp01(l(2, 0.55, 20)) * Math.PI);
  const grab = l(3, 0.6, 22);
  const penX = lerp(600, 340, grab);
  const penY = lerp(850, 960, grab);
  const stepW = [150, 130, 160, 110];
  const lit = [0.3, l(0, 0, 8), l(3, 0, 8)];
  const done = [1, l(2, 0.8, 8), 0];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={534} p={p(0, 0.1)} solid size={44} o={out} />
      <Tag i={1} x={321} y={611} p={p(1, 0.05)} solid size={30} o={out * (1 - l(2, 0, 4))} />
      <Tag i={2} x={321} y={1000} p={p(1, 0.55)} solid size={30} o={out * (1 - l(2, 0, 4))} />
      <Tag i={3} x={356} y={1006} p={p(2, 0.05)} size={32} o={out} />
      <Tag i={4} x={666} y={1006} p={p(2, 0.6)} solid color={XL} size={34} o={out} />
      <Tag i={5} x={540} y={551} p={p(3, 0.2)} solid size={42} />
    </>}>
      {/* Bậc thang ngang phía trên: chỉ ô đang làm sáng, tích khi xong. */}
      <line x1={400} y1={320} x2={680} y2={320} stroke={HOV} strokeWidth={8} />
      {[400, 540, 680].map((x, k) => (
        <G key={k} x={x} y={320}>
          <circle r={52} fill={SURF} stroke={lit[k] > 0.5 ? GOLD : HOV} strokeWidth={6} />
          <circle r={68} fill="none" stroke={GOLDL} strokeWidth={4} opacity={lit[k] * (0.4 + 0.4 * sin(f / 8))} />
          <G s={done[k]}><Tick r={40} /></G>
        </G>
      ))}
      <g transform="translate(540 770) scale(1.15) translate(-590 -830)">
      <G o={out}>
        {/* Tờ giấy trắng trải rộng; nửa phải còn khung chờ. */}
        <G x={590} y={830} s={sheet}>
          <Box cx={8} cy={10} w={740} h={480} rx={20} fill="#000" opacity={0.35} />
          <Box cx={0} cy={0} w={740} h={480} rx={20} fill={PAPER} />
          <line x1={0} y1={-170} x2={0} y2={210} stroke={SEC} strokeWidth={3} strokeDasharray="6 12" />
          <g opacity={1 - l(1, 0.05, 8)}><Lines x={70} y={-120} w={250} n={6} gap={52} color={HOV} t={12} /></g>
        </G>
        {/* Bên trái: chữ thô gõ tay, vài chỗ vướng có dấu hỏi. */}
        <Lines x={235} y={745} w={270} n={4} gap={50} color={SEC} t={14} />
        <rect x={235 + 135 * l(1, 0.1, 12)} y={735} width={6} height={30} fill={INK} opacity={Math.floor(f / 8) % 2} />
        <G x={545} y={780} s={p(1, 0.5) * 0.35}><Question s={1} color={GOLD} /></G>
        <G x={545} y={900} s={p(1, 0.6) * 0.35}><Question s={1} color={GOLD} /></G>
        {/* Bên phải: đầu đề và các bước đánh số thẳng hàng. */}
        <rect x={650} y={705} width={170 * flow} height={22} rx={8} fill={GOLD} />
        {[0, 1, 2, 3].map((k) => {
          const t = clamp01(flow * 4 - k);
          return (
            <g key={k} opacity={t}>
              <circle cx={665} cy={765 + k * 62} r={18} fill={GOLD} />
              <circle cx={665} cy={765 + k * 62} r={7} fill={INK} />
              <rect x={700} y={758 + k * 62} width={stepW[k] * t} height={14} rx={7} fill={SEC} />
            </g>
          );
        })}
        {/* Kính lúp rà từng bước, con dấu chốt giáng xuống cuối tờ. */}
        <G x={lerp(780, 740, sweep)} y={lerp(765, 940, sweep)} s={0.8 * p(2, 0) * (1 - l(2, 0.55, 8))}>
          <Loupe />
        </G>
        <Seal x={870} y={975} land={l(2, 0.6, 7)} lift={l(2, 0.82, 10)} r={50} />
        <G x={915} y={1060 - 50 * poke} s={0.7} o={l(2, 0.3, 2) > 0 ? 1 : 0}>
          <Hand />
        </G>
      </G>
      {/* Ô thứ ba: cây bút bị cấm, AI bị chặn, bàn tay mình nắm bút kéo về. */}
      <G x={590} y={860} s={p(3, 0.1)}>
        <Box cx={6} cy={8} w={480} h={420} rx={18} fill="#000" opacity={0.35} />
        <Box cx={0} cy={0} w={480} h={420} rx={18} fill={PAPER} />
        <Lines x={-180} y={-160} w={360} n={6} gap={46} color={SEC} t={12} />
      </G>
      <G x={900} y={820 + 6 * sin(f / 12)} s={p(3, 0.15)} o={0.9}><AI size={110} dim /></G>
      <Box cx={850} cy={820} w={16} h={300 * p(3, 0.25)} rx={8} fill={RED} />
      <G o={p(3, 0.1)}>
        <Pen x={penX} y={penY} r={-35 - 30 * grab} s={1.7} />
      </G>
      <G x={590} y={860} s={p(3, 0.3) * 1.5 * (1 - grab * 0.0)}><NoSign /></G>
      <G x={lerp(900, penX + 20, l(3, 0.35, 16))} y={lerp(1060, penY + 50, l(3, 0.35, 16))} s={0.65 * p(3, 0.3)}>
        <Hand r={-10} />
      </G>
      </g>
      <Twinkle f={f} pts={[[110, 470], [990, 450], [200, 220], [880, 230]]} />
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 12: bút và hai huy hiệu neo vào đế; trang AI rỗng ruột; giám khảo bút đỏ; bản thảo trả về. */
export const TuVietCuaMinh: React.FC = () => {
  const { f, p, l } = useT();
  const s0 = 1 - l(1, 0, 8);
  const s1 = l(1, 0, 6) * (1 - l(2, 0, 8));
  const s2 = l(2, 0, 6) * (1 - l(3, 0, 8));
  const badge = l(0, 0.15, 14);
  const hollow = l(1, 0.55, 12);
  const back = l(3, 0.7, 16);
  const ms = (k: number): number => l(3, 0.15 + k * 0.15, 12);
  const shrink = l(3, 0, 10);
  const my = lerp(560, 640, back);
  const barH = [110, 70];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={230} y={310} p={p(0, 0.25)} solid size={34} o={s0} />
      <Tag i={1} x={850} y={310} p={p(0, 0.45)} solid size={34} o={s0} />
      <Tag i={2} x={540} y={400} p={p(1, 0.5)} solid color={RED} size={38} o={s1} />
      <Tag i={3} x={600} y={470} p={p(2, 0.35)} solid size={34} o={s2} />
      <Tag i={4} x={340} y={my - 150} p={p(3, 0.15)} solid color={RED} size={32} />
      <Tag i={5} x={340} y={my + 300} p={p(3, 0.4)} solid color={RED} size={30} />
    </>}>
      {/* Câu 0: cây bút trên trang giấy, hai huy hiệu neo vào đế. */}
      <G o={s0}>
        <Box cx={540} cy={1125} w={820} h={56} rx={16} fill={GOLD} />
        <Box cx={540} cy={1090} w={560} h={26} rx={10} fill={HOV} />
        {[230, 850].map((x, k) => (
          <g key={x}>
            <path d={`M${x} 570 Q${x + (k ? 40 : -40)} 800 ${x} 1000`} fill="none" stroke={GOLDL} strokeWidth={6} strokeDasharray="14 10" strokeDashoffset={-f} />
            <G x={x} y={1050} s={0.7 * badge}><Anchor /></G>
          </g>
        ))}
        <G x={lerp(540, 230, badge)} y={lerp(620, 470, badge) + 6 * sin(f / 14)} s={1.6 * badge}><Badge /></G>
        <G x={lerp(540, 850, badge)} y={lerp(620, 470, badge) + 6 * sin(f / 14 + 2)} s={1.6 * badge}><Shield color={GOLD} /></G>
        <G x={540} y={700} s={p(0, 0.05) * 1.1}><Page w={300} h={400} /></G>
        <G x={560} y={740 + 4 * sin(f / 12)} s={p(0, 0.15)}><Pen r={-30} s={1.6} /></G>
      </G>
      {/* Câu 1: trang AI chữ mượt như lụa, ruột rỗng khi gõ vào. */}
      <G x={540} y={740} s={p(1, 0.05) * s1 * 1.25}>
        <Page w={420} h={520} />
        <G x={160} y={-220}><BotBadge s={1.1} /></G>
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const d = `M-170 ${-170 + k * 62} q 42 -26 85 0 t 85 0 t 85 0 t 85 0`;
          const mid = k === 2 || k === 3;
          return (
            <path key={k} d={d} fill="none" stroke={GOLD} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - l(1, 0.1 + k * 0.05, 20)} opacity={mid ? 1 - hollow : 1} />
          );
        })}
        <g transform={`translate(0 -15) scale(${hollow})`}>
          <Box cx={0} cy={0} w={330} h={170} rx={22} fill={INK} stroke={SEC} strokeWidth={5} strokeDasharray="12 10" />
        </g>
        {[0, 1].map((k) => (
          <circle key={k} cy={-15} r={20 + ((f + k * 20) % 40) * 3} fill="none" stroke={SEC} strokeWidth={5} opacity={hollow * (1 - ((f + k * 20) % 40) / 40)} />
        ))}
      </G>
      <G x={lerp(680, 540, l(1, 0.5, 8))} y={lerp(1000, 725, l(1, 0.5, 8))} s={l(1, 0.45, 4) * s1}><Cursor /></G>
      {/* Câu 2: ghế giám khảo, AI đội kính cầm bút đỏ, biển người phản biện. */}
      <G o={s2 + (1 - s2) * l(3, 0, 1) * (1 - l(3, 0, 1))}>
        <path d="M450 300 L450 432 M750 300 L750 432" stroke={GOLDL} strokeWidth={6} />
        <Box cx={600} cy={470} w={460} h={76} rx={18} fill={EL} stroke={GOLD} strokeWidth={5} />
      </G>
      <G x={lerp(600, 790, shrink)} y={lerp(740, 640, shrink)} s={lerp(1.4, 0.75, shrink) * p(2, 0)}>
        <Box cx={0} cy={130} w={280} h={360} rx={34} fill={HOV} />
        <Box cx={0} cy={330} w={340} h={30} rx={14} fill={SEC} />
        <G y={6 * sin(f / 10)}>
          <Bot s={1.0} arm={0.4 + 0.3 * sin(f / 7)} />
          {[-30, 30].map((x) => <circle key={x} cx={x} cy={0} r={26} fill="none" stroke={TXT} strokeWidth={6} />)}
          <line x1={-4} y1={0} x2={4} y2={0} stroke={TXT} strokeWidth={6} />
        </G>
        <G x={-110} y={170}><RedPen r={-20} s={0.9} /></G>
      </G>
      <G x={300} y={1090} s={p(2, 0.5) * 1.1}><Person fill={SEC} /></G>
      {/* Câu 3: bản thảo bị khoanh dây chùng và hai cột số lệch, bay trả về; phong thư nằm yên. */}
      <G x={340} y={my} s={1.3 * p(3, 0)}>
        <Page w={360} h={460} />
        <path d="M-130 -90 Q0 20 130 -90" fill="none" stroke={GOLD} strokeWidth={7} strokeLinecap="round" />
        <circle cx={-130} cy={-90} r={8} fill={GOLD} />
        <circle cx={130} cy={-90} r={8} fill={GOLD} />
        {[0, 1].map((c) => (
          <g key={c}>
            {[0, 1].map((i) => <rect key={i} x={-120 + c * 140 + i * 50} y={190 - barH[c] - i * 12} width={34} height={barH[c] + i * 12} rx={8} fill={i ? GOLDL : GOLD} />)}
          </g>
        ))}
        <ellipse cx={0} cy={-45} rx={160} ry={64} fill="none" stroke={RED} strokeWidth={7} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ms(0)} />
        <ellipse cx={0} cy={120} rx={160} ry={86} fill="none" stroke={RED} strokeWidth={7} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ms(1)} />
      </G>
      <Box cx={680} cy={1150} w={420} h={36} rx={12} fill={HOV} opacity={l(3, 0.3, 10)} />
      <G x={680} y={1100} s={l(3, 0.3, 10) * 0.9}><Envelope /></G>
      <Box cx={540} cy={290} w={640} h={8} rx={4} fill={GOLD} opacity={0.35} />
      <Twinkle f={f} pts={[[110, 700], [980, 840], [560, 1190], [200, 250], [420, 330], [660, 260], [880, 330]]} />
      <Floor y={1240} />
    </Stage>
  );
};

const Road: React.FC<{ o?: number; f: number }> = ({ o = 1, f }) => (
  <g opacity={o}>
    <path d="M500 560 L580 560 L1000 1230 L80 1230 Z" fill={SURF} stroke={HOV} strokeWidth={5} />
    <path d="M500 560 L80 1230 M580 560 L1000 1230" stroke={GOLD} strokeWidth={6} />
    {Array.from({ length: 8 }, (_, k) => {
      const t = (k + ((f / 30) % 1)) / 8;
      const y = lerp(570, 1220, t * t);
      return <rect key={k} x={540 - lerp(3, 14, t)} y={y} width={lerp(6, 28, t)} height={lerp(10, 60, t)} rx={4} fill={GOLDL} opacity={0.7} />;
    })}
  </g>
);

/** Cảnh 13: cái cân, phòng họp có ánh đèn rọi, rồi con đường phẳng tích dần cột mốc. */
export const ChanChamDat: React.FC = () => {
  const { f, p, l } = useT();
  const chips = Math.floor(l(0, 0.05, 24) * 7);
  const a = lerp(lerp(0, -10, l(0, 0.05, 24)), 13, p(0, 0.65, 10));
  const s0 = 1 - l(1, 0, 10);
  const room = l(1, 0, 8) * (1 - l(2, 0, 12));
  const you = p(1, 0.35);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={400} y={345} p={p(0, 0.05)} solid size={34} o={s0} />
      <Tag i={1} x={800} y={420} p={p(0, 0.6)} solid color={XL} size={34} o={s0} />
      <Tag i={2} x={540} y={930} p={p(1, 0.1)} solid size={28} o={room} />
      <Tag i={3} x={230} y={300} p={p(1, 0.45)} solid size={36} o={room} />
      <Tag i={4} x={540} y={340} p={p(2, 0.4)} solid color={XL} size={36} />
    </>}>
      {/* Cái cân: AI chất số liệu bên trái, người ký chọn phương án bên phải. */}
      <G o={s0} y={130}>
        <line x1={540} y1={520} x2={540} y2={840} stroke={GOLD} strokeWidth={14} />
        <Box cx={540} cy={850} w={300} h={34} rx={12} fill={GOLD} />
        <Box cx={540} cy={900} w={520} h={40} rx={14} fill={HOV} />
        <circle cx={540} cy={520} r={22} fill={GOLDL} />
        <G x={540} y={520} r={a}>
          <line x1={-360} y1={0} x2={360} y2={0} stroke={GOLD} strokeWidth={14} strokeLinecap="round" />
          <G x={-340} y={0} r={-a}>
            <path d="M0 0 L-100 150 M0 0 L100 150" stroke={GOLDL} strokeWidth={5} />
            <path d="M-130 150 Q0 220 130 150 Z" fill={GOLD} />
            {Array.from({ length: chips }, (_, k) => (
              <G key={k} x={k % 2 ? 14 : -14} y={140 - k * 36}>
                <Box cx={0} cy={0} w={150} h={30} rx={9} fill={k % 2 ? TXT : GOLDL} />
                <rect x={-56} y={-5} width={60} height={9} rx={4} fill={INK} opacity={0.5} />
              </G>
            ))}
            <G y={-150 + 4 * sin(f / 7)} s={0.8 * p(0, 0)}><AI size={110} /></G>
          </G>
          <G x={340} y={0} r={-a}>
            <path d="M0 0 L-100 150 M0 0 L100 150" stroke={GOLDL} strokeWidth={5} />
            <path d="M-130 150 Q0 220 130 150 Z" fill={GOLD} />
            <Box cx={0} cy={118} w={170} h={64} rx={12} fill={GOLDL} />
            <G y={30} s={0.95}><Person fill={TXT} s={0.8} /></G>
            <G x={64} y={40} s={0.7} r={25}><Pen /></G>
            <G x={-70} y={85} s={0.9}><TaskCard w={110} fill={XL} /></G>
          </G>
        </G>
      </G>
      {/* Phòng họp: tờ trình có trang khoanh đỏ, sếp ở đầu bàn, bạn đứng dậy trong vệt đèn. */}
      <G o={room}>
        <polygon points="230,260 60,1130 400,1130" fill={GOLDL} opacity={0.14} />
        <Box cx={540} cy={990} w={900} h={170} rx={34} fill={EL} stroke={GOLD} strokeWidth={6} />
        <Box cx={540} cy={1090} w={760} h={26} rx={10} fill={HOV} />
        <G x={540} y={700} s={1.6}><Boss /></G>
        <G x={540} y={930}>
          <Page w={190} h={250} />
          <ellipse cx={0} cy={10} rx={80} ry={30} fill="none" stroke={RED} strokeWidth={7} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - l(1, 0.15, 12)} />
        </G>
        <path d="M540 800 L540 830" stroke={GOLDL} strokeWidth={5} strokeDasharray="6 10" strokeDashoffset={-f} />
        <G x={230} y={lerp(1080, 790, you)}>
          <G s={1.9}><Person fill={TXT} /></G>
          <rect x={-52} y={80} width={40} height={250} rx={16} fill={TXT} />
          <rect x={12} y={80} width={40} height={250} rx={16} fill={TXT} />
        </G>
        <G x={880} y={880} s={0.9}><AI size={160} dim /></G>
      </G>
      {/* Con đường phẳng nối các cột mốc: ô trống rồi tích dần; mã nằm ngoài đường. */}
      <Road f={f} o={l(2, 0, 14)} />
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const t = 0.12 + k * 0.15;
        const y = lerp(580, 1190, Math.min(1, t * t * 1.2));
        const r = lerp(14, 46, t);
        const on = k === 0 ? l(2, 0.35, 8) : 0;
        return (
          <G key={k} x={540} y={y} s={l(2, 0.1, 10)}>
            <circle r={r + 8} fill={INK} stroke={GOLD} strokeWidth={4} />
            <G s={on}><Tick r={r} /></G>
          </G>
        );
      })}
      <G x={165} y={780} s={0.75 * l(2, 0.5, 10)}>
        <CodeWall w={170} h={220} rows={5} />
        <Cross r={60} />
      </G>
      <G x={850} y={480 + 6 * sin(f / 15)} s={l(2, 0.2, 12)}>
        <circle r={56} fill={GOLDL} />
        <Spark r={26} fill={INK} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 14: khóa chân AI, kéo việc lặp sang AI, rồi quay lại mặt bàn mở đầu với con dấu Bài 1. */
export const KhoaChanAiVaHen: React.FC = () => {
  const { f, p, l } = useT();
  const lockT = l(0, 0.35, 14);
  const frozen = 1 - l(0, 0.4, 10);
  const move = l(1, 0, 16);
  const s0 = 1 - l(1, 0, 10);
  const s1 = 1 - l(2, 0, 12);
  const drag = l(1, 0.55, 20);
  const cardX = lerp(352, 730, drag);
  const cardY = lerp(660, 560, drag) - 60 * sin(drag * Math.PI);
  const open = l(2, 0.15, 14);
  const CHIPS: [number, number][] = [[-300, -90], [-230, 140], [-100, -230], [110, -220], [250, -60], [260, 150]];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={300} p={p(0, 0.05)} solid size={44} o={s0} />
      <Tag i={1} x={540} y={365} p={p(1, 0.05)} solid size={36} o={s1} />
      <Tag i={2} x={910} y={650} p={p(2, 0.05)} solid size={42} />
      {l(2, 0.45, 14) > 0 && <BrandEnd k={l(2, 0.45, 14)} />}
    </>}>
      <Road f={f} o={0.55 * s1} />
      <G o={s1}>
        <G o={s0}>
          {CHIPS.map(([cx, cy], k) => (
            <G key={k} x={540 + cx + frozen * 14 * sin(f / 9 + k * 2)} y={640 + cy + frozen * 12 * sin(f / 11 + k)} r={(k % 2 ? 6 : -6) * frozen} s={p(0, 0.02 + k * 0.03)}>
              <Box cx={0} cy={0} w={130} h={56} rx={14} fill={k % 2 ? TXT : GOLDL} />
              <rect x={-48} y={-8} width={70} height={11} rx={5} fill={INK} opacity={0.5} />
            </G>
          ))}
          {[0, 1].map((k) => (
            <ellipse key={k} cx={540} cy={768 + k * 26} rx={22} ry={13} fill="none" stroke={SEC} strokeWidth={8} opacity={lockT} />
          ))}
        </G>
        <G x={lerp(540, 880, move)} y={lerp(640, 540, move) + 6 * sin(f / 12)}><AI size={lerp(220, 140, move)} /></G>
        <G x={lerp(540, 880, move)} y={lerp(985, 690, move)} s={lerp(3.2, 1.6, move) * (0.3 + 0.7 * clamp01(p(0, 0.3)))}>
          <Lock open={1 - lockT} />
        </G>
        {/* Khung bình luận bên dưới và lịch tuần các việc lặp lại. */}
        <G o={l(1, 0.02, 8)}>
          <Box cx={540} cy={1130} w={860} h={150} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} />
          <circle cx={170} cy={1130} r={40} fill={SEC} />
          <Lines x={245} y={1095} w={500} n={3} gap={32} color={HOV} t={13} />
          <rect x={245 + 280 * l(1, 0.3, 24)} y={1083} width={5} height={30} fill={GOLD} opacity={Math.floor(f / 8) % 2} />
          <path d="M850 1100 L915 1130 L850 1160 L865 1130 Z" fill={GOLD} />
          {[0, 1, 2].map((k) => (
            <G key={k} x={440} y={500 + k * 150} s={l(1, 0.1 + k * 0.1, 12)}>
              <Week w={640} hl={2} mark={k === 1 ? 1 : 0} />
            </G>
          ))}
          <Arrow x1={400} y1={650} x2={660} y2={575} p={l(1, 0.7, 14)} color={GOLDL} w={6} dash />
          <G x={cardX} y={cardY} s={drag > 0 ? 1.3 : 0}><TaskCard w={130} fill={GOLDL} /></G>
          <G x={cardX + 4} y={cardY + 62} s={0.55 * l(1, 0.5, 6)}><Hand /></G>
        </G>
      </G>
      {/* Quay lại mặt bàn đầu hook: Excel gọn trong thư mục phía trên, khung chat lớn ở giữa, con dấu Bài 1. */}
      <G o={1 - s1}>
        <Box cx={540} cy={1140} w={880} h={170} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} />
        <rect x={110} y={1165} width={820} height={8} rx={4} fill={GOLD} opacity={0.5} />
        <G x={540} y={560} s={2.4}><Folder open={open} /></G>
        {[0, 1, 2].map((k) => (
          <G key={k} x={380 + k * 160} y={lerp(540, 350, open) - (k === 1 ? 24 : 0) + 4 * sin(f / 12 + k)} r={(k - 1) * 9} s={0.9}>
            <Excel />
          </G>
        ))}
        <G x={540} y={910 + 3 * sin(f / 20)}>
          <Chat w={800} h={470} lit>
            <G x={150} y={-60}><Bubble w={300} h={80} fill={HOV} n={1} ink={TXT} /></G>
            <G x={130} y={150}><Box cx={0} cy={0} w={420} h={54} rx={27} fill={SURF} stroke={HOV} strokeWidth={4} /></G>
          </Chat>
        </G>
        <Seal x={910} y={500} land={l(2, 0, 8)} lift={l(2, 0.22, 10)} r={80} color={GOLD} mark="spark" />
      </G>
      <Twinkle f={f} pts={[[100, 560], [980, 480], [100, 1180], [980, 1190]]} />
      <Floor y={1240} />
    </Stage>
  );
};
