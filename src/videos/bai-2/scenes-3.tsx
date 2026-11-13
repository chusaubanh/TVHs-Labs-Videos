import React from "react";
import { Arrow, Box, BrandEnd, Chat, Clock, Doc, EL, Floor, G, GOLD, GOLDL, Hand, HOV, INK, Lines, Lock, PAPER, Person, RED, SEC, Spark, Stage, Stamp, Tag, TXT, XL, lerp, useT } from "../shared/art";
import { Calendar, Cursor } from "../bai-1/art";
import { Boss } from "../bai-3/art";
import { Bot, clamp01, Envelope, Hat, Loupe, MoneyBag, Patch, Pen, QCard, TimeRail } from "./art";

/** Cảnh 11 — Kỹ thuật 3, Thanh tra độc lập: bản nháp vào khung chat; robot thành thanh tra; hai cặp vai theo phòng ban. */
export const ThanhTraDocLap: React.FC = () => {
  const { f, p, l } = useT();
  const fly = l(1, 0, 20);
  const pair1 = l(2, 0.05, 14);
  const pair2 = l(2, 0.5, 14);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={220} p={p(0, 0.05)} solid size={48} />
      <Tag i={1} x={540} y={760} p={p(0, 0.45)} size={36} o={1 - fly} />
      <Tag i={2} x={760} y={330} p={p(1, 0.45)} solid color={GOLDL} size={36} />
      <Tag i={3} x={190} y={770} p={p(2, 0.05)} size={30} />
      <Tag i={4} x={700} y={770} p={p(2, 0.2)} solid size={30} />
      <Tag i={5} x={190} y={1000} p={p(2, 0.5)} size={30} />
      <Tag i={6} x={700} y={1000} p={p(2, 0.65)} solid size={30} />
    </>}>
      <G x={540} y={1150} s={0.8} o={1 - l(1, 0, 12)}>
        <TimeRail hi={2} />
      </G>
      {/* Bản nháp đầy chữ có vài chỗ gạch, bay vào khung chat. */}
      <G x={lerp(540, 760, fly)} y={lerp(560, 570, fly)} s={lerp(1.5, 0.45, fly) * p(0, 0.1)}>
        <Box cx={0} cy={0} w={260} h={180} rx={12} fill={PAPER} />
        <Lines x={-100} y={-60} w={200} n={5} gap={26} color={SEC} t={9} />
        {[[-40, -34], [30, 18]].map(([x, y], k) => <line key={k} x1={x - 30} y1={y} x2={x + 30} y2={y} stroke={RED} strokeWidth={5} />)}
      </G>
      <G x={740} y={560} s={p(1, 0) * 1.1} o={1 - pair1 * 0.4}>
        <Chat w={420} h={300} />
      </G>
      {/* Robot khoác áo thanh tra, kính, bút đỏ; đổi mũ theo cặp vai. */}
      <G x={260} y={620} s={p(1, 0.25) * 1.15} o={1 - pair1}>
        <Bot arm={0.3}>
          <G y={-70}>
            <Hat kind="thanh-tra" />
          </G>
          <rect x={-60} y={-14} width={50} height={28} rx={10} fill="none" stroke={GOLDL} strokeWidth={5} />
          <rect x={10} y={-14} width={50} height={28} rx={10} fill="none" stroke={GOLDL} strokeWidth={5} />
          <G x={110} y={130} r={20}>
            <rect x={-6} y={-60} width={12} height={90} rx={4} fill={RED} />
          </G>
        </Bot>
      </G>
      {/* Cặp một: máy tính tiền ghép con dấu thuế. Cặp hai: giỏ hàng ghép biểu đồ tài chính. */}
      {[pair1, pair2].map((t, k) => (
        <G key={k} y={k * 230} o={t}>
          <G x={lerp(-100, 190, t)} y={680}>
            <Box cx={0} cy={0} w={200} h={130} rx={18} fill={EL} stroke={GOLD} strokeWidth={4} />
            {k === 0 ? (
              <G s={0.8}>
                <rect x={-40} y={-50} width={80} height={100} rx={10} fill={HOV} />
                <rect x={-30} y={-40} width={60} height={22} rx={4} fill={XL} />
                {Array.from({ length: 6 }, (_, d) => <circle key={d} cx={-20 + (d % 3) * 20} cy={0 + Math.floor(d / 3) * 24} r={7} fill={TXT} />)}
              </G>
            ) : (
              <G s={0.8}>
                <path d="M-50 -30 H-30 L-14 30 H40 L52 -14 H-24" fill="none" stroke={TXT} strokeWidth={8} strokeLinejoin="round" />
                {[-10, 30].map((x) => <circle key={x} cx={x} cy={46} r={9} fill={TXT} />)}
              </G>
            )}
          </G>
          <Arrow x1={310} y1={680} x2={560} y2={680} p={t} color={GOLD} w={7} />
          <G x={lerp(1200, 700, t)} y={680}>
            <Box cx={0} cy={0} w={340} h={130} rx={18} fill={EL} stroke={GOLD} strokeWidth={4} />
            {k === 0 ? (
              <G x={-110} s={0.45}><Stamp r={70} color={GOLD} /></G>
            ) : (
              <G x={-110}>
                {[0, 1, 2].map((b) => <rect key={b} x={-30 + b * 22} y={20 - (b + 1) * 16} width={16} height={(b + 1) * 16} fill={GOLD} />)}
              </G>
            )}
            <G x={110} y={-30} s={0.5}>
              <Hat kind={k === 0 ? "thanh-tra" : "sep"} />
            </G>
          </G>
        </G>
      ))}
      {Array.from({ length: 4 }, (_, k) => (
        <G key={k} x={540} y={600 + k * 110} s={l(2, 0.1 + k * 0.2, 8) * 0.3 * (0.8 + 0.2 * Math.sin(f / 3 + k))}>
          <Spark r={30} fill={GOLDL} />
        </G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 12 — Gõ đúng một câu: kính lúp khoanh hai chỗ mơ hồ và một rủi ro tài chính; vá lại trước khi bấm gửi. */
export const SoiLoiBanNhap: React.FC = () => {
  const { f, p, l } = useT();
  const type = l(0, 0, 30);
  const scan = l(0, 0.35, 50);
  const spots: [number, number, string][] = [[-90, -110, GOLDL], [80, 0, GOLDL], [-40, 120, RED]];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={220} p={p(0, 0.05)} solid size={46} />
      <Tag i={1} x={250} y={600} p={p(0, 0.55)} solid color={GOLDL} size={32} />
      <Tag i={2} x={250} y={800} p={p(0, 0.8)} solid color={RED} size={32} />
      <Tag i={3} x={850} y={1000} p={p(1, 0.35)} solid color={XL} size={40} />
    </>}>
      {/* Khung chat một dòng. */}
      <G x={540} y={360} s={p(0, 0)}>
        <Box cx={0} cy={0} w={860} h={110} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} />
        <rect x={-390} y={-8} width={700 * type} height={16} rx={8} fill={TXT} />
        <circle cx={380} cy={0} r={30} fill={GOLD} />
        <path d="M368 -12 L394 0 L368 12 Z" fill={INK} />
      </G>
      {/* Bản nháp được soi, ba chỗ khoanh, rồi dán miếng vá. */}
      <G x={640} y={770} s={p(0, 0.2)}>
        <Box cx={0} cy={0} w={420} h={480} rx={14} fill={PAPER} opacity={0.85 + 0.15 * l(1, 0.5, 10)} />
        <rect x={-170} y={-210} width={240} height={24} rx={8} fill={INK} />
        <Lines x={-170} y={-160} w={340} n={10} gap={36} color={SEC} t={10} />
        {spots.map(([x, y, c], k) => {
          const seen = clamp01(scan * 3 - k);
          const fix = l(1, 0.1 + k * 0.15, 10);
          return (
            <g key={k}>
              <ellipse cx={x} cy={y} rx={80} ry={36} fill={c === RED ? RED : TXT} opacity={0.35 * seen * (1 - fix)} />
              <ellipse cx={x} cy={y} rx={92} ry={46} fill="none" stroke={c} strokeWidth={7} opacity={seen * (1 - fix)} />
              {k === 2 && <G x={x + 110} y={y} s={seen * 0.45 * (1 - fix)}><MoneyBag /></G>}
              <G x={x} y={y} s={fix}>
                <Patch />
              </G>
            </g>
          );
        })}
        <G x={lerp(-120, 0, scan) + Math.sin(f / 5) * 8} y={lerp(-130, 140, scan)} s={0.9 * (1 - l(1, 0, 10))}>
          <Loupe r={-15} />
        </G>
      </G>
      <path d="M380 600 H470 L550 660" fill="none" stroke={GOLDL} strokeWidth={4} opacity={l(0, 0.6, 8) * (1 - l(1, 0.1, 10))} />
      <path d="M380 800 H520 L600 890" fill="none" stroke={RED} strokeWidth={4} opacity={l(0, 0.85, 8) * (1 - l(1, 0.4, 10))} />
      {/* Con trỏ dừng trên nút gửi đang chờ. */}
      <G x={850} y={1080} s={p(1, 0.5)}>
        <Box cx={0} cy={0} w={200} h={70} rx={35} fill={GOLD} />
        <path d="M-30 -16 L32 0 L-30 16 L-20 0 Z" fill={INK} />
      </G>
      <G x={890} y={1100} s={p(1, 0.6)}>
        <Cursor />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 13 — Mười lăm phút: chọn một văn bản tuần này; cho thanh tra soi trước khi gửi; bài viết và mẫu câu lệnh dưới video. */
export const MuoiLamPhut: React.FC = () => {
  const { f, p, l } = useT();
  const sweep = l(0, 0, 30);
  const pick = l(0, 0.5, 16);
  const into = l(1, 0, 18);
  const scanned = l(1, 0.5, 30);
  const down = l(2, 0, 16);
  const docs = [460, 620, 780];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={250} y={300} p={p(0, 0.05)} solid size={40} />
      <Tag i={1} x={620} y={330} p={p(0, 0.6)} size={34} />
      <Tag i={2} x={540} y={625} p={p(1, 0.3)} solid color={GOLDL} size={36} />
      <Tag i={3} x={620} y={955} p={p(2, 0.25)} solid size={34} />
      <Tag i={4} x={620} y={1022} p={p(2, 0.6)} size={30} />
    </>}>
      {/* Đồng hồ quét một phần tư vòng. */}
      <G x={200} y={480} s={p(0, 0) * 0.85}>
        <circle r={110} fill={EL} stroke={HOV} strokeWidth={6} />
        <path d={`M0 0 L0 -110 A110 110 0 0 1 ${110 * Math.sin(sweep * Math.PI / 2)} ${-110 * Math.cos(sweep * Math.PI / 2)} Z`} fill={GOLD} opacity={0.6} />
        <G s={1.1}><Clock r={80} hour={0} minute={sweep * 15} /></G>
      </G>
      {/* Ba văn bản thẳng hàng: tờ trình, email, văn bản; bàn tay nhấc tờ trình lên. */}
      {docs.map((x, k) => (
        <G key={k} x={x} y={k === 0 ? lerp(480, 450, pick) : 480} s={p(0, 0.3 + k * 0.08) * (k === 0 ? lerp(0.62, 0.7, pick) : 0.62)} o={k === 0 ? 1 - into : 1 - into * 0.7}>
          {k === 1 ? <Envelope s={1.1} /> : <Doc w={150} h={200} n={5} fill={k === 0 ? PAPER : TXT} />}
          {k === 0 && <Box cx={0} cy={0} w={180} h={230} rx={16} fill="none" stroke={GOLD} strokeWidth={8} opacity={pick} />}
        </G>
      ))}
      <G x={480} y={lerp(650, 590, pick)} s={pick * (1 - into) * 0.45}><Hand /></G>
      <G x={930} y={480} s={p(0, 0.7) * 0.5}><Calendar /></G>
      {/* Khung chat giữa khung: tờ trình nằm trong, robot thanh tra quét, nút gửi mở khoá khi soi xong. */}
      <G x={540} y={790} s={into} o={1 - down * 0.75}>
        <Chat w={640} h={260} />
        <G x={-200} y={40} s={0.38}>
          <Bot><G y={-70}><Hat kind="thanh-tra" /></G></Bot>
        </G>
        <G x={40} y={30} s={0.45}><Doc w={150} h={200} n={5} fill={PAPER} /></G>
        <G x={lerp(-10, 90, scanned)} y={lerp(0, 60, scanned)} s={0.42}><Loupe /></G>
        <G x={220} y={90}>
          <Box cx={0} cy={0} w={150} h={54} rx={27} fill={scanned > 0.95 ? GOLD : HOV} />
          <G x={-40} y={-6} s={0.32}><Lock open={scanned > 0.95 ? 1 : 0} /></G>
          <path d="M0 -12 L30 0 L0 12 Z" fill={INK} />
        </G>
      </G>
      {/* Mũi tên chỉ xuống dưới video, tờ hướng dẫn và các thẻ câu lệnh có nút copy. */}
      <Arrow x1={130} y1={900} x2={130} y2={1170} p={down} color={GOLD} w={12} />
      <G x={300} y={lerp(1400, 1100, down)} s={down * 0.6}><Doc w={220} h={260} n={6} fill={PAPER} /></G>
      {Array.from({ length: 4 }, (_, k) => (
        <G key={k} x={470 + k * 140} y={lerp(1400, 1130, clamp01(down * 1.5 - k * 0.12))} s={down * 0.85}>
          <Box cx={0} cy={0} w={130} h={110} rx={14} fill={EL} stroke={GOLD} strokeWidth={4} />
          <Lines x={-48} y={-34} w={96} n={2} gap={20} color={SEC} t={8} />
          <rect x={-48} y={12} width={44} height={28} rx={6} fill={GOLD} />
          <rect x={-40} y={19} width={20} height={14} rx={3} fill="none" stroke={INK} strokeWidth={3} />
          <G x={30} y={28} s={0.25}><Person fill={[GOLDL, XL, TXT, SEC][k]} /></G>
        </G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 14 — Vòng về phòng sếp ở cảnh ba: ba câu hỏi đều có dấu tích, sếp ký duyệt; bình luận; bài tiếp theo; màn kết. */
export const HenBaiSau: React.FC = () => {
  const { f, p, l } = useT();
  const tick = (k: number) => l(0, 0.1 + k * 0.15, 8);
  const sign = l(0, 0.65, 16);
  const next = l(2, 0, 16);
  const end = l(3, 0, 12);
  const nod = sign > 0.5 ? Math.sin(f / 3) * 5 * (1 - next) : 0;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={230} p={p(0, 0.4)} solid color={XL} size={46} o={1 - next} />
      <Tag i={1} x={300} y={830} p={p(1, 0.25)} size={38} o={1 - next} />
      <Tag i={2} x={540} y={230} p={p(2, 0.1)} solid size={46} />
      <Tag i={3} x={540} y={1000} p={p(2, 0.4)} size={38} />
      {end > 0 && <BrandEnd k={end} />}
    </>}>
      {/* Phòng sếp ở cảnh ba: ba ô câu hỏi lần lượt được tích xanh. */}
      <G o={1 - next}>
        {[0, 1, 2].map((k) => (
          <G key={k} x={700} y={400 + k * 190} s={p(0, 0.02 + k * 0.05) * 0.9}>
            <QCard w={520} h={160} done={tick(k)}>
              <Lines x={-200} y={-30} w={330} n={3} gap={30} color={tick(k) > 0.5 ? XL : SEC} t={12} />
            </QCard>
          </G>
        ))}
        <G x={250} y={1100 + nod} s={1.15}>
          <Boss fill={TXT} />
        </G>
        <Box cx={250} cy={1150} w={380} h={36} rx={10} fill={GOLD} />
        <G x={170} y={1070} s={0.6} r={-8}>
          <Doc w={170} h={220} n={5} fill={PAPER} />
          <path d={`M-50 70 Q-30 ${50} -10 70 T${lerp(-10, 50, sign)} 70`} stroke={INK} strokeWidth={6} fill="none" opacity={sign} />
        </G>
        <G x={330} y={1060} s={sign * 0.6} r={-30}>
          <Pen />
        </G>
        <G x={920} y={1110} s={1.05}>
          <Person fill={GOLDL} s={1.05} />
          <path d="M-16 -64 Q0 -50 16 -64" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
        </G>
        {/* Bong bóng bình luận có kính lúp nhỏ và chấm đang gõ. */}
        <G x={300} y={lerp(1300, 700, l(1, 0, 16))} s={p(1, 0) * 0.9}>
          <Box cx={0} cy={0} w={300} h={140} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} />
          <path d="M-100 70 L-120 110 L-60 70 Z" fill={EL} stroke={GOLD} strokeWidth={5} />
          <G x={-80} y={0} s={0.35}><Loupe /></G>
          {[0, 1, 2].map((k) => <circle key={k} cx={20 + k * 40} cy={0} r={12} fill={GOLDL} opacity={0.4 + 0.6 * ((Math.floor(f / 6) + k) % 3 === 0 ? 1 : 0)} />)}
        </G>
      </G>
      {/* Bài tiếp theo: trang báo cáo ô tô màu, cột biểu đồ mọc lên; dòng mã bị gạch chéo. */}
      <G x={540} y={620} s={next * (1 - end)}>
        <Box cx={0} cy={0} w={680} h={520} rx={24} fill={EL} stroke={GOLD} strokeWidth={5} />
        <rect x={-310} y={-230} width={620} height={50} rx={12} fill={HOV} />
        {Array.from({ length: 8 }, (_, k) => (
          <rect key={k} x={-310 + (k % 4) * 155} y={-160 + Math.floor(k / 4) * 80} width={140} height={64} rx={10} fill={[XL, GOLD, "#60A5FA", RED][k % 4]} opacity={l(2, 0.1 + k * 0.04, 8)} />
        ))}
        {Array.from({ length: 6 }, (_, k) => {
          const hgt = [120, 180, 90, 210, 150, 240][k] * l(2, 0.3 + k * 0.05, 14);
          return <rect key={k} x={-280 + k * 100} y={220 - hgt} width={60} height={hgt} rx={8} fill={k % 2 ? GOLD : GOLDL} />;
        })}
      </G>
      <G x={900} y={980} s={next * (1 - end) * 0.8}>
        <Box cx={0} cy={0} w={220} h={60} rx={12} fill={HOV} />
        {[0, 1, 2].map((k) => <rect key={k} x={-90 + k * 64} y={-8} width={44} height={16} rx={6} fill={SEC} />)}
        <path d="M-110 -40 L110 40" stroke={RED} strokeWidth={10} strokeLinecap="round" />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};
