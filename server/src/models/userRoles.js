const Sequelize = require("sequelize");
const db = require("../config/connectDB");
const User = require("./users");
const Role = require("./roles");
const User_role = db.define("User_role", {
    fk_user_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        primaryKey: true,
    },
    fk_role_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
});

User_role.hasOne(Role, { as: "role", foreignKey: "id" });
Role.belongsTo(User_role, { as: "role", foreignKey: "id" });

module.exports = User_role;
