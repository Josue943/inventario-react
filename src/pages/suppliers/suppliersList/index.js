import { useMemo, useState } from 'react';

import CustomTable from 'components/customTable';
import SearchBox from 'components/searchBox';
import useDebounce from 'hooks/useDebounce';
import useFetch from 'hooks/useFetch';
import usePagination from 'hooks/usePagination';
import { deleteSupplier, getSuppliers } from 'api/suppliers';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { setAlert } from 'store/alertSlice';

const SuppliersList = () => {
  const [value, setValue] = useState('');

  const searchMode = useLocation().pathname.split('/').at(-1) === 'search';

  const dispatch = useDispatch();
  const debounce = useDebounce({ value });

  const { pagination, resetPagination } = usePagination();
  const { data, done, loading, refetch } = useFetch({
    apiFun: getSuppliers,
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
          item.details.name,
          item.details.email,
          item.details.phone,
          item.enabled ? 'Habilitado' : 'Desabilitado',
        ],
      })),
    [data.rows]
  );

  const onDelete = async id => {
    const response = await deleteSupplier(id);
    const message = response.ok ? 'Proveedor Borrado' : 'Error de Servidor';
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
      <h3>{`${searchMode ? 'Buscar Proveedor' : 'Lista de Proveedores'} `}</h3>
      {searchMode && (
        <div className='search-box-container'>
          <SearchBox value={value} onChange={handleChange} placeholder='Buscar por nombre o número de teléfono' />
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
          mode='suppliers'
        />
      )}
    </>
  );
};

export default SuppliersList;

const rows = ['documento', 'Nombre', 'correo', 'telefono', 'estado'];
