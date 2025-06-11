# Dự Án WebBooks

[English | Tiếng Việt (Hiện tại)](README.md)

<div align="center">
  <img src="https://raw.githubusercontent.com/TagKrj/Bookstore/master/webBookHome.png" alt="WebBooks Preview" width="100%" />
</div>


## Tổng Quan
WebBooks là một ứng dụng web thương mại điện tử cho cửa hàng sách, cho phép người dùng duyệt, tìm kiếm và mua sách trực tuyến. Nó cung cấp các tính năng như xác thực người dùng, quản lý giỏ hàng, danh sách yêu thích, xử lý đơn hàng và tích hợp thanh toán.

## Cấu Trúc Dự Án
Dự án tuân theo mô hình kiến trúc MVC (Model-View-Controller):

- **models/**: Chứa các mô hình dữ liệu đại diện cho các thực thể miền (sách, mặt hàng giỏ hàng, đơn hàng, v.v.)
- **views/**: Chứa các thành phần giao diện người dùng và mẫu để hiển thị dữ liệu cho người dùng
- **controllers/**: Chứa logic xử lý tương tác của người dùng và quản lý luồng dữ liệu giữa các mô hình và khung nhìn
- **scripts/**: Chứa các tệp JavaScript cho chức năng cụ thể của trang
- **styles/**: Chứa các stylesheet CSS cho giao diện người dùng
- **assets/**: Chứa hình ảnh và các tài nguyên tĩnh khác

## Tính Năng

### Xác Thực Người Dùng
- Hệ thống đăng ký và đăng nhập người dùng
- Quản lý hồ sơ người dùng
- Xử lý token xác thực để truy cập API an toàn

### Danh Mục Sách
- Duyệt sách theo danh mục
- Chức năng tìm kiếm
- Trang chi tiết sách với mô tả, giá và đánh giá
- Phần sách nổi bật

### Giỏ Hàng
- Thêm sách vào giỏ hàng
- Cập nhật số lượng sách
- Xóa sách khỏi giỏ hàng
- Tính tổng giỏ hàng

### Danh Sách Yêu Thích
- Thêm/xóa sách vào danh sách yêu thích cá nhân
- Chuyển mặt hàng từ danh sách yêu thích sang giỏ hàng

### Quy Trình Thanh Toán
- Quản lý nhiều địa chỉ giao hàng
- Tạo, chỉnh sửa và xóa địa chỉ
- Tóm tắt và xác nhận đơn hàng
- Nhiều phương thức thanh toán

### Quản Lý Đơn Hàng
- Xem lịch sử đơn hàng
- Theo dõi trạng thái đơn hàng
- Chi tiết đơn hàng

## Chi Tiết Kỹ Thuật

### Tích Hợp API
Ứng dụng kết nối với backend API RESTful tại `https://javelin-advanced-daily.ngrok-free.app/api/` xử lý:
- Lưu trữ và truy xuất dữ liệu
- Xác thực người dùng
- Xử lý đơn hàng
- Tích hợp thanh toán

### Tổ Chức Mã

#### Models
- **productModel.js**: Đại diện cho một sản phẩm sách với các thuộc tính như tiêu đề, giá, mô tả
- **cartModel.js**: Đại diện cho các mặt hàng trong giỏ hàng
- **orderModel.js**: Đại diện cho đơn đặt hàng của khách hàng
- **addressModel.js**: Quản lý địa chỉ giao hàng của người dùng
- **paymentModel.js**: Xử lý phương thức thanh toán và giao dịch

#### Controllers
- **addCartController.js**: Xử lý việc thêm mặt hàng vào giỏ hàng
- **cartController.js**: Quản lý các hoạt động giỏ hàng
- **productController.js**: Lấy và hiển thị dữ liệu sách
- **loginController.js**: Xử lý xác thực người dùng
- **registerController.js**: Quản lý đăng ký người dùng
- **searchController.js**: Xử lý các truy vấn tìm kiếm
- **orderController.js**: Quản lý việc tạo và lịch sử đơn hàng
- **paymentController.js**: Xử lý các giao dịch thanh toán

### Luồng Dữ Liệu
1. Controllers lấy dữ liệu từ API
2. Dữ liệu được chuyển đổi thành các phiên bản mô hình
3. Views hiển thị dữ liệu cho tương tác của người dùng
4. Hành động của người dùng kích hoạt các phương thức controller
5. Controllers cập nhật các mô hình và API khi cần thiết

## Bắt Đầu

### Yêu Cầu
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Kết nối internet

### Chạy Ứng Dụng
1. Sao chép kho lưu trữ
2. Mở tệp HTML chính trong trình duyệt web
3. Hoặc sử dụng máy chủ phát triển cục bộ (như Live Server trong VS Code)

## Hướng Dẫn Phát Triển

### Thêm Tính Năng Mới
1. Tạo hoặc cập nhật (các) mô hình liên quan
2. Triển khai logic controller để xử lý tính năng
3. Tạo hoặc cập nhật khung nhìn tương ứng
4. Kết nối mọi thứ lại với nhau bằng cách sử dụng trình lắng nghe sự kiện và thao tác DOM

### Giao Tiếp API
Ví dụ về việc thực hiện yêu cầu API:

```javascript
// Ví dụ về việc thêm một mặt hàng vào giỏ hàng
async function addToCart(token, productId, quantity) {
    try {
        const response = await fetch(`https://javelin-advanced-daily.ngrok-free.app/api/cart/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify({ product: productId, quantity }),
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
        throw error;
    }
}
```