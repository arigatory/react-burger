import React, { useState } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient-item.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import menuItemPropTypes from '../../utils/constants';
import PropTypes from 'prop-types';

const BurgerIngredientItem = ({ ingredient, count }) => {
	const { image, price, name } = ingredient;
	const [openIngredientDetails, setOpenIngredientDetails] = useState(false);

	const onOpenIngredientDetails = () => {
		setOpenIngredientDetails(true);
	};

	const onCloseIngredientDetails = () => {
		setOpenIngredientDetails(false);
	};

	return (
		<>
			{openIngredientDetails && <IngredientDetails ingredient={ingredient} onClose={onCloseIngredientDetails} />}
			<article className={styles.article} onClick={onOpenIngredientDetails}>
				{count && <Counter count={count} />}
				<img src={image} alt="Фото ингредиента." className="mb-2" />
				<div className={`${styles.price} mb-2`}>
					<span className="text text_type_digits-default mr-1">{price}</span>
					<CurrencyIcon />
				</div>
				<p className={`text text_type_main-default ${styles.text}`}>{name}</p>
			</article>
		</>

	);
};

BurgerIngredientItem.propTypes = {
	ingredient: menuItemPropTypes.isRequired,
	count: PropTypes.number
};

export default BurgerIngredientItem;
