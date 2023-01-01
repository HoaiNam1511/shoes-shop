import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";

import Button from "../../components/Button/Button";
import ActionButton from "../../components/Button/ActionButton/ActionButton";
import Paginate from "../../components/Paginate/Paginate";

import * as userService from "../../service/userService";
import styles from "./User.module.scss";
import classNames from "classnames/bind";

import UserModal from "../../components/Modals/UserModal/UserModal";
import {
    addModalStatus,
    addActionBtnTitle,
    addReload,
} from "../../redux/Slice/globalSlice";
import { addUser } from "../../redux/Slice/userSlice";
import { selectModalShow, selectReload } from "../../redux/selector";

const cx = classNames.bind(styles);
function User() {
    const dispatch = useDispatch();
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const modalStatus = useSelector(selectModalShow);
    const reload = useSelector(selectReload);
    useEffect(() => {
        const result = async () => {
            try {
                const response = await userService.getUser(page);
                setUsers(response.data);
                setPageCount(response.totalPage);
            } catch (error) {
                console.log(error);
            }
        };
        result();
    }, [page, reload]);

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
            await userService.deleteUser(id);
            dispatch(addReload(!reload));
        } catch (error) {
            console.log(error);
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
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
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
