import Moment from 'react-moment';
import { useRef } from 'react';
import {
  TableBody,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Receipt } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';

import './styles.scss';
import CustomSpinner from 'components/customSpiner';
import Layout from 'components/layout';
import SaleDetail from 'pages/sales/saleDetail';
import useFetch from 'hooks/useFetch';
import { getSales } from 'api/sales';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const getTotal = (products, discountItems) => {
  const subtotal = products.reduce((acc, { saleDetails: { quantity, unitPrice } }) => acc + quantity * unitPrice, 0);
  const discount = discountItems === 0 ? 0 : subtotal * (discountItems / 100);
  return subtotal - discount;
};

const Shopping = () => {
  const personId = useSelector(({ auth }) => auth.user.personId);

  const { data, loading, done } = useFetch({ apiFun: getSales, params: { client: personId } });

  return (
    <Layout>
      <div className='profile-shopping'>
        <div className='profile-shopping-table'>
          <h6 className='profile-redirect'>
            <Link to='/'>Inicio</Link> / <Link to='/profile'>Su cuenta</Link>
          </h6>
          <h6 className='text-center profile-shopping-title'>Historial de pedidos</h6>
          <TableContainer component={Paper} className='new-sale-table'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Detalles</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.rows.map(item => (
                  <ShoppingRow key={item.id} item={item} />
                ))}
              </TableBody>
            </Table>
            {loading && <CustomSpinner height={200} />}
            {!loading && done && data.rows.length === 0 && (
              <h4 className='table-empty text-center'>No ha realizado ningún pedido.</h4>
            )}
          </TableContainer>
        </div>
      </div>
    </Layout>
  );
};

export default Shopping;

const ShoppingRow = ({ item }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  return (
    <TableRow>
      <TableCell>
        <Moment format='DD-MM-YYYY h:mm:ss a'>{item.date}</Moment>
      </TableCell>
      <TableCell>₡{getTotal(item.products, item.discount)}</TableCell>
      <TableCell className='profile-shopping-invoice'>
        <Tooltip title='Imprimir Factura' onClick={handlePrint}>
          <IconButton color='primary'>
            <Receipt />
          </IconButton>
        </Tooltip>
      </TableCell>
      <td style={{ display: 'none' }}>
        <SaleDetail ref={componentRef} data={item} invoice={true} />
      </td>
    </TableRow>
  );
};
