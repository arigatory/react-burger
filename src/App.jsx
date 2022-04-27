import React, { useState } from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import styles from './App.module.css';
import { data } from './utils/data';

function App() {
	const [ bunId, setBunId ] = useState(data[0]._id);
	const [ selectedIngredients, setSelectedIngredients ] = useState([]);

	const onBunChanged = (id) => {
		setBunId(id);
	};

	const onSelectIngredient = (ingredient) => {
		const existingItem = selectedIngredients.find((item) => item.id === ingredient._id);
		setSelectedIngredients([ ...selectedIngredients, ingredient ]);
	};

	const onDeleteIngredient = (ingredient) => {
		setSelectedIngredients(selectedIngredients.filter((item) => item._id !== ingredient._id));
	}

	return (
		<div className={styles.body}>
			<AppHeader />
			<div className={styles.container}>
				<div className={styles.columns}>
					<div className={styles.column}>
						<BurgerIngredients
							onBunChanged={onBunChanged}
							onSelectIngredient={onSelectIngredient}
							selectedIngredients={selectedIngredients}
						/>
					</div>
					<div className={styles.column}>
						<BurgerConstructor
							selectedIngredients={selectedIngredients} 
							bunId={bunId}
							onDeleteIngredient={onDeleteIngredient} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
