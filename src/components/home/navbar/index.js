import { Person, ShoppingCart } from '@mui/icons-material';

import './styles.scss';

const Navbar = () => (
  <div className='navbar main-padding'>
    <div className='navbar-home-container'>
      <p>Llámenos: 2218-1420</p>
      <div className='navbar-home-rigth'>
        {items.map(({ Icon, label }) => (
          <div className='navbar-item pointer' key={label}>
            <Icon />
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Navbar;

const items = [
  { label: 'Iniciar sesión', Icon: Person },
  { label: 'Carrito', Icon: ShoppingCart },
];
