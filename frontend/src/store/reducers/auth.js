import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
  userData: null,
};

const setUserData = (state, action) => {
  return updateObject(state, {
    userData: action.data,
  });
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA: return setUserData(state, action);
    default: return state;
  }
};

export default reducer;