import { AccountCircle, BookmarkAdd, Logout, MyLocation } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import './styles.scss';
import Layout from 'components/layout';
import { setUser } from 'store/authSlice';

const Profile = () => {
  const dispath = useDispatch();
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    dispath(setUser({ user: null }));
  };

  return (
    <Layout>
      <div className='profile-page'>
        <h4 className='text-center'>Su cuenta</h4>
        <div className='profile-content'>
          {options.map(({ label, Icon, path }) => (
            <div className='profile-option' key={label} onClick={() => history.push(path)}>
              <Icon />
              <h6>{label}</h6>
            </div>
          ))}
          <div className='profile-option' onClick={logout}>
            <Logout />
            <h6>Cerrar sesión</h6>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

const options = [
  {
    label: 'Informacion personal',
    Icon: AccountCircle,
    path: 'profile/details',
  },
  {
    label: 'Direccion',
    Icon: MyLocation,
    path: 'profile/address',
  },
  {
    label: 'Compras',
    Icon: BookmarkAdd,
    path: 'profile/shopping',
  },
];
