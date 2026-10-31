import React from "react";
import { AI, Arrow, Box, Bubble, Cross, Doc, EL, Excel, Floor, Folder, G, GOLD, GOLDL, HOV, INK, Lines, Lock, Question, RED, SEC, Spark, Stage, Sun, SURF, Table, Tag, TXT, XL, lerp, useT } from "../mo-dau/art";
import { Intern } from "./part1";

export const ViSaoBia: React.FC = () => {
  const { f, p, l } = useT();
  const paperT = (f * 0.03) % 1;
  const press = l(2, 0.55, 14);
  const strip = l(3, 0.05, 56);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={790} y={590} p={p(1, 0.25)} solid />
      <Tag i={1} x={540} y={690} p={p(2, 0.65)} />
      <Tag i={2} x={540} y={1015} p={p(3, 0.55)} color={RED} />
    </>}>
      <G x={150} y={340} s={p(0)}><AI size={150} /></G>
      <G x={390} y={300} s={p(0, 0.15)}>
        <Bubble w={250} h={170} n={3} fill={TXT} ink={SEC} />
        <G s={p(0, 0.45, 9)}><Cross r={70} /></G>
      </G>
      <G x={790} y={340} s={p(1)}>
        <path d="M-120 -170 H120 L50 -90 H-50 Z" fill={GOLDL} />
        <Box cx={0} cy={0} w={260} h={190} rx={18} fill={EL} stroke={GOLD} strokeWidth={6} />
        <circle cx={-60} cy={0} r={34} fill="none" stroke={GOLD} strokeWidth={10} strokeDasharray="20 10" transform={`rotate(${f * 4} -60 0)`} />
        <circle cx={60} cy={0} r={34} fill="none" stroke={GOLD} strokeWidth={10} strokeDasharray="20 10" transform={`rotate(${-f * 4} 60 0)`} />
        <G y={-240 + paperT * 90} s={0.28} o={1 - paperT}><Question /></G>
        <G y={lerp(90, 200, paperT)} o={1 - paperT * 0.8}><Doc w={110} h={70} n={2} /></G>
      </G>
      <g opacity={Math.min(1, p(2))}>
        {[0, 1, 2, 3, 4].map((i) => (
          <G key={i} x={160 + i * 190} y={840} s={p(2, i * 0.06)}>
            {i !== 3 && (
              <g>
                <Box cx={0} cy={0} w={180} h={170} rx={14} fill={GOLD} />
                <circle cx={90} cy={0} r={28} fill={GOLD} />
              </g>
            )}
            {i === 3 && <Box cx={0} cy={0} w={180} h={170} rx={14} fill="none" stroke={SEC} strokeWidth={5} strokeDasharray="14 12" />}
          </G>
        ))}
        <G x={730} y={lerp(1120, 840, press)} s={p(2, 0.4)}>
          <Box cx={0} cy={0} w={180} h={170} rx={14} fill="#D6A873" />
          <circle cx={90} cy={0} r={28} fill="#D6A873" />
        </G>
      </g>
      <G x={80} y={1150} o={Math.min(1, strip * 5)}>
        <Box cx={460 * strip} cy={40} w={920 * strip} h={56} rx={18} fill={TXT} />
        {Array.from({ length: 7 }, (_, i) => (
          <G key={i} x={60 + i * 135} y={-50} s={strip > (i + 0.5) / 7 ? p(3, 0.12 + i * 0.11, 10) * 0.4 : 0}><Question color={RED} /></G>
        ))}
      </G>
    </Stage>
  );
};

