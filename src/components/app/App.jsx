import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './App.module.css';
import useIngredients from '../../hooks/useIngredients';
import { IngredientsContext } from '../../services/ingredientsContext';
import { SelectedIngredientsContext } from '../../services/selectedIngredientsContext';
import { SelectedBunContext } from '../../services/selectedBunContext';

const App = () => {
	const data = useIngredients();
	const selectedBunState = useState(null);
	const selectedIngredientsState = useState([]);

	useEffect(
		() => {
			const [ selectedBun, setSelectedBun ] = selectedBunState;
			setSelectedBun(data[0]);
			if (data.length !== 0) {
				const [ i, setI ] = selectedIngredientsState;
				setI([ data[randomIngredientIndex()], data[randomIngredientIndex()], data[randomIngredientIndex()] ]);
			}
		},
		[ data ]
	);

	
	const randomIngredientIndex = () => {
		return Math.floor(Math.random() * (data.length - 1) + 1);
	};

	return (
		<IngredientsContext.Provider value={data}>
			<SelectedIngredientsContext.Provider value={selectedIngredientsState}>
				<SelectedBunContext.Provider value={selectedBunState}>
					<div className={styles.body}>
						<AppHeader />
						<div className={styles.container}>
							<div className={styles.columns}>
								<div className={styles.column}>
									<BurgerIngredients />
								</div>
								<div className={styles.column}>
									<BurgerConstructor/>
								</div>
							</div>
						</div>
					</div>
				</SelectedBunContext.Provider>
			</SelectedIngredientsContext.Provider>
		</IngredientsContext.Provider>
	);
};

export default App;
