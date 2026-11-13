"""Phiên âm lại các đoạn nghi Whisper bịa (suspects.json của th:cut-plan) -> suspects.retranscribed.json.

Chỉ GỢI Ý cho bước 3 (AI hiệu đính + questions.md); không sửa transcript.raw.json.
Mỗi đoạn được phiên âm riêng, không dùng ngữ cảnh câu trước (condition_on_previous_text=False) và không VAD, như cách editonny
khuyên khi lời bị bịa ("Retranscribe from a natural pause ... --no-prompt"). Đo trên lớp học 0518 (04/11/2026): cả 3 cặp
"Xin chào các bạn…" lặp đều che lời giảng thật, phiên âm lại ra được lời đó.

Lưu ý Windows: import torch TRƯỚC faster_whisper để nạp cublas64_12.dll; stdout ép UTF-8.
"""
import argparse
import json
import sys
import wave
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")
import torch  # noqa: F401,E402  nạp DLL CUDA trước ctranslate2
import numpy as np  # noqa: E402
from faster_whisper import WhisperModel  # noqa: E402

MODELS = Path(__file__).resolve().parents[2] / "models" / "whisper"
PAD = 0.4  # giây hai bên: bắt đủ từ đầu/cuối


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--wav", required=True)
    ap.add_argument("--suspects", required=True)
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    suspects = json.loads(Path(a.suspects).read_text(encoding="utf-8"))
    w = wave.open(a.wav)
    sr = w.getframerate()
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    model = WhisperModel("large-v3", device="cuda", compute_type="int8_float16", download_root=str(MODELS))
    out = []
    for s in suspects:
        a0 = max(0.0, s["start"] - PAD)
        segs, _ = model.transcribe(x[int(a0 * sr):int((s["end"] + PAD) * sr)], language="vi", beam_size=5,
                                   word_timestamps=True, condition_on_previous_text=False, vad_filter=False)
        words = [{"text": wd.word.strip(), "start": round(wd.start + a0, 3), "end": round(wd.end + a0, 3)} for g in segs for wd in (g.words or [])]
        text = " ".join(wd["text"] for wd in words)
        out.append({**s, "retranscribed": text, "words": words})
        print(f"[retranscribe] {s['start']:.1f}–{s['end']:.1f}s\n  cũ: {s['text'][:90]}\n  mới: {text[:160]}", flush=True)
    Path(a.out).write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[retranscribe] {len(out)} đoạn -> {a.out}")


if __name__ == "__main__":
    main()
