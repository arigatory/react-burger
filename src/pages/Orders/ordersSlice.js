import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: 42,
  title: 'Заказы',
};

export const ordersSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action) => {
      state.data += action.payload;
    },
    decrement: (state, action) => {
      state.data -= action.payload;
    },
  },
});

export const { increment, decrement } = ordersSlice.actions;
