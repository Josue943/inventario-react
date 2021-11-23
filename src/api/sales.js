import api from './index';

const baseUrl = 'sales';

export const createSale = body => api.post(baseUrl, body);

export const getSales = params => api.get(baseUrl, params);

/* 


export const updateSupplier = ({ id, ...body }) => api.patch(`${baseUrl}/${id}`, body);

export const deleteSupplier = id => api.delete(`${baseUrl}/${id}`); */
