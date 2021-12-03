import { Menu as MenuIcon, PowerSettingsNew as PowerSettingsNewIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import './styles.scss';
import { toggleMenu } from 'store/navbarSlice';
import { setUser } from 'store/authSlice';
import { useHistory } from 'react-router';

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(setUser({ user: null }));
    history.push('/login');
  };

  return (
    <div className='navbar main-padding'>
      <MenuIcon className='navbar-icon pointer' onClick={() => dispatch(toggleMenu())} />
      <PowerSettingsNewIcon className='navbar-icon pointer' onClick={logout} />
    </div>
  );
};

export default Navbar;
