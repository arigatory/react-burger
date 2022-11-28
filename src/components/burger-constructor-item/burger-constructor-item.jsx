import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-item.module.css';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch } from '../../app/store/configureStore';
import { removeIngredient } from '../burger-constructor/burgerConstructorSlice';

const BurgerConstructorItem = ({ name, price, image, index }) => {
  const dispatch = useAppDispatch();

  const ref = useRef(null);
  const onDeleteIngredient = (index) => {
    dispatch(removeIngredient(index));
  };

  return (
    <div ref={ref} className={styles.constructorItem}>
      <div className={` ${styles.drag}`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => onDeleteIngredient(index)}
      />
    </div>
  );
};

BurgerConstructorItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default BurgerConstructorItem;
