import {
  AllInbox,
  Cancel as CancelIcon,
  Category,
  Dashboard,
  History,
  LocalAtm,
  LocalFireDepartment,
  LocalShipping,
  People,
  ProductionQuantityLimits,
  Search,
  ShowChart,
  ViewList,
  Group,
  AssignmentReturn,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import './styles.scss';
import Avatar from 'assets/avatar.png';
import Item from './item';
import { toggleMenu } from 'store/navbarSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const openMenu = useSelector(state => state.navbar.openMenu);
  const history = useHistory();

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
        <div className='sidebar-item pointer' onClick={() => history.push('/admin')}>
          <div className='sidebar-item-content'>
            <Dashboard />
            <span>Dashboard</span>
          </div>
        </div>
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
    name: 'Productos',
    Icon: ProductionQuantityLimits,
    options: [
      { name: 'Nuevo Producto', Icon: AllInbox, to: '/admin/products/new-product' },
      { name: 'Productos en almacen', Icon: ViewList, to: '/admin/products' },
      { name: 'Lo mas vendido', Icon: LocalFireDepartment, to: '/admin/products/sold' },
      { name: 'Productos con stock crítico', Icon: ShowChart, to: '/admin/products/stock' },
      { name: 'Productos por categoria', Icon: Category, to: '/admin/products/categories' },
      { name: 'Productos por vencimiento', Icon: History, to: '/admin/products/expiration' },
      { name: 'Buscar productos', Icon: Search, to: '/admin/products/search' },
    ],
  },
  {
    name: 'Categorias',
    Icon: Category,
    options: [
      { name: 'Nueva Categorías', Icon: AllInbox, to: '/admin/categories/new' },
      { name: 'Lista de Categorías', Icon: ViewList, to: '/admin/categories' },
      { name: 'Buscar Categorías', Icon: Search, to: '/admin/categories/search' },
    ],
  },
  {
    name: 'Proveedores',
    Icon: LocalShipping,
    options: [
      { name: 'Nuevo Proveedor', Icon: AllInbox, to: '/admin/suppliers/new' },
      { name: 'Lista de Proveedor', Icon: ViewList, to: '/admin/suppliers' },
      { name: 'Buscar Proveedor', Icon: Search, to: '/admin/suppliers/search' },
    ],
  },
  {
    name: 'Clientes',
    Icon: People,
    options: [
      { name: 'Nuevo Cliente', Icon: AllInbox, to: '/admin/clients/new' },
      { name: 'Lista de Cliente', Icon: ViewList, to: '/admin/clients' },
      { name: 'Buscar Cliente', Icon: Search, to: '/admin/clients/search' },
    ],
  },
  {
    name: 'Ventas',
    Icon: LocalAtm,
    options: [
      { name: 'Nueva venta', Icon: AllInbox, to: '/admin/sales/new' },
      { name: 'Ventas realizadas', Icon: ViewList, to: '/admin/sales' },
      { name: 'Ventas pendientes', Icon: ViewList, to: '/admin/sales/pending' },
      { name: 'Buscar ventas', Icon: Search, to: '/admin/sales/search' },
    ],
  },
  {
    name: 'Usuarios',
    Icon: Group,
    options: [
      { name: 'Nuevo usuario', Icon: AllInbox, to: '/admin/users/new' },
      { name: 'Lista de usuarios', Icon: ViewList, to: '/admin/users' },
      { name: 'Buscar usuario', Icon: Search, to: '/admin/users/search' },
    ],
  },
  {
    name: 'Devoluciones',
    Icon: AssignmentReturn,
    options: [
      { name: 'Lista de devoluciones', Icon: ViewList, to: '/admin/returns' },
      { name: 'Buscar devolucion', Icon: Search, to: '/admin/returns/search' },
    ],
  },
];
