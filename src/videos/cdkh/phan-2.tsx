import React from "react";
import { Arrow, Box, Bubble, Doc, EL, G, GOLD, GOLDL, HOV, INK, Lines, Mag, Person, Question, SEC, Stamp, SURF, TXT, lerp, useT } from "../mo-dau/art";
import { Stage, Tag, Coin, Crowd, Cursor, Eye, Target } from "../fb-ads/art";
import { Bottle, Calendar, Gauge, Heart, LongPost, PersonaCard, SearchBar, ShortVideo, Sparkle, Stars } from "./art";

const X3 = [190, 540, 890];

export const MoDau: React.FC = () => {
  const { p, l } = useT();
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={200} p={p(0, 0.3)} solid size={44} />
      {X3.map((x, i) => <Tag key={i} i={1 + i} x={x} y={560} p={p(1, 0.25 + i * 0.18)} solid size={38} />)}
      <Tag i={4} x={540} y={1015} p={p(2, 0.3)} solid size={46} />
    </>}>
      <G x={540} y={380} s={p(0)}><PersonaCard w={230} h={260} /></G>
      {X3.map((x, i) => (
        <g key={i}>
          <line x1={540} y1={520} x2={lerp(540, x, l(1, 0.15 + i * 0.18, 10))} y2={lerp(520, 620, l(1, 0.15 + i * 0.18, 10))} stroke={GOLD} strokeWidth={6} />
          <G x={x} y={790} s={p(1, 0.25 + i * 0.18)}><Box cx={0} cy={0} w={320} h={340} rx={28} fill={EL} stroke={GOLD} strokeWidth={5} /></G>
        </g>
      ))}
      <G x={190} y={790} s={p(1, 0.35)}><LongPost w={220} h={270} /></G>
      <G x={540} y={790} s={p(1, 0.53)}><ShortVideo w={170} h={290} t={0.6} /></G>
      <G x={890} y={790} s={p(1, 0.71)}><SearchBar w={280} p={0.6} /></G>
      <G x={540} y={1210} s={p(2, 0.1)}><Target r={120} /></G>
      <G x={190} y={1210} s={p(2, 0.35)}><Crowd cols={3} rows={1} gap={90} r={26} base={GOLDL} /></G>
      <G x={890} y={1210} s={p(2, 0.45)}><Crowd cols={3} rows={1} gap={90} r={26} base={GOLDL} /></G>
    </Stage>
  );
};

export const FbHanhVi: React.FC = () => {
  const { p, l } = useT();
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={270} y={205} p={p(0, 0.05)} solid size={46} />
      <Tag i={1} x={760} y={205} p={p(0, 0.3)} size={38} />
      <Tag i={2} x={800} y={500} p={p(1, 0.25)} size={36} />
      <Tag i={3} x={800} y={700} p={p(1, 0.6)} size={36} />
      <Tag i={4} x={540} y={1015} p={p(2, 0.3)} solid size={42} />
    </>}>
      <G x={290} y={590} s={p(0, 0.1)}><LongPost w={480} h={680} scroll={l(0, 0.3, 50) * 200} saved={l(1, 0.2, 6)} /></G>
      <G x={800} y={380} s={p(1, 0.15)}><Eye r={90} /></G>
      <G x={800} y={610} s={p(1, 0.55)}><Bubble w={220} h={100} n={2} /></G>
      <G x={540} y={1200} s={p(2)}>
        <circle r={140} fill={EL} stroke={GOLD} strokeWidth={6} />
        <Crowd cols={3} rows={2} gap={72} r={18} base={GOLDL} />
      </G>
      {[-1, 1].map((d) => <G key={d} x={540 + d * 310} y={1190} s={p(2, 0.5)}><Bubble w={170} h={100} n={2} fill={d < 0 ? GOLD : GOLDL} /></G>)}
    </Stage>
  );
};

export const FbToiUu: React.FC = () => {
  const { p, l } = useT();
  return (
    <Stage bg="#14110B" overlay={<>
      <Tag i={0} x={540} y={205} p={p(0, 0.15)} solid size={46} />
      <Tag i={1} x={800} y={350} p={p(1, 0.15)} solid size={42} />
      <Tag i={2} x={800} y={700} p={p(1, 0.55)} size={38} />
      <Tag i={3} x={260} y={1015} p={p(2, 0.35)} size={38} />
      <Tag i={4} x={790} y={1015} p={p(3, 0.5)} solid size={40} />
    </>}>
      <G x={280} y={510} s={p(0, 0.05)}><LongPost w={440} h={500} scroll={40} /></G>
      <G x={800} y={500} s={p(1, 0.1)}><Bottle s={1} /></G>
      <path d={`M640 800 Q720 ${lerp(740, 800, l(1, 0.55, 18))} 800 800 T960 800`} fill="none" stroke={GOLDL} strokeWidth={10} strokeLinecap="round" opacity={l(1, 0.5, 6)} />
      <G x={260} y={1190} s={p(2, 0.1)}><Person s={1.3} fill={GOLDL} /><G x={150} y={-30}><Mag s={0.95} /></G></G>
      <G x={790} y={1190} s={p(3, 0.15)}><circle r={150} fill={EL} stroke={GOLD} strokeWidth={6} /><Crowd cols={3} rows={2} gap={76} r={20} lit={() => true} /></G>
    </Stage>
  );
};

