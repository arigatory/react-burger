import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './App.module.css';
import useIngredients from '../../hooks/useIngredients';
import Modal from '../modal/modal';

const App = () => {
	const data = useIngredients();
	const [ selectedBun, setSelectedBun ] = useState(null);
	const [ selectedIngredients, setSelectedIngredients ] = useState([]);
	const [ openModal, setOpenModal ] = useState(false);

	const onOpenModal = () => {
		setOpenModal(true);
	};
	const onCloseModal = () => {
		setOpenModal(false);
	};

	useEffect(
		() => {
			setSelectedBun(data[0]);
		},
		[ data ]
	);

	const onBunChanged = (bun) => {
		setSelectedBun(bun);
	};

	const onSelectIngredient = (ingredient) => {
		// const existingItem = selectedIngredients.find((item) => item.id === ingredient._id);
		// setSelectedIngredients([ ...selectedIngredients, ingredient ]);
		onOpenModal();
	};

	const onDeleteIngredient = (ingredient) => {
		setSelectedIngredients(selectedIngredients.filter((item) => item._id !== ingredient._id));
	};

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
							selectedBun={selectedBun}
							onDeleteIngredient={onDeleteIngredient}
							data={data}
						/>
					</div>
				</div>
			</div>
			{openModal && <Modal onClose={onCloseModal}>I'm just a modal, not model</Modal>}
		</div>
	);
};

export default App;
