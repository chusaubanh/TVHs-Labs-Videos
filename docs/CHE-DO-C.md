# Chế độ C: dựng từ clip quay thật

Luồng này nhận clip quay, phiên âm, cắt, xử lý âm thanh, chỉnh trong Editor rồi xuất MP4. Giọng là âm thanh gốc, không qua VieNeu.

Đặc tả đầy đủ: [tham-khao-repo-cu/CHE-DO-C-SPEC.md](tham-khao-repo-cu/CHE-DO-C-SPEC.md), [BROLL-GUIDE.md](tham-khao-repo-cu/BROLL-GUIDE.md).

## Các bước

Cài một lần bằng `npm run th:setup`. Dấu ✋ là chỗ người dùng phải duyệt. Số bước giữ nguyên theo đặc tả, nên không có bước 13, 14.

1. `npm run th:intake -- "<clip>" [--doc "<tên tài liệu gốc>"] [--name <slug video>]` — sao chép clip vào `input/<tài liệu>/raw/`, tạo job `output/<tài liệu>/<slug>/` (job id = `"<tài liệu>/<slug>"`), sinh `media.json`, `run.json`.
2. `npm run th:transcribe -- <job>` — chạy `nvidia-smi` trước (GPU dùng chung, VRAM phải còn trống).
2b. `th:transcribe` ghi `suspects.json` (đoạn nghi Whisper bịa). Có đoạn nào thì chạy `npm run th:retranscribe -- <job>` → `suspects.retranscribed.json` (phiên âm lại, chỉ gợi ý).
3. AI hiệu đính (dùng cả `suspects.retranscribed.json`; đoạn nào phiên âm lại vẫn ra câu bịa thì hỏi người dùng): viết `transcript.edited.txt` (đúng số dòng = số segment) + `questions.md` (chỗ không chắc: đoạn không phải lời giảng, thuật ngữ, con số, tên/chức danh người nói). ✋ **Hỏi người dùng** các câu trong `questions.md`.
4. `npm run th:align-edits -- <job>`.
5. AI viết `outline.json` (và trình bày tóm tắt + dàn ý lớn→nhỏ). ✋ **Người dùng xác nhận** dàn ý, nêu yêu cầu cắt (chuỗi video / 1 video / tóm tắt / chạy thử 1 phần) và chọn khung **16:9, 4:5 hoặc 9:16** (kho cảnh editonny vẽ cho 9:16).
6. `npm run th:approve -- <job> --stage outline --note "<yêu cầu cắt>"`.
7. `npm run th:cut-plan -- <job>` (AI thêm khoảng cắt manual vào `cuts.json` theo yêu cầu của người dùng).
8. ✋ Người dùng duyệt danh sách cắt → `npm run th:approve -- <job> --stage cut`.
9. `npm run th:cut -- <job> --aspect 16:9|4:5|9:16`. Nguồn VFR (khung không đều, hay gặp ở điện thoại) được đo bằng pts thật và cắt ra CFR theo fps chuẩn gần nhất. Clip dọc quay toàn thân cắt sang 4:5: thêm `--crop-y 0.15` (cửa sổ crop đặt cao, lấy từ đầu xuống; mặc định 0,5 = chính giữa làm đầu sát mép trên). Giá trị lưu trong `media.json`, dựng lại từ clips dùng cùng khung.
9b. `npm run th:verify-cut -- <job> [--dead-air 0.7]` — chỉ báo, không sửa: cắt giữa tiếng (EDGE-IN-SPEECH), cắt giữa từ (EDGE-IN-WORD), câu lặp (REPEAT), lặng chết (DEAD-AIR), và danh sách ngắt/hơi thở 0,25–0,7 s để tham khảo. Có cờ thì nghe lại, sửa `cuts.json`, duyệt lại bước 8. Kết quả ở `verify-cut.json`.
10. `npm run th:audio -- <job>`.
11. `npm run th:project -- <job>`.
12. Crop từ bụng trở lên bằng `videoTransform` (lấy mẫu ~20 khung để chọn) + `npm run th:subject -- <job>` (`subject.json` có `topP10` = đỉnh mặt phân vị 10%: đặt `videoTransform` theo số này, không theo `face.y` vì dính phát hiện nhiễu; dò mặt tự động: YuNet ở `models/yunet/`, rồi Haar, rồi mediapipe) hoặc `--face x,y,w,h` nhập tay. Clip quay toàn thân, người đi lại: một khung crop cố định sẽ hụt người, crop từ dọc sang 16:9 mất đầu.
15. Dựng minh hoạ RIÊNG cho video (không thư viện chung, ưu tiên hình hơn chữ): `npm run th:scene -- <job> --new <tên> --kind overlay|cutaway [--side left|right]` tạo khung cảnh HTML + GSAP ở `output/<job>/scenes/<tên>/`; AI vẽ SVG theo đúng câu đang nói. Overlay: nền trong suốt, minh hoạ ở nửa `side`, chừa dải phụ đề. Cutaway: nền đặc, người nói biến mất. Rồi viết `broll-plan.json`: `templateId: "job:<tên>"`, `side`, `cues` (từ được nói → mốc bật + tiếng pop), `scrim` (lớp gradient dưới minh hoạ: `side` | `bottom` | `even` | `false`) — xem [tham-khao-repo-cu/BROLL-GUIDE.md](tham-khao-repo-cu/BROLL-GUIDE.md) cho luật cứng. (Bước cũ "Remotion thành MP4" không chạy được: không có layer video, MP4 không có kênh trong suốt.)
16. `npm run th:broll -- <job>` (planSfx, pack `corporate`).
17. `npm run th:intro -- <job> --from <s> --to <s>` (cold open bằng câu "chốt", lead-in 0,6 s, `whoosh-long-electro-01`).
18. `npm run th:source-audio -- <job>`.
19. `npm run th:proxy -- <job>`.
20. `npm run th:clips-init -- <job>`.
21. `npm run editor -- <job>` → http://localhost:4317. ✋ **Người dùng xem/chỉnh** (không có cổng duyệt storyboard riêng).
22. `npm run th:render -- <job>` — CHỈ khi người dùng nói "xuất".

