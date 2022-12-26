import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./FormImage.module.scss";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    addProductImage,
    addProductImageFile,
} from "../../../../redux/Slice/productSlice";
import {
    selectProductImage,
    selectIsClearForm,
} from "../../../../redux/selector";
import config from "../../../../config";

const cx = classNames.bind(styles);
function FormImage({ className }) {
    console.log("form image");
    const [imageFiles, setImageFiles] = useState([]);
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();

    const productImage = useSelector(selectProductImage);
    const isClearForm = useSelector(selectIsClearForm);

    //Update image when image delete
    useEffect(() => {
        setImages(productImage);
    }, [productImage]);
    //Dispatch to redux when image file change
    useEffect(() => {
        dispatch(addProductImageFile(imageFiles));
    }, [dispatch, imageFiles]);

    useEffect(() => {
        dispatch(addProductImage(images));
    }, [dispatch, images]);

    useEffect(() => {
        setImageFiles([]);
        setImages([]);
    }, [isClearForm]);

    const handleUploadFile = (e) => {
        setImageFiles([...imageFiles, ...Array.from(e.target.files)]);
    };

    const handleDeleteImageFile = (index) => {
        let imgFileArr = Array.from(imageFiles);
        imgFileArr.splice(index, 1);
        setImageFiles(imgFileArr);
    };
    const handleDeleteImage = (index) => {
        let imageArr = Array.from(images);
        imageArr.splice(index, 1);
        setImages(imageArr);
    };

    return (
        <div className={cx("wrapper", className)}>
            <input
                type="file"
                id="upload"
                className={cx("upload")}
                multiple="multiple"
                onChange={handleUploadFile}
            />
            <label htmlFor="upload" className={cx("upload-container")}>
                <DriveFolderUploadIcon className={cx("upload-icon")} />
                <div className={cx("upload-title")}>
                    Select a file or drag here
                </div>
            </label>

            <div className={cx("image-container")}>
                {imageFiles.map((image, index) => (
                    <div key={index} className={cx("image-item")}>
                        <button
                            className={cx("btn-delete")}
                            onClick={() => handleDeleteImageFile(index)}
                        >
                            x
                        </button>
                        <img
                            className={cx("image")}
                            src={URL.createObjectURL(image)}
                            alt=""
                        ></img>
                    </div>
                ))}
                {images.map((image, index) => (
                    <div key={index} className={cx("image-item")}>
                        <button
                            className={cx("btn-delete")}
                            onClick={() => handleDeleteImage(index)}
                        >
                            x
                        </button>
                        <img
                            className={cx("image")}
                            src={config.url.URL_STATIC_FILE + image.image}
                            alt=""
                        ></img>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FormImage;
