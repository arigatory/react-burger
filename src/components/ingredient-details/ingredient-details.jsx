import Modal from '../modal/modal';
import menuItemPropTypes from '../../utils/constants';
import styles from './ingredient-details.module.css';
import NutritionItem from '../nutrition-item/nutrition-item';
import { useActions } from '../../hooks/useActions';
import { useSelector } from 'react-redux';

const IngredientDetails = ({ ingredient }) => {
  const { closeIngredient } = useActions();
  const { currentIngredient } = useSelector((state) => state.ingredients);

  return (
    <Modal onClose={closeIngredient}>
      <div className={styles.content}>
        <h2 className={`${styles.title} text text_type_main-large`}>
          Детали ингредиента
        </h2>
        <img
          src={currentIngredient.image_large}
          alt="Meat image"
          className={styles.img}
        />
        <p className={`${styles.name} text text_type_main-medium`}>
          {currentIngredient.name}
        </p>
        <ul className={styles.ul}>
          <NutritionItem
            title="Калории,ккал"
            amount={currentIngredient.calories}
          />
          <NutritionItem title="Белки, г" amount={currentIngredient.proteins} />
          <NutritionItem title="Жиры, г" amount={currentIngredient.fat} />
          <NutritionItem
            title="Углеводы, г"
            amount={currentIngredient.carbohydrates}
          />
        </ul>
      </div>
    </Modal>
  );
};

IngredientDetails.propTypes = {
  ingredient: menuItemPropTypes.isRequired,
};

export default IngredientDetails;
