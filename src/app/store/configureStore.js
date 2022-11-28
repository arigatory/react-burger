import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { burgerConstructorSlice } from '../../components/burger-constructor/burgerConstructorSlice';
import { ingredientsSlice } from '../../components/burger-ingredients/ingredientsSlice';
import { ordersSlice } from '../../pages/Orders/ordersSlice';

export const store = configureStore({
  reducer: {
    orders: ordersSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
