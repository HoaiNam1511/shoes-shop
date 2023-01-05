import classNames from "classnames/bind";
import style from "./ToastLogin.module.scss";

const cx = classNames.bind(style);
function ToastLogin({ className, message, onClick, action }) {
    console.log(action);
    return (
        <div className={cx("wrapper", action)}>
            <button className={cx("close")} onClick={onClick}>
                x
            </button>
            <span className={cx("title")}>
                <strong>{`${action.toUpperCase()}: `}</strong>
                {message}
            </span>
        </div>
    );
}

export default ToastLogin;
