import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient-item.module.css';
import { menuItemPropTypes } from '../../utils/constants';
import { useActions } from '../../hooks/useActions';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

const BurgerIngredientItem = ({ ingredient }) => {
  const { image, price, name } = ingredient;
  const { viewIngredient } = useActions();
  const { selectedIngredients, selectedBun } = useSelector(
    (state) => state.ingredients
  );
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  const onOpenIngredientDetails = (ingredient) => {
    viewIngredient(ingredient);
  };

  let count = selectedIngredients.filter(
    (item) => ingredient._id === item._id
  ).length;

  if (selectedBun && ingredient)
    if (selectedBun._id === ingredient._id) {
      count += 2;
    }
  return (
    <article
      ref={dragRef}
      className={styles.article}
      onClick={() => onOpenIngredientDetails(ingredient)}
    >
      {count > 0 && <Counter count={count} />}
      <img src={image} alt="Фото ингредиента." className="mb-2" />
      <div className={`${styles.price} mb-2`}>
        <span className="text text_type_digits-default mr-1">{price}</span>
        <CurrencyIcon />
      </div>
      <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
    </article>
  );
};

BurgerIngredientItem.propTypes = {
  ingredient: menuItemPropTypes.isRequired,
};

export default BurgerIngredientItem;
