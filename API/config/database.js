const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'Blog',  // Database name
  process.env.DB_USER || 'postgres',  // Database user
  process.env.DB_PASSWORD || 'admin123',  // Database password
  {
    host: process.env.DB_HOST || 'localhost',  // Database host
    dialect: 'postgres',  // Using PostgreSQL as the database
    port: process.env.DB_PORT || 5432,  // Database port
    logging: false,  // Disable logging for production (optional)
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {  // Handle SSL for production
        require: true,
        rejectUnauthorized: false,  // Allow self-signed certificates
      } : false,
    },
  }
);

module.exports = sequelize;
