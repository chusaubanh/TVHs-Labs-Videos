import React from "react";
import { AI, Box, BrandEnd, Clock, EL, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, Person, Question, RED, SEC, Stage, SURF, Tag, TXT, lerp, useT } from "../shared/art";
import { Boss, Eye, Phone } from "../bai-3/art";

/** Màu chỉ dùng BÊN TRONG trang HTML (nguồn nói rõ: giá tốt xanh, thanh toán bất lợi cam). */
const OK = "#5FB37A";
const WARN = "#E8964A";

const c01 = (v: number): number => Math.min(1, Math.max(0, v));
const hit = (f: number, fr: number, d = 9): number => Math.sin(c01((f - fr) / d) * Math.PI);

/** Kính tròn vàng mảnh của AI, giống Bài 2. */
const AIG: React.FC<{ size: number }> = ({ size }) => (
  <g>
    <AI size={size} />
    {[-1, 1].map((sd) => (
      <circle key={sd} cx={sd * size * 0.2} cy={-size * 0.04} r={size * 0.15} fill="none" stroke={GOLD} strokeWidth={Math.max(3, size * 0.025)} />
    ))}
  </g>
);

const SP = (() => {
  let d = "";
  for (let i = 0; i <= 26; i++) {
    const t = i / 26;
    const a = t * Math.PI * 5;
    const r = 1 + 10 * t;
    d += `${i ? "L" : "M"}${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)} `;
  }
  return d;
})();

/** Mặt sếp trong toạ độ của Boss: mắt xoáy hoặc mắt bình tĩnh có cười. */
const BossFace: React.FC<{ f: number; calm?: number }> = ({ f, calm = 0 }) => (
  <g>
    {[-18, 18].map((x, k) => (
      <g key={x}>
        <g opacity={1 - calm} transform={`translate(${x} -79) rotate(${f * 14 * (k ? -1 : 1)})`}>
          <path d={SP} fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
        </g>
        <circle cx={x} cy={-79} r={4.5} fill={INK} opacity={calm} />
      </g>
    ))}
    <path d="M-10 -58 Q0 -49 10 -58" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" opacity={calm} />
  </g>
);

