import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';

import classes from './Backdrop.css';

class Backdrop extends Component {
  
  render() {
    return this.props.show ? (
      <div 
        onClick={this.props.onBackdropHide} 
        className={classes.Backdrop}>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    show: state.fileBrowser.showBackdrop,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBackdropHide: () => dispatch(actions.hideBackdrop()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);