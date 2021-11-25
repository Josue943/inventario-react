import { DeleteForever } from '@mui/icons-material';
import { TableContainer, Table, TableCell, TableRow, TableHead, TableBody, Paper } from '@mui/material';

const SaleTable = ({ products = [], onUpdate, onDelete, subtotal, detail = false, discount, total }) => {
  return (
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
          {products.length > 0 && (
            <>
              {products.map(({ id, name, price, quantity }) => (
                <TableRow key={name}>
                  <TableCell colSpan={2}>{name}</TableCell>
                  <TableCell align='center'>₡{price}</TableCell>
                  <TableCell align='center'>
                    <div className='quantity-row'>
                      {!detail && <span onClick={() => onUpdate(id, quantity - 1)}>-</span>} <strong>{quantity}</strong>{' '}
                      {!detail && <span onClick={() => onUpdate(id, quantity + 1)}>+</span>}
                    </div>
                  </TableCell>
                  <TableCell align='center'>₡{price * quantity}</TableCell>
                  <TableCell align='center'>
                    {!detail && (
                      <DeleteForever color='error' className='pointer new-sale-icon' onClick={() => onDelete(id)} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} />
                <TableCell align='center'>Subtotal</TableCell>
                <TableCell align='center'>₡{subtotal}</TableCell>
              </TableRow>

              {detail && (
                <>
                  <TableRow>
                    <TableCell colSpan={4} />
                    <TableCell align='center'>Descuento</TableCell>
                    <TableCell align='center'>₡{discount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} />
                    <TableCell align='center'>Total</TableCell>
                    <TableCell align='center'>₡{total}</TableCell>
                  </TableRow>
                </>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SaleTable;
