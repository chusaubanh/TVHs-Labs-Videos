# Nghiên cứu nâng cấp 18 nhân sự cho 7 Specialist

**Ngày:** 31/10/2026. **Bản 2:** đối chiếu với mã nguồn đã clone tại `.research/repos/`.

> **Cập nhật cùng ngày: hệ thống đã được dựng.** Phần bên dưới là nghiên cứu và lý do; các mục "hiện trạng", "có điều kiện", "cần thử" mô tả thời điểm trước khi dựng. Trạng thái hiện tại xem [18-NHAN-SU.md](18-NHAN-SU.md), cách dùng xem [QUY-TRINH.md](QUY-TRINH.md).
>
> **Kết quả thử thật:** GSAP, Anime.js v4, Spring, dotLottie, Bloom, Rapier tính trước đều qua bài thử tất định; cổng bắt được cảnh cố ý chạy theo đồng hồ. Tài liệu kiểm thử chạy trọn từ kịch bản, giọng VieNeu thật, ảnh duyệt, render tới QC ở khổ 16:9 và 9:16, kể cả đường dẫn có dấu và dấu cách. Chưa thử 4:5, 1:1 toàn tuyến; chưa có video đào tạo thật. React 18 và cụm 3D giữ nguyên phiên bản: bộ hiện tại đã qua bài thử nên chưa cần nâng.

## 1. Kết luận

- **Hiện trạng code không đổi so với bản 1:** trong Labs, 5 công cụ chạy thật (SVGO, GSAP Timeline, Remotion, Three.js, R3F), FFmpeg chạy một phần, 2 bộ Skills mới là bản viết tay, 10 công cụ còn lại là demo giả, code không ai gọi hoặc chưa dùng.
- **Video chưa có tiếng.** Không có thẻ `<Audio>`, chưa nối VieNeu, chưa có mốc giờ theo câu, thời lượng cảnh gõ tay.
- **Sửa `script.json` không đổi video.** Lệnh render không truyền `--props`, video lấy nội dung từ `sample-training-script.ts`.
- **Đọc mã nguồn làm đổi kết luận của 4 công cụ** (dotLottie, Anime.js, Motion Canvas, Mediabunny) **và đổi cách làm của 2 công cụ** (GSAP, Rapier), xem mục 2.
- **Rủi ro mới:** nhiều tính năng 3D chạy theo đồng hồ thật khi render, và font 3D mặc định thiếu dấu tiếng Việt (mục 3).
- **Không làm Studio mới.** Labs render thẳng ra MP4 (mục 5).
- **Vấn đề lớn nhất là hình chứ không phải công cụ:** Labs đang kể bằng chữ. Hướng sửa ở mục 10.

Đề xuất cho 18 vị trí: **giữ 11, giữ có điều kiện 3, thay 2, hoãn 1, bỏ 1**.

## 2. Đối chiếu từng nhân sự

Quy tắc gốc: mọi chuyển động phải do `useCurrentFrame()` điều khiển, nếu không thì phải có lớp tích hợp (`remotion/packages/docs/docs/third-party.mdx`). Đường dẫn trong cột bằng chứng tính từ `.research/repos/`.

