import React from "react";
import { Img, staticFile } from "remotion";
import { Label } from "../../kit/scene-context";
import { Quarter } from "../bai-1/part1";
import { AI, Arrow, Box, Bubble, Doc, EL, Floor, G, GOLD, GOLDL, HOV, INK, Lines, Mag, Person, Question, RED, SEC, Stage, Stamp, SURF, Table, Tag, TXT, XL, lerp, useT } from "../mo-dau/art";
import { Building, Cal, Crate } from "./part1";

const Sign: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <Box cx={0} cy={140} w={22} h={200} fill={SEC} />
    <path d="M-110 -46 L-46 -110 H46 L110 -46 V46 L46 110 H-46 L-110 46 Z" fill={RED} stroke={TXT} strokeWidth={8} />
    <rect x={-66} y={-14} width={132} height={28} rx={6} fill={TXT} />
  </G>
);

export const KyThuat1: React.FC = () => {
  const { p, l } = useT();
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={760} y={230} p={p(0, 0.2)} solid size={46} />
      <Tag i={1} x={160} y={560} p={p(0, 0.6)} />
      <Tag i={2} x={540} y={720} p={p(2, 0.15)} solid color={RED} size={46} />
      <Tag i={3} x={240} y={1015} p={p(2, 0.6)} />
    </>}>
      <G x={150} y={390} s={p(0)}><Person s={1.9} /></G>
      <path d="M260 350 L1030 180 V620 L260 390 Z" fill={GOLDL} opacity={0.2 * Math.min(1, p(0, 0.1))} />
      <G x={720} y={410} s={p(0, 0.3)}>
        <circle r={125} fill={INK} />
        <G s={0.7}><Question /></G>
      </G>
      <G x={800} y={lerp(-300, 1020, p(1, 0.1, 12))}><Box cx={0} cy={0} w={370} h={460} rx={10} fill={TXT} /></G>
      <G x={800} y={1020} s={p(2, 0.1) * 0.9}><Sign /></G>
      {[0, 1, 2, 3, 4].map((i) => (
        <G key={i} x={100 + (i % 3) * 150} y={1120 + Math.floor(i / 3) * 110} s={p(2, 0.55 + i * 0.07)}>
          <Box cx={0} cy={0} w={130} h={92} rx={14} fill="none" stroke={GOLDL} strokeWidth={5} strokeDasharray="12 10" />
          <G s={0.2}><Question /></G>
        </G>
      ))}
    </Stage>
  );
};

export const DanhSachMu: React.FC = () => {
  const { f, at, p, l } = useT();
  const wait = l(1, 0.55, 12);
  const rush = l(2, 0, 12);
  const bump = rush >= 1 ? Math.sin((f - at(2)) * 0.5) * Math.max(0, 1 - (f - at(2) - 12) / 12) * 14 : 0;
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={790} y={210} p={p(1, 0.1)} solid />
      <Tag i={1} x={560} y={1015} p={p(2, 0.25)} color={RED} size={46} />
    </>}>
      <G x={140} y={280} s={p(0)}><AI size={170} /></G>
      {[<Crate key="a" />, <Cal key="b" />, <Stamp key="c" r={50} />].map((icon, i) => (
        <G key={i} x={280} y={460 + i * 170} s={p(0, 0.2 + i * 0.18)}>
          <Box cx={230} cy={0} w={640} h={150} rx={20} fill={EL} stroke={GOLD} strokeWidth={4} />
          <G x={0}>{icon}</G>
          <Lines x={100} y={-26} w={340} n={2} gap={40} color={SEC} t={14} />
          <G x={480} s={0.4}><Question /></G>
        </G>
      ))}
      <G x={910} y={560} r={lerp(0, 35, wait)} s={p(1, 0.3)}><rect x={-18} y={-160} width={36} height={220} rx={8} fill={GOLD} /><path d="M-18 60 L0 104 L18 60 Z" fill={TXT} /></G>
      <G x={910} y={760 + 0} s={p(1, 0.6)}>
        <Doc w={170} h={190} n={Math.max(1, Math.floor(wait * 5))} />
      </G>
      <G x={lerp(-180, 300, rush) - bump} y={1160} r={lerp(-10, 0, rush)}><AI size={190} /></G>
      <G x={560} y={1090} s={p(2, 0.15, 9) * 0.85}><Sign /></G>
      <G x={840} y={1160} s={p(2)}><Box cx={0} cy={0} w={260} h={300} rx={10} fill={TXT} /></G>
    </Stage>
  );
};

