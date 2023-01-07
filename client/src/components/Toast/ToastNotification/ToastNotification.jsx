import classNames from "classnames/bind";
import ErrorIcon from "@mui/icons-material/Error";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ToastNotification.module.scss";
import { selectToastIsActive } from "../../../redux/selector";
import { useEffect, useState } from "react";
import { addToastIsActive } from "../../../redux/Slice/globalSlice";
const cx = classNames.bind(styles);
function ToastNotification({ className }) {
    const dispatch = useDispatch();
    const toastIsActive = useSelector(selectToastIsActive);
    const [test, setTest] = useState(false);
    const [active, setActive] = useState(false);
    let [toastArr, setToastArr] = useState([
        {
            id: 1,
            action: "add",
            message: "Add success",
        },
        {
            id: 2,
            action: "delete",
            message: "Delete success",
        },
        {
            id: 3,
            action: "update",
            message: "Update success",
        },
        {
            id: 4,
            action: "update",
            message: "Update success",
        },
        {
            id: 5,
            action: "update",
            message: "Update success",
        },
    ]);

    const hideToast = () => {
        let timer = setTimeout(() => {
            // dispatch(addToastIsActive(false));
            setActive(false);
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    };
    const deleteToast = useCallback(
        (id) => {
            const toastListItem = toastArr.filter((e) => e.id !== id);
            setToastArr(toastListItem);
        },
        [setToastArr, toastArr]
    );

    useEffect(() => {
        setActive(true);
        hideToast();
        const interval = setInterval(() => {
            if (toastArr.length) {
                deleteToast(toastArr[0].id);
            }
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [toastArr, deleteToast]);

    return (
        <div className={cx("notification")}>
            <button onClick={() => setTest((pre) => !pre)}>TEST</button>
            {toastArr.length > 0 &&
                toastArr?.map((toast) => (
                    <div
                        className={cx("wrapper", toast.action, {
                            active: active,
                        })}
                    >
                        <div className={cx("icon-container")}>
                            <ErrorIcon className={cx("icon")}></ErrorIcon>
                        </div>
                        <div className={cx("content")}>
                            <strong className={cx("action")}>
                                {`${toast.action}: `}{" "}
                            </strong>
                            <span className={cx("message")}>
                                {toast.message}
                            </span>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default ToastNotification;
