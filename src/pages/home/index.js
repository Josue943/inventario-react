import { useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';
import { FloatingWhatsApp } from 'react-floating-whatsapp-button';
import 'react-floating-whatsapp-button/dist/index.css';

import './styles.scss';
import CustomPagination from 'components/customPagination';
import CustomSpinner from 'components/customSpiner';
import ProductCard from './productCard';
import SearchBox from 'components/searchBox';
import useApi from 'hooks/useApi';
import usePagination from 'hooks/usePagination';
import useFetch from 'hooks/useFetch';
import Layout from 'components/layout';
import { getProducts } from 'api/products';
import { getCategories } from 'api/categories';
import { Button } from '@mui/material';

const Home = () => {
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState('');

  const { resetPagination, pagination, handlePage } = usePagination(2);

  const { data: products, loading, request } = useApi(getProducts);

  const { data: categories } = useFetch({
    apiFun: getCategories,
    params: { enabled: true },
  });

  const handleChange = value => {
    setCategory(value);
    setSearch('');
    resetPagination();
  };

  const onRequest = () => {
    request({ category: category?.id, page: pagination.page, limit: pagination.limit, search, enabled: true });
  };

  const onChange = e => setSearch(e.target.value);

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, pagination.page]);

  const onClick = () => onRequest();

  return (
    <Layout>
      <div className='home-container'>
        <div className='home-header'>
          <SearchBox className='searbox-box-borders' value={search} onChange={onChange} />
          <Button variant='contained' onClick={onClick}>
            <Search />
          </Button>
        </div>
        <div className='categories-tabs'>
          {categories.rows.map(item => (
            <div
              key={item.id}
              className={`category-tab ${category?.id === item.id ? 'category-tab-selected' : ''}`}
              onClick={() => handleChange(item)}
            >
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        {loading ? (
          <CustomSpinner />
        ) : (
          <div className='products-home'>
            <h6 className='text-center'>{category?.name || 'Novedades'}</h6>
            <div className='products-home-container'>
              {products.rows.map(item => (
                <ProductCard item={item} {...item} />
              ))}
            </div>
            <div className='products-pagination'>
              <CustomPagination pages={products.pages} currentPage={pagination.page + 1} onChangePage={handlePage} />
            </div>
          </div>
        )}
      </div>
      <FloatingWhatsApp phone='+50672131613' popupMessage='Hola!' autoOpenTimeout={15000000} />
    </Layout>
  );
};

export default Home;
