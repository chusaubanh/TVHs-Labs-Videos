import React from "react";
import { AI, Arrow, Box, Bubble, Chat, Clock, Cross, EL, Floor, Folder, G, GOLD, GOLDL, Hand, HOV, INK, Mag, PAPER, Person, Question, RED, SEC, SURF, Stage, Tag, TXT, lerp, useT } from "../shared/art";

const c01 = (v: number): number => Math.max(0, Math.min(1, v));
const sw = (f: number, per: number, ph = 0): number => Math.sin(f / per + ph);
const ez = (t: number): number => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Bạn: Person trắng; open > 0 thì nắp đầu bán nguyệt trắng lật ra như cảnh 1. */
const You: React.FC<{ s?: number; open?: number }> = ({ s = 1, open = 0 }) => (
  <G s={s}>
    <Person fill={TXT} />
    {open > 0.02 && (
      <g>
        <path d="M-36 -74 A36 36 0 0 1 36 -74 Z" fill={INK} />
        <g transform={`translate(36 -74) rotate(${open * 100})`}>
          <path d="M-72 0 A36 36 0 0 1 0 0 Z" fill={TXT} />
        </g>
      </g>
    )}
  </G>
);

/** AI chuẩn: khối AI và cặp kính tròn vàng mảnh; tie thì cà vạt nhỏ trên ngực. */
const AiG: React.FC<{ size?: number; tie?: boolean }> = ({ size = 150, tie = false }) => (
  <g>
    <AI size={size} />
    {[-1, 1].map((sd) => (
      <circle key={sd} cx={sd * size * 0.2} cy={-size * 0.02} r={size * 0.15} fill="none" stroke={GOLDL} strokeWidth={4} />
    ))}
    <path d={`M${-size * 0.05} ${-size * 0.02} H${size * 0.05}`} stroke={GOLDL} strokeWidth={4} />
    {tie && (
      <G y={size * 0.27} s={size / 200}>
        <path d="M-7 0 L7 0 L5 12 L11 44 L0 56 L-11 44 L-5 12 Z" fill={GOLD} />
      </G>
    )}
  </g>
);

/** Tờ trình chuẩn: giấy 300x400, thanh tiêu đề vàng, bốn dòng xám, ô chữ ký nét đứt; err gạch đỏ dưới dòng lỗi. */
const ToTrinh: React.FC<{ s?: number; n?: number; sig?: boolean; blank?: boolean }> = ({ s = 1, n = 4, sig = true, blank = false }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={300} h={400} rx={14} fill={PAPER} />
    {!blank && (
      <g>
        <path d="M-150 -186 Q-150 -200 -136 -200 H136 Q150 -200 150 -186 V-174 H-150 Z" fill={GOLD} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-120} y={-130 + i * 50} width={240 * (i === 3 ? 0.6 : 1) * c01(n - i)} height={14} rx={7} fill={SEC} />
        ))}
        {sig && <rect x={20} y={110} width={110} height={60} rx={8} fill="none" stroke={SEC} strokeWidth={3} strokeDasharray="8 6" />}
      </g>
    )}
  </G>
);

/** Tấm bản đồ sơ sài: vài nét nguệch ngoạc, một con đường đứt đoạn, hai ba điểm. span < 1 dồn nét về bên trái, chừa phần phải trắng. */
const MapSheet: React.FC<{ w: number; h: number; draw?: number; span?: number }> = ({ w, h, draw = 1, span = 1 }) => {
  const X = (v: number): number => (v * span - (1 - span) * 0.3) * w;
  const Y = (v: number): number => v * h;
  const t = Math.max(3, w * 0.014);
  const d = (a: number, b: number): number => c01((draw - a) / b);
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={h} rx={14} fill={PAPER} />
      <path d={`M${X(-0.34)} ${Y(-0.2)} Q${X(-0.22)} ${Y(-0.4)} ${X(-0.08)} ${Y(-0.2)} T${X(0.2)} ${Y(-0.22)}`} fill="none" stroke={SEC} strokeWidth={t} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - d(0, 0.4)} />
      <path d={`M${X(-0.3)} ${Y(0.36)} Q${X(-0.1)} ${Y(0.2)} ${X(0.12)} ${Y(0.38)} T${X(0.34)} ${Y(0.3)}`} fill="none" stroke={SEC} strokeWidth={t} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - d(0.2, 0.4)} />
      <path d={`M${X(-0.36)} ${Y(0.1)} L${X(-0.14)} ${Y(-0.04)}`} stroke={GOLD} strokeWidth={t * 1.5} strokeLinecap="round" opacity={d(0.4, 0.2)} />
      <path d={`M${X(0.02)} ${Y(-0.06)} L${X(0.3)} ${Y(0.06)}`} stroke={GOLD} strokeWidth={t * 1.5} strokeLinecap="round" opacity={d(0.55, 0.2)} />
      {[[-0.22, 0.2], [0.1, 0.12], [0.32, -0.02]].map(([x, y], k) => (
        <circle key={k} cx={X(x)} cy={Y(y)} r={t * 1.8} fill={GOLDL} opacity={d(0.7 + k * 0.1, 0.15)} />
      ))}
    </g>
  );
};

