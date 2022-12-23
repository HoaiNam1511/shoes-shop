//Export selector product
export const selectProducts = (state) => state.productReducer.products;
export const selectProduct = (state) => state.productReducer.product;
export const selectProductImageFile = (state) =>
    state.productReducer.productImageFiles;
export const selectProductImage = (state) => state.productReducer.productImages;
export const selectReload = (state) => state.productReducer.reload;
export const selectProductStatus = (state) =>
    state.productReducer.productStatus;
//Export selection category
export const selectCategory = (state) => state.categoryReducer.categorys;
//Export selection modal
export const selectModalHide = (state) => state.modalReducer.modalHide;
