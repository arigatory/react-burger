import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import agent from '../../app/api/agent';

const ingredientsAdapter = createEntityAdapter({
  selectId: (item) => item._id,
});

export const loadIngredientsAsync = createAsyncThunk(
  'ingredients/loadIngredientsAsync',
  async () => {
    try {
      return (await agent.Ingredients.list()).data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loadIngredientAsync = createAsyncThunk(
  'ingredients/loadIngredientAsync',
  async (ingredientId) => {
    try {
      return (await agent.Ingredients.list()).data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: ingredientsAdapter.getInitialState({
    ingredientsLoaded: false,
    status: 'idle',
    ingredients: [],
  }),
  reducers: {
    setIngredients(state, action) {
      state.ingredients = action.payload;
    },
    viewIngredient(state, action) {
      state.currentIngredient = action.payload;
    },
    closeIngredient(state) {
      state.currentIngredient = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadIngredientsAsync.pending, (state) => {
      state.status = 'pendingLoadIngredients';
    });
    builder.addCase(loadIngredientsAsync.fulfilled, (state, action) => {
      ingredientsAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.ingredientsLoaded = true;
    });
    builder.addCase(loadIngredientsAsync.rejected, (state) => {
      state.status = 'idle';
    });
  },
});

export const ingredientsSelectors = ingredientsAdapter.getSelectors(state => state.ingredients);

export const { setIngredients, viewIngredient, closeIngredient } =
  ingredientsSlice.actions;
