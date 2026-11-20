import React from "react";
import { AI, Arrow, Box, Chat, Clock, Doc, EL, Floor, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, Person, Question, RED, SEC, Spark, Stage, SURF, Tag, TXT, lerp, useT } from "../shared/art";
import { Boss } from "../bai-3/art";

/** Hai màu chỉ dùng BÊN TRONG khung trang HTML (nguồn nói rõ): xanh lá = tốt / xong, cam = đang làm. */
const OK = "#5FB37A";
const WARN = "#E8964A";
const LANE = "#E6DCC6";

const c01 = (v: number): number => Math.max(0, Math.min(1, v));
const sw = (f: number, per: number, ph = 0): number => Math.sin(f / per + ph);
const ez = (t: number): number => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const hx = (c: string, i: number): number => parseInt(c.slice(1 + i * 2, 3 + i * 2), 16);
const mix = (a: string, b: string, t: number): string => `rgb(${[0, 1, 2].map((i) => Math.round(hx(a, i) + (hx(b, i) - hx(a, i)) * t)).join(",")})`;

/** AI chuẩn của bài: khối AI và cặp kính tròn vàng mảnh. */
const AIG: React.FC<{ size: number }> = ({ size }) => (
  <g>
    <AI size={size} />
    {[-1, 1].map((sd) => (
      <circle key={sd} cx={sd * size * 0.2} cy={-size * 0.04} r={size * 0.15} fill="none" stroke={GOLD} strokeWidth={Math.max(3, size * 0.025)} />
    ))}
  </g>
);

/** Khung trang HTML nằm ngang: thanh trên ba chấm xám, ô kết luận vàng chiếm 1/4 trên. g = mức hiện của ô vàng. */
const Shell: React.FC<{ w: number; h: number; g?: number; children?: React.ReactNode }> = ({ w, h, g = 1, children }) => {
  const gh = (h - 46) * 0.27;
  const gTop = -h / 2 + 60;
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={h} rx={22} fill={HOV} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={-w / 2 + 30 + i * 24} cy={-h / 2 + 23} r={7} fill={SEC} />
      ))}
      <Box cx={0} cy={20} w={w - 12} h={h - 52} rx={14} fill={PAPER} />
      <G y={gTop} s={1} o={g}>
        <g transform={`scale(1 ${Math.max(0.01, g)})`}>
          <Box cx={0} cy={gh / 2} w={w - 40} h={gh} rx={12} fill={GOLD} />
          <Lines x={-w / 2 + 44} y={gh / 2 - 22} w={w * 0.5} n={2} gap={30} color={INK} t={14} />
        </g>
      </G>
      {children}
    </g>
  );
};
const shellTop = (h: number): number => -h / 2 + 60 + (h - 46) * 0.27 + 16;

/** Trang HTML chuẩn: mục lục trái, bốn thẻ phải. k = [mục lục, thẻ]. */
const Std: React.FC<{ w: number; h: number; g?: number; k?: number[] }> = ({ w, h, g = 1, k = [1, 1] }) => {
  const y0 = shellTop(h);
  const area = h / 2 - 14 - y0;
  const x0 = -w / 2 + w * 0.3;
  const cw = (w / 2 - 20 - x0 - 12) / 2;
  const ch = (area - 12) / 2;
  return (
    <Shell w={w} h={h} g={g}>
      <g opacity={k[0]}>
        <Lines x={-w / 2 + 28} y={y0 + 10} w={w * 0.2} n={4} gap={Math.min(34, area / 5)} color={SEC} t={11} />
      </g>
      {[0, 1, 2, 3].map((i) => (
        <G key={i} x={x0 + cw / 2 + (i % 2) * (cw + 12)} y={y0 + ch / 2 + Math.floor(i / 2) * (ch + 12)} s={k[1]}>
          <Box cx={0} cy={0} w={cw} h={ch} rx={10} fill={TXT} />
          <Box cx={0} cy={-ch / 2 + 7} w={cw} h={14} rx={7} fill={i % 2 ? WARN : OK} />
          <Lines x={-cw / 2 + 12} y={-ch / 2 + 28} w={cw - 24} n={2} gap={Math.min(24, ch / 3.5)} color={SEC} t={8} />
        </G>
      ))}
    </Shell>
  );
};

/** Điện thoại đứng tối viền HOV; màn hình PAPER. */
const Phone: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <g>
    <Box cx={0} cy={0} w={400} h={760} rx={60} fill={INK} stroke={HOV} strokeWidth={12} />
    <Box cx={0} cy={0} w={364} h={724} rx={44} fill={PAPER} />
    <Box cx={0} cy={-340} w={110} h={22} rx={11} fill={INK} />
    {children}
  </g>
);

const Cur: React.FC = () => <path d="M0 0 L0 38 L10 29 L18 46 L27 42 L19 26 L33 26 Z" fill={TXT} stroke={INK} strokeWidth={3} strokeLinejoin="round" />;

