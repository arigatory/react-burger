import { FeedItem } from '../../app/models/order';
import FeedItemCard from './FeedItemCard';

interface Props {
  orders: FeedItem[];
  reverse?: boolean;
}

export default function FeedList({ orders, reverse }: Props) {
  const itemsToRender = orders.map((order) => (
    <FeedItemCard key={order._id} order={order} status={true} />
  ));
  return <div>{reverse ? itemsToRender.reverse() : itemsToRender}</div>;
}
