import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Modal.module.scss";
import { useDispatch } from "react-redux";
import { setModalHide } from "../../redux/Slice/modalSlice";
import { selectModalHide } from "../../redux/selector";

const cx = classNames.bind(styles);
function Modal({ children, className, title = "THIS IS TITLE" }) {
    const dispatch = useDispatch();
    const close = useSelector(selectModalHide);
    const handleCloseModal = () => {
        dispatch(setModalHide(true));
    };
    const classes = cx("wrapper", { [className]: className });
    return (
        <div className={cx("modal-background", { close: close })}>
            <div className={classes}>
                <div className={cx("header")}>
                    <h2 className={cx("title")}>{title}</h2>
                    <button
                        onClick={handleCloseModal}
                        className={cx("close-btn")}
                    >
                        x
                    </button>
                </div>
                <div className={cx("content")}>{children}</div>
            </div>
        </div>
    );
}

export default Modal;
