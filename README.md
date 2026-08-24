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

Mở bằng Live Server. Nút ◐ ở header bật/tắt dark mode để kiểm tra giao diện.

## Deploy

Sau khi push nhánh `main`, bật GitHub Pages với **Deploy from a branch**. URL dự kiến:

https://dungtri475-commits.github.io/tkw_2551050040_Dung/

## Sẽ làm lại nếu có thêm thời gian

Header và footer hiện được lặp lại ở ba file HTML tĩnh. Với dự án lớn hơn, chúng nên được đưa vào layout/component dùng chung bằng template engine hoặc framework để chỉ cần sửa ở một nơi.
