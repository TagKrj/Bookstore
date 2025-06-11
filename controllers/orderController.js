import OrderModel from '../models/orderModel.js';

class CheckOrderController {
    constructor() {
        this.orderModel = [];
    }

    async fetchCheckOrder(token, status) {
        try {
            const response = await fetch(`https://javelin-advanced-daily.ngrok-free.app/api/order/me/?status=${status}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch pending orders');
            }

            const data = await response.json();
            this.orderModel = data.map(payment => new OrderModel(
                payment.customer_id,
                payment.order_products,
                payment.total_quantity,
                payment.subtotal,
                payment.total,
                payment.address,
                payment.delivery_status,
                payment.payment_status,
                payment.rated
            ));
        } catch (error) {
            console.error('Error in fetchPending:', error);
        }
    }

}

export default CheckOrderController;