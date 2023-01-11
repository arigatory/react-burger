import { OrderItem } from '../../app/models/order';
import OrdersList from './OrdersList';

const orders: OrderItem[] = [
  {
    name: 'Interstellar бургер',
    number: 1231,
    date: new Date(),
    ingredients: [],
  },
  {
    name: 'Interstellar бургер',
    number: 1231,
    date: new Date(),
    ingredients: [],
  },
  {
    name: 'Interstellar бургер',
    number: 1231,
    date: new Date(),
    ingredients: [],
  },
];

export default function Orders() {
  return (
    <>
      <h1 className="text text_type_main-large mb-8">Лента заказов</h1>
      <OrdersList orders={orders} />
    </>
  );
}
