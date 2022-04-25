import React from "react";
import styles from './item-card.module.css';
import { BurgerIcon, ListIcon, ProfileIcon, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';



const ItemCard = () => {

    return (
        <div className={styles.card}>
            <img src="https://code.s3.yandex.net/react/code/bun-02-large.png" alt="Фото блюда" />
            <div className={styles.price}>
                <span className={styles.price}>20</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles.description}>Краторная булка N-200i</p>
        </div>
    );
};

export default ItemCard;