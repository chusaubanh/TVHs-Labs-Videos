import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { Label } from "../../kit/scene-context";
import {
  BORDER_COLOR,
  CARD_BG,
  FullScreenClipStage,
  GLASS_BG,
  GOLD,
  GOLDL,
  GREEN,
  INK,
  RED,
  SEC,
  SURF,
  TXT,
  VideoStage,
  useT,
} from "./kit";
import { Box, Doc, EL, G, HOV, Lines, Spark, Tag, XL, lerp } from "../shared/art";
import { Cursor, NumChip, Win } from "../bai-1/art";

const PANEL_BG = "#222530";
const BLUE = "#3B82F6";

/** Cảnh 1: Hook B-roll nghệ thuật — AI Director & Quy trình sản xuất tự động */
export const HookGioiThieu: React.FC = () => {
  const { f, p, l } = useT();

  const titleP = p(0, 0.02);
  const subP = p(0, 0.15);
  const coreP = p(0, 0.25);
  const pillarsP = p(1, 0.05);

  // Hiệu ứng xoay tròn đa tầng của AI Core
  const rot1 = (f * 0.6) % 360;
  const rot2 = (-f * 0.4) % 360;
  const pulse = 1 + 0.03 * Math.sin(f * 0.12);

  return (
    <VideoStage
      overlay={
        <>
          <Tag i={0} x={960} y={130} p={titleP} size={44} solid />
          <Tag i={1} x={960} y={230} p={subP} size={32} />

          {/* 3 thẻ trụ cột bên dưới */}
          <Tag i={2} x={440} y={870} p={pillarsP} size={32} solid />
          <Tag i={3} x={960} y={870} p={pillarsP} size={32} solid color={GREEN} />
          <Tag i={4} x={1480} y={870} p={pillarsP} size={32} solid color={RED} />
        </>
      }
    >
      {/* Vùng nền minh họa công nghệ trung tâm */}
      <G x={960} y={530} s={titleP}>
        {/* Khung panel lớn */}
        <Box cx={0} cy={0} w={1620} h={680} rx={28} fill={PANEL_BG} stroke={GOLD} strokeWidth={4} />

        {/* Luồng kết nối dữ liệu từ Trái (Input Doc) -> Giữa (AI Core) -> Phải (Output Video) */}
        <path
          d="M -540 0 C -300 -120, -200 0, 0 0 C 200 0, 300 -120, 540 0"
          fill="none"
          stroke="rgba(197, 160, 89, 0.4)"
          strokeWidth={6}
          strokeDasharray="12 12"
        />

        {/* Bên Trái: Tập tài liệu nguồn bay vào */}
        <G x={-540} y={0} s={coreP * 1.1}>
          <Doc w={200} h={260} n={5} fill="#F4EEDC" />
          <rect x={-80} y={-100} width={160} height={28} rx={8} fill={GOLD} />
          <G x={-50} y={-86} s={0.8}><Spark r={12} fill={INK} /></G>
          {/* Nhãn nhỏ mô tả */}
          <rect x={-60} y={145} width={120} height={30} rx={8} fill="rgba(12,12,12,0.8)" />
          <circle cx={-40} cy={160} r={5} fill={GOLDL} />
        </G>

        {/* Trung tâm: Quả cầu AI Core đa tầng phát sáng */}
        <G x={0} y={0} s={coreP * pulse}>
          {/* Hào quang nền */}
          <circle cx={0} cy={0} r={170} fill="rgba(197, 160, 89, 0.08)" />
          {/* Vòng ngoài xoay */}
          <g transform={`rotate(${rot1})`}>
            <circle cx={0} cy={0} r={140} fill="none" stroke={GOLDL} strokeWidth={4} strokeDasharray="40 20" />
            <circle cx={140} cy={0} r={9} fill={GOLD} />
            <circle cx={-140} cy={0} r={9} fill={GOLD} />
          </g>
          {/* Vòng trong xoay ngược */}
          <g transform={`rotate(${rot2})`}>
            <circle cx={0} cy={0} r={105} fill="none" stroke={GREEN} strokeWidth={4} strokeDasharray="25 15" />
            <circle cx={0} cy={105} r={8} fill={GREEN} />
            <circle cx={0} cy={-105} r={8} fill={GREEN} />
          </g>
          {/* Nhân AI phát sáng */}
          <circle cx={0} cy={0} r={70} fill={INK} stroke={GOLD} strokeWidth={5} />
          <G x={0} y={0} s={1.6}><Spark r={26} fill={GOLDL} /></G>
        </G>

        {/* Bên Phải: Màn hình Video Player thành phẩm xuất xưởng */}
        <G x={540} y={0} s={coreP * 1.1}>
          <Win w={280} h={200} stroke={GOLD}>
            {/* Khung phát video bên trong */}
            <Box cx={0} cy={15} w={250} h={140} rx={12} fill="#141720" />
            {/* Nút Play phát sáng */}
            <circle cx={0} cy={15} r={32} fill={GOLD} />
            <path d="M -8 1 L -8 29 L 16 15 Z" fill={INK} />
            {/* Sóng âm thanh VieNeu bên dưới */}
            {[-40, -20, 0, 20, 40].map((dx, i) => (
              <rect
                key={i}
                x={dx - 4}
                y={65}
                width={8}
                height={16 + 10 * Math.sin(f * 0.2 + i)}
                rx={4}
                fill={GREEN}
              />
            ))}
          </Win>
        </G>

        {/* 3 khối đế bên dưới tương ứng với 3 nhãn Remotion, VieNeu, Chế độ C */}
        <G x={-520} y={230} s={pillarsP}>
          <Box cx={0} cy={0} w={380} h={110} rx={16} fill="#181B24" stroke={GOLDL} strokeWidth={2} />
          <Lines x={-150} y={-20} w={300} n={2} gap={28} color={SEC} t={10} />
        </G>
        <G x={0} y={230} s={pillarsP}>
          <Box cx={0} cy={0} w={380} h={110} rx={16} fill="#181B24" stroke={GREEN} strokeWidth={2} />
          <Lines x={-150} y={-20} w={300} n={2} gap={28} color={SEC} t={10} />
        </G>
        <G x={520} y={230} s={pillarsP}>
          <Box cx={0} cy={0} w={380} h={110} rx={16} fill="#181B24" stroke={RED} strokeWidth={2} />
          <Lines x={-150} y={-20} w={300} n={2} gap={28} color={SEC} t={10} />
        </G>
      </G>
    </VideoStage>
  );
};