**CẢNH BÁO THỨ TỰ:**

- `th:project` XOÁ mọi layer — không chạy lại sau bước 11.
- Khi project đã có `videoClips`: `th:cut`, `th:audio`, `th:intro` (kể cả `--redo`) và `th:project --force` bị từ chối.
- `th:intro` phải chạy TRƯỚC `th:clips-init` (bước 17 trước bước 20).
- **CHƯA KIỂM:** chạy lại `th:broll` sau khi đã có clips; thêm intro sau khi đã có clips (chỉ làm được qua tab Nguồn của editor).

## Khác với tài liệu cũ

- **Không còn thư viện `templates/` và `scene-kit`.** Bỏ các bước 13-15 phần viết set scene-kit. Cảnh minh hoạ dựng bằng Remotion thành MP4, rồi đưa vào Editor như một lớp video. Project cũ có lớp cảnh `templateId` không hiển thị được lớp đó.
- **Cài đặt:** `npm run th:setup` cài đúng các phiên bản trong `requirements-asr.lock.txt`. Cần NVIDIA, driver 550 trở lên.
- **Model** nằm ở `models/`, ngoài git. Tự tải ở lần chạy đầu trên máy mới.

## Lớp phủ và xuất hình

`th:render` gọi `hyperframes@0.6.94` qua `npx`, nên lần đầu cần mạng. Luồng này tách riêng với Remotion.

`th:render` cảnh báo (không chặn) khi layer chữ ra ngoài vùng an toàn: 9:16 lấy theo vùng Reels của editonny (x 140–940, y 230–1530 trên 1080×1920); 16:9, 4:5, 1:1 là lề 5% do mình chọn. Vị trí phụ đề mặc định 9:16 hiện nằm ngoài vùng này.

