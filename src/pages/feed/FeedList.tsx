import React from 'react';
import { FeedItem } from '../../app/models/order';
import FeedItemCard from './FeedItemCard';

interface Props {
  orders: FeedItem[];
}

export default function FeedList({ orders }: Props) {
  return (
    <div>
      {orders.map((order, i) => (
        <FeedItemCard
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
