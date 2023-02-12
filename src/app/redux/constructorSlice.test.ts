import {
  addIngredient,
  burgerConstructorSlice,
  removeIngredient,
  moveIngredient,
} from './constructorSlice';

jest.mock('../api/agent', () => jest.fn());
jest.mock('../router/Routes', () => jest.fn());

describe('burgerConstructorSlice', () => {
  describe('addIngredient', () => {
    it('should add a bun to the state', () => {
      const initialState = {
        selectedBun: null,
        selectedIngredients: [],
        order: null,
        status: 'idle',
        loading: false,
      };

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
      const initialState = {
        selectedBun: null,
        selectedIngredients: [],
        order: null,
        status: 'idle',
        loading: false,
      };

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
  describe('removeIngredient reducer', () => {
    it('should remove ingredient at given index', () => {
      const state = {
        selectedBun: { id: 1, type: 'bun', name: 'Sesame seed bun', price: 2 },
        selectedIngredients: [
          { id: 1, type: 'meat', name: 'Beef patty', price: 3 },
          { id: 2, type: 'cheese', name: 'Cheddar cheese', price: 1.5 },
          { id: 3, type: 'sauce', name: 'Ketchup', price: 0.5 },
        ],
        order: null,
        status: 'idle',
        loading: false,
      };
      const index = 1;
      const action = removeIngredient(index);
      const newState = burgerConstructorSlice.reducer(state, action);
      expect(newState.selectedIngredients).toEqual([
        { id: 1, type: 'meat', name: 'Beef patty', price: 3 },
        { id: 3, type: 'sauce', name: 'Ketchup', price: 0.5 },
      ]);
    });
  });
  describe('moveIngredient reducer', () => {
    it('should move an ingredient from index i to index j', () => {
      const initialState: ReturnType<
        typeof burgerConstructorSlice.getInitialState
      > = {
        selectedBun: null,
        selectedIngredients: [
          {
            dragId: '1',
            name: 'lettuce',
            type: 'lettuce',
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
          },
          {
            dragId: '2',
            name: 'lettuce',
            type: 'lettuce',
            _id: '2',
            proteins: 2,
            fat: 2,
            carbohydrates: 2,
            calories: 3,
            price: 3,
            image: 'no',
            image_mobile: 'no',
            image_large: 'no',
            __v: 2,
          },
          {
            dragId: '3',
            name: 'lettuce',
            type: 'lettuce',
            _id: '3',
            proteins: 2,
            fat: 2,
            carbohydrates: 2,
            calories: 3,
            price: 3,
            image: 'no',
            image_mobile: 'no',
            image_large: 'no',
            __v: 2,
          },
        ],
        order: null,
        status: 'idle',
        loading: false,
      };

      const nextState = {
        selectedBun: null,
        selectedIngredients: [
          {
            dragId: '1',
            name: 'lettuce',
            type: 'lettuce',
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
          },
          {
            dragId: '3',
            name: 'lettuce',
            type: 'lettuce',
            _id: '3',
            proteins: 2,
            fat: 2,
            carbohydrates: 2,
            calories: 3,
            price: 3,
            image: 'no',
            image_mobile: 'no',
            image_large: 'no',
            __v: 2,
          },
          {
            dragId: '2',
            name: 'lettuce',
            type: 'lettuce',
            _id: '2',
            proteins: 2,
            fat: 2,
            carbohydrates: 2,
            calories: 3,
            price: 3,
            image: 'no',
            image_mobile: 'no',
            image_large: 'no',
            __v: 2,
          },
        ],
        order: null,
        status: 'idle',
        loading: false,
      };

      const action = moveIngredient({ i: 1, j: 2 });
      const result = burgerConstructorSlice.reducer(initialState, action);

      expect(result).toEqual(nextState);
    });
  });
});