export const TtHanhVi: React.FC = () => {
  const { f, at, p, l } = useT();
  const wave = (x: number) => Math.sin((f - at(1)) * 0.12 + x * 0.012) * 30;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={270} y={205} p={p(0, 0.05)} solid size={46} />
      <Tag i={1} x={270} y={870} p={p(0, 0.45)} solid size={44} />
      <Tag i={2} x={790} y={205} p={p(1, 0.2)} size={42} />
      <Tag i={3} x={790} y={1015} p={p(2, 0.3)} solid size={40} />
    </>}>
      <G x={270} y={530} s={p(0)}><ShortVideo w={340} h={590} t={l(0, 0.15, 60)} /></G>
      <G x={790} y={450} s={p(1)}>
        <path d={`M-240 ${wave(0)} Q-120 ${-80 + wave(100)} 0 ${wave(200)} T240 ${wave(300)} V170 H-240 Z`} fill={GOLD} />
      </G>
      <G x={790} y={370} s={p(1, 0.25)}><Bottle s={0.8} fill={TXT} /></G>
      <G x={790} y={800} s={p(2)}><Person s={1.45} fill={GOLDL} /><G y={-160}><Sparkle x={0} y={0} s={1} r={36} /></G></G>
      <G x={790} y={1195} s={p(2, 0.4)}><Stars n={5} s={1.1} /></G>
      <G x={270} y={1190} s={p(0, 0.5)}><Sparkle x={-100} y={0} s={1} r={50} /><Sparkle x={100} y={0} s={1} r={50} /><Heart s={1.1} /></G>
    </Stage>
  );
};

export const TtToiUu: React.FC = () => {
  const { p, l } = useT();
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={270} y={205} p={p(0, 0.2)} solid size={46} />
      <Tag i={1} x={800} y={205} p={p(0, 0.6)} size={46} />
      <Tag i={2} x={800} y={540} p={p(1, 0.1)} solid size={38} />
      <Tag i={3} x={270} y={1015} p={p(1, 0.45)} size={40} />
      <Tag i={4} x={800} y={1015} p={p(1, 0.8)} solid size={40} />
    </>}>
      <G x={270} y={560} s={p(0)}><ShortVideo w={340} h={590} t={l(0, 0.2, 60)}><G y={-30}><Bottle s={1.5} /></G></ShortVideo></G>
      <G x={800} y={350} s={p(0, 0.6)}><Person s={1.1} fill={GOLDL} /></G>
      <G x={800} y={760} s={p(1, 0.1)}><Calendar s={1.05} on={(i) => i < 7 && l(1, 0.15 + i * 0.03, 4) > 0} /></G>
      <G x={140} y={1200} s={p(1, 0.45)}><circle r={100} fill={HOV} /><circle cx={-20} cy={-15} r={9} fill={INK} /><circle cx={20} cy={-15} r={9} fill={INK} /></G>
      <Arrow x1={270} y1={1200} x2={340} y2={1200} p={l(1, 0.55, 8)} />
      <G x={460} y={1200} s={p(1, 0.6)}><circle r={100} fill={GOLDL} /><circle cx={-20} cy={-15} r={9} fill={INK} /><circle cx={20} cy={-15} r={9} fill={INK} /><path d="M-30 30 Q0 60 30 30" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" /></G>
      <G x={800} y={1200} s={p(1, 0.8)}><Crowd cols={4} rows={2} gap={100} r={20} base={GOLDL} /></G>
    </Stage>
  );
};

