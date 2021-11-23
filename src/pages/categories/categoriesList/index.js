import { useState, useMemo } from 'react';
import { IconButton } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import CustomTable from 'components/customTable';
import SearchBox from 'components/searchBox';
import useDebounce from 'hooks/useDebounce';
import useFetch from 'hooks/useFetch';
import usePagination from 'hooks/usePagination';
import { deleteCategory, getCategories } from 'api/categories';
import { setAlert } from 'store/alertSlice';

const CategoriesList = () => {
  const [value, setValue] = useState('');

  const searchMode = useLocation().pathname.split('/').at(-1) === 'search';

  const debounce = useDebounce({ value });

  const { pagination, resetPagination } = usePagination(10);

  const { data, done, loading, refetch } = useFetch({
    apiFun: getCategories,
    params: { ...pagination, ...(searchMode && { search: debounce }) },
    initialFetch: !searchMode,
  });

  const dispatch = useDispatch();

  const formattedData = useMemo(
    () =>
      data.rows.map(item => ({
        item,
        content: [
          item.id,
          item.name,
          item.enabled ? 'Habilitado' : 'Desabilitado',
          <div className='table-icon'>
            <IconButton color='success'>
              <AddShoppingCart />
            </IconButton>
          </div>,
        ],
      })),
    [data.rows]
  );

  const onDelete = async id => {
    const response = await deleteCategory(id);
    const message = response.ok ? 'Categoria Borrada' : 'Error de Servidor';
    const severity = response.ok ? 'success' : 'error';
    dispatch(setAlert({ alert: { message, severity } }));
    if (response.ok) refetch();
  };

  const handleChange = ({ target: { value } }) => {
    setValue(value);
    resetPagination();
  };

  return (
    <div className='categories-page'>
      <h3>{searchMode ? 'Buscar Categoría' : 'Lista de Categorías'} </h3>
      {searchMode && (
        <div className='search-box-container'>
          <SearchBox value={value} onChange={handleChange} placeholder='Buscar por nombre' />
        </div>
      )}
      {searchMode && !done && !loading ? null : (
        <CustomTable
          rows={rows}
          data={formattedData}
          onDelete={onDelete}
          onSuccessEdit={refetch}
          mode='categories'
          loading={loading}
          done={done}
        />
      )}
    </div>
  );
};

export default CategoriesList;

const rows = ['id', 'nombre', 'estado', 'productos'];