export const ToNoiQuy: React.FC = () => {
  const { f, p, l } = useT();
  const push = p(1, 0.55, 10);
  const sheet = p(2, 0, 12);
  const sun = p(3, 0, 16);
  const walk = l(3, 0.05, 18);
  const scan = l(3, 0.3, 42);
  return (
    <Stage bg="#16120B" overlay={<>
      <Tag i={0} x={540} y={225} p={p(2, 0.55)} solid size={44} />
      <Tag i={1} x={540} y={995} p={p(3, 0.45)} />
    </>}>
      <Box cx={540} cy={640} w={940} h={720} rx={30} fill="#2B2214" stroke="#4A3A1C" strokeWidth={6} />
      <Box cx={190} cy={870} w={200} h={150} rx={14} fill={EL} />
      {Array.from({ length: 15 }, (_, i) => <rect key={i} x={110 + (i % 5) * 33} y={815 + Math.floor(i / 5) * 37} width={26} height={28} rx={5} fill={HOV} />)}
      <rect x={530} y={lerp(590, 590, 0)} width={18} height={90} rx={4} fill={GOLDL} opacity={Math.floor(f / 12) % 2 === 0 ? 1 - sheet : 0} />
      <G x={lerp(80, -60, push)} y={420} s={Math.min(1, p(1)) * (1 - Math.min(1, sheet))}>
        <path d="M0 -30 L120 -90 V90 L0 30 H-40 V-30 Z" fill={GOLD} />
      </G>
      {Array.from({ length: 7 }, (_, i) => {
        const t = Math.max(0, Math.min(1, l(1, 0.05 + i * 0.06, 10)));
        return <G key={i} x={lerp(220, 310 + i * 90, t) - push * 500} y={330 + (i % 3) * 90} s={t * (1 - Math.min(1, sheet))}><Box cx={0} cy={0} w={120} h={40} rx={8} fill={TXT} /></G>;
      })}
      <G x={540} y={420} s={p(1, 0.6, 9) * (1 - Math.min(1, sheet))}><Cross r={150} /></G>
      <G x={560} y={lerp(-700, 620, sheet)} s={lerp(1.6, 1, sheet)} r={lerp(-8, -2, sheet)}>
        <Box cx={0} cy={0} w={500} h={560} rx={12} fill={GOLDL} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={-200} y={-210 + i * 62} width={i % 3 === 2 ? 250 : 400} height={22} rx={11} fill={scan * 7 > i ? INK : "#A88E5A"} />
        ))}
        {[[-225, -255], [225, -255], [-225, 255], [225, 255]].map(([x = 0, y = 0], i) => (
          <circle key={i} cx={x} cy={y} r={20} fill={INK} opacity={Math.min(1, p(2, 0.35 + i * 0.14, 9))} />
        ))}
      </G>
      <G x={960} y={lerp(420, 230, sun)} s={sun * 0.6}><Sun r={80} rot={f * 0.4} /></G>
      <G x={lerp(1250, 560, walk)} y={1150}><Intern s={1.6} star={1} /></G>
      <path d={`M${500 + scan * 100} 1020 L330 ${lerp(450, 830, scan)} M${620 - scan * 20} 1020 L790 ${lerp(450, 830, scan)}`} fill="none" stroke={GOLD} strokeWidth={4} strokeDasharray="8 14" opacity={walk >= 1 && scan < 1 ? 0.7 : 0} />
      <Floor y={1290} />
    </Stage>
  );
};

