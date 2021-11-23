import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { TextField } from '@mui/material';

import './styles.scss';

const CustomDatePicker = ({ name, label, disabled, ...rest }) => {
  const { control, setValue } = useFormContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className='date-picker-container'>
            <DatePicker
              inputFormat='dd/MM/yyyy'
              disabled={disabled}
              renderInput={props => <TextField variant='standard' {...props} />}
              label={label}
              {...rest}
              {...field}
              onChange={newValue => setValue(name, newValue, true)}
            />
          </div>
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
