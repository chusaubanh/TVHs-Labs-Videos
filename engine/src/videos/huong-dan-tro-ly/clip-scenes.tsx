import React from "react";
import { AbsoluteFill } from "remotion";
import { Label } from "../../kit/scene-context";
import { GOLD, GOLDL, INK, RED, Stage, XL, useT } from "../tro-ly-phap-che/art";
import { Captions, ClipWindow, SideTag, WIN, type Shot } from "./kit";

/** Nền chung của cảnh quay màn hình: khung clip, cột nhãn, phụ đề. */
const ClipStage: React.FC<{ shots: (Shot | null)[]; tags: [label: number, sentence: number, color?: string][]; children?: React.ReactNode; inWindow?: React.ReactNode }> = ({ shots, tags, children, inWindow }) => {
  const { p } = useT();
  return (
    <Stage
      still
      overlay={
      <AbsoluteFill>
        <ClipWindow shots={shots}>{inWindow}</ClipWindow>
        {tags.map(([label, sentence, color], row) => (
          <SideTag key={label} row={row} p={p(sentence, 0.05)} color={color}>
            <Label i={label} />
          </SideTag>
        ))}
        {children}
        <Captions />
      </AbsoluteFill>
      }
    />
  );
};

/** Bước 2: tạo project gắn thư mục v2. Giây nguồn đo trên video 1. */
export const TaoProject: React.FC = () => {
  const { p } = useT();
  const warn = p(3);
  return (
    <ClipStage
      shots={[
        { clip: "v1", from: 4, to: 10 },
        { clip: "v1", from: 10, to: 17.5 },
        { clip: "v1", from: 19.0, to: 19.9, ring: { x: 430, y: 388, w: 900, h: 30 } },
        { clip: "v1", from: 24.2, to: 27, crop: { x: 560, y: 420, w: 720, h: 405 }, ring: { x: 810, y: 592, w: 130, h: 28 } },
      ]}
      tags={[[0, 0], [1, 1], [2, 2], [3, 3, RED]]}
      inWindow={
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 70 * warn, background: RED, opacity: Math.min(1, warn) * 0.92 }} />
      }
    />
  );
};

/** Bước 5: gõ yêu cầu và gửi. */
export const GiaoYeuCau: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v1", from: 27, to: 32, crop: { x: 700, y: 380, w: 770, h: 433 } },
      { clip: "v1", from: 32, to: 38 },
      { clip: "v1", from: 36.5, to: 46, ring: { x: 1428, y: 538, w: 40, h: 40 }, ringTo: 0.2 },
    ]}
    tags={[[0, 0], [1, 0], [2, 0], [3, 2, GOLD]]}
  />
);

/** Phần A: Claude hỏi lại từng câu. */
export const ClaudeHoiLai: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v1", from: 62, to: 81 },
      { clip: "v1", from: 83, to: 89 },
      { clip: "v1", from: 89, to: 93, ring: [{ x: 470, y: 545, w: 520, h: 45 }, { x: 440, y: 740, w: 220, h: 32 }] },
    ]}
    tags={[[0, 0], [1, 2], [2, 2]]}
  />
);

/** Phần B: link bị chặn thì trả lời để bỏ qua. */
export const CongChan: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v2", from: 2.5, to: 3.8, ring: { x: 250, y: 126, w: 230, h: 30 } },
      { clip: "v2", from: 4.5, to: 9 },
      { clip: "v2", from: 22, to: 34, crop: { x: 180, y: 300, w: 700, h: 394 } },
    ]}
    tags={[[0, 0], [1, 1], [2, 2, GOLD]]}
  />
);

/** Mở thư mục bang-chung và file hướng dẫn tải. */
export const MoHuongDanTai: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v2", from: 46, to: 52.5, crop: { x: 820, y: 180, w: 860, h: 484 } },
      { clip: "v2", from: 52.5, to: 57.7, crop: { x: 560, y: 200, w: 1200, h: 675 } },
      { clip: "v2", from: 57.7, to: 57.8, crop: { x: 560, y: 200, w: 1200, h: 675 }, ring: { x: 668, y: 656, w: 26, h: 26 }, tick: true },
    ]}
    tags={[[0, 0], [1, 0], [2, 1], [3, 2, XL]]}
  />
);

/** Lưu văn bản luật thành PDF vào bang-chung; câu cuối là b-roll phím Ctrl+P. */
export const LuuVanBanLuat: React.FC = () => {
  const { p, l } = useT();
  const keys = p(4) * (1 - l(4, 0.45, 8));
  return (
    <ClipStage
      shots={[
        { clip: "v2", from: 58.5, to: 68 },
        { clip: "v3", from: 0, to: 5 },
        { clip: "v3", from: 5, to: 21 },
        { clip: "v3", from: 21, to: 29.5 },
        { clip: "v3", from: 6.5, to: 7.6 },
      ]}
      tags={[[0, 1], [1, 2], [2, 3], [3, 4, GOLD]]}
      inWindow={
        <div style={{ position: "absolute", inset: 0, background: `rgba(12,12,12,${0.78 * Math.min(1, keys)})`, display: "flex", alignItems: "center", justifyContent: "center", gap: 40, opacity: Math.min(1, keys) }}>
          {/* Phím bấm xuống: nhấn lún theo nhịp câu. */}
          <div
            style={{
              transform: `scale(${keys}) translateY(${keys > 0.98 ? 8 : 0}px)`,
              padding: "36px 70px",
              borderRadius: 26,
              background: "#1E1F23",
              border: `4px solid ${GOLDL}`,
              boxShadow: `0 ${keys > 0.98 ? 4 : 12}px 0 ${GOLD}`,
              fontSize: 96,
              fontWeight: 800,
              color: GOLDL,
            }}
          >
            <Label i={3} />
          </div>
        </div>
      }
    />
  );
};

