import React, {Component} from 'react';
import {structureData} from '../../shared/constants';

import Dir from './Dir/Dir';
import File from './File/File';

class FileBrowser extends Component {
  state = {
    structure: null,
  }

  componentDidMount() {
    this.openDir(structureData["aaaa"].content);
  }

  openDir = (structure) => {
    this.setState({structure: structure});
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
            open={() => this.openDir(item[1].content)} />
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