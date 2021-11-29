import api from './index';

const baseUrl = 'returns';

export const createReturn = data => api.post(baseUrl, data);

export const getReturns = id => api.get(`${baseUrl}/${id}`);

export const getReturnsList = params => api.get(baseUrl, params);
