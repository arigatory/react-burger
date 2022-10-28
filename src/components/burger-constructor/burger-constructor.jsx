import { useState, useEffect, useMemo } from 'react';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import BurgerBun from '../burger-bun/burger-bun';
import useOrder from '../../hooks/useOrder';
import OrderDetails from '../order-details/order-details';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useDrop } from 'react-dnd';

const BurgerConstructor = () => {
  const { deleteIngredient, addIngredient } = useActions();
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      onDropHandler(item);
    },
  });
  const { selectedIngredients, selectedBun } = useSelector(
    (state) => state.ingredients
  );

  const [total, setTotal] = useState(0);

  const onDeleteIngredient = (index) => {
    deleteIngredient(index);
  };

  const onDropHandler = (item) => {
    addIngredient(item);
  };

  const renderedItems = useMemo(() => {
    if (!selectedIngredients.isEmpty) {
      return selectedIngredients.map((item, index) => {
        return (
          <li className={styles.constructorItem} key={index}>
            <div className={` ${styles.drag}`}>
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => onDeleteIngredient(index)}
            />
          </li>
        );
      });
    } else {
      return null;
    }
  }, [selectedIngredients]);
  const order = useOrder();
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});

  const onOpenOrderDetails = () => {
    setOrderInfo(order);
    setOpenOrderDetails(true);
  };

  const onCloseOrderDetails = () => {
    setOpenOrderDetails(false);
  };

  useEffect(() => {
    if (selectedBun) {
      setTotal(
        selectedIngredients.reduce(
          (pre, cur) => pre + cur.price,
          selectedBun.price
        )
      );
    }
  }, [selectedBun, selectedIngredients]);

  return (
    <div className={styles.main} ref={dropTarget}>
      <div className={styles.burger}>
        {selectedBun && <BurgerBun bun={selectedBun} type="top" />}

        <ul>{renderedItems}</ul>

        {selectedBun && <BurgerBun bun={selectedBun} type="bottom" />}
      </div>

      <div>
        <span className={styles.price}>
          <span className="text text_type_main-large mr-2">{total}</span>
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={onOpenOrderDetails}>
          Оформить заказ
        </Button>
        {openOrderDetails && (
          <OrderDetails onClose={onCloseOrderDetails} order={orderInfo} />
        )}
      </div>
    </div>
  );
};

export default BurgerConstructor;
