import * as yup from 'yup';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import PeopleForm from 'components/peopleForm';
import Layout from 'components/layout';
import { CustomForm } from 'components/form';
import { getPerson, updatePerson } from 'api/people';
import { setAlert } from 'store/alertSlice';
import { Link } from 'react-router-dom';

const Details = () => {
  const personId = useSelector(({ auth }) => auth.user.personId);

  const dispatch = useDispatch();

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });

  const onSubmit = async data => {
    const response = await updatePerson({ id: personId, ...data });
    if (response.ok) dispatch(setAlert({ alert: { message: 'Informacion actualizada', severity: 'success' } }));
  };

  useEffect(() => {
    (async () => {
      const response = await getPerson(personId);
      if (response.ok) {
        const { documentId, documentType, email, surnames, phone, name } = response.data;
        methods.reset({ documentId, documentType, email, surnames, phone, name });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className='profile-user-page'>
        <div className='profile-user-page-form main-shadow-box'>
          <CustomForm methods={methods} onSubmit={onSubmit}>
            <h6 className='profile-redirect'>
              <Link to='/'>Inicio</Link> / <Link to='/profile'>Su cuenta</Link>
            </h6>
            <PeopleForm />
            <Button variant='contained' className='save-button' type='submit'>
              Guardar
            </Button>
          </CustomForm>
        </div>
      </div>
    </Layout>
  );
};

export default Details;

const defaultValues = {
  documentId: '',
  documentType: '',
  name: '',
  surnames: '',
  phone: '',
  email: '',
};

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
});
