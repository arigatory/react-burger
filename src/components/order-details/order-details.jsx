import React from 'react';
import Modal from '../modal/modal';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';
import styles from './order-details.module.css';
import image from '../../images/order.svg';

const OrderDetails = ({ onClose, order }) => {
	return (
		<Modal onClose={onClose}>
            <div className={styles.content}>
			<p className={`${styles.number} text text_type_digits-large`}>{order.number}</p>
			<div className={`${styles.id} text text_type_main-medium`}>идентификатор заказа</div>
			<img  className={styles.img}  src={image} alt="order.svg" />
			<p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
			<div className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</div>
            </div>
		</Modal>
	);
};

OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default OrderDetails;