/** Bút: có nắp thì còn nguyên, bỏ nắp thì lộ ngòi (ngòi ở -112,0). */
const PenG: React.FC<{ cap?: boolean }> = ({ cap = true }) => (
  <g>
    <Box cx={0} cy={0} w={150} h={26} rx={13} fill={GOLD} />
    {!cap && <path d="M-75 -13 L-112 0 L-75 13 Z" fill={TXT} />}
    {cap && <Box cx={-62} cy={0} w={60} h={34} rx={10} fill={GOLDL} />}
  </g>
);

/** Đường thời gian chuẩn của cả video, thu gọn ở mép trên: on[i] là độ sáng của cột mốc i. */
const Mini: React.FC<{ f: number; on: number[] }> = ({ f, on }) => (
  <g>
    <line x1={110} x2={970} y1={330} y2={330} stroke={GOLD} strokeWidth={8} strokeLinecap="round" />
    {[250, 540, 830].map((x, i) => (
      <g key={i}>
        <rect x={x - 6} y={281} width={12} height={49} fill={on[i] > 0.5 ? GOLDL : HOV} />
        <G x={x} y={245}>
          {on[i] > 0.5 && <circle r={46 + 5 * sw(f, 6)} fill="none" stroke={GOLDL} strokeWidth={3} opacity={0.5} />}
          <circle r={36} fill={on[i] > 0.5 ? GOLD : SURF} stroke={on[i] > 0.5 ? GOLDL : GOLD} strokeWidth={6} strokeDasharray={on[i] > 0.5 ? undefined : "12 9"} strokeDashoffset={-f * 0.7} />
        </G>
      </g>
    ))}
  </g>
);

/* ------------------------------------------------------------------ */
/** Cảnh 7 — Tầng ngầm quy định, bạn quay ra giơ ngón tay, tờ giấy thành tấm bản đồ sơ sài trao cho AI. */
export const QuyDinhNgamBanDo: React.FC = () => {
  const { f, at, p, l } = useT();
  const a0 = at(0, 0);
  const a1 = at(1, 0);
  const k1 = l(1, 0, 14);
  const walk = c01((f - a0) / (a1 - a0));
  const lx = lerp(190, 890, ez(walk));
  const px = lerp(190, 890, walk);
  const bob = f < a1 ? 7 * Math.abs(sw(f, 3)) : 0;
  const SG = [190, 420, 650, 880];
  const turn = p(1, 0.05);
  const slide = l(1, 0.3, 16);
  const draw = l(2, 0, 14);
  const t1 = l(2, 0.1, 14);
  const t2 = l(2, 0.3, 24);
  const mx = lerp(lerp(lerp(1250, 700, slide), 280, t1), 700, t2);
  const my = lerp(lerp(640, 440, t1), 640, t2);
  const ms = lerp(lerp(1.2, 0.8, t1), 1.2, t2);
  const lid = l(2, 0.04, 10);
  const aiIn = l(2, 0.15, 16);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={655} p={p(0, 0.1)} solid size={34} o={1 - k1} />
      <Tag i={1} x={Math.max(240, Math.min(840, px))} y={235} p={p(0, 0.55)} solid size={32} o={1 - k1} />
      <Tag i={2} x={700} y={300} p={p(2, 0.35)} solid size={34} />
    </>}>
      {k1 < 0.98 && (
        <g transform={`translate(0 560) scale(1 ${Math.max(0.001, 1 - k1)}) translate(0 -560)`}>
          <Box cx={540} cy={580} w={920} h={40} rx={12} fill={HOV} />
          <rect x={80} y={560} width={920} height={8} rx={4} fill={GOLD} />
          <clipPath id="ug7"><Box cx={540} cy={890} w={920} h={580} rx={20} /></clipPath>
          <Box cx={540} cy={890} w={920} h={580} rx={20} fill={SURF} />
          <Box cx={540} cy={890} w={920} h={580} rx={20} fill={INK} opacity={0.5} />
          {SG.map((sx, k) => {
            const lit = c01(1 - Math.abs(sx - lx) / 170);
            const on = lit > 0.3;
            return (
              <g key={k}>
                <rect x={sx - 7} y={850} width={14} height={160} fill={HOV} />
                <Box cx={sx} cy={790} w={160} h={120} rx={14} fill={EL} stroke={on ? GOLD : HOV} strokeWidth={6} />
                <Box cx={sx} cy={790} w={160} h={120} rx={14} fill={GOLD} opacity={lit * 0.3} />
                <rect x={sx - 52} y={760} width={104} height={12} rx={6} fill={on ? GOLDL : SEC} />
                <rect x={sx - 52} y={790} width={72} height={12} rx={6} fill={on ? GOLDL : SEC} />
                <rect x={sx - 52} y={820} width={88} height={12} rx={6} fill={on ? GOLDL : SEC} />
              </g>
            );
          })}
          <g clipPath="url(#ug7)">
            <circle cx={lx} cy={900} r={170} fill={GOLDL} opacity={0.12} />
            <circle cx={lx} cy={900} r={170} fill="none" stroke={GOLDL} strokeWidth={4} opacity={0.45} />
          </g>
          <G x={px} y={560 - 44 * 1.8 - bob}><You s={1.8} /></G>
        </g>
      )}
      {/* Câu hai: bạn quay ra, giơ ngón trỏ; tờ giấy trắng trượt tới trước ngón tay. */}
      {turn > 0.02 && (
        <g opacity={c01(turn * 2)}>
          <G x={280} y={880}><You s={2.6} open={lid} /></G>
          <path d={`M395 840 L${lerp(395, 455, turn)} ${lerp(840, 700, turn)}`} stroke={TXT} strokeWidth={30} strokeLinecap="round" />
          <path d={`M455 700 L462 ${lerp(700, 635, turn)}`} stroke={TXT} strokeWidth={18} strokeLinecap="round" />
        </g>
      )}
      {slide > 0 && <G x={mx} y={my} s={ms} r={-5 * t2 * sw(f, 9)}><MapSheet w={300} h={400} draw={draw} /></G>}
      {/* AI nhận tấm bản đồ bằng hai tay ngắn. */}
      {aiIn > 0 && (
        <g>
          <path d={`M${lerp(1250, 685, aiIn)} 985 L${lerp(1250, 600, aiIn)} 890`} stroke={GOLD} strokeWidth={20} strokeLinecap="round" />
          <path d={`M${lerp(1250, 875, aiIn)} 985 L${lerp(1250, 810, aiIn)} 890`} stroke={GOLD} strokeWidth={20} strokeLinecap="round" />
          <G x={lerp(1250, 780, aiIn)} y={1040 + 5 * sw(f, 8)}><AiG size={250} /></G>
        </g>
      )}
      <Floor y={1240} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
