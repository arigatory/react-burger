import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { FeedItem } from '../models/order';
import { RootState } from './configureStore';

interface HistoryState {
  historyLoaded: boolean;
  status: string;
  historyItems: FeedItem[];
  isEstablishingConnection: boolean;
  isConnected: boolean;
  url: string | null;
}

const historyAdapter = createEntityAdapter<FeedItem>({
  selectId: (item) => item._id,
});

export const initialState = historyAdapter.getInitialState<HistoryState>({
  historyLoaded: false,
  status: 'idle',
  historyItems: [],
  isConnected: false,
  isEstablishingConnection: false,
  url: null,
})

export const historySlice = createSlice({
  name: 'history',
  initialState: initialState,
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
      console.log('History connected...');
    },
    onClose(state) {
    },
    onError(state, action) {
      console.log('History error...', action.payload);
    },
    onMessage(state, action) {
      historyAdapter.setAll(state, action.payload.orders);
      state.historyItems = action.payload.orders;
      state.historyLoaded = true;
    },
    wsConnecting(state) {
      console.log('Connecting history...');
    },
    wsDisconnect(state) {
      console.log('History disconnected...');
    },
  },
});

export const historySelectors = historyAdapter.getSelectors(
  (state: RootState) => state.history
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
} = historySlice.actions;
