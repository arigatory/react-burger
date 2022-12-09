import Constructor from '../../pages/Constructor/Constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from './app-header/app-header';
import styles from './App.module.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import Login from '../../pages/account/Login/Login';
import NotFound from '../../pages/NotFound/NotFound';
import Register from '../../pages/account/Register/Register';
import ForgotPassword from '../../pages/account/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/account/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import IngredientDetail from '../../pages/IngredientDetail/IngredientDetail';
import Orders from '../../pages/Orders/Orders';
import { useAppDispatch, useAppSelector } from '../redux/configureStore';
import { useCallback, useEffect } from 'react';
import { fetchProfile } from '../redux/accountSlice';
import ProtectedRoute from './ProtectedRoute';
import Modal from '../components/modal/modal';
import { history } from '../..';
import { loadIngredientsAsync } from '../redux/ingredientsSlice';

const App = () => {
  let location = useLocation();
  const { ingredientsLoaded } = useAppSelector(
    (state) => state.ingredients
  );

  const dispatch = useAppDispatch();
  const initApp = useCallback(async () => {
    try {
      if (!ingredientsLoaded) await dispatch(loadIngredientsAsync());
      await dispatch(fetchProfile());

    } catch (error) {
      console.log(error);
    }
  }, [dispatch, ingredientsLoaded]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  let background = location.state && location.state.background;

  return (
    // <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <div className={styles.body}>
        <AppHeader />
        <Switch location={background || location}>
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
        {background && <Route path="/ingredients/:id" children={<Modal onClose={history.goBack}><IngredientDetail/></Modal>} />}
      </div>
    </DndProvider>
    // </Provider>
  );
};

export default App;
