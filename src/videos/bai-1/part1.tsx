import React from "react";
import { AI, Arrow, Box, Browser, Chat, Clock, Cross, Doc, EL, Excel, Floor, G, GOLD, GOLDL, Hand, HOV, INK, Lines, Mag, Person, Question, RED, SEC, Spark, Stage, Sun, SURF, Table, Tag, TXT, W, lerp, useT } from "../mo-dau/art";

export const Gear: React.FC<{ r?: number; rot?: number; fill?: string }> = ({ r = 70, rot = 0, fill = GOLD }) => (
  <G r={rot}>
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={-r * 0.16} y={-r * 1.22} width={r * 0.32} height={r * 0.44} rx={r * 0.06} fill={fill} transform={`rotate(${i * 45})`} />
    ))}
    <circle r={r} fill={fill} />
    <circle r={r * 0.38} fill={INK} />
  </G>
);

/** Nhân vật thực tập sinh: người đeo thẻ nhân viên. */
export const Intern: React.FC<{ s?: number; star?: number; fill?: string }> = ({ s = 1, star = 1, fill = TXT }) => (
  <G s={s}>
    <Person fill={fill} />
    <Box cx={0} cy={18} w={46} h={34} rx={6} fill={GOLD} />
    <G y={18} s={star}><Spark r={14} fill={INK} /></G>
  </G>
);

export const Stairs: React.FC<{ x: number; y: number; w?: number; n?: number; show: (i: number) => number; color?: string }> = ({ x, y, w = 90, n = 6, show, color = GOLD }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const h = 40 + i * 44;
      return <Box key={i} cx={x + i * (w + 6)} cy={y - (h / 2) * show(i)} w={w} h={h * show(i)} rx={8} fill={color} />;
    })}
  </g>
);

/** Đồng hồ quét đúng một phần tư vòng, cho ý mười lăm phút. */
export const Quarter: React.FC<{ r?: number; t: number }> = ({ r = 120, t }) => {
  const a = (t * Math.PI) / 2;
  return (
    <g>
      <circle r={r} fill={TXT} stroke={GOLD} strokeWidth={9} />
      {t > 0.01 && <path d={`M0 0 L0 ${-r + 8} A${r - 8} ${r - 8} 0 0 1 ${Math.sin(a) * (r - 8)} ${-Math.cos(a) * (r - 8)} Z`} fill={GOLD} />}
      <line y2={-r + 14} stroke={INK} strokeWidth={8} strokeLinecap="round" transform={`rotate(${t * 90})`} />
      <circle r={9} fill={INK} />
    </g>
  );
};

export const Hook: React.FC = () => {
  const { f, p, l } = useT();
  const fall = l(0, 0, 18);
  const shrink = l(1, 0.05, 20);
  const h = lerp(lerp(40, 960, fall), 120, shrink);
  const step = (i: number) => l(2, 0.3 + i * 0.07, 8);
  const away = l(2, 0.7, 18);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={830} y={210} p={p(0, 0.3)} color={RED} o={1 - shrink} />
      <Tag i={1} x={540} y={465} p={p(1, 0.5)} solid size={54} />
      <Tag i={2} x={220} y={945} p={p(2, 0.1)} />
      <Tag i={3} x={720} y={560 + 0} p={p(2, 0.4)} />
      <Tag i={4} x={540} y={1015} p={p(2, 0.75)} />
    </>}>
      <g transform={`translate(540 ${130 + h / 2})`}>
        <Box cx={0} cy={0} w={740} h={h} rx={22} fill={shrink > 0.9 ? GOLD : TXT} />
        {h > 100 && <Lines x={-320} y={-h / 2 + 36} w={640} n={Math.max(1, Math.floor((h - 60) / 44))} gap={44} color={shrink > 0.9 ? INK : SEC} t={16} />}
      </g>
      <G x={540} y={600} s={p(0, 0.6, 9)} o={1 - shrink}><Cross r={220} /></G>
      <G x={220} y={760} s={p(2)}><Quarter r={125} t={l(2, 0.05, 30)} /></G>
      <Stairs x={480} y={920} w={84} show={step} />
      <G x={lerp(540, 1300, away)} y={1160} r={away * 40} s={p(2, 0.55)}>
        <Box cx={0} cy={0} w={300} h={130} rx={18} fill={EL} stroke={SEC} strokeWidth={4} />
        <path d="M-90 -28 L-126 0 L-90 28 M90 -28 L126 0 L90 28" fill="none" stroke={GOLDL} strokeWidth={10} strokeLinecap="round" />
        <Lines x={-60} y={-22} w={120} n={3} gap={20} color={SEC} t={8} />
      </G>
      <Floor y={1270} />
    </Stage>
  );
};

