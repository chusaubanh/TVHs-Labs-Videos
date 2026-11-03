import React from "react";
import { AbsoluteFill } from "remotion";
import { Box, EL, G, GOLD, GOLDL, HOV, INK, Lines, RED, SEC, Stage, Tag, TXT, XL, lerp, useT } from "../tro-ly-phap-che/art";
import { Captions } from "./kit";

const ORANGE = "#E07B39";

/** Nhóm hình hiện từ câu `from` và rời đi khi tới câu `until`. */
function usePhase() {
  const { p, l, f, at } = useT();
  const phase = (from: number, until?: number) => (until === undefined ? p(from) : p(from) * (1 - l(until, 0, 10)));
  return { p, l, f, at, phase };
}

const BrollStage: React.FC<{ overlay?: React.ReactNode; children?: React.ReactNode }> = ({ overlay, children }) => (
  <Stage
    overlay={
      <>
        {overlay}
        <Captions />
      </>
    }
  >
    {children}
  </Stage>
);

const Doc: React.FC<{ x: number; y: number; s?: number; o?: number; stroke?: string; lines?: string }> = ({ x, y, s = 1, o = 1, stroke = GOLD, lines = SEC }) => (
  <G x={x} y={y} s={s} o={o}>
    <Box cx={0} cy={0} w={150} h={190} rx={14} fill={EL} stroke={stroke} strokeWidth={3} />
    <Lines x={-50} y={-55} w={100} n={5} gap={24} color={lines} t={9} />
  </G>
);

const Person: React.FC<{ x: number; y: number; s?: number; o?: number; color?: string }> = ({ x, y, s = 1, o = 1, color = GOLDL }) => (
  <G x={x} y={y} s={s} o={o}>
    <circle cx={0} cy={-60} r={34} fill={color} />
    <path d="M-60 40 C-60 -10, 60 -10, 60 40 Z" fill={color} />
  </G>
);

const Check: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = XL }) => (
  <G x={x} y={y} s={s}>
    <circle r={34} fill={color} />
    <path d="M-15 0 L-4 12 L16 -12" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
  </G>
);

const Chat: React.FC<{ x: number; y: number; w?: number; h?: number; s?: number; o?: number; stroke?: string }> = ({ x, y, w = 520, h = 420, s = 1, o = 1, stroke = GOLD }) => (
  <G x={x} y={y} s={s} o={o}>
    <Box cx={0} cy={0} w={w} h={h} rx={22} fill={EL} stroke={stroke} strokeWidth={3} />
    <rect x={-w / 2 + 30} y={-h / 2 + 30} width={w * 0.5} height={50} rx={14} fill={HOV} />
    <rect x={w / 2 - 30 - w * 0.45} y={-h / 2 + 110} width={w * 0.45} height={50} rx={14} fill="rgba(197,160,89,0.35)" />
    <rect x={-w / 2 + 30} y={h / 2 - 80} width={w - 60} height={50} rx={25} fill="#111317" stroke={HOV} strokeWidth={2} />
  </G>
);