/** Cảnh 2: Điều kiện tiên quyết B-roll — Trạm điều hành AI thông minh & Môi trường tự động */
export const DieuKienMoiTruong: React.FC = () => {
  const { f, p } = useT();

  const titleP = p(0, 0.02);
  const cardLeft = p(0, 0.15);
  const cardRight = p(0, 0.28);
  const readyP = p(1, 0.08);

  const rot = (f * 0.8) % 360;
  const pulse = 1 + 0.04 * Math.sin(f * 0.15);

  return (
    <VideoStage
      overlay={
        <>
          <Tag i={0} x={960} y={130} p={titleP} size={42} solid />

          {/* 3 nhãn điều phối môi trường */}
          <Tag i={1} x={520} y={320} p={cardLeft} size={32} />
          <Tag i={2} x={1400} y={320} p={cardRight} size={32} solid color={GREEN} />
          <Tag i={3} x={960} y={870} p={readyP} size={36} solid color={GOLD} />
        </>
      }
    >
      <G x={960} y={540} s={titleP}>
        {/* Khung panel lớn */}
        <Box cx={0} cy={0} w={1620} h={680} rx={28} fill={PANEL_BG} stroke={GOLD} strokeWidth={4} />

        {/* Thanh tiêu đề trạm điều hành */}
        <Box cx={0} cy={-280} w={1620} h={80} rx={24} fill="#1A1D27" />
        <rect x={-760} y={-295} width={340} height={30} rx={15} fill={HOV} />
        <circle cx={740} cy={-280} r={12} fill={GREEN} />
        <circle cx={700} cy={-280} r={12} fill={GOLD} />
        <circle cx={660} cy={-280} r={12} fill={RED} />

        {/* Luồng tín hiệu kết nối trung tâm */}
        <path
          d="M -440 -40 C -200 -40, -150 0, 0 0 C 150 0, 200 -40, 440 -40"
          fill="none"
          stroke={GOLDL}
          strokeWidth={4}
          strokeDasharray="12 8"
        />

        {/* Module Trái: Chuẩn bị môi trường & Thư mục làm việc */}
        <G x={-440} y={-40} s={cardLeft}>
          <Box cx={0} cy={0} w={480} h={320} rx={22} fill="#181B26" stroke={BLUE} strokeWidth={3} />
          {/* Biểu tượng Workspace kết nối */}
          <rect x={-70} y={-90} width={140} height={100} rx={14} fill="rgba(59, 130, 246, 0.2)" stroke={BLUE} strokeWidth={3} />
          <circle cx={0} cy={-40} r={22} fill={BLUE} />
          <Lines x={-160} y={40} w={320} n={3} gap={24} color={SEC} t={10} />
        </G>

        {/* Lõi AI Điều Phối Trung Tâm (AI Orchestrator) */}
        <G x={0} y={0} s={cardLeft * pulse}>
          <circle cx={0} cy={0} r={95} fill="#141722" stroke={GOLD} strokeWidth={4} />
          <g transform={`rotate(${rot})`}>
            <circle cx={0} cy={0} r={75} fill="none" stroke={GOLDL} strokeWidth={2.5} strokeDasharray="24 14" />
            <circle cx={75} cy={0} r={6} fill={GOLD} />
            <circle cx={-75} cy={0} r={6} fill={GOLD} />
          </g>
          <G x={0} y={0} s={1.1}><Spark r={24} fill={GOLDL} /></G>
        </G>

        {/* Module Phải: Tự động kiểm tra & Chẩn đoán hệ thống */}
        <G x={440} y={-40} s={cardRight}>
          <Box cx={0} cy={0} w={480} h={320} rx={22} fill="#181B26" stroke={GREEN} strokeWidth={3} />
          {/* Biểu tượng Kiểm tra tự động */}
          <circle cx={0} cy={-40} r={48} fill="rgba(34, 197, 94, 0.2)" stroke={GREEN} strokeWidth={3} />
          <path d="M -18 -40 L -4 -24 L 20 -52" fill="none" stroke={GREEN} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          <Lines x={-160} y={40} w={320} n={3} gap={24} color={SEC} t={10} />
        </G>

        {/* Thanh trạng thái sẵn sàng ở dưới cùng */}
        <G x={0} y={200} s={readyP}>
          <Box cx={0} cy={0} w={1420} h={64} rx={32} fill="rgba(34, 197, 94, 0.15)" stroke={GREEN} strokeWidth={2.5} />
          <circle cx={-620} cy={0} r={12} fill={GREEN} />
          <circle cx={620} cy={0} r={12} fill={GREEN} />
        </G>
      </G>
    </VideoStage>
  );
};

