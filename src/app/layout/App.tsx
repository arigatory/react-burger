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
import Errors from '../../pages/Errors/Errors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  let location = useLocation<any>();
  const { ingredientsLoaded } = useAppSelector((state) => state.ingredients);

  const dispatch = useAppDispatch();
  const initApp = useCallback(async () => {
    try {
      if (!ingredientsLoaded) dispatch(loadIngredientsAsync());
      dispatch(fetchProfile());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, ingredientsLoaded]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  let background = location.state && location.state.background;

  return (
    <div className={styles.body}>
      <ToastContainer position="bottom-right" hideProgressBar/>

      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <Switch location={background || location}>
          <Route exact path="/" component={Constructor} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route exact path="/ingredients/:id" component={IngredientDetail} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/errors" component={Errors} />
          <Route component={NotFound} />
        </Switch>
      </DndProvider>
      {background && (
        <Route
          path="/ingredients/:id"
          children={
            <Modal onClose={history.goBack}>
              <IngredientDetail />
            </Modal>
          }
        />
      )}
    </div>
  );
};

export default App;
