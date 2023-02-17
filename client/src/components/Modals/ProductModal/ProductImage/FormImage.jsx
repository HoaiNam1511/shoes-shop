import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

import styles from "./FormImage.module.scss";
import config from "../../../../config";

import {
    addProductImage,
    addProductImageFile,
    addImagePriority,
} from "../../../../redux/Slice/productSlice";
import {
    selectProductImage,
    selectIsClearForm,
} from "../../../../redux/selector";

const cx = classNames.bind(styles);
function FormImage({ className }) {
    const dispatch = useDispatch();
    const [imageFiles, setImageFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [imagePriority, setImagePriority] = useState({
        image1: "",
        image2: "",
    });

    const { image1, image2 } = imagePriority;

    const productImage = useSelector(selectProductImage);
    const isClearForm = useSelector(selectIsClearForm);

    const allProductImage = [...images, ...imageFiles];

    useEffect(() => {
        setImageFiles([]);
        setImages([]);
    }, [isClearForm]);

    useEffect(() => {
        dispatch(addProductImageFile(imageFiles));
    }, [dispatch, imageFiles]);

    useEffect(() => {
        setImages(productImage);
    }, []);

    useEffect(() => {
        dispatch(addProductImage(images));
    }, [dispatch, images]);

    useEffect(() => {
        dispatch(addImagePriority(imagePriority));
    }, [dispatch, imagePriority]);

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

    const handleChangeImageBackground = (e) => {
        setImagePriority({
            ...imagePriority,
            [e.target.name]: e.target.value,
        });
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
            <div className={cx("form-group", "flex-2")}>
                <div className={cx("flex-item")}>
                    <label className={cx("input-label")}>
                        Background image 1
                    </label>
                    <select
                        className={cx("select")}
                        name="image1"
                        value={image1}
                        onChange={handleChangeImageBackground}
                    >
                        {allProductImage.map((image, index) => (
                            <option value={index}>Image {index + 1}</option>
                        ))}
                    </select>
                </div>
                <div className={cx("flex-item")}>
                    <label className={cx("input-label")}>
                        Background image 2
                    </label>
                    <select
                        className={cx("select")}
                        name="image2"
                        value={image2}
                        onChange={handleChangeImageBackground}
                    >
                        {allProductImage.map((image, index) => (
                            <option value={index}>Image {index + 1}</option>
                        ))}
                    </select>
                </div>
            </div>

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

export default memo(FormImage);
