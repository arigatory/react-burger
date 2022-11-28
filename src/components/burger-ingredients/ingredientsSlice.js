import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/api';
import { BURGER_API_URL } from '../../utils/constants';

const initialState = {
  ingredientsLoaded: false,
  status: 'idle',
  ingredients: {
    buns: [],
    sauces: [],
    mains: [],
  },
  currentIngredient: null,
};

export const loadIngredientsAsync = createAsyncThunk(
  'ingredients/loadIngredientsAsync',
  async () => {
    try {
      const response = await request(`${BURGER_API_URL}/ingredients`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
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
      const buns = action.payload.filter((item) => item.type === 'bun');
      const sauces = action.payload.filter((item) => item.type === 'sauce');
      const mains = action.payload.filter((item) => item.type === 'main');
      state.ingredients = {
        buns: buns,
        sauces: sauces,
        mains: mains,
      };
      state.status = 'idle';
      state.ingredientsLoaded = true;
    });
    builder.addCase(loadIngredientsAsync.rejected, (state) => {
      state.status = 'idle';
    });
  },
});

export const { setIngredients, viewIngredient, closeIngredient } =
  ingredientsSlice.actions;
