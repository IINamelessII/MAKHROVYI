import * as actionTypes from './actionTypes';
import axios from '../../axios-fileBrowser';
import * as messageActions from './messages';

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

export const setNewDir = () => {
  return {
    type: actionTypes.SET_NEW_DIR,
  };
};

export const setFilesUpload = () => {
  return {
    type: actionTypes.SET_FILES_UPLOAD,
  };
};

export const setRenameDir = () => {
  return {
    type: actionTypes.SET_RENAME_DIR,
  };
};

export const setRenameFile = () => {
  return {
    type: actionTypes.SET_RENAME_FILE,
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

export const fetchDirsFail = () => {
  return {
    type: actionTypes.FETCH_DIRS_FAIL,
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

export const fetchFilesFail = () => {
  return {
    type: actionTypes.FETCH_FILES_FAIL,
  };
};

export const buildStructure = (rootId, dirs) => {
  return {
    type: actionTypes.BUILD_STRUCTURE,
    rootId: rootId,
    dirs: dirs,
  };
};

export const updateStructure = (rootId, dirHash, fileHash, dirs) => {
  return dispatch => {
    dispatch(buildStructure(rootId, dirs));
    handleHashes(rootId, dirHash, fileHash, dirs, (f) => dispatch(f));
  }
};

export const selectDir = (dirHash) => {
  return {
    type: actionTypes.SELECT_DIR,
    dirHash: dirHash,
  };
};

export const handleHashes = (rootId, dirHash, fileHash, dirs, dispatch) => {

  const intDirHash = parseInt(dirHash);
  const intFileHash = parseInt(fileHash);
  
  if (intDirHash && intDirHash !== rootId) { //If we have have specified a directorys hash
    const parentDir = dirs.find(dir => dir.dirs.includes(intDirHash));
    if (parentDir) {
      dispatch(selectDir(intDirHash));
    } else {
      dispatch(messageActions.addMessage('Directory was not founded'));
      dispatch(setShouldRedirect(true));
    }
  } else if (intFileHash) { //If we have have specified a file hash
    const parentDir = dirs.find(dir => dir.files.includes(intFileHash));
    if (parentDir) {
      dispatch(selectDir(parentDir.id));
    } else {
      dispatch(messageActions.addMessage('File was not founded'));
      dispatch(setShouldRedirect(true));
    }
  }
}

export const prepareStructure = (rootId, dirHash, fileHash) => {
  return dispatch => {
    dispatch(fetchFilesStart());
    axios.get('/api/files/')
      .then(response => {
        dispatch(fetchFilesSuccess(response.data));
        dispatch(fetchDirsStart());
        axios.get('/api/dirs/')
          .then(response => {
            dispatch(buildStructure(rootId, response.data));
            
            handleHashes(rootId, dirHash, fileHash, response.data, (f) => dispatch(f));
          })
          .catch(error => {
            dispatch(fetchDirsFail());
            dispatch(messageActions.addMessage('Something went wrong'));
          });
      })
      .catch(error => {
        dispatch(fetchFilesFail());
        dispatch(messageActions.addMessage('Something went wrong'));
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

export const setShouldRedirect = (should) => {
  return {
    type: actionTypes.SET_SHOULD_REDIRECT,
    should: should
  };
};
