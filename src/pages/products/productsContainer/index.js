import { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles.scss';
import CustomDialog from 'components/customDialog';
import CustomPagination from 'components/customPagination';
import CustomSpinner from 'components/customSpiner';
import ModalContainer from 'components/modalContainer';
import NewProduct from '../newProduct';
import ProductItem from '../productItem';
import useToggle from 'hooks/useToggle';
import { deleteProduct } from 'api/products';
import { setAlert } from 'store/alertSlice';

const ProductsContainer = ({ refetch, currentPage, products = [], pages, handlePage, loading, done }) => {
  const [item, setItem] = useState(null);

  const dispatch = useDispatch();

  const dialog = useToggle();
  const modal = useToggle();

  const onSelectItem = (item, mode) => {
    setItem(item);
    mode === 'edit' ? modal.toggle() : dialog.toggle();
  };

  const onDelete = async () => {
    const response = await deleteProduct(item?.id);
    const message = response.ok ? 'Producto Borrado' : 'Error de Servidor';
    const severity = response.ok ? 'success' : 'error';
    dispatch(setAlert({ alert: { message, severity } }));
    if (response.ok) refetch();
  };

  const callback = () => {
    refetch();
    modal.toggle();
  };

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : done && products.length === 0 ? (
        <h4 className='empty-products text-center'>Sin Registros</h4>
      ) : (
        <div className='products-container '>
          {products.map(row => (
            <ProductItem key={row.id} {...row} item={row} onSelectItem={onSelectItem} />
          ))}
          <CustomPagination pages={pages} onChangePage={handlePage} currentPage={currentPage + 1} />
        </div>
      )}
      <CustomDialog
        open={dialog.open}
        handleClose={dialog.toggle}
        title='¿Estás seguro?'
        description='Los datos serán eliminados completamente del sistema'
        onSuccess={onDelete}
      />
      <ModalContainer open={modal.open} onClose={modal.toggle}>
        <NewProduct item={item} callback={callback} />
      </ModalContainer>
    </>
  );
};

export default ProductsContainer;
