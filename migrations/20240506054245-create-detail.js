'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('details', {
      detailID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      makananID: {
        type: Sequelize.INTEGER,
        references: {
          model: "makanans" ,
          key: "makananID"
        },
        allowNull: false
      },
      orderListID: {
        type: Sequelize.INTEGER,
        references: {
          model: "orderLists" ,
          key: "orderListID"
        },
        allowNull: false
      },
      kuantitas: {
        type: Sequelize.INTEGER
      },
      harga: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('details');
  }
};