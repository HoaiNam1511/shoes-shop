const User = require("../models/users");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;
const login = async (req, res, next) => {
    const { userName, password } = req.body;
    await User.findOne({
        where: {
            user_name: userName,
            password: password,
        },
    })
        .then((user) => {
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
        })
        .catch((error) => {
            console.log(error);
        });
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

const role = async (req, res, next) => {
    console.log(req.cookies.token);
    res.send(req.data);
};

module.exports = { login, checkLogin, role };
