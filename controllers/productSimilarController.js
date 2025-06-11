import ProductModel from '../models/productModel.js';

class ProductSimilarController {
    constructor() {
        this.productModel = [];
    }

    async fetchProductSimilar(category) {
        try {
            const response = await fetch(`https://javelin-advanced-daily.ngrok-free.app/api/products/recommendation/?category=${category}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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

export default ProductSimilarController; 