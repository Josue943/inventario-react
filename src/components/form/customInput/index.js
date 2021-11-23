import TextField from '@mui/material/TextField';
import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import './styles.scss';

const CustomInput = ({ name, type = 'text', onlyNumbers, ...rest }) => {
  const { control } = useFormContext();

  const onKeyPress = event => {
    if (onlyNumbers) !/^[0-9]*\.?[0-9]*$/.test(event.key) && event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className='form-group'>
          <TextField
            variant='standard'
            className='input'
            type={type}
            inputProps={{ ...customStyle }}
            InputLabelProps={customStyle}
            error={!!error}
            helperText={error?.message ?? ''}
            onKeyPress={onKeyPress}
            {...field}
            {...rest}
          />
        </div>
      )}
    />
  );
};

export default memo(CustomInput);

const customStyle = { style: { fontSize: 14 } };
