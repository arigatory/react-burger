import BurgerIngredientItem from '../burger-ingredient-item/burger-ingredient-item';
import styles from './burger-ingredient-category.module.css';

export default function BurgerIngredientCategory({ title, ingredients, id }) {
  const renderedIngredients = ingredients.map((ingredient) => {
    return (
      <BurgerIngredientItem ingredient={ingredient} key={ingredient._id} />
    );
  });

  return (
    <div id={id}>
      <h3 className="text text_type_main-medium mt-10 mb-6">{title}</h3>
      <div className={styles.items}>{renderedIngredients}</div>
    </div>
  );
}
