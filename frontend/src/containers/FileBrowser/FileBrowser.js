import React, {Component} from 'react';

import {connect} from 'react-redux';

import Dir from './Dir/Dir';
import File from './File/File';
import PathPart from './PathPart/PathPart';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';

import classes from './FileBrowser.css';

import {spaceOptions, rootId} from '../../shared/constants';

class FileBrowser extends Component {
  state = {
    hashPath: [],
    path: [],
    items: [],
  }

  onMouseMove = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    this.props.updatePosition(x, y);
  }

  showContextMenu = (event, options=spaceOptions) => {
    if (event) {
      event.preventDefault();
    }
    this.props.onContextMenuShow(options);
  }

  componentDidMount() {
    console.log('CMP DID MNT');
    if (this.props.dirs.length === 0) {
      this.props.fetchDirs();
      this.props.fetchFiles();
    }
    if (this.props.dirs.length > 0 && this.state.path.length === 0) { //If data was loaded and state empty
      const structure = this.parseDir(rootId).content;
      this.addDirToPath(structure, rootId, "~/");
    }
  }

  addDirToPath = (structure, hash, name) => {
    const hashPath = [...this.state.hashPath];
    hashPath.push(hash);

    const path = [...this.state.path];
    path.push(name);

    const items = [...this.state.items];
    items.push(structure);
    this.setState({
      hashPath: hashPath,
      path: path,
      items: items,
    });
  }

  openFromPath = (index) => {
    const hashPath = this.state.hashPath.slice(0, index + 1);
    const path = this.state.path.slice(0, index + 1);
    const items = this.state.items.slice(0, index + 1);
    this.setState({
      hashPath: hashPath,
      path: path,
      items: items,
    });
  }

  parseFile = (id) => {
    const file = this.props.files.find(file => file.id === id);
    return {
      name: file.name,
      type: 'file',
      ext: file.ext,
    };
  }

  parseDir = (id) => {
    const dir = this.props.dirs.find(dir => dir.id === id);
    let content = {};

    for(let i = 0; i < dir.files.length; i++) {
      content[dir.files[i] + 'f'] = this.parseFile(dir.files[i]);
    }

    for (let i = 0; i < dir.dirs.length; i++) {
      content[dir.dirs[i] + 'd'] = this.parseDir(dir.dirs[i]);
    }

    return {
      name: dir.name,
      type: "dir",
      content: content,
    };
  }

  render() {
    console.log('RNDR');
    console.log(this.state);
    let fileBrowserContent = (
      <div className={classes.SpinnerContainer}>
        <Spinner />
      </div>
    );

    if(!this.props.loading && !this.props.loadingAsync) { //If  not loading

      let items = null;
      let pathRow = null;
      let structure = {};

      if (this.state.items.length > 1) {
        structure = Object.entries(this.state.items[0]);
        items = structure.map((item) => {
          return item[1].type === "file" ?
            (<File
              key={item[0]}
              name={item[1].name}
              ext={item[1].ext}
              showContextMenu={this.showContextMenu} />
            ) : (
            <Dir
              key={item[0]}
              name={item[1].name}
              open={() => this.addDirToPath(item[1].content, item[0], item[1].name)}
              showContextMenu={this.showContextMenu} />
            );
        });

        pathRow = this.state.path.map((name, index) => {
          return (
            <PathPart
              key={name}
              pathPartName={name}
              goToPath={() => this.openFromPath(index)} />
          );
        });
      }

      fileBrowserContent = (
        <React.Fragment>
          <div className={classes.PathRow}>{pathRow}</div>
          <div 
            onContextMenu={(event) => this.showContextMenu(event)} 
            className={classes.Items}
            onMouseMove={(event) => this.onMouseMove(event)}
          >
            {items}
          </div>
        </React.Fragment>
      );
    }

    return (
      <div className={classes.FileBrowser}>
        {fileBrowserContent}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showBackdrop: state.fileBrowser.showBackdrop,
    loading: state.fileBrowser.loading,
    loadingAsync: state.fileBrowser.loadingAsync,
    dirs: state.fileBrowser.dirs,
    files: state.fileBrowser.files,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onContextMenuShow: (options) => dispatch(actions.setBackdrop(options)),
    updatePosition: (x, y) => dispatch(actions.getPostion(x, y)),
    fetchDirs: () => dispatch(actions.fetchDirs()),
    fetchFiles: () => dispatch(actions.fetchFiles()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);