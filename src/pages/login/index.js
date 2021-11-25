import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import { setAlert } from 'store/alertSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import './styles.scss';
import { CustomForm, CustomInput } from 'components/form';
import { Navbar } from 'components/home';
import Layout from 'components/layout';

const Login = () => {
  const dispatch = useDispatch();

  const methods = useForm({ defaultValues });
  const onSubmit = data => {
    dispatch(
      setAlert({ alert: { message: 'Ha ingresado un nombre de usuario o contraseña inválidos', severity: 'error' } })
    );
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
  user: '',
  password: '',
};

const options = [
  { name: 'user', label: 'Usuario' },
  { name: 'password', label: 'Contraseña', type: 'password' },
];
