import { useState } from 'react';

const data = { count: 0, rows: [], pages: 0 };

const useApi = apiFun => {
  const [state, setState] = useState({ data, loading: false, error: false });

  const request = async (...params) => {
    setState({ ...state, loading: true });
    const response = await apiFun(...params);
    setTimeout(() => {
      if (response.ok) setState({ data: response.data, loading: false, error: false });
      else console.log(response);
    }, 1000);
  };

  return {
    ...state,
    request,
  };
};

export default useApi;
