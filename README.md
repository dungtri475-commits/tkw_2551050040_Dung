# Generation — Buổi 3

Website giới thiệu nền tảng lưu giữ gia phả trực tuyến, xây bằng HTML và Tailwind CSS v4.

## Các trang

- `index.html` — Trang chủ, đã responsive từ 360px đến desktop.
- `pricing.html` — Bảng giá, bảng so sánh tính năng cuộn ngang trên mobile và câu hỏi thanh toán.
- `contact.html` — Form liên hệ có nhãn thật, trạng thái focus và thuộc tính hỗ trợ tiếp cận.

## Chạy dự án

```bash
npm install
npm run build
```

Mở bằng Live Server. Nút sáng/tối ở header bật/tắt dark mode để kiểm tra giao diện.

## Tương tác bổ sung

Ở trang Liên hệ, nút **Sao chép email** giúp người dùng đưa địa chỉ hỗ trợ vào clipboard chỉ bằng một lần bấm hoặc Tab + Enter.
Trạng thái nút đổi thành “Đã sao chép” để xác nhận hành động, thay vì buộc người dùng tự kiểm tra.
Tương tác này rút ngắn thao tác khi người dùng muốn gửi email từ ứng dụng khác.

## Deploy

Sau khi push nhánh `main`, bật GitHub Pages với **Deploy from a branch**. URL dự kiến:

https://dungtri475-commits.github.io/tkw_2551050040_Dung/

