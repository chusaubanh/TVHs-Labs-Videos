import React from "react";
import { AI, Arrow, Box, Bubble, Chat, Clock, Doc, EL, Floor, G, GOLD, GOLDL, HOV, INK, Lines, Person, Question, RED, SEC, Spark, Stage, Stamp, SURF, Table, Tag, TXT, W, XL, lerp, useT } from "../mo-dau/art";

export const Bug: React.FC<{ s?: number; r?: number }> = ({ s = 1, r = 0 }) => (
  <G s={s} r={r}>
    {[-1, 1].map((side) => [-22, 0, 22].map((y) => <line key={`${side}${y}`} x1={side * 22} y1={y} x2={side * 58} y2={y + (y / 22) * 16} stroke={RED} strokeWidth={8} strokeLinecap="round" />))}
    <ellipse rx={32} ry={44} fill={RED} />
    <circle cy={-48} r={18} fill={RED} />
    <line x1={0} y1={-26} x2={0} y2={40} stroke={INK} strokeWidth={5} />
  </G>
);

export const Crate: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={110} h={100} rx={8} fill="#B98D4F" />
    <path d="M-55 -18 H55 M-55 18 H55 M-18 -50 V50 M18 -50 V50" stroke="#7A5A2E" strokeWidth={6} />
  </g>
);

export const Cal: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={120} h={110} rx={12} fill={TXT} />
    <Box cx={0} cy={-38} w={120} h={34} rx={12} fill={GOLD} />
    <G y={18}><Table cols={4} rows={2} w={100} h={56} lit={2} base="#CFCBBF" /></G>
  </g>
);

export const Building: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={170} h={250} rx={8} fill={HOV} stroke={GOLD} strokeWidth={4} />
    {Array.from({ length: 12 }, (_, i) => <rect key={i} x={-58 + (i % 3) * 46} y={-98 + Math.floor(i / 3) * 44} width={26} height={28} rx={4} fill={i % 4 ? GOLDL : INK} />)}
    <Box cx={0} cy={100} w={40} h={50} fill={INK} />
  </G>
);

export const Hook: React.FC = () => {
  const { f, p, l } = useT();
  const slam = p(0, 0.45, 9);
  const cloud = p(3, 0.1, 15);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={330} y={700} p={slam} solid color={RED} size={44} />
      <Tag i={1} x={790} y={705} p={p(1, 0.45)} solid size={44} />
    </>}>
      <G x={320} y={420} s={p(0, 0, 11) * 1.35}>
        <AI size={250} />
      </G>
      <G x={330 + Math.sin(f * 0.8) * 10 * (1 - slam)} y={590} r={-18} s={p(0, 0.1) * (1 - slam)}><rect x={-14} y={-60} width={28} height={110} rx={10} fill={SEC} /></G>
      <G x={320} y={420} s={slam} r={-12}><Stamp r={190} color={RED} /></G>
      <G x={790} y={460} s={p(1)}>
        <Person s={2.6} fill={TXT} />
        <G y={-190} s={p(1, 0.35, 9)} r={Math.sin(f * 0.4) * 10}><Bug s={0.65} /></G>
      </G>
      <G x={540} y={960} s={p(2, 0.05, 9) * 1.1 * (1 - cloud * 0.4)} o={1 - cloud * 0.75}><Question /></G>
      <G x={540} y={lerp(1800, 1190, cloud)}>
        {[[-300, 30, 150], [-120, -40, 190], [100, -30, 200], [300, 30, 150], [0, 70, 240]].map(([x = 0, y = 0, r = 0], i) => <circle key={i} cx={x} cy={y} r={r} fill={i === 4 ? "#2B2214" : "#332A1A"} stroke={GOLD} strokeWidth={3} />)}
      </G>
    </Stage>
  );
};

