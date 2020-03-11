import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './ContextMenu.css';
import * as actions from '../../../store/actions/index';

class ContextMenu extends Component {

  shouldComponentUpdate() {
    return false;
  }

  optionClick = (action) => {
    action();
    this.props.onBackdropHide();
  }

  render() {
    const options = this.props.options.map((option) => {
      return (
        <div
          key={option.label}
          onClick={() => this.optionClick(option.action)}
          className={classes.Option}>{option.label}</div>
      );
    })

    const x = this.props.position.x;
    const y = this.props.position.y;

    return (
      <div 
        className={classes.ContextMenu}
        style={{top: y + 'px', left: x + 'px',}}>{options}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    position: state.fileBrowser.position,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBackdropHide: () => dispatch(actions.hideBackdrop()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);