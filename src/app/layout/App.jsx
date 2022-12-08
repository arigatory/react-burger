import Constructor from '../../pages/Constructor/Constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from './app-header/app-header';
import styles from './App.module.css';
import { Switch, Route } from 'react-router-dom';
import Login from '../../pages/account/Login/Login';
import NotFound from '../../pages/NotFound/NotFound';
import Register from '../../pages/account/Register/Register';
import ForgotPassword from '../../pages/account/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/account/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import IngredientDetail from '../../pages/IngredientDetail/IngredientDetail';
import Orders from '../../pages/Orders/Orders';
import { useAppDispatch } from '../store/configureStore';
import { useCallback, useEffect } from 'react';
import { fetchProfile } from '../../pages/account/accountSlice';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const dispatch = useAppDispatch();
  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchProfile());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    // <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <div className={styles.body}>
        <AppHeader />
        <Switch>
          <Route exact path="/" component={Constructor} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route exact path="/ingredients/:id" component={IngredientDetail} />
          <Route exact path="/orders" component={Orders} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </DndProvider>
    // </Provider>
  );
};

export default App;
