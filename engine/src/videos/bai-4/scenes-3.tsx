import React from "react";
import { Arrow, Box, BrandEnd, Clock, Cross, EL, Floor, G, GOLD, GOLDL, HOV, INK, Lines, PAPER, Person, RED, SEC, Spark, Stage, SURF, Tag, TXT, XL, lerp, useT } from "../shared/art";
import { Calendar, Loop, MarkClaude, MarkGpt, Win } from "../bai-1/art";
import { Bot, Hat, Head, Loupe } from "../bai-2/art";
import { Article, Bang, BotBadge, Ceiling, Chip, clamp01, Column, DataStack, GiftBox, Heart, NoSign, Shield, Tick } from "./art";

/** Khung chat có thanh tiêu đề; fresh là chat mới tinh (viền sáng, lấp lánh). */
const ChatWin: React.FC<{ w: number; h: number; fresh?: boolean; children?: React.ReactNode }> = ({ w, h, fresh = false, children }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={26} fill={fresh ? "#22242A" : EL} stroke={fresh ? GOLDL : HOV} strokeWidth={fresh ? 7 : 5} />
    <path d={`M${-w / 2} ${-h / 2 + 60} H${w / 2}`} stroke={HOV} strokeWidth={4} />
    {[0, 1, 2].map((i) => <circle key={i} cx={-w / 2 + 34 + i * 28} cy={-h / 2 + 30} r={9} fill={i === 0 ? GOLD : HOV} />)}
    <rect x={-w / 2 + 30} y={h / 2 - 66} width={w - 60} height={42} rx={21} fill={INK} stroke={HOV} strokeWidth={3} />
    {children}
  </g>
);

/** Dấu "người khác làm": con dấu tròn có hình người. */
const OtherStamp: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s} r={-12}>
    <circle r={58} fill="none" stroke={GOLD} strokeWidth={8} />
    <circle r={46} fill="none" stroke={GOLD} strokeWidth={3} />
    <G y={22} s={0.42}><Person fill={GOLD} /></G>
  </G>
);

/** Cảnh 11 — Tuyệt chiêu: mở chat mới để kiểm tra chéo; không hỏi lại chat cũ, vì ở đó nó bênh con đẻ. */
export const ChatMoi: React.FC = () => {
  const { f, p, l } = useT();
  const fresh = p(0, 0.25, 12);
  const ask = l(1, 0.05, 22);
  const hug = l(2, 0, 14);
  const pulse = 0.9 + 0.1 * Math.sin(f / 4);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={232} p={p(0, 0.05)} solid size={44} />
      <Tag i={1} x={790} y={308} p={p(0, 0.35)} solid color={GOLDL} size={38} />
      <Tag i={2} x={540} y={995} p={p(0, 0.65)} size={38} o={1 - ask} />
      <Tag i={3} x={290} y={995} p={p(1, 0.55)} solid color={RED} size={36} />
      <Tag i={4} x={290} y={308} p={p(2, 0.15)} size={36} />
    </>}>
      {/* Chat cũ: robot và tờ bài của nó. */}
      <G x={290} y={640} s={p(0, 0)}>
        <ChatWin w={400} h={560}>
          <G x={-70} y={lerp(40, 20, hug)} s={0.6}><Bot arm={lerp(0.3, 2.2, hug)} /></G>
          <G x={lerp(90, -40, hug)} y={lerp(60, 110, hug)} s={lerp(0.55, 0.42, hug)} r={lerp(0, -8, hug)}>
            <Article w={220} h={280} rows={8} />
            <G x={70} y={100}><BotBadge s={0.9} /></G>
          </G>
          <G x={90} y={140} s={hug}><Shield s={0.9} /></G>
          <G x={-70} y={-150} s={hug * pulse}><Heart s={1.1} /></G>
          <path d={`M-70 -130 Q${-110} -40 -50 60`} fill="none" stroke={RED} strokeWidth={4} strokeDasharray="8 6" opacity={hug} />
        </ChatWin>
      </G>
      {/* Chat mới tinh bật ra bên cạnh. */}
      <G x={790} y={640} s={fresh}>
        <ChatWin w={400} h={560} fresh>
          <G y={-20} s={pulse}><Spark r={70} fill={GOLDL} /></G>
          <G x={80} y={-100} s={0.4 * pulse}><Spark r={40} fill={GOLD} /></G>
          <G x={-90} y={60} s={0.3}><Spark r={40} fill={GOLD} /></G>
        </ChatWin>
      </G>
      {/* Hai mũi tên chéo nối hai cửa sổ. */}
      <G o={l(0, 0.6, 10)}>
        <Arrow x1={470} y1={540} x2={610} y2={740} p={l(0, 0.6, 12)} w={8} />
        <Arrow x1={610} y1={540} x2={470} y2={740} p={l(0, 0.7, 12)} w={8} color={GOLDL} />
      </G>
      {/* Câu hỏi bắt lỗi định bay vào chat cũ thì bị biển cấm chặn. */}
      <G x={lerp(560, 330, ask)} y={lerp(1180, 930, ask)} s={ask > 0.01 ? 0.85 : 0} r={-6}>
        <Chip me w={170} />
        <G x={0} y={0} s={0.28}><path d="M-44 -46 Q-40 -96 2 -96 Q48 -96 48 -52 Q48 -22 14 -6 Q2 2 2 28" fill="none" stroke={RED} strokeWidth={24} strokeLinecap="round" /><circle cx={2} cy={70} r={16} fill={RED} /></G>
      </G>
      <G x={200} y={900} s={l(1, 0.4, 8) * 0.8}><NoSign /></G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 12 — Dán kết quả vào chat mới; câu lệnh thanh tra khó tính tìm ba lỗi, không khen; hai cụm từ tước động cơ bênh vực, AI thành kiểm toán độc lập. */
