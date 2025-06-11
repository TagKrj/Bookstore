import ProductController from '../../controllers/productController.js';
import AddCartController from '../../controllers/addCartController.js';

class DetailProductWidget {
    constructor() {
        this.productController = new ProductController();
        this.addCartControler = new AddCartController();
    }

    async render() {
        try {
            // Lấy ID từ URL
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');

            await this.productController.fetchProducts();

            const productData = this.productController.productModel.find(product => product.id === parseInt(productId));

            // Kiểm tra xem productData có tồn tại không
            if (!productData) {
                console.error('Product not found');
                return;
            }

            const productDetailHtml = `
                <div class="card" data-id="${productData.id}">
                    <!-- card left -->
                    <div class="product-imgs">
                        <div class="img-display">
                            <div class="img-showcase">
                                <img src="${productData.imageUrls[0]}" alt="${productData.title}">
                            </div>
                        </div>
                    </div>
                    <!-- card right -->
                    <div class="product-content">
                        <h2 class="product-title">${productData.title}</h2>
                        <a href="#" class="product-link">Loại sách: ${productData.category}</a>
                        <div class="product-rating">
                            <span>${productData.rating} / 5 <i class="fas fa-star"></i></span>
                        </div>
                        <div class="product-price">
                            <p class="new-price">Giá: <span>${productData.price}đ</span></p>
                        </div>
                        <div class="product-detail">
                            <h2>Mô tả: </h2>
                            <p>${productData.description}</p>
                        </div>
                        <div class="purchase-info">
                            <button type="button" class="btn" id="addCart">
                                Thêm vào giỏ hàng <i class="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                        <div class="social-links">
                            <p>Chia sẻ: </p>
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-whatsapp"></i></a>
                            <a href="#"><i class="fab fa-pinterest"></i></a>
                        </div>
                    </div>
                </div>
            `;

            const cardWrapper = document.querySelector('.card-wrapper');

            // Kiểm tra xem phần tử .card-wrapper có tồn tại không
            if (!cardWrapper) {
                console.error('Element with class "card-wrapper" not found');
                return;
            }

            cardWrapper.innerHTML = productDetailHtml;
            this.setAddToCart(productData.id);
        } catch (error) {
            console.error('Error rendering product details:', error);
        }
    }

    setAddToCart(productId) {
        const token = localStorage.getItem('authToken');
        const addCartBtn = document.getElementById('addCart');
        if (token) {
            addCartBtn.addEventListener('click', async () => {
                const quantity = 1;

                try {
                    await this.addCartControler.fetchAddCartProducts(token, productId, quantity);
                    alert('Sản phẩm đã được thêm vào giỏ hàng!');
                } catch (error) {
                    console.error('Lỗi khi thêm vào giỏ hàng:', error);
                    alert('Có lỗi xảy ra, vui lòng thử lại!');
                }
            });
        } else {
            addCartBtn.addEventListener('click', () => {
                alert('Vui lòng đăng nhập để thêm vào giỏ hàng.');
                window.location.href = '/views/pages/login.html';
            });
        }

    }
}

const view = new DetailProductWidget();
view.render();
export default DetailProductWidget;