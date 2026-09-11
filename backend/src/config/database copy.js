const { Sequelize } = require('sequelize');

// SQLite configuration for effortless local setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

module.exports = sequelize;