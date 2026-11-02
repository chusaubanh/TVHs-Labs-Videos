import React from "react";
import {
  Box,
  EL,
  G,
  GOLD,
  GOLDL,
  H,
  HOV,
  INK,
  Lines,
  RED,
  SEC,
  SURF,
  ScreenMockup,
  Stage,
  TXT,
  Tag,
  W,
  XL,
  lerp,
  useT,
} from "./art";

/** Cảnh 9: Kiểm tra và xuất Excel nháp */
export const XuatExcelKiemTra: React.FC = () => {
  const { p } = useT();
  const cmdIn = p(0);
  const check12 = p(1);
  const excelIn = p(2);

  return (
    <Stage
      overlay={
        <>
          <Tag i={0} x={420} y={130} p={cmdIn} solid />
          <Tag i={1} x={960} y={130} p={check12} />
          <Tag i={2} x={1500} y={130} p={excelIn} solid />
        </>
      }
    >
      {/* Lệnh hoàn tất bằng chứng */}
      <G x={460} y={520} s={cmdIn * 1.05}>
        <Box cx={0} cy={0} w={480} h={520} rx={28} fill={EL} stroke={GOLD} strokeWidth={3} />
        <rect x={-200} y={-210} width={400} height={46} rx={12} fill="#242732" />
        <circle cx={-160} cy={-187} r={8} fill={GOLDL} />
        <rect x={-130} y={-197} width={220} height={20} rx={10} fill={HOV} />
        <rect x={-200} y={-130} width={400} height={140} rx={16} fill="#111317" />
        <Lines x={-160} y={-80} w={320} n={2} gap={36} color={GOLDL} t={14} />
        <rect x={-180} y={60} width={360} height={70} rx={35} fill={HOV} />
        <rect x={-120} y={85} width={240} height={20} rx={10} fill={TXT} />
      </G>

      {/* 12 chốt kiểm tra */}
      <G x={960} y={520} s={check12 * 1.05}>
        <Box cx={0} cy={0} w={480} h={520} rx={28} fill={EL} stroke={XL} strokeWidth={3} />
        <rect x={-120} y={-200} width={240} height={30} rx={15} fill="rgba(34,197,94,0.2)" />
        {/* Lưới 12 chốt */}
        {Array.from({ length: 12 }, (_, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <g key={i} transform={`translate(${-140 + col * 140}, ${-130 + row * 90})`}>
              <circle cx={0} cy={0} r={28} fill="rgba(34,197,94,0.18)" stroke={XL} strokeWidth={2} />
              <path d="M-10 0 L-3 7 L10 -7" stroke={XL} strokeWidth={4} strokeLinecap="round" fill="none" />
            </g>
          );
        })}
      </G>

      {/* File Excel & Báo cáo kiểm */}
      <G x={1460} y={520} s={excelIn * 1.05}>
        <Box cx={0} cy={0} w={480} h={520} rx={28} fill={EL} stroke={GOLD} strokeWidth={3} />
        {/* Biểu tượng Excel */}
        <rect x={-160} y={-190} width={320} height={140} rx={16} fill="#107C41" />
        <path d="M-30 -130 L-10 -110 M-10 -130 L-30 -110" stroke="#FFF" strokeWidth={6} strokeLinecap="round" />
        <rect x={10} y={-130} width={120} height={20} rx={8} fill="#FFF" opacity={0.8} />
        <rect x={-100} y={-75} width={200} height={16} rx={8} fill="#E6FFED" opacity={0.6} />
        {/* Báo cáo kiểm 04-bao-cao-kiem.md */}
        <rect x={-180} y={0} width={360} height={180} rx={16} fill="#181B22" stroke={SEC} strokeWidth={2} />
        <rect x={-130} y={35} width={260} height={24} rx={12} fill={HOV} />
        <Lines x={-140} y={80} w={280} n={2} gap={24} color={SEC} />
      </G>
    </Stage>
  );
};

