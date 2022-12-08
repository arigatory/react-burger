import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { loadIngredientsAsync } from '../Constructor/ingredientsSlice';
import NutritionItem from '../Constructor/nutrition-item/nutrition-item';
import styles from './ingredientDetail.module.css';

export default function IngredientDetail() {
  const { ingredientsLoaded, ingredients } = useAppSelector(
    (state) => state.ingredients
  );
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    if (!ingredientsLoaded) dispatch(loadIngredientsAsync());
    const all = [
      ...ingredients.buns,
      ...ingredients.mains,
      ...ingredients.sauses,
    ];
    if (all.length > 0) {
      setIngredient(all.find((i) => i._id === id));
    }
  }, [dispatch, ingredientsLoaded, id, ingredients]);

  return (
    <div className={styles.content}>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      {ingredient && (
        <>
          <img src={ingredient.image_large} alt="Meat" className={styles.img} />
          <p className={`${styles.name} text text_type_main-medium`}>
            {ingredient.name}
          </p>
          <ul className={styles.ul}>
            <NutritionItem title="Калории,ккал" amount={ingredient.calories} />
            <NutritionItem title="Белки, г" amount={ingredient.proteins} />
            <NutritionItem title="Жиры, г" amount={ingredient.fat} />
            <NutritionItem
              title="Углеводы, г"
              amount={ingredient.carbohydrates}
            />
          </ul>
        </>
      )}
    </div>
  );
}
