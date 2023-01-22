import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from './app-header/app-header';
import styles from './App.module.css';
import {
  useLocation,
  Outlet,
  useNavigate,
  Routes,
  Route,
} from 'react-router-dom';
import IngredientDetail from '../../pages/IngredientDetail/IngredientDetail';
import { useAppDispatch, useAppSelector } from '../redux/configureStore';
import { useCallback, useEffect } from 'react';
import { fetchProfile } from '../redux/accountSlice';
import Modal from '../components/modal/modal';
import { loadIngredientsAsync } from '../redux/ingredientsSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigate = useNavigate();
  let location = useLocation();
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
        <Outlet />
      </DndProvider>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={() => navigate(-1)}>
                <IngredientDetail />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
