import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './App.module.css';
import { Provider } from 'react-redux';
import { store } from '../../state';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.body}>
          <AppHeader />

          <div className={styles.container}>
            <div className={styles.columns}>
              <div className={styles.column}>
                <BurgerIngredients />
              </div>
              <BurgerConstructor />
            </div>
          </div>
        </div>
      </DndProvider>
    </Provider>
  );
};

export default App;
