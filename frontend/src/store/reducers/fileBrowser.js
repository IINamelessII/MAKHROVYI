import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
  showBackdrop: false,
  backdropFunction: null,
};

const setBackdrop = (state, action) => {
  return updateObject(state, {
    showBackdrop: true,
    backdropFunction: action.backdropOnClickFunction,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BACKDROP: return setBackdrop(state, action);
    default: return state;
  }
};

export default reducer;