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
    items: [],
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
      structure: structure, 
      hashPath: hashPath,
      path: path,
      items: items,
    });
  }

  openFromPath = (index) => {
    const hashPath = this.state.hashPath.slice(0, index + 1);
    const path = this.state.path.slice(0, index + 1);
    const items = this.state.items.slice(0, index + 1);
    const structure = items[index];
    this.setState({
      structure: structure,
      hashPath: hashPath,
      path: path,
      items: items,
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
            open={() => this.addDirToPath(item[1].content, item[0], item[1].name)} />
          );
      });
    }
    
    const pathRow = this.state.path.map((name, index) => {
      // hash = this.state.hashPath[index];
      return (
        <PathPart
          key={name}
          pathPartName={name}
          goToPath={() => this.openFromPath(index)} />
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