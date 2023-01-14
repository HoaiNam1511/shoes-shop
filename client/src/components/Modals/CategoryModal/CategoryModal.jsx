import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";

import * as service from "../../../service/categoryService";
import * as categoryService from "../../../service/categoryService";

import Modal from "../Modal/Modal";
import Button from "../../Buttons/Button/Button";
import styles from "./CategoryModal.module.scss";

import {
    selectCategory,
    selectIsClearForm,
    selectActionBtnTitle,
    selectCurrentUser,
} from "../../../redux/selector";
import {
    reloadData,
    addToast,
    addClearForm,
} from "../../../redux/Slice/globalSlice";
import { axiosCreateJWT } from "../../../util/jwtRequest";
import { loginSuccess, logOutSuccess } from "../../../redux/Slice/auth";

const cx = classNames.bind(styles);

function CategoryModal({ className }) {
    const dispatch = useDispatch();
    // const categoryGroups = useSelector(selectCategoryGroup);
    const [categoryGroups, setCategoryGroups] = useState([]);
    const categoryInfo = useSelector(selectCategory);
    const currentUser = useSelector(selectCurrentUser);
    const actionBtnTitle = useSelector(selectActionBtnTitle);
    const isClearForm = useSelector(selectIsClearForm);
    const { id, fk_category_group_id, category_title } = categoryInfo;
    const [category, setCategory] = useState({
        categoryGroupId: "",
        categoryTitle: "",
    });
    const { categoryGroupId, categoryTitle } = category;

    const categoryGroup = async () => {
        try {
            const response = await categoryService.getCategoryGroup();
            setCategoryGroups(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        categoryGroup();
    }, [dispatch]);
    // Get category group
    useEffect(() => {
        if (categoryGroups.length > 0) {
            setCategory({
                categoryGroupId: categoryGroups[0].id,
                categoryTitle: "",
            });
        }
    }, [categoryGroups]);

    const handleValueChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleAddCategory = async () => {
        try {
            const result = await service.addCategory(
                category,
                {
                    headers: { token: currentUser?.token },
                },
                axiosCreateJWT(currentUser, dispatch, loginSuccess)
            );
            dispatch(addToast(result));
            dispatch(addClearForm());
            dispatch(reloadData());
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateCategory = async () => {
        try {
            const result = await service.updateCategory(
                id,
                category,
                {
                    headers: { token: currentUser?.token },
                },
                axiosCreateJWT(currentUser, dispatch, logOutSuccess)
            );
            dispatch(addToast(result));
            dispatch(reloadData());
        } catch (error) {
            console.log(error);
        }
    };
    //Set category when update
    useEffect(() => {
        if (categoryInfo) {
            setCategory({
                categoryGroupId: fk_category_group_id,
                categoryTitle: category_title,
            });
        }
    }, [categoryInfo]);
    //Clear category
    useEffect(() => {
        setCategory({
            ...category,
            categoryTitle: "",
        });
    }, [isClearForm]);

    return (
        <div>
            <Modal className={cx("wrapper")} title="Category">
                <div className={cx("content")}>
                    <div className={cx("form-group")}>
                        <label className={cx("input-label")}>
                            Product Status
                        </label>
                        <select
                            className={cx("select")}
                            name="categoryGroupId"
                            onChange={handleValueChange}
                            value={categoryGroupId}
                        >
                            {categoryGroups.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.category_group_title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx("form-group")}>
                        <label className={cx("input-label")}>Name</label>
                        <input
                            className={cx("form-input")}
                            type="text"
                            placeholder="Product name"
                            value={categoryTitle}
                            name="categoryTitle"
                            onChange={handleValueChange}
                        />
                    </div>
                </div>
                {actionBtnTitle === "add" ? (
                    <div className={cx("btn-container")}>
                        <Button
                            onClick={handleAddCategory}
                            className={cx("modal-btn")}
                        >
                            Add
                        </Button>
                    </div>
                ) : (
                    <div className={cx("btn-container")}>
                        <Button
                            onClick={handleUpdateCategory}
                            className={cx("modal-btn")}
                        >
                            Update
                        </Button>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default CategoryModal;
