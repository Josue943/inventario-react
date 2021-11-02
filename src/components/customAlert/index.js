import React from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import './styles.scss';
import { closeAlert } from 'store/alertSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const CustomAlert = () => {
  const { alert, show } = useSelector(state => state.alert);
  const dispatch = useDispatch();

  return (
    <Snackbar
      open={show}
      autoHideDuration={5000}
      onClose={() => dispatch(closeAlert())}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={() => dispatch(closeAlert())} severity={alert?.severity} sx={{ width: '100%' }}>
        {alert?.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
