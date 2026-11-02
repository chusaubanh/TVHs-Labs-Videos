# Quy chuẩn lời đọc chuỗi Bài viết về AI (Chế độ B)

> Chép nguyên văn từ `docs/tham-khao-repo-cu/SKILL.md` (dòng 559-620) ngày 31/10/2026. Áp cho `input/Bài viết về AI/`; thư mục khác dùng `QUY-CHUAN-KICH-BAN.md`. Bỏ qua tên lệnh và file của repo cũ (`scene-kit`, `audit_frame.py`, `beatTimes`, `_cdkh1b_w2.mjs`, `sync:check`).

### Chế độ B — Chuỗi bài AI (`input/Bài viết về AI/`)

1. Được viết lời đọc mới theo giọng "mình – bạn"; áp đủ nguyên tắc 1–16 và các ràng buộc 3–12 dưới đây. *(Các ràng buộc 3–12 đã distill từ bộ skill viral bên ngoài vào thẳng file này ngày 08/10/2026 — đọc ở đây, không đọc lại bản vendor.)*
2. **Khoảng 3 phút.** Giọng TTS hiện tại đọc khoảng **215 từ/phút** (đo trên 3 video ngày 25/09) → lời đọc khoảng **600–680 từ**.
3. **Ràng buộc 3-Layer Hook chuẩn Viral (`viral-hooks`):**
   - Mọi video bắt buộc đồng bộ 3 lớp trong 3 giây đầu tiên:
     * **Visual Hook (Lớp hình):** Tranh vẽ SVG mang tính ngắt nhịp chú ý (Pattern Interrupt — tình huống kịch tính, sự cố, mâu thuẫn đối lập). Cấm mở đầu bằng khung hình tĩnh hay chuyển cảnh chậm.
     * **Verbal Hook (Lớp lời đọc):** Câu thoại mở đầu $\le 3$ giây (dưới 15 từ), chạm ngay vào nỗi đau hoặc tuyên bố đảo ngược niềm tin. **CẤM TUYỆT ĐỐI câu hỏi khởi động chậm (throat-clearing)** như: *"Có bạn nào từng..."*, *"Chào các bạn hôm nay..."*, *"Bạn có bao giờ tự hỏi..."*.
     * **Text Overlay (Lớp chữ tiêu đề):** 3 đến 7 từ giật điểm chú ý (`MẤT TRẮNG BUỔI SÁNG`, `AI BỊA SỐ`), tuyệt đối không chép lại câu thoại.
   - **Khai báo Hook Archetype:** Chọn 1 trong các Archetypes đã được kiểm chứng: `Contrarian` (Đảo ngược niềm tin), `Investigator` (Bóc trần sự thật ngầm hiểu), `Teacher` (Kết quả cụ thể bất ngờ), `Experimenter` (Thử nghiệm thực tế).
4. **Ràng buộc cấu trúc giữ chân người xem (`viral-short-form`):**
   - **Retention Curve:** Hook (0–3s) $\rightarrow$ Escalation (3–30s: leo thang kịch tính, đào sâu mâu thuẫn) $\rightarrow$ Payoff (30–150s: cách giải quyết mới, 3 việc thật cụ thể) $\rightarrow$ Actionable CTA (150–180s: kêu gọi bình luận/hành động cụ thể, gắn liền với bài tiếp theo).
