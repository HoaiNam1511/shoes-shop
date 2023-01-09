import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";

import styles from "./ActionButton.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ActionButton({ onClick, children, type }) {
    let Icon = SettingsIcon;
    let classes = type;
    if (type === "delete") {
        Icon = DeleteIcon;
    } else if (type === "update") {
        Icon = SettingsIcon;
    }
    return (
        <button className={cx("action-btn")} onClick={onClick}>
            <Icon className={cx("action-icon", classes)} />
        </button>
    );
}

export default ActionButton;
