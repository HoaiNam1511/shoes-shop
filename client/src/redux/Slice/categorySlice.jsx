import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: {},
    categoryGroups: [],
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
    },
});
//Export action
export const { addCategory, addCategoryGroup } = categorySlice.actions;

export default categorySlice;
