import React from "react";
import { AI, Arrow, Box, Cross, Desk, EL, Folder, G, GOLD, GOLDL, HOV, INK, Mag, Person, Question, RED, Stamp, SURF, TXT, lerp, useT } from "../shared/art";
import { Stage, Tag, AdsUI, Cart, Coin, Crowd, Cursor, Doc2, Eye, Net, Phone, Post, Target, Toggle } from "./art";

export const Hook: React.FC = () => {
  const { p, l } = useT();
  const q = p(0, 0.3) * (1 - l(1, 0, 10));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={270} y={225} p={p(0, 0.1)} solid size={44} />
      <Tag i={1} x={760} y={225} p={p(1, 0.15)} solid size={50} />
      <Tag i={2} x={300} y={350} p={p(1, 0.45)} size={40} />
      <Tag i={3} x={780} y={350} p={p(1, 0.55)} size={40} />
      <Tag i={4} x={200} y={950} p={p(1, 0.8)} solid size={38} />
    </>}>
      <G x={540} y={830} s={Math.min(1, p(1)) * 1.3}>
        <Desk nod={0}>
          <G y={-150}><AdsUI w={1000} h={620} s={0.49} /></G>
        </Desk>
      </G>
      <G x={540} y={1190} s={(1 - l(1, 0, 8)) * p(0)}><Person s={2} fill={GOLDL} /></G>
      <G x={540} y={640} s={q * 1.7}><Question /></G>
    </Stage>
  );
};

const MGR = [280, 620, 960];

export const BaManager: React.FC = () => {
  const { f, at, p, l } = useT();
  const mix = l(1, 0, 8);
  const shuffle = (i: number) => Math.sin((f - at(0)) * 0.22 + i * 2) * 28 * (1 - mix) * Math.min(1, p(0, 0.2));
  const big = p(2, 0.05);
  return (
    <Stage bg={SURF} overlay={<>
      {MGR.map((y, i) => <Tag key={i} i={i} x={270} y={y - 66} p={p(0, 0.3 + i * 0.12)} solid={l(i + 1, 0, 6) > 0} size={42} />)}
      <Tag i={3} x={250} y={MGR[0] + 34} p={p(1, 0.6)} size={30} />
      <Tag i={4} x={250} y={MGR[1] + 34} p={p(2, 0.6)} size={30} />
      <Tag i={5} x={250} y={MGR[2] + 34} p={p(3, 0.6)} size={30} />
    </>}>
      {MGR.map((y, i) => (
        <G key={i} x={540 + shuffle(i)} y={y} s={p(0, 0.15 + i * 0.12)}>
          <Box cx={0} cy={0} w={980} h={i === 1 ? 300 + big * 16 : 300} rx={26} fill={l(i + 1, 0, 6) > 0 ? EL : "#191A1D"} stroke={l(i + 1, 0, 6) > 0 ? GOLD : HOV} strokeWidth={i === 1 ? 5 + big * 4 : 5} />
        </G>
      ))}
      <G x={640} y={290} s={p(1, 0.15)}><Folder s={0.85} /></G>
      <G x={810} y={280} s={p(1, 0.35)}><Phone w={90} h={150}><G s={0.38}><Post /></G></Phone></G>
      <G x={940} y={280} s={p(1, 0.55)}><Crowd cols={1} rows={2} gap={72} r={22} base={GOLDL} /></G>
      <G x={740} y={620} s={p(2, 0.2)}><AdsUI w={1000} h={620} s={0.44} /></G>
      <G x={650} y={960} s={p(3, 0.2)}><Eye r={92} /></G>
      <Arrow x1={760} y1={960} x2={830} y2={960} p={l(3, 0.35, 8)} />
      <G x={920} y={960} s={p(3, 0.45)}><Box cx={0} cy={0} w={150} h={150} rx={20} fill={GOLD} /><Doc2 w={80} h={100} /></G>
    </Stage>
  );
};

