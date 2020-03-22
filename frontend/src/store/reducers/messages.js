import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
  messages: {},
  sessionMessages: {},
};

const addMessage = (state, action) => {
  let i = 0;
  while (i in state.messages) {
    i++;
  }
  return updateObject(state, {
    messages: {...state.messages, i: action.message},
  });
};

const addSessionMessage = (state, action) => {
  let i = 0;
  while (i in state.sessionMessages) {
    i++;
  }
  return updateObject(state, {
    sessionMessages: {...state.sessionMessages, i: action.message},
  });
};

const removeMessage = (state, action) => {
  const messages = {...state.messages};
  delete messages[action.key];
  return updateObject(state, {
    messages: messages,
  });
};

const removeSessionMessage = (state, action) => {
  const sessionMessages = {...state.sessionMessages};
  delete sessionMessages[action.key];
  return updateObject(state, {
    sessionMessages: sessionMessages,
  });
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE: return addMessage(state, action);
    case actionTypes.REMOVE_MESSAGE: return removeMessage(state, action);
    case actionTypes.ADD_SESSION_MESSAGE: return addSessionMessage(state, action);
    case actionTypes.REMOVE_SESSION_MESSAGE: return removeSessionMessage(state, action);
    default: return state;
  }
};

export default reducer;
