import React from "react";
import { Arrow, Box, Bubble, Chat, Clock, Cross, Doc, EL, Excel, Folder, G, GOLD, GOLDL, HOV, INK, Lines, Mag, PAPER, Person, Question, RED, SEC, Spark, Stage, Stamp, SURF, Table, Tag, TXT, XL, lerp, useT, AI } from "../shared/art";
import { Calendar, Cursor, FileIcon, Laptop, NumChip, Strip, Win, clamp01 } from "../bai-1/art";
import { Bot, Loupe } from "../bai-2/art";

/** Xung nảy 0..1..0 trong d khung kể từ khung fr. */
const hit = (f: number, fr: number, d = 9): number => Math.sin(clamp01((f - fr) / d) * Math.PI);
/** Phần lẻ, để lặp chuyển động liên tục mà vẫn là hàm thuần của khung. */
const fract = (v: number): number => v - Math.floor(v);

/** Cảnh 1 — Hook: ba bảng Excel bắn từng mảng ô vào khung chat đến rung; rồi núi bối cảnh đè mặt bàn võng xuống, khung chat nổi lên như bóng bay. */
export const HookExcelDanVao: React.FC = () => {
  const { f, at, p, l } = useT();
  const fill = l(0, 0.1, 150);
  const m = l(1, 0.05, 40);
  const tilt = l(1, 0.1, 40) * 4.5;
  const shake = fill > 0.85 ? Math.sin(f * 1.9) * 5 * ((fill - 0.85) / 0.15) * (1 - l(1, 0, 6)) : 0;
  const bounce = [0.2, 0.4, 0.6, 0.78].reduce((a, fr) => a + hit(f, at(0, fr)) * 12, 0);
  const float = l(1, 0.15, 36);
  const chatY = 800 + bounce - float * 70 + Math.sin(f / 14) * 6 * float;
  const ex = [150, 290, 430];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={232} p={p(0, 0.02)} solid color={GOLDL} size={50} />
      <Tag i={1} x={290} y={330} p={p(0, 0.18)} solid size={34} />
      <Tag i={2} x={520 + shake} y={chatY - 222} p={p(0, 0.35)} solid color={XL} size={30} />
      <Tag i={3} x={830} y={555} p={p(1, 0.12)} solid size={34} />
      <Tag i={4} x={830} y={1030} p={p(1, 0.5)} solid size={34} />
    </>}>
      {/* Ba bảng Excel bật ra, mỗi bảng bắn từng mảng ô theo vòng cung. */}
      {ex.map((sx, k) => (
        <G key={k} x={sx} y={445 + Math.sin(f / 16 + k) * 5} s={p(0, 0.05 + k * 0.1) * 0.7}><Excel /></G>
      ))}
      {ex.map((sx, k) => [0, 1, 2, 3].map((j) => {
        const t = fract(f / 50 + j * 0.25 + k * 0.31);
        const tx = 420 + (j - 1.5) * 70 + shake;
        const ty = chatY - 40;
        const alive = l(0, 0.1 + k * 0.1, 8);
        return (
          <G key={`${k}-${j}`} x={lerp(sx, tx, t)} y={lerp(480, ty, t) - Math.sin(t * Math.PI) * 140} r={t * 40} o={alive * (t < 0.92 ? 1 : 0)}>
            <Box cx={0} cy={0} w={34} h={24} rx={6} fill={j % 2 ? XL : TXT} />
          </G>
        );
      }))}
      {/* Khung chat ChatGPT ở giữa, đầy dần rồi rung. */}
      <G x={420 + shake} y={chatY} s={p(0, 0.3)}>
        <Win w={600} h={500} stroke={GOLD}>
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <rect key={k} x={-260} y={-250 + 96 + k * 56} width={520 * clamp01(fill * 7 - k) * (k % 3 === 2 ? 0.7 : 1)} height={22} rx={11} fill={k % 2 ? TXT : GOLDL} opacity={0.8} />
          ))}
          <G x={0} y={190}><Box cx={0} cy={0} w={520} h={54} rx={27} fill={SURF} stroke={HOV} strokeWidth={4} /></G>
          <G x={-210} y={190}><Spark r={18} fill={GOLD} /></G>
        </Win>
      </G>
      {/* Bóng bay: dây buộc khung chat khi nó nhẹ bẫng. */}
      <path d={`M420 ${chatY + 250} Q${400 + Math.sin(f / 18) * 20} ${chatY + 300} 420 ${chatY + 340}`} stroke={GOLDL} strokeWidth={4} fill="none" opacity={float} />
      {/* Núi bối cảnh dồn bên phải. */}
      <path d="M690 1140 L830 600 L1020 1140 Z" fill={HOV} opacity={0.4 * m} />
      {[0, 1, 2].map((k) => (
        <G key={k} x={830 + (k - 1) * 14} y={650 + k * 75 + Math.sin(f / 20 + k) * 3} s={p(1, 0.1 + k * 0.12) * 0.6} r={(k - 1) * 4}>
          <Win w={300} h={170} stroke={GOLD}>
            <Lines x={-120} y={-10} w={240} n={3} gap={30} color={SEC} t={12} />
          </Win>
        </G>
      ))}
      {[0, 1, 2].map((k) => (
        <G key={k} x={720 + k * 90} y={1125} s={p(1, 0.35 + k * 0.1) * 0.55} r={(k - 1) * 8}><Doc w={150} h={200} n={4} fill={PAPER} /></G>
      ))}
      {[0, 1, 2].map((k) => {
        const prog = clamp01(l(1, 0.5 + k * 0.1, 30));
        return (
          <G key={k} x={830} y={870 + k * 50}>
            <G s={p(1, 0.4 + k * 0.08) * 0.7}><NumChip /></G>
            {prog > 0.02 && <line x1={-70} x2={-70 + 140 * prog} y1={0} y2={0} stroke={RED} strokeWidth={9} strokeLinecap="round" />}
          </G>
        );
      })}
      <G x={950} y={900 + Math.sin(f / 6) * 6} s={p(1, 0.6) * 0.55} r={-35}>
        <rect x={-8} y={-70} width={16} height={110} rx={8} fill={RED} />
        <path d="M-8 40 L0 62 L8 40 Z" fill={INK} />
      </G>
      {/* Mặt bàn võng xuống bên nặng. */}
      <G x={540} y={1170} r={tilt}><Box cx={0} cy={0} w={860} h={40} rx={14} fill={GOLD} /></G>
      <Ground />
    </Stage>
  );
};

