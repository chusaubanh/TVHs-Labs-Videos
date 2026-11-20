import React from "react";
import { AI, Arrow, Box, Chat, Doc, EL, Floor, Folder, G, GOLD, GOLDL, Hand, HOV, INK, Lines, Lock, PAPER, Person, Question, RED, SEC, Spark, Stage, Stamp, SURF, Tag, TXT, XL, lerp, useT } from "../shared/art";
import { MarkClaude, MarkGpt, Win } from "../bai-1/art";
import { Boss } from "../bai-3/art";
import { Bot, clamp01, Crate, Hat, Loupe, MoneyBag, Pen, QCard, Slot, TimeRail } from "./art";

/** Cảnh 6 — AI thành chuyên viên phản biện soi điểm mù; mở Codex hoặc Claude Desktop; ba kỹ thuật cho ba thời điểm. */
export const ChuyenVienPhanBien: React.FC = () => {
  const { f, p, l } = useT();
  const scan = l(0, 0.25, 70);
  const app = l(1, 0, 16);
  const tree = l(1, 0.4, 20);
  const rail = l(2, 0, 24);
  const spots: [number, number][] = [[-70, -90], [60, -10], [-40, 80], [70, 120]];
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={260} y={560} p={p(0, 0.05)} size={32} o={1 - app} />
      <Tag i={1} x={540} y={220} p={p(0, 0.35)} solid size={44} o={1 - app} />
      <Tag i={2} x={700} y={930} p={p(0, 0.7)} solid color={RED} size={36} o={1 - app} />
      <Tag i={3} x={300} y={240} p={p(1, 0.1)} size={36} />
      <Tag i={4} x={780} y={240} p={p(1, 0.25)} size={36} />
      <Tag i={5} x={540} y={760} p={p(1, 0.6)} solid size={36} />
      <Tag i={6} x={540} y={900} p={p(2, 0.1)} solid size={44} />
      <Tag i={7} x={540} y={1010} p={p(2, 0.5)} size={36} />
    </>}>
      {/* Phần 1: mũ bác học bỏ sang bên, robot cầm kính lúp soi tờ trình, điểm mù khoanh đỏ. */}
      <G o={1 - app}>
        <G x={lerp(260, 120, l(0, 0, 14))} y={lerp(380, 700, l(0, 0, 14))} r={l(0, 0, 14) * -40} s={0.8}>
          <path d="M-70 0 L0 -36 L70 0 L0 36 Z" fill={INK} stroke={GOLD} strokeWidth={4} />
          <rect x={-36} y={0} width={72} height={34} rx={6} fill={INK} stroke={GOLD} strokeWidth={4} />
          <line x1={60} y1={4} x2={70} y2={60} stroke={GOLD} strokeWidth={4} />
        </G>
        <G x={260} y={760} s={p(0, 0.1) * 0.9}>
          <Bot arm={0.4} />
        </G>
        <G x={700} y={680} s={p(0, 0.2)}>
          <Box cx={0} cy={0} w={330} h={420} rx={14} fill={PAPER} />
          <rect x={-130} y={-180} width={200} height={22} rx={8} fill={INK} />
          <Lines x={-130} y={-130} w={260} n={9} gap={34} color={SEC} t={10} />
          {spots.map(([x, y], k) => {
            const seen = clamp01(scan * 4 - k);
            return (
              <g key={k}>
                <circle cx={x} cy={y} r={30} fill={INK} opacity={0.7} />
                <circle cx={x} cy={y} r={44} fill="none" stroke={RED} strokeWidth={7} opacity={seen} strokeDasharray={`${seen * 280} 300`} />
              </g>
            );
          })}
          <G x={lerp(-60, 70, scan) + Math.sin(f / 6) * 10} y={lerp(-100, 120, scan)} s={0.9}>
            <Loupe r={-10} />
          </G>
        </G>
      </G>
      {/* Phần 2: hai app trên máy, thư mục mảng việc, chat mới bên trong. */}
      <G o={app}>
        <G x={300} y={430} s={app}>
          <Win w={380} h={270} stroke={GOLD}>
            <G y={30}>
              <MarkGpt r={60} />
            </G>
          </Win>
        </G>
        <G x={780} y={430} s={app}>
          <Win w={380} h={270} stroke={GOLD}>
            <G y={30}>
              <MarkClaude r={60} />
            </G>
          </Win>
        </G>
        <G x={540} y={640} s={tree * 0.9}>
          <Folder open={tree} />
        </G>
        <G x={540} y={650} s={l(1, 0.7, 10) * 0.32}>
          <Chat w={300} h={220} />
        </G>
      </G>
      {/* Phần 3: dải ba thời điểm. */}
      <G x={540} y={1150} s={p(2, 0)}>
        <TimeRail p={rail} pins={rail} />
      </G>
      {Array.from({ length: 6 }, (_, k) => (
        <G key={k} x={120 + k * 170} y={1080} s={rail * 0.3}>
          <Spark r={16} fill={k % 2 ? GOLD : GOLDL} />
        </G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 7 — Kỹ thuật 1, Dò điểm mù: trang trắng chưa viết; câu lệnh mở đầu bằng Khoan viết; robot đóng vai sếp khó tính. */
export const DoDiemMu: React.FC = () => {
  const { f, p, l } = useT();
  const page = l(0, 0, 18);
  const chat = l(1, 0, 14);
  const strike = l(1, 0.15, 12);
  const type1 = l(1, 0.45, 18);
  const type2 = l(2, 0, 80);
  const blink = Math.floor(f / 14) % 2;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={220} p={p(0, 0.05)} solid size={48} />
      <Tag i={1} x={540} y={800} p={p(0, 0.5)} size={36} o={1 - chat} />
      <Tag i={2} x={370} y={460} p={p(1, 0.5)} solid color={GOLD} size={40} />
      <Tag i={3} x={230} y={830} p={p(2, 0.4)} solid size={34} />
      <Tag i={4} x={650} y={1030} p={p(2, 0.75)} solid color={RED} size={34} />
    </>}>
      {/* Dải ba thời điểm: chốt thứ nhất sáng, chỉ hiện ở câu đầu. */}
      <G x={540} y={1150} s={0.8} o={1 - chat}><TimeRail hi={0} /></G>
      {/* Trang trắng tinh, bút còn nắp, giữa khung. */}
      <G x={540} y={540} s={lerp(0.5, 1, page) * (1 - chat)} o={1 - chat}>
        <Box cx={0} cy={0} w={420} h={300} rx={16} fill={TXT} />
        <Box cx={0} cy={0} w={380} h={260} rx={10} fill="none" stroke={SEC} strokeWidth={3} strokeDasharray="10 10" />
        <Pen x={160} y={40} r={40} capped s={0.9} />
      </G>
      {/* Khung chat giữa khung: lệnh soạn bị gạch, dòng mới mở bằng hai chữ chặn lại. */}
      <G x={540} y={560} s={chat}>
        <Chat w={820} h={420}>
          <G x={80} y={-120}>
            <rect x={-190} y={-14} width={380} height={28} rx={14} fill={HOV} opacity={1 - strike * 0.5} />
            <line x1={-200} y1={0} x2={lerp(-200, 200, strike)} y2={0} stroke={RED} strokeWidth={8} strokeLinecap="round" />
          </G>
          <G x={80} y={-50}>
            {Array.from({ length: 5 }, (_, k) => (
              <rect key={k} x={-190} y={40 + k * 30} width={500 * clamp01(type2 * 5 - k) * (k % 3 === 2 ? 0.6 : 1)} height={12} rx={6} fill={TXT} opacity={0.8} />
            ))}
            <rect x={-190 + 500 * (type2 < 1 ? (type2 * 5) % 1 : 0.6)} y={38 + Math.min(4, Math.floor(type2 * 5)) * 30} width={4} height={16} fill={GOLDL} opacity={blink * clamp01(type2 * 20)} />
          </G>
        </Chat>
      </G>
      <G x={850} y={430} s={l(1, 0.6, 10) * 0.4}><Hand r={-10} /></G>
      {/* Robot đội mũ sếp khoanh tay; năm ô trống chờ điền cùng hàng. */}
      <G x={230} y={970} s={p(2, 0.15) * 0.7}>
        <Bot arm={1}>
          <G y={-70} s={0.9}><Hat kind="sep" /></G>
        </Bot>
      </G>
      {Array.from({ length: 5 }, (_, k) => (
        <G key={k} x={440 + k * 105} y={940} s={p(2, 0.5 + k * 0.06) * 0.6}><Slot k={k} /></G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 8 — Năm ô bật đầy đúng câu sếp hay hỏi; nhớ hai chữ Khoan viết; thiếu nó AI soạn bừa. */
export const KhoanViet: React.FC = () => {
  const { f, p, l } = useT();
  const sign = l(1, 0, 10);
  const rush = l(2, 0, 14);
  const fill = (k: number) => clamp01(l(0, 0.1, 60) * 5 - k);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={240} y={510} p={p(0, 0.3)} size={32} />
      <Tag i={1} x={540} y={510} p={p(0, 0.55)} size={32} />
      <Tag i={2} x={840} y={510} p={p(0, 0.8)} size={32} />
      <Tag i={3} x={540} y={lerp(700, 640, sign)} p={p(1, 0.15) * (1 - rush)} solid color={GOLD} size={46} />
      <Tag i={4} x={540} y={1000} p={p(2, 0.3)} solid color={RED} size={44} />
    </>}>
      {/* Năm ô điền: ngân sách, ba báo giá, phiếu bảo hành và hai ô câu hỏi bắt bẻ. */}
      {Array.from({ length: 5 }, (_, k) => (
        <G key={k} x={170 + k * 185} y={360} s={0.9}>
          <Slot k={k} w={170} fill={fill(k)}>
            {k === 0 && <G s={0.8}><MoneyBag /></G>}
            {k === 1 && [0, 1, 2].map((m) => <G key={m} x={-24 + m * 24} r={-16 + m * 16} s={0.4}><Doc w={120} h={160} n={4} fill={PAPER} /></G>)}
            {k === 2 && (
              <g>
                <Box cx={0} cy={0} w={100} h={120} rx={8} fill={PAPER} />
                <Lines x={-36} y={-40} w={72} n={3} gap={18} color={SEC} t={6} />
                <G y={30} s={0.4}><Stamp r={50} color={GOLD} /></G>
              </g>
            )}
            {k > 2 && <G s={0.5}><Question color={GOLDL} /></G>}
          </Slot>
        </G>
      ))}
      {/* Ba ô đầu khớp đúng ba câu hỏi của sếp ở cảnh trước: sếp và ba ô câu hỏi, dây nối lên. */}
      <G o={1 - sign}>
        <G x={200} y={960} s={p(0, 0.2) * 1.05}>
          <Boss fill={TXT} />
        </G>
        <Box cx={200} cy={1010} w={300} h={30} rx={10} fill={GOLD} opacity={p(0, 0.2)} />
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <path d={`M${170 + k * 185} 450 Q${300 + k * 200} 560 ${440 + k * 180} ${690 + k * 110}`} fill="none" stroke={fill(k) > 0.5 ? XL : HOV} strokeWidth={5} strokeDasharray="12 10" opacity={p(0, 0.25 + k * 0.12)} />
            <G x={560 + k * 150} y={700 + k * 110} s={p(0, 0.2 + k * 0.12) * 0.62}>
              <QCard w={420} h={150} done={fill(k)}>
                <Lines x={-170} y={-30} w={280} n={3} gap={28} color={fill(k) > 0.5 ? XL : SEC} t={11} />
              </QCard>
            </G>
          </g>
        ))}
      </G>
      {/* Tấm biển chặn vàng và nút buộc nhớ trên ngón tay. */}
      <G x={540} y={lerp(700, 640, sign)} s={sign * (1 - rush)}>
        <path d="M-220 -60 H220 L250 0 L220 60 H-220 L-250 0 Z" fill={GOLD} />
        <rect x={-8} y={60} width={16} height={180} fill={HOV} />
      </G>
      {/* Bỏ biển: robot lao vào bàn phím, giấy bay tung toé, chữ xiêu vẹo dấu X đỏ. */}
      <G x={540} y={780} s={rush} r={Math.sin(f * 1.6) * 4}>
        <Bot arm={0.2 + 0.4 * Math.abs(Math.sin(f * 1.5))} s={1.05} />
        <Box cx={0} cy={240} w={420} h={56} rx={12} fill={HOV} />
        {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-190 + k * 32} y={226} width={24} height={14} rx={4} fill={k === Math.floor(f / 2) % 10 ? GOLD : SEC} />)}
      </G>
      {Array.from({ length: 6 }, (_, k) => {
        const t = clamp01(rush * 1.5 - k * 0.08);
        return (
          <G key={k} x={540 + Math.cos(k * 1.1) * 380 * t} y={760 - Math.sin(k * 1.1 + 0.4) * 240 * t} r={k * 37 + f * 2 * t} s={t * 0.5}>
            <Box cx={0} cy={0} w={120} h={150} rx={8} fill={PAPER} />
            <path d="M-40 -30 Q-10 -50 10 -20 T40 -30 M-40 10 Q0 30 30 0" stroke={SEC} strokeWidth={6} fill="none" />
            <path d="M-20 30 L20 70 M20 30 L-20 70" stroke={RED} strokeWidth={10} strokeLinecap="round" transform="translate(0 -20)" />
          </G>
        );
      })}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 9 — Kỹ thuật 2, Phỏng vấn ngược: bút đặt lên dòng đầu; đảo vai hỏi đáp; khoá nút viết chờ bốn câu trả lời. */
export const PhongVanNguoc: React.FC = () => {
  const { f, p, l } = useT();
  const swap = l(1, 0.4, 22);
  const type = l(2, 0, 60);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={220} p={p(0, 0.05)} solid size={48} />
      <Tag i={1} x={lerp(540, 300, l(1, 0, 14))} y={lerp(760, 470, l(1, 0, 14))} p={p(0, 0.5)} size={34} />
      <Tag i={2} x={720} y={330} p={p(1, 0.5)} solid color={GOLDL} size={38} />
      <Tag i={3} x={540} y={760} p={p(2, 0.2)} solid color={GOLDL} size={40} />
      <Tag i={4} x={540} y={985} p={p(2, 0.6)} size={34} />
    </>}>
      <G x={540} y={1150} s={0.8} o={1 - l(1, 0, 12)}>
        <TimeRail hi={1} />
      </G>
      {/* Bút mở nắp đặt lên dòng đầu tiên. */}
      <G x={lerp(540, 300, l(1, 0, 14))} y={lerp(560, 380, l(1, 0, 14))} s={p(0, 0.1) * lerp(1.6, 0.85, l(1, 0, 14))}>
        <Box cx={0} cy={0} w={260} h={150} rx={12} fill={TXT} />
        <rect x={-100} y={-40} width={lerp(0, 120, l(0, 0.3, 20))} height={12} rx={6} fill={SEC} />
        <Pen x={30 + lerp(-100, 20, l(0, 0.3, 20))} y={-80} r={30} s={0.7} />
      </G>
      {/* Hai vai hỏi đáp xoay đổi chỗ: AI cầm micro, người ngồi ghế trả lời. */}
      <G x={700} y={590} s={p(1, 0) * 1.35}>
        <G x={lerp(-130, 130, swap)} y={Math.sin(swap * Math.PI) * -60}>
          <Person fill={SEC} s={0.9} />
          {swap > 0.6 && (
            <g>
              <rect x={-50} y={44} width={100} height={20} rx={6} fill={HOV} />
              <rect x={-44} y={64} width={10} height={50} fill={HOV} />
              <rect x={34} y={64} width={10} height={50} fill={HOV} />
            </g>
          )}
        </G>
        <G x={lerp(130, -130, swap)} y={Math.sin(swap * Math.PI) * 60 - 20} s={0.55}>
          <AI size={140} />
          {swap > 0.6 && (
            <G x={90} y={40} r={30}>
              <rect x={-8} y={0} width={16} height={70} rx={6} fill={SEC} />
              <ellipse cx={0} cy={-6} rx={22} ry={26} fill={GOLD} />
            </G>
          )}
        </G>
        <path d="M-180 -140 A200 120 0 0 1 180 -140" fill="none" stroke={GOLD} strokeWidth={6} opacity={l(1, 0.3, 8)} />
        <path d="M168 -160 L186 -136 L156 -128" fill="none" stroke={GOLD} strokeWidth={6} opacity={l(1, 0.3, 8)} />
        {[0, 1].map((k) => (
          <G key={k} x={(k ? 1 : -1) * lerp(130, -130, swap)} y={-150} s={p(1, 0.05 + k * 0.1) * 0.5}>
            <Box cx={0} cy={0} w={150} h={70} rx={20} fill={k ? GOLD : TXT} />
            <Lines x={-50} y={-14} w={100} n={2} gap={22} color={INK} t={8} />
          </G>
        ))}
      </G>
      {/* Khung chat: câu lệnh, khoá trên nút viết, bốn ô câu hỏi, chìa ở ô cuối. */}
      <G x={540} y={900} s={p(2, 0)}>
        <Box cx={0} cy={0} w={880} h={150} rx={24} fill={EL} stroke={GOLD} strokeWidth={5} />
        {Array.from({ length: 3 }, (_, k) => (
          <rect key={k} x={-400} y={-50 + k * 32} width={480 * clamp01(type * 3 - k)} height={14} rx={7} fill={TXT} opacity={0.8} />
        ))}
        <G x={340} y={0}>
          <Box cx={0} cy={0} w={130} h={70} rx={35} fill={HOV} />
          <G y={-10} s={0.55}>
            <Lock />
          </G>
        </G>
      </G>
      {Array.from({ length: 4 }, (_, k) => (
        <G key={k} x={240 + k * 200} y={1050} s={p(2, 0.55 + k * 0.08) * 0.6}>
          <Slot k={k} />
          {k === 3 && <G x={60} y={80} r={-30 + Math.sin(f / 6) * 10}><circle r={18} fill="none" stroke={GOLD} strokeWidth={8} /><rect x={14} y={-5} width={60} height={10} fill={GOLD} /><rect x={58} y={5} width={8} height={14} fill={GOLD} /></G>}
        </G>
      ))}
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 10 — AI hỏi trúng hạn mức chi tiêu, phòng ban thụ hưởng; trả lời xong, tờ trình chuẩn xác, kín kẽ. */
export const HoiTrungChiTiet: React.FC = () => {
  const { f, p, l } = useT();
  const answer = l(0, 0.3, 50);
  const unlock = l(1, 0, 12);
  const slide = l(1, 0.15, 20);
  const scan = l(1, 0.4, 30);
  const need = clamp01(answer);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={290} y={230} p={p(0, 0.15)} solid size={36} />
      <Tag i={1} x={790} y={230} p={p(0, 0.45)} solid size={36} />
      <Tag i={2} x={330} y={1000} p={p(1, 0.5)} solid color={XL} size={40} />
      <Tag i={3} x={760} y={1000} p={p(1, 0.75)} solid color={XL} size={40} />
    </>}>
      {/* Thước mức chi với vạch giới hạn đỏ. */}
      <G x={290} y={420} s={p(0, 0.05) * (1 - slide * 0.35)}>
        <Box cx={0} cy={0} w={340} h={220} rx={20} fill={EL} stroke={GOLD} strokeWidth={5} />
        <path d="M-120 60 A120 120 0 0 1 120 60" fill="none" stroke={HOV} strokeWidth={22} />
        <path d="M-120 60 A120 120 0 0 1 60 -44" fill="none" stroke={GOLD} strokeWidth={22} opacity={need} />
        <line x1={84} y1={-84} x2={70} y2={-50} stroke={RED} strokeWidth={10} />
        <line x1={0} y1={60} x2={lerp(-100, 50, need)} y2={lerp(40, -60, need)} stroke={TXT} strokeWidth={8} strokeLinecap="round" />
        <circle cx={0} cy={60} r={14} fill={TXT} />
      </G>
      {/* Biển tên phòng ban nhận thiết bị. */}
      <G x={790} y={420} s={p(0, 0.35) * (1 - slide * 0.35)}>
        <Box cx={0} cy={0} w={340} h={220} rx={20} fill={EL} stroke={GOLD} strokeWidth={5} />
        <path d="M-120 40 L-100 -20 H100 L120 40 Z" fill={GOLD} />
        <rect x={-80} y={-6} width={160} height={16} rx={8} fill={INK} />
        <G x={0} y={-60} s={0.45}><Crate /></G>
        <G x={-120} y={-70} s={0.35}><Person fill={SEC} /></G>
        <G x={120} y={-70} s={0.35}><Person fill={SEC} /></G>
      </G>
      {/* Người trả lời gật đầu, điền vào từng ô. */}
      <G x={540} y={760 + Math.sin(f / 4) * 4 * need * (1 - slide)} s={p(0, 0.25) * (1 - slide)}>
        <Person fill={SEC} s={1.1} />
        {[0, 1, 2, 3].map((k) => (
          <G key={k} x={-210 + k * 140} y={-200} s={0.4}>
            <Box cx={0} cy={0} w={200} h={120} rx={16} fill={k / 4 < need ? GOLD : HOV} />
            <Lines x={-70} y={-30} w={140} n={2} gap={30} color={INK} t={12} />
          </G>
        ))}
      </G>
      {/* Chìa mở khoá, tờ trình hoàn chỉnh trượt ra, mép dán kín, kính lúp không thấy kẽ hở. */}
      <G x={170} y={760} s={p(1, 0) * 0.8}>
        <Lock open={unlock} />
      </G>
      <G x={540} y={lerp(1300, 760, slide)} s={slide}>
        <Box cx={0} cy={0} w={360} h={400} rx={14} fill={PAPER} />
        <rect x={-150} y={-170} width={220} height={22} rx={8} fill={INK} />
        <Lines x={-150} y={-120} w={300} n={8} gap={34} color={SEC} t={10} />
        {[[-180, -200], [180, -200], [-180, 200], [180, 200]].map(([x, y], k) => (
          <rect key={k} x={x - 30} y={y - 12} width={60} height={24} rx={6} fill={GOLDL} transform={`rotate(${x * y > 0 ? 45 : -45} ${x} ${y})`} opacity={l(1, 0.3 + k * 0.05, 8)} />
        ))}
        <G x={lerp(-100, 100, scan)} y={lerp(-120, 120, scan)} s={0.8}>
          <Loupe />
        </G>
        <G x={140} y={150} s={l(1, 0.85, 8)}>
          <Stamp r={50} color={XL} />
        </G>
      </G>
      <Floor y={1240} />
    </Stage>
  );
};
