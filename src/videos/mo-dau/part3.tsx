import React from "react";
import { Img, staticFile } from "remotion";
import { Label } from "../../kit/scene-context";
import { AI, Arrow, Bell, Box, Bubble, Chat, Clock, Cross, Doc, EL, Floor, G, GOLD, GOLDL, H, Hand, HOV, INK, Lines, Lock, PAPER, Person, RED, SEC, Spark, Stage, Stamp, Sun, SURF, Table, Tag, TXT, W, lerp, useT } from "./art";

const Card: React.FC<{ fill?: string }> = ({ fill = TXT }) => (
  <g>
    <Box cx={0} cy={0} w={180} h={120} rx={16} fill={fill} />
    <Spark r={30} />
  </g>
);

export const Viec1: React.FC = () => {
  const { f, p, l } = useT();
  const grow = p(2);
  const sun = p(3, 0, 18);
  const settle = l(4, 0, 18);
  const drop = p(3, 0.65, 10);
  return (
    <Stage bg="linear-gradient(180deg, #2B2214 0%, #15120C 55%, #0C0C0C 100%)" overlay={<>
      <Tag i={0} x={540} y={350} p={p(2, 0.25)} solid size={44} />
      <Tag i={1} x={840} y={lerp(1400, 985, drop)} p={drop} color="#60A5FA" o={1 - settle} />
      <Tag i={2} x={430} y={1010} p={p(4, 0.55)} solid />
    </>}>
      <G x={900} y={lerp(620, 470, sun)} s={sun * 0.62}><Sun r={90} rot={f * 0.4} /></G>
      {[220, 540, 860].map((x, i) => (
        <G key={x} x={lerp(540 + (i - 1) * 345, x, grow)} y={lerp(lerp(-200, 640, p(0, i * 0.12)), 225, grow)} s={lerp(1.75, 1, grow)} o={i === 0 ? 1 - grow : 1}>
          <Card />
          {i === 2 && <G s={p(1, 0.2)} y={-6}><Lock s={0.95} /></G>}
        </G>
      ))}
      <G x={lerp(220, 480, grow)} y={lerp(225, 760, grow)} s={lerp(0.2, 1, grow)} o={Math.min(1, grow)}>
        <Box cx={0} cy={0} w={700} h={620} rx={26} fill={TXT} />
        <Box cx={0} cy={-270} w={700} h={80} rx={26} fill={GOLD} />
        <G y={40}><Table cols={2} rows={5} w={640} h={470} base="#D8D2C4" /></G>
      </G>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const c = i % 2;
        const r = Math.floor(i / 2);
        const t = l(4, 0.05 + i * 0.1, 12);
        return (
          <G key={i} x={lerp(170 + i * 110, 325 + c * 320, t)} y={lerp(1330, 590 + r * 94, t)} o={t > 0 ? 1 : 0}>
            <Box cx={0} cy={0} w={290} h={74} rx={10} fill={i === 5 ? "#60A5FA" : GOLD} />
            <Lines x={-120} y={-16} w={200} n={2} gap={22} color={INK} t={9} />
          </G>
        );
      })}
      <G x={960} y={770} s={p(3)}>
        <AI size={110} />
      </G>
      <G x={895} y={620} s={p(3, 0.15) * 0.7}><Bubble w={240} h={90} n={2} /></G>
      <G x={840} y={lerp(-120, 900, drop)} r={-5} o={1 - settle}><Box cx={0} cy={0} w={150} h={64} rx={10} fill="#60A5FA" /></G>
      <G x={700} y={1040} s={settle >= 1 ? p(4, 0.55, 9) : 0} r={-10}><Stamp r={85} /></G>
      <Floor y={1160} color="#4A3D22" />
    </Stage>
  );
};

