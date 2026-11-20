import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { Label } from "../../kit/scene-context";
import {
  BORDER_COLOR,
  BrandMovingBackground,
  CARD_BG,
  FullScreenClipStage,
  GLASS_BG,
  GOLD,
  GOLDL,
  GREEN,
  INK,
  ORANGE,
  RED,
  SEC,
  SURF,
  TXT,
  VideoStage,
  useT,
} from "./kit";
import { Box, Doc, EL, G, HOV, Lines, Spark, Tag, XL, lerp } from "../shared/art";

const PANEL_BG = "#1A1D27";
const BLUE = "#3B82F6";

/** Cảnh 1: Mở đầu B-roll: Nỗi đau thủ công ↔ Giải pháp tự động */
export const NoiDauThuCong: React.FC = () => {
  const { f, p } = useT();

  const titleP = p(0, 0.02);
  const leftCardP = p(0, 0.12);
  const rightCardP = p(1, 0.05);

  const pulse = 1 + 0.03 * Math.sin(f * 0.15);
  const rotClock = (f * 2.5) % 360;

  return (
    <VideoStage
      overlay={
        <>
          <Tag i={0} x={480} y={150} p={leftCardP} size={36} solid color={RED} />
          <Tag i={1} x={1440} y={150} p={rightCardP} size={36} solid color={GREEN} />
          <Tag i={2} x={1260} y={880} p={rightCardP} size={32} solid />
          <Tag i={3} x={1620} y={880} p={rightCardP} size={32} solid color={GOLD} />
        </>
      }
    >
      <G x={960} y={540} s={titleP}>
        {/* Khung panel lớn bao quát phong cách Dashboard */}
        <Box cx={0} cy={0} w={1640} h={680} rx={28} fill={PANEL_BG} stroke={BORDER_COLOR} strokeWidth={3} />

        {/* Header bar của panel */}
        <Box cx={0} cy={-295} w={1640} h={60} rx={24} fill="#141722" />
        <circle cx={-770} cy={-295} r={9} fill={RED} />
        <circle cx={-740} cy={-295} r={9} fill={GOLD} />
        <circle cx={-710} cy={-295} r={9} fill={GREEN} />
        <rect x={-200} y={-308} width={400} height={26} rx={13} fill="rgba(197, 160, 89, 0.12)" />

        {/* Nửa Trái: Cách làm cũ (Thủ công, mất 20-40p, sai số) */}
        <G x={-420} y={40} s={leftCardP}>
          <Box cx={0} cy={0} w={680} h={500} rx={22} fill="#141720" stroke="rgba(239, 68, 68, 0.5)" strokeWidth={3} />
          {/* Vầng sáng đỏ cảnh báo */}
          <circle cx={-180} cy={-110} r={75} fill="rgba(239, 68, 68, 0.08)" />
          {/* Đồng hồ đếm thời gian với kim quay liên tục */}
          <circle cx={-180} cy={-110} r={55} fill="rgba(239, 68, 68, 0.18)" stroke={RED} strokeWidth={3.5} />
          <g transform={`rotate(${rotClock} -180 -110)`}>
            <line x1={-180} y1={-110} x2={-180} y2={-150} stroke={RED} strokeWidth={4} strokeLinecap="round" />
          </g>
          <line x1={-180} y1={-110} x2={-155} y2={-110} stroke={RED} strokeWidth={4} strokeLinecap="round" />
          {/* File Word cũ bị vỡ thể thức & cảnh báo lỗi */}
          <G x={120} y={-100} s={0.9}><Doc w={160} h={200} n={4} fill="#2A1B1B" /></G>
          <path d="M 80 -140 L 160 -60 M 160 -140 L 80 -60" stroke={RED} strokeWidth={4} strokeLinecap="round" />
          <Lines x={-260} y={60} w={520} n={4} gap={36} color="rgba(239, 68, 68, 0.45)" t={12} />
        </G>

        {/* Đường spline chuyển hóa công nghệ uốn lượn có photon ánh sáng */}
        <path
          d="M -70 40 C -20 0, 20 80, 70 40"
          fill="none"
          stroke={GOLDL}
          strokeWidth={5}
          strokeDasharray="10 8"
          strokeDashoffset={-f * 2}
        />
        <G x={0} y={40} s={1.2 * pulse}>
          <circle cx={0} cy={0} r={28} fill="#141722" stroke={GOLD} strokeWidth={3} />
          <Spark r={18} fill={GOLDL} />
        </G>

        {/* Nửa Phải: Hệ thống mới (Trợ lý AI, 5-10p, 12 chốt máy tự kiểm) */}
        <G x={420} y={40} s={rightCardP * pulse}>
          <Box cx={0} cy={0} w={680} h={500} rx={22} fill="#141720" stroke="rgba(34, 197, 94, 0.6)" strokeWidth={3} />
          {/* Vầng sáng xanh ngọc công nghệ */}
          <circle cx={-180} cy={-110} r={75} fill="rgba(34, 197, 94, 0.1)" />
          {/* Biểu tượng 12 chốt kiểm tra xoay nhẹ với 12 điểm chấm */}
          <circle cx={-180} cy={-110} r={55} fill="rgba(34, 197, 94, 0.2)" stroke={GREEN} strokeWidth={3.5} />
          <g transform={`rotate(${f * 0.8} -180 -110)`}>
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <circle
                  key={i}
                  cx={-180 + Math.cos(rad) * 44}
                  cy={-110 + Math.sin(rad) * 44}
                  r={3.5}
                  fill={GREEN}
                />
              );
            })}
          </g>
          <path d="M -200 -110 L -185 -95 L -160 -125" fill="none" stroke={GREEN} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          {/* File Word xuất chuẩn 100% mẫu tỏa sáng vàng kim */}
          <G x={120} y={-100} s={0.9}><Doc w={160} h={200} n={5} fill="#182A20" /></G>
          <G x={120} y={-100} s={1.1}><Spark r={22} fill={GOLDL} /></G>
          <Lines x={-260} y={60} w={520} n={4} gap={36} color="rgba(34, 197, 94, 0.55)" t={12} />
        </G>
      </G>
    </VideoStage>
  );
};

