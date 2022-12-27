import PropTypes from "prop-types";
import styles from "./MainLayout.module.scss";
import classNames from "classnames/bind";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
const cx = classNames.bind(styles);
function MainLayout({ children }) {
    return (
        <div className={cx("wrapper")}>
            <Sidebar></Sidebar>
            <div className={cx("main")}>
                <Navbar className={cx("navbar")}></Navbar>
                <div className={cx("main-content")}>{children}</div>
            </div>
        </div>
    );
}

export default MainLayout;
