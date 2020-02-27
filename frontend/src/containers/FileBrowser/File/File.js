import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';

import ContextMenu from '../ContextMenu/ContextMenu';
import * as actions from '../../../store/actions/index';

import {fileOptions} from '../../../shared/constants';

class File extends Component {
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
        <div onContextMenu={this.showContextMenu}>It's File {this.props.name}.{this.props.ext}</div>
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

export default connect(null, mapDispatchToProps)(File);