/** Cánh tay từ vai tới đầu ngón. */
const Arm: React.FC<{ sx: number; sy: number; tx: number; ty: number }> = ({ sx, sy, tx, ty }) => (
  <g>
    <path d={`M${sx} ${sy} Q${(sx + tx) / 2} ${(sy + ty) / 2 + 18} ${tx} ${ty}`} fill="none" stroke={TXT} strokeWidth={20} strokeLinecap="round" />
    <circle cx={tx} cy={ty} r={15} fill={TXT} />
  </g>
);

const Env: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={190} h={124} rx={14} fill={PAPER} />
    <path d="M-95 -50 Q-95 -62 -83 -62 H83 Q95 -62 95 -50 L0 14 Z" fill={GOLDL} />
    <circle cy={14} r={11} fill={GOLD} />
  </g>
);

/** ---------- Cảnh 13: mỗi thẻ có ô tích, trang thu thành ứng dụng mini ---------- */
const LX = [-169, 73, 315];
const CY = [-25, 67, 159];

const KCard: React.FC<{ box?: number; done?: number; tick?: number; s?: number }> = ({ box = 1, done = 0, tick = 0, s = 1 }) => (
  <G s={s}>
    <Box cx={0} cy={0} w={200} h={72} rx={14} fill={done > 0.5 ? OK : TXT} />
    <G x={-74} s={box}>
      <Box cx={0} cy={0} w={28} h={28} rx={7} fill="none" stroke={INK} strokeWidth={4} />
      {tick > 0.01 && <path d="M-9 0 L-2 8 L10 -9" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - tick} />}
    </G>
    <rect x={-44} y={-16} width={120} height={11} rx={5} fill={done > 0.5 ? INK : SEC} />
    <rect x={-44} y={4} width={80} height={11} rx={5} fill={done > 0.5 ? INK : SEC} />
  </G>
);

export const TheOTichUngDungMini: React.FC = () => {
  const { f, p, l } = useT();
  const bx = (k: number): number => p(0, 0.05 + 0.06 * k);
  const cur = ez(l(0, 0.28, 16));
  const clickT = l(0, 0.5, 8);
  const slide = ez(l(0, 0.64, 20));
  const up = ez(l(0, 0.7, 18));
  const done = l(0, 0.8, 8);
  const pg = ez(l(1, 0, 14));
  const fl = ez(l(1, 0.32, 22));
  const phS = 0.95 * p(1, 0.08);
  const phX = lerp(330, 560, fl);
  const bossX = lerp(1250, 890, ez(l(1, 0.4, 18)));
  const ext = ez(l(1, 0.66, 14));
  const tx = lerp(840, 587, ext);
  const ty = lerp(795, 699, ext);
  const mv = ez(l(0, 0.8, 14));
  const touch = l(1, 0.78, 8);
  const ring = l(1, 0.8, 8);
  const roww = [-110, 40, 190];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={371} y={745} p={p(0, 0.2)} solid size={32} o={1 - l(1, 0, 8)} />
      <Tag i={1} x={phX} y={262} p={p(1, 0.15)} solid size={34} />
    </>}>
      {/* Trang HTML ba cột: ô tích mọc ra ở mỗi thẻ, một ô được bấm, thẻ trượt sang cột đã xong. */}
      <G x={lerp(540, 330, pg)} y={lerp(600, 650, pg)} s={lerp(1, 0.4, pg)} o={1 - l(1, 0.08, 6)}>
        <Shell w={900} h={680}>
          <Lines x={-424} y={-75} w={120} n={4} gap={36} color={SEC} t={11} />
          {LX.map((x, i) => (
            <g key={i}>
              <Box cx={x} cy={115} w={232} h={420} rx={14} fill={LANE} />
              <Box cx={x - 70} cy={-72} w={90} h={12} rx={6} fill={i === 0 ? SEC : i === 1 ? WARN : OK} />
            </g>
          ))}
          <G x={LX[0]} y={CY[0]}><KCard box={bx(0)} /></G>
          <G x={LX[0]} y={CY[1]}><KCard box={bx(1)} /></G>
          <G x={LX[1]} y={lerp(CY[1], CY[0], up)}><KCard box={bx(3)} /></G>
          <G x={LX[2]} y={CY[0]}><KCard box={bx(4)} done={1} tick={l(0, 0.2, 8)} /></G>
          <G x={lerp(LX[1], LX[2], slide)} y={lerp(CY[0], CY[1], slide)}><KCard box={bx(2)} tick={clickT} done={done} /></G>
          {clickT > 0 && clickT < 1 && <circle cx={LX[1] - 74} cy={CY[0]} r={12 + 34 * clickT} fill="none" stroke={GOLD} strokeWidth={5} opacity={1 - clickT} />}
          {true ? (
            <G x={lerp(lerp(330, LX[1] - 74, cur), LX[0] - 74, mv)} y={lerp(lerp(300, CY[0], cur), CY[0], mv)}><Cur /></G>
          ) : null}
        </Shell>
      </G>
      {/* Điện thoại: ứng dụng mini bay theo phong thư tới sếp. */}
      <G x={phX} y={650} s={phS}>
        <Phone>
          <Box cx={0} cy={-255} w={340} h={120} rx={14} fill={GOLD} />
          <Lines x={-140} y={-275} w={200} n={2} gap={30} color={INK} t={14} />
          {roww.map((y, i) => (
            <g key={i}>
              <Box cx={0} cy={y} w={340} h={140} rx={14} fill={LANE} />
              <Box cx={-105} cy={y - 52} w={70} h={10} rx={5} fill={i === 0 ? SEC : i === 1 ? WARN : OK} />
              <G x={-83} y={y + 12}><KCard s={0.75} done={i === 2 ? 1 : 0} tick={i === 2 ? 1 : 0} /></G>
              <G x={83} y={y + 12}><KCard s={0.75} done={i === 2 ? 1 : 0} tick={i === 2 ? 1 : i === 1 ? touch : 0} /></G>
            </g>
          ))}
          <Box cx={0} cy={320} w={140} h={10} rx={5} fill={HOV} />
        </Phone>
      </G>
      <G x={phX} y={1110 - 40 * Math.sin(Math.PI * fl)} s={p(1, 0.08)} o={1 - l(1, 0.58, 8)}><Env /></G>
      {ring > 0 && (
        <G x={560} y={650} s={0.95}>
          <Box cx={0} cy={0} w={424} h={784} rx={68} fill="none" stroke={GOLDL} strokeWidth={9} opacity={ring * (0.7 + 0.3 * sw(f, 5))} />
          <Box cx={0} cy={0} w={476} h={836} rx={92} fill="none" stroke={GOLD} strokeWidth={5} strokeDasharray="30 24" strokeDashoffset={-f * 1.2} opacity={ring * 0.6} />
        </G>
      )}
      <G x={bossX} y={830} s={1.6}><Boss /></G>
      {ext > 0.01 && <Arm sx={840} sy={795} tx={tx} ty={ty} />}
      {touch > 0 && touch < 1 && <circle cx={587} cy={699} r={14 + 30 * touch} fill="none" stroke={GOLD} strokeWidth={5} opacity={1 - touch} />}
      <Floor y={1240} />
    </Stage>
  );
};

