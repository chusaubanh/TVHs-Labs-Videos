import React from "react";
import { HOOK_BUBBLE, HookChipRow, HookPromptBubble } from "./scenes-1";
import { AI, Arrow, Bubble, Box, Doc, BrandEnd, EL, Floor, Folder, G, GOLD, GOLDL, Hand, HOV, INK, Lines, Lock, PAPER, Person, RED, SEC, Spark, Stage, SURF, Table, Tag, TXT, lerp, useT } from "../shared/art";
import { clamp01, Cursor, Disk, FileIcon, Laptop, MarkClaude, MarkGpt, NumChip, Win } from "../bai-1/art";
import { Bot, Loupe, Pen } from "../bai-2/art";
import { Boss } from "../bai-3/art";
import { Bang, Shield, Tick } from "../bai-4/art";
import { Page } from "../bai-6/art";

const sin = Math.sin;

/* ------------------------------------------------------------------ */
/* Cảnh 13: trình duyệt bị kính chặn, ứng dụng ngồi lên ổ đĩa, cài nhanh */
/* ------------------------------------------------------------------ */
export const BanWebVaUngDung: React.FC = () => {
  const { f, p, l } = useT();
  const slide = l(0, 0, 14);
  const bx = lerp(430, 275, slide);
  const dim = lerp(1, 0.55, l(0, 0.4, 14));
  const gone = 1 - l(2, 0, 8);
  const mach = l(0, 0.1, 16);
  const mt = l(2, 0, 14);
  const glass = p(1, 0) * gone;
  const r1 = l(1, 0.12, 12);
  const r2 = l(1, 0.5, 10);
  const drop = l(2, 0.05, 14);
  const stream = l(2, 0.35, 10) * (1 - l(3, 0.55, 8));
  const bar = l(3, 0.02, 10);
  const barOut = l(3, 0.38, 6);
  const icon = p(3, 0.42);
  const solid = l(3, 0.4, 8);
  const mxx = lerp(790 + (1 - mach) * 460, 540, mt);
  const myy = lerp(640, 790, mt);
  const ms = lerp(1, 1.62, mt);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={bx} y={322} p={p(0, 0.35)} solid size={34} o={1 - l(1, 0, 6)} />
      <Tag i={1} x={790} y={905} p={p(1, 0.1)} solid size={34} o={1 - l(2, 0, 6)} />
      <Tag i={2} x={540} y={312} p={p(2, 0.3)} solid size={34} o={1 - l(3, 0, 6)} />
      <Tag i={3} x={540} y={312} p={p(3, 0.05)} solid size={36} />
    </>}>
      {/* Trình duyệt bên trái: khung chat web, mờ đi như bị gạt sang một bên. */}
      <G x={bx} y={630 + 4 * sin(f / 18)} s={p(0, 0)} o={dim * gone}>
        <Box cx={0} cy={0} w={390} h={520} rx={28} fill={EL} stroke={HOV} strokeWidth={5} />
        {[0, 1, 2].map((k) => <circle key={k} cx={-160 + k * 30} cy={-232} r={8} fill={k === 0 ? GOLD : HOV} />)}
        <rect x={-175} y={-208} width={350} height={40} rx={20} fill={HOV} />
        <rect x={-148} y={-192} width={140} height={12} rx={6} fill={SEC} />
        <G x={-70} y={-96}><Bubble w={200} h={70} fill={HOV} n={1} ink={TXT} /></G>
        <G x={50} y={18}><Bubble w={230} h={86} fill={GOLD} n={2} ink={INK} /></G>
        <G x={-40} y={118} s={0.8}><Spark r={26} fill={GOLDL} /></G>
        <Box cx={0} cy={206} w={330} h={56} rx={28} fill={SURF} stroke={HOV} strokeWidth={4} />
        <rect x={-140} y={200} width={110} height={12} rx={6} fill={HOV} />
      </G>

      {/* Tấm kính trong suốt giữa hai bên. */}
      <G x={530} y={650} o={glass}>
        <Box cx={0} cy={0} w={30} h={560 * glass} rx={14} fill={TXT} opacity={0.14} stroke={TXT} strokeWidth={3} />
        <line x1={-8} y1={-200 * glass} x2={8} y2={-110 * glass} stroke={TXT} strokeWidth={3} opacity={0.5} />
        <line x1={-8} y1={30 * glass} x2={8} y2={120 * glass} stroke={TXT} strokeWidth={3} opacity={0.5} />
      </G>
      {/* Tia nhìn đụng kính rồi dội ngược. */}
      <g opacity={gone}>
        <Arrow x1={410} y1={640} x2={512} y2={680} p={r1} color={GOLDL} w={7} dash />
        <Arrow x1={512} y1={680} x2={430} y2={722} p={r2} color={GOLDL} w={7} dash />
        <G x={516} y={682} s={r1 * (0.7 + 0.3 * sin(f / 4))}>
          <Spark r={28} fill={GOLDL} />
        </G>
      </g>

      {/* Chiếc máy tính: màn hình nằm ngang, bên dưới là ổ cứng có khay và đèn. */}
      <g transform={`translate(${mxx} ${myy}) scale(${ms}) translate(-790 -640)`}>
        <Box cx={790} cy={520} w={400} h={290} rx={30} fill={EL} stroke={GOLD} strokeWidth={6} />
        <Box cx={790} cy={520} w={360} h={250} rx={20} fill={SURF} stroke={HOV} strokeWidth={4} />
        <Box cx={790} cy={700} w={60} h={60} fill={HOV} />
        <Box cx={790} cy={790} w={400} h={110} rx={22} fill={TXT} />
        <Box cx={700} cy={790} w={150} h={64} rx={12} fill={INK} />
        <G x={700} y={795}><Folder s={0.3} /></G>
        <rect x={790} y={782} width={150} height={8} rx={4} fill={HOV} />
        <circle cx={906} cy={812} r={8} fill={GOLD} />
        <circle cx={932} cy={812} r={8} fill={HOV} />
        {/* Luồng sáng vàng chảy từ ổ cứng lên cửa sổ. */}
        {[720, 860].map((x) => (
          <g key={x} opacity={stream}>
            <line x1={x} y1={730} x2={x} y2={645} stroke={GOLDL} strokeWidth={6} opacity={0.45} />
            {[0, 1, 2].map((k) => {
              const t = ((f / 26) + k / 3) % 1;
              return <circle key={k} cx={x} cy={lerp(730, 645, t)} r={9} fill={GOLD} opacity={sin(Math.PI * t)} />;
            })}
          </g>
        ))}
        <G y={-(1 - drop) * 300} o={drop}>
          <Box cx={790} cy={520} w={330} h={230} rx={24} fill={EL} />
          <path d="M625 449 H955" stroke={HOV} strokeWidth={4} />
          {[0, 1, 2].map((k) => <circle key={k} cx={655 + k * 26} cy={427} r={8} fill={k === 0 ? GOLD : HOV} />)}
          <Box cx={790} cy={520} w={330} h={230} rx={24} fill="none" stroke={GOLD} strokeWidth={5} strokeDasharray="14 12" opacity={1 - solid} />
          <Box cx={790} cy={520} w={330} h={230} rx={24} fill="none" stroke={GOLD} strokeWidth={6} opacity={solid} />
          <g opacity={1 - barOut}>
            <Box cx={790} cy={545} w={230} h={20} rx={10} fill={HOV} />
            <rect x={675} y={535} width={230 * bar} height={20} rx={10} fill={GOLD} />
          </g>
          <G x={790} y={545} s={icon}><AI size={110} /></G>
        </G>
      </g>
      <Floor y={1240} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
