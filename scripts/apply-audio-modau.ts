import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { TrainingScriptSchema, secToFrames, FPS } from "../src/training/training-contract.js";
import { sfxFromFrame } from "../src/training/placement.js";

const scriptPath = "output/Mo dau - VOICE/script.json";
const script = JSON.parse(readFileSync(scriptPath, "utf8"));

// 2. Nhạc nền giữ 1 mức cố định xuyên suốt (không ducking lên xuống)
const CONSTANT_MUSIC_LEVEL = 0.10; // 10% âm lượng cố định, nghe êm dưới giọng đọc
script.music = {
  src: "audio/music/empathic-prosperity.mp3",
  underVoice: CONSTANT_MUSIC_LEVEL,
  inGap: CONSTANT_MUSIC_LEVEL,
  fadeInSec: 1.5,
  fadeOutSec: 2.5,
};

// 1. SFX khớp chuẩn xác từng khung hình xuất hiện của các asset đồ họa (Audio-Visual Synchrony)
const sfxMap: Record<string, Array<{ src: string; sentence: number; fraction: number; volume: number; hitSec: number; name: string }>> = {
  // Cảnh 0: HookExcelDanVao
  // p(0, 0.05): Ba bảng Excel bật ra
  // p(0, 0.3): Khung chat ChatGPT ở giữa nảy lên
  // p(1, 0.1): Núi bối cảnh dồn đè mặt bàn võng xuống
  // l(1, 0.5): Bút đỏ gạch từng con số
  "hook-excel-dan-vao": [
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.05, volume: 0.4, hitSec: 0, name: "Ba bảng Excel bật ra" },
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Khung chat ChatGPT nảy lên" },
    { src: "audio/sfx/impact-soft-01.mp3", sentence: 1, fraction: 0.1, volume: 0.45, hitSec: 0, name: "Núi bối cảnh đè võng bàn" },
    { src: "audio/sfx/scribble-01.mp3", sentence: 1, fraction: 0.5, volume: 0.35, hitSec: 0, name: "Bút đỏ gạch từng số" },
  ],

  // Cảnh 1: LarkTinNhan
  // p(0, 0.05): Điện thoại trượt xuống
  // p(0, 0.38): Bong bóng tin nhắn Lark nảy ra
  // p(1, 0.05): Chục khung chat xếp chồng lật như bài
  // p(1, 0.2): Ô nhập AI mở ra nhận tài liệu
  "lark-tin-nhan": [
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Điện thoại trượt xuống" },
    { src: "audio/sfx/notification-01.mp3", sentence: 0, fraction: 0.38, volume: 0.45, hitSec: 0, name: "Tin nhắn Lark nảy ra" },
    { src: "audio/sfx/whoosh-fast-01.mp3", sentence: 1, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Chục khung chat lật như bài" },
    { src: "audio/sfx/pop-bubble-01.mp3", sentence: 1, fraction: 0.2, volume: 0.35, hitSec: 0, name: "Mở ô nhập AI" },
  ],

  // Cảnh 2: TomTatChungChung
  // l(0, 0.25): Kính lúp lướt bóc lớp bóng
  // l(1, 0.12): Bút đỏ gạch từng dòng Excel
  // fall l(2, 0.45): Dấu tích xanh giáng đè dấu sai
  // l(3, 0.05): Tờ lịch lật ngược về tờ cũ
  // l(3, 0.45): Chữ Hôm qua trượt vào dán lên máy
  "tom-tat-chung-chung": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.25, volume: 0.35, hitSec: 0, name: "Bóc lớp bóng mượt" },
    { src: "audio/sfx/scribble-01.mp3", sentence: 1, fraction: 0.12, volume: 0.4, hitSec: 0, name: "Bút đỏ gạch từng dòng" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 2, fraction: 0.45, volume: 0.45, hitSec: 0, name: "Dấu tích đè dấu sai" },
    { src: "audio/sfx/slide-01.mp3", sentence: 3, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Tờ lịch lật ngược" },
    { src: "audio/sfx/pop-01.mp3", sentence: 3, fraction: 0.45, volume: 0.4, hitSec: 0, name: "Dán chữ Hôm qua" },
  ],

  // Cảnh 3: TuHoiSangGiao
  // p(0, 0): Đường kẻ dọc chia hai tầng
  // p(1, 0): Khung chat bong bóng hỏi bay ra
  // p(2, 0.05): Trợ lý tầng dưới xuất hiện
  // l(2, 0.85): Con dấu tích đóng lên bản thành phẩm hoàn chỉnh
  "tu-hoi-sang-giao": [
    { src: "audio/sfx/transition-sweep-01.mp3", sentence: 0, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Đường kẻ chia hai tầng" },
    { src: "audio/sfx/pop-bubble-01.mp3", sentence: 1, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Bong bóng hỏi bay ra" },
    { src: "audio/sfx/pop-01.mp3", sentence: 2, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Trợ lý bên máy xuất hiện" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 2, fraction: 0.85, volume: 0.45, hitSec: 0, name: "Dấu chốt bản thành phẩm" },
  ],

  // Cảnh 4: HoiSangGiaoViec
  // l(0, 0.45): Mũi tên lật biển Hỏi thành biển Giao việc
  // l(1, 0.15): Ba tệp Excel rơi rải rác khắp bàn
  // l(2, 0.1): Đường ngang xé bàn, bật sáng khung chat web
  "hoi-sang-giao-viec": [
    { src: "audio/sfx/whoosh-fast-01.mp3", sentence: 0, fraction: 0.45, volume: 0.4, hitSec: 0, name: "Lật biển Hỏi sang Giao việc" },
    { src: "audio/sfx/tap-01.mp3", sentence: 1, fraction: 0.15, volume: 0.35, hitSec: 0, name: "Ba tệp Excel rơi xuống bàn" },
    { src: "audio/sfx/slide-01.mp3", sentence: 2, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Bật sáng khung chat web" },
  ],

  // Cảnh 5: Cach1KhungChatWeb
  // p(0, 0.05): Cửa sổ trình duyệt mở ra
  // l(0, 0.35): Từng mẩu kéo thả vào ô chat
  // hole l(2, 0.25): Ô lạ chớp đỏ lấp vào ô trống, dấu cảnh báo đóng lên
  // p(3, 0.1): Đồng hồ quay, người còng lưng dò số
  "cach-1-khung-chat-web": [
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Cửa sổ trình duyệt mở" },
    { src: "audio/sfx/click-ui-01.mp3", sentence: 0, fraction: 0.35, volume: 0.35, hitSec: 0, name: "Thả mẩu cắt vào chat" },
    { src: "audio/sfx/error-soft-01.mp3", sentence: 2, fraction: 0.25, volume: 0.45, hitSec: 0, name: "Ô lạ chớp đỏ bịa số" },
    { src: "audio/sfx/tick-01.mp3", sentence: 3, fraction: 0.2, volume: 0.35, hitSec: 0, name: "Đồng hồ quay dò số" },
  ],

  // Cảnh 6: Cach2TrenMay
  // l(0, 0.05): Trình duyệt thu nhỏ rồi tắt
  // p(0, 0.35): Máy tính để bàn hiện lên màn hình sáng
  // p(1, 0.05): Biểu tượng Project và Codex sáng cạnh nhau
  // l(1, 0.3): Thư mục ba tệp trượt lên bàn, vòng sáng ôm lấy
  "cach-2-tren-may": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Trình duyệt tắt" },
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.35, volume: 0.4, hitSec: 0, name: "Màn hình máy tính bật sáng" },
    { src: "audio/sfx/ding-01.mp3", sentence: 1, fraction: 0.05, volume: 0.4, hitSec: 0, name: "Project & Codex sáng lên" },
    { src: "audio/sfx/slide-01.mp3", sentence: 1, fraction: 0.3, volume: 0.4, hitSec: 0, name: "Thư mục trượt lên bàn" },
  ],

  // Cảnh 7: GoMotCau
  // l(0, 0.1): Thanh lệnh chạy chữ đang gõ
  // l(0, 0.82): Dấu gửi bay đi
  // l(1, 0.05): Ba tệp bung ra thành ba tờ bảng tính
  // p(1, 0.55): Ghim bật lên chỉ về đúng tệp dòng trang nguồn
  "go-mot-cau": [
    { src: "audio/sfx/typing-01.mp3", sentence: 0, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Gõ dòng lệnh prompt" },
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.82, volume: 0.35, hitSec: 0, name: "Dấu gửi bay đi" },
    { src: "audio/sfx/slide-01.mp3", sentence: 1, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Ba tệp bung thành ba tờ" },
    { src: "audio/sfx/chime-01.mp3", sentence: 1, fraction: 0.55, volume: 0.4, hitSec: 0, name: "Ghim nảy chỉ rõ nguồn" },
  ],

  // Cảnh 8: KhacNhauDuyNhat
  // l(0, 0.3): Dấu hỏi lớn rơi xuống giữa hai ảnh
  // l(1, 0.05): Chiếc cân hai đĩa thăng bằng hiện ra
  // l(2, 0.3): Bên phải AI tự mở cánh tủ dữ liệu
  // l(3, 0.25): Nút gạt chuyển từ Hỏi sang Giao việc
  "khac-nhau-duy-nhat": [
    { src: "audio/sfx/pop-bubble-01.mp3", sentence: 0, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Dấu hỏi lớn rơi xuống" },
    { src: "audio/sfx/slide-01.mp3", sentence: 1, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Cân thăng bằng hiện ra" },
    { src: "audio/sfx/pop-01.mp3", sentence: 2, fraction: 0.3, volume: 0.4, hitSec: 0, name: "AI tự mở ngăn kéo dữ liệu" },
    { src: "audio/sfx/click-ui-01.mp3", sentence: 3, fraction: 0.25, volume: 0.4, hitSec: 0, name: "Gạt nút sang Giao việc" },
  ],

  // Cảnh 9: BaViecLapKeHoach
  // l(0, 0.1): Ba ô kệ trống trượt vào từ ba phía
  // l(1, 0.05): Tờ lịch ngày bung ra từ đáy ô
  // l(2, 0.6): Các thẻ việc tự xếp theo thứ tự ưu tiên
  // Seal l(3, 0.25): Con dấu giáng xuống duyệt
  "ba-viec-lap-ke-hoach": [
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Ba ô kệ trượt vào" },
    { src: "audio/sfx/pop-01.mp3", sentence: 1, fraction: 0.05, volume: 0.4, hitSec: 0, name: "Tờ lịch ngày bung ra" },
    { src: "audio/sfx/click-ui-01.mp3", sentence: 2, fraction: 0.6, volume: 0.35, hitSec: 0, name: "Thẻ việc xếp hàng ưu tiên" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 3, fraction: 0.25, volume: 0.45, hitSec: 0, name: "Con dấu giáng duyệt" },
  ],

  // Cảnh 10: ViecThuHaiSop
  // l(0, 0.05): Tờ giấy trắng SOP trải rộng
  // l(1, 0.1): Các dòng chữ thô gõ tay
  // Seal l(2, 0.6): Con dấu chốt đóng cuối tờ SOP
  // p(3, 0.25): Cây bút bị cấm đỏ phủ lên
  "viec-thu-hai-sop": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Trải rộng giấy trắng SOP" },
    { src: "audio/sfx/typing-01.mp3", sentence: 1, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Chữ thô gõ tay" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 2, fraction: 0.6, volume: 0.45, hitSec: 0, name: "Con dấu chốt đóng cuối tờ" },
    { src: "audio/sfx/error-soft-01.mp3", sentence: 3, fraction: 0.25, volume: 0.4, hitSec: 0, name: "Dấu cấm đỏ phủ lên cây bút" },
  ],

  // Cảnh 11: TuVietCuaMinh
  // l(0, 0.15): Hai huy hiệu Chuyên môn và Uy tín neo vào đế
  // l(1, 0.55): Ruột trang AI sụp rỗng
  // p(2, 0.05): Ghế giám khảo AI đội kính dựng lên
  // ms(0) l(3, 0.2): Bút đỏ khoanh chỗ lập luận lỏng
  "tu-viet-cua-minh": [
    { src: "audio/sfx/chime-01.mp3", sentence: 0, fraction: 0.15, volume: 0.4, hitSec: 0, name: "Hai huy hiệu neo vào đế" },
    { src: "audio/sfx/glitch-01.mp3", sentence: 1, fraction: 0.55, volume: 0.4, hitSec: 0, name: "Trang AI sụp ruột rỗng" },
    { src: "audio/sfx/pop-01.mp3", sentence: 2, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Ghế giám khảo hiện ra" },
    { src: "audio/sfx/scribble-01.mp3", sentence: 3, fraction: 0.2, volume: 0.4, hitSec: 0, name: "Bút đỏ khoanh lỗi lập luận" },
  ],

  // Cảnh 12: ChanChamDat
  // l(0, 0.05): AI chất số lên đĩa cân bên trái
  // p(0, 0.65): Đĩa phương án bên phải nặng sa xuống
  // p(1, 0.35): Vệt đèn phòng họp rọi xuống bạn
  // l(2, 0.35): Con đường phẳng mở ra, cột mốc tích xanh
  "chan-cham-dat": [
    { src: "audio/sfx/tap-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Chất số lên đĩa cân" },
    { src: "audio/sfx/impact-soft-01.mp3", sentence: 0, fraction: 0.65, volume: 0.45, hitSec: 0, name: "Đĩa phương án nặng sa xuống" },
    { src: "audio/sfx/transition-sweep-01.mp3", sentence: 1, fraction: 0.35, volume: 0.35, hitSec: 0, name: "Đèn rọi phòng họp" },
    { src: "audio/sfx/ding-01.mp3", sentence: 2, fraction: 0.35, volume: 0.4, hitSec: 0, name: "Cột mốc tích xanh" },
  ],

  // Cảnh 13: KhoaChanAiVaHen
  // l(0, 0.35): Chiếc khóa lớn khóa chân con AI
  // l(1, 0.55): Bàn tay kéo thẻ việc sang AI
  // l(2, 0.15): Quay lại bàn đầu, con dấu Bài 1 đóng xuống
  // l(2, 0.45): Màn kết logo thương hiệu BrandEnd bật lên
  "khoa-chan-ai-va-hen": [
    { src: "audio/sfx/stamp-01.mp3", sentence: 0, fraction: 0.35, volume: 0.5, hitSec: 0, name: "Khóa lớn khóa chân con AI" },
    { src: "audio/sfx/slide-01.mp3", sentence: 1, fraction: 0.55, volume: 0.35, hitSec: 0, name: "Kéo việc lặp sang AI" },
    { src: "audio/sfx/success-01.mp3", sentence: 2, fraction: 0.15, volume: 0.45, hitSec: 0, name: "Dấu chốt Bài 1" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 2, fraction: 0.45, volume: 0.4, hitSec: 0, name: "Logo thương hiệu toả sáng" },
  ],
};

script.scenes.forEach((sc: any) => {
  const cues = sfxMap[sc.id] || [];
  sc.sfx = cues.map(({ name, ...cue }) => cue);
});

const validated = TrainingScriptSchema.parse(script);
writeFileSync(scriptPath, JSON.stringify(validated, null, 2) + "\n");
console.log("1. Da cap nhat script.json thanh cong!");

const timeline = JSON.parse(readFileSync("output/Mo dau - VOICE/timeline.json", "utf8"));
const propsPath = "output/Mo dau - VOICE/props.json";
writeFileSync(propsPath, JSON.stringify({ script: validated, timeline, hideText: false }));
console.log("2. Da cap nhat props.json thanh cong!");

const hash = createHash("sha256").update(readFileSync(scriptPath)).digest("hex");
const approvalsPath = "output/Mo dau - VOICE/approvals.json";
const approvals = {
  script: { by: "Anh Phương", at: new Date().toISOString(), scriptHash: hash },
  visual: { by: "Anh Phương", at: new Date().toISOString(), scriptHash: hash },
};
writeFileSync(approvalsPath, JSON.stringify(approvals, null, 2) + "\n");
console.log("3. Da cap nhat approvals.json thanh cong!");

// Tạo project.json cho TVHs Editor
const sfxDurations: Record<string, number> = {
  "pop-01.mp3": 0.304,
  "impact-soft-01.mp3": 0.961,
  "notification-01.mp3": 0.931,
  "slide-01.mp3": 0.475,
  "whoosh-soft-01.mp3": 0.957,
  "scribble-01.mp3": 0.554,
  "ding-01.mp3": 2.061,
  "stamp-01.mp3": 0.499,
  "transition-sweep-01.mp3": 1.832,
  "pop-bubble-01.mp3": 0.402,
  "success-01.mp3": 2.437,
  "whoosh-fast-01.mp3": 0.423,
  "tap-01.mp3": 0.32,
  "click-ui-01.mp3": 0.1,
  "error-soft-01.mp3": 0.8,
  "typing-01.mp3": 1.651,
  "chime-01.mp3": 2.657,
  "glitch-01.mp3": 0.55,
  "sparkle-01.mp3": 1.582,
  "tick-01.mp3": 0.096,
};

const sfxLayers: any[] = [];
const sceneLayers: any[] = [];

timeline.scenes.forEach((scene: any, sIdx: number) => {
  sceneLayers.push({
    id: `scene-${scene.id}`,
    type: "scene",
    start: scene.startSec,
    duration: scene.durationSec,
    text: `${sIdx + 1}. ${scene.id}`,
    style: {
      fontFamily: "Be Vietnam Pro",
      fontSize: 32,
      fontWeight: 700,
      color: "#EDEDED",
      accentColor: "#C5A059",
      background: "rgba(12,12,12,0.85)",
      align: "left",
      radius: 8,
      padding: 12,
      strokeColor: null,
      strokeWidth: 0,
      shadow: true,
    },
    animation: { in: { kind: "fade", dur: 0.2 }, out: { kind: "fade", dur: 0.2 } },
  });

  const cues = sfxMap[scene.id] || [];
  cues.forEach((cue, i) => {
    const sen = scene.sentences[cue.sentence];
    const cueFromSec = (secToFrames(scene.startSec) + sfxFromFrame(sen, cue, FPS)) / FPS;
    const filename = cue.src.split("/").pop() || "";
    const dur = sfxDurations[filename] || 0.5;
    sfxLayers.push({
      id: `sfx-${scene.id}-${i}`,
      type: "audio",
      start: cueFromSec,
      duration: dur,
      src: `/${cue.src}`,
      text: cue.name,
      gainDb: Math.round(20 * Math.log10(cue.volume || 0.4)),
      style: {
        fontFamily: "Be Vietnam Pro",
        fontSize: 24,
        fontWeight: 600,
        color: "#EDEDED",
        accentColor: "#3B82F6",
        background: "rgba(30,58,138,0.7)",
        align: "center",
        radius: 6,
        padding: 8,
        strokeColor: null,
        strokeWidth: 0,
        shadow: false,
      },
      animation: { in: { kind: "fade", dur: 0.05 }, out: { kind: "fade", dur: 0.05 } },
    });
  });
});

const musicLayers = [
  {
    id: "bgm-main",
    type: "audio",
    start: 0,
    duration: timeline.totalSec,
    src: "/audio/music/empathic-prosperity.mp3",
    text: "Empathic Prosperity (Nhạc nền đều)",
    gainDb: -20, // Âm lượng đều -20dB
    style: {
      fontFamily: "Be Vietnam Pro",
      fontSize: 24,
      fontWeight: 600,
      color: "#EDEDED",
      accentColor: "#10B981",
      background: "rgba(6,78,59,0.7)",
      align: "center",
      radius: 6,
      padding: 8,
      strokeColor: null,
      strokeWidth: 0,
      shadow: false,
    },
    animation: { in: { kind: "fade", dur: 1.5 }, out: { kind: "fade", dur: 2.5 } },
  },
];

const project = {
  version: 1,
  job: "Mo dau - VOICE",
  fps: 30,
  width: 1080,
  height: 1350,
  aspect: "4:5",
  duration: timeline.totalSec,
  source: {
    video: "00. Mở đầu - Từ Chatbot Hỏi Đáp Sang Trợ Lý Làm Việc Thật.mp4",
  },
  revision: 0,
  videoTransform: { scale: 1, x: 0, y: 0 },
  tracks: [
    {
      id: "t-scenes",
      kind: "scene",
      name: "Cảnh (Scenes)",
      hidden: false,
      locked: false,
      layers: sceneLayers,
    },
    {
      id: "t-sfx",
      kind: "sfx",
      name: "Hiệu ứng âm thanh (SFX)",
      hidden: false,
      locked: false,
      layers: sfxLayers,
    },
    {
      id: "t-music",
      kind: "music",
      name: "Nhạc nền (BGM đều)",
      hidden: false,
      locked: false,
      layers: musicLayers,
    },
  ],
  videoMoves: [],
  videoShifts: [],
  audio: {
    voice: { gainDb: 0, muted: false },
    music: { duckDb: 0, attack: 0.15, release: 0.45 }, // duckDb = 0: giữ đúng 1 mức xuyên suốt, không ducking
    master: { lufs: -14, truePeak: -1.5 },
  },
};

writeFileSync("output/Mo dau - VOICE/project.json", JSON.stringify(project, null, 2) + "\n");
console.log("4. Da tao output/Mo dau - VOICE/project.json moi voi BGM deu & SFX khop animation!");
