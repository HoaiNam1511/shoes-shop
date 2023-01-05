require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User, User_role, Role } = require("../models/users");

const ITEM_PER_PAGE = 10;

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

const createUser = async (req, res, next) => {
    const { email, useName, password, status, role } = req.body;
    console.log(req.body);
    let user;
    try {
        await User.create({
            email: email,
            user_name: useName,
            password: password,
            status: status,
        });
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
    createUser,
    getUSer,
    updateUser,
    deleteUser,
};
