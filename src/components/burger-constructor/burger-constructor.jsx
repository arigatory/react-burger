import React, { useState } from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { data } from '../../utils/data';
import PropTypes from 'prop-types';


const BurgerConstructor = ({ selectedIngredients, bunId, onDeleteIngredient }) => {

    const bun = data.find(item => item._id === bunId);

    const renderedItems = selectedIngredients.map((item) => {
        return (
            <li className={styles.constructorItem} key={item._id}>
                <div className={` ${styles.drag}`}>
                    <DragIcon type="primary" />
                </div>
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => onDeleteIngredient(item)}
                />
            </li>
        );
    });

    let total = 2 * bun.price;
    if (Array.isArray(selectedIngredients) && selectedIngredients.length) {
        selectedIngredients.forEach((item) => {total += item.price});
    }

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
                    <span className="text text_type_main-large mr-2">{total}</span>
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
};

BurgerConstructor.prototypes = {
    bunId: PropTypes.string,
    selectedIngredients: PropTypes.array,
    onDeleteIngredient: PropTypes.func.isRequired
}

export default BurgerConstructor;