# 2.1. Tổng quan hệ sinh thái Facebook Ads

> Link: https://tvhs2023.sg.larksuite.com/wiki/Q52ad7GMmohdnixhRecl7efHgJe

## Bốn thuật ngữ nền tảng
Gần như mọi cuộc trò chuyện về Facebook Ads đều xoay quanh bốn từ: Campaign, Ad Set, Ad và Pixel. Nắm được bốn từ này là bạn đã có bộ khung để hiểu phần còn lại.

### 1.1 Bức tranh lớn: cấu trúc 3 tầng
Ba trong bốn thuật ngữ — Campaign, Ad Set, Ad — không đứng riêng lẻ mà lồng vào nhau theo 3 tầng, từ trên xuống. Mỗi tầng trả lời một câu hỏi khác nhau:
- Campaign (Chiến dịch) — Bạn MUỐN GÌ? (mục tiêu)
- Ad Set (Nhóm quảng cáo) — Cho AI xem, chi BAO NHIÊU, hiển thị ở ĐÂU?
- Ad (Quảng cáo) — Cho họ XEM CÁI GÌ? (nội dung)

Cấu trúc 3 tầng: 1 Campaign chứa nhiều Ad Set, mỗi Ad Set chứa nhiều Ad.

| Tầng | Trả lời câu hỏi | Quyết định điều gì | Số lượng |
|---|---|---|---|
| ① Campaign | Bạn muốn gì? | Mục tiêu của chiến dịch | Cấp cao nhất |
| ② Ad Set | Ai · Bao nhiêu · Ở đâu | Đối tượng, ngân sách, vị trí hiển thị | Nhiều Ad Set / 1 Campaign |
| ③ Ad | Cho họ xem gì? | Nội dung quảng cáo (hình, video, chữ) | Nhiều Ad / 1 Ad Set |

**Vì sao chia 3 tầng?** Cấu trúc này cho phép thử nghiệm có tổ chức. Trong cùng một mục tiêu (Campaign), bạn có thể tạo nhiều Ad Set để so sánh các nhóm đối tượng khác nhau, và trong mỗi Ad Set đặt nhiều Ad để xem nội dung nào hiệu quả nhất. Nhờ đó biết chính xác cái gì đang chạy tốt.

### 1.2 Campaign — Chiến dịch
Campaign là tầng cao nhất, là "cái hộp" lớn nhất chứa toàn bộ quảng cáo. Việc quan trọng nhất ở tầng này là chọn MỤC TIÊU (objective) — tức bạn muốn Meta tối ưu để đạt kết quả gì.

Meta hiện có 6 mục tiêu chính:

| Mục tiêu | Meta sẽ tìm người có xu hướng… |
|---|---|
| Nhận biết (Awareness) | ghi nhớ thương hiệu — tiếp cận càng nhiều càng tốt |
| Traffic | bấm vào link để ghé website / landing page |
| Tương tác (Engagement) | like, bình luận, chia sẻ, xem video, nhắn tin |
| Khách hàng tiềm năng (Leads) | để lại thông tin liên hệ |
| Quảng bá ứng dụng (App) | cài đặt và dùng app |
| Bán hàng (Sales) ← TVHs dùng nhiều nhất | mua hàng — mục tiêu quan trọng nhất với mô hình D2C |

**Điểm cần nhớ: Mục tiêu bị KHÓA sau khi tạo.** Một khi Campaign đã tạo, bạn không thể đổi mục tiêu của nó. Muốn dùng mục tiêu khác thì phải tạo Campaign mới. Lý do: mục tiêu quyết định cách thuật toán của Meta học và tối ưu, nên nó không thể đổi giữa chừng.

