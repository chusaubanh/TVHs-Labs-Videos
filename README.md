# TVHs-Labs-Video

Xưởng video đào tạo của Thành Vinh Holdings: kể bằng hình, dựng bằng Remotion, xuất thẳng ra MP4. Khổ hình chọn cho từng video: 16:9, 9:16, 4:5, 1:1. Dự án độc lập với `TVHs-Lab-Video-AI`.

## Đọc gì trước

| Cần | Tài liệu |
| :--- | :--- |
| Các bước và lệnh làm một video | [docs/QUY-TRINH.md](docs/QUY-TRINH.md) |
| 18 nhân sự theo tổ Specialist, ai giữ file nào | [docs/18-NHAN-SU.md](docs/18-NHAN-SU.md) |
| Quy chuẩn viết kịch bản | [docs/QUY-CHUAN-KICH-BAN.md](docs/QUY-CHUAN-KICH-BAN.md) |
| Quy chuẩn hình | [docs/QUY-CHUAN-HINH.md](docs/QUY-CHUAN-HINH.md) |
| Nghiên cứu, bằng chứng, quyết định | [docs/NANG-CAP-NHAN-SU.md](docs/NANG-CAP-NHAN-SU.md) |
| Bản đồ code | `graphify-out/GRAPH_REPORT.md`, `graphify-out/graph.html` |

## Cấu trúc thư mục

```text
assets/         Thương hiệu, SFX, SVG gốc
public/         Tệp phục vụ render: font, wasm, giọng đã thu
input/          Tài liệu nguồn
output/         Kịch bản, ảnh duyệt, video của từng tài liệu
src/training/   Hợp đồng kịch bản, kiểm kịch bản, phiếu duyệt
src/audio/      Thu giọng và đo mốc giờ
src/remotion/   Bàn dựng chính
src/kit/        Bộ dựng: nhịp câu, nhãn, Anime.js, dotLottie, vật lý
src/videos/     Cảnh riêng của từng video
src/gates/      Các phép đo QC
src/fixtures/   Cảnh thử máy móc, không phải nội dung
scripts/        Render, QC, bài thử tất định, ảnh duyệt
.claude/agents/ Các tổ Specialist
.claude/skills/ Skill chính thức của Remotion và GSAP
.research/      Mã nguồn công cụ để đối chiếu, chỉ đọc
```

## Kiểm tra hệ thống

```bash
npm run typecheck
npm test
npm run gate:determinism -- --fixtures
```

Cách cài đặt máy mới nằm cuối [docs/QUY-TRINH.md](docs/QUY-TRINH.md).
