import { useMemo, useState } from 'react';

import CustomPagination from 'components/customPagination';
import CustomTable from 'components/customTable';
import SearchBox from 'components/searchBox';
import useDebounce from 'hooks/useDebounce';
import useFetch from 'hooks/useFetch';
import usePagination from 'hooks/usePagination';
import { deletePerson, getPeople } from 'api/people';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { setAlert } from 'store/alertSlice';

const ClientsList = () => {
  const [value, setValue] = useState('');

  const searchMode = useLocation().pathname.split('/').at(-1) === 'search';

  const dispatch = useDispatch();
  const debounce = useDebounce({ value });

  const { pagination, resetPagination, handlePage } = usePagination();
  const { data, done, loading, refetch } = useFetch({
    apiFun: getPeople,
    params: { ...pagination, client: true, ...(searchMode && { search: debounce }) },
    initialFetch: !searchMode,
  });

  const formattedData = useMemo(
    () =>
      data.rows.map(item => ({
        item,
        content: [
          <span
            className='capitalize'
            style={{ fontSize: '1.4rem' }}
          >{`${item.documentType}: ${item.documentId}`}</span>,
          item.name,
          item.province,
          item.canton,
          item.phone,
        ],
      })),
    [data.rows]
  );

  const onDelete = async id => {
    const response = await deletePerson(id);
    const message = response.ok ? 'Cliente Borrado' : 'Error de Servidor';
    const severity = response.ok ? 'success' : 'error';

    dispatch(setAlert({ alert: { message, severity } }));
    if (response.ok) pagination.page === 0 ? refetch() : resetPagination();
  };

  const handleChange = ({ target: { value } }) => {
    setValue(value);
    resetPagination();
  };

  return (
    <>
      <h3>{`${searchMode ? 'Buscar Cliente' : 'Lista de Clientes'} `}</h3>
      {searchMode && (
        <div className='search-box-container'>
          <SearchBox value={value} onChange={handleChange} placeholder='Buscar por nombre' />
        </div>
      )}
      {searchMode && !done && !loading ? null : (
        <>
          <CustomTable
            rows={rows}
            data={formattedData}
            done={done}
            loading={loading}
            onDelete={onDelete}
            onSuccessEdit={refetch}
            mode='clients'
          />
          <div className='pagination-separator' />
          <CustomPagination pages={data.pages} onChangePage={handlePage} currentPage={pagination.page + 1} />
        </>
      )}
    </>
  );
};

export default ClientsList;

const rows = ['documento', 'Nombre', 'provincia', 'canton', 'telefono'];
