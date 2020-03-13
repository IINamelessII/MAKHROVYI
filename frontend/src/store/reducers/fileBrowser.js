import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const parseFile = (files, id) => {
  const file = files.find(file => file.id === id);
  return {
    name: file.name,
    type: 'file',
    ext: file.ext,
    downloads: file.downloads,
    created_date: file.created_date,
    mmtype: file.mmtype,
  };
}

const parseDir = (dirs, files, id) => {
  const dir = dirs.find(dir => dir.id === id);
  let content = {};

  for(let i = 0; i < dir.files.length; i++) {
    content[dir.files[i] + 'f'] = parseFile(files, dir.files[i]);
  }

  for (let i = 0; i < dir.dirs.length; i++) {
    content[dir.dirs[i] + 'd'] = parseDir(dirs, files, dir.dirs[i]);
  }

  return {
    name: dir.name,
    type: "dir",
    content: content,
    downloads: dir.downloads,
    created_date: dir.created_date,
  };
}

const initialState = {
  showBackdrop: false,
  showContextMenu: false,
  showInfoCard: false,
  showNewDir: false,
  position: {x: 0, y: 0},
  contextMenuOptions: [],
  infoCardData: {},
  loading: false,
  loadingAsync: false,
  dirs: [],
  files: [],
  hashPath: [],
  path: [],
  items: [],
  error: null,
};

const setBackdrop = (state, action) => {
  return updateObject(state, {
    showBackdrop: true,
  });
};

const hideBackdrop = (state, action) => {
  return updateObject(state, {
    showBackdrop: false,
    showContextMenu: false,
    showInfoCard: false,
    showNewDir: false,
  });
};

const setContextMenu = (state, action) => {
  return updateObject(state, {
    showContextMenu: true,
    contextMenuOptions: action.options,
  });
};

const hideContextMenu = (state, action) => {
  return updateObject(state, {
    showContextMenu: false,
  });
};

const setInfoCard = (state, action) => {
  return updateObject(state, {
    showInfoCard: true,
    infoCardData: action.data,
  });
};

const hideInfoCard = (state, action) => {
  return updateObject(state, {
    showInfoCard: false,
  });
};

const setNewDir = (state, action) => {
  return updateObject(state, {
    showNewDir: true,
  });
};

const hideNewDir = (state, action) => {
  return updateObject(state, {
    showNewDir: false,
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
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const fetchFilesStart = (state, action) => {
  return updateObject(state, {loadingAsync: true});
};

const fetchFilesSuccess = (state, action) => {
  return updateObject(state, {
    loadingAsync: false,
    files: action.data,
  });
};

const fetchFilesFail = (state, action) => {
  return updateObject(state, {
    loadingAsync: false,
    error: action.error,
  });
};

const buildStructure = (state, action) => {
  return updateObject(state, {
    dirs: action.dirs,
    items: [parseDir(action.dirs, state.files, action.rootId).content],
    hashPath: [action.rootId],
    path: ["~/"],
    loading: false,
  });
};

const addDirToPath = (state, action) => {
  const hashPath = [...state.hashPath];
  hashPath.push(action.hash);

  const path = [...state.path];
  path.push(action.name);

  const items = [...state.items];
  items.push(action.content);
  return updateObject(state, {
    items: items,
    path: path,
    hashPath: hashPath,
  });
};

const openFromPath = (state, action) => {
  const hashPath = state.hashPath.slice(0, action.index + 1);
  const path = state.path.slice(0, action.index + 1);
  const items = state.items.slice(0, action.index + 1);
  return updateObject(state, {
    hashPath: hashPath,
    path: path,
    items: items,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BACKDROP: return setBackdrop(state, action);
    case actionTypes.HIDE_BACKDROP: return hideBackdrop(state, action);
    case actionTypes.SET_CONTEXTMENU: return setContextMenu(state, action);
    case actionTypes.HIDE_CONTEXTMENU: return hideContextMenu(state, action);
    case actionTypes.SET_INFOCARD: return setInfoCard(state, action);
    case actionTypes.HIDE_INFOCARD: return hideInfoCard(state, action);
    case actionTypes.SET_NEW_DIR: return setNewDir(state, action);
    case actionTypes.HIDE_NEW_DIR: return hideNewDir(state, action);
    case actionTypes.GET_POSITION: return getPostion(state, action);
    case actionTypes.FETCH_DIRS_START: return fetchDirsStart(state, action);
    case actionTypes.FETCH_DIRS_SUCCESS: return fetchDirsSuccess(state, action);
    case actionTypes.FETCH_DIRS_FAIL: return fetchDirsFail(state, action);
    case actionTypes.FETCH_FILES_START: return fetchFilesStart(state, action);
    case actionTypes.FETCH_FILES_SUCCESS: return fetchFilesSuccess(state, action);
    case actionTypes.FETCH_FILES_FAIL: return fetchFilesFail(state, action);
    case actionTypes.BUILD_STRUCTURE: return buildStructure(state, action);
    case actionTypes.ADD_DIR_TO_PATH: return addDirToPath(state, action);
    case actionTypes.OPEN_FROM_PATH: return openFromPath(state, action);
    default: return state;
  }
};

export default reducer;