import { useState, useEffect } from 'react';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import BurgerBun from '../burger-bun/burger-bun';
import { useDrop } from 'react-dnd';
import BurgerConstructorList from '../burger-constructor-list/burger-constructor-list';
import Modal from '../../../app/components/modal/modal';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../app/redux/configureStore';
import {
  addIngredient,
  closeOrder,
  postOrderAsync,
} from '../../../app/redux/constructorSlice';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon } from '../../../app/components/yandex/dist';
import { Button } from '../../../app/components/yandex/dist';
import { Bun } from '../../../app/models/bun';
import { useNavigate } from 'react-router-dom';

const BurgerConstructor = () => {
  const navigate = useNavigate();
  const { profile: user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (item: Bun) => {
      onDropHandler(item);
    },
  });
  const { selectedIngredients, selectedBun, order, loading } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const [total, setTotal] = useState(0);

  const onDropHandler = (item: Bun) => {
    dispatch(addIngredient({ ...item, dragId: uuidv4() }));
  };

  useEffect(() => {
    let bunCost = 0;
    if (selectedBun && selectedBun.price) {
      bunCost = selectedBun.price * 2;
    }
    setTotal(
      selectedIngredients.reduce((pre, cur) => pre + cur.price, bunCost)
    );
  }, [selectedBun, selectedIngredients]);

  const onPostClick = () => {
    if (!user) return navigate('/login');
    if (!selectedBun || selectedIngredients.length === 0) return;
    const ids = selectedIngredients.map((e) => e._id);
    ids.push(selectedBun._id);
    dispatch(postOrderAsync({ ingredients: ids }));
  };

  if (loading) {
    return (
      <h1 className="text text_type_main-large pt-10">Отправка заказа...</h1>
    );
  }

  return (
    <div className={styles.main} ref={dropTarget} data-testid="droppable">
      <div className={styles.burger}>
        {selectedBun && <BurgerBun bun={selectedBun} type="top" />}
        {selectedIngredients.length === 0 && (
          <p className="text text_type_main-medium ml-10 pl-10">
            Перетащите сюда ингредиент
          </p>
        )}
        <BurgerConstructorList />
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
          disabled={selectedBun === null || selectedIngredients.length === 0}
        >
          Оформить заказ
        </Button>
        {order && (
          <Modal onClose={() => dispatch(closeOrder())}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default BurgerConstructor;
