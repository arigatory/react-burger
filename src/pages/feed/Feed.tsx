import { useEffect } from 'react';
import FeedList from './FeedList';
import styles from './feed.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/redux/configureStore';
import { wsConnect, wsDisconnect } from '../../app/redux/feedSlice';

export default function Feed() {
  const {
    total,
    totalToday,
    feedItems,
    isEstablishingConnection,
    isConnected,
    feedLoaded,
  } = useAppSelector((state) => state.feed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isConnected && !isEstablishingConnection) {
      dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'));
    }

    return () => {
      if (isConnected) dispatch(wsDisconnect());
    };
  }, [dispatch, feedLoaded, isConnected, isEstablishingConnection]);

  const doneOrders = feedItems
    ?.slice(0, 5)
    .filter((item) => item.status === 'done');
  const notDoneOrders = feedItems?.filter((item) => item.status !== 'done');

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large mb-8">Лента заказов</h1>
      {!isConnected && <h1>Загрузка заказов...</h1>}
      <div className={styles.columns}>
        <div className={`${styles.column} ${styles.columnLeft}`}>
          <FeedList orders={feedItems} />
        </div>
        <div className={`${styles.column} `}>
          <div className={styles.ordersStatuses}>
            <div className="ordersStatuses__done">
              <h3 className={`${styles.title} text text_type_main-medium`}>
                Готовы
              </h3>
              <div className={styles.doneNumbers}>
                {doneOrders.map((order) => (
                  <p key={order._id} className="text text_type_digits-medium">
                    {order.number}
                  </p>
                ))}
              </div>
            </div>
            <div className="ordersStatuses__active">
              <h3 className={`${styles.title} text text_type_main-medium`}>
                В работе
              </h3>
              <div>
                {notDoneOrders.map((order) => (
                  <p key={order._id} className="text text_type_digits-medium">
                    {order.number}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <h2 className={`text text_type_main-medium`}>
            Выполнено за все время:
          </h2>
          <p className="text text_type_digits-large mb-15">{total}</p>

          <h2 className={`text text_type_main-medium`}>
            Выполнено за сегодня:
          </h2>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>
    </div>
  );
}
