import { useState, useMemo } from 'react';
import { IconButton } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import CustomPagination from 'components/customPagination';
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

  const history = useHistory();

  const debounce = useDebounce({ value });

  const { pagination, resetPagination, handlePage } = usePagination();

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
            <IconButton color='success' onClick={() => history.push(`/admin/products/categories?category=${item.id}`)}>
              <AddShoppingCart />
            </IconButton>
          </div>,
        ],
      })),
    [data.rows]
  );

  const onDelete = async id => {
    const response = await deleteCategory(id);

    if (response.status === 409) {
      dispatch(
        setAlert({
          alert: { message: 'No se puede eliminar, la categoria cuenta con productos ligados', severity: 'error' },
        })
      );
    } else if (response.ok) {
      dispatch(setAlert({ alert: { message: 'Categoria Borrada', severity: 'success' } }));
      pagination.page === 0 ? refetch() : resetPagination();
    }
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
        <>
          <CustomTable
            rows={rows}
            data={formattedData}
            onDelete={onDelete}
            onSuccessEdit={refetch}
            mode='categories'
            loading={loading}
            done={done}
          />
          <div className='pagination-separator' />
          <CustomPagination pages={data.pages} onChangePage={handlePage} currentPage={pagination.page + 1} />
        </>
      )}
    </div>
  );
};

export default CategoriesList;

const rows = ['id', 'nombre', 'estado', 'productos'];
