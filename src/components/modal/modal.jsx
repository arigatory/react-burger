import React from 'react';
import ReactDOM from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ onClose, children }) => {
	return ReactDOM.createPortal(
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.close} >
					<CloseIcon type="primary" onClick={onClose} />
				</div>
				{children}
			</div>
		</div>,
		modalRoot
	);
};

export default Modal;