/* Cảnh 14: link chính thức, hai làn song song, tải app, đăng nhập, mở thư mục */
/* ------------------------------------------------------------------ */
const AppIcon: React.FC<{ kind: 0 | 1 }> = ({ kind }) => (
  <g>
    <Box cx={0} cy={0} w={116} h={116} rx={30} fill={INK} stroke={GOLD} strokeWidth={6} />
    {kind === 0 ? (
      <g>
        <path d="M-26 -18 L-4 2 L-26 22" fill="none" stroke={GOLD} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        <rect x={6} y={16} width={30} height={9} rx={4} fill={GOLDL} />
      </g>
    ) : (
      <MarkClaude r={36} />
    )}
  </g>
);

const Lane: React.FC<{ y: number; kind: 0 | 1; on: number; drop: number; arr: number; glow: number; f: number }> = ({ y, kind, on, drop, arr, glow, f }) => (
  <G x={-(1 - on) * 80} o={on}>
    <Box cx={540} cy={y} w={820} h={150} rx={30} fill={SURF} stroke={HOV} strokeWidth={5} />
    <circle cx={225} cy={y} r={78} fill="none" stroke={GOLDL} strokeWidth={5} opacity={glow * (0.4 + 0.4 * sin(f / 8))} />
    <G x={225} y={y}>{kind === 0 ? <MarkGpt r={56} /> : <MarkClaude r={56} />}</G>
    <G x={278} y={y - 48}>
      <circle r={25} fill={GOLD} stroke={INK} strokeWidth={4} />
      <circle r={15} fill="none" stroke={GOLDL} strokeWidth={3} />
      <Spark r={9} fill={INK} />
    </G>
    <Arrow x1={330} y1={y} x2={440} y2={y} p={arr} color={GOLDL} w={7} />
    <G x={545} y={lerp(y - 280, y, drop)} o={drop}>
      <AppIcon kind={kind} />
    </G>
  </G>
);

