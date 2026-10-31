import React from "react";
import { AI, Arrow, Box, Browser, Chat, EL, Excel, Floor, Folder, G, GOLD, GOLDL, Hand, HOV, INK, Lines, Mag, Question, RED, Spark, Stage, SURF, Table, Tag, TXT, XL, lerp, useT } from "./art";

const FILES: [number, number][] = [[210, 1130], [540, 1150], [870, 1130]];

export const Cach1: React.FC = () => {
  const { f, at, p, l } = useT();
  // Câu 1 có hai lần nhấc thấy rõ: mỗi lần một bảng đi từ file vào khung chat.
  const seg = (i: number) => l(1, 0.05 + i * 0.42, 34);
  const dim = l(2, 0, 12);
  const miss = p(3);
  const week = l(4, 0, 16);
  const loop = l(5, 0, 12);
  const a = (f - at(5)) * 0.09 - Math.PI / 2;
  const tile = (i: number) => ({ x: -130 + i * 190, y: 90 });
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={800} y={205} p={p(0, 0.4)} />
      <Tag i={1} x={850} y={655} p={p(3, 0.3)} solid color={RED} />
      <Tag i={2} x={540} y={735} p={p(5)} size={36} />
      <Tag i={3} x={760} y={945} p={p(5, 0.1)} size={36} />
      <Tag i={4} x={320} y={945} p={p(5, 0.2)} size={36} />
    </>}>
      <G x={540} y={430} s={p(0)}>
        <Browser w={960} h={540}>
          <G y={55}><Chat w={900} h={400} lit={false} /></G>
          <G x={60}>
            <G y={-70}><Spark r={28} /></G>
            {[0, 1, 2].map((i) => {
              const { x, y } = tile(i);
              return (
                <G key={i} x={x} y={y}>
                  {i === 2 ? (
                    <g opacity={Math.min(1, miss)}>
                      <Box cx={0} cy={0} w={170} h={110} rx={12} fill="none" stroke={RED} strokeWidth={5} strokeDasharray="14 12" />
                      <G s={0.42 + Math.sin(f * 0.4) * 0.04}><Question color={RED} /></G>
                    </g>
                  ) : (
                    <G s={seg(i) >= 1 ? 1 : 0}>
                      <Box cx={0} cy={0} w={170} h={110} rx={12} fill={TXT} />
                      <Table cols={4} rows={3} w={150} h={90} lit={12} fill={XL} />
                    </G>
                  )}
                </G>
              );
            })}
          </G>
        </Browser>
      </G>
      <g opacity={dim * (1 - Math.min(1, miss))}>
        <path d="M170 800 L300 530 L720 530 L260 840 Z" fill={GOLDL} opacity={0.25} />
        <G x={190} y={825} r={-40}>
          <Box cx={0} cy={0} w={120} h={60} rx={14} fill={HOV} />
          <Box cx={60} cy={0} w={30} h={84} rx={8} fill={GOLD} />
        </G>
      </g>
      {FILES.map(([x, y], i) => (
        <G key={i} x={x} y={y} s={p(1, i * 0.05)} o={1 - dim * 0.4}><Excel /></G>
      ))}
      {[0, 1].map((i) => {
        const [fx = 0, fy = 0] = FILES[i] ?? [];
        const t = seg(i);
        const { x, y } = tile(i);
        if (t <= 0 || t >= 1) return null;
        return (
          <G key={i} x={lerp(fx, 600 + x, t)} y={lerp(fy, 430 + y, t)}>
            <Box cx={0} cy={0} w={150} h={95} rx={12} fill={TXT} />
            <Table cols={4} rows={3} w={130} h={78} lit={12} fill={XL} />
            <G y={90}><Hand s={0.9} /></G>
          </G>
        );
      })}
      <G x={lerp(1200, 985, miss)} y={lerp(800, 455, miss)} s={0.9 * (1 - loop)}><Mag /></G>
      <G x={160} y={800} s={p(4) * (1 - loop)}>
        <Box cx={0} cy={0} w={200} h={180} rx={16} fill={TXT} />
        <Box cx={0} cy={-60} w={200} h={60} rx={16} fill={GOLD} />
        <G y={25}><Table cols={5} rows={3} w={170} h={100} lit={week >= 1 ? 7 : 0} /></G>
      </G>
      <G x={700} y={lerp(-200, 880, p(4, 0.15, 10))} r={-9} s={0.8 * (1 - loop)}><Excel /></G>
      <g opacity={loop}>
        <circle cx={540} cy={850} r={100} fill="none" stroke={GOLD} strokeWidth={10} />
        {[0, 120, 240].map((deg) => {
          const rad = ((deg - 90) * Math.PI) / 180;
          return <circle key={deg} cx={540 + Math.cos(rad) * 100} cy={850 + Math.sin(rad) * 100} r={13} fill={GOLD} />;
        })}
        <circle cx={540 + Math.cos(a) * 100} cy={850 + Math.sin(a) * 100} r={22} fill={GOLDL} />
      </g>
      <Floor y={1270} />
    </Stage>
  );
};

