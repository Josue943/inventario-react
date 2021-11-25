import { create } from 'apisauce';

import store from 'store';
import { setAlert } from 'store/alertSlice';

const api = create({ baseURL: 'http://localhost:4000/api/' });

api.axiosInstance.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) store.dispatch(setAlert({ alert: { message: 'Error de servidor', severity: 'error' } }));
  return Promise.reject(error);
});

export default api;
