import PropTypes from "prop-types";
import { useState } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";

import * as productService from "../../../service/productService";

import Modal from "../Modal/Modal";
import Button from "../../Buttons/Button/Button";
import styles from "./ProductModal.module.scss";
import FormInfo from "./ProductDetail/FormDetail";
import FormImage from "./ProductImage/FormImage";

import {
    selectProduct,
    selectProductImage,
    selectProductImageFile,
    selectActionBtnTitle,
    selectCurrentUser,
    selectImagePriority,
} from "../../../redux/selector";
import {
    reloadData,
    addClearForm,
    addToast,
} from "../../../redux/Slice/globalSlice";
import { axiosCreateJWT } from "../../../util/jwtRequest";
import { loginSuccess } from "../../../redux/Slice/auth";

const cx = classNames.bind(styles);

function ProductModal() {
    const dispatch = useDispatch();
    const [tab, setTab] = useState("info");

    const productImageFiles = useSelector(selectProductImageFile);
    const productImages = useSelector(selectProductImage);
    const imagePriority = useSelector(selectImagePriority);
    const productStatus = useSelector(selectActionBtnTitle);
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

    const handleChangeTab = (e) => {
        setTab(e);
    };
    //Add product to formData (when have image)
    const formDataFunc = () => {
        Array.from(productImageFiles).forEach((image) => {
            productData.append("productImages", image);
        });
        if (productStatus === "update") {
            productData.append("images", JSON.stringify(productImages));
        }
        productData.append("imagePriority", JSON.stringify(imagePriority));
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
            dispatch(reloadData());
            dispatch(addClearForm());
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
            dispatch(reloadData());
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

export default ProductModal;
