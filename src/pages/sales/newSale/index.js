import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { Paper, Button } from '@mui/material';
import { ControlPointRounded } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

import './styles.scss';
import SaleTable from '../saleTable';
import SearchBox from 'components/searchBox';
import useDebounce from 'hooks/useDebounce';
import useFetch from 'hooks/useFetch';
import { CustomForm, CustomInput, CustomRadioButtons, CustomSelect } from 'components/form';
import { createSale } from 'api/sales';
import { getProducts } from 'api/products';
import { getPeople } from 'api/people';
import { setAlert } from 'store/alertSlice';

const NewSale = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [value, setValue] = useState('');

  const debounceValue = useDebounce({ value, delay: 1000 });
  const initialRender = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const clients = useFetch({ apiFun: getPeople, params: { client: true } });

  const onChange = ({ target: { value } }) => setValue(value);

  const fetchProducts = async () => {
    const products = await getProducts({ limit: 5, search: debounceValue });
    setProducts(products.data.rows);
  };

  const onSelectProduct = product => {
    setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    setValue('');
    setProducts([]);
  };

  const deleteProduct = id => setSelectedProducts(selectedProducts.filter(product => product.id !== id));

  const updateProduct = (id, value) => {
    if (!value) deleteProduct(id);
    else setSelectedProducts(selectedProducts.map(item => (item.id === id ? { ...item, quantity: value } : item)));
  };

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const watchDiscount = methods.watch('discount');

  const subtotal = selectedProducts.reduce((total, { quantity, price }) => total + quantity * price, 0);
  const totalDiscount = watchDiscount === 0 ? 0 : subtotal * (watchDiscount / 100);
  const total = subtotal - totalDiscount;

  const onSubmit = async ({ client, paymentMethod, totalPaid, changeReturned, discount }) => {
    if (!selectedProducts.length) return;
    const result = await createSale({
      products: selectedProducts.map(({ id, quantity, price }) => ({ productId: id, quantity, unitPrice: price })),
      discount,
      clientId: client,
      paymentMethod,
      totalPaid,
      changeReturned,
    });

    if (result.ok) {
      dispatch(setAlert({ alert: { message: 'Venta creada', severity: 'success' } }));
      history.push('/admin/sales');
    }
  };

  const show = products.length > 0;

  useEffect(() => {
    if (!initialRender.current) initialRender.current = true;
    else debounceValue && fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  return (
    <div className='new-sale-page'>
      <h3>Nueva Venta</h3>
      <div className='search-box-container'>
        <SearchBox placeholder='Buscar productos' onChange={onChange} value={value}>
          <div className={`box-items ${!show ? 'box-hide' : ''}`}>
            {products
              .filter(({ id }) => !selectedProducts.map(({ id }) => id).includes(id))
              .map(product => (
                <div className='box-item' key={product.id} onClick={() => onSelectProduct(product)}>
                  <h6 className='pointer'>{product.name}</h6>
                  <ControlPointRounded color='success' className='pointer' />
                </div>
              ))}
          </div>
        </SearchBox>
      </div>

      <div className='new-sale-content'>
        <SaleTable products={selectedProducts} subtotal={subtotal} onUpdate={updateProduct} onDelete={deleteProduct} />
        <Paper className='new-sale-details'>
          <h5>Datos de la venta</h5>
          <CustomForm methods={methods} onSubmit={onSubmit}>
            <CustomSelect
              label='Cliente'
              name='client'
              options={[
                { label: 'Publico general', value: null },
                ...clients.data.rows.map(({ name, id }) => ({ label: name, value: id })),
              ]}
            />
            <h6>Tipo de pago</h6>
            <CustomRadioButtons
              label='Tipo de pago'
              name='paymentMethod'
              options={[
                { label: 'Contado', value: 'cash' },
                { label: 'Credito', value: 'credit' },
              ]}
            />
            <CustomInput label='Descuento' name='discount' onlyNumbers />
            <CustomInput label='Total pagado' name='totalPaid' onlyNumbers />
            <CustomInput label='Cambio devuelto' name='changeReturned' onlyNumbers />
            <div className='details-total'>
              <h6>Descuento</h6>
              <h6>₡{totalDiscount}</h6>
            </div>
            <div className='details-total'>
              <h6>Total</h6>
              <h6>₡{total}</h6>
            </div>
            <div className='new-sale-button-container'>
              <Button color='primary' variant='contained' type='submit' className='new-sale-button'>
                Guardar venta
              </Button>
            </div>
          </CustomForm>
        </Paper>
      </div>
    </div>
  );
};

export default NewSale;

const defaultValues = {
  paymentMethod: 'cash',
  client: null,
  discount: 0,
  totalPaid: 0,
  changeReturned: 0,
};

const schema = yup.object({
  totalPaid: yup.string().required('Total pagado es obligatoria'),
});
