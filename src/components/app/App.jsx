import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './App.module.css';
import useIngredients from '../../hooks/useIngredients';
import OrderDetails from '../order-details/order-details';

const App = () => {
	const data = useIngredients();
	const [ selectedBun, setSelectedBun ] = useState(null);
	const [ selectedIngredients, setSelectedIngredients ] = useState([]);
	const [ openOrderDetails, setOpenOrderDetails ] = useState(false);

	useEffect(
		() => {
			setSelectedBun(data[0]);
			if (data.length !== 0) {
				setSelectedIngredients([data[3],data[5],data[6]]);				
			}
		},
		[ data ]
	);

	const onOpenOrderDetails = () => {
		setOpenOrderDetails(true);
	};

	const onCloseOrderDetails = () => {
		setOpenOrderDetails(false);
	};

	return (
		<div className={styles.body}>
			<AppHeader />
			<div className={styles.container}>
				<div className={styles.columns}>
					<div className={styles.column}>
						<BurgerIngredients
							data={data}
						/>
					</div>
					<div className={styles.column}>
						<BurgerConstructor
							selectedIngredients={selectedIngredients}
							selectedBun={selectedBun}
							data={data}
							onOrder={onOpenOrderDetails}
						/>
					</div>
				</div>
			</div>
			{openOrderDetails && <OrderDetails onClose={onCloseOrderDetails}/>}
		</div>
	);
};

export default App;