export const TinhHuong: React.FC = () => {
  const { p, l } = useT();
  const send = l(2, 0.55, 22);
  const mail = l(2, 0.55, 26);
  const pressed = l(2, 0.45, 5);
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={290} y={205} p={p(0, 0.25)} solid />
      <Tag i={1} x={780} y={205} p={p(1, 0.25)} />
      <Tag i={2} x={540} y={895} p={p(2, 0.7)} solid />
    </>}>
      <G x={540} y={480} s={p(0)}>
        <Chat w={960} h={490} lit>
          <G x={120} y={40} s={p(1)}>
            <Doc w={560} h={320} n={8} />
            <G x={250} y={130} s={p(1, 0.25, 9)}><Stamp r={68} /></G>
          </G>
        </Chat>
      </G>
      <G x={165} y={570} s={p(0, 0.2) * 0.7}><Clock r={100} hour={8} /></G>
      <G x={165} y={395} s={p(0, 0.35) * 0.7}><AI size={130} /></G>
      <G x={855} y={800} s={p(2)}>
        <Box cx={0} cy={0} w={260} h={92} rx={46} fill={pressed > 0.5 ? GOLDL : GOLD} />
        <path d="M-30 -24 L34 0 L-30 24 L-16 0 Z" fill={INK} />
      </G>
      <g transform={`translate(${lerp(680, 868, l(2, 0.1, 12))} ${lerp(1000, 806, l(2, 0.1, 12))})`} opacity={Math.min(1, p(2)) * (1 - send)}>
        <path d="M0 0 L0 62 L16 48 L30 76 L44 68 L30 42 L52 40 Z" fill={TXT} stroke={INK} strokeWidth={4} />
      </g>
      <G x={lerp(780, 540, mail)} y={lerp(800, 970, mail)} s={mail > 0 && mail < 1 ? 1 : 0}>
        <Box cx={0} cy={0} w={120} h={80} rx={8} fill={GOLDL} />
        <path d="M-60 -40 L0 8 L60 -40" fill="none" stroke={INK} strokeWidth={5} />
      </G>
      {Array.from({ length: 9 }, (_, i) => {
        const on = l(2, 0.72 + i * 0.03, 4);
        return <G key={i} x={80 + i * 115} y={1100} s={p(2, 0.55 + i * 0.02) * 0.95}><Person fill={on > 0.5 ? TXT : SEC} /></G>;
      })}
      <Floor y={1210} />
    </Stage>
  );
};

export const TinNhan: React.FC = () => {
  const { f, p } = useT();
  const q = (i: number) => p(1, 0.08 + i * 0.32);
  return (
    <Stage bg="#120D0B" overlay={<>
      <Tag i={0} x={260} y={460} p={p(0, 0.15)} solid />
      <Tag i={1} x={180} y={1010} p={q(0)} size={36} />
      <Tag i={2} x={540} y={1010} p={q(1)} size={36} />
      <Tag i={3} x={900} y={1010} p={q(2)} size={36} />
    </>}>
      <G x={260} y={290} s={p(0)}><Clock r={130} hour={3} minute={(f % 60)} /></G>
      {Array.from({ length: 8 }, (_, i) => {
        const t = p(0, 0.15 + i * 0.09, 12);
        return (
          <G key={i} x={lerp(1300, 560 + (i % 2) * 300, t)} y={230 + Math.floor(i / 2) * 170} r={(i % 3) - 1}>
            <Bubble w={260} h={120} n={2} fill={RED} ink="#3A1212" />
          </G>
        );
      })}
      <G x={180} y={870} s={q(0)}><Box cx={0} cy={0} w={310} h={210} rx={34} fill={EL} stroke={GOLD} strokeWidth={5} /><G s={1.2}><Crate /></G></G>
      <G x={540} y={870} s={q(1)}><Box cx={0} cy={0} w={310} h={210} rx={34} fill={EL} stroke={GOLD} strokeWidth={5} /><G s={1.2}><Cal /></G></G>
      <G x={900} y={870} s={q(2)}><Box cx={0} cy={0} w={310} h={210} rx={34} fill={EL} stroke={GOLD} strokeWidth={5} /><Stamp r={70} /></G>
      <G x={540} y={1190} s={q(2) * 0.6}><Question /></G>
      <Floor y={1290} />
    </Stage>
  );
};

