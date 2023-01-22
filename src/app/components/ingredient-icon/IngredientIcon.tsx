import React from 'react';
import styles from './ingredientIcon.module.scss';

interface Props {
  img: string;
  text?: string;
}

export default function IngredientIcon({ img, text }: Props) {
  return (
      <div className={styles.img}>
        <img src={img} alt={img} />
      </div>
  );
}
