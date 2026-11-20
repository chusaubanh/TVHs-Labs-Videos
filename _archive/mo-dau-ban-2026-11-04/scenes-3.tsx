import React from "react";
import { AI, BrandEnd, Arrow, Box, Chat, Cross, EL, Floor, G, GOLD, GOLDL, Hand, HOV, INK, Lines, Lock, Mag, PAPER, Person, RED, SEC, Spark, Stage, Stamp, SURF, Tag, TXT, lerp, useT } from "../shared/art";
import { NumChip } from "../bai-1/art";
import { CodeMark, Pen, Sheet, Steps } from "./art";

/** Cảnh 9 — Việc thứ hai: viết quy trình SOP từ các bước thực tế và chỗ hay vướng. */
export const Viec2Sop: React.FC = () => {
  const { p, l } = useT();
  const write = (k: number) => l(1, 0.45 + k * 0.1, 10);
  const scan = l(2, 0, 20);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={200} p={p(0, 0)} solid size={36} />
      <Tag i={1} x={760} y={420} p={p(0, 0.3)} size={32} />
      <Tag i={2} x={220} y={880} p={p(1, 0.05)} size={30} />
      <Tag i={3} x={220} y={990} p={p(1, 0.25)} solid color={RED} size={30} />
      <Tag i={4} x={760} y={890} p={p(1, 0.8)} size={30} />
      <Tag i={5} x={760} y={1000} p={p(2, 0.2)} solid size={32} />
    </>}>
      <G x={540} y={310}>
        <Steps active={1} />
      </G>
      {/* Tờ quy trình trống, rồi các bước đánh số hiện dần. */}
      <G x={760} y={650} s={p(0, 0.2)}>
        <Box cx={0} cy={0} w={330} h={380} rx={18} fill={PAPER} />
        <Box cx={0} cy={-158} w={330} h={64} rx={18} fill={GOLD} />
        {[0, 1, 2, 3].map((k) => (
          <g key={k}>
            <circle cx={-125} cy={-80 + k * 70} r={18} fill={write(k) > 0.5 ? GOLD : HOV} />
            <rect x={-95} y={-88 + k * 70} width={220 * write(k)} height={16} rx={8} fill={SEC} />
          </g>
        ))}
      </G>
      {/* Mẩu ghi bước làm và chỗ hay vướng bay vào AI. */}
      {[0, 1, 2, 3].map((k) => {
        const t = l(1, 0.05 + k * 0.08, 16);
        return (
          <G key={k} x={lerp(170 + (k % 2) * 110, 420, t * 0.9)} y={lerp(470 + k * 90, 650, t * 0.9)} s={(1 - t * 0.7) * p(1, k * 0.06)} r={(k - 1.5) * 8}>
            <Box cx={0} cy={0} w={150} h={70} rx={10} fill={k === 1 || k === 3 ? RED : TXT} />
            {k === 1 || k === 3 ? (
              <g>
                <rect x={-5} y={-24} width={10} height={30} rx={5} fill={INK} />
                <circle cy={18} r={6} fill={INK} />
              </g>
            ) : (
              <Lines x={-55} y={-14} w={110} n={2} gap={24} color={INK} t={9} />
            )}
          </G>
        );
      })}
      <G x={440} y={650} s={p(1, 0.2)}>
        <AI size={110} />
      </G>
      <Arrow x1={510} y1={650} x2={580} y2={650} p={l(1, 0.4, 8)} />
      {/* Kính lúp rà soát rồi con dấu chốt. */}
      <G x={760} y={lerp(560, 780, scan)} s={p(2, 0)}>
        <Mag s={0.7} />
      </G>
      <G x={760} y={1130} s={p(2, 0.5, 9)}>
        <Stamp r={60} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 10 — Việc thứ ba: không dùng AI để viết, giao nó vai người phản biện khó tính. */
