import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './App.module.css';
import { hardcodedData } from '../../utils/data';

const App = () => {
	let data = hardcodedData;

	const [ bunId, setBunId ] = useState(data[0]._id);
	const [ selectedIngredients, setSelectedIngredients ] = useState([]);

	useEffect(() => {
		const getData = async (url) => {
			let response = await fetch(url);
			if (response.ok) {
				let json = await response.json();
				console.log(json)
				
			} else {
				alert("Ошибка HTTP: " + response.status);
			}
		}
		getData('https://norma.nomoreparties.space/api/ingredients');
	}, []);


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
							data={data}
						/>
					</div>
					<div className={styles.column}>
						<BurgerConstructor
							selectedIngredients={selectedIngredients} 
							bunId={bunId}
							onDeleteIngredient={onDeleteIngredient}
							data={data} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