/** ---------- Cảnh 14: cụm từ sống còn, đóng gói vào một tệp ---------- */
export const CumTuSongCon: React.FC = () => {
  const { f, p, l } = useT();
  const cs = ez(l(1, 0, 18));
  const fly = ez(l(0, 0.1, 22));
  const blink = 0.35 + 0.65 * (0.5 + 0.5 * sw(f, 2.5));
  const fill = ez(l(1, 0.02, 16));
  const bh = lerp(180, 230, ez(l(1, 0.05, 14)));
  const bagIn = p(1, 0.2);
  const close = ez(l(1, 0.7, 12));
  const grains = [0, 1, 2, 3, 4, 5];
  const strokes = [0, 1, 2, 3, 4];
  const gcol = [GOLD, GOLDL, TXT, SEC, GOLD, GOLDL];
  const gfx = [-75, -25, 25, 75, -50, 50];
  const gfy = [10, 10, 10, 10, 50, 50];
  const sfx = [-60, 0, 60, -40, 40];
  const sfy = [92, 92, 92, -35, -35];
  const bu = ez(l(1, 0.12, 20));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={650} y={470} p={p(0, 0.5)} solid size={34} o={1 - l(1, 0, 8)} />
      <Tag i={1} x={540} y={1000} p={p(1, 0.78)} solid size={34} />
      <Tag i={2} x={310} y={790} p={p(1, 0.3)} solid size={32} />
      <Tag i={3} x={800} y={790} p={p(1, 0.4)} solid size={32} />
    </>}>
      {/* Khung chat: bong bóng lệnh của bạn có ô trống khoanh vàng. */}
      <G x={540} y={lerp(560, 420, cs)} s={lerp(1, 0.62, cs) * p(0, 0)}>
        <Chat w={840} h={560}>
          <Box cx={110} cy={30 + bh / 2} w={540} h={bh} rx={26} fill={HOV} />
          <rect x={-140} y={52} width={380} height={14} rx={7} fill={TXT} />
          <rect x={-140} y={100} width={200} height={14} rx={7} fill={TXT} />
          <Box cx={175} cy={107} w={190} h={46} rx={23} fill="none" stroke={GOLD} strokeWidth={5} strokeDasharray="12 9" strokeDashoffset={-f * 0.6} />
          {fill > 0 && <rect x={80} y={84} width={190 * fill} height={46} rx={23} fill={GOLD} />}
          <g opacity={ez(l(1, 0.08, 12))}>
            <rect x={-140} y={150} width={380} height={14} rx={7} fill={TXT} />
            <rect x={-140} y={188} width={250} height={14} rx={7} fill={TXT} />
          </g>
          <G x={lerp(-340, 175, fly)} y={lerp(480, 107, fly) - 30 * Math.sin(Math.PI * fly)} o={fly < 1 ? 1 : blink * (1 - fill)} s={1}><Spark r={24} fill={GOLD} /></G>
        </Chat>
      </G>
      <G x={200} y={1050} s={p(0, 0.05) * lerp(1, 0.8, cs)}><AIG size={150} /></G>
      <G x={900} y={1070} s={1.3 * p(0, 0.1)}><Person fill={TXT} /></G>
      {/* Hạt màu và nét định dạng rơi vào túi. */}
      {/* Chiếc túi bay ra từ bong bóng lệnh, trong suốt để thấy hạt màu và nét định dạng nằm trong; miệng túi buộc lại. */}
      <Arrow x1={600} y1={545} x2={548} y2={700} p={l(1, 0.1, 12)} color={GOLDL} w={6} dash />
      <G x={lerp(608, 540, bu)} y={lerp(520, 810, bu)} s={bagIn}>
        <path d="M-130 -90 Q-155 20 -120 120 Q0 156 120 120 Q155 20 130 -90 Z" fill={EL} stroke={PAPER} strokeWidth={7} />
        <ellipse cx={0} cy={-90} rx={130} ry={Math.max(0.5, 30 * (1 - close))} fill={INK} stroke={GOLD} strokeWidth={6} />
      </G>
      {grains.map((k) => {
        const u = l(1, 0.28 + 0.06 * k, 14);
        if (u <= 0) return null;
        return <circle key={k} cx={lerp(600, 540 + gfx[k], u)} cy={lerp(560, 810 + gfy[k], u)} r={13} fill={gcol[k]} />;
      })}
      {strokes.map((k) => {
        const u = l(1, 0.36 + 0.06 * k, 14);
        if (u <= 0) return null;
        return (
          <G key={k} x={lerp(600, 540 + sfx[k], u)} y={lerp(560, 810 + sfy[k], u)} r={k * 24 - 40}>
            <Box cx={0} cy={0} w={k % 2 ? 54 : 38} h={11} rx={5} fill={k % 2 ? TXT : GOLDL} />
          </G>
        );
      })}
      <G x={540} y={810} o={close}>
        <Box cx={0} cy={-92} w={170} h={18} rx={9} fill={GOLD} />
        <circle cx={0} cy={-92} r={16} fill={GOLDL} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** ---------- Cảnh 15: vì sao phải Single-file ---------- */
