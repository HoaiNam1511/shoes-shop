import { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";

import * as userService from "../../../service/userService";
import * as authService from "../../../service/authService";

import styles from "./UserModal.module.scss";
import Modal from "../Modal/Modal";
import Button from "../../Buttons/Button/Button";

import {
    selectIsClearForm,
    selectActionBtnTitle,
} from "../../../redux/selector";
import {
    reloadData,
    addToast,
    addClearForm,
} from "../../../redux/Slice/globalSlice";
import { selectUser } from "../../../redux/selector";
import { accountStatus } from "../../../data/";
import { selectCurrentUser } from "../../../redux/selector";
import { axiosCreateJWT } from "../../../util/jwtRequest";
import { loginSuccess } from "../../../redux/Slice/auth";

const cx = classNames.bind(styles);
function UserModal({ className }) {
    const dispatch = useDispatch();
    const [roles, setRoles] = useState([]);
    const actionButtonTitle = useSelector(selectActionBtnTitle);
    const userRedux = useSelector(selectUser);
    const currentUser = useSelector(selectCurrentUser);
    const isClearForm = useSelector(selectIsClearForm);
    const [user, setUser] = useState({
        id: "",
        email: "",
        useName: "",
        password: "",
        status: true,
        role: "",
    });
    const { id, email, useName, password, status, role } = user;

    const userInfoUpdate = () => {
        if (userRedux.id) {
            setUser({
                id: userRedux.id,
                email: userRedux.email,
                useName: userRedux.user_name,
                password: userRedux.password,
                status: userRedux.status,
                role: userRedux.role[0].User_role.RoleId,
            });
        }
    };

    useEffect(() => {
        userInfoUpdate();
    }, [userRedux]);

    const getRole = async () => {
        try {
            const roles = await authService.getRole();
            setRoles(roles);
            setUser({
                ...user,
                role: roles[0].id,
                status: accountStatus[0].status,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRole();
    }, []);

    const handleValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleKeyDown = (e) => {
        if (e.key === " ") {
            e.preventDefault();
        }
    };

    const handleAddUser = async () => {
        try {
            const result = await userService.createUser(
                user,
                {
                    headers: { token: currentUser?.token },
                },
                axiosCreateJWT(currentUser, dispatch, loginSuccess)
            );
            dispatch(addToast(result));
            dispatch(reloadData());
            dispatch(addClearForm());
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            const result = await userService.updateUser(
                id,
                user,
                {
                    headers: {
                        token: currentUser?.token,
                        userUpdate: userRedux.user_name,
                        auth: currentUser.user.user_name,
                    },
                },
                axiosCreateJWT(currentUser, dispatch, loginSuccess)
            );
            dispatch(addToast(result));
            dispatch(reloadData());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setUser({
            ...user,
            id: "",
            email: "",
            useName: "",
            password: "",
        });
    }, [isClearForm]);

    return (
        <Modal className={cx("wrapper")} title="User">
            <div className={cx("content")}>
                <div className={cx("form-group")}>
                    <label className={cx("input-label")}>Enter Email *</label>
                    <input
                        className={cx("form-input")}
                        type="text"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={handleValueChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className={cx("form-group")}>
                    <label className={cx("input-label")}>User Name *</label>
                    <input
                        className={cx("form-input")}
                        type="text"
                        placeholder="User name"
                        value={useName}
                        name="useName"
                        onChange={handleValueChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className={cx("form-group")}>
                    <label className={cx("input-label")}>Password *</label>
                    <input
                        className={cx("form-input")}
                        type="text"
                        placeholder="Password"
                        value={password}
                        name="password"
                        onChange={handleValueChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className={cx("form-group")}>
                    <label className={cx("input-label")}>Account Status</label>
                    <select
                        className={cx("select")}
                        name="status"
                        value={status}
                        onChange={handleValueChange}
                    >
                        {accountStatus.map((status) => (
                            <option key={status.id} value={status.status}>
                                {status.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={cx("form-group")}>
                    <label className={cx("input-label")}>Role & Access</label>
                    <select
                        className={cx("select")}
                        name="role"
                        onChange={handleValueChange}
                        value={role}
                    >
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {`${role.name} - ${role.description}`}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {actionButtonTitle === "add" ? (
                <div className={cx("btn-container")}>
                    <Button onClick={handleAddUser} className={cx("modal-btn")}>
                        Add
                    </Button>
                </div>
            ) : (
                <div className={cx("btn-container")}>
                    <Button
                        onClick={handleUpdateUser}
                        className={cx("modal-btn")}
                    >
                        Update
                    </Button>
                </div>
            )}
        </Modal>
    );
}

export default memo(UserModal);
