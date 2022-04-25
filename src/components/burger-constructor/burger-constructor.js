import React, { useState } from 'react';
import ItemCard from '../item-card/item-card'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
    const [current, setCurrent] = useState('one')
    const img = "https://code.s3.yandex.net/react/code/meat-04.png";
    return (


        <div className={styles.main}>
            <div className={styles.list}>

                <div className={`${styles.constructorItem} ${styles.constructorItemFix}`}>
                    <div className={`${styles.hidden} ${styles.drag}`}>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                </div>

                <div className={styles.constructorItem}>
                    <div className={` ${styles.drag}`}>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Краторная булка N-200i (середина)"
                        price={50}
                        thumbnail={img}
                    />
                </div>

                <div className={styles.constructorItem}>
                    <div className={` ${styles.drag}`}>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Краторная булка N-200i (середина)"
                        price={50}
                        thumbnail={img}
                    />
                </div>

                <div className={styles.constructorItem}>
                    <div className={` ${styles.drag}`}>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text="Краторная булка N-200i (середина)"
                        price={50}
                        thumbnail={img}
                    />
                </div>

                <div className={`${styles.constructorItem} ${styles.constructorItemFix}`}>
                    <div className={`${styles.hidden} ${styles.drag}`}>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={img}
                    />
                </div>
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