const Tile: React.FC<{ k: number }> = ({ k }) => (
  <g>
    <Box cx={0} cy={0} w={192} h={182} rx={10} fill={PAPER} />
    {k < 3 && (
      <>
        <Box cx={0} cy={-34} w={192} h={110} rx={10} fill={GOLD} />
        <Lines x={-72} y={-60} w={120} n={2} gap={30} color={INK} t={12} />
      </>
    )}
    {k === 3 && <Lines x={-70} y={-60} w={80} n={4} gap={34} color={SEC} t={11} />}
    {k === 4 && [0, 1, 2, 3].map((i) => <rect key={i} x={-80 + (i % 2) * 84} y={-62 + Math.floor(i / 2) * 64} width={76} height={54} rx={8} fill={i % 3 ? TXT : GOLDL} />)}
    {k === 5 && [0, 1].map((i) => <rect key={i} x={-76 + i * 82} y={-70} width={70} height={130} rx={10} fill={i ? GOLDL : TXT} />)}
    <path d="M96 91 L56 91 L96 51 Z" fill={SEC} />
    <path d="M96 91 L56 91 Q82 82 96 51 Z" fill={HOV} />
  </g>
);

const Brw: React.FC<{ kind: 0 | 1; lit: number }> = ({ kind, lit }) => (
  <g>
    <Std w={400} h={300} />
    <rect x={-190} y={-100} width={380} height={244} rx={14} fill={INK} opacity={0.72 * (1 - lit)} />
    <G x={150} y={-127}>
      <circle r={13} fill={kind ? GOLDL : GOLD} />
      {kind ? <path d="M-8 4 Q-6 -8 6 -6 Q8 4 -4 8" fill="none" stroke={INK} strokeWidth={3.5} strokeLinecap="round" /> : <circle r={5} fill={TXT} />}
    </G>
  </g>
);

const Feather: React.FC = () => (
  <g>
    <path d="M-10 46 Q-52 -8 10 -54 Q14 -12 -10 46 Z" fill={GOLDL} />
    <path d="M-10 46 Q-4 6 8 -44" fill="none" stroke={GOLD} strokeWidth={3.5} strokeLinecap="round" />
  </g>
);

