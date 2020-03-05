import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
  showBackdrop: false,
  position: {x: 0, y: 0},
  options: [],
  loading: false,
  data: [],
};

const setBackdrop = (state, action) => {
  return updateObject(state, {
    showBackdrop: true,
    options: action.options,
  });
};

const hideBackdrop = (state, action) => {
  return updateObject(state, {
    showBackdrop: false,
  });
};

const getPostion = (state, action) => {
  const x = action.x;
  const y = action.y;
  return updateObject(state, {
    position: {x: x, y: y},
  });
};

const fetchItemsStart = (state, action) => {
  return updateObject(state, {loading: true});
};

const fetchItemsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    data: action.data,
  });
};

const fetchItemsFail = (state, action) => {
  return updateObject(state, {loading: false});
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BACKDROP: return setBackdrop(state, action);
    case actionTypes.HIDE_BACKDROP: return hideBackdrop(state, action);
    case actionTypes.GET_POSITION: return getPostion(state, action);
    case actionTypes.FETCH_ITEMS_START: return fetchItemsStart(state, action);
    case actionTypes.FETCH_ITEMS_SUCCESS: return fetchItemsSuccess(state, action);
    case actionTypes.FETCH_ITEMS_FAIL: return fetchItemsFail(state, action);
    default: return state;
  }
};

export default reducer;