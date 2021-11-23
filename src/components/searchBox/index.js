import { Search } from '@mui/icons-material';

import './styles.scss';

const SearchBox = ({ children, ...rest }) => (
  <div className='search-box'>
    <input className='search-input' placeholder='Buscar' {...rest} />
    <Search className='search-box-icon' />
    {children}
  </div>
);

export default SearchBox;
