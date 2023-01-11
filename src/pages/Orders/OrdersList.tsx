import React from 'react';
import OrderCard from './OrderCard';
import { OrderItem } from '../../app/models/order';

interface Props {
  orders: OrderItem[];
}

export default function OrdersList({ orders }: Props) {
  return (
    <div>
      {orders.map((order, i) => (
        <OrderCard
          key={order.number}
          name={order.name}
          date={order.date}
          number={order.number}
          images={[
            'https://code.s3.yandex.net/react/code/bun-02.png',
            'https://code.s3.yandex.net/react/code/meat-04.png',
            'https://code.s3.yandex.net/react/code/mineral_rings.png',
          ]}
          total={480 * (i + 1)}
        />
      ))}
    </div>
  );
}
