import React from "react";
import { Arrow, Box, Bubble, Clock, Cross, Doc, EL, G, GOLD, GOLDL, HOV, INK, Lines, Mag, Person, Question, SEC, Stamp, SURF, TXT, lerp, useT } from "../mo-dau/art";
import { Stage, Tag, Cart, Coin, Crowd, Phone, Pin, Post, Target } from "../fb-ads/art";
import { Bolt, Bottle, Calendar, Coupon, Gift, Heart, Leaf, Lipstick, PersonaCard, Sparkle, Stars } from "./art";

export const MoDau: React.FC = () => {
  const { p, l } = useT();
  const on = l(1, 0.1, 10) > 0;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.55)} size={46} />
      <Tag i={1} x={540} y={1015} p={p(1, 0.3)} solid size={50} />
    </>}>
      <G x={150} y={640} s={p(0)}><Doc w={200} h={260} /></G>
      <G x={930} y={640} s={p(0, 0.15)}><Phone w={190} h={320}><G s={0.8}><Post /></G></Phone></G>
      <Arrow x1={270} y1={640} x2={330} y2={640} p={l(0, 0.3, 8)} w={8} />
      <Arrow x1={810} y1={640} x2={750} y2={640} p={l(0, 0.4, 8)} w={8} />
      <G x={540} y={620} s={p(0, 0.3)}>
        <PersonaCard w={400} h={560} lit={on} />
      </G>
      <G x={540} y={540} s={p(0, 0.5) * (1 - l(1, 0, 8))}><Question s={1.1} color={TXT} /></G>
      <G x={540} y={1190} s={p(1, 0.4)}><Crowd cols={13} rows={2} gap={78} r={20} lit={(i) => i === 6} /></G>
    </Stage>
  );
};

export const KhaiNiem: React.FC = () => {
  const { p, l } = useT();
  const flow = l(1, 0.15, 24);
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={540} y={200} p={p(0, 0.1)} solid size={50} />
      <Tag i={1} x={540} y={720} p={p(0, 0.45)} size={40} />
      <Tag i={2} x={540} y={850} p={p(1, 0.45)} solid size={40} />
      <Tag i={3} x={190} y={790} p={p(2, 0.4)} size={30} />
    </>}>
      <G x={540} y={470} s={p(0)}><PersonaCard w={340} h={440} /></G>
      {[0, 1].map((i) => (
        <G key={i} x={i === 0 ? 180 : 900} y={470} s={p(2, 0.1 + i * 0.2)} r={i === 0 ? -6 : 6}>
          <PersonaCard w={230} h={320} fill={i === 0 ? TXT : GOLD} />
        </G>
      ))}
      {[-280, -100, 100, 280].map((dx, i) => (
        <rect key={i} x={lerp(540 + dx, 540 + dx * 0.35, flow) - 40} y={lerp(1040, 760, flow)} width={80} height={24} rx={12} fill={GOLD} opacity={l(1, 0.15, 6) > 0 ? 1 - flow * 0.4 : 0} />
      ))}
      <G x={540} y={1190} s={p(1, 0.05)}><Crowd cols={9} rows={2} gap={108} r={24} base={GOLDL} /></G>
    </Stage>
  );
};

