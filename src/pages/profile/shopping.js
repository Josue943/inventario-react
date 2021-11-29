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
import Layout from 'components/layout';
import SaleDetail from 'pages/sales/saleDetail';
import useFetch from 'hooks/useFetch';
import { getSales } from 'api/sales';
import CustomSpinner from 'components/customSpiner';

const Shopping = () => {
  const componentRef = useRef();
  const { data, loading, done } = useFetch({ apiFun: getSales });

  const handlePrint = useReactToPrint({ content: () => componentRef.current });

  return (
    <Layout>
      <div className='profile-shopping'>
        <div className='profile-shopping-table'>
          <h6 className='text-center'>Historial de pedidos</h6>
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
                  <TableRow key={item.id}>
                    <TableCell>
                      <Moment format='DD-MM-YYYY h:mm:ss a'>{item.date}</Moment>,
                    </TableCell>
                    <TableCell>₡{item.total}</TableCell>
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
