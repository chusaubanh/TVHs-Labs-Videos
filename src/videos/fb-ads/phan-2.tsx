import React from "react";
import { AI, Arrow, Box, Browser, Clock, Cross, Doc, EL, G, GOLD, GOLDL, HOV, INK, Lines, Person, Question, RED, Stamp, SURF, TXT, XL, lerp, useT } from "../mo-dau/art";
import { Stage, Tag, Cart, Coin, Crowd, Cursor, Eye, Net, Phone, Pin, Post, Target } from "./art";

export const Hook: React.FC = () => {
  const { f, at, p, l } = useT();
  const fall = l(1, 0.5, 18);
  const float = Math.sin(f * 0.1) * 12 * (1 - fall);
  const sway = Math.sin((f - at(0)) * 0.09) * 260 * (1 - fall) * l(0, 0.3, 14);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={200} p={p(0, 0.05)} solid size={50} />
      {[560, 810, 1010].map((y, i) => <Tag key={i} i={1 + i} x={220} y={y - (i === 2 ? 0 : 0)} p={p(0, 0.3 + i * 0.15)} solid={i === 1 && fall >= 1} size={46} />)}
      <Tag i={4} x={790} y={420} p={p(1, 0.1)} color={RED} solid size={38} />
    </>}>
      {[560, 810, 1060].map((y, i) => (
        <G key={i} x={540} y={y} s={p(0, 0.3 + i * 0.15)}>
          <Box cx={0} cy={0} w={960} h={230} rx={28} fill={i === 1 && fall >= 1 ? "#2B2414" : EL} stroke={i === 1 && fall >= 1 ? GOLD : HOV} strokeWidth={6} />
        </G>
      ))}
      <G x={lerp(540 + sway, 760, fall)} y={lerp(340 + float, 810, fall)} s={p(0)}><Coin r={100} /></G>
      <G x={290} y={330} s={p(0, 0.5) * (1 - fall)}><Question s={0.75} /></G>
      <G x={930} y={810} s={l(1, 0.85, 8)}><Stamp r={50} /></G>
      <G x={760} y={1060} s={p(0, 0.75)}><Phone w={120} h={215}><G s={0.54}><Post /></G></Phone></G>
      <G x={760} y={560} s={p(0, 0.45)}><Target r={100} /></G>
    </Stage>
  );
};

export const AdSet: React.FC = () => {
  const { p, l } = useT();
  const lit = (i: number) => [1, 4, 5, 7, 10, 11].includes(i);
  const coinDrop = p(5, 0.15, 10);
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={230} y={325} p={p(0, 0.2)} solid size={50} />
      <Tag i={1} x={190} y={465} p={p(1, 0.05)} solid size={44} />
      <Tag i={2} x={540} y={465} p={p(1, 0.25)} solid size={44} />
      <Tag i={3} x={890} y={465} p={p(1, 0.45)} solid size={44} />
      <Tag i={4} x={190} y={1000} p={p(2, 0.5)} size={34} />
      <Tag i={5} x={540} y={1000} p={p(3, 0.5)} size={34} />
      {["Feed", "Stories", "Reels", "Messenger"].map((_, i) => <Tag key={i} i={6 + i} x={890} y={720 + i * 68} p={p(4, 0.3 + i * 0.12)} size={30} />)}
    </>}>
      <G x={540} y={205} s={p(0)}><Box cx={0} cy={0} w={700} h={60} rx={16} fill={GOLD} /></G>
      <G x={540} y={325} s={p(0, 0.15)}><Box cx={0} cy={0} w={960} h={110} rx={22} fill="#2B2414" stroke={GOLD} strokeWidth={7} /></G>
      <G x={540} y={1190} s={p(0, 0.25)}><Box cx={0} cy={0} w={960} h={180} rx={24} fill={EL} stroke={HOV} strokeWidth={5} /><G x={0} s={0.8}><Phone w={100} h={170}><G s={0.42}><Post /></G></Phone></G></G>
      {[190, 540, 890].map((x, i) => (
        <G key={i} x={x} y={730} s={p(1, 0.1 + i * 0.15)}>
          <Box cx={0} cy={0} w={320} h={500} rx={26} fill={EL} stroke={p(2 + i) > 0.3 ? GOLD : HOV} strokeWidth={5} />
        </G>
      ))}
      <G x={190} y={745} s={p(2, 0.2)}><Crowd cols={3} rows={4} gap={84} r={19} lit={(i) => l(2, 0.45, 8) > 0 ? lit(i) : false} /></G>
      <G x={540} y={625} s={p(3, 0.15)}><Coin r={82} /></G>
      <G x={540} y={830} s={p(3, 0.35)}><Clock r={92} hour={3} minute={0} /></G>
      <G x={890} y={590} s={p(4, 0.1)}><Pin s={1.15} /></G>
      <G x={700} y={325} s={coinDrop}><Coin r={46} /></G>
      <G x={830} y={325} s={coinDrop}><Stamp r={42} /></G>
      <G x={540} y={1190} s={p(5, 0.45)}><Cross r={70} /></G>
    </Stage>
  );
};

