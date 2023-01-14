import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Category.module.scss";
import classNames from "classnames/bind";
import AddIcon from "@mui/icons-material/Add";

import * as categoryService from "../../service/categoryService";
import { axiosCreateJWT } from "../../util/jwtRequest";

import CategoryModal from "../../components/Modals/CategoryModal/CategoryModal";
import Button from "../../components/Buttons/Button/Button";
import ActionButton from "../../components/Buttons/ActionButton/ActionButton";
import Paginate from "../../components/Paginate/Paginate";
import Arrow from "../../components/Buttons/Arrow/Arrow";

import { addCategory } from "../../redux/Slice/categorySlice";
import {
    reloadData,
    openModal,
    updateBtnTitle,
    addBtnTitle,
    addToast,
} from "../../redux/Slice/globalSlice";
import { selectReload, selectCurrentUser } from "../../redux/selector";
import { loginSuccess } from "../../redux/Slice/auth";

const cx = classNames.bind(styles);
function Category() {
    const dispatch = useDispatch();
    const orderASC = "ASC";
    const orderDESC = "DESC";
    const [sort, setSort] = useState({
        sortBy: "id",
        orderBy: orderASC,
    });
    const [categorys, setCategorys] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const reload = useSelector(selectReload);
    const currentUser = useSelector(selectCurrentUser);
    const { sortBy, orderBy } = sort;

    const handleAddProduct = () => {
        //Add title button
        dispatch(addBtnTitle());
        //Open modal
        dispatch(openModal());
    };

    const category = async (column = sortBy || "", order = orderBy || "") => {
        try {
            const response = await categoryService.getCategory(
                page,
                column,
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
            dispatch(reloadData());
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateCategory = (category) => {
        dispatch(updateBtnTitle());
        dispatch(addCategory(category));
        dispatch(openModal());
    };
    // Handle sort table
    const handleSortCategory = (column, order) => {
        if (order === orderASC) {
            category(column, order);
            setSort({ sortBy: column, order: order });
        } else if (order === orderDESC) {
            category(column, order);
            setSort({ sortBy: column, order: order });
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
                                    handleSortCategory("id", orderASC)
                                }
                            ></Arrow>
                            <Arrow
                                arrowDown
                                onClick={() =>
                                    handleSortCategory("id", orderDESC)
                                }
                            ></Arrow>
                        </th>
                        <th>
                            Title{" "}
                            <Arrow
                                arrowUp
                                onClick={() =>
                                    handleSortCategory(
                                        "category_title",
                                        orderASC
                                    )
                                }
                            ></Arrow>
                            <Arrow
                                arrowDown
                                onClick={() =>
                                    handleSortCategory(
                                        "category_title",
                                        orderDESC
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
                                        "fk_category_group_id",
                                        orderASC
                                    )
                                }
                            ></Arrow>
                            <Arrow
                                arrowDown
                                onClick={() =>
                                    handleSortCategory(
                                        "fk_category_group_id",
                                        orderDESC
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
