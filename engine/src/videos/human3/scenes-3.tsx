import React from "react";
import { Arrow, Box, BrandEnd, Cross, EL, Floor, G, GOLD, GOLDL, Hand, HOV, INK, Lines, Mag, PAPER, Question, RED, SEC, Stamp, SURF, TXT, lerp, useT } from "../shared/art";
import {
  Badge, Ban, Battery, BigArrow, Bolt, Camera, Chain, ChatWin, clamp01, Coin, Corner, CornerTile, Drill, Gauge, Guy, House, MarkGem, Mini, MonthPage,
  Moon, Paper, Phone, PromptCard, Quad, Sprout, Stairs, Talk, Target, Trap, Warn,
  Stage, Tag,
} from "./art";
import { Cursor, MarkClaude, MarkGpt } from "../bai-1/art";
import { Heart, Star } from "../bai-4/art";

const Num: React.FC<{ n: string | number; r?: number; on?: boolean }> = ({ n, r = 34, on = true }) => (
  <g>
    <circle r={r} fill={on ? GOLD : INK} stroke={GOLD} strokeWidth={5} />
    <text y={r * 0.38} textAnchor="middle" fontSize={r * 1.05} fontWeight={800} fill={on ? INK : GOLDL} fontFamily="Inter, sans-serif">{n}</text>
  </g>
);

/** Cảnh 26 — Bảy thẻ báo cáo; Metatype và bốn huy hiệu ghép; bảng có cột bằng chứng; liên hệ, đòn bẩy, một câu; lộ trình bốn mốc. */
export const BaoCao7: React.FC = () => {
  const { f, p, l } = useT();
  const fan = l(0, 0, 20);
  const meta = l(1, 0, 14);
  const b = [l(2, 0.15, 12), l(2, 0.55, 12), l(3, 0.15, 12), l(3, 0.55, 12)];
  const tbl = l(4, 0, 16);
  const ev = l(4, 0.5, 20);
  const link = l(5, 0, 16);
  const one = l(5, 0.6, 12);
  const road = l(6, 0, 30);
  const m30 = l(6, 0.2, 12);
  const m90 = l(6, 0.6, 12);
  const m6 = l(7, 0.05, 12);
  const m1 = l(7, 0.55, 12);
  const phase = (k: number) => [meta, tbl, link, link, road][k] ?? 0;
  const active = road > 0.01 ? 4 : link > 0.01 ? 2 : tbl > 0.01 ? 1 : meta > 0.01 ? 0 : -1;
  return (
    <Stage bg={INK} fit={{ dy: 40 }} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.2)} solid size={44} />
      <Tag i={1} x={270} y={470} p={p(1, 0.1)} solid size={40} o={1 - tbl} />
      <Tag i={2} x={270} y={900} p={p(1, 0.5)} size={32} o={1 - tbl} />
      <Tag i={3} x={650} y={665} p={b[0]} size={28} o={1 - tbl} w={200} />
      <Tag i={4} x={880} y={665} p={b[1]} size={26} o={1 - tbl} w={200} />
      <Tag i={5} x={650} y={955} p={b[2]} size={28} o={1 - tbl} w={200} />
      <Tag i={6} x={880} y={955} p={b[3]} size={26} o={1 - tbl} w={200} />
      <Tag i={7} x={880} y={470} p={l(4, 0.5, 10)} solid size={34} o={1 - link} />
      <Tag i={8} x={300} y={1110} p={l(5, 0.3, 10)} solid size={34} o={1 - road} />
      <Tag i={9} x={780} y={1010} p={one} solid size={34} o={1 - road} />
      <Tag i={10} x={180} y={1010} p={m30} size={32} />
      <Tag i={11} x={420} y={1010} p={m90} size={32} />
      <Tag i={12} x={680} y={1000} p={m6} size={28} w={200} />
      <Tag i={13} x={910} y={1000} p={m1} size={28} w={200} />
    </>}>
      {/* Hàng bảy thẻ: thẻ đang nói sáng lên. */}
      {Array.from({ length: 7 }, (_, k) => (
        <G key={k} x={lerp(540, 120 + k * 140, fan)} y={330} s={fan * (k === active || (active === 2 && k === 3) || (active === 4 && k === 4) ? 1.1 : 0.85)} r={(k - 3) * 2 * (1 - fan)}>
          <Box cx={0} cy={0} w={110} h={130} rx={16} fill={k === active || (active === 2 && k === 3) ? "#3A3322" : phase(k) > 0.5 || k < active ? EL : SURF} stroke={k === active || (active === 2 && k === 3) ? GOLD : HOV} strokeWidth={5} />
          <G y={0}><Num n={k + 1} r={26} on={k <= active || (active === 2 && k === 3)} /></G>
        </G>
      ))}
      {/* Phần 1: huy hiệu riêng kèm ba dòng; bốn huy hiệu ghép. */}
      <G o={1 - tbl}>
        <G x={270} y={660} s={meta * 1.2}>
          <circle r={110} fill={EL} stroke={GOLD} strokeWidth={8} />
          <G s={1.4}><Star r={50} fill={GOLD} /></G>
          {[0, 1, 2].map((k) => <rect key={k} x={-120} y={140 + k * 28} width={240 - k * 50} height={12} rx={6} fill={SEC} opacity={clamp01(meta * 3 - k)} />)}
        </G>
        {([[0, 3, 650, 560], [1, 2, 880, 560], [0, 2, 650, 850], [1, 3, 880, 850]] as const).map(([a, c, x, y], k) => (
          <G key={k} x={x} y={y} s={b[k]}><Badge a={a} b={c} /></G>
        ))}
      </G>
      {/* Phần 2: bảng bốn hàng năm cột, cột bằng chứng nối về bong bóng trả lời. */}
      <G o={tbl * (1 - link)}>
        <G x={420} y={740} s={tbl * 1.05}>
          <Box cx={0} cy={0} w={640} h={480} rx={24} fill={PAPER} />
          {[0, 1, 2, 3, 4].map((c) => <rect key={c} x={-300 + c * 122} y={-220} width={112} height={60} rx={10} fill={c === 4 ? GOLD : "#D9CFBC"} />)}
          {[0, 1, 2, 3].map((r) => (
            <G key={r} y={-120 + r * 92}>
              <G x={-244} s={0.32}><Corner k={r} color={INK} /></G>
              {[1, 2, 3, 4].map((c) => <rect key={c} x={-300 + c * 122} y={-36} width={112} height={72} rx={10} fill={c === 4 && ev > 0.3 ? "#F4D58A" : "#E6DCC8"} />)}
            </G>
          ))}
        </G>
        <G x={900} y={760} s={tbl * 0.75}><ChatWin w={260} h={380}>{[0, 1, 2, 3].map((k) => <G key={k} x={20} y={-110 + k * 66}><Talk w={180} h={46} me n={1} /></G>)}</ChatWin></G>
        {[0, 1, 2, 3].map((r) => <path key={r} d={`M${420 + 290} ${620 + r * 96} Q${800} ${580 + r * 92} ${880} ${680 + r * 40}`} fill="none" stroke={GOLD} strokeWidth={4} strokeDasharray="8 6" opacity={clamp01(ev * 4 - r)} />)}
      </G>
      {/* Phần 3, 4: liên hệ giữa các góc, đòn bẩy; một câu trong đích ngắm. */}
      <G o={link * (1 - road)}>
        <G x={290} y={700} s={link * 1.25}>
          {[0, 1, 2, 3].map((k) => <G key={k} x={(k % 2 ? 1 : -1) * 110} y={(k > 1 ? 1 : -1) * 110}><CornerTile k={k} w={180} h={180} lit={k !== 1 ? 1 : 0} red={k === 1 ? 1 : 0} t={f} /></G>)}
          <Arrow x1={110} y1={-20} x2={110} y2={-200 + 220} p={0} />
          <path d="M60 -110 Q0 -10 -60 90" fill="none" stroke={RED} strokeWidth={8} />
          <path d="M-60 90 l-6 -30 l26 14 Z" fill={RED} />
          <G x={-110} y={260} s={0.8}><rect x={-120} y={-8} width={240} height={16} rx={8} fill={GOLD} transform="rotate(-12)" /><path d="M-20 30 L0 0 L20 30 Z" fill={GOLDL} /></G>
        </G>
        <G x={790} y={720} s={one * 1.1}>
          <Target s={2.6} />
          <rect x={-150} y={-14} width={300} height={28} rx={14} fill={TXT} />
        </G>
      </G>
      {/* Phần 5: lộ trình bốn mốc. */}
      <G o={road}>
        <path d="M90 960 Q330 880 420 920 T680 870 T980 800" fill="none" stroke={GOLD} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - road} />
        <G x={170} y={830} s={m30 * 1.3}>{[0, 1, 2].map((k) => <G key={k} x={-60 + k * 60} y={0}><Sprout s={0.7} g={m30} /></G>)}<rect x={-90} y={30} width={180} height={10} rx={4} fill={GOLDL} /></G>
        <G x={420} y={760} s={m90 * 1.2}>{[0, 1, 2].map((k) => <G key={k} x={-60 + k * 60} y={20}><rect x={-3} y={-80} width={6} height={80} fill={TXT} /><path d="M3 -80 L44 -68 L3 -56 Z" fill={GOLD} /></G>)}<G x={0} y={70} s={0.35}><Gauge v={0.6} /></G></G>
        <G x={680} y={720} s={m6 * 1.4}>{[0, 1, 2, 3].map((k) => <G key={k} x={-90 + k * 60} y={20} s={0.3}><Corner k={k} color={GOLDL} /></G>)}<G y={-70} s={0.6}><Mini color={SEC} /></G></G>
        <G x={890} y={620} s={m1 * 1.3}><Box cx={0} cy={0} w={170} h={170} rx={14} fill="none" stroke={GOLD} strokeWidth={8} /><G x={-30} y={60}><Stairs n={2} step={50} rise={36} lit={[1, 1]} /></G><G x={30} y={-10} s={0.5}><Mini color={GOLDL} /></G></G>
      </G>
    </Stage>
  );
};

