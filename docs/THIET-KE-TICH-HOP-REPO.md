# Tích hợp kho repo vào ứng dụng

Cập nhật 18/11/2026. Catalog có 21 nguồn, gồm 20 repo tham khảo và `kajisho5/ffmpeg-skill`. Bản chạy thử chia sẻ là S6xEditer 1.1.0-preview.3. Xem [kết quả kiểm chứng](KIEM-CHUNG-UNG-DUNG.md) trước khi phát hành rộng.

## Ứng dụng làm gì

Chạy `Mo-ung-dung.bat` để mở ứng dụng local. Người dùng nhập tài liệu Markdown/TXT, phân tích dàn ý, theo dõi job và gọi các bước của pipeline hiện hữu. Luồng video tài liệu vẫn cần người hoặc agent viết kịch bản và cảnh riêng, cùng các cổng duyệt thời lượng, giọng/aspect, kịch bản và hình. Chưa có bộ tự chọn phong cách hay tự viết toàn bộ video từ tài liệu.

Người dùng có thể nhập video, đọc thông số, cắt, đổi khung hình và chuẩn hoá âm lượng. Mỗi tác vụ qua probe, kế hoạch dry-run, chạy thật và kiểm đầu ra. File gốc được giữ nguyên. Editor hiện hữu mở từ ứng dụng, hỗ trợ kiểm tra media và nghe thử tài nguyên.

## Vai trò của từng nguồn

| Nguồn | Điểm chạy trong ứng dụng | Phạm vi bằng chứng |
| --- | --- | --- |
| Remotion | `src/remotion/`, `scripts/verify-media.ts` | Xuất MP4 kỹ thuật thật bằng ANGLE/NVENC |
| GSAP | `src/fixtures/index.tsx`, timeline theo frame | Fixture tất định đạt |
| Anime.js | `src/kit/use-anime-timeline.ts` | Fixture tất định đạt |
| SVGO | `scripts/optimize-svg.mjs` | Công cụ tối ưu SVG hiện hữu; không khẳng định mọi cấu hình đã thử |
| Satori | `src/engine/satori-cards.ts` | Bộ tạo SVG hiện hữu, font Việt đi kèm |
| dotLottie | `src/kit/DotLottieFrame.tsx` | Fixture WASM/setFrame đạt |
| Three.js | `src/fixtures/index.tsx` | Fixture 3D đạt |
| Drei | `src/kit/frame-3d.tsx`, `RoundedProp` | RoundedBox đạt; component khác cần thử |
| Rapier | `scripts/bake-rapier.ts`, `src/kit/baked-physics.ts` | Quỹ đạo tính trước; fixture đạt |
| React Three Rapier | `src/kit/frame-3d.tsx`, `BakedRigidBodies` | Physics tạm dừng, pose theo frame; fixture đạt |
| Postprocessing | Fixture Bloom | Bloom đạt; hiệu ứng thời gian khác cần thử |
| React Postprocessing | Cầu nối Bloom vào R3F | Cùng fixture Bloom |
| FFmpeg | `src/integrations/runtime-environment.ts` | Binary đầy đủ 9.0.2, có SHA-256 và bộ cài local |
| ffmpeg-skill | `src/integrations/ffmpeg-skill.ts`, `scripts/asr/ffmpeg_skill_runner.py` | Đọc đủ hợp đồng 42 công cụ; đã chạy probe/cut/fit/loudness/QC/contact sheet, chưa thử đủ 42 công cụ |
| BiRefNet | `scripts/asr/matte.py`, `scripts/setup-models.py` | Có cache model độc lập; suy luận CUDA và chất lượng matte cần thử |
| RobustVideoMatting | `scripts/asr/matte_rvm.py` | Bộ nạp nội bộ; không đóng gói công khai, chưa kiểm chứng lần này |
| Motion | `scripts/app/client/media-tools.js` | Chuyển động UI, đã build; tương tác GUI cần thử |
| Howler | Cùng module, `scripts/editor/public/audio-engine.js` | Nghe thử UI, đã build; tương tác GUI cần thử |
| Mediabunny | Cùng module | Test đọc File/metadata đạt; thumbnail GUI cần thử |
| Motion Canvas | `scripts/bake-motion-canvas.ts`, `src/kit/BakedImageSequence.tsx` | Dựng đủ 90 PNG; kiểm hash lặp/ngược và fixture Remotion đạt |
| GSAP Skills | `docs/tool-guides/gsap/` | Hướng dẫn và MIT license, không phải runtime |

## Kết nối và cách dùng

`npm.cmd run research:connect -- "<thư mục repo>"` ghi cấu hình local; `npm.cmd run research:inventory` xuất đường dẫn nguồn, revision/hash nhận diện, phiên bản dependency và adapter. Resolver TypeScript/Python ưu tiên `TVHS_RESEARCH_ROOT`, cấu hình local rồi `.research/repos`. Kho nguồn chỉ đọc, không cài dependency hoặc sửa clone.

Runtime JS được khoá trong `package-lock.json`; binary FFmpeg và model có bộ cài/cache riêng. Bản chia sẻ không phụ thuộc đường dẫn kho nghiên cứu của máy phát triển. Nguồn RVM và model không đi kèm ZIP.

`npm.cmd run media -- contract` xem hợp đồng công cụ. `npm.cmd run motion:bake -- fixtures/motion-canvas.json public/fixtures/motion-canvas` tạo chuỗi frame theo spec. Công cụ chuẩn bị phải ghi manifest/seed/fps/kích thước, rồi cảnh chỉ đọc tài nguyên bất biến theo frame.

Cầu nối ffmpeg-skill dùng NVENC cho nhánh H.264 SDR đã kiểm chứng. Các nhánh HEVC/HDR/tham số đặc biệt giữ xử lý của upstream và cần thử riêng. Audio filter chạy CPU. Không đồng nhất CQ của NVENC với CRF của x264.

## Chọn công cụ theo nội dung

Dùng SVG/GSAP/Anime cho thao tác và biến đổi 2D; Three/R3F khi cần quan hệ không gian; Rapier khi cần vật lý; Motion Canvas khi cần hoạt ảnh dựng trước. Motion/Howler/Mediabunny phục vụ xem thử. Không dùng đồng hồ UI để dựng frame, không ép đủ repo vào một video. Phong cách hình do kịch bản và thiết kế từng video quyết định.

Mỗi công cụ mới đưa vào render phải qua kiểm hash cùng frame hai lần và thứ tự đảo. Kết quả kỹ thuật không thay thế duyệt hình của người dùng. Phần không chạy phải ghi “Cần thử”; cổng bỏ qua phải ghi “Bỏ qua”.