'use strict';
const {
  Model
} = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');
module.exports = (sequelize, DataTypes) => {
  class detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasOne(models.makanan, {foreignKey: "detailID", as: "detailMakanan"});
      // this.hasOne(models.orderList, {foreignKey: "a", as: "detailOrderList"});
    }
  }
  detail.init({
    detailID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    makananID: DataTypes.INTEGER,
    orderListID: DataTypes.INTEGER,
    kuantitas: DataTypes.INTEGER,
    harga: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'detail',
  });
  return detail;
};