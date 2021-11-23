import { useState } from 'react';

import './styles.scss';

import CategoriesRow from './categoriesRow';
import ProductsContainer from '../productsContainer';
import useFetch from 'hooks/useFetch';
import usePagination from 'hooks/usePagination';
import { getProducts } from 'api/products';
import { getCategories } from 'api/categories';

const ProductsCategories = () => {
  const [category, setCategory] = useState(null);
  const { handlePage, pagination, resetPagination } = usePagination();

  const products = useFetch({
    apiFun: getProducts,
    params: { ...pagination, category: category?.id },
    initialFetch: false,
  });

  //cambio de pagina
  const categories = useFetch({ apiFun: getCategories });

  const onSelectCategory = category => {
    setCategory(category);
    resetPagination();
  };

  return (
    <>
      <h3>Productos por categorias</h3>
      <div className='product-categories-container'>
        <CategoriesRow onChange={onSelectCategory} categories={categories.data.rows} selectedCategory={category?.id} />
        <div className='product-categories-container-content product-categories-box'>
          <h3 className='text-center'>
            {category ? `Productos en categoria ${category.name}` : 'Selecciona una categoria'}
          </h3>
          <ProductsContainer
            products={products.data.rows}
            pages={products.data.pages}
            handlePage={handlePage}
            loading={products.loading}
            currentPage={pagination.page}
            done={products.done}
          />
        </div>
      </div>
    </>
  );
};

export default ProductsCategories;
