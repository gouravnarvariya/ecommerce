const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('shopingKart', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});
const Product = require('./product.model');
const User = require('./user.model');


// define cart model 

const Cart = sequelize.define('Cart' , {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'product_id'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
}, {
    tableName: 'cart',
    timestamps: false, // If you want Sequelize to manage timestamps, set this to true
  })

  Product.hasMany(Cart, { foreignKey: 'product_id' });
  Cart.belongsTo(Product, { foreignKey: 'product_id' });

module.exports =  Cart ;