'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    photo: DataTypes.STRING,
  }, {});
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};