export const NguocDoi: React.FC = () => {
  const { f, p, l } = useT();
  const tilt = lerp(0, -14, p(0, 0.25, 9));
  const rad = (tilt * Math.PI) / 180;
  const lx = 540 - 330 * Math.cos(rad);
  const ly = 180 - 330 * Math.sin(rad);
  const rx = 540 + 330 * Math.cos(rad);
  const ry = 180 + 330 * Math.sin(rad);
  const open = p(1, 0.35);
  const pan = (x: number, y: number) => (
    <g>
      <line x1={x} y1={y} x2={x - 110} y2={y + 190} stroke={SEC} strokeWidth={5} />
      <line x1={x} y1={y} x2={x + 110} y2={y + 190} stroke={SEC} strokeWidth={5} />
      <Box cx={x} cy={y + 198} w={270} h={20} rx={10} fill={GOLD} />
    </g>
  );
  const morph = l(1, 0.1, 18);
  return (
    <Stage bg={SURF} overlay={<Tag i={0} x={540} y={700} p={p(1, 0.05)} solid size={48} />}>
      <Box cx={540} cy={380} w={36} h={400} fill={HOV} />
      <G x={540} y={180} r={tilt}><Box cx={0} cy={0} w={700} h={24} rx={12} fill={GOLDL} /></G>
      <circle cx={540} cy={180} r={28} fill={GOLD} />
      {pan(lx, ly)}
      {pan(rx, ry)}
      <G x={lx} y={ly + 188 - 26}><Box cx={0} cy={0} w={210} h={32} rx={10} fill={GOLD} stroke={INK} strokeWidth={3} /></G>
      <G x={rx} y={ry + 188 - 70}><Doc w={120} h={130} n={4} /></G>
      <Box cx={540} cy={1020} w={640} h={420} rx={24} fill={EL} stroke={GOLD} strokeWidth={5} />
      <G x={540} y={820} r={-open * 30} ><Box cx={lerp(0, -160, open)} cy={lerp(0, -30, open)} w={660} h={36} rx={12} fill={GOLDL} /></G>
      <G x={540} y={1020} s={1 - morph} o={1 - morph}><Question s={1.6} /></G>
      <G x={460} y={1040} s={morph}><Gear r={95} rot={f * 2} /></G>
      <G x={660} y={1000} s={morph}><Gear r={62} rot={-f * 3} fill={GOLDL} /></G>
    </Stage>
  );
};

