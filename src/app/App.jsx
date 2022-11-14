import Constructor from '../pages/Constructor/Constructor';
import { Provider } from 'react-redux';
import { store } from '../state';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from '../components/app-header/app-header';
import styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import Register from '../pages/Register/Register';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Profile from '../pages/Profile/Profile';
import IngredientDetail from '../pages/IngredientDetail/IngredientDetail';
import Orders from '../pages/Orders/Orders';


const App = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.body}>
          <Router>
            <AppHeader />
            <Switch>
              <Route exact path="/" component={Constructor} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/reset-password" component={ResetPassword} />
              <Route exact path="/profile" component={Profile } />
              <Route exact path="/ingredients" component={IngredientDetail} />
              <Route exact path="/orders" component={Orders} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      </DndProvider>
    </Provider>
  );
};

export default App;
