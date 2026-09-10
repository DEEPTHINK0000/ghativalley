// backend/src/controllers/OrderController.js
const OrderService = require('../services/OrderService');

class OrderController {
  static async placeOrder(req, res) {
    try {
      const order = await OrderService.createOrder(req.body);
      res.status(201).json({ success: true, data: order });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = await OrderService.updateOrderStatus(id, status);
      res.json({ success: true, data: order });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = OrderController;