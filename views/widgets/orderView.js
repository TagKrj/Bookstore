import OrderController from '../../controllers/orderController.js';

class CheckOrderView {
    constructor() {
        this.orderController = new OrderController();
        this.currentStatus = 'Pending'; // Trạng thái mặc định
    }

    async render(status) {
        try {
            const token = localStorage.getItem('authToken');
            await this.orderController.fetchCheckOrder(token, status);

            // Lọc ra các đơn hàng không có sản phẩm
            const filteredOrders = this.orderController.orderModel.filter(order => order.order_products.length > 0);

            const ordersHtml = filteredOrders.map(order => {
                // Tạo danh sách sản phẩm trong đơn hàng
                const productsHtml = order.order_products.map(product => `
                     <div class="item" data-id="${product.product_id}">
                        <div class="boxImg">
                            <img src="${product.imageUrl}" alt="">
                        </div>
                        <div class="info">
                            <h3>${product.title}</h3>
                            <h3>x${product.quantity}</h3>
                        </div>
                        <div class="price">
                            <h3>${product.price}</h3>
                        </div>
                    </div>
                 `).join('');
                console.log(order.order_products);
                // Tạo khối thông tin đơn hàng
                return `
                    <div class="boxItem" data-order-id="${order.id}">
                        <div class="line">
                            ${productsHtml}
                        </div>
                        <div class="allInfo">
                            <h3>Thành tiền: <span>${order.total.toFixed(2)}</span></h3>
                        </div>
                    </div>
                `;
            }).join('');

            document.querySelector('.content').innerHTML = ordersHtml;


            // Thêm sự kiện click cho các nút đánh giá
            document.querySelectorAll('.rate').forEach(button => {
                button.addEventListener('click', (event) => this.showRatting(event));
            });
        } catch (error) {
            console.error("Có lỗi xảy ra trong quá trình render:", error);
        }
    }

    initMenuEvents() {
        const menuItems = document.querySelectorAll('.menu h1');

        // Gắn sự kiện click cho các menu
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                // Xóa border-bottom của tất cả các menu
                menuItems.forEach(menu => menu.style.borderBottom = 'none');

                // Đặt border-bottom cho menu được chọn
                item.style.borderBottom = '2px solid pink';

                // Cập nhật trạng thái hiện tại và render lại
                this.currentStatus = item.id;
                this.render(this.currentStatus);
            });
        });
    }

}

// Khởi tạo view
const view = new CheckOrderView();
view.render('Pending'); // Trạng thái mặc định khi load trang
view.initMenuEvents();

export default CheckOrderView;
