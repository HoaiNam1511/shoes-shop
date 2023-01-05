import jwt_decode from "jwt-decode";
import axios from "axios";
import * as request from "./httpRequest";

const refreshToken = async () => {
    try {
        //If have cookies will get cookies to request
        const res = await request.postRequest("auth/refresh");
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
//Axios request with refresh token check
export const axiosCreateJWT = (currentUser, dispatch, stateSuccess) => {
    const axiosJWT = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

    axiosJWT.interceptors.request.use(
        async (config) => {
            let date = new Date();
            //Get decode access token
            const decodeToken = jwt_decode(currentUser?.token);
            //Check token had expired
            if (decodeToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                //New access token
                const refreshUser = {
                    ...currentUser,
                    token: data?.token,
                };
                dispatch(stateSuccess(refreshUser));
                config.headers["token"] = data?.token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return axiosJWT;
};
