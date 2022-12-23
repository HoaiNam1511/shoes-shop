import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../Modal";
import Button from "../../Button/Button";
import styles from "./ProductModal.module.scss";
import * as productService from "../../../service/productService";
import FormInfo from "./FormInfo/FormInfo";
import FormImage from "./FormImage/FormImage";
import {
    selectProduct,
    selectProductImage,
    selectReload,
    selectProductImageFile,
    selectProductStatus,
} from "../../../redux/selector";

import {
    addReload,
    addProductImage,
    addProductInfo,
} from "../../../redux/Slice/productSlice";

const cx = classNames.bind(styles);
function ProductModal() {
    const [tab, setTab] = useState("info");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const productImages = useSelector(selectProductImage);
    const productImageFiles = useSelector(selectProductImageFile);
    const productStatus = useSelector(selectProductStatus);
    const productInfo = useSelector(selectProduct);
    const reload = useSelector(selectReload);

    const handleChangeTab = (e) => {
        setTab(e);
    };

    const handleAddProduct = async () => {
        let productData = new FormData();
        Array.from(productImageFiles).forEach((image) => {
            productData.append("productImages", image);
        });
        productData.append("productName", productInfo.productName);
        productData.append("productPrice", productInfo.productPrice);
        productData.append("categoryStatusId", productInfo.categoryStatusId);
        productData.append("categoryStyleId", productInfo.categoryStyleId);
        productData.append("categoryLineId", productInfo.categoryLineId);
        productData.append(
            "categoryCollectionId",
            productInfo.categoryCollectionId
        );
        productData.append(
            "categoryMaterialId",
            productInfo.categoryMaterialId
        );
        try {
            const response = await productService.createProduct(productData);
            if (response === "success") {
                setLoading(!loading);
                dispatch(addReload(!reload));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateProduct = async () => {
        let productData = new FormData();
        Array.from(productImageFiles).forEach((image) => {
            productData.append("productImages", image);
        });
        productData.append("images", JSON.stringify(productImages));
        productData.append("productName", productInfo.productName);
        productData.append("productPrice", productInfo.productPrice);
        productData.append("categoryStatusId", productInfo.categoryStatusId);
        productData.append("categoryStyleId", productInfo.categoryStyleId);
        productData.append("categoryLineId", productInfo.categoryLineId);
        productData.append(
            "categoryCollectionId",
            productInfo.categoryCollectionId
        );
        productData.append(
            "categoryMaterialId",
            productInfo.categoryMaterialId
        );
        try {
            const response = await productService.updateProduct(
                productInfo.productId,
                productData
            );
            if (response === "success") {
                setLoading(!loading);
                dispatch(addReload(!reload));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal className={cx("wrapper")} title={`FORM ${tab.toUpperCase()}`}>
            <div className={cx("content")}>
                <div className={cx("tab")}>
                    <button
                        className={cx(
                            "tab-btn",
                            tab === "info" ? "btn-active" : ""
                        )}
                        onClick={() => handleChangeTab("info")}
                    >
                        INFO
                    </button>
                    <button
                        className={cx(
                            "tab-btn",
                            tab === "info" ? "" : "btn-active"
                        )}
                        onClick={() => handleChangeTab("image")}
                    >
                        IMAGE
                    </button>
                </div>

                <FormInfo
                    className={cx(tab === "info" ? "form-show" : "form-hide")}
                ></FormInfo>

                <FormImage
                    className={cx(tab === "info" ? "form-hide" : "form-show")}
                ></FormImage>

                {/* //sua lai thanh wrap */}
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
            </div>
        </Modal>
    );
}

export default ProductModal;