/** Cảnh 27 — Thẻ 6: hai cái bẫy; thẻ 7: nút hôm nay 15 phút; ô trống đóng dấu cần thêm thông tin. */
export const BaoCaoCuoi: React.FC = () => {
  const { f, p, l } = useT();
  const traps = l(0, 0.1, 16);
  const walk = l(0, 0.3, 50);
  const btn = l(1, 0.05, 14);
  const press = l(1, 0.5, 6);
  const tbl = l(2, 0, 14);
  const stamp = l(2, 0.5, 8);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={300} y={215} p={p(0, 0.15)} solid color={RED} size={42} />
      <Tag i={1} x={700} y={215} p={p(1, 0.1)} solid size={42} />
      <Tag i={2} x={800} y={680} p={p(1, 0.4)} size={36} />
      <Tag i={3} x={540} y={1045} p={stamp} solid color={RED} size={40} />
    </>}>
      {/* Đường lộ trình có hai cái bẫy, người bước vòng. */}
      <G x={0} y={40} s={1.15}>
        <path d="M60 620 Q300 480 520 600" fill="none" stroke={GOLD} strokeWidth={12} strokeLinecap="round" opacity={0.7} />
        <G x={200} y={560} s={traps * 0.9}><Trap shut={0.2} /></G>
        <G x={400} y={560} s={traps * 0.9}><Trap shut={0.2} /></G>
        <G x={lerp(80, 500, walk)} y={lerp(560, 520, walk) - Math.sin(walk * Math.PI * 2) * 90} s={0.55}><Guy pose="walk" t={f} /></G>
      </G>
      <G x={120} y={330} s={p(0, 0)}><Box cx={0} cy={0} w={110} h={130} rx={16} fill="#3A3322" stroke={GOLD} strokeWidth={5} /><Num n={6} r={26} /></G>
      {/* Nút hôm nay. */}
      <G x={800} y={470} s={btn * 1.3}>
        <circle r={120} fill={HOV} />
        <circle r={100} cy={press * 10} fill={GOLD} />
        <circle r={100} fill="none" stroke={GOLDL} strokeWidth={6} pathLength={1} strokeDasharray={`${0.25} 1`} transform="rotate(-90)" />
        <G x={70} y={-140} s={1.1}><Hand s={0.5} r={-20} /></G>
        <G y={0} s={0.5}><Num n={7} r={40} on={false} /></G>
      </G>
      {/* Bảng có ô trống được đóng dấu. */}
      <G x={540} y={860} s={tbl}>
        <Box cx={0} cy={0} w={760} h={230} rx={22} fill={PAPER} />
        {[0, 1].map((r) => [0, 1, 2, 3].map((c) => (
          <rect key={`${r}${c}`} x={-360 + c * 180} y={-100 + r * 104} width={170} height={94} rx={10} fill={r === 1 && c === 2 ? "#FFF8EA" : "#E6DCC8"} stroke={r === 1 && c === 2 ? RED : "none"} strokeWidth={4} strokeDasharray="10 8" />
        )))}
        {[0, 1].map((r) => [0, 1, 3].map((c) => <rect key={`l${r}${c}`} x={-340 + c * 180} y={-64 + r * 104} width={120} height={12} rx={6} fill={SEC} />))}
        <G x={65} y={50} s={stamp} r={-12}><circle r={58} fill="none" stroke={RED} strokeWidth={8} /><Question s={0.42} color={RED} /></G>
      </G>
    </Stage>
  );
};