/** Bạn: người đầu tròn, mặt tối giản. */
const Ban: React.FC<{ x: number; y: number; sx?: number; sy?: number; r?: number; mood?: "worry" | "smile" | "stiff" | "bright"; up?: number; fill?: string }> = ({ x, y, sx = 1.5, sy, r = 0, mood = "worry", up = 0, fill = TXT }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${sx} ${sy ?? sx})`}>
    <Person fill={fill} />
  </g>
);

/** Bảng Excel: lưới ô dày, số lít nhít vẽ bằng gạch xám, n là số cột đang hiện. */
const Sheet: React.FC<{ w: number; h: number; cols: number; rows: number; n?: number; head?: string }> = ({ w, h, cols, rows, n = cols, head = HOV }) => {
  const cw = w / cols;
  const ch = h / rows;
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={h} rx={Math.min(14, cw / 3)} fill="#DDD6C4" />
      {Array.from({ length: cols }, (_, c) => {
        const o = c01(n - c);
        if (o <= 0) return null;
        const x = -w / 2 + c * cw;
        return (
          <g key={c} opacity={o}>
            <rect x={x + 1} y={-h / 2 + 1} width={cw - 2} height={ch - 2} rx={2} fill={head} />
            {Array.from({ length: rows - 1 }, (_, r) => (
              <rect key={r} x={x + cw * 0.14} y={-h / 2 + (r + 1) * ch + ch * 0.36} width={cw * (0.36 + (((r * 7 + c * 3) % 5) * 0.1))} height={Math.max(2.5, ch * 0.24)} rx={1.5} fill={SEC} />
            ))}
            <line x1={x + cw} x2={x + cw} y1={-h / 2} y2={h / 2} stroke={HOV} strokeWidth={1.5} />
          </g>
        );
      })}
      {Array.from({ length: rows - 1 }, (_, r) => (
        <line key={r} x1={-w / 2} x2={w / 2} y1={-h / 2 + (r + 1) * ch} y2={-h / 2 + (r + 1) * ch} stroke={HOV} strokeWidth={1.2} opacity={0.7} />
      ))}
    </g>
  );
};

/** Chồng file Word: k trang PAPER, mỗi trang có thanh tiêu đề xám và dòng xám. */
const WordFile: React.FC<{ n: number; w?: number; h?: number; dimFrom?: number; dim?: number }> = ({ n, w = 260, h = 340, dimFrom = 99, dim = 0 }) => (
  <g>
    {Array.from({ length: 10 }, (_, i) => {
      const t = c01(n - i);
      if (t <= 0) return null;
      return (
        <g key={i} transform={`translate(${i * 4} ${-i * 9}) scale(${t} 1)`}>
          <Box cx={0} cy={0} w={w} h={h} rx={10} fill={PAPER} stroke={HOV} strokeWidth={2} />
          <rect x={-w / 2} y={-h / 2} width={w} height={h * 0.09} rx={10} fill={SEC} />
          <Lines x={-w / 2 + 20} y={-h / 2 + h * 0.16} w={w - 40} n={9} gap={h * 0.088} color={SEC} t={Math.max(5, h * 0.03)} />
          {i >= dimFrom && <Box cx={0} cy={0} w={w} h={h} rx={10} fill={INK} opacity={0.65 * dim} />}
        </g>
      );
    })}
  </g>
);

/** Mặt bàn vàng có chân; mặt bàn ở y 985. */
const DeskTop: React.FC = () => (
  <g>
    <Box cx={130} cy={1105} w={26} h={200} rx={6} fill={HOV} />
    <Box cx={950} cy={1105} w={26} h={200} rx={6} fill={HOV} />
    <Box cx={540} cy={1218} w={900} h={12} rx={6} fill={HOV} opacity={0.4} />
    <Box cx={540} cy={985} w={900} h={30} rx={12} fill={GOLD} />
  </g>
);

/** Trang HTML ngang: thanh ba chấm, ô kết luận GOLD chiếm 1/4 trên, mục lục trái, bảng thẻ phải. */
const Page: React.FC<{ w: number; h: number; k?: number }> = ({ w, h, k = 1 }) => {
  const top = -h / 2;
  const bodyY = top + 62;
  const bodyH = h - 62 - 16;
  const cH = bodyH * 0.25;
  const y2 = bodyY + cH + 14;
  const H2 = bodyH - cH - 14;
  const tw = w * 0.22;
  const gx = -w / 2 + 20 + tw + 16;
  const cw = (w / 2 - 20 - gx) / 3;
  const ch = H2 / 3;
  const tone = [SEC, OK, SEC, WARN, SEC, SEC, OK, SEC, WARN];
  return (
    <g>
      <Box cx={0} cy={0} w={w} h={h} rx={22} fill={PAPER} stroke={HOV} strokeWidth={5} />
      <path d={`M${-w / 2} ${top + 50} V${top + 22} Q${-w / 2} ${top} ${-w / 2 + 22} ${top} H${w / 2 - 22} Q${w / 2} ${top} ${w / 2} ${top + 22} V${top + 50} Z`} fill={HOV} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={-w / 2 + 30 + i * 28} cy={top + 25} r={8} fill={SEC} />
      ))}
      <rect x={-w / 2 + 130} y={top + 14} width={w - 260} height={22} rx={11} fill={INK} opacity={0.6} />
      <rect x={-w / 2 + 20} y={bodyY} width={(w - 40) * k} height={cH} rx={14} fill={GOLD} />
      <g opacity={c01(k * 2 - 0.6)}>
        <rect x={-w / 2 + 44} y={bodyY + cH * 0.26} width={(w - 40) * 0.5} height={cH * 0.2} rx={cH * 0.1} fill={INK} />
        <rect x={-w / 2 + 44} y={bodyY + cH * 0.6} width={(w - 40) * 0.74} height={cH * 0.11} rx={cH * 0.055} fill={INK} opacity={0.55} />
      </g>
      <rect x={-w / 2 + 20} y={y2} width={tw} height={H2} rx={10} fill={SEC} opacity={0.25} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={-w / 2 + 34} y={y2 + 18 + i * (H2 / 4.4)} width={tw * (i === 1 ? 0.8 : 0.58)} height={Math.max(8, H2 / 18)} rx={5} fill={i === 1 ? GOLD : SEC} />
      ))}
      {tone.map((c, i) => {
        const cx0 = gx + (i % 3) * cw;
        const cy0 = y2 + Math.floor(i / 3) * ch;
        return (
          <g key={i}>
            <rect x={cx0 + 4} y={cy0 + 4} width={cw - 8} height={ch - 8} rx={8} fill={c} opacity={c === SEC ? 0.3 : 0.95} />
            <rect x={cx0 + 14} y={cy0 + ch * 0.4} width={(cw - 28) * (0.5 + ((i * 3) % 4) * 0.12)} height={Math.max(4, ch * 0.14)} rx={3} fill={INK} opacity={0.5} />
          </g>
        );
      })}
    </g>
  );
};

const PhoneHtml: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={172} h={320} rx={20} fill={PAPER} />
    <Box cx={0} cy={-102} w={150} h={78} rx={10} fill={GOLD} />
    <rect x={-58} y={-124} width={78} height={14} rx={7} fill={INK} />
    <rect x={-58} y={-98} width={112} height={8} rx={4} fill={INK} opacity={0.55} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={-70} y={-44 + i * 34} width={i === 1 ? 44 : 32} height={10} rx={5} fill={i === 1 ? GOLD : SEC} />
    ))}
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <Box cx={34} cy={-26 + i * 62} w={86} h={52} rx={8} fill={[OK, SEC, WARN][i]} opacity={i === 1 ? 0.35 : 0.95} />
        <rect x={12} y={-30 + i * 62} width={40} height={8} rx={4} fill={INK} opacity={0.5} />
      </g>
    ))}
  </g>
);

const PhoneExcel: React.FC = () => (
  <g>
    <Sheet w={150} h={286} cols={6} rows={18} />
  </g>
);

/** Điểm nối từ màn hình điện thoại tới mắt sếp: gạch số lít nhít. */
const Noise: React.FC<{ f: number }> = ({ f }) => (
  <g>
    {Array.from({ length: 14 }, (_, i) => {
      const t = (f * (0.008 + (i % 4) * 0.002) + i / 14) % 1;
      const toEye = i % 2 === 0;
      const x = toEye ? lerp(780, 575, t) : 790 + t * (60 + ((i * 53) % 190));
      const y = toEye ? 640 - t * 36 - Math.sin(t * Math.PI) * 80 : 560 - t * (130 + ((i * 29) % 150));
      return <rect key={i} x={x - 17} y={y} width={34} height={8} rx={4} fill={SEC} opacity={Math.sin(t * Math.PI) * 0.85} />;
    })}
  </g>
);

/** Hình neo: sếp giơ điện thoại, bạn đứng thấp ở mép dưới. Cảnh 1 và cảnh 18 dùng chung. */
const Anchor: React.FC<{ f: number; html?: boolean; calm?: number; bob?: number; k?: number }> = ({ f, html = false, calm = 0, bob = 0, k = 1 }) => (
  <g>
    <ellipse cx={540} cy={1215} rx={380} ry={18} fill={HOV} opacity={0.35} />
    <G x={540} y={800 + bob} s={2.5 * k}>
      <Boss />
      <BossFace f={f} calm={calm} />
    </G>
    <line x1={655} y1={800 + bob} x2={780} y2={850} stroke={TXT} strokeWidth={26} strokeLinecap="round" />
    <G x={790} y={690 + bob * 0.5} r={html ? 0 : Math.sin(f / 5) * 1.5} s={k}>
      <Phone w={200} h={360}>{html ? <PhoneHtml /> : <PhoneExcel />}</Phone>
    </G>
    <circle cx={782} cy={852} r={17} fill={TXT} />
    {html ? <Ban x={540} y={1130} sx={1.5} sy={1.62} mood="smile" up={1} /> : <Ban x={540} y={1145} sx={1.5} sy={1.32} r={-5} mood="worry" up={1} />}
  </g>
);

/* ------------------------------------------------------------------ cảnh 1 */
/** Cảnh 1: hình neo sếp xoáy mắt nhìn Excel; lùi lại, bạn ngồi gõ cả buổi, ba cột nhà cung cấp hiện, đồng hồ quay. */
export const HookSepNhinExcel: React.FC = () => {
  const { f, p, l } = useT();
  const out = l(1, 0, 10);
  const bench = l(1, 0.02, 14);
  const cols = l(1, 0.08, 66) * 3;
  const day = l(1, 0, 90);
  const hr = lerp(9, 15.5, day);
  const type = Math.sin(f / 2.2);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={790} y={440} p={p(0, 0.03, 9)} solid color={GOLDL} size={42} o={1 - out} />
      <Tag i={1} x={580} y={290} p={p(1, 0.3)} solid color={GOLDL} size={40} />
    </>}>
      <g opacity={1 - out}>
        <Anchor f={f} />
        <Noise f={f} />
      </g>
      {bench > 0 && (
        <g opacity={bench}>
          <G x={165} y={965} s={1.4}><Person /></G>
          <DeskTop />
          <Box cx={580} cy={600} w={600} h={400} rx={22} fill={EL} stroke={GOLD} strokeWidth={6} />
          <G x={580} y={600}><Sheet w={540} h={340} cols={3} rows={11} n={cols} head={GOLD} /></G>
          <Box cx={580} cy={820} w={60} h={40} fill={HOV} />
          <Box cx={580} cy={846} w={220} h={16} rx={8} fill={HOV} />
          <Box cx={470} cy={958} w={380} h={26} rx={8} fill={HOV} />
          <Lines x={310} y={952} w={320} n={1} t={5} color={SEC} />
          <line x1={205} y1={935} x2={400} y2={944 + type * 5} stroke={TXT} strokeWidth={20} strokeLinecap="round" />
          <circle cx={405} cy={945 + type * 5} r={13} fill={TXT} />
          <G x={925} y={310}><Clock r={54} hour={hr} minute={(hr % 1) * 60} /></G>
        </g>
      )}
    </Stage>
  );
};

/* ------------------------------------------------------------------ cảnh 2 */
const Coin: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <circle cx={0} cy={5} r={30} fill={GOLDL} />
    <circle cx={0} cy={-3} r={30} fill={GOLD} />
    <circle cx={0} cy={-3} r={18} fill="none" stroke={INK} strokeWidth={4.5} />
  </G>
);

/** Cảnh 2: bảng mười lăm cột mọc dần, đồng xu rơi khớp từng hàng; bảng gập sang bên, chồng Word dày dần mười trang. */
export const MuoiLamCotMuoiTrang: React.FC = () => {
  const { f, p, l } = useT();
  const fold = l(1, 0, 14);
  const n = l(0, 0.03, 54) * 15;
  const SW = 900;
  const SH = 640;
  const cwid = SW / 15;
  const rh = SH / 9;
  const sx = lerp(540, 215, fold);
  const sy = lerp(690, 876, fold);
  const sc = lerp(1, 0.3, fold);
  const pages = l(1, 0.06, 64) * 10;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={300} p={p(0, 0.05)} solid color={GOLDL} size={42} o={1 - l(1, 0, 8)} />
      <Tag i={1} x={640} y={265} p={p(1, 0.3)} solid color={GOLDL} size={40} />
    </>}>
      {fold > 0 && (
        <g opacity={fold}>
          <DeskTop />
        </g>
      )}
      <G x={sx} y={sy} s={sc}>
        <Sheet w={SW} h={SH} cols={15} rows={9} n={n} head={HOV} />
        {Array.from({ length: 8 }, (_, r) => {
          const k = l(0, 0.5 + r * 0.055, 10);
          if (k <= 0) return null;
          const cy = -SH / 2 + (r + 1.5) * rh;
          return <G key={r} x={-SW / 2 + 14.5 * cwid} y={cy - (1 - k) * 160} s={0.62} o={k}><Coin /></G>;
        })}
      </G>
      <G x={640} y={700}><WordFile n={pages} w={380} h={540} /></G>
      {pages > 0 && <ellipse cx={650} cy={975} rx={230} ry={12} fill={INK} opacity={0.35} />}
    </Stage>
  );
};

/* ------------------------------------------------------------------ cảnh 3 */
const Envelope: React.FC = () => (
  <g>
    <Box cx={0} cy={0} w={130} h={88} rx={8} fill={PAPER} stroke={GOLD} strokeWidth={5} />
    <path d="M-62 -38 L0 8 L62 -38" fill="none" stroke={GOLD} strokeWidth={5} strokeLinejoin="round" />
  </g>
);

/** Cảnh 3: bạn bấm gửi, bảng và giấy gấp thành thư bay sang sếp, bong bóng nghĩ sếp khen; bong bóng vỡ, sếp nảy dấu hỏi. */
export const DinhNinhGuiSep: React.FC = () => {
  const { f, at, p, l } = useT();
  const press = hit(f, at(0, 0.18), 9);
  const fold = l(0, 0.3, 10);
  const fly = l(0, 0.42, 30);
  const pop = l(1, 0, 12);
  const ex = lerp(lerp(415, 760, fly), 775, l(1, 0.1, 14));
  const ey = lerp(880, 1005, fly) - Math.sin(fly * Math.PI) * 120;
  const bub = p(0, 0.5);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={400} y={330} p={p(0, 0.55)} solid color={GOLDL} size={40} o={1 - pop} />
      <Tag i={1} x={625} y={725} p={p(1, 0.35)} solid color={GOLDL} size={40} />
    </>}>
      <ellipse cx={540} cy={1215} rx={400} ry={16} fill={HOV} opacity={0.35} />
      <Ban x={190} y={1040} sx={1.5} mood={pop > 0.5 ? "stiff" : "smile"} sy={1.5 - 0.15 * pop} r={-4 * pop} />
      {pop > 0.5 && <G x={268} y={880 + Math.min(10, (pop - 0.5) * 20)} s={0.35}><path d="M0 -34 Q26 6 0 28 Q-26 6 0 -34 Z" fill={GOLDL} /></G>}
      <line x1={250} y1={1040} x2={340} y2={1075} stroke={TXT} strokeWidth={22} strokeLinecap="round" />
      <G x={360} y={1092} s={1 - 0.16 * press}>
        <circle r={42} fill={GOLD} />
        <path d="M-14 -18 L22 0 L-14 18 L-8 0 Z" fill={INK} />
      </G>
      {/* bảng và chồng giấy gấp lại thành thư */}
      <G x={350} y={880} s={1 - fold}>
        <Sheet w={150} h={112} cols={5} rows={6} />
      </G>
      <G x={480} y={885} s={1 - fold}>
        <WordFile n={4} w={100} h={130} />
      </G>
      {/* sếp ở mép phải */}
      <G x={890} y={1040} s={1.7}><Boss /></G>
      <line x1={840} y1={1010} x2={lerp(840, 800, fly)} y2={lerp(1020, 990, fly)} stroke={TXT} strokeWidth={22} strokeLinecap="round" />
      <G x={890} y={1040} s={1.7}>
        {pop < 0.5 ? (
          <>
            <circle cx={-13} cy={-79} r={4.5} fill={INK} />
            <circle cx={13} cy={-79} r={4.5} fill={INK} />
            <path d="M-9 -55 Q0 -61 9 -55" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx={-18} cy={-79} r={4.5} fill={INK} />
            <circle cx={18} cy={-79} r={4.5} fill={INK} />
            <path d="M-10 -55 L10 -55" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
          </>
        )}
      </G>
      {fold > 0 && <G x={ex} y={ey} s={fold}><Envelope /></G>}
      {/* bong bóng nghĩ: sếp khen, bạn ưỡn ngực */}
      {pop < 1 && (
        <g opacity={1 - pop}>
          {[[270, 780, 17], [248, 822, 11], [232, 855, 7]].map(([x, y, r]) => (
            <circle key={x} cx={x} cy={y} r={r * bub} fill={EL} stroke={GOLD} strokeWidth={4} />
          ))}
          <G x={400} y={570} s={bub * (1 + pop * 0.25)}>
            <Box cx={0} cy={0} w={540} h={320} rx={150} fill={EL} stroke={GOLD} strokeWidth={6} />
            <G x={120} y={30} s={1.15}>
              <Boss />
              <circle cx={-13} cy={-79} r={4.5} fill={INK} />
              <circle cx={13} cy={-79} r={4.5} fill={INK} />
              <path d="M-12 -58 Q0 -46 12 -58" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
              <g transform="translate(78 -10)">
                <Box cx={0} cy={0} w={34} h={30} rx={8} fill={GOLDL} />
                <Box cx={-4} cy={-24} w={14} h={30} rx={7} fill={GOLDL} />
              </g>
            </G>
            <Ban x={-130} y={40} sx={1.3} mood="smile" />
          </G>
        </g>
      )}
      {/* bong bóng vỡ tan */}
      {pop > 0 && pop < 1 && (
        <g>
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const d = 120 + (i % 3) * 60;
            return <circle key={i} cx={400 + Math.cos(a) * d * pop * 1.6} cy={570 + Math.sin(a) * d * pop} r={14 * (1 - pop)} fill="none" stroke={GOLDL} strokeWidth={4} opacity={1 - pop} />;
          })}
        </g>
      )}
      {/* dấu hỏi lớn trên đầu sếp */}
      {pop > 0 && <G x={790} y={560 + Math.sin(f / 6) * 6} s={2.4 * p(1, 0.1)}><Question /></G>}
    </Stage>
  );
};

/* ------------------------------------------------------------------ cảnh 4 */
/** Cảnh 4: sếp ngồi sau bàn, điện thoại hiện bảng nhỏ xíu, mắt xoáy ôm trán; rồi sếp vẫy bạn, bong bóng thoại ba cột và hai dấu hỏi. */
export const SepMoExcelHoiBenB: React.FC = () => {
  const { f, p, l } = useT();
  const m = l(1, 0, 16);
  const bx = lerp(540, 230, m);
  const bs = lerp(2.6, 2.0, m);
  const by = 985 - 44 * bs + 22;
  const bub = p(1, 0.1);
  const wave = Math.sin(f / 4);
  const cols = [470, 650, 830];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={760} y={560} p={p(0, 0.12)} solid color={GOLDL} size={40} o={1 - m} />
      <Tag i={2} x={650} y={245} p={p(1, 0.45)} solid color={GOLDL} size={36} />
      <Tag i={1} x={740} y={690} p={p(1, 0.62)} solid color={GOLDL} size={36} />
    </>}>
      <DeskTop />
      <g>
        <G x={bx} y={by} s={bs}>
          <Boss />
          <BossFace f={f} calm={0} />
        </G>
        {/* tay ôm trán (câu 0), tay vẫy bạn (câu 1) */}
        <line x1={bx + 70 * (bs / 2.6)} y1={by - 60} x2={lerp(bx + 98, bx + 135, m)} y2={lerp(by - 160, by - 150 + wave * 14, m)} stroke={TXT} strokeWidth={22} strokeLinecap="round" />
        <circle cx={lerp(bx + 98, bx + 135, m)} cy={lerp(by - 160, by - 150 + wave * 14, m)} r={15} fill={TXT} />
      </g>
      {m < 1 && <g opacity={1 - m}><line x1={bx + 60} y1={by + 20} x2={745} y2={925} stroke={TXT} strokeWidth={22} strokeLinecap="round" /><circle cx={745} cy={928} r={16} fill={TXT} /></g>}
      {/* điện thoại */}
      <G x={lerp(760, 470, m)} y={lerp(805, 815, m)}>
        <Phone w={200} h={360}><Sheet w={150} h={286} cols={6} rows={18} /></Phone>
      </G>
      {m < 1 && <g opacity={1 - m}><Noise f={f} /></g>}
      {/* bong bóng thoại ba cột nhà cung cấp */}
      {bub > 0 && (
        <G x={650} y={475} s={bub}>
          <Box cx={0} cy={0} w={600} h={330} rx={40} fill={EL} stroke={GOLD} strokeWidth={6} />
          <path d="M-300 150 L-350 270 L-230 180 Z" fill={EL} stroke={GOLD} strokeWidth={6} strokeLinejoin="round" />
          {cols.map((x, i) => (
            <g key={x}>
              <Box cx={x - 650} cy={-110} w={120} h={46} rx={10} fill={i === 1 ? GOLD : HOV} />
              <Box cx={x - 650} cy={-30} w={120} h={i === 1 ? 110 : 64} rx={10} fill={i === 1 ? GOLDL : SEC} opacity={i === 1 ? 1 : 0.7} />
              <Lines x={x - 650 - 46} y={i === 1 ? 50 : 20} w={92} n={2} gap={30} color={HOV} t={10} />
              <circle cx={x - 650} cy={125} r={20} fill="none" stroke={GOLDL} strokeWidth={6} />
            </g>
          ))}
          <G x={90} y={-40} s={0.42}><Question /></G>
          <G x={90} y={125} s={0.42}><Question /></G>
        </G>
      )}
      {/* bạn bước tới, đầu cúi */}
      {p(1, 0.2, 18) > 0.001 && <Ban x={lerp(1150, 790, p(1, 0.2, 18))} y={1160} sx={1.3} r={12} mood="worry" up={-1} />}
    </Stage>
  );
};

/* ------------------------------------------------------------------ cảnh 5 */
/** Cảnh 5: mắt lướt trang đầu, dừng ở trang hai, quay đi, trang sau xám; khối vàng nguyên vẹn khi gạch đỏ bị gạt; Excel và Word đóng khung, ô quyết định trống. */
export const WordKhongAiDocDinhDangTinh: React.FC = () => {
  const { f, p, l } = useT();
  const s0o = 1 - l(1, 0, 8);
  const s1o = (1 - l(2, 0, 8)) * l(1, 0, 8);
  const t2 = l(0, 0.38, 10);
  const away = l(0, 0.78, 14);
  const dim = l(0, 0.5, 16);
  const look = lerp(-0.8, -0.5, t2) + away * 1.7;
  const tx = lerp(220, 290, t2);
  const a = l(1, 0.02, 10);
  const b = l(1, 0.25, 10);
  const rbx = 250 + 270 * a + 380 * b;
  const rby = 330 + 390 * a + 120 * b;
  const rrot = -20 * a + 70 * b;
  const s2 = l(2, 0, 12);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={290} y={1010} p={p(0, 0.22)} solid color={GOLDL} size={36} o={s0o} />
      <Tag i={1} x={540} y={725} p={p(2, 0.3)} solid color={GOLDL} size={36} />
      <Tag i={2} x={540} y={255} p={p(2, 0.55)} solid color={GOLDL} size={38} />
    </>}>
      {s0o > 0 && (
        <g opacity={s0o}>
          <G x={540} y={430}><Eye s={1.4} look={look} /></G>
          <path d="M360 300 Q540 235 720 300" fill="none" stroke={HOV} strokeWidth={8} strokeLinecap="round" />
          <line x1={540 + look * 42} y1={450} x2={tx} y2={680} stroke={GOLDL} strokeWidth={6} strokeDasharray="10 12" strokeLinecap="round" opacity={(1 - away) * l(0, 0.1, 6)} />
          <G x={120} y={810}>
            {Array.from({ length: 10 }, (_, j) => {
              const k = 9 - j;
              const o = p(0, 0.02 + k * 0.01);
              return (
                <g key={k} transform={`translate(${100 + k * 70} 0) scale(${Math.min(1, o)})`}>
                  <Box cx={0} cy={0} w={200} h={280} rx={10} fill={PAPER} stroke={HOV} strokeWidth={2} />
                  <rect x={-100} y={-140} width={200} height={26} rx={10} fill={SEC} />
                  <Lines x={-80} y={-96} w={160} n={6} gap={34} color={SEC} t={10} />
                  {k >= 2 && <Box cx={0} cy={0} w={200} h={280} rx={10} fill={INK} opacity={0.68 * dim} />}
                </g>
              );
            })}
          </G>
        </g>
      )}
      {s1o > 0 && (
        <g opacity={s1o}>
          <Box cx={540} cy={720} w={820} h={620} rx={36} fill={GOLDL} opacity={0.18 + 0.06 * Math.sin(f / 7)} />
          <Box cx={540} cy={720} w={760} h={560} rx={30} fill={GOLD} />
          <rect x={220} y={500} width={340} height={34} rx={17} fill={INK} />
          <Lines x={220} y={580} w={640} n={6} gap={56} color={INK} t={18} />
          <G x={rbx} y={rby} r={rrot} o={1 - l(1, 0.45, 8)}>
            <rect x={-170} y={-12} width={340} height={24} rx={12} fill={RED} />
          </G>
        </g>
      )}
      {s2 > 0 && (
        <g opacity={s2}>
          <Box cx={540} cy={430} w={440} h={240} rx={26} fill="none" stroke={GOLD} strokeWidth={6} strokeDasharray="16 12" />
          <G x={540} y={430}><Eye s={0.95} look={Math.sin(f / 18)} /></G>
          <G x={255} y={900}>
            <Sheet w={330} h={240} cols={7} rows={9} />
            <Box cx={0} cy={0} w={352} h={262} rx={14} fill="none" stroke={HOV} strokeWidth={12} />
          </G>
          <G x={825} y={900}>
            <Box cx={0} cy={0} w={330} h={240} rx={12} fill={PAPER} />
            <rect x={-165} y={-120} width={330} height={30} rx={12} fill={SEC} />
            <Lines x={-140} y={-66} w={280} n={5} gap={38} color={SEC} t={11} />
            <Box cx={0} cy={0} w={352} h={262} rx={14} fill="none" stroke={HOV} strokeWidth={12} />
          </G>
          <line x1={510} y1={490} x2={290} y2={770} stroke={GOLDL} strokeWidth={5} strokeDasharray="10 12" strokeLinecap="round" />
          <line x1={570} y1={490} x2={790} y2={770} stroke={GOLDL} strokeWidth={5} strokeDasharray="10 12" strokeLinecap="round" />
        </g>
      )}
    </Stage>
  );
};

/* ------------------------------------------------------------------ cảnh 6 */
/** Cảnh 6: AI bước tới nâng trang HTML lên giữa khung, bạn sáng mắt; hai người văn phòng lùi xua tay, bong bóng nghĩ mã rối. */
export const HomNayMotFileHtml: React.FC = () => {
  const { f, p, l } = useT();
  const walk = l(0, 0, 24);
  const rise = l(0, 0.08, 34);
  const k = l(0, 0.28, 22);
  const out = l(1, 0, 10);
  const into = l(1, 0.04, 14);
  const py = lerp(960, 600, rise) + Math.sin(f / 12) * 4;
  const ax = lerp(1160, 820, walk);
  const back = l(1, 0.3, 16);
  const wv = Math.sin(f / 4);
  const wire = l(1, 0.35, 40);
  const tangle = (() => {
    let d = "";
    for (let i = 0; i <= 90; i++) {
      const t = (i / 90) * Math.PI * 6;
      d += `${i ? "L" : "M"}${(150 * Math.sin(3 * t / 2 + 0.4)).toFixed(1)} ${(78 * Math.sin(2 * t + 1)).toFixed(1)} `;
    }
    return d;
  })();
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={265} p={p(0, 0.3)} solid color={GOLDL} size={40} o={1 - out} />
      <Tag i={3} x={700} y={262} p={p(1, 0.55)} solid color={GOLDL} size={36} />
      {into > 0 && <Tag i={1} x={lerp(520, 560, back)} y={965} p={p(1, 0.12)} solid color={GOLDL} size={30} />}
      {into > 0 && <Tag i={2} x={lerp(760, 800, back)} y={965} p={p(1, 0.2)} solid color={GOLDL} size={30} />}
    </>}>
      <ellipse cx={540} cy={1215} rx={400} ry={16} fill={HOV} opacity={0.35} />
      {out < 1 && (
        <g opacity={1 - out}>
          <G x={540} y={py}><Page w={780} h={500} k={k} /></G>
          <line x1={ax - 60} y1={1020} x2={lerp(ax - 60, 690, 1)} y2={py + 260} stroke={GOLD} strokeWidth={16} strokeLinecap="round" />
          <line x1={ax + 60} y1={1020} x2={ax + 60 - 5} y2={py + 260} stroke={GOLD} strokeWidth={16} strokeLinecap="round" />
          <G x={ax} y={1075}><AIG size={170} /></G>
          <Ban x={230} y={1090} sx={1.5} mood="bright" up={1} />
        </g>
      )}
      {into > 0 && (
        <g opacity={into}>
          <Ban x={250} y={1100} sx={1.7} mood="worry" />
          {[0, 1].map((i) => {
            const x = lerp(i ? 760 : 520, i ? 800 : 560, back);
            return (
              <g key={i}>
                <line x1={x - 62} y1={900} x2={x - 120} y2={880 - wv * 22 * (i ? -1 : 1)} stroke={SEC} strokeWidth={18} strokeLinecap="round" />
                <circle cx={x - 120} cy={880 - wv * 22 * (i ? -1 : 1)} r={14} fill={SEC} />
                <G x={x} y={930} s={1.25}><Person fill={SEC} /></G>
                <circle cx={x - 10} cy={838} r={3.5} fill={INK} />
                <circle cx={x + 10} cy={838} r={3.5} fill={INK} />
              </g>
            );
          })}
          {/* bong bóng nghĩ mã rối */}
          {[[560, 760, 14], [575, 715, 10], [590, 675, 7]].map(([x, y, r]) => (
            <circle key={y} cx={x} cy={y} r={r * p(1, 0.45)} fill={EL} stroke={GOLD} strokeWidth={4} />
          ))}
          <G x={600} y={470} s={p(1, 0.5)}>
            <Box cx={0} cy={0} w={760} h={330} rx={90} fill={EL} stroke={GOLD} strokeWidth={6} />
            <path d="M-150 -120 Q-215 -120 -215 -60 L-215 -30 Q-215 0 -250 0 Q-215 0 -215 30 L-215 60 Q-215 120 -150 120" fill="none" stroke={GOLD} strokeWidth={14} strokeLinecap="round" />
            <path d="M150 -120 Q215 -120 215 -60 L215 -30 Q215 0 250 0 Q215 0 215 30 L215 60 Q215 120 150 120" fill="none" stroke={GOLD} strokeWidth={14} strokeLinecap="round" />
            <path d={tangle} fill="none" stroke={SEC} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - wire} />
          </G>
        </g>
      )}
    </Stage>
  );
};

/* ------------------------------------------------------------------ cảnh 18 */
/** Cảnh 18: quay lại hình neo, màn hình điện thoại là trang HTML, sếp gật; thẻ AI trước hàng việc dài có chỗ rạn; thẻ trượt xuống, màn kết thương hiệu. */
export const KetQuayLaiSepNhinHtml: React.FC = () => {
  const { f, p, l } = useT();
  const calm = l(0, 0, 14);
  const bob = Math.sin(f / 6) * 6 * calm;
  const up = p(1, 0.0, 16);
  const down = l(2, 0, 14);
  const cy = lerp(1500, 725, Math.min(1, up)) + down * 900;
  const hide = l(1, 0, 14);
  const crack = l(1, 0.55, 18);
  const end = l(2, 0, 12);
  const seg = Array.from({ length: 9 }, (_, i) => 180 + i * 90);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={790} y={440} p={p(0, 0.05)} solid color={GOLDL} size={36} o={1 - hide} />
      <Tag i={1} x={770} y={1035} p={p(0, 0.5)} solid color={GOLDL} size={40} o={1 - hide} />
      <Tag i={2} x={540} y={cy - 395} p={p(1, 0.08)} solid color={GOLDL} size={36} />
      <Tag i={4} x={540} y={cy + 150} p={p(1, 0.6)} solid color={GOLDL} size={32} />
      <Tag i={3} x={540} y={cy + 350} p={p(1, 0.3)} solid color={GOLDL} size={34} />
      {end > 0 && <BrandEnd k={end} />}
    </>}>
      <g opacity={1 - hide}>
        <Anchor f={f} html calm={calm} bob={bob} />
      </g>
      {hide > 0 && (
        <G x={0} y={cy - 725}>
          <Box cx={540} cy={725} w={880} h={930} rx={44} fill={SURF} stroke={GOLD} strokeWidth={6} />
          <G x={540} y={690}>
            <AIG size={210} />
          </G>
          <G x={540} y={475} s={0.75 * p(1, 0.35)}><Question /></G>
          {/* hàng việc dài kéo ngang khung, giữa hàng có chỗ rạn đỏ */}
          {seg.map((x, i) => (
            <g key={x}>
              {i < 8 && <line x1={x + 38} y1={960} x2={seg[i + 1] - 38} y2={960} stroke={HOV} strokeWidth={8} strokeLinecap="round" />}
              <Box cx={x} cy={960 + (i === 4 ? 8 * crack : 0)} w={76} h={70} rx={12} fill={i === 4 ? EL : GOLD} stroke={i === 4 ? RED : GOLD} strokeWidth={i === 4 ? 6 : 0} opacity={i < 4 ? 1 : 0.85} />
            </g>
          ))}
          <path d="M-14 -34 L10 -8 L-10 8 L14 34" transform={`translate(${seg[4]} ${960})`} fill="none" stroke={RED} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - crack} />
        </G>
      )}
    </Stage>
  );
};
