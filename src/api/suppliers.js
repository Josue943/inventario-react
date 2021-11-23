import api from './index';

const baseUrl = 'suppliers';

export const getSuppliers = params => api.get(baseUrl, params);

export const createSupplier = body => api.post(baseUrl, body);

export const updateSupplier = ({ id, ...body }) => api.patch(`${baseUrl}/${id}`, body);

export const deleteSupplier = id => api.delete(`${baseUrl}/${id}`);