export const FileQuyTac: React.FC = () => {
  const { p, l } = useT();
  const fold = l(0, 0.1, 20);
  const fall = l(0, 0.45, 16);
  const chain = l(3, 0.1, 22);
  const card = (show: number, y: number, c: string) => (
    <G x={760} y={y} s={show}>
      <Box cx={0} cy={0} w={530} h={170} rx={22} fill={EL} stroke={c} strokeWidth={6} />
      <G x={-190}><path d="M-46 -62 H22 L52 -32 V62 H-46 Z" fill={TXT} /><path d="M22 -62 V-32 H52" fill={SEC} /><G y={14}><Spark r={28} fill={c} /></G></G>
      
    </G>
  );
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={260} y={590} p={p(0, 0.6)} />
      <Tag i={1} x={840} y={280} p={p(1, 0.35)} solid size={44} />
      <Tag i={2} x={840} y={500} p={p(2, 0.35)} solid color={XL} size={44} />
      <Tag i={3} x={320} y={720} p={p(3, 0.15)} solid />
      <Tag i={4} x={800} y={1000} p={p(3, 0.8)} color={GOLDL} />
    </>}>
      <G x={250} y={380} s={p(0, 0.1) * 1.5}><Folder open={1} /></G>
      <G x={lerp(250, 250, fall)} y={lerp(-200 + 340 * Math.min(1, fold * 2), 340, fall)} s={lerp(1.4, 0.55, fold)} o={1 - fall * 0.4} r={lerp(-12, 0, fold)}>
        <Box cx={0} cy={0} w={200} h={240} rx={10} fill={GOLDL} />
        <Lines x={-76} y={-84} w={150} n={5} gap={36} color={INK} t={11} />
      </G>
      {card(p(1, 0.15), 280, GOLD)}
      {card(p(2, 0.15), 500, XL)}
      <G x={320} y={1000} s={p(3)}>
        <Box cx={0} cy={0} w={340} h={190} rx={20} fill={TXT} />
        <Box cx={0} cy={0} w={150} h={70} rx={12} fill="#CFCBBF" />
        <rect x={-180 + (1 - chain) * -300} y={-16} width={360} height={32} rx={0} fill="none" />
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cx={-210 + i * 60} cy={0} rx={36} ry={20} fill="none" stroke={GOLD} strokeWidth={10} opacity={chain * 8 > i ? 1 : 0} />
        ))}
        <G x={0} y={lerp(-300, 0, Math.min(1, chain * 1.4))} s={1.25}><Lock /></G>
      </G>
      <G x={800} y={850} s={p(3, 0.5)}>
        <Box cx={0} cy={0} w={360} h={200} rx={18} fill={EL} />
        <Table cols={4} rows={2} w={330} h={170} lit={3} />
        <G x={120} y={40} s={0.4}><Question /></G>
      </G>
      <G x={800} y={1190} s={p(3, 0.65)}><Intern s={1} /></G>
      <Arrow x1={800} y1={950} x2={800} y2={1050} p={l(3, 0.75, 8)} />
      <Floor y={1300} />
    </Stage>
  );
};

export const CangCuThe: React.FC = () => {
  const { f, p, l } = useT();
  const thread = l(0, 0.2, 18);
  const pillar = l(1, 0.2, 18);
  const fade = l(2, 0.45, 12);
  const write = l(3, 0.6, 26);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={230} y={200} p={p(0, 0.1)} solid />
      <Tag i={2} x={260} y={540} p={p(2, 0.05)} o={1 - fade} color={SEC} />
      <Tag i={1} x={640} y={530} p={p(2, 0.55)} solid />
      <Tag i={3} x={260} y={895} p={p(3, 0.3)} />
    </>}>
      <G x={130} y={330} s={p(0)}><Box cx={0} cy={0} w={150} h={84} rx={12} fill={GOLD} /><Lines x={-46} y={-18} w={92} n={2} gap={24} color={INK} t={10} /></G>
      <G x={500} y={320} s={p(0, 0.1)}><Doc w={240} h={250} n={6} /></G>
      <path d={`M205 330 H${lerp(205, 380, thread)}`} stroke={GOLD} strokeWidth={8} fill="none" />
      <rect x={385} y={306} width={230} height={26} rx={8} fill="none" stroke={GOLD} strokeWidth={5} opacity={thread >= 1 ? 1 : 0} />
      <g opacity={Math.min(1, p(1))}>
        <rect x={750} y={430 - 230 * pillar} width={110} height={40 + 230 * pillar} rx={12} fill={GOLD} />
        <rect x={900} y={190 + 230 * pillar} width={110} height={280 - 230 * pillar} rx={12} fill={HOV} />
        <G x={955} y={lerp(120, 350, pillar)} s={0.4}><Question color={RED} /></G>
      </g>
      <G x={540} y={700} s={p(2)}>
        <Box cx={0} cy={0} w={950} h={260} rx={20} fill={EL} />
        <Table cols={6} rows={3} w={910} h={220} lit={0} />
        <rect x={lerp(-455, 2, 1)} y={-115} width={150} height={230} rx={12} fill={GOLD} opacity={l(2, 0.6, 10)} />
      </G>
      <G x={150} y={1120} s={p(3)}><AI size={170} /></G>
      {[0, 1, 2, 3, 4].map((i) => (
        <G key={i} x={330 + i * 95} y={1010 + (i % 2) * 70} s={p(3, 0.08 + i * 0.1) * 0.45}><Bubble w={170} h={100} n={2} /></G>
      ))}
      <G x={860} y={1110} s={p(3, 0.55)}>
        <Box cx={0} cy={0} w={280} h={330} rx={14} fill={GOLDL} />
        {Array.from({ length: 7 }, (_, i) => <rect key={i} x={-110} y={-130 + i * 38} width={i % 3 === 2 ? 130 : 220} height={14} rx={7} fill={INK} opacity={write * 7 > i ? 1 : 0} />)}
      </G>
    </Stage>
  );
};

