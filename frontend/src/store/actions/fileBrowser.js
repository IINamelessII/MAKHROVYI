import * as actionTypes from './actionTypes';

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