### 1.3 Ad Set — Nhóm quảng cáo
Ad Set nằm giữa Campaign và Ad. Đây là nơi quyết định 3 điều quan trọng:
- Đối tượng (Audience) — AI: nhắm tới ai (độ tuổi, giới tính, quốc gia, sở thích, hành vi, hoặc nhóm khách cũ).
- Ngân sách & lịch chạy (Budget) — BAO NHIÊU: chi bao nhiêu tiền mỗi ngày (hoặc trọn đời), chạy trong khoảng thời gian nào.
- Vị trí hiển thị (Placement) — Ở ĐÂU: quảng cáo xuất hiện chỗ nào (Facebook Feed, Instagram Stories, Reels, Messenger…).

> Mẹo nhớ: Ngân sách được đặt ở cấp Ad Set — không phải ở cấp Ad. Đây là câu hỏi hay bị nhầm.

### 1.4 Ad — Quảng cáo
Ad là tầng thấp nhất và cũng là thứ người dùng thực sự nhìn thấy trên màn hình. Ở tầng này bạn quyết định nội dung quảng cáo (creative):
- Định dạng: một hình ảnh, một video, carousel (nhiều thẻ lướt ngang), hay collection.
- Nội dung: hình/video, tiêu đề, đoạn mô tả, đường link và nút kêu gọi hành động (CTA).
- Danh tính: quảng cáo hiển thị dưới tên Trang Facebook / tài khoản Instagram nào.

**Đây là nơi Media Creator đóng góp trực tiếp**: Toàn bộ hình ảnh, video, nội dung mà Media Creator sản xuất chính là phần "creative" được đưa vào tầng Ad. Một Ad Set thường có nhiều Ad với các creative khác nhau để so sánh xem nội dung nào thu hút hơn.

### 1.5 Pixel — "con mắt" đo lường
Lưu ý: Pixel KHÔNG nằm trong cấu trúc 3 tầng ở trên. Nó là một công cụ riêng, phục vụ việc đo lường và theo dõi.
Pixel là một đoạn mã nhỏ được gắn lên website của doanh nghiệp. Nhiệm vụ của nó là ghi nhận hành động của người dùng sau khi họ bấm vào quảng cáo — ví dụ: xem sản phẩm, thêm vào giỏ, bắt đầu thanh toán, hoàn tất mua hàng.

**Vì sao Pixel quan trọng đến vậy?** Không có Pixel, Meta không biết ai đã mua hàng sau khi xem quảng cáo. Không biết kết quả thì thuật toán không thể học để tìm thêm người giống những người đã mua — và tiền quảng cáo bị tiêu kém hiệu quả. Với một doanh nghiệp D2C như TVHs, dữ liệu Pixel chính xác là điều kiện sống còn để quảng cáo có lãi.

### Tóm tắt 4 thuật ngữ

| Thuật ngữ | Là gì (một câu) | Trả lời câu hỏi |
|---|---|---|
| Campaign | Cái hộp lớn nhất, nơi chọn mục tiêu chiến dịch | MUỐN GÌ? |
| Ad Set | Nơi đặt đối tượng, ngân sách và vị trí hiển thị | AI · BAO NHIÊU · Ở ĐÂU? |
| Ad | Quảng cáo cụ thể mà người dùng nhìn thấy | XEM CÁI GÌ? |
| Pixel | Mã theo dõi trên web, ghi nhận hành động của khách | KẾT QUẢ RA SAO? |

## Giao diện Ads Manager

### 2.1 Ads Manager là gì?
Ads Manager (Trình quản lý quảng cáo) là công cụ chính để tạo, quản lý và theo dõi quảng cáo trên Facebook và Instagram. Đây là "bàn làm việc" hằng ngày của Media Buyer.

**Phân biệt nhanh 3 "Manager" dễ nhầm**

| Công cụ | Dùng để làm gì |
|---|---|
| Business Manager | Quản lý tài sản chung: tài khoản quảng cáo, Trang, quyền truy cập của nhân sự |
| Ads Manager | Tạo, chạy và theo dõi quảng cáo (nơi bạn làm việc nhiều nhất) |
| Events Manager | Quản lý Pixel / Dataset và các sự kiện được ghi nhận |

