import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './ContextMenu.css';
import * as actions from '../../../store/actions/index';

class ContextMenu extends Component {

  shouldComponentUpdate() {
    return false;
  }

  optionClick = (action, holdBackdrop) => {
    action();
    if (!holdBackdrop) {
      this.props.onBackdropHide();
    } else {
      this.props.onContextMenuHide();
    }
  }

  render() {
    const options = this.props.options.map((option) => {
      return (
        <div
          key={option.label}
          onClick={() => this.optionClick(option.action, option.holdBackdrop)}
          className={classes.Option}>{option.label}</div>
      );
    })

    let x = this.props.position.x;
    let y = this.props.position.y;
    const screen = document.getElementById('Screen').getBoundingClientRect();

    if (window.screen.width > 992 && y + this.props.options.length * 25 > screen.bottom) {
      y -= this.props.options.length * 25;
    } else if (y + this.props.options.length * 27 > screen.bottom) {
      y -= this.props.options.length * 27;
    }
    if (window.screen.width > 992 && x + 180 > screen.right) {
      x -= 180;
    } else if (x + 190 > screen.right) {
      x -= 190;
    }

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
    onContextMenuHide: () => dispatch(actions.hideContextMenu()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);