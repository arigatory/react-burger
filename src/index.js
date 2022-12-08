import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app/layout/App';
import { store } from './app/store/configureStore';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
