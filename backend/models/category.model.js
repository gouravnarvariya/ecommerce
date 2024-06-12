module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_image: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null if the image is optional
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure category name is required
    },
  }, {
    tableName: 'categories',
    timestamps: false, // Set to true if you want Sequelize to manage timestamps
  });

  return Category;
};
