import React from "react";
import { Arrow, Box, BrandEnd, Clock, Doc, EL, Floor, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, Person, RED, SEC, Spark, Stage, SURF, Tag, TXT, XL, lerp, useT } from "../shared/art";
import { Calendar, MarkClaude, MarkGpt, Win } from "../bai-1/art";
import { Bot, Envelope, Head, Loupe, MoneyBag, Wrench } from "../bai-2/art";
import { Contract, Flag, GiftBox, SegNum, Star, Tick } from "../bai-4/art";
import { Chain, clamp01, Dial, Dizzy, Feather, Fruit, IceBlock, LawBook, Medal, NameTag, TaskCard, Target, TimeGrid, Week } from "./art";

/** Kệ ba ô ở đáy khung; n là số hộp đã nằm trên kệ (có thể lẻ để hộp mới bật dần). */
const Shelf: React.FC<{ n: number }> = ({ n }) => (
  <g>
    <rect x={110} y={1168} width={860} height={24} rx={10} fill={GOLD} />
    {[0, 1].map((k) => <rect key={k} x={140 + k * 780} y={1190} width={20} height={40} fill={HOV} />)}
    {[230, 540, 850].map((x, k) => (
      <G key={k} x={x} y={1060} s={clamp01(n - k) * 0.62}>
        <GiftBox />
        <G x={110} y={-70} s={0.5} r={12}><NameTag w={200} /></G>
      </G>
    ))}
  </g>
);

