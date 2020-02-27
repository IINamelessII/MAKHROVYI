import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';

import ContextMenu from '../ContextMenu/ContextMenu';
import * as actions from '../../../store/actions/index';

import {dirOptions} from '../../../shared/constants';

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

  onDirClick = () => {
    this.props.click();
    this.props.open();
  }

  render() {
    return (
      <Fragment>
        <div 
          onClick={this.onDirClick}
          onContextMenu={this.showContextMenu}
        >It's Dir {this.props.name}</div>
        {this.state.showContextMenu ? (
          <ContextMenu
            options={dirOptions} />
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