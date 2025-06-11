class AddCartController {
    constructor() {
        this.products = []; // Lưu danh sách sản phẩm trong giỏ (nếu cần)
    }

    async fetchAddCartProducts(token, product, quantity) {
        try {
            const response = await fetch(`https://javelin-advanced-daily.ngrok-free.app/api/cart/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify({ product, quantity }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Dữ liệu trả về từ API:', data);

            if (data.message === 'Item add to cart') {
                console.log('Sản phẩm đã được thêm vào giỏ hàng thành công!');
            } else {
                console.warn('Thông báo từ API:', data);
            }

        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
        }
    }
}

export default AddCartController;