export const Viec2: React.FC = () => {
  const { p, l } = useT();
  const line = l(2, 0.05, 28);
  const scraps: [number, number, number, boolean][] = [[190, 640, -18, false], [860, 620, 14, true], [260, 880, 22, false], [820, 860, -16, false], [520, 1010, 11, true], [170, 1110, -8, false], [900, 1110, 18, false]];
  return (
    <Stage bg={PAPER} overlay={<>
      <Tag i={0} x={540} y={220} p={p(0, 0.2)} solid size={44} />
      <Tag i={1} x={540} y={395} p={p(1, 0.5)} color={RED} o={1 - line} />
      <Tag i={2} x={540} y={395} p={p(2, 0.25)} solid />
    </>}>
      <G x={540} y={760} s={p(0)}>
        <Box cx={0} cy={0} w={600} h={680} rx={22} fill="#FFFDF6" stroke="#CDBE9F" strokeWidth={5} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <Box key={i} cx={0} cy={-270 + i * 90} w={520} h={72} rx={12} fill="none" stroke="#CDBE9F" strokeWidth={4} strokeDasharray="14 10" />)}
      </G>
      {scraps.map(([x, y, r, warn], i) => {
        const fall = p(1, 0.05 + i * 0.09, 11);
        return (
          <G key={i} x={lerp(x, 540, line)} y={lerp(lerp(-120, y, fall), 490 + i * 90, line)} r={lerp(r, 0, line)} o={Math.min(1, fall)}>
            <Box cx={0} cy={0} w={lerp(230, 510, line)} h={70} rx={10} fill={warn ? "#3A1A1A" : "#2B2A27"} />
            <Lines x={lerp(-90, -220, line)} y={-14} w={lerp(170, 400, line)} n={2} gap={20} color={TXT} t={8} />
            {warn && <path d="M-16 -78 L16 -78 L0 -106 Z" fill={RED} stroke={RED} strokeWidth={8} strokeLinejoin="round" opacity={1 - line} />}
          </G>
        );
      })}
      <G x={lerp(980, 870, line)} y={lerp(420, 1090, line)} r={25} s={Math.min(1, l(2, 0, 8))}>
        <rect x={-14} y={-110} width={28} height={170} rx={6} fill={GOLD} />
        <path d="M-14 60 L0 96 L14 60 Z" fill={INK} />
      </G>
      <G x={830} y={1140} s={p(2, 0.78, 9)} r={-12}><Stamp r={80} color={INK} /></G>
    </Stage>
  );
};