/** Cảnh 11 — Thu mua: email giục thanh toán đúng tông giọng, biểu mẫu; nhân sự hành chính: tóm tắt biên bản họp. */
export const BaPhongBan: React.FC = () => {
  const { f, p, l } = useT();
  const env = p(0, 0.05);
  const dial = l(0, 0.3, 14);
  const pack1 = l(0, 0.78, 12);
  const minutes = p(1, 0.05);
  const split = l(1, 0.3, 16);
  const pack2 = l(1, 0.85, 10);
  const top1 = 1 - l(1, 0, 10);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={232} p={p(0, 0.02)} solid size={44} o={top1} />
      <Tag i={1} x={380} y={660} p={p(0, 0.15)} solid size={34} o={top1} />
      <Tag i={2} x={780} y={340} p={p(0, 0.2)} size={32} o={top1} />
      <Tag i={3} x={540} y={232} p={p(1, 0.02)} solid size={44} />
      <Tag i={4} x={230} y={760} p={p(1, 0.12)} size={32} />
      <Tag i={5} x={450} y={780} p={p(1, 0.4)} solid color={XL} size={30} />
      <Tag i={6} x={650} y={840} p={p(1, 0.5)} solid size={30} />
      <Tag i={7} x={860} y={780} p={p(1, 0.6)} solid size={30} />
    </>}>
      <Shelf n={1 + pack1 + pack2} />
      {/* Thu mua: phong bì giục thanh toán, núm tông giọng, mẫu biểu công ty. */}
      <G o={top1}>
        <G x={380} y={500} s={env * 2}><Envelope /></G>
        <G x={500} y={420} s={env * 0.6}><Clock r={80} hour={(f / 20) % 12} minute={(f * 4) % 60} /></G>
        <G x={260} y={410} s={env * 0.7}><MoneyBag /></G>
        <G x={780} y={460} s={l(0, 0.08, 10)}><Dial a={lerp(-70, 30, dial)} /></G>
        <G x={780} y={680} s={l(0, 0.16, 10)}>
          <Box cx={0} cy={0} w={240} h={200} rx={14} fill={PAPER} stroke={GOLD} strokeWidth={5} />
          <rect x={-100} y={-82} width={200} height={34} rx={8} fill={GOLD} />
          <Lines x={-96} y={-26} w={190} n={4} gap={28} color={SEC} t={9} />
        </G>
        <Arrow x1={540} y1={800} x2={540} y2={960} p={pack1} w={8} />
      </G>
      {/* Nhân sự, hành chính: biên bản họp tách thành ba cột. */}
      <G x={230} y={560} s={minutes * 1.1}>
        <Doc w={200} h={280} n={6} fill={PAPER} />
        <rect x={-80} y={-130} width={160} height={24} rx={8} fill={HOV} />
      </G>
      {[0, 1, 2].map((k) => {
        const x = 450 + k * 205;
        return (
          <G key={k} x={lerp(230, x, split)} y={560} s={split}>
            <Box cx={0} cy={0} w={180} h={300} rx={16} fill={EL} stroke={k === 0 ? XL : GOLD} strokeWidth={5} />
            <G y={-80} s={0.9}>
              {k === 0 && <Tick r={42} />}
              {k === 1 && <><Box cx={0} cy={0} w={70} h={70} rx={10} fill="none" stroke={GOLDL} strokeWidth={7} /><path d="M-18 0 L-4 14 L22 -16" fill="none" stroke={GOLDL} strokeWidth={8} strokeLinecap="round" opacity={(Math.floor(f / 15) % 2)} /></>}
              {k === 2 && <G y={30} s={0.8}><Person fill={GOLDL} /></G>}
            </G>
            <Lines x={-60} y={10} w={120} n={4} gap={30} color={SEC} t={9} />
          </G>
        );
      })}
      <Arrow x1={540} y1={880} x2={820} y2={980} p={pack2} w={8} />
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 12 — Nguyên tắc vàng: chạy tay cho chín rồi hẵng gói; hai ba lần; gói vội là đóng băng quy trình dở. */
export const ChayTay: React.FC = () => {
  const { f, at, p, l } = useT();
  const runs = l(1, 0.05, 50) * 3;
  const into = l(1, 0.85, 12);
  const ice = l(2, 0.3, 14);
  const tf = Math.max(0, f - at(2, 0.5));
  const fixes = at(2, 0.5) <= f ? 1 + Math.floor(tf / 18) : 0;
  const hit = (tf % 18) / 18;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={232} p={p(0, 0.02)} solid size={46} />
      <Tag i={1} x={540} y={710} p={p(0, 0.35)} size={38} o={1 - l(1, 0, 8)} />
      <Tag i={2} x={540} y={710} p={p(1, 0.1)} solid color={XL} size={38} />
      <Tag i={3} x={210} y={810} p={p(2, 0.05)} solid color={RED} size={34} />
      <Tag i={4} x={470} y={985} p={p(2, 0.35)} size={32} />
      <Tag i={5} x={850} y={830} p={p(2, 0.7)} solid color={RED} size={32} />
    </>}>
      {[[150, 232], [930, 232]].map(([x, y], k) => <G key={k} x={x} y={y} s={p(0, 0.1) * 0.5}><Star r={40} /></G>)}
      {/* Cành cây với trái chín dần qua ba lượt làm tay. */}
      <path d="M100 400 Q540 360 980 410" fill="none" stroke="#78350F" strokeWidth={16} strokeLinecap="round" opacity={p(0, 0.1)} />
      {[0, 1, 2].map((k) => {
        const x = 200 + k * 220;
        const ripe = clamp01(runs - k) * ((k + 1) / 3);
        const mv = k === 2 ? into : 0;
        return (
          <g key={k}>
            <G x={lerp(x, 860, mv)} y={lerp(530, 560, mv)} s={(k === 0 ? p(0, 0.04) : clamp01(runs - k + 0.6)) * lerp(1.1, 0.5, mv)}>
              <Fruit ripe={k === 0 && runs < 0.05 ? 0 : ripe} />
            </G>
            <G x={x} y={640} s={clamp01((runs - k) * 2) * 0.7}><Tick r={34} /></G>
          </g>
        );
      })}
      <G x={860} y={570} s={Math.max(p(0, 0.5) * 0.5, l(1, 0.6, 10)) * 0.62}><GiftBox lid={1 - into} /></G>
      <line x1={110} x2={970} y1={770} y2={770} stroke={HOV} strokeWidth={4} strokeDasharray="16 14" opacity={p(2, 0)} />
      {/* Gói vội: quy trình dở bị đóng băng, lần nào gọi ra cũng phải sửa. */}
      <G x={470} y={950} s={p(2, 0.05) * 1.1}><Chain n={5} broken={2} /></G>
      <G x={470} y={950}><IceBlock w={680} h={240} p={ice} /></G>
      <G x={560} y={830} s={fixes > 0 ? 0.95 : 0} r={lerp(10, 45, hit)}><Wrench /></G>
      <G x={760} y={1150} s={l(2, 0.5, 8) * 0.6}><SegNum value={Math.min(fixes, 9)} n={1} color={RED} /></G>
      <G x={890} y={960} s={l(2, 0.55, 8) * 0.36}><g transform="scale(-1 1)"><Head fill={SURF} frown={0.8} /></g></G>
      <path d={`M${850} ${930 + hit * 40} q10 22 0 30 q-10 -8 0 -30 Z`} fill="#7DD3FC" opacity={fixes > 0 ? 1 - hit : 0} />
      <G x={200} y={1130} s={p(2, 0.1) * 0.5}><GiftBox lid={0.4} /></G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 13 — Mười lăm phút; chọn việc tuần này tuần sau phải làm lại; mở app, copy mẫu câu lệnh, đặt tên dễ nhớ. */