export const AdScene: React.FC = () => {
  const { p, l } = useT();
  const hi = l(3, 0.72, 5) > 0 ? 5 : l(3, 0.56, 5) > 0 ? 4 : l(3, 0.4, 5) > 0 ? 3 : l(3, 0.24, 5) > 0 ? 2 : l(3, 0, 5) > 0 ? 1 : l(4, 0, 5) > 0 ? 0 : -1;
  const hiNow = l(4, 0, 5) > 0 ? 0 : hi;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={260} y={225} p={p(0, 0.2)} solid size={56} />
      <Tag i={1} x={800} y={225} p={p(1, 0.2)} size={40} />
      {[0, 1, 2, 3].map((i) => <Tag key={i} i={2 + i} x={800} y={465 + i * 150} p={p(2, 0.15 + i * 0.17)} size={32} />)}
      <Tag i={6} x={800} y={1015} p={p(4, 0.3)} solid size={30} />
    </>}>
      <G x={310} y={690} s={p(0)}>
        <Phone w={500} h={870}><G s={2.35}><Post w={190} h={340} hi={hiNow} /></G></Phone>
      </G>
      <G x={110} y={1260} s={p(0, 0.3)}><Person s={1.1} fill={GOLDL} /></G>
      {[0, 1, 2, 3].map((i) => (
        <G key={i} x={800} y={400 + i * 150} s={p(2, 0.1 + i * 0.17)}>
          <Box cx={0} cy={0} w={260} h={72} rx={14} fill={EL} stroke={GOLD} strokeWidth={4} />
          {i === 0 && <rect x={-40} y={-20} width={80} height={40} rx={8} fill={GOLD} />}
          {i === 1 && <path d="M-16 -22 L24 0 L-16 22 Z" fill={GOLD} />}
          {i === 2 && [-60, 0, 60].map((x) => <rect key={x} x={x - 24} y={-22} width={48} height={44} rx={6} fill={GOLD} />)}
          {i === 3 && [0, 1, 2, 3].map((k) => <rect key={k} x={-70 + k * 36} y={-22} width={30} height={44} rx={5} fill={k === 0 ? GOLD : GOLDL} />)}
        </G>
      ))}
      <G x={810} y={1180} s={p(4, 0.1)}><Box cx={0} cy={0} w={460} h={220} rx={24} fill={EL} stroke={GOLD} strokeWidth={5} /></G>
      <G x={680} y={1180} s={p(4, 0.25)}><circle r={62} fill={GOLDL} /></G>
      <G x={880} y={1150} s={p(4, 0.4)}><Lines x={-110} y={0} w={200} n={2} gap={36} color={TXT} t={16} /></G>
    </Stage>
  );
};

export const Creator: React.FC = () => {
  const { p, l } = useT();
  const go = (i: number) => l(1, 0.1 + i * 0.15, 18);
  const win = p(2, 0.65, 10);
  return (
    <Stage bg="#14110B" overlay={<>
      <Tag i={0} x={260} y={205} p={p(0, 0.1)} solid size={46} />
      <Tag i={1} x={760} y={205} p={p(1, 0.5)} size={38} />
      <Tag i={2} x={790} y={480} p={p(1, 0.75)} solid size={46} />
      <Tag i={3} x={200} y={1015} p={p(2, 0.25)} size={40} />
      <Tag i={4} x={820} y={1015} p={win} solid size={40} />
    </>}>
      <G x={240} y={500} s={p(0)}><Person s={2.1} fill={GOLDL} /></G>
      <G x={350} y={420} s={p(0, 0.25)}>
        <Box cx={0} cy={0} w={110} h={76} rx={10} fill={INK} stroke={TXT} strokeWidth={5} />
        <circle r={24} fill={GOLD} />
      </G>
      <G x={790} y={420} s={p(1, 0.6)}><Box cx={0} cy={0} w={490} h={250} rx={26} fill={EL} stroke={GOLD} strokeWidth={6} /></G>
      {[0, 1, 2].map((i) => (
        <G key={i} x={lerp(400, 640 + i * 150, go(i))} y={lerp(440, 390, go(i))} s={p(1, i * 0.15)}>
          <Box cx={0} cy={0} w={120} h={100} rx={12} fill={i === 0 ? GOLD : i === 1 ? GOLDL : TXT} />
          {i === 1 && <path d="M-16 -24 L28 0 L-16 24 Z" fill={INK} />}
          {i === 2 && <Lines x={-44} y={-26} w={88} n={3} gap={22} color={INK} t={10} />}
          {i === 0 && <path d="M-44 36 L-12 -6 L10 16 L24 2 L46 36 Z" fill={INK} opacity={0.5} />}
        </G>
      ))}
      <G x={540} y={850} s={p(2)}><Box cx={0} cy={0} w={960} h={470} rx={28} fill={EL} stroke={HOV} strokeWidth={5} /></G>
      {[200, 540, 880].map((x, i) => (
        <G key={i} x={x} y={820} s={p(2, 0.1 + i * 0.12)}>
          <Phone w={180} h={320}><G s={0.82}><Post art={[GOLD, GOLDL, TXT][i]} /></G></Phone>
        </G>
      ))}
      {[200, 540, 880].map((x, i) => {
        const hh = [90, 130, 260][i] * l(2, 0.35, 20);
        return <rect key={i} x={x - 70} y={1330 - hh} width={140} height={hh} rx={12} fill={i === 2 ? GOLD : HOV} />;
      })}
    </Stage>
  );
};

