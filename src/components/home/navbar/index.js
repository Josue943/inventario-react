import { Person, ShoppingCart } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import './styles.scss';

const Navbar = () => {
  const { items, user } = useSelector(({ cart, auth }) => ({
    item: cart.products.reduce((previous, current) => previous + current.quantity, 0),
    user: auth.user,
  }));

  const history = useHistory();
  return (
    <div className='navbar main-padding'>
      <div className='navbar-home-container'>
        <p>Llámenos: 2218-1420</p>
        <div className='navbar-home-rigth'>
          <div className='navbar-item pointer' onClick={() => history.push(user ? '/profile' : '/login')}>
            <Person />
            <p>{user ? user.username : 'Iniciar sesión'}</p>
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
