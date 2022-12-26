import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    productImages: [],
    productImageFiles: [],
    product: {},
    productStatus: "",
    modalStatus: false,
    reload: false,
    isClearForm: false,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct(state, action) {
            state.products = action.payload;
        },
        addProductStatus(state, action) {
            state.productStatus = action.payload;
        },
        addProductInfo(state, action) {
            state.product = action.payload;
        },
        addProductImage(state, action) {
            state.productImages = action.payload;
        },
        addProductImageFile(state, action) {
            state.productImageFiles = action.payload;
        },
        addReload(state, action) {
            state.reload = action.payload;
        },
        addClearForm(state, action) {
            state.isClearForm = action.payload;
        },
    },
});

//Export action
export const {
    addProduct,
    addProductStatus,
    addProductInfo,
    addProductImage,
    addProductImageFile,
    addReload,
    addClearForm,
} = productSlice.actions;

export default productSlice;