/** Bước 6: mở file Excel; câu 3 là quay màn hình sheet Cần kiểm tay, các câu khác là b-roll. */
export const MoFileExcel: React.FC = () => {
  const { p, l } = useT();
  const path = p(0);
  const report = p(1);
  const clipIn = l(2, 0, 10);
  const clipOut = l(3, 0, 10);
  const tabs = [p(3, 0.1), p(3, 0.3), p(3, 0.5), p(3, 0.7)];
  const stamp = p(4);
  const showClip = clipIn > 0 && clipOut < 1;
  return (
    <Stage
      still
      overlay={
      <AbsoluteFill>
        {/* Câu 1-2: đường dẫn tới file Excel và báo cáo kiểm. */}
        <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: 1 - clipIn + clipOut }}>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${260 + i * 420} 330) scale(${Math.min(1, Math.max(0, path * 3 - i))})`}>
              <rect x={-150} y={-90} width={300} height={180} rx={22} fill="#1E1F23" stroke={i === 2 ? "#107C41" : GOLD} strokeWidth={4} />
              <path d={i === 2 ? "M-60 -40 L60 -40 L60 40 L-60 40 Z M-60 0 L60 0 M0 -40 L0 40" : "M-70 -40 L-20 -40 L0 -20 L70 -20 L70 50 L-70 50 Z"} fill="none" stroke={i === 2 ? "#3FBF7F" : GOLDL} strokeWidth={6} />
            </g>
          ))}
          {[0, 1].map((i) => (
            <path key={i} d={`M${420 + i * 420} 330 L${470 + i * 420} 330`} stroke={GOLDL} strokeWidth={6} opacity={Math.min(1, Math.max(0, path * 3 - i - 1))} />
          ))}
          <g transform={`translate(${1100 + 300 * report} 560) scale(${report})`}>
            <rect x={-140} y={-100} width={280} height={200} rx={18} fill="#181B22" stroke={GOLD} strokeWidth={3} />
            {[0, 1, 2, 3].map((r) => (
              <rect key={r} x={-100} y={-60 + r * 36} width={r === 0 ? 140 : 200 - r * 30} height={16} rx={8} fill={r === 0 ? GOLDL : "#3E4148"} />
            ))}
          </g>
          {/* Câu 4: dải tab sheet ở chân Excel. */}
          <g transform="translate(960 760)" opacity={clipOut}>
            {tabs.map((t, i) => (
              <rect key={i} x={-660 + i * 340} y={-36} width={300} height={72} rx={14} fill={i === 3 ? "#E07B39" : "#1E1F23"} stroke={GOLD} strokeWidth={3} transform={`scale(1 ${t})`} />
            ))}
          </g>
        </svg>
        {/* Nhãn cho đường dẫn và các tab. */}
        <div style={{ position: "absolute", left: 1400, top: 680, transform: `translate(-50%,-50%) scale(${report})`, opacity: (1 - clipIn + clipOut) * Math.min(1, report), fontSize: 30, fontWeight: 700, color: INK, background: GOLDL, padding: "10px 24px", borderRadius: 999 }}>
          <Label i={0} />
        </div>
        {([[3, 0], [4, 2], [5, 3]] as const).map(([label, tab]) => (
          <div key={label} style={{ position: "absolute", left: 450 + tab * 340, top: 850, transform: `translate(-50%,-50%) scale(${tabs[tab]})`, opacity: clipOut * Math.min(1, tabs[tab]), fontSize: 28, fontWeight: 700, color: GOLDL, whiteSpace: "nowrap" }}>
            <Label i={label} />
          </div>
        ))}
        {/* Câu 5: con dấu bản nháp. */}
        <div style={{ position: "absolute", left: 960, top: 300, transform: `translate(-50%,-50%) rotate(-8deg) scale(${2 - stamp})`, opacity: Math.min(1, stamp), fontSize: 54, fontWeight: 900, color: RED, border: `6px solid ${RED}`, borderRadius: 16, padding: "12px 36px", background: "rgba(12,12,12,0.85)", whiteSpace: "nowrap" }}>
          <Label i={6} />
        </div>
        {/* Câu 3: quay màn hình sheet Cần kiểm tay. */}
        {showClip && (
          <div style={{ opacity: Math.min(clipIn, 1 - clipOut) }}>
            <ClipWindow shots={[null, null, { clip: "v3", from: 45, to: 47.4, crop: { x: 156, y: 80, w: 1608, h: 905 }, ring: { x: 376, y: 462, w: 330, h: 34 }, ringFill: "#E07B39" }, null, null]} />
            <SideTag row={0} p={clipIn} color="#E07B39">
              <Label i={1} />
            </SideTag>
            <SideTag row={1} p={clipIn}>
              <Label i={2} />
            </SideTag>
          </div>
        )}
        <Captions />
      </AbsoluteFill>
      }
    />
  );
};
