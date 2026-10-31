import React from "react";
import { interpolate, useVideoConfig } from "remotion";
import { bakedPose, type BakedPhysics } from "../../kit/baked-physics";
import { AI, Arrow, Bell, Box, Bubble, Chat, Clock, Cross, Desk, Doc, EL, Excel, Floor, Folder, G, GOLD, GOLDL, H, HOV, INK, Lines, Mag, Person, Question, RED, SEC, Spark, Stage, Sun, SURF, Table, Tag, TXT, W, XL, lerp, useT } from "./art";
import pile from "./pile.json";

const baked = pile as BakedPhysics;

export const Hook: React.FC = () => {
  const { f, p, l } = useT();
  const slam = p(0, 0, 11);
  const shake = Math.sin(f * 1.7) * 16 * Math.max(0, 1 - f / 18);
  const up = p(3);
  const sink = l(1, 0, 34);
  const clock = p(2, 0.2);
  const files: [number, number, number][] = [[175, 880, -8], [540, 960, 4], [905, 860, 7]];
  return (
    <Stage
      bg={`linear-gradient(180deg, ${INK} 0%, ${INK} 62%, #2A2112 100%)`}
      overlay={<>
        <Tag i={0} x={850} y={lerp(960, 610, up)} p={clock} />
        <Tag i={1} x={540} y={760} p={p(3, 0.5)} solid />
      </>}
    >
      <G x={540} y={lerp(1060, 1340, sink)}><Sun r={130} rot={f * 0.3} /></G>
      <rect x={0} y={1180} width={W} height={170} fill={INK} />
      <Floor y={1180} />
      {files.map(([x, y, r], i) => {
        const drop = p(3, 0.1 + i * 0.12, 10);
        return (
          <g key={i}>
            <Arrow x1={540} y1={530} x2={x} y2={y - 115} p={drop} w={7} dash />
            <G x={x} y={lerp(-200, y, drop)} r={r}><Excel /></G>
          </g>
        );
      })}
      <G x={540} y={lerp(500, 345, up) + shake} s={lerp(lerp(1.7, 1, slam), 0.72, up)} o={Math.min(1, slam)}>
        <Chat w={860} h={640}>
          <G x={110} y={-110} s={p(2)}><Bubble w={520} h={190} n={3} /></G>
          <Lines x={-170} y={170} w={520} n={2} gap={38} />
          <G x={370} y={-262}><Bell r={Math.sin(f * 0.9) * 22 * Math.max(0, 1 - f / 40)} /></G>
          <circle cx={398} cy={-290} r={16} fill={RED} />
        </Chat>
      </G>
      <G x={850} y={lerp(830, 500, up)} s={clock * lerp(1, 0.6, up)}><Clock r={110} hour={3} /></G>
    </Stage>
  );
};

