//Export selector product
export const selectProduct = (state) => state.productReducer.product;
export const selectProductImageFile = (state) =>
    state.productReducer.productImageFiles;
export const selectProductImage = (state) => state.productReducer.productImages;
//Export selection category
export const selectCategory = (state) => state.categoryReducer.category;
export const selectCategoryGroup = (state) =>
    state.categoryReducer.categoryGroups;
//Global
export const selectActionBtnTitle = (state) =>
    state.globalReducer.actionBtnTitle;
export const selectModalShow = (state) => state.globalReducer.modalStatus;
export const selectReload = (state) => state.globalReducer.reload;
export const selectIsClearForm = (state) => state.globalReducer.isClearForm;
export const selectToastIsActive = (state) =>
    state.globalReducer.toast.toastIsActive;
export const selectToastNotification = (state) =>
    state.globalReducer.toast.toastNotification;
//User
export const selectUser = (state) => state.userReducer.user;
//Auth
export const selectCurrentUser = (state) => state.authReducer.login.currentUser;
