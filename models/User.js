const { DataTypes } = require("sequelize");
const db = require("../dbconfig");

const User = db.sequelise.define("users", {
  userId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

module.exports = User;
