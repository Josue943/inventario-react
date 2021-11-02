import moment from 'moment';
import { useMemo, useState } from 'react';
import { Button } from '@mui/material';

import './styles.scss';
import useFetch from 'hooks/useFetch';
import { defaultState, defaultSelectOption, options, optionsMain, radioOptions } from './options';
import { CustomInput, CustomSelect, CustomRadioButtons, CustomDatePicker } from 'components/form';
import { createProduct } from 'api/products';
import { getCategories } from 'api/categories';
import { getSuppliers } from 'api/suppliers';
import { useDispatch } from 'react-redux';
import { setAlert } from 'store/alertSlice';

const NewProduct = () => {
  const [state, setState] = useState(defaultState);
  const { data: categoriesData } = useFetch(getCategories);
  const { data: suppliersData } = useFetch(getSuppliers);

  const onChange = ({ target }) => setState({ ...state, [target.name]: target.value });
  const handleDate = value => setState({ ...state, expiration: value });

  const dispatch = useDispatch();

  const onClear = () => setState(defaultState);

  const categories = useMemo(
    () => [defaultSelectOption, ...categoriesData.rows.map(({ name, id }) => ({ label: name, value: id }))],
    [categoriesData.rows]
  );

  const suppliers = useMemo(
    () => [defaultSelectOption, ...suppliersData.rows.map(({ details: { name }, id }) => ({ label: name, value: id }))],
    [suppliersData.rows]
  );

  const onSubmit = async () => {
    const response = await createProduct({
      ...state,
      enabled: state.enabled === 1,
      categoryId: checkEmptyValues(state.categoryId),
      discount: +state.discount,
      expiration: state.hasExpiration ? moment(state.expiration).format('DD/MM/yyyy') : null,
      minStock: +state.minStock,
      supplierId: checkEmptyValues(state.supplierId),
      price: +state.price,
      stock: +state.stock,
    });

    const message = response.ok ? 'Producto Creado' : 'Error de Servidor';
    const severity = response.ok ? 'success' : 'error';
    dispatch(setAlert({ alert: { message, severity } }));
    if (response.ok) onClear();
  };

  return (
    <div className='new-product'>
      <h3>Nuevo Producto</h3>
      <form>
        {optionsMain.map(option => (
          <CustomInput {...option} key={option.name} value={state[option.name]} onChange={onChange} />
        ))}

        <div className='form-inputs'>
          {options.map(({ select, ...rest }) => {
            const Component = select ? CustomSelect : CustomInput;
            return <Component {...rest} key={rest.name} value={state[rest.name]} onChange={onChange} />;
          })}
        </div>

        <h4>Vencimiento del producto</h4>
        <div className='expiration-container'>
          <CustomRadioButtons
            onChange={onChange}
            name='hasExpiration'
            value={state.hasExpiration}
            options={radioOptions}
          />
          <CustomDatePicker
            value={state.expiration}
            label='Fecha Vencimiento'
            onChange={handleDate}
            disabled={!state.hasExpiration}
          />
        </div>

        <div className='form-selects'>
          <CustomSelect
            name='categoryId'
            onChange={onChange}
            value={state.categoryId}
            label='Categoria'
            options={categories}
          />
          <CustomSelect
            name='supplierId'
            onChange={onChange}
            value={state.supplierId}
            label='Proveedor'
            options={suppliers}
          />
        </div>

        <div className='form-buttons'>
          <Button color='secondary' onClick={onClear}>
            Limpiar
          </Button>
          <Button variant='contained' className='save-button' onClick={onSubmit}>
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;

const checkEmptyValues = value => (value ? value : null);
