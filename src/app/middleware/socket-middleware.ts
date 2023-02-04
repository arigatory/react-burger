import { Middleware } from 'redux';
import { feedSlice } from '../redux/feedSlice';
import { historySlice } from '../redux/historySlice';

export type State = ReturnType<
  typeof feedSlice.reducer | typeof historySlice.reducer
>;
export const socketMiddleware = (
  wsActions: typeof feedSlice.actions | typeof historySlice.actions
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let reconnectTimer;
    let url = '';

    return (next) => (action) => {
      const { dispatch } = store;
      const {
        wsConnect,
        onOpen,
        onError,
        onMessage,
        wsConnecting,
        onClose,
        wsDisconnect,
      } = wsActions;
      if (wsConnect?.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
        console.log(`Connecting to ${url}`);
        isConnected = true;
        dispatch(wsConnecting());
      }
      if (wsDisconnect?.match(action)) {
        url = '';
        socket?.close();
        isConnected = false;
        socket = null;
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError(event.toString()));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, orders, total, totalToday } = parsedData;
          if (success) dispatch(onMessage({ orders, total, totalToday }));
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            console.log('Закрытие сокета произошло с ошибкой');
            dispatch(onError(event.code.toString()));
          }
          console.log('close');
          dispatch(onClose());

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 3000);
          }
        };
      }

      next(action);
    };
  };
};
