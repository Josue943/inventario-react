import { useState } from 'react';

const useParams = (defaultState = {}) => {
  const [params, setParams] = useState({ page: 0, limit: 2, ...defaultState });

  const changeParam = (name, value) => setParams({ ...params, [name]: value });

  return {
    changeParam,
    params,
  };
};

export default useParams;
