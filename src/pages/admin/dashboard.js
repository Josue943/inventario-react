import {
  AccountCircle,
  Person,
  ProductionQuantityLimits,
  Category,
  LocalShipping,
  LocalAtm,
  AssignmentReturn,
} from '@mui/icons-material';
import { useHistory } from 'react-router';

import './styles.scss';

const Dashboard = () => {
  const history = useHistory();
  return (
    <>
      <h3>Dashboard</h3>
      <div className='dashboard-options'>
        {options.map(({ Icon, name, path }) => (
          <div className='dashboard-item pointer' key={name} onClick={() => history.push(path)}>
            <div className='dashboard-item-name'>{name}</div>
            <div className='dashboard-item-container'>
              <Icon className='dashboard-item-icon' />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;

const options = [
  { name: 'Proveedores', Icon: LocalShipping, path: 'admin/suppliers' },
  { name: 'Categorias', Icon: Category, path: 'admin/categories' },
  { name: 'Productos', Icon: ProductionQuantityLimits, path: 'admin/products' },
  { name: 'Clientes', Icon: Person, path: 'admin/clients' },
  { name: 'Ventas', Icon: LocalAtm, path: 'admin/sales' },
  { name: 'Usuarios', Icon: AccountCircle, path: 'admin/users' },
  { name: 'Devoluciones', Icon: AssignmentReturn, path: 'admin/returns' },
];
