import React from 'react';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';
import styles from './ingredient-details.module.css';
import NutritionItem from '../nutrition-item/nutrition-item';


const IngredientDetails = ({ ingredient, onClose }) => {
	return (
		<Modal onClose={onClose}>
			<div className={styles.content}>
				<h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
				<img src={ingredient.image_large} alt="Meat image" className={styles.img}/>
				<p className={`${styles.name} text text_type_main-medium`}>{ingredient.name}</p>
				<ul className={styles.ul}>
					<NutritionItem title="Калории,ккал" amount={ingredient.calories}/>
					<NutritionItem title="Белки, г" amount={ingredient.proteins}/>
					<NutritionItem title="Жиры, г" amount={ingredient.fat}/>
					<NutritionItem title="Углеводы, г" amount={ingredient.carbohydrates}/>
				</ul>
			</div>
		</Modal>
	);
};

IngredientDetails.propTypes = {
	ingredient: menuItemPropTypes.isRequired, 
	onClose: PropTypes.func.isRequired
}

export default IngredientDetails;
