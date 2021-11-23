import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import './styles.scss';

const CustomRadioButtons = ({ name, options = [] }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <RadioGroup className='radio-group' aria-label='gender' {...field}>
          {options.map(({ label, value }) => (
            <FormControlLabel key={value} value={value} control={<Radio />} label={label} className='radio-item' />
          ))}
        </RadioGroup>
      )}
    />
  );
};

export default CustomRadioButtons;
