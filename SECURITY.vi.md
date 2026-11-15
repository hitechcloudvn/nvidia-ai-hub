> [English](SECURITY.md) | **Tiếng Việt**

# Chính sách bảo mật

## Phiên bản được hỗ trợ

Các bản vá bảo mật được áp dụng theo phương án tốt nhất có thể (best-effort) cho nhánh mặc định đang hoạt động của kho lưu trữ này.

`NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC` là một giải pháp phần mềm được phát triển và phân phối bởi **Pho Tue SoftWare And Technology Solutions Joint Stock Company** (gồm thương hiệu **HiTechCloud**).

Thông tin công ty chính thức:

- Tên pháp nhân tiếng Việt: **CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ VÀ PHẦN MỀM PHỔ TUỆ**
- Tên pháp nhân tiếng Anh: **Pho Tue SoftWare And Technology Solutions Joint Stock Company**
- Mã số thuế: `0318222903`
- Số D-U-N-S: `557339920`
- Địa chỉ đăng ký: `128 Binh My Street, Binh My Commune, Ho Chi Minh City`

Tên sản phẩm ngắn `NVIDIA AI Hub` và tên sản phẩm đầy đủ `NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC` chỉ cùng một giải pháp phần mềm, trừ khi một văn bản bằng văn bản cụ thể phân biệt rõ chúng.

`NVIDIA`, logo `NVIDIA`, `DGX`, `CUDA` và các tên sản phẩm hoặc nền tảng NVIDIA liên quan là thương hiệu và/hoặc thương hiệu đã đăng ký của **NVIDIA Corporation** và các công ty liên kết. Việc đề cập đến chúng trong kho lưu trữ này chỉ nhằm mục đích mô tả và tương thích, không ngụ ý chứng thực hoặc liên kết trừ khi được nêu rõ bằng văn bản.

Bất kỳ xuất bản bên ngoài, thông báo bảo mật (advisory), thông báo khách hàng hoặc trao đổi khắc phục nào sử dụng tên dự án cùng với nhãn hiệu bên thứ ba đều phải được rà soát về tuân thủ thương hiệu, ghi nhận nguồn và cạnh tranh không lành mạnh trước khi phân phối.

Nếu bạn cần một bản vá bảo mật, hãy tái hiện vấn đề trên nhánh `main` mới nhất trước khi báo cáo.

## Báo cáo lỗ hổng

Nếu bạn tin rằng mình đã phát hiện một lỗ hổng bảo mật trong NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC, **không** mở issue công khai.

Thay vào đó:

1. Chuẩn bị một báo cáo riêng tư với mô tả rõ ràng về vấn đề.
2. Bao gồm các tệp bị ảnh hưởng, giả định triển khai và các bước tái hiện.
3. Mô tả tác động, điều kiện tiên quyết của cuộc tấn công và mọi biện pháp giảm thiểu đã biết.
4. Chỉ cung cấp bằng chứng khai thác (proof of concept) khi thực sự cần thiết để giải thích rủi ro một cách an toàn.

## Nội dung cần cung cấp

Vui lòng cung cấp càng nhiều thông tin sau càng tốt:

- loại lỗ hổng
- thành phần hoặc đường dẫn bị ảnh hưởng
- điều kiện tiên quyết về cấu hình
- các bước tái hiện chính xác
- hành vi mong đợi so với hành vi thực tế
- đánh giá tác động
- biện pháp khắc phục đề xuất, nếu biết

Các lĩnh vực liên quan ví dụ:

- các endpoint FastAPI trong `daemon/`
- hành vi Docker hoặc điều phối container
- script cài đặt và runtime
- nạp recipe và xử lý cấu hình
- cách frontend xử lý dữ liệu không đáng tin cậy
- lộ bí mật hoặc cấu hình mặc định không an toàn

## Kỳ vọng công bố

Vui lòng giữ báo cáo ở chế độ riêng tư cho đến khi vấn đề được điều tra và có bản vá hoặc biện pháp giảm thiểu.

Không công bố chi tiết khai thác, mã bằng chứng công khai hoặc các bước tái hiện mang tính vũ khí hóa trước khi khắc phục có phối hợp.

## Quy trình phản hồi

Các maintainer hướng tới:

1. xác nhận đã nhận được báo cáo
2. kiểm chứng và phân loại vấn đề
3. xác định mức độ nghiêm trọng và phạm vi
4. chuẩn bị bản vá hoặc biện pháp giảm thiểu khi phù hợp
5. truyền đạt hướng dẫn giải quyết

Thời gian phản hồi có thể thay đổi tùy theo chất lượng báo cáo, độ phức tạp và tình trạng sẵn sàng của maintainer.

## Ngoài phạm vi

Các trường hợp sau thường nằm ngoài phạm vi trừ khi chúng gây ra tác động bảo mật rõ ràng, thực tế:

- thiếu các header theo thực hành tốt mà không thể khai thác được
- các cuộc tấn công hoàn toàn lý thuyết, không có đường tái hiện được
- vấn đề chỉ do các sửa đổi cục bộ không được hỗ trợ gây ra
- báo cáo phụ thuộc vào bí mật bị lộ mà người báo cáo đã kiểm soát được
- các khẳng định về từ chối dịch vụ (denial-of-service) không có chi tiết tái hiện thực tế

## Safe Harbor

Nghiên cứu bảo mật thiện chí nhằm cải thiện dự án được chào đón.

Vui lòng:

- tránh xâm phạm quyền riêng tư
- tránh phá hủy dữ liệu
- tránh gián đoạn dịch vụ vượt quá mức tối thiểu cần thiết cho việc kiểm chứng
- tránh truy cập dữ liệu không thuộc về bạn

## Hướng dẫn vận hành

Người dùng triển khai dự án này nên:

- xem xét nguồn recipe trước khi chạy
- tránh commit tệp `.env` hoặc thông tin xác thực
- chạy Docker với các biện pháp kiểm soát an ninh máy chủ phù hợp
- hạn chế mở rộng kết nối mạng khi kiểm thử recipe hoặc tích hợp mới
- giữ Python, Node.js, Docker và các gói hệ thống được cập nhật
