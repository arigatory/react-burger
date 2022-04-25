import React, { useState } from 'react';
import ItemCard from '../item-card/item-card'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
    const [current, setCurrent] = useState('one')
    const img = "https://code.s3.yandex.net/react/code/meat-04.png";
    return (


        <div className={styles.main}>
            <div className={styles.list} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={img}
                />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={img}
                />
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={img}
                />
            </div>
            <div>
                <span className="text text_type_main-large">610</span>
                <CurrencyIcon type="primary" />
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
};

export default BurgerConstructor;