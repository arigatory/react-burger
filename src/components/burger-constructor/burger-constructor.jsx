import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import BurgerBun from '../burger-bun/burger-bun';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useDrop } from 'react-dnd';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal';

const BurgerConstructor = () => {
  const { addIngredient, moveIngredient, postOrder, closeOrder } = useActions();
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      onDropHandler(item);
    },
  });
  const { selectedIngredients, selectedBun, order } = useSelector(
    (state) => state.ingredients
  );
  const [total, setTotal] = useState(0);

  const onDropHandler = (item) => {
    addIngredient(item);
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      moveIngredient(dragIndex, hoverIndex);
    },
    [moveIngredient]
  );

  const renderedItems = useMemo(() => {
    if (!selectedIngredients) return null;
    if (!selectedIngredients.isEmpty) {
      return selectedIngredients.map((item, index) => {
        return (
          <BurgerConstructorItem
            key={index}
            name={item.name}
            image={item.image}
            price={item.price}
            index={index}
            moveCard={moveCard}
            id={item._id}
          />
        );
      });
    } else {
      return null;
    }
  }, [selectedIngredients, moveCard, selectedBun]);

  useEffect(() => {
    if (selectedBun) {
      setTotal(
        selectedIngredients.reduce(
          (pre, cur) => pre + cur.price,
          (selectedBun.price || 0) * 2
        )
      );
    }
  }, [selectedBun, selectedIngredients]);

  const onPostClick = () => {
    const ids = selectedIngredients.map((e) => e._id);
    ids.push(selectedBun._id);
    postOrder(ids);
  };
  return (
    <div className={styles.main} ref={dropTarget}>
      <div className={styles.burger}>
        {selectedBun && <BurgerBun bun={selectedBun} type="top" />}
        {selectedIngredients.length === 0 && (
          <p className="text text_type_main-medium ml-10 pl-10">
            Перетащите сюда ингредиент
          </p>
        )}
        <ul>{renderedItems}</ul>
        {selectedBun && <BurgerBun bun={selectedBun} type="bottom" />}
      </div>

      <div>
        <span className={styles.price}>
          <span className="text text_type_main-large mr-2">{total}</span>
          <CurrencyIcon type="primary" />
        </span>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          onClick={onPostClick}
        >
          Оформить заказ
        </Button>
        {order && (
          <Modal onClose={closeOrder}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default BurgerConstructor;
