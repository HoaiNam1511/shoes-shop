import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Product.module.scss";
import classNames from "classnames/bind";

import AddIcon from "@mui/icons-material/Add";

import * as productService from "../../service/productService";
import * as categoryService from "../../service/categoryService";

import { addCategory } from "../../redux/Slice/categorySlice";
import {
    addProduct,
    addReload,
    addProductInfo,
    addProductImage,
    addProductStatus,
} from "../../redux/Slice/productSlice";
import { setModalShow } from "../../redux/Slice/modalSlice";
import { selectReload } from "../../redux/selector";

import config from "../../config";
import Button from "../../components/Button/Button";
import ProductModal from "../../components/Modals/ProductModal/ProductModal";
import ActionButton from "../../components/Button/ActionButton/ActionButton";
const cx = classNames.bind(styles);
function Product() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const reload = useSelector(selectReload);
    //Get category
    useEffect(() => {
        const result = async () => {
            try {
                const response = await categoryService.getCategory();
                dispatch(addCategory(response));
            } catch (error) {
                console.log(error);
            }
        };
        result();
    }, [dispatch]);
    //Get product
    useEffect(() => {
        const result = async () => {
            try {
                const response = await productService.getProduct();
                setProducts(response);
                dispatch(addProduct(response));
            } catch (error) {
                console.log(error);
            }
        };
        result();
    }, [dispatch, reload]);

    const handleDeleteProduct = async (id) => {
        const result = async () => {
            try {
                await productService.deleteProduct(id);
                dispatch(addReload(!reload));
            } catch (error) {
                console.log(error);
            }
        };
        result();
    };

    const handleUpdateProduct = (product) => {
        let productImage = product.Product_images;
        dispatch(addProductStatus("update"));
        dispatch(addProductImage(productImage));
        dispatch(addProductInfo(product));
        dispatch(setModalShow(true));
    };
    const handleAddProduct = () => {
        dispatch(addProductStatus("add"));
        dispatch(setModalShow(true));
    };

    return (
        <div>
            <Button
                onClick={handleAddProduct}
                leftIcon={<AddIcon fontSize="large" />}
            >
                Add
            </Button>
            <ProductModal></ProductModal>
            <table>
                <caption>Products</caption>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            {/* Xem lai phan nay */}
                            <td style={{ display: "flex" }}>
                                {product.Product_images[0] && (
                                    <img
                                        className={cx("image")}
                                        src={`${config.url.URL_STATIC_FILE}${product.Product_images[0].image}`}
                                        alt=""
                                    />
                                )}
                            </td>
                            <td>{product.product_name}</td>
                            <td>{product.product_price}</td>
                            <td>
                                <ActionButton
                                    type="delete"
                                    onClick={() =>
                                        handleDeleteProduct(product.id)
                                    }
                                ></ActionButton>
                                <ActionButton
                                    type="update"
                                    onClick={() => handleUpdateProduct(product)}
                                ></ActionButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Product;
