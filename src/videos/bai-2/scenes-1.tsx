import React from "react";
import { AI, Arrow, Box, Chat, Clock, Desk, Doc, EL, Floor, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, Person, Question, RED, SEC, Spark, Stage, Stamp, SURF, Tag, TXT, XL, lerp, useT } from "../shared/art";
import { Cursor } from "../bai-1/art";
import { Boss } from "../bai-3/art";
import { Bot, Bug, clamp01, Crate, Drawer, Envelope, Head, ICE, MapSheet, MoneyBag, QCard, Wrench } from "./art";

/** Cảnh 1 — Hook: robot sửa con bọ lỗi không được; lùi ra thấy con bọ nằm trong đầu người, sau lớp kính. */
export const LoiTrongDau: React.FC = () => {
  const { f, p, l } = useT();
  const out = l(1, 0, 18);
  const sad = l(2, 0, 12);
  const hit = Math.sin(f * 0.9) * (1 - sad);
  const blink = 0.5 + 0.5 * (Math.floor(f / 5) % 2);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={230} p={p(0, 0.05)} solid color={RED} size={58} />
      <Tag i={1} x={540} y={330} p={p(1, 0.4)} solid size={44} />
      <Tag i={2} x={860} y={1010} p={p(2, 0.2)} size={40} />
    </>}>
      {/* Đầu người hiện dần quanh con bọ; lớp kính tròn bao ngoài. */}
      <G x={620} y={720} s={lerp(2.6, 1.35, out)} o={out}>
        <Head fill={SURF} frown={sad} blush={sad} />
      </G>
      <circle cx={630} cy={700} r={lerp(520, 330, out)} fill="none" stroke={TXT} strokeWidth={4} strokeDasharray="18 14" opacity={0.35 * out} />
      {/* Con bọ: to giữa khung, rồi thu vào vùng não. */}
      <G x={lerp(540, 593, out)} y={lerp(680, 612, out)} s={lerp(1.6, 0.62, out) * p(0, 0)} r={Math.sin(f * 0.6) * 4}>
        <Bug blink={blink} />
      </G>
      {/* Robot gõ cờ lê liên tục; khi lùi ra thì cờ lê chỉ chạm lớp kính. */}
      <G x={lerp(250, 200, out)} y={860} s={p(0, 0.1) * 0.85}>
        <Bot arm={sad} />
        <G x={110} y={60} r={lerp(-55 + hit * 30, 35, sad)}>
          <Wrench s={0.9} bend={l(0, 0.6, 10)} />
        </G>
      </G>
      {Array.from({ length: 8 }, (_, k) => {
        const t = ((f + k * 4) % 20) / 20;
        return (
          <G key={k} x={lerp(400, 310, out) + Math.cos(k * 0.8) * 80 * t} y={lerp(700, 720, out) - Math.sin(k * 0.8 + 0.5) * 80 * t} s={(1 - t) * (1 - sad) * p(0, 0.2)}>
            <Spark r={16} fill={k % 2 ? GOLD : GOLDL} />
          </G>
        );
      })}
      <G x={200} y={600} s={p(2, 0.3) * 0.5}>
        <Question color={GOLDL} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 2 — Tưởng tượng: AI soạn tờ trình gãy gọn; đọc lướt, bấm gửi, tờ trình bay vào phòng sếp. */
