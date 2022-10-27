import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './App.module.css';
import useIngredients from '../../hooks/useIngredients';
import { IngredientsContext } from '../../services/ingredientsContext';
import { SelectedIngredientsContext } from '../../services/selectedIngredientsContext';
import { SelectedBunContext } from '../../services/selectedBunContext';
import { Provider } from 'react-redux';
import { store } from '../../state';


const App = () => {
  const ingredients = useIngredients();
  const selectedBunState = useState(null);
  const selectedIngredientsState = useState([]);

  useEffect(() => {
    const [selectedBun, setSelectedBun] = selectedBunState;
    setSelectedBun(ingredients[0]);
    if (ingredients.length !== 0) {
      const [_, setI] = selectedIngredientsState;
      setI([
        ingredients[randomIngredientIndex()],
        ingredients[randomIngredientIndex()],
        ingredients[randomIngredientIndex()],
      ]);
    }
  }, [ingredients]);

  const randomIngredientIndex = () => {
    return Math.floor(Math.random() * (ingredients.length - 1) + 1);
  };

  return (
    <Provider store={store}>
      <div className={styles.body}>
        <AppHeader />

        <IngredientsContext.Provider value={ingredients}>
          <SelectedIngredientsContext.Provider value={selectedIngredientsState}>
            <SelectedBunContext.Provider value={selectedBunState}>
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
            </SelectedBunContext.Provider>
          </SelectedIngredientsContext.Provider>
        </IngredientsContext.Provider>
      </div>
    </Provider>
  );
};

export default App;
