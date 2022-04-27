import React, { useState } from 'react';
import BurgerIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { data } from '../../utils/data';

const BurgerIngredients = ({ onBunChanged, onSelectIngredient }) => {
	const [ current, setCurrent ] = useState('one');

	const handleClick = (e) => {
		if (e.type === 'bun') {
			onBunChanged(e._id);
		} else {
			onSelectIngredient(e);
		}
	};

	const buns = data.filter((item) => item.type === 'bun');
	const mains = data.filter((item) => item.type === 'main');
	const sauses = data.filter((item) => item.type === 'sauce');

	return (
		<div className="text text_type_main-default mr-2">
			<h1 className="text_type_main-large">Соберите бургер</h1>

			<div className={styles.tabs}>
				<Tab value="one" active={current === 'one'} onClick={setCurrent} className={styles.tab}>
					Булки
				</Tab>

				<Tab value="two" active={current === 'two'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value="three" active={current === 'three'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>
			<div className={styles.categories}>
				<BurgerIngredientCategory
					title={'Булки'}
					categoryId={1}
					ingredients={buns}
					onIngredientClick={handleClick}
				/>

				<BurgerIngredientCategory
					title={'Соусы'}
					categoryId={2}
					ingredients={mains}
					onIngredientClick={handleClick}
				/>

				<BurgerIngredientCategory
					title={'Начинки'}
					categoryId={3}
					ingredients={sauses}
					onIngredientClick={handleClick}
				/>
			</div>
		</div>
	);
};

export default BurgerIngredients;
