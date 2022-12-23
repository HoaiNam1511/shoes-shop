import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";

import { selectCategory, selectProduct } from "../../../../redux/selector";
import { addProductInfo } from "../../../../redux/Slice/productSlice";

import styles from "./FormInfo.module.scss";

const cx = classNames.bind(styles);
function FormInfo({ className }) {
    const dispatch = useDispatch();
    const categorys = useSelector(selectCategory);
    const productInfo = useSelector(selectProduct);

    const [product, setProduct] = useState({
        productId: "",
        productName: "",
        productPrice: "",
        categoryStatusId: "",
        categoryStyleId: "",
        categoryLineId: "",
        categoryCollectionId: "",
        categoryMaterialId: "",
    });
    const {
        productId,
        productName,
        productPrice,
        categoryStatusId,
        categoryStyleId,
        categoryLineId,
        categoryCollectionId,
        categoryMaterialId,
    } = product;

    useEffect(() => {
        dispatch(addProductInfo(product));
    }, [product]);

    const handleValueChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        let initialCategoryId = categorys.filter((category, index, arr) => {
            return (
                index ===
                arr.findIndex(
                    (i) =>
                        i.fk_category_group_id === category.fk_category_group_id
                )
            );
        });

        if (initialCategoryId.length > 0) {
            setProduct({
                productId: "",
                productName: "",
                productPrice: "",
                categoryStatusId: initialCategoryId[0].id,
                categoryStyleId: initialCategoryId[1].id,
                categoryLineId: initialCategoryId[2].id,
                categoryCollectionId: initialCategoryId[3].id,
                categoryMaterialId: initialCategoryId[4].id,
            });
        }
    }, [categorys]);

    useEffect(() => {
        if (productInfo.id) {
            setProduct({
                productId: productInfo.id,
                productName: productInfo.product_title,
                productPrice: productInfo.product_price,
                categoryStatusId: productInfo.fk_category_status_id,
                categoryStyleId: productInfo.fk_category_style_id,
                categoryLineId: productInfo.fk_category_line_id,
                categoryCollectionId: productInfo.fk_category_collection_id,
                categoryMaterialId: productInfo.fk_category_material_id,
            });
        }
    }, [productInfo]);

    return (
        <div className={cx("wrapper", className)}>
            <div className={cx("form-group")}>
                <label className={cx("input-label")}>Name</label>
                <input
                    className={cx("form-input")}
                    type="text"
                    placeholder="Product name"
                    value={productName || ""}
                    name="productName"
                    onChange={handleValueChange}
                />
            </div>
            <div className={cx("form-group")}>
                <label className={cx("input-label")}>Price</label>
                <input
                    className={cx("form-input")}
                    type="text"
                    placeholder="Product price"
                    value={productPrice || ""}
                    name="productPrice"
                    onChange={handleValueChange}
                />
            </div>
            <div className={cx("flex-2")}>
                <div className={cx("form-group", "flex-item")}>
                    <label className={cx("input-label")}>Product Status</label>
                    <select
                        className={cx("select")}
                        name="categoryStatusId"
                        onChange={handleValueChange}
                        value={categoryStatusId}
                    >
                        {categorys.map((category) => {
                            if (category.fk_category_group_id === 1) {
                                return (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.category_title}
                                    </option>
                                );
                            }
                        })}
                    </select>
                </div>
                <div className={cx("form-group", "flex-item")}>
                    <label className={cx("input-label")}>Style</label>
                    <select
                        className={cx("select")}
                        name="categoryStyleId"
                        onChange={handleValueChange}
                        value={categoryStyleId}
                    >
                        {categorys.map((category) => {
                            if (category.fk_category_group_id === 2) {
                                return (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.category_title}
                                    </option>
                                );
                            }
                        })}
                    </select>
                </div>
            </div>
            <div className={cx("flex-2")}>
                <div className={cx("form-group", "flex-item")}>
                    <label className={cx("input-label")}>Product Line</label>
                    <select
                        className={cx("select")}
                        name="categoryLineId"
                        value={categoryLineId}
                        onChange={handleValueChange}
                    >
                        {categorys.map((category) => {
                            if (category.fk_category_group_id === 3) {
                                return (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.category_title}
                                    </option>
                                );
                            }
                        })}
                    </select>
                </div>
                <div className={cx("form-group", "flex-item")}>
                    <label className={cx("input-label")}>Collection</label>
                    <select
                        className={cx("select")}
                        name="categoryCollectionId"
                        value={categoryCollectionId}
                        onChange={handleValueChange}
                    >
                        {categorys.map((category) => {
                            if (category.fk_category_group_id === 4) {
                                return (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.category_title}
                                    </option>
                                );
                            }
                        })}
                    </select>
                </div>
            </div>

            <div className={cx("flex-2")}>
                <div className={cx("form-group", "flex-item")}>
                    <label className={cx("input-label")}>Material</label>
                    <select
                        className={cx("select")}
                        name="categoryMaterialId"
                        value={categoryMaterialId}
                        onChange={handleValueChange}
                    >
                        {categorys.map((category) => {
                            if (category.fk_category_group_id === 5) {
                                return (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.category_title}
                                    </option>
                                );
                            }
                        })}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default FormInfo;
