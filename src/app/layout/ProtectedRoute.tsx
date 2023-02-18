import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/configureStore';

interface RProps {
  backUrl?: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<PropsWithChildren<RProps>> = ({
  backUrl,
  children,
}) => {
  const { profile: user } = useAppSelector((state) => state.account);
  return user ? (
    <>{children}</>
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: backUrl || window.location.pathname }}
    />
  );
};

export default ProtectedRoute;
