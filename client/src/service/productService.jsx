import * as request from "../util/httpRequest";

export const getProduct = async () => {
    const response = await request.getRequest("product/get");
    return response.data;
};
export const createProduct = async (product) => {
    const response = await request.postRequest("product/create", product, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};
export const deleteProduct = async (id) => {
    const response = await request.deleteRequest(`product/delete/${id}`);
    return response.data;
};
export const updateProduct = async (id, product) => {
    const response = await request.putRequest(`product/update/${id}`, product);
    return response.data;
};
