/* eslint-disable react-hooks/exhaustive-deps */
import './styles.scss';
import CustomPagination from 'components/customPagination';
import ProductItem from '../productItem';
import useCustomParams from 'hooks/useCustomParams';
import useFetch from 'hooks/useFetch';
import { getProducts } from 'api/products';
import { useLocation } from 'react-router';

const ProductList = () => {
  const { defaultState, title } = mode[useLocation().pathname.split('/').at(-1)];

  const { changeParam, params } = useCustomParams(defaultState);
  const { data } = useFetch(getProducts, params);

  const handlePage = (_, page) => changeParam('page', page - 1);

  return (
    <>
      <h3>{title}</h3>
      {data.rows.map(row => (
        <ProductItem key={row.id} {...row} />
      ))}
      <CustomPagination pages={data.pages} onChangePage={handlePage} />
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
