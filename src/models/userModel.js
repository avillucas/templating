const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectionSequalliceMysql");

const _adminRol = "ADMIN";
const _validRoles = { admin: _adminRol };
const merge = (userData) => {
  if (userData.name) this.name = userData.name;
  if (userData.email) this.name = userData.name;
  if (userData.password) this.password = userData.password;
  if (userData.rol) this.rol = userData.rol;
};

const User = sequelize.define(
  "User",
  {
    idUser: {
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

module.exports = {
  User,
  _adminRol,
  _validRoles,
  merge,
};
