import CartController from '../../controllers/cartController.js';
import QuantityController from '../../controllers/quantityCartController.js';
import DeleteController from '../../controllers/deleteCartController.js';
import PaymenController from '../../controllers/paymentControler.js';
import PaymentModel from '../../models/paymentModel.js';
import AddressDefaultController from '../../controllers/addressDefaultController.js';

class CartView {
    constructor() {
        this.cartController = new CartController();
        this.selectedItems = new Set(); // Tập hợp để lưu các mục được chọn
        this.quantityCartController = new QuantityController();
        this.deleteCartController = new DeleteController();
        this.paymentController = new PaymenController();
        this.addressDefaultController = new AddressDefaultController();
    }

    // Hiển thị sản phẩm ra giỏ hàng
    async fetchCartProducts() {
        const token = localStorage.getItem('authToken');
        await this.cartController.fetchCartProducts(token);
        await this.addressDefaultController.fetchAddressDefault(token);

        const cartHtml = this.cartController.products.map((product, index) =>
            `  <div class="item" data-index="${index}">
                    <img src="${product.product.imageUrls[0]}"
                        alt="">
                    <div class="productInfo">
                        <h3>${product.product.title}</h3>
                        <p>Giá: ${product.product.price}đ</p>
                    </div>
                    <div class="quantity">
                        <button class="down" data-index="${index}">-</button>
                        <input type="number" class="numberInput" value="${product.quantity}" min="1" max="100" step="1" data-index="${index}">
                        <button class="up" data-index="${index}">+</button>
                    </div>
                    <i data-index="${index}" class="bi bi-x-circle-fill"></i>
                </div>`
        ).join('');

        const cartContainer = document.querySelector('.productCart');
        if (cartContainer) {
            cartContainer.innerHTML = cartHtml;
        }
        this.payment();
        this.setBorderRight();
        this.attachEventListeners();


    }

    // Hàm thanh toán
    payment() {
        if (this.selectedItems.size > 0) {
            const paymentButton = document.getElementById('paymentButton');
            paymentButton.addEventListener('click', () => {
                this.checkout();
            });
        }
    }

    // Hàm sự kiện thêm, giảm số lượng, xóa sản phẩm
    attachEventListeners() {
        const token = localStorage.getItem('authToken');
        // Tăng số lượng
        document.querySelectorAll('.up').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const index = button.dataset.index;
                const input = document.querySelector(`.numberInput[data-index="${index}"]`);
                if (input) {
                    input.stepUp(); // Tăng số lượng
                    const value = parseInt(input.value);
                    this.updateQuantity(token, index, value);
                }
            });
        });

        // Giảm số lượng
        document.querySelectorAll('.down').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const index = button.dataset.index;  // Lấy index từ data-index của nút
                const input = document.querySelector(`.numberInput[data-index="${index}"]`); // Lấy input dựa trên data-index
                if (input) {
                    input.stepDown(); // Giảm số lượng
                    const value = parseInt(input.value); // Lấy giá trị mới của input
                    this.updateQuantity(token, index, value);
                }
            });
        });

        // Xóa sản phẩm
        document.querySelectorAll('.bi-x-circle-fill').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const index = button.dataset.index;
                this.deleteProduct(token, index);
            });
        });

        // Thanh toán
        const checkoutButton = document.getElementById('checkoutButton');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                if (this.selectedItems.size > 0) {
                    this.checkout();
                } else {
                    alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
                }
            });
        }
    }

    // Hàm click với border-right
    setBorderRight() {
        const cartItems = document.querySelectorAll('.item');

        cartItems.forEach((item, index) => {
            if (this.selectedItems.has(index)) {
                item.style.borderRight = '8px solid #218838';
            }

            item.addEventListener('click', () => {
                if (!this.selectedItems.has(index)) {
                    item.style.borderRight = '8px solid #218838';
                    this.selectedItems.add(index);
                } else {
                    item.style.removeProperty('border-right');
                    this.selectedItems.delete(index);
                }

                this.renderPrice();
            });
        });
    }

    // Hàm cập nhật số lượng
    async updateQuantity(token, index, quantity) {
        const product = this.cartController.products[index];
        if (product) {
            try {
                await this.quantityCartController.fetchQuantityCart(token, product.id, quantity);
                await this.fetchCartProducts();
                this.renderPrice();
            } catch (error) {
                console.error('Lỗi khi cập nhật số lượng:', error);
            }
        }
    }

    // Hàm xóa sản phẩm
    async deleteProduct(token, index) {
        const product = this.cartController.products[index];
        if (product) {
            try {
                await this.deleteCartController.fetchDeleteCart(token, product.id);
                await this.fetchCartProducts();
                this.selectedItems.clear(); // Xóa tất cả các mục đã chọn sau khi giỏ hàng thay đổi
                this.renderPrice();
            } catch (error) {
                console.error('Lỗi khi xóa sản phẩm:', error);
            }
        }
    }

    // Hàm thanh toán
    async checkout() {
        const token = localStorage.getItem('authToken');
        const customer_id = '1234';
        const selectedProducts = Array.from(this.selectedItems).map(index => this.cartController.products[index]);

        const order_products = selectedProducts.map(item => ({
            product: item.product ? item.product.id : null,
            quantity: item.quantity,
        }));

        const total_quantity = selectedProducts.reduce((sum, product) => sum + product.quantity, 0);
        const subtotal = this.renderPrice();
        const total = subtotal;
        const address = this.addressDefaultController.addressModel.id;
        const delivery_status = 'Pending';
        const payment_status = 'paid';
        const rated = [0];

        try {
            const result = await this.paymentController.fetchPayment(token, customer_id, order_products, rated, total_quantity, subtotal, total, delivery_status, payment_status, address);
            console.log('Kết quả thanh toán:', result);
            alert('Thanh toán thành công!');
            window.location.href = '/views/pages/order.html';
        } catch (error) {
            console.error('Lỗi khi thanh toán:', error);
        }
    }

    // Hàm tính tổng
    renderPrice() {
        const total = this.cartController.calculateTotal(this.selectedItems);
        const totalElement = document.getElementById('total');
        if (totalElement) {
            totalElement.textContent = total.toFixed(2);
        }
        return total;
    }
}

const cartView = new CartView();
cartView.fetchCartProducts();

export default CartView;