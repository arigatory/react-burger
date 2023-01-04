import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay';
import { CloseIcon } from '../yandex/dist';

const modalRoot = document.getElementById('react-modals')!;

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<Props> = ({ onClose, children }) => {
  const escPressHandler = React.useCallback(
    (e: { key: string }) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', escPressHandler);
    return () => {
      document.removeEventListener('keydown', escPressHandler);
    };
  });

  return ReactDOM.createPortal(
    <section className={styles.modal}>
      <ModalOverlay onClick={onClose} />
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.close}>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
    </section>,
    modalRoot
  );
};

export default Modal;
