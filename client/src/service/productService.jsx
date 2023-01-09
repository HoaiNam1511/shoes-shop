import * as request from "../util/httpRequest";

export const getProduct = async (page, sortColumn, order) => {
    let result;
    if (page) {
        result = await request.getRequest(
            `product?page=${page}&sortBy=${sortColumn}&orderBy=${order}`
        );
    } else {
        result = await request.getRequest("product/get");
    }
    return result.data;
};
export const createProduct = async (product, headers, axiosJWT) => {
    const response = await axiosJWT.post("product/create", product, headers);
    return response.data;
};
export const deleteProduct = async (id, headers, axiosJWT) => {
    const response = await axiosJWT.delete(`product/delete/${id}`, headers);
    return response.data;
};
export const updateProduct = async (id, product, headers, axiosJWT) => {
    const response = await axiosJWT.put(
        `product/update/${id}`,
        product,
        headers
    );
    return response.data;
};
