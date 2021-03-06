import { memo } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import './styles.scss';
import defaultImage from 'assets/placeholder.jpg';

const Item = ({ id, name, onSelectItem, item, image, ...rest }) => (
  <div className='item'>
    <div className='item-img'>
      <img src={image || defaultImage} alt='' />
    </div>

    <div className='item-content'>
      <div className='item-padding item-header'>
        <p>{name}</p>
      </div>

      <div className='item-info'>
        {details.map(({ getValue, label, value }) => (
          <div className='item-detail' key={label}>
            <p>
              {label}: <span>{!differentValues.includes(value) ? rest[value] : getValue(rest[value])}</span>
            </p>
          </div>
        ))}
      </div>

      <div className='item-padding item-footer'>
        <p>Opciones:</p>
        <div className='item-options'>
          <Tooltip title='Actualizar producto' placement='top'>
            <IconButton className='item-icon-container' onClick={() => onSelectItem(item, 'edit')}>
              <Edit fontSize='inherit' className='item-icon' color='primary' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Eliminar producto' placement='top'>
            <IconButton className='item-icon-container' onClick={() => onSelectItem(item, 'delete')}>
              <Delete fontSize='inherit' className='item-icon' color='error' />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
);

export default memo(Item);

const details = [
  { label: 'Código de barras', value: 'barCode' },
  { label: 'Precio', value: 'price', getValue: value => `₡${value}` },
  { label: 'Estado', value: 'enabled', getValue: value => (value ? 'Habilitado' : 'Desabilitado') },
  { label: 'Disponibles', value: 'stock' },
  { label: 'Vendidos', value: 'sold' },
  { label: 'Vencimiento', value: 'expiration', getValue: value => (!value ? 'No tiene' : value) },
];

const differentValues = ['enabled', 'expiration', 'price'];
