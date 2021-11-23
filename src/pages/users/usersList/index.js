import { useMemo, useState } from 'react';

import CustomTable from 'components/customTable';
import SearchBox from 'components/searchBox';
import useDebounce from 'hooks/useDebounce';
import useFetch from 'hooks/useFetch';
import usePagination from 'hooks/usePagination';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { setAlert } from 'store/alertSlice';
import { deleteUser, getUsers } from 'api/user';

const UserList = () => {
  const [value, setValue] = useState('');

  const searchMode = useLocation().pathname.split('/').at(-1) === 'search';

  const dispatch = useDispatch();
  const debounce = useDebounce({ value });

  const { pagination, resetPagination } = usePagination();
  const { data, done, loading, refetch } = useFetch({
    apiFun: getUsers,
    params: { ...pagination, ...(searchMode && { search: debounce }) },
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
          >{`${item.details.documentType}: ${item.details.documentId}`}</span>,
          `${item.details.name} ${item.details.surnames}`,
          item.details.email,
          item.details.phone,
        ],
      })),
    [data.rows]
  );

  const onDelete = async id => {
    const response = await deleteUser(id);
    const message = response.ok ? 'Usuario Borrado' : 'Error de Servidor';
    const severity = response.ok ? 'success' : 'error';

    dispatch(setAlert({ alert: { message, severity } }));
    if (response.ok) refetch();
  };

  const handleChange = ({ target: { value } }) => {
    setValue(value);
    resetPagination();
  };

  return (
    <>
      <h3>{`${searchMode ? 'Buscar Usuario' : 'Lista de Usuarios'} `}</h3>
      {searchMode && (
        <div className='search-box-container'>
          <SearchBox
            value={value}
            onChange={handleChange}
            placeholder='Buscar por nombre, apellidos o número de teléfono'
          />
        </div>
      )}
      {searchMode && !done && !loading ? null : (
        <CustomTable
          rows={rows}
          data={formattedData}
          done={done}
          loading={loading}
          onDelete={onDelete}
          onSuccessEdit={refetch}
          mode='users'
        />
      )}
    </>
  );
};

export default UserList;

const rows = ['documento', 'Nombre', 'correo', 'telefono'];
