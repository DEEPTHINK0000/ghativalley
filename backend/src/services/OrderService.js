const Order = require('../models/Order');
const { notifyClients } = require('../websocket/notification.socket');

class OrderService {
  static async createOrder(data) {
    // 1. Validate stock & create order
    const order = await Order.create({ ...data, status: 'Pending' });
    
    // 2. Broadcast live update to kitchen device via WebSocket
    notifyClients('kitchen', 'new_order', order);
    return order;
  }

  static async updateOrderStatus(orderId, status) {
    const order = await Order.findByPk(orderId);
    if (!order) throw new Error('Order not found');

    order.status = status;
    await order.save();

    // Notify customer & manager stations
    notifyClients('customer', 'order_status_update', order);
    notifyClients('manager', 'order_status_update', order);
    return order;
  }
}

module.exports = OrderService;