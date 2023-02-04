import { useParams } from 'react-router-dom';
import IngredientIcon from '../../app/components/ingredient-icon/IngredientIcon';
import { CurrencyIcon, FormattedDate } from '../../app/components/yandex/dist';
import { useAppSelector } from '../../app/redux/configureStore';
import { feedSelectors } from '../../app/redux/feedSlice';
import { ingredientsSelectors } from '../../app/redux/ingredientsSlice';
import styles from './orderDetail.module.scss';

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const order = useAppSelector((state) => feedSelectors.selectById(state, id!));
  const ingredients = useAppSelector((state) =>
    ingredientsSelectors.selectEntities(state)
  );

  return (
    <div className={styles.content}>
      {order && (
        <>
          <h2 className={`${styles.number} text text_type_digits-medium mb-4`}>
            #0{order.number}
          </h2>
          <h1 className={`${styles.title} text text_type_main-medium mb-4`}>
            {order.name}
          </h1>
          <p className={`${styles.label} text text_type_main-small`}>
            Выполнен
          </p>
          <p className={`${styles.title} text text_type_main-medium mb-4`}>
            Состав:
          </p>
          <ul>
            {order.ingredients.map((ingredientId, i) => (
              <li key={ingredientId + i}>
                <div className={styles.item}>
                  <div className={styles.itemRight}>
                    <IngredientIcon img={ingredients[ingredientId]?.image!} />
                    <span className={`text text_type_main-small`}>
                      {ingredients[ingredientId]?.name!}
                    </span>
                  </div>
                  <div
                    className={`${styles.itemLeft} text text_type_digits-default`}
                  >
                    <span>2</span>
                    <span> x </span>
                    <span>300 </span>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div
            className={`${styles.footer} text text_type_main-small text_color_inactive`}
          >
            <FormattedDate date={new Date(order.createdAt)} />
            <span className={`${styles.price} text text_type_digits-medium`}>
              {order?.ingredients.reduce((a, c) => {
                return ingredients[c]?.price! + a;
              }, 0)}
              <span className="mr-2" />
              <CurrencyIcon type="primary" />
            </span>
          </div>
        </>
      )}
    </div>
  );
}
