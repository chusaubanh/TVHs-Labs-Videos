import React from "react";
import { Img, staticFile } from "remotion";
import { Label } from "../../kit/scene-context";
import { Box, EL, G, GOLD, GOLDL, HOV, INK, Lines, SEC, Stage as BaseStage, SURF, Tag as BaseTag, TXT, useT } from "../mo-dau/art";

/** Nội dung thu vào để chừa lề 60 px kể cả khi máy quay trôi tới 1,03; nền vẫn phủ kín khung. */
const SAFE_INSET = 0.86;
export const Stage: React.FC<React.ComponentProps<typeof BaseStage>> = (props) => <BaseStage {...props} inset={SAFE_INSET} />;
/** Sau khi thu, nhãn phải còn đủ 28 px trên khung 1080. */
const MIN_LABEL = Math.ceil(28 / SAFE_INSET);
export const Tag: React.FC<React.ComponentProps<typeof BaseTag>> = ({ size = 40, ...rest }) => <BaseTag {...rest} size={Math.max(size, MIN_LABEL)} />;

/** Tranh riêng của bộ video Facebook Ads, vẽ cho khổ 4:5 như bộ tranh gốc. */
export const Target: React.FC<{ r?: number; arrow?: number }> = ({ r = 90, arrow = 1 }) => (
  <g>
    <circle r={r} fill={TXT} />
    <circle r={r * 0.68} fill={GOLD} />
    <circle r={r * 0.36} fill={TXT} />
    <circle r={r * 0.14} fill={INK} />
    <g opacity={arrow > 0 ? 1 : 0}>
      <line x1={r * 1.1 * arrow} y1={-r * 1.1 * arrow} x2={0} y2={0} stroke={GOLDL} strokeWidth={r * 0.09} strokeLinecap="round" />
    </g>
  </g>
);

export const Phone: React.FC<{ w?: number; h?: number; children?: React.ReactNode }> = ({ w = 220, h = 420, children }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={w * 0.13} fill={INK} stroke={TXT} strokeWidth={Math.max(4, w * 0.03)} />
    <rect x={-w * 0.13} y={-h / 2 + 12} width={w * 0.26} height={8} rx={4} fill={HOV} />
    {children}
  </g>
);

/** Một bài quảng cáo trong điện thoại. hi: phần đang được nói tới, -1 là không phần nào. */
export const Post: React.FC<{ w?: number; h?: number; hi?: number; art?: string }> = ({ w = 190, h = 370, hi = -1, art = GOLD }) => {
  const c = (i: number, base: string) => (hi === i ? GOLDL : base);
  const x = -w / 2;
  const y = -h / 2 + 20;
  return (
    <g>
      <circle cx={x + 24} cy={y + 22} r={16} fill={c(0, SEC)} />
      <rect x={x + 50} y={y + 15} width={w * 0.5} height={13} rx={6} fill={c(0, HOV)} />
      <rect x={x + 8} y={y + 50} width={w - 16} height={h * 0.42} rx={10} fill={c(1, art)} />
      <path d={`M${x + 28} ${y + 50 + h * 0.36} L${x + w * 0.4} ${y + 50 + h * 0.14} L${x + w * 0.62} ${y + 50 + h * 0.29} L${x + w * 0.76} ${y + 50 + h * 0.2} L${x + w - 22} ${y + 50 + h * 0.36} Z`} fill={INK} opacity={0.45} />
      <rect x={x + 10} y={y + 58 + h * 0.42} width={w * 0.8} height={15} rx={7} fill={c(2, TXT)} />
      <rect x={x + 10} y={y + 82 + h * 0.42} width={w * 0.66} height={11} rx={5} fill={c(3, SEC)} />
      <rect x={x + 10} y={y + 100 + h * 0.42} width={w * 0.5} height={11} rx={5} fill={c(4, HOV)} />
      <rect x={x + 10} y={y + 120 + h * 0.42} width={w - 20} height={Math.max(26, h * 0.09)} rx={9} fill={c(5, GOLD)} />
    </g>
  );
};

export const Eye: React.FC<{ r?: number; open?: number; fill?: string }> = ({ r = 90, open = 1, fill = GOLD }) => (
  <g>
    <path d={`M${-r} 0 Q0 ${-r * 1.15 * open} ${r} 0 Q0 ${r * 1.15 * open} ${-r} 0 Z`} fill={TXT} stroke={fill} strokeWidth={r * 0.09} strokeLinejoin="round" />
    <g opacity={open > 0.25 ? 1 : 0}>
      <circle r={r * 0.42 * open} fill={fill} />
      <circle r={r * 0.2 * open} fill={INK} />
    </g>
  </g>
);

