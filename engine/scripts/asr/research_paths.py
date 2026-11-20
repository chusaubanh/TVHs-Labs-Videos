"""Tìm bản clone chỉ đọc; dùng cùng cấu hình với bộ dựng TypeScript."""
import json
import os
from pathlib import Path


def research_repo(name: str, root=None, env=None) -> Path:
    if not name or not name[0].isalnum() or any(not (c.isascii() and (c.isalnum() or c in "._-")) for c in name):
        raise ValueError(f"Tên repo không hợp lệ: {name}")
    root = Path(root) if root is not None else Path(__file__).resolve().parents[2]
    env = os.environ if env is None else env
    config_file = root / "research-repos.local.json"
    configured = None
    if config_file.exists():
        configured = json.loads(config_file.read_text(encoding="utf-8"))["root"]
        if not isinstance(configured, str) or not configured.strip():
            raise ValueError(f"{config_file}: root phải là đường dẫn không rỗng.")
    roots = [env.get("TVHS_RESEARCH_ROOT"), configured, str(root / ".research" / "repos")]
    candidates = [(root / p).resolve() / name for p in roots if p and p.strip()]
    return next((p for p in candidates if p.exists()), candidates[0])