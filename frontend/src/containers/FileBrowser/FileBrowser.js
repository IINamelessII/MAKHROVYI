import React, {Component} from 'react';

import {connect} from 'react-redux';

import Dir from './Dir/Dir';
import File from './File/File';
import PathPart from './PathPart/PathPart';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';
import InfoCard from './InfoCard/InfoCard';

import classes from './FileBrowser.css';

import {rootId} from '../../shared/constants';

class FileBrowser extends Component {

  spaceOptions = [
    {"label": "add directory", "action":() => {console.log("add directory")}, "holdBackdrop": false},
    {"label": "upload file", "action":() => {console.log("upload file")}, "holdBackdrop": false},
    {"label": "upload files", "action":() => {console.log("upload files")}, "holdBackdrop": false},
    {"label": "upload directory", "action":() => {console.log("upload directory")}, "holdBackdrop": false},
    {"label": "properties", "action":() => {this.propertiesClick()}, "holdBackdrop": true},
  ]

  onMouseMove = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    this.props.updatePosition(x, y);
  }

  showContextMenu = (event, options=this.spaceOptions) => {
    if (event) {
      event.preventDefault();
    }
    this.props.onSetContextMenu(options);
    this.props.onSetBackdrop();
  }

  propertiesClick = () => {
    const id = parseInt(this.props.hashPath[this.props.hashPath.length - 1]);
    const data = this.props.dirs.find(dir => dir.id === id);
    this.props.onSetInfoCard(data);
  }

  componentDidMount() {
    this.props.prepareStructure(rootId);
  }

  render() {

    console.log("DATA");
    console.log(this.props);

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
              showContextMenu={this.showContextMenu}
              info={item[1]} />
            ) : (
            <Dir
              key={item[0]}
              id={item[0]}
              name={item[1].name}
              open={() => this.props.addDirToPath(item[1].content, item[0], item[1].name)}
              showContextMenu={this.showContextMenu}
              info={item[1]} />
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

    let infocard = null;
    if (this.props.showInfoCard) {
      infocard = <InfoCard/>;
    }

    return (
      <React.Fragment>
        <div className={classes.FileBrowser}>
          {fileBrowserContent}
        </div>
        {infocard}
      </React.Fragment>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    showBackdrop: state.fileBrowser.showBackdrop,
    showInfoCard: state.fileBrowser.showInfoCard,
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
    onSetBackdrop: () => dispatch(actions.setBackdrop()),
    onSetContextMenu: (options) => dispatch(actions.setContextMenu(options)),
    onSetInfoCard: (data) => dispatch(actions.setInfoCard(data)),
    updatePosition: (x, y) => dispatch(actions.getPostion(x, y)),
    fetchDirs: () => dispatch(actions.fetchDirs()),
    fetchFiles: () => dispatch(actions.fetchFiles()),
    prepareStructure: (rootId) => dispatch(actions.prepareStructure(rootId)),
    addDirToPath: (content, hash, name) => dispatch(actions.addDirToPath(content, hash, name)),
    openFromPath: (index) => dispatch(actions.openFromPath(index)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);