import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./Category.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";

import * as categoryService from "../../service/categoryService";

import CategoryModal from "../../components/Modals/CategoryModal/CategoryModal";
import Button from "../../components/Button/Button";
import ActionButton from "../../components/Button/ActionButton/ActionButton";
import Paginate from "../../components/Paginate/Paginate";

import { addCategoryGroup, addCategory } from "../../redux/Slice/categorySlice";
import {
    addReload,
    addModalStatus,
    addActionBtnTitle,
} from "../../redux/Slice/globalSlice";
import { selectReload, selectModalShow } from "../../redux/selector";

import useAuth from "../../hooks/useAuth";
const cx = classNames.bind(styles);

function Category() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [categorys, setCategorys] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const reload = useSelector(selectReload);
    const modalStatus = useSelector(selectModalShow);
    // const auth = useAuth();
    // const loader = async () => {
    //     if (!auth) {
    //         navigate("/login");
    //     }
    // };
    // loader();
    const handleAddProduct = () => {
        dispatch(addActionBtnTitle("add"));
        dispatch(addModalStatus(!modalStatus));
    };

    useEffect(() => {
        const result = async () => {
            try {
                const response = await categoryService.getCategoryGroup();
                dispatch(addCategoryGroup(response));
            } catch (error) {
                console.log(error);
            }
        };
        result();
    }, [dispatch]);

    useEffect(() => {
        const result = async () => {
            try {
                const response = await categoryService.getCategory(page);
                setCategorys(response.data);
                setPageCount(response.totalPage);
            } catch (error) {
                console.log(error);
            }
        };
        result();
    }, [reload, page]);

    const handleDeleteCategory = (id) => {
        const result = async () => {
            try {
                await categoryService.deleteCategory(id);
                dispatch(addReload(!reload));
            } catch (error) {
                console.log(error);
            }
        };
        result();
    };
    const handleUpdateCategory = (category) => {
        dispatch(addActionBtnTitle("update"));
        dispatch(addCategory(category));
        dispatch(addModalStatus(!modalStatus));
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
                        <th>#</th>
                        <th>Title</th>
                        <th>Category group</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categorys.map((category) => (
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
