import { Person, ShoppingCart } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import './styles.scss';

const Navbar = () => {
  const items = useSelector(state => state.cart.products.reduce((previous, current) => previous + current.quantity, 0));
  const history = useHistory();
  return (
    <div className='navbar main-padding'>
      <div className='navbar-home-container'>
        <p>Llámenos: 2218-1420</p>
        <div className='navbar-home-rigth'>
          <div className='navbar-item pointer' onClick={() => history.push('/login')}>
            <Person />
            <p>Iniciar sesión</p>
          </div>
          <div className='navbar-item pointer ' onClick={() => history.push('/shop')}>
            <ShoppingCart />
            <p>Carrito {items > 0 && `(${items})`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
