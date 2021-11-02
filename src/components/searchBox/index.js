import { IconButton, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

import './styles.scss';

const SearchBox = () => {
  return (
    <div className='search-box'>
      <input className='search-input' placeholder='Buscar' />
      <Search className='search-box-icon' />
    </div>
  );
};

export default SearchBox;
