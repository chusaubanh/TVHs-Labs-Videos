import React from "react";
import { AbsoluteFill } from "remotion";
import { GOLD, RED, Stage, XL, useT } from "../tro-ly-phap-che/art";
import { Captions, ClipLayer, K, type Shot } from "./kit";
import { GuiThongTinVeBroll, MayBatLechBroll, TaoProjectBroll, XacNhanChayBroll } from "./broll-scenes";
import { ORANGE } from "./parts";

type Tags = [label: number, sentence: number, color?: string][];

/** Cảnh toàn bộ là quay màn hình: khung clip, cột nhãn, phụ đề. */
const ClipStage: React.FC<{ shots: (Shot | null)[]; tags: Tags; inWindow?: React.ReactNode }> = ({ shots, tags, inWindow }) => (
  <Stage
    still
    overlay={
      <AbsoluteFill>
        <ClipLayer shots={shots} tags={tags} inWindow={inWindow} />
        <Captions />
      </AbsoluteFill>
    }
  />
);

/** Bước 2: tạo project gắn thư mục. Câu 6-7 là b-roll Codex và chat ngoài thư mục. */
export const TaoProject: React.FC = () => {
  const { l } = useT();
  const out = l(5, 0, 10);
  return (
    <TaoProjectBroll
      sentenceStart={5}
      under={
        <ClipLayer
          opacity={1 - out}
          shots={[
            { clip: "v1", from: 5.0, to: 5.55, crop: K(400, 90, 1480), ring: { x: 900, y: 730, w: 200, h: 36 } },
            { clip: "v1", from: 6.4, to: 6.7, crop: K(400, 90, 1480), ring: { x: 910, y: 672, w: 470, h: 36 } },
            { clip: "v1", from: 25.6, to: 27.4, crop: K(680, 340, 640), ring: { x: 767, y: 441, w: 386, h: 26 } },
            { clip: "v1", from: 29.4, to: 35.0, crop: K(440, 109, 1120), ring: { x: 462, y: 444, w: 850, h: 32 }, ringAt: 0.75 },
            { clip: "v1", from: 37.0, to: 37.8, crop: K(300, 200, 1200), ring: { x: 955, y: 735, w: 165, h: 42 } },
          ]}
          tags={[[0, 0], [1, 0, GOLD], [2, 1], [3, 2], [4, 3], [5, 4]]}
        />
      }
    />
  );
};

/** Đọc hiểu dự án: hỏi Claude tóm tắt, chờ, đọc câu trả lời. Không dùng v2 từ 67s. */
export const DocHieuDuAn: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v2", from: 6, to: 10.5, crop: K(560, 130, 800), ring: { x: 636, y: 215, w: 564, h: 75 } },
      { clip: "v2", from: 13.5, to: 16, crop: K(640, 200, 800), ring: { x: 770, y: 330, w: 70, h: 30 } },
      { clip: "v2", from: 62, to: 64, crop: K(640, 330, 640), ring: { x: 672, y: 470, w: 538, h: 75 } },
      { clip: "v2", from: 64, to: 66, crop: K(640, 420, 640), ring: { x: 672, y: 700, w: 538, h: 50 } },
      { clip: "v2", from: 66, to: 67, crop: K(640, 560, 640), ring: { x: 672, y: 780, w: 538, h: 60 } },
    ]}
    tags={[[0, 0], [1, 3], [2, 3, GOLD], [3, 3, XL], [4, 4, XL]]}
  />
);

/** Gửi thông tin vé: hai câu đầu b-roll, hai câu sau quay màn hình v3. */
export const GuiThongTinVe: React.FC = () => {
  const { l } = useT();
  const inn = l(2, 0, 10);
  return (
    <GuiThongTinVeBroll
      under={
        <ClipLayer
          opacity={inn}
          shots={[
            null,
            null,
            { clip: "v3", from: 5.0, to: 6.0, crop: K(740, 200, 600), ring: { x: 790, y: 278, w: 460, h: 34 }, ringAt: 0.3 },
            { clip: "v3", from: 14, to: 17, crop: K(600, 280, 700), ring: { x: 668, y: 336, w: 440, h: 50 } },
          ]}
          tags={[[4, 2], [5, 3, GOLD]]}
        />
      }
    />
  );
};

/** Claude báo bốn chỗ số tạm và hỏi gộp ba câu. */
export const ClaudeHoiGop: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v3", from: 44.2, to: 45.0, crop: K(760, 490, 1040), ring: { x: 800, y: 550, w: 970, h: 90 } },
      { clip: "v3", from: 46.8, to: 47.0, crop: K(760, 240, 1040), ring: { x: 820, y: 322, w: 850, h: 120 } },
      { clip: "v3", from: 49.8, to: 50.0, crop: K(700, 250, 1100), ring: { x: 810, y: 320, w: 950, h: 150 } },
      { clip: "v3", from: 50.2, to: 50.6, crop: K(700, 250, 1100), ring: { x: 810, y: 508, w: 900, h: 100 } },
    ]}
    tags={[[0, 0], [1, 1], [2, 1, GOLD], [3, 1, GOLD], [4, 1, GOLD], [5, 2], [6, 3, XL]]}
  />
);