export const KhongCoNut: React.FC = () => {
  const { f, at, p, l } = useT();
  const drop = (i: number) => {
    const t = Math.max(0, f - at(1, 0.15) - i * 2);
    return t * t * 0.6;
  };
  const wander = Math.min(1, (f - at(0)) / 70);
  const cx = 540 + Math.sin(wander * 9) * 300;
  const cy = 480 + Math.cos(wander * 7) * 140;
  const web = p(2, 0.1);
  return (
    <Stage bg={`linear-gradient(180deg, ${INK} 0%, #17140C 100%)`} overlay={<>
      <Tag i={0} x={540} y={740} p={p(1, 0.5)} solid size={44} />
      <Tag i={1} x={280} y={1010} p={p(3, 0.1)} />
      <Tag i={3} x={800} y={1010} p={p(3, 0.55)} color={XL} />
    </>}>
      <G x={540} y={420} s={p(0)}>
        <Box cx={0} cy={0} w={900} h={520} rx={28} fill={EL} stroke={GOLD} strokeWidth={6} />
        <Box cx={0} cy={300} w={120} h={70} fill={HOV} />
      </G>
      <clipPath id="man"><rect x={90} y={160} width={900} height={520} rx={28} /></clipPath>
      <g clipPath="url(#man)">
        {Array.from({ length: 15 }, (_, i) => (
          <G key={i} x={210 + (i % 5) * 165} y={270 + Math.floor(i / 5) * 140 + drop(i)} s={p(0, 0.05 + i * 0.03)}>
            <Box cx={0} cy={0} w={140} h={100} rx={16} fill={HOV} />
            <rect x={-44} y={-8} width={88} height={16} rx={8} fill={SEC} />
          </G>
        ))}
        <G x={540} y={420} s={web}><AI size={190} /></G>
      </g>
      <G x={cx} y={cy} s={p(0, 0.05) * (1 - l(2, 0, 10))}>
        <path d="M-46 -60 H22 L52 -30 V60 H-46 Z" fill={GOLDL} />
        <path d="M46 34 L46 100 L62 86 L76 114 L90 106 L76 80 L98 78 Z" fill={TXT} stroke={INK} strokeWidth={4} />
      </G>
      <G x={130} y={235} s={web * 0.55} r={-5}>
        <Box cx={0} cy={0} w={240} h={150} rx={14} fill={SURF} stroke={HOV} strokeWidth={5} />
        <rect x={-100} y={-55} width={200} height={22} rx={11} fill={HOV} />
        <G s={p(2, 0.35, 9)}><Cross r={68} /></G>
      </G>
      {[{ x: 280, c: GOLD }, { x: 800, c: XL }].map(({ x, c }, i) => {
        const s = p(3, i ? 0.5 : 0.05);
        return (
          <G key={x} x={x} y={870} s={s}>
            <Box cx={0} cy={0} w={440} h={210} rx={22} fill={SURF} stroke={c} strokeWidth={6} />
            <rect x={-220} y={-105} width={440} height={44} rx={22} fill={EL} />
            <G x={-140} y={24}><Spark r={46} fill={c} /></G>
            {i === 0 ? (
              <G x={70} y={24}><Box cx={0} cy={0} w={180} h={90} rx={12} fill={GOLD} /><Spark r={24} fill={INK} /></G>
            ) : (
              <G x={70} y={40}><Lock open={l(3, 0.75, 10)} color={XL} /></G>
            )}
          </G>
        );
      })}
      <Floor y={1100} color="#4A3D22" />
    </Stage>
  );
};

