import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: {},
    categoryGroups: [],
    reload: false,
    categoryStatus: "",
};
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addCategory(state, action) {
            state.category = action.payload;
        },
        addCategoryGroup(state, action) {
            state.categoryGroups = action.payload;
        },
        addReloadCategory(state, action) {
            state.reload = action.payload;
        },
        addCategoryStatus(state, action) {
            state.categoryStatus = action.payload;
        },
    },
});
//Export action
export const {
    addCategory,
    addCategoryGroup,
    addReloadCategory,
    addCategoryStatus,
} = categorySlice.actions;

export default categorySlice;
