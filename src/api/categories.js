import api from './index';

const baseUrl = 'categories';

export const getCategories = params => api.get(baseUrl, params);

export const createCategory = category => api.post(baseUrl, category);

export const updateCategory = ({ id, ...body }) => api.patch(`${baseUrl}/${id}`, body);

export const deleteCategory = id => api.delete(`${baseUrl}/${id}`);
