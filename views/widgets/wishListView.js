import WishlistController from '../../controllers/productWishListController.js';
import AddDeleteWishlistController from '../../controllers/addDeleteWishlistController.js';

class WishlistViews {
    constructor() {
        this.wishlistController = new WishlistController();
        this.addDeleteWishlistViewModel = new AddDeleteWishlistController();
    }

    async render() {
        const token = localStorage.getItem('authToken');
        await this.wishlistController.fetchWishlist(token);

        const productWishlistHtml = this.wishlistController.productModel.map(product => {
            return `
                  <li>
                    <div class="course-card" data-id="${product.id}">
                        <figure class="card-banner img-holder" style="--width: 370; --height: 220;">
                            <img src="${product.imageUrls[0]}" width="370" height="220" loading="lazy" class="img-cover">
                        </figure>
                        <div class="abs-badge" style="Background: #D42248FF; ">
                            <i class="bi bi-heart-fill"></i>
                        </div>
                        <div class="card-content">
                            <h3 class="h3">
                                <a href="#" class="card-title">${product.title}</a>
                            </h3>
                            <div class="wrapper">
                                <p class="rating-text">(${product.rating} / 5 Rating) <i class="bi bi-star-fill"></i></p>
                            </div>
                            <data class="price" value="29">${product.price}đ</data>
                        </div>
                    </div>
                </li>
            `;
        }).join('');

        document.querySelector('.grid-list').innerHTML = productWishlistHtml;

        this.setupItemEvents();
    }

    // Cập nhật các sự kiện cho các sản phẩm
    setupItemEvents() {
        const items = document.querySelectorAll('.course-card');
        items.forEach(item => {
            item.addEventListener('click', (event) => {
                const productId = item.getAttribute('data-id');
                const productData = this.wishlistController.productModel.find(product => product.id === parseInt(productId));
                if (productData) {
                    window.location.href = `/views/pages/detailProduct.html?id=${productId}&category=${productData.category}`;
                } else {
                    console.error('Không tìm thấy sản phẩm có id:', productId);
                }
            });


            // Sự kiện riêng cho icon trái tim
            const heartIcon = item.querySelector('.abs-badge');
            if (heartIcon) {
                heartIcon.addEventListener('click', async (event) => {
                    event.stopPropagation();
                    const productId = item.getAttribute('data-id');
                    const token = localStorage.getItem('authToken');

                    try {
                        await this.addDeleteWishlistViewModel.toggleWishlistItem(token, productId);
                        await this.render();
                    } catch (error) {
                        console.error('Lỗi khi cập nhật wishlist:', error);
                    }
                });
            }
        });
    }
}

const view = new WishlistViews();
view.render();

export default WishlistViews;
