# Bản đồ đọc source

Repository được chia theo việc người dùng cần làm, không theo loại kỹ thuật.
Không cần đọc toàn bộ repo để xử lý một công việc.

| Bạn cần làm gì? | Chỉ đọc phần này trước | Không cần nạp |
| --- | --- | --- |
| Tài liệu thành video | `src/document-video/`, rồi các module đúng nhu cầu trong `src/studio/` | `src/talking-head/`, editor | 
| Clip người thật nói | `src/talking-head/`, rồi module Studio liên quan media/render | `src/document-video/` |
| Chỉnh tay hoặc xuất video | `src/studio/README.md`, `project-contract.ts`, `export-project.ts` | TTS, Whisper, scene-kit source |
| Sửa giọng, SFX, brand, FFmpeg | đúng thư mục con trong `src/studio/{tts,audio,brand,media,render}/` | hai luồng sản xuất nếu không đổi contract |

## Ba phần chính

1. **Document Video** tạo asset từ tài liệu.
2. **Talking Head** tạo asset từ clip thật.
3. **Studio** nhận asset chỉ sau QA, lưu chỉnh sửa không phá huỷ, rồi chỉ compose/export.

## Contract giữa ba phần

Mỗi job vào Studio nằm tại `output/<job>/studio/`:

```text
studio/
  project.json       # asset manifest + trạng thái QA đã qua
  studio-edits.json  # chỉnh màu, crop, zoom/pan, timeline/layer, âm lượng
  assets/            # bản copy bất biến của từng asset đã QA
  qa/                # ba báo cáo QA đã dùng để mở Studio
  exports/           # final.mp4 và export-manifest.json
```

`project.json` của Studio nằm trong thư mục `studio/` để không đè
`output/<job>/project.json` lịch sử của Chế độ C. Khi export, Studio không gọi
TTS, Whisper, Scene Kit hay B-roll; nó chỉ đọc manifest và ghép asset có sẵn.

## Lệnh Studio

Trên Windows, double-click `open-studio.bat` ở thư mục gốc. Launcher sẽ liệt kê các project đã có `studio/project.json`, cho chọn theo số, khởi động server và tự mở trình duyệt.

```powershell
# Chỉ sau khi content, visual và sync QA đã đạt
npm run studio:package -- document-video output/<job> --confirmed-by "QA reviewer" --content script-review.md --visual qa/visual-report.md --sync sync-check.md
npm run studio:package -- talking-head output/<job> --confirmed-by "QA reviewer" --content qa/content-report.md --visual qa/visual-report.md --sync qa/sync-report.md

# Người dùng chỉnh studio-edits.json qua editor; export chỉ ghép asset
npm run studio:editor -- output/<job>
npm run studio:export -- output/<job>
```
