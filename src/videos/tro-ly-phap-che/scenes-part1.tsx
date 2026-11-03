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

/** Cảnh 1: Tổng quan và phạm vi */
export const GioiThieu: React.FC = () => {
  const { f, p, l } = useT();
  const popTable = p(0);
  const zoomCell = p(1);
  const popCountries = p(2);
  const vaultIn = p(3);

  return (
    <Stage
      overlay={
        <>
          <Tag i={0} x={420} y={130} p={popTable} solid />
          <Tag i={1} x={960} y={130} p={zoomCell} />
          <Tag i={2} x={1500} y={130} p={zoomCell} />
          <Tag i={3} x={420} y={950} p={popCountries} solid />
          <Tag i={4} x={960} y={950} p={popCountries} />
          <Tag i={5} x={1500} y={950} p={vaultIn} solid />
        </>
      }
    >
      {/* Khung bảng dữ liệu trung tâm */}
      <G x={960} y={520} s={popTable * lerp(1, 0.82, vaultIn)}>
        <Box cx={0} cy={0} w={1520} h={640} rx={24} fill={EL} stroke={GOLD} strokeWidth={3} />
        {/* Header bảng */}
        <Box cx={0} cy={-260} w={1520} h={100} rx={24} fill="#242730" />
        <rect x={-700} y={-275} width={160} height={32} rx={16} fill={HOV} />
        <rect x={-450} y={-275} width={180} height={32} rx={16} fill={HOV} />
        <rect x={-180} y={-275} width={340} height={32} rx={16} fill={HOV} />
        <rect x={260} y={-275} width={200} height={32} rx={16} fill="rgba(197,160,89,0.3)" />
        <rect x={540} y={-275} width={180} height={32} rx={16} fill="rgba(34,197,94,0.3)" />

        {/* Các dòng bảng */}
        {[0, 1, 2, 3].map((row) => (
          <g key={row} transform={`translate(0, ${-160 + row * 115})`}>
            <line x1={-740} y1={-40} x2={740} y2={-40} stroke="rgba(255,255,255,0.08)" strokeWidth={2} />
            <rect x={-720} y={-20} width={180} height={40} rx={10} fill={HOV} />
            <rect x={-460} y={-20} width={220} height={40} rx={10} fill={HOV} />
            <Lines x={-180} y={-16} w={480} n={2} gap={22} color={SEC} />
            <rect x={360} y={-20} width={180} height={38} rx={19} fill="rgba(197,160,89,0.25)" />
            <rect x={600} y={-20} width={130} height={38} rx={10} fill="rgba(34,197,94,0.2)" />
          </g>
        ))}
      </G>

      {/* Ô phóng to nổi bật trích dẫn nguyên văn ở câu 2 */}
      <G x={1120} y={540} s={zoomCell * 1.3} o={zoomCell}>
        <Box cx={0} cy={0} w={680} h={320} rx={20} fill="#181B22" stroke={GOLDL} strokeWidth={4} />
        <circle cx={-280} cy={-100} r={24} fill={XL} />
        <path d="M-288 -100 L-282 -94 L-272 -106" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
        <rect x={-240} y={-112} width={340} height={26} rx={13} fill={HOV} />
        <rect x={-300} y={-50} width={600} height={140} rx={12} fill="#0E1014" />
        <Lines x={-270} y={-20} w={540} n={3} gap={36} color={GOLDL} t={12} />
      </G>

      {/* 6 nước và 6 lĩnh vực ở câu 3 */}
      <G x={480} y={520} s={popCountries * 1.15} o={popCountries}>
        <Box cx={0} cy={0} w={560} h={460} rx={22} fill="#1A1D24" stroke="rgba(197,160,89,0.6)" strokeWidth={3} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`translate(${-210 + (i % 2) * 210}, ${-150 + Math.floor(i / 2) * 110})`}>
            <rect x={0} y={0} width={190} height={60} rx={14} fill={HOV} stroke={GOLD} strokeWidth={2} />
            <circle cx={40} cy={30} r={14} fill={GOLDL} />
            <rect x={70} y={22} width={90} height={16} rx={8} fill={TXT} />
          </g>
        ))}
      </G>

      {/* Kho tra cứu chung ở câu 4 */}
      <G x={1520} y={520} s={vaultIn * 1.25} o={vaultIn}>
        <Box cx={0} cy={0} w={480} h={460} rx={28} fill="#181B22" stroke={GOLD} strokeWidth={4} />
        <circle cx={0} cy={-70} r={80} fill="rgba(197,160,89,0.2)" stroke={GOLDL} strokeWidth={4} />
        <rect x={-30} y={-90} width={60} height={40} rx={6} fill={GOLDL} />
        <rect x={-10} y={-50} width={20} height={40} rx={4} fill={GOLDL} />
        <rect x={-140} y={50} width={280} height={36} rx={18} fill={HOV} />
        <rect x={-160} y={120} width={320} height={50} rx={25} fill={XL} />
        <path d="M-20 145 L-6 157 L20 135" stroke={INK} strokeWidth={6} strokeLinecap="round" fill="none" />
      </G>
    </Stage>
  );
};