export const Viec3: React.FC = () => {
  const { f, p, l } = useT();
  const flip = p(1, 0, 9);
  const role = p(4);
  const root = l(2, 0.2, 26);
  const mark = p(5, 0.1);
  const mark2 = p(5, 0.55);
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={340} y={490} p={p(2, 0.1)} />
      <Tag i={1} x={810} y={480} p={p(4, 0.45)} solid />
      <Tag i={2} x={270} y={1010} p={mark} color={RED} size={36} />
      <Tag i={3} x={800} y={1010} p={mark2} color={RED} size={36} />
    </>}>
      <G x={lerp(300, 250, p(2))} y={lerp(640, 230, p(2))} s={p(0) * lerp(2, 1, p(2))}>
        <Card />
        <G y={-6}><Lock s={0.95} open={l(0, 0.05, 14)} /></G>
      </G>
      <G x={lerp(760, 590, p(2))} y={lerp(640, 235, p(2))} s={p(0, 0.3) * lerp(1.7, 1, p(2))}>
        <Box cx={0} cy={0} w={230} h={100} rx={14} fill={EL} stroke={HOV} strokeWidth={4} />
        {Array.from({ length: 12 }, (_, i) => <rect key={i} x={-98 + (i % 6) * 34} y={-30 + Math.floor(i / 6) * 34} width={26} height={24} rx={5} fill={HOV} />)}
        <G s={p(0, 0.6)}><Cross r={46} /></G>
      </G>
      <G x={lerp(540, 880, p(2))} y={lerp(960, 235, p(2))} r={lerp(0, 180, flip)} s={Math.min(1, flip) * lerp(2, 1, p(2))}><Arrow x1={-80} y1={0} x2={70} y2={0} w={18} color={GOLDL} /></G>
      <line x1={540} y1={520} x2={540} y2={1000} stroke={HOV} strokeWidth={4} opacity={Math.min(1, p(3))} />
      <G x={270} y={720} s={p(2)}>
        <Doc w={330} h={310} n={6} ink="#3D3D3D" />
        <G x={-120} y={-225} s={0.8}><Person /></G>
        <G x={120} y={-30} r={30}><rect x={-10} y={-90} width={20} height={120} rx={5} fill={GOLD} /></G>
      </G>
      <g opacity={root > 0 ? 1 : 0}>
        <path d="M270 880 V1320 M270 980 Q170 1040 110 1300 M270 980 Q370 1040 430 1300 M270 1090 Q210 1160 190 1320 M270 1090 Q330 1160 350 1320" fill="none" stroke={GOLD} strokeWidth={13} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - root} />
      </g>
      <G x={810} y={720} s={p(3)} o={1 - role}>
        <Doc w={330} h={310} n={6} ink="#BDBDBD" />
      </G>
      <G x={lerp(980, 800, role)} y={lerp(560, 720, role)} s={p(3, 0.3) * lerp(0.6, 1.7, role)}>
        <AI size={130} />
        <G o={Math.min(1, role)}>
          <circle cx={-24} cy={-4} r={24} fill="none" stroke={GOLDL} strokeWidth={7} />
          <circle cx={26} cy={-4} r={24} fill="none" stroke={GOLDL} strokeWidth={7} />
          <line x1={0} y1={-4} x2={2} y2={-4} stroke={GOLDL} strokeWidth={7} />
        </G>
      </G>
      <G x={570} y={730} r={-65} s={Math.min(1, role) * 1.3}>
        <rect x={-10} y={-80} width={20} height={120} rx={5} fill={RED} />
      </G>
      <G x={190} y={720} s={mark}>
        <circle r={78} fill="none" stroke={RED} strokeWidth={9} strokeDasharray="20 8" transform={`rotate(${f})`} />
        <circle cx={-16} r={24} fill="none" stroke={TXT} strokeWidth={8} />
        <circle cx={28} r={24} fill="none" stroke={SEC} strokeWidth={8} />
      </G>
      <G x={345} y={820} s={mark2}>
        <rect x={-44} y={-26} width={88} height={18} rx={5} fill="#3D3D3D" />
        <rect x={-44} y={6} width={56} height={18} rx={5} fill={RED} />
        <circle r={64} fill="none" stroke={RED} strokeWidth={9} />
      </G>
      <Arrow x1={640} y1={975} x2={420} y2={860} p={mark2 > 0.3 ? 1 : 0} color={RED} />
      <Arrow x1={70} y1={880} x2={150} y2={790} p={mark > 0.3 ? 1 : 0} color={RED} />
    </Stage>
  );
};