export const TaiAppMoThuMuc: React.FC = () => {
  const { f, p, l } = useT();
  const vm = l(0, 0, 14);
  const vm2 = l(3, 0, 12);
  const vy = lerp(lerp(640, 345, vm), 290, vm2);
  const vs = lerp(lerp(1, 0.686, vm), 0.43, vm2);
  const tk = l(0, 0.45, 10) * (1 - l(3, 0, 6));
  const ticketTop = 500;
  const on1 = l(1, 0, 10);
  const on2 = l(2, 0, 10);
  const leave = l(3, 0, 10);
  // Câu 3
  const fall = l(3, 0.02, 10);
  const trayBar = l(3, 0.1, 10);
  const open = l(3, 0.2, 14);
  const chipIn = p(3, 0.3);
  const spin = l(3, 0.32, 12);
  const unlock = l(3, 0.44, 8);
  const arrowA = l(3, 0.52, 10);
  const btn = p(3, 0.56);
  const click = l(3, 0.67, 6);
  const dlg = p(3, 0.74, 12);
  const sel = l(3, 0.88, 6);
  const c1 = l(3, 0.56, 12);
  const c2 = l(3, 0.76, 12);
  const cx = lerp(lerp(940, 700, c1), 620, c2);
  const cy = lerp(lerp(950, 575, c1), 882, c2);
  const sx = Math.max(0.05, Math.abs(Math.cos(spin * Math.PI)));
  const rows = [-22, 40, 102];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={590} y={565} p={p(0, 0.55)} solid size={36} o={1 - l(1, 0, 6)} />
      <Tag i={1} x={770} y={780} p={p(1, 0.45)} solid size={30} o={1 - leave} />
      <Tag i={2} x={770} y={960} p={p(2, 0.45)} solid size={30} o={1 - leave} />
      <Tag i={3} x={290} y={655} p={p(3, 0.34)} solid size={30} />
      <Tag i={4} x={690} y={655} p={p(3, 0.58)} solid size={30} />
    </>}>
      {/* Khung video trượt lên và nhỏ lại. */}
      <G x={540} y={vy} s={vs}>
        <Box cx={0} cy={0} w={700} h={394} rx={30} fill={EL} stroke={HOV} strokeWidth={6} />
        <Box cx={0} cy={-14} w={650} h={300} rx={20} fill={SURF} />
        <G s={0.9 + 0.08 * sin(f / 12)}><path d="M-36 -62 L60 -14 L-36 34 Z" fill={GOLD} /></G>
        <rect x={-300} y={158} width={600} height={10} rx={5} fill={HOV} />
        <rect x={-300} y={158} width={380} height={10} rx={5} fill={GOLD} />
        <circle cx={80} cy={163} r={14} fill={GOLDL} />
      </G>
      {/* Thẻ link vàng treo xuống như tấm vé. */}
      <g opacity={tk > 0 ? 1 : 0}>
        {[400, 680].map((x) => (
          <g key={x}>
            <line x1={x} y1={480} x2={x} y2={ticketTop} stroke={GOLDL} strokeWidth={6} />
            <circle cx={x} cy={480} r={9} fill={GOLDL} />
          </g>
        ))}
        <g transform={`translate(540 ${ticketTop}) rotate(${1.2 * sin(f / 22)}) scale(1 ${tk})`}>
          <Box cx={0} cy={65} w={640} h={130} rx={26} fill={GOLD} />
          <circle cx={-320} cy={65} r={18} fill={INK} />
          <circle cx={320} cy={65} r={18} fill={INK} />
          <line x1={-190} y1={22} x2={-190} y2={108} stroke={INK} strokeWidth={4} strokeDasharray="8 10" opacity={0.5} />
          <G x={-265} y={68}><Shield s={0.7} color={GOLDL} /></G>
          <rect x={-10} y={43} width={110} height={44} rx={22} fill="none" stroke={INK} strokeWidth={9} />
          <rect x={70} y={43} width={110} height={44} rx={22} fill="none" stroke={INK} strokeWidth={9} />
        </g>
      </g>
      {/* Hai làn chạy song song, đồng thời. */}
      <G o={1 - leave} x={-leave * 120}>
        <path d="M220 565 H105 V780 H130" fill="none" stroke={GOLDL} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - l(1, 0, 12)} />
        <path d="M105 780 V960 H130" fill="none" stroke={GOLDL} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - l(2, 0, 12)} />
        <Lane y={780} kind={0} on={on1} drop={l(1, 0.25, 14)} arr={l(1, 0.2, 10)} glow={l(1, 0.1, 8)} f={f} />
        <Lane y={960} kind={1} on={on2} drop={l(2, 0.25, 14)} arr={l(2, 0.2, 10)} glow={l(2, 0.1, 8)} f={f} />
      </G>

      {/* Câu 3: khay tải đầy, cửa sổ app, rồi đăng nhập, Open Folder, chọn thư mục, dấu tích. */}
      <G o={l(3, 0, 8)}>
        <Box cx={540} cy={1115} w={500} h={80} rx={28} fill={SURF} stroke={HOV} strokeWidth={5} />
        <path d="M330 1095 V1132 M312 1114 L330 1134 L348 1114" fill="none" stroke={GOLD} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        <rect x={380} y={1109} width={360} height={12} rx={6} fill={HOV} />
        <rect x={380} y={1109} width={360 * trayBar} height={12} rx={6} fill={GOLD} />
      </G>
      <G x={540} y={lerp(430, 1108, fall * fall)} o={fall > 0 ? 1 - l(3, 0.2, 5) : 0}>
        <AI size={110} />
      </G>
      <G x={540} y={lerp(1110, 710, open)} s={open > 0 ? lerp(0.12, 1, open) : 0}>
        <Win w={880} h={580} stroke={GOLD}>
          <circle cx={400} cy={-262} r={20} fill={GOLDL} opacity={unlock} />
        </Win>
      </G>
      {/* Bước 1: thẻ đăng nhập xoay, ổ khoá mở. */}
      <g transform={`translate(290 550) scale(${sx * chipIn} ${chipIn})`}>
        <Box cx={0} cy={0} w={280} h={100} rx={26} fill={PAPER} />
        <circle cx={-92} cy={0} r={26} fill={SEC} />
        <rect x={-52} y={-16} width={100} height={12} rx={6} fill={SEC} />
        <rect x={-52} y={8} width={70} height={12} rx={6} fill={HOV} />
        <G x={102} y={6}><Lock s={0.45} open={unlock} /></G>
      </g>
      <Arrow x1={440} y1={550} x2={555} y2={550} p={arrowA} color={GOLDL} w={7} />
      {/* Bước 2: nút Open Folder. */}
      <G x={690} y={550} s={btn}>
        <Box cx={0} cy={0} w={270} h={100} rx={50} fill="rgba(197,160,89,0.14)" stroke={GOLD} strokeWidth={5} />
        <G x={-60} y={2}><Folder s={0.42} /></G>
        <Lines x={-10} y={-12} w={120} n={2} gap={24} color={SEC} t={11} />
      </G>
      <circle cx={690} cy={550} r={lerp(20, 80, click)} fill="none" stroke={GOLDL} strokeWidth={5} opacity={click > 0 ? 1 - click : 0} />
      {/* Bước 3: bảng chọn thư mục nằm trọn trong cửa sổ. */}
      <G x={540} y={850} s={dlg}>
        <Box cx={0} cy={0} w={800} h={260} rx={28} fill={EL} stroke={GOLD} strokeWidth={5} />
        <path d="M-400 -86 H400" stroke={HOV} strokeWidth={4} />
        <rect x={-360} y={-112} width={150} height={14} rx={7} fill={SEC} />
        {rows.map((y, k) => {
          const hit = k === 1 ? sel : 0;
          return (
            <g key={k}>
              <Box cx={0} cy={y} w={740} h={52} rx={16} fill={hit > 0 ? "rgba(197,160,89,0.18)" : SURF} stroke={hit > 0 ? GOLD : HOV} strokeWidth={hit > 0 ? 6 : 4} />
              <G x={-330} y={y}><Folder s={0.24} /></G>
              <rect x={-285} y={y - 7} width={260 - k * 40} height={14} rx={7} fill={SEC} />
            </g>
          );
        })}
      </G>
      <G x={cx} y={cy} o={l(3, 0.5, 5)}><Cursor s={0.9} /></G>
      <G x={880} y={1115} s={p(3, 0.95, 9)}>
        <Tick r={40} color={GOLD} ink={INK} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
