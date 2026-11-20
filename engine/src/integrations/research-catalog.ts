export interface ResearchCapability {
  repo: string;
  purpose: string;
  lane: "render" | "prepare" | "preview" | "guide";
  evidence: string;
  packages: string[];
  adapter?: string;
  next: string;
}

/** Lane là thiết kế phân vai, không phải chứng nhận công cụ đã chạy đạt. */
export const RESEARCH_CAPABILITIES: ResearchCapability[] = [
  { repo: "ffmpeg-skill", purpose: "Xử lý media bằng các công cụ Python có hợp đồng JSON", lane: "prepare", evidence: "scripts/_contract.py", packages: ["ffmpeg-skill"], adapter: "src/integrations/ffmpeg-skill.ts", next: "Dùng bản npm đã khoá; probe trước, lập kế hoạch rồi chạy và kiểm kết quả." },
  { repo: "remotion", purpose: "Ghép hình và âm thanh theo khung", lane: "render", evidence: "packages/core/src/index.ts", packages: ["remotion"], adapter: "src/remotion/compositions/TrainingVideoComposition.tsx", next: "Giữ bàn dựng chính; kiểm tất định theo cảnh." },
  { repo: "gsap", purpose: "Chuyển động theo nhịp câu", lane: "render", evidence: "src/gsap-core.js", packages: ["gsap", "@remotion/gsap"], adapter: "src/fixtures/index.tsx", next: "Timeline dừng và seek theo frame, không ticker thật." },
  { repo: "anime", purpose: "Vẽ nét và biến đổi SVG", lane: "render", evidence: "src/timeline/timeline.js", packages: ["animejs"], adapter: "src/kit/use-anime-timeline.ts", next: "Tua timeline theo frame; thêm fixture cho hiệu ứng mới." },
  { repo: "svgo", purpose: "Tối ưu SVG trước khi dựng", lane: "prepare", evidence: "lib/svgo.js", packages: ["svgo"], adapter: "scripts/optimize-svg.mjs", next: "Giữ ID animation; ghi bản tối ưu riêng." },
  { repo: "satori", purpose: "Dựng tài nguyên SVG từ bố cục", lane: "prepare", evidence: "src/index.ts", packages: ["satori"], adapter: "src/engine/satori-cards.ts", next: "Kiểm dấu tiếng Việt và dùng cho tài nguyên cần bố cục." },
  { repo: "dotlottie-web", purpose: "Phát tài nguyên Lottie theo frame", lane: "render", evidence: "packages/web/src/dotlottie.ts", packages: ["@lottiefiles/dotlottie-web"], adapter: "src/kit/DotLottieFrame.tsx", next: "Kiểm WASM headless và setFrame tất định." },
  { repo: "three.js", purpose: "Dựng không gian, camera và vật thể 3D", lane: "render", evidence: "src/Three.js", packages: ["three", "@remotion/three", "@react-three/fiber"], adapter: "src/fixtures/index.tsx", next: "Camera và vật thể tính từ frame; không tự nâng cụm React/3D." },
  { repo: "drei", adapter: "src/kit/frame-3d.tsx", purpose: "Đạo cụ hỗ trợ cảnh 3D", lane: "render", evidence: "src/core/Float.tsx", packages: ["@react-three/drei"], next: "RoundedProp/RoundedBox đã qua fixture tất định; Float và component khác cần thử riêng." },
  { repo: "rapier", purpose: "Tham khảo lõi vật lý; tính quỹ đạo trước", lane: "prepare", evidence: "src/lib.rs", packages: ["@dimforge/rapier3d-compat"], adapter: "scripts/bake-rapier.ts", next: "Lõi Rust không import trực tiếp vào TS; dùng bản JS/WASM tương thích." },
  { repo: "react-three-rapier", adapter: "src/kit/frame-3d.tsx", purpose: "Tham khảo mô hình vật lý cho R3F", lane: "prepare", evidence: "packages/react-three-rapier/src/components/Physics.tsx", packages: ["@react-three/rapier"], next: "BakedRigidBodies đã qua fixture: Physics paused, mesh đọc pose theo frame; cấu hình khác cần thử." },
  { repo: "postprocessing", purpose: "Hậu kỳ hình ảnh 3D", lane: "render", evidence: "src/core/EffectComposer.js", packages: ["postprocessing"], adapter: "src/fixtures/index.tsx", next: "Mỗi pass cần fixture riêng; kiểm delta và trạng thái tích luỹ." },
  { repo: "react-postprocessing", purpose: "Nối hậu kỳ với cảnh React 3D", lane: "render", evidence: "src/EffectComposer.tsx", packages: ["@react-three/postprocessing"], adapter: "src/fixtures/index.tsx", next: "Nguồn mới khác phiên bản đang cài; không thay thế trực tiếp." },
  { repo: "ffmpeg", purpose: "Cắt, trộn âm thanh, mã hoá và QC", lane: "prepare", evidence: "libavfilter/af_loudnorm.c", packages: [], adapter: "scripts/finish-audio.ts", next: "Dùng binary ffmpeg/ffprobe; clone C là nguồn đối chiếu, không phải binary." },
  { repo: "BiRefNet-matting", purpose: "Tạo matte người cho clip quay", lane: "prepare", evidence: "birefnet.py", packages: [], adapter: "scripts/asr/matte.py", next: "Có bộ cài cache model riêng và fallback kho nguồn; suy luận CUDA/chất lượng matte cần thử." },
  { repo: "RobustVideoMatting", purpose: "Tạo matte ổn định qua nhiều frame", lane: "prepare", evidence: "hubconf.py", packages: [], adapter: "scripts/asr/matte_rvm.py", next: "Cần thử CUDA; reset tại jump cut; giữ quy tắc đóng gói nội bộ hiện tại." },
  { repo: "motion", adapter: "scripts/app/client/media-tools.js", purpose: "Chuyển động giao diện Editor", lane: "preview", evidence: "packages/motion/src/index.ts", packages: ["motion"], next: "Đã có module xem thử và build; tương tác GUI cần thử; bản render giữ Remotion Spring." },
  { repo: "howler.js", adapter: "scripts/app/client/media-tools.js", purpose: "Nghe thử SFX trong Editor", lane: "preview", evidence: "src/howler.core.js", packages: ["howler"], next: "Đã nối preview vào Editor; nghe thử GUI cần thử; bản xuất dùng Remotion Audio/FFmpeg." },
  { repo: "mediabunny", adapter: "scripts/app/client/media-tools.js", purpose: "Đọc media và tạo thumbnail trên trình duyệt", lane: "preview", evidence: "src/input.ts", packages: ["mediabunny"], next: "Đọc File/metadata qua test đạt; thumbnail và tương tác GUI cần thử; không thay bộ xuất chính." },
  { repo: "motion-canvas", adapter: "scripts/bake-motion-canvas.ts", purpose: "Dựng hoạt ảnh giáo dục thành tài nguyên trước", lane: "prepare", evidence: "packages/core/src/scenes/GeneratorScene.ts", packages: ["@motion-canvas/core"], next: "Worker đã xuất 90 PNG, kiểm hash lặp/ngược và fixture Remotion đạt; spec mới cần thử riêng." },
  { repo: "gsap-skills", adapter: "docs/tool-guides/gsap/README.md", purpose: "Tài liệu hướng dẫn thiết kế chuyển động", lane: "guide", evidence: "README.md", packages: [], next: "Đọc hướng dẫn theo nhu cầu; đây là tài liệu, không phải runtime." },
];