5. Gọi tên công cụ là **"ChatGPT trả phí"** và **"Claude trả phí"**, không viết "ChatGPT công ty cấp". Nhắc cả hai song hành.
6. **Không mượn trải nghiệm của video tham khảo** (`input/Cách Mình Dùng Claude Cowork…`). Video đó của người khác: chỉ học cách hành văn, không nêu tên, không chép câu chuyện hay con số của họ (*"không xuất phát từ ngành IT"*, *"thề luôn ngán paperwork"*, *"15–30 phút xuống 10 phút"*, *"thuê designer 2 triệu"*). Trải nghiệm thật đã xác nhận của người kể: dùng AI lên kế hoạch ngày; dùng AI viết SOP; không dùng AI để viết, chỉ để phản biện — **chưa có số phút thật, không tự điền**. Cần chuyện khác thì dùng tình huống giả định nói rõ là "tưởng tượng".
7. Phần text đăng dưới video **không kể lại video** — chỉ trả lời: bắt đầu từ đâu · thao tác thế nào · thao tác ở đâu.
8. **Chữ trên màn hình là bản kể cho người xem tắt tiếng (distill 08/10/2026).** Khoảng 85% người xem video xã hội ở chế độ im lặng, nên nếu tắt tiếng mà không hiểu video nói gì thì coi như video không tồn tại. Chữ khoá trên khung hình phải tự kể được mạch chính — vẫn giữ luật ≤ 8 từ/khối và không bao giờ chép nguyên văn lời đọc (mục 0). Chữ phải nằm trong vùng an toàn: tránh 180px trên và 320px dưới của khung 1080×1350 (chỗ UI nền tảng che).
9. **Một lời kêu gọi duy nhất mỗi video, nhắm vào Lưu hoặc Gửi.** Lưu (nội dung hướng dẫn, danh sách, quy trình) và Gửi cho đồng nghiệp (câu chuyện, tình huống nhận ra mình) là hai hành động được thuật toán tính nặng nhất; Thích và Theo dõi gần như không mua được phân phối. Chồng nhiều lời kêu gọi làm loãng tất cả — chọn **một** hành động khớp với dạng nội dung, đặt quanh mốc 70% thời lượng.
   - **CẤM mồi tương tác (engagement bait)** — bị tính là vi phạm và bị trừ phân phối: *"comment CÓ để nhận link"*, *"tag một người bạn"*, *"like để ra phần 2"*, *"theo dõi để xem thêm"*, *"lưu lại đi kẻo mất"*. Thay bằng lý do thật: *"Lưu lại để lúc làm thì mở ra làm theo từng bước"*.
10. **Text đăng dưới video là mặt SEO, hashtag thì không.** Nền tảng đọc text đăng để phân loại và cho tìm kiếm trong app; hashtag không còn là đòn phân phối. Câu đầu phải tự đứng được (nó hiện trước nút "xem thêm") và chứa từ khoá chính một lần, sớm. Tối đa **3–5 hashtag đúng ngách** — không tường 20–30 tag, không `#fyp`, `#xuhuong` vô nghĩa. Thông tin dài (link wiki, tên công cụ, các bước) để ở bình luận ghim, không nhồi vào text đăng.
11. **Chốt giữ chân theo độ dài (completion rate).** Tỷ lệ xem hết là cổng quyết định phân phối, nặng hơn mọi lượt thích. Mốc làm việc: **~70%** cho clip 15–30s · **~50%** cho 30–60s · **~40%** cho 60s+. Video 3 phút của chuỗi này nằm ở bậc khó nhất, nên:
    - Giữ được **≥ 85% người xem qua giây thứ 3** là điều kiện sống còn — đó là lý do luật 3-Layer Hook ở mục 3 nghiêm ngặt đến vậy.
    - Thiết kế cảnh cuối **mời quay lại cảnh đầu** (vòng lặp): câu kết nối lại hình ảnh của hook. Vòng lặp được tính là xem lại.
    - Mỗi câu phải có một nhịp hình mới lắp thêm vào cảnh (mục "CHUẨN CẢNH THEO VIDEO WIKI") — giữ chân bằng việc khung dày lên liên tục, không bằng việc cắt cảnh liên tục.
12. **Ý tưởng là một hệ thống, không phải cảm hứng.** Bí ý tưởng gần như luôn là thiếu **góc tiếp cận**, không phải thiếu **chủ đề**: một chủ đề có hàng trăm góc. Khi lên danh sách video cho chuỗi, mỗi dòng phải ghi rõ *chủ đề + góc + hành động mong muốn (Lưu/Gửi)*, không ghi mỗi chủ đề. Trang giấy trắng không sinh ra ý tưởng — ràng buộc mới sinh ra ý tưởng (một ngách, một dạng nội dung, một nỗi đau cụ thể của dân Back Office).

