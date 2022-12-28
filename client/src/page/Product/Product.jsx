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
    addProductInfo,
    addProductImage,
} from "../../redux/Slice/productSlice";

import {
    addActionBtnTitle,
    addModalStatus,
    addReload,
    addClearForm,
} from "../../redux/Slice/globalSlice";

import { selectReload } from "../../redux/selector";

import config from "../../config";
import Button from "../../components/Button/Button";
import ProductModal from "../../components/Modals/ProductModal/ProductModal";
import ActionButton from "../../components/Button/ActionButton/ActionButton";
import Paginate from "../../components/Paginate/Paginate";
const cx = classNames.bind(styles);
function Product() {
    console.log("come product");
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const reload = useSelector(selectReload);
    localStorage.setItem("product", "localStorage");
    //Get category
    useEffect(() => {
        const result = async () => {
            try {
                const response = await categoryService.getCategory();
                dispatch(addCategory(response.data));
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
                const response = await productService.getProduct(page);
                setProducts(response.data);
                setPageCount(response.totalPage);
                //Xoa phan products redux
                dispatch(addProduct(response.data));
            } catch (error) {
                console.log(error);
            }
        };
        result();
    }, [dispatch, reload, page]);

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
        dispatch(addActionBtnTitle("update"));
        dispatch(addProductImage(productImage));
        dispatch(addProductInfo(product));
        dispatch(addModalStatus(true));
    };
    const handleAddProduct = () => {
        dispatch(addActionBtnTitle("add"));
        dispatch(addModalStatus(true));
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
            <Paginate
                pageCount={pageCount}
                onClick={(page) => setPage(page)}
            ></Paginate>
        </div>
    );
}

export default Product;
