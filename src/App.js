import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Admin from './pages/admin';
import CustomAlert from 'components/customAlert';
import Home from './pages/home';
import Login from 'pages/login';
import Page404 from 'pages/404';
import Profile from 'pages/profile';
import Register from 'pages/register';
import Shop from 'pages/shop';
import Address from 'pages/profile/address';

const App = () => (
  <BrowserRouter>
    <CustomAlert />
    <Switch>
      <Route component={Home} path='/' exact />
      <Route component={Admin} path='/admin' />
      <Route component={Login} path='/login' />
      <Route component={Register} path='/register' />
      <Route component={Shop} path='/shop' />
      <Route component={Profile} exact path='/profile' />
      <Route component={Address} path='/profile/address' />
      <Route component={Page404} />
    </Switch>
  </BrowserRouter>
);

export default App;

/*
ventas imprimir factura //
RF-16 formulario compra en linea //
RF-30 notificaciones cuando se genera una compra
RF-33 Ver ventas pendientes
RF-35 Realizar devoluciones // 
36 Ver devoluciones //
37 Buscar devoluciones //
RF-42 Recibir notificaciones de stock crítico
RF-53 notificaciones nuevo usuario se registra
RF-54 notificaciones cada vez que un clientes
RF-62 Comprar en línea
RF-63  Ver historial y detalles de compras realizadas  //
RF-65  Ver todos los productos y sus detalles //
*/

/*
funcionalidad
login  registro form  
RF-60 Editar direcciones de envío  
RF-61 Eliminar direcciones de envío  
*/
