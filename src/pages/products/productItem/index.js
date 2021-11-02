import { Delete, Edit, ViewList } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import './styles.scss';
import Image from 'assets/placeholder.jpg';

const Item = ({ name, ...rest }) => {
  return (
    <div className='item'>
      <div className='item-img'>
        <img src={Image} alt='' />
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
            {options.map(({ color, Icon, title }) => (
              <Tooltip title={title} placement='top' key={title}>
                <IconButton className='item-icon-container'>
                  <Icon fontSize='inherit' className='item-icon' color={color} />
                </IconButton>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;

const details = [
  { label: 'Código de barras', value: 'barCode' },
  { label: 'Precio', value: 'salePrice' },
  { label: 'Estado', value: 'enabled', getValue: value => (value ? 'Habilitado' : 'Desabilitado') },
  { label: 'Disponibles', value: 'stock' },
  { label: 'Vendidos', value: 'sold' },
  { label: 'Vencimiento', value: 'expiration', getValue: value => (!value ? 'No tiene' : '10/10/2021') },
];

const options = [
  {
    Icon: ViewList,
    title: 'Ver informacion',
    color: 'success',
  },
  {
    Icon: Edit,
    title: 'Actualizar producto',
    color: 'primary',
  },
  {
    Icon: Delete,
    title: 'Eliminar producto',
    color: 'error',
  },
];

const differentValues = ['enabled', 'expiration'];
