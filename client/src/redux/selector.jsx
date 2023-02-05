//Export selector product
export const selectProduct = (state) => state.productReducer.product;
export const selectProductImageFile = (state) =>
    state.productReducer.productImageFiles;
export const selectProductImage = (state) => state.productReducer.productImages;
export const selectImagePriority = (state) =>
    state.productReducer.imagePriority;
//Export selection category
export const selectCategory = (state) => state.categoryReducer.category;
//Global
export const selectActionBtnTitle = (state) =>
    state.globalReducer.actionBtnTitle;
export const selectModalShow = (state) => state.globalReducer.isOpenModal;
export const selectReload = (state) => state.globalReducer.reload;
export const selectIsClearForm = (state) => state.globalReducer.isClearForm;
export const selectToast = (state) => state.globalReducer.toast;
//User
export const selectUser = (state) => state.userReducer.user;
//Auth
export const selectCurrentUser = (state) => state.authReducer.login.currentUser;
