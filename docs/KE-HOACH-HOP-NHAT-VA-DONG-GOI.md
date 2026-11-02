# Kế hoạch hợp nhất pipeline cũ và đóng gói chia sẻ

Lập ngày 02/11/2026. Số liệu đo trực tiếp trên máy hôm nay. Thứ tự các giai đoạn là bắt buộc: chưa qua cổng của giai đoạn trước thì không làm giai đoạn sau.

## Đã chốt với anh Phương

| Việc | Quyết định |
| :--- | :--- |
| Xoá | Toàn bộ `TVHs-Lab-Video-AI` và draft CapCut `CDKH Phan 3`, sau khi kiểm xong |
| Chế độ C và Editor | Chuyển sang pipeline mới |
| Người nhận | Hai bản: nội bộ và công khai |
| Máy không có NVIDIA | Được chạy CPU, có cảnh báo; máy anh Phương vẫn bắt buộc GPU |

## Hiện trạng

| Hạng mục ở repo cũ | Quy mô | Tình trạng |
| :--- | :--- | :--- |
| 2 commit trên nhánh `feat/che-do-c-talking-head` | Không có trên GitHub | Đã sao vào `lich-su-git.bundle` trong Archive, đã verify |
| 927 thay đổi chưa commit | Gồm 737 mục trong `templates/` (mỗi mục có thể là cả thư mục) | Chỉ nằm trong thư mục làm việc, git không cứu được |
| Chế độ C: `src/talking-head` | 49 file, 6.343 dòng | Chưa có ở bản mới |
| Editor: `scripts/editor` | 80 file, 6.219 dòng | Chưa có ở bản mới |
| Lõi dùng chung: `src/studio` | 50 file, 4.811 dòng | Chế độ C chỉ cần `render/video-tools`, `utils/media-binary`, `utils/logger`, `media/media-runner` |
| Quay màn hình và xuất Premiere: `scripts/screencast` | 8 file, 2.281 dòng | Chưa có; trang web có nêu Premiere |
| Phiên âm: `scripts/asr`, `.venv-asr` | 6 file; môi trường 7,8 GB | Dựng lại từ `requirements-asr.lock.txt` |
| Model: `models/` | 13,7 GB | Dùng lại được, không cần tải lại trên máy này |
| Cảnh HTML: `scripts/scene-kit`, `templates/` | 57.297 dòng; 1,27 GB | Editor và overlay đang gọi; phần lớn `templates/` là cảnh riêng của bài cũ |
| Nhạc và SFX: `music-th`, `sfx-th`, `th-presets` | 605 MB, 109 MB, 92 KB | Chưa có ở bản mới |
| Tài liệu nguồn: `input/` | 557 MB, gồm clip quay gốc | Bản mới thiếu Wiki nhánh 1, 3, 4, Bài 3 đến 8, Human 3.0, mục lục, file xlsx |
| Video đã làm: `output/` | 24 GB; 252 MP4 ngoài thư mục làm việc, 5,68 GB | Một phần trong số đó là clip dựng, phải lọc lại |

Hai điểm phụ thuộc phải xử lý trước khi xoá:

- `Truyen_ma_Video_Pipeline/download-footage.ps1` và `tts/run-tts.bat` trỏ thẳng vào `.venv-vieneu` của repo cũ.
- Tài liệu bản mới dẫn tới `TVHs-Lab-Video-AI/SKILL.md` theo số dòng.

Chế độ C render lớp phủ bằng HyperFrames, không bằng Remotion. Vì vậy em chuyển nguyên khối thành một mô-đun riêng trong repo mới, không viết lại sang Remotion. Viết lại là việc khác và sẽ làm hỏng tính tương thích với các job đã có.

## Giai đoạn 1: Giữ an toàn