export const Cach2: React.FC = () => {
  const { p, l } = useT();
  const WIN = 410;
  const paths = l(1, 0.1, 18);
  const drag = l(2, 0.05, 34);
  const type = l(3, 0.05, 56);
  const fx = lerp(120, 540, drag);
  const fy = lerp(1160, WIN + 10, drag);
  const gone = 1 - l(2, 0.75, 10);
  return (
    <Stage bg={`linear-gradient(180deg, #17140C 0%, ${INK} 60%)`} overlay={<>
      <Tag i={0} x={790} y={200} p={p(0, 0.55)} solid />
      <Tag i={1} x={280} y={1005} p={p(1, 0.3)} />
      <Tag i={2} x={800} y={1005} p={p(1, 0.65)} />
      <Tag i={3} x={540} y={708} p={p(2, 0.8)} solid />
    </>}>
      <G x={540} y={lerp(-400, WIN, p(0, 0, 12))}>
        <Box cx={0} cy={0} w={900} h={540} rx={30} fill={EL} stroke={GOLD} strokeWidth={6} />
        <rect x={-447} y={-267} width={894} height={64} rx={28} fill={SURF} />
        {[0, 1, 2].map((i) => <circle key={i} cx={-410 + i * 34} cy={-236} r={10} fill={i === 0 ? GOLD : HOV} />)}
        <G x={-340} y={-120}><AI size={110} /></G>
        <Lines x={-400} y={-30} w={130} n={5} gap={34} color={HOV} />
        {[0, 1, 2].map((i) => <G key={i} x={-80 + i * 190} y={-60} s={l(2, 0.72 + i * 0.07, 10) * 0.82}><Excel /></G>)}
        <Box cx={90} cy={180} w={640} h={90} rx={45} fill={INK} stroke={HOV} strokeWidth={4} />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={-205 + i * 42} y={170} width={34} height={20} rx={6} fill={GOLDL} opacity={type > i / 12 ? 1 : 0} />
        ))}
        <circle cx={370} cy={180} r={36} fill={l(3, 0.9, 6) > 0 ? GOLD : HOV} />
        <path d="M356 164 L392 180 L356 196 L362 180 Z" fill={INK} />
      </G>
      {[{ x: 280, c: GOLD, sign: -1 }, { x: 800, c: XL, sign: 1 }].map(({ x, c, sign }, i) => {
        const show = p(1, 0.15 + i * 0.35);
        return (
          <g key={x}>
            <Arrow x1={540 + sign * 60} y1={690} x2={x} y2={775} p={paths * Math.min(1, show)} color={c} />
            <G x={x} y={870} s={show}>
              <Box cx={0} cy={0} w={380} h={170} rx={22} fill={SURF} stroke={c} strokeWidth={5} />
              <G x={-120}><Spark r={46} fill={c} /></G>
              <Lines x={-60} y={-40} w={190} n={3} gap={32} color={HOV} />
            </G>
          </g>
        );
      })}
      <G x={fx} y={fy} s={p(2) * lerp(1, 0.75, drag)} o={gone}><Folder open={drag} /></G>
      <g transform={`translate(${fx + 50} ${fy + 30})`} opacity={Math.min(1, p(2)) * gone}>
        <path d="M0 0 L0 62 L16 48 L30 76 L44 68 L30 42 L52 40 Z" fill={TXT} stroke={INK} strokeWidth={4} />
      </g>
      <Floor y={1250} />
    </Stage>
  );
};

