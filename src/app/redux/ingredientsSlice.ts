import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import agent from '../api/agent';
import { Ingredient } from '../models/ingredient';
import { RootState } from './configureStore';

interface IngredientsState {
  ingredientsLoaded: boolean;
  status: string;
  ingredients: Ingredient[];
}

const ingredientsAdapter = createEntityAdapter<Ingredient>({
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
  initialState: ingredientsAdapter.getInitialState<IngredientsState>({
    ingredientsLoaded: false,
    status: 'idle',
    ingredients: [],
  }),
  reducers: {
    setIngredients(state, action) {
      state.ingredients = action.payload;
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

export const ingredientsSelectors = ingredientsAdapter.getSelectors(
  (state: RootState) => state.ingredients
);

export const { setIngredients } =
  ingredientsSlice.actions;
