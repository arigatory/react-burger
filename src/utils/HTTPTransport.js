export default class HTTPTransport {
  static API_URL = 'https://norma.nomoreparties.space/api';

  constructor(endpoint) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  get(path = '/') {
    return this.request < Response > (this.endpoint + path);
  }

  post(path, data) {
    return this.request < Response > (this.endpoint + path, {
      method: Method.Post,
      data,
    });
  }

  request(url, options) {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = (e) => {

        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === 'get' || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}