import React, { useState } from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { data } from '../../utils/data';


const BurgerConstructor = ({ chosenItems, onBunChanged, bunId }) => {

    const bun = data.find(item => item._id === bunId);

    const renderedItems = chosenItems.map((item, index) => {
        return (
            <li className={styles.constructorItem} key={index}>
                <div className={` ${styles.drag}`}>
                    <DragIcon type="primary" />
                </div>
                <ConstructorElement
                    text={data[item.index].name}
                    price={data[item.index].price}
                    thumbnail={data[item.index].image}
                />
            </li>
        );
    });

    return (
        <div className={styles.main}>
            <div className={`${styles.constructorItem} ${styles.constructorItemFix}`}>
                <div className={`${styles.hidden} ${styles.drag}`}>
                    <DragIcon type="primary" />
                </div>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>

            <ul className={styles.list}>
                {renderedItems}
            </ul>
            <div className={`${styles.constructorItem} ${styles.constructorItemFix}`}>
                <div className={`${styles.hidden} ${styles.drag}`}>
                    <DragIcon type="primary" />
                </div>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>

            <div>
                <span className={styles.price}>
                    <span className="text text_type_main-large">610</span>
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
};

export default BurgerConstructor;