/** Trước khi bắt đầu: phần lâu nhất, người đọc được, vài từ sẽ gặp. */
export const TruocKhiBatDau: React.FC = () => {
  const { p, l, f, phase } = usePhase();
  const a = phase(0, 2);
  const save = l(0, 0.35, 30);
  const stack = phase(1, 2);
  const b = phase(2, 4);
  const reader = l(2, 0.35, 16);
  const slide = l(3, 0.1, 20);
  const c = phase(4);
  const pen = l(5, 0.1, 18);
  const sand = (f % 90) / 90;
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={480} y={170} p={a} solid />
          <Tag i={1} x={1320} y={170} p={stack} />
          <Tag i={2} x={1150} y={820} p={stack} />
          <Tag i={3} x={1500} y={820} p={stack} />
          <Tag i={4} x={640} y={170} p={b * reader} solid />
          <Tag i={5} x={1340} y={170} p={b * slide} color={ORANGE} solid />
          <Tag i={6} x={600} y={250} p={c} solid />
          <Tag i={7} x={1320} y={250} p={p(4, 0.4) * c} solid />
          <Tag i={8} x={960} y={820} p={p(5) * c} color={RED} solid />
        </>
      }
    >
      {/* Câu 1: cổng chặn tải tự động, bàn tay lưu từng trang, đồng hồ cát. */}
      <G x={480} y={520} o={Math.min(1, a)} s={a}>
        <Box cx={0} cy={0} w={420} h={300} rx={24} fill={EL} stroke={GOLD} strokeWidth={3} />
        <rect x={-180} y={-120} width={360} height={36} rx={10} fill="#242730" />
        <path d="M-40 -10 L-40 -40 A40 40 0 0 1 40 -40 L40 -10" fill="none" stroke={RED} strokeWidth={10} />
        <rect x={-60} y={-10} width={120} height={90} rx={14} fill={RED} />
        <path d="M150 -60 L150 60 M120 30 L150 60 L180 30" stroke={RED} strokeWidth={8} fill="none" opacity={0.5} />
        <path d="M120 -60 L180 60 M180 -60 L120 60" stroke={RED} strokeWidth={8} />
        <G x={-250} y={60}>
          <path d="M-30 -60 L30 -60 L0 0 L30 60 L-30 60 L0 0 Z" fill="none" stroke={GOLDL} strokeWidth={5} />
          <path d={`M-18 ${-48 + 40 * sand} L18 ${-48 + 40 * sand} L0 -2 Z`} fill={GOLDL} />
          <path d={`M-${22 * sand} 56 L${22 * sand} 56 L0 ${56 - 40 * sand} Z`} fill={GOLDL} />
        </G>
        {/* Bàn tay lưu từng trang: trang đi xuống thư mục bên dưới. */}
        <G x={0} y={lerp(-40, 230, save)} s={0.55} o={Math.min(1, save * 3) * (1 - Math.max(0, save - 0.85) * 6)}>
          <Doc x={0} y={0} />
        </G>
        <G x={0} y={290} o={Math.min(1, save * 2)}>
          <path d="M-90 -40 L-30 -40 L-10 -20 L90 -20 L90 50 L-90 50 Z" fill={EL} stroke={GOLDL} strokeWidth={5} />
          <Person x={150} y={30} s={0.55} />
        </G>
      </G>
      {/* Câu 2: 46 file tách thành 25 văn bản luật và 21 trang cổng. */}
      <G x={1320} y={500} o={Math.min(1, stack)}>
        {Array.from({ length: 10 }, (_, i) => (
          <Doc key={`l${i}`} x={-170 + (i % 2) * 18} y={120 - i * 22 * stack} s={0.8} lines={GOLDL} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <Doc key={`c${i}`} x={170 + (i % 2) * 18} y={120 - i * 26 * stack} s={0.8} stroke={SEC} />
        ))}
      </G>
      {/* Câu 3: văn bản tiếng nước ngoài, người đọc được bước vào thì dấu xác minh sáng. */}
      <G x={640} y={540} o={Math.min(1, b)} s={b}>
        <Box cx={0} cy={0} w={380} h={420} rx={22} fill={EL} stroke={GOLD} strokeWidth={3} />
        {[0, 1, 2, 3, 4, 5].map((r) => (
          <path key={r} d={`M-140 ${-150 + r * 50} q20 -18 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0`} fill="none" stroke={SEC} strokeWidth={5} />
        ))}
        <Person x={lerp(-420, -280, reader)} y={140} s={0.9} o={reader} />
        <G x={150} y={-170} s={reader}>
          <Check x={0} y={0} />
        </G>
      </G>
      {/* Câu 4: thiếu người đọc, các ô trượt xuống sheet Cần kiểm tay. */}
      <G x={1340} y={540} o={Math.min(1, b * slide)}>
        <Box cx={0} cy={60} w={420} h={360} rx={18} fill={EL} stroke={ORANGE} strokeWidth={3} />
        {[0, 1, 2].map((r) => (
          <rect key={r} x={-170} y={lerp(-300, -40 + r * 80, slide)} width={340} height={56} rx={10} fill={ORANGE} opacity={0.85} />
        ))}
      </G>
      {/* Câu 5: hai thẻ từ Vụ và Kho. */}
      <G x={600} y={520} s={c} o={Math.min(1, c)}>
        <Box cx={0} cy={0} w={420} h={300} rx={24} fill={EL} stroke={GOLD} strokeWidth={3} />
        <circle cx={-90} cy={0} r={70} fill="none" stroke={GOLDL} strokeWidth={6} />
        <path d="M-90 -70 L-90 70 M-160 0 L-20 0" stroke={GOLDL} strokeWidth={4} />
        <Doc x={100} y={0} s={0.8} />
      </G>
      <G x={1320} y={520} s={p(4, 0.4) * c} o={Math.min(1, c)}>
        <Box cx={0} cy={0} w={420} h={300} rx={24} fill={EL} stroke={XL} strokeWidth={3} />
        {[0, 1, 2, 3].map((r) => (
          <rect key={r} x={-150} y={80 - r * 50 * Math.min(1, l(4, 0.5, 30) * 4 - r)} width={300} height={36} rx={8} fill="#107C41" opacity={Math.max(0, Math.min(1, l(4, 0.5, 30) * 4 - r))} />
        ))}
      </G>
      {/* Câu 6: ô trống chưa xác minh, cây bút dừng lại. */}
      <G x={960} y={700} s={p(5) * c} o={Math.min(1, p(5) * c)}>
        <rect x={-200} y={-50} width={400} height={100} rx={12} fill="none" stroke={RED} strokeWidth={4} strokeDasharray="14 10" />
        <G x={lerp(320, 230, pen)} y={lerp(-140, -60, pen)} r={-35}>
          <rect x={-14} y={-90} width={28} height={150} rx={6} fill={GOLDL} />
          <path d="M-14 60 L0 90 L14 60 Z" fill={TXT} />
        </G>
        <path d="M150 -150 L250 -50 M250 -150 L150 -50" stroke={RED} strokeWidth={10} opacity={pen} />
      </G>
    </BrollStage>
  );
};

