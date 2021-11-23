import { Modal } from '@mui/material';

import './styles.scss';

const ModalContainer = ({ open, onClose, children }) => (
  <Modal open={open} onClose={onClose}>
    <div className='modal-content'>{children}</div>
  </Modal>
);

export default ModalContainer;