export const ToTrinhAiViet: React.FC = () => {
  const { f, p, l } = useT();
  const frame = l(0, 0, 18);
  const show = l(1, 0, 14);
  const fill = l(2, 0, 50);
  const skim = l(3, 0, 24);
  const send = l(3, 0.45, 22);
  const rows = Math.round(lerp(0, 8, fill));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={600} p={p(0, 0.1)} solid color={GOLDL} size={40} o={1 - show} />
      <Tag i={1} x={700} y={250} p={p(1, 0.05)} solid size={42} />
      <Tag i={2} x={330} y={300} p={p(1, 0.35)} size={32} />
      <Tag i={3} x={330} y={720} p={p(1, 0.7)} size={32} />
      <Tag i={4} x={700} y={740} p={p(2, 0.3)} solid size={36} o={1 - send} />
      <Tag i={5} x={850} y={990} p={p(3, 0.25)} solid color={GOLDL} size={34} />
    </>}>
      {/* Khung tưởng tượng viền đứt bao quanh góc làm việc, tan khi tình huống bắt đầu. */}
      <G o={frame * (1 - show)}>
        <Box cx={540} cy={920} w={lerp(700, 860, frame)} h={lerp(480, 600, frame)} rx={60} fill="none" stroke={GOLDL} strokeWidth={5} strokeDasharray="20 16" />
        {[[130, 640], [950, 640], [130, 1200], [950, 1200]].map(([x, y], k) => (
          <G key={k} x={x} y={y} s={0.6 + 0.2 * Math.sin(f / 5 + k)}><Spark r={26} fill={GOLDL} /></G>
        ))}
      </G>
      {/* Góc làm việc ở giữa khung: màn hình là khung chat với AI. */}
      <G x={540} y={1040} s={0.76 * p(0, 0.05)}>
        <Desk nod={Math.sin(f / 5) * 3 * skim * (1 - send)}>
          <G x={0} y={-150}>
            <Chat w={480} h={300} lit={fill > 0.1}>
              <G x={40} y={-10} s={0.5}><AI size={120} /></G>
              <Lines x={-50} y={60} w={180} n={rows > 0 ? 3 : 1} gap={22} color={GOLDL} t={8} />
            </Chat>
          </G>
        </Desk>
      </G>
      {/* Hai thứ đề xuất: ngân sách, thiết bị; mũi tên nối vào tờ trình. */}
      <G x={330} y={420} s={p(1, 0.3) * 0.85}><MoneyBag /></G>
      <G x={330} y={610} s={p(1, 0.6) * 0.62}><Crate /></G>
      <Arrow x1={410} y1={420} x2={535} y2={420} p={l(1, 0.45, 10) * (1 - send)} w={6} />
      <Arrow x1={410} y1={610} x2={535} y2={610} p={l(1, 0.75, 10) * (1 - send)} w={6} />
      {/* Tờ trình: khung mờ, rồi AI điền đầy từng dòng. */}
      <G x={700} y={500} s={p(1, 0.1)} o={1 - send}>
        <Box cx={0} cy={0} w={300} h={380} rx={14} fill={PAPER} />
        <rect x={-120} y={-160} width={240} height={22} rx={8} fill={fill > 0.02 ? INK : HOV} />
        {Array.from({ length: 8 }, (_, k) => (
          <rect key={k} x={-120 + (k % 3 === 0 ? 0 : 20)} y={-110 + k * 34} width={k % 3 === 0 ? 180 : 200 - (k % 2) * 40} height={k % 3 === 0 ? 14 : 10} rx={5} fill={k < rows ? (k % 3 === 0 ? INK : SEC) : HOV} opacity={k < rows ? 1 : 0.35} />
        ))}
        {[0, 1].map((k) => (
          <Arrow key={k} x1={118} y1={-90 + k * 100} x2={118} y2={-30 + k * 100} p={l(2, 0.3 + k * 0.2, 10)} color={GOLD} w={6} />
        ))}
        <G x={118} y={-150} s={l(2, 0.8, 8) * (0.8 + 0.2 * Math.sin(f / 3))}><Spark r={24} fill={GOLD} /></G>
      </G>
      {/* Cửa phòng sếp hiện đúng chỗ tờ trình; phong bì bay từ nút gửi vào khe cửa. */}
      <G x={700} y={500} s={lerp(0.9, 1, send)} o={send}>
        <Box cx={0} cy={0} w={240} h={380} rx={12} fill={EL} stroke={GOLD} strokeWidth={6} />
        <Box cx={0} cy={-90} w={150} h={120} rx={8} fill={SURF} stroke={HOV} strokeWidth={4} />
        <G y={-70} s={0.55}><Boss fill={SEC} /></G>
        <circle cx={84} cy={30} r={14} fill={GOLD} />
        <rect x={-60} y={80} width={120} height={28} rx={6} fill={GOLD} />
      </G>
      <G x={lerp(850, 700, send)} y={lerp(880, 650, send)} s={0.55 * send} r={(1 - send) * 20}><Envelope /></G>
      {/* Mắt lướt nhanh, con trỏ bấm nút gửi bên phải màn hình. */}
      <G x={540} y={760} s={skim * (1 - send)}>
        {[0, 1].map((k) => <ellipse key={k} cx={-26 + k * 52} cy={0} rx={20} ry={13} fill={TXT} />)}
        {[0, 1].map((k) => <circle key={k} cx={-26 + k * 52 + Math.sin(f / 2) * 7} cy={0} r={6} fill={INK} />)}
      </G>
      <G x={850} y={890} s={p(3, 0.1)}>
        <Box cx={0} cy={0} w={150} h={60} rx={30} fill={send > 0.05 ? GOLDL : GOLD} />
        <path d="M-28 -14 L30 0 L-28 14 L-18 0 Z" fill={INK} />
      </G>
      <G x={lerp(920, 870, l(3, 0.2, 10))} y={lerp(970, 905, l(3, 0.2, 10))} s={p(3, 0.15)}><Cursor /></G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 3 — Năm phút sau, sếp gọi vào và hỏi đúng ba câu. */
