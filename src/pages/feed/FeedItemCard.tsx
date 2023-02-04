import { CurrencyIcon, FormattedDate } from '../../app/components/yandex/dist';
import styles from './feedItem.module.scss';
import IngredientIcon from '../../app/components/ingredient-icon/IngredientIcon';
import { useAppSelector } from '../../app/redux/configureStore';
import { FeedItem } from '../../app/models/order';
import { ingredientsSelectors } from '../../app/redux/ingredientsSlice';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  order: FeedItem;
  status?: boolean;
}

export default function FeedItemCard({ order, status }: Props) {
  const location = useLocation();
  const ingredients = useAppSelector((state) =>
    ingredientsSelectors.selectEntities(state)
  );
  return (
    <Link
      state={{ background: location }}
      className={styles.article}
      to={{
        pathname: `/feed/${order._id}`,
      }}
    >
      <div className={styles.card}>
        <div className={styles.card__top}>
          <span className="text text_type_main-medium">#{order?.number}</span>
          <span className={`text text_type_main-default text_color_inactive`}>
            <FormattedDate date={new Date(order.createdAt)} />
          </span>
        </div>
        <h2
          className={`${styles.card__title} text text_type_main-default text_color_inactive`}
        >
          {order?.name}
        </h2>
        {status && <>{order.status === 'created' && <p className={`${styles.created} text text_type_main-small mb-6`}>Создан</p>}</>}
        {status && <>{order.status === 'pending' && <p className={`${styles.pending} text text_type_main-small mb-6`}>Готовится</p>}</>}
        {status && <>{order.status === 'done' && <p className={`${styles.done} text text_type_main-small mb-6`}>Выполнен</p>}</>}
        {status && <>{order.status === 'cancelled' && <p className={`${styles.cancelled} text text_type_main-small mb-6`}>Отменен</p>}</>}
        <div className={styles.card__bottom}>
          <div className={styles.imgList}>
            {order?.ingredients.map((picId, i) => {
              return (
                <IngredientIcon
                  key={order._id + picId + i}
                  img={ingredients[picId]?.image!}
                />
              );
            })}
          </div>

          <p className="text text_type_main-medium">
            <span className=" mr-2">
              {order?.ingredients.reduce((a, c) => {
                return ingredients[c]?.price! + a;
              }, 0)}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    </Link>
  );
}
