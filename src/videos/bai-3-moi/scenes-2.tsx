import React from "react";
import { AI, Arrow, Box, Chat, Clock, EL, G, GOLD, GOLDL, Hand, HOV, INK, Lines, PAPER, Person, RED, SEC, SURF, Stage, Table, Tag, TXT, lerp, useT } from "../shared/art";
import { Boss } from "../bai-3/art";

/** Màu CHỈ dùng bên trong khung trang HTML (nguồn nói rõ): xanh = giá tốt / đã xong, cam = thanh toán bất lợi / đang làm. */
const OK = "#5FB37A";
const WARN = "#E8964A";

const c01 = (v: number): number => Math.min(1, Math.max(0, v));
const mix = (a: number[], b: number[], t: number): number[] => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
const along = (pts: number[][], t: number): number[] => {
  const segs = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]));
  let d = c01(t) * segs.reduce((a, b) => a + b, 0);
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i] || i === segs.length - 1) {
      const u = segs[i] === 0 ? 0 : Math.min(1, d / segs[i]);
      return [lerp(pts[i][0], pts[i + 1][0], u), lerp(pts[i][1], pts[i + 1][1], u)];
    }
    d -= segs[i];
  }
  return pts[0];
};

/** AI chuẩn của bài: khối AI và cặp kính tròn vàng mảnh. */
const AIG: React.FC<{ size: number }> = ({ size }) => (
  <g>
    <AI size={size} />
    {[-1, 1].map((sd) => (
      <circle key={sd} cx={sd * size * 0.2} cy={-size * 0.04} r={size * 0.15} fill="none" stroke={GOLD} strokeWidth={Math.max(3, size * 0.025)} />
    ))}
  </g>
);

/** Bạn: Person trắng, hai tay là đoạn thẳng tới điểm L, R (toạ độ thế giới). */
const You: React.FC<{ x: number; y: number; s?: number; L?: number[]; R?: number[]; smile?: boolean; o?: number }> = ({ x, y, s = 1, L, R, smile = false, o = 1 }) => (
  <g opacity={o}>
    <G x={x} y={y} s={s}>
      <Person />
      {smile && (
        <g>
          <circle cx={-13} cy={-80} r={4.5} fill={INK} />
          <circle cx={13} cy={-80} r={4.5} fill={INK} />
          <path d="M-13 -60 Q0 -48 13 -60" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
        </g>
      )}
    </G>
    {L && <line x1={x - 34 * s} y1={y + 2 * s} x2={L[0]} y2={L[1]} stroke={TXT} strokeWidth={16} strokeLinecap="round" />}
    {R && <line x1={x + 34 * s} y1={y + 2 * s} x2={R[0]} y2={R[1]} stroke={TXT} strokeWidth={16} strokeLinecap="round" />}
    {L && <circle cx={L[0]} cy={L[1]} r={14} fill={TXT} />}
    {R && <circle cx={R[0]} cy={R[1]} r={14} fill={TXT} />}
  </g>
);

/** Người đeo thẻ: dây đeo vàng nối cổ tới tâm nhãn (ty). */
const Worker: React.FC<{ x: number; y: number; s?: number; ty: number; o?: number }> = ({ x, y, s = 1.2, ty, o = 1 }) => (
  <g opacity={o}>
    <G x={x} y={y} s={s}><Person /></G>
    <path d={`M${x - 24 * s} ${y - 24 * s} L${x} ${ty - 28} L${x + 24 * s} ${y - 24 * s}`} fill="none" stroke={GOLD} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
  </g>
);

/** Hình học trang HTML cục bộ quanh (0,0): ô kết luận to vàng chiếm 1/4 trên (concl 0..1), mục lục trái, bảng phải. */
const pgGeo = (w: number, h: number, concl: number, cols: number, rows: number) => {
  const top = -h / 2 + 44;
  const ch = (h - 44) * 0.25;
  const cE = ch * concl;
  const by0 = top + 10 + (concl > 0.02 ? cE + 14 : 0);
  const bh = h / 2 - 14 - by0;
  const tx0 = -w / 2 + w * 0.24 + 36;
  const tx1 = w / 2 - 18;
  const cw = (tx1 - tx0) / cols;
  const rh = bh / rows;
  return { top, ch, cE, by0, bh, tx0, tx1, cw, rh, cell: (r: number, c: number) => ({ x: tx0 + (c + 0.5) * cw, y: by0 + (r + 0.5) * rh }) };
};

