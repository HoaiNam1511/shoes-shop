const Sequelize = require("sequelize");
const db = require("../config/connectDB");
const User_role = require("../models/userRoles");
const Role = db.define("Role", {
    id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Role;
