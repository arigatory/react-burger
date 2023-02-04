import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { FeedItem } from '../models/order';
import { RootState } from './configureStore';

interface FeedState {
  feedLoaded: boolean;
  status: string;
  feedItems: FeedItem[];
  isEstablishingConnection: boolean;
  isConnected: boolean;
  url: string | null;
  total: number | null;
  totalToday: number | null;
}

const feedAdapter = createEntityAdapter<FeedItem>({
  selectId: (item) => item._id,
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState: feedAdapter.getInitialState<FeedState>({
    feedLoaded: false,
    status: 'idle',
    feedItems: [],
    isConnected: false,
    isEstablishingConnection: false,
    url: null,
    total: null,
    totalToday: null,
  }),
  reducers: {
    wsConnect(state, action) {
      state.isConnected = false;
      state.url = action.payload;
      state.isEstablishingConnection = true;
    },
    wsSendMessage(state) {
      state.isConnected = true;
      state.isEstablishingConnection = false;
    },
    onOpen(state) {
      state.isEstablishingConnection = false;
      state.isConnected = true;
      console.log('Feed connected...');
    },
    onClose(state) {
    },
    onError(state, action) {
      console.log('Feed error...', action.payload);
    },
    onMessage(state, action) {
      feedAdapter.setAll(state, action.payload.orders);
      state.feedItems = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.feedLoaded = true;
    },
    wsConnecting(state) {},
    wsDisconnect(state) {
      console.log('Feed disconnected...');
    },
  },
});

export const feedSelectors = feedAdapter.getSelectors(
  (state: RootState) => state.feed
);

export const {
  wsConnect,
  wsSendMessage,
  onOpen,
  onClose,
  onError,
  onMessage,
  wsConnecting,
  wsDisconnect,
} = feedSlice.actions;
