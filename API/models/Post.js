const { DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  summary: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: true
  },
},
  {
    timestamps: true,
    tableName: 'Post', // Explicitly specify the exact table name
  });


module.exports = Post;
