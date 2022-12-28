import { useState } from "react";
import Cookies from "js-cookie";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import * as userService from "../../service/userService";

import backgroundImage from "../../asset/background/login-background.jpg";
import logo from "../../asset/background/logo.png";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";

import Button from "../../components/Button/Button";

const cx = classNames.bind(styles);
function Login() {
    const [user, setUser] = useState({
        userName: "",
        password: "",
    });
    const navigate = useNavigate();
    const { userName, password } = user;
    const handleInputOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleLogin = async () => {
        try {
            const result = await userService.login(user);
            if (result.token) {
                Cookies.set("token", result.token, { expires: 1 });
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <img
                className={cx("background-img")}
                src={backgroundImage}
                alt=""
            ></img>
            <div className={cx("overlay")}></div>
            <div className={cx("wrapper")}>
                <img className={cx("logo")} src={logo} alt="" />
                <div className={cx("user-wrap")}>
                    <div className={cx("input-container")}>
                        <PersonIcon className={cx("icon-input")} />
                        <input
                            className={cx("input")}
                            type="text"
                            name="userName"
                            value={userName}
                            onChange={handleInputOnChange}
                            placeholder="User name"
                        />
                    </div>
                    <div className={cx("input-container")}>
                        <HttpsIcon className={cx("icon")} />
                        <input
                            className={cx("input")}
                            type="text"
                            name="password"
                            value={password}
                            onChange={handleInputOnChange}
                            placeholder="Password"
                        />
                    </div>

                    <Button className={cx("btn-login")} onClick={handleLogin}>
                        Login
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Login;
