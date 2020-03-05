import * as actionTypes from './actionTypes';
import axios from '../../axios-fileBrowser';

export const setBackdrop = (options) => {
  return {
    type: actionTypes.SET_BACKDROP,
    options: options,
  };
};

export const hideBackdrop = () => {
  return {
    type: actionTypes.HIDE_BACKDROP,
  };
};

export const getPostion = (x, y) => {
  return {
    type: actionTypes.GET_POSITION,
    x: x,
    y: y,
  };
};

export const fetchItemsStart = () => {
  return {
    type: actionTypes.FETCH_ITEMS_START,
  };
};

export const fetchItemsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_ITEMS_START,
    data: data
  };
};

export const fetchItemsFail = (error) => {
  return {
    type: actionTypes.FETCH_ITEMS_FAIL,
    error: error,
  };
};

export const fetchItems = () => {
  return dispatch => {
    dispatch(fetchItemsStart());
    axios.get('/api/dirs')
      .then(response => {
        dispatch(fetchItemsSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchItemsFail(error));
      });
  };
};