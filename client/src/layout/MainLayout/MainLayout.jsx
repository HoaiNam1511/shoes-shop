import PropTypes from "prop-types";
import styles from "./MainLayout.module.scss";
import classNames from "classnames/bind";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/selector";
import { Navigate } from "react-router-dom";
const cx = classNames.bind(styles);
function MainLayout({ children }) {
    const currentUser = useSelector(selectCurrentUser);
    return currentUser?.token ? (
        <div className={cx("wrapper")}>
            <Sidebar></Sidebar>
            <div className={cx("main")}>
                <Navbar className={cx("navbar")}></Navbar>
                <div className={cx("main-content")}>{children}</div>
            </div>
        </div>
    ) : (
        <Navigate to="/login"></Navigate>
    );
}

export default MainLayout;