/** Cảnh 2: Nguyên tắc cốt lõi: Phân vai Người và Máy */
export const NguyenTacPhanVai: React.FC = () => {
  const { f, p } = useT();

  const titleP = p(0, 0.02);
  const personP = p(0, 0.15);
  const machineP = p(1, 0.05);

  const rot1 = (f * 0.7) % 360;
  const rot2 = (-f * 0.5) % 360;
  const pulse = 1 + 0.03 * Math.sin(f * 0.12);

  return (
    <VideoStage
      overlay={
        <>
          <Tag i={0} x={960} y={130} p={titleP} size={42} solid />
          <Tag i={1} x={520} y={870} p={personP} size={34} solid color={BLUE} />
          <Tag i={2} x={1400} y={870} p={machineP} size={34} solid color={GREEN} />
        </>
      }
    >
      <G x={960} y={520} s={titleP}>
        {/* Khung panel lớn */}
        <Box cx={0} cy={0} w={1640} h={640} rx={28} fill={PANEL_BG} stroke={BORDER_COLOR} strokeWidth={3} />

        {/* Header bar của panel */}
        <Box cx={0} cy={-275} w={1640} h={60} rx={24} fill="#141722" />
        <circle cx={-770} cy={-275} r={9} fill={RED} />
        <circle cx={-740} cy={-275} r={9} fill={GOLD} />
        <circle cx={-710} cy={-275} r={9} fill={GREEN} />

        {/* Cột Trái: Chuyên viên kế toán (Số & Chữ ký của người) */}
        <G x={-440} y={-10} s={personP}>
          <Box cx={0} cy={0} w={540} h={420} rx={22} fill="#151A26" stroke={BLUE} strokeWidth={3} />
          {/* Biểu tượng Người & Bút ký */}
          <circle cx={0} cy={-70} r={52} fill="rgba(59, 130, 246, 0.2)" stroke={BLUE} strokeWidth={3} />
          <circle cx={0} cy={-82} r={24} fill={BLUE} />
          <path d="M -34 -35 C -34 -55, 34 -55, 34 -35" fill="none" stroke={BLUE} strokeWidth={4} />
          {/* Hoá đơn và bút ký số */}
          <path d="M -70 50 L 70 50 M -70 90 L 30 90" stroke={SEC} strokeWidth={6} strokeLinecap="round" />
          <path d="M 60 70 L 100 30" stroke={GOLDL} strokeWidth={5} strokeLinecap="round" />
        </G>

        {/* Lõi AI Điều Phối Ở Trung Tâm (AI Orchestrator) */}
        <G x={0} y={-10} s={pulse}>
          {/* Hào quang nền */}
          <circle cx={0} cy={0} r={110} fill="rgba(197, 160, 89, 0.08)" />
          {/* Vòng ngoài xoay */}
          <g transform={`rotate(${rot1})`}>
            <circle cx={0} cy={0} r={90} fill="none" stroke={GOLDL} strokeWidth={3} strokeDasharray="30 15" />
            <circle cx={90} cy={0} r={7} fill={GOLD} />
            <circle cx={-90} cy={0} r={7} fill={GOLD} />
          </g>
          {/* Vòng trong xoay ngược */}
          <g transform={`rotate(${rot2})`}>
            <circle cx={0} cy={0} r={65} fill="none" stroke={GREEN} strokeWidth={3} strokeDasharray="20 12" />
            <circle cx={0} cy={65} r={6} fill={GREEN} />
            <circle cx={0} cy={-65} r={6} fill={GREEN} />
          </g>
          {/* Nhân tâm */}
          <circle cx={0} cy={0} r={45} fill={INK} stroke={GOLD} strokeWidth={4} />
          <Spark r={18} fill={GOLDL} />
        </G>

        {/* Dòng spline truyền dữ liệu Người -> AI -> Máy */}
        <path
          d="M -170 -10 C -80 -10, -80 -10, 0 -10 C 80 -10, 80 -10, 170 -10"
          fill="none"
          stroke={GOLD}
          strokeWidth={5}
          strokeDasharray="12 8"
          strokeDashoffset={-f * 2.5}
        />

        {/* Cột Phải: Máy chạy ngầm (Tính toán & So khớp 12 chốt) */}
        <G x={440} y={-10} s={machineP}>
          <Box cx={0} cy={0} w={540} h={420} rx={22} fill="#15241C" stroke={GREEN} strokeWidth={3} />
          {/* Trạm xử lý dữ liệu AI */}
          <circle cx={0} cy={-70} r={52} fill="rgba(34, 197, 94, 0.2)" stroke={GREEN} strokeWidth={3} />
          <g transform={`rotate(${rot1} 0 -70)`}>
            <circle cx={0} cy={-70} r={34} fill="none" stroke={GREEN} strokeWidth={3.5} strokeDasharray="18 10" />
          </g>
          <G x={0} y={-70} s={0.9}><Spark r={18} fill={GOLDL} /></G>
          {/* Sóng đồ thị dữ liệu nhảy múa */}
          {[-60, -30, 0, 30, 60].map((dx, i) => (
            <rect
              key={i}
              x={dx - 5}
              y={60}
              width={10}
              height={24 + 14 * Math.sin(f * 0.2 + i)}
              rx={5}
              fill={GREEN}
            />
          ))}
        </G>
      </G>
    </VideoStage>
  );
};

