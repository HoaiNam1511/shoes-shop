import * as request from "../util/httpRequest";
export const login = async (user) => {
    const result = await request.postRequest("user/login", user);
    return result.data;
};

export const getUser = async (page) => {
    const result = await request.getRequest(`user/get?page=${page}`);
    return result.data;
};

export const getRole = async () => {
    const result = await request.getRequest("user/role");
    return result.data;
};

export const createUser = async (user) => {
    const result = await request.postRequest("user/create", user);
    return result.data;
};

export const updateUser = async (id, user) => {
    const result = await request.putRequest(`user/update/${id}`, user);
    return result.data;
};

export const deleteUser = async (id) => {
    const result = await request.deleteRequest(`user/delete/${id}`);
    return result.data;
};
