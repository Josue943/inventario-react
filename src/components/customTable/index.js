import { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import './styles.scss';
import CustomDialog from 'components/customDialog';
import CustomSpinner from 'components/customSpiner';
import ModalContainer from 'components/modalContainer';
import NewCategory from 'pages/categories/newCategory';
import NewClient from 'pages/clients/newClient';
import NewSupplier from 'pages/suppliers/newSupplier';
import useToggle from 'hooks/useToggle';
import NewUser from 'pages/users/newUser';

const CustomTable = ({ rows = [], data = [], onDelete, onSuccessEdit, mode, loading, done }) => {
  const [item, setItem] = useState(null);

  const dialog = useToggle();
  const modal = useToggle();

  const Component = component[mode];

  const onSelectItem = (item, type) => {
    setItem(item);
    type === 'edit' ? modal.toggle() : dialog.toggle();
  };

  const callback = () => {
    modal.toggle();
    onSuccessEdit();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {rows.map(row => (
                <TableCell key={row}>{row}</TableCell>
              ))}
              <TableCell>actualizar</TableCell>
              <TableCell>eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({ item, content }) => (
              <TableRow key={item.id}>
                {content.map(contentItem => (
                  <TableCell key={contentItem}>{contentItem} </TableCell>
                ))}
                <TableCell>
                  <div className='table-icon'>
                    <IconButton color='primary' onClick={() => onSelectItem(item, 'edit')}>
                      <EditIcon />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='table-icon'>
                    <IconButton color='error' onClick={() => onSelectItem(item, 'delete')}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && <CustomSpinner height={200} />}
        {!loading && done && data.length === 0 && <h4 className='table-empty text-center'>Sin Registros</h4>}
      </TableContainer>
      <CustomDialog
        open={dialog.open}
        handleClose={dialog.toggle}
        title='¿Estás seguro?'
        description='Los datos serán eliminados completamente del sistema'
        onSuccess={() => onDelete(item?.id)}
      />
      <ModalContainer open={modal.open} onClose={modal.toggle}>
        <Component item={item} callback={callback} />
      </ModalContainer>
    </>
  );
};

export default CustomTable;

const component = {
  categories: NewCategory,
  suppliers: NewSupplier,
  clients: NewClient,
  users: NewUser,
};
