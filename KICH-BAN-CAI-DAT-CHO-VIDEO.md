# KỊCH BẢN QUAY VIDEO HƯỚNG DẪN CÀI ĐẶT & SỬ DỤNG TVHs-Labs-Video TỪ ĐẦU (A-Z)

> **Mục tiêu:** Bản hướng dẫn chi tiết dành cho người quay video tutorial để hướng dẫn người xem tải, cài đặt từ máy trắng (fresh setup) và chạy thành công video đầu tiên bằng TVHs-Labs-Video.

---

## PHẦN 1: ĐIỀU KIỆN TIÊN QUYẾT (CHUẨN BỊ MÔI TRƯỜNG)

Trước khi bắt đầu quay màn hình, người hướng dẫn nên mở sẵn các trang tải hoặc giới thiệu nhanh về cấu hình:

| Thành phần | Yêu cầu tối thiểu | Khuyến nghị cho Video | Lệnh cài nhanh qua Winget |
| :--- | :--- | :--- | :--- |
| **Hệ điều hành** | Windows 10/11 64-bit | Windows 11 64-bit | Có sẵn trên Windows |
| **Node.js** | Phiên bản 22.x trở lên | Node.js 22 LTS | `winget install OpenJS.NodeJS.LTS` |
| **Python** | Python 3.11 hoặc 3.12 | Python 3.12 | `winget install Python.Python.3.12` |
| **uv Package Manager** | Bất kỳ bản mới nào | Tự động cài bởi script | `winget install astral-sh.uv` |
| **FFmpeg** | Có trong PATH hệ thống | Tự động cài bởi script | `winget install Gyan.FFmpeg` |
| **GPU / Driver** | CPU vẫn chạy được | NVIDIA GPU, Driver 550+ | Tải driver từ trang NVIDIA |
| **Dung lượng trống** | 30 GB | 50 GB | Ổ SSD để render nhanh |

> **Mẹo quay:** Nếu máy đã cài sẵn Node và Python, bạn có thể giải thích rằng script `npm run setup` sẽ **tự động kiểm tra và tự cài thêm FFmpeg và uv qua winget** nếu máy chưa có, người dùng không cần cài thủ công từng cái.

---

## PHẦN 2: CÁC BƯỚC THỰC HIỆN TRÊN VIDEO (TIMELINE CHI TIẾT)

### ⏱️ Phút 00:00 - 01:30 | Bước 1: Giải nén mã nguồn
1. Mở thư mục chứa file nén `TVHs-Labs-Video-Setup.zip`.
2. Chuột phải chọn **Extract All...** (hoặc dùng 7-Zip/WinRAR) giải nén vào thư mục làm việc (ví dụ `D:\TVHs-Labs-Video` hoặc `C:\TVHs-Labs-Video`).
3. Mở **PowerShell** trong thư mục vừa giải nén:
   ```powershell
   cd D:\TVHs-Labs-Video
   ```
4. Giới thiệu sơ lược cấu trúc thư mục sạch:
   - `src/`: Bộ source code chính (Remotion, Audio TTS, Talking-Head Chế độ C).
   - `scripts/`: Toàn bộ các script tự động hoá cài đặt và kiểm tra máy.
   - `samples/`: Kịch bản video mẫu để chạy thử.
   - `docs/`: Tài liệu hướng dẫn quy trình và vai trò 18 nhân sự AI Specialist.

---

### ⏱️ Phút 01:30 - 04:30 | Bước 2: Chạy cài đặt tự động 1 lệnh
1. Nói với người xem: *"Hệ thống đã chuẩn bị sẵn một lệnh duy nhất để tự động thiết lập toàn bộ môi trường Node, Python và cấu hình máy"*.
2. Chạy lệnh:
   ```powershell
   npm run setup
   ```
3. **Giải thích các giai đoạn diễn ra trên màn hình:**
   - `[1/4] Công cụ hệ thống:` Tự động nhận diện hoặc tải `ffmpeg` và `uv`.
   - `[2/4] Thư viện Node:` Chạy `npm ci` cài đặt sạch các package React, Remotion, Anime.js, Three.js...
   - `[3/4] Môi trường giọng đọc VieNeu:` Dùng `uv` tạo môi trường ảo Python `.venv-vieneu` độc lập và tải VieNeu-TTS v3 Turbo với PyTorch CUDA 12.8.
   - `[4/4] Cấu hình máy:` Tự động sinh file cấu hình `.env.local`.
   - Tự động chạy bài kiểm tra `doctor.ps1`.

---

### ⏱️ Phút 04:30 - 05:30 | Bước 3: Kiểm tra sức khỏe hệ thống với `doctor`
1. Chạy lệnh kiểm tra độc lập để người xem thấy toàn bộ tích xanh:
   ```powershell
   npm run doctor
   ```
2. Điểm qua các dòng trạng thái trên màn hình:
   - `[ĐẠT] Node v22.x`
   - `[ĐẠT] ffmpeg.exe, ffprobe.exe, uv.exe`
   - `[ĐẠT] Thư viện Node`
   - `[ĐẠT] VieNeu`
   - `[ĐẠT] Chế độ GPU: NVIDIA GeForce ...` (Nếu máy không có GPU NVIDIA sẽ hiện cảnh báo vàng `Chế độ CPU` - giải thích rằng máy vẫn làm được video từ tài liệu).
   - `[ĐẠT] Ổ đĩa còn ... GB`
   - `Máy đã sẵn sàng.`

