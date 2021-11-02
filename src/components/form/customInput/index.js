import TextField from '@mui/material/TextField';

import './styles.scss';

const CustomInput = ({ type = 'text', ...rest }) => {
  return (
    <div className='form-group'>
      <TextField
        variant='standard'
        className='input'
        inputProps={{ ...customStyle }}
        type={type}
        InputLabelProps={customStyle}
        {...rest}
      />
    </div>
  );
};

export default CustomInput;

const customStyle = { style: { fontSize: 14 } };
