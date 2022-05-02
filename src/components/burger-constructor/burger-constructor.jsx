import React, { useState, useEffect } from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';
import BurgerBun from '../burger-bun/burger-bun';

const BurgerConstructor = ({ selectedBun, onOrder, selectedIngredients }) => {
	const [ total, setTotal ] = useState(0);
	let renderedItems;
	
	if (!selectedIngredients.isEmpty) {
		renderedItems = selectedIngredients.map((item, index) => {
			return (
				<li className={styles.constructorItem} key={index}>
					<div className={` ${styles.drag}`}>
						<DragIcon type="primary" />
					</div>
					<ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
				</li>
			);	});
	} else {
		renderedItems = "";
	}

	useEffect(() => {
		if (selectedBun) {
			setTotal(selectedIngredients.reduce((pre, cur) => pre + cur.price, selectedBun.price));
		}
	},[selectedBun, selectedIngredients]);

	return (
		<div className={styles.main}>
			<div className={styles.burger}>
				{selectedBun && <BurgerBun bun={selectedBun} type="top" />}

				<br />
				<ul>{renderedItems}</ul>
				<br />

				{selectedBun && <BurgerBun bun={selectedBun} type="bottom" />}
			</div>

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