const Mound: React.FC<{ s: number; kind: 0 | 1 | 2; f: number }> = ({ s, kind, f }) => (
  <G s={s}>
    <ellipse cx={0} cy={0} rx={88} ry={36} fill={HOV} />
    <ellipse cx={0} cy={-22} rx={62} ry={25} fill={EL} stroke={GOLD} strokeWidth={4} />
    <ellipse cx={0} cy={-42} rx={34} ry={13} fill={SURF} stroke={GOLD} strokeWidth={4} />
    <rect x={-4} y={-230} width={8} height={190} rx={4} fill={TXT} />
    <g transform={`skewY(${3 * sw(f, 7, kind)})`}>
      <path d="M4 -230 H116 L92 -200 L116 -170 H4 Z" fill={EL} stroke={GOLD} strokeWidth={5} strokeLinejoin="round" />
      {kind === 0 && (
        <g>
          <circle cx={46} cy={-200} r={17} fill="none" stroke={GOLD} strokeWidth={5} />
          <circle cx={46} cy={-200} r={6} fill={GOLD} />
        </g>
      )}
      {kind === 1 && [[-16, 4], [0, -8], [16, 4]].map(([x, y], k) => <circle key={k} cx={46 + x} cy={-200 + y} r={7} fill={GOLD} />)}
      {kind === 2 && <G x={36} y={-206}><Mag s={0.3} /></G>}
    </g>
  </G>
);

/** Cảnh 8 — Lãnh thổ có ba vùng cắm cờ; bản đồ trượt lên lệch, AI bước vào vùng trắng và vẽ bừa. */
export const LanhThoChoLech: React.FC = () => {
  const { f, p, l } = useT();
  const slide = ez(l(1, 0, 20));
  const mapX = lerp(540, 700, slide);
  const mapY = lerp(870, 890, slide);
  const mapW = lerp(380, 560, slide);
  const mapH = lerp(150, 220, slide);
  const tagO = 1 - l(1, 0, 8);
  const mo = 1 - l(1, 0, 10);
  const aiY = lerp(520, 730, l(1, 0.25, 14));
  const sc = (k: number): number => c01(l(1, 0.45 + k * 0.12, 10));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={250} y={455} p={p(0, 0.25)} solid size={26} o={tagO} />
      <Tag i={1} x={540} y={250} p={p(0, 0.5)} solid size={28} o={tagO} />
      <Tag i={2} x={830} y={455} p={p(0, 0.75)} solid size={26} o={tagO} />
      <Tag i={3} x={235} y={860} p={p(1, 0.55)} solid size={30} />
    </>}>
      <polygon points="90,740 540,1040 540,1100 90,800" fill={EL} stroke={HOV} strokeWidth={4} />
      <polygon points="990,740 540,1040 540,1100 990,800" fill={EL} stroke={HOV} strokeWidth={4} />
      <polygon points="90,740 540,440 990,740 540,1040" fill={SURF} stroke={GOLD} strokeWidth={6} strokeLinejoin="round" />
      {[0.8, 0.6, 0.4].map((k) => (
        <polygon key={k} points={`${540 - 450 * k},740 540,${740 - 300 * k} ${540 + 450 * k},740 540,${740 + 300 * k}`} fill="none" stroke={HOV} strokeWidth={3} />
      ))}
      <g>
        <G x={260} y={770} o={mo}><Mound s={p(0, 0.2) * 1.1} kind={0} f={f} /></G>
        <G x={540} y={570}><Mound s={p(0, 0.45) * 1.1} kind={1} f={f} /></G>
        <G x={820} y={770}><Mound s={p(0, 0.7) * 1.1} kind={2} f={f} /></G>
        {/* Vùng thứ ba không có nét nào trên bản đồ. */}
        <line x1={800} y1={800} x2={700} y2={850} stroke={GOLDL} strokeWidth={5} strokeDasharray="6 12" strokeDashoffset={-f} opacity={c01(p(0, 0.8)) * (1 - slide)} />
      </g>
      <path d="M90 740 L420 520 Q350 740 420 960 Z" fill={TXT} opacity={0.9 * sc(-3)} />
      {[
        "M300 660 Q330 620 360 660 T400 640",
        "M300 780 L340 800 L385 760",
        "M310 880 Q345 850 380 890",
      ].map((d, k) => (
        <path key={k} d={d} fill="none" stroke={SEC} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - sc(k)} />
      ))}
      <G x={mapX} y={mapY} r={lerp(0, -3, slide)}><MapSheet w={mapW} h={mapH} span={lerp(0.62, 1, slide)} /></G>
      {l(1, 0.2, 10) > 0 && (
        <g>
          <G x={235} y={aiY + 5 * sw(f, 8)}><AiG size={170} /></G>
          <G x={235} y={aiY - 150} s={0.65 * p(1, 0.45)}><Question /></G>
        </g>
      )}
      <Floor y={1240} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