## Cắt theo dạng sóng

`th:cut-plan` đo RMS 10 ms trên `work/audio16k.wav`:

- Nền ồn tính trên các khung không phải im lặng số (> -80 dB). Mức "đang nói" = trung vị giọng − 15 dB.
- Thu hẹp đoạn cắt lặng (`kind: "silence"`) khi biên còn đè lên âm, tối đa 0,25 s mỗi biên (editonny `precise_edges.py`, `REACH_OUT_S`). Lý do ghi vào `reason` ("nới …/… ms giữ đuôi âm").
- Khoảng "lặng" mà quá nửa là âm to (lời WhisperX bỏ sót, học viên nói) chuyển thành `filler-vad` chưa duyệt.
- **Dò Whisper bịa câu** (`suspects.json`): câu kết video YouTube ("subscribe", "không bỏ lỡ những video"…), câu trùng hệt câu kề, ≥ 3 âm tiết dài ≥ 1,2 s. Mọi cắt tự động đè lên đoạn nghi chuyển chưa duyệt; đoạn nghi không bị coi là "câu lặp". Chữ bịa vẫn nằm trong transcript và có thể đã THAY lời giảng thật (lớp học 0518: 7/9 đoạn, khoảng 2 phút): bước 2b chạy `th:retranscribe` (phiên âm lại từng đoạn, ghi `suspects.retranscribed.json`, không sửa transcript), rồi bước 3 đối chiếu, sửa `transcript.edited.txt` và hỏi người dùng trong `questions.md`. Bỏ bước này thì phụ đề hiện chữ bịa.
- Bản ghi quá đều (ồn, nhạc nền) thì bỏ qua phần dạng sóng và in cảnh báo.
- Các ngưỡng trên chỉnh trên một bản ghi lớp học (0518, 04/11/2026). **Cần thử** trên clip quay gần.

`th:cut` chỉ đọc cửa sổ nguồn quanh các đoạn giữ (`-ss`/`-t`): clip 71 phút, giữ 4 phút ở phút 28 từ 653,7 s còn 85,1 s.

Vị trí phụ đề mặc định: `geometry()` trong `commands-media.ts`, nằm trong vùng an toàn từng khung; số ký tự mỗi dòng tính từ bề rộng hộp và cỡ chữ (Be Vietnam Pro 800 ≈ 0,505 em/ký tự, đo trong editor). Đếm trên clip test: mọi phụ đề ≤ 2 dòng ở 9:16, 16:9, 4:5.

## Kho cảnh editonny (chỉ Chế độ C)

