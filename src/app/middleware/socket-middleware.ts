import { Middleware } from 'redux';
import { feedSlice } from '../redux/feedSlice';

export type State = ReturnType<typeof feedSlice.reducer>;
export const socketMiddleware = (
  wsActions: typeof feedSlice.actions
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let reconnectTimer;
    let url = '';

    return (next) => (action) => {
      const { dispatch } = store;
      const { wsConnect, onOpen, onClose, onError, onMessage, wsConnecting } =
        wsActions;
      if (wsConnect?.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
        console.log(socket, 'Connecting...');
        isConnected = true;
        dispatch(wsConnecting());
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
            console.log('error');
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
