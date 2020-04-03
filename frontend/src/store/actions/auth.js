import * as actionTypes from './actionTypes';
import axios from '../../axios-auth';
import * as messageActions from './messages';

export const setUserData = (data) => {
  return {
    type: actionTypes.SET_USER_DATA,
    data: data
  };
};

export const logout = () => {
  return dispatch => {
    axios.post('/accounts/logout/')
      .then(response => {
        dispatch(loadUserData());
      })
      .catch(error => {
        dispatch(messageActions.addMessage('Something went wrong'));
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
        dispatch(messageActions.addMessage('Something went wrong'));
      });
  };
};

export const setSigninHighlight = (highlight) => {
  return {
    type: actionTypes.SET_SIGNIN_HIGLIGHT,
    highlight: highlight,
  };
};
