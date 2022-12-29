const Sequelize = require("sequelize");
const db = require("../config/connectDB");
const User_role = require("./userRoles");
const User = db.define("User", {
    id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
});
User.hasOne(User_role, { as: "use_role", foreignKey: "fk_user_id" });
User_role.belongsTo(User, { as: "use_role", foreignKey: "fk_user_id" });
module.exports = User;
