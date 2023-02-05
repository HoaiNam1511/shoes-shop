import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Modal.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/Slice/globalSlice";
import { selectModalShow } from "../../../redux/selector";

const cx = classNames.bind(styles);
function Modal({ children, className, title = "THIS IS TITLE" }) {
    const dispatch = useDispatch();
    let modalShow = useSelector(selectModalShow);
    const handleCloseModal = () => {
        dispatch(closeModal());
    };
    return (
        <>
            {modalShow && (
                <div className={cx("wrapper")}>
                    <div className={cx("modal", { [className]: className })}>
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
            )}
        </>
    );
}

export default Modal;
