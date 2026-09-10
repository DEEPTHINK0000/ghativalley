// backend/src/models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  customerId: { type: DataTypes.STRING, allowNull: false },
  status: { 
    type: DataTypes.ENUM('OrderPlaced', 'StockCheck', 'Pending', 'Approved', 'Rejected', 'CancelRequested', 'Cancelled', 'Cooked', 'Completed'),
    defaultValue: 'OrderPlaced' 
  },
  totalAmount: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 }
});

module.exports = Order;