/** Điện thoại: thân, màn hình sáng theo lit. */
const Phone: React.FC<{ lit: number; children?: React.ReactNode }> = ({ lit, children }) => (
  <g>
    <Box cx={0} cy={0} w={240} h={430} rx={38} fill={INK} stroke={GOLD} strokeWidth={7} />
    <Box cx={0} cy={0} w={206} h={380} rx={26} fill={lit > 0.5 ? EL : SURF} />
    <Box cx={0} cy={-190} w={70} h={10} rx={5} fill={HOV} />
    {children}
  </g>
);

/** Cảnh 2 — Tin nhắn Lark đến; bong bóng nhân lên thành cả chục khung chat, báo cáo cũ bay vào ô nhập AI, đồng hồ quay nhanh dần. */
export const LarkTinNhan: React.FC = () => {
  const { f, at, p, l } = useT();
  const dim = l(0, 0, 14) * 0.5;
  const slide = p(0, 0.05, 15);
  const wait = Math.sin(f * 0.9) * 3 * (1 - l(1, 0, 6));
  const move = l(1, 0, 20);
  const lit = l(0, 0.35, 8);
  const hurry = Math.max(0, f - at(1, 0));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={lerp(540, 170, move)} y={lerp(405, 215, move)} p={p(0, 0.45)} solid size={34} />
      <Tag i={1} x={880} y={500} p={p(1, 0.15)} solid size={32} />
      <Tag i={2} x={540} y={395} p={p(1, 0.3)} solid size={34} />
    </>}>
      {/* Bàn làm việc: tối đi một nấc khi tin đến. */}
      <G x={330} y={1130} s={0.5}><Laptop open={1}><Lines x={-200} y={-300} w={400} n={4} gap={50} color={HOV} t={14} /></Laptop></G>
      <G x={800} y={1090} o={1 - l(1, 0, 10)}><G s={0.9}><Folder /></G></G>
      <G x={900} y={1100} o={1 - l(1, 0, 10)}><G s={0.7} r={8}><Mag /></G></G>
      <Box cx={540} cy={1180} w={860} h={40} rx={14} fill={GOLD} />
      <rect x={80} y={80} width={920} height={1190} fill={INK} opacity={dim * (1 - l(1, 0.1, 20) * 0.6)} />
      {/* Điện thoại trượt xuống từ mép trên, bong bóng rung nhẹ chờ. */}
      <G x={lerp(540, 170, move)} y={lerp(-300, 620, Math.min(slide, 1.05)) - move * 130} s={lerp(1, 0.55, move)}>
        <Phone lit={lit}>
          <G x={wait} y={-30} s={p(0, 0.38)}>
            <Bubble w={170} h={96} fill={TXT} ink={SEC} n={3} />
          </G>
          <G x={-60} y={120} s={lit}><circle r={14} fill={GOLD} /></G>
          <G x={0} y={120} s={lit}><Box cx={0} cy={0} w={70} h={14} rx={7} fill={HOV} /></G>
        </Phone>
      </G>
      {/* Bong bóng nhân lên thành chục khung chat chồng lớp, lật như bài. */}
      {Array.from({ length: 10 }, (_, k) => {
        const sx = Math.abs(Math.cos(f / 22 + k * 0.8)) * 0.3 + 0.7;
        return (
          <g key={k} transform={`translate(${540 + (k % 5 - 2) * 78} ${650 + Math.floor(k / 5) * 70 + Math.sin(f / 16 + k) * 5}) rotate(${(k - 4.5) * 5}) scale(${sx * p(1, k * 0.03 + 0.02) * 0.9} ${p(1, k * 0.03 + 0.02) * 0.9})`}>
            <Win w={340} h={220} stroke={k % 3 === 0 ? GOLD : HOV}>
              <Lines x={-130} y={-30} w={260} n={3} gap={36} color={k % 2 ? SEC : GOLDL} t={13} />
            </Win>
          </g>
        );
      })}
      {/* Ngăn kéo: báo cáo cũ bay lên, từng mẩu thả vào ô nhập AI. */}
      <G x={230} y={1070} s={p(1, 0.1)}>
        <Box cx={0} cy={0} w={260} h={200} rx={14} fill={EL} stroke={GOLD} strokeWidth={5} />
        <Box cx={0} cy={-30} w={220} h={60} rx={10} fill={HOV} />
        <Box cx={0} cy={50} w={220} h={60} rx={10} fill={HOV} />
        <rect x={-30} y={-42} width={60} height={12} rx={6} fill={GOLD} />
      </G>
      {[0, 1, 2, 3].map((k) => {
        const t = fract(hurry / 46 + k * 0.25);
        const on = l(1, 0.2, 8);
        return (
          <G key={k} x={lerp(230, 560, t)} y={lerp(1000, 1070, t) - Math.sin(t * Math.PI) * 240} r={(1 - t) * 20 - 10} s={lerp(0.7, 0.35, t) * on}>
            <Doc w={150} h={190} n={4} fill={PAPER} />
          </G>
        );
      })}
      <G x={600} y={1070} s={p(1, 0.2)}>
        <Box cx={0} cy={0} w={420} h={90} rx={45} fill={EL} stroke={GOLD} strokeWidth={5} />
        <G x={-170} y={0}><Spark r={22} fill={GOLD} /></G>
        <rect x={-130} y={-8} width={260} height={16} rx={8} fill={HOV} />
        <G x={lerp(-130, 130, fract(f / 30))} y={0}><Cursor s={0.4} /></G>
      </G>
      {/* Đồng hồ góc hình quay nhanh dần; bóng người ngả người cuống lên. */}
      <G x={880} y={330} s={p(1, 0.05) * 1.3}><Clock r={80} hour={2 + hurry / 120} minute={hurry * hurry / 90} /></G>
      <G x={870 + Math.sin(f / 4) * 8} y={1010} r={Math.sin(f / 4) * 7 + l(1, 0.3, 30) * 14} s={p(1, 0.15) * 1.7}><Person fill={SEC} /></G>
      <Ground />
    </Stage>
  );
};

