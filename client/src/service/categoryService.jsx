import httpRequest from "../util/httpRequest";

export const getCategory = async () => {
    const result = await httpRequest.get("category/get/");
    return result.data;
};

export const getCategoryGroup = async () => {
    const result = await httpRequest.get("category/getAllCategoryGroup/");
    return result.data;
};
