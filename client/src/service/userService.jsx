import * as request from "../util/httpRequest";
export const login = async (user) => {
    const result = await request.postRequest("user/login", user);
    return result.data;
};