export const Coin: React.FC<{ r?: number }> = ({ r = 50 }) => (
  <g>
    <circle r={r} fill={GOLD} stroke={GOLDL} strokeWidth={r * 0.1} />
    <circle r={r * 0.62} fill="none" stroke={INK} strokeWidth={r * 0.07} opacity={0.6} />
    <rect x={-r * 0.1} y={-r * 0.36} width={r * 0.2} height={r * 0.72} rx={r * 0.06} fill={INK} opacity={0.7} />
  </g>
);

export const Pin: React.FC<{ s?: number; fill?: string }> = ({ s = 1, fill = GOLD }) => (
  <G s={s}>
    <path d="M0 62 Q-54 4 -54 -22 A54 54 0 1 1 54 -22 Q54 4 0 62 Z" fill={fill} />
    <circle cy={-22} r={22} fill={INK} />
  </G>
);

export const Cart: React.FC<{ s?: number; fill?: string }> = ({ s = 1, fill = GOLD }) => (
  <G s={s}>
    <path d="M-86 -56 H-58 L-34 36 H54 L74 -30 H-48" fill="none" stroke={fill} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={-22} cy={62} r={14} fill={fill} />
    <circle cx={44} cy={62} r={14} fill={fill} />
  </G>
);

export const Cursor: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <G s={s}>
    <path d="M0 0 L0 66 L17 50 L31 80 L46 73 L32 44 L56 44 Z" fill={TXT} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
  </G>
);

export const Toggle: React.FC<{ on?: number; s?: number }> = ({ on = 1, s = 1 }) => (
  <G s={s}>
    <rect x={-44} y={-24} width={88} height={48} rx={24} fill={on > 0.5 ? GOLD : HOV} />
    <circle cx={-20 + 40 * on} r={19} fill={TXT} />
  </G>
);

/** Đám đông nhìn từ xa; lit chọn người được khoanh ra. */
export const Crowd: React.FC<{ cols: number; rows: number; gap?: number; r?: number; lit?: (i: number) => boolean; base?: string }> = ({ cols, rows, gap = 56, r = 15, lit = () => true, base = HOV }) => (
  <g>
    {Array.from({ length: cols * rows }, (_, i) => {
      const x = (i % cols - (cols - 1) / 2) * gap;
      const y = (Math.floor(i / cols) - (rows - 1) / 2) * gap * 1.25;
      const fill = lit(i) ? GOLDL : base;
      return (
        <g key={i}>
          <circle cx={x} cy={y - r * 0.8} r={r} fill={fill} />
          <path d={`M${x - r * 1.35} ${y + r * 1.6} Q${x - r * 1.35} ${y + r * 0.3} ${x} ${y + r * 0.3} Q${x + r * 1.35} ${y + r * 0.3} ${x + r * 1.35} ${y + r * 1.6} Z`} fill={fill} />
        </g>
      );
    })}
  </g>
);

/** Mạng nút của thuật toán: học tới đâu, nút và đường sáng tới đó. */
export const Net: React.FC<{ s?: number; learn?: number }> = ({ s = 1, learn = 1 }) => {
  const nodes: [number, number][] = [[-150, -70], [-150, 70], [0, -110], [0, 0], [0, 110], [150, -70], [150, 70]];
  const links = [[0, 2], [0, 3], [1, 3], [1, 4], [2, 5], [3, 5], [3, 6], [4, 6]];
  return (
    <G s={s}>
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={i / links.length < learn ? GOLD : HOV} strokeWidth={7} />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={24} fill={i / nodes.length < learn ? GOLDL : HOV} />
      ))}
    </G>
  );
};

/** Hộp mở nắp nhìn hơi chếch, vật chứa vẽ trong children. */
export const OpenBox: React.FC<{ w: number; h: number; lit?: boolean; children?: React.ReactNode }> = ({ w, h, lit = true, children }) => (
  <g>
    <path d={`M${-w / 2} ${-h / 2} L${-w / 2 + 50} ${-h / 2 - 66} H${w / 2 - 50} L${w / 2} ${-h / 2} Z`} fill={HOV} />
    {children}
    <Box cx={0} cy={0} w={w} h={h} rx={18} fill={EL} stroke={lit ? GOLD : HOV} strokeWidth={7} />
  </g>
);

