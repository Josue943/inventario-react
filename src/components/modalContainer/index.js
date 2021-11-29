import { Modal } from '@mui/material';

import './styles.scss';

const ModalContainer = ({ open, onClose, children, className }) => (
  <Modal open={open} onClose={onClose}>
    <div className={`modal-content ${className ? className : ''}`}>{children}</div>
  </Modal>
);

export default ModalContainer;
