import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Label } from "../../kit/scene-context";
import { EL, G, GOLD, GOLDL, HOV, INK, Lines, RED, SEC, Stage, Tag, XL, lerp, useT } from "../tro-ly-phap-che/art";
import { Captions, ClipWindow, SideTag } from "./kit";

const LOGO_DIR = "jobs/huong-dan-su-dung-tro-ly-phap-che/logos";
const ORANGE = "#E07B39";

/** Logo chính thức, chỉ phóng, mờ và dời chỗ, không đổi màu hay tỉ lệ. */
const Logo: React.FC<{ name: "claude" | "chrome" | "excel"; x: number; y: number; size: number; p: number }> = ({ name, x, y, size, p }) => (
  <Img
    src={staticFile(`${LOGO_DIR}/${name}.svg`)}
    style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, objectFit: "contain", transform: `scale(${p})`, opacity: Math.min(1, p) }}
  />
);

/** Mở đầu: chat ngoài thư mục đối chiếu với kết quả thật, rồi Kho và tiêu đề. */
export const MoDau: React.FC = () => {
  const { p, l } = useT();
  const clipOut = l(3, 0, 12);
  const bubble = l(0, 0.25, 12);
  const stamp = p(0, 0.6);
  const kho = p(3) * (1 - l(4, 0, 10));
  const rows = [l(3, 0.15, 14), l(3, 0.3, 14), l(3, 0.45, 14)];
  const lens = l(3, 0.65, 24);
  const title = p(4);
  const grid = l(4, 0.25, 24);
  return (
    <Stage
      still
      overlay={
        <AbsoluteFill>
          {/* Câu 1-3: quay màn hình thật. */}
          {clipOut < 1 && (
            <div style={{ opacity: 1 - clipOut }}>
              <ClipWindow
                shots={[
                  { clip: "v1", from: 3, to: 5, crop: { x: 600, y: 250, w: 1000, h: 563 } },
                  { clip: "v2", from: 62.6, to: 62.8, ring: { x: 380, y: 800, w: 600, h: 220 } },
                  { clip: "v3", from: 45, to: 47.4, crop: { x: 156, y: 80, w: 1608, h: 905 }, ring: { x: 530, y: 265, w: 185, h: 40 }, ringFill: ORANGE },
                  null,
                  null,
                ]}
              >
                {/* Câu 1: bong bóng trả lời từ trí nhớ, bị đóng dấu đỏ. */}
                <div style={{ position: "absolute", left: 300, top: 360, width: 740, opacity: bubble * (1 - l(1, 0, 8)) }}>
                  <div style={{ background: "#F4F1EA", borderRadius: 20, padding: "28px 34px", boxShadow: "0 18px 40px rgba(0,0,0,0.35)" }}>
                    {[1, 0.86, 0.92, 0.6].map((w, i) => (
                      <div key={i} style={{ height: 16, width: `${w * 100}%`, borderRadius: 8, background: "#B9B3A6", marginBottom: 16 }} />
                    ))}
                  </div>
                  <div style={{ position: "absolute", right: -30, top: -40, transform: `rotate(-10deg) scale(${2 - Math.min(1, stamp)})`, opacity: Math.min(1, stamp), fontSize: 48, fontWeight: 900, color: RED, border: `6px solid ${RED}`, borderRadius: 14, padding: "6px 24px", background: "rgba(255,255,255,0.9)", whiteSpace: "nowrap" }}>
                    <Label i={0} />
                  </div>
                </div>
              </ClipWindow>
              <SideTag row={0} p={p(1, 0.1)}>
                <Label i={1} />
              </SideTag>
              <SideTag row={1} p={p(1, 0.3)}>
                <Label i={2} />
              </SideTag>
              <SideTag row={2} p={p(2, 0.1)} color={ORANGE}>
                <Label i={3} />
              </SideTag>
            </div>
          )}
          {/* Câu 4: Excel, các dòng đã duyệt vào Kho, kính lúp tìm lại. */}
          <div style={{ opacity: Math.min(1, kho) }}>
            <Logo name="excel" x={420} y={500} size={300} p={kho} />
            <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
              <G x={1220} y={500} s={kho}>
                <rect x={-330} y={-300} width={660} height={600} rx={30} fill={EL} stroke={GOLD} strokeWidth={4} />
                {rows.map((t, i) => (
                  <g key={i} transform={`translate(${lerp(-700, 0, t)} ${120 - i * 120})`} opacity={t}>
                    <rect x={-270} y={-44} width={540} height={88} rx={14} fill="#181B22" stroke={XL} strokeWidth={4} />
                    <Lines x={-230} y={-14} w={360} n={2} gap={26} color={SEC} />
                    <circle cx={210} cy={0} r={22} fill={XL} />
                  </g>
                ))}
                <g transform={`translate(${lerp(-200, 200, lens)} ${lerp(140, -120, lens)})`} opacity={lens > 0 ? 1 : 0}>
                  <circle r={70} fill="rgba(224,194,134,0.12)" stroke={GOLDL} strokeWidth={10} />
                  <path d="M50 50 L120 120" stroke={GOLDL} strokeWidth={18} strokeLinecap="round" />
                </g>
              </G>
            </svg>
            <Tag i={4} x={1220} y={140} p={kho} solid />
          </div>
          {/* Câu 5: logo Claude ở giữa, lưới sáu nước × sáu lĩnh vực. */}
          <div style={{ opacity: Math.min(1, title) }}>
            <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
              {Array.from({ length: 36 }, (_, i) => {
                const col = i % 6;
                const row = Math.floor(i / 6);
                const d = Math.hypot(col - 2.5, row - 2.5) / 3.6;
                const k = Math.max(0, Math.min(1, grid * 1.6 - d * 0.6));
                return <rect key={i} x={960 - 330 + col * 110} y={480 - 330 + row * 110} width={96} height={96} rx={16} fill={HOV} stroke={GOLD} strokeWidth={2} opacity={0.55 * k} transform={`translate(0 ${(1 - k) * 30})`} />;
              })}
              <circle cx={960} cy={480} r={170 * Math.min(1, title)} fill={INK} stroke={GOLDL} strokeWidth={4} />
            </svg>
            <Logo name="claude" x={960} y={480} size={220} p={title} />
            <Tag i={5} x={960} y={130} p={title} size={44} solid />
            <Tag i={6} x={500} y={480} p={p(4, 0.35)} />
            <Tag i={7} x={1420} y={480} p={p(4, 0.45)} />
          </div>
          <Captions />
        </AbsoluteFill>
      }
    />
  );
};

