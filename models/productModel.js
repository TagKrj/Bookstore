class ProductModel {
    constructor(id, title, price, description, is_featured, BookType, rating, imageUrls, createdAt, category, brand) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.is_featured = is_featured;
        this.BookType = BookType;
        this.rating = rating;
        this.imageUrls = imageUrls;
        this.createdAt = createdAt;
        this.category = category;
        this.brand = brand;
    }
}

export default ProductModel;