---

### ⏱️ Phút 05:30 - 08:30 | Bước 4: Chạy thử video đầu tiên (Quick Start Demo)
Người hướng dẫn thực hiện quy trình tạo video mẫu "Pha trà" từ đầu đến đuôi để chứng minh hệ thống hoạt động hoàn hảo:

1. **Mở Cửa sổ PowerShell 1 - Bật máy chủ đọc giọng AI (VieNeu-TTS):**
   ```powershell
   npm run tts:server
   ```
   *Chờ 3 giây màn hình hiện thông báo:*
   `Loading VieNeu-TTS v3 Turbo...`
   `VieNeu-TTS server listening on http://127.0.0.1:8124`

2. **Mở Cửa sổ PowerShell 2 - Chạy chuỗi lệnh tạo video:**
   ```powershell
   # Tạo thư mục output và chép kịch bản mẫu
   mkdir "output\Pha-tra"
   copy "samples\Pha-tra\script.json" "output\Pha-tra\"

   # Bước 4.1: Kiểm tra tính hợp lệ của kịch bản
   npm run script:validate -- "Pha-tra"

   # Bước 4.2: Phê duyệt kịch bản (vai trò quản trị/QC)
   npm run approve -- "Pha-tra" script --by "Admin"

   # Bước 4.3: Gọi AI thu âm tự động theo kịch bản
   npm run voice -- "Pha-tra"

   # Bước 4.4: Dựng ảnh duyệt (stills) để kiểm tra khung hình
   npm run stills -- "Pha-tra"

   # Bước 4.5: Phê duyệt phần nhìn
   npm run approve -- "Pha-tra" visual --by "Admin"

   # Bước 4.6: Render thành phẩm MP4 hoàn chỉnh
   npm run render -- "Pha-tra"
   ```

3. Mở file thành phẩm: `output\Pha-tra\video.mp4`.
4. Phát video cho người xem thưởng thức: Video có chuyển động mượt mà, đồ họa Remotion sắc nét, giọng AI đọc chuẩn tiếng Việt tự nhiên kèm nhạc nền và hiệu ứng âm thanh!

---

### ⏱️ Phút 08:30 - 10:00 | Bước 5: (Tùy chọn) Cài đặt Chế độ C - Dựng từ Clip quay thật
Nếu video có nội dung giới thiệu tính năng dựng từ video người thật (Talking Head):
1. Giải thích tính năng: Chế độ C chuyên xử lý video quay người nói thật: tự động phiên âm có mốc thời gian từng từ (WhisperX), lọc tạp âm và khử ồn (DeepFilterNet), cắt ghép tự động theo lời thoại.
2. Yêu cầu: Bắt buộc máy có GPU NVIDIA (driver 550+).
3. Chạy lệnh cài đặt môi trường ASR:
   ```powershell
   npm run th:setup
   ```
4. Kiểm tra lại với doctor:
   ```powershell
   npm run doctor
   ```
   Màn hình sẽ có thêm dòng xanh: `[ĐẠT] Chế độ C: phiên âm chạy được trên GPU`.
5. Mở giao diện Web Editor trực quan:
   ```powershell
   npm run editor
   ```

---

## PHẦN 3: BẢNG TỔNG HỢP LỆNH COPY-PASTE CHO NGƯỜI QUAY (CHEAT SHEET)

```powershell
# 1. Cài đặt hệ thống từ đầu:
npm run setup

# 2. Kiểm tra trạng thái hệ thống:
npm run doctor

# 3. Chạy server giọng đọc AI:
npm run tts:server

# 4. Làm video mẫu Pha-tra (chạy ở cửa sổ khác):
mkdir "output\Pha-tra"; copy "samples\Pha-tra\script.json" "output\Pha-tra\"
npm run script:validate -- "Pha-tra"
npm run approve -- "Pha-tra" script --by "Admin"
npm run voice -- "Pha-tra"
npm run stills -- "Pha-tra"
npm run approve -- "Pha-tra" visual --by "Admin"
npm run render -- "Pha-tra"

# 5. Mở Remotion Studio xem trước trực quan trên trình duyệt:
npm start

# 6. Cài đặt Chế độ C (Talking Head - cần NVIDIA GPU):
npm run th:setup

# 7. Mở Web Editor cho Chế độ C:
npm run editor
```

---

## PHẦN 4: XỬ LÝ LỖI NHANH TRÊN VIDEO (NẾU CÓ)

1. **Lỗi `ExecutionPolicy` khi chạy PowerShell:**
   - Xử lý: Chạy PowerShell với quyền Admin và gõ:
     ```powershell
     Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
     ```
2. **Lỗi chưa nhận `node` hoặc `ffmpeg` ngay sau khi cài winget:**
   - Xử lý: Tắt toàn bộ cửa sổ PowerShell và mở lại để hệ thống nạp lại biến môi trường `PATH`.
3. **Máy không có GPU NVIDIA:**
   - Trong file `.env.local`, đảm bảo đặt:
     ```ini
     TVHS_REQUIRE_GPU=0
     ```
   - Khi đó pipeline sẽ tự động chuyển sang chế độ CPU render an toàn.