/** Cần chuẩn bị: logo chính thức Claude, Google Chrome, Excel và file zip. */
export const CanChuanBi: React.FC = () => {
  const { p, l } = useT();
  const claude = p(0);
  const side = l(1, 0, 16);
  const pair = [p(1, 0.05), p(1, 0.3)];
  const up = l(2, 0, 14);
  const zip = p(2, 0.15);
  const open = l(2, 0.55, 14);
  const cy = lerp(430, 320, up);
  const scale = lerp(1, 0.85, up);
  return (
    <Stage
      still
      overlay={
        <AbsoluteFill>
          <Logo name="claude" x={960} y={cy} size={lerp(300, 220, side) * scale} p={claude} />
          <Logo name="chrome" x={lerp(960, 520, side)} y={cy} size={240 * scale} p={pair[0]} />
          <Logo name="excel" x={lerp(960, 1400, side)} y={cy} size={240 * scale} p={pair[1]} />
          <Tag i={0} x={960} y={lerp(650, 460, up)} p={claude} solid />
          <Tag i={1} x={960} y={lerp(740, 530, up)} p={p(0, 0.4)} color={XL} solid />
          <Tag i={2} x={520} y={lerp(650, 460, up)} p={pair[0]} />
          <Tag i={3} x={1400} y={lerp(650, 460, up)} p={pair[1]} />
          {/* Câu 3: file zip rơi xuống rồi mở thành thư mục. */}
          <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
            <G x={960} y={lerp(560, 720, Math.min(1, zip))} s={zip * 1.5} o={Math.min(1, zip)}>
              <g opacity={1 - open}>
                <rect x={-80} y={-100} width={160} height={200} rx={16} fill={EL} stroke={GOLDL} strokeWidth={5} />
                {[0, 1, 2, 3, 4].map((i) => (
                  <rect key={i} x={-10} y={-90 + i * 24} width={20} height={12} fill={GOLDL} />
                ))}
              </g>
              <g opacity={open} transform={`scale(${lerp(0.6, 1, open)})`}>
                <path d="M-150 -70 L-60 -70 L-30 -40 L150 -40 L150 90 L-150 90 Z" fill={EL} stroke={GOLD} strokeWidth={6} />
                <rect x={-120} y={-10} width={240} height={20} rx={10} fill={GOLDL} opacity={0.6} />
              </g>
            </G>
          </svg>
          <Tag i={4} x={560} y={720} p={zip} solid />
          <Tag i={5} x={1360} y={720} p={p(2, 0.55)} />
          <Captions />
        </AbsoluteFill>
      }
    />
  );
};
