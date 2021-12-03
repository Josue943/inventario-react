import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Address from 'pages/profile/address';
import Admin from './pages/admin';
import CustomAlert from 'components/customAlert';
import Details from 'pages/profile/details';
import Home from './pages/home';
import Login from 'pages/login';
import Page404 from 'pages/404';
import Profile from 'pages/profile';
import Register from 'pages/register';
import Shop from 'pages/shop';
import Shopping from 'pages/profile/shopping';
import { autoLogin } from 'api/user';
import { setUser } from 'store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(({ auth }) => auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const localToken = localStorage.getItem('token');
      if (localToken) {
        const response = await autoLogin(localToken);
        if (response.ok) {
          localStorage.setItem('token', localToken);
          dispatch(setUser({ user: response.data.user }));
        }
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return null;

  const isLogged = Component => (user ? <Redirect to='/' /> : <Component />);
  const publicUser = Component => (!user ? <Redirect to='/login' /> : <Component />);

  /* 
  component={() => (user?.admin ? <Admin /> : <Redirect to='/login' />)}
  */

  return (
    <BrowserRouter>
      <CustomAlert />
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={Admin} path='/admin' />
        <Route render={() => isLogged(Login)} path='/login' />
        <Route render={() => isLogged(Register)} path='/register' />
        <Route component={Shop} path='/shop' />
        <Route component={() => publicUser(Profile)} exact path='/profile' />
        <Route component={() => publicUser(Address)} path='/profile/address' />
        <Route component={() => publicUser(Shopping)} path='/profile/shopping' />
        <Route component={() => publicUser(Details)} path='/profile/details' />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;

/*
paginacion sales
paginacion devoluciones
borrar cliente
*/
