const { Sequelize } = require('sequelize');

// Create Sequelize instance using environment variables
const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT || 5432, // Default to port 5432 if not specified
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Enforce SSL connection (necessary for Supabase)
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  },
});

module.exports = sequelize;
