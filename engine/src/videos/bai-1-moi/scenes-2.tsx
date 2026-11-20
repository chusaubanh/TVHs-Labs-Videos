import React from "react";
import { AI, Arrow, Bubble, Box, Clock, Cross, Folder, G, GOLD, GOLDL, HOV, INK, Lock, PAPER, Person, Question, RED, SEC, SURF, Stage, Sun, Tag, TXT, EL, Floor, lerp, useT } from "../shared/art";

const c01 = (v: number): number => Math.max(0, Math.min(1, v));
const sw = (f: number, per: number, ph = 0): number => Math.sin(f / per + ph);
const ez = (t: number): number => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Người: bạn (trắng) hoặc thực tập sinh (xám, thẻ vàng đeo cổ). a là độ dang tay. */
const Worker: React.FC<{ fill: string; s?: number; a?: number; badge?: boolean; hideR?: boolean }> = ({ fill, s = 1, a = 0, badge = false, hideR = false }) => (
  <G s={s}>
    <path d={`M-46 -6 L${-lerp(58, 132, a)} ${lerp(46, -4, a)}`} stroke={fill} strokeWidth={22} strokeLinecap="round" />
    {!hideR && <path d={`M46 -6 L${lerp(58, 132, a)} ${lerp(46, -4, a)}`} stroke={fill} strokeWidth={22} strokeLinecap="round" />}
    <Person fill={fill} />
    {badge && (
      <g>
        <path d="M-16 -24 L0 6 L16 -24" fill="none" stroke={GOLD} strokeWidth={5} />
        <Box cx={0} cy={14} w={24} h={30} rx={5} fill={GOLD} />
      </g>
    )}
  </G>
);

/** Tờ nội quy: giấy vàng nhạt, tiêu đề vàng đậm, hai dòng quy tắc; l1, l2 là độ sáng vàng từng dòng. */
const Sheet: React.FC<{ w?: number; h?: number; l1?: number; l2?: number }> = ({ w = 240, h = 300, l1 = 0, l2 = 0 }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={12} fill={PAPER} />
    <Box cx={0} cy={-h / 2 + h * 0.15} w={w * 0.78} h={h * 0.09} rx={h * 0.045} fill={GOLD} />
    {[l1, l2].map((lit, k) => {
      const y = -h / 2 + h * (0.4 + k * 0.25);
      const bw = w * 0.78;
      return (
        <g key={k}>
          <Box cx={0} cy={y} w={bw} h={h * 0.07} rx={h * 0.035} fill={SEC} opacity={0.55} />
          <rect x={-bw / 2} y={y - h * 0.035} width={bw * lit} height={h * 0.07} rx={h * 0.035} fill={GOLD} />
          <Box cx={-bw * 0.2} cy={y + h * 0.1} w={bw * 0.6} h={h * 0.04} rx={h * 0.02} fill={SEC} opacity={0.45} />
        </g>
      );
    })}
  </g>
);

/** File nhỏ có góc gập. */
const FileGlyph: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <path d="M-50 -65 H22 L50 -37 V65 H-50 Z" fill={PAPER} />
    <path d="M22 -65 V-37 H50 Z" fill={GOLDL} />
    <Box cx={0} cy={-8} w={64} h={12} rx={6} fill={GOLD} />
    <Box cx={-6} cy={22} w={52} h={9} rx={4} fill={SEC} />
    <Box cx={-6} cy={40} w={52} h={9} rx={4} fill={SEC} />
  </G>
);

/** Chip số: ô chữ nhật bo, chỉ vạch, không chữ số. */
const Chip: React.FC<{ w?: number; h?: number; stroke?: string; jit?: number; f?: number }> = ({ w = 130, h = 90, stroke = GOLD, jit = 0, f = 0 }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={h * 0.24} fill={EL} stroke={stroke} strokeWidth={5} />
    {[-0.22, 0.04, 0.28].map((yy, k) => (
      <Box key={k} cx={jit * sw(f, 3.1, k * 2)} cy={yy * h} w={[0.72, 0.56, 0.64][k] * w} h={h * 0.14} rx={h * 0.07} fill={k === 1 ? GOLD : TXT} />
    ))}
  </g>
);

const Win: React.FC<{ sun: number; night: number; rot: number }> = ({ sun, night, rot }) => (
  <g>
    <clipPath id="wn7"><Box cx={0} cy={0} w={300} h={340} rx={10} /></clipPath>
    <Box cx={0} cy={0} w={330} h={370} rx={16} fill={HOV} />
    <g clipPath="url(#wn7)">
      <Box cx={0} cy={0} w={300} h={340} fill={SURF} />
      <G x={0} y={lerp(200, -50, sun)}><Sun r={46} rot={rot} /></G>
      <Box cx={0} cy={0} w={300} h={340} fill={INK} opacity={night} />
      <path d="M-150 150 Q-70 60 0 110 Q80 60 150 130 V170 H-150 Z" fill={SEC} />
    </g>
    <path d="M0 -170 V170 M-150 0 H150" stroke={HOV} strokeWidth={10} />
  </g>
);

