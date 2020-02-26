import React, {Component} from 'react';
import {structureData, rootHash} from '../../shared/constants';

import Dir from './Dir/Dir';
import File from './File/File';

class FileBrowser extends Component {
  state = {
    structure: null,
    hashPath: [],
    path: [],
  }

  componentDidMount() {
    this.openDir(structureData[rootHash].content, rootHash, "/");
  }

  openDir = (structure, hash, name) => {
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
            open={() => this.openDir(item[1].content, item[0], item[1].name)} />
          );
      });
    }
    
    return (
      <div>
        {items}
      </div>
    );
  }
}

export default FileBrowser;