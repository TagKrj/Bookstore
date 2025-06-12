import ProductModel from '../models/productModel.js';

class ProductSimilarController {
    constructor() {
        this.productModel = [];
    }

    async fetchProductSimilar(category) {
        try {
            const response = await fetch(`http://52.175.37.189:8080/api/products/recommendation/?category=${category}`, {
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