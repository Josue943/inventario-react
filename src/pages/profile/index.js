import { AccountCircle, BookmarkAdd } from '@mui/icons-material';

import Layout from 'components/layout';

import './styles.scss';

const Profile = () => {
  return (
    <Layout>
      <div className='profile-page'>
        <h4 className='text-center'>Su cuenta</h4>
        <div className='profile-content'>
          {options.map(({ label, Icon }) => (
            <div className='profile-option'>
              <Icon />
              <h6>{label}</h6>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

const options = [
  {
    label: 'Direccion',
    Icon: AccountCircle,
  },
  {
    label: 'Compras',
    Icon: BookmarkAdd,
  },
];