### 2.2 Các khu vực chính cần nhận diện

| # | Khu vực | Chức năng |
|---|---|---|
| 1 | Nút Tạo | Bắt đầu tạo Campaign / Ad Set / Ad mới |
| 2 | 3 tab | Chuyển giữa 3 tầng: Chiến dịch › Nhóm quảng cáo › Quảng cáo |
| 3 | Bộ lọc thời gian | Xem dữ liệu theo khoảng ngày (hôm nay, 7 ngày, 30 ngày…) |
| 4 | Công tắc Bật/Tắt | Cho quảng cáo chạy hoặc tạm dừng |
| 5 | Bảng chỉ số | Các cột số liệu hiệu suất (chi tiêu, kết quả, ROAS…) |

> Mẹo nhận diện quan trọng nhất: 3 tab = 3 tầng. Thanh 3 tab ở đầu giao diện tương ứng chính xác với cấu trúc 3 tầng đã học ở Phần 1. Bấm sang tab nào là bạn đang xem ở tầng đó.

### 2.3 Các cột chỉ số bạn sẽ thấy
Ở giai đoạn này, bạn chỉ cần NHẬN RA các cột này tồn tại và hiểu chúng đo cái gì — cách phân tích và tối ưu để lại cho các tuần sau.

| Cột | Ý nghĩa (đơn giản) |
|---|---|
| Chi tiêu (Amount spent) | Đã tiêu bao nhiêu tiền |
| Tiếp cận (Reach) | Bao nhiêu người nhìn thấy quảng cáo |
| Lượt hiển thị (Impressions) | Quảng cáo được hiện ra bao nhiêu lần (một người có thể thấy nhiều lần) |
| CPM | Chi phí cho mỗi 1.000 lượt hiển thị |
| CTR | Tỷ lệ người bấm vào quảng cáo trên số người thấy nó |
| Kết quả (Results) | Số kết quả đạt được theo mục tiêu (vd: số đơn hàng) |
| Chi phí/Kết quả | Trung bình tốn bao nhiêu tiền cho một kết quả |
| ROAS (rất quan trọng với D2C) | Doanh thu thu về trên mỗi đồng chi cho quảng cáo |

## Logic hoạt động tổng quan
Ghép các mảnh lại với nhau, một chiến dịch quảng cáo vận hành theo một vòng khá đơn giản. Bạn thiết lập 4 bước đầu; Meta tự lo phần còn lại và đo lường kết quả:

**Diễn giải nhanh**
- Bước 1–4 (bạn làm): chọn mục tiêu → chọn đối tượng, ngân sách, vị trí → đưa nội dung → xuất bản để gửi Meta duyệt.
- Bước 5 — Đấu giá (Auction): quảng cáo của bạn cạnh tranh với hàng loạt quảng cáo khác. Meta chọn hiển thị dựa trên giá thầu, chất lượng quảng cáo và mức độ liên quan tới người dùng — chứ không đơn thuần ai trả nhiều hơn thì thắng.
- Bước 6 — Phân phối: Meta hiển thị quảng cáo tới đúng nhóm đối tượng bạn đã chọn.
- Bước 7 — Pixel ghi nhận: khi người dùng hành động (xem, thêm giỏ, mua), Pixel ghi lại và gửi dữ liệu về Meta.
- Vòng lặp tối ưu: dữ liệu quay lại giúp Meta học để phân phối tốt hơn, đồng thời giúp Media Buyer biết nên điều chỉnh gì.

**Khái niệm "giai đoạn máy học" (Learning phase)**: Khi một quảng cáo mới bắt đầu chạy, Meta cần thời gian và một lượng dữ liệu nhất định để "học" xem ai là người phù hợp. Giai đoạn này gọi là learning phase. Đây là lý do vì sao thay đổi quá nhiều, quá sớm có thể làm quảng cáo chạy kém — nhưng chi tiết cách xử lý là nội dung của các tuần sau.

