"""Tách người nói khỏi nền (alpha mềm) cho hiệu ứng "chữ sau người nói" (Chế độ C, th:matte).

Dùng:
  matte.py --video cut.mp4 --out matte.mkv --fps 30 --frames 5754 --ranges 12.5:17.0,40:44.2 \
           [--model rvm|birefnet] [--ema 0.5] [--stats matte.stats.json]

- Đọc/ghi khung qua ống rawvideo của ffmpeg (không dùng cv2.VideoCapture: hỏng với đường dẫn có dấu).
- Ra một video xám ĐỦ thời lượng (FFV1, không mất dữ liệu) cùng toạ độ với video vào; ngoài các khoảng thì đen (alpha 0).
- Model nằm ở models/ (HF_HOME, TORCH_HOME do _common.setup_env đặt), lần đầu mới tải.
  birefnet: ZhengPeng7/BiRefNet-matting (MIT), theo từng khung (--ema để làm mượt, mặc định tắt).
  rvm:      PeterL1n/RobustVideoMatting v1.0.0 (GPL-3.0, chỉ dùng nội bộ), hồi quy theo thời gian; nạp từ scripts/asr/matte_rvm.py.
"""
import argparse
import json
import subprocess
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _common import setup_env, free_vram  # noqa: E402

# Code model nạp từ bản clone CỤC BỘ do người dùng clone (AGENTS.md luật 6), ghim revision; không tải code lúc chạy.
REPOS = Path(__file__).resolve().parents[2] / ".research" / "repos"
BIREFNET_DIR = REPOS / "BiRefNet-matting"
BIREFNET_REV = "eccde0a8cbdce7ac5fecfeb06340fe7b949e85d9"  # HF ZhengPeng7/BiRefNet-matting, 29/08/2026
BIREFNET_CLONE = ("git clone https://huggingface.co/ZhengPeng7/BiRefNet-matting .research/repos/BiRefNet-matting"
                  " && git -C .research/repos/BiRefNet-matting checkout eccde0a  (cần git lfs)")
WARMUP_S = 1.0  # rvm: chạy trước khoảng 1 s rồi bỏ, để trạng thái hồi quy ổn định


def parse_ranges(s: str):
    out = []
    for part in s.split(","):
        a, b = part.split(":")
        a, b = float(a), float(b)
        if b > a:
            out.append((a, b))
    out.sort()
    merged = []
    for a, b in out:
        if merged and a <= merged[-1][1] + 0.5:
            merged[-1] = (merged[-1][0], max(merged[-1][1], b))
        else:
            merged.append((a, b))
    return merged


def probe(video: str):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
                        "-of", "csv=p=0", video], capture_output=True, text=True, check=True)
    w, h = r.stdout.strip().split(",")[:2]
    return int(w), int(h)