/** Cảnh 28 — Anh Minh giả định; bảng bốn góc của anh từng hàng; chuyển hoá giả: chồng sách cao, người đứng yên. */
export const AnhMinh: React.FC = () => {
  const { f, p, l } = useT();
  const intro = l(0, 0, 16);
  const rows = [l(1, 0.05, 12), l(3, 0.05, 12), l(4, 0.05, 12), l(5, 0.05, 12)];
  const fake = l(2, 0, 16);
  const books = l(2, 0.1, 40);
  const Y = [520, 680, 840, 1000];
  const pos = ["2.1", "1.2", "1.3", "2.1"];
  // Khi phóng to chuyển hoá giả, bảng hàng ẩn hẳn rồi hiện lại, không để bóng mờ dưới khung.
  const show = 1 - fake * (1 - rows[1]);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={250} y={230} p={p(0, 0.05)} solid color={SEC} size={32} />
      <Tag i={1} x={560} y={230} p={p(0, 0.25)} solid size={38} />
      <Tag i={2} x={560} y={300} p={p(0, 0.45)} size={32} />
      <Tag i={3} x={360} y={Y[0]} p={rows[0]} solid size={34} o={show} />
      <Tag i={4} x={660} y={Y[0] - 100} p={l(2, 0.3, 10)} solid color={RED} size={32} />
      <Tag i={5} x={360} y={Y[1]} p={rows[1]} solid size={34} />
      <Tag i={6} x={920} y={Y[1]} p={l(3, 0.5, 10)} size={28} />
      <Tag i={7} x={360} y={Y[2]} p={rows[2]} solid size={34} />
      <Tag i={8} x={920} y={Y[2]} p={l(4, 0.5, 10)} size={28} />
      <Tag i={9} x={920} y={Y[3]} p={l(5, 0.5, 10)} size={28} />
    </>}>
      {/* Anh Minh và biểu đồ thu nhập đi ngang. */}
      <G x={lerp(300, 90, rows[0])} y={lerp(900, 420, rows[0])} s={intro * lerp(1.4, 0.45, rows[0])}>
        <Guy />
        <G x={0} y={-60}><Box cx={0} cy={0} w={50} h={34} rx={6} fill={GOLD} /></G>
      </G>
      <G x={760} y={640} s={intro * 1.5 * (1 - rows[0])} o={1 - rows[0]}>
        <Box cx={0} cy={0} w={300} h={200} rx={18} fill={EL} stroke={HOV} strokeWidth={4} />
        <path d="M-120 40 L-60 30 L0 34 L60 28 L120 32" fill="none" stroke={GOLD} strokeWidth={8} strokeLinecap="round" />
        <line x1={-130} x2={130} y1={70} y2={70} stroke={SEC} strokeWidth={4} />
      </G>
      {/* Bốn hàng. */}
      {[0, 1, 2, 3].map((k) => (
        <G key={k} x={0} y={Y[k]} o={rows[k] * show}>
          <Box cx={590} cy={0} w={880} h={140} rx={22} fill={SURF} stroke={HOV} strokeWidth={4} />
          <G x={190} s={0.45}><Corner k={k} color={GOLDL} t={f} /></G>
          {k === 0 && <G>
            <G x={520}>{[0, 1, 2, 3].map((j) => <rect key={j} x={-50} y={30 - j * 22 - lerp(0, 40, books) * (j / 3)} width={100} height={20} rx={4} fill={[GOLD, SEC, GOLDL, HOV][j]} />)}</G>
            <G x={620}><path d="M-30 30 L-10 0 L10 14 L30 -20" stroke={GOLD} strokeWidth={6} fill="none" /></G>
            <G x={720}><Arrow x1={-30} y1={0} x2={30} y2={0} color={SEC} w={6} /><line x1={0} y1={-20} x2={0} y2={20} stroke={RED} strokeWidth={8} /></G>
            <G x={800} s={0.4}><Guy fill={SEC} /></G>
          </G>}
          {k === 1 && <G>
            <G x={520} s={0.4}><path d="M0 -70 L60 -48 Q62 30 0 76 Q-62 30 -60 -48 Z" fill={GOLD} /></G>
            <G x={640}><Moon r={34} /><text x={50} y={14} fontSize={36} fontWeight={800} fill={GOLDL} fontFamily="Inter, sans-serif">5</text></G>
            <G x={760} s={0.6}><Battery level={0.12} /></G>
          </G>}
          {k === 2 && <G>
            <G x={520} s={0.6}><House color={SEC} /><G y={-10} s={0.5}><Heart color={GOLD} /></G></G>
            <G x={640}><Arrow x1={-30} y1={-20} x2={40} y2={20} color={SEC} w={6} /></G>
            <G x={740} s={0.3}><Question color={GOLDL} /></G>
          </G>}
          {k === 3 && <G>
            <G x={520}><path d="M-50 10 Q-20 -20 0 0 Q20 -20 50 10" stroke={GOLD} strokeWidth={14} fill="none" strokeLinecap="round" /><G x={0} y={-36} s={0.3}><Star r={40} /></G></G>
            <G x={640}><Box cx={0} cy={0} w={60} h={44} rx={8} fill={GOLD} /></G>
            <line x1={670} y1={0} x2={740} y2={0} stroke={SEC} strokeWidth={4} />
            <G x={760} s={0.35}><MonthPage w={160} h={150} marks={0} /></G>
          </G>}
        </G>
      ))}
      {/* Chuyển hoá giả phóng to: chồng sách lên trần, người đứng yên. */}
      <G o={fake * (1 - rows[1])}>
        <G x={400} y={1000}>{Array.from({ length: Math.round(lerp(2, 14, books)) }, (_, j) => <rect key={j} x={-90 + (j % 2) * 10} y={-30 - j * 34} width={180} height={30} rx={5} fill={[GOLD, SEC, GOLDL, HOV][j % 4]} />)}</G>
        <G x={720} y={980} s={0.9}><Guy fill={SEC} /></G>
        <G x={720} y={600} s={0.6}><Ban r={70} color={RED} /></G>
      </G>
    </Stage>
  );
};

/** Cảnh 29 — Anh Minh đẩy mũi tên bằng giờ làm thêm, hai sợi kìm như hình mở đầu; báo thức 23h và ba việc hứng thú. */
export const MinhCotLoi: React.FC = () => {
  const { f, p, l } = useT();
  const push = l(0, 0, 16);
  const ropes = l(0, 0.45, 16);
  const alarm = l(1, 0.05, 14);
  const list = l(1, 0.45, 20);
  const loose = l(1, 0.8, 16);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={300} y={215} p={p(0, 0.15)} solid size={38} />
      <Tag i={1} x={220} y={1010} p={p(0, 0.6)} size={34} />
      <Tag i={2} x={480} y={1010} p={p(0, 0.7)} size={34} />
      <Tag i={3} x={350} y={1080} p={p(0, 0.85)} solid color={RED} size={36} />
      <Tag i={4} x={790} y={215} p={p(1, 0.05)} solid size={38} />
      <Tag i={5} x={790} y={290} p={p(1, 0.2)} size={40} />
      <Tag i={6} x={790} y={1010} p={list} size={34} />
    </>}>
      <G x={0} y={0}>
        <G x={380} y={640} s={push * 0.75}><BigArrow h={360} w={140} /></G>
        <G x={200} y={640} s={push * 0.7}><Guy pose="push" t={f} /></G>
        {[0, 1, 2].map((k) => <G key={k} x={150 + k * 50} y={400 - k * 40} s={push * 0.3}><Box cx={0} cy={0} w={90} h={90} rx={45} fill={TXT} stroke={GOLD} strokeWidth={6} /><line x1={0} y1={0} x2={0} y2={-30} stroke={INK} strokeWidth={6} transform={`rotate(${f * 8 + k * 60})`} /></G>)}
        {[0, 1].map((k) => {
          const to: [number, number] = [k ? 480 : 220, 900];
          const lx = lerp(330, to[0], ropes);
          return (
            <g key={k} opacity={ropes}>
              <line x1={330} y1={660} x2={lx} y2={lerp(660, to[1] - 70, ropes)} stroke={k === 0 && loose > 0.5 ? SEC : RED} strokeWidth={6} strokeDasharray={k === 0 && loose > 0.5 ? "8 12" : undefined} />
              <G x={to[0]} y={to[1] + (k === 0 ? loose * 60 : 0)} s={ropes * 0.8}>
                <Box cx={0} cy={0} w={150} h={120} rx={20} fill={HOV} />
                {k === 0 ? <Moon r={34} /> : <Question s={0.35} color={GOLDL} />}
              </G>
            </g>
          );
        })}
      </G>
      <line x1={560} x2={560} y1={180} y2={1100} stroke={HOV} strokeWidth={4} strokeDasharray="12 14" opacity={alarm} />
      <G x={790} y={540} s={alarm}>
        <Phone w={260} h={380}>
          <G y={-60}><path d="M-34 24 Q-30 18 -28 -6 Q-26 -40 0 -42 Q26 -40 28 -6 Q30 18 34 24 Z" fill={GOLD} /><circle cx={0} cy={34} r={9} fill={GOLDL} /></G>
          <G y={80}><Box cx={0} cy={0} w={160} h={70} rx={35} fill={GOLD} /><circle cx={40} cy={0} r={28} fill={TXT} /></G>
        </Phone>
      </G>
      <G x={790} y={850} s={list}>
        <Box cx={0} cy={0} w={360} h={190} rx={16} fill={PAPER} />
        {[0, 1, 2].map((k) => (
          <G key={k} y={-56 + k * 56} o={clamp01(list * 3 - k)}>
            <circle cx={-140} cy={0} r={18} fill={GOLD} />
            <text x={-140} y={9} textAnchor="middle" fontSize={24} fontWeight={800} fill={INK} fontFamily="Inter, sans-serif">{k + 1}</text>
            <rect x={-110} y={-7} width={190} height={14} rx={7} fill={SEC} />
            <G x={130} s={0.4}><Star r={36} fill={GOLD} /></G>
          </G>
        ))}
      </G>
    </Stage>
  );
};

