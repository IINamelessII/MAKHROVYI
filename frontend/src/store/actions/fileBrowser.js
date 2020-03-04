import * as actionTypes from './actionTypes';

export const setBackdrop = (backdropOnClickFunction) => {
  return {
    type: actionTypes.SET_BACKDROP,
    backdropOnClickFunction: backdropOnClickFunction,
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