const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('shopingKart', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});
const jwt = require('jsonwebtoken');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.BIGINT,
    },
    profile_image: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users',
    timestamps: true
  }
);

// Define instance methods on the prototype
User.prototype.generateAccessToken = function() {
  return jwt.sign(
    {
      id: this.id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

User.prototype.generateRefreshToken = function() {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

module.exports = User;
