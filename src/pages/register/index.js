import * as yup from 'yup';
import { AccountCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './styles.scss';
import PeopleForm from 'components/peopleForm';
import Layout from 'components/layout';
import { CustomForm, CustomInput } from 'components/form';
import { createPerson } from 'api/people';
import { createUser } from 'api/user';
import { setUser } from 'store/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });

  const onSubmit = async ({ username, password, ...rest }) => {
    const responsePerson = await createPerson({ client: true, ...rest });
    if (!responsePerson.ok) return;
    const responseUser = await createUser({ username, password, personId: responsePerson.data.id });
    if (responseUser.ok) {
      const { token, user } = responseUser.data;
      localStorage.setItem('token', token);
      dispatch(setUser({ user }));
      history.push('/');
    }
  };

  return (
    <Layout>
      <div className='register-page'>
        <div className='register-page-form main-shadow-box'>
          <CustomForm methods={methods} onSubmit={onSubmit}>
            <div className='login-page-icon-container'>
              <AccountCircle className='login-page-icon' />
            </div>
            <h6 className='text-center'>Registro</h6>
            <PeopleForm />
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
  { name: 'username', label: 'Usuario' },
  { name: 'password', label: 'Contraseña', type: 'password' },
];

const schema = yup.object({
  documentId: yup
    .string()
    .trim()
    .matches('^[0-9]*$', 'Numero de documento solo debe incluir numeros')
    .required('El Numero de documento es obligatorio'),
  documentType: yup.string().trim().required('Debe seleccionar un tipo de documento '),
  name: yup.string().trim().required('El Nombre es obligatorio'),
  surnames: yup.string().trim().required('Los Apellidos son obligatorio'),
  phone: yup.string().trim().required('El Telefono es obligatorio'),
  email: yup.string().trim().email('Email invalido').required('El Email es obligatorio'),
  username: yup.string().trim().required('El usuario es obligatorio'),
  password: yup.string().trim().required('La password es obligatorio'),
});

const defaultValues = {
  documentId: '',
  documentType: '',
  name: '',
  surnames: '',
  phone: '',
  email: '',
  username: '',
  password: '',
};
