import React from 'react';
import { data } from '../../utils/data';
import BurgerIngredientItem from '../burger-ingredient-item/burger-ingredient-item';
import styles from './burger-ingredient-category.module.css';

const BurgerIngredientCategory = ({ title, categoryId, ingredients, onIngredientClick }) => {
	const renderedIngredients = ingredients.map((ingredient) => {
		return (
			<BurgerIngredientItem
				key={ingredient._id}
				ingredientData={ingredient}
				count={1}
				onClick={onIngredientClick}
			/>
		);
	});

	return (
		<div key={categoryId}>
			<h3 className="text text_type_main-medium mt-10 mb-6">{title}</h3>
			<div className={styles.items}>{renderedIngredients}</div>
		</div>
	);
};

export default BurgerIngredientCategory;