export const NamKhuVuc: React.FC = () => {
  const { p, l } = useT();
  const hi = l(6, 0, 4) > 0 ? 1 : l(5, 0, 4) > 0 ? 4 : l(4, 0, 4) > 0 ? 3 : l(3, 0, 4) > 0 ? 2 : l(2, 0, 4) > 0 ? 1 : l(1, 0, 4) > 0 ? 0 : -1;
  const tab = l(6, 0.75, 4) > 0 ? 2 : l(6, 0.5, 4) > 0 ? 1 : 0;
  const pos: [number, number][] = [[210, 310], [540, 420], [850, 310], [150, 720], [640, 820]];
  const curI = Math.max(0, hi);
  const off = l(4, 0.5, 6) > 0 ? 2 : -1;
  return (
    <Stage bg="#14110B" overlay={<>
      <Tag i={0} x={540} y={200} p={p(0, 0.1)} size={38} />
      <Tag i={1} x={260} y={402} p={p(1, 0.3) * (1 - l(2, 0, 4))} solid size={38} />
      <Tag i={2} x={540} y={395} p={p(2, 0.25) * (1 - l(3, 0, 4))} solid size={40} />
      <Tag i={3} x={760} y={402} p={p(3, 0.15) * (1 - l(4, 0, 4))} solid size={36} />
      {[0, 1, 2].map((i) => <Tag key={i} i={4 + i} x={620 + i * 150} y={490} p={p(3, 0.4 + i * 0.12) * (1 - l(4, 0, 4))} size={28} />)}
      <Tag i={7} x={200} y={620} p={p(4, 0.2) * (1 - l(5, 0, 4))} solid size={38} />
      <Tag i={8} x={540} y={640} p={p(5, 0.15) * (1 - l(6, 0, 4))} solid size={40} />
      {[0, 1, 2].map((i) => <Tag key={i} i={9 + i} x={230 + i * 310} y={450 + 0} p={p(6, 0.2 + i * 0.25)} size={28} solid={tab === i} />)}
      <Tag i={12} x={540} y={1015} p={p(6, 0.15)} solid size={42} />
    </>}>
      <G x={540} y={760} s={p(0)}><AdsUI w={1010} h={1060} hi={hi} tab={tab} offRow={off} /></G>
      <G x={lerp(150, pos[curI][0], l(1, 0, 10))} y={lerp(1200, pos[curI][1], l(1, 0, 10))} s={l(1, 0, 8)}><Cursor s={1.1} /></G>
      {[0, 1, 2].map((i) => <G key={i} x={230 + i * 310} y={1190} s={p(6, 0.2 + i * 0.25)}><Box cx={0} cy={0} w={260} h={90} rx={18} fill={i === 0 ? GOLD : i === 1 ? GOLDL : TXT} /></G>)}
    </Stage>
  );
};

const CELL = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [i % 2 === 0 ? 285 : 795, 300 + Math.floor(i / 2) * 240]);

