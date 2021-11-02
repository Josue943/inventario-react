import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { TextField } from '@mui/material';

import './styles.scss';

const CustomDatePicker = props => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DesktopDatePicker inputFormat='dd/MM/yyyy' {...props} renderInput={params => <TextField {...params} />} />
  </LocalizationProvider>
);

export default CustomDatePicker;
