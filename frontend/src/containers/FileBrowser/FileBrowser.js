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
    this.props.prepareStructure(rootId);
  }

  render() {

    let fileBrowserContent = (
      <div className={classes.SpinnerContainer}>
        <Spinner />
      </div>
    );

    if(!this.props.loading && !this.props.loadingAsync) { //If  not loading

      let items = null;
      let pathRow = null;

      if (this.props.items.length >= 1) {
        const structure = Object.entries(this.props.items[this.props.items.length - 1]);
        items = structure.map((item) => {
          return item[1].type === "file" ?
            (<File
              key={item[0]}
              id={item[0]}
              name={item[1].name}
              ext={item[1].ext}
              showContextMenu={this.showContextMenu} />
            ) : (
            <Dir
              key={item[0]}
              id={item[0]}
              name={item[1].name}
              open={() => this.props.addDirToPath(item[1].content, item[0], item[1].name)}
              showContextMenu={this.showContextMenu} />
            );
        });

        pathRow = this.props.path.map((name, index) => {
          return (
            <PathPart
              key={name}
              pathPartName={name}
              goToPath={() => this.props.openFromPath(index)} />
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
    items: state.fileBrowser.items,
    path: state.fileBrowser.path,
    hashPath: state.fileBrowser.hashPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onContextMenuShow: (options) => dispatch(actions.setBackdrop(options)),
    updatePosition: (x, y) => dispatch(actions.getPostion(x, y)),
    fetchDirs: () => dispatch(actions.fetchDirs()),
    fetchFiles: () => dispatch(actions.fetchFiles()),
    prepareStructure: (rootId) => dispatch(actions.prepareStructure(rootId)),
    addDirToPath: (content, hash, name) => dispatch(actions.addDirToPath(content, hash, name)),
    openFromPath: (index) => dispatch(actions.openFromPath(index)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);