export const ThanhPham: React.FC = () => {
  const { f, p, l } = useT();
  const fly = l(0, 0.15, 54);
  const turn = p(1, 0.1, 10);
  const scrap = (f * 0.03) % 1;
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={830} y={660} p={p(0, 0.75)} solid />
      <Tag i={1} x={270} y={1010} p={p(3, 0.1)} />
      <Tag i={2} x={810} y={1010} p={p(4, 0.1)} />
    </>}>
      <G x={540} y={536} s={p(0, 0.1)}><Box cx={0} cy={0} w={560} h={192} rx={12} fill={EL} stroke={HOV} strokeWidth={5} /></G>
      {[250, 540, 830].map((x, i) => {
        const c = [GOLD, XL, "#60A5FA"][i] ?? GOLD;
        return (
          <g key={x}>
            <G x={x} y={270} s={p(0, i * 0.06) * 0.8}><Excel /></G>
            {[0, 1, 2].map((row) => {
              const t = Math.max(0, Math.min(1, (fly - (0.1 + i * 0.1 + row * 0.1)) / 0.45));
              const tx = 400 + i * 140;
              const ty = 480 + row * 56;
              return (
                <g key={row} opacity={t > 0 ? 1 : 0}>
                  <line x1={x} y1={350} x2={lerp(x, tx, t)} y2={lerp(350, ty, t)} stroke={c} strokeWidth={4} />
                  <rect x={lerp(x, tx, t) - 60} y={lerp(350, ty, t) - 18} width={120} height={36} rx={8} fill={c} />
                </g>
              );
            })}
          </g>
        );
      })}
      <G x={540} y={810} s={p(1)}><AI size={170} /></G>
      <G x={540} y={810} r={lerp(-180, 0, turn)} o={Math.min(1, p(1))}><Arrow x1={110} y1={0} x2={230} y2={0} w={14} /></G>
      {[150, 930].map((x, i) => {
        const up = l(2, 0.05 + i * 0.1, 18);
        return (
          <g key={x}>
            <rect x={x - 70} y={960 - 220 * up} width={140} height={220 * up} rx={12} fill={GOLD} />
            <G x={x} y={960 - 220 * up - 54} s={up * 0.8}><Spark r={46} fill={i ? XL : GOLDL} /></G>
          </g>
        );
      })}
      <line x1={540} y1={1050} x2={540} y2={1350} stroke={GOLDL} strokeWidth={8} opacity={Math.min(1, p(3))} />
      <G o={Math.min(1, p(3))}>
        <G x={430} y={1200} s={0.9}><AI size={140} /></G>
        <rect x={335} y={1160} width={12} height={80} rx={6} fill={GOLDL} />
        <G x={lerp(100, 330, scrap)} y={1200}><rect x={-26} y={-20} width={52} height={40} rx={6} fill={TXT} /></G>
        <G x={120} y={1250} r={70} s={0.8}><Hand /></G>
      </G>
      <G o={Math.min(1, p(4))}>
        <G x={670} y={1200} s={0.75}><Folder open={1} /></G>
        <path d="M770 1175 H880 V1225 H770 Z" fill={GOLDL} opacity={0.75 + Math.sin(f * 0.3) * 0.2} />
        <G x={960} y={1200} s={0.9}><AI size={140} /></G>
      </G>
    </Stage>
  );
};
