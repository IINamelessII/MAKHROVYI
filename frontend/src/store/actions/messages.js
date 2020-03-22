import * as actionTypes from './actionTypes';
import axios from '../../axios-messages';

export const addMessage = (message) => {
  return {
    type: actionTypes.ADD_MESSAGE,
    message: message,
  };
};

export const removeMessage = (key) => {
  return {
    type: actionTypes.REMOVE_MESSAGE,
    key: key,
  };
};

export const addSessionMessage = (message, key) => {
  return {
    type: actionTypes.ADD_SESSION_MESSAGE,
    message: message,
    key: key,
  };
};

export const removeSessionMessage = (key) => {
  return {
    type: actionTypes.REMOVE_SESSION_MESSAGE,
    key: key,
  };
};

export const loadMessages = () => {
  return dispatch => {
    axios.get('/messages/')
      .then(response => {
        // eslint-disable-next-line
        for (let key in response.data) {
          dispatch(addSessionMessage(response.data[key], key));
        }
      });
  };
};

export const unsetMessage = (key) => {
  return dispatch => {
    axios.get('/unset_message/' + key + '/')
      .then(response => {
        dispatch(removeSessionMessage(key));
      });
  };
};
