import api from './index';

const baseUrl = 'suppliers';

export const getSuppliers = params => api.get(baseUrl, params);
