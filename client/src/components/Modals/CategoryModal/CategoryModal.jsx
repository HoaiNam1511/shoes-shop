import { useState } from "react";
import styles from "./CategoryModal.module.scss";
import classNames from "classnames/bind";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import { selectCategoryGroup } from "../../../redux/selector";
import Button from "../../Button/Button";
const cx = classNames.bind(styles);
function CategoryModal({ className }) {
    const categoryGroups = useSelector(selectCategoryGroup);
    const [category, setCategory] = useState({
        categoryGroupId: 1,
        categoryTitle: "",
    });
    const { categoryGroupId, categoryTitle } = category;
    const handleValueChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };
    let productStatus = "add";
    const handleAddProduct = () => {};
    const handleUpdateProduct = () => {};
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
            {productStatus === "add" ? (
                <div className={cx("btn-container")}>
                    <Button
                        onClick={handleAddProduct}
                        className={cx("modal-btn")}
                    >
                        Add
                    </Button>
                </div>
            ) : (
                <div className={cx("btn-container")}>
                    <Button
                        onClick={handleUpdateProduct}
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
