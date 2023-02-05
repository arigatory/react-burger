import { Navigate, PathRouteProps, Route } from 'react-router-dom';
import { useAppSelector } from '../redux/configureStore';

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { profile: user } = useAppSelector((state) => state.account);
  return user ? children : <Navigate to="/login" replace />;
}
