module.exports = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define('Wishlist', {
      wishlist_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'wishlist',
      timestamps: false, // Set to true if you want Sequelize to manage timestamps
    });
  
    return Wishlist;
  };
  