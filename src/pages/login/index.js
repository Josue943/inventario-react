import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import { setAlert } from 'store/alertSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './styles.scss';
import Layout from 'components/layout';
import { CustomForm, CustomInput } from 'components/form';
import { login } from 'api/user';
import { setUser } from 'store/authSlice';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const methods = useForm({ defaultValues });
  const onSubmit = async ({ username, password }) => {
    const response = await login(username, password);
    if (!response.ok) {
      return dispatch(
        setAlert({ alert: { message: 'Ha ingresado un nombre de usuario o contraseña inválidos', severity: 'error' } })
      );
    }
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    dispatch(setUser({ user }));
    if (user.admin) return history.push('/admin');
    history.push('/');
  };

  return (
    <Layout>
      <div className='login-page'>
        <div className='login-page-form main-shadow-box'>
          <CustomForm methods={methods} onSubmit={onSubmit}>
            <div className='login-page-icon-container'>
              <AccountCircle className='login-page-icon' />
            </div>
            <h6 className='text-center'>Inicia sesión con tu cuenta</h6>
            {options.map(option => (
              <CustomInput key={option.name} {...option} />
            ))}
            <Button type='submit' variant='contained'>
              Iniciar sesión
            </Button>
          </CustomForm>
          <h5 className='login-request'>
            ¿No tiene una cuenta? <Link to='/register'> Cree una aquí</Link>
          </h5>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

const defaultValues = {
  username: '',
  password: '',
};

const options = [
  { name: 'username', label: 'Usuario' },
  { name: 'password', label: 'Contraseña', type: 'password' },
];
