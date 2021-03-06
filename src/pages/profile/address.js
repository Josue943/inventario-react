import * as yup from 'yup';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';

import AddressForm from 'components/addressForm';
import changeNullValues from 'utils/changeNullValues';
import Layout from 'components/layout';
import { CustomForm } from 'components/form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { getPerson, updatePerson } from 'api/people';
import { setAlert } from 'store/alertSlice';
import { Link } from 'react-router-dom';

const Address = () => {
  const personId = useSelector(({ auth }) => auth.user.personId);

  const dispatch = useDispatch();

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });

  const onSubmit = async data => {
    const response = await updatePerson({ id: personId, ...data });
    if (response.ok) dispatch(setAlert({ alert: { message: 'Dirección actualizada', severity: 'success' } }));
  };

  useEffect(() => {
    (async () => {
      const response = await getPerson(personId);
      if (response.ok) {
        const { province, canton, district, address } = response.data;
        methods.reset({
          province: changeNullValues(province),
          canton: changeNullValues(canton),
          district: changeNullValues(district),
          address: changeNullValues(address),
        });
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
            <AddressForm />
            <Button variant='contained' className='save-button' type='submit'>
              Guardar
            </Button>
          </CustomForm>
        </div>
      </div>
    </Layout>
  );
};

export default Address;

const defaultValues = {
  province: '',
  canton: '',
  district: '',
  address: '',
};

const schema = yup.object({
  province: yup.string().required('La provincia es obligatorio'),
  canton: yup.string().required('El canton es obligatorio'),
  district: yup.string().required('El distrito es obligatorio'),
  address: yup.string().required('La direccion es obligatorio'),
});
