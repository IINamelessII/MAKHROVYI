import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as action from '../../../store/actions/index';

class Backdrop extends Component {
  onBackdropClick = () => {
    this.props.click();
    this.props.onBackdropHide();
  }

  render() {
    return this.props.show ? (
      <div onClick={this.onBackdropClick}>
        BACKDROP
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    show: state.fileBrowser.showBackdrop,
    click: state.fileBrowser.backdropFunction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBackdropHide: () => dispatch(action.hideBackdrop()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);