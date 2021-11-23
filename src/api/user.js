import api from './index';

const baseUrl = 'users';

export const createUser = body => api.post(baseUrl, body);

export const getUsers = params => api.get(baseUrl, params);

export const updateUser = ({ id, ...body }) => api.patch(`${baseUrl}/${id}`, body);

export const deleteUser = id => api.delete(`${baseUrl}/${id}`);
