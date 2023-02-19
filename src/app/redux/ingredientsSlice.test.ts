import {
  loadIngredientsAsync,
  ingredientsSlice,
  setIngredients,
  initialState
} from './ingredientsSlice';

jest.mock('../api/agent', () => jest.fn());

describe('Ingredients reducer tests', () => {
  it('Should handle setIngredients', () => {
    const ingredients = [
      { _id: '1', name: 'ingredient1' },
      { _id: '2', name: 'ingredient2' },
    ];
    const nextState = ingredientsSlice.reducer(
      initialState,
      setIngredients(ingredients)
    );
    expect(nextState).toEqual({
      ...initialState,
      ingredients: ingredients,
    });
  });

  it('Should handle loadIngredientsAsync.pending', () => {
    const nextState = ingredientsSlice.reducer(
      initialState,
      loadIngredientsAsync.pending
    );
    expect(nextState).toEqual({
      ...initialState,
      status: 'pendingLoadIngredients',
    });
  });

  it('Should handle loadIngredientsAsync.rejected', () => {
    const nextState = ingredientsSlice.reducer(
      initialState,
      loadIngredientsAsync.rejected(new Error('error'), '')
    );
    expect(nextState).toEqual({
      ...initialState,
      status: 'idle',
    });
  });
});
