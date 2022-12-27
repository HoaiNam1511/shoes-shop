import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./Category.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";

import CategoryModal from "../../components/Modals/CategoryModal/CategoryModal";
import Button from "../../components/Button/Button";
import ActionButton from "../../components/Button/ActionButton/ActionButton";

import { setModalShow } from "../../redux/Slice/modalSlice";
import {
    addCategoryGroup,
    addReloadCategory,
    addCategoryStatus,
    addCategory,
} from "../../redux/Slice/categorySlice";
import { selectReloadCategory } from "../../redux/selector";

import * as categoryService from "../../service/categoryService";
const cx = classNames.bind(styles);

function Category() {
    const dispatch = useDispatch();
    const [categorys, setCategorys] = useState([]);
    const reloadCategory = useSelector(selectReloadCategory);
    const handleAddProduct = () => {
        dispatch(addCategoryStatus("add"));
        dispatch(setModalShow(true));
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
                const response = await categoryService.getCategory();
                setCategorys(response);
            } catch (error) {
                console.log(error);
            }
        };
        result();
    }, [reloadCategory]);

    const handleDeleteCategory = (id) => {
        const result = async () => {
            try {
                await categoryService.deleteCategory(id);
                dispatch(addReloadCategory(!reloadCategory));
            } catch (error) {
                console.log(error);
            }
        };
        result();
    };
    const handleUpdateCategory = (category) => {
        dispatch(addCategoryStatus("update"));
        dispatch(addCategory(category));
        dispatch(setModalShow(true));
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
        </div>
    );
}

export default Category;
