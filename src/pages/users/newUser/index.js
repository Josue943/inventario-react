import * as yup from 'yup';
import { Button, FormControlLabel, Switch } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import compareObject from 'utils/compareObjects';
import PeopleForm from 'components/peopleForm';
import { CustomForm, CustomInput } from 'components/form';
import { createPerson, updatePerson } from 'api/people';
import { createUser, updateUser } from 'api/user';
import { setAlert } from 'store/alertSlice';

const NewUser = ({ callback, item }) => {
  const [admin, setAdmin] = useState(item?.admin || false);
  const dispatch = useDispatch();

  const defaultValues = item ? { username: item.username, password: '', ...item.details } : defaultState;

  const methods = useForm({ defaultValues, mode: 'onTouched', resolver: yupResolver(getSchema(!!item)) });

  const onSubmit = async ({ username, password, ...rest }) => {
    const personBody = { ...rest, ...(item && { id: item.details.id }) };
    const personId = await handlePersonAction(personBody);
    if (!personId) return;

    const response = await handleSupplierAction({
      username,
      personId,
      admin,
      ...(password && { password }),
      ...(item && { id: item.id }),
    });

    const message = response ? `Usuario ${item ? 'editado' : 'creado'}` : 'Error de servidor';
    const severity = response ? 'success' : 'error';

    dispatch(setAlert({ alert: { message, severity } }));
    response && callback ? callback() : onClear();
    setAdmin(false);
  };

  const handlePersonAction = async body => {
    if (item && compareObject(body, item.details)) return item.details.id;
    const request = item ? updatePerson : createPerson;
    const response = await request(body);
    if (response.ok) return item ? item.details.id : response.data.id;
    dispatch(setAlert({ alert: { message: 'Error de servidor', severity: 'error' } }));
    return false;
  };

  const handleSupplierAction = async body => {
    const request = item ? updateUser : createUser;
    const response = await request(body);
    return response.ok;
  };

  const onClear = () => methods.reset(defaultValues);
  const changeRole = () => setAdmin(!admin);

  return (
    <>
      <h3>{`${item ? 'Editar' : 'Nuevo'} Usuario`}</h3>
      <CustomForm methods={methods} onSubmit={onSubmit}>
        <PeopleForm />
        <h5>Información de la cuenta</h5>
        <div className='dual-input-form'>
          {options.map(o => (
            <CustomInput key={o.name} {...o} />
          ))}
        </div>

        <FormControlLabel
          control={<Switch checked={admin} onChange={changeRole} name='admin' />}
          label='Administrador'
        />

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

export default NewUser;

const defaultState = {
  documentId: '',
  documentType: '',
  name: '',
  surnames: '',
  phone: '',
  email: '',
  username: '',
  password: '',
};

const getSchema = edit => {
  return yup.object({
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
    password: getPasswordSchema(edit),
  });
};

const getPasswordSchema = edit => {
  return yup.string().test({
    name: 'Custom validator',
    test: function (value) {
      if (value && value.length < 8) {
        return this.createError({
          message: 'La password debe tener un minimo de 8 caracteres',
          path: 'password',
        });
      }
      if (!value && !edit) {
        return this.createError({
          message: 'La password es obligatoria',
          path: 'password',
        });
      }
      return true;
    },
  });
};

const options = [
  { name: 'username', label: 'Usuario' },
  { name: 'password', label: 'Contraseña', type: 'password' },
];