const Stack: React.FC<{ dim?: boolean }> = ({ dim = false }) => (
  <g opacity={dim ? 0.8 : 1}>
    {[0, 1, 2].map((i) => <Box key={i} cx={0} cy={-100 + i * 100} w={300 + i * 90} h={80} rx={18} fill={i === 0 ? GOLD : i === 1 ? GOLDL : TXT} />)}
  </g>
);

const CodeTag: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={170} h={110} rx={18} fill={INK} stroke={GOLD} strokeWidth={6} />
    <path d="M-34 -24 L-62 0 L-34 24 M34 -24 L62 0 L34 24 M14 -32 L-14 32" fill="none" stroke={GOLDL} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
  </G>
);

const STEPS = [170, 420, 660, 900];

export const Pixel: React.FC = () => {
  const { p, l } = useT();
  const out = l(0, 0.45, 16);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={790} y={200} p={p(0, 0.35)} solid size={50} />
      <Tag i={1} x={790} y={455} p={p(1, 0.3)} size={38} />
      <Tag i={2} x={260} y={630} p={p(2, 0.15)} size={42} />
      {STEPS.map((x, i) => <Tag key={i} i={3 + i} x={x} y={i % 2 === 0 ? 955 : 1015} p={p(3, 0.35 + i * 0.13)} size={32} />)}
    </>}>
      <G x={250} y={340} s={p(0)}><Stack /></G>
      <line x1={520} x2={520} y1={190} y2={530} stroke={HOV} strokeWidth={6} strokeDasharray="14 14" opacity={l(0, 0.4, 8)} />
      <G x={lerp(250, 790, out)} y={lerp(240, 320, out)} s={p(0, 0.3)}><Eye r={120} /></G>
      <G x={690} y={560} s={p(1, 0.5)}><Box cx={0} cy={0} w={160} h={70} rx={12} fill={EL} stroke={GOLD} strokeWidth={4} />{[-50, -10, 30].map((x, i) => <rect key={i} x={x} y={18 - (i + 1) * 14} width={24} height={(i + 1) * 14} fill={GOLD} />)}</G>
      <G x={540} y={770} s={p(2)}>
        <Browser w={960} h={250}>
          <G x={-230} y={48}><Box cx={0} cy={0} w={200} h={90} rx={10} fill={GOLD} /></G>
          <Lines x={-90} y={20} w={190} n={3} gap={26} />
        </Browser>
      </G>
      <G x={800} y={lerp(560, 805, l(2, 0.25, 14))} s={p(2, 0.25)}><CodeTag s={1.15} /></G>
      <G x={STEPS[0]} y={1140} s={p(3, 0.3)}><Eye r={66} /></G>
      <G x={STEPS[1]} y={1140} s={p(3, 0.43)}><Cart s={0.8} /></G>
      <G x={STEPS[2]} y={1140} s={p(3, 0.56)}><Coin r={62} /></G>
      <G x={STEPS[3]} y={1140} s={p(3, 0.69)}><Stamp r={66} /></G>
      {STEPS.slice(0, 3).map((x, i) => <Arrow key={i} x1={x + 90} y1={1140} x2={x + 170} y2={1140} p={l(3, 0.38 + i * 0.13, 7)} w={7} />)}
      {STEPS.map((x, i) => <G key={i} x={x} y={1260} s={l(3, 0.4 + i * 0.13, 7)}><Eye r={32} /></G>)}
    </Stage>
  );
};

