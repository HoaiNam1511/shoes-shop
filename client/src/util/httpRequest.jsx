import axios from "axios";
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

export const getRequest = async (path, option = {}) => {
    const response = await httpRequest.get(path, option);
    return response;
};

export const postRequest = async (path, option = {}) => {
    const response = await httpRequest.post(path, option);
    return response;
};

export const putRequest = async (path, option = {}) => {
    const response = await httpRequest.put(path, option);
    return response;
};
export const deleteRequest = async (path, option = {}) => {
    const response = await httpRequest.delete(path, option);
    return response;
};
export default httpRequest;
