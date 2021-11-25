import { AccountCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './styles.scss';
import { CustomForm, CustomInput } from 'components/form';
import Layout from 'components/layout';

const Register = () => {
  const methods = useForm();
  const onSubmit = () => {};
  return (
    <Layout>
      <div className='register-page'>
        <div className='register-page-form main-shadow-box'>
          <CustomForm methods={methods} onSubmit={onSubmit}>
            <div className='login-page-icon-container'>
              <AccountCircle className='login-page-icon' />
            </div>
            <h6 className='text-center'>Registro</h6>
            {options.map(o => (
              <CustomInput key={o.name} {...o} />
            ))}
            <Button type='submit' variant='contained'>
              Registrar
            </Button>
          </CustomForm>
          <h5 className='login-request'>
            ¿Ya tiene una cuenta? <Link to='/login'>¡Inicie sesión!</Link>
          </h5>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

const options = [
  { name: 'name', label: 'Nombre' },
  { name: 'surnames', label: 'Apellidos' },
  { name: 'email', label: 'Email' },
  { name: 'password', label: 'Contraseña', type: 'password' },
];
