const Sequelize = require("sequelize");
const db = require("../config/connectDB");

const Category_group = db.define(
  "Category_group",
  {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER(10),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    category_group_title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {}
);

module.exports = Category_group;
