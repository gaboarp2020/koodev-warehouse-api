'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    content: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    price: DataTypes.FLOAT,
    photo: DataTypes.STRING,
  }, {});
  Product.associate = function (models) {
    // Product belongsTo Type
    Product.belongsTo(models.Type, {
      through: 'ProductsTypes',
      onDelete: 'CASCADE',
      foreignKey: {
        field: 'TypeId',
        allowNull: false,
      }
    })
    Product.hasMany(models.PriceLog)

  };
  return Product;
};