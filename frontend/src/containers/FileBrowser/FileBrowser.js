import React, {Component} from 'react';

import {connect} from 'react-redux';

import Dir from './Dir/Dir';
import File from './File/File';
import PathPart from './PathPart/PathPart';
import * as actions from '../../store/actions/index';

import classes from './FileBrowser.css';

import {structureData, rootHash, spaceOptions} from '../../shared/constants';

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
    this.addDirToPath(structureData[rootHash].content, rootHash, "~/");
    this.props.fetchDirs();
    this.props.fetchFiles();
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

  render() {
    let items = null;
    let structure = this.state.items[this.state.items.length - 1];
    if(structure) {
      structure = Object.entries(structure);
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
    }
    
    const pathRow = this.state.path.map((name, index) => {
      return (
        <PathPart
          key={name}
          pathPartName={name}
          goToPath={() => this.openFromPath(index)} />
      );
    });

    return (
      <div className={classes.FileBrowser}>
        <div className={classes.PathRow}>{pathRow}</div>
        <div 
          onContextMenu={(event) => this.showContextMenu(event)} 
          className={classes.Items}
          onMouseMove={(event) => this.onMouseMove(event)}
        >
          {items}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showBackdrop: state.fileBrowser.showBackdrop,
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