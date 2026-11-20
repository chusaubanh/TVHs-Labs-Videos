import React from "react";
import { Arrow, Box, BrandEnd, Clock, Cross, Doc, EL, Floor, Folder, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, Person, Question, RED, SEC, Spark, Stage, SURF, Tag, TXT, XL, lerp, useT } from "../shared/art";
import { Calendar, MarkClaude, MarkGpt } from "../bai-1/art";
import { Bot, Hat, MoneyBag } from "../bai-2/art";
import { Contract, Flag, NoSign, SegNum, Shield, Star, Tick } from "../bai-4/art";
import { SopBook, Stepper } from "../bai-5/art";
import { Anchor, clamp01, Gavel, KindFile, Page, Scales, Toc } from "./art";

/** Thẻ câu lệnh trong ô gõ. */
const Prompt: React.FC<{ w?: number; fill?: number }> = ({ w = 860, fill = 1 }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={120} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} />
    <circle cx={-w / 2 + 46} cy={0} r={20} fill={GOLD} />
    <rect x={-w / 2 + 84} y={-30} width={(w - 140) * clamp01(fill * 2)} height={16} rx={8} fill={SEC} />
    <rect x={-w / 2 + 84} y={2} width={(w - 200) * clamp01(fill * 2 - 1)} height={16} rx={8} fill={SEC} />
  </g>
);

/** Cảnh 7 — Ba bước; bước một: nạp trọn file gốc vào thư mục dự án, không copy chữ, đủ hợp đồng, phụ lục, biên bản. */
export const BuocMot: React.FC = () => {
  const { f, p, l } = useT();
  const folder = p(1, 0.05);
  const open = l(1, 0.3, 10) * (1 - l(4, 0.85, 8));
  const snip = l(2, 0, 14);
  const files = l(3, 0.3, 18);
  const docs = [0, 1, 2].map((k) => l(4, 0.05 + k * 0.2, 14));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={228} p={p(0, 0.02)} solid size={42} o={1 - l(1, 0, 8)} />
      <Tag i={1} x={540} y={228} p={p(1, 0.02)} solid size={42} />
      <Tag i={2} x={300} y={990} p={p(1, 0.35)} size={32} />
      <Tag i={3} x={250} y={440} p={p(2, 0.05)} solid color={RED} size={32} o={1 - files} />
      <Tag i={4} x={420} y={430} p={p(3, 0.15)} solid color={RED} size={30} o={1 - docs[0]} />
      <Tag i={5} x={660} y={430} p={p(3, 0.25)} solid color={"#2563EB"} size={30} o={1 - docs[0]} />
      <Tag i={6} x={540} y={440} p={p(4, 0.05)} size={30} />
      <Tag i={7} x={790} y={990} p={p(4, 0.8)} solid color={XL} size={34} />
    </>}>
      <G x={540} y={330} s={p(0, 0)}><Stepper at={0} /></G>
      {/* Ba bước xem trước: nạp file, kiểm tra mục lục, trích xuất có mỏ neo. */}
      {[0, 1, 2].map((k) => (
        <G key={k} x={220 + k * 320} y={600} s={p(0, 0.1 + k * 0.15) * (1 - l(1, 0, 10))}>
          <Box cx={0} cy={0} w={240} h={220} rx={22} fill={EL} stroke={GOLD} strokeWidth={5} />
          <G s={k === 1 ? 0.28 : 0.6}>{k === 0 ? <Folder /> : k === 1 ? <Toc w={600} h={340} /> : <Anchor />}</G>
        </G>
      ))}
      {/* Thư mục dự án lớn giữa khung. */}
      <G x={540} y={880} s={folder * 2.8}><Folder open={open} /></G>
      <G x={160} y={680} s={l(3, 0.05, 10)}><MarkGpt r={42} /></G>
      <G x={160} y={800} s={l(3, 0.1, 10)}><MarkClaude r={42} /></G>
      {/* Mẩu chữ bị copy ra ngoài: gạch chéo. */}
      <G x={lerp(540, 250, snip)} y={lerp(700, 560, snip)} s={snip * (1 - files)}>
        <Box cx={0} cy={0} w={260} h={80} rx={12} fill={PAPER} />
        <Lines x={-110} y={-16} w={220} n={2} gap={26} color={SEC} t={9} />
        <G s={l(2, 0.4, 8)}><Cross r={60} /></G>
      </G>
      {/* File PDF và Word nguyên vẹn trượt vào thư mục. */}
      <G x={420} y={lerp(560, 760, files)} s={p(3, 0.1) * lerp(0.85, 0.4, files)} o={1 - docs[0]}><KindFile kind="pdf" /></G>
      <G x={660} y={lerp(560, 760, files)} s={p(3, 0.2) * lerp(0.85, 0.4, files)} o={1 - docs[0]}><KindFile kind="word" /></G>
      {/* Hợp đồng, phụ lục, biên bản rơi vào cùng một nơi. */}
      {[0, 1, 2].map((k) => {
        const x = 330 + k * 210;
        return (
          <g key={k}>
            <G x={x} y={lerp(560, 790, docs[k])} s={p(4, 0.02 + k * 0.2) * lerp(0.8, 0.5, docs[k])}>
              {k === 0 && <Contract n={8} w={200} h={250} />}
              {k === 1 && <Page w={200} h={250} head={RED} />}
              {k === 2 && <Doc w={200} h={250} n={6} fill={PAPER} />}
            </G>
            <G x={x + 70} y={600} s={clamp01(docs[k] * 2 - 1) * 0.6}><Tick r={34} /></G>
          </g>
        );
      })}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 8 — Bước hai: bắt AI chứng minh đã đọc; câu lệnh khoan phân tích, liệt kê chương, điều, phụ lục; thiếu phụ lục B lộ ra từ phút đầu. */
