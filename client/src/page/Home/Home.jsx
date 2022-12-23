import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";

import { setModalHide } from "../../redux/Slice/modalSlice";

import { useSelector } from "react-redux";
const cx = classNames.bind(styles);
function Home() {
    return <div>Home</div>;
}

export default Home;
