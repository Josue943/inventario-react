import Moment from 'react-moment';
import moment from 'moment';
import { useMemo } from 'react';
import { Table, TableContainer, TableCell, TableBody, TableHead, TableRow, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';

import './styles.scss';
import CustomSpinner from 'components/customSpiner';
import useFetch from 'hooks/useFetch';
import { getSales } from 'api/sales';
import { CustomDatePicker, CustomForm } from 'components/form';

const SaleList = () => {
  const methods = useForm({ defaultValues });
  const { startDate, endDate } = methods.watch();

  const sales = useFetch({
    apiFun: getSales,
    params: { startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') },
  });

  const data = useMemo(() => {
    return sales.data.rows.map(item => ({
      item,
      content: [
        item.id,
        <Moment format='DD-MM-YYYY h:mm:ss a'>{item.date}</Moment>,
        `${item.client.name} ${item.client.surnames}`,
        item.total,
      ],
    }));
  }, [sales.data.rows]);

  const onSubmit = data => {};

  return (
    <div className='sales-page'>
      <h3>Ventas Realizadas</h3>
      <CustomForm methods={methods} onSubmit={onSubmit}>
        <div className='sales-range'>
          {dates.map(date => (
            <CustomDatePicker key={date.name} {...date} />
          ))}
        </div>
      </CustomForm>
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
            {data.map(({ item, content }) => (
              <TableRow key={item.id}>
                {content.map(contentItem => (
                  <TableCell key={contentItem}>{contentItem} </TableCell>
                ))}
                <TableCell> </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {sales.loading && <CustomSpinner height={200} />}
        {!sales.loading && sales.done && data.length === 0 && (
          <h4 className='table-empty text-center'>Sin Registros</h4>
        )}
      </TableContainer>
    </div>
  );
};

export default SaleList;

const rows = ['#', 'Fecha', 'Cliente', 'Total', 'Opciones'];

const defaultValues = {
  startDate: moment().subtract(1, 'months').toDate(),
  endDate: moment().toDate(),
};

const dates = [
  { name: 'startDate', label: 'Fecha inicial' },
  { name: 'endDate', label: 'Fecha final' },
];
