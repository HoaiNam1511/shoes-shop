//Export selector product
export const selectProducts = (state) => state.productReducer.products;
export const selectProduct = (state) => state.productReducer.product;
export const selectProductImageFile = (state) =>
    state.productReducer.productImageFiles;
export const selectProductImage = (state) => state.productReducer.productImages;
export const selectReload = (state) => state.productReducer.reload;
export const selectProductStatus = (state) =>
    state.productReducer.productStatus;
export const selectIsClearForm = (state) => state.productReducer.isClearForm;

//Export selection category
export const selectCategory = (state) => state.categoryReducer.category;
export const selectCategoryGroup = (state) =>
    state.categoryReducer.categoryGroups;
export const selectReloadCategory = (state) => state.categoryReducer.reload;
export const selectCategoryStatus = (state) =>
    state.categoryReducer.categoryStatus;
//Export selection modal
export const selectModalShow = (state) => state.modalReducer.isOpenModal;