/** Cảnh 3: Bước 1: Thiết lập Project trên Claude Desktop (Screencast TOÀN PHẦN) */
export const ThietLapProject: React.FC = () => (
  <FullScreenClipStage
    shots={[
      { clip: "v1", from: 0, to: 15 },
      { clip: "v1", from: 15, to: 38.5 },
    ]}
    tags={[
      [0, 0, 1540, 120, GLASS_BG, GOLDL, "📁"],
      [1, 0, 1540, 210, GLASS_BG, BLUE, "💼"],
      [2, 1, 1540, 300, GLASS_BG, TXT, "📂"],
      [3, 1, 1540, 390, GLASS_BG, GREEN, "✅"],
    ]}
  />
);

/** Cảnh 4: Bước 2: Khởi động và Kiểm tra 5 công cụ (Screencast TOÀN PHẦN) */
export const KhoiDongKiemTra: React.FC = () => (
  <FullScreenClipStage
    shots={[
      { clip: "v2", from: 0, to: 12 },
      { clip: "v2", from: 55, to: 91 },
    ]}
    tags={[
      [0, 0, 1540, 120, GLASS_BG, GOLDL, "⚡"],
      [1, 0, 1540, 210, GLASS_BG, TXT, "💬"],
      [2, 1, 1540, 300, GLASS_BG, GREEN, "⚙️"],
      [3, 1, 1540, 390, GLASS_BG, BLUE, "🛡️"],
    ]}
  />
);

