import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    actionBtnTitle: "",
    isOpenModal: false,
    reload: false,
    isClearForm: false,
    toast: {},
    sort: {
        column: "",
        data: [],
    },
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        openModal(state, action) {
            state.isOpenModal = true;
        },

        closeModal(state, action) {
            state.isOpenModal = false;
        },

        reloadData(state, action) {
            state.reload = !state.reload;
        },

        addClearForm(state, action) {
            state.isClearForm = !state.isClearForm;
        },

        addToast(state, action) {
            state.toast = action.payload;
        },

        addBtnTitle(state, action) {
            state.actionBtnTitle = "add";
        },

        updateBtnTitle(state, action) {
            state.actionBtnTitle = "update";
        },
    },
});

//Export action
export const {
    openModal,
    closeModal,
    reloadData,
    addClearForm,
    addNotification,
    addToastIsActive,
    addToast,
    addBtnTitle,
    updateBtnTitle,
} = globalSlice.actions;

export default globalSlice;