export const GgHanhVi: React.FC = () => {
  const { p, l } = useT();
  return (
    <Stage bg="#14110B" overlay={<>
      <Tag i={0} x={270} y={205} p={p(0, 0.05)} solid size={46} />
      <Tag i={1} x={800} y={205} p={p(0, 0.4)} size={38} />
      <Tag i={2} x={540} y={470} p={p(1, 0.4)} solid size={40} />
      <Tag i={3} x={270} y={800} p={p(2, 0.3)} size={38} />
      <Tag i={4} x={800} y={800} p={p(3, 0.35)} solid size={38} />
    </>}>
      <G x={540} y={340} s={p(0, 0.05)}><SearchBar w={960} p={l(1, 0.05, 26)} /></G>
      <G x={270} y={1020} s={p(2, 0.1)}>
        <Box cx={0} cy={40} w={470} h={440} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} />
        <G y={-110} s={0.8}><Stars /></G>
        <Lines x={-180} y={-50} w={360} n={5} gap={56} t={36} />
      </G>
      <G x={800} y={1020} s={p(3, 0.1)}>
        <Box cx={0} cy={40} w={470} h={440} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} />
        <G y={40}><Bottle s={2} /></G>
        <G x={150} y={-40}><Mag s={1} /></G>
      </G>
      <G x={540} y={640} s={p(1, 0.3)}><Crowd cols={13} rows={3} gap={74} r={20} lit={(i) => i === 19} /></G>
    </Stage>
  );
};

export const GgToiUu: React.FC = () => {
  const { p, l } = useT();
  const up = l(1, 0.4, 20);
  const list = [0, 1, 2, 3];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={205} p={p(0, 0.2)} size={42} />
      <Tag i={1} x={260} y={330} p={p(1, 0.1)} solid size={46} />
      <Tag i={2} x={800} y={330} p={p(2, 0.1)} solid size={46} />
      <Tag i={3} x={800} y={1015} p={p(2, 0.65)} size={36} />
    </>}>
      <G x={260} y={740} s={p(1, 0.05)}>
        <Box cx={0} cy={0} w={460} h={720} rx={28} fill={EL} stroke={GOLD} strokeWidth={5} />
      </G>
      {list.map((i) => {
        const y = 480 + (i === 3 ? lerp(3, 0, up) : i + up) * 170;
        return <G key={i} x={260} y={y} s={p(1, 0.15 + i * 0.05)}><Box cx={0} cy={0} w={400} h={130} rx={18} fill={i === 3 ? GOLD : HOV} /><Lines x={-160} y={-28} w={320} n={2} gap={38} color={i === 3 ? INK : SEC} t={15} /></G>;
      })}
      <G x={lerp(540, 800, l(1, 0, 12))} y={lerp(560, 620, l(1, 0, 12))} s={p(0, 0.1)}><SearchBar w={lerp(900, 440, l(1, 0, 12))} p={0.65} /></G>
      <Arrow x1={800} y1={680} x2={800} y2={740} p={l(2, 0.3, 8)} />
      <G x={800} y={850} s={p(2, 0.4)}><Box cx={0} cy={0} w={420} h={190} rx={22} fill={GOLD} /><Lines x={-170} y={-50} w={340} n={3} gap={40} color={INK} t={16} /></G>
      <G x={540} y={1220} s={p(0, 0.4)}><Crowd cols={13} rows={1} gap={78} r={22} base={GOLDL} /></G>
    </Stage>
  );
};

export const DiemCanNho: React.FC = () => {
  const { p, l } = useT();
  return (
    <Stage bg={SURF} overlay={<>
      {[300, 540, 780].map((y, i) => <Tag key={i} i={i} x={210} y={y} p={p(i, 0.05)} solid size={44} />)}
      {[0, 1, 2].map((i) => <Tag key={i} i={3 + i} x={[780, 780, 780][i]} y={[300, 540, 780][i] + 74} p={p(i, 0.4)} size={32} />)}
      <Tag i={6} x={540} y={1000} p={p(3, 0.25)} solid size={42} />
    </>}>
      {[300, 540, 780].map((y, i) => <G key={i} x={540} y={y} s={p(i)}><Box cx={0} cy={0} w={960} h={210} rx={28} fill={EL} stroke={GOLD} strokeWidth={5} /></G>)}
      <G x={780} y={280} s={p(0, 0.2)}><LongPost w={250} h={120} scroll={30} /></G>
      <G x={780} y={510} s={p(1, 0.2)}><ShortVideo w={90} h={130} t={0.6} /></G>
      <G x={780} y={750} s={p(2, 0.2)}><SearchBar w={370} p={0.6} /></G>
      <G x={320} y={1210} s={p(3, 0.15)}><Gauge r={120} t={l(3, 0.2, 24) * 0.75} /></G>
      <Arrow x1={520} y1={1200} x2={640} y2={1200} p={l(4, 0.15, 10)} />
      <G x={800} y={1200} s={p(4, 0.3)}><ShortVideo w={120} h={170} t={0} /></G>
    </Stage>
  );
};

export { KetFb as Ket } from "../fb-ads/art";
