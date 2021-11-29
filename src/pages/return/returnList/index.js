import moment from 'moment';
import { useLocation } from 'react-router';
import { useForm } from 'react-hook-form';

import './styles.scss';
import ReturnTable from 'components/returnTable';
import useFetch from 'hooks/useFetch';
import { CustomDatePicker, CustomForm } from 'components/form';
import { getReturnsList } from 'api/returns';

const ReturnList = () => {
  const searchMode = useLocation().pathname.split('/').at(-1) === 'search';
  const methods = useForm({ defaultValues });
  const { startDate, endDate } = methods.watch();

  const params = searchMode
    ? { startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') }
    : {};

  const { data, loading, done } = useFetch({ apiFun: getReturnsList, params });

  return (
    <div className='return-list-page'>
      <h3>Devoluciones realizadas</h3>
      {searchMode && (
        <CustomForm methods={methods} onSubmit={null}>
          <div className='sales-range'>
            {dates.map(date => (
              <CustomDatePicker key={date.name} {...date} />
            ))}
          </div>
        </CustomForm>
      )}
      <ReturnTable returns={data.rows} redirect loading={loading} done={done} />
    </div>
  );
};

export default ReturnList;

const defaultValues = {
  startDate: moment().subtract(1, 'months').toDate(),
  endDate: moment().toDate(),
};

const dates = [
  { name: 'startDate', label: 'Fecha inicial' },
  { name: 'endDate', label: 'Fecha final' },
];