/** Cảnh 2: Cần chuẩn bị */
export const ChuanBi: React.FC = () => {
  const { p } = useT();
  const claudeApp = p(0);
  const toolsApp = p(1);
  const zipExtract = p(2);

  return (
    <Stage
      overlay={
        <>
          <Tag i={0} x={360} y={130} p={claudeApp} solid />
          <Tag i={1} x={760} y={130} p={claudeApp} />
          <Tag i={2} x={1180} y={130} p={toolsApp} />
          <Tag i={3} x={1560} y={130} p={toolsApp} />
          <Tag i={4} x={960} y={950} p={zipExtract} solid />
        </>
      }
    >
      {/* Thẻ ứng dụng Claude */}
      <G x={480} y={500} s={claudeApp * 1.05}>
        <Box cx={0} cy={0} w={420} h={520} rx={28} fill={EL} stroke={GOLD} strokeWidth={3} />
        <circle cx={0} cy={-90} r={70} fill="#D97706" />
        <circle cx={0} cy={-90} r={35} fill={INK} />
        <rect x={-120} y={15} width={240} height={32} rx={16} fill={HOV} />
        <rect x={-150} y={70} width={300} height={52} rx={26} fill="rgba(34,197,94,0.18)" stroke={XL} strokeWidth={2} />
        <circle cx={-100} cy={96} r={12} fill={XL} />
        <rect x={-70} y={88} width={160} height={16} rx={8} fill={XL} />
      </G>

      {/* Thẻ Chrome & Excel */}
      <G x={960} y={500} s={toolsApp * 1.05}>
        <Box cx={0} cy={0} w={440} h={520} rx={28} fill={EL} stroke="rgba(255,255,255,0.12)" strokeWidth={2} />
        {/* Chrome icon */}
        <g transform="translate(0, -110)">
          <circle cx={0} cy={0} r={55} fill="#4285F4" />
          <circle cx={0} cy={0} r={24} fill="#FFF" />
          <rect x={-90} y={70} width={180} height={26} rx={13} fill={HOV} />
        </g>
        {/* Excel icon */}
        <g transform="translate(0, 110)">
          <rect x={-45} y={-45} width={90} height={90} rx={16} fill="#107C41" />
          <path d="M-22 -22 L22 22 M22 -22 L-22 22" stroke="#FFF" strokeWidth={10} strokeLinecap="round" />
          <rect x={-90} y={70} width={180} height={26} rx={13} fill={HOV} />
        </g>
      </G>

      {/* Thẻ File Zip & Giải nén */}
      <G x={1440} y={500} s={zipExtract * 1.05}>
        <Box cx={0} cy={0} w={440} h={520} rx={28} fill={EL} stroke={GOLD} strokeWidth={3} />
        <rect x={-80} y={-160} width={160} height={190} rx={16} fill="#E2B714" />
        <rect x={-60} y={-140} width={120} height={15} rx={6} fill="#FFF" opacity={0.6} />
        <circle cx={0} cy={-40} r={24} fill={INK} />
        <path d="M0 -15 L0 40 M-20 20 L0 40 L20 20" stroke={GOLDL} strokeWidth={8} strokeLinecap="round" fill="none" />
        <rect x={-180} y={70} width={360} height={70} rx={18} fill="#242832" stroke={GOLDL} strokeWidth={2} />
        <rect x={-130} y={95} width={260} height={20} rx={10} fill={GOLDL} />
      </G>
    </Stage>
  );
};

/** Cảnh 3: Khởi tạo Project (Screen recording 1.mp4 0:00 - 0:35) */
export const KhoiTaoProject: React.FC = () => {
  const { f, p } = useT();
  const alertPulse = Math.sin(f * 0.15) * 0.08 + 1;

  return (
    <Stage
      underlay={
        <ScreenMockup
          videoSrc="raw-recordings/tro-ly-phap-che/1.mp4"
          startFrom={0}
          x={160}
          y={175}
          w={1600}
          h={760}
          scale={p(0)}
        />
      }
      overlay={
        <>
          <Tag i={0} x={420} y={115} p={p(0)} solid />
          <Tag i={1} x={960} y={115} p={p(1)} />
          <Tag i={2} x={1500} y={115} p={p(2)} color={RED} solid />
        </>
      }
    >
      {/* Cảnh báo chỉ chat trong project */}
      <G x={960} y={965} s={p(2) * alertPulse}>
        <Box cx={0} cy={0} w={920} h={64} rx={32} fill="#2B1414" stroke={RED} strokeWidth={3} />
        <circle cx={-380} cy={0} r={20} fill={RED} />
        <path d="M-380 -10 L-380 4 M-380 10 L-380 12" stroke="#FFF" strokeWidth={4} strokeLinecap="round" />
        <rect x={-320} y={-10} width={640} height={20} rx={10} fill="#FFD1D1" opacity={0.85} />
      </G>
    </Stage>
  );
};

