import { Person, ShoppingCart } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import './styles.scss';

const Navbar = () => {
  const { count, user } = useSelector(({ cart, auth }) => ({
    count: cart.products.reduce((previous, current) => previous + current.quantity, 0),
    user: auth.user,
  }));

  const history = useHistory();
  return (
    <div className='navbar main-padding'>
      <div className='navbar-home-container'>
        <p>Llámenos: 7213-1613</p>
        <div className='navbar-home-rigth'>
          <div className='navbar-item pointer' onClick={() => history.push(user ? '/profile' : '/login')}>
            <Person />
            <p>{user ? user.username : 'Iniciar sesión'}</p>
          </div>
          <div className='navbar-item pointer ' onClick={() => history.push('/shop')}>
            <ShoppingCart />
            <p>Carrito {count > 0 && `(${count})`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
