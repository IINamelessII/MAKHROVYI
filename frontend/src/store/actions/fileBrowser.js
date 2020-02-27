import * as actionTypes from './actionTypes';

export const setBackdrop = (backdropOnClickFunction) => {
  return {
    type: actionTypes.SET_BACKDROP,
    backdropOnClickFunction: backdropOnClickFunction,
  };
};