import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/redux/configureStore';
import { ingredientsSelectors, loadIngredientsAsync } from '../../app/redux/ingredientsSlice';
import NutritionItem from '../Constructor/nutrition-item/nutrition-item';
import styles from './ingredientDetail.module.css';

export default function IngredientDetail() {
  const { id } = useParams();
  const ingredient = useAppSelector(state => ingredientsSelectors.selectById(state, id));

  const { ingredientsLoaded } = useAppSelector(
    (state) => state.ingredients
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!ingredientsLoaded) dispatch(loadIngredientsAsync());
  }, [dispatch, ingredientsLoaded]);

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
