# Giấy phép của bên thứ ba

Giấy phép MIT trong `LICENSE` chỉ áp cho mã của dự án này. Các thành phần dưới đây giữ giấy phép riêng và được tải khi cài đặt, không nằm trong repo trừ khi ghi rõ.

| Thành phần | Giấy phép | Lưu ý |
| :--- | :--- | :--- |
| Remotion | Remotion License | **Đơn vị vì lợi nhuận có trên 3 nhân viên phải mua Company License.** Tự kiểm tra tại https://www.remotion.dev/license |
| HyperFrames 0.6.94 | Gói npm bản này không ghi giấy phép; bản 0.8.152 ghi Apache-2.0 | Tải qua `npx` khi xuất Chế độ C. Tự kiểm tra trước khi dùng thương mại |
| GSAP | GSAP Standard License | https://gsap.com/licensing |
| capcut-cli | MIT | |
| VieNeu-TTS và model | Theo repo gốc | Tải ở lần chạy đầu; tự kiểm tra trước khi dùng thương mại |
| WhisperX, PhoWhisper, DeepFilterNet | Theo repo gốc | Tải khi cài Chế độ C |
| Be Vietnam Pro, Lexend, Nunito | SIL Open Font License | Nằm trong repo |

SFX trong `assets/sfx-th/` do dự án tự sinh bằng code, phát hành cùng giấy phép MIT. Dự án không kèm nhạc nền. Tự thêm nhạc bạn có quyền dùng vào `public/audio/music/` và `assets/music-th/`.

Các bộ tích hợp bổ sung: Motion, Howler.js, Mediabunny, Motion Canvas, Drei và react-three-rapier. Danh sách phiên bản/giấy phép lấy trực tiếp từ dependency lúc đóng gói nằm trong RUNTIME-DEPENDENCIES.json. Bản gốc của các thông báo giấy phép trực tiếp nằm trong THIRD-PARTY-LICENSES; font đi cùng giấy phép OFL trong assets/fonts/licenses.

ffmpeg-skill 3.10.1 của kajisho5 được cài qua npm, giấy phép MIT. Nguồn: https://github.com/kajisho5/ffmpeg-skill . Bộ tải FFmpeg lấy bản Windows từ nhà cung cấp được https://ffmpeg.org/download.html giới thiệu, kiểm SHA-256 và giữ các tệp LICENSE/README của gói tải trong cache. Model và binary tải riêng không được gộp giấy phép vào LICENSE của ứng dụng.