export const ViSao: React.FC = () => {
  const { p, l } = useT();
  const X = [190, 540, 890];
  const res = (i: number) => l(1, 0.15 + i * 0.25, 20);
  return (
    <Stage bg="#14110B" overlay={<>
      {X.map((x, i) => <Tag key={i} i={i} x={x} y={210} p={p(0, 0.2 + i * 0.24)} solid size={34} />)}
      {X.map((x, i) => <Tag key={i} i={3 + i} x={x} y={660} p={p(1, 0.12 + i * 0.25)} size={36} />)}
    </>}>
      {X.map((x, i) => <G key={i} x={x} y={400} s={p(0, 0.15 + i * 0.24)}><Box cx={0} cy={0} w={320} h={320} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} /></G>)}
      <G x={190} y={420} s={p(0, 0.25)}><Person s={1.4} fill={GOLDL} /></G>
      <G x={540} y={400} s={p(0, 0.49)}><Bottle s={1} /><G x={95} y={-70}><Question s={0.5} /></G></G>
      <G x={870} y={400} s={p(0, 0.73)}><Target r={85} /></G>
      {X.map((x, i) => <G key={i} x={x} y={1000} s={p(1, 0.1 + i * 0.25)}><Box cx={0} cy={0} w={320} h={590} rx={30} fill={EL} stroke={HOV} strokeWidth={5} /></G>)}
      {[0, 1, 2, 3].map((i) => <rect key={i} x={110 + i * 42} y={lerp(780, 980 + i * 60 - 110, res(0))} width={34} height={1270 - lerp(780, 980 + i * 60 - 110, res(0))} rx={8} fill={GOLD} opacity={Math.min(1, p(1, 0.1))} />)}
      <G x={540} y={910} s={p(1, 0.38)}><Doc w={200} h={240} /></G>
      <G x={540} y={1150} s={l(1, 0.55, 8)}><Stamp r={80} /></G>
      {[0, 1, 2, 3].map((i) => <rect key={i} x={810 + i * 42} y={1270 - (70 + i * 110) * res(2)} width={34} height={(70 + i * 110) * res(2)} rx={8} fill={GOLD} />)}
    </Stage>
  );
};

const Layer: React.FC<{ y: number; s: number; children: React.ReactNode }> = ({ y, s, children }) => (
  <G x={540} y={y} s={s}>
    <Box cx={0} cy={0} w={960} h={260} rx={30} fill={EL} stroke={GOLD} strokeWidth={6} />
    <G x={290}>{children}</G>
  </G>
);

export const BaNhom: React.FC = () => {
  const { p } = useT();
  return (
    <Stage bg={INK} overlay={<>
      {[320, 610, 900].map((y, i) => <Tag key={i} i={i} x={290} y={y} p={p(0, 0.32 + i * 0.22)} solid size={46} />)}
    </>}>
      <Layer y={320} s={p(0, 0.3)}><PersonaCard w={170} h={220} /></Layer>
      <Layer y={610} s={p(0, 0.52)}><Heart s={1.5} /></Layer>
      <Layer y={900} s={p(0, 0.74)}><Cart s={1.2} /></Layer>
      <G x={540} y={1200} s={p(0, 0.05)}><Person s={1.4} fill={GOLDL} /></G>
    </Stage>
  );
};

export const Tuoi: React.FC = () => {
  const { p, l } = useT();
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={290} y={205} p={p(0, 0.2)} solid size={44} />
      <Tag i={1} x={790} y={205} p={p(1, 0.2)} size={38} />
      <Tag i={2} x={270} y={360} p={p(2, 0.05)} solid size={52} />
      <Tag i={3} x={810} y={360} p={p(3, 0.05)} solid size={52} />
      {[0, 1].map((k) => <Tag key={k} i={4 + k} x={270} y={870 + k * 72} p={p(2, 0.45 + k * 0.2)} size={36} />)}
      {[0, 1, 2].map((k) => <Tag key={k} i={6 + k} x={810} y={810 + k * 72} p={p(3, 0.45 + k * 0.15)} size={34} />)}
    </>}>
      <G x={540} y={650} s={p(0) * (1 - l(2, 0, 8))}><PersonaCard w={420} h={560} /></G>
      <Box cx={270} cy={730} w={480} h={940} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} opacity={l(2, 0, 8)} />
      <Box cx={810} cy={730} w={480} h={940} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} opacity={l(3, 0, 8)} />
      <G x={190} y={590} s={p(2, 0.1)}><Person s={1.3} fill={GOLDL} /></G>
      <G x={360} y={600} s={p(2, 0.3)}><Bottle s={1.1} /></G>
      <G x={730} y={590} s={p(3, 0.1)}><Person s={1.3} fill={TXT} /></G>
      <G x={900} y={600} s={p(3, 0.3)}><Bottle s={1.1} fill={GOLDL} /></G>
      <G x={270} y={1130} s={p(2, 0.65)}><Sparkle x={0} y={0} s={1} r={60} /></G>
      <G x={810} y={1120} s={p(3, 0.75)}><Heart s={1.1} /></G>
      <G x={540} y={1280} s={p(1, 0.2)}>
        <rect x={-460} y={-10} width={920} height={20} rx={10} fill={HOV} />
        <rect x={-460} y={-10} width={920 * l(1, 0.3, 26)} height={20} rx={10} fill={GOLD} />
      </G>
    </Stage>
  );
};