/** Mỗi vụ một cuộc chat: New → Project or folder → project Trợ lý Pháp chế. */
export const MoChatMoi: React.FC = () => {
  const { p, l, phase } = usePhase();
  const shrink = l(0, 0.05, 18);
  const menu = l(0, 0.35, 14);
  const pick = l(0, 0.65, 12);
  const row = phase(1);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={1240} y={150} p={p(0) * (1 - row)} solid />
          <Tag i={1} x={1240} y={820} p={p(0, 0.35) * (1 - row)} />
          <Tag i={2} x={960} y={150} p={row} solid />
        </>
      }
    >
      <G o={1 - row}>
        <Chat x={lerp(960, 430, shrink)} y={500} w={620} h={560} s={lerp(1.1, 0.85, shrink)} o={lerp(1, 0.5, shrink)} />
        <G x={1240} y={490} s={p(0)}>
          <Chat x={0} y={0} w={760} h={600} stroke={GOLDL} />
          <G x={0} y={0} s={menu} o={menu}>
            <Box cx={0} cy={50} w={520} h={300} rx={18} fill="#111317" stroke={GOLD} strokeWidth={3} />
            {[0, 1, 2].map((r) => (
              <rect key={r} x={-230} y={-70 + r * 84} width={460} height={64} rx={12} fill={r === 2 && pick > 0.5 ? GOLD : HOV} />
            ))}
          </G>
        </G>
      </G>
      {/* Câu 2: chuỗi khung chat, mỗi khung một vụ. */}
      {[0, 1, 2, 3].map((i) => (
        <G key={i} x={300 + i * 440} y={540} s={0.8 * Math.max(0, Math.min(1, row * 4 - i))} o={row}>
          <Chat x={0} y={0} w={500} h={680} />
          <circle cx={0} cy={-390} r={34} fill={[GOLD, XL, ORANGE, GOLDL][i]} />
        </G>
      ))}
    </BrollStage>
  );
};

