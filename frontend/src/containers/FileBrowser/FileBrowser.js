import React, {Component} from 'react';

import {connect} from 'react-redux';

import Dir from './Dir/Dir';
import File from './File/File';
import PathPart from './PathPart/PathPart';
import ContextMenu from './ContextMenu/ContextMenu';
import * as actions from '../../store/actions/index';

import classes from './FileBrowser.css';

import {structureData, rootHash, spaceOptions} from '../../shared/constants';

class FileBrowser extends Component {
  state = {
    hashPath: [],
    path: [],
    items: [],
    showContextMenu: false,
  }

  showContextMenu = (event) => {
    event.preventDefault();
    this.props.onContextMenuShow(this.hideContextMenu);
    this.setState({showContextMenu: true});
  }

  hideContextMenu = (event) => {
    this.setState({showContextMenu: false});
  }

  componentDidMount() {
    this.addDirToPath(structureData[rootHash].content, rootHash, "/");
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
    //TODO: Add hiding backdrop
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
    //TODO: replace this.state.items.length - 1 with -1 analog
    let structure = this.state.items[this.state.items.length - 1];
    if(structure) {
      structure = Object.entries(structure);
      items = structure.map((item) => {
        return item[1].type === "file" ?
          (<File
            key={item[0]}
            name={item[1].name}
            ext={item[1].ext}
            click={this.props.onBackdropHide} />
          ) : (
          <Dir
            key={item[0]}
            name={item[1].name}
            open={() => this.addDirToPath(item[1].content, item[0], item[1].name)}
            click={this.props.onBackdropHide} />
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

    //TODO: items should on top of(over) free space and even backdrop
    return (
      <div className={classes.FileBrowser}>
        <div className={classes.PathRow}>{pathRow}</div>
        <div 
          onContextMenu={this.showContextMenu} 
          className={classes.Items}>{items}</div>
        {this.state.showContextMenu ? (
          <ContextMenu
            options={spaceOptions} />
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onContextMenuShow: (backdropFunction) => dispatch(actions.setBackdrop(backdropFunction)),
    onBackdropHide: () => dispatch(actions.hideBackdrop()),
  };
}

export default connect(null, mapDispatchToProps)(FileBrowser);