import React from "react";
import { AI, Arrow, Box, Bubble, Cross, EL, G, GOLD, GOLDL, HOV, INK, Lock, Person, Question, Stamp, SURF, TXT, lerp, useT } from "../mo-dau/art";
import { Stage, Tag, Cart, Coin, Crowd, Cursor, Doc2, Eye, Net, OpenBox, Phone, Pin, Post, Target } from "./art";

export const Hook: React.FC = () => {
  const { p, l } = useT();
  const frame = l(1, 0.1, 22);
  return (
    <Stage bg={INK} overlay={<>
      {[[290, 270], [790, 270], [290, 410], [790, 410]].map(([x, y], i) => <Tag key={i} i={i} x={x} y={y} p={p(0, 0.3 + i * 0.13)} solid size={54} />)}
      <Tag i={4} x={540} y={530} p={p(1, 0.4)} size={44} />
      <Tag i={5} x={540} y={985} p={p(2, 0.15)} solid size={46} />
    </>}>
      <rect x={70} y={190} width={940} height={310} rx={30} fill="none" stroke={GOLDL} strokeWidth={7} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - frame} />
      {[0, 1, 2].map((i) => (
        <G key={i} x={540} y={640 + i * 100} s={p(2, 0.05 + i * 0.12)}>
          <Box cx={0} cy={0} w={560 + i * 170} h={84} rx={20} fill={i === 0 ? GOLD : EL} stroke={GOLD} strokeWidth={5} />
        </G>
      ))}
      <G x={190} y={1230} s={p(0)}><Person s={1.7} /></G>
      <G x={890} y={1230} s={p(0, 0.1)}><Person s={1.7} fill={GOLDL} /></G>
      <G x={350} y={1090} s={p(0, 0.15)}><Bubble w={210} h={110} /></G>
      <G x={730} y={1140} s={p(0, 0.25)} r={0}><g transform="scale(-1 1)"><Bubble w={210} h={110} fill={GOLDL} /></g></G>
    </Stage>
  );
};

const ROWS = [300, 560, 820];

export const BaTang: React.FC = () => {
  const { p, l } = useT();
  const lit = (i: number) => l(2 + i, 0, 8) > 0;
  return (
    <Stage bg={SURF} overlay={<>
      {ROWS.map((y, i) => <Tag key={i} i={i} x={270} y={y - 44} p={p(0, 0.15 + i * 0.25)} solid size={50} />)}
      {ROWS.map((y, i) => <Tag key={i} i={3 + i} x={290} y={y + 50} p={p(2 + i, 0.3)} size={32} />)}
    </>}>
      {ROWS.map((y, i) => (
        <G key={i} x={540} y={y} s={p(0, 0.1 + i * 0.25)}>
          <Box cx={0} cy={0} w={960} h={220} rx={30} fill={EL} stroke={lit(i) ? GOLD : HOV} strokeWidth={6} />
        </G>
      ))}
      {[0, 1].map((i) => <Arrow key={i} x1={540} y1={ROWS[i] + 94} x2={540} y2={ROWS[i + 1] - 96} p={l(0, 0.45 + i * 0.25, 8)} w={8} />)}
      {ROWS.map((y, i) => <G key={i} x={810} y={y} s={p(1, 0.2 + i * 0.15) * (lit(i) ? 0 : 1)}><Question s={0.62} /></G>)}
      <G x={810} y={300} s={p(2, 0.15)}><Target r={84} /></G>
      <G x={640} y={560} s={p(3, 0.2)}><Crowd cols={2} rows={2} gap={54} r={14} /></G>
      <G x={810} y={560} s={p(3, 0.45)}><Coin r={56} /></G>
      <G x={950} y={566} s={p(3, 0.7)}><Pin s={0.88} /></G>
      <G x={810} y={820} s={p(4, 0.2)}><Phone w={110} h={190}><G s={0.48}><Post /></G></Phone></G>
      <G x={540} y={1040} s={p(5)}><Box cx={0} cy={0} w={240} h={64} rx={14} fill={GOLD} /></G>
      {[240, 540, 840].map((x, i) => (
        <g key={i}>
          <line x1={540} y1={1072} x2={lerp(540, x, l(5, 0.15, 12))} y2={lerp(1072, 1142, l(5, 0.15, 12))} stroke={GOLDL} strokeWidth={6} />
          <G x={x} y={1170} s={p(5, 0.3)}><Box cx={0} cy={0} w={210} h={58} rx={12} fill={GOLDL} /></G>
          {[-70, 0, 70].map((dx, j) => (
            <g key={j}>
              <line x1={x} y1={1199} x2={x + dx * l(5, 0.55, 10)} y2={lerp(1199, 1252, l(5, 0.55, 10))} stroke={HOV} strokeWidth={5} />
              <G x={x + dx} y={1280} s={p(5, 0.65 + j * 0.05)}><Box cx={0} cy={0} w={58} h={58} rx={8} fill={TXT} /></G>
            </g>
          ))}
        </g>
      ))}
    </Stage>
  );
};