/** Cảnh 30 — Ba đèn nguyên tắc: góc thấp nhất trước, bắt đầu thật nhỏ, ảnh chụp một thời điểm; vẽ lại bản đồ mỗi 3–6 tháng. */
export const NguyenTac: React.FC = () => {
  const { f, p, l } = useT();
  const lamps = [l(1, 0, 10), l(2, 0, 10), l(3, 0, 10)];
  const lift = l(1, 0.3, 24);
  const spread = l(1, 0.65, 24);
  const days = l(2, 0.2, 40);
  const ban = l(2, 0.75, 8);
  const snap = l(3, 0.15, 6);
  const up = l(3, 0.35, 14);
  const bolt = l(3, 0.7, 10);
  const redo = l(4, 0.05, 30);
  const X = [230, 540, 850];
  const h0 = [220, 200, 90, 230];
  return (
    <Stage bg={INK} fit={{ dy: 40 }} overlay={<>
      <Tag i={0} x={X[0]} y={395} p={lamps[0]} solid size={28} w={250} />
      <Tag i={1} x={X[1]} y={395} p={lamps[1]} solid size={28} w={250} />
      <Tag i={2} x={X[1]} y={1010} p={l(2, 0.2, 10)} size={30} />
      <Tag i={3} x={X[1]} y={720} p={l(2, 0.3, 10)} size={30} />
      <Tag i={4} x={X[2]} y={380} p={lamps[2]} solid size={32} />
      <Tag i={5} x={X[2]} y={1010} p={bolt} solid color={RED} size={32} />
      <Tag i={6} x={640} y={170} p={l(4, 0.4, 10)} solid size={36} />
    </>}>
      {/* Ba cột đèn. */}
      {X.map((x, k) => (
        <G key={k} x={x} y={300} s={p(0, 0.1 + k * 0.15)}>
          <rect x={-6} y={0} width={12} height={40} fill={HOV} />
          <circle r={44} fill={lamps[k] > 0.5 ? GOLD : HOV} />
          {lamps[k] > 0.5 && <circle r={70} fill={GOLD} opacity={0.15} />}
          <text y={16} textAnchor="middle" fontSize={44} fontWeight={800} fill={INK} fontFamily="Inter, sans-serif">{k + 1}</text>
        </G>
      ))}
      {/* 1: cột thấp nhất được nâng, lan sang cột khác. */}
      <G x={X[0]} y={1000} o={lamps[0]}>
        {[0, 1, 2, 3].map((k) => {
          const h = h0[k] + (k === 2 ? lift * 120 : spread * 40);
          return (
            <G key={k} x={-120 + k * 80}>
              <Box cx={0} cy={-h / 2} w={64} h={h} rx={12} fill={k === 2 ? "#3A3322" : EL} stroke={GOLD} strokeWidth={4} />
              <G y={-h - 34} s={0.3}><Corner k={k} color={GOLDL} t={f} /></G>
            </G>
          );
        })}
        {spread > 0.05 && [-1, 1].map((d) => <path key={d} d={`M40 ${-280} q${d * 40} -40 ${d * 80} 0`} stroke={GOLDL} strokeWidth={5} fill="none" opacity={spread} />)}
      </G>
      {/* 2: ba hạt giống trên lịch 30 ngày, chồng việc to bị gạch. */}
      <G x={X[1]} y={560} o={lamps[1]}>
        <G y={300} s={0.95}><MonthPage w={300} h={260} marks={Math.round(days * 30)} cells={30} /></G>
        {[0, 1, 2].map((k) => <G key={k} x={-80 + k * 80} y={120}><Sprout s={0.8} g={days} /></G>)}
        <G x={0} y={-20} s={0.7} o={1 - ban * 0.4}>{Array.from({ length: 8 }, (_, j) => <rect key={j} x={-70} y={-j * 22} width={140} height={20} rx={4} fill={SEC} />)}<G y={-80}><Ban r={110} /></G></G>
      </G>
      {/* 3: máy ảnh chụp bậc thang; người lên rồi lùi khi có tia sét. */}
      <G x={X[2]} y={600} o={lamps[2]}>
        <G y={-120} s={0.55}><Camera flash={snap * (1 - up)} /></G>
        <G y={180}>
          <Box cx={0} cy={0} w={300} h={260} rx={8} fill={TXT} />
          <Box cx={0} cy={0} w={270} h={230} rx={4} fill={EL} />
          <G x={-120} y={110}><Stairs n={3} step={80} rise={60} lit={[1, 1, 1]} /></G>
          <G x={lerp(-80, 0, up) - bolt * 80} y={lerp(40, -20, up) + bolt * 60} s={0.35}><Guy /></G>
          <G x={80} y={-60} s={bolt * 0.7}><Bolt /></G>
        </G>
      </G>
      {/* Vẽ lại bản đồ, vòng lặp. */}
      <G x={400} y={170} s={redo * 0.7} o={redo}>
        <circle r={70} fill="none" stroke={GOLD} strokeWidth={8} strokeDasharray="300 140" transform={`rotate(${f * 4})`} />
        <G s={0.5}><Quad size={180} /></G>
      </G>
    </Stage>
  );
};

