import React from "react";
import { AbsoluteFill } from "remotion";
import { Label } from "../../kit/scene-context";
import { GOLD, GOLDL, INK, RED, Stage, XL, useT } from "../tro-ly-phap-che/art";
import { Captions, ClipLayer, K, type Shot } from "./kit";
import { CaiDatLanDau2, CanChuanBi, KetLogo } from "./broll-scenes";
import { Arrow, Hand, ORANGE, clamp01 } from "./parts";

/** Bản kịch bản 17 cảnh: chủ yếu quay màn hình. Mọi toạ độ là ảnh nguồn 1920x1080, đã đo trên khung ổn định. */
type Tags = [label: number, sentence: number, color?: string, until?: number][];

const ClipStage: React.FC<{ shots: (Shot | null)[]; tags: Tags; inWindow?: React.ReactNode; step?: number; offsets?: number[] }> = ({ shots, tags, inWindow, step, offsets }) => (
  <Stage
    still
    overlay={
      <AbsoluteFill>
        <ClipLayer shots={shots} tags={tags} inWindow={inWindow} step={step} offsets={offsets} />
        <Captions />
      </AbsoluteFill>
    }
  />
);

/* Khung ổn định hay dùng của v3. */
const V3_FIRST = K(760, 500, 1040); // camera phóng sẵn 43,5s: bốn dòng số tạm và ba câu hỏi
const V3_ASK = K(760, 240, 1040); // sau cuộn, 46s: ba câu hỏi và mẫu trả lời
const SMALL_MSG = K(640, 500, 640); // tin nhắn cuối của Claude, 330–360s

export const MoDau: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v3", from: 43.3, to: 43.6, crop: V3_FIRST, ring: { x: 820, y: 780, w: 920, h: 150 } },
      { clip: "v3", from: 236.0, to: 236.35, crop: K(380, 420, 1100), ring: { x: 436, y: 512, w: 960, h: 84 }, ringColor: RED },
      { clip: "v3", from: 257.6, to: 258.0, crop: K(1200, 110, 500), ring: { x: 1460, y: 150, w: 252, h: 175 } },
      { clip: "v3", from: 404.5, to: 405.0, crop: K(640, 400, 640), ring: { x: 712, y: 488, w: 490, h: 20 }, ringColor: ORANGE },
    ]}
    tags={[[0, 0], [1, 1, RED], [2, 2, XL], [3, 3, ORANGE]]}
  />
);

export const CanChuanBi2: React.FC = () => <CanChuanBi />;

/** Bước 1: tải và giải nén, quay File Explorer. */
export const TaiFileZip: React.FC = () => {
  const view = K(778, 222, 745);
  const zip = { x: 1268, y: 450, w: 75, h: 105 };
  const folder = { x: 1350, y: 338, w: 78, h: 97 };
  return (
    <ClipStage
      shots={[
        { clip: "v3", from: 362.6, to: 363.0, crop: view, ring: zip },
        { clip: "v3", from: 363.0, to: 363.4, crop: view, ring: folder, arrows: [{ from: [1290, 448], to: [1352, 400] }] },
        { clip: "v3", from: 363.4, to: 363.8, crop: view, ring: [zip, folder] },
      ]}
      tags={[[0, 0], [1, 1], [2, 2, RED]]}
    />
  );
};

/** Bước 2: tạo project gắn thư mục. */
export const TaoProject: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v1", from: 5.0, to: 5.55, crop: K(400, 90, 1480), ring: { x: 900, y: 730, w: 200, h: 36 } },
      { clip: "v1", from: 6.4, to: 6.7, crop: K(400, 90, 1480), ring: { x: 910, y: 672, w: 470, h: 36 } },
      { clip: "v1", from: 25.6, to: 27.4, crop: K(680, 340, 640), ring: { x: 767, y: 441, w: 386, h: 26 } },
      { clip: "v1", from: 29.4, to: 35.0, crop: K(440, 109, 1120), ring: { x: 462, y: 444, w: 850, h: 32 }, ringAt: 0.75 },
      { clip: "v1", from: 37.0, to: 37.8, crop: K(300, 200, 1200), ring: { x: 955, y: 735, w: 165, h: 42 } },
      { clip: "v1", from: 37.8, to: 38.0, crop: K(300, 200, 1200), ring: { x: 426, y: 622, w: 692, h: 36 } },
    ]}
    tags={[[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5, ORANGE]]}
  />
);

