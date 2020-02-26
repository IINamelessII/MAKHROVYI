import React, {Fragment, Component} from 'react';

import ContextMenu from '../ContextMenu/ContextMenu';

import {fileOptions} from '../../../shared/constants';

class File extends Component {
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
        <div onContextMenu={this.switchContextMenu}>It's File {this.props.name}.{this.props.ext}</div>
        {this.state.showContextMenu ? (
          <ContextMenu
            options={fileOptions} />
        ) : null}
      </Fragment>
    );
  }
}

export default File;