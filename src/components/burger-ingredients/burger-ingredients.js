import React, { useState } from 'react';
import ItemCard from '../item-card/item-card'
import { BurgerIcon, ListIcon, Counter, Logo, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    const [current, setCurrent] = useState('one')
    return (

        <div className="text text_type_main-default">
            <h1 className="text_type_main-large">Соберите бургер</h1>

            <div className={styles.tabs}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent} className={styles.tab}>
                    Булки
                </Tab>

                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <div className={styles.option}>
                <h2 className={`${styles.h2} text text_type_main-medium`}>Булки</h2>
                <div className={styles.cards}>
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                </div>

            </div>

            <div>
                <h2>Соусы</h2>
                <div className={styles.cards}>
                    <ItemCard />
                    <ItemCard />
                </div>

            </div>

            <div>
                <h2>Начинка</h2>
                <div className={styles.cards}>
                    <ItemCard />
                    <ItemCard />
                </div>

            </div>
        </div>
    )
};

export default BurgerIngredients;