/* Cảnh 15: giao việc bằng một câu, rồi tua ngược về hook, chip khớp chỗ */
/* ------------------------------------------------------------------ */
export const GiaoViecMotCau: React.FC = () => {
  const { f, p, l } = useT();
  const flip = l(1, 0, 10);
  const sx = Math.max(0.03, Math.abs(1 - 2 * flip));
  const second = flip >= 0.5;
  const type = l(0, 0.08, 28);
  const up = l(0, 0.4, 16);
  const tbl = l(0, 0.62, 16);
  const lit = Math.floor(l(0, 0.72, 26) * 8);
  const cur = l(0, 0, 14);
  const OFF: [number, number, number][] = [[-70, -150, -14], [40, -110, 12], [-30, -170, -9], [60, -90, 15], [-50, -130, 8]];
  const gone0 = 1 - l(1, 0, 4);
  const chipT = (k: number): number => l(1, 0.12 + k * 0.12, 10);
  const landed = chipT(4) >= 1;
  const glow = [0, 1, 2, 3, 4].map((k) => l(1, 0.22 + k * 0.12 + 0.1, 6));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={258} p={p(0, 0.02)} solid size={40} o={gone0} />
      <Tag i={1} x={551} y={440} p={p(0, 0.58)} size={34} o={gone0} />
      <Tag i={2} x={838} y={440} p={p(0, 0.65)} size={34} o={gone0} />
      <Tag i={3} x={650} y={510} p={p(0, 0.72)} size={34} o={gone0} />
      <Tag i={1} x={461} y={HOOK_BUBBLE.tag1.y} p={p(1, 0.2)} solid color={GOLD} size={HOOK_BUBBLE.tag1.size} o={second ? 1 : 0} />
      <Tag i={2} x={724} y={HOOK_BUBBLE.tag1.y} p={p(1, 0.27)} solid color={GOLD} size={HOOK_BUBBLE.tag1.size} o={second ? 1 : 0} />
      <Tag i={3} x={HOOK_BUBBLE.tag2.x} y={HOOK_BUBBLE.tag2.y} p={p(1, 0.34)} solid color={GOLD} size={HOOK_BUBBLE.tag2.size} o={second ? 1 : 0} />
      <Tag i={4} x={540} y={285} p={p(1, 0.74)} solid color={GOLDL} size={42} />
    </>}>
      <g transform={`translate(540 0) scale(${sx} 1) translate(-540 0)`}>
        {!second && (
          <g>
            <G x={540} y={625}><Win w={900} h={640} stroke={GOLD} /></G>
            {/* Cột trái: thư mục đã mở. */}
            <rect x={96} y={364} width={224} height={577} rx={18} fill={SURF} />
            <G x={208} y={470 + 4 * sin(f / 16)}><Folder s={0.62} open={1} /></G>
            <Lines x={130} y={590} w={150} n={5} gap={44} color={HOV} t={14} />
            {/* Ô nhập: thanh xám ngắn, con trỏ gõ. */}
            <Box cx={650} cy={905} w={600} h={60} rx={30} fill={SURF} stroke={HOV} strokeWidth={4} />
            <rect x={380} y={897} width={300 * type} height={16} rx={8} fill={GOLD} />
            <rect x={388 + 300 * type} y={886} width={5} height={38} fill={GOLDL} opacity={Math.floor(f / 8) % 2} />
            {/* Bong bóng ngắn trượt lên từ ô nhập. */}
            <G x={650} y={lerp(905, 470, up)} s={lerp(0.5, 1, up)} o={up}>
              <Bubble w={610} h={190} fill={GOLD} n={0} />
            </G>
            {/* Tấm bảng đối soát chảy ra từ thư mục. */}
            <G x={lerp(208, 650, tbl)} y={lerp(470, 735, tbl)} s={lerp(0.2, 1, tbl)} o={tbl}>
              <Box cx={0} cy={0} w={590} h={256} rx={22} fill={EL} stroke={HOV} strokeWidth={4} />
              <Table cols={4} rows={5} w={560} h={230} lit={lit} />
            </G>
            <G x={lerp(860, 700, cur)} y={lerp(760, 920, cur)} o={cur * (1 - l(0, 0.4, 6))}><Cursor s={0.8} /></G>
          </g>
        )}
        {second && (
          <g>
            {/* Đúng bố cục cảnh 1 câu 2: khung chat giữa mặt bàn, bong bóng ngắn, hàng chip thẳng ở y 820. */}
            <Box cx={540} cy={1200} w={860} h={34} rx={14} fill={GOLD} />
            <G x={180} y={1105} r={-6} s={0.9}><Doc w={150} h={200} n={4} fill={PAPER} /></G>
            <G x={900} y={1095} r={7} s={0.9}><Doc w={150} h={200} n={4} fill={PAPER} /></G>
            <G x={540} y={1045} s={1.25}>
              <Box cx={0} cy={0} w={150} h={190} rx={14} fill={PAPER} />
              <Box cx={0} cy={-68} w={150} h={54} rx={14} fill={GOLDL} />
              {[-22, 6, 34, 62].map((y) => <line key={y} x1={-58} x2={58} y1={y} y2={y} stroke={SEC} strokeWidth={4} />)}
              {[-20, 20].map((x) => <line key={x} x1={x} x2={x} y1={-22} y2={62} stroke={SEC} strokeWidth={4} />)}
            </G>
            <G x={540} y={560}>
              <Win w={700} h={400} stroke={GOLD}>
                <Lines x={-320} y={-100} w={170} n={3} gap={36} color={HOV} t={12} />
                <Lines x={150} y={-100} w={170} n={3} gap={36} color={HOV} t={12} />
                <Box cx={0} cy={160} w={620} h={50} rx={25} fill={SURF} stroke={HOV} strokeWidth={4} />
                <G x={-270} y={160}><Spark r={18} fill={GOLD} /></G>
              </Win>
            </G>
            <G x={HOOK_BUBBLE.x} y={HOOK_BUBBLE.y}><HookPromptBubble /></G>
            {landed ? (
              <G x={540} y={820}><HookChipRow glow={glow} /></G>
            ) : (
              [0, 1, 2, 3, 4].map((k) => {
                const t = chipT(k);
                const [dx, dy, dr] = OFF[k];
                return (
                  <G key={k} x={300 + k * 120 + dx * (1 - t) + sin(f / 3 + k) * 6 * (1 - t)} y={820 + dy * (1 - t)} r={dr * (1 - t)} s={0.85}>
                    <NumChip />
                  </G>
                );
              })
            )}
          </g>
        )}
      </g>
      <Floor y={1240} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
