import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { TrainingScriptSchema, secToFrames, FPS } from "../src/training/training-contract.js";
import { sfxFromFrame } from "../src/training/placement.js";

const CONSTANT_MUSIC_LEVEL = 0.10; // Không ducking, 1 mức cố định

interface CueDef {
  src: string;
  sentence: number;
  fraction: number;
  volume: number;
  hitSec: number;
  name: string;
}

// ==========================================
// CUES FOR BAI 1 (Một Tờ Nội Quy Để AI Không Bịa Số)
// ==========================================
const sfxBai1: Record<string, CueDef[]> = {
  "hook-prompt-dai-bia-so": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.0, volume: 0.35, hitSec: 0, name: "Khung chat AI hiện ra" },
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Cuộn prompt tuột dài" },
    { src: "audio/sfx/glitch-01.mp3", sentence: 0, fraction: 0.1, volume: 0.4, hitSec: 0, name: "Chip số nứt rung lắc" },
    { src: "audio/sfx/pop-01.mp3", sentence: 1, fraction: 0.0, volume: 0.4, hitSec: 0, name: "Cuộn co thành 1 bong bóng ngắn" },
    { src: "audio/sfx/click-ui-01.mp3", sentence: 1, fraction: 0.35, volume: 0.35, hitSec: 0, name: "Dòng lệnh prompt hiện ra" },
    { src: "audio/sfx/success-01.mp3", sentence: 1, fraction: 0.55, volume: 0.4, hitSec: 0, name: "Bảng số liệu đứng thẳng hàng" },
  ],
  "phan-xa-dan-ky-hon": [
    { src: "audio/sfx/tick-01.mp3", sentence: 0, fraction: 0.0, volume: 0.35, hitSec: 0, name: "Bong bóng lắc như con lắc" },
    { src: "audio/sfx/pop-bubble-01.mp3", sentence: 0, fraction: 0.25, volume: 0.35, hitSec: 0, name: "Dấu hỏi bật lên" },
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 1, fraction: 0.0, volume: 0.35, hitSec: 0, name: "Hàng người giơ giấy dày" },
    { src: "audio/sfx/slide-01.mp3", sentence: 1, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Chồng giấy hướng về AI" },
    { src: "audio/sfx/scribble-01.mp3", sentence: 2, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Hai mẩu nối thành dải dài" },
    { src: "audio/sfx/glitch-01.mp3", sentence: 2, fraction: 0.25, volume: 0.4, hitSec: 0, name: "Chip nghiêng đầu bối rối" },
  ],
  "so-sai-mat-buoi-chieu": [
    { src: "audio/sfx/sparkle-01.mp3", sentence: 0, fraction: 0.0, volume: 0.35, hitSec: 0, name: "Bảng số bóng loáng" },
    { src: "audio/sfx/glitch-01.mp3", sentence: 0, fraction: 0.2, volume: 0.4, hitSec: 0, name: "Ô số nứt rơi lệch" },
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 1, fraction: 0.0, volume: 0.35, hitSec: 0, name: "Mặt trời qua cung" },
    { src: "audio/sfx/scribble-01.mp3", sentence: 1, fraction: 0.4, volume: 0.4, hitSec: 0, name: "Bút đỏ gạch từng dòng" },
    { src: "audio/sfx/slide-01.mp3", sentence: 2, fraction: 0.02, volume: 0.35, hitSec: 0, name: "Tờ lịch lật sang ngày mới" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 2, fraction: 0.3, volume: 0.4, hitSec: 0, name: "Bảng dựng lại y hệt" },
  ],
  "tuyen-thuc-tap-sinh": [
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.0, volume: 0.35, hitSec: 0, name: "Thực tập sinh bước vào ngồi" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 0, fraction: 0.35, volume: 0.35, hitSec: 0, name: "Sao vàng quanh đầu" },
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 1, fraction: 0.5, volume: 0.35, hitSec: 0, name: "Ghi chú tuột khỏi đầu" },
    { src: "audio/sfx/pop-bubble-01.mp3", sentence: 2, fraction: 0.15, volume: 0.35, hitSec: 0, name: "Bong bóng mờ dấu hỏi" },
    { src: "audio/sfx/tap-01.mp3", sentence: 3, fraction: 0.15, volume: 0.35, hitSec: 0, name: "Tờ giao việc có ô trống" },
    { src: "audio/sfx/glitch-01.mp3", sentence: 4, fraction: 0.2, volume: 0.4, hitSec: 0, name: "Ô trống bị điền bừa" },
  ],
  "ai-la-thuc-tap-sinh": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.0, volume: 0.35, hitSec: 0, name: "Khung chat và dáng người trùng khít" },
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.75, volume: 0.35, hitSec: 0, name: "Khung chat nổi bật" },
    { src: "audio/sfx/slide-01.mp3", sentence: 1, fraction: 0.15, volume: 0.35, hitSec: 0, name: "Cửa sổ chat mới mỗi sáng" },
    { src: "audio/sfx/pop-bubble-01.mp3", sentence: 2, fraction: 0.5, volume: 0.35, hitSec: 0, name: "Cửa sổ phóng to ô trống" },
    { src: "audio/sfx/error-soft-01.mp3", sentence: 2, fraction: 0.55, volume: 0.35, hitSec: 0, name: "Chip lạ nảy ra đoán mò" },
  ],
  "luon-co-tra-loi": [
    { src: "audio/sfx/impact-soft-01.mp3", sentence: 0, fraction: 0.0, volume: 0.4, hitSec: 0, name: "Khối AI lớn xuất hiện" },
    { src: "audio/sfx/pop-bubble-01.mp3", sentence: 0, fraction: 0.15, volume: 0.35, hitSec: 0, name: "Mưa dấu hỏi rơi xuống" },
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 1, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Chất bóng chảy lấp ô hổng" },
    { src: "audio/sfx/pop-01.mp3", sentence: 1, fraction: 0.5, volume: 0.35, hitSec: 0, name: "Bong bóng đáp bật ra" },
    { src: "audio/sfx/glitch-01.mp3", sentence: 2, fraction: 0.3, volume: 0.4, hitSec: 0, name: "Nối tới dấu sai viền đỏ" },
  ],
  "to-noi-quy-tren-ban": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Dặn miệng bay đi" },
    { src: "audio/sfx/error-soft-01.mp3", sentence: 0, fraction: 0.25, volume: 0.35, hitSec: 0, name: "Dấu gạch chéo" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 1, fraction: 0.15, volume: 0.45, hitSec: 0, name: "Dán tờ nội quy lên bàn" },
    { src: "audio/sfx/slide-01.mp3", sentence: 2, fraction: 0.06, volume: 0.35, hitSec: 0, name: "Thực tập sinh bước vào" },
    { src: "audio/sfx/ding-01.mp3", sentence: 2, fraction: 0.4, volume: 0.4, hitSec: 0, name: "Đọc nội quy đầu tiên" },
    { src: "audio/sfx/success-01.mp3", sentence: 2, fraction: 0.78, volume: 0.4, hitSec: 0, name: "Tích xanh ghi nhớ" },
  ],
  "thieu-boi-canh-noi-quy": [
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.0, volume: 0.35, hitSec: 0, name: "Khung bảng rỗng" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 0, fraction: 0.35, volume: 0.45, hitSec: 0, name: "Tờ nội quy lấp khung rỗng" },
    { src: "audio/sfx/ding-01.mp3", sentence: 0, fraction: 0.55, volume: 0.4, hitSec: 0, name: "Chip méo hít lại thẳng hàng" },
    { src: "audio/sfx/whoosh-fast-01.mp3", sentence: 1, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Xúc xắc đoán mò lăn mất" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 1, fraction: 0.62, volume: 0.35, hitSec: 0, name: "Đèn sáng ổn định" },
  ],
  "hai-ten-file-quy-tac": [
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.0, volume: 0.35, hitSec: 0, name: "Thư mục mở ra" },
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.45, volume: 0.35, hitSec: 0, name: "Tờ nội quy gấp thành file" },
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 1, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Thư mục tách đôi" },
    { src: "audio/sfx/pop-01.mp3", sentence: 1, fraction: 0.5, volume: 0.35, hitSec: 0, name: "Hai thẻ tên hiện ra" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 2, fraction: 0.35, volume: 0.4, hitSec: 0, name: "Khóa chân số liệu" },
    { src: "audio/sfx/chime-01.mp3", sentence: 2, fraction: 0.5, volume: 0.4, hitSec: 0, name: "Hướng dẫn trích nguồn" },
  ],
  "khoa-chan-va-trich-nguon": [
    { src: "audio/sfx/stamp-01.mp3", sentence: 0, fraction: 0.05, volume: 0.45, hitSec: 0, name: "Xích khóa chân số liệu" },
    { src: "audio/sfx/impact-soft-01.mp3", sentence: 0, fraction: 0.45, volume: 0.4, hitSec: 0, name: "Biển chặn cấm bịa" },
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.58, volume: 0.35, hitSec: 0, name: "Dấu hỏi quay về người" },
    { src: "audio/sfx/tap-01.mp3", sentence: 1, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Dây ghim trích nguồn" },
    { src: "audio/sfx/click-ui-01.mp3", sentence: 1, fraction: 0.35, volume: 0.35, hitSec: 0, name: "Ghim vào dòng và trang" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 1, fraction: 0.55, volume: 0.35, hitSec: 0, name: "Nguồn sáng vàng" },
  ],
  "dan-cu-the-phong-van-nguoc": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.0, volume: 0.35, hitSec: 0, name: "Dặn chung chung trôi lệch" },
    { src: "audio/sfx/error-soft-01.mp3", sentence: 0, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Gạch đỏ nhắc nhở" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 1, fraction: 0.0, volume: 0.35, hitSec: 0, name: "Chùm sáng chiếu cột A B" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 1, fraction: 0.45, volume: 0.4, hitSec: 0, name: "Đánh dấu đỏ" },
    { src: "audio/sfx/pop-bubble-01.mp3", sentence: 2, fraction: 0.02, volume: 0.35, hitSec: 0, name: "AI phỏng vấn ngược" },
    { src: "audio/sfx/slide-01.mp3", sentence: 2, fraction: 0.25, volume: 0.35, hitSec: 0, name: "Nhét tờ quy tắc vào thư mục" },
    { src: "audio/sfx/success-01.mp3", sentence: 2, fraction: 0.78, volume: 0.4, hitSec: 0, name: "Hoàn tất bộ dặn" },
  ],
  "khong-co-nut-tai-len": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.0, volume: 0.35, hitSec: 0, name: "Bản web ChatGPT hiện ra" },
    { src: "audio/sfx/pop-bubble-01.mp3", sentence: 0, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Tìm nút tải lên" },
    { src: "audio/sfx/whoosh-fast-01.mp3", sentence: 1, fraction: 0.05, volume: 0.35, hitSec: 0, name: "File tìm khe giữa hai khung chat" },
    { src: "audio/sfx/error-soft-01.mp3", sentence: 1, fraction: 0.36, volume: 0.35, hitSec: 0, name: "Ô trống bị gạch chéo" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 2, fraction: 0.0, volume: 0.4, hitSec: 0, name: "File về thư mục máy tính" },
  ],
  "ban-web-va-ung-dung": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.0, volume: 0.35, hitSec: 0, name: "Khung chia hai nửa web và app" },
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.35, volume: 0.35, hitSec: 0, name: "Biểu tượng web và máy tính" },
    { src: "audio/sfx/slide-01.mp3", sentence: 1, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Bạn chat vs trợ lý bàn làm việc" },
    { src: "audio/sfx/click-ui-01.mp3", sentence: 2, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Dây nối vào thư mục dự án" },
    { src: "audio/sfx/ding-01.mp3", sentence: 3, fraction: 0.42, volume: 0.4, hitSec: 0, name: "Thông suốt không cần tải lại" },
  ],
  "tai-app-mo-thu-muc": [
    { src: "audio/sfx/impact-soft-01.mp3", sentence: 0, fraction: 0.55, volume: 0.4, hitSec: 0, name: "Icon app hạ xuống bàn" },
    { src: "audio/sfx/slide-01.mp3", sentence: 1, fraction: 0.45, volume: 0.35, hitSec: 0, name: "Mở thư mục làm việc" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 2, fraction: 0.45, volume: 0.45, hitSec: 0, name: "Thả 2 file quy tắc vào thư mục" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 3, fraction: 0.34, volume: 0.35, hitSec: 0, name: "Vòng bảo vệ quy tắc phát sáng" },
    { src: "audio/sfx/success-01.mp3", sentence: 3, fraction: 0.58, volume: 0.4, hitSec: 0, name: "Khóa an toàn chốt lại" },
  ],
  "giao-viec-mot-cau": [
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.1, volume: 0.4, hitSec: 0, name: "Khung chat và bong bóng ngắn" },
    { src: "audio/sfx/click-ui-01.mp3", sentence: 0, fraction: 0.45, volume: 0.35, hitSec: 0, name: "Dòng lệnh ngắn sáng lên" },
    { src: "audio/sfx/ding-01.mp3", sentence: 1, fraction: 0.2, volume: 0.4, hitSec: 0, name: "Quy tắc ngầm kích hoạt" },
    { src: "audio/sfx/success-01.mp3", sentence: 1, fraction: 0.6, volume: 0.4, hitSec: 0, name: "Bảng kết quả chuẩn từng số" },
  ],
  "muoi-lam-phut-bai-huong-dan": [
    { src: "audio/sfx/tick-01.mp3", sentence: 0, fraction: 0.2, volume: 0.35, hitSec: 0, name: "Đồng hồ 15 phút quay nhanh" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 0, fraction: 0.6, volume: 0.4, hitSec: 0, name: "Cài đặt hoàn tất" },
    { src: "audio/sfx/slide-01.mp3", sentence: 1, fraction: 0.25, volume: 0.35, hitSec: 0, name: "Cọc thời gian tiết kiệm" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 2, fraction: 0.4, volume: 0.35, hitSec: 0, name: "Tia sáng thành quả" },
  ],
  "thu-tom-tat-quy-tac": [
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.15, volume: 0.35, hitSec: 0, name: "Tài liệu mẫu mở ra" },
    { src: "audio/sfx/click-ui-01.mp3", sentence: 0, fraction: 0.45, volume: 0.35, hitSec: 0, name: "Nút thử nghiệm nhấp nháy" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 1, fraction: 0.2, volume: 0.45, hitSec: 0, name: "Khiên chặn số bịa" },
    { src: "audio/sfx/chime-01.mp3", sentence: 1, fraction: 0.6, volume: 0.4, hitSec: 0, name: "Chuông ngân sạch sẽ" },
  ],
  "ket-quay-lai-hook": [
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.1, volume: 0.4, hitSec: 0, name: "Lệnh ngắn và nội quy cạnh nhau" },
    { src: "audio/sfx/ding-01.mp3", sentence: 1, fraction: 0.3, volume: 0.4, hitSec: 0, name: "Khớp nối hoàn hảo" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 2, fraction: 0.2, volume: 0.45, hitSec: 0, name: "Biển cấm bịa số đóng dấu" },
    { src: "audio/sfx/success-01.mp3", sentence: 3, fraction: 0.2, volume: 0.45, hitSec: 0, name: "Tích xanh Bài 1 hoàn tất" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 3, fraction: 0.7, volume: 0.4, hitSec: 0, name: "Logo thương hiệu toả sáng" },
  ],
};

