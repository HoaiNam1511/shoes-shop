import axios from "axios";
import styles from "./Sidebar.module.scss";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import HomeIcon from "@mui/icons-material/Home";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import * as authService from "../../../service/authService";
import { axiosCreateJWT } from "../../../util/jwtRequest";

import config from "../../../config";
import SidebarItem from "./SidebarItem";
import adminImage from "../../../asset/images/admin_icon.png";

import { selectCurrentUser } from "../../../redux/selector";
import {
    logOutStart,
    logOutSuccess,
    logOutFail,
} from "../../../redux/Slice/auth";
const cx = classNames.bind(styles);
function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    const handleLogout = async () => {
        dispatch(logOutStart());
        try {
            await authService.logOut(
                { id: currentUser.user.id },
                {
                    headers: { token: currentUser?.token },
                },
                axiosCreateJWT(currentUser, dispatch, logOutSuccess)
            );
            dispatch(logOutSuccess());
            navigate("/login");
        } catch (error) {
            console.log(error);
            dispatch(logOutFail());
        }
    };
    return (
        <div className={cx("sidebar")}>
            <div className={cx("sidebar-header")}>
                <img className={cx("image")} src={adminImage} alt="Admin" />

                <span className={cx("title")}>
                    {currentUser && (
                        <strong>{`Hello, ${currentUser.user.user_name}`}</strong>
                    )}
                </span>
            </div>
            <div className={cx("sidebar-item")}>
                <SidebarItem
                    to={config.routes.home}
                    title="Home"
                    icon={<HomeIcon fontSize="large"></HomeIcon>}
                />
                <SidebarItem
                    to={config.routes.product}
                    title="Product"
                    icon={
                        <ProductionQuantityLimitsIcon></ProductionQuantityLimitsIcon>
                    }
                />
                <SidebarItem
                    to={config.routes.category}
                    title="Category"
                    icon={<CategoryIcon fontSize="large"></CategoryIcon>}
                />
                <SidebarItem
                    to={config.routes.order}
                    title="Order"
                    icon={<StoreIcon fontSize="large"></StoreIcon>}
                />
                <SidebarItem
                    to={config.routes.user}
                    title="User"
                    icon={
                        <AccountCircleIcon fontSize="large"></AccountCircleIcon>
                    }
                />
                <SidebarItem
                    onClick={handleLogout}
                    className={cx("btn-logout", "default")}
                    title="Logout"
                    icon={<LogoutIcon fontSize="large"></LogoutIcon>}
                />
            </div>
        </div>
    );
}

export default Sidebar;
