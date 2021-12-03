import { useCallback, useState } from 'react';

const usePagination = (limit = 4) => {
  const [pagination, setPagination] = useState({ page: 0, limit });

  const handlePage = useCallback((_, page) => setPagination({ ...pagination, page: page - 1 }), [pagination]);

  const resetPagination = () => setPagination({ page: 0, limit });

  return {
    handlePage,
    pagination,
    resetPagination,
  };
};

export default usePagination;