/** Cảnh 7 — Dặn lại mỗi sáng không được; dán tờ nội quy lên bàn, bạn thực tập sinh bước vào là đọc nó đầu tiên. */
export const ToNoiQuyTrenBan: React.FC = () => {
  const { f, at, p, l } = useT();
  const s1 = at(1, 0);
  const s2 = at(2, 0);
  const t1 = c01((f - s1) / 58);
  const inS1 = f >= s1 && f < s2;
  const cs = Math.cos(2 * Math.PI * t1);
  const rise = l(2, 0.5, 50);
  const sun = f < s1 ? 1 : inS1 ? Math.max(0, cs) : f < at(2, 0.5) ? 1 - l(2, 0.08, 22) : rise;
  const night = f < s1 ? 0 : inS1 ? Math.max(0, -cs) * 0.65 : 0.65 * (1 - sun);
  const hour = f < s1 ? 9 : 9 + 12 * t1;
  const gone = 1 - l(2, 0.08, 14);
  const spread = f < s1 ? c01(p(0, 0.25)) : f < s2 ? 0.55 + 0.25 * sw(f, 5) : 0;
  const g = l(2, 0.2, 22);
  const sheetOn = c01(l(2, 0.15, 6));
  const shx = lerp(510, 790, g);
  const shy = lerp(1030, 1060, g) - 120 * Math.sin(Math.PI * g);
  const tape = p(2, 0.42);
  const retract = l(2, 0.5, 16);
  const handX = lerp(shx - 140, 470, retract);
  const handY = lerp(shy + 30, 1110, retract);
  const back = l(2, 0.5, 34);
  const xi = back > 0 ? lerp(1250, 790, back) : lerp(790, 1250, l(2, 0.05, 22));
  const walking = back > 0 && back < 1 ? 1 : 0;
  const bob = 12 * Math.abs(sw(f, 3)) * walking;
  const gaze = l(2, 0.76, 14);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={240} y={770} p={p(1, 0.15)} solid size={36} o={1 - l(2, 0, 6)} />
      <Tag i={1} x={790} y={1172} p={p(2, 0.4)} solid size={32} />
      <Tag i={2} x={790} y={548} p={p(2, 0.78)} solid size={34} />
    </>}>
      <G x={300} y={430} s={p(0, 0)}><Win sun={sun} night={night} rot={f * 0.6} /></G>
      <G x={870} y={400} s={p(0, 0.05) * gone}>
        <Clock r={100} hour={hour} minute={hour * 60} />
        <circle r={118} fill="none" stroke={GOLDL} strokeWidth={9} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - t1} transform="rotate(-90)" strokeLinecap="round" />
      </G>
      {/* Bạn thực tập sinh đứng sau bàn; rời đi khi lời dặn tan, quay lại ở lần mặt trời mọc kế tiếp. */}
      <G x={xi} y={810 + bob} r={inS1 ? 3 * sw(f, 4) : 0}><Worker fill={SEC} s={1.8} badge /></G>
      {/* Bàn: mặt bàn và mặt trước, tờ nội quy dán lên mặt trước. */}
      <G x={790} y={1055} s={p(0, 0.1)}>
        <Box cx={0} cy={-175} w={430} h={30} rx={10} fill={GOLD} />
        <Box cx={0} cy={0} w={400} h={350} rx={12} fill={EL} stroke={HOV} strokeWidth={5} />
      </G>
      {sheetOn > 0 && (
        <G x={shx} y={shy} s={lerp(0.5, 1, g) * sheetOn} r={lerp(-20, 0, g)}><Sheet w={280} h={300} l1={tape} l2={tape} /></G>
      )}
      {[-1, 1].map((sd) => (
        <G key={sd} x={790 + sd * 120} y={916} s={tape} r={sd * 18}><Box cx={0} cy={0} w={74} h={26} rx={5} fill={GOLDL} opacity={0.85} /></G>
      ))}
      {gaze > 0 && <Arrow x1={865} y1={690} x2={925} y2={955} p={gaze} color={GOLDL} w={7} dash />}
      <circle cx={790} cy={1060} r={190 + 10 * sw(f, 8)} fill="none" stroke={GOLDL} strokeWidth={5} opacity={0.5 * gaze} strokeDasharray="16 14" />
      {/* Bạn dang tay; dấu hỏi nổi giữa hai người. */}
      <G x={330} y={1098} s={p(0, 0.05)}>
        <Worker fill={TXT} s={1.9} a={spread} hideR={f >= s2} />
      </G>
      {f >= s2 && <path d={`M417 1087 L${handX} ${handY}`} stroke={TXT} strokeWidth={42} strokeLinecap="round" opacity={l(2, 0.12, 6)} />}
      <G x={520} y={780 + 12 * sw(f, 12)} s={1.5 * p(0, 0.35) * (1 - l(1, 0, 6))}><Question /></G>
      {/* Bong bóng lời dặn tràn ra từ miệng bạn vào tai bạn thực tập sinh. */}
      {Array.from({ length: 9 }, (_, k) => {
        const u = ((((f - s1) / 26 + k / 9) % 1) + 1) % 1;
        const x = lerp(460, 590, u);
        const y = lerp(880, 730, u) - 90 * Math.sin(Math.PI * u) + 22 * (k % 2 ? 1 : -1);
        const o = c01(l(1, 0, 6) * Math.sin(Math.PI * u) * 4) * (1 - l(2, 0.05, 10));
        return (
          <G key={k} x={x} y={y} s={0.7} r={-8 + (16 * ((k * 7) % 5)) / 5} o={o}>
            <Box cx={0} cy={0} w={190} h={100} rx={22} fill={GOLD} />
            <Box cx={-20} cy={-14} w={120} h={14} rx={7} fill={INK} />
            <Box cx={-34} cy={14} w={90} h={14} rx={7} fill={INK} />
          </G>
        );
      })}
      {/* Gạch chéo đỏ đóng lên đồng hồ và dòng lời dặn. */}
      <G x={870} y={400} s={lerp(2.4, 1, p(2, 0)) * c01(p(2, 0) * 3)} o={1 - l(2, 0.3, 12)}>
        <circle r={96} fill="none" stroke={RED} strokeWidth={10} /><Cross r={60} />
      </G>
      <G x={540} y={830} s={lerp(2.4, 1, p(2, 0.06)) * c01(p(2, 0.06) * 3)} o={1 - l(2, 0.3, 12)}>
        <Cross r={150} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 8 — Thiếu bối cảnh thì bịa; tờ nội quy lấp khung rỗng, chip méo hít lại thẳng, xúc xắc đoán mò lăn mất. */