/** Cảnh 4: Kiểm tra điều kiện chạy */
export const KiemTraDieuKien: React.FC = () => {
  const { p } = useT();
  const cmdIn = p(0);
  const allowIn = p(1);
  const readyIn = p(2);

  return (
    <Stage
      overlay={
        <>
          <Tag i={0} x={450} y={130} p={cmdIn} solid />
          <Tag i={1} x={960} y={130} p={allowIn} />
          <Tag i={2} x={1480} y={130} p={readyIn} solid />
        </>
      }
    >
      {/* Hộp thoại lệnh 1 */}
      <G x={520} y={535} s={cmdIn * 1.05}>
        <Box cx={0} cy={0} w={480} h={560} rx={24} fill={EL} stroke={GOLD} strokeWidth={3} />
        <rect x={-200} y={-230} width={400} height={50} rx={12} fill="#242732" />
        <circle cx={-160} cy={-205} r={8} fill={GOLDL} />
        <rect x={-130} y={-215} width={240} height={20} rx={10} fill={HOV} />
        <rect x={-200} y={-150} width={400} height={200} rx={16} fill="#111317" />
        <Lines x={-170} y={-110} w={340} n={4} gap={36} color={TXT} t={12} />
        <rect x={-180} y={100} width={360} height={60} rx={30} fill={HOV} />
        <rect x={-120} y={120} width={240} height={20} rx={10} fill={GOLDL} />
      </G>

      {/* Xin quyền & bấm đồng ý */}
      <G x={960} y={535} s={allowIn * 1.05}>
        <Box cx={0} cy={0} w={480} h={560} rx={24} fill={EL} stroke={XL} strokeWidth={3} />
        <circle cx={0} cy={-140} r={50} fill="rgba(34,197,94,0.2)" stroke={XL} strokeWidth={3} />
        <path d="M-18 -140 L-6 -128 L18 -152" stroke={XL} strokeWidth={6} strokeLinecap="round" fill="none" />
        <rect x={-140} y={-55} width={280} height={28} rx={14} fill={HOV} />
        <rect x={-100} y={-10} width={200} height={20} rx={10} fill={SEC} opacity={0.6} />
        <rect x={-160} y={90} width={320} height={70} rx={35} fill={XL} />
        <path d="M-20 125 L-6 138 L20 112" stroke={INK} strokeWidth={8} strokeLinecap="round" fill="none" />
      </G>

      {/* Xác nhận hệ làm việc */}
      <G x={1400} y={535} s={readyIn * 1.05}>
        <Box cx={0} cy={0} w={480} h={560} rx={24} fill={EL} stroke={GOLD} strokeWidth={3} />
        <circle cx={0} cy={-140} r={50} fill="rgba(197,160,89,0.2)" stroke={GOLDL} strokeWidth={3} />
        <path d="M-18 -140 L-6 -128 L18 -152" stroke={GOLDL} strokeWidth={6} strokeLinecap="round" fill="none" />
        <rect x={-140} y={-55} width={280} height={28} rx={14} fill={HOV} />
        <rect x={-200} y={10} width={400} height={140} rx={16} fill="#111317" />
        <Lines x={-160} y={45} w={320} n={2} gap={36} color={GOLDL} t={12} />
      </G>

      {/* Thanh trạng thái sẵn sàng ở chân khung */}
      <G x={960} y={955} s={readyIn * 1.05}>
        <Box cx={0} cy={0} w={960} h={60} rx={30} fill="#181B22" stroke="rgba(197,160,89,0.4)" strokeWidth={2} />
        <circle cx={-400} cy={0} r={14} fill={XL} />
        <path d="M-407 0 L-402 5 L-393 -4" stroke={INK} strokeWidth={3} strokeLinecap="round" fill="none" />
        <rect x={-360} y={-8} width={240} height={16} rx={8} fill={HOV} />
        <circle cx={0} cy={0} r={6} fill={GOLDL} />
        <rect x={40} y={-8} width={340} height={16} rx={8} fill={GOLDL} opacity={0.7} />
      </G>
    </Stage>
  );
};
