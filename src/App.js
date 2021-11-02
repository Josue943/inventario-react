import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CustomAlert from 'components/customAlert';
import Admin from './pages/admin';
import Home from './pages/home';
import Page404 from 'pages/404';

const App = () => (
  <BrowserRouter>
    <CustomAlert />
    <Switch>
      <Route component={Home} path='/' exact />
      <Route component={Admin} path='/admin' />
      <Route component={Page404} />
    </Switch>
  </BrowserRouter>
);

export default App;

/*
paginas:
buscar
categorias
editar y borrar
categorias:
Agregar categorías
Editar categorías
Eliminar o deshabilitar 
Ver lista de categorías
Buscar categorías

*/
