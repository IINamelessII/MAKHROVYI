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
    dispatch('/messages/')
      .then(response => {
        for (let message of response.data) {
          dispatch(addMessage(message));
        }
      });
  };
};
