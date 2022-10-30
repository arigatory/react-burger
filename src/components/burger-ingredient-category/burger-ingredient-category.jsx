import BurgerIngredientItem from '../burger-ingredient-item/burger-ingredient-item';
import styles from './burger-ingredient-category.module.css';
import PropTypes from 'prop-types';
import menuItemPropTypes from '../../utils/constants';

const BurgerIngredientCategory = ({ title, ingredients, id }) => {
  const renderedIngredients = ingredients.map((ingredient) => {
    return (
      <BurgerIngredientItem
        ingredient={ingredient}
        key={ingredient._id}
        count={1}
      />
    );
  });

  return (
    <div key={id} id={id}>
      <h3 className="text text_type_main-medium mt-10 mb-6">{title}</h3>
      <div className={styles.items}>{renderedIngredients}</div>
    </div>
  );
};

BurgerIngredientCategory.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.oneOf(['bun', 'main', 'sauce']),
  ingredients: PropTypes.arrayOf(menuItemPropTypes),
};

export default BurgerIngredientCategory;
