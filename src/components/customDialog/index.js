import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

import './styles.scss';

const CustomDialog = ({ open, handleClose, title, description, onSuccess }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby='alert-dialog-title'
    aria-describedby='alert-dialog-description'
    className='custom-dialog'
  >
    <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color='error' onClick={handleClose}>
        Cancelar
      </Button>
      <Button
        variant='contained'
        onClick={() => {
          onSuccess();
          handleClose();
        }}
      >
        Aceptar
      </Button>
    </DialogActions>
  </Dialog>
);

export default CustomDialog;
