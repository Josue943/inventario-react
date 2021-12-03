import { useEffect, useState, useRef } from 'react';

const data = { count: 0, rows: [], pages: 0 };

const useFetch = ({ apiFun, params = {}, initialFetch = true }) => {
  const [state, setState] = useState({ data, loading: false, done: false, error: false });

  const firstRender = useRef(initialFetch);

  const request = async () => {
    !state.data.count && setState({ ...state, loading: true });
    const response = await apiFun(params);
    if (response.ok) setState({ data: response.data, loading: false, done: true, error: false });
    else console.log(response);
  };

  useEffect(() => {
    if (firstRender.current) request();
    firstRender.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  return {
    ...state,
    refetch: request,
  };
};

export default useFetch;