/** Cảnh 10: Trạm dừng hai - Quy trình kiểm tay */
export const TramDung2: React.FC = () => {
  const { p } = useT();
  const step1 = p(0);
  const step2 = p(1);
  const step3 = p(2);
  const step4 = p(3);

  return (
    <Stage
      overlay={
        <>
          <Tag i={0} x={360} y={130} p={step1} solid />
          <Tag i={1} x={760} y={130} p={step2} />
          <Tag i={2} x={1180} y={130} p={step3} solid />
          <Tag i={3} x={1560} y={130} p={step4} color={XL} solid />
        </>
      }
    >
      <G x={960} y={520}>
        {/* Bước 1: Sheet Cần kiểm tay */}
        <g transform={`translate(-660, 0) scale(${step1})`}>
          <Box cx={0} cy={0} w={380} h={520} rx={24} fill={EL} stroke="#E2B714" strokeWidth={3} />
          <rect x={-150} y={-210} width={300} height={50} rx={12} fill="#E2B714" />
          <circle cx={-100} cy={-185} r={14} fill={INK} />
          <rect x={-70} y={-195} width={140} height={20} rx={8} fill={INK} />
          <rect x={-100} y={-80} width={200} height={24} rx={12} fill={HOV} />
          <rect x={-70} y={-35} width={140} height={18} rx={9} fill={SEC} opacity={0.6} />
          <rect x={-140} y={30} width={280} height={60} rx={30} fill="#242832" />
          <path d="M-20 60 C-20 45, 0 45, 0 60 C0 75, 20 75, 20 60" stroke={GOLDL} strokeWidth={4} fill="none" />
        </g>

        {/* Bước 2: Sheet Tra cứu nguồn */}
        <g transform={`translate(-220, 0) scale(${step2})`}>
          <Box cx={0} cy={0} w={380} h={520} rx={24} fill={EL} stroke={GOLD} strokeWidth={3} />
          <rect x={-150} y={-210} width={300} height={50} rx={12} fill={HOV} />
          <circle cx={-100} cy={-185} r={14} fill={GOLDL} />
          <rect x={-70} y={-195} width={140} height={20} rx={8} fill={GOLDL} />
          <rect x={-100} y={-80} width={200} height={24} rx={12} fill={HOV} />
          <rect x={-70} y={-35} width={140} height={18} rx={9} fill={SEC} opacity={0.6} />
          <rect x={-140} y={30} width={280} height={60} rx={30} fill="#242832" />
          <rect x={-60} y={45} width={120} height={24} rx={8} fill={GOLDL} />
        </g>

        {/* Bước 3: So khớp văn bản gốc */}
        <g transform={`translate(220, 0) scale(${step3})`}>
          <Box cx={0} cy={0} w={380} h={520} rx={24} fill={EL} stroke={XL} strokeWidth={3} />
          <rect x={-150} y={-210} width={300} height={50} rx={12} fill="#143422" />
          <circle cx={-100} cy={-185} r={14} fill={XL} />
          <rect x={-70} y={-195} width={140} height={20} rx={8} fill={XL} />
          <rect x={-100} y={-80} width={200} height={24} rx={12} fill={HOV} />
          <rect x={-70} y={-35} width={140} height={18} rx={9} fill={SEC} opacity={0.6} />
          <rect x={-140} y={30} width={280} height={60} rx={30} fill="rgba(34,197,94,0.18)" />
          <path d="M-15 60 L-3 72 L15 48" stroke={XL} strokeWidth={5} strokeLinecap="round" fill="none" />
        </g>

        {/* Bước 4: Chọn duyệt & Đánh dấu */}
        <g transform={`translate(660, 0) scale(${step4})`}>
          <Box cx={0} cy={0} w={380} h={520} rx={24} fill={EL} stroke={GOLDL} strokeWidth={3} />
          <rect x={-150} y={-210} width={300} height={50} rx={12} fill={HOV} />
          <circle cx={-100} cy={-185} r={14} fill={TXT} />
          <rect x={-70} y={-195} width={140} height={20} rx={8} fill={TXT} />
          {/* Lựa chọn cột U */}
          <rect x={-140} y={-120} width={280} height={46} rx={10} fill="rgba(34,197,94,0.2)" stroke={XL} strokeWidth={2} />
          <path d="M-10 -97 L-2 -89 L10 -105" stroke={XL} strokeWidth={4} strokeLinecap="round" fill="none" />
          <rect x={-140} y={-60} width={280} height={46} rx={10} fill="rgba(197,160,89,0.2)" stroke={GOLD} strokeWidth={2} />
          <circle cx={0} cy={-37} r={6} fill={GOLDL} />
          <rect x={-140} y={0} width={280} height={46} rx={10} fill="rgba(239,68,68,0.2)" stroke={RED} strokeWidth={2} />
          <path d="M-8 15 L8 31 M8 15 L-8 31" stroke={RED} strokeWidth={4} strokeLinecap="round" />
          {/* Đổi ô tích */}
          <rect x={-140} y={80} width={280} height={60} rx={30} fill={XL} />
          <path d="M-12 110 L-2 120 L12 100" stroke={INK} strokeWidth={6} strokeLinecap="round" fill="none" />
        </g>
      </G>
    </Stage>
  );
};

