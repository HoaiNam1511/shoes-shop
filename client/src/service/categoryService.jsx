import * as request from "../util/httpRequest";

export const getCategory = async (page) => {
    let result;
    if (page) {
        result = await request.getRequest(`category?page=${page}`);
    } else {
        result = await request.getRequest("category/get/");
    }
    return result.data;
};

export const getCategoryGroup = async () => {
    const result = await request.getRequest("category/getAllCategoryGroup/");
    return result.data;
};
export const deleteCategory = async (id, headers, axiosJWT) => {
    const result = await axiosJWT.delete(`category/delete/${id}`, headers);
    return result.data;
};
export const addCategory = async (category, headers, axiosJWT) => {
    const result = await axiosJWT.post("category/create/", category, headers);
    return result.data;
};

export const updateCategory = async (id, category, headers, axiosJWT) => {
    console.log(headers);
    const result = await axiosJWT.put(
        `category/update/${id}`,
        category,
        headers
    );
    return result.data;
};
