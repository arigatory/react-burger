import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ onClose, children }) => {
	const escPressHandler = React.useCallback(
		(e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		},
		[ onClose ]
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

Modal.propTypes = {
	onClose: PropTypes.func.isRequired
};

export default Modal;