export const TaiSaoSingleFile: React.FC = () => {
  const { f, p, l } = useT();
  const sc = [0, 1, 2, 3, 4, 5].map((k) => ez(l(0, 0.25 + 0.04 * k, 22)));
  const gx = [0, 1, 2, 3, 4, 5].map((k) => 540 + ((k % 3) - 1) * 196);
  const gy = [0, 1, 2, 3, 4, 5].map((k) => 760 + (Math.floor(k / 3) - 0.5) * 186);
  const tx = [200, 520, 840, 270, 580, 880];
  const ty = [690, 690, 720, 910, 915, 925];
  const tr = [-16, 9, -8, 12, -14, 7];
  const o0 = 1 - l(1, 0, 8);
  const o1 = 1 - l(2, 0, 8);
  const pile = ez(l(1, 0, 18));
  const sendA = l(1, 0.12, 16);
  const sendB = l(1, 0.3, 16);
  const arrive = l(1, 0.5, 12);
  const wob = (k: number): number => 5 * sw(f, 2.2, k);
  const sOut = ez(l(2, 0, 18));
  const lit = l(2, 0.62, 12);
  const dbl1 = l(2, 0.5, 6);
  const dbl2 = l(2, 0.6, 6);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={515} p={p(0, 0.55)} solid size={34} o={o0} />
      <Tag i={1} x={440} y={355} p={p(1, 0.2)} solid size={32} o={o1} />
      <Tag i={2} x={440} y={935} p={p(1, 0.32)} solid size={32} o={o1} />
      <Tag i={3} x={790} y={415} p={p(1, 0.66)} solid size={30} o={o1} />
      <Tag i={4} x={800} y={865} p={p(1, 0.8)} solid size={30} o={o1} />
      <Tag i={5} x={500} y={305} p={p(2, 0.45)} solid size={32} />
      <Tag i={6} x={230} y={683} p={p(2, 0.7)} solid size={32} />
      <Tag i={7} x={860} y={683} p={p(2, 0.78)} solid size={32} />
    </>}>
      {/* Câu 0: không có bong bóng dặn, trang vỡ thành sáu mảnh tản trên bàn. */}
      <g opacity={o0}>
        <G x={200} y={340} s={p(0, 0.05)}><AIG size={150} /></G>
        <G x={600} y={340} s={p(0, 0.1)}>
          <Box cx={0} cy={0} w={380} h={130} rx={30} fill="none" stroke={HOV} strokeWidth={6} strokeDasharray="14 12" strokeDashoffset={-f * 0.4} />
          <G x={150} y={-48}><Cross2 /></G>
        </G>
        <Box cx={540} cy={1050} w={900} h={26} rx={12} fill={GOLD} />
        <Box cx={130} cy={1145} w={24} h={170} rx={6} fill={HOV} />
        <Box cx={950} cy={1145} w={24} h={170} rx={6} fill={HOV} />
      </g>
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const u = sc[k];
        const pf = pile;
        const x0 = lerp(gx[k], tx[k], u);
        const y0 = lerp(gy[k], ty[k], u);
        const x = lerp(x0, 200 + (k % 3) * 20 - 20, pf);
        const y = lerp(y0, 640 + (k % 2) * 22 - 12, pf);
        const s = lerp(1, 0.7, pf);
        return (
          <G key={k} x={x} y={y} r={lerp(0, tr[k], u) * (1 - pf) + (k * 5 - 12) * pf} s={s * p(0, 0) * (1 - l(2, 0, 8))}>
            <Tile k={k} />
          </G>
        );
      })}
      {/* Câu 1: gửi đống mảnh qua Zalo và email, máy sếp mở ra khung xám vỡ. */}
      <g opacity={o1}>
        {l(1, 0.05, 10) > 0 && <G x={190} y={960} s={1.2 * p(1, 0.05)}><Person fill={TXT} /></G>}
        <G x={440} y={470} s={p(1, 0.15)}>
          <Box cx={0} cy={0} w={150} h={150} rx={34} fill={EL} stroke={GOLD} strokeWidth={6} />
          <Box cx={0} cy={-6} w={92} h={64} rx={18} fill={TXT} />
          <path d="M-24 22 L-34 44 L-2 26 Z" fill={TXT} />
          {[-20, 0, 20].map((x) => <circle key={x} cx={x} cy={-6} r={6} fill={INK} />)}
        </G>
        <G x={440} y={800} s={p(1, 0.27)}>
          <Box cx={0} cy={0} w={150} h={150} rx={34} fill={EL} stroke={GOLD} strokeWidth={6} />
          <Box cx={0} cy={4} w={96} h={66} rx={10} fill={TXT} />
          <path d="M-48 -26 L0 12 L48 -26" fill="none" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
        </G>
        <Arrow x1={310} y1={600} x2={365} y2={510} p={sendA} color={GOLDL} w={7} dash />
        <Arrow x1={310} y1={690} x2={365} y2={770} p={sendB} color={GOLDL} w={7} dash />
        <Arrow x1={520} y1={480} x2={585} y2={560} p={l(1, 0.4, 14)} color={GOLDL} w={7} dash />
        <Arrow x1={520} y1={790} x2={585} y2={700} p={l(1, 0.46, 14)} color={GOLDL} w={7} dash />
        <G x={790} y={640} s={p(1, 0.5)}>
          <Box cx={0} cy={0} w={400} h={340} rx={20} fill={HOV} />
          {[0, 1, 2].map((i) => <circle key={i} cx={-170 + i * 24} cy={-148} r={7} fill={SEC} />)}
          <Box cx={0} cy={20} w={384} h={290} rx={12} fill={SEC} opacity={0.55 + 0.45 * (1 - arrive)} />
          {[0, 1, 2].map((r) => [0, 1, 2, 3, 4, 5].map((c) => (
            <rect key={`${r}${c}`} x={-150 + c * 52 + 5 * sw(f, 3, r + c)} y={-60 + r * 70 + 12 * sw(1, 1, r * 7 + c * 3) * arrive} width={30} height={42} rx={4} fill="none" stroke={INK} strokeWidth={4} opacity={arrive} />
          )))}
          <path d="M-60 -110 L-20 -30 L-70 40 L-10 120 M110 -120 L60 -20 L120 70" fill="none" stroke={HOV} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" opacity={arrive} />
          <G x={-90} y={-30} s={arrive}><Cross2 /></G>
          <G x={90} y={70} s={arrive}><Cross2 /></G>
        </G>
        <G x={880} y={1090} s={1.4 * p(1, 0.45)}><Boss /></G>
      </g>
      {/* Câu 2: một tệp nhẹ như chiếc lông, sếp nhấp đúp, Chrome và Edge đều mở mượt. */}
      {sOut > 0 && (
        <g>
          <G x={150} y={450} s={1.2 * p(2, 0)}><Person fill={TXT} /></G>
          <G x={900} y={450} s={1.5 * p(2, 0.05)}><Boss /></G>
          <Arrow x1={230} y1={440} x2={400} y2={440} p={l(2, 0.05, 16)} color={GOLDL} w={6} dash />
          <G x={lerp(150, 500, sOut)} y={440 + 10 * sw(f, 8)} s={p(2, 0.1)}>
            <Doc w={130} h={170} n={3} />
            <G x={44} y={-70} s={0.9}><Feather /></G>
          </G>
          <Arrow x1={470} y1={530} x2={390} y2={728} p={l(2, 0.4, 14)} color={GOLD} w={7} />
          <Arrow x1={530} y1={530} x2={690} y2={728} p={l(2, 0.45, 14)} color={GOLD} w={7} />
          {dbl1 > 0 && <G x={500} y={440}><circle r={20 + 50 * dbl1} fill="none" stroke={GOLD} strokeWidth={5} opacity={1 - dbl1} /></G>}
          {dbl2 > 0 && <G x={500} y={440}><circle r={20 + 50 * dbl2} fill="none" stroke={GOLD} strokeWidth={5} opacity={1 - dbl2} /></G>}
          <G x={512 + 6 * dbl1} y={452}><Cur /></G>
          <G x={290} y={880} s={p(2, 0.62)}><Brw kind={0} lit={lit} /></G>
          <G x={790} y={880} s={p(2, 0.7)}><Brw kind={1} lit={lit} /></G>
        </g>
      )}
      <Floor y={1240} />
    </Stage>
  );
};

