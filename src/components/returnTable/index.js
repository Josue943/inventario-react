import Moment from 'react-moment';
import {
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import { ProductionQuantityLimits } from '@mui/icons-material';
import { useHistory } from 'react-router';

import CustomSpinner from 'components/customSpiner';

const ReturnTable = ({ returns, redirect = false, loading, done }) => {
  const history = useHistory();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell align='center'>Cantidad</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Total</TableCell>
            {redirect && <TableCell style={{ width: 80 }}>Detalles</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {returns.map(({ id, unitPrice, quantity, product, date, saleId }) => (
            <TableRow key={id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <Moment format='DD-MM-YYYY h:mm:ss a'>{date}</Moment>
              </TableCell>
              <TableCell align='center'>{quantity}</TableCell>
              <TableCell>₡{unitPrice}</TableCell>
              <TableCell>₡{unitPrice * quantity}</TableCell>
              {redirect && (
                <TableCell align='center'>
                  <Tooltip title='Detalles'>
                    <IconButton color='primary' onClick={() => history.push(`/admin/sales/details/${saleId}`)}>
                      <ProductionQuantityLimits />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {loading && <CustomSpinner height={200} />}
      {!loading && done && returns.length === 0 && <h4 className='table-empty text-center'>Sin Registros</h4>}
    </TableContainer>
  );
};
export default ReturnTable;
