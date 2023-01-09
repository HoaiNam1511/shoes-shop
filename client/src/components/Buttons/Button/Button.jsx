import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);
function Button({
    onClick,
    children,
    className,
    outLine,
    leftIcon,
    rightIcon,
}) {
    const classes = cx("button", { [className]: className, outLine: outLine });
    return (
        <button onClick={onClick} className={classes}>
            <div className={cx("wrapper")}>
                <span className={cx("icon")}>{leftIcon}</span>
                <span className={cx("title")}>{children}</span>
                <span className={cx("icon")}>{rightIcon}</span>
            </div>
        </button>
    );
}

export default Button;
