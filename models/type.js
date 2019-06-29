'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: DataTypes.STRING
  }, {});
  Type.associate = function (models) {
    // Type hasMany Products
    Type.hasMany(models.Product)
  };
  return Type;
};