/** Trang HTML: khung ngang, ba chấm xám, ô kết luận vàng, mục lục trái, bảng phải. */
const HtmlPage: React.FC<{ w: number; h: number; concl?: number; cols?: number; rows?: number; cells?: Record<number, string>; tocO?: number; tblK?: number; tocHl?: number; children?: React.ReactNode }> = ({ w, h, concl = 0, cols = 3, rows = 4, cells = {}, tocO = 1, tblK = 1, tocHl = -1, children }) => {
  const g = pgGeo(w, h, concl, cols, rows);
  const n = cols * rows;
  const tg = Math.min(48, g.bh / 5);
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={h} rx={22} fill={PAPER} stroke={HOV} strokeWidth={5} />
      <path d={`M${-w / 2} ${-h / 2 + 44} V${-h / 2 + 22} Q${-w / 2} ${-h / 2} ${-w / 2 + 22} ${-h / 2} H${w / 2 - 22} Q${w / 2} ${-h / 2} ${w / 2} ${-h / 2 + 22} V${-h / 2 + 44} Z`} fill={HOV} />
      {[0, 1, 2].map((i) => <circle key={i} cx={-w / 2 + 30 + i * 28} cy={-h / 2 + 22} r={8} fill={SEC} />)}
      <rect x={-w / 2 + 130} y={-h / 2 + 12} width={w * 0.4} height={20} rx={10} fill={INK} opacity={0.6} />
      {g.cE > 4 && (
        <g>
          <Box cx={0} cy={g.top + 10 + g.cE / 2} w={w - 32} h={g.cE} rx={14} fill={GOLD} />
          {concl > 0.7 && <Lines x={-w / 2 + 44} y={g.top + 10 + g.cE / 2 - 20} w={w * 0.55} n={2} gap={30} color={INK} t={14} />}
        </g>
      )}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={-w / 2 + 20} y={g.by0 + 6 + i * tg} width={w * 0.2 * (i % 2 ? 0.8 : 1)} height={14} rx={7} fill={i === tocHl ? GOLD : SEC} opacity={tocO} />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const q = g.cell(Math.floor(i / cols), i % cols);
        const ap = c01(tblK * (n + 2) - i);
        return (
          <g key={i} opacity={ap}>
            <rect x={q.x - g.cw / 2 + 4} y={q.y - g.rh / 2 + 4} width={g.cw - 8} height={g.rh - 8} rx={9} fill={cells[i] ?? SEC} opacity={cells[i] ? 0.95 : 0.3} />
            <rect x={q.x - g.cw * 0.28} y={q.y - 6} width={g.cw * 0.56} height={12} rx={6} fill={INK} opacity={0.5} />
          </g>
        );
      })}
      {children}
    </g>
  );
};

/** Khung trình duyệt chia ba cột (bảng tiến độ). strip: dải màu đầu cột hiện ra. */
const Kanban: React.FC<{ w: number; h: number; strip?: number }> = ({ w, h, strip = 0 }) => {
  const bar = Math.min(44, h * 0.1);
  const sw = (w - 36 - 28) / 3;
  const y0 = -h / 2 + bar + 16;
  const th = Math.min(4, 1 + w * 0.01);
  const colors = [SEC, WARN, OK];
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={h} rx={Math.min(22, w * 0.1)} fill={PAPER} stroke={HOV} strokeWidth={Math.min(5, 2 + w * 0.01)} />
      <rect x={-w / 2} y={-h / 2} width={w} height={bar} rx={Math.min(22, w * 0.1)} fill={HOV} />
      {[0, 1, 2].map((i) => <circle key={i} cx={-w / 2 + bar * 0.7 + i * bar * 0.62} cy={-h / 2 + bar / 2} r={Math.min(8, bar * 0.18)} fill={SEC} />)}
      {[0, 1, 2].map((i) => {
        const cx = -w / 2 + 18 + sw / 2 + i * (sw + 14);
        return (
          <g key={i}>
            <Box cx={cx} cy={(y0 + h / 2 - 16) / 2} w={sw} h={h / 2 - 16 - y0} rx={10} fill={SEC} fillOpacity={0.18} stroke={SEC} strokeWidth={th} strokeDasharray="10 8" />
            {strip > 0.01 && <rect x={cx - sw / 2} y={y0} width={sw * strip} height={10} rx={5} fill={colors[i]} />}
          </g>
        );
      })}
    </g>
  );
};

/** Thẻ việc báo giá: khung trình duyệt chứa bảng giá. */
const QuoteCard: React.FC<{ w: number; h: number }> = ({ w, h }) => {
  const bar = Math.min(44, h * 0.1);
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={h} rx={Math.min(22, w * 0.1)} fill={PAPER} stroke={HOV} strokeWidth={Math.min(5, 2 + w * 0.01)} />
      <rect x={-w / 2} y={-h / 2} width={w} height={bar} rx={Math.min(22, w * 0.1)} fill={HOV} />
      {[0, 1, 2].map((i) => <circle key={i} cx={-w / 2 + bar * 0.7 + i * bar * 0.62} cy={-h / 2 + bar / 2} r={Math.min(8, bar * 0.18)} fill={SEC} />)}
      <G y={bar / 2 + 4}><Table cols={3} rows={4} w={w * 0.84} h={(h - bar) * 0.8} lit={3} fill={GOLD} base="#CDC3AE" /></G>
    </g>
  );
};

const Brace: React.FC<{ flip?: boolean }> = ({ flip }) => (
  <path d="M18 -70 Q-12 -70 -12 -40 V-14 Q-12 0 -34 0 Q-12 0 -12 14 V40 Q-12 70 18 70" fill="none" stroke={GOLD} strokeWidth={14} strokeLinecap="round" transform={flip ? "scale(-1 1)" : undefined} />
);

const Dust: React.FC<{ cx: number; cy: number; k: number; dir: number }> = ({ cx, cy, k, dir }) => (
  <g>
    {Array.from({ length: 12 }, (_, i) => {
      const a = i * 2.4 + dir;
      const r = 20 + ((i * 37) % 70) * k * 2.2;
      return <circle key={i} cx={cx + Math.cos(a) * r} cy={cy + Math.sin(a) * r * 0.9 + k * 40} r={5 - (i % 3)} fill={GOLDL} opacity={k > 0 ? 0.85 - 0.5 * k : 0} />;
    })}
  </g>
);

