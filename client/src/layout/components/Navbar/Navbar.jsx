import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
const cx = classNames.bind(styles);
function Navbar() {
  return (
    <div className={cx("nav")}>
      <h2>NAVBAR</h2>
    </div>
  );
}

export default Navbar;
