import React from 'react';
import { Route, useRouteMatch } from 'react-router';

import GG from './gg';
import Products from 'pages/products';
import { Navbar, Sidebar } from 'components/admin';

const Admin = () => {
  const { path } = useRouteMatch();

  return (
    <div className='container'>
      <Sidebar />
      <div className='main-content'>
        <Navbar />
        <div className='content'>
          <Route exact path={path} component={GG} />
          <Route path={`${path}/products`} component={Products} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
