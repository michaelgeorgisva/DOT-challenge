const Sequelize = require('sequelize');
const dbConfig = require('./config');

const sequelize = new Sequelize(dbConfig.NAME, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
});

module.exports = sequelize;