export const ThieuBoiCanhNoiQuy: React.FC = () => {
  const { f, p, l } = useT();
  const m = l(1, 0, 24);
  const fm = l(1, 0.32, 8);
  const c = l(1, 0.4, 20);
  const dt = l(1, 0.05, 40);
  const dx = lerp(880, 1180, dt);
  const dy = 1000 - 50 * Math.abs(Math.sin(dt * Math.PI * 3)) + 3600 * Math.max(0, dt - 0.62) ** 2;
  const rot = lerp(-20, 0, c) + (1 - c) * 4 * sw(f, 4);
  const sk = lerp(-24, 0, c);
  const ring = l(1, 0.55, 20);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={740} y={735} p={p(0, 0.45)} solid size={34} o={1 - l(1, 0, 8)} />
      <Tag i={1} x={380} y={705} p={p(1, 0.3)} solid size={34} />
      <Tag i={2} x={540} y={1130} p={p(1, 0.62)} solid size={36} />
    </>}>
      {/* Khung tranh rỗng: nét đứt chạy, đổi sang nét liền vàng khi tờ nội quy khít vào. */}
      <G x={540} y={440} s={p(0, 0)}>
        <Box cx={0} cy={0} w={540} h={420} rx={30} fill={SURF} />
        <Box cx={0} cy={0} w={540} h={420} rx={30} fill="none" stroke={SEC} strokeWidth={7} strokeDasharray="22 16" strokeDashoffset={-f * 0.8} opacity={1 - fm} />
        <Box cx={0} cy={0} w={540} h={420} rx={30} fill="none" stroke={GOLD} strokeWidth={9} opacity={fm} />
      </G>
      {m > 0 && <G x={lerp(1180, 540, m)} y={lerp(300, 440, m)} r={lerp(35, 0, m)}><Sheet w={400} h={360} l1={fm} l2={fm} /></G>}
      {/* Mũi tên nguyên nhân chỉ xuống chip. */}
      <Arrow x1={540} y1={660} x2={540} y2={845} p={l(0, 0.3, 20)} />
      {/* Mảnh chip văng ra theo chip méo. */}
      {[[230, 930, -25], [850, 880, 30], [300, 1110, 18], [800, 1140, -14]].map(([x, y, r], k) => (
        <G key={k} x={x} y={y + 6 * sw(f, 9, k)} r={r} s={p(0, 0.5 + k * 0.05) * (1 - c)}><Box cx={0} cy={0} w={90} h={60} rx={14} fill={EL} stroke={RED} strokeWidth={4} /></G>
      ))}
      {/* Chip số: méo mó rồi hít thẳng. */}
      <G x={540} y={960 + 8 * sw(f, 7) * (1 - c)} s={p(0, 0.35)}>
        <g transform={`rotate(${rot}) skewX(${sk})`}>
          <Chip w={330} h={190} stroke={RED} jit={14 * (1 - c)} f={f} />
          <Box cx={0} cy={0} w={330} h={190} rx={46} fill="none" stroke={GOLD} strokeWidth={8} opacity={c} />
        </g>
      </G>
      <circle cx={540} cy={960} r={130 + 90 * ring} fill="none" stroke={GOLDL} strokeWidth={6} opacity={(1 - ring) * c} />
      {/* Xúc xắc đoán mò lăn khỏi mép khung rồi rơi mất. */}
      <G x={dx} y={dy + 5 * sw(f, 10) * (1 - c01(dt * 20))} r={dt * 720} s={p(0, 0.55)}>
        <Box cx={0} cy={0} w={110} h={110} rx={20} fill={TXT} />
        {[[-26, -26], [26, -26], [0, 0], [-26, 26], [26, 26]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={9} fill={INK} />)}
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

