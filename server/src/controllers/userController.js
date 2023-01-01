require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User, User_role, Role } = require("../models/users");
const { use } = require("../routers/user");

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
            let token;
            let message;
            if (user.status == 1) {
                token = jwt.sign(
                    {
                        id: user.id,
                    },
                    secretKey,
                    { expiresIn: "1h" }
                );
                message = "Login success";
            } else {
                message = "Account is disable";
            }
            res.send({
                token: token,
                message: message,
            });
        } else {
            console.log("Login false");
        }
    } catch (error) {
        console.log(error);
    }
};

const checkLogin = async (req, res, next) => {
    const token = req.cookies.token;
    const { id } = jwt.verify(token, secretKey);
    console.log(token);
    const user = await User.findOne({
        where: {
            id: id,
        },
    });

    try {
        if (user.id) {
            req.data = user;
            next();
        } else {
            res.send("/login");
        }
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
                attributes: ["id", "email", "user_name", "password", "status"],
                include: [
                    {
                        model: Role,
                        attributes: ["name", "description"],
                        as: "role",
                    },
                ],
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
    } else {
        try {
            const result = await User.findAndCountAll({
                attributes: ["id", "email", "user_name", "password", "status"],
                include: [
                    {
                        model: Role,
                        attributes: ["name", "description"],
                        as: "role",
                    },
                ],
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
            UserId: user.id,
            RoleId: role,
        });
        res.send("success");
    } catch (error) {
        console.log(error);
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
                RoleId: role,
            },
            {
                where: {
                    UserId: id,
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
                UserId: id,
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
