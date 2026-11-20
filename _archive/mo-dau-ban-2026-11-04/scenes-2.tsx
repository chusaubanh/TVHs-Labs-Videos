import React from "react";
import { AI, Arrow, Box, Browser, Clock, EL, Floor, Folder, G, GOLD, GOLDL, Hand, HOV, INK, Lines, PAPER, Person, Question, RED, SEC, Stage, Stamp, Sun, SURF, Tag, TXT, lerp, useT } from "../shared/art";
import { Calendar, clamp01, Cursor, MarkClaude, MarkGpt, Win } from "../bai-1/art";
import { Sheet, Steps } from "./art";

const SHEETS = [
  [210, 330],
  [540, 300],
  [870, 330],
] as const;

/** Cảnh 5 — Cách thứ nhất: ba file Excel, dán từng mẩu vào khung chat web, thiếu dòng thì bịa số, cuối cùng dò tay. */
export const Cach1WebChat: React.FC = () => {
  const { f, p, l } = useT();
  const fly = (k: number) => l(1, 0.35 + k * 0.15, 14);
  const dot = l(3, 0, 40);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={430} p={p(0, 0.2)} solid size={36} />
      <Tag i={1} x={870} y={520} p={p(0, 0.6)} size={30} />
      <Tag i={2} x={260} y={540} p={p(1, 0)} solid size={32} />
      <Tag i={3} x={540} y={600} p={p(1, 0.15)} size={30} />
      <Tag i={4} x={330} y={900} p={p(2, 0.05)} size={30} />
      <Tag i={5} x={770} y={900} p={p(2, 0.5)} solid color={RED} size={32} />
      <Tag i={6} x={700} y={1010} p={p(3, 0.1)} size={32} />
    </>}>
      {/* Ba file Excel nằm rải rác, đồng hồ chiều họp. */}
      {SHEETS.map(([x, y], k) => (
        <G key={k} x={x} y={y} s={p(0, k * 0.12) * 0.8} r={(k - 1) * 6}>
          <Sheet w={220} h={200} cols={3} rows={5} />
        </G>
      ))}
      <G x={870} y={460} s={p(0, 0.55) * 0.6}>
        <Clock r={60} hour={15} />
      </G>
      {/* Trình duyệt với khung chat: từng mẩu bảng bay vào. */}
      <G x={540} y={760} s={p(1, 0)}>
        <Browser w={820} h={360}>
          <rect x={-390} y={-60} width={170} height={220} rx={14} fill={SURF} />
          {[0, 1, 2].map((k) => (
            <rect key={k} x={-370} y={-40 + k * 50} width={130} height={16} rx={8} fill={HOV} />
          ))}
          {[0, 1, 2].map((k) => (
            <rect key={k} x={-150 + k * 180} y={20} width={150} height={50} rx={10} fill={fly(k) >= 1 ? GOLDL : "none"} stroke={HOV} strokeWidth={fly(k) >= 1 ? 0 : 3} strokeDasharray="8 8" />
          ))}
          {/* Dòng bị thiếu: AI tự điền số đỏ. */}
          <rect x={-150} y={100} width={330} height={50} rx={10} fill={l(2, 0.5, 6) > 0.5 ? RED : "none"} stroke={SEC} strokeWidth={3} strokeDasharray="10 8" opacity={p(2, 0)} />
          {l(2, 0.5, 6) > 0.5 && <rect x={-120} y={118} width={120} height={14} rx={7} fill={INK} />}
        </Browser>
      </G>
      {[0, 1, 2].map((k) => {
        const t = fly(k);
        return t > 0 && t < 1 ? (
          <G key={k} x={lerp(SHEETS[k]![0], 465 + k * 180, t)} y={lerp(SHEETS[k]![1] + 40, 805, t)}>
            <Box cx={0} cy={0} w={120} h={40} rx={8} fill={TXT} />
          </G>
        ) : null;
      })}
      {l(1, 0.3, 10) > 0 && l(1, 0.9, 6) < 1 && (
        <G x={lerp(240, 820, l(1, 0.3, 40))} y={480} s={0.5} r={-10}>
          <Hand />
        </G>
      )}
      {/* Người còng lưng dò số bằng tay. */}
      <G x={200} y={1150} s={p(3, 0)}>
        <g transform="rotate(18)">
          <Person fill={SEC} s={0.95} />
        </g>
      </G>
      <G x={560} y={1140} s={p(3, 0.05)}>
        <Sheet w={420} h={130} cols={5} rows={3} />
        <G x={lerp(-180, 180, dot)} y={lerp(-30, 30, dot) + Math.sin(f / 3) * 4} s={0.5}>
          <Cursor />
        </G>
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 6 — Cách thứ hai: trợ lý trên máy, Project và Codex, một câu giao việc, đối chiếu nguồn. */
export const Cach2TroLyMayTinh: React.FC = () => {
  const { p, l } = useT();
  const shrink = l(1, 0, 14);
  const drag = l(1, 0.5, 26);
  const enter = l(2, 0.75, 6);
  const gather = (k: number) => l(3, 0.15 + k * 0.1, 16);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0)} solid size={38} />
      <Tag i={1} x={540} y={600} p={p(0, 0.35)} size={32} o={1 - shrink} />
      <Tag i={2} x={360} y={590} p={p(1, 0.15)} size={30} />
      <Tag i={3} x={720} y={590} p={p(1, 0.35)} size={30} />
      <Tag i={4} x={330} y={790} p={p(2, 0.1)} size={30} />
      <Tag i={5} x={820} y={920} p={p(3, 0.4)} solid size={30} />
      <Tag i={6} x={360} y={1010} p={p(3, 0.7)} size={30} />
    </>}>
      {/* Màn hình máy tính có AI ngồi sẵn như trợ lý. */}
      <Box cx={540} cy={430} w={860} h={420} rx={26} fill={EL} stroke={GOLD} strokeWidth={6} />
      <G x={lerp(540, 170, shrink)} y={lerp(420, 290, shrink)} s={lerp(1.4, 0.55, shrink) * p(0, 0)}>
        <AI size={110} />
      </G>
      {/* Hai cửa sổ: Project với dấu hiệu Claude, Codex với dấu hiệu ChatGPT. */}
      <G x={360} y={440} s={p(1, 0.05)} o={clamp01(p(1, 0.05))}>
        <Win w={300} h={260} stroke={GOLD}>
          <G y={10}>
            <MarkClaude r={40} />
          </G>
        </Win>
      </G>
      <G x={720} y={440} s={p(1, 0.25)} o={clamp01(p(1, 0.25))}>
        <Win w={300} h={260} stroke={HOV}>
          <G y={10}>
            <MarkGpt r={40} />
          </G>
        </Win>
      </G>
      {/* Thư mục chứa ba file được kéo vào. */}
      <G x={lerp(540, 540, drag)} y={lerp(1120, 470, drag)} s={p(1, 0.45) * lerp(0.9, 0.5, drag)} o={1 - l(2, 0, 8)}>
        <Folder open={0.6} />
        {[0, 1, 2].map((k) => (
          <G key={k} x={-60 + k * 60} y={-60} s={0.32}>
            <Sheet w={220} h={200} cols={3} rows={4} />
          </G>
        ))}
      </G>
      {drag > 0 && drag < 1 && (
        <G x={570} y={lerp(1150, 500, drag)}>
          <Cursor />
        </G>
      )}
      {/* Một câu giao việc, phím Enter. */}
      <G x={480} y={720} s={p(2, 0)}>
        <Box cx={0} cy={0} w={640} h={80} rx={24} fill={GOLD} />
        <rect x={-290} y={-8} width={400 * l(2, 0.05, 30)} height={16} rx={8} fill={INK} />
      </G>
      <G x={880} y={720 + enter * 6} s={p(2, 0.4)}>
        <Box cx={0} cy={0} w={120} h={80} rx={14} fill={TXT} />
        <path d="M30 -16 V8 H-30 M-18 -4 L-32 8 L-18 20" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      </G>
      {/* Ba file tự mở, số gom vào bảng tổng, dây nối về nguồn. */}
      {[0, 1, 2].map((k) => (
        <G key={k} x={170 + k * 190} y={1110} s={p(3, 0.05 + k * 0.06) * 0.62}>
          <Sheet w={240} h={180} cols={3} rows={4} litCol={1} />
        </G>
      ))}
      <G x={820} y={1080} s={p(3, 0.3)}>
        <Sheet w={260} h={210} cols={2} rows={4} fill={PAPER} />
      </G>
      {[0, 1, 2].map((k) => {
        const t = gather(k);
        return t > 0 ? <Arrow key={k} x1={170 + k * 190} y1={1045} x2={700} y2={1040 + k * 40} p={t} color={GOLDL} w={5} dash /> : null;
      })}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 7 — Cùng một AI: một bên mớm mẩu vụn, một bên tự đọc dữ liệu; đổi cách giao việc. */
