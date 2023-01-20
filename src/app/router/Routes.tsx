import { Navigate, RouteObject } from 'react-router';
import App from '../layout/App';
import Login from '../../pages/account/Login/Login';
import Register from '../../pages/account/Register/Register';
import NotFound from '../../pages/NotFound/NotFound';
import Errors from '../../pages/Errors/Errors';
import Profile from '../../pages/Profile/Profile';
import ForgotPassword from '../../pages/account/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/account/ResetPassword/ResetPassword';
import IngredientDetail from '../../pages/IngredientDetail/IngredientDetail';
import Orders from '../../pages/Orders/Orders';
import { createBrowserRouter } from 'react-router-dom';
import Constructor from '../../pages/Constructor/Constructor';
import About from '../../pages/Profile/About';
import History from '../../pages/Profile/History';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
      {
        path: 'profile/*',
        element: <Profile />,
        children: [
          { path: 'about', element: <About /> },
          { path: 'history', element: <History /> },
        ],
      },
      { path: 'ingredients/:id', element: <IngredientDetail /> },
      { path: 'orders', element: <Orders /> },
      { path: 'constructor', element: <Constructor /> },
      { path: 'errors', element: <Errors /> },
      { path: 'not-found', element: <NotFound /> },
      { path: '*', element: <Navigate replace to="not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
