import styles from './burger-ingredient-item.module.css';
import { menuItemPropTypes } from '../../../utils/constants';
import { useDrag } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { viewIngredient } from '../ingredientsSlice';
import { CurrencyIcon } from '../../../app/components/yandex/dist';
import { Counter } from '../../../app/components/yandex/dist';

const BurgerIngredientItem = ({ ingredient }) => {
  const dispatch = useAppDispatch();
  const { image, price, name } = ingredient;
  const { selectedIngredients, selectedBun } = useAppSelector(
    (state) => state.ingredients
  );
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  const onOpenIngredientDetails = (ingredient) => {
    dispatch(viewIngredient(ingredient));
  };

  let count;
  if (selectedIngredients) {
    count = selectedIngredients.filter(
      (item) => ingredient._id === item._id
    ).length;
  }

  if (selectedBun && ingredient)
    if (selectedBun._id === ingredient._id) {
      count += 2;
    }
  return (
    <article
      ref={dragRef}
      className={styles.article}
      onClick={() => {
        onOpenIngredientDetails(ingredient);
        window.history.replaceState(null, "Детали", `/ingredients/${ingredient._id}`)
      }}
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