const Mark: React.FC<{ kind: 0 | 1; lit: number; size?: number }> = ({ kind, lit, size = 120 }) => (
  <g>
    <Box cx={0} cy={0} w={size} h={size} rx={size * 0.26} fill={INK} stroke={lit > 0.5 ? GOLD : HOV} strokeWidth={6} />
    {kind === 0
      ? Array.from({ length: 8 }, (_, i) => <line key={i} x1={0} y1={-size * 0.12} x2={0} y2={-size * 0.34} stroke={lit > 0.5 ? GOLDL : SEC} strokeWidth={9} strokeLinecap="round" transform={`rotate(${i * 45})`} />)
      : (
        <g stroke={lit > 0.5 ? TXT : SEC} strokeWidth={7} fill="none">
          <path d={`M0 ${-size * 0.34} L${size * 0.29} ${-size * 0.17} V${size * 0.17} L0 ${size * 0.34} L${-size * 0.29} ${size * 0.17} V${-size * 0.17} Z`} strokeLinejoin="round" />
          <circle r={size * 0.12} />
        </g>
      )}
    {lit > 0.5 && <circle r={size * 0.7} fill="none" stroke={GOLDL} strokeWidth={4} opacity={0.5} />}
  </g>
);

/** Cảnh 9 — Tờ nội quy gấp thành file vào thư mục; thư mục tách đôi, mỗi bên một thẻ tên và một biểu tượng. */
export const HaiTenFileQuyTac: React.FC = () => {
  const { f, p, l } = useT();
  const ms = l(1, 0, 14);
  const mw = 900;
  const mh = 880;
  const my = 700;
  const fo = l(0, 0.22, 18);
  const sl = l(0, 0.45, 22);
  const sl2 = l(0, 0.62, 12);
  const sp = l(1, 0, 18);
  const open = (1 - l(0, 0.62, 12)) * (1 - sp);
  const glow = l(0, 0.8, 26);
  const fy = lerp(720, 860, sp);
  const fs = lerp(2.2, 1.7, sp);
  const cp = l(2, 0, 22);
  const lit1 = l(1, 0.55, 12);
  const lit2 = l(2, 0.3, 12);
  const sheetX = lerp(250, 540, sl);
  const sheetY = lerp(720, 500, sl) - 60 * Math.sin(Math.PI * sl) + 90 * sl2;
  const fileX = lerp(540, 315, sp);
  const fileY = lerp(590, 630, sp);
  const fileS = lerp(2, 2.3, sp);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={940} p={p(0, 0.7)} solid size={36} o={1 - l(1, 0, 8)} />
      <Tag i={3} x={315} y={440} p={p(1, 0.45)} size={30} solid />
      <Tag i={1} x={315} y={655} p={p(1, 0.5)} solid size={28} />
      <Tag i={4} x={765} y={440} p={p(2, 0.35)} size={30} solid />
      <Tag i={2} x={765} y={655} p={p(2, 0.5)} solid size={28} />
    </>}>
      {/* Màn hình máy tính, lớn dần khi thư mục tách đôi. */}
      <Box cx={540} cy={my + mh / 2 + 12} w={90} h={34} fill={HOV} />
      <Box cx={540} cy={my + mh / 2 + 34} w={520} h={28} rx={12} fill={GOLD} />
      <Box cx={540} cy={my} w={mw} h={mh} rx={30} fill={INK} stroke={GOLD} strokeWidth={8} />
      <Box cx={540} cy={my} w={mw - 44} h={mh - 44} rx={18} fill={SURF} />
      {[0, 1, 2].map((k) => <Box key={k} cx={540 - mw / 2 + 70} cy={my - mh / 2 + 70 + k * 64} w={52} h={52} rx={12} fill={HOV} opacity={0.8 * (1 - ms)} />)}
      {[0, 1, 2, 3, 4].map((k) => <Box key={"d" + k} cx={250 + k * 145} cy={1050} w={90} h={90} rx={20} fill={HOV} opacity={0.8 * (1 - ms)} />)}
      
      {/* File bay lên từ thư mục trái; bản sao sang thư mục phải. */}
      <G x={fileX} y={fileY} s={fileS} o={sl2}><FileGlyph /></G>
      {cp > 0 && <G x={lerp(315, 765, cp)} y={630 - 110 * Math.sin(Math.PI * cp)}><FileGlyph s={2.3} /></G>}
      {/* Hai thư mục: lúc đầu chồng khít một chỗ. */}
      <G x={lerp(540, 315, sp)} y={fy} s={p(0, 0)}><G s={fs}><Folder open={open} /></G></G>
      <G x={lerp(540, 765, sp)} y={fy} s={p(0, 0)}><G s={fs}><Folder open={open} /></G></G>
      {/* Tờ nội quy gấp thành file rồi chui vào thư mục. */}
      <G x={sheetX} y={sheetY} s={p(0, 0) * lerp(1, 2, sl2)} o={1 - sl2}>
        {fo < 1 ? (
          <g>
            <g transform={`scale(${lerp(1, 0.42, fo)} ${lerp(1, 0.43, fo)})`}><Sheet w={240} h={300} /></g>
            <line x1={0} y1={-65} x2={0} y2={65} stroke={SEC} strokeWidth={4} opacity={fo} />
          </g>
        ) : <FileGlyph />}
      </G>
      <circle cx={540} cy={720} r={lerp(150, 330, glow)} fill="none" stroke={GOLDL} strokeWidth={8} opacity={(1 - glow) * c01(glow * 8) * (1 - ms)} />
      {/* Hai biểu tượng và dấu bằng giữa hai thư mục. */}
      <G x={315} y={345} s={p(1, 0.3)}><Mark kind={0} lit={lit1} /></G>
      <G x={765} y={345} s={p(1, 0.4)}><Mark kind={1} lit={lit2} /></G>
      {[-1, 1].map((sd) => <Box key={sd} cx={540} cy={860 + sd * 16} w={36} h={14} rx={7} fill={GOLDL} opacity={l(2, 0.6, 14)} />)}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 10 — Hai dòng quy tắc: khóa chân số liệu (xích, biển chặn, dấu hỏi hướng về người) rồi trích nguồn (dây ghim vào dòng và trang). */
