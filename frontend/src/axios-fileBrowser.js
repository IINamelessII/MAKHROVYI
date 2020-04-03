import axios from 'axios';
import {baseUrl} from './shared/constants';

const instance = axios.create({
  baseURL: baseUrl
});

instance.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
instance.defaults.xsrfCookieName = 'csrftoken';
instance.defaults.withCredentials = true;

export default instance;