const Coins: React.FC<{ n: number; p: number }> = ({ n, p }) => (
  <g>
    {Array.from({ length: n }, (_, i) => <G key={i} y={-i * 34 * p} s={Math.min(1, p)}><ellipse rx={92} ry={36} fill={i % 2 ? GOLD : GOLDL} stroke={INK} strokeWidth={4} /></G>)}
  </g>
);

export const ThuNhap: React.FC = () => {
  const { p, l } = useT();
  return (
    <Stage bg="#120F09" overlay={<>
      <Tag i={0} x={540} y={205} p={p(0, 0.2)} solid size={50} />
      <Tag i={1} x={270} y={1015} p={p(1, 0.45)} solid size={46} />
      <Tag i={2} x={810} y={1015} p={p(2, 0.45)} size={46} />
    </>}>
      <G x={540} y={480} s={p(0) * (1 - l(1, 0, 8))}><Coin r={170} /></G>
      <G x={270} y={980} s={1}><Coins n={14} p={l(1, 0.05, 16)} /></G>
      <G x={270} y={410} s={p(1, 0.35)}><Bottle s={1.9} /></G>
      <Sparkle x={110} y={330} s={p(1, 0.55)} r={40} />
      <Sparkle x={430} y={420} s={p(1, 0.65)} />
      <G x={810} y={980} s={1}><Coins n={7} p={l(2, 0.05, 14)} /></G>
      <G x={810} y={560} s={p(2, 0.35)}><Bottle s={1.5} fill={GOLDL} /></G>
      <G x={270} y={1190} s={p(1, 0.1)}><Crowd cols={3} rows={1} gap={100} r={28} base={GOLDL} /></G>
      <G x={810} y={1190} s={p(2, 0.1)}><Crowd cols={3} rows={1} gap={100} r={28} base={TXT} /></G>
    </Stage>
  );
};

export const TamLy: React.FC = () => {
  const { p, l } = useT();
  const X = [190, 540, 890];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={260} y={215} p={p(0, 0.1)} size={38} />
      <Tag i={1} x={790} y={215} p={p(0, 0.5)} solid size={46} />
      {X.map((x, i) => <Tag key={i} i={2 + i} x={x} y={740} p={p(1, 0.25 + i * 0.22)} size={30} />)}
      <Tag i={5} x={200} y={1015} p={p(2, 0.3)} solid size={34} />
      <Tag i={6} x={520} y={1015} p={p(2, 0.6)} size={36} />
    </>}>
      <G x={260} y={460} s={p(0)}><PersonaCard w={230} h={290} lit={false} /></G>
      <Arrow x1={400} y1={460} x2={590} y2={460} p={l(0, 0.45, 12)} />
      <G x={790} y={470} s={p(0, 0.55)}><Person s={1.5} fill={TXT} /><G y={-112} s={0.34}><Heart /></G></G>
      <G x={190} y={1185} s={p(2, 0.1)}><Leaf s={1.5} /></G>
      <Arrow x1={320} y1={1185} x2={400} y2={1185} p={l(2, 0.25, 8)} />
      <G x={520} y={1185} s={p(2, 0.35)}><Bottle s={1.1} /></G>
      <G x={840} y={1185} s={p(2, 0.65)}><circle r={90} fill={EL} stroke={GOLD} strokeWidth={6} /><G s={0.85}><Stamp r={70} /></G></G>
      <G x={190} y={880} s={p(1, 0.2)}><Stars n={3} s={0.9} /></G>
      <G x={540} y={880} s={p(1, 0.42)}><Clock r={80} hour={2} /></G>
      <G x={890} y={880} s={p(1, 0.64)}><Heart s={1} /></G>
    </Stage>
  );
};

