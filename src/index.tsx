import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/redux/configureStore';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app/layout/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
