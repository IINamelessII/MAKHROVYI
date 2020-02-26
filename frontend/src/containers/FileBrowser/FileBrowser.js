import React, {Component} from 'react';
import {structureData, rootHash} from '../../shared/constants';

import Dir from './Dir/Dir';
import File from './File/File';
import PathPart from './PathPart/PathPart';

class FileBrowser extends Component {
  state = {
    structure: null,
    hashPath: [],
    path: [],
  }

  componentDidMount() {
    this.forwardDir(structureData[rootHash].content, rootHash, "/");
  }

  forwardDir = (structure, hash, name) => {
    const hashPath = [...this.state.hashPath];
    hashPath.push(hash);
    const path = [...this.state.path];
    path.push(name);
    this.setState({
      structure: structure, 
      hashPath: hashPath,
      path: path,
    });
  }

  openPath = () => {}

  render() {
    let items = null;
    if(this.state.structure) {
      const structure = Object.entries(this.state.structure);
      items = structure.map((item) => {
        return item[1].type === "file" ?
          (<File
            key={item[0]}
            name={item[1].name}
            ext={item[1].ext} />
          ) : (
          <Dir
            key={item[0]}
            name={item[1].name}
            open={() => this.forwardDir(item[1].content, item[0], item[1].name)} />
          );
      });
    }
    
    const pathRow = this.state.path.map((name) => {
      return (
        <PathPart
          key={name}
          pathPartName={name}
          goToParh={() => this.openPath()} />
      );
    });

    return (
      <div>
        <div>{pathRow}</div>
        {items}
      </div>
    );
  }
}

export default FileBrowser;