export const KyThuat2: React.FC = () => {
  const { f, p, l } = useT();
  const rot = l(0, 0.1, 22);
  const swap = l(1, 0.4, 18);
  return (
    <Stage bg="#14110B" overlay={<>
      <Tag i={0} x={540} y={205} p={p(0)} solid size={46} />
      <Tag i={1} x={780} y={640} p={p(2, 0.35)} />
      <Tag i={2} x={230} y={830} p={p(3, 0.4)} size={36} />
      <Tag i={3} x={700} y={830} p={p(3, 0.6)} size={36} />
      <Tag i={4} x={850} y={1015} p={p(4, 0.5)} solid />
    </>}>
      <G x={140} y={420} s={p(0)} r={rot * 180 + f * 0.3}>
        <path d="M-85 0 A85 85 0 0 1 85 0" fill="none" stroke={GOLD} strokeWidth={18} />
        <path d="M60 -10 L85 34 L112 -10 Z" fill={GOLD} />
        <path d="M85 0 A85 85 0 0 1 -85 0" fill="none" stroke={GOLDL} strokeWidth={18} />
        <path d="M-112 10 L-85 -34 L-60 10 Z" fill={GOLDL} />
      </G>
      <G x={lerp(430, 900, swap)} y={420} s={p(1)}><Person s={1.5} /></G>
      <G x={lerp(900, 430, swap)} y={420} s={p(1, 0.08)}><AI size={170} /></G>
      <G s={Math.min(1, p(1, 0.2))}>
        <Arrow x1={560} y1={380} x2={770} y2={380} p={l(1, 0.2, 10)} color={swap > 0.5 ? GOLD : SEC} />
        <Arrow x1={770} y1={460} x2={560} y2={460} p={l(1, 0.2, 10)} color={SEC} />
      </G>
      <G x={330} y={640} s={p(2)}>
        <Box cx={0} cy={0} w={540} h={92} rx={46} fill={EL} stroke={GOLD} strokeWidth={5} />
        {Array.from({ length: 8 }, (_, i) => <rect key={i} x={-210 + i * 54} y={-11} width={44} height={22} rx={6} fill={GOLDL} opacity={l(2, 0.1 + i * 0.05, 2)} />)}
      </G>
      {[0, 1, 2, 3].map((i) => <G key={i} x={700 + i * 90} y={720} s={p(2, 0.55 + i * 0.08) * 0.5}><Bubble w={140} h={90} n={1} /></G>)}
      <G x={230} y={950} s={p(3, 0.35)}><Box cx={0} cy={0} w={330} h={170} rx={30} fill={GOLD} /><Cal /></G>
      <G x={700} y={950} s={p(3, 0.55)}>
        <Box cx={0} cy={0} w={330} h={170} rx={30} fill={GOLD} />
        <circle cy={-40} r={22} fill={INK} /><circle cx={-84} cy={40} r={22} fill={INK} /><circle cy={40} r={22} fill={INK} /><circle cx={84} cy={40} r={22} fill={INK} />
        <path d="M0 -20 V20 M-84 20 V8 H84 V20" fill="none" stroke={INK} strokeWidth={6} />
      </G>
      <G x={340} y={1180} s={p(4)}><Doc w={210} h={220} n={6} /></G>
      <Arrow x1={470} y1={1180} x2={590} y2={1180} p={l(4, 0.25, 10)} />
      <G x={740} y={1190} s={p(4, 0.3) * 0.9}><Building /></G>
      <G x={910} y={1190} s={p(4, 0.65, 9)}><Stamp r={72} color={XL} /></G>
    </Stage>
  );
};