export const KhoaChanVaTrichNguon: React.FC = () => {
  const { f, p, l } = useT();
  const X = [180, 340, 500, 660];
  const PX = [215, 345, 480, 600];
  const RY = [610, 540, 470, 400];
  const tug = l(0, 0.5, 14);
  const off = 1 - l(1, 0, 10);
  const c3x = lerp(660, 700, tug * off);
  const mv = l(1, 0, 18);
  const q = l(0, 0.72, 24);
  const push = l(1, 0.6, 16);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={1150} p={p(0, 0.5)} solid size={36} o={off} />
      <Tag i={1} x={540} y={1150} p={p(1, 0.05)} solid size={36} />
      <Tag i={2} x={400} y={345} p={p(1, 0.45)} solid size={30} />
      <Tag i={3} x={610} y={230} p={p(1, 0.55)} solid size={30} />
    </>}>
      {/* Tờ nội quy: dòng đầu sáng vàng ở câu một, dòng hai ở câu hai; sau đó thu về góc phải. */}
      <G x={260} y={410} s={p(0, 0) * lerp(1, 0.8, mv)} o={1 - l(1, 0.4, 12)}>
        <Sheet w={320} h={330} l1={l(0, 0.08, 12)} l2={l(1, 0, 12)} />
      </G>
      <G o={off}>
        <Arrow x1={260} y1={585} x2={340} y2={770} p={l(0, 0.18, 16)} dash />
        {/* Người ngồi bàn bên phải. */}
        <G x={800} y={505} s={p(0, 0.05)}><Worker fill={TXT} s={1.4} /></G>
        <Box cx={800} cy={580} w={340} h={26} rx={8} fill={GOLD} />
        <Box cx={660} cy={625} w={20} h={90} fill={GOLD} /><Box cx={940} cy={625} w={20} h={90} fill={GOLD} />
        <G x={lerp(840, 800, q)} y={lerp(775, 670, q)} s={0.9 * c01(q * 3)}><Question /></G>
        {/* Chỗ hổng và biển chặn. */}
        <G x={850} y={850} s={p(0, 0.45)}>
          <Box cx={0} cy={0} w={130} h={90} rx={22} fill="none" stroke={SEC} strokeWidth={5} strokeDasharray="10 8" />
        </G>
        <G x={815} y={850} s={p(0, 0.58)}>
          <path d={Array.from({ length: 8 }, (_, i) => `${i ? "L" : "M"}${(52 * Math.cos((i + 0.5) * Math.PI / 4)).toFixed(1)} ${(52 * Math.sin((i + 0.5) * Math.PI / 4)).toFixed(1)}`).join(" ") + "Z"} fill={RED} />
          <Box cx={0} cy={0} w={60} h={12} rx={5} fill={TXT} />
        </G>
      </G>
      {/* Bốn chip bị xích khóa chân vào nền. */}
      {X.map((ax, i) => {
        const cx = i === 3 ? c3x : ax;
        const ck = p(0, 0.18 + 0.07 * i);
        const ang = (Math.atan2(995 - 905, ax - cx) * 180) / Math.PI;
        return (
          <g key={i}>
            <g opacity={c01(ck)}>
              <circle cx={cx} cy={897} r={13} fill="none" stroke={GOLDL} strokeWidth={6} />
              {[0, 1, 2].map((j) => {
                const t = (j + 1) / 4;
                const lx = lerp(cx, ax, t);
                const ly = lerp(905, 995, t);
                return <ellipse key={j} cx={lx} cy={ly} rx={14} ry={8} fill="none" stroke={GOLD} strokeWidth={5} transform={`rotate(${ang + j * 90} ${lx} ${ly})`} />;
              })}
              <Box cx={ax} cy={1010} w={64} h={22} rx={8} fill={GOLD} />
            </g>
            <G x={ax} y={1062} s={0.5 * c01(ck)}><Lock /></G>
            <G x={cx} y={850 + 3 * sw(f, 12, i)} s={p(0, 0.02 + 0.04 * i)}><Chip /></G>
          </g>
        );
      })}
      {/* Câu hai: trang nguồn, dây ghim từng chip vào đúng một dòng. */}
      <G x={425} y={495} s={p(1, 0.02)}>
        <Box cx={0} cy={0} w={530} h={390} rx={18} fill={TXT} />
        <Box cx={185} cy={-213} w={120} h={36} rx={10} fill={GOLD} />
      </G>
      {PX.map((px, i) => {
        const wv = l(1, 0.12 + 0.1 * i, 14);
        const w = px + 25 - 190;
        return (
          <g key={i}>
            <Box cx={190 + w / 2} cy={RY[i]} w={w} h={16} rx={8} fill={SEC} opacity={0.55 * p(1, 0.02)} />
            <rect x={190} y={RY[i] - 8} width={w * wv} height={16} rx={8} fill={GOLD} />
            <path d={`M${X[i]} 805 Q${X[i]} ${(805 + RY[i]) / 2} ${px} ${RY[i]}`} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - wv} fill="none" stroke={GOLDL} strokeWidth={5} strokeLinecap="round" />
            <Box cx={X[i]} cy={800} w={40} h={24} rx={6} fill={GOLDL} opacity={c01(wv * 4)} />
            <circle cx={px} cy={RY[i]} r={11} fill={GOLD} stroke={INK} strokeWidth={3} opacity={c01((wv - 0.9) * 10)} />
          </g>
        );
      })}
      {/* Chip thứ năm không có dây: bị đẩy khỏi hàng, viền chuyển đỏ. */}
      <G x={850 + 50 * push} y={850 + 270 * push} r={14 * push} s={p(1, 0.35)}>
        <Chip />
        <Box cx={0} cy={0} w={130} h={90} rx={22} fill="none" stroke={RED} strokeWidth={7} opacity={c01(push * 2)} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

