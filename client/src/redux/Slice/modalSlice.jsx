import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpenModal: false,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModalShow(state, action) {
            state.isOpenModal = action.payload;
        },
    },
});

//Export action
export const { setModalShow } = modalSlice.actions;

export default modalSlice;
