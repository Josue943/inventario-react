import api from './index';

const baseUrl = 'products';

export const getProducts = params => api.get(baseUrl, params);

export const createProduct = product => api.post(baseUrl, product);
