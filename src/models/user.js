const Sequelize = require('sequelize');
const database = require('./../../db');

const User = database.define('user',
  {
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
    }
  },
  {
    paranoid: true
  }
)

module.exports = User;