- **CẤM BỐ CỤC SLIDE THUYẾT TRÌNH (Anti-Slide Rut Rule — Chốt 07/10/2026):** Tuyệt đối cấm cấu trúc rập khuôn `Tiêu đề H1 lớn cố định ở trên + Khối tranh 1 bên + Cột thẻ chips 1 bên + Thanh hộp bar ở đáy`. Cấm lặp lại cùng một wireframe bố cục cho nhiều cảnh. Video phải mang ngôn ngữ điện ảnh chuyển động, không phải slide thuyết trình bấm Next.
- **Story-Driven Freestyle Canvas:** Toàn bộ khung hình 1080×1350 là một sân khấu thị giác tự do (Visual Stage) dựng từ con số 0. Câu thoại nói về điều gì thì vẽ đúng bối cảnh đó (màn hình rung tin nhắn, tệp Excel bay vào bàn, luồng dữ liệu SVG kết nối, máy quét chuẩn hóa, bục phát biểu chịu trách nhiệm...).
- **CHUẨN CẢNH THEO VIDEO WIKI (chốt 08/10/2026 — thay luật Phân rã Cảnh Ngắn 07/10):**
  Đo trên 5 video Wiki đã nghiệm thu (`aibasic`, `now2`, `integ1`, `dauthau2`, `cdkh1b`)
  so với bản 29 cảnh ngắn bị trả lại vì "đơn giản, trống trải":

  | | Wiki (TB 5 video) | bản 29 cảnh bị trả |
  | --- | ---: | ---: |
  | số cảnh / video ~2,5 phút | **9** | 29 |
  | độ dài một cảnh | **10–17 giây** | 5,1 giây |
  | câu / cảnh | **2–4** | 2,1 |
  | **hình vẽ / cảnh** (rect·circle·path) | **23–54** | 9 |
  | lệnh chuyển động / cảnh | 20–28 | 31 |

  Rút ra: vấn đề KHÔNG phải thiếu chuyển động (bản bị trả còn nhiều lệnh động hơn
  Wiki) mà là **vẽ quá ít** và **cắt cảnh quá nhanh nên mỗi cảnh không kịp dày lên**.

  Luật áp cho mọi video từ nay:
  1. **8–14 cảnh cho một video 2,5–3 phút**, mỗi cảnh **10–17 giây**, gom **2–4 câu**
     cùng một ý vào một cảnh. Không cắt cảnh theo từng câu.
  2. **Tối thiểu 25 hình vẽ mỗi cảnh.** Vẽ cả bối cảnh (người ngồi bàn, màn hình có
     nội dung, tệp bay, thư mục mở, trục có nút trượt, bảng có dòng số), không phải
     một biểu tượng đặt trong vòng tròn rồi gắn nhãn chữ.
  3. **Cấm hộp viền rỗng ruột.** Thẻ cao mà bên trong trống 60% là lỗi — cổng
     `audit_frame.py` tính viền thẻ là "đã lấp đầy" nên KHÔNG bắt được, phải tự soi mắt.
  4. **Cảnh lắp dần suốt chiều dài của nó**: khung mở ra gần như trống rồi mỗi câu
     lắp thêm một lớp, mỗi mảnh kèm nhãn của nó — xem `_cdkh1b_w2.mjs` làm mẫu.
  5. Hợp đồng một câu = một nhịp hình vẫn giữ nguyên: `beatTimes(N)` với N = số câu
     của cảnh, nhịp i đổi hình đúng lúc câu i bắt đầu.
- **Hình và chữ phải hiện đúng lúc lời đọc nhắc tới nó** *(chị Duyên nhắc 30/09/2026: "voice chưa
  khớp thời điểm text xuất hiện", coi nặng như lỗi chính tả)*. Mỗi câu là một
  `voiceSegments` riêng và một nhịp hình riêng; hình/chữ của câu hiện đúng lúc câu bắt đầu.
  Sau render, `npm run sync:check` trích ảnh ở đầu và cuối từng câu: đầu câu hình của câu đã
  hiện, cuối câu hình của câu sau chưa hiện.
- **Không để lỗi chính tả tới tay người duyệt.** Trước khi render: soát chính tả toàn bộ `voiceText` và chữ trên thẻ, và **so khớp lại với tài liệu gốc**. Người duyệt chỉ nên phải góp ý bố cục, thiết kế.
- **Duyệt kịch bản trước khi dựng.** Gửi `script-review.md` (bảng) cho người duyệt đọc trước khi render full — sửa trên kịch bản rẻ hơn sửa trên video đã dựng. `script.txt` chỉ là lời đọc thô cho CapCut.
- **Nhịp gửi duyệt:** mỗi video có ngày dự kiến gửi duyệt; trong lúc chờ feedback video trước thì làm video sau (lịch gối đầu).
