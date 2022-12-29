const User = require("../models/users");
const User_role = require("../models/userRoles");
const Role = require("../models/roles");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const ITEM_PER_PAGE = 10;
const secretKey = process.env.SECRET_KEY;
const login = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                user_name: userName,
                password: password,
            },
        });
        if (user) {
            let token = jwt.sign(
                {
                    id: user.id,
                },
                secretKey,
                { expiresIn: "1h" }
            );
            res.send({
                token: token,
                message: "Login success",
            });
        } else {
            console.log("Login false");
        }
    } catch (error) {
        console.log(error);
    }
};

const checkLogin = (req, res, next) => {
    // const token = req.body.token;
    // const { id } = jwt.verify(token, secretKey);
    // console.log(token);
    // User.findOne({
    //     where: {
    //         id: id,
    //     },
    // })
    //     .then((user) => {
    //         if (user) {
    //             req.data = user;
    //             next();
    //         } else {
    //             res.send("Please login");
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
};

const getRole = async (req, res, next) => {
    try {
        const result = await Role.findAll();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};

const createUser = async (req, res, next) => {
    const { email, useName, password, status, role } = req.body;
    let user;
    try {
        await User.create({
            email: email,
            user_name: useName,
            password: password,
            status: status,
        });
        console.log("come");
    } catch (error) {
        console.log(error);
    }

    try {
        user = await User.findOne({
            attributes: ["id"],
            order: [["id", "DESC"]],
        });
    } catch (error) {
        console.log(error);
    }
    console.log(role);
    try {
        await User_role.create({
            fk_user_id: user.id,
            fk_role_id: role,
        });
        res.send("success");
    } catch (error) {
        console.log(error);
    }
};
const getUSer = async (req, res, next) => {
    let { page } = req.query;
    if (page) {
        let offSet = (page - 1) * ITEM_PER_PAGE;
        try {
            const result = await User.findAndCountAll({
                // include: [
                //     {
                //         model: User_role,
                //         as: "use_role",
                //         include: [{ model: Role, as: "role" }],
                //     },
                // ],
                offset: offSet,
                limit: ITEM_PER_PAGE,
                required: false,
            });
            const totalPage = await Math.ceil(result.count / ITEM_PER_PAGE);
            res.send({
                totalPage: totalPage,
                data: result.rows,
            });
        } catch (error) {
            console.log(error);
        }
    }
};

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { email, useName, password, status, role } = req.body;
    try {
        await User.update(
            {
                email: email,
                user_name: useName,
                password: password,
                status: status,
            },
            {
                where: {
                    id: id,
                },
            }
        );

        await User_role.update(
            {
                fk_role_id: role,
            },
            {
                where: {
                    fk_user_id: id,
                },
            }
        );
        res.send("updated");
    } catch (error) {
        console.log(error);
    }
};

const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        await User.destroy({
            where: {
                id: id,
            },
        });

        await User_role.destroy({
            where: {
                fk_user_id: id,
            },
        });
        res.send("delete");
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    login,
    checkLogin,
    getRole,
    createUser,
    getUSer,
    updateUser,
    deleteUser,
};
