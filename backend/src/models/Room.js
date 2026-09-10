// backend/src/models/Room.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Room = sequelize.define('Room', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  roomNumber: { type: DataTypes.STRING, unique: true, allowNull: false },
  status: { 
    type: DataTypes.ENUM('Available', 'Reserved', 'Occupied', 'CheckOut', 'DuesPending', 'NonAvailable'),
    defaultValue: 'Available' 
  },
  pricePerNight: { type: DataTypes.FLOAT, allowNull: false }
});

module.exports = Room;