export const ThanhTraKhoTinh: React.FC = () => {
  const { f, p, l } = useT();
  const fly = l(0, 0.04, 26);
  const stamp = p(1, 0.12, 12);
  const hat = l(1, 0.3, 12);
  const ring = (k: number) => l(1, 0.5 + k * 0.1, 8);
  const praise = l(1, 0.85, 10);
  const cutT = l(2, 0.3, 14);
  const sweep = l(2, 0.55, 40);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={560} y={240} p={p(0, 0.3)} solid size={42} o={1 - l(1, 0, 8)} />
      <Tag i={1} x={560} y={240} p={p(1, 0.1)} solid color={GOLDL} size={40} />
      <Tag i={2} x={300} y={995} p={p(1, 0.3)} size={36} o={1 - cutT} />
      <Tag i={3} x={780} y={995} p={p(1, 0.6)} solid color={RED} size={36} o={1 - cutT} />
      <Tag i={4} x={850} y={318} p={p(1, 0.85)} size={34} o={1 - l(2, 0, 8)} />
      <Tag i={5} x={560} y={318} p={p(2, 0.12)} solid color={GOLDL} size={40} />
      <Tag i={6} x={540} y={995} p={p(2, 0.5)} solid color={XL} size={40} />
    </>}>
      {/* Chat cũ thu nhỏ ở góc, tờ bài bay sang chat mới. */}
      <G x={170} y={330} s={0.32 * p(0, 0)} o={0.7}>
        <ChatWin w={400} h={560}>
          <G x={-70} y={20} s={0.6}><Bot arm={2.2} /></G>
          <G x={90} y={140} s={0.9}><Shield /></G>
        </ChatWin>
      </G>
      <G x={560} y={640} s={p(0, 0.05)}>
        <ChatWin w={760} h={640} fresh>
          {/* Robot đội mũ thanh tra, cầm kính lúp. */}
          <G x={-250} y={60} s={0.62}>
            <Bot arm={hat * 1.4} />
            <G y={-62} s={hat * 1.05}><Hat kind="thanh-tra" /></G>
          </G>
          {/* Thiên vị (khiên và tim) bị cắt rơi khi hai cụm từ vào lệnh. */}
          <G x={-130} y={lerp(-185, 260, cutT)} s={(1 - clamp01(cutT * 1.2 - 0.2)) * 0.42} r={cutT * 70} o={l(1, 0.4, 8)}>
            <Shield />
            <G y={-10}><Heart s={0.8} /></G>
          </G>
          <line x1={lerp(-300, -180, cutT)} y1={-250} x2={lerp(-300, -20, cutT)} y2={-120} stroke={GOLDL} strokeWidth={8} strokeLinecap="round" opacity={cutT > 0.02 && cutT < 0.98 ? 1 : 0} />
          {/* Lời khen xã giao bị gạch chéo. */}
          <G x={270} y={-170} s={praise}>
            <Box cx={0} cy={0} w={150} h={90} rx={22} fill={HOV} />
            <G y={4}><Heart s={0.8} color={GOLDL} /></G>
            <Cross r={42} color={RED} />
          </G>
        </ChatWin>
      </G>
      {/* Tờ bài: bay sang, nhận dấu "người khác làm", ba vòng đỏ khoanh chỗ sơ hở, rồi được quét sạch. */}
      <G x={lerp(170, 590, fly)} y={lerp(330, 690, fly)} s={lerp(0.2, 1, fly)}>
        <Article w={280} h={360} rows={10} />
        <G x={-100} y={-130} s={stamp * 0.75}><OtherStamp /></G>
        {[[60, -40], [-40, 60], [70, 140]].map(([x, y], k) => (
          <g key={k}>
            <ellipse cx={x} cy={y} rx={68} ry={28} fill="none" stroke={RED} strokeWidth={7} opacity={ring(k)} transform={`rotate(-6 ${x} ${y})`} />
            <G x={x + 70} y={y - 20} s={l(2, 0.75 + k * 0.06, 8) * 0.32}><Tick r={40} /></G>
          </g>
        ))}
      </G>
      <G x={lerp(720, 700, sweep)} y={lerp(800, 560, sweep)} s={hat * 0.62} r={-20 + sweep * 20}>
        <Loupe />
      </G>
      <G x={860} y={520} s={l(2, 0.92, 8) * 0.8}><Tick r={44} /></G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 13 — Mười lăm phút với một văn bản hoặc bảng số liệu AI vừa làm tuần này; chat mới tinh, thả mẫu câu lệnh; giật mình thấy lỗ hổng. */