/** Cảnh 5: Bước 3: Nhập chi phí ban đầu & AI bắt số tạm (Screencast TOÀN PHẦN) */
export const NhapChiPhiSoTam: React.FC = () => (
  <FullScreenClipStage
    shots={[
      { clip: "v3", from: 0, to: 15 },
      { clip: "v3", from: 50, to: 85 },
    ]}
    tags={[
      [0, 0, 1540, 120, GLASS_BG, GOLDL, "📝"],
      [1, 0, 1540, 210, GLASS_BG, BLUE, "👤"],
      [2, 1, 1540, 300, GLASS_BG, ORANGE, "⚠️"],
      [3, 1, 1540, 390, GLASS_BG, TXT, "🔍"],
    ]}
  />
);

/** Cảnh 6: Bước 4: Nhập số thật & Chốt chặn lệch tiền (Screencast TOÀN PHẦN) */
export const ChotChanLechTien: React.FC = () => (
  <FullScreenClipStage
    shots={[
      { clip: "v3", from: 95, to: 130 },
      { clip: "v3", from: 140, to: 180 },
    ]}
    tags={[
      [0, 0, 1540, 120, GLASS_BG, BLUE, "✈️"],
      [1, 0, 1540, 210, GLASS_BG, TXT, "💵"],
      [2, 1, 1540, 300, "rgba(249, 115, 22, 0.95)", TXT, "🚨"],
      [3, 1, 1540, 390, GLASS_BG, ORANGE, "⚠️"],
    ]}
  />
);

/** Cảnh 7: Bước 5: Kế toán xác nhận & AI xuất 2 file Word (Screencast TOÀN PHẦN) */
export const XacNhanXuatWord: React.FC = () => (
  <FullScreenClipStage
    shots={[
      { clip: "v3", from: 270, to: 290 },
      { clip: "v3", from: 350, to: 375 },
    ]}
    tags={[
      [0, 0, 1540, 120, GLASS_BG, GOLDL, "✍️"],
      [1, 0, 1540, 210, GLASS_BG, GREEN, "✅"],
      [2, 1, 1540, 300, GLASS_BG, BLUE, "📄"],
      [3, 1, 1540, 390, GLASS_BG, TXT, "📦"],
    ]}
  />
);

/** Cảnh 8: Bước 6: Soát file Word thực tế & Nghi thức 3Đ (Screencast & B-roll) */
export const KiemTraNghiThuc3D: React.FC = () => {
  const { p } = useT();
  const shieldP = p(1, 0.02);
  const s1P = p(1, 0.1);
  const s2P = p(1, 0.28);
  const s3P = p(1, 0.46);

  return (
    <FullScreenClipStage
      shots={[
        { clip: "v3", from: 415, to: 429 },
        null,
      ]}
      tags={[
        [0, 0, 1540, 120, GLASS_BG, BLUE, "📄"],
        [1, 1, 1540, 120, GLASS_BG, GOLDL, "🛡️"],
      ]}
    >
      {/* Khi sang câu 2: Đồ họa 3 chiếc khiên Nghi thức 3Đ phủ lên sang trọng lần lượt */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0A0C12",
          opacity: Math.min(1, shieldP),
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          zIndex: 80,
          overflow: "hidden",
        }}
      >
        <BrandMovingBackground />
        <div style={{ display: "flex", gap: 60, zIndex: 2 }}>
          {/* Khiên 1: Đọc trọn */}
          <div
            style={{
              width: 320,
              height: 420,
              background: "#141720",
              border: `2px solid ${GOLD}`,
              borderRadius: 24,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
              transform: `scale(${s1P})`,
              opacity: Math.min(1, s1P),
            }}
          >
            <div style={{ fontSize: 72 }}>📖</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: GOLDL }}><Label i={2} /></div>
          </div>

          {/* Khiên 2: Đối chiếu */}
          <div
            style={{
              width: 320,
              height: 420,
              background: "#141720",
              border: `2px solid ${GREEN}`,
              borderRadius: 24,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
              transform: `scale(${s2P})`,
              opacity: Math.min(1, s2P),
            }}
          >
            <div style={{ fontSize: 72 }}>⚖️</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: GREEN }}><Label i={3} /></div>
          </div>

          {/* Khiên 3: Đứng tên */}
          <div
            style={{
              width: 320,
              height: 420,
              background: "#141720",
              border: `2px solid ${BLUE}`,
              borderRadius: 24,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
              transform: `scale(${s3P})`,
              opacity: Math.min(1, s3P),
            }}
          >
            <div style={{ fontSize: 72 }}>✍️</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: BLUE }}><Label i={4} /></div>
          </div>
        </div>
      </div>
    </FullScreenClipStage>
  );
};