export const ViSaoPixel: React.FC = () => {
  const { f, p, l } = useT();
  const leak = (i: number) => l(2, 0.5 + i * 0.05, 16);
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={540} y={205} p={p(0, 0.2)} solid size={50} />
      <Tag i={1} x={275} y={590} p={p(1, 0.5)} color={RED} solid size={36} />
      <Tag i={2} x={800} y={880} p={p(2, 0.8)} color={RED} solid size={36} />
      <Tag i={3} x={540} y={1015} p={p(3, 0.5)} solid size={44} />
      <Tag i={4} x={800} y={525} p={p(1, 0.3)} solid size={36} />
    </>}>
      <G x={540} y={400} s={p(0) * (1 - l(1, 0, 8))}>
        <Eye r={170} />
        <G x={230} y={-20}><Question s={0.8} /></G>
      </G>
      <G x={150} y={400} s={p(1, 0.05)}><Crowd cols={1} rows={1} r={38} base={GOLDL} /></G>
      <G x={320} y={400} s={p(1, 0.15)}><Cart s={1.05} /></G>
      <line x1={420} x2={620} y1={400} y2={400} stroke={HOV} strokeWidth={8} strokeDasharray="4 22" strokeLinecap="round" opacity={l(1, 0.3, 8)} />
      <G x={510} y={400} s={p(1, 0.45, 9)}><Cross r={46} /></G>
      <G x={800} y={400} s={p(1, 0.25)}>
        <AI size={160} />
        <G y={-150}><Question s={0.55} /></G>
      </G>
      <G x={270} y={810} s={p(2, 0.1)}><Net s={1.05} learn={0.25} /></G>
      <G x={800} y={700} s={p(2, 0.5)}><Coin r={72} /></G>
      {[0, 1, 2].map((i) => (
        <G key={i} x={700 + i * 100} y={lerp(720, 800, leak(i))} s={p(2, 0.5 + i * 0.05)} o={1 - leak(i) * 0.15}><Coin r={30} /></G>
      ))}
      <G x={210} y={1200} s={p(3, 0.1)}><Eye r={120} /></G>
      <G x={540} y={1200} s={p(3, 0.2)}><Net s={0.8} learn={l(3, 0.2, 40)} /></G>
      <Arrow x1={345} y1={1200} x2={400} y2={1200} p={l(3, 0.25, 10)} />
      <Arrow x1={680} y1={1200} x2={740} y2={1200} p={l(3, 0.4, 10)} />
      <G x={880} y={1200} s={p(3, 0.55)}><Coin r={90 + Math.sin(f * 0.15) * 0} /></G>
    </Stage>
  );
};

const RECAP = [290, 520, 750, 980];

export const TomLai: React.FC = () => {
  const { p, l } = useT();
  const on = (i: number) => l(i + 1, 0, 6) > 0;
  return (
    <Stage bg="#120F09" overlay={<>
      <Tag i={0} x={540} y={185} p={p(0, 0.1)} size={38} />
      {RECAP.map((y, i) => <Tag key={i} i={1 + i} x={240} y={y - 36} p={p(i + 1, 0.05)} solid size={46} />)}
      {RECAP.map((y, i) => <Tag key={i} i={5 + i} x={i === 1 ? 300 : 240} y={y + 44} p={p(i + 1, 0.55)} size={i === 1 ? 28 : 32} />)}
    </>}>
      {RECAP.map((y, i) => (
        <G key={i} x={540} y={y} s={p(i + 1)}>
          <Box cx={0} cy={0} w={960} h={200} rx={28} fill={on(i) ? EL : INK} stroke={GOLD} strokeWidth={5} />
        </G>
      ))}
      <G x={760} y={290} s={p(1, 0.2)}><Target r={76} /></G>
      <G x={660} y={520} s={p(2, 0.25)}><Crowd cols={2} rows={2} gap={54} r={13} base={GOLDL} /></G>
      <G x={800} y={520} s={p(2, 0.45)}><Coin r={52} /></G>
      <G x={930} y={528} s={p(2, 0.65)}><Pin s={0.8} /></G>
      <G x={790} y={750} s={p(3, 0.25)}><Phone w={100} h={170}><G s={0.44}><Post /></G></Phone></G>
      <G x={790} y={980} s={p(4, 0.25)}><Eye r={100} /></G>
      <G x={540} y={1210} s={p(5, 0.2)}>
        <Box cx={0} cy={0} w={960} h={190} rx={22} fill={SURF} stroke={GOLD} strokeWidth={5} />
        <rect x={-450} y={-68} width={190} height={56} rx={12} fill={GOLD} />
        {[0, 1, 2].map((i) => <rect key={i} x={-230 + i * 230} y={-68} width={210} height={56} rx={12} fill={EL} stroke={HOV} strokeWidth={3} />)}
        {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={-450 + i * 155} y={22} width={130} height={18} rx={8} fill={HOV} />)}
        {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={-450 + i * 155} y={52} width={130} height={18} rx={8} fill={HOV} />)}
      </G>
      <G x={280} y={1200} s={l(5, 0.55, 8)}><Cursor s={0.9} /></G>
    </Stage>
  );
};

export { KetFb as Ket } from "./art";