export const Viec3PhanBien: React.FC = () => {
  const { f, p, l } = useT();
  const scan = l(3, 0, 30);
  const send = l(3, 0.75, 14);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={200} p={p(0, 0)} solid size={34} />
      <Tag i={1} x={280} y={560} p={p(0, 0.45)} solid color={RED} size={30} />
      <Tag i={2} x={540} y={650} p={p(1, 0.05)} size={30} />
      <Tag i={3} x={200} y={830} p={p(1, 0.55)} size={30} />
      <Tag i={4} x={830} y={600} p={p(2, 0.3)} solid size={30} />
      <Tag i={5} x={400} y={980} p={p(3, 0.2)} size={28} />
      <Tag i={6} x={730} y={1020} p={p(3, 0.45)} size={28} />
    </>}>
      <G x={540} y={300} s={0.75}>
        <Steps active={2} />
      </G>
      {/* Bút AI bị gạch, bút của mình vẫn cầm trên tay. */}
      <G x={280} y={430} s={p(0, 0.15) * 0.8} r={30}>
        <Pen fill={SEC} />
        <G x={6} y={-40}>
          <AI size={50} dim />
        </G>
      </G>
      <G x={280} y={430} s={p(0, 0.4, 9)}>
        <Cross r={70} />
      </G>
      <G x={830} y={440} s={p(0, 0.25) * 0.8} r={-25}>
        <Pen />
      </G>
      <G x={900} y={490} s={p(0, 0.3) * 0.5} r={-20}>
        <Hand />
      </G>
      {/* Văn bản của mình gắn huy hiệu chuyên môn; khối chữ AI rỗng ruột. */}
      <G x={540} y={850} s={p(1, 0)}>
        <Box cx={0} cy={0} w={340} h={360} rx={16} fill={PAPER} />
        <Lines x={-130} y={-110} w={260} n={7} gap={34} color={SEC} t={12} />
        <G x={130} y={-150} s={p(1, 0.1)}>
          <circle r={36} fill={GOLD} />
          <Spark r={20} fill={INK} />
        </G>
        {[1, 4].map((k) => (
          <ellipse key={k} cx={-10} cy={-104 + k * 34} rx={150} ry={22} fill="none" stroke={RED} strokeWidth={6} opacity={l(3, 0.15 + k * 0.05, 8)} />
        ))}
      </G>
      <G x={200} y={720} s={p(1, 0.5)}>
        <ellipse rx={110} ry={70} fill="none" stroke={SEC} strokeWidth={5} strokeDasharray="12 10" />
        <Lines x={-60} y={-14} w={120} n={2} gap={26} color={HOV} t={10} />
      </G>
      {/* AI đổi vai: đeo kính, cầm kính lúp soi văn bản. */}
      <G x={850} y={760} s={p(2, 0)}>
        <AI size={110} />
        <g>
          <circle cx={-22} cy={-4} r={16} fill="none" stroke={TXT} strokeWidth={5} />
          <circle cx={22} cy={-4} r={16} fill="none" stroke={TXT} strokeWidth={5} />
          <line x1={-6} x2={6} y1={-4} y2={-4} stroke={TXT} strokeWidth={5} />
        </g>
      </G>
      <G x={lerp(640, 470, scan)} y={lerp(760, 930, scan) + Math.sin(f / 6) * 4} s={p(2, 0.3) * 0.75}>
        <Mag />
      </G>
      {/* Sửa xong thì gửi sếp. */}
      <G x={880} y={1130} s={p(3, 0.65)}>
        <Box cx={0} cy={0} w={150} h={100} rx={12} fill={TXT} />
        <path d="M-75 -50 L0 10 L75 -50" fill="none" stroke={GOLD} strokeWidth={8} strokeLinejoin="round" />
      </G>
      <Arrow x1={720} y1={1060} x2={800} y2={1110} p={send} />
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 11 — Chân chạm đất: AI gom số, bạn chọn phương án; người giải trình trước sếp là bạn. */
export const ChanChamDat: React.FC = () => {
  const { p, l } = useT();
  const gather = l(0, 0.1, 14);
  const pick = l(0, 0.6, 14);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={200} p={p(0, 0)} solid size={38} />
      <Tag i={1} x={230} y={560} p={p(0, 0.2)} size={30} />
      <Tag i={2} x={760} y={300} p={p(0, 0.7)} solid size={30} />
      <Tag i={3} x={540} y={760} p={p(1, 0.5)} solid size={34} />
    </>}>
      {/* AI gom nhanh các con số thành ba phương án. */}
      <G x={230} y={420} s={p(0, 0)}>
        <AI size={130} />
      </G>
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const t = gather;
        return (
          <G key={k} x={lerp(140 + (k % 3) * 90, 480 + (k % 3) * 160, t)} y={lerp(560 + Math.floor(k / 3) * 60, 470, t)} s={(1 - t) * 0.55} o={1 - t}>
            <NumChip />
          </G>
        );
      })}
      {[0, 1, 2].map((k) => (
        <G key={k} x={480 + k * 160} y={k === 1 ? lerp(470, 380, pick) : 470} s={p(0, 0.25 + k * 0.06)}>
          <Box cx={0} cy={0} w={140} h={170} rx={14} fill={k === 1 && pick > 0.5 ? GOLD : TXT} />
          <Lines x={-50} y={-50} w={100} n={4} gap={28} color={INK} t={9} />
        </G>
      ))}
      <G x={660} y={lerp(640, 520, pick)} s={p(0, 0.6) * 0.5} r={-8}>
        <Hand />
      </G>
      <Box cx={640} cy={570} w={520} h={18} rx={9} fill={HOV} />
      {/* Bàn sếp: bạn đứng trước giải trình, AI lùi phía sau. */}
      <g opacity={Math.min(1, p(1, 0))}>
      <G x={760} y={940} s={p(1, 0)}>
        <Person fill={SEC} s={1.2} />
      </G>
      <Box cx={760} cy={1010} w={380} h={26} rx={13} fill={GOLD} />
      <rect x={590} y={1023} width={16} height={140} fill={HOV} />
      <rect x={914} y={1023} width={16} height={140} fill={HOV} />
      </g>
      <G x={820} y={985} s={p(1, 0.15)}>
        <Box cx={0} cy={0} w={130} h={40} rx={6} fill={PAPER} />
        <G x={70} y={-30} s={0.7}>
          <circle r={22} fill={RED} />
          <rect x={-4} y={-14} width={8} height={18} rx={4} fill={INK} />
          <circle cy={10} r={4} fill={INK} />
        </G>
      </G>
      <G x={lerp(260, 430, l(1, 0.3, 16))} y={1110} s={p(1, 0.3)}>
        <Person fill={TXT} s={1.25} />
      </G>
      <G x={180} y={1130} s={p(1, 0.5) * 0.7} o={0.6}>
        <AI size={110} dim />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 12 — Không cần code, bài một khóa chân AI (vòng về cảnh đầu), mời bình luận. */