export const SepHoiBaCau: React.FC = () => {
  const { f, p, l } = useT();
  const ring = (1 - l(0, 0.5, 8)) * Math.sin(f * 2.4) * 6;
  const walk = l(0, 0.3, 24);
  const cards = [400, 590, 780];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={600} y={225} p={p(0, 0.05)} solid size={42} />
      <Tag i={1} x={400} y={cards[0] - 82} p={p(1, 0.25)} solid color={GOLDL} size={30} />
      <Tag i={2} x={720} y={cards[0] - 82} p={p(1, 0.6)} solid color={GOLDL} size={30} />
      <Tag i={3} x={540} y={cards[1] - 82} p={p(2, 0.35)} solid color={GOLDL} size={30} />
      <Tag i={4} x={540} y={cards[2] - 82} p={p(3, 0.45)} solid color={GOLDL} size={30} />
    </>}>
      {/* Đồng hồ nhảy năm vạch cạnh nhãn. */}
      <G x={340} y={225} s={p(0, 0) * 0.55}>
        <Clock r={80} hour={9} minute={lerp(0, 5, l(0, 0, 20))} />
      </G>
      {/* Ba ô chờ viền đứt: sếp sắp hỏi đúng ba câu. */}
      {cards.map((y, k) => (
        <Box key={k} cx={540} cy={y} w={640} h={150} rx={20} fill="none" stroke={HOV} strokeWidth={4} strokeDasharray="16 12" opacity={l(0, 0.4 + k * 0.1, 10) * (1 - p(k + 1, 0))} />
      ))}
      {/* Ba ô câu hỏi xếp thẳng giữa khung. */}
      <G x={540} y={cards[0]} s={p(1, 0)}>
        <QCard w={640} h={150}>
          <G x={-200} y={10} s={0.6}><MoneyBag /></G>
          <G x={160} y={10} s={0.48}>
            <Box cx={0} cy={0} w={160} h={150} rx={14} fill={TXT} />
            <rect x={-80} y={-75} width={160} height={36} rx={14} fill={RED} />
            {Array.from({ length: 9 }, (_, k) => <rect key={k} x={-60 + (k % 3) * 44} y={-26 + Math.floor(k / 3) * 32} width={30} height={22} rx={4} fill={HOV} />)}
            <circle cx={0} cy={6} r={64} fill="none" stroke={RED} strokeWidth={8} strokeDasharray="20 12" />
          </G>
        </QCard>
      </G>
      <G x={540} y={cards[1]} s={p(2, 0)}>
        <QCard w={640} h={150}>
          {[0, 1, 2].map((k) => (
            <G key={k} x={-120 + k * 120} y={10}>
              <Box cx={0} cy={0} w={86} h={104} rx={10} fill={k === 0 ? PAPER : "none"} stroke={k === 0 ? GOLD : HOV} strokeWidth={4} strokeDasharray={k === 0 ? undefined : "10 8"} />
              {k === 0 && <Lines x={-28} y={-30} w={56} n={4} gap={18} color={SEC} t={7} />}
            </G>
          ))}
        </QCard>
      </G>
      <G x={540} y={cards[2]} s={p(3, 0)}>
        <QCard w={640} h={150}>
          <G x={-210} y={10} s={0.45}>
            <Doc w={140} h={200} n={5} fill={PAPER} />
            <path d="M-40 70 Q-20 50 0 70 T40 70" stroke={INK} strokeWidth={5} fill="none" />
          </G>
          <G x={-60} y={10}>
            <Box cx={0} cy={0} w={110} h={96} rx={10} fill={TXT} />
            <rect x={-55} y={-48} width={110} height={22} rx={10} fill={GOLD} />
            {Array.from({ length: 15 }, (_, k) => <rect key={k} x={-46 + (k % 5) * 19} y={-16 + Math.floor(k / 5) * 20} width={13} height={13} rx={2} fill={HOV} />)}
          </G>
          <G x={50} y={10} s={0.3}><Question color={RED} /></G>
          <G x={170} y={10}>
            <path d="M-50 0 H30 M10 -20 L34 0 L10 20" stroke={XL} strokeWidth={10} fill="none" strokeLinecap="round" />
          </G>
        </QCard>
      </G>
      {/* Phòng sếp: bàn có điện thoại rung, nhân viên bước vào đứng đối diện. */}
      <G x={330} y={1110} s={p(0, 0.2) * 1.1}><Boss fill={TXT} /></G>
      <Box cx={330} cy={1160} w={380} h={34} rx={10} fill={GOLD} opacity={p(0, 0.2)} />
      <G x={250} y={1085} s={p(0, 0.3) * 0.5} r={-8}><Doc w={170} h={220} n={5} fill={PAPER} /></G>
      <G x={470 + ring} y={1120} s={p(0, 0.15) * 0.45}>
        <path d="M-70 -30 Q-70 -70 0 -70 Q70 -70 70 -30 L50 -20 L30 -40 L-30 -40 L-50 -20 Z" fill={GOLD} />
        <Box cx={0} cy={0} w={140} h={70} rx={18} fill={HOV} />
        {[0, 1, 2].map((k) => <circle key={k} cx={-30 + k * 30} cy={6} r={8} fill={TXT} />)}
      </G>
      <G x={lerp(1080, 780, walk)} y={1120} s={p(0, 0.3)}><Person fill={SEC} s={1.05} /></G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 4 — Đứng hình; AI làm đúng y chang; thủ phạm là ngăn quy định ngầm trong đầu. */