/** Bước 8-9: đối chiếu đoạn trích và đánh dấu từng dòng. */
export const DoiChieuVaDanhDau: React.FC = () => {
  const { p, l, phase } = usePhase();
  const a = phase(0, 2);
  const hl = l(0, 0.3, 16);
  const link = l(1, 0.1, 18);
  const reader = l(1, 0.5, 16);
  const b = phase(2, 3);
  const pick = [p(2, 0.1), p(2, 0.4), p(2, 0.7)];
  const c = phase(3);
  const tick = l(3, 0.2, 10);
  const block = l(3, 0.6, 10);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={560} y={170} p={a * hl} solid />
          <Tag i={1} x={1400} y={170} p={a * reader} />
          <Tag i={2} x={1300} y={330} p={b * pick[0]} color={XL} solid />
          <Tag i={3} x={1300} y={510} p={b * pick[1]} solid />
          <Tag i={4} x={1300} y={690} p={b * pick[2]} color={RED} solid />
          <Tag i={5} x={960} y={170} p={c} solid />
        </>
      }
    >
      {/* Câu 1: thanh tìm kiếm trên trang gốc, đoạn trích sáng vàng. */}
      <G x={560} y={530} s={a} o={Math.min(1, a)}>
        <Box cx={0} cy={0} w={560} h={520} rx={22} fill={EL} stroke={GOLD} strokeWidth={3} />
        <rect x={-240} y={-230} width={480} height={50} rx={12} fill="#111317" stroke={GOLDL} strokeWidth={2} />
        <rect x={-220} y={-216} width={200 * hl} height={22} rx={8} fill={GOLDL} />
        {[0, 1, 2, 3, 4, 5, 6].map((r) => (
          <rect key={r} x={-230} y={-140 + r * 50} width={r === 3 ? 460 : 400 - (r % 3) * 40} height={18} rx={9} fill={r === 3 ? GOLDL : SEC} opacity={r === 3 ? 0.4 + 0.6 * hl : 0.6} />
        ))}
      </G>
      {/* Câu 2: đường nối sang ô trong sheet, dấu hỏi tới khi người đọc kiểm xong. */}
      <G o={Math.min(1, a)}>
        <path d={`M840 ${530} C 1000 ${530}, 1100 520, ${lerp(840, 1240, link)} 520`} stroke={GOLDL} strokeWidth={5} strokeDasharray="16 12" fill="none" />
        <G x={1400} y={520} s={link}>
          <Box cx={0} cy={0} w={300} h={110} rx={14} fill={EL} stroke={GOLD} strokeWidth={3} />
          <Lines x={-110} y={-20} w={220} n={2} gap={30} color={SEC} />
        </G>
        <G x={1040} y={420} s={link * (1 - reader)}>
          <circle r={40} fill={HOV} />
          <path d="M-12 -12 A14 14 0 1 1 6 4 L0 12 M0 26 L0 28" stroke={GOLDL} strokeWidth={7} fill="none" strokeLinecap="round" />
        </G>
        <Person x={1040} y={760} s={0.9 * reader} o={reader} />
        <Check x={1040} y={420} s={reader} />
      </G>
      {/* Câu 3: cột Chuyên viên duyệt, ba lựa chọn ở ba dòng. */}
      <G x={700} y={510} s={b} o={Math.min(1, b)}>
        <Box cx={0} cy={0} w={700} h={600} rx={22} fill={EL} stroke={GOLD} strokeWidth={3} />
        {[0, 1, 2].map((r) => (
          <G key={r} x={0} y={-180 + r * 180}>
            <rect x={-310} y={-50} width={420} height={100} rx={12} fill="#181B22" />
            <Lines x={-280} y={-20} w={360} n={2} gap={30} color={SEC} />
            <rect x={140} y={-40} width={160} height={80} rx={12} fill={[XL, GOLD, RED][r]} opacity={0.25 + 0.75 * pick[r]} />
          </G>
        ))}
      </G>
      {/* Câu 4: ô trống thành ô đánh dấu, dòng chưa mở link bị chặn. */}
      <G x={960} y={540} s={c} o={Math.min(1, c)}>
        <Box cx={0} cy={0} w={900} h={420} rx={22} fill={EL} stroke={GOLD} strokeWidth={3} />
        <G x={0} y={-90}>
          <Lines x={-380} y={-10} w={500} n={1} color={SEC} t={20} />
          <rect x={250} y={-40} width={80} height={80} rx={12} fill="none" stroke={GOLDL} strokeWidth={5} />
          <path d="M268 0 L285 20 L315 -20" stroke={XL} strokeWidth={9} fill="none" strokeLinecap="round" opacity={tick} />
        </G>
        <G x={0} y={90} o={block}>
          <Lines x={-380} y={-10} w={500} n={1} color={SEC} t={20} />
          <rect x={250} y={-40} width={80} height={80} rx={12} fill="none" stroke={RED} strokeWidth={5} />
          <path d="M240 -50 L340 50" stroke={RED} strokeWidth={9} />
        </G>
      </G>
    </BrollStage>
  );
};

