import api from './index';

const baseUrl = 'products';

export const createProduct = product => api.post(baseUrl, product);

export const deleteProduct = id => api.delete(`${baseUrl}/${id}`);

export const getProducts = params => api.get(baseUrl, params);

export const updateProduct = ({ id, ...rest }) => api.patch(`${baseUrl}/${id}`, rest);
