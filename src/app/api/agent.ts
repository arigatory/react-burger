import axios, { AxiosError, AxiosResponse } from 'axios';
import { store } from '../redux/configureStore';
import { Order } from '../models/order';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://norma.nomoreparties.space/api/';

const responseBody = (response: AxiosResponse) => response.data;

export interface ResponseData {
  data: {
    message: string;
    success: boolean;
  };
  status: number;
}

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as ResponseData;
    switch (status) {
      case 401:
        toast.error(data.message);
        break;
      case 403:
        toast.error(data.message);
        break;
      case 404:
        toast.error('Not found');
        break;
      default:
        break;
    }
    console.log('Error cought by my interceptor');

    return Promise.reject(error.response);
  }
);

// axios.interceptors.request.use((config) => {
//   const token = store.getState().account.token;
//   if (token) config.headers.Authorization = token.accessToken;
//   return config;
// });

const requests = {
  get: (url: string, params?: {}) =>
    axios.get(url, { params: params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  patch: (url: string, body: {}) => axios.patch(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Ingredients = {
  list: () => requests.get('/ingredients'),
};

const Orders = {
  post: (order: Order) => requests.post('/orders', order),
};

const Account = {
  login: (values: {}) => requests.post('/auth/login', values),
  register: (values: {}) => requests.post('/auth/register', values),
  logout: (values: {}) => requests.post('/auth/logout', values),
  token: (values: {}) => requests.post('/auth/token', values),
  getProfile: (values?: {}) => requests.get('/auth/user', values),
  updateProfile: (values: {}) => requests.patch('/auth/user', values),
  resetPassword: (values: {}) => requests.post('/password-reset/reset', values),
  forgotPassword: (values: {}) => requests.post('/password-reset', values),
};

const TestErrors = {
  get401Error: () =>
    requests.post('/auth/token', {
      token:
        'fcfe8564e257e6536fafed0d5930b0681204afde39e7e964e828fa4d2f7df066aa3c0d9d081c4cfc',
    }),
  get403Error: () => {
    const config = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODJhNTM2OWI1MThhMDAxYmI4ODE1ZiIsImlhdCI6MTY3MDQzNzU5NiwiZXhwIjoxNjcwNDM4Nzk2fQ.HJA3wl4qHmEIuYdBd2BcBdBSgfYByKuIDEooISrzIbs',
      },
    };
    const uninterceptedAxiosInstance = axios.create();

    uninterceptedAxiosInstance.interceptors.response.use(
      async (response) => {
        return response;
      },
      (error: AxiosError) => {
        const { data } = error.response as ResponseData;
        toast.error(data.message);
        console.log('Error cought by my interceptor');

        return Promise.reject(error.response);
      }
    );
    return uninterceptedAxiosInstance.get('/auth/user', config);
  },
  get404Error: () => requests.get('/ingredient'),
  getValidationError: () => requests.get('/ingredient'),
};

const agent = {
  Ingredients,
  Account,
  Orders,
  TestErrors,
};

export default agent;