/** Dây cuộn lượn sóng dọc x = 975, từ y0 tới y1. */
const wave = (y0: number, y1: number): string => {
  const n = Math.round((y1 - y0) / 20);
  return Array.from({ length: n + 1 }, (_, i) => `${i ? "L" : "M"}${925 + 8 * Math.sin((y0 + i * 20) / 22)} ${y0 + i * 20}`).join(" ");
};

/** Cảnh 7: ngoặc code tan thành bụi, biển cấm đè ô code; bạn đẩy số liệu và lệnh vào AI; AI lắp trang HTML trong khung trình duyệt. */
export const YenTamKhongCanCode: React.FC = () => {
  const { f, p, l } = useT();
  const d0 = l(0, 0.08, 50);
  const a1 = l(1, 0, 8);
  const a2 = l(2, 0, 8);
  const o0 = 1 - a1;
  const o1 = a1 * (1 - a2);
  const m1 = l(1, 0, 14);
  const m2 = l(2, 0, 14);
  const armK = p(0, 0.65);
  const bx = lerp(540, 170, m1);
  const by = lerp(1030, 1040, m1);
  const bs = lerp(1.7, 1.2, m1);
  const up = (sd: number) => [bx + sd * 110 * bs, by - 120 * bs];
  const down = (sd: number) => [bx + sd * 85 * bs, by + 20 * bs];
  const R = mix(mix(down(1), up(1), armK), [300, 960], m1);
  const Lh = mix(mix(down(-1), up(-1), armK), [290, 1075], m1);
  const build = l(2, 0.1, 80);
  const conclK = c01(build * 4);
  const tocO = c01(build * 4 - 1);
  const tblK = c01((build * 4 - 1.5) / 2.5);
  const ax = lerp(900, 540, m2);
  const ay = lerp(960, 1000, m2);
  const asz = lerp(150, 170, m2);
  const typing = Math.sin(f / 2.2) * 8;
  const typed = l(1, 0.5, 26);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={340} y={700} p={p(1, 0.12)} solid color={GOLDL} size={34} o={1 - a2} />
      <Tag i={1} x={740} y={1110} p={p(1, 0.5)} solid color={GOLDL} size={34} o={1 - a2} />
      <Tag i={2} x={250} y={745} p={p(2, 0.08)} solid color={GOLDL} size={34} />
      <Tag i={3} x={830} y={745} p={p(2, 0.16)} solid color={GOLDL} size={34} />
    </>}>
      {/* câu 0: ngoặc code tan, biển cấm đè ô code */}
      <g opacity={o0}>
        <G x={250} y={560} s={2 * (1 + 0.2 * d0)} o={1 - d0}><Brace /></G>
        <G x={830} y={560} s={2 * (1 + 0.2 * d0)} o={1 - d0}><Brace flip /></G>
        <Dust cx={250} cy={560} k={d0} dir={0} />
        <Dust cx={830} cy={560} k={d0} dir={1.7} />
        <G x={540} y={560} s={p(0, 0.3)}>
          <Box cx={0} cy={0} w={400} h={300} rx={26} fill={EL} stroke={HOV} strokeWidth={6} />
          <path d="M-70 -40 L-120 0 L-70 40 M70 -40 L120 0 L70 40 M14 -56 L-14 56" fill="none" stroke={GOLD} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
        </G>
        <G x={540} y={560} s={p(0, 0.5)}>
          <circle r={160} fill="none" stroke={RED} strokeWidth={24} />
          <line x1={-113} y1={-113} x2={113} y2={113} stroke={RED} strokeWidth={24} strokeLinecap="round" />
        </G>
      </g>
      {/* câu 1: số liệu thô rơi vào hộp, lệnh tiếng Việt gõ trong bong bóng */}
      <g opacity={o1}>
        <G x={720} y={580} s={p(1, 0.02)}>
          <Chat w={520} h={360}>
            <Box cx={40} cy={110} w={360} h={64} rx={16} fill={INK} stroke={GOLD} strokeWidth={4} strokeDasharray="12 8" />
          </Chat>
        </G>
        <G x={360} y={840} s={p(1, 0)}>
          <Box cx={0} cy={0} w={170} h={220} rx={12} fill={PAPER} />
          {[0, 1, 2, 3, 4].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-62 + c * 46} y={-86 + r * 40} width={32} height={12} rx={6} fill={SEC} />))}
        </G>
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const t = l(1, 0.05 + 0.07 * k, 18);
          const x = lerp(400, 620 + k * 48, t);
          const y = lerp(800, 690, t) - Math.sin(t * Math.PI) * 120;
          return t > 0 ? <rect key={k} x={x - 23} y={y - 15} width={46} height={30} rx={7} fill={PAPER} stroke={GOLD} strokeWidth={3} /> : null;
        })}
        <G x={470} y={1060} s={p(1, 0.45)}>
          <Box cx={0} cy={0} w={300} h={120} rx={24} fill={GOLD} />
          <path d="M-136 54 L-152 86 L-102 54 Z" fill={GOLD} />
          <rect x={-120} y={-36} width={Math.max(0.01, 240 * typed)} height={14} rx={7} fill={INK} />
          <rect x={-120} y={-4} width={Math.max(0.01, 180 * c01(typed * 1.6 - 0.4))} height={14} rx={7} fill={INK} />
          <rect x={-120} y={28} width={Math.max(0.01, 210 * c01(typed * 2 - 1))} height={14} rx={7} fill={INK} />
        </G>
        <Arrow x1={625} y1={1050} x2={820} y2={1000} p={l(1, 0.8, 10)} />
      </g>
      {/* câu 2: hai cửa sổ app sau lưng AI, AI gõ lắp trang HTML */}
      <g opacity={a2}>
        <G x={540} y={470} s={p(2, 0)}><HtmlPage w={800} h={420} concl={conclK} tocO={tocO} tblK={tblK} cols={3} rows={3} /></G>
        {[0, 1].map((k) => (
          <G key={k} x={lerp(540, k ? 830 : 250, p(2, 0.05 + 0.06 * k))} y={920} s={p(2, 0.05 + 0.06 * k)}>
            <Box cx={0} cy={0} w={320} h={270} rx={22} fill={EL} stroke={k ? HOV : GOLD} strokeWidth={5} />
            <path d="M-160 -90 H160" stroke={HOV} strokeWidth={4} />
            {[0, 1, 2].map((i) => <circle key={i} cx={-130 + i * 28} cy={-112} r={8} fill={SEC} />)}
            <rect x={-156} y={-86} width={96} height={214} rx={14} fill={SURF} />
            <Lines x={-40} y={-58} w={180} n={4} gap={38} color={HOV} t={14} />
            {k ? <circle cx={-108} cy={-40} r={22} fill="none" stroke={GOLD} strokeWidth={6} /> : <path d="M-130 -52 L-112 -36 L-130 -20 M-94 -20 H-76" fill="none" stroke={GOLD} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />}
          </G>
        ))}
      </g>
      <You x={bx} y={by} s={bs} L={Lh} R={R} o={1 - a2} />
      <g opacity={a1}>
        <circle cx={ax} cy={ay} r={asz * 0.78} fill={GOLDL} opacity={0.12 * (1 - m2)} />
        <G x={ax} y={ay} s={p(1, 0.05)}><AIG size={asz} /></G>
        <g opacity={a2}>
          <Box cx={540} cy={1138} w={540} h={26} rx={10} fill={HOV} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={300 + i * 62} y={1131} width={40} height={10} rx={5} fill={SEC} />)}
          <line x1={ax - 60} y1={ay + 50} x2={490} y2={1125 + typing} stroke={GOLD} strokeWidth={14} strokeLinecap="round" />
          <line x1={ax + 60} y1={ay + 50} x2={590} y2={1125 - typing} stroke={GOLD} strokeWidth={14} strokeLinecap="round" />
        </g>
      </g>
    </Stage>
  );
};

