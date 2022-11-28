import styles from './order-details.module.css';
import image from '../../images/order.svg';
import { useAppSelector } from '../../app/store/configureStore';

const OrderDetails = () => {
  const { order } = useAppSelector((state) => state.burgerConstructor);

  return (
    <div className={styles.content}>
      <p className={`${styles.number} text text_type_digits-large`}>
        {order.number}
      </p>
      <div className={`${styles.id} text text_type_main-medium`}>
        идентификатор заказа
      </div>
      <img className={styles.img} src={image} alt="order.svg" />
      <p className="text text_type_main-small mb-2">
        Ваш заказ начали готовить
      </p>
      <div className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
};

export default OrderDetails;