export const BuocHai: React.FC = () => {
  const { f, p, l } = useT();
  const prompt = l(1, 0, 30);
  const halt = l(1, 0.3, 8);
  const toc: [number, number, number] = [l(1, 0.5, 14), l(1, 0.65, 20), l(1, 0.82, 14)];
  const miss = l(2, 0, 8);
  const flash = miss * (0.5 + 0.5 * Math.sin(f * 0.6));
  const later = l(2, 0.55, 12);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={228} p={p(0, 0.02)} solid size={42} />
      <Tag i={1} x={830} y={430} p={p(0, 0.2)} solid color={GOLDL} size={32} o={1 - prompt} />
      <Tag i={2} x={700} y={460} p={p(1, 0.3)} solid color={RED} size={30} />
      <Tag i={3} x={287} y={590} p={p(1, 0.5)} size={26} />
      <Tag i={4} x={540} y={590} p={p(1, 0.65)} size={26} />
      <Tag i={5} x={793} y={590} p={p(1, 0.82)} size={26} />
      <Tag i={6} x={793} y={895} p={p(2, 0.05)} solid color={RED} size={28} />
      <Tag i={7} x={230} y={990} p={p(2, 0.3)} solid color={XL} size={30} />
      <Tag i={8} x={800} y={990} p={p(2, 0.6)} size={30} />
    </>}>
      <G x={540} y={330}><Stepper at={1} done={1} /></G>
      <G x={540} y={330} s={l(0, 0.1, 10) * (1 - prompt)}>{[0, 1, 2, 3].map((k) => <G key={k} x={Math.cos(k * 1.57 + f / 10) * 90} y={Math.sin(k * 1.57 + f / 10) * 90} s={0.4}><Star r={30} /></G>)}</G>
      {/* Robot giơ cao tấm mục lục như nộp bài (trước khi có câu lệnh). */}
      <G x={250} y={760} s={p(0, 0.15) * 0.8 * (1 - prompt)}><Bot arm={2} /></G>
      <G x={250} y={560} s={p(0, 0.25) * 0.8 * (1 - prompt)}><Box cx={0} cy={0} w={260} h={170} rx={14} fill={PAPER} stroke={GOLD} strokeWidth={5} /><Lines x={-100} y={-50} w={200} n={4} gap={32} color={SEC} t={10} /></G>
      <G x={540} y={460} s={p(1, 0)}><Prompt fill={prompt} /></G>
      <G x={880} y={460} s={halt * 0.42}><NoSign /></G>
      <G x={540} y={760} s={l(1, 0.4, 12)}><Toc w={760} h={300} p={toc} miss={miss > 0 ? 1 : -1} flash={flash} /></G>
      {/* Phát hiện ngay từ phút đầu thay vì lúc nộp tờ trình cho sếp. */}
      <G x={230} y={1090} s={l(2, 0.2, 10)}>
        <Clock r={70} hour={0} minute={1} />
        <G x={70} y={-60} s={0.6}><Tick r={34} /></G>
      </G>
      <G x={800} y={1090} s={later} o={0.55}>
        <G x={-60} y={20} s={0.8}><Person fill={SEC} /></G>
        <G x={-60} y={-80} s={0.6}><Hat /></G>
        <G x={50} y={0}><Box cx={0} cy={0} w={100} h={130} rx={8} fill={PAPER} /><Lines x={-34} y={-40} w={68} n={4} gap={24} color={SEC} t={7} /></G>
      </G>
      <G x={800} y={1090} s={l(2, 0.75, 8)}><Cross r={90} /></G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 9 — Bước ba: trích xuất kèm mỏ neo; liệt kê điều khoản bất lợi về thanh toán và phạt hợp đồng. */
