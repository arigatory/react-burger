import {
  Redirect,
  Route,
} from 'react-router-dom';
import { useAppSelector } from '../redux/configureStore';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { user } = useAppSelector((state) => state.account);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