/* Cảnh 16: mười lăm phút, khỏi tua lại, bài hướng dẫn dưới video */
/* ------------------------------------------------------------------ */
export const MuoiLamPhutBaiHuongDan: React.FC = () => {
  const { f, p, l } = useT();
  const swp = l(0, 0.05, 20);
  const a = 90 * swp;
  const rad = (a * Math.PI) / 180;
  const R = 230;
  const m = l(1, 0, 12);
  const v2 = l(2, 0, 12);
  const vy = lerp(540, 350, v2);
  const vs = lerp(1, 0.686, v2);
  const rew = l(1, 0.4, 14);
  const ban = l(1, 0.55, 8);
  const reach = l(1, 0.25, 12);
  const retreat = l(1, 0.62, 14);
  const hy = lerp(lerp(1120, 770, reach), 850, retreat);
  const unroll = l(2, 0.02, 22);
  const sh = 575 * unroll;
  const rowOp = (y: number): number => clamp01((590 + sh - y) / 50);
  const cardIn = (fr: number): number => p(2, fr, 12);
  const tapX = l(2, 0.66, 10) * (1 - l(2, 0.78, 10));
  const fly = l(2, 0.8, 14);
  const flyOn = fly > 0 && fly < 1;
  const rowsY = [665, 760, 855, 950, 1045];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={875} p={p(0, 0.3)} solid size={44} o={1 - l(1, 0, 6)} />
      <Tag i={1} x={540} y={290} p={p(1, 0.15)} solid size={38} o={1 - l(2, 0, 6)} />
      <Tag i={2} x={355} y={530} p={p(2, 0.08)} solid size={34} />
      <Tag i={3} x={830} y={530} p={p(2, 0.32)} solid size={34} />
      <Tag i={4} x={830} y={758} p={p(2, 0.52)} solid size={34} />
    </>}>
      {/* Mặt đồng hồ: kim quét một phần tư, tô vàng; rồi thu về góc. */}
      <G x={lerp(540, 125, m)} y={lerp(560, 262, m) + 4 * sin(f / 20)} s={lerp(1, 0.22, m)}>
        <circle r={R + 16 * (0.5 + 0.5 * sin(f / 14))} fill="none" stroke={GOLDL} strokeWidth={5} opacity={0.3 * (1 - m)} />
        <circle r={R} fill={TXT} stroke={GOLD} strokeWidth={12} />
        <path d={`M0 0 L0 ${-R + 14} A${R - 14} ${R - 14} 0 0 1 ${(R - 14) * Math.sin(rad)} ${-(R - 14) * Math.cos(rad)} Z`} fill={GOLD} opacity={0.9} />
        {Array.from({ length: 12 }, (_, k) => (
          <line key={k} y1={-R + 12} y2={-R + 36} stroke={INK} strokeWidth={9} strokeLinecap="round" transform={`rotate(${k * 30})`} />
        ))}
        <line y1={0} y2={-R * 0.8} stroke={INK} strokeWidth={14} strokeLinecap="round" transform={`rotate(${a})`} />
        <circle r={16} fill={INK} />
      </G>

      {/* Khung video với thanh tua ở đáy. */}
      <G x={540} y={vy} s={vs * p(1, 0.05)}>
        <Box cx={0} cy={0} w={700} h={394} rx={30} fill={EL} stroke={HOV} strokeWidth={6} />
        <Box cx={0} cy={-14} w={650} h={300} rx={20} fill={SURF} />
        <path d="M-36 -62 L60 -14 L-36 34 Z" fill={GOLD} opacity={0.6} />
        <rect x={-300} y={158} width={600} height={10} rx={5} fill={HOV} />
        <rect x={-300} y={158} width={380} height={10} rx={5} fill={GOLD} />
        <circle cx={80} cy={163} r={14} fill={GOLDL} />
        {/* Biểu tượng tua lại (hai mũi tên vòng) mờ đi, bị gạch cấm. */}
        <G y={-14} o={0.55 * l(1, 0.05, 8)}>
          {[0, 180].map((r) => (
            <g key={r} transform={"rotate(" + r + ")"}>
              <path d="M-60 -10 A62 62 0 0 1 56 -26" fill="none" stroke={GOLDL} strokeWidth={16} strokeLinecap="round" />
              <path d="M74 -22 L40 -46 L38 -2 Z" fill={GOLDL} />
            </g>
          ))}
        </G>
        <G y={-14} s={ban}>
          <circle r={96} fill="none" stroke={RED} strokeWidth={14} />
          <line x1={-68} y1={-68} x2={68} y2={68} stroke={RED} strokeWidth={14} strokeLinecap="round" />
        </G>
      </G>
      {/* Bàn tay đưa tới rồi rụt về. */}
      <G x={615} y={hy} s={0.8} o={l(1, 0.2, 4) * (1 - l(2, 0, 6))}>
        <Hand />
      </G>

      {/* Tờ hướng dẫn cuộn mở xuống, năm bước và các dòng xám. */}
      {unroll > 0 && (
        <g>
          <Box cx={355} cy={590 + sh / 2} w={520} h={sh} rx={16} fill={PAPER} />
          <Box cx={355} cy={590 + sh} w={560} h={26} rx={13} fill={GOLD} />
          {rowsY.map((y, k) => (
            <g key={k} opacity={rowOp(y + 30)}>
              <circle cx={170} cy={y} r={30} fill="none" stroke={GOLD} strokeWidth={7} />
              <circle cx={170} cy={y} r={9} fill={GOLD} />
              <Lines x={225} y={y - 16} w={330} n={2} gap={26} color={SEC} t={10} />
            </g>
          ))}
        </g>
      )}
      {/* Thẻ link tải app và thẻ mẫu câu lệnh ghim bên cạnh. */}
      <G y={-(1 - cardIn(0.3)) * 80} o={Math.min(1, cardIn(0.3))}>
        <line x1={615} y1={650} x2={660} y2={650} stroke={GOLDL} strokeWidth={5} strokeDasharray="6 8" />
        <Box cx={830} cy={650} w={340} h={130} rx={24} fill={EL} stroke={GOLD} strokeWidth={5} />
        <circle cx={830} cy={585} r={12} fill={GOLDL} />
        <G x={730} y={652}><Shield s={0.6} color={GOLD} /></G>
        <rect x={790} y={630} width={110} height={40} rx={20} fill="none" stroke={GOLDL} strokeWidth={7} />
        <rect x={860} y={630} width={80} height={40} rx={20} fill="none" stroke={GOLDL} strokeWidth={7} />
      </G>
      <G y={-(1 - cardIn(0.5)) * 80} o={Math.min(1, cardIn(0.5))}>
        <line x1={615} y1={870} x2={660} y2={870} stroke={GOLDL} strokeWidth={5} strokeDasharray="6 8" />
        <Box cx={830} cy={870} w={340} h={130} rx={24} fill={GOLD} />
        <circle cx={830} cy={805} r={12} fill={GOLDL} />
        <Lines x={680} y={845} w={300} n={2} gap={30} color={INK} t={13} />
      </G>
      {/* Ô dán nhận nội dung bay sang. */}
      <Box cx={830} cy={1085} w={340} h={100} rx={24} fill={SURF} stroke={GOLDL} strokeWidth={5} strokeDasharray="12 10" opacity={cardIn(0.5)} />
      <rect x={680} y={1070} width={200 * fly} height={13} rx={6} fill={GOLD} />
      <rect x={680} y={1094} width={130 * fly} height={13} rx={6} fill={GOLD} />
      {flyOn && [0, 1, 2].map((k) => (
        <rect key={k} x={lerp(760 + k * 40, 740 + k * 30, fly) - 40} y={lerp(870, 1085, fly) - 8 + k * 6 - 30 * sin(Math.PI * fly)} width={80} height={16} rx={8} fill={GOLDL} />
      ))}
      <G x={990 - 54 * tapX} y={880} r={-90} s={0.6} o={tapX}>
        <Hand />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
