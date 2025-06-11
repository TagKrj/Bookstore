class OrderProductModel {
    constructor(product_id, imageUrl, title, price, quantity) {
        this.product_id = product_id;
        this.imageUrl = imageUrl;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }
}
export default OrderProductModel;