/** Cảnh 3 — Bản tóm tắt mượt nhưng rỗng; dò từng dòng Excel; tấm gương; máy phủ bụi của ngày hôm qua. */
export const TomTatChungChung: React.FC = () => {
  const { f, at, p, l } = useT();
  const sweep = l(0, 0.25, 55);
  const lx = lerp(100, 480, sweep);
  const mirror = l(2, 0, 18) * (1 - l(3, 0, 12));
  const gone = l(2, 0, 10);
  const aiO = 1 - gone;
  const exO = 1 - gone;
  const scan = l(1, 0.12, 110);
  const move = l(1, 0, 16);
  const loupeX = lerp(lx, 790, move);
  const lean = l(1, 0, 20);
  const fall = l(2, 0.2, 16);
  const flip = l(3, 0, 45);
  const swap = l(3, 0.75, 8);
  const rowW = [1, 0.84, 0.62, 1, 0.84, 0.62, 0.9];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={310} y={330} p={p(0, 0.1)} solid color={GOLDL} size={36} o={1 - move} />
      <Tag i={1} x={790} y={330} p={p(1, 0.1)} solid size={36} o={1 - gone} />
      <Tag i={2} x={540} y={990} p={p(2, 0.3)} solid color={XL} size={40} o={1 - l(3, 0, 6)} />
      <Tag i={3} x={lerp(-200, 540, l(3, 0.45, 16))} y={1010} p={p(3, 0.4)} solid color={GOLDL} size={40} />
    </>}>
      <defs>
        <clipPath id="tt-peel"><rect x={0} y={0} width={Math.max(1, lx)} height={1350} /></clipPath>
        <clipPath id="tt-gloss"><rect x={Math.max(0, lx)} y={0} width={1080} height={1350} /></clipPath>
      </defs>
      {/* Ô trả lời của AI: lụa bóng chảy mượt; kính lúp đi qua thì lớp bóng tróc, lộ dòng rỗng. */}
      <G o={aiO} x={310} y={640}>
        <Win w={480} h={520} stroke={GOLD}>
          <g transform="translate(-310 -640)">
            <g clipPath="url(#tt-gloss)">
              {rowW.map((w, k) => <rect key={k} x={110} y={640 - 260 + 100 + k * 54} width={420 * w} height={22} rx={11} fill={SEC} />)}
              <rect x={70} y={420} width={480} height={520} fill={GOLDL} opacity={0.14 + 0.06 * Math.sin(f / 10)} />
            </g>
            <g clipPath="url(#tt-peel)">
              {rowW.map((w, k) => <rect key={k} x={110} y={640 - 260 + 100 + k * 54} width={420 * w} height={22} rx={11} fill="none" stroke={HOV} strokeWidth={4} strokeDasharray="10 10" opacity={0.7} />)}
            </g>
          </g>
        </Win>
      </G>
      {/* Bảng Excel bên cạnh: bút đỏ gạch từng dòng, dấu hỏi nảy ra, ô dò xong đổi sang xanh. */}
      <G o={exO} x={790} y={650} s={p(1, 0)}>
        <Box cx={0} cy={0} w={330} h={470} rx={20} fill={EL} stroke={GOLD} strokeWidth={5} />
        <G y={0}><Table cols={3} rows={6} w={290} h={420} lit={Math.floor(clamp01(scan * 1.05) * 6) * 3} fill={XL} base={HOV} /></G>
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const prog = clamp01(scan * 6 - k);
          const yy = -210 + (k + 0.5) * 70;
          return (
            <g key={k}>
              <line x1={-150} x2={-150 + 300 * prog} y1={yy} y2={yy} stroke={RED} strokeWidth={8} strokeLinecap="round" />
              <G x={185} y={yy} s={clamp01(prog * 3 - 1.5) * 0.28 * (prog < 1 ? 1 : 0.4)}><Question /></G>
            </g>
          );
        })}
      </G>
      <G x={loupeX + Math.sin(f / 9) * 4} y={560 + sweep * 20 + move * 80 + Math.sin(f / 13) * 6} s={0.9 * (1 - gone)}><Loupe /></G>
      {/* Người ngồi bàn cúi sát màn hình. */}
      <G x={540} y={lerp(1100, 1130, lean)} s={lerp(1.1, 1.35, lean)} o={1 - gone}><Person fill={SEC} /></G>
      <Box cx={540} cy={1200} w={900} h={34} rx={14} fill={GOLD} />
      {/* Tấm gương: màn hình mờ đi, phản chiếu chính người ngồi bàn; dấu tích rơi đè dấu sai. */}
      <G x={540} y={640} o={mirror} s={0.6 + 0.4 * mirror}>
        <Box cx={0} cy={0} w={640} h={640} rx={34} fill={EL} stroke={GOLDL} strokeWidth={8} />
        <path d="M-300 -240 L-120 -300 L-200 -300 L-300 -280 Z" fill={TXT} opacity={0.25} />
        <path d="M120 300 L260 220 L300 240 L200 310 Z" fill={TXT} opacity={0.2} />
        <G x={0} y={200} s={2.2}><Person fill={TXT} /></G>
        <G x={0} y={-10} s={1} o={1 - l(2, 0.4, 45)}><Cross r={150} /></G>
      </G>
      <G x={540} y={lerp(120, 540, fall) + hit(f, at(2, 0.45), 12) * -14} o={mirror} s={fall * 1.5}><Stamp r={110} color={XL} /></G>
      {/* Tờ lịch lật ngược về tờ cũ; máy phủ bụi hiện đúng chỗ khung chat AI. */}
      <G x={540} y={290} s={p(3, 0) * 1.1}>
        <Calendar flip={0} />
        {/* Tờ cũ lật ngược từ trên xuống, phủ lên tờ hiện tại. */}
        <g transform={`translate(0 -45) scale(1 ${Math.cos(Math.PI * (1 - flip)) || 0.02})`}>
          <rect x={-120} y={0} width={240} height={140} rx={14} fill={PAPER} />
          {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={-96 + (k % 3) * 66} y={24 + Math.floor(k / 3) * 52} width={50} height={34} rx={6} fill={k === 1 ? XL : HOV} />)}
        </g>
      </G>
      <G x={540} y={690} s={p(3, 0.2) * 1.35}>
        <Box cx={0} cy={-30} w={400} h={330} rx={28} fill={HOV} stroke={SEC} strokeWidth={6} />
        <Box cx={0} cy={-50} w={320} h={220} rx={16} fill={SURF} />
        <Box cx={0} cy={170} w={400} h={46} rx={14} fill={SEC} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => <circle key={k} cx={-150 + k * 42} cy={-120 + ((k * 37) % 5) * 40} r={7 + (k % 3) * 3} fill={PAPER} opacity={0.38} />)}
        <path d="M-200 -190 L-120 -130 M-200 -150 L-140 -110" stroke={SEC} strokeWidth={3} opacity={0.6} />
        <circle cx={-170} cy={110} r={11} fill={XL} opacity={1 - swap} />
        <circle cx={170} cy={110} r={11} fill={XL} opacity={swap} />
      </G>
      <G x={540} y={690} s={p(3, 0.25) * 1.35}>
        <rect x={-130} y={-170 + 130 * (1 - l(3, 0.55, 20))} width={260} height={10} rx={5} fill={GOLDL} opacity={0.5 * l(3, 0.55, 20)} />
      </G>
      <Ground />
    </Stage>
  );
};

