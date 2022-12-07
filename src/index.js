import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app/layout/App';
import { store } from './app/store/configureStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
