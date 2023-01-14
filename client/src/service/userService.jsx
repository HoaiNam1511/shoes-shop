import * as request from "../util/httpRequest";

export const getUser = async (page, headers, axiosJWT, sortBy, orderBy) => {
    const result = await axiosJWT.get(
        `user/get?page=${page}&sortBy=${sortBy}&orderBy=${orderBy}`,
        headers
    );
    return result.data;
};

export const createUser = async (user, headers, axiosJWT) => {
    const result = await axiosJWT.post("user/create", user, headers);
    return result.data;
};

export const updateUser = async (id, user, headers, axiosJWT) => {
    const result = await axiosJWT.put(`user/update/${id}`, user, headers);
    return result.data;
};

export const deleteUser = async (id, headers, axiosJWT) => {
    const result = await axiosJWT.delete(`user/delete/${id}`, headers);
    return result.data;
};
