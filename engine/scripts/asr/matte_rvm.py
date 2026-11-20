"""RobustVideoMatting (PeterL1n, GPL-3.0) cho th:matte --model rvm. CHỈ DÙNG NỘI BỘ.

Code model không nằm trong repo: nạp từ .research/repos/RobustVideoMatting (người dùng clone, tag v1.0.0).
File này bị loại khỏi bản công khai (scripts/package-public.mjs) cho tới khi anh Phương chốt giấy phép.
"""
from research_paths import research_repo

import torch

# Code nạp từ bản clone CỤC BỘ (AGENTS.md luật 6); hubconf chỉ tải trọng số rvm_mobilenetv3.pth về models/torch lần đầu.
RVM_DIR = research_repo("RobustVideoMatting")
RVM_CLONE = "git clone --branch v1.0.0 --depth 1 https://github.com/PeterL1n/RobustVideoMatting .research/repos/RobustVideoMatting"


class RVM:
    name = "rvm"

    def __init__(self, dev, downsample_ratio: float = 0.25):
        self.dev = dev
        self.ratio = downsample_ratio  # README RVM: 0.25 cho 1080p
        if not (RVM_DIR / "hubconf.py").exists():
            raise SystemExit(f"Thiếu bản clone RobustVideoMatting. Chạy ở thư mục repo:\n  {RVM_CLONE}")
        # RVM v1.0.0 (model/mobilenetv3.py:3) import torchvision.models.utils, đã bị gỡ từ torchvision 0.13.
        # Không sửa bản clone (luật 6): dựng module tương thích trỏ về torch.hub.load_state_dict_from_url.
        import sys
        import types
        sys.dont_write_bytecode = True  # không ghi __pycache__ vào bản clone (.research/repos chỉ đọc)
        if "torchvision.models.utils" not in sys.modules:
            shim = types.ModuleType("torchvision.models.utils")
            shim.load_state_dict_from_url = torch.hub.load_state_dict_from_url
            sys.modules["torchvision.models.utils"] = shim
        self.m = torch.hub.load(str(RVM_DIR), "mobilenetv3", source="local").to(dev).eval()
        self.rec = [None] * 4

    def reset(self):
        self.rec = [None] * 4

    def __call__(self, rgb):
        x = torch.from_numpy(rgb).to(self.dev).permute(2, 0, 1)[None].float() / 255
        with torch.no_grad():
            _fgr, pha, *self.rec = self.m(x, *self.rec, downsample_ratio=self.ratio)
        return pha[0, 0].float()
