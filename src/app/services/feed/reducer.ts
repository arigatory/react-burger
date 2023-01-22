import { createReducer } from '@reduxjs/toolkit';
import { FeedItem } from '../../models/order';
import { wsConnecting } from './actions';

export type FeedStore = {
  status: string;
  items: FeedItem[];
  error: string;
};

const initialState: FeedStore = {
  status: 'idle',
  items: [],
  error: '',
};

export const feedReducer = createReducer(initialState, (builder) => {
  builder.addCase(wsConnecting, (state) => {
    state.status = 'Connecting...';
  });
});
