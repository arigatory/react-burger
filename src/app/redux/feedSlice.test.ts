import {
  feedSlice,
  wsConnect,
  wsSendMessage,
  onOpen,
  onClose,
  onError,
  wsConnecting,
} from './feedSlice';

jest.mock('../api/agent', () => jest.fn());
jest.mock('../router/Routes', () => jest.fn());

describe('feedSlice reducers', () => {
  it('should handle wsConnect', () => {
    const initialState = feedSlice.getInitialState();
    const url = 'ws://localhost:3000';
    const newState = feedSlice.reducer(
      initialState,
      wsConnect( url )
    );
    expect(newState.isConnected).toBe(false);
    expect(newState.url).toBe(url);
    expect(newState.isEstablishingConnection).toBe(true);
  });

  it('should handle wsSendMessage', () => {
    const initialState = feedSlice.getInitialState();
    const newState = feedSlice.reducer(initialState, wsSendMessage());
    expect(newState.isConnected).toBe(true);
    expect(newState.isEstablishingConnection).toBe(false);
  });

  it('should handle onOpen', () => {
    const initialState = feedSlice.getInitialState();
    const newState = feedSlice.reducer(initialState, onOpen());
    expect(newState.isEstablishingConnection).toBe(false);
    expect(newState.isConnected).toBe(true);
  });

  it('should handle onClose', () => {
    const initialState = feedSlice.getInitialState();
    const newState = feedSlice.reducer(initialState, onClose());
    expect(newState).toEqual(initialState);
  });

  it('should handle onError', () => {
    const initialState = feedSlice.getInitialState();
    const error = new Error('Test error');
    const newState = feedSlice.reducer(
      initialState,
      onError({ payload: error })
    );
    expect(newState).toEqual(initialState);
  });

  it('should handle wsConnecting', () => {
    const initialState = feedSlice.getInitialState();
    const newState = feedSlice.reducer(initialState, wsConnecting());
    expect(newState).toEqual(initialState);
  });
});