export const ChanChamDat: React.FC = () => {
  const { f, p, l } = useT();
  const shadow = l(0, 0.15, 22);
  const doors = l(1, 0.65, 18);
  const flight = l(1, 0, 24);
  const spot = p(2, 0.3);
  const back = l(2, 0.55, 18);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={790} y={205} p={p(1, 0.75)} solid />
      <Tag i={1} x={210} y={740} p={p(2, 0.15)} color={RED} />
      <Tag i={2} x={700} y={700} p={spot} solid size={44} />
    </>}>
      {Array.from({ length: 14 }, (_, i) => (
        <G key={i} x={80 + (i * 137) % 940} y={230 + (i * 211) % 900} s={(1 - shadow * 0.75) * (0.6 + 0.4 * Math.sin(f * 0.3 + i))} o={1 - p(1)}><Spark r={34} fill={GOLDL} /></G>
      ))}
      <G x={lerp(540, 250, p(1))} y={lerp(640, 420, p(1))} s={p(0) * lerp(2.2, 1, p(1)) * lerp(1, 0.75, back)} o={lerp(1, 0.25, back)}><AI size={210} /></G>
      {Array.from({ length: 12 }, (_, i) => {
        const t = Math.max(0, Math.min(1, flight * 1.6 - i * 0.05));
        return <rect key={i} x={lerp(60 + (i * 83) % 960, 215, t)} y={lerp(640 - (i % 3) * 40, 390, t)} width={70} height={26} rx={6} fill={GOLD} opacity={t > 0 && t < 1 ? 1 : 0} />;
      })}
      {[640, 890].map((x, i) => (
        <g key={x} opacity={Math.min(1, p(1, 0.2))}>
          <Box cx={x} cy={430} w={200} h={320} rx={8} fill="#2E2A1E" stroke={GOLD} strokeWidth={5} />
          <path d={`M${x - 100} 270 L${x - 100 + 200 * (1 - doors * 0.8)} ${270 + doors * 26} V${590 - doors * 26} L${x - 100} 590 Z`} fill={i ? GOLD : GOLDL} />
        </g>
      ))}
      <G x={760} y={lerp(800, 640, doors)} r={-5} s={Math.min(1, p(1, 0.5))}><Hand s={1.1} /></G>
      <G x={220} y={950} s={p(2)}>
        <Doc w={290} h={340} n={7} />
        <G r={-14}><Stamp r={85} color={RED} /></G>
      </G>
      <path d="M700 0 L500 1290 H900 Z" fill={GOLDL} opacity={spot * 0.2} />
      <G x={700} y={1010} s={spot}>
        <Person s={1.55} />
      </G>
      <G x={700} y={1190} s={spot}>
        <Box cx={0} cy={0} w={350} h={190} rx={14} fill={GOLD} />
        <Box cx={0} cy={-100} w={400} h={26} rx={10} fill={GOLDL} />
      </G>
    </Stage>
  );
};

