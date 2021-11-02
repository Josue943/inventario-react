import { Route, useLocation, useRouteMatch } from 'react-router';

import './styles.scss';
import NewProduct from './newProduct';
import ProductList from './productList';

const Product = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <div className='products-page'>
      <Route
        exact
        component={ProductList}
        path={[`${path}`, `${path}/sold`, `${path}/expiration`, `${path}/stock`]}
        key={pathname}
      />
      <Route component={NewProduct} path={`${path}/new-product`} exact />
    </div>
  );
};

export default Product;
