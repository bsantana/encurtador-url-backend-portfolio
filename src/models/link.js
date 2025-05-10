const Sequelize = require('sequelize');
const database = require('./../../db');
const User = require('./user');

const Link = database.define('link', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
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
  }
})

User.hasMany(Link, {
  foreignKey: 'userId'
});
Link.belongsTo(User);

module.exports = Link;