export const MuoiLamPhut: React.FC = () => {
  const { f, p, l } = useT();
  const sweep = l(0, 0.05, 40);
  const pick = l(0, 0.6, 16);
  const chat = l(1, 0, 16);
  const drop = l(1, 0.55, 22);
  const holes = l(2, 0.05, 10);
  const nod = holes < 0.5 ? Math.sin(f / 4) * 12 : 0;
  const a = sweep * Math.PI * 0.5;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={230} y={615} p={p(0, 0.1)} solid size={36} o={1 - chat} />
      <Tag i={1} x={540} y={615} p={p(0, 0.25)} size={34} o={1 - chat} />
      <Tag i={2} x={850} y={615} p={p(0, 0.32)} size={34} o={1 - chat} />
      <Tag i={3} x={540} y={975} p={p(0, 0.75)} size={34} o={1 - chat} />
      <Tag i={4} x={540} y={235} p={p(1, 0.1)} solid size={42} o={1 - holes} />
      <Tag i={5} x={540} y={995} p={p(1, 0.5)} solid color={GOLDL} size={38} />
      <Tag i={6} x={540} y={235} p={p(2, 0.15)} solid color={RED} size={44} />
    </>}>
      {/* Hàng trên: đồng hồ quét một phần tư vòng, văn bản, bảng số liệu; lịch tuần. */}
      <G o={1 - chat}>
        <G x={230} y={420} s={p(0, 0) * 1.15}>
          <Clock r={100} hour={0} minute={sweep * 15} />
          <path d={`M0 0 L0 -88 A88 88 0 0 1 ${Math.sin(a) * 88} ${-Math.cos(a) * 88} Z`} fill={GOLD} opacity={0.4} />
        </G>
        <G x={540} y={lerp(420, 390, pick)} s={p(0, 0.06) * lerp(1, 1.1, pick)}>
          <Article w={200} h={250} rows={6} cap={false} />
        </G>
        <G x={850} y={420} s={p(0, 0.1) * 1.05} o={1 - pick * 0.5}><DataStack n={1} /></G>
        <G x={610} y={lerp(720, 500, pick)} s={pick * 0.7} r={-10}>
          <path d="M-30 80 L-30 -20 Q-30 -40 -12 -40 Q6 -40 6 -20 V10 L40 16 Q60 20 58 44 L50 90 Z" fill={TXT} stroke={GOLD} strokeWidth={6} />
        </G>
        <G x={290} y={830} s={p(0, 0.16) * 0.95}><Calendar flip={0} /></G>
        <G x={700} y={830} s={p(0, 0.2)}>
          {Array.from({ length: 7 }, (_, k) => <rect key={k} x={-203 + k * 58} y={-34} width={48} height={68} rx={10} fill={k === 3 ? GOLD : HOV} />)}
          <G x={-203 + 3 * 58 + 24} y={-70} s={0.5}><Arrow x1={0} y1={-60} x2={0} y2={10} w={12} /></G>
        </G>
      </G>
      {/* Chat mới tinh trên Codex hoặc Claude Desktop; mẫu câu lệnh từ bài viết dưới video bay lên. */}
      <G x={540} y={630} s={chat}>
        <ChatWin w={780} h={560} fresh>
          <G x={250} y={-250} s={0.42}><MarkGpt r={50} /></G>
          <G x={320} y={-250} s={0.42}><MarkClaude r={50} /></G>
          <G x={-170} y={20} s={0.9}>
            <Article w={260} h={340} rows={10} cap={false} />
            {[[40, -40], [-50, 50], [60, 110]].map(([x, y], k) => (
              <g key={k} opacity={l(2, 0.05 + k * 0.12, 6)}>
                <circle cx={x} cy={y} r={30} fill={INK} />
                <circle cx={x} cy={y} r={38} fill="none" stroke={RED} strokeWidth={7} />
              </g>
            ))}
          </G>
          <G x={lerp(0, 160, drop)} y={lerp(560, 190, drop)} s={drop > 0.01 ? 0.9 : 0}>
            <Box cx={0} cy={0} w={300} h={70} rx={20} fill={GOLD} />
            <rect x={-120} y={-8} width={160} height={16} rx={8} fill={INK} />
            <rect x={78} y={-20} width={30} height={34} rx={6} fill="none" stroke={INK} strokeWidth={5} />
            <rect x={90} y={-10} width={30} height={34} rx={6} fill={GOLD} stroke={INK} strokeWidth={5} />
          </G>
          {/* Cái đầu đang gật thì khựng lại, dấu chấm than bật lên. */}
          <G x={190} y={lerp(-10, 0, holes)} s={0.5}>
            <g transform={`rotate(${nod} 0 120)`}><Head fill={SURF} frown={holes} /></g>
          </G>
          <G x={250} y={-150} s={holes * 0.8}><Bang /></G>
        </ChatWin>
      </G>
      <G x={540} y={1100} o={chat * (1 - holes)}>
        <Arrow x1={0} y1={-40} x2={0} y2={100} p={l(1, 0.3, 12)} w={12} color={GOLDL} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 14 — Quay về cảnh đầu: chồng bài đã gọn dưới vạch trần, thanh tra tích thật; bình luận; bài sau đóng gói Skill; màn kết. */
