---
name: tu-van-5-why
description: Khuôn tự vấn 5 WHY bắt buộc của TVHS (người dùng chốt 09/10/2026). Dùng mỗi khi người dùng yêu cầu 5 Why, tự vấn, phân tích nguyên nhân gốc của một sự cố hoặc lỗi lặp lại trong pipeline.
---

# Tự vấn 5 WHY — khuôn bắt buộc (người dùng chốt 09/10/2026)

Distill từ hai tài liệu nội bộ TVHs người dùng đưa ngày 09/10/2026 ("5 Why: hỏi vì sao để tìm đúng chỗ cần sửa" bản 1.0 và
"Mẫu đào 5 Why" bản 2.0, bản A). Tự vấn **không phải giải thích**: nghe xong thấy hiểu mà không chỉ được chỗ sửa là lời giải thích.
Viết ra đủ sáu mục, đúng thứ tự, không đào trong đầu:

1. **Bối cảnh bằng thực tế:** ai/ở đâu (file, lệnh, bộ cảnh cụ thể), lần xảy ra gần nhất (ngày), số lần lặp, ít nhất một con số đo được.
2. **Vấn đề một câu + câu why của phiên:** vấn đề là hiện tượng có số, chưa có chữ "vì"/"do". Câu why mở bằng "Tìm ra vì sao…" —
   không phải what (kết quả muốn có), không phải how (cách làm). Hỏi vào thứ mình có quyền (vd. "vì sao không phát hiện", không phải "vì sao người dùng khó").
3. **Định nghĩa từ mơ hồ** kèm số ("lỗi rule" = dòng ✖ của `rules_lint`; "báo sạch" = câu tôi viết cho người dùng).
4. **Chuỗi hỏi dạng bảng:** Câu hỏi · Trả lời · **Căn cứ** (dữ liệu/sự kiện thật; đang đoán thì ghi "giả thuyết, kiểm bằng…") · **Phép thử**.
   Câu 1 lấy đúng chữ của câu why; câu sau bám đúng câu trả lời ngay trước. Bốn phép thử cho mỗi câu trả lời:
   **100%** (A gây ra kết quả trong mọi trường hợp) · **Trừ** (bỏ A thì hết) · **Cơ chế** (không phải trạng thái, phẩm chất, thói quen, cảm xúc, hậu quả tương lai) · **Trong tầm**.
   Trượt thì hỏi lại cùng cấp. Cấm: câu nói ngược, câu luôn đúng ("vội", "quên", "ưu tiên tốc độ", "chủ quan"), đổ ra ngoài, **dừng ở người kể cả chính mình**
   ("tôi cẩu thả" chỉ là mô tả → hỏi tiếp cơ chế nào cho phép). Ghi các nhánh chưa đi; chọn nhánh bằng số liệu. Đọc ngược bằng "vì vậy" không được gãy.
5. **Điểm dừng:** chọn một câu làm thủ phạm chính; đủ ba điều kiện (chỉ ra việc cụ thể · trong tầm · làm xong thì khó tái diễn); gọi **tên cơ chế cụ thể**
   (file, hàm, bước quy trình), rồi hỏi "vì sao ta chưa làm cơ chế đó". Không đào quá sâu tới "bản chất".
6. **Hành động và kiểm chứng:** hành động bơm vào chỗ rỗng (không phải "sẽ cẩn thận hơn"); kiểm **cơ chế cũ đã có chưa, vì sao không chạy** trước khi xây mới;
   một việc làm ngay; phép đo kiểm lại và **ngày kiểm tái diễn** sau 2–4 tuần. Tự chấm 12 tiêu chí của mẫu trước khi gửi.