/** Cảnh 4 — Hai tầng: khung chat một câu hỏi một đoạn đáp, phần nặng người tự bơi; rồi trợ lý nhận phiếu, mở file, khép thành thành phẩm. */
export const TuHoiSangGiao: React.FC = () => {
  const { f, p, l } = useT();
  const cut = l(0, 0.05, 28);
  const lower = l(0, 0.35, 22);
  const t = fract(f / 70);
  const ask = clamp01(t * 2.2);
  const reply = clamp01((t - 0.55) * 2.6);
  const task = l(2, 0.1, 14);
  const open = l(2, 0.3, 80);
  const merge = l(2, 0.6, 40);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={230} y={225} p={p(0, 0.15)} solid color={GOLDL} size={36} />
      <Tag i={1} x={230} y={760} p={p(0, 0.5)} solid color={XL} size={36} />
      <Tag i={2} x={640} y={300} p={p(1, 0.12)} solid size={32} />
      <Tag i={3} x={290} y={855} p={p(2, 0.15)} solid size={34} />
      <Tag i={4} x={860} y={735} p={p(2, 0.65)} solid color={XL} size={34} />
    </>}>
      {/* Hai tầng: tầng trên tối buông xuống, tầng dưới sáng. */}
      <rect x={80} y={80} width={920} height={610 * cut} fill={SURF} />
      <rect x={80} y={690} width={920} height={560 * lower} fill={HOV} opacity={0.3} />
      <rect x={90} y={688} width={900 * cut} height={6} rx={3} fill={GOLD} />
      {/* Câu 0: hai tấm bảng nhỏ trượt vào hai tầng, mỗi tầng hiện bản xem trước của nó. */}
      <G x={lerp(-200, 230, l(0, 0.1, 16))} y={225}><Box cx={0} cy={0} w={290} h={80} rx={40} fill={EL} stroke={GOLD} strokeWidth={5} /></G>
      <G x={lerp(1300, 230, l(0, 0.45, 16))} y={760}><Box cx={0} cy={0} w={290} h={80} rx={40} fill={EL} stroke={XL} strokeWidth={5} /></G>
      <G x={760} y={420 + Math.sin(f / 15) * 6} s={l(0, 0.3, 16) * 0.8} o={1 - l(1, 0, 10)}>
        <Chat w={400} h={290} lit><G x={Math.sin(f / 10) * 10} y={20}><Bubble w={150} h={70} fill={GOLD} n={1} /></G></Chat>
      </G>
      <G x={760} y={1020} s={l(0, 0.55, 16) * 0.7} o={1 - l(2, 0, 10)}><Bot arm={0.5 + 0.4 * Math.sin(f / 8)} /></G>
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <G key={k} x={140 + k * 160} y={k % 2 ? 520 + Math.sin(f / 12 + k) * 30 : 980 + Math.sin(f / 12 + k) * 30} s={l(0, 0.2 + k * 0.05, 12) * 0.5} o={(1 - l(1, 0, 10)) * (k % 2 ? 1 : 1 - l(2, 0, 10))}>
          <Spark r={30} fill={k % 2 ? GOLD : XL} />
        </G>
      ))}
      {/* Tầng trên: khung chat đơn, hỏi một câu đáp một đoạn; phần việc nặng chất thành đống, người bơi giữa biển ô. */}
      <G x={300} y={420} s={p(1, 0) * 0.85}>
        <Chat w={400} h={290} lit>
          <G x={-90 + ask * 140} y={ask > 0 ? 60 - ask * 90 : 0} s={ask < 1 ? ask : 0}><Bubble w={110} h={60} fill={GOLD} n={1} /></G>
          <G x={60 - reply * 40} y={70} s={reply}><Bubble w={170} h={70} fill={TXT} ink={SEC} n={2} /></G>
        </Chat>
      </G>
      {[0, 1, 2, 3, 4].map((k) => (
        <G key={k} x={700 + (k % 3) * 110 + (k > 2 ? 50 : 0)} y={560 - Math.floor(k / 3) * 130} s={p(1, 0.2 + k * 0.07) * 0.62} r={(k - 2) * 6}>
          {k % 2 ? <Doc w={150} h={190} n={4} fill={PAPER} /> : <Excel />}
        </G>
      ))}
      {Array.from({ length: 14 }, (_, k) => (
        <G key={k} x={120 + k * 64} y={645 + Math.sin(f / 9 + k * 0.7) * 10} s={p(1, 0.3) * 0.45}>
          <Box cx={0} cy={0} w={90} h={60} rx={10} fill={k % 2 ? XL : HOV} opacity={0.75} />
        </G>
      ))}
      <G x={lerp(150, 700, fract(f / 220 + 0.1)) } y={630 + Math.sin(f / 8) * 8} s={p(1, 0.35) * 0.8} r={Math.sin(f / 6) * 10}><Person fill={TXT} /></G>
      {/* Tầng dưới: trợ lý cạnh máy nhận phiếu giao việc từ tay bạn. */}
      <G x={290} y={1010} s={p(2, 0) * 0.85}>
        <G x={0} y={-30}><Bot s={0.9} arm={0.5 + 0.3 * Math.sin(f / 7)} /></G>
        <G x={340} y={110} s={0.5}><Laptop open={1}><Lines x={-200} y={-300} w={400} n={3} gap={50} color={GOLD} t={14} /></Laptop></G>
      </G>
      <G x={160} y={1040} s={p(2, 0) * 0.9}><Person fill={TXT} /></G>
      <G x={lerp(160, 235, task)} y={lerp(1000, 960, task)} s={task * 0.55 * (1 - l(2, 0.3, 8) * 0.4)} r={-12}><Doc w={170} h={220} n={3} fill={PAPER} /></G>
      {/* Các file mở lên từng cái, bay lên khép lại thành một bản thành phẩm. */}
      {[0, 1, 2].map((k) => {
        const o = clamp01(open * 3 - k);
        const x0 = 500 + k * 50;
        return (
          <G key={k} x={lerp(x0, 860, merge)} y={lerp(1150 - o * (100 + k * 30), 930, merge)} s={0.7 * o * (1 - merge * 0.3)} o={1 - merge}>
            <FileIcon s={1.6} />
          </G>
        );
      })}
      <G x={860} y={930} s={merge * 1.0}>
        <Doc w={230} h={300} n={6} fill={PAPER} />
        <G x={70} y={90} s={l(2, 0.85, 10) * 0.9} r={-12}><Stamp r={70} color={XL} /></G>
      </G>
      <Ground />
    </Stage>
  );
};

