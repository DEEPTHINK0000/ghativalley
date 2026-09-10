// backend/src/routes/order.routes.js
const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.post('/', OrderController.placeOrder);
router.patch('/:id/status', OrderController.updateStatus);

module.exports = router;