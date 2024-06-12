module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // use table name as string
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products', // use table name as string
        key: 'product_id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'cart',
    timestamps: false, // Set to true if you want Sequelize to manage timestamps
  });

  return Cart;
};

  // db.Product.hasMany(Cart, { foreignKey: 'product_id' });
  // db.Cart.belongsTo(Product, { foreignKey: 'product_id' });

