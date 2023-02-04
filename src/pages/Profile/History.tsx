import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/redux/configureStore';
import { wsConnect, wsDisconnect } from '../../app/redux/historySlice';
import HistoryList from './HistoryList';

export default function History() {
  const { profile: user } = useAppSelector((state) => state.account);
  const { historyItems, isEstablishingConnection, isConnected, historyLoaded } =
    useAppSelector((state) => state.history);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isConnected && !isEstablishingConnection) {
      dispatch(
        wsConnect(
          `wss://norma.nomoreparties.space/orders?token=${
            user?.accessToken.split(' ')[1]
          }`
        )
      );
    }

    return () => {
      if (isConnected) dispatch(wsDisconnect());
    };
  }, [
    dispatch,
    historyLoaded,
    isConnected,
    isEstablishingConnection,
    user?.accessToken,
  ]);

  return (
    <>
      {!historyLoaded ? (
        <h1>Загрузка заказов...</h1>
      ) : (
        <HistoryList orders={historyItems} />
      )}
    </>
  );
}
