import React, { useState } from 'react';
import ItemCard from '../item-card/item-card'
import { BurgerIcon, ListIcon, ProfileIcon, Logo, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    const [current, setCurrent] = useState('one')
    return (

        <div className="text text_type_main-default">
            <div>
                <h1 className="text text_type_main-large">Соберите бургер</h1>
            </div>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div>
                <h2>Булки</h2>
                <div className={styles.list}>
                    <ItemCard/>
                    <ItemCard/> 
                </div>

            </div>
        </div>
    )
};

export default BurgerIngredients;