const wavy = (r: number, ph: number): string =>
  Array.from({ length: 40 }, (_, i) => {
    const a = (i / 40) * 2 * Math.PI;
    const rr = r * (1 + 0.07 * Math.sin(8 * a + ph));
    return `${i ? "L" : "M"}${(rr * Math.cos(a)).toFixed(1)} ${(rr * Math.sin(a) * 0.65).toFixed(1)}`;
  }).join(" ") + "Z";

const QBubble: React.FC<{ w?: number; h?: number }> = ({ w = 170, h = 100 }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={22} fill={GOLD} />
    <path d={`M${-w / 2 + 14} ${h / 2 - 4} L${-w / 2 - 6} ${h / 2 + 26} L${-w / 2 + 44} ${h / 2 - 4} Z`} fill={GOLD} />
    <Question s={0.3} color={INK} />
  </g>
);

/** Cảnh 11 — Dặn chung chung trôi lệch; dặn đúng một cột thì chùm sáng chiếu cột ấy; đổi vai AI phỏng vấn ngược rồi nhét tờ quy tắc vào thư mục. */
export const DanCuThePhongVanNguoc: React.FC = () => {
  const { f, p, l } = useT();
  const CX = [220, 380, 540, 700, 860];
  const bt = l(0, 0.05, 52);
  const bx = lerp(190, 800, bt);
  const by = lerp(360, 400, bt) + 10 * sw(f, 6);
  const bo = 1 - l(1, 0, 10);
  const sweep = ez(l(1, 0, 28));
  const bcx = lerp(220, 700, sweep);
  const lit = l(1, 0.55, 14);
  const s2gone = 1 - l(2, 0, 10);
  const BX = [190, 365, 540, 715, 890];
  const BY = [360, 300, 360, 300, 360];
  const gather = l(2, 0.66, 18);
  const sh = p(2, 0.78);
  const sl = l(2, 0.88, 14);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={Math.min(bx, 740)} y={by - 140} p={p(0, 0.1)} solid size={34} o={bo} />
      <Tag i={1} x={700} y={1140} p={p(1, 0.62)} solid size={34} o={s2gone} />
      <Tag i={2} x={290} y={620} p={p(2, 0.25)} solid size={34} />
      <Tag i={3} x={860} y={590} p={p(2, 0.02)} solid size={34} />
    </>}>
      <defs><filter id="b11"><feGaussianBlur stdDeviation="5" /></filter></defs>
      {/* Bảng nhiều cột dựng đứng. */}
      <G o={s2gone}>
        {CX.map((x, k) => {
          const dim = k === 3 ? 0 : 0.6 * lit;
          return (
            <G key={k} x={x} y={800} s={p(0, 0.02 * k)} o={1 - dim}>
              <Box cx={0} cy={0} w={120} h={560} rx={16} fill={HOV} stroke={k === 3 && lit > 0 ? GOLD : SEC} strokeWidth={4} />
              <Box cx={0} cy={-250} w={120} h={60} rx={16} fill={SEC} />
              {[0, 1, 2, 3, 4].map((r) => <Box key={r} cx={0} cy={-160 + r * 85} w={90} h={46} rx={8} fill={TXT} opacity={0.55} />)}
              {k === 3 && <Box cx={0} cy={0} w={120} h={560} rx={16} fill={GOLD} opacity={0.88 * lit} />}
              {k === 3 && [0, 1, 2, 3, 4].map((r) => <Box key={r} cx={0} cy={-160 + r * 85} w={90} h={46} rx={8} fill={GOLDL} opacity={lit} />)}
            </G>
          );
        })}
        {/* Chùm sáng hẹp quét xuống từ đèn trên cao. */}
        <G x={540} y={235} s={p(1, 0)}>
          <path d="M-30 45 L30 45 L50 5 L-50 5 Z" fill={GOLD} /><circle cx={0} cy={57} r={12} fill={GOLDL} />
        </G>
        <polygon points={`525,296 555,296 ${bcx + 56},1082 ${bcx - 56},1082`} fill={GOLDL} opacity={0.2 * l(1, 0, 6)} />
        {/* Lời dặn đúng: mũi tên cắm vào đầu cột. */}
        <G x={250} y={400} s={p(1, 0.45)}><Bubble w={260} h={130} /></G>
        <Arrow x1={370} y1={415} x2={655} y2={540} p={l(1, 0.55, 16)} />
      </G>
      {/* Lời dặn chung chung: bong bóng mờ nhoè trôi lệch, trượt qua mọi cột. */}
      <G x={bx} y={by} o={bo} s={p(0, 0)}>
        <g filter="url(#b11)">
          <path d={wavy(150, f / 6)} fill={GOLD} opacity={0.5} stroke={GOLDL} strokeWidth={7} />
          <Box cx={-10} cy={-16} w={170} h={16} rx={8} fill={SEC} /><Box cx={-30} cy={20} w={120} h={16} rx={8} fill={SEC} />
        </g>
      </G>
      {[1, 2, 3].map((k) => <circle key={k} cx={bx - 90 - k * 40} cy={by + 20 * sw(f, 5, k)} r={9 - k * 2} fill={GOLDL} opacity={0.5 * bo * c01(bt * 5)} />)}
      {/* Đổi vai: AI ngồi đối diện bạn, năm bong bóng câu hỏi, câu trả lời gom thành tờ quy tắc rồi vào thư mục. */}
      <G x={225} y={965} s={p(2, 0)}><Box cx={0} cy={0} w={260} h={40} rx={12} fill={GOLD} /></G>
      <G x={840} y={1005} s={p(2, 0)}><Box cx={0} cy={0} w={260} h={40} rx={12} fill={GOLD} /></G>
      <G x={225} y={810 + 4 * sw(f, 18)} s={p(2, 0)}><AI size={250} /></G>
      <G x={850} y={900 + 8 * Math.abs(sw(f, 7))} s={p(2, 0.02)}><Worker fill={TXT} s={2} /></G>
      {BX.map((x, k) => {
        const qp = l(2, 0.05 + 0.12 * k, 12);
        const px = lerp(280, x, qp);
        const py = lerp(760, BY[k], qp) - 80 * Math.sin(Math.PI * qp);
        const dp = l(2, 0.12 + 0.12 * k, 12);
        const dpx = gather > 0 ? lerp(x, 540, gather) : lerp(800, x, dp);
        const dpy = gather > 0 ? lerp(BY[k], 720, gather) : lerp(760, BY[k] + 10, dp) - 50 * Math.sin(Math.PI * dp);
        return (
          <g key={k}>
            <G x={px} y={py} s={c01(qp * 2) * lerp(0.3, 1, qp)} o={lerp(1, 0.9, gather)}><QBubble /></G>
            {dp > 0 && gather < 1 && <circle cx={dpx} cy={dpy} r={14} fill={GOLDL} />}
          </g>
        );
      })}
      <G x={540} y={lerp(720, 985, sl)} s={sh * lerp(1, 0.55, sl)}><Sheet w={260} h={330} l1={1} l2={1} /></G>
      <G x={540} y={1105} s={p(2, 0.02) * 1.8}><Folder open={1 - l(2, 0.9, 12)} /></G>
      <circle cx={540} cy={720} r={lerp(60, 180, gather)} fill="none" stroke={GOLDL} strokeWidth={5} opacity={Math.sin(Math.PI * gather) * 0.6} />
      <Floor y={1240} />
    </Stage>
  );
};