export const ChotVongLap: React.FC = () => {
  const { f, at, p, l } = useT();
  const road = l(1, 0.05, 50);
  const stair = p(2, 0.25, 15);
  const clear = l(3, 0.05, 24);
  const zoom = p(4, 0, 15);
  const back = l(5, 0, 8);
  const shake = Math.sin(f * 1.7) * 12 * Math.max(0, 1 - (f - at(5)) / 16);
  const slam = p(5, 0.08, 11);
  const stations: [number, number][] = [[210, 800], [540, 620], [870, 800]];
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={640} y={430} p={p(0, 0.45)} o={1 - back} solid />
      <Tag i={1} x={880} y={430} p={p(0, 0.65)} o={1 - back} solid />
      <Tag i={2} x={210} y={950} p={p(1, 0.1)} o={1 - back} />
      <Tag i={3} x={540} y={765} p={p(1, 0.4)} o={1 - back} />
      <Tag i={4} x={850} y={950} p={p(1, 0.7)} o={1 - back} />
    </>}>
      <g>
        <G x={230} y={300} s={p(0)}><Clock r={120} hour={9} /></G>
        {[640, 880].map((x, i) => (
          <G key={x} x={x} y={285} s={p(0, 0.4 + i * 0.2)}>
            <Box cx={0} cy={0} w={200} h={190} rx={16} fill={TXT} />
            <Box cx={0} cy={-65} w={200} h={60} rx={16} fill={GOLD} />
            <G y={30}><Table cols={4} rows={2} w={170} h={100} lit={3} base="#CFCBBF" /></G>
          </G>
        ))}
        <path d="M60 880 Q210 800 380 720 T700 700 T1020 880" fill="none" stroke={HOV} strokeWidth={40} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - road} />
        {stations.map(([x, y], i) => (
          <G key={i} x={x} y={y} s={(i === 0 ? lerp(1, 1.5, zoom) : 1) * p(1, 0.08 + i * 0.3)}>
            <circle r={78} fill={EL} stroke={GOLD} strokeWidth={6} />
            {i === 0 && <Lock s={0.95} />}
            {i === 1 && <G><Box cx={-14} cy={0} w={70} h={36} rx={8} fill={GOLD} /><path d="M20 -18 L62 -40 V40 L20 18 Z" fill={GOLDL} /></G>}
            {i === 2 && [0, 1, 2, 3].map((k) => <G key={k} x={k * 4 - 6} y={-k * 7 + 10}><Box cx={0} cy={0} w={70} h={84} rx={6} fill={k % 2 ? TXT : "#CFCBBF"} /></G>)}
          </G>
        ))}
        {[0, 1, 2, 3, 4].map((i) => {
          const s = stair;
          return <Box key={i} cx={300 + i * 120} cy={1270 - i * 42 * s} w={118} h={36 + i * 84 * s} rx={6} fill={GOLD} opacity={Math.min(1, s)} />;
        })}
        <G x={lerp(300, 540, l(2, 0.4, 44))} y={lerp(1219, 1051, l(2, 0.4, 44))} s={Math.min(1, stair) * 0.75}><Person /></G>
        <G x={110} y={1190} s={p(2, 0.1, 9)} r={-10}><Stamp r={72} /></G>
        {[0, 1, 2].map((i) => (
          <G key={i} x={lerp(860 + i * 28, 1300, clear)} y={1020 + i * 70} r={clear * 120} s={p(3, 0, 12)}>
            <Box cx={0} cy={0} w={150} h={54} rx={10} fill={EL} stroke={SEC} strokeWidth={4} />
            <Lines x={-55} y={-14} w={110} n={2} gap={20} color={SEC} t={8} />
          </G>
        ))}
        <G x={210} y={800} s={zoom}>
          <path d="M-120 44 H120" stroke={GOLD} strokeWidth={14} strokeDasharray="30 12" />
          <G x={lerp(180, 190, zoom)} y={40}><AI size={80} /></G>
        </G>
      </g>
      <rect x={0} y={0} width={W} height={H} fill={INK} opacity={back} />
      <G x={850} y={290} s={back * 0.9}><Sun r={110} rot={f * 0.3} /></G>
      <G x={500} y={760 + shake} s={lerp(1.6, 0.95, slam)} o={Math.min(1, slam)}>
        <Chat w={860} h={640}>
          <G x={110} y={-110}><Bubble w={520} h={190} n={3} /></G>
          <G x={370} y={-262}><Bell r={Math.sin(f * 0.9) * 18} /></G>
          <circle cx={398} cy={-290} r={16} fill={RED} />
        </Chat>
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
      <div style={{ position: "absolute", left: 0, right: 0, top: 845, textAlign: "center", fontSize: 44, fontWeight: 600, lineHeight: 1.35, color: TXT, opacity: l(0, 0.7, 12) }}>
        <Label i={2} />
      </div>
      <div style={{ position: "absolute", left: "50%", top: 950, transform: `translateX(-50%) scale(${p(1, 0.1)})`, fontSize: 40, fontWeight: 700, lineHeight: 1.35, color: GOLDL, border: `3px solid ${GOLD}`, background: "#1E1A10", padding: "12px 44px 14px", borderRadius: 999, whiteSpace: "nowrap" }}>
        <Label i={1} />
      </div>
    </>}>
      <circle cx={540} cy={390} r={262} fill="none" stroke={GOLD} strokeWidth={7} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} transform="rotate(-90 540 390)" />
      <circle cx={540} cy={390} r={286} fill="none" stroke={HOV} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} transform="rotate(90 540 390)" />
      <rect x={540 - 210 * line} y={808} width={420 * line} height={3} rx={1.5} fill={GOLD} />
    </Stage>
  );
};
