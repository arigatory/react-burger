import styles from './burger-constructor-item.module.css';
import { useRef } from 'react';
import { useAppDispatch } from '../../../app/redux/configureStore';
import { removeIngredient } from '../../../app/redux/constructorSlice';
import { DragIcon } from '../../../app/components/yandex/dist';
import { ConstructorElement } from '../../../app/components/yandex/dist';

interface Props {
  name: string;
  price: number;
  image: string;
  index: string;
}

const BurgerConstructorItem = ({ name, price, image, index }: Props) => {
  const dispatch = useAppDispatch();

  const ref = useRef(null);
  const onDeleteIngredient = (index: string) => {
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

export default BurgerConstructorItem;
