import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
  messages: {},
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

const removeMessage = (state, action) => {
  const messages = {...state.messages};
  delete messages[action.key];
  return updateObject(state, {
    messages: messages,
  });
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE: return addMessage(state, action);
    case actionTypes.REMOVE_MESSAGE: return removeMessage(state, action);
    default: return state;
  }
};

export default reducer;
