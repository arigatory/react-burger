import { FeedItem } from '../../app/models/order';
import HistoryItemCard from './HisotyrItemCard';

interface Props {
  orders: FeedItem[];
}

export default function HistoryList({ orders }: Props) {
  return (
    <div>
      {orders
        .map((order) => (
          <HistoryItemCard key={order._id} order={order} status={true} />
        ))
        .reverse()}
    </div>
  );
}
