import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Slice/productSlice";
import categorySlice from "./Slice/categorySlice";
import globalSlice from "./Slice/globalSlice";
import userSlice from "./Slice/userSlice";
const store = configureStore({
    reducer: {
        productReducer: productSlice.reducer,
        categoryReducer: categorySlice.reducer,
        globalReducer: globalSlice.reducer,
        userReducer: userSlice.reducer,
    },

    //Default middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
