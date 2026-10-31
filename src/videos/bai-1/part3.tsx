import React from "react";
import { Img, staticFile } from "remotion";
import { Label } from "../../kit/scene-context";
import { AI, Arrow, Box, Doc, EL, Floor, G, GOLD, GOLDL, H, HOV, INK, Lines, RED, SEC, Stage, Stamp, SURF, Tag, TXT, W, XL, lerp, useT } from "../mo-dau/art";
import { Gear, Intern, Quarter, Stairs } from "./part1";

export const ViecHomNay: React.FC = () => {
  const { f, p, l } = useT();
  const back = p(0, 0, 12);
  const run = l(1, 0.25, 12);
  return (
    <Stage bg="#120F09" overlay={<>
      <Tag i={0} x={540} y={395} p={p(0, 0.35)} solid />
      <Tag i={1} x={230} y={1005} p={p(2, 0.25)} />
      <Tag i={2} x={770} y={720} p={p(3, 0.15)} solid />
    </>}>
      <Box cx={540} cy={320} w={lerp(100, 700, back)} h={100} rx={20} fill={GOLD} />
      <Lines x={lerp(500, 240, back)} y={304} w={lerp(60, 600, back)} n={1} color={INK} t={26} />
      <Box cx={280} cy={620} w={420} h={260} rx={24} fill={EL} stroke={GOLD} strokeWidth={5} opacity={Math.min(1, p(1))} />
      <G x={130} y={620} s={p(1, 0.1) * 0.65}><Box cx={0} cy={0} w={150} h={180} rx={8} fill={GOLDL} /><Lines x={-55} y={-60} w={110} n={4} gap={32} color={INK} t={10} /></G>
      <Arrow x1={200} y1={620} x2={245} y2={620} p={p(1, 0.2)} />
      <G x={330} y={650} s={p(1, 0.25)}><Gear r={62} rot={f * 3 * run} /></G>
      <G x={430} y={570} s={p(1, 0.3)}><Gear r={38} rot={-f * 5 * run} fill={GOLDL} /></G>
      <G x={230} y={835} s={p(2)}><Quarter r={125} t={l(2, 0.05, 26)} /></G>
      <Stairs x={480} y={1270} w={94} show={(i) => l(3, 0.1 + i * 0.08, 8)} />
      {Array.from({ length: 6 }, (_, i) => {
        const on = l(3, 0.35 + i * 0.1, 5);
        return (
          <G key={i} x={480 + i * 100} y={1270 - (40 + i * 44) - 44} s={l(3, 0.1 + i * 0.08, 8)}>
            <Box cx={0} cy={0} w={66} h={66} rx={14} fill={TXT} stroke={GOLD} strokeWidth={4} />
            <path d="M-20 0 L-5 18 L24 -18" fill="none" stroke={INK} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={on} />
          </G>
        );
      })}
    </Stage>
  );
};

