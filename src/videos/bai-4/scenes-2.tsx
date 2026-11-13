import React from "react";
import { Arrow, Box, Chat, Cross, EL, Floor, G, GOLD, GOLDL, HOV, INK, Lines, Lock, PAPER, Question, RED, SEC, Spark, Stage, SURF, Tag, TXT, XL, lerp, useT } from "../shared/art";
import { Bot, Loupe } from "../bai-2/art";
import { Chart, Chip, clamp01, Contract, Flag, Mirror, RuleCard, Ruler, SegNum, Thumb, Tick, TopDesk } from "./art";

/** Thẻ cách trị: viền vàng, chấm số thứ tự, biểu tượng riêng. */
const Remedy: React.FC<{ k: number; lit?: number }> = ({ k, lit = 0 }) => (
  <g>
    <Box cx={0} cy={0} w={280} h={480} rx={20} fill={EL} stroke={lit > 0.5 ? GOLDL : GOLD} strokeWidth={lit > 0.5 ? 10 : 6} />
    <circle cx={-96} cy={-190} r={30} fill={GOLD} />
    {Array.from({ length: k + 1 }, (_, d) => <circle key={d} cx={-96 + (d - k / 2) * 14} cy={-190} r={5} fill={INK} />)}
    <Lines x={-50} y={-200} w={150} n={2} gap={24} color={HOV} t={10} />
    <G y={40}>
      {k === 0 && [0, 1, 2, 3].map((j) => <rect key={j} x={-100 + j * 52} y={-40} width={44} height={80} rx={8} fill={j % 2 ? GOLDL : GOLD} />)}
      {k === 1 && <Ruler w={220} />}
      {k === 2 && (
        <>
          <Box cx={-36} cy={10} w={130} h={110} rx={14} fill={SURF} stroke={HOV} strokeWidth={4} />
          <Box cx={36} cy={-20} w={130} h={110} rx={14} fill={EL} stroke={GOLDL} strokeWidth={5} />
          <G x={80} y={-70}><Spark r={22} fill={GOLDL} /></G>
        </>
      )}
    </G>
  </g>
);

