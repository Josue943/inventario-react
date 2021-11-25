import { Search } from '@mui/icons-material';

import './styles.scss';

const SearchBox = ({ children, className = '', ...rest }) => (
  <div className='search-box'>
    <input className={`search-input ${className}`} placeholder='Buscar' {...rest} />
    <Search className='search-box-icon' />
    {children}
  </div>
);

export default SearchBox;