/* Cảnh 17: gõ thử một câu, app tự đọc file, trả lời y chang tờ nội quy */
/* ------------------------------------------------------------------ */
export const ThuTomTatQuyTac: React.FC = () => {
  const { f, p, l } = useT();
  const type = l(0, 0.1, 40);
  const send = l(0, 0.62, 16);
  const beam = l(1, 0.05, 16);
  const rep = p(1, 0.1, 14);
  const con = (k: number): number => l(1, 0.42 + k * 0.1, 12);
  const rows = [710, 785, 860];
  const glow = l(1, 0.02, 8);
  const bx = lerp(306, 415, beam);
  const by = lerp(700, 662, beam);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={238} p={p(0, 0.02)} solid size={40} o={1 - l(1, 0, 6)} />
      <Tag i={1} x={545} y={560} p={p(1, 0.05)} size={34} solid />
      <Tag i={2} x={830} y={560} p={p(1, 0.52)} solid size={30} />
      <Tag i={3} x={540} y={238} p={p(1, 0.88)} solid size={40} />
    </>}>
      <G x={540} y={680}><Win w={900} h={800} stroke={GOLD} /></G>
      <rect x={96} y={340} width={232} height={734} rx={18} fill={SURF} />
      {/* Cột trái: thư mục và tờ nội quy (file). */}
      <G x={212} y={450 + 4 * sin(f / 16)}><Folder s={0.62} open={0.6} /></G>
      <G x={212} y={790}>
        <Box cx={0} cy={0} w={190} h={250} rx={12} fill={PAPER} />
        <rect x={-70} y={-88} width={120} height={18} rx={9} fill={GOLD} />
        {[0, 1].map((k) => (
          <g key={k}>
            <circle cx={-70} cy={k * 75 - 5} r={7} fill={GOLD} />
            <rect x={-50} y={k * 75 - 11} width={110} height={12} rx={6} fill={SEC} />
          </g>
        ))}
        <Box cx={0} cy={0} w={206} h={266} rx={18} fill="none" stroke={GOLDL} strokeWidth={6} opacity={glow * (0.5 + 0.4 * sin(f / 5))} />
      </G>
      <G x={212} y={962} o={0.55 * (1 - l(1, 0.35, 10))} s={0.6}>
        <Box cx={-12} cy={-12} w={60} h={74} rx={10} fill="none" stroke={SEC} strokeWidth={6} />
        <Box cx={12} cy={12} w={60} h={74} rx={10} fill={SURF} stroke={SEC} strokeWidth={6} />
      </G>
      {/* Câu 0: ô nhập, thanh xám điền vào rồi gửi đi. */}
      <G x={660} y={620} s={1.4} o={0.55 * (1 - send)}><AI size={150} dim /></G>
      <Box cx={660} cy={960} w={580} h={52} rx={26} fill={SURF} stroke={HOV} strokeWidth={4} />
      <rect x={390} y={952} width={360 * type * (1 - send)} height={16} rx={8} fill={GOLD} />
      <rect x={398 + 360 * type * (1 - send)} y={941} width={5} height={38} fill={GOLDL} opacity={Math.floor(f / 8) % 2} />
      <G x={800} y={lerp(960, 440, send)} s={lerp(0.5, 1, send)} o={send}>
        <Bubble w={300} h={84} fill={GOLD} n={1} />
      </G>
      {/* Câu 1: khung trả lời, tia sáng vàng từ file bắn vào app (giữ lại đến cuối câu). */}
      <G x={665} y={765} s={rep}>
        <Box cx={0} cy={0} w={590} h={300} rx={26} fill={EL} stroke={HOV} strokeWidth={4} />
      </G>
      <G x={420} y={655} s={rep}><AI size={60} /></G>
      <g opacity={beam > 0 ? 1 : 0}>
        <line x1={306} y1={700} x2={bx} y2={by} stroke={GOLD} strokeWidth={12} strokeLinecap="round" opacity={0.8} />
        <G x={bx} y={by} s={0.8 + 0.2 * sin(f / 5)}><Spark r={26} fill={GOLDL} /></G>
      </g>
      {/* Mỗi dòng trả lời ghép với một dòng của tờ nội quy bằng vạch nối thẳng. */}
      {rows.map((y, k) => (
        <g key={k}>
          <rect x={308} y={y - 4} width={200 * con(k)} height={8} rx={4} fill={GOLD} />
          {k === 0 ? (
            <rect x={515} y={y - 9} width={300 * con(k)} height={18} rx={9} fill={GOLD} />
          ) : (
            <rect x={515} y={y - 7} width={(k === 1 ? 380 : 300) * con(k)} height={14} rx={7} fill={SEC} />
          )}
        </g>
      ))}
      <G x={885} y={865} s={p(1, 0.88, 9)}>
        <Tick r={40} color={GOLD} ink={INK} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
