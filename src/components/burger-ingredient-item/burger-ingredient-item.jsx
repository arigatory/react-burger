import React, {useState} from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient-item.module.css';
import PropTypes from 'prop-types';
import IngredientDetails from '../ingredient-details/ingredient-details';


const BurgerIngredientItem = ({ ingredientData, count }) => {
	const { image, price, name } = ingredientData;
	const [ openIngredientDetails, setOpenIngredientDetails ] = useState(false);

	const onOpenIngredientDetails = () => {
		setOpenIngredientDetails(true);
	};

	const onCloseIngredientDetails = () => {
		setOpenIngredientDetails(false);
	};

	return (
		<article className={styles.article} onClick={onOpenIngredientDetails}>
			{count && <Counter count={count} />}
			<img src={image} alt="Фото ингредиента." className="mb-2" />
			<div className={`${styles.price} mb-2`}>
				<span className="text text_type_digits-default mr-1">{price}</span>
				<CurrencyIcon />
			</div>
			<p className={`text text_type_main-default ${styles.text}`}>{name}</p>
		{openIngredientDetails && <IngredientDetails ingredient={ingredientData} onClose={onCloseIngredientDetails} />}
		</article>
	);
};

BurgerIngredientItem.propTypes = {
	ingredientData: PropTypes.object.isRequired, 
	count: PropTypes.number,
	onClick: PropTypes.func.isRequired
};

export default BurgerIngredientItem;
