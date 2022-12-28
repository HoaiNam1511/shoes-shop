import PropTypes from "prop-types";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);
function SidebarItem({ icon, title, to, className, onClick }) {
    return (
        <NavLink
            className={(nav) => cx("item", className, { active: nav.isActive })}
            to={to}
            onClick={onClick}
        >
            <span className={cx("item-icon")}>{icon}</span>
            <span className={cx("item-title")}>{title}</span>
        </NavLink>
    );
}
SidebarItem.propTypes = {
    icon: PropTypes.node,
    title: PropTypes.string,
    to: PropTypes.string,
};
export default SidebarItem;