/** Cảnh 31 — Ba thẻ prompt cắm vào ba khung chat; Prompt 1 phóng to; vai trò; bốn mục của prompt. */
export const BoPrompt: React.FC = () => {
  const { f, p, l } = useT();
  const deal = l(0, 0.05, 24);
  const one = l(1, 0, 16);
  const role = l(2, 0, 16);
  const secs = [l(3, 0.05, 10), l(3, 0.3, 10), l(3, 0.55, 10), l(3, 0.78, 10)];
  const lit = secs.reduce((a, v, k) => (v > 0.5 ? k : a), role > 0.5 ? 0 : -1);
  const W: [number, number][] = [[200, 470], [540, 470], [880, 470]];
  return (
    <Stage bg={INK} fit={{ dy: 40 }} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.05)} solid size={44} o={1 - one} />
      <Tag i={1} x={300} y={290} p={p(0, 0.25)} size={32} o={1 - one} />
      <Tag i={2} x={780} y={290} p={p(0, 0.45)} solid size={32} o={1 - one} />
      <Tag i={3} x={300} y={215} p={p(1, 0.05)} solid size={44} />
      <Tag i={4} x={300} y={285} p={p(1, 0.4)} size={34} />
      <Tag i={5} x={800} y={430} p={l(2, 0.05, 10)} solid size={34} o={1 - secs[1]} />
      <Tag i={6} x={800} y={500} p={l(2, 0.6, 10)} size={32} o={1 - secs[1]} />
      {[0, 1, 2, 3].map((k) => <Tag key={k} i={k === 0 ? 5 : 6 + k} x={830} y={460 + k * 140} p={secs[k]} solid={lit === k} size={30} o={secs[1] > 0.01 ? 1 : 0} />)}
    </>}>
      {/* Ba khung chat với ba thẻ cắm vào. */}
      <G o={1 - one}>
        {W.map(([x, y], k) => (
          <G key={k} x={x} y={y + 200} s={deal * 0.6}>
            <ChatWin w={420} h={360} mark={k === 0 ? <MarkClaude r={40} /> : k === 1 ? <MarkGem r={40} /> : <MarkGpt r={40} />} />
          </G>
        ))}
        {W.map(([x, y], k) => (
          <G key={k} x={lerp(540, x, deal)} y={lerp(1000, y + 180, deal)} s={0.38} r={(1 - deal) * (k - 1) * 20}>
            <PromptCard w={260} h={320} sections={3} />
            <G x={0} y={-130}><Num n={k + 1} r={30} /></G>
          </G>
        ))}
        <G x={540} y={980} s={p(0, 0.45) * 0.7}><Box cx={0} cy={0} w={420} h={110} rx={16} fill={EL} stroke={HOV} strokeWidth={4} /><Lines x={-180} y={-30} w={360} n={3} gap={24} color={GOLDL} t={8} /></G>
      </G>
      {/* Prompt 1 phóng to, mục đang nói sáng. */}
      <G x={300} y={700} s={one}>
        <PromptCard w={420} h={680} sections={4} lit={lit} />
        <G x={160} y={-300}><circle r={60} fill={INK} stroke={GOLD} strokeWidth={6} /><path d="M0 0 L0 -40 A40 40 0 1 1 -38 -12 Z" fill={GOLD} opacity={0.7} /></G>
      </G>
      {/* Nhân vật AI chuyên gia phỏng vấn với huy hiệu tính cách. */}
      <G x={800} y={760} s={role * (1 - secs[1])} o={role * (1 - secs[1])}>
        <Box cx={0} cy={-80} w={200} h={180} rx={44} fill={INK} stroke={GOLD} strokeWidth={8} />
        {[-40, 40].map((x) => <circle key={x} cx={x} cy={-90} r={16} fill={GOLDL} />)}
        <rect x={-30} y={-46} width={60} height={10} rx={5} fill={GOLD} />
        <Box cx={0} cy={110} w={200} h={160} rx={30} fill={EL} stroke={GOLD} strokeWidth={6} />
        <Box cx={0} cy={60} w={120} h={40} rx={10} fill={GOLD} />
        {[0, 1, 2, 3].map((k) => <G key={k} x={-60 + k * 40} y={140} s={clamp01(l(2, 0.2 + k * 0.15, 8))}><circle r={16} fill={k % 2 ? GOLDL : GOLD} /></G>)}
      </G>
      {/* Bốn mục có hình nhỏ. */}
      {[0, 1, 2, 3].map((k) => (
        <G key={k} x={590} y={460 + k * 140} s={secs[k] * 0.42} o={secs[1] > 0.01 ? 1 : 0}>
          {k === 0 && <G><Box cx={0} cy={-40} w={120} h={110} rx={30} fill={INK} stroke={GOLD} strokeWidth={8} /><circle cx={-25} cy={-44} r={10} fill={GOLDL} /><circle cx={25} cy={-44} r={10} fill={GOLDL} /></G>}
          {k === 1 && <Quad size={200} />}
          {k === 2 && <ChatWin w={200} h={160} />}
          {k === 3 && <Paper w={150} h={190} n={4} head={GOLD} />}
        </G>
      ))}
    </Stage>
  );
};