export const VongLapCu: React.FC = () => {
  const { p, l } = useT();
  const suck = l(1, 0, 22);
  const scan = l(2, 0, 62);
  const stop = p(3);
  const rowT = scan * 4;
  const row = Math.min(3, Math.floor(rowT));
  const mx = lerp(150, 880, scan >= 1 ? 1 : rowT % 1);
  const my = 900 + row * 75;
  const tableIn = l(2, 0, 10);
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={290} y={210} p={p(0, 0.3)} o={1 - suck} />
      <Tag i={1} x={830} y={720} p={p(1, 0.6)} />
    </>}>
      {Array.from({ length: 10 }, (_, i) => {
        const col = i % 5;
        const r = Math.floor(i / 5);
        return (
          <G key={i} x={lerp(130 + col * 145 + r * 46, 310, suck)} y={lerp(300 + r * 110 + (col % 2) * 24, 500, suck)} s={p(0, i * 0.07) * lerp(1, 0.15, suck)} r={(i - 5) * 2.2} o={1 - suck}>
            <Box cx={0} cy={0} w={170} h={125} rx={16} fill={EL} stroke={GOLD} strokeWidth={4} />
            <circle cx={-62} cy={-38} r={12} fill={GOLD} />
            <Lines x={-40} y={-44} w={110} n={3} gap={26} color={HOV} t={11} />
          </G>
        );
      })}
      {[0, 1, 2, 3].map((i) => (
        <G key={i} x={lerp(170 + i * 240, 340, suck)} y={lerp(690 - (i % 2) * 30, 500, suck)} r={lerp(-14 + i * 11, 0, suck)} s={p(0, 0.45 + i * 0.1) * lerp(0.85, 0.15, suck)} o={1 - suck}>
          <Doc />
        </G>
      ))}
      <G x={340} y={500} s={p(1) * 1.35}>
        <Box cx={0} cy={0} w={330} h={270} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} />
        <G y={-20}><AI size={150} /></G>
        <Box cx={0} cy={100} w={230} h={20} rx={10} fill={HOV} />
      </G>
      <Arrow x1={570} y1={500} x2={670} y2={500} p={l(1, 0.35)} />
      <G x={830} y={470} s={p(1, 0.5) * 1.3} o={1 - stop}>
        <Doc w={190} h={240} n={3} ink="#C9C9C9" />
      </G>
      <G x={830} y={460} s={stop * 1.8}><Question /></G>
      <G x={540} y={1010} o={tableIn}>
        <Box cx={0} cy={0} w={920} h={340} rx={22} fill={EL} />
        <Table cols={7} rows={4} w={880} h={300} lit={Math.floor(scan * 28)} />
      </G>
      <G x={lerp(mx, 620, stop)} y={lerp(my, 950, stop)} s={tableIn * 1.25}><Mag /></G>
      <Floor y={1240} />
    </Stage>
  );
};

export const DaoNguoc: React.FC = () => {
  const { f, at, p, l } = useT();
  const paper = p(0);
  const fall = f - at(1);
  const crash = l(1, 0.25, 12);
  const tilt = lerp(-13 * paper, 15, crash);
  const away = p(2, 0, 15);
  const flip = l(4, 0, 18);
  const erase = l(3, 0.1, 18);
  const rad = (tilt * Math.PI) / 180;
  const left = { x: 540 - 330 * Math.cos(rad), y: 300 - 330 * Math.sin(rad) };
  const right = { x: 540 + 330 * Math.cos(rad), y: 300 + 330 * Math.sin(rad) };
  const pan = (x: number, y: number) => (
    <g>
      <line x1={x} y1={y} x2={x - 120} y2={y + 230} stroke={SEC} strokeWidth={5} />
      <line x1={x} y1={y} x2={x + 120} y2={y + 230} stroke={SEC} strokeWidth={5} />
      <Box cx={x} cy={y + 240} w={290} h={22} rx={11} fill={GOLD} />
    </g>
  );
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={left.x} y={left.y + 300} p={p(0, 0.3)} solid o={1 - away} />
      <Tag i={1} x={540} y={640} p={p(4, 0.25)} solid />
    </>}>
      <G x={lerp(0, 270, away)} y={lerp(0, -20, away)} s={lerp(1, 0.5, away)}>
        <Box cx={540} cy={640} w={40} h={680} fill={HOV} />
        <Box cx={540} cy={980} w={380} h={40} rx={20} fill={HOV} />
        <G x={540} y={300} r={tilt}><Box cx={0} cy={0} w={700} h={26} rx={13} fill={GOLDL} /></G>
        <circle cx={540} cy={300} r={32} fill={GOLD} />
        {pan(left.x, left.y)}
        {pan(right.x, right.y)}
        <G x={left.x} y={left.y + 195 - (1 - paper) * 200} o={Math.min(1, paper)}><Doc w={90} h={68} n={2} /></G>
        {fall >= 0 && baked.bodies.map((_, i) => {
          const pose = bakedPose(baked, fall, i);
          const angle = (2 * Math.atan2(pose.quaternion[2], pose.quaternion[3]) * 180) / Math.PI;
          return (
            <G key={i} x={right.x + pose.position[0] * 46} y={right.y + 229 - pose.position[1] * 46} r={-angle}>
              <rect x={-50} y={-30} width={100} height={60} rx={8} fill={i % 3 === 0 ? XL : TXT} />
              <Lines x={-36} y={-16} w={72} n={2} gap={18} color={i % 3 === 0 ? INK : SEC} t={7} />
            </G>
          );
        })}
      </G>
      <G x={540} y={1060} s={away} o={Math.min(1, away)}>
        <Desk nod={f > at(2) && f < at(3) ? Math.abs(Math.sin((f - at(2)) * 0.3)) * 14 : 0}>
          <g transform={`translate(0 -150) scale(${Math.max(0.01, Math.abs(1 - flip * 2))} 1)`}>
            {flip < 0.5 ? (
              <g>
                <Chat w={460} h={280} lit={false} />
                <G s={p(2, 0.5)} o={1 - erase}><Cross r={70} /></G>
                <line x1={-110} y1={0} x2={lerp(-110, 110, erase)} y2={0} stroke={GOLD} strokeWidth={22} strokeLinecap="round" opacity={erase > 0 && erase < 1 ? 1 : 0} />
              </g>
            ) : (
              <g>
                <rect x={-230} y={-140} width={460} height={280} rx={16} fill="#6B5C40" />
                <rect x={-230} y={-140} width={460} height={60} rx={16} fill="#8A7650" />
                {Array.from({ length: 18 }, (_, i) => <rect key={i} x={-205 + (i % 6) * 70} y={-60 + Math.floor(i / 6) * 62} width={56} height={46} rx={7} fill="#57492F" />)}
                <G s={0.55} y={20}><Chat w={420} h={250} lit={false} /></G>
              </g>
            )}
          </g>
        </Desk>
      </G>
    </Stage>
  );
};

