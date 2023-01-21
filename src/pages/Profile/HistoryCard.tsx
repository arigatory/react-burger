import React from 'react';
import { CurrencyIcon, FormattedDate } from '../../app/components/yandex/dist';
import styles from './historyCard.module.scss';
import { HistoryItem } from '../../app/models/historyItem';

interface Props {
  item: HistoryItem;
}

export default function HistoryCard({ item }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.card__top}>
        <span className="text text_type_main-medium">#{item.number}</span>
        <span className={`text text_type_main-default text_color_inactive`}>
          <FormattedDate date={item.date} />
        </span>
      </div>
      <h2
        className={`${styles.card__title} text text_type_main-default text_color_inactive`}
      >
        {item.name}
      </h2>
      <div className={styles.card__bottom}>
        <div className={styles.imgList}>
          {item.ingredients.map((i) => (
            <div className={styles.imgWrapper}>
              <div key={i._id} className={styles.img}>
                <img src={i.image} alt={i.name} />
              </div>
            </div>
          ))}
        </div>

        <p className="text text_type_main-medium">
          <span className=" mr-2">{1000}</span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
}
