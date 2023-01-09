import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Product.module.scss";
import classNames from "classnames/bind";

import AddIcon from "@mui/icons-material/Add";

import * as productService from "../../service/productService";
import * as categoryService from "../../service/categoryService";

import config from "../../config";
import Button from "../../components/Buttons/Button/Button";
import ProductModal from "../../components/Modals/ProductModal/ProductModal";
import ActionButton from "../../components/Buttons/ActionButton/ActionButton";
import Paginate from "../../components/Paginate/Paginate";
import Arrow from "../../components/Buttons/Arrow/Arrow";

import { addCategory } from "../../redux/Slice/categorySlice";
import {
    addProductInfo,
    addProductImage,
} from "../../redux/Slice/productSlice";
import {
    addActionBtnTitle,
    addModalStatus,
    addReload,
    addToast,
} from "../../redux/Slice/globalSlice";
import { axiosCreateJWT } from "../../util/jwtRequest";
import { selectCurrentUser, selectReload } from "../../redux/selector";
import { loginSuccess } from "../../redux/Slice/auth";

const cx = classNames.bind(styles);
function Product() {
    const dispatch = useDispatch();
    const orderASC = "ASC";
    const orderDESC = "DESC";
    const [orderBy, setOrderBy] = useState(orderASC);
    const [sortBy, setSortBy] = useState("id");
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const reload = useSelector(selectReload);
    const currentUser = useSelector(selectCurrentUser);
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
    const getProduct = async (column = sortBy || "", order = orderBy || "") => {
        try {
            const response = await productService.getProduct(
                page,
                column,
                order
            );
            setProducts(response.data);
            setPageCount(response.totalPage);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProduct();
    }, [dispatch, reload, page]);

    const handleAddProduct = () => {
        dispatch(addActionBtnTitle("add"));
        dispatch(addModalStatus(true));
    };
    const handleUpdateProduct = (product) => {
        let productImage = product.product_images;
        dispatch(addActionBtnTitle("update"));
        dispatch(addProductImage(productImage));
        dispatch(addProductInfo(product));
        dispatch(addModalStatus(true));
    };
    const handleDeleteProduct = async (id) => {
        try {
            const result = await productService.deleteProduct(
                id,
                {
                    headers: { token: currentUser?.token },
                },
                axiosCreateJWT(currentUser, dispatch, loginSuccess)
            );
            dispatch(addToast(result));
            dispatch(addReload(!reload));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSortProduct = (column, order) => {
        if (order === orderASC) {
            getProduct(column, order);
            setSortBy(column);
            setOrderBy(orderASC);
        } else if (order === orderDESC) {
            getProduct(column, order);
            setSortBy(column);
            setOrderBy(orderDESC);
        }
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
                        <th>
                            #
                            <Arrow
                                arrowUp
                                onClick={() =>
                                    handleSortProduct("id", orderASC)
                                }
                            ></Arrow>
                            <Arrow
                                arrowDown
                                onClick={() =>
                                    handleSortProduct("id", orderDESC)
                                }
                            ></Arrow>
                        </th>
                        <th>Image</th>
                        <th>
                            Name{" "}
                            <Arrow
                                arrowUp
                                onClick={() =>
                                    handleSortProduct("product_name", orderASC)
                                }
                            ></Arrow>
                            <Arrow
                                arrowDown
                                onClick={() =>
                                    handleSortProduct("product_name", orderDESC)
                                }
                            ></Arrow>
                        </th>
                        <th>
                            Price{" "}
                            <Arrow
                                arrowUp
                                onClick={() =>
                                    handleSortProduct("product_price", orderASC)
                                }
                            ></Arrow>
                            <Arrow
                                arrowDown
                                onClick={() =>
                                    handleSortProduct(
                                        "product_price",
                                        orderDESC
                                    )
                                }
                            ></Arrow>
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            {/* Xem lai phan nay */}
                            <td style={{ display: "flex" }}>
                                {product.product_images[0] && (
                                    <img
                                        className={cx("image")}
                                        src={`${config.url.URL_STATIC_FILE}${product.product_images[0].image}`}
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