/** Cảnh 8: mục lục nhảy trang; bảng ba cột xanh cam; ô kết luận trượt xuống, sếp xem ba mươi giây và ký. */
export const BaUuDiemTrangHtml: React.FC = () => {
  const { f, p, l } = useT();
  const m = l(1, 0, 16);
  const m2 = l(2, 0, 18);
  const so = 1 - l(1, 0, 10);
  const so2 = 1 - l(2, 0, 6);
  const px = lerp(lerp(330, 540, m), 380, m2);
  const py = lerp(lerp(640, 700, m), 790, m2);
  const pw = lerp(lerp(500, 860, m), 600, m2);
  const ph = lerp(lerp(460, 700, m), 760, m2);
  const cl = l(2, 0.05, 22);
  const press = l(0, 0.35, 12);
  const pulse = l(0, 0.5, 30);
  const brk = l(0, 0.6, 14);
  const g = pgGeo(pw, ph, cl, 3, 4);
  const okC = g.cell(3, 0);
  const wrC = g.cell(3, 2);
  const cellsNow: Record<number, string> = {};
  if (p(1, 0.25) > 0.2) cellsNow[9] = OK;
  if (p(1, 0.5) > 0.2) cellsNow[11] = WARN;
  const sc = l(2, 0.78, 20);
  const pts = [[540, 545], [565, 580], [585, 540], [610, 585], [630, 545], [650, 580]];
  const tip = along(pts, sc);
  const part = [...pts.slice(0, Math.floor(sc * 5) + 1), tip];
  const nodK = c01((sc - 0.8) * 8);
  const bossY = 740 + 14 * Math.abs(Math.sin(f / 5)) * nodK;
  const sweep = c01(l(2, 0.1, 70));
  const wrist = Math.sin(f / 3) * 4;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={190} y={385} p={p(0, 0.05)} solid color={GOLDL} size={34} o={so} />
      <Tag i={1} x={px + okC.x} y={1115} p={p(1, 0.3)} solid color={GOLDL} size={34} o={so2} />
      <Tag i={2} x={780} y={1115} p={p(1, 0.55)} solid color={GOLDL} size={34} o={so2} />
      <Tag i={3} x={380} y={365} p={p(2, 0.12)} solid color={GOLDL} size={34} />
      <Tag i={4} x={870} y={380} p={p(2, 0.2)} solid color={GOLDL} size={34} />
    </>}>
      {/* file tĩnh dài đang cuộn, dây cuộn đứt */}
      <g opacity={so}>
        <defs><clipPath id="b3-s8-file"><rect x={695} y={352} width={250} height={512} rx={10} /></clipPath></defs>
        <Box cx={820} cy={600} w={250} h={560} rx={14} fill={PAPER} />
        <rect x={695} y={320} width={250} height={32} rx={10} fill={SEC} />
        <g clipPath="url(#b3-s8-file)">
          {Array.from({ length: 16 }, (_, i) => (
            <rect key={i} x={716} y={340 + ((i * 36 + f * 2.2) % 576)} width={i % 3 === 2 ? 130 : 208} height={12} rx={6} fill={SEC} />
          ))}
        </g>
        <path d={wave(330, 610)} fill="none" stroke={GOLD} strokeWidth={7} strokeLinecap="round" />
        <path d={wave(650, 890)} fill="none" stroke={GOLD} strokeWidth={7} strokeLinecap="round" opacity={1 - brk} transform={`translate(0 ${40 * brk})`} />
        <You x={820} y={1085} s={1.5} L={[705 + wrist, 1020]} R={[722, 1040 - wrist]} />
        {[0, 1, 2].map((i) => <line key={i} x1={668 + i * 16} y1={1000} x2={660 + i * 18} y2={978} stroke={GOLD} strokeWidth={5} strokeLinecap="round" opacity={0.5 + 0.5 * Math.sin(f / 4 + i)} />)}
      </g>
      {/* trang HTML */}
      <G x={px} y={py} s={p(0, 0)}>
        <HtmlPage w={pw} h={ph} concl={cl} cols={3} rows={4} cells={cellsNow} tocHl={press > 0.9 ? 2 : -1}>
          {pulse > 0 && so > 0.5 && <rect x={g.tx0} y={g.by0 + 2 * g.rh} width={g.tx1 - g.tx0} height={g.rh} rx={14} fill="none" stroke={GOLD} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - pulse} />}
        </HtmlPage>
      </G>
      <G x={150} y={567 + 60 + 60 * (1 - press)} s={0.55} o={so * p(0, 0.3)}><Hand s={1} /></G>
      <g opacity={so2 * m}>
        <line x1={px + okC.x} y1={py + okC.y + g.rh / 2 - 4} x2={px + okC.x} y2={1086} stroke={GOLD} strokeWidth={4} strokeDasharray="4 10" strokeLinecap="round" />
        <line x1={px + wrC.x} y1={py + wrC.y + g.rh / 2 - 4} x2={px + wrC.x} y2={1086} stroke={GOLD} strokeWidth={4} strokeDasharray="4 10" strokeLinecap="round" />
      </g>
      {/* câu 2: đồng hồ, sếp ký lên ô kết luận */}
      <g opacity={l(2, 0.05, 10)}>
        <G x={870} y={490} s={p(2, 0.05)}>
          <Clock r={75} hour={2} minute={l(2, 0.1, 70) * 60} />
          <path d={`M0 0 L0 -75 A75 75 0 ${sweep > 0.5 ? 1 : 0} ${75 * Math.sin(sweep * 2 * Math.PI)} ${-75 * Math.cos(sweep * 2 * Math.PI)} Z`} fill={GOLD} opacity={0.35} />
        </G>
        <path d={`M730 ${bossY + 2} Q690 ${bossY - 60} ${tip[0] + 12} ${tip[1] + 22}`} fill="none" stroke={TXT} strokeWidth={16} strokeLinecap="round" />
        <G x={790} y={bossY} s={1.3}><Boss /></G>
        {nodK > 0.05 && [0, 1].map((i) => <path key={i} d={`M${860 - i * 10} ${bossY - 150 + i * 14} q18 10 36 0`} fill="none" stroke={GOLDL} strokeWidth={5} strokeLinecap="round" />)}
        {sc > 0.02 && <path d={"M" + part.map((q) => `${q[0]} ${q[1]}`).join(" L")} fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />}
        <circle cx={tip[0]} cy={tip[1]} r={9} fill={GOLDL} />
      </g>
    </Stage>
  );
};