export const HenBaiSau: React.FC = () => {
  const { f, p, l } = useT();
  const next = l(1, 0.1, 16);
  const fold = l(1, 0.3, 30);
  const loop = l(1, 0.6, 40);
  const end = l(2, 0, 12);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={835} y={995} p={p(0, 0.45)} solid size={32} o={1 - next} />
      <Tag i={1} x={540} y={235} p={p(1, 0.05)} solid size={46} />
      <Tag i={2} x={540} y={932} p={p(1, 0.4)} solid color={GOLDL} size={38} />
      <Tag i={3} x={540} y={995} p={p(1, 0.7)} size={32} />
      {end > 0 && <BrandEnd k={end} />}
    </>}>
      {/* Cảnh đầu lặp lại: chồng bài nằm gọn dưới vạch trần, thanh tra đóng tích xanh. */}
      <G o={1 - next}>
        <Ceiling x1={140} x2={940} y={630} />
        <G x={560} y={1180}>
          <Column w={260} h={500} ceil={550} />
        </G>
        <G x={560} y={900} s={l(0, 0.2, 10) * 0.9}><Tick r={50} /></G>
        <G x={250} y={960} s={0.85}>
          <Bot arm={1.2} />
          <G y={-62} s={1.05}><Hat kind="thanh-tra" /></G>
          <G x={150} y={40} s={0.55} r={-20}><Loupe /></G>
        </G>
        <G x={835} y={lerp(1300, 880, l(0, 0.3, 16))} s={p(0, 0.3) * 0.85}>
          <Box cx={0} cy={0} w={300} h={140} rx={30} fill={EL} stroke={GOLD} strokeWidth={5} />
          <path d="M-100 70 L-120 110 L-60 70 Z" fill={EL} stroke={GOLD} strokeWidth={5} />
          <G x={-80} y={0} s={0.35}><Loupe /></G>
          {[0, 1, 2].map((k) => <circle key={k} cx={20 + k * 40} cy={0} r={12} fill={GOLDL} opacity={0.4 + 0.6 * ((Math.floor(f / 6) + k) % 3 === 0 ? 1 : 0)} />)}
        </G>
      </G>
      {/* Bài sau: các bước quy trình gập vào hộp Skill có nơ; vòng vô cực quanh hộp. */}
      <G o={Math.max(next, l(1, 0, 8)) * (1 - end)}>
        <G x={540} y={630} s={next}><Loop r={265} p={loop} color={GOLD} /></G>
        {[0, 1, 2, 3].map((k) => {
          const x0 = 210 + k * 220;
          return (
            <G key={k} x={lerp(x0, 540, fold)} y={lerp(420, 640, fold)} s={p(1, 0.02 + k * 0.03) * lerp(0.9, 0.2, fold)} o={1 - clamp01(fold * 1.4 - 0.4)}>
              <Box cx={0} cy={0} w={170} h={130} rx={18} fill={EL} stroke={GOLD} strokeWidth={5} />
              <circle cx={-56} cy={-36} r={18} fill={GOLD} />
              {Array.from({ length: k + 1 }, (_, d) => <circle key={d} cx={-56 + (d - k / 2) * 8} cy={-36} r={3} fill={INK} />)}
              <Lines x={-60} y={4} w={120} n={2} gap={26} color={SEC} t={10} />
            </G>
          );
        })}
        {[0, 1, 2].map((k) => (
          <Arrow key={k} x1={295 + k * 220} y1={420} x2={345 + k * 220} y2={420} p={(1 - fold) * l(1, 0.15 + k * 0.05, 8)} w={6} />
        ))}
        <G x={540} y={640} s={clamp01(fold * 1.5 - 0.3) * 1.0}><GiftBox lid={1 - fold} /></G>
        {[[320, 520], [770, 760], [760, 500], [330, 780]].map(([x, y], k) => (
          <G key={k} x={x} y={y} s={loop * (0.5 + 0.3 * Math.sin(f / 5 + k))}><Spark r={24} fill={GOLDL} /></G>
        ))}
      </G>
      <Floor y={1240} />
    </Stage>
  );
};
