import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/redux/configureStore';
import { wsConnect } from '../../app/redux/historySlice';
import FeedList from '../feed/FeedList';

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
  }, [dispatch, isConnected, isEstablishingConnection, user?.accessToken]);

  return (
    <>
      {!historyLoaded ? (
        <h1>Загрузка заказов...</h1>
      ) : (
        <FeedList orders={historyItems} reverse/>
      )}
    </>
  );
}
