import axios from 'axios';

const instance = axios.create();

instance.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
instance.defaults.xsrfCookieName = 'csrftoken';
instance.defaults.withCredentials = true;

export default instance;