export const CotChiSo: React.FC = () => {
  const { p, l } = useT();
  const beat = [1, 2, 2, 3, 4, 5, 5, 6];
  const fr = [0, 0, 0.5, 0, 0, 0, 0.55, 0];
  const pop = (i: number, d = 0) => p(beat[i], fr[i] + d);
  const lit = (i: number) => l(beat[i], fr[i], 5) > 0;
  return (
    <Stage bg={INK} overlay={<>
      {CELL.map(([x, y], i) => <Tag key={i} i={i} x={x} y={y - 80} p={Math.min(1, p(0, 0.15 + i * 0.05))} solid={lit(i)} size={32} />)}
    </>}>
      {CELL.map(([x, y], i) => (
        <G key={i} x={x} y={y} s={Math.min(1, p(0, 0.1 + i * 0.05))}>
          <Box cx={0} cy={0} w={490} h={226} rx={24} fill={lit(i) ? "#2B2414" : EL} stroke={lit(i) ? GOLD : HOV} strokeWidth={5} />
        </G>
      ))}
      <G x={285} y={325} s={pop(0)}><Coin r={62} /></G>
      <G x={795} y={330} s={pop(1)}><Crowd cols={5} rows={1} gap={72} r={22} base={GOLDL} /></G>
      <G x={285} y={570} s={pop(2)}><Crowd cols={1} rows={1} r={28} base={GOLDL} /></G>
      {[0, 1, 2].map((i) => <G key={i} x={120 + i * 330 * 0.2 + (i > 0 ? 240 : 200)} y={575 + (i === 1 ? -36 : 30)} s={pop(2, 0.08 + i * 0.1)}><Eye r={30} /></G>)}
      <G x={700} y={575} s={pop(3)}><Coin r={56} /></G>
      <Arrow x1={760} y1={575} x2={810} y2={575} p={l(3, 0.2, 8)} w={7} />
      <G x={900} y={578} s={pop(3, 0.25)}><Crowd cols={3} rows={2} gap={46} r={11} base={GOLDL} /></G>
      <G x={190} y={815} s={pop(4)}><Crowd cols={2} rows={2} gap={52} r={13} lit={(i) => i === 0} /></G>
      <G x={335} y={800} s={pop(4, 0.3)}><Cursor s={1} /></G>
      <G x={700} y={815} s={pop(5)}><Cart s={0.8} /></G>
      <G x={870} y={815} s={pop(5, 0.2)}><Stamp r={52} /></G>
      <G x={195} y={1060} s={pop(6)}><Coin r={54} /></G>
      <Arrow x1={260} y1={1060} x2={310} y2={1060} p={l(5, 0.65, 8)} w={7} />
      <G x={385} y={1060} s={pop(6, 0.15)}><Stamp r={50} /></G>
      <G x={690} y={1060} s={pop(7)}><Coin r={52} /></G>
      <Arrow x1={752} y1={1060} x2={806} y2={1060} p={l(6, 0.2, 8)} w={7} />
      <G x={900} y={1068} s={pop(7, 0.25)}>
        {[0, 1, 2, 3].map((i) => <rect key={i} x={-74 + i * 38} y={40 - (i + 1) * 28} width={30} height={(i + 1) * 28} rx={6} fill={GOLD} />)}
      </G>
      <G x={540} y={1260} s={p(0, 0.5)}><Mag s={0.9} /></G>
    </Stage>
  );
};

const NODE = [0, 1, 2, 3, 4, 5, 6].map((i) => {
  const a = (-90 + (i * 360) / 7) * (Math.PI / 180);
  return [540 + Math.cos(a) * 370, 610 + Math.sin(a) * 350];
});
const BEAT = [[1, 0.1], [1, 0.32], [1, 0.54], [1, 0.76], [2, 0], [4, 0], [5, 0]] as const;