export const DoiCachGiaoViec: React.FC = () => {
  const { f, p, l } = useT();
  const feed = (k: number) => clamp01(((f / 18 + k / 3) % 1) * l(1, 0.05, 6));
  const turn = l(2, 0.05, 14);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={215} p={p(0, 0.2)} solid size={36} />
      <Tag i={1} x={260} y={720} p={p(1, 0.1)} size={32} />
      <Tag i={2} x={820} y={720} p={p(1, 0.45)} size={32} />
      <Tag i={3} x={540} y={850} p={p(2, 0)} solid size={38} />
      <Tag i={4} x={540} y={1010} p={p(2, 0.4)} size={34} />
    </>}>
      {/* Cán cân thăng bằng: hai AI giống hệt nhau. */}
      <rect x={530} y={330} width={20} height={430} rx={8} fill={HOV} />
      <path d="M440 770 L640 770 L540 690 Z" fill={HOV} />
      <rect x={200} y={322} width={680} height={18} rx={9} fill={GOLD} />
      {[260, 820].map((x, k) => (
        <g key={k}>
          <line x1={x} y1={340} x2={x - 70} y2={500} stroke={SEC} strokeWidth={4} />
          <line x1={x} y1={340} x2={x + 70} y2={500} stroke={SEC} strokeWidth={4} />
          <path d={`M${x - 110} 500 Q${x} 560 ${x + 110} 500 Z`} fill={SEC} />
          <G x={x} y={440} s={p(0, 0.1 + k * 0.15)}>
            <AI size={120} />
          </G>
        </g>
      ))}
      {/* Bên trái: tay mớm từng mẩu vụn. */}
      <G x={110} y={600} s={p(1, 0) * 0.5} r={-30}>
        <Hand />
      </G>
      {[0, 1, 2].map((k) => (
        <G key={k} x={lerp(130, 240, feed(k))} y={lerp(560, 450, feed(k))} s={p(1, 0) * (1 - feed(k) * 0.6)}>
          <Box cx={0} cy={0} w={44} h={22} rx={5} fill={TXT} />
        </G>
      ))}
      {/* Bên phải: AI tự mở thư mục, dữ liệu chảy vào. */}
      <G x={940} y={600} s={p(1, 0.4) * 0.55}>
        <Folder open={1} />
      </G>
      {Array.from({ length: 6 }, (_, k) => {
        const t = ((f / 24 + k / 6) % 1) * l(1, 0.45, 6);
        return t > 0 ? <circle key={k} cx={lerp(930, 840, t)} cy={lerp(560, 470, t)} r={9} fill={GOLDL} /> : null;
      })}
      {/* Chỉ cách giao việc đổi hướng, AI giữ nguyên. */}
      <G x={540} y={950} s={p(2, 0)}>
        <G r={lerp(180, 0, turn)}>
          <Arrow x1={-200} y1={0} x2={200} y2={0} p={1} color={turn > 0.9 ? GOLD : SEC} w={18} />
        </G>
      </G>
      <G x={540} y={1130} s={p(2, 0.6, 9)}>
        <Stamp r={60} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 8 — Ba việc thật, việc thứ nhất: kế hoạch ngày, AI phỏng vấn rồi xếp ưu tiên, mình duyệt. */