/** Cảnh 6 — Bàn chật sau chục lượt chat; AI dọn bàn bằng tóm tắt; quy tắc rơi trước tiên; trông như tiểu tiết nên bị gạt ra rìa. */
export const DonBan: React.FC = () => {
  const { f, p, l } = useT();
  const pile = l(0, 0, 50);
  const sweep = l(1, 0.15, 26);
  const fall = l(2, 0, 10);
  const drop = l(2, 0.38, 24);
  const tiny = l(3, 0.05, 20);
  const fling = l(3, 0.5, 16);
  const turns = Math.round(lerp(0, 10, pile));
  const CH = [[260, 440], [420, 470], [600, 430], [780, 460], [330, 560], [520, 590], [700, 560], [850, 600], [250, 680], [430, 700], [640, 690], [820, 710]];
  const cards: [number, number, "tran" | "trong"][] = [[300, 470, "tran"], [780, 640, "trong"]];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={250} y={262} p={p(0, 0.15)} solid size={38} />
      <Tag i={1} x={540} y={835} p={p(0, 0.6)} solid color={RED} size={42} o={1 - sweep} />
      <Tag i={2} x={540} y={835} p={p(1, 0.2)} solid size={42} o={1 - fall} />
      <Tag i={3} x={540} y={815} p={p(2, 0.05)} size={38} o={1 - drop} />
      <Tag i={4} x={540} y={815} p={p(2, 0.4)} solid color={RED} size={36} o={1 - tiny} />
      <Tag i={5} x={790} y={885} p={p(2, 0.75)} size={32} o={1 - tiny} />
      <Tag i={6} x={540} y={815} p={p(3, 0.1)} size={42} />
      <Tag i={7} x={540} y={995} p={p(3, 0.55)} solid size={38} />
    </>}>
      {/* Bộ đếm lượt chat: mười chấm quanh vòng. */}
      <G x={840} y={262} s={p(0, 0.1) * (1 - fall)}>
        <circle r={62} fill={EL} stroke={HOV} strokeWidth={4} />
        {Array.from({ length: 10 }, (_, k) => (
          <circle key={k} cx={Math.sin((k * Math.PI) / 5) * 44} cy={-Math.cos((k * Math.PI) / 5) * 44} r={9} fill={k < turns ? GOLD : HOV} />
        ))}
        <G s={0.4}><Chip me /></G>
      </G>
      <G x={540} y={300} s={0.62}>
        <Bot arm={lerp(0.3, 1.5, sweep) - fling * 0.8} />
      </G>
      <G x={540} y={560}>
        <TopDesk w={780} h={400} full={pile * (1 - sweep)} />
      </G>
      {/* Bong bóng chat mọc kín mặt bàn, rồi bị gạt về giữa và ép thành thẻ tóm tắt. */}
      {CH.map(([x, y], k) => {
        const t = clamp01(pile * CH.length - k);
        return (
          <G key={k} x={lerp(x, 540, sweep)} y={lerp(y, 560, sweep)} s={t * lerp(0.9, 0.1, sweep)} r={((k * 37) % 21) - 10} o={1 - clamp01(sweep * 1.3 - 0.3)}>
            <Chip me={k % 2 === 0} />
          </G>
        );
      })}
      <G x={540} y={560} s={l(1, 0.65, 10)}>
        <Box cx={0} cy={0} w={230} h={120} rx={16} fill={GOLD} />
        <Lines x={-86} y={-30} w={172} n={2} gap={30} color={INK} t={12} />
      </G>
      {/* Mẩu thông tin rơi lả tả khỏi mép bàn. */}
      {Array.from({ length: 14 }, (_, k) => {
        const lane = k % 2 ? 640 + ((k * 53) % 260) : 180 + ((k * 61) % 260);
        const y = 770 + ((f * 7 + k * 71) % 470);
        return <rect key={k} x={lane} y={y} width={26 + (k % 3) * 10} height={16} rx={4} fill={SEC} opacity={fall * 0.7 * (1 - (y - 770) / 470)} transform={`rotate(${(f * 3 + k * 40) % 360} ${lane + 13} ${y + 8})`} />;
      })}
      {/* Hai thẻ quy tắc: rơi trước tiên; qua kính lúp thì nhỏ như hạt bụi, bị búng ra rìa. */}
      {cards.map(([x, y, kind], k) => {
        const tx = k ? 790 : 290;
        const ty = 985;
        const ex = k ? 975 : 105;
        return (
          <G key={k} x={lerp(lerp(x, tx, drop), ex, fling)} y={lerp(lerp(y, ty, drop), 1150, fling)} s={p(0, 0.3 + k * 0.2) * lerp(lerp(0.8, 0.9, drop), 0.3, Math.max(tiny * 0.6, fling))} r={drop * (k ? 8 : -8) + fling * (k ? 50 : -50)}>
            <RuleCard kind={kind} />
          </G>
        );
      })}
      <G x={lerp(700, 300, tiny)} y={lerp(1400, 880, tiny)} s={tiny * 0.75} r={-20}>
        <Loupe />
      </G>
      <Arrow x1={380} y1={1100} x2={160} y2={1140} p={fling} w={8} />
      <Arrow x1={700} y1={1100} x2={920} y2={1140} p={fling} w={8} />
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 7 — Ba căn bệnh: nửa chừng báo xong; trôi xa đề bài; tự khen bài mình. */
export const BaCanBenh: React.FC = () => {
  const { f, p, l } = useT();
  const on = (k: number) => l(k + 1, 0, 8);
  const active = (k: number) => on(k) * (1 - (k < 2 ? on(k + 1) : 0));
  const bar = l(1, 0.1, 18);
  const drift = l(2, 0.05, 40);
  const talk = l(3, 0.35, 10);
  const pathD = "M-90 -70 C-40 -70 -60 -10 -10 0 S40 40 20 70 S80 90 100 60";
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={250} p={p(0, 0.1)} solid color={RED} size={46} />
      <Tag i={1} x={255} y={950} p={p(1, 0.15)} size={27} />
      <Tag i={2} x={555} y={950} p={p(2, 0.15)} size={27} />
      <Tag i={3} x={850} y={950} p={p(3, 0.1)} size={30} />
      <Tag i={4} x={380} y={995} p={p(3, 0.3)} size={36} />
      <Tag i={5} x={720} y={995} p={p(3, 0.6)} solid color={XL} size={36} />
    </>}>
      {[0, 1, 2].map((k) => (
        <G key={k} x={230 + k * 310} y={620} s={p(0, k * 0.15) * (0.95 + 0.05 * active(k))} o={0.55 + 0.45 * Math.max(on(k), 1 - on(0))}>
          <Chart h={560} lit={active(k)}>
           <G s={1.45} y={10}>
            {k === 0 && (
              <G o={0.2 + 0.8 * on(0)}>
                <Box cx={0} cy={50} w={200} h={30} rx={15} fill={HOV} />
                <rect x={-100} y={35} width={200 * 0.5 * bar} height={30} rx={15} fill={GOLD} />
                <G x={0} y={30} s={clamp01(bar * 2 - 1)}><Flag color={XL} /></G>
                <G x={60} y={-60} s={l(1, 0.6, 8) * 0.5}><Tick r={40} /></G>
              </G>
            )}
            {k === 1 && (
              <G o={0.2 + 0.8 * on(1)}>
                <G x={-90} y={-60} s={0.6}><Flag color={GOLD} /></G>
                <path d={pathD} fill="none" stroke={GOLDL} strokeWidth={7} strokeDasharray="1" pathLength={1} strokeDashoffset={1 - drift} strokeLinecap="round" />
                <circle cx={lerp(-90, 100, drift)} cy={lerp(-70, 60, drift) + Math.sin(drift * 9) * 10} r={12} fill={RED} />
                <circle cx={-90} cy={-70} r={30} fill="none" stroke={GOLD} strokeWidth={4} strokeDasharray="6 6" />
              </G>
            )}
            {k === 2 && (
              <G o={0.2 + 0.8 * on(2)} y={-10}>
                <G x={-40} s={0.8}>
                  <Mirror>
                    <G y={-6} s={0.34}><Bot arm={1.6} /></G>
                  </Mirror>
                </G>
                <G x={42} y={10} s={0.38}><Bot arm={1.6} /></G>
                <G x={72} y={-40} s={0.6 * (0.9 + 0.1 * Math.sin(f / 4))}><Thumb /></G>
              </G>
            )}
           </G>
          </Chart>
        </G>
      ))}
      <path d="M520 995 L580 995" stroke={GOLD} strokeWidth={8} strokeLinecap="round" opacity={talk} />
      <path d="M570 981 L590 995 L570 1009" fill="none" stroke={GOLD} strokeWidth={8} strokeLinecap="round" opacity={talk} />
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 8 — Ba cách trị lật từ ba bệnh án; cách một chia lượt nhỏ; hợp đồng bốn mươi trang đè bàn rồi tách ra. */
export const ChiaNho: React.FC = () => {
  const { f, p, l } = useT();
  const flip = (k: number) => l(0, 0.15 + k * 0.15, 14);
  const one = l(0, 0.85, 10);
  const up = l(1, 0, 16);
  const cut = l(1, 0.3, 20);
  const c = l(2, 0, 14);
  const slam = l(2, 0.12, 8);
  const split = l(2, 0.6, 18);
  const shake = slam > 0 && slam < 1 ? 0 : Math.sin(f * 2.2) * 5 * (slam >= 1 ? 1 - split : 0);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={250} p={p(0, 0.05)} solid size={46} o={1 - up} />
      <Tag i={1} x={540} y={1000} p={p(1, 0.2)} solid size={44} o={1 - c} />
      <Tag i={2} x={540} y={235} p={p(2, 0.1)} solid size={42} />
      <Tag i={3} x={540} y={305} p={p(2, 0.35)} size={36} />
    </>}>
      {/* Ba tấm bệnh án lật mặt thành ba thẻ cách trị. */}
      <G o={1 - c}>
        {[0, 1, 2].map((k) => {
          const t = flip(k);
          const sx = Math.abs(Math.cos(Math.PI * t));
          return (
            <G key={k} x={lerp(220 + k * 320, 380 + k * 160, up)} y={lerp(600, 330, up)} s={lerp(1, 0.42, up) * (k === 0 ? 1 + 0.06 * one : 1)}>
              <g transform={`scale(${Math.max(0.02, sx)} 1)`}>
                {t < 0.5 ? <Chart h={480} lit={0} /> : <Remedy k={k} lit={k === 0 ? one : 0} />}
              </g>
            </G>
          );
        })}
      </G>
      {/* Khối việc lớn bị cắt thành lát mỏng. */}
      <G x={540} y={600} s={up * (1 - c)}>
        {Array.from({ length: 6 }, (_, k) => (
          <rect key={k} x={-330 + k * 110 + (k - 2.5) * 22 * cut} y={-90} width={110} height={180} rx={k === 0 || k === 5 ? 18 : 4} fill={k % 2 ? GOLDL : GOLD} />
        ))}
        {Array.from({ length: 6 }, (_, k) => {
          const cx = -275 + k * 110 + (k - 2.5) * 22 * cut;
          const t = l(1, 0.45 + k * 0.07, 8);
          return (
            <g key={`c${k}`} opacity={t}>
              <line x1={cx} x2={cx} y1={100} y2={200} stroke={GOLD} strokeWidth={4} strokeDasharray="6 6" />
              <G x={cx} y={250} s={0.55 * t}><Chip me={k % 2 === 0} w={140} /></G>
            </g>
          );
        })}
        {Array.from({ length: 5 }, (_, k) => (
          <line key={k} x1={-220 + k * 110 + (k - 2) * 22 * cut} x2={-220 + k * 110 + (k - 2) * 22 * cut} y1={-130} y2={lerp(-130, 130, clamp01(cut * 5 - k))} stroke={TXT} strokeWidth={5} strokeDasharray="12 8" />
        ))}
      </G>
      {/* Hợp đồng dày đập xuống bàn của AI, bàn tràn; rồi tách thành hai xấp, mỗi xấp một khung chat. */}
      <G o={c}>
        <G x={540 + shake} y={1090}>
          <TopDesk w={760} h={170} full={slam * (1 - split)} glow={split} />
        </G>
      </G>
      <G x={lerp(540, 300, split)} y={lerp(lerp(150, 830, slam), 640, split)} s={c * lerp(1.15, 0.85, split)} r={lerp(-4, -3, split)}>
        <Contract n={14} />
      </G>
      <G x={lerp(540, 780, split)} y={lerp(lerp(150, 830, slam), 640, split)} s={c * lerp(1.15, 0.85, split)} o={split} r={3}>
        <Contract n={7} />
      </G>
      {[0, 1].map((k) => (
        <G key={k} x={k ? 780 : 300} y={640} s={l(2, 0.75 + k * 0.08, 10)}>
          <Box cx={0} cy={20} w={420} h={520} rx={28} fill="none" stroke={GOLD} strokeWidth={6} />
          <rect x={-210} y={-240} width={420} height={56} rx={28} fill={EL} stroke={GOLD} strokeWidth={6} />
          {[0, 1, 2].map((i) => <circle key={i} cx={-170 + i * 28} cy={-212} r={9} fill={i === 0 ? GOLD : HOV} />)}
          <circle cx={160} cy={-212} r={18} fill={GOLD} />
          {Array.from({ length: k + 1 }, (_, d) => <circle key={d} cx={160 + (d - k / 2) * 10} cy={-212} r={4} fill={INK} />)}
        </G>
      ))}
      {[[250, 380], [820, 400], [200, 980], [880, 960]].map(([x, y], k) => (
        <G key={k} x={x} y={y} s={c * (1 - split) * slam * (0.4 + 0.2 * Math.sin(f / 3 + k))}><Spark r={22} fill={RED} /></G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Danh mục điều khoản: mỗi dòng có số điện tử và một vạch chữ. hi=[từ, đến] khung vàng; flags là các dòng cắm cờ đỏ. */
const Clauses: React.FC<{ show: number; hi?: number; flags?: number; scan?: number }> = ({ show, hi = 0, flags = 0, scan = -1 }) => (
  <g>
    {Array.from({ length: 12 }, (_, k) => {
      const t = clamp01(show * 12 - k);
      const y = -228 + k * 44;
      const inHi = k >= 4 && k <= 11;
      const bad = (k === 6 || k === 9) && flags > 0.5;
      return (
        <G key={k} y={y} o={t}>
          <G x={-120} s={0.27}><SegNum value={k + 1} n={2} frame={false} color={inHi && hi > 0.5 ? GOLDL : SEC} /></G>
          <rect x={-70} y={-8} width={k % 3 === 2 ? 230 : 330} height={16} rx={8} fill={bad ? RED : inHi && hi > 0.5 ? TXT : HOV} />
          {bad && <G x={300} y={8} s={0.42}><Flag color={RED} /></G>}
        </G>
      );
    })}
    {hi > 0.02 && <rect x={-160} y={-228 + 4 * 44 - 24} width={500} height={8 * 44 + 4} rx={14} fill="none" stroke={GOLD} strokeWidth={6} opacity={hi} />}
    {scan >= 0 && <G x={scan > 0.5 ? 200 : 40} y={lerp(-50, 300, scan)} s={0.55} r={-15}><Loupe /></G>}
  </g>
);

/** Cảnh 9 — Lượt một liệt kê đủ điều khoản; lượt hai chỉ soi điều năm đến điều mười hai; bàn luôn rộng. */
export const LuotMotLuotHai: React.FC = () => {
  const { p, l } = useT();
  const two = l(1, 0, 18);
  const desk = l(2, 0, 18);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={240} p={p(0, 0.05)} solid size={44} o={1 - two} />
      <Tag i={1} x={540} y={995} p={p(0, 0.55)} size={38} o={1 - two} />
      <Tag i={2} x={540} y={240} p={p(1, 0.05)} solid size={38} o={1 - desk} />
      <Tag i={3} x={540} y={995} p={p(1, 0.65)} solid color={RED} size={38} o={1 - desk} />
      <Tag i={4} x={540} y={995} p={p(2, 0.25)} solid color={XL} size={42} />
    </>}>
      <G o={1 - desk}>
        {/* Khung chat lượt một: danh mục dài, không ghi chú. */}
        <G x={lerp(540, 255, two)} y={lerp(640, 600, two)} s={p(0, 0) * lerp(1, 0.44, two)} o={lerp(1, 0.6, two)}>
          <Chat w={760} h={640}>
            <G x={60} y={30}><Clauses show={l(0, 0.1, 60)} /></G>
            <circle cx={330} cy={-285} r={22} fill={GOLD} />
            <circle cx={330} cy={-285} r={5} fill={INK} />
          </Chat>
        </G>
        {/* Khung chat lượt hai: khoanh đúng điều năm đến điều mười hai, cắm cờ chỗ bất lợi. */}
        <G x={620} y={660} s={p(1, 0) * 0.92} o={two}>
          <Chat w={760} h={640}>
            <G x={60} y={30}><Clauses show={1} hi={l(1, 0.25, 10)} flags={l(1, 0.65, 4)} scan={l(1, 0.35, 40)} /></G>
            <circle cx={330} cy={-285} r={22} fill={GOLD} />
            {[0, 1].map((d) => <circle key={d} cx={325 + d * 10} cy={-285} r={4} fill={INK} />)}
          </Chat>
        </G>
      </G>
      {/* Cái bàn quay lại: chỉ một xấp nhỏ, mặt bàn rộng, robot thong thả. */}
      <G o={desk}>
        <G x={540} y={430} s={desk * 0.7}><Bot arm={0.4} /></G>
        <G x={540} y={700} s={lerp(0.85, 1, desk)}><TopDesk w={760} h={420} glow={1} /></G>
        <G x={330} y={640} s={desk * 0.42} r={-6}><Contract n={3} /></G>
        <G x={820} y={590} s={l(2, 0.4, 10) * 0.8}><Tick r={46} /></G>
        {[[620, 760], [760, 820], [520, 600]].map(([x, y], k) => <G key={k} x={x} y={y} s={desk * 0.6}><Spark r={22} fill={XL} /></G>)}
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 10 — Thước đo định lượng trong câu lệnh; không nói chung chung; đối soát năm mươi trên năm mươi dòng, thiếu thì để trống; tự kiểm hai tiêu chí rồi mới báo cáo. */
export const ThuocDo: React.FC = () => {
  const { f, p, l } = useT();
  const ruler = l(0, 0.15, 18);
  const fog = l(1, 0, 10);
  const nix = l(1, 0.6, 8);
  const grid = l(2, 0, 12);
  const fill = l(2, 0.1, 110);
  const check = l(3, 0, 14);
  const unlock = l(3, 0.7, 10);
  const MISS = [11, 26, 40];
  const count = Math.round(50 * fill);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={232} p={p(0, 0.05)} solid size={44} o={1 - grid} />
      <Tag i={1} x={640} y={500} p={p(1, 0.05)} size={38} o={(1 - grid) * (1 - nix * 0.4)} />
      <Tag i={2} x={540} y={232} p={p(2, 0.05)} solid size={44} o={1 - check} />
      <Tag i={3} x={300} y={995} p={p(2, 0.5)} solid color={RED} size={38} />
      <Tag i={4} x={720} y={995} p={p(2, 0.75)} size={38} />
      <Tag i={5} x={540} y={232} p={p(3, 0.1)} solid color={XL} size={44} />
    </>}>
      <G x={540} y={620} s={p(0, 0)}>
        <Chat w={840} h={700}>
          {/* Trao đổi sẵn trong khung chat trước khi đưa thước đo. */}
          <G o={1 - fog}>
            <G x={170} y={-200}><Chip me w={340} /></G>
            <G x={60} y={-90}><Chip me={false} w={300} /></G>
            <G x={190} y={20}><Chip me w={300} /></G>
            <G x={40} y={130} s={0.5}><Ruler w={300} /></G>
          </G>
          {/* Ô gõ câu lệnh; cây thước trượt vào. */}
          <rect x={-200} y={230} width={590} height={60} rx={30} fill={INK} stroke={ruler > 0.9 ? GOLD : HOV} strokeWidth={4} />
          <G x={lerp(700, 40, ruler)} y={260} s={0.6} o={1 - grid}><Ruler w={420} /></G>
          {/* Câu lệnh mơ hồ như sương, bị gạch chéo. */}
          <G x={100} y={-100} o={fog * (1 - grid)}>
            {[[-120, -10, 90], [0, -40, 110], [120, -10, 90], [0, 40, 120]].map(([x, y, r], k) => (
              <circle key={k} cx={x} cy={y} r={r} fill={SEC} opacity={0.22} />
            ))}
            <G s={nix * 1.4}><Cross r={120} color={RED} /></G>
          </G>
          {/* Robot ở thanh bên: gãi đầu, rồi cầm dấu hỏi đoán mò và bị chặn. */}
          <G x={-330} y={40} s={0.48}>
            <Bot arm={fog * (1 - grid) * 1.6 + grid * 1.2} />
            <G x={150} y={-140} s={Math.max(fog * (1 - grid), grid) * 0.8 * (0.9 + 0.1 * Math.sin(f / 4))}><Question color={GOLDL} /></G>
            <G x={150} y={-150} s={l(2, 0.75, 8) * 1.1}><Cross r={80} color={RED} /></G>
          </G>
          {/* Bảng năm mươi ô: tích dần từng ô, ô thiếu để trống viền đỏ. */}
          <G x={lerp(100, 20, check)} y={-60} s={grid * lerp(1, 0.8, check)}>
            {Array.from({ length: 50 }, (_, k) => {
              const x = -250 + (k % 10) * 52;
              const y = -150 + Math.floor(k / 10) * 60;
              const done = fill * 50 > k;
              const miss = MISS.includes(k);
              return (
                <g key={k}>
                  <rect x={x} y={y} width={44} height={50} rx={8} fill={done && !miss ? "rgba(34,197,94,0.25)" : SURF} stroke={done && miss ? RED : HOV} strokeWidth={done && miss ? 5 : 3} strokeDasharray={done && miss ? "8 5" : undefined} />
                  {done && !miss && <path d={`M${x + 12} ${y + 26} L${x + 20} ${y + 34} L${x + 33} ${y + 16}`} fill="none" stroke={XL} strokeWidth={5} strokeLinecap="round" />}
                </g>
              );
            })}
            <G x={-60} y={225} s={0.5}><SegNum value={count} n={2} /></G>
            <path d="M-6 270 L26 180" stroke={GOLDL} strokeWidth={10} strokeLinecap="round" />
            <G x={92} y={225} s={0.5}><SegNum value={50} n={2} color={XL} /></G>
          </G>
          {/* Danh sách kiểm hai tiêu chí; nút báo cáo mở khoá sau cùng. */}
          <G x={300} y={-90} s={check}>
            <Box cx={0} cy={0} w={200} h={220} rx={16} fill={PAPER} />
            {[0, 1].map((k) => (
              <g key={k}>
                <rect x={-80} y={-70 + k * 80} width={44} height={44} rx={8} fill="none" stroke={INK} strokeWidth={5} />
                {l(3, 0.25 + k * 0.2, 6) > 0.5 && <path d={`M-72 ${-48 + k * 80} L-60 ${-36 + k * 80} L-42 ${-62 + k * 80}`} fill="none" stroke={XL} strokeWidth={7} strokeLinecap="round" />}
                <rect x={-24} y={-56 + k * 80} width={96} height={14} rx={7} fill={SEC} />
              </g>
            ))}
          </G>
          <G x={300} y={110} s={check}>
            <Box cx={0} cy={0} w={200} h={64} rx={32} fill={unlock > 0.5 ? GOLD : HOV} />
            <G x={-50} y={-6} s={0.42}><Lock open={unlock} color={unlock > 0.5 ? INK : SEC} /></G>
            <rect x={-10} y={-7} width={70} height={14} rx={7} fill={INK} opacity={0.7} />
          </G>
        </Chat>
      </G>
      <Floor y={1240} />
    </Stage>
  );
};