export const TanSuat: React.FC = () => {
  const { p, l } = useT();
  const X = [190, 540, 890];
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={540} y={200} p={p(0, 0.05)} solid size={46} />
      {X.map((x, i) => <Tag key={i} i={1 + i} x={x} y={490} p={p(0, 0.28 + i * 0.22)} size={34} />)}
      <Tag i={4} x={270} y={1015} p={p(1, 0.55)} solid size={36} />
      <Tag i={5} x={810} y={1015} p={p(2, 0.55)} size={36} />
    </>}>
      <G x={190} y={350} s={p(0, 0.25)}><Clock r={90} hour={3} minute={0} /></G>
      <G x={540} y={345} s={p(0, 0.47)}><Cart s={1.25} /></G>
      <G x={890} y={350} s={p(0, 0.69)}><Sparkle x={0} y={0} s={1} r={90} /></G>
      <G x={270} y={750} s={p(1, 0.15)}><Calendar s={1.3} on={(i) => l(1, 0.25 + i * 0.03, 4) > 0} /></G>
      <G x={810} y={750} s={p(2, 0.15)}><Calendar s={1.3} on={(i) => [2, 5, 8, 11].includes(i) && l(2, 0.3 + i * 0.03, 4) > 0} /></G>
      <G x={270} y={1200} s={p(1, 0.05)}><Bottle s={1.1} /></G>
      <G x={810} y={1200} s={p(2, 0.05)}><Lipstick s={1.25} /></G>
    </Stage>
  );
};

const Truck: React.FC = () => (
  <g>
    <Box cx={-30} cy={0} w={170} h={110} rx={10} fill={GOLD} />
    <path d="M56 -30 H100 L136 8 V55 H56 Z" fill={GOLDL} />
    <circle cx={-60} cy={62} r={22} fill={TXT} />
    <circle cx={90} cy={62} r={22} fill={TXT} />
  </g>
);

export const Kenh: React.FC = () => {
  const { p, l } = useT();
  return (
    <Stage bg="#14110B" overlay={<>
      <Tag i={0} x={270} y={205} p={p(0, 0.1)} solid size={46} />
      <Tag i={1} x={760} y={270} p={p(0, 0.35)} size={38} />
      <Tag i={2} x={700} y={640} p={p(0, 0.65)} size={38} />
      <Tag i={3} x={270} y={1000} p={p(1, 0.3)} solid size={42} />
      <Tag i={4} x={810} y={1000} p={p(1, 0.6)} solid size={42} />
    </>}>
      <G x={260} y={540} s={p(0)}><Phone w={320} h={560}><G s={1.45}><Post /></G></Phone></G>
      <G x={760} y={420} s={p(0, 0.3)}><Coupon s={1.3} /></G>
      <G x={lerp(480, 830, l(0, 0.65, 22))} y={790} s={p(0, 0.6)}><Truck /></G>
      <G x={270} y={1200} s={p(1, 0.2)}><Coupon s={1.5} /></G>
      <G x={810} y={1190} s={p(1, 0.5)}><Gift s={1.5} /></G>
    </Stage>
  );
};

