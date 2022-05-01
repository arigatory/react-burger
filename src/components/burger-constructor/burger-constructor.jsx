import React, { useState } from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import OrderDetails from '../order-details/order-details';



const BurgerConstructor = ({ selectedIngredients, selectedBun, onDeleteIngredient, onOrder }) => {
    const [total, setTotal] = useState(0);

    const renderedItems = selectedIngredients.map((item, index) => {
        return (
            <li className={styles.constructorItem} key={index}>
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

    if (Array.isArray(selectedIngredients) && selectedIngredients.length) {
        selectedIngredients.forEach((item) => {total += item.price});
    }

    return (
        <div className={styles.main}>
{  selectedBun &&          <div className={`${styles.constructorItem} ${styles.constructorItemFix}`}>
                <div className={`${styles.hidden} ${styles.drag}`}>
                    <DragIcon type="primary" />
                </div>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={selectedBun.name}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image}
                />
            </div>}

            <ul className={styles.list}>
                {renderedItems}
            </ul>


{ selectedBun &&            <div className={`${styles.constructorItem} ${styles.constructorItemFix}`}>
                <div className={`${styles.hidden} ${styles.drag}`}>
                    <DragIcon type="primary" />
                </div>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={selectedBun.name}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image}
                />
            </div>}

            <div>
                <span className={styles.price}>
                    <span className="text text_type_main-large mr-2">{total}</span>
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large" onClick={onOrder}>
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