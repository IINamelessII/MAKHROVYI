import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './ContextMenu.css';

class ContextMenu extends Component {

  render() {
    const options = this.props.options.map((option) => {
      return (
        <div
          key={option.label}
          onClick={option.action}
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

export default connect(mapStateToProps)(ContextMenu);

//TODO: Add Context menu over backdrop