/** Cảnh 11: Nguyên tắc 3Đ */
export const NguyenTac3D: React.FC = () => {
  const { p } = useT();
  const ruleIn = p(0);
  const banChat = p(1);

  return (
    <Stage
      overlay={
        <>
          <Tag i={0} x={420} y={130} p={ruleIn} solid />
          <Tag i={1} x={780} y={130} p={ruleIn} solid />
          <Tag i={2} x={1140} y={130} p={ruleIn} solid />
          <Tag i={3} x={1560} y={130} p={banChat} color={RED} solid />
        </>
      }
    >
      {/* 3 Trụ Cột: Đọc trọn - Đối chiếu - Đứng tên */}
      <G x={960} y={540} s={ruleIn * 1.05}>
        {/* Đọc trọn */}
        <g transform="translate(-480, 0)">
          <Box cx={0} cy={0} w={420} h={520} rx={28} fill={EL} stroke={GOLD} strokeWidth={4} />
          <circle cx={0} cy={-110} r={65} fill="rgba(197,160,89,0.2)" stroke={GOLDL} strokeWidth={3} />
          <circle cx={0} cy={-110} r={30} fill={GOLDL} />
          <rect x={-100} y={10} width={200} height={26} rx={13} fill={HOV} />
          <rect x={-60} y={55} width={120} height={18} rx={9} fill={SEC} opacity={0.6} />
          <rect x={-150} y={110} width={300} height={50} rx={25} fill={HOV} />
          <rect x={-100} y={125} width={200} height={20} rx={10} fill={GOLDL} />
        </g>

        {/* Đối chiếu */}
        <g transform="translate(0, 0)">
          <Box cx={0} cy={0} w={420} h={520} rx={28} fill={EL} stroke={GOLD} strokeWidth={4} />
          <circle cx={0} cy={-110} r={65} fill="rgba(197,160,89,0.2)" stroke={GOLDL} strokeWidth={3} />
          <path d="M-20 -110 L20 -110 M0 -130 L0 -90" stroke={GOLDL} strokeWidth={8} strokeLinecap="round" />
          <rect x={-100} y={10} width={200} height={26} rx={13} fill={HOV} />
          <rect x={-60} y={55} width={120} height={18} rx={9} fill={SEC} opacity={0.6} />
          <rect x={-150} y={110} width={300} height={50} rx={25} fill={HOV} />
          <rect x={-100} y={125} width={200} height={20} rx={10} fill={GOLDL} />
        </g>

        {/* Đứng tên */}
        <g transform="translate(480, 0)">
          <Box cx={0} cy={0} w={420} h={520} rx={28} fill={EL} stroke={GOLD} strokeWidth={4} />
          <circle cx={0} cy={-110} r={65} fill="rgba(197,160,89,0.2)" stroke={GOLDL} strokeWidth={3} />
          <path d="M-15 -105 L-3 -93 L15 -117" stroke={XL} strokeWidth={8} strokeLinecap="round" fill="none" />
          <rect x={-100} y={10} width={200} height={26} rx={13} fill={HOV} />
          <rect x={-60} y={55} width={120} height={18} rx={9} fill={SEC} opacity={0.6} />
          <rect x={-150} y={110} width={300} height={50} rx={25} fill={XL} />
          <rect x={-100} y={125} width={200} height={20} rx={10} fill={INK} />
        </g>
      </G>

      {/* Cảnh báo cấm duyệt qua chat */}
      <G x={960} y={960} s={banChat * 1.05} o={banChat}>
        <Box cx={0} cy={0} w={1100} h={78} rx={39} fill="#321414" stroke={RED} strokeWidth={3} />
        <circle cx={-480} cy={0} r={20} fill={RED} />
        <path d="M-490 -10 L-470 10 M-470 -10 L-490 10" stroke="#FFF" strokeWidth={4} strokeLinecap="round" />
        <rect x={-430} y={-12} width={860} height={24} rx={12} fill="#FFC7C7" opacity={0.8} />
      </G>
    </Stage>
  );
};

