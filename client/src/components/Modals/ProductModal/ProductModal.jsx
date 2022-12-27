import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../Modal/Modal";
import Button from "../../Button/Button";
import styles from "./ProductModal.module.scss";
import * as productService from "../../../service/productService";
import FormInfo from "./ProductDetail/FormDetail";
import FormImage from "./ProductImage/FormImage";
import {
    selectProduct,
    selectProductImage,
    selectReload,
    selectProductImageFile,
    selectProductStatus,
    selectIsClearForm,
} from "../../../redux/selector";

import {
    addReloadProduct,
    addClearForm,
} from "../../../redux/Slice/productSlice";

const cx = classNames.bind(styles);

function ProductModal() {
    const [tab, setTab] = useState("info");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const productImageFiles = useSelector(selectProductImageFile);
    const productImages = useSelector(selectProductImage);
    const productStatus = useSelector(selectProductStatus);
    const isClearForm = useSelector(selectIsClearForm);
    const reload = useSelector(selectReload);
    let productData = new FormData();
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
    } = useSelector(selectProduct);

    // console.log("form modal");

    const handleChangeTab = (e) => {
        setTab(e);
    };

    const formDataFunc = () => {
        Array.from(productImageFiles).forEach((image) => {
            productData.append("productImages", image);
        });
        if (productStatus === "update") {
            productData.append("images", JSON.stringify(productImages));
        }
        productData.append("productName", productName);
        productData.append("productPrice", productPrice);
        productData.append("productSex", productSex);
        productData.append("categoryStatusId", categoryStatusId);
        productData.append("categoryStyleId", categoryStyleId);
        productData.append("categoryLineId", categoryLineId);
        productData.append("categoryCollectionId", categoryCollectionId);
        productData.append("categoryMaterialId", categoryMaterialId);
    };
    const handleAddProduct = async () => {
        formDataFunc();
        try {
            const response = await productService.createProduct(productData);
            if (response === "success") {
                setLoading(!loading);
                dispatch(addReloadProduct(!reload));
                dispatch(addClearForm(!isClearForm));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateProduct = async () => {
        formDataFunc();
        try {
            const response = await productService.updateProduct(
                productId,
                productData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            if (response === "success") {
                setLoading(!loading);
                dispatch(addReloadProduct(!reload));
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