export const Vong: React.FC = () => {
  const { f, p, l } = useT();
  const on = (i: number) => l(BEAT[i][0], BEAT[i][1], 6) > 0;
  const loop = l(6, 0.1, 24);
  const auction = p(2, 0.2) * (1 - l(4, 0, 8));
  const fair = p(3, 0.1) * (1 - l(4, 0, 8));
  return (
    <Stage bg="#120F09" overlay={<>
      {NODE.map(([x, y], i) => <Tag key={i} i={i} x={x} y={y + 78} p={p(BEAT[i][0], BEAT[i][1] + 0.05)} solid={i >= 4} size={30} />)}
      <Tag i={7} x={540} y={490} p={fair} size={32} color={RED} solid />
      <Tag i={12} x={150} y={1025} p={p(1)} size={34} />
      <Tag i={13} x={540} y={535} p={p(6, 0.3)} size={32} />
      {[0, 1, 2].map((i) => <Tag key={i} i={8 + i} x={540} y={560 + i * 60} p={p(3, 0.15 + i * 0.2) * (1 - l(4, 0, 8))} size={32} />)}
      <Tag i={11} x={540} y={620} p={p(6, 0.35)} solid size={40} />
    </>}>
      <G x={540} y={610} s={p(0)}><circle r={360} fill="none" stroke={HOV} strokeWidth={10} /></G>
      <circle cx={540} cy={610} r={360} fill="none" stroke={GOLD} strokeWidth={14} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - loop} transform="rotate(-90 540 610)" />
      {NODE.map(([x, y], i) => (
        <G key={i} x={x} y={y} s={p(BEAT[i][0], BEAT[i][1]) * 1}>
          <circle r={74} fill={on(i) ? "#2B2414" : EL} stroke={GOLD} strokeWidth={6} />
          {i === 0 && <Target r={46} arrow={0} />}
          {i === 1 && <Crowd cols={2} rows={1} gap={50} r={17} base={GOLDL} />}
          {i === 2 && <Phone w={60} h={100}><G s={0.26}><Post /></G></Phone>}
          {i === 3 && <Stamp r={42} />}
          {i === 4 && [-22, 0, 22].map((d, k) => <rect key={k} x={d - 16} y={-28 + k * 8} width={32} height={52} rx={6} fill={k === 1 ? GOLD : HOV} stroke={TXT} strokeWidth={2} />)}
          {i === 5 && <><Crowd cols={3} rows={2} gap={36} r={8} base={GOLDL} /></>}
          {i === 6 && <Eye r={50} />}
        </G>
      ))}
      <G x={540} y={570} s={fair}><Box cx={0} cy={0} w={350} h={300} rx={22} fill={EL} stroke={GOLD} strokeWidth={4} /></G>
      {[[-110, -40], [0, -70], [110, -40], [-60, 70], [60, 70]].map(([dx, dy], i) => (
        <G key={i} x={540 + dx} y={610 + dy} s={p(2, 0.2 + i * 0.08) * (1 - l(3, 0, 6))}><Phone w={90} h={150}><G s={0.38}><Post /></G></Phone></G>
      ))}
      <G x={680} y={490} s={p(3, 0.7) * (1 - l(4, 0, 8))}><Cross r={22} /></G>
      <G x={540} y={445} s={p(6, 0.25)}><AI size={110} /></G>
      <G x={150} y={1220} s={p(1)}><Person s={1.3} fill={GOLDL} /></G>
      <G x={330} y={1220} s={p(1, 0.15)}><Stamp r={48} /></G>
      <G x={720} y={1225} s={p(4, 0.3)}><Crowd cols={8} rows={2} gap={70} r={16} base={GOLDL} /></G>
    </Stage>
  );
};

