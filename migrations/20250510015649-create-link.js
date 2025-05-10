'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING(2083),
        allowNull: false
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hits: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('links');
  }
};
