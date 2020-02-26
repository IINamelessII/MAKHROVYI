import React, {Fragment, Component} from 'react';

import ContextMenu from '../ContextMenu/ContextMenu';

import {fileOptions} from '../../../shared/constants';

class Dir extends Component {
  state = {
    showContextMenu: false,
  }

  //TODO: Add backdrop
  switchContextMenu = (event) => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        showContextMenu: !prevState.showContextMenu
      };
    });
  }

  render() {
    return (
      <Fragment>
        <div 
          onClick={this.props.open} 
          onContextMenu={this.switchContextMenu}
        >It's Dir {this.props.name}</div>
        {this.state.showContextMenu ? (
          <ContextMenu
            options={fileOptions} />
        ) : null}
      </Fragment>
    );
  }
}

export default Dir;