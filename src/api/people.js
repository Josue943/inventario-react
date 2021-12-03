import api from './index';

const baseUrl = 'people';

export const getPeople = params => api.get(`${baseUrl}`, params);

export const getPerson = id => api.get(`${baseUrl}/${id}`);

export const createPerson = person => api.post(baseUrl, person);

export const updatePerson = ({ id, ...body }) => api.patch(`${baseUrl}/${id}`, body);

export const deletePerson = id => api.delete(`${baseUrl}/${id}`);
