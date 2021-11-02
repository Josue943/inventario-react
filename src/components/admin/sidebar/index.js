import {
  Cancel as CancelIcon,
  ProductionQuantityLimits,
  LocalShipping,
  AllInbox,
  ViewList,
  LocalFireDepartment,
  History,
  ShowChart,
  Category,
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';

import './styles.scss';
import Avatar from 'assets/avatar.png';
import Item from './item';
import { toggleMenu } from 'store/navbarSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const openMenu = useSelector(state => state.navbar.openMenu);

  return (
    <div className={`sidebar ${openMenu ? 'sidebar-close' : ''}`}>
      <div className='sidebar-header'>
        <div className='close-icon-container'>
          <CancelIcon onClick={() => dispatch(toggleMenu())} />
        </div>
        <div className='sidebar-img'>
          <img src={Avatar} alt='avatar' />
        </div>
        <span>Administrador</span>
      </div>
      <div className='sidebar-menu'>
        {sideBarItems.map(item => (
          <Item {...item} key={item.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

const sideBarItems = [
  {
    name: 'Products',
    Icon: ProductionQuantityLimits,
    options: [
      { name: 'Nuevo Producto', Icon: AllInbox, to: '/admin/products/new-product' },
      { name: 'Productos en almacen', Icon: ViewList, to: '/admin/products' },
      { name: 'Lo mas vendido', Icon: LocalFireDepartment, to: '/admin/products/sold' },
      { name: 'Productos con stock crítico', Icon: ShowChart, to: '/admin/products/stock' },
      { name: 'Productos por categoria', Icon: Category, to: '/admin/products' },
      { name: 'Productos por vencimiento', Icon: History, to: '/admin/products/expiration' },
    ],
  },
  {
    name: 'Categorias',
    Icon: Category,
    options: [
      { name: 'Nueva Categorías', Icon: AllInbox, to: '/admin/products/new-product' },
      { name: 'Categorias', Icon: ViewList, to: '/admin/products/list' },
    ],
  },
  {
    name: 'Proveedores',
    Icon: LocalShipping,
    options: [
      { name: 'Nuevo Proveedor', Icon: AllInbox, to: '/admin/products/new-product' },
      { name: 'Ver Proveedores', Icon: AllInbox, to: '/admin/products/new-product' },
    ],
  },
];

/* Buscar productos */
