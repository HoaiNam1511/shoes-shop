import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categorys: [],
};
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addCategory(state, action) {
            state.categorys = action.payload;
        },
    },
});
//Export action
export const { addCategory } = categorySlice.actions;

export default categorySlice;