/** Cảnh 9 — Người biết tuốt bị gạch; AI đeo kính soi điểm mù; hai ứng dụng mở chat trong thư mục; đường thời gian ba cột mốc. */
export const ChuyenVienPhanBien: React.FC = () => {
  const { f, at, p, l } = useT();
  const o0 = 1 - l(1, 0, 8);
  const o1 = 1 - l(2, 0, 8);
  const N = at(1, 0) - at(0, 0) - 24;
  const m = l(0, 0.08, Math.max(30, N)) * 3;
  const DOTS: [number, number][] = [[630, 830], [780, 810], [650, 970], [790, 990]];
  const ki = Math.min(2, Math.floor(m));
  const fr = m - ki;
  const mgx = lerp(DOTS[ki][0], DOTS[ki + 1][0], ez(fr)) + 30;
  const mgy = lerp(DOTS[ki][1], DOTS[ki + 1][1], ez(fr)) + 20;
  const u1 = l(1, 0.05, 18);
  const u2 = l(1, 0.38, 16);
  const ret = l(1, 0.62, 8);
  const hx = lerp(lerp(540, 180, u1), 620, u2);
  const hy = lerp(lerp(900, 462, u1), 462, u2);
  const click = (u: number): number => c01(u * 3) * (1 - c01(u * 1.5 - 0.4));
  const card = (k: number): number => l(1, 0.22 + k * 0.33, 10);
  const lineT = l(2, 0.05, 18);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={760} y={285} p={p(0, 0.05)} solid size={30} o={o0} />
      <Tag i={1} x={320} y={345} p={p(1, 0.12)} solid size={32} o={o1} />
      <Tag i={2} x={760} y={345} p={p(1, 0.42)} solid size={32} o={o1} />
      <Tag i={3} x={540} y={1170} p={p(1, 0.7)} solid size={30} o={o1} />
      <Tag i={4} x={540} y={310} p={p(2, 0.15)} solid size={34} />
      <Tag i={5} x={540} y={1090} p={p(2, 0.5)} solid size={34} />
    </>}>
      {/* Câu một: người biết tuốt bị gạch; AI đeo kính soi tờ trình. */}
      <g opacity={o0}>
        <G x={240} y={780} s={p(0, 0)}><G s={1.6}><Person fill={TXT} /></G></G>
        <ellipse cx={240} cy={662} rx={92} ry={84} fill={TXT} />
        {[[208, 650, 32, 74, GOLD], [244, 658, 34, 60, SEC], [280, 650, 32, 74, GOLDL]].map(([x, y, w, h, c], k) => (
          <Box key={k} cx={x as number} cy={y as number} w={w as number} h={h as number} rx={5} fill={c as string} />
        ))}
        <G x={240} y={790} s={c01(p(0, 0.2) * 2)}><Cross r={50} /></G>
        <G x={700} y={880} s={p(0, 0.1) * 1.1}><ToTrinh /></G>
        <G x={860} y={470 + 5 * sw(f, 9)}><AiG size={180} /></G>
        {DOTS.map(([x, y], k) => {
          const on = c01((m - k + 0.3) * 3);
          const ring = c01((m - k - 0.5) * 3);
          return (
            <g key={k}>
              <circle cx={x} cy={y} r={22 * on} fill={INK} />
              <circle cx={x} cy={y} r={38} fill="none" stroke={GOLD} strokeWidth={6} opacity={ring} />
            </g>
          );
        })}
        <G x={mgx} y={mgy} s={1.5 * p(0, 0.15)}><Mag /></G>
      </g>
      {/* Câu hai: hai ứng dụng, ngón tay bấm dấu cộng, đoạn chat trắng rơi vào thư mục. */}
      {l(1, 0, 6) > 0 && (
        <g opacity={o1}>
          <Box cx={540} cy={540} w={900} h={600} rx={30} fill={INK} stroke={GOLD} strokeWidth={8} />
          <Box cx={540} cy={868} w={90} h={36} fill={HOV} />
          <Box cx={540} cy={892} w={440} h={24} rx={10} fill={HOV} />
          {[320, 760].map((cx, k) => (
            <g key={k}>
              <Box cx={cx} cy={580} w={380} h={300} rx={20} fill={EL} stroke={HOV} strokeWidth={5} />
              <path d={`M${cx - 190} 505 H${cx + 190}`} stroke={HOV} strokeWidth={4} />
              <circle cx={cx - 140} cy={462} r={20} fill={GOLD} />
              <path d={`M${cx - 150} 462 H${cx - 130} M${cx - 140} 452 V472`} stroke={INK} strokeWidth={5} strokeLinecap="round" />
              <circle cx={cx - 140} cy={462} r={20 + 40 * click(k === 0 ? u1 : u2)} fill="none" stroke={GOLDL} strokeWidth={4} opacity={0.6 * (1 - click(k === 0 ? u1 : u2))} />
              {card(k) > 0 && (
                <G x={cx} y={lerp(680, 610, card(k))} s={card(k)}>
                  <Box cx={0} cy={0} w={320} h={150} rx={16} fill={PAPER} />
                  <rect x={-130} y={-34} width={210} height={12} rx={6} fill={SEC} />
                  <rect x={-130} y={-4} width={150} height={12} rx={6} fill={SEC} />
                  <rect x={-130} y={26} width={180} height={12} rx={6} fill={SEC} />
                </G>
              )}
            </g>
          ))}
          {l(1, 0.8, 10) > 0 && (
            <G x={540} y={lerp(1045, 960, l(1, 0.8, 10))}>
              <Box cx={0} cy={0} w={230} h={130} rx={14} fill={PAPER} />
              <rect x={-90} y={-30} width={150} height={10} rx={5} fill={SEC} />
              <rect x={-90} y={-6} width={110} height={10} rx={5} fill={SEC} />
            </G>
          )}
          <G x={540} y={1045} s={p(1, 0.6) * 1.15}><Folder open={l(1, 0.65, 12)} /></G>
          <G x={hx} y={hy + 66} s={0.6} o={1 - ret}><Hand /></G>
        </g>
      )}
      {/* Câu ba: đường thời gian ba cột mốc đội vòng tròn trống, ba đồng hồ ba thời điểm. */}
      {lineT > 0 && (
        <g>
          <line x1={110} x2={110 + 860 * lineT} y1={740} y2={740} stroke={GOLD} strokeWidth={10} strokeLinecap="round" />
          {[250, 540, 830].map((x, k) => {
            const u = p(2, 0.2 + k * 0.15);
            return (
              <g key={k}>
                <rect x={x - 8} y={740 - 200 * c01(u)} width={16} height={200 * c01(u)} fill={GOLDL} />
                <G x={x} y={470} s={u}>
                  <circle r={70} fill="none" stroke={GOLD} strokeWidth={8} strokeDasharray="16 12" strokeDashoffset={-f * 0.7} />
                  <circle r={52} fill={SURF} />
                </G>
                <line x1={x} y1={740} x2={x} y2={840} stroke={HOV} strokeWidth={8} opacity={c01(u)} />
                <G x={x} y={910} s={p(2, 0.5 + k * 0.1)}><Clock r={68} hour={[9, 12, 17][k]} minute={(f * 0.4 + k * 20) % 60} /></G>
              </g>
            );
          })}
        </g>
      )}
      <Floor y={1240} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
