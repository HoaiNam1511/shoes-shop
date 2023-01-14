import { useState } from "react";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Login.module.scss";

import * as authService from "../../service/authService";

import PersonIcon from "@mui/icons-material/Person";
import logo from "../../asset/background/logo.png";
import HttpsIcon from "@mui/icons-material/Https";

import backgroundImage from "../../asset/background/login-background.jpg";
import Button from "../../components/Buttons/Button/Button";
import ToastLogin from "../../components/Toast/ToastLogin/ToastLogin";

import { loginStart, loginSuccess, loginFail } from "../../redux/Slice/auth";

const cx = classNames.bind(styles);
function Login() {
    const [user, setUser] = useState({
        userName: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [action, setAction] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userName, password } = user;

    const handleInputOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        dispatch(loginStart());
        try {
            const result = await authService.login(user);
            if (result.data?.token) {
                dispatch(loginSuccess(result?.data));
                navigate("/");
            }
            setMessage(result.data.message);
            setAction(result.data.action);
        } catch (error) {
            console.log(error);
            dispatch(loginFail());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === " ") {
            e.preventDefault();
        }
    };

    const handleCloseToast = () => {
        setAction(null);
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
                            onKeyDown={handleKeyDown}
                            placeholder="User name"
                        />
                    </div>
                    <div className={cx("input-container")}>
                        <HttpsIcon className={cx("icon-input")} />
                        <input
                            className={cx("input")}
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputOnChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Password"
                        />
                    </div>

                    <Button className={cx("btn-login")} onClick={handleLogin}>
                        Login
                    </Button>
                    {action && (
                        <ToastLogin
                            // className={cx(action)}
                            onClick={handleCloseToast}
                            action={action}
                            message={message}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Login;
