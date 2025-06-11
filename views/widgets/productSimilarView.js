import ProductSimilarController from '../../controllers/productSimilarController.js';
import WishlistController from '../../controllers/productWishListController.js';
import AddDeleteWishlistController from '../../controllers/addDeleteWishlistController.js';

class ProductSimilarViews {
    constructor() {
        this.productSimilarController = new ProductSimilarController();
        this.wishlistController = new WishlistController();
        this.addDeleteWishlistController = new AddDeleteWishlistController();
    }

    // Hiển thị sản phẩm tương tự
    async render() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            const category = urlParams.get('category');

            const token = localStorage.getItem('authToken');
            await this.productSimilarController.fetchProductSimilar(category);
            await this.wishlistController.fetchWishlist(token);

            const productSimilarHtml = this.productSimilarController.productModel
                .filter(productSimilar => productSimilar.id !== parseInt(productId))
                .map(productSimilar => {
                    const isInWishlist = this.wishlistController.productModel.some(productWishlist => productWishlist.id === productSimilar.id);
                    return `
                        <li>
                            <div class="course-card" data-id="${productSimilar.id}">
                                <figure class="card-banner img-holder" style="--width: 370; --height: 220;">
                                    <img src="${productSimilar.imageUrls[0]}" width="370" height="220" loading="lazy" class="img-cover">
                                </figure>
                                <div class="abs-badge" style="background: ${isInWishlist ? '#D42248FF' : '#ECB02DFF'};">
                                    <i class="bi bi-heart-fill"></i>
                                </div>
                                <div class="card-content">
                                    <h3 class="h3">
                                        <a href="#" class="card-title">${productSimilar.title}</a>
                                    </h3>
                                    <div class="wrapper">
                                        <p class="rating-text">(${productSimilar.rating} / 5 Rating) <i class="bi bi-star-fill"></i></p>
                                    </div>
                                    <data class="price" value="29">${productSimilar.price}đ</data>
                                </div>
                            </div>
                        </li>
                    `;
                }).join('');

            const gridList = document.querySelector('.grid-list');

            // Kiểm tra xem phần tử .grid-list có tồn tại không
            if (!gridList) {
                console.error('Element with class "grid-list" not found');
                return;
            }

            gridList.innerHTML = productSimilarHtml;
            this.setupItemEvents();
        } catch (error) {
            console.error('Error rendering similar products:', error);
        }
    }

    // Cập nhật các sự kiện cho các sản phẩm
    setupItemEvents() {
        const items = document.querySelectorAll('.course-card');
        items.forEach(item => {
            item.addEventListener('click', (event) => {
                const productId = item.getAttribute('data-id');
                const productData = this.productSimilarController.productModel.find(product => product.id === parseInt(productId));
                if (productData) {
                    window.location.href = `/views/pages/detailProduct.html?id=${productId}&category=${productData.category}`;
                } else {
                    console.error('Không tìm thấy sản phẩm có id:', productId);
                }
            });

            // Sự kiện riêng cho icon trái tim
            const heartIcon = item.querySelector('.bi-heart-fill');
            if (heartIcon) {
                heartIcon.addEventListener('click', async (event) => {
                    event.stopPropagation(); // Ngừng lan truyền sự kiện
                    const productId = item.getAttribute('data-id');
                    const token = localStorage.getItem('authToken');

                    try {
                        // Gọi phương thức toggleWishlistItem từ addDeleteWishlistController
                        await this.addDeleteWishlistController.toggleWishlistItem(token, productId);

                        // Sau khi thêm hoặc xóa sản phẩm, refetch lại trang
                        await this.render();
                    } catch (error) {
                        console.error('Lỗi khi cập nhật wishlist:', error);
                    }
                });
            }
        });
    }
}

const view = new ProductSimilarViews();
view.render();

export default ProductSimilarViews;