export const ThuPham: React.FC = () => {
  const { p, l } = useT();
  const go = l(1, 0.1, 28);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={610} p={p(1, 0.75)} solid />
      <Tag i={1} x={540} y={1015} p={p(2, 0.7)} color={RED} size={46} />
    </>}>
      <G x={540} y={360} s={p(0) * 1.4}><AI size={190} /></G>
      <G x={800} y={230} s={p(0, 0.25) * 0.55} o={1 - l(1, 0, 8)}><Question /></G>
      <G x={lerp(150, 540, Math.min(1, go * 2))} y={360} s={go < 0.5 ? 1 : 0}><Doc w={170} h={220} n={5} /></G>
      <G x={lerp(540, 900, Math.max(0, go * 2 - 1))} y={360} s={go >= 0.5 ? 1 : 0}><Doc w={170} h={220} n={5} /></G>
      <G x={150} y={360} s={p(1, 0.02)} o={go > 0 ? 0.35 : 1}><Doc w={170} h={220} n={5} /></G>
      <G x={900} y={210} s={p(1, 0.75, 9) * 0.7}><Stamp r={70} /></G>
      <G x={540} y={1200} s={p(2)}><Person s={1.7} /></G>
      {[{ x: 180, c: <Crate /> }, { x: 540, c: <Cal /> }, { x: 900, c: <Stamp r={56} /> }].map(({ x, c }, i) => (
        <G key={x} x={x} y={820} s={p(2, 0.1 + i * 0.15)}>
          <Box cx={0} cy={0} w={280} h={230} rx={28} fill="none" stroke={SEC} strokeWidth={6} strokeDasharray="18 14" />
          <g opacity={0.7}>{c}</g>
          <line x1={i === 1 ? 0 : (540 - x) * 0.3} y1={120} x2={(540 - x) * 0.6} y2={230} stroke={SEC} strokeWidth={5} strokeDasharray="8 12" />
        </G>
      ))}
    </Stage>
  );
};

export const BanDo: React.FC = () => {
  const { f, p, l } = useT();
  const unfold = l(0, 0.15, 22);
  const land = p(1, 0, 16);
  const off = p(2, 0.15, 12);
  return (
    <Stage bg={SURF} overlay={<>
      <Tag i={0} x={640} y={195} p={p(0, 0.5)} solid />
      <Tag i={1} x={200} y={720} p={p(1, 0.1)} />
      <Tag i={2} x={830} y={1010} p={p(1, 0.75)} />
      <Tag i={3} x={540} y={630} p={p(2, 0.65)} solid color={RED} />
    </>}>
      <G x={150} y={390} s={p(0)}><Person s={1.9} /></G>
      <Arrow x1={270} y1={360} x2={340} y2={360} p={l(0, 0.1, 8)} />
      <G x={640} y={380}>
        <g transform={`scale(${Math.max(0.05, unfold)} 1)`}>
          <Box cx={0} cy={0} w={560} h={310} rx={6} fill={GOLDL} />
          {[-187, 0, 187].map((x) => <line key={x} x1={x} x2={x} y1={-155} y2={155} stroke="#A88E5A" strokeWidth={3} />)}
          <path d="M-240 90 Q-120 -60 0 30 T240 -80" fill="none" stroke={INK} strokeWidth={8} strokeDasharray="20 12" />
          <rect x={-40} y={-40} width={70} height={70} rx={6} fill={INK} />
        </g>
      </G>
      <G y={lerp(760, 0, land)}>
        <path d="M0 860 Q270 790 540 840 T1080 800 V1350 H0 Z" fill="#2B2214" stroke={GOLD} strokeWidth={4} />
        <G x={540} y={990} s={1.05}><Building /></G>
        <G x={230} y={1090} s={p(1, 0.35)}><Doc w={210} h={260} n={7} /></G>
        {[0, 1, 2].map((i) => (
          <G key={i} x={800 + i * 90} y={1180 - (i % 2) * 40} s={p(1, 0.75 + i * 0.05) * 0.85}>
            <Box cx={0} cy={0} w={80} h={80} rx={10} fill="none" stroke={GOLDL} strokeWidth={5} strokeDasharray="10 8" />
          </G>
        ))}
      </G>
      <G x={lerp(640, 600, off)} y={lerp(380, 930, off)} s={off} r={7}>
        <Box cx={0} cy={0} w={760} h={420} rx={6} fill="none" stroke={RED} strokeWidth={8} strokeDasharray="22 16" />
      </G>
      <G x={220} y={800} s={p(2, 0.45) * 0.5} r={Math.sin(f * 0.3) * 6}><Question color={RED} /></G>
      <G x={950} y={850} s={p(2, 0.55) * 0.5} r={-Math.sin(f * 0.3) * 6}><Question color={RED} /></G>
    </Stage>
  );
};