// ==========================================
// CUES FOR BAI 2 (Bắt AI Soi Điểm Mù Trước Khi Gửi Sếp)
// ==========================================
const sfxBai2: Record<string, CueDef[]> = {
  "hook-loi-trong-dau-ban": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Sếp lắc đầu" },
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.25, volume: 0.35, hitSec: 0, name: "Tờ trình bay ngược lại" },
    { src: "audio/sfx/glitch-01.mp3", sentence: 1, fraction: 0.1, volume: 0.4, hitSec: 0, name: "Vết rạn đỏ điểm mù" },
    { src: "audio/sfx/impact-soft-01.mp3", sentence: 1, fraction: 0.45, volume: 0.4, hitSec: 0, name: "Điểm mù đè nặng" },
  ],
  "tinh-huong-van-phong": [
    { src: "audio/sfx/typing-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Cặm cụi gõ bàn phím" },
    { src: "audio/sfx/click-ui-01.mp3", sentence: 0, fraction: 0.4, volume: 0.35, hitSec: 0, name: "Bấm nút gửi tờ trình" },
    { src: "audio/sfx/slide-01.mp3", sentence: 1, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Tờ trình bay qua phòng sếp" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 1, fraction: 0.5, volume: 0.35, hitSec: 0, name: "Nụ cười tự tin" },
  ],
  "nho-ai-soan-roi-gui": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.1, volume: 0.35, hitSec: 0, name: "AI viết mượt mà" },
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.45, volume: 0.35, hitSec: 0, name: "Văn bản trôi chảy" },
    { src: "audio/sfx/tap-01.mp3", sentence: 1, fraction: 0.15, volume: 0.35, hitSec: 0, name: "Duyệt nhanh không để ý" },
    { src: "audio/sfx/glitch-01.mp3", sentence: 2, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Lỗ hổng tiềm ẩn" },
  ],
  "sep-hoi-nguon-ngan-sach": [
    { src: "audio/sfx/ding-01.mp3", sentence: 0, fraction: 0.1, volume: 0.4, hitSec: 0, name: "Sếp ngước nhìn lên" },
    { src: "audio/sfx/pop-bubble-01.mp3", sentence: 0, fraction: 0.4, volume: 0.35, hitSec: 0, name: "Bong bóng thoại ngân sách" },
    { src: "audio/sfx/glitch-01.mp3", sentence: 1, fraction: 0.2, volume: 0.4, hitSec: 0, name: "Cột chi phí thiếu nguồn" },
  ],
  "sep-hoi-bao-gia-hop-dong": [
    { src: "audio/sfx/scribble-01.mp3", sentence: 0, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Sếp gõ bút xuống bàn" },
    { src: "audio/sfx/tap-01.mp3", sentence: 0, fraction: 0.45, volume: 0.35, hitSec: 0, name: "Dấu hỏi 3 bên báo giá" },
    { src: "audio/sfx/error-soft-01.mp3", sentence: 1, fraction: 0.25, volume: 0.4, hitSec: 0, name: "Điều khoản cũ chưa check" },
  ],
  "dung-hinh-ai-khong-sai": [
    { src: "audio/sfx/glitch-01.mp3", sentence: 0, fraction: 0.1, volume: 0.4, hitSec: 0, name: "Bạn đứng hình chớp mắt" },
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 1, fraction: 0.05, volume: 0.35, hitSec: 0, name: "AI vô tội đưa hai tay" },
    { src: "audio/sfx/impact-soft-01.mp3", sentence: 2, fraction: 0.3, volume: 0.4, hitSec: 0, name: "Khoảng trống thông tin lộ ra" },
  ],
  "quy-dinh-ngam-ban-do": [
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Bản đồ công ty mở ra" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 1, fraction: 0.3, volume: 0.4, hitSec: 0, name: "Quy định ngầm hiện hình" },
    { src: "audio/sfx/chime-01.mp3", sentence: 2, fraction: 0.2, volume: 0.35, hitSec: 0, name: "Kinh nghiệm thực tế" },
  ],
  "lanh-tho-cho-lech": [
    { src: "audio/sfx/whoosh-fast-01.mp3", sentence: 0, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Vạch ranh giới lệch" },
    { src: "audio/sfx/error-soft-01.mp3", sentence: 0, fraction: 0.45, volume: 0.35, hitSec: 0, name: "Xung đột phòng ban" },
    { src: "audio/sfx/impact-soft-01.mp3", sentence: 1, fraction: 0.3, volume: 0.4, hitSec: 0, name: "Chặn trước rủi ro" },
  ],
  "chuyen-vien-phan-bien": [
    { src: "audio/sfx/sparkle-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Kính lúp sáng loáng" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 1, fraction: 0.3, volume: 0.45, hitSec: 0, name: "Chuyên viên phản biện khó tính" },
    { src: "audio/sfx/ding-01.mp3", sentence: 2, fraction: 0.25, volume: 0.4, hitSec: 0, name: "Bật chế độ soi lỗi" },
  ],
  "do-diem-mu": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Tia radar quét văn bản" },
    { src: "audio/sfx/ding-01.mp3", sentence: 1, fraction: 0.3, volume: 0.4, hitSec: 0, name: "Phát hiện điểm mù 1" },
    { src: "audio/sfx/ding-01.mp3", sentence: 2, fraction: 0.25, volume: 0.4, hitSec: 0, name: "Phát hiện điểm mù 2" },
    { src: "audio/sfx/success-01.mp3", sentence: 3, fraction: 0.4, volume: 0.4, hitSec: 0, name: "Bịt kín mọi kẽ hở" },
  ],
  "khoan-viet-liet-ke": [
    { src: "audio/sfx/click-ui-01.mp3", sentence: 0, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Dừng bút khoan viết" },
    { src: "audio/sfx/slide-01.mp3", sentence: 1, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Bảng danh sách rủi ro" },
    { src: "audio/sfx/tap-01.mp3", sentence: 2, fraction: 0.2, volume: 0.35, hitSec: 0, name: "Từng mục rủi ro bật lên" },
  ],
  "phong-van-nguoc-doi-vai": [
    { src: "audio/sfx/pop-bubble-01.mp3", sentence: 0, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Đổi vai AI phỏng vấn" },
    { src: "audio/sfx/chime-01.mp3", sentence: 1, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Huy hiệu người hỏi bật sáng" },
    { src: "audio/sfx/pop-01.mp3", sentence: 2, fraction: 0.2, volume: 0.35, hitSec: 0, name: "Câu hỏi sắc sảo" },
  ],
  "phong-van-nguoc-cau-lenh": [
    { src: "audio/sfx/typing-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Nhập lệnh phỏng vấn ngược" },
    { src: "audio/sfx/tap-01.mp3", sentence: 1, fraction: 0.3, volume: 0.35, hitSec: 0, name: "5 câu hỏi hóc búa" },
    { src: "audio/sfx/pop-01.mp3", sentence: 2, fraction: 0.2, volume: 0.35, hitSec: 0, name: "AI đưa ra câu hỏi chất lượng" },
  ],
  "hoi-trung-chi-tiet-hay-quen": [
    { src: "audio/sfx/ding-01.mp3", sentence: 0, fraction: 0.1, volume: 0.4, hitSec: 0, name: "Trúng ngay điểm sơ hở" },
    { src: "audio/sfx/scribble-01.mp3", sentence: 0, fraction: 0.45, volume: 0.35, hitSec: 0, name: "Bổ sung thông tin thiếu" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 1, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Lập luận vững chắc" },
  ],
  "thanh-tra-doc-lap": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Cửa sổ chat thứ hai mở ra" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 1, fraction: 0.3, volume: 0.45, hitSec: 0, name: "Huy hiệu thanh tra độc lập" },
    { src: "audio/sfx/slide-01.mp3", sentence: 2, fraction: 0.2, volume: 0.35, hitSec: 0, name: "So sánh chéo 2 góc nhìn" },
    { src: "audio/sfx/chime-01.mp3", sentence: 3, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Độc lập khách quan" },
  ],
  "cau-lenh-thanh-tra": [
    { src: "audio/sfx/click-ui-01.mp3", sentence: 0, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Nhập lệnh thanh tra" },
    { src: "audio/sfx/ding-01.mp3", sentence: 0, fraction: 0.45, volume: 0.4, hitSec: 0, name: "Chỉ ra điểm thiếu bằng chứng" },
    { src: "audio/sfx/success-01.mp3", sentence: 1, fraction: 0.35, volume: 0.4, hitSec: 0, name: "Văn bản hoàn thiện 100%" },
  ],
  "muoi-lam-phut-bai-huong-dan": [
    { src: "audio/sfx/tick-01.mp3", sentence: 0, fraction: 0.2, volume: 0.35, hitSec: 0, name: "15 phút phản biện" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 1, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Tự tin bước vào phòng sếp" },
    { src: "audio/sfx/success-01.mp3", sentence: 2, fraction: 0.35, volume: 0.45, hitSec: 0, name: "Sẵn sàng trả lời mọi câu hỏi" },
  ],
  "ket-quay-lai-to-trinh": [
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Tờ trình đặt lên bàn sếp" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 1, fraction: 0.3, volume: 0.45, hitSec: 0, name: "Sếp ký duyệt ngay lần đầu" },
    { src: "audio/sfx/success-01.mp3", sentence: 2, fraction: 0.2, volume: 0.45, hitSec: 0, name: "Dấu tích xanh Bài 2" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 3, fraction: 0.4, volume: 0.4, hitSec: 0, name: "Logo thương hiệu toả sáng" },
  ],
};

// ==========================================
// CUES FOR BAI 3 (Biến Bảng Số Liệu Thành Trang HTML Sếp Nhìn Là Duyệt)
// ==========================================
const sfxBai3: Record<string, CueDef[]> = {
  "hook-sep-nhin-excel": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Bảng Excel mở ra" },
    { src: "audio/sfx/glitch-01.mp3", sentence: 0, fraction: 0.3, volume: 0.4, hitSec: 0, name: "Rừng số hoa mắt" },
    { src: "audio/sfx/impact-soft-01.mp3", sentence: 1, fraction: 0.1, volume: 0.4, hitSec: 0, name: "Sếp ôm trán thở dài" },
    { src: "audio/sfx/slide-01.mp3", sentence: 1, fraction: 0.5, volume: 0.35, hitSec: 0, name: "Đẩy bảng Excel sang bên" },
  ],
  "muoi-lam-cot-muoi-trang": [
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Bảng 15 cột kéo dài" },
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.5, volume: 0.35, hitSec: 0, name: "Đồng xu rơi khớp hàng" },
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 1, fraction: 0.06, volume: 0.35, hitSec: 0, name: "Chồng Word dày 10 trang" },
    { src: "audio/sfx/impact-soft-01.mp3", sentence: 1, fraction: 0.3, volume: 0.4, hitSec: 0, name: "Chồng tài liệu đè xuống bàn" },
  ],
  "dinh-ninh-gui-sep": [
    { src: "audio/sfx/click-ui-01.mp3", sentence: 0, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Bấm nút gửi cho sếp" },
    { src: "audio/sfx/whoosh-fast-01.mp3", sentence: 0, fraction: 0.5, volume: 0.35, hitSec: 0, name: "Thư bay sang phòng sếp" },
    { src: "audio/sfx/pop-bubble-01.mp3", sentence: 1, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Bong bóng nghĩ sếp khen vỡ tan" },
    { src: "audio/sfx/error-soft-01.mp3", sentence: 1, fraction: 0.35, volume: 0.35, hitSec: 0, name: "Sếp nảy dấu hỏi" },
  ],
  "sep-mo-excel-hoi-ben-b": [
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.12, volume: 0.35, hitSec: 0, name: "Điện thoại hiện bảng nhỏ xíu" },
    { src: "audio/sfx/tap-01.mp3", sentence: 0, fraction: 0.45, volume: 0.35, hitSec: 0, name: "Mắt xoáy ôm trán" },
    { src: "audio/sfx/notification-01.mp3", sentence: 1, fraction: 0.1, volume: 0.4, hitSec: 0, name: "Sếp gọi hỏi bên B" },
    { src: "audio/sfx/pop-bubble-01.mp3", sentence: 1, fraction: 0.45, volume: 0.35, hitSec: 0, name: "Bong bóng 2 dấu hỏi" },
  ],
  "word-khong-ai-doc-dinh-dang-tinh": [
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 0, fraction: 0.22, volume: 0.35, hitSec: 0, name: "Mắt lướt trang đầu rồi dừng" },
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.5, volume: 0.35, hitSec: 0, name: "Trang sau xám xịt" },
    { src: "audio/sfx/error-soft-01.mp3", sentence: 1, fraction: 0.25, volume: 0.35, hitSec: 0, name: "Định dạng tĩnh không tương tác" },
    { src: "audio/sfx/impact-soft-01.mp3", sentence: 2, fraction: 0.3, volume: 0.4, hitSec: 0, name: "Ô quyết định bị bỏ trống" },
  ],
  "hom-nay-mot-file-html": [
    { src: "audio/sfx/sparkle-01.mp3", sentence: 0, fraction: 0.08, volume: 0.4, hitSec: 0, name: "AI nâng trang HTML lên" },
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Mắt bạn sáng lên" },
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 1, fraction: 0.12, volume: 0.35, hitSec: 0, name: "Đồng nghiệp lùi xua tay" },
    { src: "audio/sfx/pop-bubble-01.mp3", sentence: 1, fraction: 0.5, volume: 0.35, hitSec: 0, name: "Bong bóng nghĩ code rối" },
  ],
  "yen-tam-khong-can-code": [
    { src: "audio/sfx/whoosh-fast-01.mp3", sentence: 0, fraction: 0.08, volume: 0.35, hitSec: 0, name: "Ngoặc code tan thành bụi" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 0, fraction: 0.5, volume: 0.4, hitSec: 0, name: "Biển cấm đè ô code" },
    { src: "audio/sfx/slide-01.mp3", sentence: 1, fraction: 0.12, volume: 0.35, hitSec: 0, name: "Đẩy số liệu và lệnh vào AI" },
    { src: "audio/sfx/ding-01.mp3", sentence: 2, fraction: 0.08, volume: 0.4, hitSec: 0, name: "AI lắp trang HTML trong trình duyệt" },
  ],
  "ba-uu-diem-trang-html": [
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.05, volume: 0.4, hitSec: 0, name: "Mục lục nhảy trang êm" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 1, fraction: 0.25, volume: 0.4, hitSec: 0, name: "Bảng 3 cột xanh cam" },
    { src: "audio/sfx/slide-01.mp3", sentence: 2, fraction: 0.1, volume: 0.35, hitSec: 0, name: "Ô kết luận trượt xuống" },
    { src: "audio/sfx/success-01.mp3", sentence: 2, fraction: 0.55, volume: 0.45, hitSec: 0, name: "Sếp xem 30 giây và ký" },
  ],
  "hai-viec-ap-dung-bao-gia": [
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.12, volume: 0.35, hitSec: 0, name: "Hai thẻ việc trượt ra" },
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.5, volume: 0.35, hitSec: 0, name: "Chỉ vào cả hai thẻ" },
    { src: "audio/sfx/click-ui-01.mp3", sentence: 1, fraction: 0.45, volume: 0.35, hitSec: 0, name: "Thẻ báo giá phóng to" },
  ],
  "lenh-so-sanh-nam-tieu-chi": [
    { src: "audio/sfx/whoosh-fast-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Gạt bảng tính cũ xuống" },
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.45, volume: 0.35, hitSec: 0, name: "Đưa 3 báo giá và 5 tiêu chí cho AI" },
    { src: "audio/sfx/ding-01.mp3", sentence: 1, fraction: 0.1, volume: 0.4, hitSec: 0, name: "HTML tô màu xanh cam" },
    { src: "audio/sfx/success-01.mp3", sentence: 1, fraction: 0.45, volume: 0.4, hitSec: 0, name: "Bảng so sánh hoàn hảo" },
  ],
  "o-ket-luan-sep-gat-dau": [
    { src: "audio/sfx/chime-01.mp3", sentence: 0, fraction: 0.05, volume: 0.4, hitSec: 0, name: "Ô kết luận bật lên đầu trang" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 0, fraction: 0.25, volume: 0.35, hitSec: 0, name: "Mũi tên vàng chỉ vào bảng" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 1, fraction: 0.45, volume: 0.45, hitSec: 0, name: "Sếp gật đầu và ký" },
    { src: "audio/sfx/success-01.mp3", sentence: 1, fraction: 0.7, volume: 0.45, hitSec: 0, name: "Vòng sáng quanh trang" },
  ],
  "thu-hai-tien-do-ba-cot": [
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.08, volume: 0.35, hitSec: 0, name: "Thẻ báo giá lùi, bảng tiến độ vào" },
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.45, volume: 0.35, hitSec: 0, name: "Hai người đeo thẻ đón nhận" },
    { src: "audio/sfx/whoosh-soft-01.mp3", sentence: 1, fraction: 0.04, volume: 0.35, hitSec: 0, name: "Danh sách việc vào AI" },
    { src: "audio/sfx/ding-01.mp3", sentence: 1, fraction: 0.28, volume: 0.4, hitSec: 0, name: "Bung thành 3 cột tiến độ" },
  ],
  "the-o-tich-ung-dung-mini": [
    { src: "audio/sfx/click-ui-01.mp3", sentence: 0, fraction: 0.2, volume: 0.4, hitSec: 0, name: "Tích chọn checkbox 1" },
    { src: "audio/sfx/ding-01.mp3", sentence: 0, fraction: 0.64, volume: 0.4, hitSec: 0, name: "Tích chọn checkbox 2" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 1, fraction: 0.15, volume: 0.35, hitSec: 0, name: "Trang như một ứng dụng mini" },
  ],
  "cum-tu-song-con": [
    { src: "audio/sfx/pop-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Bong bóng câu lệnh hiện ra" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 0, fraction: 0.5, volume: 0.4, hitSec: 0, name: "Cụm từ sống còn sáng vàng" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 1, fraction: 0.2, volume: 0.45, hitSec: 0, name: "Single-file HTML with Tailwind" },
  ],
  "tai-sao-single-file": [
    { src: "audio/sfx/notification-01.mp3", sentence: 0, fraction: 0.1, volume: 0.4, hitSec: 0, name: "Gửi qua tin nhắn Lark/Zalo" },
    { src: "audio/sfx/slide-01.mp3", sentence: 0, fraction: 0.55, volume: 0.35, hitSec: 0, name: "Mở ngay trong 1 chạm" },
    { src: "audio/sfx/ding-01.mp3", sentence: 1, fraction: 0.32, volume: 0.4, hitSec: 0, name: "Không cần cài đặt gì thêm" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 2, fraction: 0.45, volume: 0.35, hitSec: 0, name: "Bảo mật an toàn trên máy" },
  ],
  "doi-mau-chat-tiep": [
    { src: "audio/sfx/typing-01.mp3", sentence: 0, fraction: 0.05, volume: 0.35, hitSec: 0, name: "Gõ lệnh đổi màu hoặc thêm cột" },
    { src: "audio/sfx/click-ui-01.mp3", sentence: 0, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Bấm gửi yêu cầu sửa" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 1, fraction: 0.35, volume: 0.4, hitSec: 0, name: "AI cập nhật trang ngay tức thì" },
  ],
  "muoi-lam-phut-thu-ngay": [
    { src: "audio/sfx/tick-01.mp3", sentence: 0, fraction: 0.3, volume: 0.35, hitSec: 0, name: "Đồng hồ 15 phút thử ngay" },
    { src: "audio/sfx/slide-01.mp3", sentence: 1, fraction: 0.25, volume: 0.35, hitSec: 0, name: "Lấy một bảng Excel có sẵn" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 2, fraction: 0.35, volume: 0.4, hitSec: 0, name: "Biến thành trang HTML đầu tiên" },
  ],
  "ket-quay-lai-sep-nhin-html": [
    { src: "audio/sfx/chime-01.mp3", sentence: 0, fraction: 0.05, volume: 0.4, hitSec: 0, name: "Màn hình điện thoại trang HTML" },
    { src: "audio/sfx/stamp-01.mp3", sentence: 0, fraction: 0.5, volume: 0.45, hitSec: 0, name: "Sếp mỉm cười gật đầu duyệt" },
    { src: "audio/sfx/success-01.mp3", sentence: 1, fraction: 0.3, volume: 0.45, hitSec: 0, name: "Tích xanh hoàn tất Bài 3" },
    { src: "audio/sfx/sparkle-01.mp3", sentence: 2, fraction: 0.4, volume: 0.45, hitSec: 0, name: "Màn kết thương hiệu toàn series" },
  ],
};