/** Cảnh 10 — Kỹ thuật thứ nhất: cột mốc một sáng; lệnh Khoan viết thế chỗ lệnh soạn; kế hoạch báo sếp; sếp ảo soi năm điểm mù. */
export const DoDiemMu: React.FC = () => {
  const { f, p, l } = useT();
  const k1 = l(1, 0, 10);
  const k2 = l(2, 0, 10);
  const k3 = l(3, 0, 10);
  const o0 = 1 - k1;
  const winO = 1 - k3;
  const lamp = p(0, 0.45);
  const cone = l(0, 0.55, 14);
  const bA = p(1, 0.1);
  const strike = l(1, 0.22, 8);
  const shrink = ez(l(1, 0.32, 10));
  const bIn = l(1, 0.45, 10);
  const grow = l(2, 0, 14);
  const DOT_Y = [620, 690, 760, 830, 900];
  const mg = (k: number): number => l(3, 0.1 + k * 0.14, 10);
  const u = l(3, 0.1, 45) * 4;
  const ki = Math.min(3, Math.floor(u));
  const fr = u - ki;
  const away = ez(l(3, 0.85, 10));
  const mgx = lerp(470 + 30, 580, away);
  const mgy = lerp(lerp(DOT_Y[ki], DOT_Y[ki + 1], ez(fr)), 640, away);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={250} y={395} p={p(0, 0.1)} solid size={32} o={o0} />
      <Tag i={1} x={250} y={455} p={p(0, 0.25)} solid size={32} o={o0} />
      <Tag i={2} x={290} y={1100} p={p(0, 0.55)} solid size={28} o={o0} />
      <Tag i={3} x={650} y={975} p={p(1, 0.6)} solid size={32} o={(1 - l(2, 0, 6)) * (1 - k3)} />
      <Tag i={4} x={780} y={560} p={p(3, 0.1)} solid size={32} />
      <Tag i={5} x={330} y={490} p={p(3, 0.3)} solid size={32} />
    </>}>
      <Mini f={f} on={[1, 0, 0]} />
      {/* Câu một: tờ giấy trắng, bút còn nắp, đèn pha mọc lên chiếu vào vùng tối. */}
      {o0 > 0.01 && (
        <g opacity={o0}>
          <G x={290} y={840} s={p(0, 0.05)}><ToTrinh s={1.05} blank /></G>
          <G x={520} y={960} r={-25}><PenG /></G>
          <Box cx={760} cy={850} w={400} h={560} rx={30} fill={SURF} />
          <polygon points="880,580 620,1110 960,1110" fill={GOLDL} opacity={0.16 * cone} />
          <G x={0} y={lerp(300, 0, lamp)}>
            <line x1={960} y1={560} x2={960} y2={1140} stroke={HOV} strokeWidth={14} strokeLinecap="round" />
            <line x1={960} y1={560} x2={880} y2={565} stroke={HOV} strokeWidth={14} strokeLinecap="round" />
            <circle cx={880} cy={565} r={32} fill={GOLD} stroke={GOLDL} strokeWidth={6} />
          </G>
          {[[700, 920], [820, 1010], [900, 890]].map(([x, y], k) => (
            <ellipse key={k} cx={x} cy={y + 4 * sw(f, 10, k)} rx={50} ry={32} fill={INK} stroke={GOLDL} strokeWidth={4} opacity={0.4 + 0.6 * cone} />
          ))}
        </g>
      )}
      {/* Câu hai: khung chat, lệnh soạn bị gạch rồi thu nhỏ, biển dừng thế chỗ. */}
      {k1 > 0.01 && (
        <g opacity={winO}>
          <G x={540} y={710}><Chat w={860} h={700} /></G>
          <G x={lerp(650, 690, shrink)} y={lerp(640, 500, shrink)} s={bA * lerp(1, 0.62, shrink)}>
            <Bubble w={560} h={160} />
            <line x1={-250} y1={0} x2={-250 + 500 * strike} y2={0} stroke={RED} strokeWidth={12} strokeLinecap="round" />
          </G>
          {bIn > 0.01 && (
            <g opacity={bIn}>
              <G x={650} y={lerp(740, 790, grow)}><Bubble w={560 + 60 * grow} h={300 + 140 * grow} n={0} fill={HOV} /></G>
              <G x={lerp(650, 440, grow)} y={lerp(735, 660, grow)} s={lerp(1, 0.62, grow)}>
                <circle r={96} fill={INK} stroke={GOLDL} strokeWidth={8} />
                <circle r={80} fill={GOLD} />
                <rect x={-50} y={-12} width={100} height={24} rx={12} fill={INK} />
              </G>
            </g>
          )}
        </g>
      )}
      {/* Câu ba: tờ trình thu nhỏ có hình thiết bị; bạn chỉ tay vào nó. */}
      {k2 > 0.01 && (
        <g opacity={winO}>
          <G x={720} y={830} s={0.75 * p(2, 0.1)}>
            <ToTrinh n={1} sig={false} />
            <Box cx={0} cy={30} w={170} h={110} rx={12} fill={INK} stroke={GOLD} strokeWidth={7} />
            <Box cx={0} cy={100} w={220} h={16} rx={8} fill={GOLD} />
          </G>
          <G x={200} y={900} s={p(2, 0.2)}><You s={1.3} /></G>
          <path d={`M255 880 L${lerp(255, 350, ez(l(2, 0.35, 16)))} ${lerp(880, 840, ez(l(2, 0.35, 16)))}`} stroke={TXT} strokeWidth={22} strokeLinecap="round" />
        </g>
      )}
      {/* Câu bốn: AI sếp khó tính, năm đốm đen trên tờ trình, kính lúp khoanh từng đốm. */}
      {k3 > 0.01 && (
        <g>
          <G x={330} y={810} s={1.4 * p(3, 0)}><ToTrinh n={0} /></G>
          {DOT_Y.map((y, k) => (
            <g key={k}>
              <G x={470} y={y} s={p(3, 0.08 + k * 0.1)}>
                <circle r={24} fill={INK} />
                <G y={4}><Question s={0.16} /></G>
              </G>
              <circle cx={470} cy={y} r={34} fill="none" stroke={GOLD} strokeWidth={6} opacity={mg(k)} />
            </g>
          ))}
          <G x={780} y={780 + 6 * sw(f, 9)} s={p(3, 0)}>
            <AiG size={300} tie />
            <path d="M-84 -66 L-30 -44 M84 -66 L30 -44" stroke={GOLDL} strokeWidth={0} />
          </G>
          <path d={`M640 800 L${mgx + 95} ${mgy + 95}`} stroke={GOLD} strokeWidth={20} strokeLinecap="round" />
          <G x={mgx} y={mgy} s={1.2}><Mag /></G>
        </g>
      )}
      <Floor y={1240} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
