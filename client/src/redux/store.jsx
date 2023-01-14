import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import productSlice from "./Slice/productSlice";
import categorySlice from "./Slice/categorySlice";
import globalSlice from "./Slice/globalSlice";
import userSlice from "./Slice/userSlice";
import authSlice from "./Slice/auth";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["authReducer"],
};

const reducer = combineReducers({
    productReducer: productSlice.reducer,
    categoryReducer: categorySlice.reducer,
    globalReducer: globalSlice.reducer,
    userReducer: userSlice.reducer,
    authReducer: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    //Default middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
export default store;