export const MoThuMuc: React.FC = () => {
  const { f, p, l } = useT();
  const beam = l(0, 0.1, 24);
  const fly = l(1, 0.7, 18);
  const dropFile = l(1, 0.38, 12);
  const row = l(2, 0.55, 24);
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={540} y={550} p={p(0, 0.65)} solid color={RED} />
      <Tag i={1} x={200} y={860} p={p(1, 0.1)} />
      <Tag i={2} x={540} y={860} p={p(1, 0.4)} />
      <Tag i={3} x={830} y={1005} p={p(2, 0.3)} solid />
    </>}>
      <G x={200} y={320} s={p(0)}>
        <Box cx={0} cy={0} w={300} h={210} rx={18} fill={EL} stroke={HOV} strokeWidth={5} />
        <rect x={-130} y={-85} width={260} height={28} rx={14} fill={HOV} />
        <G y={25}><Spark r={40} /></G>
      </G>
      <line x1={350} y1={320} x2={lerp(350, 600, beam)} y2={320} stroke={GOLDL} strokeWidth={10} strokeDasharray="4 20" strokeLinecap="round" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={i % 2 ? 610 : 640} y={180 + Math.floor(i / 2) * 50} width={84} height={44} rx={5} fill={i % 3 ? "#5B4A2F" : "#6D5A39"} transform={i % 2 ? "" : "translate(-30 0)"} opacity={Math.min(1, p(0, 0.08))} />
      ))}
      <G x={880} y={330} s={p(0, 0.2) * 0.95}><Folder /></G>
      <G x={lerp(200, 880, fly)} y={lerp(700, 660, fly)} s={p(1) * lerp(0.9, 0.5, fly)}><Folder open={1} /></G>
      <G x={lerp(200, 880, fly)} y={lerp(-200, 690, dropFile)} s={dropFile * 0.55} o={1 - fly}><Excel /></G>
      <Arrow x1={330} y1={700} x2={470} y2={700} p={l(1, 0.25, 8)} />
      <Arrow x1={590} y1={700} x2={710} y2={700} p={l(1, 0.62, 8)} />
      <G x={880} y={700} s={p(1, 0.55)}>
        <Box cx={0} cy={0} w={300} h={220} rx={22} fill={EL} stroke={GOLD} strokeWidth={5} />
        <rect x={-150} y={-110} width={300} height={36} rx={18} fill={SURF} />
      </G>
      <G x={330} y={1010} s={p(2)}>
        <Box cx={0} cy={0} w={560} h={100} rx={50} fill={INK} stroke={GOLD} strokeWidth={5} />
        {Array.from({ length: 10 }, (_, i) => <rect key={i} x={-235 + i * 44} y={-10} width={36} height={20} rx={5} fill={GOLDL} opacity={l(2, 0.1 + i * 0.03, 2)} />)}
      </G>
      <G x={540} y={1200}>
        <Box cx={0} cy={0} w={960} h={190} rx={16} fill={EL} opacity={row > 0 ? 1 : 0} />
        {[0, 1, 2].map((i) => (
          <g key={i} opacity={row * 3 > i ? 1 : 0}>
            <rect x={-450} y={-76 + i * 52} width={900} height={42} rx={8} fill={i === 0 ? GOLD : HOV} />
            <rect x={-420} y={-62 + i * 52} width={160} height={14} rx={7} fill={i === 0 ? INK : SEC} />
            <rect x={280} y={-62 + i * 52} width={120} height={14} rx={7} fill={i === 0 ? INK : SEC} />
          </g>
        ))}
      </G>
    </Stage>
  );
};
