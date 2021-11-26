import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Address from 'pages/profile/address';
import Admin from './pages/admin';
import CustomAlert from 'components/customAlert';
import Home from './pages/home';
import Login from 'pages/login';
import Page404 from 'pages/404';
import Profile from 'pages/profile';
import Register from 'pages/register';
import Shop from 'pages/shop';
import { autoLogin } from 'api/user';
import { setUser } from 'store/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const App = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.auth.user);

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
        <Route component={() => publicUser(Profile, true)} exact path='/profile' />
        <Route component={() => publicUser(Address, true)} path='/profile/address' />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;

/*
RF-63  Ver historial y detalles de compras realizadas  //
RF-35 Realizar devoluciones // 
36 Ver devoluciones //
37 Buscar devoluciones //
RF-65  Ver todos los productos y sus detalles //


RF-16 formulario compra en linea //
RF-62 Comprar en línea
RF-30 notificaciones cuando se genera una compran
RF-33 Ver ventas pendientes

RF-42 Recibir notificaciones de stock crítico
RF-53 notificaciones nuevo usuario se registra
RF-54 notificaciones cada vez que un clientes


*/

/*
funcionalidad registro  
RF-60 Editar direcciones de envío  
RF-61 Eliminar direcciones de envío  
*/