export const DungHinhThuPham: React.FC = () => {
  const { f, p, l } = useT();
  const freeze = l(0, 0, 10);
  const side = l(1, 0, 16);
  const flow = l(1, 0.2, 40);
  const drawer = l(2, 0.15, 20);
  const spot = l(2, 0.5, 14);
  const px = lerp(540, 300, side);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={px} y={230} p={p(0, 0.1)} solid color={ICE} size={44} />
      <Tag i={1} x={760} y={230} p={p(1, 0.05)} size={40} />
      <Tag i={2} x={760} y={660} p={p(1, 0.7)} solid color={XL} size={34} />
      <Tag i={3} x={250} y={980} p={p(2, 0.3)} solid size={34} />
      <Tag i={4} x={860} y={980} p={p(2, 0.75)} size={32} />
    </>}>
      {/* Nhân viên đóng băng giữa khung, ba câu hỏi vây quanh; rồi lùi sang trái. */}
      <G x={px} y={480} s={lerp(1.35, 1, side)}>
        <Person fill={freeze > 0.5 ? "#BAE6FD" : SEC} s={1.3} />
        <rect x={-110} y={-150} width={220} height={230} rx={40} fill={ICE} opacity={0.22 * freeze} stroke={ICE} strokeWidth={4} />
        {Array.from({ length: 6 }, (_, k) => (
          <path key={k} d={`M${-100 + k * 40} -150 l10 ${20 + (k % 3) * 10} l10 ${-20 - (k % 3) * 10}`} fill={ICE} opacity={freeze} />
        ))}
        {[0, 1, 2].map((k) => (
          <G key={k} x={Math.cos(k * 2.1 + f / 20) * 170} y={-40 + Math.sin(k * 2.1 + f / 20) * 140} s={p(0, 0.2 + k * 0.1) * 0.22 * (1 - side * 0.4)}>
            <QCard w={300} h={150} />
          </G>
        ))}
      </G>
      {/* Khung chat cùng hàng: đầu vào qua phễu, tờ trình ra khớp từng dòng. */}
      <G x={760} y={450} s={p(1, 0)}>
        <Chat w={420} h={300}>
          <G x={40} y={-40} s={0.4}><AI size={120} /></G>
        </Chat>
        <path d="M-60 0 H100 L40 70 V100 H0 V70 Z" fill={HOV} stroke={GOLD} strokeWidth={4} />
        {Array.from({ length: 4 }, (_, k) => {
          const t = clamp01(flow * 4 - k);
          return <rect key={k} x={lerp(-150, 0, t)} y={lerp(-60, 30, t) + k * 4} width={60} height={10} rx={5} fill={GOLDL} opacity={t > 0 && t < 1 ? 1 : 0.2} />;
        })}
        <G x={140} y={70}>
          <Box cx={0} cy={0} w={110} h={130} rx={10} fill={PAPER} />
          <Lines x={-40} y={-46} w={80} n={Math.round(lerp(0, 4, flow))} gap={24} color={SEC} t={8} />
        </G>
        <G x={170} y={-110} s={l(1, 0.75, 10)}><Stamp r={30} color={XL} /></G>
      </G>
      {/* Đầu người dưới giữa khung: ngăn kéo quy định có khoá, đèn rọi; dây sang AI bị cắt. */}
      <path d={`M${540 - 280 * spot} 720 L${540 + 280 * spot} 720 L${540 + 200 * spot} 1200 L${540 - 200 * spot} 1200 Z`} fill={GOLDL} opacity={0.08 * spot} />
      <G x={500} y={960} s={p(2, 0) * 0.95}>
        <Head fill={SURF}>
          <G x={-20} y={-70} s={0.55}><Drawer open={drawer} /></G>
        </Head>
      </G>
      <path d="M520 860 Q700 760 780 620" fill="none" stroke={RED} strokeWidth={6} strokeDasharray="12 14" opacity={l(2, 0.4, 10)} />
      <G x={680} y={770} s={l(2, 0.5, 8) * 0.7}>
        <path d="M-30 -30 L30 30 M30 -30 L-30 30" stroke={RED} strokeWidth={12} strokeLinecap="round" />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 5 — Bản đồ sơ sài trong đầu và vùng lãnh thổ phức tạp của công ty; chỗ lệch AI rải dấu hỏi. */
