const { Sequelize } = require('sequelize');
const sequelize = require('../db/connection');

const Order = sequelize.define('Order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  products: {
    type: Sequelize.STRING,
  },
},
{
  timestamps: false
});

module.exports = Order;