/** Cảnh 3: Bước 1: Giải nén mã nguồn (Screencast TOÀN PHẦN) */
export const GiaiNenMaNguon: React.FC = () => (
  <FullScreenClipStage
    shots={[
      { from: 0, to: 10 },
      { from: 18, to: 28 },
    ]}
    stepTitle="BƯỚC 1: GIẢI NÉN MÃ NGUỒN"
    tags={[
      [1, 0, 1520, 130, GLASS_BG, TXT, "📦"],
      [2, 0, 1520, 220, GLASS_BG, GOLDL, "📁"],
      [3, 1, 1340, 310, GLASS_BG, GOLDL, "📁"],
      [4, 1, 1520, 310, GLASS_BG, GOLDL, "📁"],
      [5, 1, 1700, 310, GLASS_BG, GREEN, "📁"],
    ]}
  />
);

/** Cảnh 4: Bước 2: Tạo phiên làm việc mới trên công cụ AI (Screencast TOÀN PHẦN) */
export const CaiDatTuDong: React.FC = () => (
  <FullScreenClipStage
    shots={[
      { from: 33, to: 45 },
      { from: 45, to: 55 },
    ]}
    stepTitle="BƯỚC 2: TẠO PHIÊN LÀM VIỆC TRÊN AI"
    tags={[
      [1, 0, 1500, 130, GLASS_BG, GREEN, "📁"],
      [2, 0, 1500, 220, GLASS_BG, GOLDL, "📂"],
      [3, 1, 1500, 310, GLASS_BG, TXT, "⚡"],
    ]}
  />
);

