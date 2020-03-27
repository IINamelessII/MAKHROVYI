import * as actionTypes from './actionTypes';
import axios from '../../axios-auth';

export const setUserData = (data) => {
  return {
    type: actionTypes.SET_USER_DATA,
    data: data
  };
};

export const login = () => {
  return dispatch => {
    axios.get('/accounts/google/login/')
      .then(response => {
        console.log(response);
      });
  };
};

export const logout = () => {
  return dispatch => {
    axios.post('/accounts/logout/')
      .then(response => {
        dispatch(loadUserData());
      });
  };
};

export const loadUserData = () => {
  return dispatch => {
    axios.get('/user_data/')
      .then(response => {
        dispatch(setUserData(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
