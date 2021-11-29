import moment from 'moment';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';

import './styles.scss';
import useFetch from 'hooks/useFetch';
import { defaultValues, defaultSelectOption, options, optionsMain, radioOptions, schema } from './options';
import { CustomForm, CustomInput, CustomSelect, CustomRadioButtons, CustomDatePicker } from 'components/form';
import { createProduct, updateProduct, uploadProductImage } from 'api/products';
import { getCategories } from 'api/categories';
import { getSuppliers } from 'api/suppliers';
import { useDispatch } from 'react-redux';
import { setAlert } from 'store/alertSlice';
import { useForm } from 'react-hook-form';

const NewProduct = ({ item, callback }) => {
  const [image, setImage] = useState(null);
  const categories = useFetch({ apiFun: getCategories });
  const suppliers = useFetch({ apiFun: getSuppliers });

  const dispatch = useDispatch();

  const categoriesOptions = useMemo(
    () => [defaultSelectOption, ...categories.data.rows.map(({ name, id }) => ({ label: name, value: id }))],
    [categories.data.rows]
  );

  const suppliersOptions = useMemo(
    () => [
      defaultSelectOption,
      ...suppliers.data.rows.map(({ details: { name }, id }) => ({ label: name, value: id })),
    ],
    [suppliers.data.rows]
  );

  const onSubmit = async data => {
    const request = item ? updateProduct : createProduct;

    const response = await request({
      ...data,
      brand: checkEmptyValues(data.brand),
      enabled: data.enabled === 1,
      expiration: data.hasExpiration ? moment(data.expiration).format('DD/MM/yyyy') : null,
      supplierId: checkEmptyValues(data.supplierId),
      categoryId: checkEmptyValues(data.categoryId),
    });

    if (image && response.ok) {
      await uploadProductImage(image, item?.id || response.data.id);
      setImage(null);
    }

    const message = response.ok ? `Producto ${item ? 'actualizado' : 'creado'}` : 'Error de Servidor';
    const severity = response.ok ? 'success' : 'error';
    dispatch(setAlert({ alert: { message, severity } }));
    if (callback) callback();
    else if (response.ok) onClear();
  };

  const methods = useForm({
    defaultValues: item ? getInitialState(item) : defaultValues,
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const watchHasExpiration = methods.watch('hasExpiration');

  const onClear = () => methods.reset(item ? getInitialState(item) : defaultValues);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    setImage({ file });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/jpg',
    noKeyboard: true,
  });

  return (
    <div className='new-product'>
      <h3>{`${item ? 'Editar' : 'Nuevo'} Producto`}</h3>
      <CustomForm methods={methods} onSubmit={onSubmit}>
        {optionsMain.map(option => (
          <CustomInput {...option} key={option.name} />
        ))}
        <div className='form-inputs'>
          {options.map(({ select, ...rest }) => {
            const Component = select ? CustomSelect : CustomInput;
            return <Component {...rest} key={rest.name} />;
          })}
        </div>
        <h4>Vencimiento del producto</h4>
        <div className='expiration-container'>
          <CustomRadioButtons name='hasExpiration' options={radioOptions} />
          <div className='expiration-date'>
            <CustomDatePicker name='expiration' label='Fecha Vencimiento' disabled={+watchHasExpiration === 0} />
          </div>
        </div>

        {categories.done && suppliers.done && (
          <div className='form-selects'>
            <CustomSelect name='categoryId' label='Categoria' options={categoriesOptions} />
            <CustomSelect name='supplierId' label='Proveedor' options={suppliersOptions} />
          </div>
        )}
        <h4>Imagen del producto</h4>
        <div className='drop-image-container'>
          <div {...getRootProps()} className='drop-image'>
            <Button variant='contained'>Seleccionar Imagen</Button>
            <input {...getInputProps()} />
          </div>
          {image && <p className='image-name'>{image.file.name}</p>}
        </div>

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

export default NewProduct;

const checkEmptyValues = value => (value ? value : null);

const changeNullValues = value => (value === null ? '' : value);

const getInitialState = item => ({
  ...item,
  brand: changeNullValues(item.brand),
  categoryId: changeNullValues(item.categoryId),
  presentation: changeNullValues(item.presentation),
  supplierId: changeNullValues(item.supplierId),
  warranty: changeNullValues(item.warranty),
  hasExpiration: item.expiration ? 1 : 0,
  enabled: item.enabled ? 1 : 0,
  expiration: item.expiration ? moment(item.expiration, 'DD/MM/yyyy') : moment(),
});
