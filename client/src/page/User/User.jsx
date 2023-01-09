import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";

import AddIcon from "@mui/icons-material/Add";
import Button from "../../components/Buttons/Button/Button";
import ActionButton from "../../components/Buttons/ActionButton/ActionButton";
import Paginate from "../../components/Paginate/Paginate";
import Arrow from "../../components/Buttons/Arrow/Arrow";

import * as userService from "../../service/userService";
import * as authService from "../../service/authService";
import styles from "./User.module.scss";

import UserModal from "../../components/Modals/UserModal/UserModal";
import {
    addModalStatus,
    addActionBtnTitle,
    addReload,
    addToast,
} from "../../redux/Slice/globalSlice";
import { addUser } from "../../redux/Slice/userSlice";
import {
    selectModalShow,
    selectReload,
    selectCurrentUser,
} from "../../redux/selector";
import { loginSuccess } from "../../redux/Slice/auth";
import { axiosCreateJWT } from "../../util/jwtRequest";

const cx = classNames.bind(styles);
function User() {
    const dispatch = useDispatch();
    const orderASC = "ASC";
    const orderDESC = "DESC";
    const [orderBy, setOrderBy] = useState(orderASC);
    const [sortBy, setSortBy] = useState("id");
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const modalStatus = useSelector(selectModalShow);
    const reload = useSelector(selectReload);
    const currentUser = useSelector(selectCurrentUser);

    const handleAddUser = () => {
        dispatch(addActionBtnTitle("add"));
        dispatch(addModalStatus(!modalStatus));
    };
    const handleUpdateUser = (a) => {
        dispatch(addUser(a));
        dispatch(addActionBtnTitle("update"));
        dispatch(addModalStatus(!modalStatus));
    };

    const handleDeleteUser = async (id) => {
        try {
            const result = await userService.deleteUser(
                id,
                {
                    headers: { token: currentUser?.token },
                },
                axiosCreateJWT(currentUser, dispatch, loginSuccess)
            );
            dispatch(addToast(result));
            dispatch(addReload(!reload));
        } catch (error) {
            console.log(error);
        }
    };

    const getUser = async (column = sortBy || "", order = orderBy || "") => {
        try {
            const response = await userService.getUser(
                page,
                {
                    headers: { token: currentUser?.token },
                },
                axiosCreateJWT(currentUser, dispatch, loginSuccess),
                column,
                order
            );
            setUsers(response.data);
            setPageCount(response.totalPage);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, [page, reload]);

    const handleSortUser = (column, order) => {
        if (order === orderASC) {
            getUser(column, order);
            setSortBy(column);
            setOrderBy(orderASC);
        } else if (order === orderDESC) {
            getUser(column, order);
            setSortBy(column);
            setOrderBy(orderDESC);
        }
    };
    return (
        <div>
            <Button
                onClick={handleAddUser}
                leftIcon={<AddIcon fontSize="large" />}
            >
                Add
            </Button>
            <UserModal></UserModal>
            <table>
                <caption>Users</caption>
                <thead>
                    <tr>
                        <th>
                            #{" "}
                            <Arrow
                                arrowUp
                                onClick={() => handleSortUser("id", orderASC)}
                            ></Arrow>
                            <Arrow
                                arrowDown
                                onClick={() => handleSortUser("id", orderDESC)}
                            ></Arrow>
                        </th>
                        <th>
                            Name{" "}
                            <Arrow
                                arrowUp
                                onClick={() =>
                                    handleSortUser("user_name", orderASC)
                                }
                            ></Arrow>
                            <Arrow
                                arrowDown
                                onClick={() =>
                                    handleSortUser("user_name", orderDESC)
                                }
                            ></Arrow>
                        </th>
                        <th>
                            Email{" "}
                            <Arrow
                                arrowUp
                                onClick={() =>
                                    handleSortUser("email", orderASC)
                                }
                            ></Arrow>
                            <Arrow
                                arrowDown
                                onClick={() =>
                                    handleSortUser("email", orderDESC)
                                }
                            ></Arrow>
                        </th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.user_name}</td>
                            <td>{user.email}</td>
                            <td>{user.role[0].name}</td>
                            <td>
                                {user.status === "1" ? "Enable" : "Disable"}
                            </td>
                            <td>
                                <ActionButton
                                    type="delete"
                                    onClick={() => handleDeleteUser(user.id)}
                                ></ActionButton>
                                <ActionButton
                                    type="update"
                                    onClick={() => handleUpdateUser(user)}
                                ></ActionButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Paginate
                pageCount={pageCount}
                onClick={(page) => setPage(page)}
            ></Paginate>
        </div>
    );
}

export default User;