/** Trả lời theo số. */
export const TraLoiTheoSo: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v3", from: 103.4, to: 104, crop: K(620, 570, 640), ring: { x: 660, y: 828, w: 600, h: 70 } },
      {
        clip: "v3",
        from: 104.6,
        to: 105,
        crop: K(560, 505, 720),
        ring: [{ x: 690, y: 518, w: 520, h: 86 }, { x: 675, y: 840, w: 260, h: 50 }],
        arrows: [
          { from: [690, 526], to: [672, 846] },
          { from: [690, 562], to: [672, 864] },
          { from: [690, 598], to: [672, 882] },
        ],
      },
      { clip: "v3", from: 109.6, to: 110.2, crop: K(700, 100, 700), ring: { x: 975, y: 160, w: 285, h: 75 } },
    ]}
    tags={[[0, 0], [1, 1, GOLD], [2, 1, GOLD], [3, 1, GOLD]]}
  />
);

/** Máy bắt lệch: tóm tắt, b-roll so số, clip chỗ lệch tiền, b-roll người quyết. */
export const MayBatLech: React.FC = () => {
  const { l } = useT();
  const on = Math.max(0, 1 - l(1, 0, 10)) + l(2, 0, 10) * (1 - l(3, 0, 10));
  return (
    <MayBatLechBroll
      under={
        <ClipLayer
          opacity={Math.min(1, on)}
          shots={[
            { clip: "v3", from: 147.4, to: 148.0, crop: K(640, 300, 700), ring: { x: 690, y: 385, w: 520, h: 105 } },
            null,
            { clip: "v3", from: 236.0, to: 236.35, crop: K(380, 420, 1100), ring: { x: 436, y: 512, w: 960, h: 84 }, ringColor: RED },
            null,
          ]}
          tags={[[0, 0]]}
        />
      }
    />
  );
};

/** Xác nhận rồi chạy: gõ xác nhận, Progress; câu cuối b-roll chờ. */
export const XacNhanChay: React.FC = () => {
  const { l } = useT();
  const out = l(4, 0, 10);
  return (
    <XacNhanChayBroll
      under={
        <ClipLayer
          opacity={1 - out}
          shots={[
            { clip: "v3", from: 239.2, to: 240.0, crop: K(600, 540, 640), ring: { x: 660, y: 858, w: 600, h: 45 } },
            { clip: "v3", from: 242.6, to: 243.0, crop: K(900, 110, 700), ring: { x: 1170, y: 160, w: 90, h: 40 }, ringColor: RED },
            { clip: "v3", from: 257.6, to: 258.0, crop: K(1200, 110, 500), ring: { x: 1460, y: 150, w: 252, h: 175 } },
            { clip: "v3", from: 260.6, to: 261.0, crop: K(1316, 120, 400), ring: { x: 1490, y: 185, w: 210, h: 70 } },
          ]}
          tags={[[0, 0], [1, 1], [2, 3], [3, 3, GOLD], [4, 3, XL], [5, 3, XL]]}
        />
      }
    />
  );
};

/** Kết quả: Claude báo 12/12, file Word, File Explorer. */
export const KetQuaFileWord: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v3", from: 323.4, to: 324, crop: K(640, 270, 640), ring: { x: 673, y: 316, w: 430, h: 22 } },
      { clip: "v3", from: 326.4, to: 327, crop: K(640, 330, 640), ring: { x: 700, y: 368, w: 500, h: 87 } },
      { clip: "v3", from: 329.4, to: 330, crop: K(640, 420, 640), ring: { x: 673, y: 472, w: 507, h: 30 } },
      {
        clip: "v3",
        from: 363.8,
        to: 364.4,
        jump: { from: 376.0, to: 376.6, at: 0.5 },
        crop: K(740, 200, 820),
        ring: [{ x: 925, y: 418, w: 480, h: 20 }, { x: 925, y: 452, w: 480, h: 20 }],
        ringAt: 0.55,
      },
    ]}
    tags={[[0, 0, XL], [1, 1], [2, 2, GOLD], [3, 3], [4, 3, GOLD]]}
  />
);

/** Mở xem Báo cáo và Quyết định bằng ONLYOFFICE. */
export const MoXemBaoCao: React.FC = () => (
  <ClipStage
    shots={[
      { clip: "v3", from: 397.2, to: 398.4, crop: K(700, 260, 760), ring: { x: 930, y: 420, w: 470, h: 24 } },
      { clip: "v3", from: 404.4, to: 405.0, crop: K(640, 400, 640), ring: { x: 712, y: 488, w: 490, h: 20 }, ringColor: ORANGE },
      { clip: "v3", from: 411.0, to: 411.4, crop: K(660, 230, 640), ring: { x: 713, y: 318, w: 342, h: 22 } },
      { clip: "v3", from: 419.6, to: 420.3, crop: K(740, 380, 600), ring: { x: 928, y: 468, w: 110, h: 26 } },
    ]}
    tags={[[0, 0], [1, 1, ORANGE], [2, 2, GOLD], [3, 3]]}
  />
);