export const HenBai1: React.FC = () => {
  const { f, p, l } = useT();
  const end = l(4, 0, 12);
  const lock = p(1, 0.35, 9);
  const climb = l(3, 0, 12);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={300} y={660} p={p(0, 0.3)} size={32} />
      <Tag i={1} x={540} y={580} p={p(1, 0.5)} solid size={38} />
      <Tag i={2} x={760} y={760} p={p(2, 0.1)} size={30} />
      <Tag i={3} x={600} y={1015} p={p(2, 0.5)} solid size={30} />
      {end > 0 && <BrandEnd k={end} />}
    </>}>
      {/* Vòng về cảnh đầu: bảng Excel và khung chat, giờ cột số bị khoá. */}
      <G x={300} y={360} s={p(1, 0) * 0.75}>
        <Sheet w={320} h={300} cols={4} rows={5} litCol={lock > 0.5 ? 2 : -1} />
        <G x={40} y={-10} s={lock}>
          <Lock s={1.3} />
        </G>
      </G>
      <G x={760} y={360} s={p(1, 0.1) * 0.75}>
        <Chat w={360} h={320} />
      </G>
      {/* Bậc thang các bước dễ, ngoặc code bị gạch. */}
      {[0, 1, 2, 3, 4].map((s) => (
        <G key={s} x={140 + s * 76} y={1200} s={p(0, s * 0.06)}>
          <rect x={-34} y={-(s + 1) * 40} width={68} height={(s + 1) * 40} rx={8} fill={s === 0 && climb > 0.5 ? GOLD : s === 0 ? GOLDL : HOV} />
        </G>
      ))}
      <G x={140} y={1100} s={climb}>
        <Lock s={0.6} />
      </G>
      <G x={300} y={790} s={p(0, 0.2) * 0.6}>
        <CodeMark />
      </G>
      <G x={300} y={790} s={p(0, 0.45, 9) * 0.7}>
        <Cross r={70} />
      </G>
      {/* Bong bóng bình luận bay lên với các thẻ việc hằng tuần. */}
      <G x={760} y={lerp(1150, 890, l(2, 0.05, 18)) + Math.sin(f / 9) * 4} s={p(2, 0)}>
        <Box cx={0} cy={0} w={340} h={180} rx={30} fill={TXT} />
        <path d="M-120 86 L-150 130 L-70 86 Z" fill={TXT} />
        {[0, 1, 2].map((k) => (
          <G key={k} x={-110 + k * 110} y={0} s={p(2, 0.3 + k * 0.1)}>
            <Box cx={0} cy={0} w={90} h={110} rx={10} fill={k === 1 ? GOLD : SURF} />
            <Lines x={-30} y={-30} w={60} n={3} gap={24} color={k === 1 ? INK : SEC} t={8} />
          </G>
        ))}
      </G>
      <Floor y={1240} />
    </Stage>
  );
};
