import { historySlice } from './historySlice';
import {
  wsConnect,
  onOpen,
  onClose,
} from './historySlice';

describe('historySlice', () => {
  it('wsConnect', () => {
    const initialState = historySlice.getInitialState();
    const url = 'wss://norma.nomoreparties.space/orders/all';

    const newState = historySlice.reducer(initialState, wsConnect(url));

    expect(newState.isConnected).toBe(false);
    expect(newState.url).toBe(url);
    expect(newState.isEstablishingConnection).toBe(true);
  });

  it('onOpen', () => {
    const initialState = historySlice.getInitialState();
    const newState = historySlice.reducer(initialState, onOpen());
    expect(newState.isEstablishingConnection).toBe(false);
    expect(newState.isConnected).toBe(true);
  });

  it('onClose', () => {
    const initialState = historySlice.getInitialState();
    const newState = historySlice.reducer(initialState, onClose());
    expect(newState).toEqual({
      ...initialState,
      isConnected: false,
    });
  });
});