export const GoThu: React.FC = () => {
  const { f, p, l } = useT();
  const match = (i: number) => l(1, 0.2 + i * 0.13, 8);
  const save = p(2, 0.05, 9);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={840} y={205} p={p(0, 0.55)} solid />
      <Tag i={1} x={540} y={895} p={p(1, 0.5)} />
      <Tag i={2} x={700} y={1010} p={save} solid />
    </>}>
      <G x={540} y={330} s={p(0)}>
        <Box cx={0} cy={0} w={920} h={96} rx={48} fill={EL} stroke={GOLD} strokeWidth={5} />
        {Array.from({ length: 14 }, (_, i) => <rect key={i} x={-410 + i * 54} y={-11} width={44} height={22} rx={6} fill={GOLDL} opacity={l(0, 0.12 + i * 0.05, 2)} />)}
      </G>
      <G x={320} y={630} s={p(1)}>
        <Box cx={0} cy={0} w={460} h={340} rx={22} fill={EL} stroke={HOV} strokeWidth={5} />
        <G x={-170} y={-125}><AI size={70} /></G>
        {[0, 1, 2].map((i) => <rect key={i} x={-190} y={-60 + i * 72} width={380} height={40} rx={10} fill={GOLD} opacity={match(i) > 0 ? 1 : 0.2} />)}
      </G>
      <G x={840} y={630} s={p(1, 0.05)} r={2}>
        <Box cx={0} cy={0} w={340} h={340} rx={10} fill={GOLDL} />
        {[0, 1, 2].map((i) => <rect key={i} x={-130} y={-96 + i * 72} width={260} height={40} rx={10} fill={INK} />)}
      </G>
      {[0, 1, 2].map((i) => <line key={i} x1={550} y1={590 + i * 72} x2={lerp(550, 690, match(i))} y2={590 + i * 72} stroke={XL} strokeWidth={7} opacity={match(i) > 0 ? 1 : 0} />)}
      <G x={130} y={1010} s={p(1, 0.6)}>
        <path d="M-14 -44 V34 Q-14 56 6 56 Q26 56 26 34 V-34 Q26 -56 2 -56 Q-24 -56 -24 -34 V40" fill="none" stroke={SEC} strokeWidth={10} strokeLinecap="round" />
        <line x1={-56} y1={-56} x2={56} y2={56} stroke={RED} strokeWidth={14} strokeLinecap="round" />
      </G>
      <G x={310} y={1020} s={p(1, 0.82, 9)} r={-10}><Stamp r={72} color={XL} /></G>
      <Stairs x={190} y={1330} w={134} show={() => Math.min(1, save)} />
      <G x={950} y={1180} s={save}>
        <path d="M-58 -90 H58 V90 L0 50 L-58 90 Z" fill={GOLD} />
      </G>
    </Stage>
  );
};

export const Ket: React.FC = () => {
  const { p, l } = useT();
  const draw = l(0, 0, 40);
  const logo = p(0, 0.1, 16);
  const line = l(0, 0.6, 18);
  return (
    <Stage still bg={`radial-gradient(circle at 50% 29%, #4A3A1C 0%, ${INK} 48%)`} overlay={<>
      <Img src={staticFile("brand/tvhs-logo-icon.png")} style={{ position: "absolute", left: 300, top: 150, width: 480, height: 480, objectFit: "contain", opacity: Math.min(1, logo) }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 665, textAlign: "center", fontSize: 84, fontWeight: 800, lineHeight: 1.3, color: GOLDL, opacity: l(0, 0.3, 12) }}>
        <Label i={0} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 835, textAlign: "center", fontSize: 44, fontWeight: 600, lineHeight: 1.35, color: TXT, opacity: l(0, 0.7, 12) }}>
        <Label i={2} />
      </div>
      <div style={{ position: "absolute", left: "50%", top: 950, transform: `translateX(-50%) scale(${p(2, 0.1)})`, fontSize: 40, fontWeight: 700, lineHeight: 1.35, color: GOLDL, border: `3px solid ${GOLD}`, background: "#1E1A10", padding: "12px 44px 14px", borderRadius: 999, whiteSpace: "nowrap" }}>
        <Label i={1} />
      </div>
      <Tag i={3} x={800} y={1000 - 830 + 40} p={p(1, 0.1)} solid size={34} />
    </>}>
      <circle cx={540} cy={390} r={262} fill="none" stroke={GOLD} strokeWidth={7} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} transform="rotate(-90 540 390)" />
      <circle cx={540} cy={390} r={286} fill="none" stroke={HOV} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} transform="rotate(90 540 390)" />
      <rect x={540 - 210 * line} y={808} width={420 * line} height={3} rx={1.5} fill={GOLD} />
      <G x={900} y={310} s={p(1, 0.2)}>
        <AI size={120} />
        <circle cx={-26} cy={-4} r={22} fill="none" stroke={GOLDL} strokeWidth={6} />
        <circle cx={24} cy={-4} r={22} fill="none" stroke={GOLDL} strokeWidth={6} />
      </G>
      <G x={970} y={400} r={30} s={p(1, 0.35)}><rect x={-8} y={-60} width={16} height={92} rx={4} fill={RED} /></G>
    </Stage>
  );
};

