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

export const loadMessages = () => {
  return dispatch => {
    axios.get('/messages/')
      .then(response => {
        for (let key in response.data) {
          dispatch(addMessage(response.data[key]));
        }
      });
  };
};

export const unsetMessage = (key) => {
  return dispatch => {
    axios.get('/unset_message/' + key)
      .then(response => {
        dispatch(removeMessage(key));
      });
  };
};
