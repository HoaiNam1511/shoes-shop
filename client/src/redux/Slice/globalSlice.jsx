import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    actionBtnTitle: "",
    modalStatus: false,
    reload: false,
    isClearForm: false,
    toast: {
        toastIsActive: false,
        toastNotification: [],
    },
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
        addToastIsActive(state, action) {
            state.toast.toastIsActive = action.payload;
        },
        addToastNotification(state, action) {
            console.log(action);
            console.log("come");
            state = {
                ...state,
                //toastNotification: [...state.toastNotification, action.payload],
            };
        },
    },
});

//Export action
export const {
    addActionBtnTitle,
    addModalStatus,
    addReload,
    addClearForm,
    addNotification,
    addToastIsActive,
    addToastNotification,
} = globalSlice.actions;

export default globalSlice;
