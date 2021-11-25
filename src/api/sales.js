import api from './index';

const baseUrl = 'sales';

export const createSale = body => api.post(baseUrl, body);

export const getSales = params => api.get(baseUrl, params);

export const getSale = id => api.get(`${baseUrl}/${id}`);
