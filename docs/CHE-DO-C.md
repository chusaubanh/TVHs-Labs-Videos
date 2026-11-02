# Chế độ C: dựng từ clip quay thật

Luồng này nhận clip quay, phiên âm, cắt, xử lý âm thanh, chỉnh trong Editor rồi xuất MP4. Giọng là âm thanh gốc, không qua VieNeu.

Đặc tả đầy đủ: [tham-khao-repo-cu/CHE-DO-C-SPEC.md](tham-khao-repo-cu/CHE-DO-C-SPEC.md), [BROLL-GUIDE.md](tham-khao-repo-cu/BROLL-GUIDE.md). Các bước 1 đến 22: [SKILL.md, dòng 95-118](tham-khao-repo-cu/SKILL.md).

## Khác với tài liệu cũ

- **Không còn thư viện `templates/` và `scene-kit`.** Bỏ các bước 13-15 phần viết set scene-kit. Cảnh minh hoạ dựng bằng Remotion thành MP4, rồi đưa vào Editor như một lớp video. Project cũ có lớp cảnh `templateId` không hiển thị được lớp đó.
- **Cài đặt:** `npm run th:setup` cài đúng các phiên bản trong `requirements-asr.lock.txt`. Cần NVIDIA, driver 550 trở lên.
- **Model** nằm ở `models/`, ngoài git. Tự tải ở lần chạy đầu trên máy mới.

## Lớp phủ và xuất hình

`th:render` gọi `hyperframes@0.6.94` qua `npx`, nên lần đầu cần mạng. Luồng này tách riêng với Remotion.

## Quay màn hình và Premiere

`scripts/screencast/` dựng video quay màn hình và đóng gói timeline Premiere. Lệnh chạy nêu ở đầu từng file và ở [QUY-TRINH-VIDEO-HUONG-DAN-QUAY-MAN-HINH.md](tham-khao-repo-cu/QUY-TRINH-VIDEO-HUONG-DAN-QUAY-MAN-HINH.md).

Chưa kiểm trên repo này: dựng một video quay màn hình mới từ đầu, và mở gói Premiere trong Premiere.