export const BanDoLanhTho: React.FC = () => {
  const { f, p, l } = useT();
  const fly = l(0, 0.2, 24);
  const grow = l(1, 0, 70);
  const over = l(2, 0, 18);
  const walk = l(2, 0.3, 30);
  const blocks = [
    { x: 250, w: 190, h: 200, kind: 0 },
    { x: 540, w: 230, h: 150, kind: 1 },
    { x: 830, w: 170, h: 240, kind: 2 },
  ];
  const base = 980;
  const red: [number, number][] = [[250, 850], [540, 890], [830, 820]];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={640} y={220} p={p(0, 0.4)} solid size={40} />
      <Tag i={1} x={540} y={600} p={p(1, 0.05)} solid size={42} o={1 - over} />
      <Tag i={2} x={250} y={1030} p={p(1, 0.35)} size={30} />
      <Tag i={3} x={540} y={1030} p={p(1, 0.55)} size={30} />
      <Tag i={4} x={830} y={1030} p={p(1, 0.8)} size={30} />
      <Tag i={5} x={540} y={470} p={p(2, 0.5)} solid color={RED} size={42} />
    </>}>
      {/* Đầu nhỏ ở góc trên thả ra tấm bản đồ sơ sài. */}
      <G x={210} y={380} s={p(0, 0) * 0.5}><Head fill={SURF} /></G>
      <G x={lerp(300, lerp(640, 540, over), fly)} y={lerp(380, lerp(400, 770, over), fly)} s={lerp(0.2, lerp(0.85, 1.6, over), fly)} o={lerp(1, 0.55, over)}>
        <MapSheet />
      </G>
      {/* Vùng lãnh thổ mọc dần trên một đường nền: quỹ tài chính, khu nội bộ, đài quan sát của sếp. */}
      {blocks.map((b, k) => {
        const g = clamp01(grow * 3 - k);
        return (
          <G key={k} x={b.x} y={base - 140} s={g}>
            <rect x={-b.w / 2} y={-b.h + 140} width={b.w} height={b.h} rx={10} fill={EL} stroke={GOLD} strokeWidth={4} />
            {Array.from({ length: 6 }, (_, w) => <rect key={w} x={-b.w / 2 + 20 + (w % 3) * (b.w - 40) / 3} y={-b.h + 160 + Math.floor(w / 3) * 50} width={(b.w - 70) / 3} height={30} rx={4} fill={(Math.floor(f / 10) + w) % 4 === 0 ? GOLDL : HOV} />)}
            {b.kind === 0 && <G y={-b.h + 90} s={0.55}><MoneyBag /></G>}
            {b.kind === 1 && [0, 1, 2].map((m) => <G key={m} x={-60 + m * 60} y={-b.h + 130} s={0.42}><Person fill={m === 1 ? GOLD : SEC} /></G>)}
            {b.kind === 2 && (
              <G y={-b.h + 100}>
                <path d="M-30 30 L-16 -30 H16 L30 30 Z" fill={HOV} />
                <ellipse cx={0} cy={-44} rx={40} ry={22} fill={TXT} />
                <circle cx={Math.sin(f / 8) * 14} cy={-44} r={12} fill={INK} />
              </G>
            )}
          </G>
        );
      })}
      <rect x={110} y={base} width={860} height={8} rx={4} fill={GOLD} opacity={grow} />
      {/* Chỗ bản đồ lệch lãnh thổ sáng đỏ, robot đi qua rải dấu hỏi. */}
      {red.map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r={64} fill={RED} opacity={0.3 * l(2, 0.1 + k * 0.1, 10) * (0.7 + 0.3 * Math.sin(f / 4))} />
      ))}
      <G x={lerp(160, 920, walk)} y={600} s={l(2, 0.3, 10) * 0.45}><AI size={140} /></G>
      {red.map(([x, y], k) => (
        <G key={k} x={x} y={y} s={l(2, 0.4 + k * 0.15, 10) * 0.45} r={k % 2 ? 12 : -12}><Question color={GOLDL} /></G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};