export const ViSao: React.FC = () => {
  const { f, at, p, l } = useT();
  const q = p(0) * (1 - l(1, 0, 10));
  const win = p(4, 0.2, 10);
  return (
    <Stage bg="#14110B" overlay={<>
      <Tag i={0} x={540} y={200} p={p(1, 0.3)} solid size={46} />
      <Tag i={1} x={540} y={520} p={p(2, 0.55)} size={42} />
      <Tag i={2} x={540} y={1015} p={p(3, 0.5) * (1 - Math.min(1, win))} size={42} />
      <Tag i={3} x={540} y={1015} p={win} solid size={46} />
    </>}>
      <G x={540} y={340} s={q * 1.2}><Question /></G>
      <G x={540} y={350} s={p(1, 0.1)}><Target r={100} /></G>
      {[200, 540, 880].map((x, i) => (
        <g key={i}>
          <line x1={540} y1={450} x2={lerp(540, x, l(2, 0.05, 12))} y2={lerp(450, 590, l(2, 0.05, 12))} stroke={GOLD} strokeWidth={7} />
          <G x={x} y={750} s={p(2, 0.15 + i * 0.15)}>
            <Box cx={0} cy={0} w={310} h={330} rx={26} fill={EL} stroke={i === 1 && win > 0.3 ? GOLDL : GOLD} strokeWidth={i === 1 && win > 0.3 ? 9 : 5} />
            <G y={-95}><Crowd cols={3} rows={1} gap={[60, 80, 42][i]} r={[17, 15, 15][i]} base={GOLDL} /></G>
          </G>
          {[-70, 70].map((dx, j) => (
            <G key={j} x={x + dx} y={790 + (i === 1 && j === 1 ? Math.sin((f - at(4)) * 0.3) * 0 : 0)} s={p(3, 0.1 + i * 0.12 + j * 0.08)}>
              <Phone w={110} h={190}><G s={0.48}><Post art={j === 0 ? GOLD : GOLDL} /></G></Phone>
            </G>
          ))}
        </g>
      ))}
      {[200, 540, 880].map((x, i) => {
        const hh = [120, 250, 170][i] * l(4, 0.1, 18);
        return <rect key={i} x={x - 60} y={1330 - hh} width={120} height={hh} rx={12} fill={i === 1 ? GOLD : HOV} />;
      })}
      <G x={700} y={1170} s={win}><Stamp r={66} /></G>
    </Stage>
  );
};

export const Campaign: React.FC = () => {
  const { p, l } = useT();
  const drop = p(1, 0.2, 11);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={290} y={750} p={p(0, 0.15)} solid size={56} />
      <Tag i={1} x={720} y={750} p={p(0, 0.45)} size={40} />
      <Tag i={2} x={250} y={330} p={p(1, 0.45)} solid size={50} />
      <Tag i={3} x={830} y={475} p={p(1, 0.7)} size={40} />
    </>}>
      <G x={540} y={950} s={p(0)}>
        <OpenBox w={880} h={620} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <G key={i} x={-315 + (i % 4) * 210} y={-40 + Math.floor(i / 4) * 200} s={p(0, 0.3 + i * 0.05)}>
            <Phone w={110} h={180}><G s={0.48}><Post /></G></Phone>
          </G>
        ))}
      </G>
      <G x={540} y={lerp(-180, 340, drop)} s={1}><Target r={150} /></G>
      <Arrow x1={700} y1={340} x2={880} y2={340} p={l(1, 0.55, 12)} w={10} />
      <G x={950} y={340} s={p(1, 0.75)}><Stamp r={60} /></G>
    </Stage>
  );
};

const NODES = [-90, -30, 30, 90, 150, 210].map((d) => [540 + Math.cos((d * Math.PI) / 180) * 350, 590 + Math.sin((d * Math.PI) / 180) * 300]);

export const SauMucTieu: React.FC = () => {
  const { p, l } = useT();
  const icons = [
    <Eye key="a" r={62} />,
    <G key="b" x={-20} y={-34}><Cursor s={1.05} /></G>,
    <G key="c" y={-4}><Bubble w={116} h={78} n={1} /></G>,
    <G key="d" y={0}><Doc2 w={92} h={118} /></G>,
    <Phone key="e" w={72} h={124}><rect x={-20} y={-26} width={40} height={40} rx={10} fill={GOLD} /></Phone>,
    <Cart key="f" s={0.75} />,
  ];
  return (
    <Stage bg="#120F09" overlay={<>
      <Tag i={6} x={540} y={590} p={p(0, 0.15)} solid size={54} />
      {NODES.map(([x, y], i) => <Tag key={i} i={i} x={x} y={y + 92} p={p(i + 1, 0.05)} size={34} solid={i === 5} />)}
      <Tag i={7} x={235} y={295} p={p(6, 0.5)} size={30} solid />
    </>}>
      {NODES.map(([x, y], i) => (
        <g key={i}>
          <line x1={540} y1={590} x2={lerp(540, x, l(0, 0.3 + i * 0.05, 10))} y2={lerp(590, y, l(0, 0.3 + i * 0.05, 10))} stroke={HOV} strokeWidth={5} />
        </g>
      ))}
      <G x={540} y={590} s={p(0)}><circle r={170} fill={EL} stroke={GOLD} strokeWidth={6} /></G>
      {NODES.map(([x, y], i) => (
        <G key={i} x={x} y={y} s={Math.max(p(0, 0.3 + i * 0.05) * 0.8, p(i + 1) * (i === 5 ? 1.2 : 1))}>
          <circle r={90} fill={l(i + 1, 0, 6) > 0 ? "#2B2414" : EL} stroke={l(i + 1, 0, 6) > 0 ? GOLD : HOV} strokeWidth={6} />
          <g opacity={l(i + 1, 0, 6)}>{icons[i]}</g>
        </G>
      ))}
      <G x={540} y={1210} s={p(6, 0.2)}>
        <Box cx={0} cy={0} w={860} h={200} rx={30} fill={EL} stroke={GOLD} strokeWidth={6} />
        <G x={-300}><Crowd cols={3} rows={1} gap={70} r={20} base={GOLDL} /></G>
        <Arrow x1={-160} y1={0} x2={40} y2={0} p={l(6, 0.3, 12)} />
        <G x={170} y={-6} s={1.1}><Cart /></G>
        <G x={330}><Coin r={56} /></G>
      </G>
    </Stage>
  );
};