function applyVideo(jobDir: string, sfxConfig: Record<string, CueDef[]>, videoMp4Name: string) {
  console.log(`\n========================================`);
  console.log(`ĐANG XỬ LÝ: ${jobDir}`);
  console.log(`========================================`);

  const scriptPath = `${jobDir}/script.json`;
  const timelinePath = `${jobDir}/timeline.json`;
  const propsPath = `${jobDir}/props.json`;
  const approvalsPath = `${jobDir}/approvals.json`;
  const projectPath = `${jobDir}/project.json`;

  const script = JSON.parse(readFileSync(scriptPath, "utf8"));
  const timeline = JSON.parse(readFileSync(timelinePath, "utf8"));

  // 1. Cấu hình BGM
  script.music = {
    src: "audio/music/empathic-prosperity.mp3",
    underVoice: CONSTANT_MUSIC_LEVEL,
    inGap: CONSTANT_MUSIC_LEVEL,
    fadeInSec: 1.5,
    fadeOutSec: 2.5,
  };

  // 2. Gán SFX với kiểm tra biên an toàn cho sentence index
  let totalSfx = 0;
  for (const scene of script.scenes) {
    const cues = sfxConfig[scene.id] || [];
    const maxSentence = scene.voiceSegments.length - 1;
    scene.sfx = cues.map(c => ({
      src: c.src,
      sentence: Math.min(c.sentence, maxSentence),
      fraction: Math.max(0, Math.min(1, c.fraction)),
      volume: c.volume,
      hitSec: c.hitSec,
    }));
    totalSfx += scene.sfx.length;
  }
  console.log(`-> Đã gán ${totalSfx} cues SFX cho ${script.scenes.length} cảnh.`);

  // Validate script schema
  TrainingScriptSchema.parse(script);

  // 3. Ghi script.json
  writeFileSync(scriptPath, JSON.stringify(script, null, 2), "utf8");
  console.log(`-> Đã cập nhật ${scriptPath}`);

  // 4. Ghi props.json
  const props = JSON.parse(readFileSync(propsPath, "utf8"));
  props.script = script;
  writeFileSync(propsPath, JSON.stringify(props, null, 2), "utf8");
  console.log(`-> Đã cập nhật ${propsPath}`);

  // 5. Cập nhật approvals.json
  const sha = createHash("sha256").update(JSON.stringify(script)).digest("hex");
  const approvals = existsSync(approvalsPath) ? JSON.parse(readFileSync(approvalsPath, "utf8")) : {};
  approvals.script = {
    by: "Anh Phương",
    at: new Date().toISOString(),
    scriptHash: sha,
  };
  approvals.visual = {
    by: "Anh Phương",
    at: new Date().toISOString(),
    scriptHash: sha,
  };
  writeFileSync(approvalsPath, JSON.stringify(approvals, null, 2), "utf8");
  console.log(`-> Đã cập nhật ${approvalsPath} (hash: ${sha.slice(0, 8)}...)`);

  // 6. Xây dựng project.json cho TVHs Editor
  const sceneLayers: any[] = [];
  const sfxLayers: any[] = [];

  for (let scIdx = 0; scIdx < timeline.scenes.length; scIdx++) {
    const sc = timeline.scenes[scIdx];
    sceneLayers.push({
      id: `scene-${sc.id}`,
      type: "scene",
      start: sc.startSec,
      duration: sc.durationSec,
      text: `${scIdx + 1}. ${sc.id}`,
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
      animation: {
        in: { kind: "fade", dur: 0.2 },
        out: { kind: "fade", dur: 0.2 },
      },
    });

    const cues = sfxConfig[sc.id] || [];
    const maxSentence = sc.sentences.length - 1;
    for (let cIdx = 0; cIdx < cues.length; cIdx++) {
      const cue = cues[cIdx];
      const safeSentenceIdx = Math.min(cue.sentence, maxSentence);
      const sentence = sc.sentences[safeSentenceIdx];
      if (!sentence) continue;
      const sfxStartFrame = sfxFromFrame(sentence, { ...cue, sentence: safeSentenceIdx }, FPS);
      const sfxStartSec = sfxStartFrame / FPS;
      sfxLayers.push({
        id: `sfx-${sc.id}-${cIdx}`,
        type: "audio",
        start: sfxStartSec,
        duration: 0.8,
        src: `/${cue.src}`,
        text: cue.name,
        gainDb: -8,
        style: {
          fontFamily: "Be Vietnam Pro",
          fontSize: 24,
          fontWeight: 600,
          color: "#E2E8F0",
          accentColor: "#38BDF8",
          background: "rgba(15,23,42,0.9)",
          align: "left",
          radius: 6,
          padding: 8,
          strokeColor: null,
          strokeWidth: 0,
          shadow: false,
        },
      });
    }
  }

  const musicLayer = {
    id: "bgm-main",
    type: "audio",
    start: 0,
    duration: timeline.totalSec,
    src: "/audio/music/empathic-prosperity.mp3",
    text: "Empathic Prosperity (Nhạc nền đều)",
    gainDb: -20,
    style: {
      fontFamily: "Be Vietnam Pro",
      fontSize: 24,
      fontWeight: 600,
      color: "#F8FAFC",
      accentColor: "#A855F7",
      background: "rgba(30,27,75,0.9)",
      align: "left",
      radius: 6,
      padding: 8,
      strokeColor: null,
      strokeWidth: 0,
      shadow: false,
    },
  };

  const project = {
    version: 1,
    job: jobDir.replace("output/", ""),
    fps: 30,
    width: 1080,
    height: 1350,
    aspect: "4:5",
    duration: timeline.totalSec,
    source: {
      video: videoMp4Name,
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
        kind: "audio",
        name: "Hiệu ứng âm thanh (SFX)",
        hidden: false,
        locked: false,
        layers: sfxLayers,
      },
      {
        id: "t-music",
        kind: "audio",
        name: "Nhạc nền (BGM đều)",
        hidden: false,
        locked: false,
        layers: [musicLayer],
      },
    ],
    videoMoves: [],
    videoShifts: [],
    audio: {
      voice: { gainDb: 0, muted: false },
      music: { duckDb: 0, attack: 0.15, release: 0.45 },
      master: { lufs: -14, truePeak: -1.5 },
    },
  };

  writeFileSync(projectPath, JSON.stringify(project, null, 2), "utf8");
  console.log(`-> Đã tạo ${projectPath} thành công!`);
}

// Chạy cho cả 3 bài
applyVideo("output/Bai 1", sfxBai1, "01. Bài 1 - Khóa Chân AI Cấm Bịa Số.mp4");
applyVideo("output/Bai 2", sfxBai2, "02. Bài 2 - Tìm Ra Điều Mình Chưa Biết.mp4");
applyVideo("output/Bai 3", sfxBai3, "03. Bài 3 Sự Hiệu Quả Phi Lý Của HTML.mp4");

console.log("\n>>> HOÀN TẤT CẬP NHẬT ÂM THANH CHO CẢ 3 BÀI! <<<");
