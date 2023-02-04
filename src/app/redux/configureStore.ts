import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { accountSlice } from './accountSlice';
import { burgerConstructorSlice } from './constructorSlice';
import { ingredientsSlice } from './ingredientsSlice';
import { socketMiddleware } from '../middleware/socket-middleware';
import { feedSlice } from './feedSlice';
import { historySlice } from './historySlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer,
    account: accountSlice.reducer,
    feed: feedSlice.reducer,
    history: historySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([socketMiddleware(feedSlice.actions), socketMiddleware(historySlice.actions)])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