export const Khoa: React.FC = () => {
  const { f, at, p, l } = useT();
  const push = l(1, 0.15, 16);
  const bounce = l(1, 0.55, 16);
  const shake = f > at(1, 0.5) && f < at(1, 0.7) ? Math.sin(f * 2.2) * 7 : 0;
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={310} y={210} p={p(0, 0.3)} solid size={46} />
      <Tag i={1} x={820} y={210} p={p(1, 0.7)} color="#EF4444" solid size={42} />
      <Tag i={2} x={790} y={540} p={p(2, 0.35)} solid size={40} />
      <Tag i={3} x={540} y={1015} p={p(3, 0.15)} size={44} />
    </>}>
      <G x={300 + shake} y={620} s={p(0)}>
        <OpenBox w={430} h={350}><G y={-250}><Target r={84} /></G></OpenBox>
        <G y={40} s={p(0, 0.2, 9) * 1.5}><Lock /></G>
      </G>
      <G x={lerp(900, lerp(620, 860, bounce), push)} y={lerp(400, lerp(430, 390, bounce), push)} s={p(1)}>
        <Target r={72} arrow={0} />
      </G>
      <G x={735} y={330} s={p(1, 0.55, 9)}><Cross r={46} /></G>
      <G x={770} y={830} s={p(2, 0.05)}>
        <OpenBox w={390} h={240}><G y={-180}><Target r={62} /></G></OpenBox>
        <G y={0}><Phone w={100} h={170}><G s={0.42}><Post /></G></Phone></G>
      </G>
      <Arrow x1={525} y1={780} x2={565} y2={810} p={l(2, 0.15, 10)} />
      <G x={270} y={1190} s={p(3, 0.25)}><Target r={110} /></G>
      <Arrow x1={400} y1={1190} x2={540} y2={1190} p={l(3, 0.4, 12)} />
      <G x={770} y={1190} s={p(3, 0.5)}>
        <Net s={1.05} learn={l(3, 0.5, 34)} />
      </G>
    </Stage>
  );
};

export const TomLai: React.FC = () => {
  const { p, l } = useT();
  const next = l(1, 0, 10);
  return (
    <Stage bg={INK} overlay={<>
      {[300, 560, 820].map((y, i) => <Tag key={i} i={i} x={i === 0 ? 240 : 300} y={y} p={p(0, 0.1 + i * 0.1)} solid size={50} />)}
      <Tag i={3} x={500} y={300} p={p(0, 0.55)} size={32} />
      <Tag i={4} x={540} y={1015} p={p(1, 0.2)} solid size={46} />
    </>}>
      {[300, 560, 820].map((y, i) => (
        <G key={i} x={540} y={y} s={p(0, 0.05 + i * 0.1)}>
          <Box cx={0} cy={0} w={960 - 0} h={220} rx={30} fill={i > 0 && next > 0.5 ? "#2B2414" : EL} stroke={i === 0 ? (next > 0.5 ? HOV : GOLD) : next > 0.5 ? GOLD : HOV} strokeWidth={6} />
        </G>
      ))}
      <G x={700} y={310} s={p(0, 0.45)}><Target r={80} /></G>
      <G x={880} y={320} s={p(0, 0.75, 9) * 1.15}><Lock /></G>
      <G x={760} y={560} s={p(0, 0.3)}><Crowd cols={3} rows={2} gap={60} r={16} /></G>
      <G x={760} y={820} s={p(0, 0.4)}><Phone w={110} h={190}><G s={0.48}><Post /></G></Phone></G>
      <Arrow x1={540} y1={1040} x2={540} y2={1110} p={l(1, 0.1, 8)} />
      <G x={540} y={1220} s={p(1, 0.35)}><Eye r={150} /></G>
    </Stage>
  );
};

export { KetFb as Ket } from "./art";
