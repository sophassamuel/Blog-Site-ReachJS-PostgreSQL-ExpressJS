const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Blog', 'postgres', 'Sophas612@', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

module.exports = sequelize;
