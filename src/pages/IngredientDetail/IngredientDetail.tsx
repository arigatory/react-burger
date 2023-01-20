import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/redux/configureStore';
import { ingredientsSelectors } from '../../app/redux/ingredientsSlice';
import NutritionItem from '../Constructor/nutrition-item/nutrition-item';
import styles from './ingredientDetail.module.css';

export default function IngredientDetail() {
  const { id } = useParams<{ id: string }>();
  const ingredient = useAppSelector((state) =>
    ingredientsSelectors.selectById(state, id!)
  );

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