/** Cảnh 9: hai thẻ việc trượt ra từ trang HTML, bạn chỉ vào cả hai; thẻ báo giá phóng to, ba người đeo thẻ xếp hàng trước bảng. */
export const HaiViecApDungBaoGia: React.FC = () => {
  const { p, l } = useT();
  const ca = p(0, 0.12);
  const cb = p(0, 0.25);
  const m = l(1, 0, 16);
  const o0 = 1 - l(1, 0, 10);
  const armK = p(0, 0.5);
  const aS = lerp(0.25, 1, ca);
  const bS = lerp(0.25, 1, cb);
  const ax = lerp(lerp(540, 320, ca), 540, m);
  const ay = lerp(lerp(430, 800, ca), 570, m);
  const bx = lerp(lerp(540, 760, cb), 930, m);
  const by = lerp(lerp(430, 800, cb), 1135, m);
  const Rh = mix([590, 1150], [750, 1010], armK);
  const Lh = mix([490, 1150], [330, 1010], armK);
  const workers = [230, 500, 770];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={200} y={255} p={p(1, 0)} solid color={GOLDL} size={34} />
      <Tag i={4} x={610} y={255} p={p(1, 0.55)} solid color={GOLDL} size={34} />
      {[1, 2, 3].map((i, k) => <Tag key={i} i={i} x={workers[k]} y={1110} p={p(1, 0.15 + 0.12 * k)} solid color={GOLDL} size={32} />)}
    </>}>
      <g opacity={o0}>
        <G x={540} y={380} s={p(0, 0)}><HtmlPage w={520} h={290} concl={1} cols={3} rows={3} /></G>
        <You x={540} y={1140} s={0.95} L={Lh} R={Rh} />
      </g>
      <G x={ax} y={ay} s={aS}><QuoteCard w={lerp(360, 740, m)} h={lerp(380, 520, m)} /></G>
      <G x={bx} y={by} s={bS}><Kanban w={lerp(360, 110, m)} h={lerp(380, 116, m)} /></G>
      {workers.map((x, k) => {
        const a = p(1, 0.1 + 0.1 * k);
        return (
          <g key={x}>
            <Worker x={x} y={1000} s={1.1 * a} ty={1110} o={a > 0.01 ? 1 : 0} />
            <line x1={x} y1={885} x2={lerp(x, 540, 0.35)} y2={845} stroke={GOLDL} strokeWidth={5} strokeDasharray="4 12" strokeLinecap="round" opacity={l(1, 0.45 + 0.05 * k, 12)} />
          </g>
        );
      })}
    </Stage>
  );
};

