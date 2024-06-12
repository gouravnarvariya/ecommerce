module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(1000),
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories',
          key: 'category_id',
        },
      },
      rate: {
        type: DataTypes.DECIMAL(10, 2),
      },
      count: {
        type: DataTypes.INTEGER,
      },
      is_wishlist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      tableName: 'products',
      timestamps: false, // Set to true if you want Sequelize to manage timestamps
    });
  
    return Product;
  };
  