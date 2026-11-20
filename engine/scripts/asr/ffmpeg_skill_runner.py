"""Bộ nối H.264 NVENC cho ffmpeg-skill 3.10.1; không sửa dependency hoặc bỏ bước kiểm tra của nó.

Upstream --hw dành cho VideoToolbox. Ứng dụng Windows nối tại decision._maybe_hw,
chỉ thay dòng encoder H.264 SDR. Các phép đo, cắt, bộ lọc, khoá file và verify vẫn do upstream chạy.
"""
import importlib
import os
import runpy
import sys
from pathlib import Path


def nvenc_arguments(cpu, quality):
    result = []
    index = 0
    while index < len(cpu):
        flag = cpu[index]
        if flag == '-c:v':
            result.extend([flag, 'h264_nvenc'])
            index += 2
        elif flag == '-crf':
            result.extend(['-rc', 'vbr', '-cq', str(quality), '-b:v', '0'])
            index += 2
        elif flag == '-preset':
            result.extend([flag, 'p5'])
            index += 2
        elif flag == '-x264-params':
            value = cpu[index + 1]
            if value != 'colorprim=bt709:transfer=bt709:colormatrix=bt709':
                return None
            result.extend(['-bsf:v', 'h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1'])
            index += 2
        else:
            result.append(flag)
            index += 1
    return result


def main():
    skill_scripts = Path(sys.argv[1]).resolve()
    tool_file = skill_scripts / sys.argv[2]
    arguments = sys.argv[3:]
    sys.path.insert(0, str(skill_scripts))
    if os.environ.get('TVHS_MEDIA_NVENC') == '1' and '--no-hw' not in arguments and '--smart' not in arguments:
        decision = importlib.import_module('_common.decision')
        original = decision._maybe_hw

        def prefer_nvenc(codec, crf, meta, keep_bt709, cpu):
            video = (meta or {}).get('video') or {}
            if codec == 'h264' and not video.get('bt2020_or_hdr'):
                mapped = nvenc_arguments(cpu, crf)
                if mapped is not None:
                    return mapped
            return original(codec, crf, meta, keep_bt709, cpu)

        decision._maybe_hw = prefer_nvenc
    sys.argv = [str(tool_file), *arguments]
    runpy.run_path(str(tool_file), run_name='__main__')


if __name__ == '__main__':
    main()