/** Cảnh 5: Bước 3: Giao việc cho AI cài đặt và kiểm tra hệ thống (Screencast TOÀN PHẦN) */
export const KiemTraDoctor: React.FC = () => (
  <FullScreenClipStage
    shots={[
      { from: 62, to: 75 },
      { from: 115, to: 130, tick: true },
    ]}
    stepTitle="BƯỚC 3: GIAO VIỆC CÀI ĐẶT & KIỂM TRA HỆ THỐNG"
    tags={[
      [1, 0, 1500, 130, GLASS_BG, GREEN, "🩺"],
      [2, 0, 1500, 220, GLASS_BG, GOLDL, "🎮"],
      [3, 1, 1500, 310, GLASS_BG, GREEN, "🚀"],
    ]}
  />
);

/** Cảnh 6: Quy trình 18 nhân sự AI Specialist B-roll — Sơ đồ luồng Multi-Agent đa tầng */
export const AiAgentQuyTrinh: React.FC = () => {
  const { f, p } = useT();

  const titleP = p(0, 0.02);
  const flowP = p(0, 0.15);
  const card1 = p(0, 0.25);
  const card2 = p(1, 0.08);

  const pulse = 1 + 0.04 * Math.sin(f * 0.15);

  return (
    <VideoStage
      overlay={
        <>
          <Tag i={0} x={960} y={130} p={titleP} size={42} solid />

          {/* 2 thẻ vai trò và phê duyệt */}
          <Tag i={1} x={580} y={870} p={card1} size={34} />
          <Tag i={2} x={1340} y={870} p={card2} size={34} solid color={GREEN} />
        </>
      }
    >
      <G x={960} y={520} s={titleP}>
        {/* Khung panel lớn */}
        <Box cx={0} cy={0} w={1620} h={680} rx={28} fill={PANEL_BG} stroke={GOLD} strokeWidth={4} />

        {/* 4 Trạm AI Specialist liên hoàn: S1-S2, S3, S4-S5, S6-S7 */}
        <path
          d="M -540 0 L -180 0 L 180 0 L 540 0"
          fill="none"
          stroke={GOLDL}
          strokeWidth={6}
          strokeDasharray="14 10"
        />

        {/* Trạm 1: Content & Script (S1-S2) */}
        <G x={-540} y={0} s={flowP}>
          <Box cx={0} cy={0} w={320} h={400} rx={22} fill="#181B26" stroke={GOLDL} strokeWidth={3} />
          <Doc w={140} h={180} n={4} fill="#F4EEDC" />
          <rect x={-50} y={-60} width={100} height={20} rx={6} fill={GOLD} />
          <rect x={-110} y={120} width={220} height={36} rx={10} fill="rgba(197, 160, 89, 0.25)" />
        </G>

        {/* Trạm 2: Voice & Sound (S3) */}
        <G x={-180} y={0} s={flowP}>
          <Box cx={0} cy={0} w={320} h={400} rx={22} fill="#181B26" stroke={GREEN} strokeWidth={3} />
          {/* Sóng âm thanh VieNeu */}
          <circle cx={0} cy={-20} r={55} fill="none" stroke={GREEN} strokeWidth={4} />
          <circle cx={0} cy={-20} r={35} fill="none" stroke={GREEN} strokeWidth={4} />
          <G x={0} y={-20} s={1.2}><Spark r={18} fill={GREEN} /></G>
          <rect x={-110} y={120} width={220} height={36} rx={10} fill="rgba(34, 197, 94, 0.25)" />
        </G>

        {/* Trạm 3: Remotion Graphics (S4-S5) */}
        <G x={180} y={0} s={flowP}>
          <Box cx={0} cy={0} w={320} h={400} rx={22} fill="#181B26" stroke={BLUE} strokeWidth={3} />
          <Win w={180} h={140} stroke={BLUE}>
            <Box cx={0} cy={10} w={150} h={80} rx={8} fill="#10131C" />
            <circle cx={0} cy={10} r={18} fill={BLUE} />
          </Win>
          <rect x={-110} y={120} width={220} height={36} rx={10} fill="rgba(59, 130, 246, 0.25)" />
        </G>

        {/* Trạm 4: QA & QC Critic (S6-S7) */}
        <G x={540} y={0} s={flowP * pulse}>
          <Box cx={0} cy={0} w={320} h={400} rx={22} fill="#181B26" stroke={GOLD} strokeWidth={4} />
          {/* Con dấu ĐÃ DUYỆT xanh lá */}
          <circle cx={0} cy={-20} r={60} fill="rgba(34, 197, 94, 0.2)" stroke={GREEN} strokeWidth={5} />
          <path d="M -24 -20 L -6 2 L 28 -32" fill="none" stroke={GREEN} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
          <rect x={-110} y={120} width={220} height={36} rx={10} fill="rgba(197, 160, 89, 0.3)" />
        </G>
      </G>
    </VideoStage>
  );
};

