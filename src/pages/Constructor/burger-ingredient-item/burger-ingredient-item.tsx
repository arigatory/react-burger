import styles from './burger-ingredient-item.module.css';
import { useDrag } from 'react-dnd';
import { useAppSelector } from '../../../app/redux/configureStore';
import { CurrencyIcon } from '../../../app/components/yandex/dist';
import { Counter } from '../../../app/components/yandex/dist';
import { Link, useLocation } from 'react-router-dom';
import { Ingredient } from '../../../app/models/ingredient';

interface Props {
  ingredient: Ingredient;
}

export default function BurgerIngredientItem({ ingredient }: Props) {
  const { image, price, name } = ingredient;
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });
  const location = useLocation();
  const selectedIngredients = ingredients.filter((i) => i.type !== 'bun');
  const selectedBun = ingredients.find((i) => i.type === 'bun');

  let count = 0;
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
      data-testid={`draggable-${ingredient.type}`}
      state={{ background: location }}
      ref={dragRef}
      className={styles.article}
      to={{
        pathname: `/ingredients/${ingredient._id}`,
      }}
    >
      {count > 0 && <Counter count={count} />}
      <img src={image} alt="Фото ингредиента." className="mb-2" />
      <div className={`${styles.price} mb-2`}>
        <span className="text text_type_digits-default mr-1">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
    </Link>
  );
}