export const LoiHua: React.FC = () => {
  const { f, p, l } = useT();
  const { durationInFrames } = useVideoConfig();
  const sweep = interpolate(f, [0, durationInFrames], [0, 1], { extrapolateRight: "clamp" });
  const open0 = p(1);
  const open1 = p(1, 0.45);
  const box = (x: number, open: number, inner: React.ReactNode) => (
    <G x={x} y={480} s={p(0, 0.25)}>
      {inner}
      <Box cx={0} cy={60} w={250} h={170} rx={16} fill={GOLD} />
      <Box cx={0} cy={60} w={60} h={170} fill={GOLDL} />
      <G y={-25} r={-open * 40} x={-open * 90}><Box cx={0} cy={0} w={280} h={48} rx={12} fill={GOLDL} /></G>
    </G>
  );
  const fill = l(3, 0.15, 24);
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={540} y={230} p={p(0, 0.35)} />
      <Tag i={1} x={730} y={665} p={p(1, 0.6)} solid />
      <Tag i={2} x={540} y={770} p={p(2, 0.1)} size={48} />
      <Tag i={3} x={330} y={1020} p={p(3, 0.4)} solid />
    </>}>
      <circle cx={540} cy={460} r={345} fill="none" stroke={HOV} strokeWidth={12} />
      <circle cx={540} cy={460} r={345} fill="none" stroke={GOLD} strokeWidth={12} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - sweep} transform="rotate(-90 540 460)" />
      {box(350, open0, <G y={lerp(40, -130, open0)}><Arrow x1={-70} y1={0} x2={70} y2={0} /></G>)}
      {box(730, open1, [0, 1, 2].map((i) => {
        const o = p(1, 0.45 + i * 0.1);
        return <G key={i} x={(i - 1) * 86} y={lerp(40, -130, o)} r={(i - 1) * 9}><Box cx={0} cy={0} w={78} h={112} rx={10} fill={TXT} /><Spark r={18} /></G>;
      }))}
      {Array.from({ length: 9 }, (_, i) => {
        const on = l(2, 0.15 + i * 0.075, 7);
        return (
          <G key={i} x={90 + i * 112.5} y={890} s={p(2, i * 0.04)}>
            <Box cx={0} cy={-20} w={92} h={70} rx={8} fill={INK} stroke={on > 0.5 ? GOLD : HOV} strokeWidth={4} />
            <rect x={-38} y={-30} width={76 * lerp(on, on * 0.2, fill)} height={18} rx={4} fill={GOLD} />
            <G y={72} s={0.5}><Person fill={on > 0.5 ? TXT : SEC} /></G>
          </G>
        );
      })}
      <G x={540} y={1130} o={l(3, 0, 10)}>
        <Box cx={0} cy={0} w={980} h={70} rx={35} fill={EL} />
        <Box cx={-490 + 98 * fill} cy={0} w={Math.max(1, 196 * fill)} h={70} rx={35} fill={GOLD} />
      </G>
      <Floor y={1220} />
    </Stage>
  );
};