/** Cảnh 7: Bước 4: Kéo thả kịch bản mẫu & Duyệt nội dung (Screencast TOÀN PHẦN) */
export const ChayDemoKichBan: React.FC = () => (
  <FullScreenClipStage
    shots={[
      { from: 172, to: 185 },
      { from: 305, to: 320 },
      { from: 385, to: 400 },
    ]}
    stepTitle="BƯỚC 4: KÉO THẢ KỊCH BẢN & DUYỆT NỘI DUNG"
    tags={[
      [1, 0, 1500, 130, GLASS_BG, GOLDL, "📄"],
      [2, 0, 1500, 220, GLASS_BG, TXT, "📋"],
      [3, 1, 1500, 310, GLASS_BG, GREEN, "✓"],
    ]}
  />
);

/** Cảnh 8: Bước 5: Nghe thử âm thanh & Hoàn thiện video (Screencast TOÀN PHẦN) */
export const ThuAmVaRender: React.FC = () => (
  <FullScreenClipStage
    shots={[
      { from: 425, to: 440 },
      { from: 460, to: 468, tick: true },
    ]}
    stepTitle="BƯỚC 5: NGHE THỬ ÂM THANH & HOÀN THIỆN"
    tags={[
      [0, 0, 1500, 130, GLASS_BG, GREEN, "🎙️"],
      [1, 0, 1500, 220, GLASS_BG, GOLDL, "🖼️"],
      [2, 0, 1500, 310, GLASS_BG, GREEN, "✓"],
      [3, 1, 1500, 400, GLASS_BG, GREEN, "🎬"],
      [4, 1, 1500, 490, GLASS_BG, GOLDL, "✨"],
    ]}
  />
);