/** Cảnh 11 — Danh sách câu sếp hay hỏi thả xuống từ AI; con dấu Khoan viết đóng xuống tờ trắng; thiếu nó AI viết bừa. */
export const KhoanVietLietKe: React.FC = () => {
  const { f, at, p, l } = useT();
  const grow = ez(l(0, 0.05, 24));
  const sh = lerp(40, 640, grow);
  const o0 = 1 - l(1, 0, 8);
  const ROWS = [640, 810, 980];
  const e = ez(l(1, 0, 14));
  const land = Math.max(0, f - at(1, 0) - 14);
  const b = Math.abs(Math.sin(land / 2.2)) * 18 * Math.exp(-land / 7);
  const k2 = l(2, 0, 10);
  const aiY = lerp(370, 500, ez(l(2, 0, 12)));
  const gone = 1 - l(2, 0, 6);
  const hit = 8 * sw(f, 1.6);
  const ring = lerp(560, 860, e);
  const PIECES: [number, number, number, number][] = [[250, 640, 110, -14], [300, 760, 90, 10], [250, 880, 120, -6], [810, 650, 100, 12], [780, 770, 120, -10], [830, 890, 90, 8], [270, 1000, 100, 6], [800, 1010, 110, -12]];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={620} y={ROWS[0]} p={p(0, 0.4)} solid size={28} o={o0} />
      <Tag i={1} x={620} y={ROWS[1]} p={p(0, 0.6)} solid size={28} o={o0} />
      <Tag i={2} x={620} y={ROWS[2]} p={p(0, 0.8)} solid size={28} o={o0} />
      {l(1, 0, 4) > 0 && <Tag i={3} x={540} y={ring - 232} p={lerp(1.8, 1, e)} solid size={40} o={gone} />}
      <Tag i={4} x={820} y={500} p={p(2, 0.3)} solid size={34} />
    </>}>
      {/* Câu một: cuộn danh sách thả xuống, ba dòng nổi lên, mỗi dòng một biểu tượng. */}
      {o0 > 0.01 && (
        <g opacity={o0}>
          {[0, 1, 2, 3, 4].map((k) => (
            <circle key={k} cx={380 + k * 70} cy={470} r={20} fill={INK} stroke={GOLDL} strokeWidth={4} opacity={1 - l(0, 0.15, 10)} />
          ))}
          <Box cx={540} cy={460 + sh / 2} w={700} h={sh} rx={20} fill={SURF} stroke={HOV} strokeWidth={5} />
          <Box cx={540} cy={460} w={740} h={36} rx={18} fill={GOLD} />
          <Box cx={540} cy={460 + sh} w={740} h={36} rx={18} fill={GOLD} />
          {ROWS.map((y, k) => {
            const u = p(0, 0.3 + k * 0.2);
            return (
              <G key={k} x={540} y={y} s={c01(u)}>
                <Box cx={0} cy={0} w={640} h={120} rx={24} fill={EL} stroke={HOV} strokeWidth={4} />
                <G x={-250}>
                  {k === 0 && (
                    <g>
                      <circle r={38} fill={GOLD} />
                      <circle r={22} fill="none" stroke={INK} strokeWidth={6} />
                    </g>
                  )}
                  {k === 1 && [-14, 0, 14].map((r, j) => (
                    <G key={j} x={r * 1.6} y={j === 1 ? -6 : 0} r={r}>
                      <Box cx={0} cy={0} w={50} h={72} rx={6} fill={j === 1 ? GOLDL : PAPER} stroke={GOLD} strokeWidth={3} />
                      <rect x={-16} y={-14} width={32} height={7} rx={3} fill={SEC} />
                      <rect x={-16} y={4} width={22} height={7} rx={3} fill={SEC} />
                    </G>
                  ))}
                  {k === 2 && (
                    <g>
                      <path d="M0 -46 L38 -32 V8 Q38 38 0 56 Q-38 38 -38 8 V-32 Z" fill={GOLD} />
                      <G y={4}><Question s={0.3} color={INK} /></G>
                    </g>
                  )}
                </G>
              </G>
            );
          })}
        </g>
      )}
      {/* Câu hai và ba: bàn, tờ trình trắng; con dấu bàn tay chặn đóng xuống rồi tan. */}
      {l(1, 0, 4) > 0 && (
        <g>
          <Box cx={540} cy={1195} w={760} h={28} rx={12} fill={HOV} />
          <G x={540} y={935 - b}><ToTrinh s={1.25} blank /></G>
          <G x={540} y={ring} s={lerp(1.8, 1, e)} o={gone}>
            <circle r={175} fill={INK} opacity={0.82} />
            <circle r={175} fill="none" stroke={GOLD} strokeWidth={14} />
            <G y={60} s={0.9}><Hand /></G>
          </G>
          <circle cx={540} cy={860} r={175 + 140 * l(1, 0.55, 14)} fill="none" stroke={GOLDL} strokeWidth={6} opacity={(1 - l(1, 0.55, 14)) * c01(e * 4 - 3) * gone} />
        </g>
      )}
      <G x={540} y={aiY + 5 * sw(f, 9)}><AiG size={190} /></G>
      {k2 > 0.01 && (
        <g>
          <path d={`M480 600 L${470 + hit} 690`} stroke={GOLD} strokeWidth={20} strokeLinecap="round" />
          <path d={`M600 600 L${610 - hit} 690`} stroke={GOLD} strokeWidth={20} strokeLinecap="round" />
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <rect key={k} x={400 + (k % 2) * 40} y={780 + k * 52 + 3 * sw(f, 2, k)} width={190 - (k % 3) * 40} height={13} rx={6} fill={SEC} opacity={c01(l(2, 0.1 + k * 0.08, 6))} />
          ))}
          <path d="M405 836 Q440 822 480 838 T560 832" fill="none" stroke={RED} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - l(2, 0.7, 10)} />
          {PIECES.map(([x, y, w, r], k) => (
            <G key={k} x={x} y={y + 8 * sw(f, 5, k)} r={r} s={l(2, 0.05 + k * 0.05, 8)}>
              <rect x={-w / 2} y={-6} width={w} height={12} rx={6} fill={SEC} />
            </G>
          ))}
        </g>
      )}
      <Floor y={1240} />
    </Stage>
  );
};