export const HaiVung: React.FC = () => {
  const { f, p, l } = useT();
  const sweep = l(3, 0.15, 40);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={280} y={200} p={p(0, 0.3)} solid />
      <Tag i={1} x={800} y={200} p={p(0, 0.5)} />
      <Tag i={2} x={280} y={395} p={p(1, 0.45)} size={34} />
      <Tag i={3} x={280} y={560} p={p(1, 0.65)} size={34} />
      <Tag i={4} x={280} y={725} p={p(1, 0.85)} size={34} />
      <Tag i={5} x={800} y={450} p={p(2, 0.6)} size={34} color={RED} />
      <Tag i={6} x={800} y={690} p={p(2, 0.85)} size={34} color={RED} />
    </>}>
      <circle cx={280} cy={520} r={280 * p(0)} fill={sweep > 0.5 ? "#4A3A1C" : "#3A2E18"} stroke={GOLD} strokeWidth={8} />
      <circle cx={800} cy={520} r={280 * p(0, 0.25)} fill="#17171A" stroke={SEC} strokeWidth={8} strokeDasharray="26 18" />
      <G x={800} y={350} s={p(2, 0.55)}>
        <rect x={-6} y={-48} width={12} height={90} fill={GOLDL} />
        <rect x={-74} y={-44} width={148} height={10} rx={5} fill={GOLDL} />
        <path d="M-60 -34 L-84 22 H-36 Z M60 -34 L36 22 H84 Z" fill={GOLD} />
      </G>
      <G x={800} y={590} s={p(2, 0.8) * 0.9}>
        <Table cols={3} rows={2} w={190} h={90} lit={3} />
        <circle cx={60} cy={22} r={30} fill="none" stroke={RED} strokeWidth={7} />
      </G>
      <G x={lerp(140, 930, sweep)} y={950} s={p(3)}>
        <circle r={72} fill="rgba(224,194,134,0.2)" stroke={GOLDL} strokeWidth={13} />
        <line x1={52} y1={52} x2={108} y2={108} stroke={GOLD} strokeWidth={20} strokeLinecap="round" />
      </G>
      <G x={540} y={1190} s={p(3, 0.05)}><AI size={190} /></G>
      <path d={`M540 1090 L${lerp(140, 930, sweep)} 1020`} stroke={GOLD} strokeWidth={5} strokeDasharray="8 14" opacity={Math.min(1, p(3))} />
    </Stage>
  );
};

export const BaMoc: React.FC = () => {
  const { p, l } = useT();
  const line = l(1, 0.05, 30);
  const xs = [190, 540, 890];
  return (
    <Stage bg="#100E0A" overlay={<>
      <Tag i={0} x={540} y={490} p={p(0, 0.3)} solid />
      <Tag i={1} x={540} y={600} p={p(1, 0.2)} size={46} />
      {xs.map((x, i) => <Tag key={x} i={2 + i} x={x} y={900} p={p(2, 0.05 + i * 0.32)} size={36} />)}
    </>}>
      <G x={540} y={300} s={p(0)}>
        <Chat w={840} h={330}>
          <G x={220} y={20}><Spark r={70} /></G>
          <G x={40} y={20}><Spark r={70} fill={XL} /></G>
        </Chat>
      </G>
      <line x1={80} x2={lerp(80, 1000, line)} y1={760} y2={760} stroke={GOLD} strokeWidth={12} strokeLinecap="round" />
      {xs.map((x, i) => (
        <G key={x} x={x} y={760} s={p(1, 0.15 + i * 0.2)}>
          <circle r={62} fill={INK} stroke={GOLDL} strokeWidth={9} />
          {Array.from({ length: i + 1 }, (_, k) => <circle key={k} cx={(k - i / 2) * 26} r={10} fill={GOLDL} />)}
        </G>
      ))}
      <G x={190} y={1110} s={p(2, 0.05)}><Box cx={0} cy={0} w={230} h={270} rx={10} fill={TXT} /></G>
      <G x={540} y={1110} s={p(2, 0.37)}>
        <Doc w={230} h={270} n={3} />
        <G x={60} y={50} r={35}><rect x={-13} y={-110} width={26} height={140} rx={6} fill={GOLD} /></G>
      </G>
      <G x={890} y={1110} s={p(2, 0.7)}><Doc w={230} h={270} n={7} /></G>
    </Stage>
  );
};
