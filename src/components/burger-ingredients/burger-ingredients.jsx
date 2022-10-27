import React, { useState, useEffect } from 'react';
import BurgerIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';
import { IngredientsContext } from '../../services/ingredientsContext';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';

const BurgerIngredients = () => {
	const { loadIngredients } = useActions();
  const { ingredients, error, loading } = useSelector(
    (state) => state.ingredients
	);

  const [current, setCurrent] = useState('bun');

  const buns = ingredients.buns;
  const mains = ingredients.mains;
	const sauses = ingredients.sauces;
	
	useEffect(() => {
		loadIngredients();

    const target = document.querySelector(`#${current}`);
    target.scrollIntoView({ behavior: 'smooth' });
  },[]);

  return (
    <div className="text text_type_main-default mr-2">
			
      <h1 className="text_type_main-large">Соберите бургер</h1>

      <div className={styles.tabs}>
        <Tab
          value="bun"
          active={current === 'bun'}
          onClick={setCurrent}
          className={styles.tab}
        >
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
			{error && <h3>{error}</h3>}
			{loading && <h3>Загрузка ингредиентов...</h3>}
			{!error && !loading &&
			<div className={styles.categories}>
			<BurgerIngredientCategory title={'Булки'} id="bun" ingredients={buns} />

			<BurgerIngredientCategory
				title={'Соусы'}
				id="sauce"
				ingredients={sauses}
			/>

			<BurgerIngredientCategory
				title={'Начинки'}
				id="main"
				ingredients={mains}
			/>
		</div>
			}
      
    </div>
  );
};

export default BurgerIngredients;