export const CaiDatLanDau: React.FC = () => <CaiDatLanDau2 />;

/** Đọc hiểu dự án: hỏi, chờ (tua nhanh), đọc câu trả lời. Không dùng v2 sau 67,2s. */
export const DocHieuDuAn: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v2", from: 6, to: 10.5, crop: K(560, 130, 800), ring: { x: 636, y: 215, w: 564, h: 75 } },
      { clip: "v2", from: 13.5, to: 61.5, crop: K(640, 200, 800) },
      { clip: "v2", from: 63, to: 64.5, crop: K(640, 330, 640), ring: { x: 677, y: 480, w: 527, h: 110 } },
      { clip: "v2", from: 65.8, to: 66.5, crop: K(640, 280, 640), ring: [{ x: 677, y: 344, w: 527, h: 49 }, { x: 677, y: 568, w: 527, h: 38 }] },
      { clip: "v2", from: 66.6, to: 67.2, crop: K(640, 420, 640), ring: { x: 677, y: 691, w: 527, h: 62 } },
      { clip: "v2", from: 67.0, to: 67.2, crop: K(640, 560, 640), ring: { x: 677, y: 780, w: 527, h: 60 } },
    ]}
    tags={[[0, 0], [1, 1, ORANGE, 2], [2, 2], [3, 3, XL], [4, 4, GOLD], [5, 4, XL]]}
  />
);

/** Hai lượt làm việc: ô chat trống, chuỗi năm bước chạy dần. */
export const HaiLuot: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v3", from: 1.4, to: 1.7, crop: K(640, 160, 1100), ring: { x: 674, y: 291, w: 1024, h: 135 } },
      { clip: "v3", from: 1.7, to: 1.8, crop: K(640, 160, 1100) },
    ]}
    tags={[[0, 0], [1, 0, GOLD], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1, XL]]}
    step={100}
    offsets={[0.05, 0.1, 0.05, 0.25, 0.45, 0.65, 0.85]}
  />
);

/** Năm ô chú thích đè lên clip: loại chi phí, đơn vị xuất, số hoá đơn, ngày, số tiền. */
const FiveChips: React.FC = () => {
  const { p, l } = useT();
  const idx = [1, 2, 3, 4, 5];
  const pulse = p(2);
  const gone = 1 - l(3, 0, 8);
  return (
    <AbsoluteFill style={{ opacity: gone }}>
      {idx.map((lab, i) => {
        const on = p(1, 0.08 + i * 0.16);
        const hot = lab === 5 ? pulse : 0;
        return (
          <div
            key={lab}
            style={{
              position: "absolute",
              left: 320 + i * 262,
              top: 470,
              width: 240,
              textAlign: "center",
              fontSize: 32,
              fontWeight: 700,
              padding: "12px 6px 14px",
              borderRadius: 999,
              background: lab === 5 && hot > 0.5 ? ORANGE : on > 0.6 ? GOLDL : "rgba(18,20,24,0.92)",
              color: on > 0.6 ? INK : GOLDL,
              border: `2px solid ${GOLD}`,
              transform: `scale(${clamp01(on) * (1 + 0.14 * hot)})`,
              opacity: clamp01(on),
              boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
            }}
          >
            <Label i={lab} />
          </div>
        );
      })}
      <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: clamp01(pulse) }}>
        <Arrow x1={1572} y1={760} x2={1572} y2={560} t={clamp01(pulse)} color={ORANGE} />
        <Hand x={1572} y={810} s={0.9} r={0} />
      </svg>
    </AbsoluteFill>
  );
};

