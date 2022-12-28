import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Slice/productSlice";
import categorySlice from "./Slice/categorySlice";
import globalSlice from "./Slice/globalSlice";
const store = configureStore({
    reducer: {
        productReducer: productSlice.reducer,
        categoryReducer: categorySlice.reducer,
        globalReducer: globalSlice.reducer,
    },

    //Default middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
