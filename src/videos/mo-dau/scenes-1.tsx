import React from "react";
import { AI, Arrow, Bell, Box, Chat, Clock, Cross, Doc, EL, Floor, Folder, G, GOLD, GOLDL, Hand, HOV, INK, Lines, Mag, PAPER, Person, Question, RED, SEC, Spark, Stage, Stamp, SURF, Tag, TXT, lerp, useT } from "../shared/art";
import { Calendar, clamp01, NumChip, Win } from "../bai-1/art";
import { Gear, Phone, Sheet } from "./art";

/** Cảnh 1 — Hook: copy từng mảnh Excel dán vào chat, còn phần cực nhất đè lên bàn. */
export const HookCopyExcel: React.FC = () => {
  const { f, p, l } = useT();
  const pieces = [0, 1, 2, 3];
  const sag = l(1, 0.1, 20);
  const travel = (k: number) => l(0, 0.04 + k * 0.2, 12);
  const cur = pieces.reduce((acc, k) => (travel(k) > 0 ? k : acc), 0);
  const hx = lerp(260, 760, travel(cur));
  const hy = lerp(420, 300 + cur * 60, travel(cur));
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={540} y={205} p={p(0, 0)} solid size={50} />
      <Tag i={1} x={770} y={680} p={p(0, 0.75)} size={34} />
      <Tag i={2} x={540} y={790} p={p(1, 0.05)} solid color={RED} size={38} />
      <Tag i={3} x={270} y={1010} p={p(1, 0.35)} size={32} />
      <Tag i={4} x={800} y={1010} p={p(1, 0.6)} size={32} />
    </>}>
      {/* Bảng Excel bên trái, khung chat bên phải. */}
      <G x={260} y={440}>
        <Sheet w={320} h={340} cols={4} rows={6} />
      </G>
      <G x={770} y={440}>
        <Chat w={360} h={380} />
      </G>
      {/* Từng mảnh bảng bị cắt ra và dán vào khung chat. */}
      {pieces.map((k) => {
        const t = travel(k);
        if (t <= 0) return null;
        return (
          <G key={k} x={lerp(260, 830, t)} y={lerp(380 + k * 40, 330 + k * 66, t)} s={lerp(1, 0.8, t)}>
            <Box cx={0} cy={0} w={150} h={46} rx={8} fill={t >= 1 ? GOLDL : TXT} />
            <rect x={-60} y={-8} width={90} height={16} rx={8} fill={INK} />
          </G>
        );
      })}
      <G x={hx + 30} y={hy + 40} s={0.6} r={-10}>
        <Hand />
      </G>
      {/* Bàn làm việc trĩu xuống vì phần cực nhất. */}
      <path d={`M110 900 Q540 ${900 + 70 * sag} 970 900`} fill="none" stroke={GOLD} strokeWidth={26} strokeLinecap="round" />
      <rect x={180} y={910} width={18} height={250} fill={HOV} />
      <rect x={882} y={910} width={18} height={250} fill={HOV} />
      {[0, 1, 2, 3, 4].map((k) => (
        <G key={k} x={240 + (k % 2) * 10} y={880 + 50 * sag - k * 34} s={p(1, 0.1 + k * 0.06)}>
          <Box cx={0} cy={0} w={180} h={30} rx={6} fill={k % 2 ? PAPER : SEC} />
        </G>
      ))}
      <G x={540} y={860 + 66 * sag} s={p(1, 0.4)}>
        <Mag s={0.7} />
      </G>
      {[0, 1, 2].map((k) => (
        <G key={k} x={720 + k * 100} y={870 + 50 * sag - (k === 1 ? 10 : 0)} s={p(1, 0.6 + k * 0.08) * 0.75}>
          <NumChip fill={k === 1 ? GOLDL : TXT} />
        </G>
      ))}
      <G x={540} y={1110} s={p(1, 0.2)}>
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M${-200 + k * 140} 0 l30 50 l30 -50`} fill="none" stroke={RED} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={0.4 + 0.6 * Math.abs(Math.sin(f / 8 + k))} />
        ))}
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 2 — Tin nhắn Lark, cả chục đoạn chat, tóm tắt chung chung, tự dò lại. */
export const TinNhanLark: React.FC = () => {
  const { f, p, l } = useT();
  const shake = l(0, 0, 4) > 0 && l(0, 0.5, 4) < 1 ? Math.sin(f * 1.8) * 6 : 0;
  const ruler = l(3, 0.1, 50);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={260} y={290} p={p(0, 0.05)} solid size={36} />
      <Tag i={1} x={260} y={900} p={p(0, 0.5)} size={32} />
      <Tag i={2} x={720} y={215} p={p(1, 0.2)} size={34} />
      <Tag i={3} x={720} y={690} p={p(2, 0.3)} size={32} />
      <Tag i={4} x={260} y={1010} p={p(3, 0.1)} size={32} />
      <Tag i={5} x={720} y={1010} p={p(3, 0.5)} solid color={RED} size={34} />
    </>}>
      {/* Điện thoại rung, tin nhắn Lark sáng lên. */}
      <G x={260 + shake} y={500} s={p(0, 0)}>
        <Phone>
          <G x={0} y={-40} s={p(0, 0.1)}>
            <Box cx={0} cy={0} w={180} h={130} rx={18} fill={GOLD} />
            <Lines x={-70} y={-30} w={140} n={3} gap={26} color={INK} t={10} />
          </G>
          <G x={0} y={110} s={p(0, 0.15)}>
            <Bell r={shake * 3} />
          </G>
        </Phone>
      </G>
      <G x={260} y={790} s={p(0, 0.4)}>
        <Clock r={60} hour={15} minute={0} />
      </G>
      {/* Cả chục đoạn chat bật ra quanh màn hình. */}
      {Array.from({ length: 10 }, (_, k) => (
        <G key={k} x={600 + (k % 4) * 80} y={300 + Math.floor(k / 4) * 90 + (k % 2) * 20} s={p(1, k * 0.06) * 0.95} r={(k % 3) - 1}>
          <Win w={210} h={150} stroke={k === 9 ? GOLD : HOV}>
            <Lines x={-80} y={-20} w={160} n={2} gap={30} color={SEC} t={10} />
          </Win>
        </G>
      ))}
      {[0, 1, 2].map((k) => {
        const t = l(1, 0.4 + k * 0.12, 14);
        return t > 0 && t < 1 ? (
          <G key={k} x={lerp(420, 720, t)} y={lerp(1100, 450, t)} s={0.5}>
            <Doc w={120} h={150} n={3} />
          </G>
        ) : null;
      })}
      {/* Bản tóm tắt trơn tru nhưng chỉ toàn vạch đều nhau. */}
      <G x={720} y={845} s={p(2, 0)}>
        <Box cx={0} cy={0} w={440} h={180} rx={20} fill={EL} stroke={HOV} strokeWidth={4} />
        <Lines x={-180} y={-60} w={360} n={4} gap={34} color={TXT} t={12} />
        <G x={lerp(-120, 120, l(2, 0.3, 30))} y={10}>
          <Mag s={0.75} />
        </G>
        <G x={200} y={-90} s={p(3, 0.4) * 0.5}>
          <Question color={RED} />
        </G>
      </G>
      {/* Tự dò lại từng dòng Excel bằng thước. */}
      <G x={260} y={1130} s={p(3, 0)}>
        <Sheet w={320} h={150} cols={4} rows={4} />
        <rect x={-180} y={-80 + ruler * 140} width={360} height={14} rx={7} fill={GOLD} opacity={0.9} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 3 — Không dùng AI sai, chỉ là AI của hôm qua: khung chat hỏi đáp, phần nặng tự bơi. */
export const AiHomQua: React.FC = () => {
  const { f, p, l } = useT();
  const flip = l(1, 0, 16);
  const wave = (x: number) => 1150 + Math.sin(x / 40 + f / 8) * 14;
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={290} y={700} p={p(0, 0.3)} solid size={36} />
      <Tag i={1} x={780} y={215} p={p(1, 0.1)} solid size={38} />
      <Tag i={2} x={780} y={720} p={p(2, 0.05)} size={32} />
      <Tag i={3} x={420} y={860} p={p(2, 0.3)} size={32} />
      <Tag i={4} x={780} y={1010} p={p(2, 0.7)} solid size={34} />
    </>}>
      {/* Tấm gương: người thấy mình; chữ sai bị gạch, thay dấu tích. */}
      <G x={290} y={420} s={p(0, 0)}>
        <ellipse rx={170} ry={220} fill={SURF} stroke={GOLD} strokeWidth={10} />
        <G y={60}>
          <Person fill={SEC} s={1.3} />
        </G>
        <G x={0} y={-130} s={p(0, 0.15)}>
          <Box cx={0} cy={0} w={200} h={50} rx={14} fill={RED} />
          <G s={p(0, 0.45, 9)}>
            <Cross r={30} color={INK} />
          </G>
        </G>
        <G x={110} y={140} s={p(0, 0.65, 9)}>
          <Stamp r={50} />
        </G>
      </G>
      {/* Lịch lật về hôm qua, khung chat cũ mờ màu. */}
      <G x={780} y={360} s={p(1, 0)}>
        <Calendar flip={flip} />
        <G x={150} y={0} r={-l(1, 0, 20) * 300}>
          <path d="M0 -40 A40 40 0 1 0 40 0" fill="none" stroke={GOLDL} strokeWidth={8} strokeLinecap="round" />
        </G>
      </G>
      <G x={780} y={575} s={p(1, 0.4)} o={0.85}>
        <Win w={380} h={220} stroke={HOV}>
          <G x={60} y={-10} s={p(2, 0.1)}>
            <Box cx={0} cy={0} w={180} h={50} rx={18} fill={SEC} />
          </G>
          <G x={-60} y={60} s={p(2, 0.25)}>
            <Box cx={0} cy={0} w={200} h={50} rx={18} fill={HOV} />
          </G>
        </Win>
      </G>
      {/* Phần việc nặng: người một mình đẩy khối việc giữa sóng. */}
      <path d={Array.from({ length: 23 }, (_, i) => `${i ? "L" : "M"}${100 + i * 40} ${wave(100 + i * 40)}`).join(" ")} fill="none" stroke={HOV} strokeWidth={10} strokeLinecap="round" opacity={p(2, 0.5)} />
      <G x={360} y={1080} s={p(2, 0.5)}>
        <Person fill={TXT} s={0.85} />
      </G>
      <G x={500} y={1060} s={p(2, 0.55)} r={Math.sin(f / 10) * 3}>
        <Box cx={0} cy={0} w={180} h={150} rx={14} fill={PAPER} />
        <Lines x={-66} y={-46} w={132} n={4} gap={28} color={SEC} t={10} />
      </G>
      <Floor y={1240} />
    </Stage>
  );
};

/** Cảnh 4 — Bây giờ AI là trợ lý: tự mở file, xử lý, trả thành phẩm; từ hỏi sang giao việc. */
export const GiaoViecChoAi: React.FC = () => {
  const { f, p, l } = useT();
  const open = l(0, 0.25, 14);
  const gear = l(0, 0.45, 40);
  const out = l(0, 0.7, 16);
  const flip = l(1, 0.1, 10);
  return (
    <Stage bg={INK} overlay={<>
      <Tag i={0} x={290} y={360} p={p(0, 0.05)} solid size={36} />
      <Tag i={1} x={720} y={215} p={p(0, 0.3)} size={32} />
      <Tag i={2} x={760} y={740} p={p(0, 0.75)} solid size={32} />
      <Tag i={3} x={290} y={1000} p={p(1, 0.05)} size={32} />
      <Tag i={4} x={790} y={1000} p={p(1, 0.4)} solid size={34} />
    </>}>
      {/* Lịch đã sang hôm nay. */}
      <G x={170} y={220} s={p(0, 0) * 0.6}>
        <Calendar flip={1} />
      </G>
      {/* AI đeo thẻ trợ lý nhận phiếu việc. */}
      <G x={290} y={580} s={p(0, 0)}>
        <path d="M-80 120 Q-80 20 0 20 Q80 20 80 120 Z" fill={TXT} />
        <Box cx={0} cy={70} w={52} h={40} rx={8} fill={GOLD} />
        <G y={70}>
          <Spark r={13} fill={INK} />
        </G>
        <G y={-50}>
          <AI size={120} />
        </G>
        <G x={110} y={40} s={p(0, 0.1)} r={-10}>
          <Box cx={0} cy={0} w={90} h={110} rx={10} fill={PAPER} />
          <Lines x={-30} y={-30} w={60} n={3} gap={24} color={SEC} t={8} />
        </G>
      </G>
      {/* Máy tính: thư mục tự mở, bánh răng xử lý. */}
      <G x={720} y={460}>
        <Box cx={0} cy={0} w={460} h={340} rx={22} fill={EL} stroke={GOLD} strokeWidth={6} />
        <G x={-110} y={0} s={p(0, 0.2)}>
          <Folder s={0.8} open={open} />
        </G>
        <G x={100} y={0} s={p(0, 0.45)}>
          <Gear r={46} rot={gear * 360 + f * 2} />
        </G>
        <G x={160} y={-90} s={p(0, 0.5) * 0.6}>
          <Gear r={30} rot={-gear * 360} fill={GOLDL} />
        </G>
      </G>
      <Box cx={720} cy={650} w={80} h={40} fill={HOV} />
      <Box cx={560} cy={845} w={880} h={24} rx={12} fill={GOLD} />
      {/* Thành phẩm hoàn chỉnh đặt lên bàn, đóng dấu. */}
      <G x={lerp(720, 760, out)} y={lerp(470, 790, out)} s={clamp01(out * 3)}>
        {[0, 1, 2].map((k) => (
          <Box key={k} cx={k * 6} cy={-k * 10} w={220} h={70} rx={10} fill={k === 2 ? TXT : PAPER} />
        ))}
        <G x={80} y={-30} s={p(0, 0.85, 9) * 0.45}>
          <Stamp r={70} />
        </G>
      </G>
      {/* Công tắc: từ hỏi sang giao việc. */}
      <G x={540} y={1110} s={p(1, 0)}>
        <Box cx={0} cy={0} w={460} h={120} rx={60} fill={SURF} stroke={flip > 0.5 ? GOLD : HOV} strokeWidth={6} />
        <G x={lerp(-170, 170, flip)} y={0}>
          <circle r={48} fill={flip > 0.5 ? GOLD : SEC} />
          {flip > 0.5 ? (
            <g>
              <rect x={-20} y={-26} width={40} height={52} rx={6} fill={PAPER} />
              <rect x={-12} y={-12} width={24} height={6} rx={3} fill={SEC} />
              <rect x={-12} y={2} width={24} height={6} rx={3} fill={SEC} />
            </g>
          ) : (
            <G s={0.3}>
              <Question color={INK} />
            </G>
          )}
        </G>
      </G>
      <Floor y={1240} />
    </Stage>
  );
};
