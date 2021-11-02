import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

import './styles.scss';

const CustomRadioButtons = ({ onChange, name, options = [], value }) => (
  <RadioGroup className='radio-group' onChange={onChange} aria-label='gender' value={value} name={name}>
    {options.map(({ label, value }) => (
      <FormControlLabel key={value} value={value} control={<Radio />} label={label} className='radio-item' />
    ))}
  </RadioGroup>
);

export default CustomRadioButtons;
