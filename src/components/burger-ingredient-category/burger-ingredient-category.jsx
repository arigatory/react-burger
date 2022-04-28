import React from 'react';
import { data } from '../../utils/data';
import BurgerIngredientItem from '../burger-ingredient-item/burger-ingredient-item';
import styles from './burger-ingredient-category.module.css';
import PropTypes from 'prop-types';


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

BurgerIngredientCategory.propTypes = {
	title: PropTypes.string.isRequired,
	categoryId: PropTypes.oneOf(['buns', 'mains', 'sauses']),
	ingredients: PropTypes.array, 
	onIngredientClick: PropTypes.func
};


export default BurgerIngredientCategory;
