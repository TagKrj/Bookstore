import ProductModel from '../models/productModel.js';

class CartModel {
    constructor({ id, product, quantity }) {
        this.id = id;
        this.product = new ProductModel(
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
        );
        this.quantity = quantity;
    }
}

export default CartModel;