1. Xong: bundle lịch sử git vào `D:\Total_AI\01_Video_AI\Archive\TVHs-Lab-Video-AI-2026-11-02\`.
2. Commit toàn bộ việc đang dở của `TVHs-Labs-Video` làm mốc. **Cần anh Phương cho phép.**
3. Sao **toàn bộ** repo cũ vào Archive, trừ `.venv*`, `node_modules`, `.pnpm-store`: khoảng 40 GB, ổ D còn 1,86 TB. Gồm cả `output/` nguyên vẹn, vì job Chế độ C giữ trạng thái trong `work/`, `project.json`, `run.json`, và job `02-khung-hinh-vang` vẫn đang chờ xuất.
4. Lập danh sách SHA-256 của bản sao và đối chiếu với bản gốc.
5. Thêm vào `.gitignore` của repo mới: `models/`, `.venv-asr/`, clip trong `input/`, thư viện nhạc và SFX lớn, trước khi chép bất cứ thứ gì sang. GitHub chặn file trên 100 MB và file đã commit thì nằm mãi trong lịch sử.

Cổng: bundle verify đạt, mốc commit có, bản sao khớp SHA-256, `git status` không hiện file lớn.

## Giai đoạn 2: Chuyển dữ liệu

Chỉ sao chép, không di chuyển. Video và hồ sơ job đã nằm trong Archive từ giai đoạn 1; lọc gọn sau, không lọc trước khi sao.

| Nguồn | Đích |
| :--- | :--- |
| `input/` phần còn thiếu | `input/` bản mới, chỉ thêm thư mục mới, không sửa file đã có; clip quay nằm ngoài git |
| `models/` | `models/` bản mới, nằm ngoài git |
| `docs/` và `SKILL.md` | `docs/tham-khao-repo-cu/`, giữ nguyên văn để các trích dẫn số dòng vẫn đúng |
| `.agents/skills/viral-*`, `ai-copywriter`, `.claude/skills/tu-van-5-why` | `.claude/skills/` bản mới |

Cổng: đối chiếu SHA-256 từng file đã sao, không lệch file nào.

## Giai đoạn 3: Chuyển chức năng

1. **Lõi:** dò toàn bộ chuỗi import của `src/talking-head`, `scripts/editor`, `scripts/screencast` (số 4 file ở trên mới là import trực tiếp của Chế độ C). Chép phần cần vào `src/talking-head/core/`, khai báo đủ dependency thiếu: `axios`, `p-limit`, `ffmpeg-static`, `ffprobe-static` nếu còn dùng.
2. **Chế độ C:** `src/talking-head`, `scripts/asr`, `scripts/th-presets`, `setup-asr.ps1`, `requirements-asr.lock.txt`, `music-th`, `sfx-th`, `th-presets`, và toàn bộ lệnh `th:*`.
3. **Editor:** `scripts/editor`, lệnh `editor`, `open-studio.bat`.
4. **Cảnh HTML:** phần lõi `scripts/scene-kit` và thư viện `templates/`. `scripts/editor/api-library.ts:48` liệt kê mọi thư mục `frame-*`, nên Editor đang coi tất cả là thư viện. Em đếm các template thực sự dùng trong `project.json` của các job cũ rồi anh Phương chọn mức giữ (mục "Cần anh quyết").
5. **Quay màn hình và Premiere:** `scripts/screencast`.
6. **Môi trường:** dựng lại `.venv-asr` trong repo mới; `.env.local` chỉ có 3 cấu hình TTS, không chứa khoá.
7. **Quy tắc:** theo quyết định về phạm vi quy tắc ở mục "Cần anh quyết", cập nhật `CLAUDE.md`, `README.md`, `docs/QUY-TRINH.md`, `docs/18-NHAN-SU.md`. Đọc mã nguồn và giấy phép HyperFrames, và chạy bài thử tất định với nó trước khi nhận vào (quy tắc 3 và 8). `vitest` và TypeScript hai repo lệch phiên bản, nên phải chạy lại toàn bộ test chứ không suy từ repo cũ.

Cổng, tất cả chạy trong repo mới:

- `npm run typecheck`, `npm test`, gồm cả test đã chuyển sang.
- Chế độ C chạy trọn trên `th-test-01`: phiên âm, cắt, âm thanh, project, mở Editor, xuất MP4 bằng NVENC.
- Quay màn hình xuất được gói Premiere và mở được trong Premiere.
- Luồng Tài liệu: `gate:determinism --fixtures`, render lại một video, QC đạt.

## Giai đoạn 4: Xử lý chỗ còn phụ thuộc

1. Xử lý Truyện ma theo quyết định ở mục "Cần anh quyết". Chạy thử `run-tts.bat` sau khi đổi.
2. Sửa trích dẫn trong tài liệu bản mới sang `docs/tham-khao-repo-cu/`.
3. Cập nhật trang web cho đúng thực tế, kể cả các ô CapCut, chưa triển khai.
4. Cập nhật memory, nhất là `talking-head-pipeline-plan`.

Cổng: quét toàn `D:\Total_AI` không còn đường dẫn nào tới repo cũ ngoài các ghi chú lịch sử.

## Giai đoạn 5: Xoá

1. Đổi tên `TVHs-Lab-Video-AI` thành `_CHO-XOA-TVHs-Lab-Video-AI`, để mọi tham chiếu còn sót lập tức lộ lỗi.
2. Chạy lại toàn bộ cổng giai đoạn 3 và `run-tts.bat`.
3. Đạt thì xoá thư mục. Công cụ an toàn từng chặn một lệnh xoá trong phiên này; nếu nó chặn tiếp, em giao lại lệnh cho anh Phương, không tìm cách lách.
4. Xoá draft `CDKH Phan 3` khi CapCut đã đóng, rồi mở CapCut kiểm tra `CDKH Phan 3 v2` còn nguyên. Trước bước này không chạy lại `capcut:export` cho `cdkh-phan-3`, vì lệnh đó xoá `capcut/media` mà draft v2 đang dùng. Sau đó sửa để mỗi draft có thư mục media riêng.

Giữ lại sau khi xoá: Archive (bundle, kiểm kê, video thành phẩm, hồ sơ job) và hai remote GitHub cũ. Không xoá gì trên GitHub.

## Giai đoạn 6: Chuẩn bị đóng gói

**Chạy CPU.** Một hàm dò phần cứng duy nhất quyết định NVENC hay x264, CUDA hay CPU. Không có GPU thì in cảnh báo rõ và chạy chậm. `TVHS_REQUIRE_GPU=1` trong `.env.local` của máy anh Phương giữ nguyên hành vi báo lỗi thay vì lùi về CPU, nên quy tắc "mọi render chạy GPU" không bị phá. Cần sửa ở `scripts/pipeline-runner.ts`, `scripts/capcut-export.ts`, `render-tools.ts`, `vieneu-server.py`, và cho phép kiểm x264 của QC theo chế độ máy (hiện nó yêu cầu 0, sẽ báo lỗi trên CPU).

**Chế độ C trên CPU:** chỉ phần xuất MP4 có đường CPU. Phiên âm WhisperX large-v3 trên CPU rất chậm và `setup-asr.ps1` hiện báo lỗi khi không có NVIDIA, nên em giữ phiên âm ở mức cần NVIDIA và ghi rõ trong tài liệu.

**Cài đặt một lệnh.** Chuyển `setup-windows.ps1`, `doctor.ps1` từ repo cũ. `doctor` kiểm Node, uv, FFmpeg, GPU, dung lượng trống, đường dẫn có dấu tiếng Việt, và báo rõ máy đang ở chế độ GPU hay CPU.

**Pháp lý:**

- **Remotion:** công ty vì lợi nhuận trên 3 nhân viên phải mua Company License. Điều khoản này xét theo quy mô của Thành Vinh Holdings và **của từng đơn vị tải bản công khai**. README phải ghi rõ, không kèm mã Remotion trong gói. **Anh Phương cần xác nhận tình trạng giấy phép của công ty.**
- **HyperFrames và các công cụ khác:** đọc giấy phép từ mã nguồn trước khi đưa vào bản công khai. Chưa đọc.
- **Nhạc:** chỉ nội bộ. Bản công khai không kèm nhạc, chỉ có thư mục trống và hướng dẫn.
- **Mã của mình:** thêm `LICENSE` và `THIRD-PARTY-NOTICES.md`. Repo cũ dùng MIT; bản công khai dự kiến giữ MIT cho phần mã của TVHs.

## Giai đoạn 7: Tạo hai bản

| Thành phần | Nội bộ | Công khai |
| :--- | :--- | :--- |
| Mã pipeline, tài liệu quy trình, skill | Có | Có |
| Logo, watermark, guideline TVHs | Có | Không, thay bằng thương hiệu mẫu |
| Tài liệu Wiki, `input/` | Không kèm, trừ một tài liệu mẫu | Không, chỉ tài liệu mẫu tự viết |
| Cảnh riêng `src/videos/{mo-dau,bai-1,bai-2,fb-ads,cdkh}` | Có, làm mẫu | Không, thay bằng một video mẫu trung tính |
| Nhạc | Có | Không |
| SFX | Có | Chỉ loại đã rõ giấy phép |
| Lịch sử git | Giữ | **Bắt đầu mới**, vì lịch sử có tài liệu nội bộ |
| Luôn loại khỏi cả hai | `node_modules`, `.venv*`, `.research`, `output`, `public/jobs`, `models`, `graphify-out/cache`, `.env*`, `settings.local.json` | |

**Tách thương hiệu khỏi mã:** tên TVHs còn nằm trong `BRAND_SIGN_OFF` của `script-checks.ts`, watermark, các tài liệu `QUY-CHUAN-*`, `.claude/agents` và chính file kế hoạch này. Đưa phần trong code ra một file cấu hình; `graphify-out` loại hẳn khỏi bản công khai vì có đường dẫn nội bộ.

Bản công khai được sinh bằng `npm run package:public` theo **danh sách cho phép**, không phải danh sách loại trừ, để file mới không tự lọt ra ngoài. Lệnh này quét và dừng khi thấy "Thành Vinh", "TVHs", email, đường dẫn `D:\Total_AI`, khoá API, hoặc file trên 100 MB.

**Nơi phát hành:** bản nội bộ lên repo GitHub riêng tư mới, bản công khai lên repo công khai. Em chuẩn bị đến sát bước đẩy; **chỉ đẩy khi anh Phương xác nhận từng repo**. Model không kèm trong gói mà tự tải ở lần chạy đầu.

## Giai đoạn 8: Thử như người mới

Mỗi bản, thử từ bản clone sạch vào thư mục mới, đường dẫn có dấu và dấu cách, không dùng môi trường có sẵn:

1. Chạy cài đặt, `doctor`.
2. Làm một video mẫu từ đầu đến MP4 bằng GPU.
3. Làm lại bằng CPU (ép qua biến môi trường) để kiểm nhánh CPU. Máy thật không có NVIDIA thì **em không có để thử**, cần một đồng nghiệp chạy.
4. Chạy Chế độ C với clip mẫu ở bản có kèm.
5. Giải nén file zip trên Windows, kiểm tên file tiếng Việt và log tiếng Việt không bị lỗi mã hoá.

Cổng để phát hành: cả 5 mục đạt hoặc được ghi rõ là chưa thử.

## Rủi ro

| Rủi ro | Cách chặn |
| :--- | :--- |
| Mất thay đổi chưa commit của repo cũ | Xoá chỉ sau kiểm kê, đổi tên và chạy lại cổng |
| Remotion và HyperFrames chung một repo, xung đột dependency | Chế độ C gọi HyperFrames bằng `npx` phiên bản ghim, không thêm vào cây React. Lệnh này cần mạng khi chạy; xét việc cài cố định sau khi đọc mã nguồn |
| Bản công khai lộ tài liệu nội bộ | Danh sách cho phép, máy quét chuỗi, lịch sử git mới |
| Gói quá nặng vì nhạc và `templates/` | Chỉ giữ template được gọi tới; đo dung lượng trước khi đẩy |
| Người nhận thiếu giấy phép Remotion | Nêu ở đầu README và `doctor` |

## Cần anh quyết

1. Cho phép commit repo mới làm mốc trước khi chuyển.
2. Công ty đã có Remotion Company License chưa (nếu trên 3 nhân viên).
3. Phạm vi quy tắc: đề xuất quy tắc 2 và 3 chỉ áp cho luồng Tài liệu, Chế độ C theo `CHE-DO-C-SPEC`.
4. Thư viện `templates/` (1,27 GB): đề xuất chỉ giữ template lõi và template job còn dùng, còn lại nằm trong Archive.
5. Nhạc nền (605 MB) của bản nội bộ: đề xuất để ngoài git, phát hành kèm bằng file zip riêng.
6. Truyện ma: đề xuất tạo môi trường riêng 8 GB trong thư mục của nó, thay vì trỏ sang Labs.
7. Nơi đẩy: tên repo GitHub riêng tư và công khai.
