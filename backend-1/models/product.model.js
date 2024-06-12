const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('shopingKart', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define Product model
const Product = sequelize.define('Products', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255)
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2)
    },
    image: {
        type: DataTypes.STRING(1000)
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categories',
            key: 'category_id'
        }
    },
    rate: {
        type: DataTypes.DECIMAL(10, 2)
    },
    count: {
        type: DataTypes.INTEGER
    },
    is_wishlist : {
        type: DataTypes.BOOLEAN,
        defaultValue : false,
    }
  }, {
    tableName: 'products',
    timestamps: false // If you want Sequelize to manage timestamps, set this to true
  });
  

module.exports = Product