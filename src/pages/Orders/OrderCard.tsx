import React from 'react';
import { OrderItem } from '../../app/models/order';
import { CurrencyIcon, FormattedDate } from '../../app/components/yandex/dist';
import styles from './orderCard.module.scss';

interface Props {
  name: string;
  number: number;
  date: Date;
  images: string[];
  total: number;
}

export default function OrderCard({
  name,
  number,
  date,
  images,
  total,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.card__top}>
        <span className="text text_type_main-medium">#{number}</span>
        <span className={`text text_type_main-default text_color_inactive`}>
          <FormattedDate date={date} />
        </span>
      </div>
      <h2
        className={`${styles.card__title} text text_type_main-default text_color_inactive`}
      >
        {name}
      </h2>
      <div className={styles.card__bottom}>
        <div className={styles.imgList}>
          {images.map((i) => (
            <div className={styles.imgWrapper}>
              <div
                key={i}
                className={styles.img}
              >
                <img src={i} alt={i} />
              </div>
            </div>
          ))}
        </div>

        <p className="text text_type_main-medium">
          <span className=" mr-2">{total}</span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
}
