import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import Modal from "../Modal/Modal";
import styles from "./CategoryModal.module.scss";
import {
    selectCategoryGroup,
    selectReloadCategory,
    selectCategory,
    selectCategoryStatus,
} from "../../../redux/selector";
import { addReloadCategory } from "../../../redux/Slice/categorySlice";
import Button from "../../Button/Button";
import * as service from "../../../service/categoryService";
const cx = classNames.bind(styles);
function CategoryModal({ className }) {
    const dispatch = useDispatch();
    const reloadCategory = useSelector(selectReloadCategory);
    const categoryGroups = useSelector(selectCategoryGroup);
    const categoryUpdate = useSelector(selectCategory);
    let categoryStatus = useSelector(selectCategoryStatus);
    const { id, fk_category_group_id, category_title } = categoryUpdate;

    const [category, setCategory] = useState({
        categoryGroupId: "",
        categoryTitle: "",
    });
    console.log(category);
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
            const result = await service.addCategory(category);
            dispatch(addReloadCategory(!reloadCategory));
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateCategory = async () => {
        try {
            const result = await service.updateCategory(id, category);
            dispatch(addReloadCategory(!reloadCategory));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (categoryUpdate) {
            setCategory({
                categoryGroupId: fk_category_group_id,
                categoryTitle: category_title,
            });
        }
    }, [categoryUpdate]);
    return (
        <Modal className={cx("wrapper")} title="Category">
            <div className={cx("content")}>
                <div className={cx("form-group")}>
                    <label className={cx("input-label")}>Product Status</label>
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
            {categoryStatus === "add" ? (
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
    );
}

export default CategoryModal;
