import {
  addIngredient,
  burgerConstructorSlice,
  removeIngredient,
  moveIngredient,
  initialState,
} from './constructorSlice';

jest.mock('../api/agent', () => jest.fn());

describe('burgerConstructorSlice', () => {
  describe('addIngredient', () => {
    it('should add a bun to the state', () => {
      const bun = {
        type: 'bun',
        id: 1,
        name: 'Sesame Seed Bun',
        price: 0.5,
      };

      const nextState = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(bun)
      );
      expect(nextState.selectedBun).toEqual(bun);
      expect(nextState.selectedIngredients).toEqual([]);
    });

    it('should add an ingredient to the state', () => {
      const ingredient = {
        type: 'ingredient',
        id: 2,
        name: 'Lettuce',
        price: 0.2,
      };

      const nextState = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(ingredient)
      );
      expect(nextState.selectedBun).toEqual(null);
      expect(nextState.selectedIngredients).toEqual([ingredient]);
    });
  });

  const item = {
    dragId: '1',
    name: 'lettuce',
    type: 'bun',
    _id: '1',
    proteins: 2,
    fat: 2,
    carbohydrates: 2,
    calories: 3,
    price: 3,
    image: 'no',
    image_mobile: 'no',
    image_large: 'no',
    __v: 2,
  };
  const item1 = item;
  const item2 = { ...item, dragId: '2', _id: '2' };
  const item3 = { ...item, dragId: '3', _id: '3' };

  describe('removeIngredient reducer', () => {
    it('should remove ingredient at given index', () => {
      const state = {
        selectedBun: item,
        selectedIngredients: [item1, item2, item3],
        order: null,
        status: 'idle',
        loading: false,
      };
      const index = 1;
      const action = removeIngredient(index);
      const newState = burgerConstructorSlice.reducer(state, action);
      expect(newState.selectedIngredients).toEqual([item1, item3]);
    });
  });

  describe('moveIngredient reducer', () => {
    it('should move an ingredient from index i to index j', () => {
      const beforeTestState = {
        ...initialState,
        selectedIngredients: [item1, item2, item3],
      };
      const nextState = {
        ...initialState,
        selectedIngredients: [item1, item3, item2],
      };

      const action = moveIngredient({ i: 1, j: 2 });
      const result = burgerConstructorSlice.reducer(beforeTestState, action);

      expect(result).toEqual(nextState);
    });
  });
});
