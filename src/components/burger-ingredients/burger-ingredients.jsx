import React, { useState, useEffect } from 'react';
import BurgerIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';


const BurgerIngredients = ({ data }) => {
	const [ current, setCurrent ] = useState('bun');

	const buns = data.filter((item) => item.type === 'bun');
	const mains = data.filter((item) => item.type === 'main');
	const sauses = data.filter((item) => item.type === 'sauce');

	useEffect(() => {
		const target = document.querySelector(`#${current}`)
		target.scrollIntoView({behavior: 'smooth'});
	  }, [current]);


	return (
		<div className="text text_type_main-default mr-2">
			<h1 className="text_type_main-large">Соберите бургер</h1>

			<div className={styles.tabs}>
				<Tab value="bun" active={current === 'bun'} onClick={setCurrent} className={styles.tab}>
					Булки
				</Tab>
				<Tab value="sause" active={current === 'sause'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value="main" active={current === 'main'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>

			<div className={styles.categories}>
				<BurgerIngredientCategory
					title={'Булки'}
					id="bun"
					ingredients={buns}
				/>

				<BurgerIngredientCategory
					title={'Соусы'}
					id="sause"
					ingredients={sauses}
				/>

				<BurgerIngredientCategory
					title={'Начинки'}
					id="main"
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