/** Bước 10: báo cáo kiểm, mục D sang khung chat; mục A và C chỉ tới ô Excel. */
export const BaoCaoKiem: React.FC = () => {
  const { p, l, phase } = usePhase();
  const doc = p(0);
  const scroll = l(0, 0.3, 20);
  const fly = l(0, 0.65, 18);
  const b = phase(1);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={560} y={170} p={doc} solid />
          <Tag i={1} x={560} y={790} p={p(0, 0.3)} />
          <Tag i={2} x={400} y={250} p={b} color={GOLDL} solid />
          <Tag i={3} x={720} y={250} p={b} color={GOLDL} solid />
        </>
      }
    >
      <G x={560} y={520} s={doc}>
        <Box cx={0} cy={0} w={520} h={540} rx={22} fill={EL} stroke={GOLD} strokeWidth={3} />
        {["A", "B", "C", "D"].map((_, r) => {
          const y = -200 + r * 120 - scroll * 160 * (1 - b);
          const lit = r === 3 ? 1 - b : r === 0 || r === 2 ? b : 0;
          return (
            <G key={r} x={0} y={y}>
              <rect x={-220} y={-40} width={440} height={90} rx={12} fill={lit > 0.5 ? "rgba(197,160,89,0.25)" : "#181B22"} stroke={lit > 0.5 ? GOLDL : "transparent"} strokeWidth={3} />
              <circle cx={-180} cy={5} r={20} fill={GOLD} />
              <Lines x={-140} y={-10} w={320} n={2} gap={26} color={SEC} />
            </G>
          );
        })}
      </G>
      {/* Câu hỏi bay sang khung chat thành câu trả lời. */}
      <G o={1 - b}>
        <Chat x={1380} y={520} s={p(0, 0.5)} />
        <rect x={lerp(560, 1300, fly) - 90} y={lerp(560, 520, fly) - 25} width={180} height={50} rx={12} fill={GOLDL} opacity={Math.min(1, fly * 3) * (1 - fly * 0.3)} />
      </G>
      {/* Câu 2: mục A và C chỉ tới các ô trong Excel. */}
      <G x={1380} y={520} s={b} o={Math.min(1, b)}>
        <Box cx={0} cy={0} w={520} h={460} rx={18} fill={EL} stroke="#107C41" strokeWidth={4} />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={-220 + (i % 4) * 112} y={-170 + Math.floor(i / 4) * 120} width={100} height={100} rx={8} fill={i === 1 || i === 6 ? ORANGE : i === 9 ? GOLDL : HOV} opacity={i === 1 || i === 6 || i === 9 ? 0.9 : 0.5} />
        ))}
      </G>
      <path d={`M800 330 C 1000 300, 1050 360, 1270 ${380}`} stroke={GOLDL} strokeWidth={5} fill="none" strokeDasharray="14 10" opacity={b} />
      <path d={`M800 570 C 1000 600, 1100 520, 1240 ${500}`} stroke={GOLDL} strokeWidth={5} fill="none" strokeDasharray="14 10" opacity={b} />
    </BrollStage>
  );
};

