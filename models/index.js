const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
);

const models = {
  User: sequelize.import('./user'),
  Product: sequelize.import('./product'),
};


models.sequelize = sequelize

module.exports = models