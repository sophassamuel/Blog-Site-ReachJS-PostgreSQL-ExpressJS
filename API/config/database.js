const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Blog', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

module.exports = sequelize;
