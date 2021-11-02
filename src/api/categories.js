import api from './index';

const baseUrl = 'categories';

export const getCategories = params => api.get(baseUrl, params);
