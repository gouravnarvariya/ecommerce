const { DataTypes, Sequelize } = require('sequelize');
const Product = require('./product.model');
const User = require('./user.model');
const sequelize = new Sequelize('shopingKart', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});


const Wishlist = sequelize.define('wishlist', {
    wishlist_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    product_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Product,
            key: 'product_id'
        }
    }
}, {
    tableName: 'wishlist',
    timestamps: false // If you want Sequelize to manage timestamps, set this to true
  });

  Product.hasMany(Wishlist, { foreignKey: 'product_id' });
  Wishlist.belongsTo(Product, { foreignKey: 'product_id' });


module.exports = {Wishlist}