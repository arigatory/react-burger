import styles from './burger-ingredient-item.module.css';
import { menuItemPropTypes } from '../../../app/utils/constants';
import { useDrag } from 'react-dnd';
import {
  useAppSelector,
} from '../../../app/redux/configureStore';
import { CurrencyIcon } from '../../../app/components/yandex/dist';
import { Counter } from '../../../app/components/yandex/dist';
import { Link, useLocation } from 'react-router-dom';

const BurgerIngredientItem = ({ ingredient }) => {
  let location = useLocation();
  const { image, price, name } = ingredient;
  const { selectedIngredients, selectedBun } = useAppSelector(
    (state) => state.ingredients
  );
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

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
    <Link
      ref={dragRef}
      className={styles.article}
      to={{
        pathname: `/ingredients/${ingredient._id}`,
        state: { background: location },
      }}
    >
      {count > 0 && <Counter count={count} />}
      <img src={image} alt="Фото ингредиента." className="mb-2" />
      <div className={`${styles.price} mb-2`}>
        <span className="text text_type_digits-default mr-1">{price}</span>
        <CurrencyIcon />
      </div>
      <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
    </Link>
  );
};

BurgerIngredientItem.propTypes = {
  ingredient: menuItemPropTypes.isRequired,
};

export default BurgerIngredientItem;
