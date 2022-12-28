import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import Button from "../../components/Button/Button";
import ActionButton from "../../components/Button/ActionButton/ActionButton";
import Paginate from "../../components/Paginate/Paginate";
import styles from "./User.module.scss";
import classNames from "classnames/bind";
import UserModal from "../../components/Modals/UserModal/UserModal";
import { addModalStatus } from "../../redux/Slice/globalSlice";
const cx = classNames.bind(styles);
function User() {
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const handleAddUser = () => {
        // dispatch(addCategoryStatus("add"));
        dispatch(addModalStatus(true));
    };
    const handleDeleteCategory = () => {};
    const handleUpdateCategory = () => {};
    const handleAddProduct = () => {};

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
                <caption>Products</caption>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category group</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {categorys.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.category_title}</td>
                            <td>
                                {category.Category_group.category_group_title}
                            </td>
                            <td>
                                <ActionButton
                                    type="delete"
                                    onClick={() =>
                                        handleDeleteCategory(category.id)
                                    }
                                ></ActionButton>
                                <ActionButton
                                    type="update"
                                    onClick={() =>
                                        handleUpdateCategory(category)
                                    }
                                ></ActionButton>
                            </td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
            <Paginate
                pageCount={3}
                onClick={(page) => setPage(page)}
            ></Paginate>
        </div>
    );
}

export default User;
