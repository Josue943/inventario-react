import { useState } from 'react';
import { DeleteForever, ProductionQuantityLimits } from '@mui/icons-material';
import {
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Paper,
  Tooltip,
  IconButton,
} from '@mui/material';

import './styles.scss';
import ReturnModal from '../returnModal';
import useToggle from 'hooks/useToggle';

const SaleTable = ({
  products = [],
  onUpdate,
  onDelete,
  subtotal,
  detail = false,
  discount,
  returns = false,
  saleId,
}) => {
  const [productDetail, setProductDetail] = useState(null);
  const { open, toggle } = useToggle();

  const onClick = product => {
    setProductDetail(product);
    toggle();
  };

  const totalDiscount = discount === 0 ? 0 : subtotal * (discount / 100);
  const total = subtotal - totalDiscount;

  return (
    <>
      <TableContainer component={Paper} className='new-sale-table'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Producto</TableCell>
              <TableCell align='center'>Precio</TableCell>
              <TableCell align='center'>Cantidad</TableCell>
              <TableCell align='center'>Subtotal</TableCell>
              <TableCell />
              {returns && <TableCell>Devoluciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 && (
              <>
                {products.map(({ id, name, price, quantity }) => (
                  <TableRow key={name}>
                    <TableCell colSpan={2}>{name}</TableCell>
                    <TableCell align='center'>₡{price}</TableCell>
                    <TableCell align='center'>
                      <div className='quantity-row'>
                        {!detail && <span onClick={() => onUpdate(id, quantity - 1)}>-</span>}{' '}
                        <strong>{quantity}</strong>{' '}
                        {!detail && <span onClick={() => onUpdate(id, quantity + 1)}>+</span>}
                      </div>
                    </TableCell>
                    <TableCell align='center'>₡{price * quantity}</TableCell>
                    <TableCell align='center'>
                      {!detail && (
                        <DeleteForever color='error' className='pointer new-sale-icon' onClick={() => onDelete(id)} />
                      )}
                    </TableCell>
                    {returns && (
                      <TableCell align='center' style={{ width: 120 }}>
                        <Tooltip title='Devolucion'>
                          <IconButton color='primary' onClick={() => onClick({ id, quantity, price })}>
                            <ProductionQuantityLimits />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} />
                  <TableCell align='center'>Subtotal</TableCell>
                  <TableCell align='center'>₡{subtotal}</TableCell>
                  {returns && <TableCell />}
                </TableRow>

                {detail && (
                  <>
                    <TableRow>
                      <TableCell colSpan={4} />
                      <TableCell align='center'>Descuento</TableCell>
                      <TableCell align='center'>₡{totalDiscount}</TableCell>
                      {returns && <TableCell />}
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4} />
                      <TableCell align='center'>Total</TableCell>
                      <TableCell align='center'>₡{total}</TableCell>
                      {returns && <TableCell />}
                    </TableRow>
                  </>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ReturnModal open={open} onClose={toggle} saleId={saleId} product={productDetail} />
    </>
  );
};

export default SaleTable;
