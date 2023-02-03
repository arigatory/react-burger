import {
  createRoutesFromElements,
  Navigate,
  Route,
  RouteObject,
  Routes,
  useNavigate,
} from 'react-router';
import App from '../layout/App';
import Login from '../../pages/account/Login/Login';
import Register from '../../pages/account/Register/Register';
import NotFound from '../../pages/NotFound/NotFound';
import Errors from '../../pages/Errors/Errors';
import Profile from '../../pages/Profile/Profile';
import ForgotPassword from '../../pages/account/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/account/ResetPassword/ResetPassword';
import IngredientDetail from '../../pages/IngredientDetail/IngredientDetail';
import Feed from '../../pages/feed/Feed';
import { createBrowserRouter } from 'react-router-dom';
import Constructor from '../../pages/Constructor/Constructor';
import About from '../../pages/Profile/About';
import History from '../../pages/Profile/History';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Constructor />} />
      <Route path={'login'} element={<Login />} />
      <Route path={'register'} element={<Register />} />
      <Route path={'forgot-password'} element={<ForgotPassword />} />
      <Route path={'reset-password'} element={<ResetPassword />} />
      <Route path={'/profile/*'} element={<Profile />}>
        <Route index={true} element={<About />} />
        <Route path={'about'} element={<About />} />
        <Route path={'history'} element={<History />} />
      </Route>
      <Route path={'ingredients/:id'} element={<IngredientDetail />} />
      <Route path={'feed'} element={<Feed />} />
      <Route path={'constructor'} element={<Constructor />} />
      <Route path={'errors'} element={<Errors />} />
      <Route path={'not-found'} element={<NotFound />} />
      <Route path={'*'} element={<Navigate replace to="not-found" />} />
    </Route>
  )
);
