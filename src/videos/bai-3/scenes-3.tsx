import React from "react";
import { AI, Arrow, Box, BrandEnd, Browser, Chat, Clock, Doc, EL, Floor, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, Person, Question, RED, SEC, Spark, Stage, SURF, Tag, TXT, XL, lerp, useT } from "../shared/art";
import { Calendar, Cursor, FileIcon, Laptop } from "../bai-1/art";
import { Boss, clamp01, Grid, Note, ORANGE, Phone, Report } from "./art";

/** Cảnh 9 — Cụm từ sống còn: ghi chú ghim cạnh ô chat; câu lệnh Single-file HTML gom màu và định dạng vào một file. */
export const CumTuSongCon: React.FC = () => {
  const { f, p, l } = useT();
  const type = l(1, 0, 60);
  const pack = l(1, 0.45, 30);
  const blink = Math.floor(f / 14) % 2;
  const bits: [number, number, string][] = [
    [-300, -120, XL],
    [-180, -200, ORANGE],
    [200, -180, "#60A5FA"],
    [320, -80, GOLD],
    [-260, 60, RED],
    [260, 80, GOLDL],
  ];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={230} p={p(0, 0.1)} solid size={46} />
      <Tag i={1} x={540} y={530} p={p(1, 0.3)} solid size={54} />
      <Tag i={2} x={380} y={1010} p={p(1, 0.6)} size={36} />
    </>}>
      {/* Ô chat trống, con trỏ nhấp nháy, rồi câu lệnh gõ dần. */}
      <G x={540} y={660} s={p(0, 0)}>
        <Chat w={900} h={520}>
          <Box cx={90} cy={150} w={640} h={80} rx={24} fill={SURF} stroke={GOLD} strokeWidth={4} />
          <rect x={-210} y={142} width={560 * type} height={16} rx={8} fill={TXT} />
          <rect x={-205 + 560 * type} y={128} width={6} height={44} rx={3} fill={GOLD} opacity={blink} />
          <Box cx={110} cy={-30} w={560 * clamp01(type * 1.5)} h={70} rx={20} fill={GOLD} opacity={clamp01(type * 3)} />
          <Lines x={-150} y={40} w={460 * type} n={2} gap={28} color={SEC} t={11} />
        </Chat>
      </G>
      {/* Ghi chú ghim phát sáng cạnh ô chat. */}
      <G x={860} y={lerp(200, 380, p(0, 0.35, 10))} r={6} s={p(0, 0.35) * 0.8}>
        <Note glow={0.6 + 0.4 * Math.sin(f / 7)} />
      </G>
      {/* Màu, định dạng, phông chữ bay vào gói gọn trong một file. */}
      {bits.map(([x, y, c], k) => {
        const t = clamp01(pack * 1.4 - k * 0.07);
        return (
          <G key={k} x={lerp(540 + x, 840, t)} y={lerp(660 + y, 1060, t)} s={lerp(1, 0.2, t) * p(1, 0.35 + k * 0.03)} o={1 - t * 0.9}>
            {k % 3 === 0 ? <circle r={28} fill={c} /> : k % 3 === 1 ? <Box cx={0} cy={0} w={60} h={44} rx={8} fill={c} /> : <path d="M-26 26 L0 -30 L26 26 M-14 6 H14" stroke={c} strokeWidth={10} fill="none" strokeLinecap="round" />}
          </G>
        );
      })}
      <G x={840} y={1060} s={p(1, 0.5) * (1 + 0.08 * Math.sin(pack * Math.PI))}>
        <FileIcon fill={pack > 0.9 ? GOLD : TXT} ink={INK} s={1.2} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 10 — Không dặn thì ra nhiều file lẻ, gửi Zalo, email bị vỡ; một file duy nhất nhẹ tênh, nhấp đúp mở trên Chrome, Edge. */