const Card: React.FC<{ w: number; h: number; slot: number }> = ({ w, h, slot }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} />
    <path d={`M${-w / 2} ${-h / 2 + 70} H${w / 2}`} stroke={HOV} strokeWidth={4} />
    {[0, 1, 2].map((i) => <circle key={i} cx={-w / 2 + 40 + i * 32} cy={-h / 2 + 35} r={10} fill={i === 0 ? GOLD : HOV} />)}
    <Box cx={-w * 0.12} cy={-h * 0.14} w={w * 0.5} h={34} rx={17} fill={HOV} />
    <Box cx={w * 0.14} cy={-h * 0.02} w={w * 0.42} h={34} rx={17} fill={GOLD} opacity={0.7} />
    <Box cx={0} cy={h / 2 - 70} w={w - 70} h={110} rx={40} fill={SURF} stroke={HOV} strokeWidth={4} />
    <circle cx={w / 2 - 90} cy={h / 2 - 70} r={30} fill={GOLD} />
    <Box cx={-w / 2 + 90} cy={h / 2 - 70} w={86} h={86} rx={18} fill="none" stroke={SEC} strokeWidth={6} strokeDasharray="14 10" opacity={slot} />
    <G x={-w / 2 + 90} y={h / 2 - 70} s={1.5} o={0.35 * slot}>
      <path d="M0 20 V-22 M-16 -6 L0 -24 L16 -6" fill="none" stroke={SEC} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
    </G>
  </g>
);

