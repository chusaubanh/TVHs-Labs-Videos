import React from "react";
import { Arrow, Box, Browser, EL, G, GOLD, GOLDL, HOV, INK, Lines, Mag, Person, Question, SEC, Stamp, SURF, TXT, lerp, useT } from "../mo-dau/art";
import { Stage, Tag, Coin, Crowd, Cursor, Eye, Pin, Target } from "../fb-ads/art";
import { Gauge, Heart, LongPost, PersonaCard, SearchBar, ShortVideo, Star } from "./art";

const Bars: React.FC<{ h: number[]; t: number; hi?: number; w?: number }> = ({ h, t, hi = -1, w = 60 }) => (
  <g>
    {h.map((v, i) => <rect key={i} x={(i - (h.length - 1) / 2) * (w + 18) - w / 2} y={-v * t} width={w} height={v * t} rx={8} fill={i === hi ? GOLD : HOV} />)}
  </g>
);

export const MoDau: React.FC = () => {
  const { p, l } = useT();
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={205} p={p(0, 0.4)} size={44} />
      <Tag i={1} x={700} y={970} p={p(1, 0.2)} solid size={44} />
    </>}>
      <G x={280} y={520} s={p(0)}><ShortVideo w={250} h={430} t={0.8} /></G>
      <Arrow x1={420} y1={520} x2={620} y2={520} p={l(0, 0.2, 14)} dash />
      <G x={800} y={520} s={p(0, 0.3)}><Target r={190} /></G>
      <G x={800} y={520} s={p(0, 0.5) * (1 - l(1, 0, 8))}><Question s={1.1} color={INK} /></G>
      <G x={290} y={1240} s={p(1, 0.1)}><Bars h={[120, 220, 300, 170]} t={l(1, 0.15, 18)} hi={2} /></G>
      <G x={700} y={1170} s={p(1, 0.45)}><Mag s={1.5} /></G>
      <G x={930} y={1170} s={p(1, 0.6)}><PersonaCard w={190} h={250} /></G>
    </Stage>
  );
};

export const NguyenTac: React.FC = () => {
  const { p, l } = useT();
  const X = [190, 540, 890];
  return (
    <Stage bg={SURF} overlay={<>
      {X.map((x, i) => <Tag key={i} i={i} x={x} y={210} p={p(0, 0.1 + i * 0.15)} solid size={38} />)}
      {X.map((x, i) => <Tag key={i} i={3 + i} x={x} y={1015} p={p(1, 0.35 + i * 0.18)} size={36} />)}
    </>}>
      {X.map((x, i) => (
        <G key={i} x={x} y={420} s={p(0, 0.1 + i * 0.15)}>
          <Box cx={0} cy={0} w={320} h={300} rx={28} fill={EL} stroke={GOLD} strokeWidth={5} />
          <G y={20}><Gauge r={95} t={[0.4, 0.7, 0.55][i]} /></G>
        </G>
      ))}
      <G x={190} y={790} s={p(1, 0.3)}><Crowd cols={3} rows={2} gap={84} r={22} lit={(i) => i < 3} /></G>
      <G x={540} y={790} s={p(1, 0.48)}><Crowd cols={2} rows={2} gap={120} r={28} lit={(i) => i % 2 === 0} base={TXT} /></G>
      <G x={890} y={790} s={p(1, 0.66)}><Pin s={1.7} /></G>
      <G x={540} y={1250} s={p(1, 0.8)}><Bars h={[90, 140, 70, 170, 110, 150, 60, 130, 100]} t={l(1, 0.8, 12)} w={84} hi={3} /></G>
    </Stage>
  );
};

const CELLS = [[285, 400], [795, 400], [285, 780], [795, 780]];