export const KyThuat3: React.FC = () => {
  const { f, p, l } = useT();
  const scan = l(1, 0.05, 40);
  const card = (i: number, x: number, y: number, show: number) => (
    <G key={i} x={x} y={y} s={show}>
      <Box cx={0} cy={0} w={300} h={150} rx={22} fill={EL} stroke={GOLD} strokeWidth={5} />
      <G y={-30} s={0.7}><Person /></G>
    </G>
  );
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={720} y={205} p={p(0, 0.2)} solid />
      <Tag i={1} x={250} y={200} p={p(0, 0.5)} />
      <Tag i={2} x={200} y={770} p={p(2, 0.25)} size={34} />
      <Tag i={3} x={540} y={770} p={p(2, 0.65)} size={34} />
      <Tag i={4} x={880} y={770} p={p(3, 0.25)} size={34} />
      <Tag i={5} x={540} y={1015} p={p(4, 0.45)} solid color={RED} />
    </>}>
      <G x={250} y={440} s={p(0)}><Doc w={380} h={400} n={9} /></G>
      <G x={720} y={420} s={p(0, 0.3)}>
        <AI size={200} />
        <G x={70} y={-100} s={p(0, 0.55, 9)}><Stamp r={44} /></G>
      </G>
      <G x={lerp(130, 360, ((scan * 2) % 1))} y={lerp(320, 560, scan)} s={l(1, 0, 8) * 0.9}><Mag /></G>
      <circle cx={180} cy={380} r={62} fill="none" stroke={RED} strokeWidth={9} opacity={Math.min(1, p(1, 0.5))} />
      <circle cx={320} cy={540} r={62} fill="none" stroke={RED} strokeWidth={9} opacity={Math.min(1, p(1, 0.8))} />
      {card(0, 200, 870, p(2, 0.15))}
      {card(1, 540, 870, p(2, 0.55))}
      {card(2, 880, 870, p(3, 0.15))}
      <G x={240} y={1140} s={p(4)} ><Doc w={210} h={230} n={6} /></G>
      <G x={830} y={1150} s={p(4, 0.05)}><AI size={190} /></G>
      <G x={580 + Math.sin(f * 0.6) * 4} y={1100} s={p(4, 0.15)} r={3}><Bubble w={270} h={120} n={2} fill={RED} ink="#3A1212" /></G>
      <G x={360} y={1200} s={p(4, 0.45, 9)} r={-12}><Stamp r={64} color={GOLD} /></G>
    </Stage>
  );
};

export const ViecHomNay: React.FC = () => {
  const { p, l } = useT();
  const pick = p(2, 0, 12);
  const through = l(2, 0.1, 30);
  return (
    <Stage bg="#120F09" overlay={<>
      <Tag i={0} x={720} y={290} p={p(0, 0.25)} solid size={54} />
      <Tag i={1} x={190} y={720} p={p(1, 0.25)} size={36} />
      <Tag i={2} x={540} y={720} p={p(1, 0.5)} size={36} />
      <Tag i={3} x={890} y={720} p={p(1, 0.78)} size={36} />
      <Tag i={4} x={540} y={1010} p={p(2, 0.05)} solid />
    </>}>
      <G x={260} y={340} s={p(0)}><Quarter r={170} t={l(0, 0.1, 24)} /></G>
      {[190, 540, 890].map((x, i) => (
        <G key={x} x={x} y={870} s={p(1, 0.2 + i * 0.27) * (i === 0 ? 1 - pick : 1)}><Doc w={230} h={230} n={5} /></G>
      ))}
      <G x={lerp(190, lerp(140, 660, through), pick)} y={lerp(870, 1180, pick)} s={pick * 0.85}><Doc w={200} h={210} n={5} /></G>
      <G x={500} y={1160} s={pick}><Mag s={1.5} /></G>
      <G x={870} y={1180} s={p(2, 0.45)}>
        <Box cx={0} cy={0} w={250} h={100} rx={50} fill={GOLD} />
        <path d="M-30 -26 L36 0 L-30 26 L-16 0 Z" fill={INK} />
      </G>
    </Stage>
  );
};