export const HomNay: React.FC = () => {
  const { f, p, l } = useT();
  const sweep = l(0, 0.05, 24);
  const small = l(1, 0, 14);
  const move = l(1, 0.45, 18);
  const app = l(2, 0, 12);
  const copy = l(2, 0.4, 18);
  const name = l(2, 0.75, 16);
  const big = 1 - small;
  const a = (sweep * 90 * Math.PI) / 180;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={232} p={p(0, 0.02)} solid size={50} />
      <Tag i={1} x={560} y={350} p={p(1, 0.1)} size={32} o={1 - app} />
      <Tag i={2} x={560} y={790} p={p(1, 0.5)} solid size={34} o={1 - app} />
      <Tag i={3} x={330} y={520} p={p(2, 0.05)} size={30} />
      <Tag i={4} x={380} y={620} p={p(2, 0.12)} size={30} />
      <Tag i={5} x={540} y={935} p={p(2, 0.35)} solid size={32} />
      <Tag i={6} x={780} y={660} p={p(2, 0.78)} solid size={32} />
    </>}>
      {/* Đồng hồ quét đúng một phần tư vòng, rồi thu về góc. */}
      <G x={lerp(540, 170, small)} y={lerp(650, 330, small)} s={p(0, 0) * lerp(2.6, 0.75, small)}>
        <Clock r={80} hour={0} minute={sweep * 15} />
        <path d={`M0 0 L0 -72 A72 72 0 0 1 ${Math.sin(a) * 72} ${-Math.cos(a) * 72} Z`} fill={GOLD} opacity={0.55} />
      </G>
      {/* Tuần này và tuần sau: thẻ việc chuyển sang đúng ô tuần sau. */}
      <G o={1 - app}>
        <G x={560} y={470} s={clamp01(small * 2)}><Week w={760} hl={2} fill={GOLDL} /></G>
        <G x={560} y={690} s={clamp01(small * 2 - 0.4)}><Week w={760} hl={9} /></G>
        <G x={456} y={lerp(480, 700, move)} s={clamp01(small * 2 - 0.6) * 0.62}><TaskCard w={140} /></G>
        <path d="M520 530 Q620 590 500 650" fill="none" stroke={GOLD} strokeWidth={8} strokeDasharray="14 10" opacity={move} />
      </G>
      {/* Mở app, copy mẫu câu lệnh ở bài viết bên dưới, đặt tên dễ nhớ. */}
      <G x={540} y={630} s={app}>
        <Win w={860} h={460} stroke={GOLD}>
          <Box cx={0} cy={170} w={800} h={60} rx={30} fill={SURF} stroke={copy > 0.9 ? GOLD : HOV} strokeWidth={4} />
          <rect x={-380} y={163} width={lerp(0, 380, clamp01(copy * 1.2 - 0.2))} height={14} rx={7} fill={GOLDL} opacity={0.8} />
        </Win>
      </G>
      <G x={220} y={520} s={app}><MarkGpt r={36} /></G>
      <G x={220} y={620} s={app}><MarkClaude r={36} /></G>
      <G x={780} y={560} s={app * 0.9}><NameTag w={260} fill={name > 0.5 ? GOLDL : SEC} /></G>
      <rect x={700} y={552} width={lerp(0, 160, name)} height={14} rx={7} fill={INK} opacity={0.8} />
      {/* Bài viết bên dưới video và thẻ mẫu câu lệnh có nút copy. */}
      <G x={540} y={1090} s={app}>
        <Box cx={0} cy={0} w={800} h={200} rx={20} fill={PAPER} />
        <Lines x={-360} y={-60} w={300} n={4} gap={34} color={SEC} t={10} />
        <Box cx={190} cy={0} w={340} h={130} rx={16} fill={EL} stroke={GOLD} strokeWidth={4} />
      </G>
      <G x={lerp(730, 420, copy)} y={lerp(1090, 800, copy)} s={app * lerp(1, 0.5, copy)} o={1 - clamp01(copy * 2 - 1.4)}>
        <Box cx={0} cy={0} w={300} h={110} rx={14} fill={EL} stroke={GOLD} strokeWidth={4} />
        <Lines x={-120} y={-24} w={160} n={2} gap={28} color={GOLDL} t={9} />
        <rect x={86} y={-30} width={36} height={44} rx={6} fill="none" stroke={GOLDL} strokeWidth={5} />
        <rect x={96} y={-20} width={36} height={44} rx={6} fill={GOLD} />
      </G>
      <Arrow x1={540} y1={980} x2={540} y2={890} p={l(2, 0.3, 10)} w={8} />
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 14 — Ngày mai chỉ gõ cái tên: quay về buổi sáng ở cảnh đầu; bài tiếp theo: tập hợp đồng dày cộm; màn kết. */
export const HenBaiSau: React.FC = () => {
  const { f, p, l } = useT();
  const auto = l(0, 0.25, 40) * 3;
  const next = l(1, 0.05, 14);
  const fly = l(1, 0.35, 30);
  const end = l(2, 0, 12);
  const rows = [470, 620, 770];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={232} p={p(0, 0.02)} solid size={46} o={1 - next} />
      <Tag i={1} x={540} y={948} p={p(0, 0.5)} solid color={XL} size={36} o={1 - next} />
      <Tag i={2} x={540} y={232} p={p(1, 0.05)} solid size={46} />
      <Tag i={3} x={300} y={330} p={p(1, 0.15)} size={32} />
      <Tag i={4} x={770} y={390} p={p(1, 0.3)} size={32} />
      <Tag i={5} x={830} y={900} p={p(1, 0.75)} solid color={XL} size={36} />
      {end > 0 && <BrandEnd k={end} />}
    </>}>
      {/* Cảnh đầu lặp lại, nhưng chỉ gõ đúng cái tên, ba bước tự chạy. */}
      <G o={1 - next}>
        <G x={540} y={600}>
          <Win w={860} h={560} stroke={GOLD}>
            <Box cx={0} cy={245} w={800} h={50} rx={25} fill={SURF} stroke={GOLD} strokeWidth={3} />
          </Win>
        </G>
        <G x={260} y={845} s={0.5}><NameTag w={260} string={false} /></G>
        {rows.map((y, k) => (
          <g key={k}>
            <Box cx={480} cy={y} w={360} h={74} rx={22} fill={GOLD} opacity={0.4 + 0.6 * clamp01(auto - k)} />
            <G x={700} y={y} s={clamp01((auto - k) * 2) * 0.7}><Tick r={34} /></G>
          </g>
        ))}
        <G x={225} y={rows[0]} s={0.48}><Calendar /></G>
        <G x={225} y={rows[1]} s={0.85}><Target /></G>
        <G x={225} y={rows[2]} s={0.75}><TaskCard w={190} /></G>
        <G x={840} y={680} s={0.9}><TimeGrid w={230} h={300} rows={4} /></G>
        {[0, 1, 2].map((k) => <G key={k} x={840} y={590 + k * 80} s={clamp01(auto - k) * 0.75}><TaskCard w={190} /></G>)}
        <G x={350} y={985} s={0.55}><circle r={60} fill={GOLDL} />{Array.from({ length: 8 }, (_, k) => <line key={k} y1={-74} y2={-100} stroke={GOLDL} strokeWidth={9} strokeLinecap="round" transform={`rotate(${k * 45})`} />)}</G>
        <G x={190} y={1080} s={0.82}><Calendar flip={l(0, 0.05, 14)} /></G>
        <G x={830} y={1010} s={0.72}>
          <Bot arm={0.6 + 0.4 * Math.sin(f / 6)} />
          <G y={150} s={0.8}><Medal /></G>
        </G>
        <G x={560} y={1120} s={0.42} r={-12}><Head fill={SURF} /></G>
        <G x={lerp(980, 120, (f % 120) / 120)} y={420 + Math.sin(f / 10) * 30} s={l(0, 0.6, 10) * 0.5} r={Math.sin(f / 8) * 30}><Feather /></G>
      </G>
      {/* Bài sau: chồng hợp đồng dày cộm và văn bản pháp luật bay về phía robot hoa mắt. */}
      <G o={next * (1 - end)}>
        <G x={lerp(300, 360, fly)} y={lerp(600, 680, fly)} s={next * lerp(1.15, 0.9, fly)} r={lerp(0, -6, fly)}><Contract n={14} /></G>
        <G x={lerp(770, 720, fly)} y={lerp(600, 680, fly)} s={next * lerp(1.15, 0.95, fly)} r={lerp(0, 8, fly)}><LawBook /></G>
        <G x={540} y={1010} s={0.8}>
          <Bot arm={0.4 + fly} />
          <G s={fly}>
            {[-30, 30].map((x) => <G key={x} x={x} y={0}><circle r={16} fill={INK} /><Dizzy r={18} t={f} /></G>)}
          </G>
        </G>
        <G x={lerp(300, 780, 0.5 + 0.5 * Math.sin(f / 14))} y={lerp(560, 600, fly)} s={next * 0.7} r={-20}><Loupe /></G>
        {[[200, 1000], [880, 1000], [900, 470], [180, 450]].map(([x, y], k) => (
          <G key={k} x={x} y={y} s={next * (0.4 + 0.25 * Math.sin(f / 5 + k))}><Spark r={22} fill={GOLDL} /></G>
        ))}
      </G>
      <Floor y={1240} />
    </Stage>
  );
};