/** Cảnh 32 — Prompt 2: lịch 30 ngày, 10 phút; báo cáo cũ dán vào, ba dải thói quen; mỗi góc một câu; tiến hay đứng yên; giữ, bỏ, thay. */
export const Prompt2: React.FC = () => {
  const { f, p, l } = useT();
  const card = l(0, 0, 16);
  const paste = l(1, 0.05, 14);
  const habits = l(1, 0.35, 24);
  const ask = [0, 1, 2, 3].map((k) => l(2, 0.1 + k * 0.2, 8));
  const verdict = l(3, 0.05, 16);
  const mag = l(3, 0.6, 20);
  const sort = l(4, 0.05, 30);
  const marks = [22, 14, 9];
  return (
    <Stage bg={INK} fit={{ s: 1.08, dy: 30 }} overlay={<>
      <Tag i={0} x={260} y={215} p={p(0, 0.05)} solid size={42} />
      <Tag i={1} x={260} y={285} p={p(0, 0.3)} size={36} />
      <Tag i={2} x={800} y={215} p={p(0, 0.6)} solid size={38} />
      <Tag i={3} x={260} y={560} p={paste} size={32} o={1 - sort} />
      <Tag i={4} x={790} y={760} p={l(1, 0.7, 10)} solid color={RED} size={32} o={1 - mag} />
      <Tag i={5} x={300} y={1080} p={verdict} solid size={34} o={1 - sort} />
      <Tag i={6} x={580} y={1080} p={l(3, 0.3, 10)} size={34} o={1 - sort} />
      <Tag i={7} x={540} y={770} p={l(4, 0.3, 10)} solid size={36} />
    </>}>
      {/* Thẻ Prompt 2 và lịch 30 ngày, đồng hồ 10 phút. */}
      <G x={260} y={410} s={card * 0.55}><PromptCard w={300} h={260} sections={2} /><G x={0} y={-90}><Num n={2} r={32} /></G></G>
      <G x={800} y={400} s={card * 0.8}>
        <MonthPage w={260} h={230} marks={30} cells={30} />
        <G x={160} y={-60}><circle r={50} fill={TXT} stroke={GOLD} strokeWidth={7} /><path d="M0 0 L0 -50 A50 50 0 0 1 29 -40 Z" fill={GOLD} /></G>
      </G>
      {/* Báo cáo cũ dán vào khung chat; ba dải thói quen. */}
      <G x={540} y={760} o={1 - sort * 0.0}>
        <G x={-280} y={-60} s={paste * 0.55 * (1 - sort)}><Paper w={240} h={290} n={6} head={GOLD} /></G>
        {[0, 1, 2].map((k) => (
          <G key={k} x={-120} y={-100 + k * 90} o={habits * (1 - sort)}>
            <G x={-30} s={0.35}><Sprout g={1} /></G>
            {Array.from({ length: 30 }, (_, d) => (
              <rect key={d} x={d * 13} y={-14} width={10} height={28} rx={3} fill={d < marks[k] * habits ? GOLD : HOV} opacity={d === marks[k] ? 0 : 1} />
            ))}
            {habits > 0.9 && <G x={marks[k] * 13 + 6} y={-6}><ellipse rx={14} ry={10} fill={SEC} /></G>}
          </G>
        ))}
      </G>
      {/* Mỗi góc một câu hỏi, rồi mũi tên tiến hoặc dấu bằng đứng yên. */}
      {[0, 1, 2, 3].map((k) => (
        <G key={k} x={210 + k * 220} y={960} s={ask[k] * lerp(1, 0.8, sort)}>
          <CornerTile k={k} w={140} h={140} lit={1} t={f} />
          <G x={60} y={-80} s={0.4 * (1 - verdict)}><Talk w={140} h={60} n={1} /></G>
          <G x={0} y={-110} s={verdict}>{k % 2 === 0 ? <Arrow x1={0} y1={30} x2={0} y2={-30} color={GOLD} w={10} /> : <g><rect x={-24} y={-14} width={48} height={8} rx={4} fill={SEC} /><rect x={-24} y={4} width={48} height={8} rx={4} fill={SEC} /></g>}</G>
        </G>
      ))}
      <G x={lerp(200, 800, mag)} y={760} s={mag * (1 - sort)}><Mag s={1.1} /></G>
      {/* Giữ, bỏ, thay. */}
      {[0, 1, 2].map((k) => (
        <G key={k} x={240 + k * 300} y={640} s={sort * 1.1}>
          <Box cx={0} cy={0} w={250} h={150} rx={20} fill={EL} stroke={k === 1 ? RED : GOLD} strokeWidth={6} />
          <G y={-6} s={0.6}><Sprout g={1} /></G>
          <G x={80} y={-40} s={0.45}>{k === 0 ? <Stamp r={50} color={GOLD} /> : k === 1 ? <Cross r={40} /> : <path d="M-40 -10 A40 40 0 1 1 -30 26 M-40 -10 l-6 -26 M-40 -10 l26 -6" fill="none" stroke={GOLD} strokeWidth={12} strokeLinecap="round" />}</G>
          <rect x={-90} y={44} width={180} height={12} rx={6} fill={SEC} />
        </G>
      ))}
    </Stage>
  );
};

/** Cảnh 33 — Prompt 3 trong cùng khung chat; bảng sáu cột; tối đa năm việc, tuần một nhẹ; ba câu hỏi Chủ nhật; sang Google Sheets, Notion. */
export const Prompt3: React.FC = () => {
  const { f, p, l } = useT();
  const card = l(0, 0, 16);
  const cols = [0, 1, 2, 3, 4, 5].map((k) => l(1, 0.05 + k * 0.13, 8));
  const rows = l(2, 0, 20);
  const ball = l(2, 0.4, 40);
  const end = l(3, 0, 14);
  const fly = l(3, 0.55, 20);
  const counts = [2, 4, 5, 5];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={260} y={215} p={p(0, 0.05)} solid size={40} />
      <Tag i={1} x={720} y={215} p={p(0, 0.3)} solid size={40} />
      {[0, 1, 2, 3, 4, 5].map((k) => <Tag key={k} i={2 + k} x={148 + k * 156} y={k % 2 ? 380 : 330} p={cols[k]} size={k === 2 ? 26 : 28} solid={k === 2} />)}
      <Tag i={8} x={760} y={980} p={l(2, 0.2, 10)} solid size={34} o={1 - fly} />
      <Tag i={9} x={400} y={980} p={end} size={34} />
      <Tag i={10} x={720} y={900} p={fly} size={30} />
    </>}>
      {/* Prompt 3 ngay dưới báo cáo trong cùng khung chat. */}
      <G x={260} y={330} s={card * 0.5} o={1 - cols[0]}>
        <ChatWin w={420} h={220}><G x={-80} y={0} s={0.5}><Paper w={240} h={200} n={4} head={GOLD} /></G><G x={90} y={10} s={0.4}><PromptCard w={240} h={240} sections={2} /></G></ChatWin>
      </G>
      <G x={720} y={330} s={card * 0.6} o={1 - cols[0]}>{[0, 1, 2, 3].map((k) => <Box key={k} cx={-150 + k * 100} cy={0} w={90} h={90} rx={14} fill={GOLD} opacity={0.4 + k * 0.15} />)}</G>
      {/* Bảng kế hoạch. */}
      <G x={540} y={640}>
        <Box cx={0} cy={0} w={960} h={460} rx={22} fill={SURF} stroke={HOV} strokeWidth={4} />
        {[0, 1, 2, 3, 4, 5].map((c) => <rect key={c} x={-470 + c * 156 + 4} y={-215} width={148} height={14} rx={7} fill={GOLD} opacity={cols[c]} />)}
        {[0, 1, 2, 3].map((r) => (
          <G key={r} y={-150 + r * 100} o={clamp01(rows * 4 - r)}>
            <Box cx={-470 + 78} cy={0} w={140} h={84} rx={12} fill={r === 0 ? "#3A3322" : EL} stroke={r === 0 ? GOLD : HOV} strokeWidth={3} />
            <text x={-392} y={14} textAnchor="middle" fontSize={40} fontWeight={800} fill={GOLDL} fontFamily="Inter, sans-serif">{r + 1}</text>
            {Array.from({ length: counts[r] }, (_, j) => <Box key={j} cx={-300 + j * 150 + 60} cy={0} w={r === 0 ? 70 : 130} h={r === 0 ? 40 : 70} rx={10} fill={HOV} />)}
          </G>
        ))}
        {ball > 0.01 && <circle cx={lerp(-460, 440, ball)} cy={-150 + Math.min(3, ball * 4) * 100 - 50} r={18} fill={GOLDL} />}
        <G x={460} y={190} s={end * 0.7}>{[0, 1, 2].map((k) => <G key={k} x={-120 + k * 60} y={0} s={0.3}><Question color={GOLD} /></G>)}</G>
      </G>
      <G x={210} y={980} s={end * 0.6}><MonthPage w={200} h={180} marks={1} cells={7} /></G>
      {/* Sang Google Sheets và Notion. */}
      {[0, 1].map((k) => (
        <G key={k} x={k ? 930 : 720} y={1010} s={fly * 0.55}>
          <Box cx={0} cy={0} w={200} h={160} rx={16} fill={TXT} />
          {k === 0 ? <G><rect x={-100} y={-80} width={200} height={40} rx={16} fill="#2E9E5B" />{[0, 1, 2].map((r) => <line key={r} x1={-80} x2={80} y1={-10 + r * 26} y2={-10 + r * 26} stroke={SEC} strokeWidth={3} />)}</G> : <path d="M-40 -50 V50 M-40 -50 L40 50 M40 -50 V50" stroke={INK} strokeWidth={12} strokeLinecap="round" fill="none" />}
        </G>
      ))}
    </Stage>
  );
};

