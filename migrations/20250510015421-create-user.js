'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true
      },
      profile: {
        type: Sequelize.STRING,
        allowNull: true
      },
      payment: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      rememberToken: {
        type: Sequelize.STRING,
        allowNull: true
      },
      hashToken: {
        type: Sequelize.STRING,
        allowNull: true
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('users');
  }
};
