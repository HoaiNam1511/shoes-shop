import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    logOut: {
        isFetching: false,
        error: false,
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart(state) {
            state.login.isFetching = true;
        },

        loginSuccess(state, action) {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },

        loginFail(state) {
            state.login.isFetching = false;
            state.login.error = true;
        },

        logOutStart(state) {
            state.login.isFetching = true;
        },

        logOutSuccess(state, action) {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },

        logOutFail(state) {
            state.login.isFetching = false;
            state.login.error = true;
        },
    },
});
export const {
    loginStart,
    loginSuccess,
    loginFail,
    logOutStart,
    logOutSuccess,
    logOutFail,
} = authSlice.actions;
export default authSlice;
