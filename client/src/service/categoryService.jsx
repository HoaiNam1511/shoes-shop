import * as request from "../util/httpRequest";

export const getCategory = async () => {
    const result = await request.getRequest("category/get/");
    return result.data;
};

export const getCategoryGroup = async () => {
    const result = await request.getRequest("category/getAllCategoryGroup/");
    return result.data;
};
export const deleteCategory = async (id) => {
    const result = await request.deleteRequest(`category/delete/${id}`);
    return result.data;
};
export const addCategory = async (category) => {
    const result = await request.postRequest("category/create/", category);
    return result.data;
};

export const updateCategory = async (id, category) => {
    const result = await request.putRequest(`category/update/${id}`, category);
    return result.data;
};