## Tự kiểm tra
1. Ngân sách của quảng cáo được đặt ở tầng nào trong 3 tầng?
2. Bạn đang chạy một Campaign nhưng muốn đổi mục tiêu của nó. Có làm trực tiếp được không? Vì sao?
3. Media Creator đóng góp nội dung (hình, video) vào tầng nào?
4. Pixel dùng để làm gì, và vì sao thiếu nó thì quảng cáo dễ kém hiệu quả?
5. Thanh 3 tab trong Ads Manager tương ứng với điều gì bạn đã học?

**Gợi ý đáp án**
1. Ở tầng Ad Set (không phải Ad).
2. Không. Mục tiêu bị khóa sau khi tạo; muốn mục tiêu khác phải tạo Campaign mới, vì mục tiêu quyết định cách thuật toán tối ưu.
3. Tầng Ad — nội dung (creative) chính là phần được đưa vào tầng này.
4. Pixel ghi nhận hành động của khách trên web (xem, thêm giỏ, mua). Thiếu nó, Meta không biết kết quả nên không học để tối ưu, tiền quảng cáo kém hiệu quả.
5. Tương ứng với cấu trúc 3 tầng: Chiến dịch › Nhóm quảng cáo › Quảng cáo.

## Bảng thuật ngữ nhanh

| Thuật ngữ | Nghĩa ngắn gọn |
|---|---|
| Campaign | Chiến dịch — cấp cao nhất, nơi chọn mục tiêu |
| Ad Set | Nhóm quảng cáo — nơi đặt đối tượng, ngân sách, vị trí |
| Ad | Quảng cáo — nội dung người dùng nhìn thấy |
| Pixel | Mã theo dõi trên website, ghi nhận hành động của khách |
| Dataset | "Hộp chứa" dữ liệu mới của Meta; Pixel là một nguồn bên trong |
| Objective | Mục tiêu chiến dịch (đặt ở cấp Campaign) |
| Audience | Đối tượng — nhóm người được nhắm tới |
| Placement | Vị trí hiển thị quảng cáo (Feed, Stories, Reels…) |
| Budget | Ngân sách chi cho quảng cáo |
| Creative | Nội dung sáng tạo: hình, video, tiêu đề, mô tả |
| CTA | Nút kêu gọi hành động (Mua ngay, Tìm hiểu thêm…) |
| Impression | Một lượt quảng cáo được hiển thị |
| Reach | Số người thực sự nhìn thấy quảng cáo |
| CTR | Tỷ lệ bấm vào quảng cáo trên số lượt thấy |
| CPM | Chi phí trên mỗi 1.000 lượt hiển thị |
| CPC | Chi phí trên mỗi lượt bấm |
| CPA | Chi phí trên mỗi kết quả (vd: mỗi đơn hàng) |
| ROAS | Doanh thu thu về trên mỗi đồng chi quảng cáo |
| Auction | Cơ chế đấu giá quyết định quảng cáo nào được hiển thị |
| Learning phase | Giai đoạn Meta "học" để phân phối tối ưu khi ad mới chạy |
| Ads Manager | Công cụ tạo, quản lý và theo dõi quảng cáo |
| Events Manager | Nơi quản lý Pixel/Dataset và các sự kiện |

## Xác nhận hoàn thành & bước tiếp theo
Checklist — bạn đã sẵn sàng:
- Giải thích được 4 thuật ngữ Campaign · Ad Set · Ad · Pixel và mối quan hệ giữa chúng.
- Nhận ra được 5 khu vực chính trên giao diện Ads Manager.
- Mô tả được luồng hoạt động tổng quan của một chiến dịch.

Chữ hiển thị trên hình theo nhận diện thương hiệu: Thành Vinh Holdings.
