# 18 NHÂN SỰ THEO TỔ SPECIALIST
**TVHs-Labs-Video • Thành Vinh Holdings Video AI Studio**

Cập nhật 31/10/2026 theo quyết định của anh Phương. Bằng chứng và lý do: [NANG-CAP-NHAN-SU.md](NANG-CAP-NHAN-SU.md). Quy trình và lệnh: [QUY-TRINH.md](QUY-TRINH.md).

**Trạng thái:** *Sẵn sàng* = có bộ dựng thật, đã chạy thử hoặc có test. *Chưa dùng* = có trong gói, chưa có bộ dựng. *Hoãn* = chưa dùng.

**File phụ trách:**

| Tổ | File |
| :--- | :--- |
| Master | `src/remotion/`, `scripts/pipeline-runner.ts`, `scripts/render-tools.ts` |
| S1, S2 | `src/training/` |
| S3 | `src/audio/`, `scripts/vieneu-server.py`, `scripts/finish-audio.ts`, `scripts/pan-audio.ts`, `assets/sfx/` |
| S4 | `scripts/optimize-svg.mjs`, `src/engine/satori-cards.ts`, `src/kit/DotLottieFrame.tsx` |
| S4, S5 | `src/videos/<video>/` (cảnh riêng từng video), `src/videos/registry.ts`, `src/kit/scene-context.tsx` |
| S5A | `src/kit/use-anime-timeline.ts`, `.claude/skills/` |
| S5B | `src/kit/baked-physics.ts`, `scripts/bake-rapier.ts` |
| S6, S7 | `src/gates/qc.ts`, `scripts/qc-ffmpeg.ts`, `scripts/gate-determinism.ts`, `scripts/stills.ts` |
| Thử máy móc | `src/fixtures/`, `fixtures/`, `scripts/smoke.ts` |

## Tổ nội dung (không cần công cụ)

| Tổ | Việc | Đầu ra |
| :--- | :--- | :--- |
| **S1 · Content Architect** | Phân tích tài liệu, phân loại nội dung, cổng thời lượng và tách video | `analysis`, `lengthDecision` |
| **S2 · Copywriter** | Viết lời đọc từng câu, chỉ từ tài liệu; viết kịch bản hình cùng S4 | `voiceSegments`, `script-review.md` |

## Master · Bàn dựng

| STT | Nhân sự | Danh xưng | Cú pháp cốt lõi | Trạng thái |
| :---: | :--- | :--- | :--- | :--- |
| **09** | **Remotion** | Bàn dựng chính | `<Composition />`, `remotion render` | Sẵn sàng |

## S3 · Tổ âm thanh

| STT | Nhân sự | Danh xưng | Cú pháp cốt lõi | Trạng thái |
| :---: | :--- | :--- | :--- | :--- |
| **16** | **Remotion Audio + FFmpeg** *(thay Howler.js)* | Tổ âm thanh | `<Audio />`, `loudnorm`, `pan` | Sẵn sàng |
| **17** | **VieNeu-TTS** *(thay Mediabunny, anh Phương chốt 31/10/2026)* | Giọng đọc | `scripts/vieneu-server.py` | Sẵn sàng |

## S4 · Tổ tranh và tài nguyên

| STT | Nhân sự | Danh xưng | Cú pháp cốt lõi | Trạng thái |
| :---: | :--- | :--- | :--- | :--- |
| **03** | **SVGO** | Thợ gọt hình | `optimize()`, ghi ra `public/svg/` | Sẵn sàng |
| **04** | **Satori** | Hoạ sĩ poster | `renderCardSvg()` | Sẵn sàng |
| **08** | **dotLottie** | Diễn viên đóng thế | `<DotLottieFrame />`, `setFrame()` | Sẵn sàng |

## S5A · Tổ chuyển động 2D

| STT | Nhân sự | Danh xưng | Cú pháp cốt lõi | Trạng thái |
| :---: | :--- | :--- | :--- | :--- |
| **01** | **Remotion Skills** | Giáo trình dựng phim | `.claude/skills/remotion-*` | Sẵn sàng |
| **02** | **GSAP Skills** | Sổ tay hiệu ứng | `.claude/skills/gsap-*` | Sẵn sàng |
| **05** | **GSAP Timeline** | Nhạc trưởng | `useGsapTimeline()` | Sẵn sàng |
| **06** | **Anime.js v4** | Cây bút | `useAnimeTimeline()`, `createDrawable` | Sẵn sàng |
| **07** | **Remotion Spring** *(thay Motion)* | Diễn viên giao diện | `spring()`, `interpolate()` | Sẵn sàng |
| **10** | **Motion Canvas** | Thầy giáo | `npm run motion:bake`, `<BakedImageSequence />` | Sẵn sàng (chuỗi PNG đã kiểm hash) |

## S5B · Tổ phim trường 3D

| STT | Nhân sự | Danh xưng | Cú pháp cốt lõi | Trạng thái |
| :---: | :--- | :--- | :--- | :--- |
| **11** | **Three.js** | Phim trường | `THREE.Scene` | Sẵn sàng |
| **12** | **R3F** | Thợ bày cảnh | `<ThreeCanvas><mesh /></ThreeCanvas>` | Sẵn sàng |
| **13** | **Drei** | Kho đạo cụ | `<RoundedProp />` | Sẵn sàng (RoundedBox); component khác cần thử |
| **14** | **Rapier** | Tổ trọng lực | `npm run physics:bake`, `bakedPose()` | Sẵn sàng |
| **15** | **Postprocessing** | Ống kính điện ảnh | `<EffectComposer><Bloom /></EffectComposer>` | Sẵn sàng (Bloom) |

## Tổ kiểm định

| STT | Nhân sự | Danh xưng | Cú pháp cốt lõi | Trạng thái |
| :---: | :--- | :--- | :--- | :--- |
| **18** | **FFmpeg** *(S6 · QA)* | Người duyệt cuối | `npm run qc:check`, `ebur128`, `freezedetect` | Sẵn sàng |

**S7 · Visual Critic** không giữ công cụ riêng: soi ảnh từ `npm run stills`, có quyền trả lại mọi cảnh.

## Bổ sung ứng dụng local — 18/11/2026

Master phụ trách scripts/app/, src/integrations/ và đóng gói. S5A phụ trách worker Motion Canvas và chuỗi ảnh. S5B phụ trách src/kit/frame-3d.tsx; React Three Rapier chỉ phát pose đã tính trước, Physics tạm dừng. Motion, Howler và Mediabunny dùng cho xem thử trong Editor; không thay Spring/Audio/VieNeu trong bản render. ffmpeg-skill là cầu nối công cụ xử lý media. Xem [bảng tích hợp và bằng chứng](THIET-KE-TICH-HOP-REPO.md).