/** Cảnh 34 — Một cú bấm; Gem trong Gemini; Project trong Claude; gõ bắt đầu. */
export const LuuPrompt: React.FC = () => {
  const { f, p, l } = useT();
  const btn = l(0, 0, 14);
  const press = l(0, 0.4, 6);
  const gem = l(1, 0, 16);
  const paste1 = l(1, 0.5, 14);
  const cl = l(2, 0, 16);
  const paste2 = l(2, 0.5, 14);
  const go = l(3, 0, 14);
  const reply = l(3, 0.6, 10);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.2)} solid size={42} />
      <Tag i={1} x={280} y={530} p={p(1, 0.15)} solid size={36} />
      <Tag i={2} x={280} y={1095} p={p(1, 0.3)} size={32} />
      <Tag i={3} x={800} y={530} p={p(2, 0.1)} solid size={36} />
      <Tag i={4} x={800} y={595} p={p(2, 0.2)} size={32} />
      <Tag i={5} x={800} y={1110} p={p(2, 0.6)} size={30} />
      <Tag i={6} x={540} y={340} p={go} solid size={40} />
    </>}>
      <G x={540} y={lerp(560, 330, gem)} s={btn * lerp(1, 0.45, gem)} o={1 - go}>
        <circle r={120} fill={HOV} />
        <circle r={100} cy={press * 10} fill={GOLD} />
        <G x={60} y={-130}><Hand s={0.6} r={-15} /></G>
        <G y={-210} s={press * 0.5}><PromptCard w={200} h={250} sections={2} /></G>
      </G>
      {/* Gemini: Gem. */}
      <G x={280} y={810} s={gem}>
        <ChatWin w={440} h={470} mark={<MarkGem r={40} />}>
          <G y={-90}><path d="M-60 -10 L-30 -50 H30 L60 -10 L0 60 Z" fill={GOLDL} /><path d="M-60 -10 H60 M-30 -50 L-14 -10 L0 60 L14 -10 L30 -50" fill="none" stroke={INK} strokeWidth={4} opacity={0.4} /></G>
          <G y={80}><Box cx={0} cy={0} w={360} h={120} rx={16} fill={SURF} stroke={HOV} strokeWidth={3} /><G x={0} y={lerp(-200, 0, paste1)} s={paste1 * 0.4}><PromptCard w={300} h={260} sections={2} /></G></G>
        </ChatWin>
      </G>
      {/* Claude: Project Human 3.0. */}
      <G x={800} y={830} s={cl}>
        <ChatWin w={440} h={470} mark={<MarkClaude r={40} />}>
          <G y={-100}><path d="M-80 -40 H-30 L-14 -24 H80 V40 H-80 Z" fill={GOLD} /></G>
          <G y={80}><Box cx={0} cy={0} w={360} h={120} rx={16} fill={SURF} stroke={HOV} strokeWidth={3} /><G x={0} y={lerp(-200, 0, paste2)} s={paste2 * 0.4}><PromptCard w={300} h={260} sections={2} /></G></G>
        </ChatWin>
      </G>
      {/* Gõ bắt đầu, câu hỏi đầu tiên bật ra. */}
      <G x={540} y={240} o={go} s={go}>
        <G x={0} y={170} s={reply}><Talk w={360} h={70} n={1} /></G>
        <G x={260} y={110}><circle r={26} fill={GOLD} /><path d="M-9 -12 L12 0 L-9 12 Z" fill={INK} /></G>
      </G>
    </Stage>
  );
};

/** Cảnh 35 — Bốn biển lỗi; danh sách dài do dán thiếu; copy lại đủ, nhắn sửa; kết quả chung chung; đào sâu năm câu. */
export const Loi1: React.FC = () => {
  const { f, p, l } = useT();
  const signs = l(0, 0, 16);
  const longList = l(1, 0, 20);
  const fix = l(2, 0.1, 14);
  const shrink = l(2, 0.6, 14);
  const vague = l(3, 0, 16);
  const dig = l(4, 0.05, 30);
  const flip = [l(0, 0.3, 10), vague, 0, 0];
  return (
    <Stage bg={INK} fit={{ s: 1.08, dy: 30 }} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.1)} solid color={RED} size={44} />
      <Tag i={1} x={300} y={1010} p={p(1, 0.2)} solid color={RED} size={34} o={1 - vague} />
      <Tag i={2} x={790} y={1010} p={p(1, 0.6)} size={34} o={1 - fix} />
      <Tag i={3} x={790} y={1010} p={fix} solid size={34} o={1 - vague} />
      <Tag i={4} x={300} y={1010} p={p(3, 0.2)} solid color={RED} size={34} />
      <Tag i={5} x={790} y={1010} p={p(4, 0.4)} solid size={34} />
    </>}>
      {/* Hàng bốn biển. */}
      {[0, 1, 2, 3].map((k) => (
        <G key={k} x={200 + k * 227} y={380} s={signs * 0.75 * (flip[k] > 0.5 ? 1.15 : 1)}>
          <Warn color={flip[k] > 0.5 ? GOLD : HOV} />
          <text y={130} textAnchor="middle" fontSize={64} fontWeight={800} fill={flip[k] > 0.5 ? GOLDL : SEC} fontFamily="Inter, sans-serif">{k + 1}</text>
        </G>
      ))}
      {/* Lỗi 1: danh sách dài cuộn kín; thẻ prompt rách. */}
      <G o={1 - vague}>
        <G x={300} y={740} s={longList}>
          <ChatWin w={440} h={420}>
            {Array.from({ length: Math.round(lerp(8, 1, shrink)) }, (_, k) => (
              <G key={k} x={-20} y={-140 + k * 34}><Box cx={0} cy={0} w={340} h={26} rx={8} fill={k === 0 || shrink < 0.5 ? HOV : SURF} /><G x={-150} s={0.12}><Question color={TXT} /></G></G>
            ))}
          </ChatWin>
        </G>
        <G x={790} y={720} s={longList * 0.9}>
          <PromptCard w={300} h={380} sections={4} torn={1 - fix} />
          <G x={120} y={170} s={fix}><Cursor /></G>
        </G>
        <G x={650} y={900} s={fix * 0.6}><Talk w={340} h={70} me n={1} /></G>
      </G>
      {/* Lỗi 2: báo cáo mờ, ai cũng gật; đào sâu năm câu. */}
      <G o={vague}>
        <G x={300} y={700} s={vague}>
          <Box cx={0} cy={0} w={330} h={360} rx={18} fill={lerp(0, 1, dig) > 0.5 ? PAPER : "#6B6458"} />
          <Lines x={-130} y={-140} w={260} n={8} gap={34} color={dig > 0.5 ? INK : SEC} t={dig > 0.5 ? 12 : 6} />
          {[0, 1, 2].map((k) => <G key={k} x={-120 + k * 120} y={250} s={0.45 * (1 - dig)}><Mini color={SEC} /></G>)}
        </G>
        <G x={790} y={750} s={dig}>
          {[0, 1, 2, 3].map((k) => <G key={k} x={(k % 2 ? 1 : -1) * 100} y={(k > 1 ? 1 : -1) * 100 - 40}><CornerTile k={k} w={180} h={180} lit={k === 2 ? 0 : 1} t={f} /></G>)}
          <G x={-100} y={60} s={0.6}><Drill rot={f * 6} /></G>
          {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={-160 + k * 30} cy={170} r={11} fill={GOLD} opacity={clamp01(dig * 5 - k)} />)}
        </G>
      </G>
    </Stage>
  );
};

