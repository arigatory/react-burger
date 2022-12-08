import axios from 'axios';
import { store } from '../store/configureStore';

axios.defaults.baseURL = 'https://norma.nomoreparties.space/api/';

const responseBody = (response) => response.data;

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

axios.interceptors.request.use((config) => {
  const token = store.getState().account.token;
  if (token) config.headers.Authorization = token.accessToken;
  return config;
});

const requests = {
  get: (url, params) => axios.get(url, { params: params }).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  patch: (url, body) => axios.patch(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Ingredients = {
  list: () => requests.get('/ingredients'),
  details: (ingredientId) => requests.get(`/ingredients/${ingredientId}/`),
};

const Account = {
  login: (values) => requests.post('/auth/login', values),
  register: (values) => requests.post('/auth/register', values),
  logout: (values) => requests.post('/auth/logout', values),
  token: (values) => requests.post('/auth/token', values),
  getProfile: (values) => requests.get('/auth/user', values),
  updateProfile: (values) => requests.patch('/auth/user', values),
  resetPassword: (values) => requests.post('/password-reset/reset', values),
  forgotPassword: (values) => requests.post('/password-reset', values),
};

const agent = {
  Ingredients,
  Account,
};

export default agent;
