import PaymentProductModel from '../models/paymentProductModel.js';

class PaymentModel {
    constructor(
        customer_id,
        order_products = [], // Mảng các sản phẩm
        total_quantity,
        subtotal,
        total,
        address,
        delivery_status, // Giá trị mặc định
        payment_status, // Giá trị mặc định
        rated // Giá trị mặc định
    ) {
        this.order_products = order_products.map(
            (item) =>
                new PaymentProductModel(
                    item.product,
                    item.quantity)
        );
        this.rated = rated;
        this.customer_id = customer_id;
        this.total_quantity = total_quantity;
        this.subtotal = subtotal;
        this.total = total;
        this.address = address;
        this.delivery_status = delivery_status;
        this.payment_status = payment_status;
    }
}

export default PaymentModel;
