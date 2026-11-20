# S6xEditer

Ứng dụng chạy cục bộ trên Windows để quản lý dự án video, xử lý media và dựng video từ tài liệu cùng coding agent.

## Mở ứng dụng

1. Giải nén vào thư mục riêng có quyền ghi.
2. Nhấp đúp **Mo-ung-dung.bat**.
3. Lần đầu, bộ cài chuẩn bị Node.js nếu máy chưa có, FFmpeg đầy đủ, uv, Python cho media và các thư viện JavaScript. Sau đó trình duyệt mở ứng dụng tại localhost.

Cần Windows 10/11 và Node.js từ 22.18. Cần mạng để tải dependency/trình duyệt/model lần đầu; thao tác media và dựng hình chạy trên máy. Bộ tải FFmpeg kiểm SHA-256 trước khi giải nén, ghi vào cache riêng, không sửa PATH toàn máy. Bộ nguồn ZIP không chứa model, FFmpeg binary hay node_modules.

Nếu muốn mở bằng lệnh:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/setup-windows.ps1 -BaseOnly
npm.cmd run app
```

Giữ cửa sổ lệnh chạy trong lúc làm việc. Dừng bằng Ctrl+C. Giao diện chỉ lắng nghe trên máy này, không có đăng nhập hoặc chia sẻ qua Internet.

## Những việc làm được

- **Dự án:** xem các job đã chuẩn bị trong output, mở Editor, xem bảng kịch bản/ảnh duyệt, duyệt bằng tên người duyệt và gọi các bước tạo giọng, ảnh duyệt, xuất.
- **Tài liệu:** nhập Markdown/TXT, sao chép vào workspace riêng và lập dàn ý. AI/coding agent tiếp tục viết kịch bản cùng cảnh riêng theo tài liệu. Ứng dụng không tự gọi một dịch vụ AI để viết kịch bản.
- **Media:** nhập bản sao video/âm thanh tối đa 512 MB từ giao diện; đọc thông tin, cắt đoạn, đổi khổ hình theo lựa chọn, chuẩn hoá âm lượng −14 LUFS; đầu ra luôn là file mới.
- **Kiểm tra file:** đọc metadata và thumbnail ngay trong trình duyệt bằng Mediabunny; nghe thử bằng Howler; chuyển động giao diện bằng Motion.
- **Công cụ dựng:** Remotion, GSAP, Anime.js, SVG, Lottie, Three.js, đạo cụ Drei, hậu kỳ và vật lý đã tính trước. Các bộ dựng phải vượt bài thử tất định trước khi dùng vào video.
- **Motion Canvas:** dựng tài nguyên thành chuỗi PNG cùng manifest từ spec, kiểm lại cùng frame và thứ tự đảo.
- **ffmpeg-skill 3.10.1:** 42 công cụ Python được cài cố định cùng ứng dụng. Giao diện dùng một số thao tác phổ biến; toàn bộ công cụ có thể gọi qua CLI.

```powershell
npm.cmd run media -- contract --static
npm.cmd run media -- probe "clip.mp4"
npm.cmd run media -- cut "clip.mp4" --start 10 --end 20 -o "output/doan-cat.mp4" --dry-run
npm.cmd run media -- cut "clip.mp4" --start 10 --end 20 -o "output/doan-cat.mp4"
npm.cmd run motion:bake -- fixtures/motion-canvas.json output/canh-thu
```

Công cụ lập kế hoạch trước, chạy sau và đo lại đầu ra. Không sửa đè nguồn. Bộ nối của ứng dụng ưu tiên NVENC cho H.264 SDR trên NVIDIA khi bài thử mã hoá thật đạt; không có NVENC thì dùng CPU. Upstream --hw của ffmpeg-skill dành cho VideoToolbox. HEVC/HDR, smart-cut và preset đặc biệt giữ cách mã hoá của upstream, cần kiểm thêm theo ca dùng. Các bộ lọc âm thanh vẫn chạy CPU; CQ của NVENC không đồng nhất với CRF của x264.

## Giọng đọc và clip quay có phiên âm

Bản cài cơ bản chưa tải các môi trường/model nặng.

```powershell
npm.cmd run setup
npm.cmd run th:setup
npm.cmd run models:setup
```

- `setup` cài thêm VieNeu-TTS. Lần đầu dùng model, cần cho phép tải theo hướng dẫn trong docs/QUY-TRINH.md. Khi tạo giọng từ ứng dụng, máy chủ VieNeu được khởi động nếu chưa có. Máy chủ do ứng dụng khởi động được dừng trước render để trả VRAM.
- `th:setup` cài phiên âm/xử lý tiếng cho Chế độ C, cần NVIDIA phù hợp.
- `models:setup` tải BiRefNet vào models/ với revision đã ghim; không cần kho nghiên cứu ngoài. BiRefNet được dùng cho bản chia sẻ; bộ nạp RVM nội bộ không được kèm theo.
- Các môi trường và model optional cần được kiểm trên máy người nhận; việc có adapter không thay thế benchmark hoặc đánh giá chất lượng trên clip thật.

## Quy trình tài liệu và các điểm duyệt

Đọc nguồn → chọn thời lượng → xác nhận giọng và khổ → AI viết lời cùng kịch bản hình → người dùng duyệt → tạo giọng và dựng cảnh → kiểm tra → người dùng duyệt hình → xuất.

Không thêm ví dụ, lợi ích hoặc số liệu ngoài nguồn. Mỗi câu có một hành động hình ảnh. Sửa script.json sau duyệt làm phiếu duyệt mất hiệu lực. Các nút trong ứng dụng vẫn đi qua cổng của pipeline.

Đọc [quy trình](docs/QUY-TRINH.md), [Chế độ C](docs/CHE-DO-C.md) và [hướng dẫn cho agent](AGENTS.md).

## Kiểm tra và giấy phép

```powershell
npm.cmd run typecheck
npm.cmd test
npm.cmd run gate:determinism -- --fixtures
```

Các lệnh chạy trên chính máy cài đặt. Báo cáo nguồn hay danh sách 42 công cụ không có nghĩa mọi tính năng đã được thử trên mọi loại clip.

LICENSE áp dụng cho mã của dự án. Thành phần bên thứ ba giữ giấy phép riêng trong THIRD-PARTY-LICENSES và RUNTIME-DEPENDENCIES.json. Điều kiện dùng Remotion xem tại https://www.remotion.dev/license; không hiểu giấy phép MIT của dự án là giấy phép chung cho toàn bộ công cụ hoặc model.

Bản nguồn không kèm tài liệu nội bộ, thương hiệu gốc, footage, nhạc nền hoặc kho .research. `release-manifest.json` chứa kích thước và SHA-256 của từng file trong snapshot để kiểm tính toàn vẹn.