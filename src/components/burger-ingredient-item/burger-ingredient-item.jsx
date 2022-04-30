import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient-item.module.css';
import PropTypes from 'prop-types';


const BurgerIngredientItem = ({ ingredientData, count, onClick }) => {
	const { image, price, name } = ingredientData;

	const handleClick = () => {
		onClick(ingredientData);
	};

	return (
		<article className={styles.article} onClick={handleClick}>
			{count && <Counter count={count} />}
			<img src={image} alt="Фото ингредиента." className="mb-2" />
			<div className={`${styles.price} mb-2`}>
				<span className="text text_type_digits-default mr-1">{price}</span>
				<CurrencyIcon />
			</div>
			<p className={`text text_type_main-default ${styles.text}`}>{name}</p>
		</article>
	);
};

BurgerIngredientItem.propTypes = {
	ingredientData: PropTypes.object.isRequired, 
	count: PropTypes.number,
	onClick: PropTypes.func.isRequired
};

export default BurgerIngredientItem;