export const ViSaoMotFile: React.FC = () => {
  const { f, p, l } = useT();
  const spill = l(0, 0.2, 24);
  const send = l(1, 0.1, 22);
  const broke = l(1, 0.55, 10);
  const good = l(2, 0, 20);
  const click = l(2, 0.55, 8);
  const scatter: [number, number, number][] = [
    [-280, 30, -20],
    [-160, 70, 14],
    [-40, 40, -8],
    [80, 80, 22],
    [200, 30, -16],
    [300, 70, 10],
  ];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={230} p={p(0, 0.3)} solid color={RED} size={44} o={1 - good} />
      <Tag i={1} x={300} y={560} p={p(1, 0.2)} size={34} o={1 - good} />
      <Tag i={2} x={820} y={430} p={p(1, 0.6)} solid color={RED} size={32} />
      <Tag i={3} x={820} y={1010} p={p(1, 0.75)} solid color={RED} size={32} />
      <Tag i={4} x={230} y={300} p={p(2, 0.15)} solid size={36} />
      <Tag i={5} x={330} y={1010} p={p(2, 0.6)} solid size={34} />
      <Tag i={6} x={330} y={480} p={p(2, 0.8)} size={32} />
    </>}>
      {/* AI xuất ra chùm file lẻ rơi khắp mặt bàn. */}
      <G x={540} y={380} s={p(0, 0) * 0.8} o={1 - good * 0.5}>
        <AI size={140} />
      </G>
      <Box cx={540} cy={860} w={980} h={20} rx={10} fill={HOV} opacity={1 - good} />
      {scatter.map(([x, y, r], k) => {
        const t = clamp01(spill * 1.5 - k * 0.08);
        const sent = k === 2 ? send : 0;
        return (
          <G key={k} x={lerp(540, lerp(540 + x, 820, sent), t)} y={lerp(420, lerp(780 + y * 0.3, 700, sent), t)} r={r * t} s={0.55 * (1 - sent * 0.5)} o={Math.min(1, t * 2) * (1 - good) * (k === 2 ? 1 - broke : 1)}>
            <FileIcon fill={[TXT, GOLDL, PAPER][k % 3]} />
          </G>
        );
      })}
      {/* Qua tin nhắn và thư điện tử tới điện thoại sếp: chữ vỡ ô vuông, mất màu, nứt. */}
      <G x={300} y={700} s={p(1, 0.05) * 0.8} o={1 - good}>
        <Box cx={-70} cy={0} w={120} h={90} rx={24} fill={"#2563EB"} />
        <path d="M-110 40 L-120 70 L-90 45 Z" fill={"#2563EB"} />
        <Box cx={90} cy={0} w={130} h={90} rx={10} fill={TXT} />
        <path d="M25 -45 L90 10 L155 -45" fill="none" stroke={GOLD} strokeWidth={8} strokeLinejoin="round" />
      </G>
      <G x={lerp(820, 860, good)} y={760} s={p(1, 0.4) * lerp(1, 0.8, good)} o={lerp(1, 0.45, good)}>
        <Phone w={300} h={520} screen={"#CFCFCF"}>
          {Array.from({ length: 18 }, (_, k) => (
            <rect key={k} x={-110 + (k % 4) * 58} y={-200 + Math.floor(k / 4) * 70} width={40} height={40} rx={2} fill="none" stroke={SEC} strokeWidth={5} opacity={broke} />
          ))}
          <path d="M-60 -240 L-10 -120 L-50 -40 L20 60 L-10 160 L40 240" fill="none" stroke={INK} strokeWidth={6} opacity={broke} />
        </Phone>
      </G>
      {/* Một file duy nhất nhẹ như lông vũ, nhấp đúp là trình duyệt mở trang đủ màu. */}
      <G x={lerp(230, 330, good)} y={lerp(380, 640, good) + Math.sin(f / 9) * 10 * (1 - click)} s={p(2, 0.05) * (1 - click)} r={Math.sin(f / 11) * 10}>
        <FileIcon fill={GOLD} ink={INK} />
        <path d="M60 -40 Q110 -90 150 -60 Q110 -40 60 -40 Z" fill={GOLDL} opacity={0.8} />
      </G>
      <G x={330} y={790} s={p(2, 0.5)}>
        <Browser w={540} h={400}>
          <G y={40}>
            <Report w={480} h={280} v={click} toc={click} c={click} dim={click > 0.5 ? 0 : 1} />
          </G>
        </Browser>
      </G>
      {/* Vệt bay của file nhẹ tênh và mặt bàn đặt máy của sếp. */}
      <path d="M230 380 Q120 520 330 600" fill="none" stroke={GOLDL} strokeWidth={5} strokeDasharray="6 14" opacity={good * 0.8} />
      <G x={540} y={1110} s={p(2, 0.4)}>
        <Box cx={0} cy={0} w={860} h={24} rx={12} fill={GOLD} />
        <Box cx={-210} cy={-40} w={300} h={40} rx={10} fill={HOV} />
        {Array.from({ length: 10 }, (_, k) => (
          <rect key={k} x={-350 + k * 28} y={-52} width={20} height={10} rx={3} fill={SEC} />
        ))}
        <Box cx={170} cy={-30} w={60} h={40} rx={20} fill={TXT} />
      </G>
      <G x={420} y={820} s={p(2, 0.45) * 0.8}>
        <Cursor />
      </G>
      {[0, 1].map((k) => (
        <circle key={k} cx={420} cy={820} r={20 + click * (40 + k * 30)} fill="none" stroke={GOLD} strokeWidth={6} opacity={click > 0 && click < 1 ? 1 - click : 0} />
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 11 — Chat tiếp bằng tiếng Việt: đổi màu cột sang xám, thêm cột ghi chú, mười giây. */
export const ChatTiepDeSua: React.FC = () => {
  const { f, p, l } = useT();
  const type = l(0, 0.1, 40);
  const ring = l(0, 0.6, 14);
  const timer = l(1, 0, 40);
  const gray = l(1, 0.5, 10);
  const add = l(1, 0.65, 12);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={230} p={p(0, 0.05)} solid size={46} />
      <Tag i={1} x={260} y={1010} p={p(0, 0.3)} size={36} />
      <Tag i={2} x={700} y={1010} p={p(1, 0.15)} solid size={40} />
    </>}>
      {/* Ô chat: câu nhắn tiếng Việt gõ vào. */}
      <G x={260} y={640} s={p(0, 0)}>
        <Box cx={0} cy={0} w={360} h={560} rx={26} fill={EL} stroke={GOLD} strokeWidth={5} />
        <Box cx={20} cy={-120} w={300} h={130} rx={20} fill={GOLD} />
        <Lines x={-110} y={-160} w={260 * type} n={3} gap={30} color={INK} t={12} />
        <Box cx={0} cy={210} w={320} h={60} rx={20} fill={SURF} stroke={HOV} strokeWidth={3} />
        <G x={-30} y={40} s={p(1, 0.6) * 0.8}>
          <Box cx={0} cy={0} w={240} h={80} rx={20} fill={HOV} />
          <Lines x={-90} y={-14} w={180} n={2} gap={26} color={TXT} t={10} />
        </G>
      </G>
      {/* Đồng hồ mười giây. */}
      <G x={260} y={1110} s={p(1, 0) * 0.7}>
        <Clock r={80} hour={0} minute={timer * 60} />
      </G>
      {/* Bảng trên trang HTML: một cột khoanh lại, chuyển xám, cột ghi chú mới trượt vào. */}
      <G x={720} y={640} s={p(0, 0.15)}>
        <Box cx={0} cy={0} w={520} h={600} rx={20} fill={"#FBF8F1"} stroke={GOLD} strokeWidth={5} />
        <rect x={-260} y={-300} width={520} height={44} rx={20} fill={GOLD} />
        {Array.from({ length: 21 }, (_, i) => {
          const r = Math.floor(i / 3);
          const k = i % 3;
          const fill = r === 0 ? INK : k === 1 ? (gray > 0.5 ? "#A3A3A3" : r % 2 ? XL : "#86EFAC") : r % 2 ? PAPER : "#E8E2D4";
          return (
            <G key={i} x={-180 + k * 130 - add * 40} y={-200 + r * 70}>
              <Box cx={0} cy={0} w={118} h={60} rx={8} fill={fill} />
              {r > 0 && <rect x={-40} y={-6} width={70} height={12} rx={6} fill={INK} opacity={0.55} />}
            </G>
          );
        })}
        {Array.from({ length: 7 }, (_, r) => (
          <G key={r} x={170 + (1 - add) * 40} y={-200 + r * 70} o={add}>
            <Box cx={0} cy={0} w={118} h={60} rx={8} fill={r === 0 ? GOLD : GOLDL} />
            {r > 0 && <rect x={-40} y={-6} width={50} height={12} rx={6} fill={INK} opacity={0.5} />}
          </G>
        ))}
        <ellipse cx={-50 - add * 40} cy={10} rx={78} ry={280} fill="none" stroke={RED} strokeWidth={7} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring} opacity={1 - gray * 0.7} />
      </G>
      <Arrow x1={400} y1={520} x2={500} y2={520} p={l(0, 0.4, 12)} />
      <G x={980} y={330} s={p(1, 0.8) * (0.9 + 0.1 * Math.sin(f / 5))}>
        <Spark r={24} fill={GOLDL} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 12 — Mười lăm phút: chọn một tập hồ sơ tuần này; mở app, copy mẫu câu lệnh dưới video, xem trên trình duyệt. */
export const MuoiLamPhut: React.FC = () => {
  const { f, p, l } = useT();
  const run = l(0, 0.05, 120);
  const pick = l(0, 0.55, 14);
  const go = l(1, 0, 16);
  const copy = l(1, 0.35, 30);
  const show = l(1, 0.75, 14);
  const a = run * 0.25 * 2 * Math.PI;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={230} p={p(0, 0.05)} solid size={48} o={1 - go} />
      <Tag i={1} x={540} y={1010} p={p(0, 0.4)} size={36} o={1 - go} />
      <Tag i={2} x={280} y={1010} p={p(1, 0.3)} solid size={38} />
      <Tag i={3} x={280} y={230} p={p(1, 0.1)} size={36} />
    </>}>
      {/* Đồng hồ mười lăm phút, ba tập hồ sơ, lịch tuần. */}
      <G x={540} y={480} s={p(0, 0) * lerp(1, 0.4, go)} o={1 - go}>
        <Clock r={150} hour={0} minute={run * 15} />
        <path d={`M0 0 L0 -150 A150 150 0 0 1 ${Math.sin(a) * 150} ${-Math.cos(a) * 150} Z`} fill={GOLD} opacity={0.35} />
      </G>
      {[0, 1, 2].map((k) => (
        <G key={k} x={280 + k * 260} y={lerp(830, 790, k === 1 ? pick : 0) - (k === 1 ? pick * 40 : 0)} s={p(0, 0.3 + k * 0.08)} o={1 - go}>
          <path d="M-100 -64 H-34 L-14 -40 H100 Q110 -40 110 -30 V70 H-110 V-54 Q-110 -64 -100 -64 Z" fill={[GOLD, XL, "#60A5FA"][k]} />
          <Lines x={-70} y={-6} w={140} n={2} gap={28} color={INK} t={12} />
        </G>
      ))}
      <G x={560} y={lerp(1000, 880, pick)} s={p(0, 0.55) * 0.8} o={1 - go}>
        <path d="M0 0 V-60 Q0 -76 14 -76 Q28 -76 28 -60 V-20 H50 Q64 -20 64 -6 V30 Q64 50 44 50 H10 Q0 50 0 40 Z" fill={GOLDL} stroke={INK} strokeWidth={4} />
      </G>
      <G x={900} y={1100} s={p(0, 0.7) * 0.6} o={1 - go}>
        <Calendar flip={0} />
      </G>
      {/* Khung video, mũi tên xuống bài viết có mẫu câu lệnh. */}
      <G x={300} y={420} s={go}>
        <Box cx={0} cy={0} w={400} h={250} rx={18} fill={EL} stroke={HOV} strokeWidth={4} />
        <path d="M-30 -45 L45 0 L-30 45 Z" fill={GOLD} />
        <rect x={-190} y={100} width={380 * run} height={8} rx={4} fill={GOLD} />
      </G>
      <Arrow x1={300} y1={565} x2={300} y2={650} p={l(1, 0.1, 10)} />
      <G x={300} y={830} s={go}>
        <Box cx={0} cy={-10} w={400} h={270} rx={18} fill={PAPER} />
        <Lines x={-170} y={-120} w={340} n={3} gap={30} color={SEC} t={11} />
        <Box cx={0} cy={60} w={360} h={110} rx={14} fill={GOLD} />
        <Lines x={-150} y={30} w={300} n={3} gap={26} color={INK} t={10} />
      </G>
      {/* Mẫu được kéo lên dán vào ô chat của ứng dụng; trình duyệt bật mở. */}
      <G x={lerp(280, 780, copy)} y={lerp(890, 520, copy)} s={0.5} o={copy > 0 && copy < 1 ? 1 : 0}>
        <Box cx={0} cy={0} w={360} h={110} rx={14} fill={GOLD} />
      </G>
      <G x={770} y={720} s={go * 0.58}>
        <Laptop open={go}>
          <G x={0} y={-180}>
            <Chat w={560} h={330}>
              <Box cx={90} cy={60} w={300} h={90} rx={16} fill={GOLD} opacity={copy > 0.95 ? 1 : 0} />
            </Chat>
          </G>
        </Laptop>
      </G>
      <G x={780} y={1040} s={show * 0.62}>
        <Browser w={500} h={330}>
          <G y={40}>
            <Report w={440} h={220} />
          </G>
        </Browser>
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 13 — Vòng lặp về cảnh đầu: điện thoại của sếp giờ là trang báo cáo gọn; bài tiếp theo; màn kết thương hiệu. */
export const HenBaiSau: React.FC = () => {
  const { f, p, l } = useT();
  const morph = l(0, 0.1, 24);
  const next = l(1, 0, 16);
  const walk = l(1, 0.2, 60);
  const end = l(2, 0, 12);
  const nod = morph > 0.9 ? Math.sin(f / 3) * 5 * (1 - l(0, 0.8, 10)) : 0;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={230} p={p(0, 0.35)} solid size={46} o={1 - next} />
      <Tag i={1} x={220} y={880} p={p(0, 0.65)} size={36} o={1 - next} />
      <Tag i={2} x={540} y={300} p={p(1, 0.1)} solid size={44} />
      <Tag i={3} x={540} y={1000} p={p(1, 0.35)} size={38} />
      {end > 0 && <BrandEnd k={end} />}
    </>}>
      {/* Điện thoại ở cảnh đầu: số lít nhít biến thành trang HTML có ô kết luận. */}
      <G x={540} y={640} s={lerp(1, 0.5, next)} o={1 - next}>
        <Phone w={400} h={720}>
          <g opacity={1 - morph}>
            <Grid cols={15} rows={24} w={360} h={640} fill={"#9A9A9A"} ink={HOV} head={HOV} />
          </g>
          <g opacity={morph}>
            <Report w={360} h={640} />
          </g>
        </Phone>
      </G>
      <G x={870} y={1110 + nod} s={p(0, 0.5)} o={1 - next}>
        <Boss s={1.1} />
      </G>
      <G x={220} y={lerp(1130, 1100, morph)} s={p(0, 0.6)} o={1 - next}>
        <Person fill={GOLDL} s={1.1} />
        <path d="M-16 -64 Q0 -50 16 -64" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      </G>
      {/* Bài sau: chuỗi việc dài nhiều bước, AI đi dọc, giữa chừng có mắt xích nứt. */}
      {Array.from({ length: 7 }, (_, k) => (
        <G key={k} x={120 + k * 140} y={640 + (k % 2 ? -40 : 40)} s={p(1, 0.1 + k * 0.05)}>
          <Box cx={0} cy={0} w={110} h={80} rx={18} fill={k === 3 ? RED : k < 3 ? GOLD : EL} stroke={GOLD} strokeWidth={4} />
          {k === 3 && <path d="M-10 -40 L8 -6 L-6 8 L10 40" fill="none" stroke={INK} strokeWidth={6} />}
          {k < 6 && <line x1={55} y1={0} x2={85} y2={k % 2 ? 80 : -80} stroke={HOV} strokeWidth={6} />}
        </G>
      ))}
      <G x={lerp(120, 540, walk)} y={500} s={p(1, 0.2) * 0.5}>
        <AI size={120} />
      </G>
      <G x={540} y={390} s={p(1, 0.6) * (0.9 + 0.15 * Math.sin(f / 4))}>
        <Question color={RED} s={0.7} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};
