import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { Paper, TableContainer, Table, TableCell, TableRow, TableHead, TableBody, Button } from '@mui/material';
import { ControlPointRounded, DeleteForever } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import './styles.scss';
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

  const total = selectedProducts.reduce((total, { quantity, price }) => total + quantity * price, 0);
  const discount = watchDiscount === 0 ? 0 : total * (watchDiscount / 100);

  const onSubmit = async ({ client, paymentMethod }) => {
    if (!selectedProducts.length) return;
    const result = await createSale({
      products: selectedProducts.map(({ id, quantity, price }) => ({ productId: id, quantity, unitPrice: price })),
      total,
      discount,
      clientId: client,
      paymentMethod,
    });

    if (result.ok) dispatch(setAlert({ alert: { message: 'Venta creada', severity: 'success' } }));
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
        <TableContainer component={Paper} className='new-sale-table'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>Producto</TableCell>
                <TableCell align='center'>Precio</TableCell>
                <TableCell align='center'>Cantidad</TableCell>
                <TableCell align='center'>Subtotal</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedProducts.length > 0 && (
                <>
                  {selectedProducts.map(({ id, name, price, quantity }) => (
                    <TableRow key={name}>
                      <TableCell colSpan={2}>{name}</TableCell>
                      <TableCell align='center'>₡{price}</TableCell>
                      <TableCell align='center'>
                        <div className='quantity-row'>
                          <span onClick={() => updateProduct(id, quantity - 1)}>-</span> <strong>{quantity}</strong>{' '}
                          <span onClick={() => updateProduct(id, quantity + 1)}>+</span>
                        </div>
                      </TableCell>
                      <TableCell align='center'>₡{price * quantity}</TableCell>
                      <TableCell align='center'>
                        <DeleteForever
                          color='error'
                          className='pointer new-sale-icon'
                          onClick={() => deleteProduct(id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} />
                    <TableCell align='center'>Total</TableCell>
                    <TableCell align='center'>₡{total}</TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Paper className='new-sale-details'>
          <h5>Datos de la venta</h5>
          <CustomForm methods={methods} onSubmit={onSubmit}>
            <CustomSelect
              label='Cliente'
              name='client'
              options={[
                { label: 'Selecciona una opción', value: '' },
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
            <CustomInput label='Descuento' name='discount' type='number' onlyNumbers />
            <CustomInput label='Total pagado' name='totalPaid' type='number' onlyNumbers />
            <CustomInput label='Cambio devuelto' name='changeReturned' onlyNumbers />
            <div className='details-total'>
              <h6>Descuento</h6>
              <h6>₡{discount}</h6>
            </div>
            <div className='details-total'>
              <h6>Total</h6>
              <h6>₡{total - discount}</h6>
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
  client: '',
  discount: 0,
  totalPaid: 0,
  changeReturned: 0,
};

const schema = yup.object({
  client: yup.string().required('El cliente es obligatorio'),
});
