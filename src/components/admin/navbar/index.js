import { Menu as MenuIcon, PowerSettingsNew as PowerSettingsNewIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import './styles.scss';
import { toggleMenu } from 'store/navbarSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div className='navbar main-padding'>
      <MenuIcon className='navbar-icon pointer' onClick={() => dispatch(toggleMenu())} />
      <PowerSettingsNewIcon className='navbar-icon pointer' />
    </div>
  );
};

export default Navbar;
