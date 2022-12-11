import BurgerConstructor from './burger-constructor/burger-constructor';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import styles from './constructor.module.css';

export default function Constructor() {
  return (
    <main className={styles.container}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <BurgerIngredients />
        </div>
        <BurgerConstructor />
      </div>
    </main>
  );
}
