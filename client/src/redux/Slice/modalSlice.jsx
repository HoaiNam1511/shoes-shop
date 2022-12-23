import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalHide: true,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModalHide(state, action) {
            state.modalHide = action.payload;
        },
    },
});

//Export action
export const { setModalHide } = modalSlice.actions;

export default modalSlice;
