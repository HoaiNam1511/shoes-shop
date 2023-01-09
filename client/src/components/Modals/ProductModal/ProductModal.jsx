import PropTypes from "prop-types";
import { useState } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";

import * as productService from "../../../service/productService";

import Modal from "../Modal/Modal";
import Button from "../../Button/Button";
import styles from "./ProductModal.module.scss";
import FormInfo from "./ProductDetail/FormDetail";
import FormImage from "./ProductImage/FormImage";

import {
    selectProduct,
    selectProductImage,
    selectReload,
    selectProductImageFile,
    selectIsClearForm,
    selectActionBtnTitle,
    selectCurrentUser,
} from "../../../redux/selector";
import {
    addReload,
    addClearForm,
    addToast,
} from "../../../redux/Slice/globalSlice";
import { axiosCreateJWT } from "../../../util/jwtRequest";
import { loginSuccess } from "../../../redux/Slice/auth";

const cx = classNames.bind(styles);

function ProductModal() {
    const [tab, setTab] = useState("info");
    const dispatch = useDispatch();

    const productImageFiles = useSelector(selectProductImageFile);
    const productImages = useSelector(selectProductImage);
    const productStatus = useSelector(selectActionBtnTitle);
    const isClearForm = useSelector(selectIsClearForm);
    const reload = useSelector(selectReload);
    const currentUser = useSelector(selectCurrentUser);
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
            const result = await productService.createProduct(
                productData,
                {
                    headers: { token: currentUser?.token },
                },
                axiosCreateJWT(currentUser, dispatch, loginSuccess)
            );

            dispatch(addToast(result));
            dispatch(addReload(!reload));
            dispatch(addClearForm(!isClearForm));
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateProduct = async () => {
        formDataFunc();
        try {
            const result = await productService.updateProduct(
                productId,
                productData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        token: currentUser?.token,
                    },
                },
                axiosCreateJWT(currentUser, dispatch, loginSuccess)
            );

            dispatch(addToast(result));
            dispatch(addReload(!reload));
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
