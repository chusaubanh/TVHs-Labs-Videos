"""Nghe lại giọng VieNeu từng câu, KHÔNG đưa kịch bản làm gợi ý (npm run voice:check).

Ý tưởng lấy từ digital-human-koubo/scripts/misread_check.py: phiên âm có kèm kịch bản sẽ "sửa" chữ đọc sai về đúng chữ trong kịch bản,
nên phải phiên âm mù rồi mới so. So sánh nằm ở src/audio/voice-check.ts; file này chỉ phiên âm.

Dùng: voice_check.py --items items.json --out heard.json [--model phowhisper|large-v3]
  items.json = [{"id": "s1-0", "wav": "...wav"}, ...]  →  heard.json = [{"id", "heard"}]
Tắt tts:server trước khi chạy để trả VRAM.
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _common import MODELS, setup_env  # noqa: E402

setup_env()  # cache HF (tokenizer của PhoWhisper) vào models/hf, stdout UTF-8, DLL CUDA
import torch  # noqa: F401,E402  nạp DLL CUDA trước ctranslate2
from faster_whisper import WhisperModel  # noqa: E402


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--items", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--model", default="phowhisper", choices=["phowhisper", "large-v3"])
    a = ap.parse_args()
    items = json.loads(Path(a.items).read_text(encoding="utf-8"))
    dev = "cuda" if torch.cuda.is_available() else "cpu"
    ct = "int8_float16" if dev == "cuda" else "int8"
    if a.model == "phowhisper":
        model = WhisperModel(str(MODELS / "phowhisper-large-ct2"), device=dev, compute_type=ct)
    else:
        model = WhisperModel("large-v3", device=dev, compute_type=ct, download_root=str(MODELS / "whisper"))
    out = []
    for it in items:
        segs, _ = model.transcribe(it["wav"], language="vi", beam_size=5, condition_on_previous_text=False,
                                   vad_filter=False, initial_prompt=None, temperature=0.0)
        heard = " ".join(s.text.strip() for s in segs).strip()
        out.append({"id": it["id"], "heard": heard})
        print(f"[voice-check] {it['id']}: {heard[:120]}", flush=True)
    Path(a.out).write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
