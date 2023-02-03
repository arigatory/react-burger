import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/redux/configureStore';
import { feedSelectors } from '../../app/redux/feedSlice';
import styles from './orderDetail.module.scss';

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const order = useAppSelector((state) =>
    feedSelectors.selectById(state, id!)
  );
  console.log(order);
  
  if (!order) return <Navigate to={'/not-found'}/>

  return (
    <div className={styles.content}>
      <h2 className={`${styles.title} text text_type_main-large`}>
        {order.name}
      </h2>
      
    </div>
  );
}
