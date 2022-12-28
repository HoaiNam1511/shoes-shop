import * as request from "../util/httpRequest";

export const getProduct = async (page) => {
    let result;
    if (page) {
        result = await request.getRequest(`product?page=${page}`);
    } else {
        result = await request.getRequest("product/get");
    }
    return result.data;
};
export const createProduct = async (product, option) => {
    const response = await request.postRequest(
        "product/create",
        product,
        option
    );
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