export const GuiThongTinVe: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v3", from: 5.0, to: 6.0, crop: K(740, 200, 600), ring: { x: 790, y: 278, w: 460, h: 34 }, ringAt: 0.3 },
      { clip: "v3", from: 5.5, to: 6.0, crop: K(740, 200, 600), ring: { x: 790, y: 278, w: 460, h: 34 } },
      { clip: "v3", from: 5.5, to: 6.0, crop: K(740, 200, 600), ring: { x: 790, y: 278, w: 460, h: 34 } },
      { clip: "v3", from: 14, to: 17, crop: K(600, 280, 700), ring: { x: 668, y: 336, w: 440, h: 50 } },
    ]}
    tags={[[0, 1, GOLD], [6, 3]]}
    inWindow={<FiveChips />}
  />
);

/** Claude báo số tạm và hỏi gộp. */
export const ClaudeHoiGop: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v3", from: 43.2, to: 43.6, crop: K(760, 330, 1040), ring: { x: 806, y: 356, w: 958, h: 192 } },
      { clip: "v3", from: 43.3, to: 43.55, crop: K(760, 480, 1040), ring: { x: 800, y: 570, w: 870, h: 130 } },
      { clip: "v3", from: 46.0, to: 46.12, crop: V3_ASK, ring: { x: 820, y: 536, w: 920, h: 140 } },
      { clip: "v3", from: 46.12, to: 46.25, crop: V3_ASK, ring: { x: 820, y: 726, w: 920, h: 90 } },
    ]}
    tags={[[0, 0], [1, 1], [2, 1, GOLD], [3, 1, GOLD], [4, 1, GOLD], [5, 2], [6, 3, XL]]}
  />
);

/** Trả lời theo số: gõ rất lâu nên tua nhanh. */
export const TraLoiTheoSo: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v3", from: 56, to: 103.8, crop: K(520, 530, 800), ring: { x: 660, y: 826, w: 600, h: 70 } },
      {
        clip: "v3",
        from: 107.3,
        to: 107.6,
        crop: K(440, 420, 1067),
        ring: { x: 675, y: 840, w: 260, h: 50 },
        arrows: [
          { from: [690, 526], to: [672, 846] },
          { from: [690, 562], to: [672, 864] },
          { from: [690, 598], to: [672, 882] },
        ],
      },
      { clip: "v3", from: 110.0, to: 112.0, crop: K(700, 100, 700), ring: { x: 996, y: 162, w: 249, h: 65 } },
    ]}
    tags={[[0, 0, ORANGE, 1], [1, 1], [2, 1, GOLD], [3, 1, GOLD], [4, 1, GOLD]]}
  />
);

/** Máy bắt lệch. */
export const MayBatLech: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v3", from: 144, to: 146, crop: K(640, 300, 700), ring: { x: 700, y: 392, w: 500, h: 95 } },
      { clip: "v3", from: 146, to: 149, crop: K(640, 300, 700), ring: { x: 673, y: 505, w: 527, h: 47 } },
      { clip: "v3", from: 149, to: 152, crop: K(640, 300, 700), ring: { x: 673, y: 505, w: 527, h: 47 }, ringColor: RED },
      { clip: "v3", from: 236.0, to: 236.35, crop: K(380, 420, 1100), ring: { x: 448, y: 504, w: 952, h: 88 }, ringColor: RED },
    ]}
    tags={[[0, 0], [1, 1], [2, 1, ORANGE], [3, 1, GOLD], [4, 3, GOLD], [5, 3, XL]]}
  />
);

/** Xác nhận rồi chạy; câu 5 tua nhanh. */
export const XacNhanChay: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v3", from: 239.2, to: 240.0, crop: K(560, 520, 800), ring: { x: 660, y: 858, w: 600, h: 45 } },
      { clip: "v3", from: 242.6, to: 243.0, crop: K(900, 110, 700), ring: { x: 1170, y: 160, w: 90, h: 40 }, ringColor: RED },
      { clip: "v3", from: 257.6, to: 258.0, crop: K(1200, 110, 500), ring: { x: 1460, y: 150, w: 252, h: 175 } },
      { clip: "v3", from: 258.0, to: 262.0, crop: K(1316, 120, 400), ring: { x: 1490, y: 185, w: 210, h: 70 } },
      { clip: "v3", from: 262.0, to: 321.0, crop: K(1200, 110, 500), ring: { x: 1460, y: 150, w: 252, h: 175 } },
    ]}
    tags={[[0, 0], [1, 1], [2, 3], [3, 3, GOLD], [4, 3, XL], [5, 3, XL], [6, 4, ORANGE]]}
    step={100}
    offsets={[0.05, 0.05, 0.1, 0.35, 0.6, 0.8, 0.05]}
  />
);