| # | Công cụ | Trong Labs | Bằng chứng từ mã nguồn | Đề xuất |
| :---: | :--- | :--- | :--- | :--- |
| 01 | Remotion Skills | Bản viết tay | `remotion/packages/skills/skills/` có 13 skill, gồm `remotion-best-practices`, `-render`, `-captions`, `-multimedia`, `-license` | **Giữ:** thay bản viết tay bằng skill chính thức |
| 02 | GSAP Skills | Bản viết tay, ví dụ tạo timeline mới mỗi khung | `gsap-skills/skills/` có 8 skill. Không skill nào nhắc Remotion | **Giữ:** bổ sung quy tắc riêng cho Remotion |
| 03 | SVGO | Chạy thật | Bản cài 3.3.5 có `removeViewBox` trong preset mặc định, bản 4.1.0 thì không. `scripts/optimize-svg.mjs` ghi đè file gốc, kể cả `assets/brand/tvhs-sample.svg` (repo cũ cấm sửa brand asset), và `prefixIds` đổi id | **Giữ, sửa:** lên v4 như repo cũ, ghi ra file mới, giữ id mà animation cần |
| 04 | Satori | Không ai gọi | `satori` README: bắt buộc truyền font khi có chữ; hỗ trợ TTF, OTF, WOFF, WOFF2; có `loadAdditionalAsset`. Labs dùng font latin từ CDN | **Giữ, sửa:** dùng Be Vietnam Pro cục bộ. Bản cài 0.12.2, mới nhất 0.63.2 |
| 05 | GSAP Timeline | Thật, chỉ ở showcase | Có gói chính thức `@remotion/gsap` 4.0.539 với `useGsapTimeline`, tua timeline đang dừng theo khung (`remotion/packages/gsap/`) | **Giữ:** đổi sang gói này. Giấy phép là [GSAP Standard](https://gsap.com/standard-license), không phải MIT |
| 06 | Anime.js | Giả; cài v3.2.2 | v4.5.0 có `createDrawable` (`anime/src/svg/drawable.js`) và `seek()` (`anime/src/timer/timer.js:405`). Remotion dẫn ví dụ `anime-example` | **Giữ có điều kiện:** lên v4 và qua bài thử tất định |
| 07 | Motion | Giả | `third-party.mdx`: chưa có tích hợp Framer Motion. Có `useManualTiming` (`motion-dom/src/frameloop/process-frame.ts`), nhưng thời gian được tính theo delta giữa các lần gọi, nên khó hợp với render không theo thứ tự | **Thay** bằng `spring` của Remotion. Tính năng layout/Reorder cần làm riêng nếu có nhu cầu |
| 08 | dotLottie | Giả | `setFrame()` vẽ ngay (`dotlottie-web/packages/web/src/dotlottie.ts:1239`). Riêng `@remotion/lottie` dùng `lottie-web`, không phải dotLottie (`remotion/packages/lottie/package.json`) | **Giữ có điều kiện:** cần thử WASM khi render. Không được thì dùng `@remotion/lottie` với file JSON. Bản cài 0.32, mới nhất 0.82 |
| 09 | Remotion | Thật | Lõi 4.0.539, trùng bản đã cài | **Giữ:** thêm `calculateMetadata`, truyền `--props` |
| 10 | Motion Canvas | Chưa cài | Có `Renderer.renderFrame()` và `Player.requestSeek()` (`motion-canvas/packages/core/src/app/`), cần Vite plugin riêng. Có [xuất chuỗi ảnh](https://motioncanvas.io/docs/rendering/image-sequence) | **Hoãn:** nếu cần thì xuất clip trước rồi ghép. Hiện `interpolate` đã đủ cho cảnh giải thích |
| 11 | Three.js | Thật, khối vuông demo | v0.187 ở nhánh chính; template của Remotion dùng 0.178 | **Giữ:** khoá phiên bản theo mục 4 |
| 12 | R3F | Thật, tối thiểu | **Chưa clone repo.** `remotion/packages/three/src/ThreeCanvas.tsx:66` gọi `advance(performance.now())` | **Giữ:** cấm `useFrame` tự chạy theo thời gian |
| 13 | Drei | Chưa dùng | `Float.tsx:41`, `Sparkles.tsx:151` dùng đồng hồ; `SpotLight.tsx:207` cộng dồn `uTime`. `Text3D` cần font typeface | **Giữ, có danh sách cấm:** mục 3 |
| 14 | Rapier | Chưa dùng | `Physics.tsx` có `paused`, `timeStep`, `step()`, `takeSnapshot`. Remotion khuyên "bake" vật lý cho Matter.js. Rust có `enhanced-determinism`. **Chưa clone `rapier.js`**; bản 0.14.0 đã cài có `RigidBodyDesc.dynamic()`, `step()`, `takeSnapshot()` (`node_modules/@dimforge/rapier3d-compat`) | **Giữ có điều kiện:** gọi Rapier trực tiếp trong Node, tính trước ra JSON, thử trên `@dimforge/rapier3d-deterministic-compat` |
| 15 | Postprocessing | Chưa dùng | `react-postprocessing/src/EffectComposer.tsx` gọi `composer.render(delta)`. Hiệu ứng Glitch, ShockWave, Outline có khớp từ khoá thời gian hoặc ngẫu nhiên | **Giữ:** dùng Bloom, DOF; đo thời gian render. Hiệu ứng khác phải qua bài thử |
| 16 | Howler.js | Không ai gọi | `howler.core.js` không có `OfflineAudioContext`; chỉ phát thời gian thực | **Thay** bằng `<Audio>` của Remotion. Stereo trái–phải làm bằng FFmpeg `pan` hoặc `stereotools` |
| 17 | Mediabunny | Giả, trả file rỗng | `Output` và `Mp4OutputFormat` là thật (`mediabunny/README.md`). Remotion dùng nó cho render trong trình duyệt, nhưng chế độ đó có nhiều giới hạn CSS (`client-side-rendering/limitations.mdx`) | **Bỏ:** Labs không xuất trong trình duyệt. Gỡ code giả và gói cài riêng 1.65.0; bản 1.62.0 vẫn nằm trong các gói Remotion |
| 18 | FFmpeg | Một phần | `af_loudnorm.c`, `f_ebur128.c` có sẵn; máy đã có FFmpeg 9.0 | **Giữ, sửa trước tiên:** đo LUFS, fps, codec âm thanh, thời lượng; sai thì dừng |

## 3. Quy tắc 3D rút ra từ mã nguồn

- **Vì sao có rủi ro:** khi render, `ThreeCanvas` gọi `advance(performance.now())`. Trong R3F 8.18 đã cài, chế độ `frameloop='never'` gán luôn giá trị đó vào `clock.elapsedTime` (`node_modules/@react-three/fiber/dist/events-776716bd.esm.js:1561-1564`). Vì vậy `useFrame` nhận thời gian thật, và Remotion cấm dùng nó (`remotion/packages/skills/skills/remotion-markup/3d.md:52`).
- **Không dùng khi chưa qua bài thử:** `Float`, `Sparkles`, `SpotLightShadow` dạng shader (`uTime` cộng dồn, `SpotLight.tsx:207`), `<Physics updateLoop="follow">`, hiệu ứng hậu kỳ có yếu tố thời gian.
- **`<SpotLight />` thường dùng được:** `useFrame` ở `SpotLight.tsx:64` và `:114` chỉ cập nhật vị trí và hướng, không phụ thuộc thời gian.
- **`PerspectiveCamera`:** `useFrame` chỉ dùng khi truyền children dạng hàm. Dùng bình thường thì không thuộc diện này.
- **Font 3D tiếng Việt:** trong `three.js/examples/fonts`, `helvetiker` và `optimer` thiếu `ệ`, `đ`, `ấ`; `gentilis` có đủ ba ký tự này. Muốn dùng Be Vietnam Pro phải chuyển sang typeface JSON và kiểm đủ bộ dấu.

**Bài thử tất định bắt buộc:** render cùng một khung hai lần và theo thứ tự đảo, so hash ảnh. Công cụ nào không qua thì không vào dây chuyền.

## 4. Phiên bản

| Gói | Đã cài | Mới nhất | Ghi chú |
| :--- | :--- | :--- | :--- |
| React | 18.3 | — | Remotion phát triển trên 19.3.1 |
| `@react-three/fiber` | 8.18 | 9.8.2 | Template Remotion dùng 9.2.0 |
| `@react-three/drei` | 9.122 | 10.7.9 | Nhánh chính cần R3F 9 và React 19 |
| `@react-three/rapier` | 1.5 | 2.2.0 | Nhánh chính cần R3F 9 và React 19 |
| `@react-three/postprocessing` | 2.19 | 3.2.2 | Nhánh chính cần R3F ≥ 9.7 và React 19 |
| `three` | 0.170 | 0.187 | `postprocessing` yêu cầu dưới 0.187 |

Bộ đang cài hợp nhau, nhưng nâng một gói 3D lên bản mới là kéo theo cả React 19. Đề xuất giữ nguyên tới giai đoạn 4, rồi nâng một lần cả cụm và thử lại.

## 5. Nối ra video và Studio

- **Đường chính:** `remotion render` ra MP4, rồi QC bằng FFmpeg. Không làm giao diện chỉnh sửa, không đưa `open-studio.bat` vào quy trình sản xuất.
- **Remotion Studio có sẵn** trong gói `@remotion/studio`, chỉ dùng để xem thử khi phát triển, không cần xây gì.
- **Studio của repo cũ** không nối và không chép sang: hai repo là hai dự án riêng (mục 9).

## 6. Sức mạnh mới của từng Specialist

Vai trò lấy từ `TVHs-Lab-Video-AI/docs/MULTI_AGENT_MODEL.md`.

| Specialist | Thứ được thêm | Khả năng có được |
| :--- | :--- | :--- |
| S1 Content Architect | Port cổng thời lượng `lengthDecision` | Không ép tài liệu dài vào một video |
| S2 Copywriter | `voiceSegments` + `visual[i]` trong hợp đồng kịch bản | Mỗi câu có một hình, kiểm được bằng máy |
| S3 Audio | VieNeu, `<Audio>`, `@remotion/captions`, FFmpeg | Giọng thật, mốc giờ thật, phụ đề, stereo và âm lượng đo được |
| S4 SVG & Visual | SVGO v4, Satori tiếng Việt, Lottie, Drei | Tranh riêng từng video, chữ đúng dấu |
| S5 Motion | `@remotion/gsap`, Anime.js v4, `spring`, 3D, Rapier tính trước | Chuyển động bám câu, 3D khi nội dung cần |
| S6 QA | FFmpeg thật, bài thử tất định, bộ đếm lỗi | Sai là dừng pipeline |
| S7 Visual Critic | Ảnh tờ liên hoàn, port `audit_frame.py` | Soi hình trước khi render cả video |

## 7. Mâu thuẫn với quy tắc đã chốt

1. **Template catalog.** `TRAINING_SCENE_TYPES` và 5 cảnh `Training*Scene` là thứ repo cũ cấm (DECISIONS 09/10/2026, SKILL.md mục 0d). Đã chốt bỏ (mục 9).
2. **Khổ hình.** Labs đang cố định 1080×1920. Đã chốt cho chọn khổ (mục 9); các cổng phủ khung phải đo lại theo từng khổ.
3. **Cảnh `checklist`** có trong hợp đồng nhưng composition không vẽ gì.
4. **Chưa có lưới an toàn:** Labs chưa có git và chưa có test.
5. **Giấy phép Remotion** (`remotion/LICENSE.md`): miễn phí cho cá nhân, phi lợi nhuận và công ty tối đa 3 nhân viên; còn lại phải mua Company License. Từ Remotion 5.0, cộng tác viên cũng tính vào quy mô, và khách Company License phải bật telemetry (`5-0-migration.mdx`).

## 8. Lộ trình đề xuất

Video thử: tài liệu anh Phương chọn, không dùng Lark. Repo cũ vẫn là dây chuyền sản xuất và không bị sửa.

| GĐ | Việc | Xong khi |
| :---: | :--- | :--- |
| 0 | `git init`, gỡ code giả và catalog cảnh, chép Chế độ A, thêm `analysis`, cổng thời lượng, `script-review.md` | `typecheck` sạch; bảng duyệt kịch bản của tài liệu thử được anh Phương duyệt |
| 1 | Một cảnh mẫu của tài liệu thử: VieNeu, mốc giờ theo câu, `--props`, `calculateMetadata`, `<Audio>`, `@remotion/gsap`, Anime.js v4, QC FFmpeg thật, bài thử tất định | Anh Phương duyệt cảnh; −14 LUFS theo số đo; QC sai thì thoát mã khác 0 |
| 2 | Cổng "tắt chữ", đối chiếu nguồn, hình đứng yên, bộ đếm lỗi, ảnh tờ liên hoàn | Cố ý tạo lỗi nào thì cổng bắt được lỗi đó |
| 3 | Làm cả video thử bằng hình; dotLottie, Satori | Video thử qua S7; từng công cụ qua bài thử tất định |
| 4 | Nâng cụm React 19 và 3D, một cảnh 3D theo dữ liệu, Rapier tính trước | Render lặp lại giống hệt; có số đo thời gian render |
| 5 | So với bản repo cũ cùng nội dung | Anh Phương chọn bản nào hơn |

## 9. Quyết định của anh Phương (31/10/2026)

| Câu hỏi | Quyết định |
| :--- | :--- |
| Cảnh cố định | **Bỏ.** Không dùng catalog cảnh cố định |
| Khổ hình | **Người dùng chọn cho từng video:** 16:9, 9:16, 4:5, 1:1 |
| Tên vị trí | **Đã áp dụng** trong [18-NHAN-SU.md](18-NHAN-SU.md): #07 Remotion Spring, #16 Remotion Audio + FFmpeg. #17 VieNeu-TTS, anh Phương chốt 31/10/2026 |
| Tài liệu thử | **Không dùng Lark.** Video ngắn hơn 3 phút được chấp nhận. Thử bằng bài Mở đầu của chuỗi Bài viết về AI, anh Phương chốt 31/10/2026 |
| Thay Motion, Howler; hoãn Motion Canvas; bỏ Mediabunny | **Đồng ý** |
| Studio repo cũ | **Không nối.** Hai repo riêng biệt; chỉ chép sang Labs những gì cần |
| `.research` khỏi test | **Đã làm:** `vitest.config.ts`, `.gitignore` |
| Giấy phép Remotion | **Làm độc lập, chỉ giao MP4:** thuộc diện miễn phí, xem bên dưới. Thêm người hoặc giao mã nguồn cho khách thì phải xét lại |

**Giấy phép.** Remotion tính toàn bộ nhân sự của đơn vị sử dụng, không tính số người đụng vào Remotion ([FAQ](https://www.remotion.dev/docs/license/faq)).
- **Làm cho Thành Vinh Holdings với tư cách nhân sự công ty, và công ty từ 4 người trở lên:** cần Company License. Labs có code gọi `remotion render`, tức thuộc định nghĩa "automation" (`license/faq.mdx:108-129`), nên nhiều khả năng rơi vào gói Automators: $0.01/render, tối thiểu $100/tháng (`terms.mdx:223`). Gói Creators $25/ghế/tháng dành cho việc không có automation.
- **Hoạt động độc lập, tối đa 3 người, chỉ giao file MP4:** thuộc diện miễn phí, kể cả có automation, vì khách chỉ nhận thành phẩm thì không tính vào số người (`license/faq.mdx:66-69`, `:219`).
- **Không chặn việc thử:** giai đoạn đánh giá, chưa dùng thương mại, được miễn phí (`remotion/LICENSE.md`, mục Eligibility). Giấy phép chỉ cần chốt trước khi sản xuất video để dùng thật.
- Đây là cách đọc tài liệu, không phải tư vấn pháp lý.

## 10. Hình trước chữ: tránh đi lại lối mòn

### Hiện trạng đúng là vẫn đi lối mòn

Thêm công cụ không tự sửa được việc này. Thẻ chữ dựng bằng 3D vẫn chỉ là thẻ chữ.

| Video | Quan sát | Vấn đề |
| :--- | :--- | :--- |
| Labs, `visual-comparison-f1100.jpg` | Hai cột thẻ, bong bóng chat, nhiều dòng chữ | Đọc chứ không xem. Có "Campaign Tết", "ngân sách Ads", "2 phút" **không có trong tài liệu gốc** |
| Labs, `visual-process-f750.jpg` | Ba thẻ xếp dọc | Slide danh sách |
| Repo cũ, Trợ lý Pháp chế, cảnh 36 | Ba hàng ô chữ nối mũi tên | Vẫn là bảng chữ |
| Repo cũ, Trợ lý Pháp chế, cảnh 30 | Khối "kho", kính lúp | Hướng đúng nhất: có hình, nhưng chủ yếu đứng yên |

Nhận xét về repo cũ chỉ dựa trên 2 khung hình của 1 video, cộng với đánh giá của anh Phương. Repo cũ đã có quy tắc đúng (SKILL.md mục 0). Các cổng đo độ phủ khung, hình đứng yên, số chữ và độ khớp nhịp, nhưng chưa cổng nào kiểm tra hình có tự truyền được ý của câu hay không.

### Nguyên tắc mới

1. **Mỗi câu thoại là một hành động của hình,** không phải một dòng chữ. Viết `visual[i]` bằng động từ: cái gì làm gì, đổi thành gì.
2. **Tắt chữ vẫn hiểu.** Chữ chỉ để gọi tên thứ đang thấy.
3. **Chỉ vẽ điều tài liệu nói.** Không thêm tình huống, số liệu.
4. **Chuyển động phải mang nghĩa.** Hiệu ứng trang trí gây xao nhãng, nên hiệu ứng chỉ để chỉ nguyên nhân, thứ tự, thay đổi, hoặc nơi cần nhìn.
5. **Đạo diễn hình đi trước thi công:** S2 và S4 chốt kịch bản hình của từng câu trước khi S5 chọn công cụ. Nội dung quyết định dùng ai, không dùng công cụ cho đủ 18.

### Ví dụ với tài liệu Lark

| Lời thoại theo tài liệu | Hình kể gì | Nhân sự |
| :--- | :--- | :--- |
| Không nhắn "Alo bạn ơi" rồi im lặng 30 phút | Bong bóng "Alo" rơi vào giữa màn hình làm việc; kim đồng hồ quay 30 phút; thanh tập trung vỡ dần | GSAP, Anime.js |
| Reply in Thread giữ sạch không gian chung | Tin nhắn đổ xuống chất đống che kín kênh; bật chuỗi, tất cả bay gọn vào một nhánh, kênh sạch trở lại | Rapier tính trước, GSAP |
| Không giao việc bằng lời nói | Bong bóng lời nói bị gạch bỏ; thẻ Lark Task hiện ra thay thế | Anime.js, GSAP |
| Gắn DRI và Follower | Thẻ việc bay tới gắn vào một người; người theo dõi nối dây quan sát | GSAP, Anime.js |
| Due Date cụ thể, kèm mô tả tiêu chuẩn đầu ra | Con dấu ngày đập xuống thẻ, có tiếng và rung nhẹ; dòng "tiêu chuẩn đầu ra" hiện trên thẻ | GSAP, FFmpeg |
| 5 công cụ của Lark | Camera bay qua 5 khối trong không gian, khối được nhắc thì sáng | Three.js, R3F, Drei, Bloom |

### Cổng kiểm mới

| Cổng | Cách kiểm | Dừng khi |
| :--- | :--- | :--- |
| Tắt chữ | Render bản ẩn chữ, S7 tả lại từng câu chỉ từ hình | Không đoán được ý câu |
| Đối chiếu nguồn | So mọi chữ và số trên hình với tài liệu | Có thông tin không có trong nguồn |
| Hình đứng yên | Đo khác biệt khung, port `audit_static.py` | Đứng yên quá ngưỡng (thử trên video mẫu rồi mới chốt) |
| Bố cục theo khổ | Chụp ảnh ở từng khổ đã chọn | Tràn, đè hoặc trống quá mức |
| Cuối cùng | Anh Phương duyệt bằng mắt | Chưa đạt là không render cả video |

Khổ hình: không dùng toạ độ cố định 1080. Khổ ngang và dọc cần bố cục riêng, không chỉ co giãn.

### Giữ chân người xem

Hình đẹp không tự bảo đảm chỉ số cao nhất, nên phải đo: lấy đường giữ chân của video mới so với video cũ cùng chủ đề, xem người xem rời ở giây nào, rồi sửa đúng đoạn đó.

### Chép từ repo cũ (chép, không nối)

- Quy tắc: SKILL.md Chế độ A (dòng 432–551), mục 0, 0b, 0c và phần hợp đồng câu–hình.
- Cổng: `audit_frame.py`, `audit_static.py`, `qa_video.py`, `rules_lint.py`, logic `sync:check`.
- Âm thanh: `scripts/vieneu-server.py`, `src/studio/tts/`, kho SFX. Thư mục `models/` repo cũ nặng 14 GB, nên chỉ chép đúng model VieNeu cần dùng.
- Không chép: phần còn lại của `src/studio/`, editor, Chế độ C, và các bộ cảnh cũ.

### Bước tiếp theo: một cảnh mẫu

Dựng trọn một cảnh của tài liệu thử, có tiếng, ở khổ 16:9 và một khổ dọc để anh Phương xem. Bảng Lark ở trên chỉ là ví dụ về cách kể bằng hình. Đạt thì mới nhân ra cả video. Cách này cũng thử thật GSAP, Anime.js v4 và bài thử tất định.

## 11. Quy chuẩn viết kịch bản đào tạo

Cả 9 phần của brief anh Phương gửi ngày 31/10/2026 đều đã có trong SKILL.md repo cũ, mục "Chế độ A" (chốt 30/09/2026). Labs thì **chưa mang sang**, nên đây là việc phải làm trước khi dựng hình.

| Phần brief | SKILL.md (dòng) |
| :--- | :--- |
| I. Nguồn nội dung | 440–454 |
| II. Phân tích, phân loại | 456–474 |
| III. Thời lượng, tách video | 476–496 |
| IV. Người trưởng thành | 498–516 |
| V, VI. Lời đọc và hình | 518–528 |
| VII. Bảng kịch bản | 530–535 |
| VIII. Trường hợp cần tách | 484–496 |
| IX. Tự kiểm | 537–551 |

### Trục của brief

- **Thứ tự ưu tiên:** trung thành với nguồn → hiểu đúng → đủ cụ thể để áp dụng → dễ tiếp thu → thời lượng.
- **Giữ chân không được đánh đổi nội dung:** khi hình hấp dẫn xung đột với hiểu đúng, hiểu đúng thắng.
- **Lời và hình bổ trợ nhau:** hình đã rõ thì lời giải thích, dẫn dắt, nối ý. Điều này khớp với nguyên tắc hình trước chữ ở mục 10.
- **3 phút là mục tiêu, không phải cái khung để ép:** không đủ thì dừng, trình phương án tách, chờ người dùng chọn rồi mới viết.
- **Mỗi loại nội dung có cách kể riêng:** khái niệm, quy trình, so sánh, ví dụ không dùng chung một công thức.

### Labs đang lệch ở đâu

| Yêu cầu của brief | Hiện trạng Labs | Việc cần làm |
| :--- | :--- | :--- |
| Chỉ dùng thông tin trong tài liệu | `sample-training-script.ts` ghi "chờ 15 phút" (nguồn: 30 phút), "nhắc nhở tự động", "truy vết lịch sử quyết định", và các chi tiết ở mục 10, đều không có trong nguồn | Bỏ file mẫu; thêm cổng đối chiếu nguồn |
| Phân tích trước khi viết | Hợp đồng không có `analysis` | Thêm `contentGroups`, `mustKeep`, `canDrop`, `examples`, `delivery`, `learningLogic`, `principles` |
| Cổng thời lượng và tách video | Chỉ có giới hạn ≤ 210 giây | Thêm `fitsOneVideo`, `lossIfForced`, `lengthDecision`; ngưỡng 195 giây như repo cũ |
| Giọng nói tự nhiên, không lời sáo | Mẫu có "Chào mừng các bạn", "Hãy áp dụng ngay từ hôm nay!", "3 Quy Tắc Vàng" | `inspectNarration` đã bắt 3 cụm lời sáo trong brief, nhưng chưa bắt các câu mẫu này. Thêm cổng hoặc để S6 soát |
| Bảng duyệt: STT, Mục, Lồng tiếng, Trực quan, Thời lượng | Chưa xuất | Thêm `script-review.md`, kèm tóm tắt phân tích |
| 10 câu tự kiểm | Chưa có | Đưa vào bước S6 |

### Quy trình đề xuất

1. **S1:** đọc toàn bộ tài liệu, phân loại nội dung, xác định phần giữ và phần lược.
2. **S1:** qua cổng thời lượng. Không đủ 3 phút thì trình phương án và **dừng**.
3. **S2 + S4:** viết lời và kịch bản hình cùng lúc, từng câu.
4. **Người dùng duyệt `script-review.md`.**
5. **S3:** thu giọng, đo mốc giờ.
6. **S5:** dựng hình theo mốc giờ, chọn nhân sự theo hành động của hình.
7. **S6 + S7:** chạy các cổng, rồi người dùng duyệt bằng mắt.

### Áp thử lên tài liệu Lark

- **Khối lượng:** 311 từ, khoảng 87 giây nếu đọc hết (`output/Quy-trinh-Lark-Suite/outline.json`). Một video là đủ, không cần tách.
- **Loại nội dung:** danh sách (5 công cụ), nguyên tắc (3 điều), quy trình (3 bước), so sánh Đúng/Sai có ví dụ, kết luận.
- **Bắt buộc giữ:** cả 3 nguyên tắc, cả 3 bước, ví dụ Đúng/Sai, 3 cam kết cuối.
- **Trường hợp brief chưa nói:** tài liệu ngắn hơn hẳn 3 phút. Cấm thêm thông tin nên không thể kéo dài. Đã chốt: chấp nhận video ngắn hơn, thời lượng theo lời đọc đo thực tế (mục 9).

## 12. Giới hạn của lần đối chiếu này

- **Chưa clone:** `pmndrs/react-three-fiber`, `dimforge/rapier.js`. Repo `dimforge/rapier` đã clone là lõi Rust.
- **Clone `satori` chưa hoàn chỉnh:** 1.089 file ở trạng thái xoá; phần trên đọc bằng `git show HEAD:`.
- **Chưa xác minh:** code trong `anime-example`; WASM của dotLottie khi render headless; `<Audio>` có hỗ trợ pan hay không; mức ảnh hưởng thật của Glitch, ShockWave, Outline.
- **Mã nguồn đọc là nhánh chính**, có thể mới hơn bản đang cài (mục 4).

## Nguồn

Commit đã đọc: `remotion@02123e3`, `gsap-skills@aed9cfd`, `gsap@13e2b79`, `svgo@7b0c686`, `satori@074f0b3`, `anime@01b81be`, `motion@7415b6c`, `dotlottie-web@65d576c`, `motion-canvas@7b91435`, `three.js@cb0a902`, `drei@bf6f4ad`, `rapier@475caa3`, `react-three-rapier@ae5c3fe`, `postprocessing@9cf03cf`, `react-postprocessing@e07ef9a`, `howler.js@1d30535`, `mediabunny@cd66123`, `ffmpeg@92457ad`.
