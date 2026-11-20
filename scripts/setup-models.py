"""Cài BiRefNet vào models/ để chạy độc lập với kho nghiên cứu. Không sửa nguồn."""
import argparse
import hashlib
import json
import shutil
import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REVISION = 'eccde0a8cbdce7ac5fecfeb06340fe7b949e85d9'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--from-dir', type=Path, help='dùng bản model cục bộ thay vì tải mạng')
    args = parser.parse_args()
    target = ROOT / 'models' / 'BiRefNet-matting'
    target.mkdir(parents=True, exist_ok=True)
    if args.from_dir:
        source = args.from_dir.resolve()
        if not (source / 'birefnet.py').is_file():
            raise SystemExit('Nguồn không có birefnet.py.')
        if source == target.resolve():
            raise SystemExit('Nguồn và đích trùng nhau.')
        for file in source.iterdir():
            if file.is_file() and (file.suffix in ('.py', '.json', '.safetensors') or file.name.lower().startswith(('license', 'readme'))):
                shutil.copy2(file, target / file.name)
        origin = {'source': 'local-copy', 'revision': None}
    else:
        try:
            from huggingface_hub import snapshot_download
        except ImportError:
            raise SystemExit('Cài môi trường model bằng npm run th:setup trước, rồi chạy lại bằng Python .venv-asr.')
        snapshot_download(repo_id='ZhengPeng7/BiRefNet-matting', revision=REVISION, local_dir=str(target))
        origin = {'source': 'https://huggingface.co/ZhengPeng7/BiRefNet-matting', 'revision': REVISION}
    weights = list(target.glob('*.safetensors'))
    if not weights or min(file.stat().st_size for file in weights) < 1_000_000:
        raise SystemExit('Thiếu trọng số thật; có thể chỉ có con trỏ Git LFS.')
    origin['codeSha256'] = hashlib.sha256((target / 'birefnet.py').read_bytes()).hexdigest()
    (target / 'provenance.json').write_text(json.dumps(origin, indent=2), encoding='utf-8')
    print('Đã chuẩn bị BiRefNet trong models/BiRefNet-matting.')


if __name__ == '__main__':
    main()