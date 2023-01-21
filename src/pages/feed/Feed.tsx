import { FeedItem } from '../../app/models/order';
import FeedList from './FeedList';
import styles from './feed.module.scss';

const orders: FeedItem[] = [
  {
    name: 'Interstellar бургер',
    number: 1231,
    date: new Date(),
    ingredients: [],
  },
  {
    name: 'Interstellar бургер',
    number: 1232,
    date: new Date(),
    ingredients: [],
  },
  {
    name: 'Interstellar бургер',
    number: 1233,
    date: new Date(),
    ingredients: [],
  },
];

export default function Feed() {
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large mb-8">Лента заказов</h1>

      <div className={styles.columns}>
        <div className={`${styles.column} columns__left`}>
          <FeedList orders={orders} />
        </div>
        <div className={`${styles.column} columns__right`}>
          <div className={styles.ordersStatuses}>
            <div className="ordersStatuses__done">
              <h3 className={`${styles.title} text text_type_main-medium`}>
                Готовы
              </h3>
              <div className={styles.doneNumbers}>
                <p className="text text_type_digits-medium">034533</p>
                <p className="text text_type_digits-medium">034533</p>
                <p className="text text_type_digits-medium">034533</p>
                <p className="text text_type_digits-medium">034533</p>
                <p className="text text_type_digits-medium">034533</p>
                <p className="text text_type_digits-medium">034533</p>
              </div>
            </div>
            <div className="ordersStatuses__active">
              <h3 className={`${styles.title} text text_type_main-medium`}>
                В работе
              </h3>
              <div>
                <p className="text text_type_digits-medium">034533</p>
                <p className="text text_type_digits-medium">034533</p>
                <p className="text text_type_digits-medium">034533</p>
              </div>
            </div>
          </div>

          <h2 className={`text text_type_main-medium`}>
            Выполнено за все время:
          </h2>
          <p className="text text_type_digits-large mb-15">28 752</p>

          <h2 className={`text text_type_main-medium`}>
            Выполнено за сегодня:
          </h2>
          <p className="text text_type_digits-large">28 752</p>
        </div>
      </div>
    </div>
  );
}