export const FbChiSo: React.FC = () => {
  const { p, l } = useT();
  return (
    <Stage bg="#14110B" overlay={<>
      <Tag i={0} x={540} y={205} p={p(0, 0.05)} solid size={46} />
      {CELLS.map(([x, y], i) => <Tag key={i} i={1 + i} x={x} y={y - 120} p={p(i + 1, 0.05)} solid size={38} />)}
      {CELLS.map(([x, y], i) => <Tag key={i} i={5 + i} x={x} y={y + 125} p={p(i + 1, 0.35)} size={30} />)}
    </>}>
      {CELLS.map(([x, y], i) => (
        <G key={i} x={x} y={y} s={Math.min(1, p(0, 0.25 + i * 0.1))}>
          <Box cx={0} cy={0} w={490} h={340} rx={26} fill={l(i + 1, 0, 5) > 0 ? "#2B2414" : EL} stroke={l(i + 1, 0, 5) > 0 ? GOLD : HOV} strokeWidth={5} />
        </G>
      ))}
      <G x={285} y={410} s={p(1, 0.15)}><Crowd cols={5} rows={1} gap={86} r={24} base={GOLDL} /></G>
      <G x={700} y={410} s={p(2, 0.15)}><Heart s={0.9} /></G>
      <G x={840} y={410} s={p(2, 0.3)}><Star s={1.4} /></G>
      <G x={150} y={770} s={p(3, 0.15)}><Crowd cols={2} rows={1} gap={80} r={24} base={GOLDL} /></G>
      <Arrow x1={230} y1={770} x2={320} y2={770} p={l(3, 0.3, 8)} w={7} />
      <G x={380} y={750} s={p(3, 0.45)}><Cursor s={1.2} /></G>
      <G x={670} y={750} s={p(4, 0.15)}><Cursor s={1.2} /></G>
      <Arrow x1={750} y1={780} x2={820} y2={780} p={l(4, 0.3, 8)} w={7} />
      <G x={900} y={780} s={p(4, 0.5)}><Stamp r={70} /></G>
      <G x={540} y={1200} s={p(0, 0.4)}><Crowd cols={13} rows={1} gap={78} r={22} base={GOLDL} /></G>
    </Stage>
  );
};

export const FbCongCu: React.FC = () => {
  const { p, l } = useT();
  const walk = l(1, 0.6, 26);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={205} p={p(0, 0.15)} size={40} />
      <Tag i={1} x={270} y={640} p={p(1, 0.1)} solid size={38} />
      <Tag i={2} x={800} y={640} p={p(1, 0.5)} solid size={38} />
    </>}>
      <G x={540} y={530} s={p(0)}><Bars h={[90, 260, 130, 190]} t={l(0, 0.1, 16)} hi={1} w={170} /></G>
      <G x={270} y={880} s={p(1, 0.05)}>
        <Box cx={0} cy={0} w={470} h={380} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} />
        <G y={110} ><Bars h={[100, 180, 140]} t={l(1, 0.1, 14)} hi={1} w={80} /></G>
      </G>
      <G x={800} y={880} s={p(1, 0.45)}>
        <Box cx={0} cy={0} w={470} h={380} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} />
        <G y={-70}><Eye r={80} /></G>
        <line x1={-180} x2={180} y1={70} y2={70} stroke={HOV} strokeWidth={8} strokeDasharray="4 18" strokeLinecap="round" />
        <G x={lerp(-180, 170, walk)} y={60}><Crowd cols={1} rows={1} r={22} base={GOLDL} /></G>
      </G>
      <G x={540} y={1210} s={p(1, 0.7)}>
        <Browser w={960} h={220}><G x={0} y={40}><Box cx={0} cy={0} w={260} h={70} rx={14} fill={GOLD} /></G></Browser>
      </G>
    </Stage>
  );
};

export const TikTok: React.FC = () => {
  const { p, l } = useT();
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={230} y={205} p={p(0, 0.1)} solid size={36} />
      <Tag i={1} x={760} y={205} p={p(0, 0.45)} solid size={36} />
      <Tag i={2} x={760} y={480} p={p(0, 0.75)} solid size={36} />
      <Tag i={3} x={760} y={750} p={p(1, 0.3)} size={38} />
      <Tag i={4} x={270} y={1015} p={p(2, 0.1)} solid size={38} />
      <Tag i={5} x={800} y={1015} p={p(2, 0.5)} solid size={38} />
    </>}>
      <G x={230} y={560} s={p(0)}><ShortVideo w={340} h={620} t={l(0, 0.45, 40) * 0.7} /></G>
      <G x={760} y={340} s={p(0, 0.45)}><Box cx={0} cy={0} w={520} h={100} rx={20} fill={EL} stroke={GOLD} strokeWidth={4} /><rect x={-230} y={-16} width={460 * l(0, 0.5, 30) * 0.7} height={32} rx={16} fill={GOLD} /></G>
      <G x={760} y={590} s={p(0, 0.72)}><path d="M-46 -60 L-66 60 M26 -60 L6 60 M-90 -24 H44 M-104 26 H30" stroke={GOLDL} strokeWidth={18} strokeLinecap="round" fill="none" /></G>
      <G x={760} y={880} s={p(1, 0.2)}><Crowd cols={6} rows={1} gap={86} r={24} lit={(i) => i === 1 || i === 2} /></G>
      <G x={270} y={1200} s={p(2, 0.1)}><Bars h={[70, 130, 100, 150]} t={l(2, 0.15, 14)} hi={3} w={70} /></G>
      <G x={800} y={1190} s={p(2, 0.5)}><Eye r={130} /></G>
    </Stage>
  );
};

