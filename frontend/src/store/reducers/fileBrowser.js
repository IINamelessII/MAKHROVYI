import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
  showBackdrop: false,
  position: {x: 0, y: 0},
  options: [],
  loading: false,
  dirs: [],
  files: [],
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

const fetchDirsStart = (state, action) => {
  return updateObject(state, {loading: true});
};

const fetchDirsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    dirs: action.data,
  });
};

const fetchDirsFail = (state, action) => {
  return updateObject(state, {loading: false});
}

const fetchFilesStart = (state, action) => {
  return updateObject(state, {loading: true});
};

const fetchFilesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    files: action.data,
  });
};

const fetchFilesFail = (state, action) => {
  return updateObject(state, {loading: false});
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BACKDROP: return setBackdrop(state, action);
    case actionTypes.HIDE_BACKDROP: return hideBackdrop(state, action);
    case actionTypes.GET_POSITION: return getPostion(state, action);
    case actionTypes.FETCH_DIRS_START: return fetchDirsStart(state, action);
    case actionTypes.FETCH_DIRS_SUCCESS: return fetchDirsSuccess(state, action);
    case actionTypes.FETCH_DIRS_FAIL: return fetchDirsFail(state, action);
    case actionTypes.FETCH_FILES_START: return fetchFilesStart(state, action);
    case actionTypes.FETCH_FILES_SUCCESS: return fetchFilesSuccess(state, action);
    case actionTypes.FETCH_FILES_FAIL: return fetchFilesFail(state, action);
    default: return state;
  }
};

export default reducer;