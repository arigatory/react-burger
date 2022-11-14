import AppHeader from '../../components/app-header/app-header';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import styles from './main.module.css';

export default function MainPage() {
  return (
    <div className={styles.body}>
      <AppHeader />
      <main className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <BurgerIngredients />
          </div>
          <BurgerConstructor />
        </div>
      </main>
    </div>
  );
}