export const BuocBa: React.FC = () => {
  const { f, p, l } = useT();
  const drop = l(0, 0.1, 18);
  const prompt = l(1, 0, 24);
  const pull = l(1, 0.45, 18);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={228} p={p(0, 0.02)} solid size={42} />
      <Tag i={1} x={240} y={440} p={p(0, 0.35)} solid size={28} />
      <Tag i={2} x={640} y={600} p={p(1, 0.35)} solid color={RED} size={32} />
      <Tag i={3} x={500} y={990} p={p(1, 0.6)} size={32} />
      <Tag i={4} x={810} y={990} p={p(1, 0.75)} size={32} />
    </>}>
      <G x={540} y={330}><Stepper at={2} done={2} /></G>
      {/* Mỏ neo thả xuống, xích nối vào trang tài liệu. */}
      <line x1={220} y1={lerp(520, 650, drop)} x2={220} y2={980} stroke={SEC} strokeWidth={6} strokeDasharray="14 8" opacity={drop} />
      <G x={220} y={lerp(560, 760, drop)} s={p(0, 0.05) * 1.2}><Anchor /></G>
      <G x={220} y={1060} s={drop * 0.75}><Page w={200} h={220} /></G>
      <G x={680} y={470} s={p(1, 0)}><Prompt w={560} fill={prompt} /></G>
      <G x={640} y={720} s={p(1, 0.15) * 1.25}><Folder open={pull} /></G>
      {/* Hai nhóm điều khoản bất lợi kéo ra từ thư mục. */}
      {[0, 1].map((k) => {
        const x = k ? 810 : 500;
        return (
          <G key={k} x={lerp(640, x, pull)} y={lerp(720, 880, pull)} s={pull}>
            <Box cx={0} cy={0} w={230} h={120} rx={16} fill={EL} stroke={RED} strokeWidth={5} />
            <G x={-60} y={4} s={0.55}>{k ? <Gavel /> : <MoneyBag />}</G>
            {[0, 1].map((d) => <G key={d} x={30 + d * 50} y={30} s={0.45}><Flag color={RED} /></G>)}
          </G>
        );
      })}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 10 — Ghi rõ điều nào trang nào; KHÔNG ĐỀ CẬP, không suy đoán; mỏ neo chặn bịa số, dò ngược bản gốc trong mười giây. */
