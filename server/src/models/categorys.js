const Sequelize = require("sequelize");
const db = require("../config/connectDB");
const Category_group = require("./category_groups");
const Category = db.define("Categorys", {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    fk_category_group_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
    category_title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});
Category_group.hasMany(Category, { foreignKey: "fk_category_group_id" });
Category.belongsTo(Category_group, { foreignKey: "fk_category_group_id" });
module.exports = Category;