export const ThucDay: React.FC = () => {
  const { p, l } = useT();
  const rush = l(2, 0.45, 12);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={310} y={205} p={p(0, 0.15)} solid size={44} />
      <Tag i={1} x={790} y={205} p={p(0, 0.6)} size={38} />
      <Tag i={2} x={290} y={650} p={p(1, 0.2)} size={38} />
      <Tag i={3} x={800} y={650} p={p(1, 0.6)} solid size={42} />
      <Tag i={4} x={290} y={1015} p={p(2, 0.15)} solid size={44} />
      <Tag i={5} x={800} y={1015} p={p(2, 0.65)} size={44} />
    </>}>
      <G x={300} y={400} s={p(0, 0.1)}><Bubble w={420} h={180} fill={EL} ink={SEC} /><G y={-30} s={0.75}><Stars n={5} /></G></G>
      <G x={790} y={420} s={p(0, 0.55)}><Person s={1.4} fill={GOLDL} /><G x={130} y={-90}><Bottle s={0.75} /></G></G>
      <G x={290} y={830} s={p(1, 0.15)}>
        <Box cx={0} cy={0} w={440} h={250} rx={24} fill={EL} stroke={GOLD} strokeWidth={5} />
        {[0, 1, 2].map((i) => <G key={i} x={-120 + i * 120} y={-30 + (i % 2) * 40} s={p(1, 0.25 + i * 0.1)}><Bubble w={100} h={70} n={1} fill={i === 1 ? GOLDL : GOLD} /></G>)}
      </G>
      <G x={800} y={840} s={p(1, 0.55)}><Person s={1.2} fill={TXT} /><G x={0} y={-155} s={1.2}><Sparkle x={0} y={0} s={1} r={32} /></G></G>
      {[-1, 1].map((d) => <G key={d} x={800 + d * 150} y={850} s={p(1, 0.7)}><Crowd cols={1} rows={2} gap={70} r={20} base={GOLDL} /></G>)}
      <G x={280} y={1210} s={p(2, 0.05)}><Calendar s={0.75} on={(i) => i === 10} /></G>
      <G x={lerp(600, 790, rush)} y={1210} s={p(2, 0.45)}><Cart s={1.4} /></G>
      <G x={950} y={1190} s={l(2, 0.75, 6)}><Bolt s={1.1} /></G>
    </Stage>
  );
};

export const TamQuanTrong: React.FC = () => {
  const { p } = useT();
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={270} y={225} p={p(1, 0.1)} solid size={42} />
      <Tag i={1} x={270} y={1000} p={p(2, 0.5)} size={34} />
      <Tag i={2} x={810} y={225} p={p(3, 0.1)} solid size={42} />
      <Tag i={3} x={810} y={860} p={p(4, 0.3)} size={34} />
      <Tag i={4} x={810} y={1000} p={p(4, 0.6)} solid size={34} />
    </>}>
      <G x={540} y={1210} s={p(0)}><Crowd cols={13} rows={1} gap={78} r={22} base={GOLDL} /></G>
      <Box cx={270} cy={620} w={480} h={880} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} opacity={Math.min(1, p(0, 0.3))} />
      <Box cx={810} cy={620} w={480} h={880} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} opacity={Math.min(1, p(0, 0.5))} />
      <G x={270} y={460} s={p(1, 0.2)}><Bubble w={340} h={180} n={3} /></G>
      <G x={270} y={770} s={p(2, 0.2)}><Heart s={2.2} /></G>
      <G x={810} y={450} s={p(3, 0.2)}><Phone w={190} h={300}><G s={0.75}><Post /></G></Phone></G>
      <G x={810} y={730} s={p(4, 0.1)}><Coupon s={1.3} /></G>
      <G x={810} y={930} s={p(4, 0.55)}><Bolt s={0.7} /></G>
    </Stage>
  );
};

export const DiemCanNho: React.FC = () => {
  const { p } = useT();
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={260} y={210} p={p(0, 0.1)} solid size={38} />
      <Tag i={1} x={800} y={210} p={p(0, 0.32)} solid size={38} />
      <Tag i={2} x={190} y={1000} p={p(0, 0.58)} size={36} />
      <Tag i={3} x={540} y={1000} p={p(0, 0.7)} size={36} />
      <Tag i={4} x={890} y={1000} p={p(0, 0.84)} size={36} />
    </>}>
      <G x={260} y={490} s={p(0, 0.05)}><Crowd cols={4} rows={3} gap={92} r={22} base={GOLDL} /></G>
      <Arrow x1={440} y1={490} x2={560} y2={490} p={p(0, 0.2)} />
      <G x={800} y={500} s={p(0, 0.28)}><PersonaCard w={340} h={430} /></G>
      <G x={190} y={840} s={p(0, 0.55)}><Bubble w={210} h={130} /></G>
      <G x={540} y={830} s={p(0, 0.67)}><Person s={1.1} fill={GOLDL} /></G>
      <G x={890} y={830} s={p(0, 0.81)}><Target r={95} /></G>
      <G x={540} y={1200} s={p(0, 0.9)}><Stamp r={110} /></G>
    </Stage>
  );
};

export { KetFb as Ket } from "../fb-ads/art";