export const MoNeo: React.FC = () => {
  const { f, p, l } = useT();
  const rows = l(0, 0.05, 30) * 4;
  const none = l(1, 0.05, 10);
  const guess = l(1, 0.45, 10);
  const ban = l(1, 0.7, 8);
  const fake = l(2, 0.05, 20);
  const trace = l(2, 0.45, 18);
  const watch = l(2, 0.6, 30);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={250} p={p(0, 0.02)} solid size={42} />
      <Tag i={1} x={470} y={665} p={p(1, 0.05)} solid color={SEC} size={30} />
      <Tag i={2} x={240} y={880} p={p(1, 0.4)} solid color={RED} size={30} o={1 - fake} />
      <Tag i={3} x={500} y={880} p={p(2, 0.2)} solid color={RED} size={30} />
      <Tag i={4} x={820} y={880} p={p(2, 0.5)} solid color={XL} size={30} />
      <Tag i={5} x={540} y={990} p={p(2, 0.75)} solid size={32} />
    </>}>
      {/* Bảng kết quả: mỗi dòng một mỏ neo với ô điều và ô trang. */}
      <G x={540} y={560} s={p(0, 0)}>
        <Box cx={0} cy={0} w={840} h={380} rx={24} fill={EL} stroke={GOLD} strokeWidth={5} />
        {[0, 1, 2, 3].map((k) => {
          const y = -135 + k * 90;
          const blank = k === 2;
          return (
            <G key={k} y={y} o={clamp01(rows - k)}>
              {blank ? (
                <Box cx={0} cy={0} w={780} h={66} rx={12} fill={HOV} opacity={0.4 + 0.6 * none} stroke={SEC} strokeWidth={4} strokeDasharray="12 8" />
              ) : (
                <>
                  <Box cx={0} cy={0} w={780} h={66} rx={12} fill={SURF} />
                  <G x={-350} s={0.28}><Anchor /></G>
                  <rect x={-300} y={-8} width={340} height={16} rx={8} fill={SEC} />
                  <Box cx={170} cy={0} w={110} h={44} rx={8} fill={GOLD} />
                  <Box cx={300} cy={0} w={110} h={44} rx={8} fill={GOLDL} />
                  <rect x={135} y={-6} width={70} height={12} rx={6} fill={INK} opacity={0.6} />
                  <rect x={265} y={-6} width={70} height={12} rx={6} fill={INK} opacity={0.6} />
                </>
              )}
            </G>
          );
        })}
      </G>
      {/* Robot định suy đoán bị chặn. */}
      <G x={200} y={1060} s={p(1, 0.3) * 0.6}><Bot arm={guess * 1.4} /></G>
      <G x={290} y={980} s={guess * 0.45}><Question /></G>
      <G x={290} y={990} s={ban * 0.6}><NoSign /></G>
      {/* Con số bịa trôi tới bị mỏ neo giữ lại. */}
      <G x={lerp(620, 500, fake)} y={lerp(1150, 1060, fake)} s={fake} o={1 - l(2, 0.35, 10) * 0.7} r={l(2, 0.35, 10) * 25}>
        <Box cx={0} cy={0} w={150} h={100} rx={14} fill={RED} opacity={0.25} stroke={RED} strokeWidth={5} />
        <G s={0.55}><SegNum value={88} n={2} color={RED} frame={false} /></G>
      </G>
      <G x={420} y={1080} s={l(2, 0.2, 10) * 0.6}><Anchor color={GOLDL} /></G>
      {/* Dò ngược về đúng trang gốc, đồng hồ dừng ở mười giây. */}
      <path d="M840 560 C980 700 960 900 830 1000" fill="none" stroke={XL} strokeWidth={7} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - trace} />
      <G x={820} y={1080} s={trace}><Page w={170} h={200} mark={trace} /></G>
      <G x={640} y={1090} s={watch * 0.9}>
        <Clock r={64} hour={0} minute={Math.min(10, watch * 10)} />
        <G x={0} y={-110} s={0.45}><SegNum value={Math.round(watch * 10)} n={2} /></G>
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 11 — Mười lăm phút: chọn hợp đồng, quy chế hay tài liệu dài tuần này; chép file, kiểm tra mục lục, trích xuất theo mẫu bên dưới. */
export const HomNay: React.FC = () => {
  const { f, p, l } = useT();
  const sweep = l(0, 0.05, 20);
  const small = l(1, 0, 14);
  const pick = l(1, 0.6, 12);
  const up = l(2, 0, 14);
  const checks = [0, 1, 2].map((k) => l(2, 0.1 + k * 0.25, 10));
  const a = (sweep * 90 * Math.PI) / 180;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={232} p={p(0, 0.02)} solid size={50} />
      <Tag i={1} x={300} y={lerp(800, 520, up)} p={p(1, 0.1)} size={30} o={1 - up} />
      <Tag i={2} x={540} y={lerp(800, 520, up)} p={p(1, 0.25)} size={30} o={1 - up} />
      <Tag i={3} x={780} y={lerp(800, 520, up)} p={p(1, 0.4)} size={30} o={1 - up} />
      <Tag i={4} x={590} y={640} p={p(2, 0.1)} solid size={32} />
      <Tag i={5} x={590} y={770} p={p(2, 0.35)} solid size={32} />
      <Tag i={6} x={590} y={900} p={p(2, 0.6)} solid size={32} />
    </>}>
      {/* Đồng hồ quét một phần tư vòng, rồi thu về góc. */}
      <G x={lerp(540, 170, small)} y={lerp(650, 330, small)} s={p(0, 0) * lerp(2.6, 0.75, small)}>
        <Clock r={80} hour={0} minute={sweep * 15} />
        <path d={`M0 0 L0 -72 A72 72 0 0 1 ${Math.sin(a) * 72} ${-Math.cos(a) * 72} Z`} fill={GOLD} opacity={0.55} />
      </G>
      {/* Ba loại tài liệu; chọn một, lịch tuần này bên cạnh. */}
      <G y={lerp(0, -170, up)} o={1 - up}>
        <G x={300} y={590} s={clamp01(small * 2) * lerp(0.7, 0.6, pick)}><Contract n={10} /></G>
        <G x={540} y={590} s={clamp01(small * 2 - 0.3) * 0.62}><SopBook /></G>
        <G x={780} y={590} s={clamp01(small * 2 - 0.6)}><Doc w={170} h={260} n={8} fill={PAPER} /></G>
        <rect x={190} y={420} width={220} height={340} rx={20} fill="none" stroke={GOLDL} strokeWidth={6} opacity={pick} />
        <G x={420} y={420} s={pick * 0.42}><Calendar /></G>
      </G>
      {/* Ba việc lần lượt tích; mẫu ở bài viết bên dưới. */}
      {[0, 1, 2].map((k) => (
        <G key={k} x={540} y={640 + k * 130} s={p(2, 0.05 + k * 0.25)}>
          <Box cx={0} cy={0} w={760} h={100} rx={20} fill={EL} stroke={checks[k] > 0.9 ? XL : HOV} strokeWidth={5} />
          <G x={-320} s={0.36}>{k === 0 ? <Folder /> : k === 1 ? <Toc w={260} h={160} /> : <Anchor />}</G>
          <G x={320} s={checks[k] * 0.7}><Tick r={34} /></G>
        </G>
      ))}
      <Arrow x1={540} y1={960} x2={540} y2={1020} p={l(2, 0.7, 8)} w={8} />
      <G x={540} y={1110} s={l(2, 0.65, 12)}>
        <Box cx={0} cy={0} w={760} h={150} rx={18} fill={PAPER} />
        <Lines x={-340} y={-40} w={280} n={3} gap={34} color={SEC} t={10} />
        <Box cx={180} cy={0} w={300} h={100} rx={14} fill={EL} stroke={GOLD} strokeWidth={4} />
        <G x={70} y={0} s={0.25}><Anchor /></G>
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 12 — Nạp đúng cách: trợ lý pháp chế đọc sạch bốn mươi trang; bài tiếp theo: ba khiên trước sếp; màn kết. */
export const HenBaiSau: React.FC = () => {
  const { f, p, l } = useT();
  const feed = l(0, 0.1, 40);
  const read = l(0, 0.35, 60);
  const next = l(1, 0.02, 14);
  const end = l(2, 0, 12);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={790} y={985} p={p(0, 0.2)} solid size={36} o={1 - next} />
      <Tag i={1} x={290} y={985} p={p(0, 0.6)} solid color={XL} size={32} o={1 - next} />
      <Tag i={2} x={540} y={232} p={p(1, 0.02)} solid size={46} />
      <Tag i={3} x={540} y={380} p={p(1, 0.2)} solid color={GOLDL} size={36} />
      <Tag i={4} x={540} y={880} p={p(1, 0.5)} solid color={RED} size={34} />
      {end > 0 && <BrandEnd k={end} />}
    </>}>
      {/* Hợp đồng nguyên vẹn (không cắt) trượt trọn vào trợ lý pháp chế; bốn mươi trang lật qua. */}
      <G o={1 - next}>
        <G x={lerp(290, 600, feed)} y={lerp(640, 720, feed)} s={lerp(1.15, 0.3, feed)} o={1 - clamp01(feed * 1.3 - 0.3)}><Contract n={14} /></G>
        <G x={790} y={730} s={0.95}>
          <Bot arm={0.6} />
          <G y={150} s={0.32}><Scales color={GOLD} /></G>
        </G>
        <G x={790} y={420} s={p(0, 0.1) * 0.7}><SegNum value={Math.round(read * 40)} n={2} /></G>
        {Array.from({ length: 8 }, (_, k) => (
          <G key={k} x={180 + (k % 4) * 110} y={780 + Math.floor(k / 4) * 140} s={clamp01(read * 8 - k) * 0.55}>
            <Page w={150} h={190} />
            <G x={40} y={-60} s={0.8}><Tick r={30} /></G>
          </G>
        ))}
      </G>
      {/* Bài sau: ba khiên vàng chặn ngón tay chỉ lỗi trước sếp. */}
      <G o={next * (1 - end)}>
        {[0, 1, 2].map((k) => <G key={k} x={300 + k * 240} y={620} s={p(1, 0.1 + k * 0.08) * 1.6}><Shield color={GOLD} /></G>)}
        <G x={540} y={1080} s={next * 0.9}><Person fill={SEC} /></G>
        <G x={540} y={980} s={next * 0.7}><Hat /></G>
        <G x={lerp(700, 560, l(1, 0.5, 10))} y={1000} s={next}>
          <rect x={0} y={-10} width={120} height={20} rx={10} fill={TXT} />
        </G>
        <G x={540} y={760} s={l(1, 0.55, 8) * 0.9}><Cross r={60} color={RED} /></G>
        {[[150, 450], [930, 450], [150, 1000], [930, 1000]].map(([x, y], k) => <G key={k} x={x} y={y} s={next * (0.4 + 0.25 * Math.sin(f / 5 + k))}><Spark r={24} fill={GOLDL} /></G>)}
      </G>
      <Floor y={1240} />
    </Stage>
  );
};