/* Cảnh 18: gấp xấp bài, bình luận gỡ nút kẹt, thẻ phản biện, màn kết */
/* ------------------------------------------------------------------ */
export const KetQuayLaiHook: React.FC = () => {
  const { f, p, l } = useT();
  // Câu 0
  const fold = l(0, 0.05, 10);
  const push = l(0, 0.3, 18);
  const scl = lerp(1, 0.6, push);
  const stX = lerp(540, 300, push);
  const stY = lerp(800, 380, push);
  const handIn = l(0, 0.12, 10);
  const tipX = stX + 210 * scl + 6;
  const hX = lerp(1150, tipX + 97, handIn);
  const lid = l(0, 0.55, 16);
  const s0 = 1 - l(1, 0, 8);
  // Câu 1
  const vIn = p(1, 0);
  const stuck = 1 - l(1, 0.8, 8);
  const hop = l(1, 0.3, 14);
  const back = l(1, 0.62, 16);
  const shake = stuck * 7 * sin(f * 1.7);
  const NX = [150, 345, 540, 735, 930];
  const s1 = 1 - l(2, 0, 8);
  // Câu 2
  const card = l(2, 0.0, 14) * (1 - l(3, 0, 10));
  const cardY = (1 - l(2, 0, 14)) * 900 + l(3, 0, 10) * 900;
  const scan = l(2, 0.2, 40);
  const mk = (k: number): number => l(2, 0.3 + k * 0.14, 8);
  const bossX = lerp(1120, 945, l(2, 0.25, 14));
  const MARKS: [number, number][] = [[-104, 200], [16, 260], [136, 170]];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={540} p={p(1, 0.12)} solid size={36} o={s1} />
      <Tag i={1} x={540} y={322} p={p(2, 0.02)} solid size={40} />
      <Tag i={2} x={540} y={440 + cardY} p={p(2, 0.1)} solid size={32} o={card} />
      <Tag i={3} x={340} y={1060 + cardY} p={p(2, 0.62)} solid size={34} o={card} />
      <Tag i={4} x={945} y={690} p={p(2, 0.3)} solid size={34} o={1 - l(3, 0, 6)} />
      {l(3, 0, 12) > 0 && <BrandEnd k={l(3, 0, 12)} />}
    </>}>
      {/* Câu 0: bàn làm việc, xấp bài gập lại đẩy sang bên, laptop mở lên. */}
      <G o={s0}>
        <Box cx={540} cy={1155} w={920} h={150} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} />
        <G x={540} y={1010}>
          <G s={1.2}>
            <Laptop open={lid}>
              <Box cx={0} cy={-340} w={600} h={40} rx={20} fill={SURF} />
              {[0, 1, 2].map((k) => <circle key={k} cx={-270 + k * 26} cy={-340} r={8} fill={k === 0 ? GOLD : HOV} />)}
              <G x={0} y={-215} s={0.7}><HookPromptBubble /><Lines x={-230} y={-32} w={460} n={2} gap={56} color={INK} t={18} /></G>
              <Box cx={0} cy={-60} w={500} h={52} rx={26} fill={INK} stroke={HOV} strokeWidth={4} />
              <rect x={-220} y={-66} width={120} height={12} rx={6} fill={HOV} />
            </Laptop>
          </G>
        </G>
        <Pen x={860} y={360 + 4 * sin(f / 20)} r={70} s={1.6} />
        <G x={stX} y={stY} s={scl}>
          {[2, 1, 0].map((k) => (
            <G key={k} x={k * 16 - 16} y={k * 12 - 12} r={k * 3 - 3}>
              <Page w={420} h={540} fold={k === 0 ? fold : 0} />
            </G>
          ))}
        </G>
        <G x={hX} y={stY} r={-90} s={1.1} o={handIn}>
          <Hand />
        </G>
      </G>

      {/* Câu 1: khung video, đường các bước, nút kẹt, ô bình luận. */}
      <G o={s1}>
        <G x={540} y={345} s={vIn}>
          <Box cx={0} cy={0} w={500} h={281} rx={26} fill={EL} stroke={HOV} strokeWidth={5} />
          <Box cx={0} cy={-8} w={460} h={215} rx={16} fill={SURF} />
          <path d="M-26 -44 L42 -8 L-26 28 Z" fill={GOLD} />
          <rect x={-215} y={112} width={430} height={8} rx={4} fill={HOV} />
          <rect x={-215} y={112} width={270} height={8} rx={4} fill={GOLD} />
        </G>
        <line x1={150} y1={640} x2={930} y2={640} stroke={HOV} strokeWidth={8} strokeDasharray="14 12" opacity={vIn} />
        {NX.map((x, k) => {
          const isStuck = k === 2;
          const sh = isStuck ? shake : 0;
          return (
            <G key={k} x={x + sh} y={640} s={p(1, 0.04 + k * 0.05)}>
              <circle r={40} fill={SURF} stroke={isStuck ? GOLD : HOV} strokeWidth={6} />
              {k < 2 && <G s={0.8}><Tick r={34} color={GOLD} ink={INK} /></G>}
              {isStuck && <G s={0.45 * stuck}><Bang color={GOLD} /></G>}
              {isStuck && <circle r={50} fill="none" stroke={GOLDL} strokeWidth={5} opacity={stuck * (0.4 + 0.4 * sin(f / 5))} />}
            </G>
          );
        })}
        {/* Ô bình luận mở ra bên dưới. */}
        <G x={540} y={930} s={p(1, 0.08)}>
          <Box cx={0} cy={0} w={860} h={160} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} />
          <circle cx={-370} cy={0} r={42} fill={SEC} />
          <Lines x={-300} y={-26} w={500} n={2} gap={34} color={HOV} t={13} />
          <rect x={-300 + 300 * hop} y={-30} width={5} height={30} fill={GOLD} opacity={Math.floor(f / 8) % 2} />
          <path d="M310 -30 L378 0 L310 30 L326 0 Z" fill={GOLD} />
        </G>
        {/* Bong bóng nảy từ nút kẹt xuống ô bình luận, bong bóng trả lời bay ngược lên đỡ nút. */}
        <G x={540} y={lerp(700, 880, hop) - 70 * sin(Math.PI * hop)} s={hop > 0 && hop < 1 ? 1 : 0}>
          <Bubble w={170} h={64} fill={GOLD} n={1} />
        </G>
        <G x={540} y={lerp(880, 745, back)} s={back > 0 ? 1 : 0}>
          <Bubble w={190} h={70} fill={TXT} n={1} ink={SEC} />
        </G>
      </G>

      {/* Câu 2: thẻ bài sau, AI đeo kính soi văn bản bằng kính lúp, gạch đỏ dưới chỗ lỗi, sếp đứng ngoài thẻ. */}
      <G y={cardY} o={card > 0 ? 1 : 0}>
        <Box cx={540} cy={805} w={660} h={850} rx={36} fill={EL} stroke={GOLD} strokeWidth={6} />
        <Box cx={540} cy={806} w={620} h={810} rx={28} fill="none" stroke={HOV} strokeWidth={3} />
        <G x={330} y={650 + 6 * sin(f / 10)} s={1.2}>
          <Bot s={1.0} arm={0.4 + 0.3 * sin(f / 7)} />
          {[-30, 30].map((x) => <circle key={x} cx={x} cy={0} r={26} fill="none" stroke={TXT} strokeWidth={6} />)}
          <line x1={-4} y1={0} x2={4} y2={0} stroke={TXT} strokeWidth={6} />
        </G>
        <G x={640} y={870}>
          <Page w={380} h={480} />
          {MARKS.map(([y, w], k) => (
            <rect key={k} x={-170} y={y} width={w * mk(k)} height={9} rx={4} fill={RED} />
          ))}
        </G>
        <G x={lerp(720, 540, scan)} y={lerp(700, 1000, scan)} s={0.9}>
          <Loupe />
        </G>
      </G>
      <g opacity={card > 0 ? 1 : 0}>
        <Arrow x1={820} y1={800} x2={890} y2={800} p={l(2, 0.8, 12)} color={GOLDL} w={6} />
      </g>
      <G x={bossX} y={800} s={0.85} o={card > 0 || l(2, 0.25, 4) > 0 ? 1 : 0}>
        <Boss fill={SEC} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};