/** Bảng tính chằng chịt: lưới ô dày, số lít nhít là gạch xám. */
const Sheet: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={300} h={200} rx={10} fill={PAPER} />
    {Array.from({ length: 7 }, (_, i) => <line key={i} x1={-150} x2={150} y1={-100 + 25 * (i + 1)} y2={-100 + 25 * (i + 1)} stroke={HOV} strokeWidth={2} />)}
    {Array.from({ length: 5 }, (_, i) => <line key={i} y1={-100} y2={100} x1={-150 + 50 * (i + 1)} x2={-150 + 50 * (i + 1)} stroke={HOV} strokeWidth={2} />)}
    {Array.from({ length: 48 }, (_, i) => <rect key={i} x={-142 + (i % 6) * 50} y={-91 + Math.floor(i / 6) * 25} width={16 + ((i * 7) % 20)} height={8} rx={4} fill={SEC} />)}
    <rect x={-150} y={-100} width={300} height={25} rx={10} fill={GOLD} opacity={0.5} />
  </g>
);

/** Cảnh 10: bảng tính bị gạt xuống đất, bạn đưa ba tờ báo giá và lệnh có năm hàng cho AI; rồi trang HTML nhỏ tô xanh cam. */
export const LenhSoSanhNamTieuChi: React.FC = () => {
  const { p, l } = useT();
  const sw = l(0, 0.03, 34);
  const hq = l(0, 0.2, 24);
  const bub = p(0, 0.45);
  const typed = l(0, 0.5, 30);
  const o0 = 1 - l(1, 0, 8);
  const o1 = l(1, 0, 8);
  const R1 = [lerp(250, 320, sw), 880];
  const Rh = mix(mix(R1, [330, 840], hq), [250, 940], l(0, 0.5, 14));
  const cellsNow: Record<number, string> = {};
  if (p(1, 0.1) > 0.2) cellsNow[16] = OK;
  if (p(1, 0.45) > 0.2) cellsNow[19] = WARN;
  const g = pgGeo(860, 640, 0, 5, 4);
  const okC = g.cell(3, 1);
  const wrC = g.cell(3, 4);
  const lead = 700 + g.cell(3, 0).y + g.rh / 2 - 4;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={760} y={1040} p={p(0, 0.4)} solid color={GOLDL} size={32} o={o0} />
      <Tag i={1} x={420} y={305} p={p(0, 0.5)} solid color={GOLDL} size={32} o={o0} />
      <Tag i={2} x={440} y={1105} p={p(1, 0.2)} solid color={GOLDL} size={32} />
      <Tag i={3} x={800} y={1105} p={p(1, 0.55)} solid color={GOLDL} size={32} />
    </>}>
      <g opacity={o0}>
        {/* bàn nhỏ */}
        <Box cx={400} cy={985} w={300} h={26} rx={10} fill={GOLD} />
        <Box cx={270} cy={1078} w={14} h={160} fill={HOV} />
        <Box cx={530} cy={1078} w={14} h={160} fill={HOV} />
        <G x={400} y={880 + 250 * sw * sw} s={lerp(1, 0.6, sw)} r={-20 * sw}><Sheet /></G>
        <You x={170} y={880} s={1.3} R={Rh} />
        {/* ba tờ báo giá */}
        {[0, 1, 2].map((k) => {
          const q = l(0, 0.22 + 0.04 * k, 36);
          const x = lerp(300 + k * 12, 640 + k * 50, q);
          const y = lerp(840, 905 - k * 5, q) - Math.sin(q * Math.PI) * 40;
          return q > 0 ? (
            <G key={k} x={x} y={y} r={(k - 1) * 6 * q}>
              <Box cx={0} cy={0} w={100} h={140} rx={8} fill={PAPER} />
              <rect x={-50} y={-70} width={100} height={22} rx={8} fill={GOLD} />
              <Lines x={-36} y={-30} w={72} n={4} gap={24} color={SEC} t={9} />
            </G>
          ) : null;
        })}
        {/* AI */}
                <G x={900} y={900} s={p(0, 0.05)}><AIG size={170} /></G>
        <line x1={815} y1={930} x2={745} y2={905} stroke={GOLD} strokeWidth={14} strokeLinecap="round" opacity={l(0, 0.45, 10)} />
        {/* bong bóng lệnh chứa trang HTML nhỏ năm hàng */}
        <G x={420} y={520} s={bub}>
          <Box cx={0} cy={0} w={520} h={340} rx={24} fill={GOLD} />
          <path d="M-242 170 L-258 202 L-208 170 Z" fill={GOLD} />
          <Box cx={0} cy={0} w={440} h={250} rx={16} fill={EL} />
          {[0, 1, 2].map((i) => <circle key={i} cx={-196 + i * 24} cy={-108} r={7} fill={SEC} />)}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} opacity={c01(typed * 6 - i)}>
              <circle cx={-186} cy={-72 + i * 40} r={8} fill={GOLD} />
              <rect x={-160} y={-79 + i * 40} width={180 + (i % 3) * 40} height={14} rx={7} fill={SEC} />
              <rect x={170} y={-79 + i * 40} width={34} height={14} rx={7} fill={HOV} />
            </g>
          ))}
        </G>
        <Arrow x1={690} y1={540} x2={845} y2={815} p={l(0, 0.7, 12)} />
      </g>
      {/* câu 1: trang HTML nhỏ, ô giá tốt nhất xanh, ô thanh toán trước cam */}
      <g opacity={o1}>
        <G x={540} y={700} s={p(1, 0)}><HtmlPage w={860} h={640} cols={5} rows={4} cells={cellsNow} /></G>
        <g opacity={p(1, 0.2)}><line x1={540 + okC.x} y1={lead} x2={540 + okC.x} y2={1078} stroke={GOLD} strokeWidth={4} strokeDasharray="4 10" strokeLinecap="round" /></g>
        <g opacity={p(1, 0.55)}><line x1={540 + wrC.x} y1={lead} x2={540 + wrC.x} y2={1078} stroke={GOLD} strokeWidth={4} strokeDasharray="4 10" strokeLinecap="round" /></g>
      </g>
    </Stage>
  );
};