145 cảnh chuyển động HyperFrames + GSAP của [editonny](https://github.com/soumatheusgomes/editonny) (MIT). Tìm bản clone theo thứ tự: biến môi trường `EDITONNY_DIR`, `.research/repos/editonny`, rồi thư mục anh em `../editonny` (máy anh Phương). Cảnh editonny là phương án phụ; mặc định tự vẽ cảnh riêng (bước 15).

- `npm run th:scene -- <job> --list [--find <từ khoá>]` — danh sách cảnh, loại khung, độ dài mẫu, khi nào dùng.
- `npm run th:scene -- <job> --use <id> --start <s> --end <s>` — chạy sau `th:project`. Chép cảnh vào `output/<job>/scenes/<id>-N/` (gsap cục bộ, Be Vietnam Pro cho dấu tiếng Việt, chỉ media cảnh dùng), thêm layer vào track `t-editonny`. Mốc giây tính trên timeline đã cắt; từ trong khoảng đó được nướng sẵn cho cảnh phụ đề/con trỏ theo lời.
- **Luật 1:** chữ và số mẫu (tiếng Bồ Đào Nha, R$, phần trăm, lời chứng…) phải thay bằng nội dung trong tài liệu gốc, sửa trực tiếp khối `var P` hoặc chữ HTML trong bản chép. `th:render` từ chối khi còn chữ mẫu (đối chiếu `sample-texts.json` của bản chép).
- Cảnh vẽ cho 9:16. Video 16:9 hoặc 4:5 thì cảnh được thu vừa khung, có viền: soi trong editor trước.
- Cảnh dạng `frame` (16 cảnh, đánh dấu trong `--list`) là panel nửa trên: editonny dời người nói xuống khung dưới. Mình chưa tự làm, dùng `videoMoves` chế độ pip cho khoảng đó, nếu không panel đè lên mặt.
- Luật 1: `th:render` chỉ soát khối `var P` và chữ HTML ngoài `<script>` (chữ trong `texts` của catalog, chuỗi trong `P`, số trong `P` có khoá kiểu value/price/count…). Không soát chuỗi dựng trong JS (ví dụ giá trị dự phòng), cũng không soát số viết thẳng trong HTML mà catalog không liệt kê: AI tự soát phần đó. Đo trên 145 cảnh: sửa đúng `P` và chữ HTML thì không cảnh nào bị chặn nhầm; chưa sửa thì cảnh nào có chữ mẫu cũng bị chặn.
- Đã chạy (04/11/2026, Chrome headless, file trong scratchpad): cả 145 cảnh đăng ký `__timelines` không lỗi JS; font Inter thay bằng Be Vietnam Pro hiển thị dấu đồng nhất.
- **Cần thử:** chưa render cảnh nào bằng `th:render` (HyperFrames) trong repo này, chưa mở trong editor. 35 cảnh có `<video>`: runtime đặt `currentTime` theo `data-start`, chưa kiểm khung chụp có khớp không.

## Quay màn hình và Premiere

Đã bỏ ngày 03/11/2026 vì không còn dùng: luồng này cần các clip `-fit` của scene-kit, mà repo này không tạo ra. Mã cũ `scripts/screencast/` còn trong lịch sử git ở commit `fdb3235`; [QUY-TRINH-VIDEO-HUONG-DAN-QUAY-MAN-HINH.md](tham-khao-repo-cu/QUY-TRINH-VIDEO-HUONG-DAN-QUAY-MAN-HINH.md) chỉ còn để tham khảo.

## Chữ sau người nói (`th:matte`, thêm 07/11/2026)

Chữ hoặc hình lớn nằm giữa nền và người nói: người nói đi qua thì che chữ. Thay bước macOS Vision của [digital-human-koubo](https://github.com/andyhuo520/digital-human-koubo) (`scripts/cutout_video.py`, `personmask.swift`) bằng model PyTorch chạy CUDA trên Windows.

1. Tạo layer chữ như thường trong editor (hoặc `project.json`), đặt ở vùng trống trên đầu hoặc hai bên vai.
2. `npm run th:matte -- <job> --layer <id>[,<id>]` — chuyển layer vào track `t-behind` ("Chữ sau người nói", `behindSubject: true`), tách người trên `cut.mp4` CHỈ trong khoảng có layer đó (nới 0,1 s), ghi `work/matte/matte-<key>.mkv` và `matte.json`. Chạy lại không có `--layer` khi đã dời layer: khoảng mới nằm ngoài vùng đã tách thì `th:render` từ chối và nhắc chạy lại.
3. `npm run th:render -- <job>`: matte đi qua ĐÚNG chuỗi đặt khung mà nhánh ffmpeg lần đó dùng (cắt ở decoder CUDA, libplacebo, hoặc scale+overlay CPU; nền đen thay INK), nên đổi khung, zoom hay `videoMoves` chỉ chạy lại bước ffmpeg đó, không chạy lại model. Ghép: video → track `behindSubject` với alpha × (1 − matte) → các track còn lại (phụ đề, lower third vẫn nằm trên người).
4. Soát khung giữa mỗi khoảng (`th:matte` in sẵn mốc giây) và khoảng 10 khung liên tiếp ở mép tóc, vai.

- **Model mặc định: RVM** ([RobustVideoMatting](https://github.com/PeterL1n/RobustVideoMatting) v1.0.0), anh Phương chốt dùng nội bộ 07/11/2026: nhanh hơn BiRefNet khoảng 10 lần, ổn định theo thời gian. RVM là **GPL-3.0**: bộ nạp `scripts/asr/matte_rvm.py` bị loại khỏi bản công khai (`scripts/package-public.mjs`), nên ở bản công khai (hoặc máy chưa clone RVM) mặc định tự về **BiRefNet** ([BiRefNet-matting](https://huggingface.co/ZhengPeng7/BiRefNet-matting), MIT, ghim revision `eccde0a`). Chọn tay: `--model rvm|birefnet`.
- **Điểm cắt:** `th:matte` lấy các điểm nối jump cut (từ `videoClips`, hoặc dựng lại từ `cut-map.json`) và bắt đầu lại trạng thái RVM ở mỗi điểm; khởi động RVM chỉ bằng khung cùng đoạn quay. Đo trên bài 4 tại điểm cắt 21,967 s: không bắt đầu lại thì khung đầu sau cắt còn nguyên viền người của cảnh trước; bắt đầu lại thì khớp cảnh mới ngay khung đầu. Code model nạp từ bản clone cục bộ trong `.research/repos/` (người dùng clone, luật 6): `git clone https://huggingface.co/ZhengPeng7/BiRefNet-matting .research/repos/BiRefNet-matting` rồi `git -C .research/repos/BiRefNet-matting checkout eccde0a` (cần Git LFS cho trọng số); `git clone --branch v1.0.0 --depth 1 https://github.com/PeterL1n/RobustVideoMatting .research/repos/RobustVideoMatting` (trọng số RVM tải về `models/torch` lần đầu). Thêm vào `.venv-asr`: `torchvision 0.21.0+cu124`, `timm 1.0.15`, `kornia 0.8.1`, `kornia_rs 0.1.9` (cài `--no-deps`).- **Cảnh báo che chữ:** người chiếm quá 60% hộp chữ ở giữa layer thì `th:matte` cảnh báo (koubo đo: cận mặt người chiếm 89% khung che hết chữ, trung cảnh 57% đọc được).
- **Editor chưa xem trước được hiệu ứng che:** editor vẫn vẽ layer `t-behind` đè lên người (chỉ có tên track "Chữ sau người nói" để nhận ra). Chỉ bản `th:render` mới đúng; xem bằng ảnh trích từ `video.mp4`.
- **Không đưa phụ đề ra sau người** (`th:matte` từ chối).
- **Thứ tự:** chạy `th:matte` SAU `th:clips-init` và sau khi chốt cắt (đổi `cut.mp4` thì `th:render` đòi tách lại). `th:matte --layer` ghi `project.json`: đang mở editor thì tải lại trang trước khi sửa tiếp, nếu không editor bị chặn lưu vì revision cũ.
- **Giữ cờ:** máy chủ editor lưu qua `ProjectSchema` (có `behindSubject`); `th:broll` giữ nguyên track không phải của nó; layer mới tạo trong editor không lọt vào track này. `th:project` vẫn xoá mọi layer như cũ.
- **Đã chạy (07/11/2026):**
  - Đường ống trên bản sao `output/_fixtures/textbehind-test` (6 s, 4:5, khung 1,2×), lúc đầu với `--model luma` (chỉ để kiểm thử: alpha = độ sáng): `th:matte` chạy trọn (cả đường dẫn có dấu), ghép chạy được trên cả 3 nhánh GPU (cuvid + overlay_cuda + NVENC), CPU (`--cpu`), libplacebo (có zoom `videoMoves`); lower third và phụ đề vẫn nằm trên.
  - Căn matte với video (tương quan độ sáng, thử lệch ±1 khung, ±2 px): lệch 0 khung, 0 px ở cả 3 nhánh. Dùng một chuỗi chung cho mọi nhánh thì nhánh GPU lệch 1–2 px dọc, libplacebo lệch 1 px khi zoom, nên mỗi nhánh dựng matte bằng chuỗi của chính nó.
  - Phép nhân alpha có test đo bằng ffmpeg (`src/talking-head/behind.test.ts`).
- **Đo model thật (RTX 3050 8 GB, bài 4 "Kỹ năng giao tiếp", 4:5 1080×1350, 150–156 khung):**

  | | BiRefNet-matting | RVM mobilenetv3 |
  | :--- | ---: | ---: |
  | Khung/giây (riêng model) | 2,2–2,4 | 21–34 |
  | 5 giây chữ sau người mất | ~75 s | ~9–18 s |
  | VRAM đỉnh (torch) | 1.628 MB | 176 MB |
  | Mép tóc, kính, vai (4 khung liền, soi bằng mắt) | sạch, không thấy rung | sạch, không thấy rung |

  - `--ema 0.4` với BiRefNet để lại viền bóng mờ khi người cử động nhanh, nên mặc định tắt EMA.
  - Chỉ số "nhấp nháy" trong `matte-*.stats.json` lẫn cả chuyển động thật của người, chưa dùng để so được.
  - RVM v1.0.0 import `torchvision.models.utils` (đã bị gỡ); `matte_rvm.py` dựng module tương thích và tắt ghi `__pycache__`, không đụng bản clone.
- **Video đủ dài (bản sao bài 4, 191,7 s, 4:5, 78 điểm cắt, 5 s chữ sau người, RVM):** `th:matte` 18 s. `th:render` phần ffmpeg: 20,4 s khi không có chữ sau người, 33,2 s khi có (đã có cache matte canvas), lần đầu 49,4 s vì phải dựng matte canvas đủ thời lượng. Bản sao ở `output/_fixtures/bai4-full`.
- **Cần thử:** cảnh người đi lại nhiều, tóc dài hoặc tóc xù, nền rối; quay ngược sáng.

## Nhịp giữ chân cho clip quay thật (tham khảo, thêm 07/11/2026)

Rút từ [digital-human-koubo](https://github.com/andyhuo520/digital-human-koubo) `references/packaging-playbook.md` và `references/research/*.md` (25 video MrBeast, MKBHD, 影视飓风, Johnny Harris, Vox, Kurzgesagt, 半佛, 差评, 毕导… đo từng khung). Số đo trên kênh tiếng Trung và tiếng Anh, chưa đo trên video đào tạo nội bộ: **Cần thử**, đối chiếu đường giữ chân thật trước khi đặt thành cổng.

| Luật | Số đo nguồn | Áp ở đâu |
| :--- | :--- | :--- |
| 3 giây đầu: luận điểm hoặc hành động, không chào, không logo | cả 4 nhóm kênh | `th:intro` (cold open bằng câu chốt) |
| 30 giây đầu: cứ 3–5 giây có một sự kiện hình mới (zoom, minh hoạ, số lớn, chuyển cảnh) | MrBeast 3,3–5 s; Kurzgesagt 4–5 s | `broll-plan.json`, `camera-auto` |
| Người nói chiếm toàn khung không quá 12 giây liền | playbook mục 1 | zoom / overlay / cutaway |
| Hiệu ứng âm thanh chỉ cho sự kiện (lộ đáp án, số chốt, thẻ bật), 1–3 lần mỗi phút | 半佛 / 差评 / 毕导 | `sfx-plan` mật độ `low` |
| Lặng 0,6–1,0 giây ngay trước khi lộ đáp án | 毕导 | `cuts.json`: đừng cắt khoảng lặng đó |
| Video dài: thẻ chương mỗi 2–5 phút | Johnny Harris / Vox | `outline.json` |
| Cảnh cuối gọi lại hình hoặc câu hỏi của cảnh đầu | playbook mục 5 | dàn ý |

Không lấy: Danmaku (bình luận giả), ReviewCards, PollPop, ReactionPop, MemeWindow — phải bịa nội dung mới chạy được, trái Luật 1.
