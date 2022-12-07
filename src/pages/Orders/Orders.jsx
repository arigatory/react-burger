import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import styles from './orders.module.css';
import { decrement, increment } from './ordersSlice';

export default function Orders() {
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector(state => state.orders);
  return (
    <>
      <h1 className='text text_type_main-large mb-8'>Небольшой тест Redux</h1>
      <button onClick={() => dispatch(decrement(1))}>
        Decrement
      </button>
      <button onClick={() => dispatch(increment(1))}>
        Increment
      </button>
      <button onClick={() => dispatch(increment(5))}>
        Increment 5
      </button>
      <h1 className={styles.title}>
        {title} {data}
      </h1>
    </>
  );
}
