import { useEffect, useState } from 'react';

const defaultParams = {};

const useFetch = (apiFun, params = defaultParams) => {
  const [data, setData] = useState({ count: 0, rows: [], pages: 0 });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async () => {
    setLoading(true);
    const response = await apiFun(params);
    setLoading(false);
    if (response.ok) setData(response.data);
    else console.log(response);
  };

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
