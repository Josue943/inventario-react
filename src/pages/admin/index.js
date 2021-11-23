import { Route, useRouteMatch } from 'react-router';

import CategoriesList from 'pages/categories/categoriesList';
import ClientsList from 'pages/clients/clientsList';
import Dashboard from './dashboard';
import NewCategory from 'pages/categories/newCategory';
import NewClient from 'pages/clients/newClient';
import NewProduct from 'pages/products/newProduct';
import NewSale from 'pages/sales/newSale';
import NewSupplier from 'pages/suppliers/newSupplier';
import NewUser from 'pages/users/newUser';
import ProductList from 'pages/products/productList';
import ProductsCategories from 'pages/products/productCategories';
import SaleList from 'pages/sales/saleList';
import SearchProduct from 'pages/products/searchProduct';
import SuppliersList from 'pages/suppliers/suppliersList';
import UsersList from 'pages/users/usersList';
import { Navbar, Sidebar } from 'components/admin';

const Admin = () => {
  const { path } = useRouteMatch();

  return (
    <div className='container'>
      <Sidebar />
      <div className='main-content'>
        <Navbar />
        <div className='content'>
          <Route exact path={path} component={Dashboard} />
          <Route
            path={`${path}/products`}
            render={({ match: { url } }) => (
              <div className='products-page'>
                {[`${url}`, `${url}/sold`, `${url}/expiration`, `${url}/stock`].map(pathname => (
                  <Route exact key={pathname} path={pathname} component={ProductList} />
                ))}
                <Route component={NewProduct} path={`${url}/new-product`} />
                <Route component={ProductsCategories} path={`${url}/categories`} />
                <Route component={SearchProduct} path={`${url}/search`} />
              </div>
            )}
          />
          <Route
            path={`${path}/categories`}
            render={({ match: { url } }) => (
              <>
                {[`${url}`, `${url}/search`].map(pathname => (
                  <Route exact key={pathname} path={pathname} component={CategoriesList} />
                ))}
                <Route path={`${url}/new`} component={NewCategory} />
              </>
            )}
          />
          <Route
            path={`${path}/suppliers`}
            render={({ match: { url } }) => (
              <>
                {[`${url}`, `${url}/search`].map(path => (
                  <Route key={path} path={path} component={SuppliersList} exact />
                ))}
                <Route path={`${url}/new`} component={NewSupplier} />
              </>
            )}
          />
          <Route
            path={`${path}/clients`}
            render={({ match: { url } }) => (
              <>
                {[`${url}`, `${url}/search`].map(path => (
                  <Route key={path} path={path} component={ClientsList} exact />
                ))}
                <Route path={`${url}/new`} component={NewClient} />
              </>
            )}
          />
          <Route
            path={`${path}/sales`}
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}`} component={SaleList} exact />
                <Route path={`${url}/new`} component={NewSale} />
              </>
            )}
          />
          <Route
            path={`${path}/users`}
            render={({ match: { url } }) => (
              <>
                {[`${url}`, `${url}/search`].map(path => (
                  <Route key={path} path={path} component={UsersList} exact />
                ))}
                <Route path={`${url}/new`} component={NewUser} />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