export const BucTranhDoi: React.FC = () => {
  const { f, p, l } = useT();
  const loop = l(0, 0.1, 56);
  const off = l(0, 0.92, 6);
  const walk = l(1, 0.1, 70);
  const ax = walk < 0.5 ? lerp(620, 920, walk * 2) : lerp(920, 780, (walk - 0.5) * 2);
  const ay = walk < 0.5 ? lerp(330, 430, walk * 2) : lerp(430, 560, (walk - 0.5) * 2);
  const split = l(2, 0, 16);
  const scale = p(3);
  const angle = loop * Math.PI * 2 - Math.PI / 2;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={270} y={210} p={p(0, 0.15)} />
      <Tag i={1} x={700} y={210} p={p(1, 0.05)} solid />
      <Tag i={2} x={700} y={700} p={p(1, 0.75)} />
    </>}>
      <rect x={540} y={0} width={540} height={H} fill="#1E1A10" />
      <G x={270} y={440} s={p(0)} o={1 - off * 0.5}>
        <Chat w={430} h={300} lit={off < 0.5}>
          <G x={60} y={-30} s={0.7}><Bubble w={260} h={70} n={1} /></G>
          <G x={90} y={70} s={0.7}><Bubble w={260} h={70} n={1} fill={HOV} ink={SEC} /></G>
        </Chat>
      </G>
      <circle cx={270} cy={440} r={235} fill="none" stroke={off > 0.5 ? HOV : GOLD} strokeWidth={6} strokeDasharray="10 16" opacity={Math.min(1, p(0))} />
      <circle cx={270 + Math.cos(angle) * 235} cy={440 + Math.sin(angle) * 235} r={18} fill={off > 0.5 ? SEC : GOLDL} opacity={Math.min(1, p(0))} />
      <G x={950} y={350} s={p(1, 0.15) * 0.62}><Folder open={walk > 0.45 ? 1 : 0} /></G>
      <Box cx={800} cy={640} w={420} h={22} rx={11} fill={GOLD} opacity={Math.min(1, p(1, 0.1))} />
      <G x={ax} y={ay} s={p(1)}><AI size={110} /></G>
      <G x={620} y={lerp(450, 300, p(1, 0.03))} s={p(1, 0.02) * (1 - l(1, 0.2, 10))}><Doc w={90} h={110} n={3} /></G>
      <G x={660} y={560} s={p(1, 0.85)}>
        <Doc w={140} h={150} n={4} />
        <path d="M18 40 L34 58 L64 22" fill="none" stroke={GOLD} strokeWidth={9} strokeLinecap="round" />
      </G>
      <line x1={540} y1={lerp(700, 0, split)} x2={540} y2={lerp(700, H, split)} stroke={GOLDL} strokeWidth={10} opacity={split > 0 ? 1 : 0} />
      {[270, 810].map((x, i) => (
        <G key={x} x={lerp(i ? 1200 : -120, x, p(2, 0.1))} y={850}><Doc w={140} h={160} n={4} /></G>
      ))}
      <G y={lerp(400, 0, scale)}>
        <Box cx={540} cy={1090} w={840} h={20} rx={10} fill={GOLDL} />
        <path d="M540 1090 L490 1320 H590 Z" fill={GOLD} />
        <G x={160} y={1015}><AI size={130} /></G>
        <G x={920} y={1015}><AI size={130} /></G>
      </G>
    </Stage>
  );
};
