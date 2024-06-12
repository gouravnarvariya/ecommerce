const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const fs = require("fs");

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'shopingKart',
  username: 'root',
  password: 'password',
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* 
? Load and define all models 
*/
const modelsDir = path.join(__dirname, "../models");
const modelFiles = fs.readdirSync(modelsDir);

modelFiles.forEach((file) => {
  const model = require(path.join(modelsDir, file))(sequelize, DataTypes);
  db[model.name] = model;
});

// db.sequelize.sync({ force: false, alter: true }).then(() => {
//   console.log("Database schema has been updated!");
// });


// Define associations
db.User.hasMany(db.Wishlist, { foreignKey: 'user_id' });
db.Wishlist.belongsTo(db.User, { foreignKey: 'user_id' });

db.Product.hasMany(db.Wishlist, { foreignKey: 'product_id' });
db.Wishlist.belongsTo(db.Product, { foreignKey: 'product_id' });

db.Category.hasMany(db.Product, { foreignKey: 'category_id' });
db.Product.belongsTo(db.Category, { foreignKey: 'category_id' });

db.User.hasMany(db.Cart, { foreignKey: 'user_id' });
db.Cart.belongsTo(db.User, { foreignKey: 'user_id' });

db.Product.hasMany(db.Cart, { foreignKey: 'product_id' });
db.Cart.belongsTo(db.Product, { foreignKey: 'product_id' });


// const check = async() => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// check()

module.exports = db;