const KEYS = [340, 470, 600];

export const Google: React.FC = () => {
  const { p, l } = useT();
  const X = [150, 395, 620, 880];
  const save = l(3, 0.3, 16);
  return (
    <Stage bg="#14110B" overlay={<>
      {X.map((x, i) => <Tag key={i} i={i} x={x} y={205} p={p(0, 0.2 + i * 0.18)} solid size={28} />)}
      <Tag i={4} x={540} y={410} p={p(1, 0.05)} size={38} />
      <Tag i={5} x={270} y={1000} p={p(2, 0.15)} solid size={36} />
      <Tag i={6} x={810} y={1000} p={p(3, 0.15)} solid size={36} />
    </>}>
      {X.map((x, i) => <G key={i} x={x} y={320} s={p(0, 0.2 + i * 0.18)}><Gauge r={80} t={[0.5, 0.35, 0.6, 0.45][i]} /></G>)}
      {KEYS.map((_, i) => (
        <G key={i} x={540} y={510 + i * 140} s={p(1, 0.15 + i * 0.1)}>
          <Box cx={0} cy={0} w={960} h={120} rx={18} fill={EL} stroke={i === 1 ? GOLD : HOV} strokeWidth={4} />
          <Lines x={-430} y={-40} w={280} n={1} t={80} color={TXT} />
          <rect x={-90} y={-48} width={[220, 500, 160][i] * l(1, 0.4 + i * 0.1, 16)} height={96} rx={12} fill={i === 1 ? GOLD : HOV} />
        </G>
      ))}
      <G x={270} y={1190} s={p(2, 0.1)}><Browser w={470} h={290}><G y={60}><Box cx={0} cy={0} w={340} h={130} rx={14} fill={GOLD} /></G></Browser></G>
      <G x={810} y={1190} s={p(3, 0.05)}>
        <Box cx={0} cy={0} w={470} h={290} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} />
        <G x={-110} y={lerp(-40, 40, save)}><Coin r={lerp(66, 40, save)} /></G>
        <G x={110} y={lerp(40, -30, save)}><Coin r={lerp(40, 72, save)} /></G>
      </G>
    </Stage>
  );
};

export const DiemCanNho: React.FC = () => {
  const { p, l } = useT();
  const X = [190, 540, 890];
  return (
    <Stage bg={INK} overlay={<>
      {X.map((x, i) => <Tag key={i} i={i} x={x} y={210} p={p(0, 0.1 + i * 0.1)} solid size={38} />)}
      <Tag i={3} x={540} y={620} p={p(0, 0.6)} solid size={42} />
      <Tag i={4} x={270} y={1000} p={p(1, 0.3)} size={38} />
      <Tag i={5} x={810} y={1000} p={p(2, 0.3)} size={38} />
    </>}>
      {X.map((x, i) => (
        <G key={i} x={x} y={400} s={p(0, 0.1 + i * 0.1)}>
          <Box cx={0} cy={0} w={320} h={280} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} />
          <G y={30}><Gauge r={90} t={[0.5, 0.7, 0.4][i]} /></G>
        </G>
      ))}
      <G x={540} y={780} s={p(0, 0.65)}><Crowd cols={13} rows={2} gap={78} r={22} lit={(i) => i > 3 && i < 9} /></G>
      <G x={270} y={1190} s={p(1, 0.15)}><ShortVideo w={180} h={290} t={0.7} /><G x={170}><Target r={70} arrow={0} /></G></G>
      <G x={810} y={1120} s={p(2, 0.15)}><SearchBar w={440} p={0.6} /></G>
      <G x={810} y={1260} s={p(2, 0.45)}><Bars h={[60, 130, 50]} t={l(2, 0.5, 12)} hi={1} w={110} /></G>
    </Stage>
  );
};

export { KetFb as Ket } from "../fb-ads/art";
