
const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectionSequalliceMysql");
const  _validBreeds =  { cat: "Cat", dog: "Dog" };
const  _validSizes  = { small: "Small", medium: "Medium", large: "Largo" };

const Pet = sequelize.define(
  "Pet",
  {
    idPet: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "pets",
    timestamps: false,
  }
);

module.exports = {
  Pet,
  _validBreeds,
  _validSizes,
};
