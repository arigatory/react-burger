import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useActions } from '../../hooks/useActions';
import styles from './burger-constructor-list.module.css';
import PropTypes from 'prop-types';
import { draggableIngredientPropTypes } from '../../utils/constants';


const BurgerConstructorList = ({ ingredients }) => {
  const { moveIngredient } = useActions();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    moveIngredient(result.draggableId);
    moveIngredient(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="ingredients">
        {(provided) => (
          <ul {...provided.droppableProp} ref={provided.innerRef}>
            {ingredients &&
              ingredients.length > 0 &&
              ingredients.map((item, index) => {
                return (
                  <Draggable
                    key={item.dragId}
                    draggableId={item.dragId}
                    index={index}
                  >
                    {(provided) => (
                      <li className={styles.item}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <BurgerConstructorItem
                          name={item.name}
                          image={item.image}
                          price={item.price}
                          id={item._id}
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

BurgerConstructorItem.propTypes = {
  ingredients: PropTypes.arrayOf(draggableIngredientPropTypes),
};

export default BurgerConstructorList;
