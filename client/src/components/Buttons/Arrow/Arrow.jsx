import classNames from "classnames/bind";
import styles from "./Arrow.module.scss";
import { useRef } from "react";
const cx = classNames.bind(styles);
function Arrow({ arrowUp, arrowDown, onClick }) {
    let refArrow = useRef();

    // if (arrowUp) {
    //     refArrow.current.innerHTML = "&#8593;";
    // } else if (arrowDown) {
    //     refArrow.current.innerHTML = "&#8595";
    // }
    return (
        <>
            {arrowUp && (
                <span ref={refArrow} className={cx("arrow")} onClick={onClick}>
                    &#8593;
                </span>
            )}
            {arrowDown && (
                <span ref={refArrow} className={cx("arrow")} onClick={onClick}>
                    &#8595;
                </span>
            )}
        </>
    );
}

export default Arrow;
