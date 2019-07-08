'use strict';
module.exports = (sequelize, DataTypes) => {
  const PriceLog = sequelize.define('PriceLog', {
    price: DataTypes.FLOAT
  }, {});
  PriceLog.associate = function (models) {
    // PriceLog belongsTo Products
    PriceLog.belongsTo(models.Product, {
      through: 'PricesLogsProducts',
      onDelete: 'CASCADE',
      foreignKey: {
        field: 'ProductId',
        allowNull: false,
      }
    })
  };
  return PriceLog;
};