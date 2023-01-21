import React from 'react';
import HistoryCard from './HistoryCard';
import { HistoryItem } from '../../app/models/historyItem';

interface Props {
  item: HistoryItem;
}

const orders: HistoryItem[] = [
  {
    name: 'Interstellar бургер',
    number: 1231,
    date: new Date(),
    ingredients: [],
    status: 'Создан',
  },
  {
    name: 'Interstellar бургер',
    number: 1232,
    date: new Date(),
    ingredients: [],
    status: 'Готовится',
  },
  {
    name: 'Interstellar бургер',
    number: 1233,
    date: new Date(),
    ingredients: [],
    status: 'Выполнен',
  },
];

export default function History() {
  return (
    <div>
      {orders.map((o) => (
        <HistoryCard key={o.number} item={o} />
      ))}
    </div>
  );
}