export const PhanXa: React.FC = () => {
  const { f, p, l } = useT();
  const grow = l(1, 0.05, 40);
  const table = p(2);
  const clear = l(3, 0.6, 8);
  const day = l(3, 0, 42);
  const a = Math.PI * (1 - day);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={290} y={660} p={p(1, 0.15)} o={1 - table} />
      <Tag i={1} x={790} y={810} p={p(1, 0.5)} o={1 - table} />
      <Tag i={2} x={300} y={1020} p={p(3, 0.15)} />
      <Tag i={3} x={830} y={1020} p={p(3, 0.65)} solid />
    </>}>
      <G x={540} y={330} s={p(0)}>
        <Chat w={920} h={360}>
          <g opacity={1 - clear}>
            <G x={100} y={-40}><Doc w={330} h={120} n={3} /></G>
            <G x={100} y={-40} s={p(0, 0.15, 9)}><Cross r={46} /></G>
            <Box cx={90} cy={110} w={620} h={50} rx={25} fill={INK} stroke={HOV} strokeWidth={3} />
            {Array.from({ length: 9 }, (_, i) => <rect key={i} x={-200 + i * 56} y={100} width={44} height={18} rx={5} fill={GOLDL} opacity={l(0, 0.3 + i * 0.06, 2)} />)}
          </g>
        </Chat>
      </G>
      <G x={830} y={lerp(1400, 680, l(0, 0.25, 12))} o={1 - grow}><Hand s={1.1} /></G>
      <g opacity={1 - table}>
        {Array.from({ length: 9 }, (_, i) => {
          const t = Math.max(0, Math.min(1, grow * 10 - i));
          return <Box key={i} cx={540 + (i % 2 ? 26 : -26)} cy={570 + i * 74} w={760} h={64 * t} rx={12} fill={i % 3 === 0 ? GOLD : i % 3 === 1 ? TXT : HOV} />;
        })}
      </g>
      <G x={540} y={720} s={table}>
        <Box cx={0} cy={0} w={920} h={320} rx={22} fill={EL} />
        <Table cols={7} rows={4} w={880} h={280} lit={28} />
      </G>
      {[[-260, -105], [130, -35], [320, 70]].map(([x = 0, y = 0], i) => (
        <circle key={i} cx={540 + x} cy={720 + y} r={58} fill="none" stroke={RED} strokeWidth={9} opacity={Math.min(1, p(2, 0.5 + i * 0.13))} transform={`rotate(${f} ${540 + x} ${720 + y})`} strokeDasharray="260 20" />
      ))}
      <G x={lerp(150, 840, ((day * 2) % 1))} y={day >= 1 ? 800 : 640 + Math.floor(day * 2) * 150} s={l(3, 0, 8) * (1 - clear)}><Mag /></G>
      <path d="M90 1250 A210 210 0 0 1 510 1250" fill="none" stroke={HOV} strokeWidth={6} strokeDasharray="8 16" opacity={l(3, 0, 8)} />
      <G x={300 + Math.cos(a) * 210} y={1250 - Math.sin(a) * 210} s={l(3, 0, 8) * 0.5}><Sun r={70} rot={f} /></G>
      <G x={830} y={1190} s={p(3, 0.55)}>
        <Box cx={0} cy={0} w={260} h={220} rx={18} fill={TXT} />
        <Box cx={0} cy={-80} w={260} h={60} rx={18} fill={GOLD} />
        <G y={30}><Table cols={5} rows={3} w={230} h={130} lit={8} base="#CFCBBF" /></G>
      </G>
    </Stage>
  );
};