/* ------------------------------------------------------------------ */
/** Cảnh 12 — Kỹ thuật thứ hai: tờ trình mới nửa dòng, hai bên trống; bạn hỏi AI trả lời; rồi đảo chiều, AI hỏi bạn trả lời. */
export const PhongVanNguocDoiVai: React.FC = () => {
  const { f, at, p, l } = useT();
  const k1 = l(1, 0, 10);
  const o0 = 1 - k1;
  const sw2 = ez(l(2, 0, 20));
  const px = lerp(255, 805, sw2);
  const ax = lerp(805, 255, sw2);
  const lift = 130 * Math.sin(Math.PI * sw2);
  const on1 = p(0, 0.05);
  const loop = (ph: number): number => ((((f - at(1, 0)) / 42 + ph) % 1) + 1) % 1;
  const arrows = c01(l(1, 0.05, 10)) * (1 - c01(Math.sin(Math.PI * sw2) * 3));
  const flipped = f >= at(2, 0.3);
  const yQ = flipped ? 860 : 690;
  const yP = flipped ? 690 : 860;
  const qq = loop(0);
  const pp = loop(0.5);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={395} p={p(0, 0.1)} solid size={32} o={o0} />
      <Tag i={1} x={540} y={455} p={p(0, 0.3)} solid size={32} o={o0} />
      <Tag i={2} x={540} y={1105} p={p(0, 0.6)} solid size={30} o={o0} />
      <Tag i={3} x={255} y={1045} p={p(1, 0.5)} solid size={32} o={1 - l(2, 0, 6)} />
      <Tag i={4} x={255} y={1045} p={p(2, 0.65)} solid size={32} />
    </>}>
      <Mini f={f} on={[0, 1, 0]} />
      {/* Câu một: cột mốc thứ hai sáng; tờ trình có nửa dòng, bút dừng giữa chừng, hai bong bóng thoại trống. */}
      {o0 > 0.01 && (
        <g opacity={o0}>
          <G x={540} y={820} s={on1 * 1.15}>
            <ToTrinh n={0} />
            <rect x={-120} y={-130} width={110} height={14} rx={7} fill={SEC} />
          </G>
          <G x={621} y={740 + 4 * sw(f, 9)} r={35} s={1.15}><PenG cap={false} /></G>
          {[185, 895].map((x, k) => (
            <g key={k}>
              <Box cx={x} cy={780} w={220} h={160} rx={26} fill={EL} stroke={HOV} strokeWidth={5} strokeDasharray="12 10" />
              <path d={k === 0 ? "M235 855 L285 910 L295 855 Z" : "M845 855 L795 910 L785 855 Z"} fill={EL} stroke={HOV} strokeWidth={5} strokeLinejoin="round" />
              <rect x={x - 62} y={770} width={124} height={10} rx={5} fill={HOV} />
              <rect x={x - 40} y={796} width={80} height={10} rx={5} fill={HOV} />
            </g>
          ))}
        </g>
      )}
      {/* Câu hai và ba: hai bên hỏi đáp, rồi đổi chỗ. */}
      {k1 > 0.01 && (
        <g>
          <Box cx={540} cy={970} w={900} h={30} rx={12} fill={HOV} />
          {[140, 940].map((x) => <rect key={x} x={x - 16} y={985} width={32} height={245} rx={6} fill={EL} stroke={HOV} strokeWidth={4} />)}
          <rect x={140} y={1100} width={800} height={14} rx={7} fill={EL} stroke={HOV} strokeWidth={3} />
          <G x={px} y={815 - lift}><You s={2.8} /></G>
          <G x={ax} y={795 + lift + 5 * sw(f, 8)}><AiG size={320} /></G>
          <g opacity={arrows}>
            <Arrow x1={450} y1={yQ} x2={640} y2={yQ} w={10} />
            <Arrow x1={640} y1={yP} x2={450} y2={yP} w={10} color={GOLDL} />
            <G x={lerp(470, 620, qq)} y={yQ} s={Math.sin(Math.PI * qq)}>
              <circle r={62} fill={EL} stroke={GOLD} strokeWidth={7} />
              <G y={6}><Question s={0.42} /></G>
            </G>
            <G x={lerp(620, 470, pp)} y={yP} s={Math.sin(Math.PI * pp)}>
              <Box cx={0} cy={0} w={96} h={124} rx={10} fill={PAPER} />
              <rect x={-32} y={-26} width={64} height={11} rx={5} fill={SEC} />
              <rect x={-32} y={0} width={44} height={11} rx={5} fill={SEC} />
              <rect x={-32} y={24} width={56} height={11} rx={5} fill={SEC} />
            </G>
          </g>
          {sw2 > 0.05 && sw2 < 0.98 && (
            <g opacity={Math.sin(Math.PI * sw2)}>
              <path d="M420 800 A120 120 0 0 1 660 800" fill="none" stroke={GOLDL} strokeWidth={9} strokeLinecap="round" />
              <path d="M660 800 A120 120 0 0 1 420 800" fill="none" stroke={GOLD} strokeWidth={9} strokeLinecap="round" strokeDasharray="6 16" />
            </g>
          )}
        </g>
      )}
      <Floor y={1240} />
    </Stage>
  );
};
