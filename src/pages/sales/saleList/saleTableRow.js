import { useRef } from 'react';
import { AddShoppingCart, Receipt, DeleteForever } from '@mui/icons-material';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { useHistory } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import { useDispatch } from 'react-redux';

import CustomDialog from 'components/customDialog';
import SaleDetail from '../saleDetail';
import useToggle from 'hooks/useToggle';
import { setAlert } from 'store/alertSlice';
import { deleteSale } from 'api/sales';

const SaleRow = ({ item, content, refetch }) => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const history = useHistory();

  const dialog = useToggle();

  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  const onDelete = async () => {
    if (item.products.length) {
      dispatch(setAlert({ alert: { message: 'No se puede eliminar, tiene productos ligados', severity: 'error' } }));
    } else {
      await deleteSale(item.id);
      dispatch(setAlert({ alert: { message: 'Venta eliminada', severity: 'success' } }));
      refetch();
    }
  };

  return (
    <TableRow>
      {content.map(contentItem => (
        <TableCell key={contentItem}>{contentItem}</TableCell>
      ))}
      <TableCell>
        <Tooltip title='Detalles'>
          <IconButton color='primary' onClick={() => history.push(`/admin/sales/details/${item.id}`)}>
            <AddShoppingCart />
          </IconButton>
        </Tooltip>
        <Tooltip title='Imprimir Factura'>
          <IconButton color='primary' onClick={handlePrint}>
            <Receipt />
          </IconButton>
        </Tooltip>
        <Tooltip title='Eliminar Venta'>
          <IconButton color='error' onClick={dialog.toggle}>
            <DeleteForever />
          </IconButton>
        </Tooltip>
        <div style={{ display: 'none' }}>
          <SaleDetail ref={componentRef} data={item} invoice={true} />
        </div>
      </TableCell>
      <CustomDialog
        open={dialog.open}
        handleClose={dialog.toggle}
        title='¿Estás seguro?'
        description='Los datos serán eliminados completamente del sistema'
        onSuccess={onDelete}
      />
    </TableRow>
  );
};

export default SaleRow;
