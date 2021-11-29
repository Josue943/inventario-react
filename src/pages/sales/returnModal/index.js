import * as yup from 'yup';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router';

import './styles.scss';
import ModalContainer from 'components/modalContainer';
import { CustomForm, CustomInput } from 'components/form';
import { createReturn } from 'api/returns';
import { setAlert } from 'store/alertSlice';

const defaultValues = { quantity: 0 };

const ReturnModal = ({ open, onClose, saleId, product }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const methods = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'onTouched' });

  const onCloseModal = () => {
    methods.reset(defaultValues);
    onClose();
  };

  const onSubmit = async ({ quantity }) => {
    if (+quantity > product.quantity) {
      dispatch(
        setAlert({
          alert: {
            message: 'La cantidad que desea devolver es mayor a la cantidad registrada en la venta',
            severity: 'error',
          },
        })
      );
      onCloseModal();
    } else if (+quantity === 0) {
      dispatch(setAlert({ alert: { message: 'La cantidad debe ser mayor a 0 ', severity: 'error' } }));
      onCloseModal();
    } else {
      const response = await createReturn({
        saleId,
        productId: product.id,
        quantity: +quantity,
        unitPrice: product.price,
        delete: +quantity === product.quantity,
      });
      if (response.ok) {
        onCloseModal();
        dispatch(setAlert({ alert: { message: 'Devolucion creada', severity: 'success' } }));
        history.go(0);
      }
    }
  };

  return (
    <ModalContainer open={open} onClose={onCloseModal} className='return-modal'>
      <h6 className='text-center'>Realizar devolución</h6>
      <CustomForm methods={methods} onSubmit={onSubmit}>
        <CustomInput name='quantity' label='Cantidad a devolver' onlyNumbers />
        <div className='return-modal-buttons'>
          <Button color='error' onClick={onCloseModal}>
            Cancelar
          </Button>
          <Button variant='contained' type='submit'>
            Realizar
          </Button>
        </div>
      </CustomForm>
    </ModalContainer>
  );
};

export default ReturnModal;

const schema = yup.object({ quantity: yup.string().required('La cantidad es obligatoria') });