def read_frames(video: str, start: float, n: int, fps: float, w: int, h: int):
    """Sinh n khung RGB (numpy HxWx3 uint8) bắt đầu từ start (giây), lấy mẫu lại đúng fps của project."""
    import numpy as np
    cmd = ["ffmpeg", "-v", "error", "-ss", f"{max(0.0, start):.4f}", "-i", video, "-frames:v", str(n),
           "-vf", f"fps={fps}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE)
    size = w * h * 3
    try:
        for _ in range(n):
            buf = p.stdout.read(size)
            if len(buf) < size:
                break
            yield np.frombuffer(bytearray(buf), np.uint8).reshape(h, w, 3)  # bytearray: mảng ghi được cho torch
    finally:
        p.stdout.close()
        p.wait()


class BiRefNet:
    name = "birefnet"

    def __init__(self, dev):
        import torch
        from transformers import AutoModelForImageSegmentation
        self.torch = torch
        self.dev = dev
        if not (BIREFNET_DIR / "birefnet.py").exists():
            raise SystemExit(f"Thiếu bản clone BiRefNet-matting. Chạy ở thư mục repo:\n  {BIREFNET_CLONE}")
        if not any(BIREFNET_DIR.glob("*.safetensors")) or min(p.stat().st_size for p in BIREFNET_DIR.glob("*.safetensors")) < 1_000_000:
            raise SystemExit("Trọng số BiRefNet chỉ là con trỏ Git LFS: chạy git lfs install rồi git -C .research/repos/BiRefNet-matting lfs pull")
        self.m = AutoModelForImageSegmentation.from_pretrained(str(BIREFNET_DIR), trust_remote_code=True, local_files_only=True)
        self.m.to(dev).eval().half()
        self.mean = torch.tensor([0.485, 0.456, 0.406], device=dev).view(1, 3, 1, 1)
        self.std = torch.tensor([0.229, 0.224, 0.225], device=dev).view(1, 3, 1, 1)

    def reset(self):
        pass

    def __call__(self, rgb):
        torch, F = self.torch, self.torch.nn.functional
        h, w = rgb.shape[:2]
        x = torch.from_numpy(rgb).to(self.dev).permute(2, 0, 1)[None].float() / 255
        x = F.interpolate(x, size=(1024, 1024), mode="bilinear", align_corners=False)
        x = ((x - self.mean) / self.std).half()
        with torch.no_grad():
            pred = self.m(x)[-1].sigmoid().float()
        return F.interpolate(pred, size=(h, w), mode="bilinear", align_corners=False)[0, 0]


class Luma:
    """CHỈ ĐỂ KIỂM THỬ đường ống (đọc/ghi khung, khoảng, căn khung): alpha = độ sáng. Không dùng cho video thật."""
    name = "luma"

    def __init__(self, dev):
        import torch
        self.torch, self.dev = torch, dev

    def reset(self):
        pass

    def __call__(self, rgb):
        x = self.torch.from_numpy(rgb).to(self.dev).float() / 255
        return x[..., 0] * 0.299 + x[..., 1] * 0.587 + x[..., 2] * 0.114


def load_model(name: str, dev):
    if name == "luma":
        return Luma(dev)
    if name == "birefnet":
        return BiRefNet(dev)
    if name == "rvm":
        from matte_rvm import RVM  # file riêng: GPL-3.0, không đưa vào bản công khai
        return RVM(dev)
    raise SystemExit(f"Model không hỗ trợ: {name}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--video", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--fps", type=float, required=True)
    ap.add_argument("--frames", type=int, required=True, help="tổng số khung của matte (= thời lượng project × fps)")
    ap.add_argument("--ranges", required=True, help="giây trên timeline đã cắt: a:b,c:d")
    ap.add_argument("--model", default="rvm", choices=["birefnet", "rvm", "luma"], help="th:matte luôn truyền --model (mặc định do behind.defaultMatteModel chọn)")
    ap.add_argument("--ema", type=float, default=None, help="hệ số giữ khung trước (0 = tắt, mặc định). Đo 07/11: 0.4 để lại bóng mờ khi người cử động")
    ap.add_argument("--stats", default=None)
    ap.add_argument("--cuts", default="", help="giây các điểm cắt trên timeline (jump cut), cách nhau dấu phẩy")
    a = ap.parse_args()

    setup_env()
    import numpy as np
    import torch

    dev = "cuda" if torch.cuda.is_available() else "cpu"
    if dev == "cpu":
        print("[matte] CẢNH BÁO: không có CUDA, chạy CPU sẽ rất chậm", flush=True)
    ema = a.ema if a.ema is not None else 0.0
    W, H = probe(a.video)
    fps, N = a.fps, a.frames
    ranges = parse_ranges(a.ranges)
    cut_frames = sorted({int(round(float(x) * fps)) for x in a.cuts.split(",") if x.strip()})
    franges = [(max(0, int(round(s * fps))), min(N, int(round(e * fps)))) for s, e in ranges]

    t0 = time.time()
    model = load_model(a.model, dev)
    t_load = time.time() - t0
    if dev == "cuda":
        torch.cuda.reset_peak_memory_stats()

    Path(a.out).parent.mkdir(parents=True, exist_ok=True)
    tmp_out = str(Path(a.out).with_suffix(".partial.mkv"))
    wr = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "gray", "-s", f"{W}x{H}",
                           "-r", str(fps), "-i", "-", "-c:v", "ffv1", "-level", "3", tmp_out], stdin=subprocess.PIPE)
    zero = np.zeros((H, W), np.uint8).tobytes()
    stats = {"model": a.model, "ema": ema, "fps": fps, "frames": N, "width": W, "height": H, "ranges": [], "loadSeconds": round(t_load, 2)}
    flick_sum = flick_n = 0.0
    model_time = 0.0
    done = 0
    f = 0
    for (fa, fb), (sa, sb) in zip(franges, ranges):
        while f < fa:
            wr.stdin.write(zero); f += 1
        cover = []
        # Chia khoảng tại các điểm cắt (jump cut): mỗi đoạn bắt đầu lại trạng thái model (RVM hồi quy) và EMA,
        # khởi động RVM chỉ bằng khung CÙNG đoạn quay, để viền người của cảnh trước không đọng sang cảnh sau.
        inner = [c for c in cut_frames if fa < c < fb]
        for pa, pb in zip([fa] + inner, inner + [fb]):
            last_cut = max([c for c in cut_frames if c <= pa], default=0)
            warm = min(int(round(WARMUP_S * fps)), pa - last_cut) if a.model == "rvm" else 0
            model.reset()
            prev = None
            for i, rgb in enumerate(read_frames(a.video, (pa - warm) / fps, pb - pa + warm, fps, W, H)):
                t1 = time.time()
                alpha = model(rgb)
                if dev == "cuda":
                    torch.cuda.synchronize()
                model_time += time.time() - t1
                if i < warm:
                    continue
                if prev is not None and ema > 0:
                    alpha = ema * prev + (1 - ema) * alpha
                if prev is not None:
                    soft = ((alpha > 0.05) & (alpha < 0.95)) | ((prev > 0.05) & (prev < 0.95))
                    k = int(soft.sum())
                    if k:
                        flick_sum += float((alpha - prev).abs()[soft].sum()); flick_n += k
                prev = alpha
                cover.append(float((alpha > 0.5).float().mean()))
                wr.stdin.write((alpha.clamp(0, 1) * 255 + 0.5).byte().cpu().numpy().tobytes())
                f += 1; done += 1
            while f < pb:  # ffmpeg trả thiếu khung cuối: giữ khung trước để không lệch nhịp
                wr.stdin.write((prev.clamp(0, 1) * 255 + 0.5).byte().cpu().numpy().tobytes() if prev is not None else zero); f += 1
        stats["ranges"].append({"start": sa, "end": sb, "frames": fb - fa,
                                "coverMean": round(sum(cover) / max(1, len(cover)), 4),
                                "coverMax": round(max(cover) if cover else 0, 4)})
        print(f"[matte] {sa:.2f}–{sb:.2f}s: {fb - fa} khung, người chiếm trung bình {100 * stats['ranges'][-1]['coverMean']:.0f}% khung", flush=True)
    while f < N:
        wr.stdin.write(zero); f += 1
    wr.stdin.close()
    if wr.wait() != 0:
        raise SystemExit("ffmpeg ghi matte lỗi")
    Path(tmp_out).replace(a.out)

    total = time.time() - t0
    stats.update({
        "framesComputed": done,
        "modelFps": round(done / model_time, 2) if model_time else None,
        "pipelineSeconds": round(total, 2),
        "peakVramMB": round(torch.cuda.max_memory_allocated() / 2**20) if dev == "cuda" else None,
        "flicker": round(flick_sum / flick_n, 5) if flick_n else 0,
    })
    if a.stats:
        Path(a.stats).write_text(json.dumps(stats, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[matte] xong {done} khung trong {total:.1f}s (model {stats['modelFps']} khung/s, VRAM đỉnh {stats['peakVramMB']} MB, nhấp nháy {stats['flicker']})", flush=True)
    del model
    free_vram()


if __name__ == "__main__":
    main()
