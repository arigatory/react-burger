import axios from 'axios';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

axios.defaults.baseURL = 'https://norma.nomoreparties.space/api/';
// axios.defaults.withCredentials = true;

const responseBody = (response) => response.data;

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error) => {
    const { data, status } = error;
    console.log('Error', status, data);
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url, params) => axios.get(url, { params: params }).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Ingredients = {
  list: () => requests.get('/ingredients'),
  details: (ingredientId) => requests.get(`/ingredients/${ingredientId}/`),
};

const Account = {
  login: (values) => requests.post('/login/', values),
  register: (values) => requests.post('/register/', values),
  resetPassword: (values) => requests.post('/password-reset/reset', values),
  forgotPassword: (values) => requests.post('/password-reset/', values),
};

const agent = {
  Ingredients,
  Account,
};

export default agent;
