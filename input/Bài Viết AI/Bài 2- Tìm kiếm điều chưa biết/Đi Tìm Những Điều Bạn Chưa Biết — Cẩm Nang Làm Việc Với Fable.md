# Đi Tìm Những Điều Bạn Chưa Biết — Cẩm Nang Làm Việc Với Fable

*Bản biên dịch – phóng tác tiếng Việt (rút gọn) từ bài "A Field Guide to Fable: Finding Your Unknowns" của Thariq (kỹ sư đội Claude Code, Anthropic, 07/2026). Bài gốc: x.com/trq212.*

---

## Bản đồ không phải là lãnh thổ

Mọi thứ bạn đưa cho Claude — prompt, tài liệu, ngữ cảnh — chỉ là *bản đồ*: hình dung của bạn về công việc. Còn *lãnh thổ* là công việc thật: dữ liệu thật, ràng buộc thật mà chỉ người trong cuộc mới nắm.

Bản đồ không bao giờ vẽ hết lãnh thổ. Phần chênh lệch là **những điều chưa biết (unknowns)** — và tại mỗi điểm chưa biết, Claude không dừng lại chờ bạn, nó *đoán*. Việc càng lớn, số điểm phải đoán càng nhiều, xác suất đoán trượt càng cao. Kết quả "sai sai" thường không đến từ model yếu, mà từ số lần model phải đoán thay bạn.

Nút thắt chất lượng giờ không còn nằm ở model, mà nằm ở việc bạn làm sáng tỏ được bao nhiêu điều chưa biết. Và kế hoạch chu đáo đến mấy cũng không đủ — nhiều vấn đề chỉ lòi ra giữa chừng. Vì vậy đây là việc làm **trước, trong và sau** khi giao việc, không phải khai báo một lần rồi thôi.

## Bốn loại điều-chưa-biết

| Nhóm | Bản chất | Mức rủi ro |
|---|---|---|
| **Known Knowns** — biết mình biết | Đã nói rõ trong prompt. | An toàn |
| **Known Unknowns** — biết mình chưa biết | Bạn ý thức được là mình còn thiếu. | Dễ xử lý |
| **Unknown Knowns** — không biết là mình biết | Hiển nhiên đến mức chẳng bao giờ viết ra, nhưng thấy là nhận ra ngay. | Hay bị bỏ sót nhất |
| **Unknown Unknowns** — không biết là mình không biết | Chưa từng cân nhắc tới — kể cả việc không biết "tốt" có thể tốt đến đâu. | Nguy hiểm nhất |

Người điều khiển agent giỏi nhất không phải người không có unknowns, mà là người *luôn mặc định chúng tồn tại*. Chỉ dẫn quá chi tiết, Claude răm rắp làm theo cả khi lẽ ra nên rẽ hướng; quá mơ hồ, nó tự chọn theo thông lệ chung — chưa chắc hợp việc của bạn. Không tính đến unknowns, bạn thua ở cả hai đầu.

## Giúp Claude chính là giúp bạn

Đi tìm unknowns không phải việc bạn phải làm một mình — Claude tra cứu nhanh hơn, kiến thức nền rộng hơn, và hoàn toàn có thể khui ra giúp bạn những điều bạn chưa biết. Điều kiện duy nhất: **cho nó biết bạn đang đứng ở đâu** — phần nào mình chắc, phần nào còn mù mờ. Nói rõ điều đó, Claude trở thành người đồng hành tư duy; giấu nó đi, Claude chỉ còn là nơi thả lệnh vào rồi chờ kết quả.

---

## Tám kỹ thuật theo vòng đời công việc

| Giai đoạn | Kỹ thuật | Dùng khi | Mẫu câu |
|---|---|---|---|
| **Trước** | 1. Dò điểm mù | Việc xa lạ — không biết phải hỏi gì, "tốt" trông ra sao | *"Tôi chưa từng làm mảng này. Làm một lượt blindspot pass giúp tôi tìm các unknown unknowns liên quan."* |
| **Trước** | 2. Brainstorm & dựng thử | Tiêu chí kiểu "thấy mới định nghĩa được" (thẩm mỹ, bố cục) | *"Làm 4 hướng khác nhau thật xa, dùng dữ liệu giả, để tôi phản ứng."* |
| **Trước** | 3. Để Claude phỏng vấn | Brainstorm xong vẫn còn khoảng mờ | *"Phỏng vấn tôi từng câu về những gì còn mơ hồ, ưu tiên câu ảnh hưởng lớn nhất."* |
| **Trước** | 4. Đưa mẫu tham chiếu | Không diễn đạt nổi bằng lời | Đưa thẳng một mẫu thật (báo cáo cũ, bài viết ưng ý) — một ví dụ thật thắng mười dòng mô tả. |
| **Trước** | 5. Duyệt kế hoạch | Việc nhiều bước, sắp bắt tay làm | *"Phác kế hoạch, mở đầu bằng những quyết định tôi dễ muốn chỉnh nhất — phần máy móc để cuối."* |
| **Trong** | 6. Nhật ký thực thi | Đang làm dở, gặp ca phát sinh | *"Nếu gặp điểm buộc phải lệch kế hoạch, ghi lại vào 'Deviations' rồi tiếp tục."* |
| **Sau** | 7. Bản thuyết trình | Cần trình duyệt / xin đồng thuận | Đóng gói kết quả + bối cảnh + giả định đã dùng thành một tài liệu duy nhất, trả lời trước câu người duyệt sẽ hỏi. |
| **Sau** | 8. Bài kiểm tra ngược | Trước khi chốt dùng kết quả | *"Ra cho tôi bài quiz về những gì vừa thay đổi — tôi chỉ dùng khi vượt qua tuyệt đối."* |

**Nguyên tắc chọn dùng:** việc nhỏ, quen → giao thẳng, khỏi cần kỹ thuật nào. Việc quan trọng hoặc lạ → dùng 1–2 kỹ thuật phù hợp giai đoạn, không cần dùng đủ cả bảy.

---

## Case study: video ra mắt Fable

Video ra mắt Fable được biên tập hoàn toàn bởi Claude Code — trong khi tác giả không phải dân dựng phim. Anh khởi đầu từ cái đã biết (Claude cắt được video, bóc được băng), rồi hỏi ngược để hiểu độ chính xác. Muốn giao diện khớp nhịp lời nói nhưng chưa chắc khả thi → dựng thử trước khi làm thật. Đến khâu color grading, anh nhận ra vấn đề không phải "chọn phiên bản nào đẹp hơn" mà là **anh còn chẳng biết thế nào là đẹp** — nên đổi hướng, nhờ Claude dạy mình về color grading để lộ ra chính những điều mình chưa biết.

---

## Lời kết

Model càng giỏi, cách giao việc đúng càng đưa bạn đi xa. Tác vụ dài trả sai thường vì thiếu thời gian định nghĩa unknowns, chứ không phải model kém.

Mỗi bản giải trình, mỗi lần brainstorm, mỗi cuộc phỏng vấn, mỗi mẫu tham chiếu — đều là cách **trả giá rẻ để biết điều mình chưa biết, trước khi nó đắt đỏ để sửa.**
