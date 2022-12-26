import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categorys: [],
    categoryGroups: [],
};
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addCategory(state, action) {
            state.categorys = action.payload;
        },
        addCategoryGroup(state, action) {
            state.categoryGroups = action.payload;
        },
    },
});
//Export action
export const { addCategory, addCategoryGroup } = categorySlice.actions;

export default categorySlice;