export const Viec1KeHoach: React.FC = () => {
  const { p, l } = useT();
  const sun = l(1, 0, 20);
  const sort = l(2, 0.45, 20);
  const cards = [0, 1, 2, 3, 4];
  const order = [3, 0, 4, 1, 2];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={200} p={p(0, 0.1)} solid size={36} />
      <Tag i={1} x={300} y={420} p={p(1, 0)} size={30} />
      <Tag i={2} x={300} y={820} p={p(1, 0.3)} solid size={34} />
      <Tag i={3} x={680} y={440} p={p(2, 0.05)} size={30} />
      <Tag i={4} x={480} y={940} p={p(2, 0.5)} size={30} />
      <Tag i={5} x={480} y={1020} p={p(2, 0.85)} solid size={32} />
    </>}>
      <G x={540} y={310}>
        <Steps active={l(1, 0, 4) > 0 ? 0 : -1} p={[p(0, 0.2), p(0, 0.35), p(0, 0.5)]} />
      </G>
      {/* Mặt trời mọc sau tờ lịch ngày. */}
      <clipPath id="md-sun">
        <rect x={120} y={480} width={360} height={200} />
      </clipPath>
      <g clipPath="url(#md-sun)">
        <G x={300} y={lerp(700, 560, sun)} o={l(1, 0, 4)}>
          <Sun r={56} />
        </G>
      </g>
      <G x={300} y={690} s={p(1, 0.05) * 0.8}>
        <Calendar />
      </G>
      {/* AI phỏng vấn mình. */}
      <G x={680} y={560} s={p(2, 0)}>
        <AI size={110} />
        {[0, 1].map((k) => (
          <G key={k} x={-150 + k * 40} y={-20 + k * 70} s={p(2, 0.1 + k * 0.15) * 0.4}>
            <Question />
          </G>
        ))}
      </G>
      <G x={900} y={600} s={p(2, 0.2)}>
        <Person fill={SEC} s={0.8} />
      </G>
      {/* Các thẻ việc rơi xuống rồi xếp thành cột ưu tiên. */}
      {cards.map((k) => {
        const drop = l(2, 0.25 + k * 0.04, 12);
        const slot = order[k]!;
        const x = lerp(620 + (k % 3) * 110, 790, sort);
        const y = lerp(760 + Math.floor(k / 3) * 90, 760 + slot * 82, sort);
        return (
          <G key={k} x={x} y={lerp(640, y, drop)} s={drop} r={lerp((k - 2) * 8, 0, sort)}>
            <Box cx={0} cy={0} w={sort > 0.5 ? 300 : 120} h={66} rx={12} fill={sort > 0.5 && slot === 0 ? GOLD : TXT} />
            <rect x={sort > 0.5 ? -120 : -40} y={-7} width={sort > 0.5 ? 180 : 70} height={14} rx={7} fill={INK} />
          </G>
        );
      })}
      <G x={930} y={1150} s={p(2, 0.85, 9)}>
        <Stamp r={50} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

