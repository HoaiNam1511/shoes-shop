import * as request from "../util/httpRequest";

export const login = async (user) => {
    const result = await request.postRequest("auth/login", user);
    return result.data;
};

export const logOut = async (id, headers, axiosJWT) => {
    //Tranh viec post token nen su dung id
    const result = await axiosJWT.post("auth/logout", id, headers);
    return result.data;
};

export const getRole = async () => {
    const result = await request.getRequest("auth/role");
    return result.data;
};