const Phone: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 0 }) => (
  <G x={x} y={y} r={r}>
    <Box cx={0} cy={0} w={150} h={260} rx={26} fill={INK} stroke={HOV} strokeWidth={6} />
    <Box cx={0} cy={0} w={126} h={228} rx={16} fill={PAPER} />
    <Box cx={0} cy={-70} w={106} h={52} rx={10} fill={GOLD} />
    {[0, 1, 2].map((r2) => [0, 1].map((c) => <rect key={`${r2}${c}`} x={-50 + c * 54} y={-30 + r2 * 40} width={46} height={32} rx={6} fill={r2 === 2 && c === 0 ? OK : r2 === 2 && c === 1 ? WARN : SEC} opacity={r2 === 2 ? 0.95 : 0.3} />))}
  </G>
);

/** Cảnh 11: ô kết luận bật lên đầu trang, mũi tên vàng chỉ vào bảng; sếp cầm điện thoại, mắt chạy từ ô kết luận xuống bảng, vòng sáng quanh trang, gật đầu và ký. */
export const OKetLuanSepGatDau: React.FC = () => {
  const { f, p, l } = useT();
  const m = l(1, 0, 16);
  const cl = l(0, 0.05, 14);
  const px = lerp(540, 360, m);
  const pw = lerp(860, 520, m);
  const ph = lerp(640, 560, m);
  const py = 650;
  const cells: Record<number, string> = { 16: OK, 19: WARN };
  const g0 = pgGeo(860, 640, 1, 5, 4);
  const tgt = g0.cell(3, 1);
  const gaze = l(1, 0.15, 40);
  const g1 = pgGeo(520, 560, 1, 5, 4);
  const concl1 = [360, py + g1.top + 10 + g1.cE / 2];
  const cell1 = [360 + g1.cell(3, 1).x, py + g1.cell(3, 1).y];
  const gazePts = [concl1, cell1];
  const gp = along(gazePts, gaze);
  const gazeD = `M${concl1[0]} ${concl1[1]} L${gp[0]} ${gp[1]}`;
  const ring = l(1, 0.35, 30);
  const sc = l(1, 0.65, 24);
  const pts = [[890, 755], [910, 775], [925, 748], [945, 778], [960, 752]];
  const tip = along(pts, sc);
  const part = [...pts.slice(0, Math.floor(sc * 4) + 1), tip];
  const nod = 7 * Math.sin(f / 4) * c01((sc - 0.8) * 8);
  const o1 = l(1, 0, 8);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={275} p={p(0, 0.25)} solid color={GOLDL} size={34} o={1 - l(1, 0, 6)} />
      <Tag i={1} x={360} y={300} p={p(1, 0.45)} solid color={GOLDL} size={34} />
      <Tag i={2} x={780} y={1130} p={p(1, 0.7)} solid color={GOLDL} size={34} />
    </>}>
            <G x={px} y={py} s={p(0, 0)}><HtmlPage w={pw} h={ph} concl={cl} cols={5} rows={4} cells={cells} /></G>
      <Box cx={px} cy={py} w={pw + 36} h={ph + 36} rx={36} fill="none" stroke={GOLDL} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring} opacity={0.9} />
      <g opacity={1 - o1}>
        <Arrow x1={540} y1={650 + g0.top + 10 + g0.cE + 6} x2={540 + tgt.x} y2={650 + tgt.y - g0.rh / 2 - 6} p={l(0, 0.55, 30)} />
      </g>
      <g opacity={o1}>
        <circle cx={770} cy={990} r={150} fill={GOLDL} opacity={0.08} />
        <G x={770} y={990 + nod} s={1.35 * p(1, 0.05)}><Boss /></G>
        <Phone x={930} y={830} />
        <path d="M830 965 Q880 1000 905 960" fill="none" stroke={TXT} strokeWidth={16} strokeLinecap="round" />
        <circle cx={905} cy={958} r={14} fill={TXT} />
        {nod > 0.5 && [0, 1].map((i) => <path key={i} d={`M${705 - i * 8} ${880 + i * 14} q16 10 32 0`} fill="none" stroke={GOLDL} strokeWidth={5} strokeLinecap="round" />)}
        {gaze > 0.01 && <path d={gazeD} fill="none" stroke={GOLDL} strokeWidth={6} strokeDasharray="4 14" strokeLinecap="round" />}
        {gaze > 0.01 && <circle cx={gp[0]} cy={gp[1]} r={10} fill={GOLDL} />}
        {sc > 0.02 && <path d={"M" + part.map((q) => `${q[0]} ${q[1]}`).join(" L")} fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />}
        {sc > 0.02 && <line x1={tip[0]} y1={tip[1]} x2={tip[0] - 30} y2={tip[1] - 30} stroke={GOLDL} strokeWidth={8} strokeLinecap="round" />}
      </g>
    </Stage>
  );
};

