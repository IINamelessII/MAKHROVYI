import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
  showBackdrop: false,
  backdropFunction: null,
};

const setBackdrop = (state, action) => {
  if (state.backdropFunction) {
    state.backdropFunction();
  }
  return updateObject(state, {
    showBackdrop: true,
    backdropFunction: action.backdropOnClickFunction,
  });
};

const hideBackdrop = (state, action) => {
  if (state.backdropFunction) {
    state.backdropFunction();
  }
  return updateObject(state, {
    showBackdrop: false,
    backdropFunction: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BACKDROP: return setBackdrop(state, action);
    case actionTypes.HIDE_BACKDROP: return hideBackdrop(state, action);
    default: return state;
  }
};

export default reducer;