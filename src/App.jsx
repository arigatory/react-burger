import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import styles from './App.module.css';

function App() {
	return (
		<div>
			<AppHeader />
			<div className={styles.container}>
				<div className={styles.columns}>
					<div className={styles.column}>
						<BurgerIngredients />
					</div>
					<div className={styles.column}>
						<BurgerConstructor />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
