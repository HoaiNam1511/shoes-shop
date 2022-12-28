import PropTypes from "prop-types";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import config from "../../../config";
import SidebarItem from "./SidebarItem";
import adminImage from "../../../asset/images/admin_icon.png";
const cx = classNames.bind(styles);
function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const removeCookie = await Cookies.remove("token");
        navigate("/login");
    };
    return (
        <div className={cx("sidebar")}>
            <div className={cx("sidebar-header")}>
                <img className={cx("image")} src={adminImage} alt="Admin" />

                <span className={cx("title")}>
                    Xin chào, <strong>Hoai Nam</strong>
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
