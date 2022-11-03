import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-item.module.css';
import { useActions } from '../../hooks/useActions';
import { useRef } from 'react';
import PropTypes from 'prop-types';

const BurgerConstructorItem = ({ name, price, image, index }) => {
  const ref = useRef(null);
  const { deleteIngredient } = useActions();
  const onDeleteIngredient = (index) => {
    deleteIngredient(index);
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
  image: PropTypes.string.isRequired
};

export default BurgerConstructorItem;
