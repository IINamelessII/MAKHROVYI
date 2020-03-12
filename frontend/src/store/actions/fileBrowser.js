import * as actionTypes from './actionTypes';
import axios from '../../axios-fileBrowser';

export const setBackdrop = () => {
  return {
    type: actionTypes.SET_BACKDROP,
  };
};

export const hideBackdrop = () => {
  return {
    type: actionTypes.HIDE_BACKDROP,
  };
};

export const setContextMenu = (options) => {
  return {
    type: actionTypes.SET_CONTEXTMENU,
    options: options,
  };
};

export const hideContextMenu = () => {
  return {
    type: actionTypes.HIDE_CONTEXTMENU,
  };
};

export const setInfoCard = (data) => {
  return {
    type: actionTypes.SET_INFOCARD,
    data: data
  };
};

export const hideInfoCard = () => {
  return {
    type: actionTypes.HIDE_INFOCARD,
  };
};

export const getPostion = (x, y) => {
  return {
    type: actionTypes.GET_POSITION,
    x: x,
    y: y,
  };
};

export const fetchDirsStart = () => {
  return {
    type: actionTypes.FETCH_DIRS_START,
  };
};

export const fetchDirsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_DIRS_SUCCESS,
    data: data,
  };
};

export const fetchDirsFail = (error) => {
  return {
    type: actionTypes.FETCH_DIRS_FAIL,
    error: error,
  };
};

export const fetchDirs = () => {
  return dispatch => {
    dispatch(fetchDirsStart());
    axios.get('/api/dirs/')
      .then(response => {
        dispatch(fetchDirsSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchDirsFail(error));
      });
  };
};

export const fetchFilesStart = () => {
  return {
    type: actionTypes.FETCH_FILES_START,
  };
};

export const fetchFilesSuccess = (data) => {
  return {
    type: actionTypes.FETCH_FILES_SUCCESS,
    data: data,
  };
};

export const fetchFilesFail = (error) => {
  return {
    type: actionTypes.FETCH_FILES_FAIL,
    error: error,
  };
};

export const fetchFiles = () => {
  return dispatch => {
    dispatch(fetchFilesStart());
    axios.get('/api/files/')
      .then(response => {
        dispatch(fetchFilesSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchFilesFail(error));
      });
  };
};

export const buildStructure = (rootId, dirs) => {
  return {
    type: actionTypes.BUILD_STRUCTURE,
    rootId: rootId,
    dirs: dirs,
  };
};

//TODO: Refactor useless action creaters
export const prepareStructure = (rootId) => {
  return dispatch => {
    dispatch(fetchFilesStart());
    axios.get('/api/files/')
      .then(response => {
        dispatch(fetchFilesSuccess(response.data));
        dispatch(fetchDirsStart());
        axios.get('/api/dirs/')
          .then(response => {
            // dispatch(fetchDirsSuccess(response.data));
            dispatch(buildStructure(rootId, response.data));
          })
          .catch(error => {
            dispatch(fetchDirsFail(error));
          });
      })
      .catch(error => {
        dispatch(fetchFilesFail(error));
      });
  };
};

export const addDirToPath = (content, hash, name) => {
  return {
    type: actionTypes.ADD_DIR_TO_PATH,
    content: content,
    hash: hash,
    name: name,
  };
};

export const openFromPath = (index) => {
  return {
    type: actionTypes.OPEN_FROM_PATH,
    index: index,
  };
};