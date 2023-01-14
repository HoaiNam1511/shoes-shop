import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: {},
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addCategory(state, action) {
            state.category = action.payload;
        },
    },
});
//Export action
export const { addCategory } = categorySlice.actions;

export default categorySlice;
