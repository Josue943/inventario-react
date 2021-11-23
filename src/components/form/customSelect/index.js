import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import './styles.scss';

const CustomSelect = ({ name, label, options = [] }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className='form-group form-select'>
          <InputLabel className='label'>{label}</InputLabel>
          <Select variant='standard' className='select' displayEmpty {...field}>
            {options.map(({ label, value }) => (
              <MenuItem value={value} key={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText className='select-error'>{error.message}</FormHelperText>}
        </div>
      )}
    />
  );
};

export default CustomSelect;