/** Danh sách mười lăm đầu việc, hai nhóm. */
const TaskList: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={150} h={210} rx={12} fill={PAPER} />
    {Array.from({ length: 15 }, (_, i) => (
      <rect key={i} x={-52} y={-92 + i * 11 + (i >= 8 ? 10 : 0)} width={i % 3 === 2 ? 70 : 104} height={6} rx={3} fill={i < 8 ? SEC : GOLD} />
    ))}
  </g>
);

/** Cảnh 12: thẻ báo giá lùi đi, bảng tiến độ vào giữa giữa hai người đeo thẻ; danh sách vào AI rồi bung thành ba cột. */
export const ThuHaiTienDoBaCot: React.FC = () => {
  const { f, p, l } = useT();
  const t0 = l(0, 0, 20);
  const bm = l(0, 0.08, 26);
  const m = l(1, 0, 16);
  const a1 = l(1, 0, 8);
  const o0 = 1 - a1;
  const bw = lerp(lerp(110, 520, bm), 880, m);
  const bh = lerp(lerp(116, 600, bm), 560, m);
  const bx = lerp(945, 540, bm);
  const by = lerp(lerp(1135, 690, bm), 540, m);
  const dk = l(1, 0.04, 34);
  const dx = lerp(470, 640, dk);
  const dS = 1 - l(1, 0.28, 10);
  const cols = [254, 540, 826];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={320} p={p(0, 0.25)} solid color={GOLDL} size={34} o={o0} />
      <Tag i={1} x={200} y={1040} p={p(0, 0.55)} solid color={GOLDL} size={32} o={o0} />
      <Tag i={2} x={880} y={1040} p={p(0, 0.65)} solid color={GOLDL} size={32} o={o0} />
      {[3, 4, 5].map((i, k) => <Tag key={i} i={i} x={cols[k]} y={365} p={p(1, 0.38 + 0.06 * k)} solid color={GOLDL} size={32} />)}
    </>}>
      {t0 < 1 && (
        <G x={lerp(540, 300, t0)} y={lerp(570, 350, t0)} s={lerp(1, 0.5, t0)} o={1 - t0}><QuoteCard w={740} h={520} /></G>
      )}
      <G x={bx} y={by}><Kanban w={bw} h={bh} strip={l(1, 0.38, 10)} /></G>
      <Worker x={170} y={880} s={1.3} ty={1040} o={p(0, 0.45) * o0 > 0.01 ? o0 : 0} />
      <Worker x={910} y={880} s={1.3} ty={1040} o={p(0, 0.55) * o0 > 0.01 ? o0 : 0} />
      <g opacity={a1}>
        <You x={330} y={1070} s={1.2} R={[dx - 85, 1045]} />
        <circle cx={760} cy={1070} r={125} fill={GOLDL} opacity={0.12} />
        <G x={760} y={1070} s={p(1, 0.02)}><AIG size={160} /></G>
        <Arrow x1={520} y1={1130} x2={660} y2={1130} p={l(1, 0.1, 18)} w={7} />
        {dS > 0.01 && <G x={dx} y={1040} s={dS}><TaskList /></G>}
        {Array.from({ length: 15 }, (_, i) => {
          const t = l(1, 0.3 + 0.03 * i, 20);
          const tx = cols[i % 3];
          const ty = 430 + Math.floor(i / 3) * 72;
          const x = lerp(760, tx, t);
          const y = lerp(1030, ty, t) - Math.sin(t * Math.PI) * 60;
          return t > 0 ? (
            <G key={i} x={x} y={y} s={lerp(0.4, 1, t)}>
              <Box cx={0} cy={0} w={230} h={52} rx={12} fill={i < 8 ? PAPER : GOLDL} />
              <rect x={-96} y={-7} width={110 + (i % 3) * 20} height={14} rx={7} fill={INK} opacity={0.55} />
            </G>
          ) : null;
        })}
      </g>
    </Stage>
  );
};
