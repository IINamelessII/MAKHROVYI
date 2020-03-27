import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000' //DEV
});

instance.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
instance.defaults.xsrfCookieName = 'csrftoken';
instance.defaults.withCredentials = true;

export default instance;