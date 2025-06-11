import CartModel from '../models/cartModel.js';

class QuantityCartViewModel {
    constructor() {
        this.products = [];
    }

    async fetchQuantityCart(token, id, count) {
        try {
            const response = await fetch(`https://javelin-advanced-daily.ngrok-free.app/api/cart/update/?id=${id}&count=${count}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify({ id, count }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Dữ liệu trả về từ API:', data);

            // Kiểm tra nếu dữ liệu trả về là thông điệp thành công
            if (data.message === 'Cart item quantity updated') {
                console.log('Số lượng sản phẩm đã được cập nhật thành công');
            } else {
                console.error('Thông điệp trả về không phải là xác nhận cập nhật:', data);
            }

            // Bạn không cần phải cập nhật lại danh sách sản phẩm vì chỉ có số lượng được thay đổi.
            return this.products; // Trả về sản phẩm cũ mà không cần thay đổi gì

        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    }
}

export default QuantityCartViewModel;
