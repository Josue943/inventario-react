import * as yup from 'yup';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import './styles.scss';
import AddressForm from 'components/addressForm';
import compareObject from 'utils/compareObjects';
import PeopleForm from 'components/peopleForm';
import changeNullValues from 'utils/changeNullValues';
import { CustomForm, CustomSelect } from 'components/form';
import { createPerson, updatePerson } from 'api/people';
import { createSupplier, updateSupplier } from 'api/suppliers';
import { setAlert } from 'store/alertSlice';

const NewSupplier = ({ callback, item }) => {
  const dispatch = useDispatch();

  const defaultValues = item
    ? {
        enabled: item.enabled ? 1 : 0,
        ...item.details,
        province: changeNullValues(item.details.province),
        canton: changeNullValues(item.details.canton),
        district: changeNullValues(item.details.district),
        address: changeNullValues(item.details.address),
      }
    : defaultState;

  const methods = useForm({ defaultValues, mode: 'onTouched', resolver: yupResolver(schema) });

  const onSubmit = async ({ enabled, ...rest }) => {
    const personBody = { ...rest, ...(item && { id: item.details.id }) };
    const personId = await handlePersonAction(personBody);
    if (!personId) return;

    const response = await handleSupplierAction({
      enabled: enabled === 1,
      personId,
      ...(item && { id: item.id }),
    });

    if (response) {
      dispatch(setAlert({ alert: { message: `Proveedor ${item ? 'editado' : 'creado'}`, severity: 'success' } }));
      callback ? callback() : onClear();
    }
  };

  const handlePersonAction = async body => {
    const request = item ? updatePerson : createPerson;
    const response = await request(body);
    if (response.ok) return item ? item.details.id : response.data.id;
    return false;
  };

  const handleSupplierAction = async body => {
    if (item && compareObject({ id: item.id, enabled: item.enabled, personId: item.personId }, body)) return true;
    const request = item ? updateSupplier : createSupplier;
    const response = await request(body);
    return response.ok;
  };

  const onClear = () => methods.reset(defaultValues);

  return (
    <>
      <h3>{`${item ? 'Editar' : 'Nuevo'} Proveedor`}</h3>
      <CustomForm methods={methods} onSubmit={onSubmit}>
        <PeopleForm />
        <AddressForm />
        <h5>Datos Proveedor</h5>
        <CustomSelect name='enabled' label='Estado' options={enableOptions} />
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

export default NewSupplier;

const defaultState = {
  documentId: '',
  documentType: '',
  name: '',
  surnames: '',
  phone: '',
  email: '',
  enabled: 1,
  province: '',
  canton: '',
  district: '',
  address: '',
};

const enableOptions = [
  { label: 'habilitado', value: 1 },
  { label: 'desabilitado', value: 0 },
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
  province: yup.string().required('La provincia es obligatorio'),
  canton: yup.string().required('El canton es obligatorio'),
  district: yup.string().required('El distrito es obligatorio'),
  address: yup.string().required('La direccion es obligatorio'),
});

{
  /* <CustomForm methods={methods} onSubmit={onSubmit}>
        <div className='search-people'>
          <CustomInput name='search' label='Numero de documento' />
          <Button variant='contained' type='submit'>
            Buscar
          </Button>
        </div>
      </CustomForm> */
}