/** Bước 12-13: Kho ghi gì theo từng lựa chọn, cột Được phép sử dụng. */
export const KetQuaTrongKho: React.FC = () => {
  const { p, l, phase } = usePhase();
  const kho = phase(0, 3);
  const r1 = l(0, 0.1, 18);
  const r2 = l(1, 0.1, 18);
  const r3 = l(1, 0.55, 18);
  const back = phase(2, 3);
  const col = phase(3);
  const vals = [p(3, 0.15), p(3, 0.35), p(3, 0.6)];
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={1360} y={300} p={kho * r1} color={XL} solid />
          <Tag i={1} x={1360} y={470} p={kho * r2} solid />
          <Tag i={2} x={1360} y={640} p={kho * r3} color={RED} solid />
          <Tag i={3} x={500} y={170} p={back} color={RED} solid />
          <Tag i={4} x={960} y={170} p={col} solid />
          <Tag i={5} x={960} y={540} p={col * vals[1]} color={GOLDL} solid />
          <Tag i={6} x={1460} y={540} p={col * vals[1]} />
        </>
      }
    >
      {/* Két Kho ở giữa, ba dòng trượt vào theo ba lựa chọn. */}
      <G x={860} y={480} s={kho} o={Math.min(1, kho)}>
        <Box cx={0} cy={0} w={420} h={480} rx={26} fill={EL} stroke={GOLD} strokeWidth={4} />
        <circle cx={0} cy={0} r={90} fill="none" stroke={GOLDL} strokeWidth={8} />
        <path d="M0 -90 L0 90 M-90 0 L90 0" stroke={GOLDL} strokeWidth={4} opacity={1 - back} />
        <rect x={-200} y={-230} width={400} height={460} rx={24} fill={INK} opacity={back * 0.8} />
      </G>
      {[
        [r1, -150, XL],
        [r2, 0, GOLD],
        [r3, 150, RED],
      ].map(([t, dy, color], i) => (
        <G key={i} x={lerp(300, 860, t as number)} y={480 + (dy as number)} o={Math.min(1, kho) * (i === 2 ? lerp(1, 0.45, r3) : 1)}>
          <rect x={-130} y={-34} width={260} height={68} rx={12} fill="#181B22" stroke={color as string} strokeWidth={4} />
          <Lines x={-100} y={-8} w={200} n={1} color={SEC} t={14} />
        </G>
      ))}
      {/* Bản cũ của dòng Đã sửa trượt sang sheet lịch sử. */}
      <G x={lerp(860, 1120, r2)} y={480} o={Math.min(1, kho) * r2 * 0.6}>
        <rect x={-110} y={-30} width={220} height={60} rx={10} fill="none" stroke={SEC} strokeWidth={3} strokeDasharray="10 8" />
      </G>
      {/* Câu 3: mũi tên quay ngược về Claude, cửa Kho đóng. */}
      <path d="M640 760 C 520 860, 360 840, 300 720" stroke={RED} strokeWidth={8} fill="none" opacity={back} />
      <path d="M280 760 L300 720 L340 750" stroke={RED} strokeWidth={8} fill="none" opacity={back} />
      {/* Câu 4: cột Được phép sử dụng với ba giá trị. */}
      <G x={960} y={540} o={Math.min(1, col)}>
        <Box cx={0} cy={0} w={1300} h={520} rx={22} fill={EL} stroke={GOLD} strokeWidth={3} />
        {[0, 1, 2].map((r) => (
          <G key={r} x={-500} y={-160 + r * 160} s={vals[r]}>
            <rect x={-60} y={-50} width={240} height={100} rx={14} fill={[XL, GOLDL, RED][r]} opacity={0.85} />
          </G>
        ))}
        <path d="M120 0 L330 0" stroke={GOLDL} strokeWidth={6} opacity={vals[1]} />
        <path d="M310 -16 L332 0 L310 16" stroke={GOLDL} strokeWidth={6} fill="none" opacity={vals[1]} />
      </G>
    </BrollStage>
  );
};

