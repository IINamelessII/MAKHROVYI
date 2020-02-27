import React, {Component} from 'react';
import {connect} from 'react-redux';

class Backdrop extends Component {
  render() {
    return this.props.show ? (
      <div onClick={this.props.click}>
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


export default connect(mapStateToProps)(Backdrop);