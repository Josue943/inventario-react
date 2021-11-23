import { CircularProgress } from '@mui/material';

import './styles.scss';

const CustomSpinner = ({ height = 500 }) => (
  <div className='custom-spinner' style={{ height }}>
    <CircularProgress size={55} />
  </div>
);

export default CustomSpinner;
