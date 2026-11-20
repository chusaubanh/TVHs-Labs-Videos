"""Tiện ích chung: đặt cache model vào models\ của repo, thêm DLL cuDNN/cuBLAS cho ctranslate2."""
import os
import sys
from pathlib import Path


def _short(p: Path) -> Path:
    """ctranslate2 trên Windows sập im lặng (mã -1) khi đường dẫn model có dấu, vd. "Làm video": dùng tên 8.3."""
    if os.name != "nt" or str(p).isascii():
        return p
    import ctypes
    buf = ctypes.create_unicode_buffer(1024)
    n = ctypes.windll.kernel32.GetShortPathNameW(str(p), buf, len(buf))
    return Path(buf.value) if 0 < n < len(buf) and buf.value.isascii() else p


ROOT = _short(Path(__file__).resolve().parents[2])
MODELS = ROOT / "models"


def setup_env() -> None:
    MODELS.mkdir(exist_ok=True)
    os.environ.setdefault("HF_HOME", str(MODELS / "hf"))
    os.environ.setdefault("TORCH_HOME", str(MODELS / "torch"))
    os.environ.setdefault("HF_HUB_DISABLE_SYMLINKS_WARNING", "1")
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    # ctranslate2 cần cudnn/cublas của pip (nvidia-*-cu12); torch nạp trước cũng đủ, nhưng thêm cho chắc
    if os.name == "nt":
        site = Path(sys.prefix) / "Lib" / "site-packages" / "nvidia"
        if site.exists():
            for d in site.glob("*/bin"):
                os.add_dll_directory(str(d))
                os.environ["PATH"] = str(d) + os.pathsep + os.environ["PATH"]


def free_vram() -> None:
    import gc
    gc.collect()
    try:
        import torch
        torch.cuda.empty_cache()
    except Exception:
        pass
