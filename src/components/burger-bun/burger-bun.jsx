import React from 'react';
import styles from './burger-bun.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerBun = ({bun, type}) => {

    return (
        <div className={`${styles.bun}`}>
        <ConstructorElement
            type={type}
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
        />
    </div>
    );
}

export default BurgerBun;