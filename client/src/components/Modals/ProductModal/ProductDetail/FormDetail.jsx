import PropTypes from "prop-types";
import { useState, useEffect, memo } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";

import styles from "./FormDetail.module.scss";
import { productsSex } from "../../../../data/index";
import {
    selectCategory,
    selectProduct,
    selectIsClearForm,
} from "../../../../redux/selector";
import { addProductInfo } from "../../../../redux/Slice/productSlice";

const cx = classNames.bind(styles);
function FormInfo({ className }) {
    const dispatch = useDispatch();
    const categorys = useSelector(selectCategory);
    const productInfo = useSelector(selectProduct);
    const isClearForm = useSelector(selectIsClearForm);

    const [product, setProduct] = useState({
        productId: "",
        productName: "",
        productPrice: "",
        productSex: "male",
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
        productSex,
        categoryStatusId,
        categoryStyleId,
        categoryLineId,
        categoryCollectionId,
        categoryMaterialId,
    } = product;

    // Clear form
    useEffect(() => {
        setProduct({
            ...product,
            productId: "",
            productName: "",
            productPrice: "",
        });
    }, [isClearForm]);

    // Dispatch product when change value
    useEffect(() => {
        dispatch(addProductInfo(product));
    }, [dispatch, product]);

    // Handle value to state when have action
    const handleValueChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // Get default initial category
    const filterInitialValue = () => {
        let initialCategoryId = categorys?.filter((category, index, arr) => {
            return (
                index ===
                arr.findIndex(
                    (i) =>
                        i?.fk_category_group_id ===
                        category?.fk_category_group_id
                )
            );
        });

        if (initialCategoryId.length > 0) {
            setProduct({
                ...product,
                categoryStatusId: initialCategoryId[0]?.id,
                categoryStyleId: initialCategoryId[1]?.id,
                categoryLineId: initialCategoryId[2]?.id,
                categoryCollectionId: initialCategoryId[3]?.id,
                categoryMaterialId: initialCategoryId[4]?.id,
            });
        }
    };

    useEffect(() => {
        filterInitialValue();
    }, [categorys]);

    // Set state product when action update
    const productInfoUpdate = () => {
        if (productInfo.id) {
            setProduct({
                productId: productInfo?.id,
                productName: productInfo?.product_name,
                productPrice: productInfo?.product_price,
                productSex: productInfo?.product_sex,
                categoryStatusId: productInfo?.fk_category_status_id,
                categoryStyleId: productInfo?.fk_category_style_id,
                categoryLineId: productInfo?.fk_category_line_id,
                categoryCollectionId: productInfo?.fk_category_collection_id,
                categoryMaterialId: productInfo?.fk_category_material_id,
            });
        }
    };

    useEffect(() => {
        productInfoUpdate();
    }, [productInfo]);

    return (
        <div className={cx("wrapper", className)}>
            <div className={cx("form-group")}>
                <label className={cx("input-label")}>Name</label>
                <input
                    className={cx("form-input")}
                    type="text"
                    placeholder="Product name"
                    value={productName}
                    name="productName"
                    onChange={handleValueChange}
                />
            </div>
            <div className={cx("form-group")}>
                <label className={cx("input-label")}>Sex</label>
                <div className={cx("radio-container")}>
                    {productsSex.map((sex) => (
                        <span className={cx("radio-item")} key={sex.id}>
                            <input
                                className={cx("radio")}
                                type="radio"
                                value={sex.value}
                                name="productSex"
                                onChange={handleValueChange}
                                checked={productSex === sex.value}
                            />
                            <label
                                className={cx("radio-label")}
                                htmlFor={sex.id}
                            >
                                {sex.title}
                            </label>
                        </span>
                    ))}
                </div>
            </div>
            <div className={cx("form-group", "flex-2")}>
                <div className={cx("flex-item")}>
                    <label className={cx("input-label")}>Price</label>
                    <input
                        className={cx("form-input")}
                        type="text"
                        placeholder="Product price"
                        value={productPrice}
                        name="productPrice"
                        onChange={handleValueChange}
                    />
                </div>
                <div className={cx("flex-item")}>
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
            </div>
            <div className={cx("form-group", "flex-2")}>
                <div className={cx("flex-item")}>
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
                <div className={cx("flex-item")}>
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
            </div>

            <div className={cx("form-group", "flex-2")}>
                <div className={cx("flex-item")}>
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
                <div className={cx("flex-item")}>
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

export default memo(FormInfo);
