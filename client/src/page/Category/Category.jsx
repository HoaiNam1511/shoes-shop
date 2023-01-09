import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./Category.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

import * as categoryService from "../../service/categoryService";

import CategoryModal from "../../components/Modals/CategoryModal/CategoryModal";
import Button from "../../components/Buttons/Button/Button";
import ActionButton from "../../components/Buttons/ActionButton/ActionButton";
import Paginate from "../../components/Paginate/Paginate";
import Arrow from "../../components/Buttons/Arrow/Arrow";

import { addCategoryGroup, addCategory } from "../../redux/Slice/categorySlice";
import {
    addReload,
    addModalStatus,
    addActionBtnTitle,
    addToast,
} from "../../redux/Slice/globalSlice";
import {
    selectReload,
    selectModalShow,
    selectCurrentUser,
} from "../../redux/selector";
import { axiosCreateJWT } from "../../util/jwtRequest";
import { loginSuccess } from "../../redux/Slice/auth";

const cx = classNames.bind(styles);
function Category() {
    const dispatch = useDispatch();
    const orderASC = "ASC";
    const orderDESC = "DESC";
    const [orderBy, setOrderBy] = useState(orderASC);
    const [sortBy, setSortBy] = useState("id");
    const [categorys, setCategorys] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const reload = useSelector(selectReload);
    const modalStatus = useSelector(selectModalShow);
    const currentUser = useSelector(selectCurrentUser);

    const handleAddProduct = () => {
        //Add title button
        dispatch(addActionBtnTitle("add"));
        //Open modal
        dispatch(addModalStatus(!modalStatus));
    };

    const categoryGroup = async () => {
        try {
            const response = await categoryService.getCategoryGroup();
            dispatch(addCategoryGroup(response));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        categoryGroup();
    }, [dispatch]);

    const category = async (sort = sortBy || "", order = orderBy || "") => {
        try {
            const response = await categoryService.getCategory(
                page,
                sort,
                order
            );
            setCategorys(response.data);
            setPageCount(response.totalPage);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        category();
    }, [reload, page]);

    const handleDeleteCategory = async (id) => {
        try {
            const result = await categoryService.deleteCategory(
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

    const handleUpdateCategory = (category) => {
        dispatch(addActionBtnTitle("update"));
        dispatch(addCategory(category));
        dispatch(addModalStatus(!modalStatus));
    };

    const handleSortCategory = (order, column) => {
        if (order === orderASC) {
            // console.log(e.currentTarget.textContent);
            // event.target.innerHTML = "&#9650;";
            category(column, order);
            setSortBy(column);
            setOrderBy(orderASC);
        } else if (order === orderDESC) {
            // event.target.innerHTML = "&#9660;";
            category(column, order);
            setSortBy(column);
            setOrderBy(orderDESC);
        }
    };

    return (
        <div>
            <Button
                onClick={handleAddProduct}
                leftIcon={<AddIcon fontSize="large" />}
            >
                Add
            </Button>
            <CategoryModal></CategoryModal>
            <table>
                <caption>Products</caption>

                <thead>
                    <tr>
                        <th>
                            #
                            <Arrow
                                arrowUp
                                onClick={() =>
                                    handleSortCategory(orderASC, "id")
                                }
                            ></Arrow>
                            <Arrow
                                arrowDown
                                onClick={() =>
                                    handleSortCategory(orderDESC, "id")
                                }
                            ></Arrow>
                        </th>
                        <th>
                            Title{" "}
                            <Arrow
                                arrowUp
                                onClick={() =>
                                    handleSortCategory(
                                        orderASC,
                                        "category_title"
                                    )
                                }
                            ></Arrow>
                            <Arrow
                                arrowDown
                                onClick={() =>
                                    handleSortCategory(
                                        orderDESC,
                                        "category_title"
                                    )
                                }
                            ></Arrow>
                        </th>
                        <th>
                            Category group{" "}
                            <Arrow
                                arrowUp
                                onClick={() =>
                                    handleSortCategory(
                                        orderASC,
                                        "fk_category_group_id"
                                    )
                                }
                            ></Arrow>
                            <Arrow
                                arrowDown
                                onClick={() =>
                                    handleSortCategory(
                                        orderDESC,
                                        "fk_category_group_id"
                                    )
                                }
                            ></Arrow>
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categorys.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.category_title}</td>
                            <td>
                                {category.category_group.category_group_title}
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

export default Category;
