import React, { useState } from 'react';
import BurgerIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';


const BurgerIngredients = ({ data }) => {
	const [ current, setCurrent ] = useState('one');

	const buns = data.filter((item) => item.type === 'bun');
	const mains = data.filter((item) => item.type === 'main');
	const sauses = data.filter((item) => item.type === 'sauce');

	return (
		<div className="text text_type_main-default mr-2">
			<h1 className="text_type_main-large">Соберите бургер</h1>

			<div className={styles.tabs}>
				<Tab value="buns" active={current === 'buns'} onClick={setCurrent} className={styles.tab}>
					Булки
				</Tab>
				<Tab value="sauses" active={current === 'sauses'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>

			<div className={styles.categories}>
				<BurgerIngredientCategory
					title={'Булки'}
					categoryId="buns"
					ingredients={buns}
				/>

				<BurgerIngredientCategory
					title={'Соусы'}
					categoryId="sauses"
					ingredients={sauses}
				/>

				<BurgerIngredientCategory
					title={'Начинки'}
					categoryId="mains"
					ingredients={mains}
				/>
			</div>
		</div>
	);
};

BurgerIngredients.propTypes = {
	data: PropTypes.arrayOf(menuItemPropTypes).isRequired,
};

export default BurgerIngredients;
