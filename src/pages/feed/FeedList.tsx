import React from 'react';
import { FeedItem } from '../../app/models/order';
import FeedItemCard from './FeedItemCard';

interface Props {
  orders: FeedItem[];
}

export default function FeedList({ orders }: Props) {
  return (
    <div>
      {orders.map((order) => (
        <FeedItemCard key={order._id} order={order} />
      ))}
    </div>
  );
}
