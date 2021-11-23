import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CustomAlert from 'components/customAlert';
import Admin from './pages/admin';
import Home from './pages/home';
import Page404 from 'pages/404';
import Login from 'pages/login';

const App = () => (
  <BrowserRouter>
    <CustomAlert />
    <Switch>
      <Route component={Home} path='/' exact />
      <Route component={Admin} path='/admin' />
      <Route component={Login} path='/login' />
      <Route component={Page404} />
    </Switch>
  </BrowserRouter>
);

export default App;

/*
modulo ventas
      imprimir factura //
modulo devoluciones
      crear devoluciones de productos por parte de clientes 
      Ver devoluciones realizadas 
      Buscar devoluciones por fecha
Ver lista de usuarios registrados en el sistema
imagen Productos    ///
pagina principal //
formulario registro
formulario de compras en línea
Recibir notificaciones cuando se genera una compra
Recibir notificaciones de stock crítico
Recibir notificaciones cada vez que un nuevo usuario se registra
*/
