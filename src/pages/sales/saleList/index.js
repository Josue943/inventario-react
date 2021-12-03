import Moment from 'react-moment';
import moment from 'moment';
import { useMemo } from 'react';
import { Table, TableContainer, TableCell, TableBody, TableHead, TableRow, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

import './styles.scss';
import CustomSpinner from 'components/customSpiner';
import SaleRow from './saleTableRow';
import useFetch from 'hooks/useFetch';
import { CustomDatePicker, CustomForm } from 'components/form';
import { getSales } from 'api/sales';

const SaleList = () => {
  const methods = useForm({ defaultValues });
  const { startDate, endDate } = methods.watch();

  const path = useLocation().pathname.split('/').at(-1);
  const { title } = mode[path];

  const searchMode = path === 'search';

  const params = searchMode
    ? { startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') }
    : { paymentMethod: path === 'sales' ? 'cash' : 'credit' };

  const sales = useFetch({ apiFun: getSales, params });

  const data = useMemo(() => {
    return sales.data.rows.map(item => {
      const subtotal = item.products.reduce(
        (acc, { saleDetails: { quantity, unitPrice } }) => acc + quantity * unitPrice,
        0
      );
      const discount = item.discount === 0 ? 0 : subtotal * (item.discount / 100);

      return {
        item,
        content: [
          item.id,
          <Moment format='DD-MM-YYYY h:mm:ss a'>{item.date}</Moment>,
          `${item.client ? `${item.client.name} ${item.client.surnames}` : 'Publico general'}`,
          `₡${subtotal - discount}`,
          item.paymentMethod === 'cash' ? 'Cancelado' : 'Pendiente',
        ],
      };
    });
  }, [sales.data.rows]);

  return (
    <>
      <div className='sales-page'>
        <h3>{title}</h3>
        {searchMode && (
          <CustomForm methods={methods} onSubmit={() => {}}>
            <div className='sales-range'>
              {dates.map(date => (
                <CustomDatePicker key={date.name} {...date} />
              ))}
            </div>
          </CustomForm>
        )}
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {rows.map(row => (
                    <TableCell key={row}>{row}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(data => (
                  <SaleRow {...data} key={data.item.id} refetch={sales.refetch} />
                ))}
              </TableBody>
            </Table>
            {sales.loading && <CustomSpinner height={200} />}
            {!sales.loading && sales.done && data.length === 0 && (
              <h4 className='table-empty text-center'>Sin Registros</h4>
            )}
          </TableContainer>
        </>
      </div>
    </>
  );
};

export default SaleList;

const rows = ['#', 'Fecha', 'Cliente', 'Total', 'Estado', 'Opciones'];

const defaultValues = {
  startDate: moment().subtract(1, 'months').toDate(),
  endDate: moment().toDate(),
};

const dates = [
  { name: 'startDate', label: 'Fecha inicial' },
  { name: 'endDate', label: 'Fecha final' },
];

const mode = {
  sales: {
    title: 'Ventas Realizadas',
  },
  pending: {
    title: 'Ventas Pendientes',
  },
  search: {
    title: 'Buscar Venta',
  },
};
