const Sequelize = require("sequelize");
const db = require("../config/connectDB");
const User_role = db.define("User_role", {
    fk_user_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
    fk_role_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
});
module.exports = User_role;