export const ThucTapSinh: React.FC = () => {
  const { f, p, l } = useT();
  const walk = l(0, 0.1, 34);
  const sun = p(1, 0, 18);
  const lose = l(1, 0.35, 26);
  const task = p(3);
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={540} y={250} p={p(0, 0.55)} solid size={46} o={1 - sun} />
      <Tag i={1} x={300} y={250} p={p(1, 0.45)} color={RED} />
      <Tag i={2} x={540} y={1000} p={p(3, 0.6)} solid />
    </>}>
      <Box cx={140} cy={700} w={190} h={480} rx={10} fill={EL} stroke={GOLD} strokeWidth={5} />
      <path d={`M45 460 L${45 + 190 * (1 - walk * 0.8)} ${460 + walk * 40} V${940 - walk * 40} L45 940 Z`} fill={HOV} />
      <G x={860} y={lerp(560, 300, sun)} s={sun * 0.8}><Sun r={80} rot={f * 0.4} /></G>
      <Box cx={560} cy={910} w={760} h={28} rx={12} fill={GOLD} />
      <Box cx={290} cy={1090} w={26} h={330} fill={HOV} />
      <Box cx={830} cy={1090} w={26} h={330} fill={HOV} />
      <G x={lerp(140, 560, walk)} y={760}><Intern s={1.6} star={p(0, 0.65, 9)} /></G>
      {[[380, 420], [510, 360], [650, 420], [760, 500]].map(([x = 0, y = 0], i) => {
        const t = Math.max(0, Math.min(1, lose * 1.6 - i * 0.2));
        return (
          <G key={i} x={x} y={y + t * 240} r={t * (i % 2 ? 50 : -50)} s={p(0, 0.75 + i * 0.05) * 0.5} o={1 - t}>
            {i % 2 ? <Doc w={150} h={170} n={4} /> : <Excel />}
          </G>
        );
      })}
      <g opacity={Math.min(1, p(2))}>
        <Box cx={380} cy={460} w={220} h={200} rx={18} fill="none" stroke={SEC} strokeWidth={6} strokeDasharray="16 12" />
        <path d="M320 530 V410 H390 V530 M390 450 H440 V530" fill="none" stroke={SEC} strokeWidth={6} strokeDasharray="10 10" />
        <Box cx={740} cy={460} w={220} h={200} rx={18} fill="none" stroke={SEC} strokeWidth={6} strokeDasharray="16 12" />
        <Lines x={670} y={410} w={140} n={3} gap={38} color={HOV} />
        <G x={380} y={460} s={p(2, 0.25) * 0.5}><Question color={GOLDL} /></G>
        <G x={740} y={460} s={p(2, 0.65) * 0.5}><Question color={GOLDL} /></G>
      </g>
      <G x={560} y={1180} s={task}>
        <Box cx={0} cy={0} w={520} h={250} rx={16} fill={TXT} />
        <Table cols={4} rows={2} w={470} h={200} lit={0} base="#D8D2C4" />
        {[0, 2, 3, 5].map((c, i) => (
          <G key={c} x={-176 + (c % 4) * 117.5} y={-50 + Math.floor(c / 4) * 100} s={p(3, 0.35 + i * 0.13) * 0.38}><Question color={INK} /></G>
        ))}
      </G>
    </Stage>
  );
};

export const AiLaBanAy: React.FC = () => {
  const { f, p, l } = useT();
  const drop = l(0, 0.3, 18);
  const fake = p(2, 0.4);
  return (
    <Stage bg="#100E0A" overlay={<>
      <Tag i={0} x={790} y={200} p={p(0, 0.65)} />
      <Tag i={1} x={540} y={640} p={p(1, 0.15)} solid />
      <Tag i={2} x={540} y={1010} p={p(2, 0.5)} color={RED} />
    </>}>
      <G x={540} y={330} s={p(0)}>
        <Browser w={940} h={400}>
          <G y={55}><Chat w={890} h={270} lit={false} /></G>
        </Browser>
      </G>
      <G x={600} y={390} s={1.25} o={Math.min(1, drop * 2)}><AI size={140} /></G>
      <G x={600} y={lerp(380, 900, drop)} r={drop * 30} s={1.1} o={1 - drop}><Intern /></G>
      {[0, 1, 2].map((i) => (
        <G key={i} x={200 + i * 340} y={790} s={p(1, 0.2 + i * 0.2)}>
          <Box cx={0} cy={0} w={300} h={180} rx={18} fill={EL} stroke={GOLD} strokeWidth={4} />
          <rect x={-150} y={-90} width={300} height={36} rx={14} fill={SURF} />
          <circle cx={-125} cy={-72} r={8} fill={GOLD} />
          <G y={35} s={0.3}><Sun r={90} rot={f * 0.5 + i * 20} /></G>
        </G>
      ))}
      <G x={540} y={1180} s={p(2)}>
        <Box cx={0} cy={0} w={920} h={250} rx={18} fill={EL} />
        <Table cols={8} rows={3} w={880} h={210} lit={0} base={HOV} />
        {[[1, 0], [4, 0], [2, 1], [6, 1], [0, 2], [5, 2]].map(([c = 0, r = 0], i) => (
          <g key={i} transform={`translate(${-385 + c * 110} ${-70 + r * 70})`}>
            <rect x={-48} y={-28} width={96} height={56} rx={8} fill={RED} opacity={Math.min(1, fake)} />
            <G s={0.25} o={1 - fake}><Question /></G>
          </g>
        ))}
      </G>
    </Stage>
  );
};
