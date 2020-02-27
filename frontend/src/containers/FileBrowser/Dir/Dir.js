import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';

import ContextMenu from '../ContextMenu/ContextMenu';
import * as actions from '../../../store/actions/index';

import {fileOptions} from '../../../shared/constants';

class Dir extends Component {
  state = {
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

  render() {
    return (
      <Fragment>
        <div 
          onClick={this.props.open} 
          onContextMenu={this.showContextMenu}
        >It's Dir {this.props.name}</div>
        {this.state.showContextMenu ? (
          <ContextMenu
            options={fileOptions} />
        ) : null}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onContextMenuShow: (backdropFunction) => dispatch(actions.setBackdrop(backdropFunction)),
  };
}

export default connect(null, mapDispatchToProps)(Dir);