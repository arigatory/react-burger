import React, { useState } from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';

const BurgerConstructor = ({ selectedBun, onOrder }) => {
	const [ total, setTotal ] = useState(0);

	return (
		<div className={styles.main}>
			{selectedBun && (
				<div className={`${styles.constructorItem} ${styles.constructorItemFix}`}>
					<div className={`${styles.hidden} ${styles.drag}`}>
						<DragIcon type="primary" />
					</div>
					<ConstructorElement
						type="top"
						isLocked={true}
						text={selectedBun.name}
						price={selectedBun.price}
						thumbnail={selectedBun.image}
					/>
				</div>
			)}

			{selectedBun && (
				<div className={`${styles.constructorItem} ${styles.constructorItemFix}`}>
					<div className={`${styles.hidden} ${styles.drag}`}>
						<DragIcon type="primary" />
					</div>
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={selectedBun.name}
						price={selectedBun.price}
						thumbnail={selectedBun.image}
					/>
				</div>
			)}

			<div>
				<span className={styles.price}>
					<span className="text text_type_main-large mr-2">{total}</span>
					<CurrencyIcon type="primary" />
				</span>
				<Button type="primary" size="large" onClick={onOrder}>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};

BurgerConstructor.propTypes = {
	selectedBun: menuItemPropTypes,
	onOrder: PropTypes.func.isRequired
};

export default BurgerConstructor;