/** Biển hiệu treo: mặt trước (Hỏi) hoặc mặt sau trống, lật theo sx. */
const Sign: React.FC<{ x: number; y: number; s?: number; sx: number; lit: number; children?: React.ReactNode }> = ({ x, y, s = 1, sx, lit, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-110} x2={-110} y1={-200} y2={-70} stroke={SEC} strokeWidth={6} />
    <line x1={110} x2={110} y1={-200} y2={-70} stroke={SEC} strokeWidth={6} />
    <g transform={`scale(${sx} 1)`}>
      <Box cx={0} cy={0} w={300} h={140} rx={20} fill={lit > 0.5 ? GOLD : EL} stroke={lit > 0.5 ? GOLDL : HOV} strokeWidth={6} />
      {children}
    </g>
  </g>
);

/** Cảnh 5 — Hai biển Hỏi và Giao việc; việc chi phí chiều họp trong ba file Excel; làn trên bật khung chat web, ba tệp vẫn nằm ngoài. */
export const HoiSangGiaoViec: React.FC = () => {
  const { f, p, l } = useT();
  const flipT = l(0, 0.45, 30);
  const rightSx = Math.abs(Math.cos(flipT * Math.PI));
  const up = l(1, 0, 14);
  const signY = lerp(450, 280, up);
  const signS = lerp(1, 0.75, up);
  const swing = Math.sin(f / 14) * 2;
  const lane = l(2, 0.1, 30);
  const tear = l(2, 0, 20);
  const fade = 1 - l(2, 0, 12);
  const flash = (k: number) => Math.max(0, Math.sin(f / 7 - k * 2.1));
  const file = [
    { x: 390, y: 1010, r: -10 },
    { x: 620, y: 1100, r: 12 },
    { x: 850, y: 1000, r: -4 },
  ];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={lerp(300, 300, up)} y={signY + 8} p={p(0, 0.02)} solid color={GOLDL} size={lerp(40, 24, up)} />
      <Tag i={1} x={800} y={signY + 8} p={flipT > 0.5 ? p(0, 0.6) : 0} solid color={XL} size={lerp(40, 24, up)} />
      <Tag i={2} x={620} y={915} p={p(1, 0.4)} solid size={34} o={fade} />
      <Tag i={3} x={170} y={690} p={p(1, 0.15)} solid size={32} o={fade} />
      <Tag i={4} x={540} y={lerp(1100, 850, lane)} p={p(2, 0.35)} solid size={34} />
    </>}>
      {/* Hai cột: cột phải chuyển từ tối sang sáng khi biển lật. */}
      <G x={300} y={swing} s={1}>
        <Sign x={0} y={signY} s={signS} sx={1} lit={1}>
          <G x={-110} y={0} s={0.3}><Question color={INK} /></G>
          <G x={110} y={0}><Spark r={14} fill={INK} /></G>
        </Sign>
      </G>
      <G x={800} y={-swing}>
        <Sign x={0} y={signY} s={signS} sx={Math.max(0.02, rightSx)} lit={flipT > 0.5 ? 1 : 0}>
          {flipT > 0.5 ? (
            <g>
              <G x={-80} y={0} s={0.5}><Doc w={110} h={140} n={3} fill={PAPER} /></G>
              <Arrow x1={-20} y1={0} x2={70} y2={0} color={INK} w={10} />
            </g>
          ) : <Lines x={-100} y={-12} w={200} n={2} gap={30} color={HOV} t={12} />}
        </Sign>
      </G>
      <rect x={290} y={signY + 110 * signS} width={20} height={Math.max(0, 1000 - signY)} fill={HOV} opacity={0.35} />
      <rect x={790} y={signY + 110 * signS} width={20} height={Math.max(0, 1000 - signY)} fill={flipT > 0.5 ? GOLD : HOV} opacity={0.35 + 0.3 * flipT} />
      {/* Mũi tên cong lớn lật biển Hỏi sang biển Giao việc. */}
      {flipT < 1 || up < 1 ? (
        <g opacity={1 - up}>
          <path d={`M420 ${signY - 120} Q550 ${signY - 280} 680 ${signY - 120}`} fill="none" stroke={GOLD} strokeWidth={10} strokeLinecap="round" strokeDasharray="1 1" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1 - l(0, 0.2, 24) }} />
          <G x={680} y={signY - 120} r={60} o={l(0, 0.4, 6)}><path d="M-22 -18 L10 0 L-22 18 Z" fill={GOLD} /></G>
        </g>
      ) : null}
      {/* Mặt bàn: ba tệp Excel rơi rải rác, nháy lần lượt. */}
      <rect x={80} y={880} width={920} height={370} fill={EL} opacity={0.6 * Math.max(up, l(0, 0.5, 20))} />
      {file.map((d, k) => (
        <G key={k} x={d.x} y={lerp(700, d.y, Math.max(p(0, 0.6 + k * 0.12), p(1, 0.05 + k * 0.1)))} s={Math.max(p(0, 0.6 + k * 0.12), up) * 0.95} r={d.r + Math.sin(f / 9 + k) * 2}>
          <Excel />
          <rect x={-86} y={-110} width={172} height={220} rx={18} fill="none" stroke={GOLDL} strokeWidth={7} opacity={clamp01(flash(k)) * 0.7} />
        </G>
      ))}
      {/* Tờ lịch họp chiều ghim trên tường; bóng sếp chỉ tay vào chồng tệp. */}
      <G x={560} y={560} s={p(1, 0.1) * 0.9} o={fade}><Calendar flip={0} /></G>
      <G x={560} y={455} s={p(1, 0.12)} o={fade}><circle r={12} fill={GOLD} /></G>
      <G x={170} y={900 + Math.sin(f / 18) * 4} s={p(1, 0.15) * 1.35} o={fade}>
        <Person fill={SEC} />
        <path d="M0 -20 L-14 20 L0 60 L14 20 Z" fill={GOLD} />
      </G>
      <G o={fade}>
        <line x1={230} y1={900} x2={lerp(230, 330, l(1, 0.25, 12))} y2={lerp(900, 960, l(1, 0.25, 12))} stroke={SEC} strokeWidth={16} strokeLinecap="round" />
        <G x={lerp(230, 340, l(1, 0.25, 12))} y={lerp(900, 970, l(1, 0.25, 12))} s={0.3} r={-30}><Cursor /></G>
      </G>
      {/* Đường ngang xé mặt bàn làm hai làn; làn trên bật khung chat web có thanh trượt. */}
      <path d={`M80 780 ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => `L${80 + (k + 1) * 100 * tear} ${780 + (k % 2 ? 10 : -10)}`).join(" ")}`} fill="none" stroke={GOLD} strokeWidth={7} strokeLinecap="round" opacity={tear > 0 ? 1 : 0} />
      <rect x={80} y={330} width={920} height={450 * lane} fill={HOV} opacity={0.25} />
      <G x={540} y={570} s={lane}>
        <Win w={800} h={380} stroke={GOLD}>
          <rect x={-380} y={-140} width={700} height={44} rx={22} fill={SURF} stroke={HOV} strokeWidth={3} />
          <Lines x={-330} y={-60} w={540} n={3} gap={44} color={SEC} t={16} />
          <G x={-30} y={125} s={0.6}><Strip w={420} glow={0.5} /></G>
          <rect x={365} y={-130} width={14} height={290} rx={7} fill={HOV} />
          <rect x={365} y={-130 + 70 * (0.5 + 0.5 * Math.sin(f / 15))} width={14} height={110} rx={7} fill={GOLD} />
        </Win>
      </G>
      <Ground />
    </Stage>
  );
};

/** Mặt sàn tự vẽ, nằm gọn trong lề 80..1000. */
const Ground: React.FC = () => (
  <g>
    <rect x={90} y={1250} width={900} height={32} rx={10} fill={HOV} opacity={0.35} />
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={120 + i * 170} y={1262} width={110} height={8} rx={4} fill={HOV} />)}
  </g>
);
