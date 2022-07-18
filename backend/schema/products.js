const { Sequelize } = require('sequelize');
const sequelize = require('../db/connection');

const Product = sequelize.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  stock: {
    type: Sequelize.INTEGER,
  },
},
{
  timestamps: false
});

module.exports = Product;