/** Cảnh 9: Bước mở rộng: Chế độ C - Dựng từ Clip quay thật (Screencast TOÀN PHẦN) */
export const CheDoCTalkingHead: React.FC = () => (
  <FullScreenClipStage
    shots={[
      { from: 370, to: 390 },
      { from: 390, to: 420 },
      { from: 420, to: 450 },
    ]}
    stepTitle="CHẾ ĐỘ C: DỰNG TỪ CLIP QUAY THẬT"
    tags={[
      [1, 0, 1500, 130, GLASS_BG, RED, "🎥"],
      [2, 0, 1500, 220, GLASS_BG, GOLDL, "🎬"],
      [3, 0, 1500, 310, GLASS_BG, GREEN, "🗣️"],
      [4, 0, 1500, 400, GLASS_BG, TXT, "🎧"],
      [5, 1, 1500, 490, GLASS_BG, GREEN, "✂️"],
    ]}
  />
);

/** Cảnh 10: B-roll Tổng kết Grand Finale — ĐƯA AI LÀM TẤT CẢ */
export const TongKetCheatSheet: React.FC = () => {
  const { f, p } = useT();

  const titleP = p(0, 0.02);
  const subP = p(0, 0.15);
  const coreP = p(0, 0.25);
  const badgesP = p(1, 0.05);

  const starPulse = 1 + 0.08 * Math.sin(f * 0.18);
  const rot = (f * 0.5) % 360;

  return (
    <VideoStage
      overlay={
        <>
          <Tag i={3} x={960} y={130} p={titleP} size={44} solid />
          <Tag i={0} x={960} y={230} p={subP} size={30} />

          {/* 2 huy hiệu thành tựu */}
          <Tag i={1} x={650} y={870} p={badgesP} size={32} solid color={GREEN} />
          <Tag i={2} x={1270} y={870} p={badgesP} size={32} solid color={GOLD} />

          {/* Banner trung tâm qua Tag/Label */}
          <Tag i={3} x={960} y={710} p={coreP} size={36} solid color={GOLD} />
        </>
      }
    >
      <G x={960} y={530} s={titleP}>
        {/* Khung panel lớn */}
        <Box cx={0} cy={0} w={1620} h={680} rx={28} fill={PANEL_BG} stroke={GOLD} strokeWidth={4} />

        {/* Hào quang trung tâm */}
        <circle cx={0} cy={0} r={220} fill="rgba(197, 160, 89, 0.08)" />

        {/* Vòng tia sáng vàng kim xoay quanh cúp thành phẩm */}
        <g transform={`rotate(${rot})`}>
          <circle cx={0} cy={0} r={170} fill="none" stroke={GOLDL} strokeWidth={3} strokeDasharray="30 15" />
          <circle cx={170} cy={0} r={8} fill={GOLD} />
          <circle cx={-170} cy={0} r={8} fill={GOLD} />
          <circle cx={0} cy={170} r={8} fill={GOLD} />
          <circle cx={0} cy={-170} r={8} fill={GOLD} />
        </g>

        {/* Biểu tượng Video Masterfile phát sáng cực đại */}
        <G x={0} y={-40} s={coreP * starPulse}>
          {/* Màn hình master video */}
          <Win w={340} h={230} stroke={GOLD}>
            <Box cx={0} cy={15} w={300} h={160} rx={14} fill="#10131E" />
            <circle cx={0} cy={15} r={42} fill={GOLD} />
            <path d="M -10 -2 L -10 32 L 20 15 Z" fill={INK} />
            {/* Tia sao lấp lánh */}
            <G x={-95} y={-35} s={0.8}><Spark r={16} fill={GOLDL} /></G>
            <G x={95} y={-35} s={0.8}><Spark r={16} fill={GOLDL} /></G>
          </Win>
        </G>

        {/* Bệ đỡ bên dưới */}
        <G x={0} y={180} s={coreP}>
          <Box cx={0} cy={0} w={640} h={64} rx={32} fill="rgba(197, 160, 89, 0.2)" stroke={GOLDL} strokeWidth={3} />
        </G>
      </G>
    </VideoStage>
  );
};
