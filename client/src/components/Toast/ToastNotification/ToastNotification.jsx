import classNames from "classnames/bind";
import ErrorIcon from "@mui/icons-material/Error";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ToastNotification.module.scss";
import { selectToastIsActive } from "../../../redux/selector";
import { useEffect } from "react";
import { addToastIsActive } from "../../../redux/Slice/globalSlice";
const cx = classNames.bind(styles);
function ToastNotification({ action, message }) {
    const dispatch = useDispatch();
    const toastIsActive = useSelector(selectToastIsActive);

    useEffect(() => {
        let timer = setTimeout(() => {
            dispatch(addToastIsActive(false));
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, [dispatch, toastIsActive]);

    return (
        <div>
            <div className={cx("wrapper", { active: toastIsActive })}>
                <div className={cx("icon-container")}>
                    <ErrorIcon className={cx("icon")}></ErrorIcon>
                </div>
                <div className={cx("content")}>
                    <strong className={cx("action")}>{`${action}: `} </strong>
                    <span className={cx("message")}>{message}</span>
                </div>
            </div>
        </div>
    );
}

export default ToastNotification;
