import * as yup from 'yup';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import './styles.scss';
import { CustomForm, CustomInput, CustomSelect } from 'components/form';
import { createCategory, updateCategory } from 'api/categories';
import { setAlert } from 'store/alertSlice';

const NewCategory = ({ item, callback }) => {
  const dispatch = useDispatch();

  const defaultValues = item ? { ...item, enabled: item.enabled ? 1 : 0 } : defaultState;

  const methods = useForm({ defaultValues, mode: 'onTouched', resolver: yupResolver(schema) });

  const onSubmit = async ({ enabled, ...rest }) => {
    const request = item ? updateCategory : createCategory;
    const response = await request({ enabled: enabled === 1, ...rest });

    const message = response.ok ? `Categoría ${item ? 'editada' : 'creada'}` : 'Error de Servidor';
    const severity = response.ok ? 'success' : 'error';
    dispatch(setAlert({ alert: { message, severity } }));
    callback && callback();
    response.ok && onClear();
  };

  const onClear = () => methods.reset(defaultValues);

  return (
    <div className='new-category'>
      <h3>{`${item ? 'Editar' : 'Nueva'} Categoría`}</h3>
      <CustomForm methods={methods} onSubmit={onSubmit}>
        <h6>Información de la categoría</h6>
        <CustomInput name='name' label='Nombre de la categoría' />
        <CustomSelect name='enabled' label='Estado de la categoría' options={selectOptions} />
        <div className='form-buttons'>
          <Button color='secondary' type='button' onClick={onClear}>
            Limpiar
          </Button>
          <Button variant='contained' className='save-button' type='submit'>
            Guardar
          </Button>
        </div>
      </CustomForm>
    </div>
  );
};

export default NewCategory;

const defaultState = { name: '', enabled: 1 };

const selectOptions = [
  { label: 'habilitado', value: 1 },
  { label: 'desabilitado', value: 0 },
];

const schema = yup.object({
  name: yup.string().trim().required('El Nombre es obligatorio'),
});
