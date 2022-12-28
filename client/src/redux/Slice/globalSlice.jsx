import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    actionBtnTitle: "",
    modalStatus: false,
    reload: false,
    isClearForm: false,
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        addActionBtnTitle(state, action) {
            state.actionBtnTitle = action.payload;
        },
        addModalStatus(state, action) {
            state.modalStatus = action.payload;
        },
        addReload(state, action) {
            state.reload = action.payload;
        },
        addClearForm(state, action) {
            state.isClearForm = action.payload;
        },
    },
});

//Export action
export const { addActionBtnTitle, addModalStatus, addReload, addClearForm } =
    globalSlice.actions;

export default globalSlice;