/** Cảnh 12 — Không có nút tải lên: file tìm khe giữa hai khung chat, ô trống bị gạch chéo, file về nằm trong thư mục. */
export const KhongCoNutTaiLen: React.FC = () => {
  const { f, p, l } = useT();
  const ra = ez(l(2, 0, 22));
  const Ax = lerp(390, 250, ra);
  const Ay = lerp(760, 470, ra);
  const As = lerp(1, 0.5, ra);
  const Bx = lerp(690, 830, ra);
  const By = lerp(910, 480, ra);
  const Bs = lerp(1, 0.5, ra);
  const fx0 = 540 + 110 * sw(f, 14);
  const fy0 = 290 + 30 * Math.abs(sw(f, 9));
  const fr0 = 20 * sw(f, 14, 1);
  const tt = ez(l(1, 0.1, 14)) * (1 - ez(l(1, 0.32, 14)));
  const fp = ez(l(2, 0.05, 24));
  const fxw = lerp(lerp(fx0, 190, tt), 540, fp);
  const fyw = lerp(lerp(fy0, 825, tt), 700, fp);
  const frw = lerp(lerp(fr0, 0, tt), 0, fp);
  const slot = p(1, 0.02) * (1 - l(2, 0, 10));
  const away = 1 - l(2, 0, 10);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={fx0} y={470} p={p(0, 0.3)} solid size={34} o={1 - l(1, 0, 8)} />
      <Tag i={2} x={Ax + 70 * As} y={Ay + (-220 + 35) * As} p={p(0, 0.45)} size={30} solid />
      <Tag i={3} x={Bx + 140 * Bs} y={By + (-210 + 35) * Bs} p={p(0, 0.55)} size={30} solid />
      <Tag i={1} x={245} y={820} p={p(1, 0.05)} solid size={32} o={1 - l(2, 0, 6)} />
    </>}>
      {/* Hai khung chat xếp chồng chéo như hai tấm thẻ. */}
      <G x={Ax} y={Ay} s={p(0, 0) * As} r={-4}><Card w={580} h={440} slot={slot} /></G>
      <G x={Bx} y={By} s={p(0, 0.1) * Bs} r={5}><Card w={560} h={420} slot={slot} /></G>
      {/* Dấu hỏi nở ra quanh file đang tìm khe. */}
      {[[330, 330], [760, 320], [410, 215], [690, 215]].map(([x, y], k) => (
        <G key={k} x={x} y={y + 8 * sw(f, 11, k)} s={0.5 * p(0, 0.3 + k * 0.08) * (1 - l(1, 0, 8))}><Question /></G>
      ))}
      {/* Gạch chéo đỏ in lên ô trống của từng thanh công cụ. */}
      <G x={Ax - 200 * As} y={Ay + 150 * As} s={p(1, 0.36) * As * away}><Cross r={40} /></G>
      <G x={Bx - 190 * Bs} y={By + 140 * Bs} s={p(1, 0.6) * Bs * away}><Cross r={40} /></G>
      {/* Folder thư mục: file về nằm trong đó. */}
      <G x={fxw} y={fyw} r={frw}><FileGlyph s={lerp(1.6, 1.5, fp)} /></G>
      <G x={540} y={900} s={2.1 * p(2, 0)}><Folder /></G>
      <Floor y={1240} />
    </Stage>
  );
};
