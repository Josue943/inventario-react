import { AccountCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import { setAlert } from 'store/alertSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import './styles.scss';
import { CustomForm, CustomInput } from 'components/form';

const Login = () => {
  const dispatch = useDispatch();

  const methods = useForm({ defaultValues });
  const onSubmit = data => {
    dispatch(
      setAlert({ alert: { message: 'Ha ingresado un nombre de usuario o contraseña inválidos', severity: 'error' } })
    );
  };

  return (
    <div className='login-page'>
      <div className='login-page-form'>
        <CustomForm methods={methods} onSubmit={onSubmit}>
          <div className='login-page-icon-container'>
            <AccountCircle className='login-page-icon' />
          </div>
          <h6 className='text-center'>Inicia sesión con tu cuenta</h6>
          {options.map(option => (
            <CustomInput key={option.name} {...option} />
          ))}
          <Button type='submit' variant='outlined'>
            Login
          </Button>
        </CustomForm>
      </div>
    </div>
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
