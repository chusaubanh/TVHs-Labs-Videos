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

/** Cảnh 5: Giao việc tra cứu (Screen recording 1.mp4 0:35 - 1:38) */
export const GiaoYeuCau: React.FC = () => {
  const { p } = useT();

  return (
    <Stage
      overlay={
        <>
          <Tag i={0} x={480} y={80} p={p(0)} solid />
          <Tag i={1} x={1440} y={80} p={p(1)} />
        </>
      }
    >
      <ScreenMockup
        videoSrc="raw-recordings/tro-ly-phap-che/1.mp4"
        startFrom={1050}
        x={160}
        y={140}
        w={1600}
        h={850}
        scale={p(0)}
      />
    </Stage>
  );
};

/** Cảnh 6: Trạm dừng một - Duyệt danh mục */
export const TramDung1: React.FC = () => {
  const { f, p } = useT();
  const stopSign = p(0);
  const docIn = p(1);
  const lockIn = p(2);

  return (
    <Stage
      overlay={
        <>
          <Tag i={0} x={420} y={130} p={stopSign} color={RED} solid />
          <Tag i={1} x={960} y={130} p={docIn} />
          <Tag i={2} x={1500} y={130} p={lockIn} color={GOLDL} solid />
        </>
      }
    >
      {/* Biển báo trạm dừng 1 */}
      <G x={460} y={520} s={stopSign * 1.1}>
        <Box cx={0} cy={0} w={480} h={520} rx={28} fill={EL} stroke={RED} strokeWidth={4} />
        {/* Hình bát giác STOP */}
        <polygon
          points="0,-140 70,-140 120,-90 120,-20 70,30 0,30 -50,-20 -50,-90"
          transform="translate(-35, 10) scale(1.4)"
          fill={RED}
        />
        {/* Biểu tượng bàn tay dừng */}
        <rect x={-14} y={-70} width={28} height={50} rx={14} fill="#FFF" />
        <rect x={-120} y={70} width={240} height={28} rx={14} fill={HOV} />
        <rect x={-180} y={120} width={360} height={50} rx={25} fill="#3A1C1C" />
        <rect x={-110} y={136} width={220} height={18} rx={9} fill="#FFA3A3" />
      </G>

      {/* File danh mục 01-danh-sach-nghia-vu.md */}
      <G x={960} y={520} s={docIn * 1.1}>
        <Box cx={0} cy={0} w={480} h={520} rx={28} fill={EL} stroke={GOLD} strokeWidth={3} />
        <rect x={-180} y={-210} width={360} height={48} rx={12} fill="#232733" />
        <circle cx={-140} cy={-186} r={8} fill={GOLDL} />
        <rect x={-110} y={-196} width={220} height={20} rx={10} fill={HOV} />
        {/* Nội dung danh sách */}
        <rect x={-200} y={-140} width={400} height={230} rx={16} fill="#111317" />
        {[0, 1, 2, 3].map((row) => (
          <g key={row} transform={`translate(-180, ${-110 + row * 52})`}>
            <circle cx={12} cy={8} r={8} fill={GOLDL} />
            <Lines x={35} y={4} w={320} n={1} color={TXT} t={12} />
          </g>
        ))}
        {/* Nút Đồng ý */}
        <rect x={-160} y={120} width={320} height={64} rx={32} fill={XL} />
        <path d="M-18 152 L-6 164 L18 138" stroke={INK} strokeWidth={6} strokeLinecap="round" fill="none" />
        <rect x={-60} y={142} width={120} height={20} rx={10} fill={INK} />
      </G>

      {/* Khóa an toàn */}
      <G x={1460} y={520} s={lockIn * 1.1}>
        <Box cx={0} cy={0} w={480} h={520} rx={28} fill={EL} stroke="rgba(255,255,255,0.15)" strokeWidth={3} />
        {/* Hình ổ khóa lớn */}
        <path
          d="M-40 -40 C-40 -110, 40 -110, 40 -40"
          fill="none"
          stroke={GOLDL}
          strokeWidth={14}
          strokeLinecap="round"
        />
        <rect x={-70} y={-40} width={140} height={120} rx={20} fill={GOLD} />
        <circle cx={0} cy={10} r={14} fill={INK} />
        <rect x={-5} y={15} width={10} height={25} rx={3} fill={INK} />
        <rect x={-120} y={115} width={240} height={26} rx={13} fill={HOV} />
        <rect x={-80} y={155} width={160} height={18} rx={9} fill={SEC} opacity={0.6} />
      </G>
    </Stage>
  );
};

/** Cảnh 7: Hướng dẫn tải bằng chứng (Screen recording 2.mp4 0:00 - 1:08) */
export const HuongDanTai: React.FC = () => {
  const { p } = useT();

  return (
    <Stage
      overlay={
        <>
          <Tag i={0} x={420} y={80} p={p(0)} solid />
          <Tag i={1} x={960} y={80} p={p(1)} />
          <Tag i={2} x={1500} y={80} p={p(2)} solid />
        </>
      }
    >
      <ScreenMockup
        videoSrc="raw-recordings/tro-ly-phap-che/2.mp4"
        startFrom={0}
        x={160}
        y={140}
        w={1600}
        h={850}
        scale={p(0)}
      />
    </Stage>
  );
};

/** Cảnh 8: Lưu tay văn bản luật (Screen recording 3.mp4 0:00 - 0:42) */
export const LuuTayVanBan: React.FC = () => {
  const { p } = useT();

  return (
    <Stage
      overlay={
        <>
          <Tag i={0} x={450} y={80} p={p(0)} solid />
          <Tag i={1} x={960} y={80} p={p(1)} />
          <Tag i={2} x={1480} y={80} p={p(2)} solid />
        </>
      }
    >
      <ScreenMockup
        videoSrc="raw-recordings/tro-ly-phap-che/3.mp4"
        startFrom={0}
        x={160}
        y={140}
        w={1600}
        h={850}
        scale={p(0)}
      />
    </Stage>
  );
};
