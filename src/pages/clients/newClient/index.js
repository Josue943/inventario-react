import * as yup from 'yup';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import AddressForm from 'components/addressForm';
import changeNullValues from 'utils/changeNullValues';
import PeopleForm from 'components/peopleForm';
import { createPerson, updatePerson } from 'api/people';
import { CustomForm } from 'components/form';
import { setAlert } from 'store/alertSlice';

const NewClient = ({ callback, item }) => {
  const dispatch = useDispatch();

  const defaultValues = item
    ? {
        ...item,
        province: changeNullValues(item.province),
        canton: changeNullValues(item.canton),
        district: changeNullValues(item.district),
        address: changeNullValues(item.address),
      }
    : defaultState;

  const methods = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'onTouched' });

  const onSubmit = async data => {
    const request = item ? updatePerson : createPerson;
    const response = await request({ ...data, client: true });

    const message = response.ok ? `Cliente ${item ? 'actualizado' : 'creado'}` : 'Error de Servidor';
    const severity = response.ok ? 'success' : 'error';
    dispatch(setAlert({ alert: { message, severity } }));
    response.ok && callback ? callback() : onClear();
  };

  const onClear = () => methods.reset(defaultValues);

  return (
    <>
      <h3>{`${item ? 'Editar' : 'Nuevo'} Cliente`}</h3>
      <CustomForm methods={methods} onSubmit={onSubmit}>
        <PeopleForm />
        <AddressForm />
        <div className='form-buttons'>
          <Button color='secondary' type='button' onClick={onClear}>
            Limpiar
          </Button>
          <Button variant='contained' className='save-button' type='submit'>
            {item ? 'Actualizar' : 'Guardar'}
          </Button>
        </div>
      </CustomForm>
    </>
  );
};

export default NewClient;

const defaultState = {
  documentId: '',
  documentType: '',
  name: '',
  surnames: '',
  phone: '',
  email: '',
  province: '',
  canton: '',
  district: '',
  address: '',
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
  province: yup.string().required('La provincia es obligatorio'),
  canton: yup.string().required('El canton es obligatorio'),
  district: yup.string().required('El distrito es obligatorio'),
  address: yup.string().required('El direccion es obligatoria'),
});
