import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import Modal from "../Modal/Modal";

import * as service from "../../../service/categoryService";

import Button from "../../Button/Button";
import styles from "./CategoryModal.module.scss";

import {
    selectCategoryGroup,
    selectCategory,
    selectReload,
    selectActionBtnTitle,
    selectCurrentUser,
} from "../../../redux/selector";
import { addReload } from "../../../redux/Slice/globalSlice";
import { axiosCreateJWT } from "../../../util/jwtRequest";
import { loginSuccess, logOutSuccess } from "../../../redux/Slice/auth";
import ToastNotification from "../../Toast/ToastNotification/ToastNotification";
const cx = classNames.bind(styles);

function CategoryModal({ className }) {
    const dispatch = useDispatch();
    const reload = useSelector(selectReload);
    const categoryGroups = useSelector(selectCategoryGroup);
    const categoryRedux = useSelector(selectCategory);
    const currentUser = useSelector(selectCurrentUser);
    let actionBtnTitle = useSelector(selectActionBtnTitle);
    const [notification, setNotification] = useState("");

    console.log(notification);
    const { id, fk_category_group_id, category_title } = categoryRedux;

    const [category, setCategory] = useState({
        categoryGroupId: "",
        categoryTitle: "",
    });
    useEffect(() => {
        if (categoryGroups.length > 0) {
            setCategory({
                categoryGroupId: categoryGroups[0].id,
                categoryTitle: "",
            });
        }
    }, [categoryGroups]);
    const { categoryGroupId, categoryTitle } = category;
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
            setNotification(result);
            dispatch(addReload(!reload));
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
            setNotification(result);
            dispatch(addReload(!reload));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (categoryRedux) {
            setCategory({
                categoryGroupId: fk_category_group_id,
                categoryTitle: category_title,
            });
        }
    }, [categoryRedux]);
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
