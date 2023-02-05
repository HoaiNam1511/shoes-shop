import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productImages: [],
    productImageFiles: [],
    product: {},
    imagePriority: {},
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProductInfo(state, action) {
            state.product = action.payload;
        },
        addProductImage(state, action) {
            state.productImages = action.payload;
        },
        addProductImageFile(state, action) {
            state.productImageFiles = action.payload;
        },
        addImagePriority(state, action) {
            state.imagePriority = action.payload;
        },
    },
});

//Export action
export const {
    addProductInfo,
    addProductImage,
    addProductImageFile,
    addImagePriority,
} = productSlice.actions;

export default productSlice;
