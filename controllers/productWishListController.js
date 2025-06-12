import ProductModel from '../models/productModel.js';

class WishlistController {
    constructor() {
        this.productModel = [];
    }

    async fetchWishlist(token) {
        try {
            const response = await fetch(`http://52.175.37.189:8080/api/wishlist/me/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
            });
            const data = await response.json();
            this.productModel = data.map(product => new ProductModel(
                product.id,
                product.title,
                product.price,
                product.description,
                product.is_featured,
                product.BookType,
                product.rating,
                product.imageUrls,
                product.createdAt,
                product.category,
                product.brand
            ));
        } catch (error) {
            console.error(error);
        }
    }
}

export default WishlistController; 