/** Cảnh 36 — Lỗi 3: kim level vọt rồi tụt, hỏi bằng chứng; chấm lại, đừng gật; lỗi 4: chat bị ngắt, mở chat mới chạy tiếp. */
export const Loi2: React.FC = () => {
  const { f, p, l } = useT();
  const g = l(0, 0, 14);
  const swing = Math.sin(l(0, 0.1, 40) * Math.PI * 2) * 0.45;
  const ask = l(0, 0.6, 14);
  const weak = l(1, 0, 14);
  const stamp = l(1, 0.35, 8);
  const cut = l(2, 0, 12);
  const fresh = l(2, 0.35, 16);
  const run = l(2, 0.65, 30);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={300} y={215} p={p(0, 0.05)} solid color={RED} size={38} />
      <Tag i={1} x={300} y={760} p={ask} solid size={36} />
      <Tag i={2} x={300} y={1010} p={stamp} solid color={RED} size={36} />
      <Tag i={3} x={300} y={940} p={l(1, 0.6, 10)} size={32} />
      <Tag i={4} x={790} y={215} p={p(2, 0.05)} solid color={RED} size={36} />
      <Tag i={5} x={790} y={560} p={fresh} solid size={34} />
      <Tag i={6} x={790} y={1010} p={run} size={34} />
    </>}>
      {[2, 3].map((n, k) => (
        <G key={n} x={k ? 790 : 300} y={330} s={p(k ? 2 : 0, 0) * 0.45}>
          <Warn color={GOLD} />
          <text y={130} textAnchor="middle" fontSize={64} fontWeight={800} fill={GOLDL} fontFamily="Inter, sans-serif">{n + 1}</text>
        </G>
      ))}
      {/* Kim level. */}
      <G x={300} y={560} s={g * 1.2}><Gauge v={0.5 + swing * (1 - weak)} /></G>
      <G x={300} y={680} s={ask * 0.6}><Talk w={300} h={70} me n={1} /></G>
      {/* Cột bằng chứng mỏng, con dấu chấm lại, người định gật. */}
      <G x={170} y={850} s={weak}>
        <Box cx={0} cy={0} w={40} h={140} rx={8} fill={EL} stroke={HOV} strokeWidth={4} />
        <rect x={-3} y={-60} width={6} height={120} fill={SEC} />
        <G x={0} y={-90} s={0.5}><Mag /></G>
      </G>
      <G x={300} y={860} s={stamp}><rect x={-14} y={-100} width={28} height={60} rx={10} fill={GOLD} /><rect x={-56} y={-44} width={112} height={40} rx={8} fill={RED} /></G>
      <G x={480} y={980} s={weak * 0.45} r={-8 * (1 - stamp)}><Guy /></G>
      {/* Chat bị cắt đôi; chat mới, thanh tiến độ chạy tiếp. */}
      <line x1={545} x2={545} y1={180} y2={1100} stroke={HOV} strokeWidth={4} strokeDasharray="12 14" opacity={cut} />
      <G x={790} y={460} s={cut * 0.6} o={1 - fresh * 0.6}>
        <G x={-cut * 20} r={-cut * 6}><Box cx={-110} cy={0} w={220} h={300} rx={20} fill={EL} stroke={HOV} strokeWidth={5} /></G>
        <G x={cut * 20} r={cut * 6}><Box cx={110} cy={0} w={220} h={300} rx={20} fill={EL} stroke={HOV} strokeWidth={5} /></G>
        <path d="M0 -160 l-14 40 l20 30 l-16 40 l18 30 l-14 40 l10 40" stroke={RED} strokeWidth={6} fill="none" />
      </G>
      <G x={790} y={790} s={fresh}>
        <ChatWin w={440} h={340} mark={<MarkClaude r={40} />}>
          <G x={-60} y={-60} s={0.35}><PromptCard w={300} h={260} sections={2} /></G>
          <G x={80} y={-40} s={0.6}><Talk w={240} h={70} me n={2} /></G>
          {[0, 1, 2, 3].map((k) => (
            <G key={k} x={-150 + k * 100} y={70} s={0.36}><CornerTile k={k} w={200} h={200} lit={k < 2 || run * 2 > k - 1 ? 1 : 0} t={f} /></G>
          ))}
        </ChatWin>
      </G>
    </Stage>
  );
};

/** Cảnh 37 — Hình mở đầu: xích ở mặt yếu nhất; các việc của cả video gom lại, xích đứt, người bước đi; màn kết thương hiệu. */
export const Ket: React.FC = () => {
  const { f, p, l } = useT();
  const back = l(0, 0, 16);
  const items = [0, 1, 2, 3, 4].map((k) => l(1, 0.05 + k * 0.17, 8));
  const free = l(1, 0.9, 12);
  const end = l(2, 0, 12);
  const walk = free;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.2)} solid color={RED} size={44} />
      {[0, 1, 2, 3, 4].map((k) => <Tag key={k} i={k === 4 ? 5 : k + 1} x={[150, 345, 540, 735, 930][k]} y={k % 2 ? 1045 : 975} p={items[k]} size={k === 1 ? 26 : 28} solid={k === 2} />)}
      {end > 0 && <BrandEnd k={end} />}
    </>}>
      {/* Người đi làm và khối bốn mặt, xích ở mặt yếu nhất. */}
      <G x={540} y={440} s={back}>
        <G x={120 + walk * 60} y={0}><Quad size={300} red={free > 0.5 ? -1 : 2} t={f} /></G>
        <G x={-200 + walk * 120} y={140}><Guy pose={free > 0.3 ? "walk" : "stand"} t={f} /></G>
        {free < 0.5 && <Chain x1={40} y1={110} x2={-190} y2={230} color={RED} p={1} />}
        {free > 0.01 && [0, 1].map((k) => <G key={k} x={-80 + k * 50 - free * 60} y={180 + free * 50} r={free * 60 * (k ? 1 : -1)} o={1 - free}><ellipse rx={20} ry={11} fill="none" stroke={RED} strokeWidth={7} /></G>)}
      </G>
      {/* Các biểu tượng của cả video gom về một hàng. */}
      {[0, 1, 2, 3, 4].map((k) => (
        <G key={k} x={[150, 345, 540, 735, 930][k]} y={860} s={items[k] * 0.9}>
          <circle r={74} fill={EL} stroke={GOLD} strokeWidth={5} />
          {k === 0 && <G s={0.55}><Paper w={150} h={190} n={4} head={GOLD} /></G>}
          {k === 1 && <G s={0.38}><ChatWin w={260} h={220} /></G>}
          {k === 2 && <G>{[60, 50, 24, 56].map((h, j) => <rect key={j} x={-44 + j * 24} y={30 - (j === 2 ? h + items[2] * 30 : h)} width={18} height={j === 2 ? h + items[2] * 30 : h} rx={4} fill={j === 2 ? GOLD : HOV} />)}</G>}
          {k === 3 && <G y={20}><Sprout s={0.8} g={items[3]} /></G>}
          {k === 4 && <G s={0.42}><MonthPage w={220} h={200} marks={30} cells={30} /></G>}
        </G>
      ))}
    </Stage>
  );
};