/** Cảnh 12: Đồng bộ và tra cứu kho */
export const DongBoVaTraKho: React.FC = () => {
  const { p } = useT();
  const syncIn = p(0);
  const repoIn = p(1);
  const searchIn = p(2);

  return (
    <Stage
      overlay={
        <>
          <Tag i={0} x={420} y={130} p={syncIn} solid />
          <Tag i={1} x={960} y={130} p={repoIn} />
          <Tag i={2} x={1500} y={130} p={searchIn} solid />
        </>
      }
    >
      {/* Gõ lệnh đồng bộ */}
      <G x={460} y={520} s={syncIn * 1.05}>
        <Box cx={0} cy={0} w={480} h={520} rx={28} fill={EL} stroke={GOLD} strokeWidth={3} />
        <rect x={-200} y={-210} width={400} height={46} rx={12} fill="#242732" />
        <circle cx={-160} cy={-187} r={8} fill={GOLDL} />
        <rect x={-130} y={-197} width={220} height={20} rx={10} fill={HOV} />
        <rect x={-200} y={-130} width={400} height={160} rx={16} fill="#111317" />
        <Lines x={-160} y={-80} w={320} n={3} gap={36} color={GOLDL} t={14} />
      </G>

      {/* Kho-phap-ly.xlsx */}
      <G x={960} y={520} s={repoIn * 1.05}>
        <Box cx={0} cy={0} w={480} h={520} rx={28} fill={EL} stroke={GOLDL} strokeWidth={4} />
        <circle cx={0} cy={-110} r={75} fill="rgba(197,160,89,0.18)" stroke={GOLDL} strokeWidth={4} />
        <rect x={-35} y={-135} width={70} height={50} rx={8} fill={GOLDL} />
        <rect x={-140} y={-30} width={280} height={32} rx={16} fill={HOV} />
        <rect x={-180} y={30} width={360} height={60} rx={14} fill="#242832" />
        <rect x={-120} y={50} width={240} height={20} rx={10} fill={TXT} />
        <rect x={-160} y={120} width={320} height={50} rx={25} fill={XL} />
        <path d="M-15 145 L-3 157 L15 133" stroke={INK} strokeWidth={6} strokeLinecap="round" fill="none" />
      </G>

      {/* Tra cứu lại bằng bộ lọc */}
      <G x={1460} y={520} s={searchIn * 1.05}>
        <Box cx={0} cy={0} w={480} h={520} rx={28} fill={EL} stroke={XL} strokeWidth={3} />
        <rect x={-180} y={-210} width={360} height={50} rx={12} fill="#143422" />
        <circle cx={-130} cy={-185} r={10} fill={XL} />
        <rect x={-100} y={-195} width={200} height={20} rx={10} fill={XL} />
        {/* Các trường lọc */}
        <rect x={-180} y={-120} width={360} height={54} rx={12} fill={HOV} />
        <polygon points="-150,-95 -138,-95 -144,-85" fill={GOLDL} />
        <rect x={-120} y={-103} width={240} height={20} rx={10} fill={GOLDL} />
        <rect x={-180} y={-50} width={360} height={54} rx={12} fill={HOV} />
        <polygon points="-150,-25 -138,-25 -144,-15" fill={GOLDL} />
        <rect x={-120} y={-33} width={240} height={20} rx={10} fill={GOLDL} />
        <rect x={-180} y={20} width={360} height={54} rx={12} fill={HOV} />
        <polygon points="-150,45 -138,45 -144,55" fill={GOLDL} />
        <rect x={-120} y={37} width={240} height={20} rx={10} fill={GOLDL} />
        <rect x={-160} y={110} width={320} height={60} rx={30} fill={XL} />
        <path d="M-15 140 L-3 152 L15 128" stroke={INK} strokeWidth={6} strokeLinecap="round" fill="none" />
      </G>
    </Stage>
  );
};