/** Màn hình Ads Manager lược vẽ. hi: khu vực đang nói, 0 nút Tạo, 1 tab, 2 lọc ngày, 3 công tắc, 4 bảng chỉ số. */
export const AdsUI: React.FC<{ w: number; h: number; hi?: number; tab?: number; offRow?: number; s?: number }> = ({ w, h, hi = -1, tab = 0, offRow = -1, s = 1 }) => {
  const line = (i: number) => (hi === i ? GOLDL : HOV);
  const x = -w / 2;
  const y = -h / 2;
  const rows = 5;
  const tableY = y + 250;
  const rowH = (h - 280) / rows;
  return (
    <G s={s}>
      <Box cx={0} cy={0} w={w} h={h} rx={26} fill="#24262C" stroke={HOV} strokeWidth={5} />
      <rect x={x + 26} y={y + 26} width={190} height={66} rx={14} fill={hi === 0 ? GOLDL : GOLD} />
      <path d={`M${x + 58} ${y + 59} H${x + 90} M${x + 74} ${y + 43} V${y + 75}`} stroke={INK} strokeWidth={8} strokeLinecap="round" />
      <rect x={x + 106} y={y + 52} width={86} height={14} rx={7} fill={INK} />
      <rect x={w / 2 - 276} y={y + 26} width={250} height={66} rx={14} fill={EL} stroke={line(2)} strokeWidth={hi === 2 ? 6 : 3} />
      {[0, 1, 2].map((i) => <rect key={i} x={w / 2 - 256 + i * 74} y={y + 48} width={58} height={22} rx={6} fill={hi === 2 ? GOLD : HOV} />)}
      {[0, 1, 2].map((i) => {
        const tw = (w - 52) / 3;
        return (
          <g key={i}>
            <rect x={x + 26 + i * tw} y={y + 118} width={tw - 10} height={92} rx={14} fill={tab === i ? "#3A3D44" : "#2F3238"} stroke={hi === 1 ? GOLDL : HOV} strokeWidth={hi === 1 ? 6 : 3} />
            <rect x={x + 26 + i * tw + 8} y={y + 198} width={tw - 26} height={tab === i ? 8 : 0} rx={4} fill={GOLD} />
          </g>
        );
      })}
      <rect x={x + 26} y={tableY} width={w - 52} height={h - 276} rx={14} fill="#2F3238" stroke={hi === 4 ? GOLDL : HOV} strokeWidth={hi === 4 ? 6 : 3} />
      {Array.from({ length: rows }, (_, r) => (
        <g key={r}>
          {r > 0 && <line x1={x + 26} x2={w / 2 - 26} y1={tableY + r * rowH} y2={tableY + r * rowH} stroke={HOV} strokeWidth={2} />}
          {r > 0 && (
            <G x={x + 90} y={tableY + (r + 0.5) * rowH}>
              <Toggle on={r === offRow ? 0 : 1} s={hi === 3 ? 1.05 : 0.9} />
              {hi === 3 && <rect x={-58} y={-34} width={116} height={68} rx={34} fill="none" stroke={GOLDL} strokeWidth={5} />}
            </G>
          )}
          {[0, 1, 2, 3, 4].map((c) => (
            <rect key={c} x={x + 170 + c * ((w - 220) / 5)} y={tableY + (r + 0.5) * rowH - rowH * 0.39} width={(w - 220) / 5 - 24} height={rowH * 0.78} rx={14} fill={r === 0 ? (hi === 4 ? GOLD : SEC) : "#666A72"} />
          ))}
        </g>
      ))}
    </G>
  );
};

export const Doc2: React.FC<{ w?: number; h?: number }> = ({ w = 150, h = 190 }) => (
  <g>
    <Box cx={0} cy={0} w={w} h={h} rx={12} fill={TXT} />
    <Lines x={-w / 2 + 20} y={-h / 2 + 26} w={w - 40} n={4} gap={32} color={SEC} />
  </g>
);

/** Màn kết chung của ba phần, cùng khung với bộ video AI. */
export const KetFb: React.FC = () => {
  const { p, l } = useT();
  const draw = l(0, 0, 26);
  return (
    <BaseStage still bg={`radial-gradient(circle at 50% 29%, #4A3A1C 0%, ${INK} 48%)`} overlay={<>
      <Img src={staticFile("brand/tvhs-logo-icon.png")} style={{ position: "absolute", left: 300, top: 150, width: 480, height: 480, objectFit: "contain", opacity: Math.min(1, p(0, 0.02, 16)) }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 665, textAlign: "center", fontSize: 84, fontWeight: 800, lineHeight: 1.3, color: GOLDL, opacity: l(0, 0.05, 10) }}>
        <Label i={0} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 845, textAlign: "center", fontSize: 44, fontWeight: 600, lineHeight: 1.35, color: TXT, opacity: l(0, 0.15, 10) }}>
        <Label i={1} />
      </div>
      <div style={{ position: "absolute", left: "50%", top: 950, transform: `translateX(-50%) scale(${p(0, 0.25)})`, fontSize: 40, fontWeight: 700, lineHeight: 1.35, color: GOLDL, border: `3px solid ${GOLD}`, background: "#1E1A10", padding: "12px 44px 14px", borderRadius: 999, whiteSpace: "nowrap" }}>
        <Label i={2} />
      </div>
    </>}>
      <circle cx={540} cy={390} r={262} fill="none" stroke={GOLD} strokeWidth={7} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} transform="rotate(-90 540 390)" />
      <circle cx={540} cy={390} r={286} fill="none" stroke={HOV} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} transform="rotate(90 540 390)" />
      <rect x={540 - 210 * draw} y={808} width={420 * draw} height={3} rx={1.5} fill={GOLD} />
    </BaseStage>
  );
};
