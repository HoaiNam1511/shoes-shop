import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Slice/productSlice";
import categorySlice from "./Slice/categorySlice";
import modalSlice from "./Slice/modalSlice";
const store = configureStore({
    reducer: {
        productReducer: productSlice.reducer,
        categoryReducer: categorySlice.reducer,
        modalReducer: modalSlice.reducer,
    },

    //Default middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
