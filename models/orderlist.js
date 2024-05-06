'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.detail, {foreignKey: "orderListID"})
    }
  }
  orderList.init({
    orderListID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    namaPelanggan: DataTypes.STRING,
    nomorMeja: DataTypes.STRING,
    tanggalOrder: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'orderList',
  });
  return orderList;
};