/** Bước 14: kiểm lại hiệu lực trong chat mới. */
export const KiemHieuLuc: React.FC = () => {
  const { p, l, f, phase } = usePhase();
  const a = phase(0, 1);
  const b = phase(1, 2);
  const c = phase(2, 3);
  const d = phase(3);
  const compare = l(1, 0.15, 20);
  const split = l(2, 0.15, 20);
  const strike = l(3, 0.3, 14);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={960} y={170} p={a} solid />
          <Tag i={1} x={1460} y={330} p={b * compare} />
          <Tag i={2} x={1460} y={560} p={b * compare} />
          <Tag i={3} x={1200} y={170} p={c * split} color={GOLDL} solid />
          <Tag i={4} x={960} y={170} p={d} />
        </>
      }
    >
      <Chat x={960} y={520} w={1100} h={600} s={a} o={Math.min(1, a)} stroke={GOLDL} />
      {/* Câu 1: câu lệnh được gõ dần vào ô nhập. */}
      <rect x={440} y={738} width={1040 * l(0, 0.1, 40)} height={34} rx={10} fill={GOLDL} opacity={Math.min(1, a)} />
      <rect x={440 + 1040 * l(0, 0.1, 40) + 6} y={734} width={4} height={42} fill={TXT} opacity={Math.min(1, a) * (Math.floor(f / 8) % 2)} />
      {/* Câu 2: link mở cạnh bản đã lưu, dấu ngày kiểm ghi vào sổ. */}
      <G o={Math.min(1, b)}>
        <Doc x={lerp(700, 430, compare)} y={500} s={2.4} />
        <Doc x={lerp(700, 900, compare)} y={500} s={2.4} stroke={XL} />
        <path d="M560 500 L740 500" stroke={GOLDL} strokeWidth={6} strokeDasharray="12 10" opacity={compare} />
        <G x={1250} y={480} s={compare * 1.6}>
          <rect x={-60} y={-60} width={120} height={120} rx={16} fill={GOLD} />
          <rect x={-40} y={-30} width={80} height={60} rx={6} fill={INK} />
        </G>
      </G>
      {/* Câu 3: dòng có thay đổi tách ra bản mới chờ phê duyệt. */}
      <G o={Math.min(1, c)}>
        <Box cx={960} cy={500} w={1400} h={560} rx={24} fill={EL} stroke={GOLD} strokeWidth={3} />
        {[0, 1, 2, 3].map((r) => (
          <rect key={r} x={340} y={290 + r * 110} width={560} height={84} rx={12} fill="#181B22" stroke={r === 1 ? GOLD : HOV} strokeWidth={4} />
        ))}
        <rect x={lerp(340, 1020, split)} y={400} width={560} height={84} rx={12} fill="#181B22" stroke={GOLDL} strokeWidth={5} strokeDasharray="16 10" opacity={split} />
        <path d="M1300 500 C 1400 640, 1200 720, 900 700" stroke={GOLDL} strokeWidth={6} fill="none" opacity={split} />
      </G>
      {/* Câu 4: ngày đăng mới bị gạch, không đủ để kết luận bản mới nhất. */}
      <G x={960} y={520} s={d * 1.7} o={Math.min(1, d)}>
        <Box cx={0} cy={0} w={520} h={300} rx={22} fill={EL} stroke={GOLD} strokeWidth={3} />
        <rect x={-180} y={-80} width={360} height={60} rx={10} fill={HOV} />
        <path d="M-180 -50 L180 -50" stroke={RED} strokeWidth={10} strokeLinecap="round" opacity={strike} transform={`scale(${strike} 1)`} />
        <circle cx={0} cy={70} r={50} fill="none" stroke={RED} strokeWidth={8} opacity={strike} />
        <path d="M-35 105 L35 35" stroke={RED} strokeWidth={8} opacity={strike} />
      </G>
    </BrollStage>
  );
};

/** Khi gặp sự cố: tài khoản công ty, trạm dừng bình thường, Out of Scope. */
export const KhiGapSuCo: React.FC = () => {
  const { p, l } = usePhase();
  const a = p(0);
  const swap = l(0, 0.4, 16);
  const b = p(1);
  const c = p(2);
  const out = l(2, 0.4, 14);
  return (
    <BrollStage
      overlay={
        <>
          <Tag i={0} x={380} y={760} p={a * swap} color={XL} solid />
          <Tag i={1} x={960} y={760} p={b} solid />
          <Tag i={2} x={1540} y={760} p={c * out} color={RED} solid />
        </>
      }
    >
      {/* Thẻ tài khoản cá nhân đổi thành tài khoản công ty. */}
      <G x={380} y={460} s={a}>
        <Box cx={0} cy={0} w={420} h={420} rx={24} fill={EL} stroke={GOLD} strokeWidth={3} />
        <Person x={0} y={20} s={1.3} color={lerp(0, 1, swap) > 0.5 ? XL : SEC} />
        <rect x={-150} y={-180} width={300} height={44} rx={12} fill={RED} opacity={1 - swap} />
      </G>
      {/* Trạm dừng có dấu tích bình thường. */}
      <G x={960} y={460} s={b}>
        <path d="M-100 -240 L100 -240 L240 -100 L240 100 L100 240 L-100 240 L-240 100 L-240 -100 Z" transform="scale(0.8)" fill={RED} opacity={0.9} />
        <Check x={0} y={0} s={2.2} color={TXT} />
      </G>
      {/* Lưới 6 x 6, một ô ngoài lưới bị đóng dấu. */}
      <G x={1500} y={460} s={c}>
        {Array.from({ length: 36 }, (_, i) => (
          <rect key={i} x={-180 + (i % 6) * 60} y={-180 + Math.floor(i / 6) * 60} width={50} height={50} rx={6} fill={GOLD} opacity={0.55} />
        ))}
        <rect x={210} y={-260} width={60} height={60} rx={8} fill={HOV} stroke={RED} strokeWidth={4} />
        <path d="M200 -270 L280 -190 M280 -270 L200 -190" stroke={RED} strokeWidth={8} opacity={out} />
      </G>
    </BrollStage>
  );
};
