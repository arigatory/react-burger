import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-item.module.css';
import { useActions } from '../../hooks/useActions';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

const BurgerConstructorItem = ({ name, price, image, index, moveCard }) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag({
    type: 'item',
    item: () => {
      return { name, index };
    },
  });
  drag(drop(ref));

  const { deleteIngredient } = useActions();
  const onDeleteIngredient = (index) => {
    deleteIngredient(index);
  };

  return (
    <div
      ref={ref}
      className={styles.constructorItem}
      data-handler-id={handlerId}
    >
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
