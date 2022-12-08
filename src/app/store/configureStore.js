import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { accountSlice } from '../../pages/account/accountSlice';
import { burgerConstructorSlice } from '../../pages/Constructor/constructorSlice';
import { ingredientsSlice } from '../../pages/Constructor/ingredientsSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer,
    account: accountSlice.reducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
