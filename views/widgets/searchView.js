import SearchController from '../../controllers/searchController.js';
import WishlistController from '../../controllers/productWishListController.js';
import AddDeleteWishlistController from '../../controllers/addDeleteWishlistController.js';

class SearchView {
    constructor() {
        this.searchController = new SearchController();
        this.wishlistController = new WishlistController();
        this.addDeleteWishlistController = new AddDeleteWishlistController();
        this.inputSearch = document.querySelector('.input-field');
        this.container = document.querySelector('.grid-list');
    }

    async render() {
        try {
            const text = this.inputSearch.value.trim();
            if (!text) {
                this.container.innerHTML = `<p style="text-align:center;">Vui lòng nhập từ khóa để tìm kiếm!</p>`;
                return;
            }

            const token = localStorage.getItem('authToken');
            await this.searchController.fetchSearch(text);
            await this.wishlistController.fetchWishlist(token);

            const productHtml = this.searchController.productModel.map(product => {
                const isInWishlist = this.wishlistController.productModel.some(productWishlist => productWishlist.id === product.id);
                return `
                  <li>
                    <div class="course-card" data-id="${product.id}">
                        <figure class="card-banner img-holder" style="--width: 370; --height: 220;">
                            <img src="${product.imageUrls[0]}" width="370" height="220" loading="lazy" class="img-cover">
                        </figure>
                        <div class="abs-badge" style="background: ${isInWishlist ? '#D42248FF' : '#ECB02DFF'};">
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

            this.container.innerHTML = productHtml;
            this.setupItemEvents();
        } catch (error) {
            console.error("Lỗi khi render danh sách sản phẩm:", error);
            this.container.innerHTML = `<p style="text-align:center;">Đã xảy ra lỗi khi tải sản phẩm.</p>`;
        }
    }

    // Kích hoạt tìm kiếm
    searchBtn() {
        const searchIcon = document.getElementById('searchBtn');
        searchIcon.addEventListener('click', () => {
            this.render();
        });

        // Hỗ trợ nhấn phím Enter để tìm kiếm
        this.inputSearch.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.render();
            }
        });
    }

    setupItemEvents() {
        const items = document.querySelectorAll('.course-card');
        items.forEach(item => {
            item.addEventListener('click', (event) => {
                const productId = item.getAttribute('data-id');
                const productData = this.searchController.productModel.find(product => product.id === parseInt(productId));
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

const view = new SearchView();
view.searchBtn();
export default SearchView;