export const MayHoc: React.FC = () => {
  const { f, at, p, l } = useT();
  const learn = l(0, 0.2, 80);
  const dots = Array.from({ length: 9 }, (_, i) => l(0, 0.25 + i * 0.07, 12));
  const mess = l(2, 0.1, 6) > 0;
  const shake = mess ? Math.sin((f - at(2)) * 1.1) * 18 : 0;
  const fall = l(2, 0.35, 20);
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={880} y={195} p={p(0, 0.15)} size={38} />
      <Tag i={1} x={420} y={500} p={p(0, 0.6)} size={38} />
      <Tag i={2} x={540} y={600} p={p(1, 0.1)} solid size={46} />
      <Tag i={3} x={300} y={1015} p={p(2, 0.45)} color={RED} solid size={38} />
      <Tag i={4} x={790} y={1015} p={p(3, 0.25)} solid size={40} />
    </>}>
      <G x={170} y={320} s={p(0)}><Phone w={180} h={300}><G s={0.75}><Post /></G></Phone></G>
      {dots.map((d, i) => <circle key={i} cx={lerp(280, 520, d)} cy={lerp(240 + (i % 3) * 70, 320, d)} r={13} fill={GOLDL} opacity={d > 0 && d < 1 ? 1 : 0} />)}
      <G x={700} y={340} s={p(0, 0.1)}><Net s={1.1} learn={learn} /></G>
      <G x={300 + shake} y={830} s={p(2)}>
        <Box cx={0} cy={0} w={460} h={280} rx={24} fill={EL} stroke={mess ? RED : HOV} strokeWidth={5} />
        <G x={-130} y={-20}><Toggle on={Math.sin(f * 0.5) > 0 ? 1 : 0} s={1.2} /></G>
        <G x={0} y={-20}><Toggle on={Math.sin(f * 0.7) > 0 ? 1 : 0} s={1.2} /></G>
        <G x={130} y={-20}><Toggle on={Math.sin(f * 0.9) > 0 ? 1 : 0} s={1.2} /></G>
        <G x={0} y={90}><Cross r={22} /></G>
      </G>
      <G x={790} y={830} s={p(2, 0.25)}>
        <Box cx={0} cy={0} w={400} h={280} rx={24} fill={EL} stroke={HOV} strokeWidth={5} />
        {[0, 1, 2, 3, 4].map((i) => {
          const hh = lerp(40 + i * 36, 170 - i * 30, fall);
          return <rect key={i} x={-150 + i * 64} y={110 - hh} width={46} height={hh} rx={8} fill={fall > 0.6 ? RED : GOLD} />;
        })}
      </G>
      {[0, 1, 2, 3].map((i) => (
        <G key={i} x={210 + i * 220} y={1200} s={p(3, 0.15 + i * 0.12)}>
          <Box cx={0} cy={0} w={190} h={190} rx={18} fill={i === 0 ? GOLD : EL} stroke={GOLD} strokeWidth={5} />
          <rect x={-70} y={-70} width={140} height={28} rx={8} fill={i === 0 ? INK : GOLD} />
          {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={-70 + (k % 3) * 50} y={-22 + Math.floor(k / 3) * 44} width={40} height={32} rx={6} fill={i === 0 ? INK : HOV} />)}
        </G>
      ))}
    </Stage>
  );
};

export const SanSang: React.FC = () => {
  const { p, l } = useT();
  const items = [0.2, 0.5, 0.78];
  const rows = [270, 540, 810];
  return (
    <Stage bg={INK} overlay={<>
      {rows.map((y, i) => <Tag key={i} i={i} x={380} y={y - 84} p={p(0, items[i])} solid={l(0, items[i] + 0.1, 5) > 0} size={36} />)}
      <Tag i={3} x={540} y={1015} p={p(0, 0.92)} solid size={46} />
    </>}>
      {rows.map((y, i) => (
        <G key={i} x={540} y={y} s={Math.min(1, p(0, items[i] - 0.08))}>
          <Box cx={0} cy={0} w={960} h={245} rx={28} fill={EL} stroke={GOLD} strokeWidth={5} />
          <G x={-380}><circle r={78} fill="#2B2414" stroke={GOLD} strokeWidth={5} /><Stamp r={56} /></G>
        </G>
      ))}
      <G x={400} y={295} s={p(0, 0.25)}><Target r={60} arrow={0} /></G>
      <G x={560} y={300} s={p(0, 0.28)}><Crowd cols={2} rows={1} gap={52} r={17} base={GOLDL} /></G>
      <G x={720} y={295} s={p(0, 0.31)}><Phone w={70} h={120}><G s={0.3}><Post /></G></Phone></G>
      <G x={880} y={295} s={p(0, 0.34)}><Eye r={62} /></G>
      <G x={660} y={560} s={p(0, 0.55)}><AdsUI w={1000} h={500} s={0.38} /></G>
      <G x={660} y={825} s={p(0, 0.82)}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const a = (-90 + (i * 360) / 7) * (Math.PI / 180);
          return <circle key={i} cx={Math.cos(a) * 170} cy={Math.sin(a) * 90} r={22} fill={i < 4 ? GOLD : GOLDL} />;
        })}
        <ellipse rx={170} ry={90} fill="none" stroke={GOLD} strokeWidth={6} />
      </G>
      <G x={540} y={1215} s={p(0, 0.92)}><Person s={1.7} fill={GOLDL} /></G>
      <G x={280} y={1220} s={p(0, 0.95)}><Stamp r={80} /></G>
    </Stage>
  );
};

export { KetFb as Ket } from "./art";