export const HuongDan: React.FC = () => {
  const { f, p, l } = useT();
  const up = p(0, 0, 14);
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={220} y={500} p={p(0, 0.4)} solid />
      <Tag i={1} x={800} y={500} p={p(0, 0.55)} />
      <Tag i={2} x={640} y={995} p={p(1, 0.55)} color={GOLDL} size={46} />
      <Tag i={3} x={170} y={1010} p={p(2, 0.4)} solid size={36} />
    </>}>
      <G x={540} y={lerp(650, 290, up)} s={lerp(1.3, 0.85, up)}>
        <Box cx={0} cy={0} w={600} h={300} rx={18} fill={EL} stroke={GOLD} strokeWidth={5} />
        <path d="M-40 -60 L70 0 L-40 60 Z" fill={GOLD} />
      </G>
      <G x={540} y={740} s={up}>
        <Box cx={0} cy={0} w={960} h={330} rx={22} fill={EL} />
        {[-300, 0, 300].map((x, i) => (
          <G key={x} x={x} y={lerp(40, 10, p(0, 0.4 + i * 0.1))} s={p(0, 0.4 + i * 0.1)}>
            <Box cx={0} cy={0} w={270} h={200} rx={18} fill={INK} stroke={GOLD} strokeWidth={4} />
            <path d="M-92 -44 L-66 -20 L-92 4" fill="none" stroke={GOLDL} strokeWidth={8} strokeLinecap="round" />
            <Lines x={-50} y={-28} w={150} n={3} gap={32} color={SEC} t={12} />
          </G>
        ))}
      </G>
      <G x={lerp(180, 700, l(1, 0.1, 28))} y={1130} s={p(1) * 1.2}><Mag /></G>
      <G x={830} y={1180} s={p(1, 0.5)}>
        <Box cx={0} cy={0} w={210} h={170} rx={16} fill="none" stroke={GOLDL} strokeWidth={6} strokeDasharray="14 10" />
        <G s={0.4} r={Math.sin(f * 0.4) * 5}><Question /></G>
      </G>
      <G x={140} y={lerp(1500, 1190, p(2, 0.25, 10))}><path d="M-70 -120 H70 V120 L0 72 L-70 120 Z" fill={GOLD} /></G>
      <Floor y={1320} color={HOV} />
    </Stage>
  );
};

export const Ket: React.FC = () => {
  const { p, l } = useT();
  const draw = l(0, 0, 40);
  const logo = p(0, 0.02, 16);
  const line = l(0, 0.25, 18);
  return (
    <Stage still bg={`radial-gradient(circle at 50% 29%, #4A3A1C 0%, ${INK} 48%)`} overlay={<>
      <Img src={staticFile("brand/tvhs-logo-icon.png")} style={{ position: "absolute", left: 300, top: 150, width: 480, height: 480, objectFit: "contain", opacity: Math.min(1, logo) }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 665, textAlign: "center", fontSize: 84, fontWeight: 800, lineHeight: 1.3, color: GOLDL, opacity: l(0, 0.08, 12) }}>
        <Label i={0} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 845, textAlign: "center", fontSize: 44, fontWeight: 600, lineHeight: 1.35, color: TXT, opacity: l(0, 0.3, 12) }}>
        <Label i={2} />
      </div>
      <div style={{ position: "absolute", left: "50%", top: 950, transform: `translateX(-50%) scale(${p(0, 0.7)})`, fontSize: 40, fontWeight: 700, lineHeight: 1.35, color: GOLDL, border: `3px solid ${GOLD}`, background: "#1E1A10", padding: "12px 44px 14px", borderRadius: 999, whiteSpace: "nowrap" }}>
        <Label i={1} />
      </div>
      <Tag i={3} x={880} y={210} p={p(0, 0.4)} solid size={34} />
    </>}>
      <circle cx={540} cy={390} r={262} fill="none" stroke={GOLD} strokeWidth={7} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} transform="rotate(-90 540 390)" />
      <circle cx={540} cy={390} r={286} fill="none" stroke={HOV} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} transform="rotate(90 540 390)" />
      <rect x={540 - 210 * line} y={808} width={420 * line} height={3} rx={1.5} fill={GOLD} />
      <G x={920} y={330} s={p(0, 0.45)}>
        <Box cx={0} cy={0} w={170} h={130} rx={14} fill={INK} stroke={GOLD} strokeWidth={5} />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={-58 + i * 30} y={46 - 26 * (i + 1)} width={22} height={26 * (i + 1)} rx={4} fill={GOLD} />)}
      </G>
    </Stage>
  );
};

