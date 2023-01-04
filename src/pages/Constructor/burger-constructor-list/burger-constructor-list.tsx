import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import styles from './burger-constructor-list.module.css';
import { useAppDispatch, useAppSelector } from '../../../app/redux/configureStore';
import { moveIngredient } from '../../../app/redux/constructorSlice';

const BurgerConstructorList = () => {
  const { selectedIngredients } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const dispatch = useAppDispatch();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    dispatch(
      moveIngredient({
        i: result.source.index,
        j: result.destination.index,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="ingredients">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {selectedIngredients &&
              selectedIngredients.length > 0 &&
              selectedIngredients.map((item, index) => {
                return (
                  <Draggable
                    key={item.dragId}
                    draggableId={item.dragId}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        className={styles.item}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <BurgerConstructorItem
                          name={item.name}
                          image={item.image}
                          price={item.price}
                          index={index}
                        />
                      </li>
                    )}
                  </Draggable>
                );
              })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BurgerConstructorList;
