/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router';

import './styles.scss';
import ProductsContainer from '../productsContainer';
import usePagination from 'hooks/usePagination';
import useFetch from 'hooks/useFetch';
import { getProducts } from 'api/products';

const ProductList = () => {
  const { defaultState, title } = mode[useLocation().pathname.split('/').at(-1)];

  const { handlePage, pagination, resetPagination } = usePagination();
  const { data, loading, refetch, done } = useFetch({
    apiFun: getProducts,
    params: { ...pagination, ...defaultState },
  });

  return (
    <>
      <h3>{title}</h3>
      <ProductsContainer
        products={data.rows}
        pages={data.pages}
        handlePage={handlePage}
        currentPage={pagination.page}
        loading={loading}
        refetch={refetch}
        done={done}
        resetPagination={resetPagination}
      />
    </>
  );
};

export default ProductList;

const mode = {
  products: {
    title: 'Productos en almacen',
    defaultState: {},
  },
  sold: {
    title: 'Productos mas vendidos',
    defaultState: { sortBy: 'sold', order: 'DESC' },
  },
  expiration: {
    title: 'Productos por vencimiento',
    defaultState: { expiration: true },
  },
  stock: {
    title: 'Productos con stock mínimo',
    defaultState: { stock: true },
  },
};
