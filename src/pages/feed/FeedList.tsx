import { FeedItem } from '../../app/models/order';
import FeedItemCard from './FeedItemCard';

interface Props {
  orders: FeedItem[];
  reverse?: boolean;
}

export default function FeedList({ orders, reverse }: Props) {
  return (
    <div>
      {orders.map((order) => (
        <FeedItemCard key={order._id} order={order} />
      ))}
    </div>
  );
}
