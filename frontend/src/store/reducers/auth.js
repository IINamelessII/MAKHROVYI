import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
  userData: null,
  signinHighlight: false,
};

const setUserData = (state, action) => {
  return updateObject(state, {
    userData: action.data,
  });
};

const setSigninHighlight = (state, action) => {
  return updateObject(state, {
    signinHighlight: action.highlight,
  });
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA: return setUserData(state, action);
    case actionTypes.SET_SIGNIN_HIGLIGHT: return setSigninHighlight(state, action);
    default: return state;
  }
};

export default reducer;