const Cross2: React.FC = () => (
  <g>
    <circle r={22} fill={INK} />
    <path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke={RED} strokeWidth={7} strokeLinecap="round" />
  </g>
);

/** ---------- Cảnh 16: đổi màu, thêm cột bằng chat ---------- */
const Col: React.FC<{ x: number; color: string; s?: number }> = ({ x, color, s = 1 }) => (
  <G x={x} y={12} s={1}>
    <g transform={`scale(1 ${s})`}>
      <Box cx={0} cy={0} w={112} h={34} rx={8} fill={color} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <Box cx={0} cy={44 + i * 42} w={112} h={38} rx={6} fill={TXT} />
          <rect x={-38} y={40 + i * 42} width={76 * (i % 2 ? 0.7 : 1)} height={8} rx={4} fill={SEC} />
        </g>
      ))}
    </g>
  </G>
);

export const DoiMauChatTiep: React.FC = () => {
  const { f, p, l } = useT();
  const toCol = ez(l(0, 0.5, 14));
  const ext0 = ez(l(0, 0.05, 14));
  const ext1 = ext0 * (1 - l(1, 0, 10));
  const grey = ez(l(1, 0.35, 14));
  const grow = ez(l(1, 0.45, 16));
  const typeW = l(1, 0.06, 18);
  const lap = l(1, 0.4, 56);
  const arms = l(1, 0.05, 10) * (1 - l(1, 0.9, 8));
  const hop = (k: number): number => 12 * Math.abs(sw(f, 4, k * 1.7));
  const tipX = 595;
  const tipY = 632;
  const sx = 803;
  const sy = 745;
  const ax = lerp(sx, tipX, ext1);
  const ay = lerp(sy, tipY, ext1);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={555} y={527} p={p(0, 0.3)} solid size={32} o={1 - l(1, 0, 8)} />
      <Tag i={1} x={690} y={890} p={p(0, 0.65)} solid size={32} o={1 - l(1, 0, 8)} />
      <Tag i={2} x={640} y={527} p={p(1, 0.55)} solid size={30} />
      <Tag i={3} x={900} y={300} p={p(1, 0.45)} solid size={32} />
    </>}>
      {/* Trang HTML đang mở: ba cột, bên phải bảng còn chỗ trống. */}
      <G x={420} y={570} s={p(0, 0)}>
        <Std w={680} h={560} k={[0, 0]} />
        <Lines x={-318} y={-52} w={110} n={5} gap={38} color={SEC} t={11} />
        <Col x={-109} color={OK} />
        <Col x={13} color={OK} />
        <Col x={135} color={mix(WARN, SEC, grey)} />
        {grow > 0 && <Col x={257} color={GOLD} s={grow} />}
        {grow < 0.01 && <Box cx={257} cy={138} w={112} h={260} rx={10} fill="none" stroke={HOV} strokeWidth={4} strokeDasharray="10 9" opacity={ext0} />}
      </G>
      <G x={860} y={780} s={1.5 * p(0, 0.05)}><Person fill={TXT} /></G>
      {l(1, 0, 8) < 1 && <Arrow x1={606} y1={590} x2={676} y2={590} p={l(0, 0.55, 14)} color={GOLD} w={7} dash />}
      {ext1 > 0.02 && <Arm sx={sx} sy={sy} tx={ax} ty={ay} />}
      <G x={850} y={520 - hop(0)} s={0.4 * p(0, 0.6) * (1 - l(1, 0, 8))}><Question /></G>
      <G x={955} y={545 - hop(1)} s={0.35 * p(0, 0.7) * (1 - l(1, 0, 8))}><Question /></G>
      {/* Câu 1: bạn gõ chat, AI cập nhật; đồng hồ quay một vòng. */}
      {l(1, 0, 6) > 0 && (
        <g>
          <G x={610} y={930} s={p(1, 0)}>
            <Box cx={0} cy={0} w={440} h={120} rx={26} fill={HOV} />
            <path d="M170 -50 L250 -80 L215 -10 Z" fill={HOV} />
            <rect x={-190} y={-26} width={380 * typeW} height={14} rx={7} fill={TXT} />
            <rect x={-190} y={8} width={260 * c01(typeW * 1.4 - 0.4)} height={14} rx={7} fill={TXT} />
          </G>
          <Arrow x1={390} y1={930} x2={285} y2={985} p={l(1, 0.1, 10)} color={GOLDL} w={6} />
          <G x={190} y={1030} s={p(1, 0.05)}>
            <AIG size={150} />
            <path d={`M-75 20 Q-110 ${lerp(60, -20, arms)} -90 ${lerp(100, -50, arms)}`} fill="none" stroke={GOLDL} strokeWidth={14} strokeLinecap="round" />
            <path d={`M75 20 Q110 ${lerp(60, -20, arms)} 90 ${lerp(100, -50, arms)}`} fill="none" stroke={GOLDL} strokeWidth={14} strokeLinecap="round" />
          </G>
          <Arrow x1={215} y1={945} x2={260} y2={860} p={l(1, 0.3, 10)} color={GOLDL} w={6} dash />
          <G x={900} y={430} s={p(1, 0.35)}>
            <circle r={96} fill="none" stroke={HOV} strokeWidth={8} />
            <circle r={96} fill="none" stroke={GOLD} strokeWidth={8} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - lap} transform="rotate(-90)" />
            <Clock r={70} hour={0} minute={60 * lap} />
          </G>
        </g>
      )}
      <Floor y={1240} />
    </Stage>
  );
};
/** ---------- Cảnh 17: mười lăm phút thử ngay ---------- */
const Sheet: React.FC<{ kind: 0 | 1 | 2 }> = ({ kind }) => (
  <g>
    <Box cx={0} cy={0} w={200} h={270} rx={14} fill={PAPER} />
    <path d="M-100 -122 V-130 Q-100 -135 -86 -135 H86 Q100 -135 100 -130 V-122 Z" fill={GOLD} />
    {kind === 0 && [0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-80 + c * 54} y={-100 + r * 44} width={46} height={34} rx={6} fill={r === 0 ? GOLDL : TXT} />))}
    {kind === 1 && [0, 1, 2, 3].map((i) => <rect key={i} x={-76 + i * 40} y={80 - (50 + i * 36)} width={30} height={50 + i * 36} rx={6} fill={i === 3 ? GOLD : SEC} />)}
    {kind === 2 && [0, 1, 2, 3].map((i) => (
      <g key={i}>
        <Box cx={-66} cy={-92 + i * 54} w={24} h={24} rx={6} fill="none" stroke={SEC} strokeWidth={4} />
        <rect x={-42} y={-98 + i * 54} width={110 - i * 14} height={12} rx={6} fill={SEC} />
      </g>
    ))}
  </g>
);

