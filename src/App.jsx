import React, {useState} from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import styles from './App.module.css';
import { data } from './utils/data';



function App() {
	const [bunId, setBunId] = useState(data[0]._id);
	
	const onBunChanged = (id) => {
		setBunId(id);
	}
	
	return (
		<div className={styles.body}>
			<AppHeader />
			<div className={styles.container}>
				<div className={styles.columns}>
					<div className={styles.column}>
						<BurgerIngredients onBunChanged={onBunChanged}/>
					</div>
					<div className={styles.column}>
						<BurgerConstructor chosenItems={[]}
							bunId={bunId}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
