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
        console.log(response.data);
        // for (let message of response.data) {
        //   dispatch(addMessage(message));
        // }
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
