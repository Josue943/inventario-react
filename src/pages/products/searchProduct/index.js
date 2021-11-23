import { useState } from 'react';

import ProductsContainer from '../productsContainer';
import SearchBox from 'components/searchBox';
import usePagination from 'hooks/usePagination';
import useDebounce from 'hooks/useDebounce';
import useFetch from 'hooks/useFetch';
import { getProducts } from 'api/products';

const SearchProduct = () => {
  const [value, setValue] = useState('');
  const debounce = useDebounce({ value });

  const { resetPagination, handlePage, pagination } = usePagination();
  const { data, loading, done } = useFetch({
    apiFun: getProducts,
    params: { ...pagination, search: debounce },
    initialFetch: false,
  });

  const onChange = ({ target }) => {
    setValue(target.value);
    resetPagination();
  };

  return (
    <>
      <h3>Buscar Producto</h3>
      <div className='products-search'>
        <div className='search-box-container'>
          <SearchBox name='search' onChange={onChange} value={value} />
        </div>
        <ProductsContainer
          products={data.rows}
          loading={loading}
          pages={data.pages}
          currentPage={pagination.page}
          handlePage={handlePage}
          done={done}
        />
      </div>
    </>
  );
};

export default SearchProduct;