export const MuoiLamPhutThuNgay: React.FC = () => {
  const { f, p, l } = useT();
  const quarter = ez(l(0, 0.2, 40));
  const c0 = 1 - l(1, 0, 10);
  const sel = ez(l(1, 0.55, 16));
  const sl = ez(l(2, 0, 20));
  const fl = ez(l(2, 0.4, 20));
  const g1 = l(2, 0.66, 10);
  const g2 = l(2, 0.74, 10);
  const g3 = l(2, 0.82, 10);
  const px = [205, 465, 725];
  const exc = 10 * Math.abs(sw(f, 5));
  const armE = ez(l(1, 0.4, 14));
  const lift = 80 * sel;
  const mx = lerp(260, 270, fl);
  const my = lerp(lerp(1590, 940, sl), 486, fl);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={460} y={300} p={p(0, 0.3)} solid size={34} o={c0} />
      <Tag i={1} x={205} y={425} p={p(1, 0.25)} solid size={28} o={1 - l(2, 0, 8)} />
      <Tag i={2} x={465} y={425} p={p(1, 0.35)} solid size={28} o={1 - l(2, 0, 8)} />
      <Tag i={3} x={725} y={425 - lift - 20 * sel} p={p(1, 0.45)} solid size={28} o={1 - l(2, 0, 8)} />
      <Tag i={4} x={580} y={930} p={p(2, 0.35)} solid size={32} />
      <Tag i={5} x={740} y={385} p={p(2, 0.66)} solid size={32} />
    </>}>
      {/* Câu 0: đồng hồ lớn, kim đi đúng một phần tư vòng; bạn ngồi sau bàn, tay đặt sẵn. */}
      <g opacity={c0}>
        <G x={460} y={560} s={p(0, 0.05)}>
          <path d={`M0 0 L0 -190 A190 190 0 0 1 ${190 * Math.sin((quarter * Math.PI) / 2)} ${-190 * Math.cos((quarter * Math.PI) / 2)} Z`} fill={GOLD} opacity={0.35} />
          <Clock r={190} hour={0} minute={quarter * 15} />
        </G>
      </g>
      <g opacity={1 - l(2, 0, 8)}>
        <G x={905} y={945} s={1.5 * p(0, 0.1)}><Person fill={TXT} /></G>
        <Box cx={540} cy={1010} w={900} h={30} rx={12} fill={GOLD} />
        <Box cx={130} cy={1125} w={26} h={200} rx={6} fill={HOV} />
        <Box cx={950} cy={1125} w={26} h={200} rx={6} fill={HOV} />
      </g>
      {/* Câu 1: ba tờ xếp hàng trên bàn; ngón tay chọn tờ danh sách tiến độ, nó nhấc lên viền vàng, hai tờ kia lùi lại. */}
      {l(1, 0, 6) > 0 && (
        <g opacity={1 - l(2, 0, 8)}>
          {px.map((x, i) => {
            const chosen = i === 2;
            return (
              <G key={i} x={x} y={640 - (chosen ? lift : 0)} s={1.25 * p(1, 0.1 * i) * (chosen ? 1 + 0.1 * sel : 1 - 0.1 * sel)} o={chosen ? 1 : 1 - 0.35 * sel}>
                {chosen && <Box cx={0} cy={0} w={220} h={290} rx={18} fill="none" stroke={GOLD} strokeWidth={8} opacity={sel} />}
                <Sheet kind={i as 0 | 1 | 2} />
              </G>
            );
          })}
          <Arm sx={850} sy={910} tx={lerp(850, 810, armE)} ty={lerp(910, 772, armE)} />
        </g>
      )}
      {/* Câu 2: bài viết trượt từ đáy lên, mẫu câu lệnh bay vào cửa sổ Codex, trang HTML mọc dần trong trình duyệt. */}
      {sl > 0 && (
        <g>
          <G x={260} y={lerp(1500, 850, sl)}>
            <Box cx={0} cy={0} w={300} h={340} rx={16} fill={PAPER} />
            <Box cx={0} cy={-150} w={300} h={40} rx={16} fill={SEC} />
            <Lines x={-120} y={-100} w={240} n={4} gap={34} color={SEC} t={11} />
            <Box cx={0} cy={90} w={220} h={62} rx={12} fill="none" stroke={GOLD} strokeWidth={5} strokeDasharray="10 8" />
          </G>
          <G x={mx} y={my} s={p(2, 0.3) * (1 - l(2, 0.62, 8))}>
            <Box cx={0} cy={0} w={170} h={50} rx={14} fill={GOLD} />
            <Lines x={-62} y={-8} w={120} n={1} gap={20} color={INK} t={12} />
          </G>
          <G x={270} y={400} s={p(2, 0.15)}>
            <Box cx={0} cy={0} w={380} h={270} rx={22} fill={EL} stroke={HOV} strokeWidth={5} />
            {[0, 1, 2].map((i) => <circle key={i} cx={-160 + i * 24} cy={-110} r={7} fill={SEC} />)}
            <path d="M-30 -50 L-62 -20 L-30 10 M30 -50 L62 -20 L30 10 M8 -62 L-8 22" fill="none" stroke={GOLD} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
            <Box cx={0} cy={86} w={320} h={44} rx={22} fill={INK} stroke={HOV} strokeWidth={4} />
            <rect x={-146} y={78} width={290 * ez(l(2, 0.55, 14))} height={16} rx={8} fill={GOLD} />
          </G>
          <Arrow x1={400} y1={470} x2={560} y2={560} p={l(2, 0.62, 14)} color={GOLDL} w={7} dash />
          <G x={740} y={640} s={p(2, 0.66)}>
            <Std w={460} h={420} g={g1} k={[g2, g3]} />
          </G>
          {[[-1, 0], [1, 0]].map(([d], k) => <line key={k} x1={900 + d * 78} y1={925 - exc} x2={900 + d * 104} y2={900 - exc} stroke={GOLD} strokeWidth={6} strokeLinecap="round" opacity={g1} />)}
          <Arrow x1={260} y1={675} x2={270} y2={545} p={l(2, 0.36, 14)} color={GOLDL} w={6} dash />
          <G x={900} y={1030} s={1.2 * p(2, 0.1)}>
            <G y={-exc}><Person fill={TXT} /></G>
                      </G>
        </g>
      )}
      <Floor y={1240} />
    </Stage>
  );
};
