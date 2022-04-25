import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import styles from './App.module.css';


function App() {
  return (
    <>
      <AppHeader/>
      <div className={styles.columns}>
      <BurgerIngredients />
      <BurgerConstructor />    
      </div>
    </>
  );
}

export default App;
