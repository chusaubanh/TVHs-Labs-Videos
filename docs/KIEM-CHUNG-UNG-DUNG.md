# Kiểm chứng ứng dụng local và bản chia sẻ

Ngày 18/11/2026. Bản chia sẻ: **S6xEditer 1.1.0-preview.3**, Windows. Đây là bản preview để thử nghiệm; chưa công bố lên Internet, chưa commit/push.

## Mở và dùng

Trong dự án hiện tại: chạy `Mo-ung-dung.bat`, hoặc `npm.cmd run app`. Bản ZIP: giải nén vào thư mục riêng có quyền ghi rồi chạy `Mo-ung-dung.bat`. Cần mạng cho lần cài dependency/trình duyệt đầu tiên. Ứng dụng lắng nghe localhost, không cung cấp dịch vụ công khai.

Gói: [ZIP](../output/releases/S6xEditer-1.1.0-preview.3.zip) · [SHA-256](../output/releases/S6xEditer-1.1.0-preview.3.zip.sha256). Hash ZIP: `f22272b80a884880f206cd935346dee7973eb68d08cf72586f70ce86099dcc14`.

## Những gì đã chạy đạt

| Kiểm tra | Kết quả và bằng chứng |
| --- | --- |
| TypeScript | `npm.cmd run typecheck` đạt sau sửa helper xuất kỹ thuật |
| Unit/integration | 26 file, 206 test đạt; có kiểm hợp đồng 42 công cụ, metadata Mediabunny và chặn đường dẫn đóng gói sai |
| 11 fixture dựng hình + negative control | Hash lặp và đảo thứ tự đạt; gồm Motion Canvas, AV, Drei, React Rapier, GSAP, Anime, Spring, dotLottie, Bloom, Rapier, OffthreadVideo. [JSON](../output/_fixtures/determinism.json) |
| Motion Canvas | Dựng đủ 90 PNG; kiểm lặp/ngược các frame đại diện; chuỗi ảnh đi qua fixture Remotion. `public/fixtures/motion-canvas/manifest.json` |
| FFmpeg-skill | Đọc đủ hợp đồng 42 công cụ; đã chạy probe, cut, fit, loudness, QC/contact sheet. Không khẳng định đã chạy đủ mọi thao tác/preset |
| NVENC | Cầu nối H.264 SDR dry-run và encode thật dùng h264_nvenc, upstream verify đạt; [video thử](../output/_verification/nvenc-fit.mp4) |
| Xuất MP4 | 1080×1080, 30 fps, 3.008 giây, −14 LUFS, ANGLE/NVENC; [JSON](../output/_verification/media.json), [video](../output/_verification/technical-smoke-normalized.mp4), [contact sheet](../output/_verification/technical-smoke-sheet.png) |
| API ứng dụng hiện tại | Tiến trình mới ngày 18/11: nhập bản sao, probe, cut, fit ra MP4; hash nguồn giữ nguyên; yêu cầu thiếu header, Origin/Host ngoài localhost và thoát đường dẫn bị chặn. [JSON](../output/_verification/app.json) |
| Nguồn | 21 mục có đường dẫn bằng chứng và điểm dùng; FFmpeg/ffprobe có binary. [Kiểm kê](../output/research/repos.json) |
| Đóng gói | 698 tệp manifest khớp byte/SHA-256 trước và sau giải nén; ZIP không có node_modules, cache, model, kho nghiên cứu, public/jobs hay cấu hình local đã chặn. Bộ lọc riêng tư chỉ kiểm các dấu hiệu đã định nghĩa, không phải chứng nhận mọi dữ liệu |
| Dependency production | npm audit production: 0 lỗ hổng tại thời điểm kiểm. Development còn 5 high trong chuỗi công cụ test/build; chưa có sửa an toàn theo audit, không nâng ép phá tương thích |

Đã xem ảnh kỹ thuật của chuỗi AV, Drei, React Rapier và Motion Canvas: có hình, không trắng khung; các ảnh này chỉ kiểm adapter, không thay thế duyệt mỹ thuật của video thật.

## Giới hạn và cổng chưa chạy

- **GUI tương tác: Cần thử.** Công cụ điều khiển báo browser host không kết nối/cửa sổ Edge bị thu nhỏ, nên chưa xác nhận nhấp nút, nghe thử hay thumbnail bằng mắt. Backend/API, build và kiểm metadata không thay cho kiểm GUI.
- **Giọng đọc/ASR/matte: Cần thử toàn luồng.** Đã có bộ cài và cache BiRefNet; chưa có kết quả suy luận CUDA hoặc chất lượng tách nền trên clip người thật trong đợt này. Phép thử import PyTorch riêng không hoàn tất và đã dừng. RVM dùng nội bộ, không có trong gói chia sẻ.
- **Kịch bản và video nội dung: Chưa thực hiện.** Chỉ dựng fixture kỹ thuật; chưa chọn tài liệu, thời lượng, giọng/aspect, chưa có duyệt kịch bản hoặc duyệt hình của người dùng. Các cổng này không được đánh dấu đạt hay tự động duyệt.
- **Không gian áp dụng:** Bài kiểm kỹ thuật không đảm bảo mọi component Drei/hậu kỳ, mọi codec/HDR hay toàn bộ 42 công cụ đều chạy đúng. Cần thử từng ca mới.
- **Chia sẻ:** Gói đã có thông báo giấy phép/font và tài nguyên mẫu trung tính. Chưa đăng tải hay triển khai public. Model optional tải riêng, giữ điều kiện riêng của thành phần thứ ba.
- **Đồ thị:** AST đã refresh bằng Graphify và dựng lại bản xem nhẹ; `/graphify --update` phần ngữ nghĩa tài liệu **Bỏ qua**, không có lệnh skill này trong phiên.

## Cài độc lập từ ZIP

Đã cài hoàn tất bản giải nén **preview.2** tại `.cache/release-smoke/preview2/S6xEditer-1.1.0-preview.2`: npm ci cài 470 gói, tạo `.venv-media` Python 3.12.13, kiểm hash/cài FFmpeg 9.0.2, build module trình duyệt và tải Chromium riêng. Đây là cài tách thư mục trên cùng máy Windows, không phải máy ảo Windows mới. Tận dụng archive tải FFmpeg đã xác thực và npm download cache; không sao chép node_modules/môi trường Python của dự án.

Trên bản giải nén: TypeScript đạt; 26 file test, **205 đạt, 1 bỏ qua**. Test bỏ qua là suy mood từ thư viện nhạc thật (`src/talking-head/music.test.ts`), vì thư viện nhạc riêng không đóng gói. [API media](../output/_verification/release-preview2/app.json) đạt nhập/probe/cut/fit và bảo toàn nguồn. [API tài liệu](../output/_verification/release-preview2/document-api.json) đạt nhập Markdown và lấy outline. [Xuất kỹ thuật](../output/_verification/release-preview2/media.json) đạt MP4 1080×1080, 30 fps, −14 LUFS, ANGLE/NVENC; đã tạo contact sheet.

Snapshot cuối **preview.3** chỉ khác bản đã cài ở 3 file: số phiên bản trong package.json/package-lock.json và mô tả trạng thái trong research-catalog.ts. Đã đối chiếu manifest xác nhận không đổi file runtime nào khác. Không khẳng định đã cài lại toàn bộ preview.3 trên máy mới. Manifest và ZIP cuối được kiểm riêng.