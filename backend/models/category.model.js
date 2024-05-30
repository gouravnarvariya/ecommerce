const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('shopingKart', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});


// Define Category model
const Category = sequelize.define('Category', {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category_image: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'categories',
  timestamps: false, // If you want Sequelize to manage timestamps, set this to true
});

module.exports = { Category };