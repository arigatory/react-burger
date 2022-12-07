import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/api';
import { BURGER_API_URL } from '../../utils/constants';

const initialState = {
  selectedBun: null,
  selectedIngredients: [],
  order: null,
  status: 'idle',
  loading: false,
};

export const postOrderAsync = createAsyncThunk(
  'order/postOrder',
  async (ids) => {
    try {
      const body = {
        ingredients: ids
      };
      const response = await request(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      return response.order;
    } catch (error) {
      console.log(error);
    }
  }
);


export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.selectedBun = action.payload;
      } else {
        state.selectedIngredients = [
          ...state.selectedIngredients,
          action.payload,
        ];
      }
    },
    removeIngredient: (state, action) => {
      state.selectedIngredients = [
        ...state.selectedIngredients.slice(0, action.payload),
        ...state.selectedIngredients.slice(action.payload + 1),
      ];
    },
    moveIngredient: (state, action) => {
      const ingredients = [...state.selectedIngredients];
      const temp = ingredients[action.payload.i];
      ingredients[action.payload.i] = ingredients[action.payload.j];
      ingredients[action.payload.j] = temp;
      state.selectedIngredients = [...ingredients];
    },
    closeOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrderAsync.pending, (state) => {
      state.loading = true;
      state.status = 'pendingPostOrder';
    });
    builder.addCase(postOrderAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loading = false;
      state.order = action.payload;
      state.selectedBun = null;
      state.selectedIngredients = [];
    });
    builder.addCase(postOrderAsync.rejected, (state) => {
      state.status = 'errorPostOrder';
    });
  }
});

export const { addIngredient, removeIngredient, moveIngredient, closeOrder } =
  burgerConstructorSlice.actions;
