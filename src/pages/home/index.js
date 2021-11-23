import { useState } from 'react';

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

  const handleChange = value => {
    console.log(value);
  };

  console.log(categories);

  return (
    <>
      <Navbar />
      <div className='home-container'>
        <div className='home-header'>
          <SearchBox />
        </div>
        <div className='categories-tabs'>
          {categories.rows.map(item => (
            <div className='category-tab' key={item.id}>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