/** Kết quả: 12/12, file Word, File Explorer. */
export const KetQuaFileWord: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v3", from: 323.4, to: 324, crop: K(640, 270, 640), ring: { x: 673, y: 316, w: 430, h: 22 } },
      { clip: "v3", from: 326.4, to: 327, crop: K(640, 330, 640), ring: { x: 700, y: 368, w: 500, h: 87 } },
      { clip: "v3", from: 329.4, to: 330, crop: K(640, 420, 640), ring: { x: 673, y: 472, w: 507, h: 30 } },
      { clip: "v3", from: 366, to: 376.6, crop: K(780, 200, 820), ring: [{ x: 925, y: 418, w: 480, h: 20 }, { x: 925, y: 452, w: 480, h: 20 }], ringAt: 0.85 },
    ]}
    tags={[[0, 0, XL], [1, 1], [2, 2, GOLD], [3, 3], [4, 3, GOLD]]}
  />
);

/** Mở xem Báo cáo và Quyết định bằng ONLYOFFICE. */
export const MoXemBaoCao: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v3", from: 396.5, to: 398.4, crop: K(700, 260, 760), ring: { x: 930, y: 413, w: 465, h: 22 } },
      { clip: "v3", from: 404.5, to: 407.0, crop: K(640, 400, 640), ring: { x: 712, y: 488, w: 490, h: 20 }, ringColor: ORANGE },
      { clip: "v3", from: 411.5, to: 412.2, crop: K(660, 230, 640), ring: { x: 713, y: 318, w: 342, h: 24 } },
      { clip: "v3", from: 419.6, to: 420.2, crop: K(740, 380, 600), ring: { x: 928, y: 468, w: 110, h: 26 } },
    ]}
    tags={[[0, 0], [1, 1, ORANGE], [2, 2, GOLD], [3, 3]]}
  />
);

/** Bản nháp và 3Đ: tin nhắn cuối của Claude, năm câu cùng một khung ổn định. */
export const BanNhap3D: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v3", from: 330.5, to: 331, crop: SMALL_MSG, ring: { x: 673, y: 564, w: 522, h: 30 } },
      { clip: "v3", from: 331, to: 331.5, crop: SMALL_MSG, ring: { x: 673, y: 512, w: 527, h: 38 } },
      { clip: "v3", from: 331.5, to: 332, crop: SMALL_MSG, ring: { x: 673, y: 564, w: 522, h: 84 } },
      { clip: "v3", from: 332, to: 332.5, crop: SMALL_MSG, ring: { x: 673, y: 692, w: 330, h: 26 } },
      { clip: "v3", from: 332.5, to: 333, crop: SMALL_MSG, ring: { x: 700, y: 730, w: 490, h: 66 } },
    ]}
    tags={[[0, 0, ORANGE], [1, 1, GOLD], [2, 2], [3, 2], [4, 2, XL], [5, 3, RED], [6, 4], [7, 4], [8, 4]]}
    step={80}
    offsets={[0.05, 0.05, 0.05, 0.3, 0.55, 0.05, 0.05, 0.3, 0.55]}
  />
);

export { KhiGapLoi3 as KhiGapLoi } from "./broll-scenes";

/** Kết: màn hình chủ mờ dần, rồi thẻ logo. */
export const Ket: React.FC = () => {
  const { l } = useT();
  const out = l(1, 0, 10);
  return (
    <KetLogo
      under={
        <ClipLayer
          opacity={1 - out}
          shots={[{ clip: "v3", from: 424, to: 425.5, crop: K(500, 100, 920) }]}
          tags={[[0, 0, ORANGE], [1, 0], [2, 0, GOLD]]}
        />
      }
    />
  );
};
