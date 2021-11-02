import { InputLabel, MenuItem, Select } from '@mui/material';

import './styles.scss';

const CustomSelect = ({ label, options = [], ...rest }) => (
  <div className='form-group'>
    <InputLabel className='label'>{label}</InputLabel>
    <Select variant='standard' className='select' {...rest} displayEmpty>
      {options.map(({ label, value }) => (
        <MenuItem value={value} key={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  </div>
);

export default CustomSelect;
