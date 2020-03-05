import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';

import classes from './Backdrop.css';

class Backdrop extends Component {

  onMouseMove = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    this.props.updatePosition(x, y);
  }
  
  render() {
    return this.props.show ? (
      <div 
        onClick={this.props.onBackdropHide} 
        className={classes.Backdrop}
        onMouseMove={(event) => this.onMouseMove(event)}>
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
    updatePosition: (x, y) => dispatch(actions.getPostion(x, y)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);