import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../redux/configureStore';

interface Props extends RouteProps {
  component: any ;
}


export default function ProtectedRoute({
  component: Component,
  ...rest
}: Props) {
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
