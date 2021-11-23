import { useState } from 'react';
import { AppBar, Tab, Tabs } from '@mui/material';

import './styles.scss';
import SearchBox from 'components/searchBox';
import useFetch from 'hooks/useFetch';
import { Navbar } from 'components/home';
import { getProducts } from 'api/products';
import { getCategories } from 'api/categories';

const Home = () => {
  const [category, setCategory] = useState('');

  const { data: products, loading } = useFetch({
    apiFun: getProducts,
    params: {},
  });

  const { data: categories } = useFetch({
    apiFun: getCategories,
    params: {},
  });

  return (
    <>
      <Navbar />
      <div className='home-container'>
        <div className='home-header'>
          <SearchBox />
        </div>
        <AppBar position='static'>
          <Tabs
            value={category}
            onChange={setCategory}
            indicatorColor='secondary'
            textColor='inherit'
            variant='fullWidth'
            aria-label='full width tabs example'
          >
            <Tab label='Item One' />
            <Tab label='Item Two' />
            <Tab label='Item Three' />
          </Tabs>
        </AppBar>
      </div>
    </>
  );
};

export default Home;