/** Cảnh 13: Xử lý sự cố và màn kết */
export const XuLySuCoVaKet: React.FC = () => {
  const { p } = useT();
  const cardsIn = p(0);
  const logoIn = p(2);

  return (
    <Stage
      overlay={
        <>
          <Tag i={0} x={420} y={130} p={cardsIn} color={RED} solid />
          <Tag i={1} x={960} y={130} p={cardsIn} />
          <Tag i={2} x={1500} y={130} p={cardsIn} solid />
        </>
      }
    >
      {/* 3 Thẻ sự cố thường gặp */}
      <G x={960} y={480} s={cardsIn * 1.05} o={1 - logoIn * 0.85}>
        <g transform="translate(-520, 0)">
          <Box cx={0} cy={0} w={480} h={440} rx={24} fill={EL} stroke="rgba(255,255,255,0.12)" strokeWidth={2} />
          <circle cx={0} cy={-130} r={40} fill="rgba(197,160,89,0.2)" stroke={GOLDL} strokeWidth={2} />
          <path d="M-15 -130 L15 -130 M0 -145 L0 -115" stroke={GOLDL} strokeWidth={4} strokeLinecap="round" />
          <rect x={-120} y={-50} width={240} height={24} rx={12} fill={HOV} />
          <rect x={-180} y={20} width={360} height={60} rx={30} fill="#232732" />
          <circle cx={-100} cy={50} r={12} fill={XL} />
          <rect x={-70} y={40} width={160} height={20} rx={10} fill={XL} />
        </g>
        <g transform="translate(0, 0)">
          <Box cx={0} cy={0} w={480} h={440} rx={24} fill={EL} stroke="rgba(255,255,255,0.12)" strokeWidth={2} />
          <circle cx={0} cy={-130} r={40} fill="rgba(239,68,68,0.2)" stroke={RED} strokeWidth={2} />
          <path d="M-10 -130 L10 -130" stroke={RED} strokeWidth={4} strokeLinecap="round" />
          <rect x={-120} y={-50} width={240} height={24} rx={12} fill={HOV} />
          <rect x={-180} y={20} width={360} height={60} rx={30} fill="#232732" />
          <circle cx={-100} cy={50} r={12} fill={GOLDL} />
          <rect x={-70} y={40} width={160} height={20} rx={10} fill={GOLDL} />
        </g>
        <g transform="translate(520, 0)">
          <Box cx={0} cy={0} w={480} h={440} rx={24} fill={EL} stroke="rgba(255,255,255,0.12)" strokeWidth={2} />
          <circle cx={0} cy={-130} r={40} fill="rgba(255,255,255,0.15)" stroke={SEC} strokeWidth={2} />
          <circle cx={0} cy={-130} r={15} fill={SEC} />
          <rect x={-120} y={-50} width={240} height={24} rx={12} fill={HOV} />
          <rect x={-180} y={20} width={360} height={60} rx={30} fill="#232732" />
          <circle cx={-100} cy={50} r={12} fill={SEC} />
          <rect x={-70} y={40} width={160} height={20} rx={10} fill={SEC} />
        </g>
      </G>

      {/* Màn kết Thành Vinh Holdings */}
      <G x={960} y={540} s={logoIn * 1.2} o={logoIn}>
        <circle cx={0} cy={-60} r={110} fill="rgba(197,160,89,0.15)" stroke={GOLD} strokeWidth={4} />
        <polygon points="0,-120 40,-50 -40,-50" fill={GOLDL} />
        <polygon points="0,0 40,-70 -40,-70" fill={GOLD} opacity={0.6} />
        <rect x={-200} y={90} width={400} height={40} rx={20} fill={GOLD} />
        <rect x={-140} y={150} width={280} height={24} rx={12} fill={SEC} opacity={0.6} />
      </G>
    </Stage>
  );
};
