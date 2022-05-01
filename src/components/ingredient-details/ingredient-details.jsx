import React from 'react';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';
import styles from './ingredient-details.module.css';


const IngredientDetails = ({ ingredient, onClose }) => {
	return (
		<Modal onClose={onClose}>
			<div className={styles.content}>
				<h2 className="text text_type_main-medium">Детали ингредиента</h2>
				<img src={ingredient.image} alt="" />
				<p className="text text_type_main-default">{ingredient.name}</p>
				<ul className={styles.ul}>
					<li className={styles.li}>
						<p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
						<p className={`text text_type_digits-default text_color_inactive {styles.value}`}>{ingredient.calories}</p>
					</li>
					<li className={styles.li}>
						<p className="text text_type_main-small text_color_inactive">Белки, г</p>
						<p className={`text text_type_digits-default text_color_inactive {styles.value}`}>{ingredient.proteins}</p>
					</li>
					<li className={styles.li}>
						<p className="text text_type_main-small text_color_inactive">Жиры, г</p>
						<p className={`text text_type_digits-default text_color_inactive {styles.value}`}>{ingredient.fat}</p>
					</li>
					<li className={styles.li}>
						<p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
						<p className={`text text_type_digits-default text_color_inactive {styles.value}`}>{ingredient.carbohydrates}</p>
					</li>
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
