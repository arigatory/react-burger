import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from './app-header/app-header';
import styles from './App.module.css';
import {
  useLocation,
  useNavigate,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import IngredientDetail from '../../pages/IngredientDetail/IngredientDetail';
import { useAppDispatch, useAppSelector } from '../redux/configureStore';
import { useCallback, useEffect } from 'react';
import { fetchProfile } from '../redux/accountSlice';
import Modal from '../components/modal/modal';
import { loadIngredientsAsync } from '../redux/ingredientsSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Constructor from '../../pages/Constructor/Constructor';
import Login from '../../pages/account/Login/Login';
import Register from '../../pages/account/Register/Register';
import ForgotPassword from '../../pages/account/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/account/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import About from '../../pages/Profile/About';
import History from '../../pages/Profile/History';
import Feed from '../../pages/feed/Feed';
import Errors from '../../pages/Errors/Errors';
import NotFound from '../../pages/NotFound/NotFound';
import OrderDetail from '../../pages/orderDetail/OrderDetail';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;
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

  return (
    <div className={styles.body}>
      <ToastContainer position="bottom-right" hideProgressBar />

      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <Routes location={background || location}>
          <Route index={true} element={<Constructor />} />
          <Route path={'login'} element={<Login />} />
          <Route path={'register'} element={<Register />} />
          <Route path={'forgot-password'} element={<ForgotPassword />} />
          <Route path={'reset-password'} element={<ResetPassword />} />
          <Route
            path={'/profile/*'}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index={true} element={<About />} />
            <Route path={'about'} element={<About />} />
            <Route path={'orders'} element={<History />} />
          </Route>
          <Route path={'ingredients/:id'} element={<IngredientDetail />} />
          <Route path={'feed/:id'} element={<OrderDetail />} />
          <Route path={'feed'} element={<Feed />} />
          <Route path={'constructor'} element={<Constructor />} />
          <Route path={'errors'} element={<Errors />} />
          <Route path={'not-found'} element={<NotFound />} />
          <Route path={'*'} element={<Navigate replace to="not-found" />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path="ingredients/:id"
              element={
                <Modal onClose={() => navigate(-1)}>
                  <IngredientDetail />
                </Modal>
              }
            />
            <Route
              path="feed/:id"
              element={
                <Modal onClose={() => navigate(-1)}>
                  <OrderDetail />
                </Modal>
              }
            />
            <Route
              path="orders/:id"
              element={
                <Modal onClose={() => navigate(-1)}>
                  <OrderDetail />
                </Modal>
              }
            />
          </Routes>
        )}
      </DndProvider>
    </div>
  );
};

export default App;
