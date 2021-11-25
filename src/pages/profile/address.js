import * as yup from 'yup';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';

import AddressForm from 'components/addressForm';
import Layout from 'components/layout';
import { CustomForm } from 'components/form';

const Address = () => {
  const methods = useForm({ defaultState });
  const onSubmit = () => {};
  return (
    <Layout>
      <div className='profile-user-page'>
        <div className='profile-user-page-form main-shadow-box'>
          <CustomForm methods={methods} onSubmit={onSubmit}>
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

const defaultState = {
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
