const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectionMongo");

const _adminRol = "ADMIN";
const _userRol = "USER";
const _validRoles = { user: _userRol, admin: _adminRol };
const merge = (userData) => {
  if (userData.name) this.name = userData.name;
  if (userData.email) this.name = userData.name;
  if (userData.password) this.password = userData.password;
  if (userData.rol) this.rol = userData.rol;
};
/*
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);
*/
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [_userRol, _adminRol],
      default: _userRol,
    },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  _adminRol,
  _userRol,
  _validRoles,
  merge,
};
